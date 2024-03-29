# Socket

## TCP/IP通信

### 三握四挥

![img](https://i.loli.net/2021/03/06/WOyu3rj6VHKscPA.jpg)

很多人会问，为什么建链接要3次握手，断链接需要4次挥手？

- **对于建链接的3次握手，**主要是要初始化Sequence Number 的初始值。通信的双方要互相通知对方自己的初始化的Sequence Number（缩写为ISN：Inital Sequence Number）——所以叫SYN，全称Synchronize Sequence Numbers。也就上图中的 x 和 y。这个号要作为以后的数据通信的序号，以保证应用层接收到的数据不会因为网络上的传输的问题而乱序（TCP会用这个序号来拼接数据）。

- **对于4次挥手，**其实你仔细看是2次，因为TCP是全双工的，所以，发送方和接收方都需要Fin和Ack。只不过，有一方是被动的，所以看上去就成了所谓的4次挥手。如果两边同时断连接，那就会就进入到CLOSING状态，然后到达TIME_WAIT状态。下图是双方同时断连接的示意图（你同样可以对照着TCP状态机看）：

![img](https://i.loli.net/2021/03/06/aqKmNRGoknhrtcB.png)
两端同时断连接（[图片来源](http://www.tcpipguide.com/free/t_TCPConnectionTermination-4.htm)）

 

另外，有几个事情需要注意一下：

- **关于建连接时SYN超时**。试想一下，如果server端接到了clien发的SYN后回了SYN-ACK后client掉线了，server端没有收到client回来的ACK，那么，这个连接处于一个中间状态，即没成功，也没失败。于是，server端如果在一定时间内没有收到的TCP会重发SYN-ACK。在Linux下，默认重试次数为5次，重试的间隔时间从1s开始每次都翻售，5次的重试时间间隔为1s, 2s, 4s, 8s, 16s，总共31s，第5次发出后还要等32s都知道第5次也超时了，所以，总共需要 1s + 2s + 4s+ 8s+ 16s + 32s = 2^6 -1 = 63s，TCP才会把断开这个连接。

- **关于SYN Flood攻击**。一些恶意的人就为此制造了SYN Flood攻击——给服务器发了一个SYN后，就下线了，于是服务器需要默认等63s才会断开连接，这样，攻击者就可以把服务器的syn连接的队列耗尽，让正常的连接请求不能处理。于是，Linux下给了一个叫**tcp_syncookies**的参数来应对这个事——当SYN队列满了后，TCP会通过源地址端口、目标地址端口和时间戳打造出一个特别的Sequence Number发回去（又叫cookie），如果是攻击者则不会有响应，如果是正常连接，则会把这个 SYN Cookie发回来，然后服务端可以通过cookie建连接（即使你不在SYN队列中）。请注意，**请先千万别用tcp_syncookies来处理正常的大负载的连接的情况**。因为，synccookies是妥协版的TCP协议，并不严谨。对于正常的请求，你应该调整三个TCP参数可供你选择，第一个是：tcp_synack_retries 可以用他来减少重试次数；第二个是：tcp_max_syn_backlog，可以增大SYN连接数；第三个是：tcp_abort_on_overflow 处理不过来干脆就直接拒绝连接了。

- **关于ISN的初始化**。ISN是不能hard code的，不然会出问题的——比如：如果连接建好后始终用1来做ISN，如果client发了30个segment过去，但是网络断了，于是 client重连，又用了1做ISN，但是之前连接的那些包到了，于是就被当成了新连接的包，此时，client的Sequence Number 可能是3，而Server端认为client端的这个号是30了。全乱了。[RFC793](http://tools.ietf.org/html/rfc793)中说，ISN会和一个假的时钟绑在一起，这个时钟会在每4微秒对ISN做加一操作，直到超过2^32，又从0开始。这样，一个ISN的周期大约是4.55个小时。因为，我们假设我们的TCP Segment在网络上的存活时间不会超过Maximum Segment Lifetime（缩写为MSL – [Wikipedia语条](http://en.wikipedia.org/wiki/Maximum_Segment_Lifetime)），所以，只要MSL的值小于4.55小时，那么，我们就不会重用到ISN。

- **关于 MSL 和 TIME_WAIT**。通过上面的ISN的描述，相信你也知道MSL是怎么来的了。我们注意到，在TCP的状态图中，从TIME_WAIT状态到CLOSED状态，有一个超时设置，这个超时设置是 2*MSL（[RFC793](http://tools.ietf.org/html/rfc793)定义了MSL为2分钟，Linux设置成了30s）为什么要这有TIME_WAIT？为什么不直接给转成CLOSED状态呢？主要有两个原因：1）TIME_WAIT确保有足够的时间让对端收到了ACK，如果被动关闭的那方没有收到Ack，就会触发被动端重发Fin，一来一去正好2个MSL，2）有足够的时间让这个连接不会跟后面的连接混在一起（你要知道，有些自做主张的路由器会缓存IP数据包，如果连接被重用了，那么这些延迟收到的包就有可能会跟新连接混在一起）。你可以看看这篇文章《[TIME_WAIT and its design implications for protocols and scalable client server systems](http://www.serverframework.com/asynchronousevents/2011/01/time-wait-and-its-design-implications-for-protocols-and-scalable-servers.html)》

- **关于TIME_WAIT数量太多**。从上面的描述我们可以知道，TIME_WAIT是个很重要的状态，但是如果在大并发的短链接下，TIME_WAIT 就会太多，这也会消耗很多系统资源。只要搜一下，你就会发现，十有八九的处理方式都是教你设置两个参数，一个叫**tcp_tw_reuse**，另一个叫**tcp_tw_recycle**的参数，这两个参数默认值都是被关闭的，后者recyle比前者resue更为激进，resue要温柔一些。另外，如果使用tcp_tw_reuse，必需设置tcp_timestamps=1，否则无效。这里，你一定要注意，**打开这两个参数会有比较大的坑——可能会让TCP连接出一些诡异的问题**（因为如上述一样，如果不等待超时重用连接的话，新的连接可能会建不上。正如[官方文档](https://www.kernel.org/doc/Documentation/networking/ip-sysctl.txt)上说的一样“**It should not be changed without advice/request of technical experts**”）。

- - **关于tcp_tw_reuse**。官方文档上说tcp_tw_reuse 加上tcp_timestamps（又叫PAWS, for Protection Against Wrapped Sequence Numbers）可以保证协议的角度上的安全，但是你需要tcp_timestamps在两边都被打开（你可以读一下[tcp_twsk_unique](http://lxr.free-electrons.com/ident?i=tcp_twsk_unique)的源码 ）。我个人估计还是有一些场景会有问题。

- - **关于tcp_tw_recycle**。如果是tcp_tw_recycle被打开了话，会假设对端开启了tcp_timestamps，然后会去比较时间戳，如果时间戳变大了，就可以重用。但是，如果对端是一个NAT网络的话（如：一个公司只用一个IP出公网）或是对端的IP被另一台重用了，这个事就复杂了。建链接的SYN可能就被直接丢掉了（你可能会看到connection time out的错误）（如果你想观摩一下Linux的内核代码，请参看源码[ tcp_timewait_state_process](http://lxr.free-electrons.com/ident?i=tcp_timewait_state_process)）。

- - **关于tcp_max_tw_buckets**。这个是控制并发的TIME_WAIT的数量，默认值是180000，如果超限，那么，系统会把多的给destory掉，然后在日志里打一个警告（如：time wait bucket table overflow），官网文档说这个参数是用来对抗DDoS攻击的。也说的默认值180000并不小。这个还是需要根据实际情况考虑。

**Again，使用tcp_tw_reuse和tcp_tw_recycle来解决TIME_WAIT的问题是非常非常危险的，因为这两个参数违反了TCP协议（[RFC 1122](http://tools.ietf.org/html/rfc1122)）** 

其实，TIME_WAIT表示的是你主动断连接，所以，这就是所谓的“不作死不会死”。试想，如果让对端断连接，那么这个破问题就是对方的了，呵呵。另外，如果你的服务器是于HTTP服务器，那么设置一个[HTTP的KeepAlive](http://en.wikipedia.org/wiki/HTTP_persistent_connection)有多重要（浏览器会重用一个TCP连接来处理多个HTTP请求），然后让客户端去断链接（你要小心，浏览器可能会非常贪婪，他们不到万不得已不会主动断连接）。

### 状态机

其实，**网络上的传输是没有连接的，包括TCP也是一样的**。而TCP所谓的“连接”，其实只不过是在通讯的双方维护一个“连接状态”，让它看上去好像有连接一样。所以，TCP的状态变换是非常重要的。

下面是：“**TCP协议的状态机**”（[图片来源](http://www.tcpipguide.com/free/t_TCPOperationalOverviewandtheTCPFiniteStateMachineF-2.htm)） 和 “**TCP建链接**”、“**TCP断链接**”、“**传数据**” 的对照图，我把两个图并排放在一起，这样方便在你对照着看。另外，下面这两个图非常非常的重要，你一定要记牢。

![img](https://i.loli.net/2021/03/06/ZLFvK1TJ4BO56EU.png)

## 滑动窗口

### 滑动窗口算法（Sliding window algorithm)

> Sliding window algorithm is used to perform required operation on specific window size of given large buffer or array.
>
> 滑动窗口算法是在给定特定窗口大小的数组或字符串上执行要求的操作。

> This technique shows how a nested for loop in few problems can be converted to single for loop and hence reducing the time complexity.
>
> 该技术可以将一部分问题中的嵌套循环转变为一个单循环，因此它可以减少时间复杂度。

简而言之，滑动窗口算法在一个特定大小的字符串或数组上进行操作，而不在整个字符串和数组上操作，这样就降低了问题的复杂度，从而也达到降低了循环的嵌套深度。**其实这里就可以看出来滑动窗口主要应用在数组和字符串上。**

如下图所示，设定滑动窗口（window）大小为 3，当滑动窗口每次划过数组时，计算当前滑动窗口中元素的和，得到结果 res。

![滑动窗口算法基本](https://img-blog.csdnimg.cn/20190305164439172.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xtMjc4ODU4NDQ1,size_16,color_FFFFFF,t_70)
可以用来解决一些查找满足一定条件的连续区间的性质（长度等）的问题。由于区间连续，因此当区间发生变化时，可以通过旧有的计算结果对搜索空间进行剪枝，这样便减少了重复计算，降低了时间复杂度。往往类似于“ 请找到满足 xx 的最 x 的区间（子串、子数组）的 xx ”这类问题都可以使用该方法进行解决。

需要注意的是，滑动窗口算法更多的是一种思想，而非某种数据结构的使用。 

# 滑动窗口大体框架

在介绍滑动窗口的框架时候，大家先从字面理解下：

- **滑动：**说明这个窗口是移动的，也就是移动是按照一定方向来的。
- **窗口：**窗口大小并不是固定的，可以不断扩容直到满足一定的条件；也可以不断缩小，直到找到一个满足条件的最小窗口；当然也可以是固定大小。

为了便于理解，这里采用的是字符串来讲解。但是对于数组其实也是一样的。滑动窗口算法的思路是这样：

1. 我们在字符串 S 中使用双指针中的左右指针技巧，初始化 left = right = 0，把索引闭区间 [left, right] 称为一个「窗口」。
2. 我们先不断地增加 right 指针扩大窗口 [left, right]，直到窗口中的字符串符合要求（包含了 T 中的所有字符）。
3. 此时，我们停止增加 right，转而不断增加 left 指针缩小窗口 [left, right]，直到窗口中的字符串不再符合要求（不包含 T 中的所有字符了）。同时，每次增加 left，我们都要更新一轮结果。
4. 重复第 2 和第 3 步，直到 right 到达字符串 S 的尽头。

这个思路其实也不难，第 2 步相当于在寻找一个「可行解」，然后第 3 步在优化这个「可行解」，最终找到最优解。左右指针轮流前进，窗口大小增增减减，窗口不断向右滑动。

下面画图理解一下，needs 和 window 相当于计数器，分别记录 T 中字符出现次数和窗口中的相应字符的出现次数。

初始状态：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019101621574345.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RieV9mcmVlZG9t,size_16,color_FFFFFF,t_70)

增加 right，直到窗口 [left, right] 包含了 T 中所有字符：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191016215752186.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RieV9mcmVlZG9t,size_16,color_FFFFFF,t_70)

现在开始增加 left，缩小窗口 [left, right]。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191016215807735.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RieV9mcmVlZG9t,size_16,color_FFFFFF,t_70)

直到窗口中的字符串不再符合要求，left 不再继续移动。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20191016215824468.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RieV9mcmVlZG9t,size_16,color_FFFFFF,t_70)

之后重复上述过程，先移动 right，再移动 left…… 直到 right 指针到达字符串 S 的末端，算法结束。

如果你能够理解上述过程，恭喜，你已经完全掌握了滑动窗口算法思想。至于如何具体到问题，如何得出此题的答案，都是编程问题，等会提供一套模板，理解一下就会了。

上述过程对于非固定大小的滑动窗口，可以简单地写出如下伪码框架：

```c
string s, t;
    // 在 s 中寻找 t 的「最小覆盖子串」
    int left = 0, right = 0;
    string res = s;
    
    while(right < s.size()) {
        window.add(s[right]);
        right++;
        // 如果符合要求，说明窗口构造完成，移动 left 缩小窗口
        while (window 符合要求) {
            // 如果这个窗口的子串更短，则更新 res
            res = minLen(res, window);
            window.remove(s[left]);
            left++;
        }
    }
    return res;
```

但是，对于固定窗口大小，可以总结如下：

```c
       // 固定窗口大小为 k
        string s;
        // 在 s 中寻找窗口大小为 k 时的所包含最大元音字母个数
        int  right = 0;
	while(right < s.size()) {
        window.add(s[right]);
        right++;
        // 如果符合要求，说明窗口构造完成，
        if (right>=k) {
            // 这是已经是一个窗口了，根据条件做一些事情
           // ... 可以计算窗口最大值等 
            // 最后不要忘记把 right -k 位置元素从窗口里面移除
        }
    }
    return res;
```

可以发现此时不需要依赖 left 指针了。因为窗口固定所以其实就没必要使用left，right 双指针来控制窗口的大小。

其次是对于窗口是固定的，可以轻易获取到 left 的位置，此处 left = right-k;



### TCP滑动窗口

![img](https://i.loli.net/2021/03/05/g8XdxqjWYI13AoB.png)

`滑动窗口协议（Sliding Window Protocol），属于TCP协议的一种应用，用于网络数据传输时的流量控制，以避免拥塞的发生。`该协议允许发送方在停止并等待确认前发送多个数据分组。由于发送方不必每发一个分组就停下来等待确认，因此该协议可以加速数据的传输，提高网络吞吐量。

TCP通过滑动窗口的概念来进行流量控制。设想在发送端发送数据的速度很快而接收端接收速度却很慢的情况下，为了保证数据不丢失，显然需要进行流量控制， 协调好通信双方的工作节奏**。所谓滑动窗口，可以理解成接收端所能提供的缓冲区大小。**TCP利用一个滑动的窗口来告诉发送端对它所发送的数据能提供多大的缓 冲区。由于窗口由16位bit所定义，所以接收端TCP 能最大提供`65535`个字节的缓冲。由此，可以利用窗口大小和第一个数据的序列号计算出最大可接收的数据序列号。 

滑动窗口本质上是描述接受方的TCP数据报缓冲区大小的数据，发送方根据这个数据来计算自己最多能发送多长的数据。如果发送方收到接受方的窗口大小为0的TCP数据报，那么发送方将停止发送数据，等到接受方发送窗口大小不为0的数据报的到来。 

​    `窗口合拢`：当窗口从左边向右边靠近的时候，这种现象发生在数据被发送和确认的时候。  
​    `窗口张开`：当窗口的右边沿向右边移动的时候，这种现象发生在接受端处理了数据以后。  
​    `窗口收缩`：当窗口的右边沿向左边移动的时候，这种现象不常发生。  
​    TCP就是用这个窗口，慢慢的从数据的左边移动到右边，把处于窗口范围内的数据发送出去（但不用发送所有，只是处于窗口内的数据可以发送。）。这就是窗口的意义。窗口的大小是可以通过socket来制定的，4096并不是最理想的窗口大小，而`16384`则可以使吞吐量大大的增加。

**A————C————B**

如上图，A与B之间建立TCP连接，滑动窗口实现有两个作用： 

由于对称性，只考虑A端发送窗口和B端接收窗口，有如下两个作用  

1、B端来不及处理接收数据（控制不同速率主机间的同步），这时，A通过B端通知的接收窗口而减缓数据的发送。  
2、B端来得及处理接收数据，但是在A与B之间某处如C，使得AB之间的整体带宽性能较差，此时，A端根据`拥塞处理策略（慢启动，加倍递减和缓慢增加）`来更新窗口，以决定数据的发送。  

与固定大小的滑窗协议相比，TCP采用可变大小的滑窗协议是为了取得更好的性能。  

**TCP是一个广域网协议，而广域网环境下的路由器和主机，各自有着不同的性能和处理能力，在这种情况下，采用固定窗口大小的滑窗协议会引起性能上的损失。TCP规定窗口的大小是由接收方通告的，通过采取慢启动和拥塞避免算法等机制来使带宽和性能取得最佳。**

1. “窗口”对应的是一段可以被发送者发送的字节序列，其连续的范围称之为“窗口”；

2. “滑动”则是指这段“允许发送的范围”是可以随着发送的过程而变化的，方式就是按顺序“滑动”。

   1.TCP协议的两端分别为发送者A和接收者B，由于是`全双工协议`，因此A和B应该分别维护着一个独立的发送缓冲区和接收缓冲区，由于对等性（A发B收和B发A收），我们以A发送B接收的情况作为例子；

   2.发送窗口是发送缓存中的一部分，是可以被TCP协议发送的那部分，其实应用层需要发送的所有数据都被放进了发送者的发送缓冲区；

   3.发送窗口中相关的有四个概念：已发送并收到确认的数据（不再发送窗口和发送缓冲区之内）、已发送但未收到确认的数据（位于发送窗口之中）、允许发送但尚未发送的数据以及发送窗口外发送缓冲区内暂时不允许发送的数据

   4. 每次成功发送数据之后，发送窗口就会在发送缓冲区中按顺序移动，将 新的数据包含到窗口中准备发送；

TCP建立连接的初始，B会告诉A自己的接收窗口大小，比如为‘20’：字节31-50为发送窗口。

![img](https://images2017.cnblogs.com/blog/1232796/201710/1232796-20171016103216771-1670044829.png)

根据B给出窗口值，A构造自己的窗口

A发送11个字节后，发送窗口位置不变，B接收到了乱序的数据分组：

![img](https://images2017.cnblogs.com/blog/1232796/201710/1232796-20171016103229927-547362366.png)

A发了11个字节数据

只有当A成功发送了数据，即发送的数据得到了B的确认之后，才会移动滑动窗口离开已发送的数据；同时B则确认连续的数据分组，对于乱序的分组则先接收下来，避免网络重复传递：

![img](https://images2017.cnblogs.com/blog/1232796/201710/1232796-20171016103247631-88673213.png)

A收到新的确认号，窗口向前滑动

![img](https://images2017.cnblogs.com/blog/1232796/201710/1232796-20171016103307521-1996996021.png)

发送窗口内的序号都属于已发送但未被确认

> 所谓流量控制，主要是接收方传递信息给发送方，使其不要发送数据太快，是一种端到端的控制。主要的方式就是返回的ACK中会包含自己的接收窗口的大小，并且利用大小来控制发送方的数据发送：

![img](https://images2017.cnblogs.com/blog/1232796/201710/1232796-20171016103322162-1872321900.png)

> 这里面涉及到一种情况，如果B已经告诉A自己的缓冲区已满，于是A停止发送数据；等待一段时间后，B的缓冲区出现了富余，于是给A发送报文告诉A我的rwnd大小为400，但是这个报文不幸丢失了，于是就出现A等待B的通知||B等待A发送数据的死锁状态。为了处理这种问题，`TCP引入了持续计时器（Persistence timer）`，当A收到对方的零窗口通知时，就启用该计时器，时间到则发送一个1字节的探测报文，对方会在此时回应自身的接收窗口大小，如果结果仍未0，则重设持续计时器，继续等待。

###  Zero Window

如果Window变成0了，TCP会怎么样？是不是发送端就不发数据了？是的，发送端就不发数据了，你可以想像成“Window Closed”，那你一定还会问，如果发送端不发数据了，接收方一会儿Window size 可用了，怎么通知发送端呢？

解决这个问题，TCP使用了Zero Window Probe技术，缩写为ZWP，也就是说，发送端在窗口变成0后，会发ZWP的包给接收方，让接收方来ack他的Window尺寸，一般这个值会设置成3次，第次大约30-60秒（不同的实现可能会不一样）。如果3次过后还是0的话，有的TCP实现就会发RST把链接断了。

**注意**：只要有等待的地方都可能出现DDoS攻击，Zero Window也不例外，一些攻击者会在和HTTP建好链发完GET请求后，就把Window设置为0，然后服务端就只能等待进行ZWP，于是攻击者会并发大量的这样的请求，把服务器端的资源耗尽。（关于这方面的攻击，大家可以移步看一下[Wikipedia的SockStress词条](http://en.wikipedia.org/wiki/Sockstress)）

另外，Wireshark中，你可以使用tcp.analysis.zero_window来过滤包，然后使用右键菜单里的follow TCP stream，你可以看到ZeroWindowProbe及ZeroWindowProbeAck的包。



###  Silly Window Syndrome

Silly Window Syndrome翻译成中文就是“糊涂窗口综合症”。正如你上面看到的一样，如果我们的接收方太忙了，来不及取走Receive Windows里的数据，那么，就会导致发送方越来越小。到最后，如果接收方腾出几个字节并告诉发送方现在有几个字节的window，而我们的发送方会义无反顾地发送这几个字节。

要知道，我们的TCP+IP头有40个字节，为了几个字节，要达上这么大的开销，这太不经济了。

另外，你需要知道网络上有个MTU，对于以太网来说，MTU是1500字节，除去TCP+IP头的40个字节，真正的数据传输可以有1460，这就是所谓的MSS（Max Segment Size）注意，TCP的RFC定义这个MSS的默认值是536，这是因为 [RFC 791](http://tools.ietf.org/html/rfc791)里说了任何一个IP设备都得最少接收576尺寸的大小（实际上来说576是拨号的网络的MTU，而576减去IP头的20个字节就是536）。

**如果你的网络包可以塞满MTU，那么你可以用满整个带宽，如果不能，那么你就会浪费带宽**。（大于MTU的包有两种结局，一种是直接被丢了，另一种是会被重新分块打包发送） 你可以想像成一个MTU就相当于一个飞机的最多可以装的人，如果这飞机里满载的话，带宽最高，如果一个飞机只运一个人的话，无疑成本增加了，也而相当二。

所以，**Silly Windows Syndrome这个现像就像是你本来可以坐200人的飞机里只做了一两个人**。 要解决这个问题也不难，就是避免对小的window size做出响应，直到有足够大的window size再响应，这个思路可以同时实现在sender和receiver两端。

- 如果这个问题是由Receiver端引起的，那么就会使用 David D Clark’s 方案。在receiver端，如果收到的数据导致window size小于某个值，可以直接ack(0)回sender，这样就把window给关闭了，也阻止了sender再发数据过来，等到receiver端处理了一些数据后windows size 大于等于了MSS，或者，receiver buffer有一半为空，就可以把window打开让send 发送数据过来。

- 如果这个问题是由Sender端引起的，那么就会使用著名的 [Nagle’s algorithm](http://en.wikipedia.org/wiki/Nagle's_algorithm)。这个算法的思路也是延时处理，他有两个主要的条件：1）要等到 Window Size>=MSS 或是 Data Size >=MSS，2）收到之前发送数据的ack回包，他才会发数据，否则就是在攒数据。

另外，Nagle算法默认是打开的，所以，对于一些需要小包场景的程序——**比如像telnet或ssh这样的交互性比较强的程序，你需要关闭这个算法**。你可以在Socket设置TCP_NODELAY选项来关闭这个算法（关闭Nagle算法没有全局参数，需要根据每个应用自己的特点来关闭）

```c
setsockopt(sock_fd, IPPROTO_TCP, TCP_NODELAY, (char*)&value,sizeof(**int**));
```

另外，网上有些文章说TCP_CORK的socket option是也关闭Nagle算法，这不对。**TCP_CORK其实是更新激进的Nagle算法，完全禁止小包发送，而Nagle算法没有禁止小包发送，只是禁止了大量的小包发送**。最好不要两个选项都设置。



#### **传递效率**

​	一个显而易见的问题是：单个发送字节单个确认，和窗口有一个空余即通知发送方发送一个字节，无疑增加了网络中的许多不必要的报文（请想想为了一个字节数据而添加的40字节头部吧！），所以我们的原则是:

​	a.尽可能一次多发送几个字节;

​	b:或者窗口空余较多的时候通知发送方一次发送多个字节。

​	对于前者a我们广泛使用`Nagle算法`，即：
​		*1. 若发送应用进程要把发送的数据逐个字节地送到TCP的发送缓存，则发送方就把第一个数据字节先发送出去，把后面的字节先缓存起来；
​		*2. 当发送方收到第一个字节的确认后（也得到了网络情况和对方的接收窗口大小），再把缓冲区的剩余字节组成合适大小的报文发送出去；
​		*3. 当到达的数据已达到发送窗口大小的一半或以达到报文段的最大长度时，就立即发送一个报文段；
​	对于后者b我们往往的做法是让接收方等待一段时间，或者接收方获得足够的空间容纳一个报文段或者等到接受缓存有一半空闲的时候，再通知发送方发送数据。





#### **拥塞控制**



​       网络中的`链路容量`和交换结点中的缓存和处理机都有着工作的极限，**当网络的需求超过它们的工作极限时，就出现了拥塞。拥塞控制就是防止过多的数据注入到网络中，这样可以使网络中的路由器或链路不致过载。**

所以，TCP不能忽略网络上发生的事情，而无脑地一个劲地重发数据，对网络造成更大的伤害。对此TCP的设计理念是：**TCP不是一个自私的协议，当拥塞发生的时候，要做自我牺牲。就像交通阻塞一样，每个车都应该把路让出来，而不要再去抢路了。**

关于拥塞控制的论文请参看《[Congestion Avoidance and Control](http://ee.lbl.gov/papers/congavoid.pdf)》(PDF)

拥塞控制主要是四个算法：**1）慢启动**，**2）拥塞避免**，**3）拥塞发生**，**4）快速恢复**。这四个算法不是一天都搞出来的，这个四算法的发展经历了很多时间，到今天都还在优化中。 备注:

- 1988年，TCP-Tahoe 提出了1）慢启动，2）拥塞避免，3）拥塞发生时的快速重传
- 1990年，TCP Reno 在Tahoe的基础上增加了4）快速恢复

常用的方法就是：

##### 慢开始

> - 慢开始、拥塞控制
>
> - 快重传、快恢复
>
>    一切的基础还是`慢开始`，这种方法的思路是这样的：
>   -1. 发送方维持一个叫做“拥塞窗口”的变量，该变量和接收端口共同决定了发送者的发送窗口；
>   -2. 当主机开始发送数据时，避免一下子将大量字节注入到网络，造成或者增加拥塞，选择发送一个1字节的试探报文；
>   -3. 当收到第一个字节的数据的确认后，就发送2个字节的报文；
>   -4. 若再次收到2个字节的确认，则发送4个字节，依次递增2的指数级；
>   -5. 最后会达到一个提前预设的“慢开始门限”，比如24，即一次发送了24个分组，此时遵循下面的条件判定：(cwnd = crowde window ssthresh = slow start threshold)
>        *a. cwnd < ssthresh， 继续使用慢开始算法；
>        *b. cwnd > ssthresh，停止使用慢开始算法，改用拥塞避免算法；
>        *c. cwnd = ssthresh，既可以使用慢开始算法，也可以使用拥塞避免算法；
>   -6. 所谓拥塞避免算法就是：每经过一个往返时间RTT就把发送方的拥塞窗口+1，即让拥塞窗口缓慢地增大，按照线性规律增长；
>   -7. 当出现网络拥塞，比如丢包时，将慢开始门限设为原先的一半，然后将cwnd设为1，执行慢开始算法（较低的起点，指数级增长）；

![img](https://i.loli.net/2021/03/05/n1uREYFtrJpOBl9.png)

**上述方法的目的是在拥塞发生时循序减少主机发送到网络中的分组数，使得发生拥塞的路由器有足够的时间把队列中积压的分组处理完毕**。`慢开始和拥塞控制`算法常常作为一个整体使用，而`快重传和快恢复`则是为了减少因为拥塞导致的数据包丢失带来的重传时间，从而避免传递无用的数据到网络。

##### 快重传

快重传的机制是：
-1. 接收方建立这样的机制，如果一个包丢失，则对后续的包继续发送针对该包的重传请求；
-2. 一旦发送方接收到三个一样的确认，就知道该包之后出现了错误，立刻重传该包；
-3. 此时发送方开始执行“快恢复”算法：
    *1. 慢开始门限减半；
    *2. cwnd设为慢开始门限减半后的数值；
    *3. 执行拥塞避免算法（高起点，线性增长）；

TCP引入了一种叫**Fast Retransmit** 的算法，**不以时间驱动，而以数据驱动重传**。也就是说，如果，包没有连续到达，就ack最后那个可能被丢了的包，如果发送方连续收到3次相同的ack，就重传。Fast Retransmit的好处是不用等timeout了再重传。

比如：如果发送方发出了1，2，3，4，5份数据，第一份先到送了，于是就ack回2，结果2因为某些原因没收到，3到达了，于是还是ack回2，后面的4和5都到了，但是还是ack回2，因为2还是没有收到，于是发送端收到了三个ack=2的确认，知道了2还没有到，于是就马上重转2。然后，接收端收到了2，此时因为3，4，5都收到了，于是ack回6。示意图如下：

![img](https://i.loli.net/2021/03/06/sDRqigS8jCfd3ZO.png)

Fast Retransmit只解决了一个问题，就是timeout的问题，它依然面临一个艰难的选择，就是，是重传之前的一个还是重传所有的问题。对于上面的示例来说，是重传#2呢还是重传#2，#3，#4，#5呢？因为发送端并不清楚这连续的3个ack(2)是谁传回来的？也许发送端发了20份数据，是#6，#10，#20传来的呢。这样，发送端很有可能要重传从2到20的这堆数据（这就是某些TCP的实际的实现）。可见，这是一把双刃剑。

##### 快速恢复

**TCP Reno**

这个算法定义在[RFC5681](http://tools.ietf.org/html/rfc5681)。快速重传和快速恢复算法一般同时使用。快速恢复算法是认为，你还有3个Duplicated Acks说明网络也不那么糟糕，所以没有必要像RTO超时那么强烈。 注意，正如前面所说，进入Fast Recovery之前，cwnd 和 sshthresh已被更新：

- cwnd = cwnd /2
- sshthresh = cwnd

然后，真正的Fast Recovery算法如下：

- cwnd = sshthresh  + 3 * MSS （3的意思是确认有3个数据包被收到了）
- 重传Duplicated ACKs指定的数据包
- 如果再收到 duplicated Acks，那么cwnd = cwnd +1
- 如果收到了新的Ack，那么，cwnd = sshthresh ，然后就进入了拥塞避免的算法了。

如果你仔细思考一下上面的这个算法，你就会知道，**上面这个算法也有问题，那就是——它依赖于3个重复的Acks**。注意，3个重复的Acks并不代表只丢了一个数据包，很有可能是丢了好多包。但这个算法只会重传一个，而剩下的那些包只能等到RTO超时，于是，进入了恶梦模式——超时一个窗口就减半一下，多个超时会超成TCP的传输速度呈级数下降，而且也不会触发Fast Recovery算法了。

通常来说，正如我们前面所说的，SACK或D-SACK的方法可以让Fast Recovery或Sender在做决定时更聪明一些，但是并不是所有的TCP的实现都支持SACK（SACK需要两端都支持），所以，需要一个没有SACK的解决方案。而通过SACK进行拥塞控制的算法是FACK（后面会讲）

**TCP New Reno**

于是，1995年，TCP New Reno（参见 [RFC 6582](http://tools.ietf.org/html/rfc6582) ）算法提出来，主要就是在没有SACK的支持下改进Fast Recovery算法的——

- 当sender这边收到了3个Duplicated Acks，进入Fast Retransimit模式，开发重传重复Acks指示的那个包。如果只有这一个包丢了，那么，重传这个包后回来的Ack会把整个已经被sender传输出去的数据ack回来。如果没有的话，说明有多个包丢了。我们叫这个ACK为Partial ACK。

- 一旦Sender这边发现了Partial ACK出现，那么，sender就可以推理出来有多个包被丢了，于是乎继续重传sliding window里未被ack的第一个包。直到再也收不到了Partial Ack，才真正结束Fast Recovery这个过程

我们可以看到，这个“Fast Recovery的变更”是一个非常激进的玩法，他同时延长了Fast Retransmit和Fast Recovery的过程。



##### sack方法

另外一种更好的方式叫：**Selective Acknowledgment (SACK)**（参看[RFC 2018](http://tools.ietf.org/html/rfc2018)），这种方式需要在TCP头里加一个SACK的东西，ACK还是Fast Retransmit的ACK，SACK则是汇报收到的数据碎版。参看下图：

![img](https://i.loli.net/2021/03/06/P2TB4SFYZUnewEI.jpg)

这样，在发送端就可以根据回传的SACK来知道哪些数据到了，哪些没有到。于是就优化了Fast Retransmit的算法。当然，这个协议需要两边都支持。在 Linux下，可以通过**tcp_sack**参数打开这个功能（Linux 2.4后默认打开）。

这里还需要注意一个问题——**接收方Reneging，所谓Reneging的意思就是接收方有权把已经报给发送端SACK里的数据给丢了**。这样干是不被鼓励的，因为这个事会把问题复杂化了，但是，接收方这么做可能会有些极端情况，比如要把内存给别的更重要的东西。**所以，发送方也不能完全依赖SACK，还是要依赖ACK，并维护Time-Out，如果后续的ACK没有增长，那么还是要把SACK的东西重传，另外，接收端这边永远不能把SACK的包标记为Ack。**

注意：SACK会消费发送方的资源，试想，如果一个攻击者给数据发送方发一堆SACK的选项，这会导致发送方开始要重传甚至遍历已经发出的数据，这会消耗很多发送端的资源。详细的东西请参看《[TCP SACK的性能权衡](http://www.ibm.com/developerworks/cn/linux/l-tcp-sack/)》

##### Duplicate SACK – 重复收到数据的问题

Duplicate SACK又称D-SACK，**其主要使用了SACK来告诉发送方有哪些数据被重复接收了**。[RFC-2883 ](http://www.ietf.org/rfc/rfc2883.txt)里有详细描述和示例。下面举几个例子（来源于[RFC-2883](http://www.ietf.org/rfc/rfc2883.txt)）

D-SACK使用了SACK的第一个段来做标志，

- 如果SACK的第一个段的范围被ACK所覆盖，那么就是D-SACK

- 如果SACK的第一个段的范围被SACK的第二个段覆盖，那么就是D-SACK

**示例一：ACK丢包**

下面的示例中，丢了两个ACK，所以，发送端重传了第一个数据包（3000-3499），于是接收端发现重复收到，于是回了一个SACK=3000-3500，因为ACK都到了4000意味着收到了4000之前的所有数据，所以这个SACK就是D-SACK——旨在告诉发送端我收到了重复的数据，而且我们的发送端还知道，数据包没有丢，丢的是ACK包。

```bash
  Transmitted  Received    ACK Sent
  Segment      Segment     (Including SACK Blocks)

  3000-3499    3000-3499   3500 (ACK dropped)
  3500-3999    3500-3999   4000 (ACK dropped)
  3000-3499    3000-3499   4000, SACK=3000-3500
                                        ---------
```



 **示例二，网络延误**

下面的示例中，网络包（1000-1499）被网络给延误了，导致发送方没有收到ACK，而后面到达的三个包触发了“Fast Retransmit算法”，所以重传，但重传时，被延误的包又到了，所以，回了一个SACK=1000-1500，因为ACK已到了3000，所以，这个SACK是D-SACK——标识收到了重复的包。

这个案例下，发送端知道之前因为“Fast Retransmit算法”触发的重传不是因为发出去的包丢了，也不是因为回应的ACK包丢了，而是因为网络延时了。

```bash
    Transmitted    Received    ACK Sent
    Segment        Segment     (Including SACK Blocks)

    500-999        500-999     1000
    1000-1499      (delayed)
    1500-1999      1500-1999   1000, SACK=1500-2000
    2000-2499      2000-2499   1000, SACK=1500-2500
    2500-2999      2500-2999   1000, SACK=1500-3000
    1000-1499      1000-1499   3000
                   1000-1499   3000, SACK=1000-1500
                                          ---------
```



可见，引入了D-SACK，有这么几个好处：

1）可以让发送方知道，是发出去的包丢了，还是回来的ACK包丢了。

2）是不是自己的timeout太小了，导致重传。

3）网络上出现了先发的包后到的情况（又称reordering）

4）网络上是不是把我的数据包给复制了。

#### TCP网络控制算法



##### RTT算法

在上面的TCP重传机制中，了解到timeout设置的重要性

- 设长了，重发就慢，丢了老半天才重发，没有效率，性能差；
- 设短了，会导致可能并没有丢就重发。于是重发的就快，会增加网络拥塞，导致更多的超时，更多的超时导致更多的重发。

这个超时时间在不同的网络的情况下，根本没有办法设置一个死的值。只能动态地设置。 为了动态地设置，TCP引入了`RTT——Round Trip Time`，也就是一个数据包从发出去到回来的时间。这样发送端就大约知道需要多少的时间，从而可以方便地设置`Timeout——RTO（Retransmission TimeOut）`，以让我们的重传机制更高效。 听起来似乎很简单，好像就是在发送端发包时记下t0，然后接收端再把这个ack回来时再记一个t1，于是RTT = t1 – t0。没那么简单，这只是一个采样，不能代表普遍情况。

###### 经典算法

[RFC793](http://tools.ietf.org/html/rfc793) 中定义的经典算法是这样的：

1）首先，先采样RTT，记下最近好几次的RTT值。

2）然后做平滑计算SRTT（ Smoothed RTT）。公式为：（其中的 α 取值在0.8 到 0.9之间，这个算法英文叫Exponential weighted moving average，中文叫：加权移动平均）

​										**SRTT = ( α \* SRTT ) + ((1- α) \* RTT)**

3）开始计算RTO。公式如下：

​						**RTO = min [ UBOUND,  max [ LBOUND,  (β \* SRTT) ]  ]**

其中：

- UBOUND是最大的timeout时间，上限值
- LBOUND是最小的timeout时间，下限值
- β 值一般在1.3到2.0之间。

###### Karn / Partridge 算法

但是上面的这个算法在重传的时候会出有一个终极问题——你是用第一次发数据的时间和ack回来的时间做RTT样本值，还是用重传的时间和ACK回来的时间做RTT样本值？

这个问题无论你选那头都是按下葫芦起了瓢。 如下图所示：

- 情况（a）是ack没回来，所以重传。如果你计算第一次发送和ACK的时间，那么，明显算大了。
- 情况（b）是ack回来慢了，但是导致了重传，但刚重传不一会儿，之前ACK就回来了。如果你是算重传的时间和ACK回来的时间的差，就会算短了。

![img](https://i.loli.net/2021/03/06/W6vm4DHBYzrlVtR.jpg)

所以1987年的时候，搞了一个叫[Karn / Partridge Algorithm](http://en.wikipedia.org/wiki/Karn's_Algorithm)，这个算法的最大特点是——**忽略重传，不把重传的RTT做采样**（你看，你不需要去解决不存在的问题）。

但是，这样一来，又会引发一个大BUG——**如果在某一时间，网络闪动，突然变慢了，产生了比较大的延时，这个延时导致要重转所有的包（因为之前的RTO很小），于是，因为重转的不算，所以，RTO就不会被更新，这是一个灾难**。 于是Karn算法用了一个取巧的方式——只要一发生重传，就对现有的RTO值翻倍（这就是所谓的 Exponential backoff），很明显，这种死规矩对于一个需要估计比较准确的RTT也不靠谱。



###### Jacobson / Karels 算法

前面两种算法用的都是“加权移动平均”，这种方法最大的毛病就是如果RTT有一个大的波动的话，很难被发现，因为被平滑掉了。所以，1988年，又有人推出来了一个新的算法，这个算法叫Jacobson / Karels Algorithm（参看[RFC6289](http://tools.ietf.org/html/rfc6298)）。这个算法引入了最新的RTT的采样和平滑过的SRTT的差距做因子来计算。 公式如下：（其中的DevRTT是Deviation RTT的意思）

**SRTT= SRTT+ α (RTT – SRTT)**  —— 计算平滑RTT

**DevRTT= (1-β)\*DevRTT+ β\*(|RTT-SRTT|)** ——计算平滑RTT和真实的差距（加权移动平均）

**RTO= µ \* SRTT + ∂ \*DevRTT**—— 神一样的公式

（其中：在Linux下，α = 0.125，β = 0.25， μ = 1，∂ = 4 ——这就是算法中的“调得一手好参数”，nobody knows why, it just works…） 最后的这个算法在被用在今天的TCP协议中（Linux的源代码在：[tcp_rtt_estimator](http://lxr.free-electrons.com/source/net/ipv4/tcp_input.c?v=2.6.32#L609)）。





实际上，对于窗口的构造是很重要的。具体可以看下面的实例。

# 算法实例

## [1208. 尽可能使字符串相等](https://leetcode-cn.com/problems/get-equal-substrings-within-budget/)

给你两个长度相同的字符串，s 和 t。

将 s 中的第 i 个字符变到 t 中的第 i 个字符需要 |s[i] - t[i]| 的开销（开销可能为 0），也就是两个字符的 ASCII 码值的差的绝对值。

用于变更字符串的最大预算是 maxCost。在转化字符串时，总开销应当小于等于该预算，这也意味着字符串的转化可能是不完全的。

如果你可以将 s 的子字符串转化为它在 t 中对应的子字符串，则返回可以转化的最大长度。

如果 s 中没有子字符串可以转化成 t 中对应的子字符串，则返回 0。

**示例 1：**

```
输入：s = "abcd", t = "bcdf", cost = 3
输出：3
解释：s 中的 "abc" 可以变为 "bcd"。开销为 3，所以最大长度为 3。
```

**示例 2：**

```
输入：s = "abcd", t = "cdef", cost = 3
输出：1
解释：s 中的任一字符要想变成 t 中对应的字符，其开销都是 2。因此，最大长度为 1。
```

**示例 3：**

```
输入：s = "abcd", t = "acde", cost = 0
输出：1
解释：你无法作出任何改动，所以最大长度为 1。 
```

### 代码



由于 `diff` 的的每个元素都是非负的，因此可以用滑动窗口的方法得到符合要求的最长子数组的长度。

滑动窗口的思想是，维护两个指针 `start` 和 `end` 表示数组 `diff` 的子数组的开始下标和结束下标，满足子数组的元素和不超过 `maxCost`，子数组的长度是 `end−start+1`。初始时，`start` 和 `end` 的值都是 `0`。

另外还要维护子数组的元素和 `sum`，初始值为 `0`。在移动两个指针的过程中，更新 `sum` 的值，判断子数组的元素和是否大于 `maxCost`，并决定应该如何移动指针。

为了得到符合要求的最长子数组的长度，应遵循以下两点原则：

* 当 `start` 的值固定时，`end` 的值应尽可能大；

* 当 `end` 的值固定时，`start` 的值应尽可能小。

基于上述原则，滑动窗口的做法如下：

* 1. 将 `diff[end]` 的值加到 `sum`；

* 2. 如果  `sum≤maxCost`，则子数组的元素和不超过 `maxCost`，使用当前子数组的长度 `end−start+1` 更新最大子数组的长度；

* 3. 如果 `sum>maxCost`，则子数组的元素和大于 `maxCost`，需要向右移动指针 `start` 并同时更新 `sum` 的值，直到  `sum≤maxCost`，此时子数组的元素和不超过 `maxCost`，使用子数组的长度`end−start+1` 更新最大子数组的长度；

* 4. 将指针 end 右移一位，重复上述步骤，直到 end 超出数组下标范围。

遍历结束之后，即可得到符合要求的最长子数组的长度，即字符串可以转化的最大长度。

```js
var equalSubstring = function(s,t,maxCost){
    const n = s.length;
    const diff = new Array(n).fill(0);
    for(let i=0;i<n;i++){
        diff[i] = Math.abs(s[i].charCodeAt()-t[i].charCodeAt());
    }
    let maxLength = 0;
    let start = 0, end = 0;
    let sum = 0;
    while(end<n){
        sum+=diff[end];  // 向右移动 加入差值
        while(sum>maxCost){ //超出最大的允许值
            执行上面的3
	    sum -=diff[start]; // start往前移动 减去前面的差值
            start++; // 向前移动
        }
        maxLength = Math.max(maxLength,end-start+1);
        end++;
    }
    return maxLength;
};
```

**复杂度分析**

* 时间复杂度：`O(n)`，其中 n 是字符串的长度。
  计算数组 `diff` 的时间复杂度是 `O(n)`。
  遍历数组的过程中，两个指针的移动次数都不会超过 `n` 次。
  因此总时间复杂度是 `O(n)`。

* 空间复杂度：`O(n)`，其中 `n` 是字符串的长度。需要创建长度为 `n` 的数组 `diff`。



### 参考

[1.滑动窗口算法基本原理与实践](https://www.cnblogs.com/huansky/p/13488234.html)(https://www.cnblogs.com/huansky/p/13488234.html)

[2.leetcode](https://leetcode-cn.com/problems/get-equal-substrings-within-budget/solution/jin-ke-neng-shi-zi-fu-chuan-xiang-deng-b-higz/)

[3.TCP滑动窗口](https://www.cnblogs.com/alifpga/p/7675850.html)

[4.TCP协议的滑动窗口具体是怎样控制流量的？](https://www.zhihu.com/question/32255109)

 [酷 壳 – CoolShell:](https://coolshell.cn/)

[5.TCP 的那些事儿（上）](https://coolshell.cn/articles/11564.html#%E5%BF%AB%E9%80%9F%E9%87%8D%E4%BC%A0%E6%9C%BA%E5%88%B6)

[6.TCP 的那些事儿（下）](https://coolshell.cn/articles/11609.html)



## 累计积分

面试问题：TCP的可靠性，超时重传怎么实现，M1,M2,M3,M4,M5，丢失M2；怎么重传M2？为什么不用重传M4,M5？

因为每个TCP报文被发送时，都会设置一个重传定时器，若定时期到了还没收到ack包，则应重传。为什么不用重传M4,M5？则可由此文回答：因为采用了累积确认。有例如下：

Server 发送80个字节 Part1，seq = 1

Server 发送120个字节Part2，Seq = 81

Server发送160个字节Part3，Seq = 201，此包由于其他原因丢失

Client收到前2个报文段，并发送ACK = 201

Server发送140个字节Part4， Seq = 361

Server收到Client对于前两个报文段的ACK，将2个报文从窗口中移除，窗口有200个字节的余量

报文3的重传定时器到期，没有收到ACK，进行重传

这个时候Client已经收到报文4，存放在缓冲区中，也不会发送ACK【累计通知，发送ACK就表示3也收到了】，等待报文3，报文3收到之后，一块对3,4进行确认

Server收到确认之后，将报文3,4移除窗口，所有数据发送完成



### 参考

[TCP超时重传和累积确认怎么理解？](https://www.zhihu.com/question/414447339)

[TCP的超时重传和累积确认](https://blog.csdn.net/qq_23204557/article/details/99258199)



## 分组缓存

**（1）数据报大小
**IPv4的数据报最大大小是65535字节，包括IPv4首部。因为首部中说明大小的字段为16位。
IPv6的数据报最大大小是65575字节，包括40字节的IPv6首部。同样是展16位，但是IPv6首部大小不算在里面，所以总大小比IPv4大一个首部（40字节）。

**（2）MTU
**许多网络有一个可由硬件规定的MTU。以太网的MTU为1500字节。有一些链路的MTU的MTU可以由认为配置。IPv4要求的最小 链路MTU为68字节。这允许最大的IPv4首部（包括20字节的固定长度部分和最多40字节的选项部分）拼接最小的片段（IPv4首部中片段偏移字段以 8个字节为单位）IPv6要求的最小链路MTU为1280字节。

**（3）分片（fragmentation）
**当一个IP数据报从某个接口送出时，如果它的大小超过相应链路的MTU，IPv4和IPv6都将执行分片。这些片段在到达终点之前通常 不会被重组（reassembling）。IPv4主机对其产生的数据报执行分片，IPv4路由器则对其转发的数据报进行分片。然后IPv6只有主机对其 产生的数据报执行分片，IPv6路由器不对其转发的数据报执行分片。

IPv4首部的“不分片”（do not fragment）位（即DF位）若被设置，那么不管是发送这些数据报的主机还是转发他们的路由器，都不允许对它们分片。当路由器接收到一个超过其外出链 路MTU大小且设置了DF位的IPv4数据报时，它将产生一个ICMPv4“destination unreachable,fragmentation needed but DF bit set”（目的不可到达，需分片但DF位已设置）的出错消息。

既然IPv6路由器不执行分片，每个IPv6数据报于是隐含一个DF位。当IPv6路由器接收到一个超过其外出链路MTU大小的IPv6数据报时， 它将产生一个ICMPv6 “packet too big”的出错消息。IPv4的DF位和隐含DF位可用于路径MTU发现。

**（4）最小重组缓冲区大小（minimum reassembly buffer size）
**IPv4和IPv6都定义了最小缓冲区大小，它是IPv4或IPv6任何实现都必须保重支持的最小数据报大小。其值对IPv4为576 字节，对于IPv6为1500字节。例如，对于IPv4而言，我们不能判定某个给定的目的能否接受577字节的数据报，为此很多应用避免产生大于这个大小 的数据报。

**（5）MSS（maximun segment size）
**TCP有一个最大分段大小，用于对端TCP通告对端每个分段中能发送的最大TCP数据量。MSS的目的是告诉对端其重组缓冲区大小的实 际值，从而避免分片。MSS经常设计成MTU减去IP和TCP首部的固定长度。以太网中使用IPv4MSS值为1460，使用IPv6的MSS值为 1440（两者TCP首部都是20字节，但是IPv6首部是40字节，IPv4首部是20字节）。

**（6）TCP发送缓冲区
**每个TCP套接字有一个发送缓冲区，我们可以用SO_SNDBUF套接字选项来更改该缓冲区的大小。当某个应用进程调用write时， 内核从该应用进程的缓冲区复制所有数据到缩写套接

字的发送缓冲区。如果该套接字的发送缓冲区容不下该应用进程的所有数据（或是应用进程的缓冲区大于套接字 的发送缓冲区，或是套接字的发送缓冲区中已有其他数据），该应用进程将被投入睡眠。这里假设该套接字是阻塞的，它通常是默认设置。内核将不从write系 统调用返回，直到应用进程缓冲区中的所有数据都复制到套接字发送缓冲区。因此，从写一个TCP套接字的write调用成功返回仅仅表示我们可以重新使用原 来的应用进程缓冲区，并不表明对端的TCP或应用进程已接受到数据。

这一端的TCP提取套接字发送缓冲区中的数据并把它发送给对端的TCP，其过程基于TCP数据传送的所有规则。对端TCP必须确认收到的数据，伴随 来自对端的ACK的不断到达，本段TCP至此才能从套接字发送缓冲区中丢弃已确认的数据。TCP必须为已发送的数据保留一个副本，直到它被对端确认为止。 本端TCP以MSS大小或是更小的块把数据传递给IP，同时给每个数据块安上一个TCP首部以构成TCP分节，其中MSS或是由对端告知的值，或是 536（若未发送一个MSS选项为576-TCP首部-IP首部）。IP给每个TCP分节安上一个IP首部以构成IP数据报，并按照其目的的IP地址查找 路由表项以确定外出接口，然后把数据报传递给相应的数据链路。每个数据链路都有一个数据队列，如果该队列已满，那么新到的分组将被丢弃，并沿协议栈向上返 回一个错误：从数据链路到IP，在从IP到TCP。TCP将注意到这个错误，并在以后某个时候重传相应的分节。应用程序不知道这种暂时的情况。

**（7）UDP发送缓冲区
**任何UDP套接字都有发送缓冲区大小（我们可以用SO_SNDBUF套接字选项更改它），不过它仅仅是可写道套接字UDP数据报大小上 限。如果一个应用进程写一个大于套接字发送缓冲区大小的数据报，内核将返回该进程一个EMSGSIZE错误。既然UDP是不可靠的，它不必保存应用进程数 据的一个副本，因此无需一个真正的发送缓冲区。（应用进程的数据在沿协议栈向下传递时，通常被复制到某种格式的一个内核缓冲区中，然而当该数据被发送之 后，这个副本被数据链路层丢弃了。）

UDP简单地给来自用户的数据报安上8字节首部以构成UDP数据报，然后传递给IP。IPv4或IPv6给UDP数据报安上相应的IP首部以构成 IP数据报，执行路由操作确定外出接口，然后或者直接把数据报加入数据链路层输出队列（如果适合于MTU），或者分片后在把每个片段加入数据集链路层的输 出队列。如果某个UDP进程发送大数据报，那么它们相比TCP应用数据更有可能被分片，因为TCP会把应用数据划分成MSS大小的块，而UDP却没有对等 的手段。

从写一个UDP套接字的write调用成功返回表示所写的数据报或其所有片段已被加入数据链路层的输出队列。如果该队列没有足够的空间存放该数据报 或它的某个片段，内核通常会返回一个ENOBUFS错误给它的应用进程。有些UDP实现不返回这种错误，这样甚至数据报未经发送就被丢弃的情况进程也不知 道。

[[TCP/IP学习（四）TCP缓冲区大小及限制](https://www.cnblogs.com/zhuwbox/p/3430877.html)](https://www.cnblogs.com/zhuwbox/p/3430877.html)

## 流量控制



### [RFC](https://baike.baidu.com/item/RFC/1840?fr=aladdin)

Request For Comments（RFC），是一系列以编号排定的文件。文件收集了有关互联网相关信息，以及UNIX和[互联网](https://baike.baidu.com/item/互联网/199186)社区的[软件](https://baike.baidu.com/item/软件/12053)文件。RFC文件是由Internet Society（ISOC）赞助发行。基本的互联网通信协议都有在RFC文件内详细说明。RFC文件还额外加入许多在标准内的论题，例如对于互联网新开发的协议及发展中所有的记录。因此几乎所有的互联网标准都有收录在RFC文件之中。



#### [MTU](https://baike.baidu.com/item/%E6%9C%80%E5%A4%A7%E4%BC%A0%E8%BE%93%E5%8D%95%E5%85%83/9730690?fromtitle=mtu&fromid=508920&fr=aladdin)

最大传输单元（Maximum Transmission Unit，MTU）用来通知对方所能接受[数据服务](https://baike.baidu.com/item/数据服务/23724818)[单元](https://baike.baidu.com/item/单元/32922)的最大尺寸，说明发送方能够接受的[有效载荷](https://baike.baidu.com/item/有效载荷/3653893)大小。

是包或帧的最大长度，一般以[字节](https://baike.baidu.com/item/字节/1096318)记。如果MTU过大，在碰到路由器时会被拒绝转发，因为它不能处理过大的包。如果太小，因为协议一定要在包(或帧)上加上包头，那实际传送的数据量就会过小，这样也划不来。大部分操作系统会提供给用户一个默认值，该值一般对用户是比较合适的

[以太网](https://baike.baidu.com/item/以太网/99684)和802.3对数据帧的长度都有一个限制，其最大值分别是1500[字节](https://baike.baidu.com/item/字节/1096318)和1492字节。链路层的这个特性称为MTU，即最大传输单元。不同类型网络的数帧长度大多数都有一个上限。如果IP层有一个数据报要传，而且数据帧的长度比链路层的MTU还大，那么IP层就需要进行[分片](https://baike.baidu.com/item/分片/13677994)( fragmentation)，即把数据报分成干片，这样每一片就都小于MTU。 [3] 

当同一个网络上的两台主机互相进行通信时，该网络的MTU是非常重要。但是如果两台主机之间的通信要通过多个网络，每个网络的链路层可能有不同的MTU，那么这时重要的不是两台主机所在网络的MTU的值，而是两台主机通信路径中的最小MTU，称为路径MTU( Path mtu，PMTU)。 

两台主机之间的PMTU不一定是个常数，它取决于当时所选择的路径，而且[路由](https://baike.baidu.com/item/路由/363497)选择也不一定是对称的(从A到B的路由可能与从B到A的路由不同)，因此，[PMTU](https://baike.baidu.com/item/PMTU/1963207)在两个方向上不一定是一致的。 

RFC1191描述了PMTU的发现机制，即确定路径MTU的方法。ICMP的不可到达错误采用的就是这种方法， traceroute程序也是用这种方法来确定到达目的节点的PMT的。 



#### [NAT](https://baike.baidu.com/item/nat/320024?fr=aladdin)

NAT（Network Address Translation，网络地址转换）是1994年提出的。当在[专用网](https://baike.baidu.com/item/专用网/1006818)内部的一些主机本来已经分配到了本地IP地址（即仅在本专用网内使用的专用地址），但现在又想和因特网上的主机通信（并不需要加密）时，可使用NAT方法。

这种方法需要在专用网（私网IP）连接到因特网（公网IP）的路由器上安装NAT软件。装有NAT软件的路由器叫做NAT路由器，它至少有一个有效的外部全球IP地址（公网IP地址）。这样，所有使用本地地址（私网IP地址）的主机在和外界通信时，都要在NAT路由器上将其本地地址转换成全球IP地址，才能和因特网连接。

另外，这种通过使用少量的全球IP地址（公网IP地址）代表较多的私有IP地址的方式，将有助于减缓可用的IP地址空间的枯竭。在[RFC](https://baike.baidu.com/item/RFC/10718878) 2663中有对NAT的说明。

##### 功能

NAT不仅能解决IP地址不足的问题，而且还能够有效地避免来自网络外部的攻击，隐藏并保护网络内部的计算机。

1.宽带分享：这是 NAT 主机的最大功能。

2.安全防护：NAT 之内的 PC 联机到 Internet 上面时，他所显示的 IP 是 NAT 主机的公共 IP，所以 Client 端的 PC 当然就具有一定程度的安全了，外界在进行 portscan（端口扫描） 的时候，就侦测不到源Client 端的 PC 。

##### 实现方式

NAT的实现方式有三种，即静态转换Static Nat、动态转换Dynamic Nat和端口多路复用OverLoad。

**[静态](https://baike.baidu.com/item/静态)****转换**是指将内部网络的私有IP地址转换为公有IP地址，IP地址对是一对一的，是一成不变的，某个私有IP地址只转换为某个公有IP地址。借助于[静态](https://baike.baidu.com/item/静态)转换，可以实现外部网络对内部网络中某些特定设备（如服务器）的访问。

**动态转换**是指将内部网络的私有IP地址转换为公用IP地址时，IP地址是不确定的，是随机的，所有被授权访问上Internet的私有IP地址可随机转换为任何指定的合法IP地址。也就是说，只要指定哪些内部地址可以进行转换，以及用哪些合法地址作为外部地址时，就可以进行动态转换。动态转换可以使用多个合法外部地址集。当[ISP](https://baike.baidu.com/item/ISP/10152)提供的合法IP地址略少于网络内部的计算机数量时。可以采用动态转换的方式。

**端口多路复用（****Port address Translation,PAT）**是指改变外出数据包的[源端口](https://baike.baidu.com/item/源端口)并进行端口转换，即端口[地址转换](https://baike.baidu.com/item/地址转换)（PAT，Port Address Translation).采用端口多路复用方式。内部网络的所有[主机](https://baike.baidu.com/item/主机)均可共享一个合法外部IP地址实现对Internet的访问，从而可以最大限度地节约IP地址资源。同时，又可隐藏网络内部的所有[主机](https://baike.baidu.com/item/主机)，有效避免来自internet的攻击。因此，目前网络中应用最多的就是端口多路复用方式。

**ALG（Application Level Gateway）**，即应用程序级网关技术：传统的NAT技术只对IP层和传输层头部进行转换处理，但是一些[应用层协议](https://baike.baidu.com/item/应用层协议/3668945)，在协议数据报文中包含了地址信息。为了使得这些应用也能透明地完成NAT转换，NAT使用一种称作ALG的技术，它能对这些应用程序在通信时所包含的地址信息也进行相应的NAT转换。例如：对于FTP协议的PORT/PASV命令、DNS协议的 "A" 和 "PTR" queries命令和部分ICMP消息类型等都需要相应的ALG来支持。

如果协议数据报文中不包含地址信息，则很容易利用传统的NAT技术来完成透明的地址转换功能，通常我们使用的如下应用就可以直接利用传统的NAT技术：HTTP、TELNET、FINGER、NTP、NFS、ARCHIE、RLOGIN、RSH、RCP等。

#### MSS

max segment size

TCP有一个最大分段大小，用于对端TCP通告对端每个分段中能发送的最大TCP数据量。MSS的目的是告诉对端其重组缓冲区大小的实 际值，从而避免分片。MSS经常设计成MTU减去IP和TCP首部的固定长度。以太网中使用IPv4MSS值为1460，使用IPv6的MSS值为 1440（两者TCP首部都是20字节，但是IPv6首部是40字节，IPv4首部是20字节）。