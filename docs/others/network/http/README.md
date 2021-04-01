# http/https

大家可能都听说过 HTTPS 协议之所以是安全的是因为 HTTPS 协议会对传输的数据进行加密，而加密过程是使用了非对称加密实现。但其实，HTTPS 在内容传输的加密上使用的是对称加密，非对称加密只作用在证书验证阶段。

HTTPS 的整体过程分为证书验证和数据传输阶段，具体的交互过程如下：

[![img](https://i.loli.net/2021/03/03/SeQAXwmxhLscn4O.png)](https://static.blog.leapmie.com/2019/11/1378987910.png)





[1.终于有人把 HTTPS 原理讲清楚了！](https://juejin.cn/post/6935348080015310884)

[2.浅谈常见的七种加密算法及实现](https://blog.csdn.net/baidu_22254181/article/details/82594072)



### TLS/SSL



[SSL/TLS原理详解](https://www.linuxidc.com/Linux/2016-05/131147.htm)



##### [HMAC](https://baike.baidu.com/item/hmac/7307543?fr=aladdin)

HMAC是密钥相关的哈希运算[消息认证码](https://baike.baidu.com/item/消息认证码/1354818)（Hash-based Message Authentication Code）的缩写，由H.Krawezyk，M.Bellare，R.Canetti于1996年提出的一种基于Hash函数和密钥进行消息认证的方法，并于1997年作为RFC2104被公布，并在[IPSec](https://baike.baidu.com/item/IPSec/2472311)和其他网络协议（如[SSL](https://baike.baidu.com/item/SSL/320778)）中得以广泛应用，现在已经成为事实上的Internet安全标准。它可以与任何迭代散列函数捆绑使用。

###### 背景

随着Internet的不断发展，网络安全问题日益突出。为了确保接收方所接收到的报文数据的完整性，人们采用[消息认证](https://baike.baidu.com/item/消息认证/5388882)来验证上述性质。用来对消息进行认证的主要方式有以下3种：消息认证码、散列函数和消息加密。

[消息认证码](https://baike.baidu.com/item/消息认证码/1354818)：它是一个需要密钥的算法，可以对可变长度的消息进行认证，把输出的结果作为认证符。

[散列函数](https://baike.baidu.com/item/散列函数/2366288)：它是将任意长度的消息映射成为定长的散列值的函数，以该散列值消息摘要）作为认证符。

消息加密：它将整个消息的密文作为认证符。

近年来，人们越来越感兴趣于利用[散列函数](https://baike.baidu.com/item/散列函数/2366288)来设计[MAC](https://baike.baidu.com/item/MAC/329741)，原因有二：

①一般的散列函数的软件执行速度比分组密码的要快。

②[密码散列函数](https://baike.baidu.com/item/密码散列函数/14937715)的库代码来源广泛。

因此HMAC应运而生，HMAC是一种利用[密码学](https://baike.baidu.com/item/密码学/480001)中的[散列函数](https://baike.baidu.com/item/散列函数/2366288)来进行[消息认证](https://baike.baidu.com/item/消息认证/5388882)的一种机制，所能提供的消息认证包括两方面内容：

`①消息完整性认证`：能够证明消息内容在传送过程没有被修改。

`②信源身份认证`：因为通信双方共享了认证的密钥，接收方能够认证发送该数据的信源与所宣称的一致，即能够可靠地确认接收的消息与发送的一致。

HMAC是当前许多安全协议所选用的提供认证服务的方式，应用十分广泛，并且经受住了多种形式攻击的考验。



##### [MD5](https://baike.baidu.com/item/MD5/212708?fr=aladdin)

**MD5信息摘要算法**（英语：MD5 Message-Digest Algorithm），一种被广泛使用的[密码散列函数](https://baike.baidu.com/item/密码散列函数/14937715)，可以产生出一个128位（16[字节](https://baike.baidu.com/item/字节/1096318)）的散列值（hash value），用于确保信息传输完整一致。MD5由美国密码学家[罗纳德·李维斯特](https://baike.baidu.com/item/罗纳德·李维斯特/700199)（Ronald Linn Rivest）设计，于1992年公开，用以取代[MD4](https://baike.baidu.com/item/MD4/8090275)算法。这套算法的程序在 RFC 1321 标准中被加以规范。1996年后该算法被证实存在弱点，可以被加以破解，对于需要高度安全性的数据，专家一般建议改用其他算法，如[SHA-2](https://baike.baidu.com/item/SHA-2/22718180)。2004年，证实MD5算法无法防止碰撞（collision），因此不适用于安全性认证，如[SSL](https://baike.baidu.com/item/SSL/320778)公开密钥认证或是[数字签名](https://baike.baidu.com/item/数字签名/212550)等用途。

###### 历史

1992年8月，罗纳德·李维斯特向互联网工程任务组（IETF）提交了一份重要文件，描述了这种算法的原理。由于这种算法的公开性和安全性，在90年代被广泛使用在各种程序语言中，用以确保资料传递无误等 [1] 。

MD5由[MD4](https://baike.baidu.com/item/MD4/8090275)、[MD3](https://baike.baidu.com/item/MD3/6677051)、MD2改进而来，主要增强算法复杂度和不可逆性。MD5算法因其普遍、稳定、快速的特点，仍广泛应用于普通数据的加密保护领域 [2] 。

##### MD2

Rivest在1989年开发出MD2算法 [3] 。在这个算法中，首先对信息进行数据补位，使信息的字节长度是16的倍数。然后，以一个16位的校验和追加到信息末尾，并且根据这个新产生的信息计算出散列值。后来，Rogier和Chauvaud发现如果忽略了校验和MD2将产生冲突。MD2算法[加密](https://baike.baidu.com/item/加密)后结果是唯一的（即不同信息加密后的结果不同） [4] 。

##### MD4

为了加强算法的安全性，Rivest在1990年又开发出MD4算法 [3] 。MD4算法同样需要填补信息以确保信息的比特位长度减去448后能被512整除（信息比特位长度mod 512 = 448）。然后，一个以64位[二进制](https://baike.baidu.com/item/二进制)表示的信息的最初长度被添加进来。信息被处理成512位damgard/merkle迭代结构的区块，而且每个区块要通过三个不同步骤的处理。Den boer和Bosselaers以及其他人很快的发现了攻击MD4版本中第一步和第三步的漏洞。Dobbertin向大家演示了如何利用一部普通的个人电脑在几分钟内找到MD4完整版本中的冲突（这个冲突实际上是一种漏洞，它将导致对不同的内容进行加密却可能得到相同的加密后结果） [5] 。

##### MD5

1991年，Rivest开发出技术上更为趋近成熟的MD5[算法](https://baike.baidu.com/item/算法)。它在MD4的基础上增加了"安全带"（safety-belts）的概念。虽然MD5比MD4复杂度大一些，但却更为安全。这个算法很明显的由四个和MD4设计有少许不同的步骤组成。在[MD5算法](https://baike.baidu.com/item/MD5算法)中，信息-摘要的大小和填充的必要条件与MD4完全相同。Den boer和Bosselaers曾发现MD5算法中的假冲突（pseudo-collisions），但除此之外就没有其他被发现的加密后结果了 [3] 。

###### 原理

MD5算法的原理可简要的叙述为：MD5码以512位分组来处理输入的信息，且每一分组又被划分为16个32位子分组，经过了一系列的处理后，算法的输出由四个32位分组组成，将这四个32位分组级联后将生成一个128位[散列值](https://baike.baidu.com/item/散列值/10398613)。 [6] 

总体流程如下图所示，每次的运算都由前一轮的128位结果值和当前的512bit值进行运算 [7] 。

[![图1.MD5算法的整体流程图](https://i.loli.net/2021/03/08/XYwsNJ3xZ9aTgcV.png)](https://baike.baidu.com/pic/MD5/212708/0/c75c10385343fbf2ee0d9594b17eca8065388f67?fr=lemma&ct=single)

###### 参考

- 1.[ ](https://baike.baidu.com/item/MD5/212708?fr=aladdin#ref_[1]_7636)黄声国, 吴蕃. 浅谈RSA公司事件“后门”[J]. 中国金融电脑, 2014(7):62-64.
- 2.[ ](https://baike.baidu.com/item/MD5/212708?fr=aladdin#ref_[2]_7636)么丽颖. MD5算法的分析和改进[J]. 哈尔滨师范大学自然科学学报, 2011, 27(5):34-37.
- 3.[ ](https://baike.baidu.com/item/MD5/212708?fr=aladdin#ref_[3]_7636)王可. MD5算法研究[J]. 中文信息, 2002(2):78-81.
- 4.[ ](https://baike.baidu.com/item/MD5/212708?fr=aladdin#ref_[4]_7636)Kaliski B. The MD2 Message-Digest Algorithm[M]. 1992.
- 5.[ ](https://baike.baidu.com/item/MD5/212708?fr=aladdin#ref_[5]_7636)Rivest R. The MD4 Message-Digest Algorithm[M]// Advances in Cryptology-CRYPT0’ 90. 1990.



##### [RSA](https://baike.baidu.com/item/RSA%E7%AE%97%E6%B3%95/263310?fromtitle=RSA&fromid=210678&fr=aladdin)

RSA是1977年由[罗纳德·李维斯特](https://baike.baidu.com/item/罗纳德·李维斯特/700199)（Ron Rivest）、[阿迪·萨莫尔](https://baike.baidu.com/item/阿迪·萨莫尔)（Adi Shamir）和[伦纳德·阿德曼](https://baike.baidu.com/item/伦纳德·阿德曼/12575612)（Leonard Adleman）一起提出的。当时他们三人都在[麻省理工学院](https://baike.baidu.com/item/麻省理工学院/117999)工作。RSA就是他们三人姓氏开头字母拼在一起组成的

###### 简介

RSA[公开密钥密码体制](https://baike.baidu.com/item/公开密钥密码体制/11048976)是一种使用不同的加密密钥与解密密钥，“由已知加密密钥推导出解密密钥在计算上是不可行的”密码体制 [2] 。

在公开密钥密码体制中，加密密钥（即公开密钥）PK是公开信息，而解密密钥（即秘密密钥）SK是需要保密的。加密算法E和解密算法D也都是公开的。虽然解密密钥SK是由公开密钥PK决定的，但却不能根据PK计算出SK [2] 。

正是基于这种理论，1978年出现了著名的RSA算法，它通常是先生成一对RSA密钥，其中之一是保密密钥，由用户保存；另一个为公开密钥，可对外公开，甚至可在网络服务器中注册。为提高保密强度，RSA密钥至少为500位长，一般推荐使用1024位。这就使加密的计算量很大。为减少计算量，在传送信息时，常采用传统加密方法与[公开密钥加密](https://baike.baidu.com/item/公开密钥加密/8090774)方法相结合的方式，即信息采用改进的DES或IDEA对话密钥加密，然后使用RSA密钥加密对话密钥和信息摘要。对方收到信息后，用不同的密钥解密并可核对信息摘要 [2] 。

RSA是被研究得最广泛的公钥算法，从提出到现在已近三十年，经历了各种攻击的考验，逐渐为人们接受，普遍认为是目前最优秀的公钥方案之一。1983年[麻省理工学院](https://baike.baidu.com/item/麻省理工学院/117999)在美国为RSA算法申请了专利 [3] 。

RSA允许你选择公钥的大小。512位的密钥被视为不安全的；768位的密钥不用担心受到除了国家安全管理（NSA）外的其他事物的危害；1024位的密钥几乎是安全的。RSA在一些主要产品内部都有嵌入，像 Windows、网景 Navigator、 Quicken和 Lotus Notes [3] 。

###### 原理

RSA公开密钥密码体制的原理是：根据数论，寻求两个大素数比较简单，而将它们的乘积进行因式分解却极其困难，因此可以将乘积公开作为加密密钥 [4] 。



###### 攻击方式

迄今为止，对RSA的攻击已经很多，但都没有对它构成真正的威胁。在这里，我们讨论一些典型的攻击方法 [8] 。

###### RSA的选择密码攻击

RSA在选择密码攻击面前显得很脆弱。一般攻击者是将某一信息进行下伪装，让拥有私钥的实体签名；然后，经过计算就可得到它所想要的信息。实际上，攻击利用的都是同一个弱点，即存在这样一个事实：乘幂保留了输入的乘法结构。前面已经提到，这个固有的问题来自于公钥密码系统的最基本的特征，即每个人都能使用公钥加密信息。从算法上无法解决这一问题，改进措施有两条：是采用好的公钥协议保证工作过程中实体不对其他实体任意产生的信息解密，不对自己一无所知的信息签名；二是决不对陌生人送来的随机文档签名，或签名时首先对文档作Hash处理，或同时使用不同的签名算法 [8] 。

###### RSA的小指数攻击

当公钥e取较小的值，虽然会使加密变得易于实现，速度有所提高，但这样做也是不安全的。最简单的办法就是e和d都取较大的值 [8] 。

因为密钥的产生受素数产生技术的限制，所以也有它的局限性 [8] 。

（1）密钥的产生受素数产生技术的限制，因而难以做到一次一密 [8] ；

（2）分组长度太大，为保证安全性，n至少也要600比特以上，使运算代价很高，尤其是速度较慢，比对称密码算法慢几个数量级；随着大整数素因数分解算法的改进和计算机计算能力的提高，对n的长度在不断增加，不利于

###### 参考

* [RSA算法原理（一）](http://www.ruanyifeng.com/blog/2013/06/rsa_algorithm_part_one.html)

- 1.[ ](https://baike.baidu.com/item/RSA算法/263310?fromtitle=RSA&fromid=210678&fr=aladdin#ref_[1]_10613)王雷，魏焕新，聂清彬主编,计算机网络原理基础教程,北京理工大学出版社,2016.02,第188页

- 2.[ ](https://baike.baidu.com/item/RSA算法/263310?fromtitle=RSA&fromid=210678&fr=aladdin#ref_[2]_10613)康桂花主编,计算概论,中国铁道出版社,2016.08,第137页

- 3.[ ](https://baike.baidu.com/item/RSA算法/263310?fromtitle=RSA&fromid=210678&fr=aladdin#ref_[3]_10613)李建刚著,电子商务技术实操 工学结合,对外经济贸易大学出版社,2010.08,第223页-第224页

- 4.[ ](https://baike.baidu.com/item/RSA算法/263310?fromtitle=RSA&fromid=210678&fr=aladdin#ref_[4]_10613)廖滨华著,网络基础与应用 当代大学生必备必用,湖北科学技术出版社,2014.03,第192页-第193页

- 5.[ ](https://baike.baidu.com/item/RSA算法/263310?fromtitle=RSA&fromid=210678&fr=aladdin#ref_[5]_10613)王文海等编著,密码学理论与应用基础,国防工业出版社,2009.09,第80页-第81页

- 6.[ ](https://baike.baidu.com/item/RSA算法/263310?fromtitle=RSA&fromid=210678&fr=aladdin#ref_[6]_10613)胡娟主编,电子商务支付与安全,北京邮电大学出版社,2018.05,第49页

- 7.[ ](https://baike.baidu.com/item/RSA算法/263310?fromtitle=RSA&fromid=210678&fr=aladdin#ref_[7]_10613)何小东编著,网络安全概论,北京交通大学出版社,2014.08,第40页

- 8.[ ](https://baike.baidu.com/item/RSA算法/263310?fromtitle=RSA&fromid=210678&fr=aladdin#ref_[8]_10613)王文海等编著,密码学理论与应用基础,国防工业出版社,2009.09,第82页-第83页


##### [DES](https://baike.baidu.com/item/DES/210508?fr=aladdin)

DES全称为Data Encryption Standard，即数据加密标准，是一种使用[密钥加密](https://baike.baidu.com/item/密钥加密/5928903)的块算法，1977年被[美国联邦政府](https://baike.baidu.com/item/美国联邦政府/8370227)的国家标准局确定为[联邦资料处理标准](https://baike.baidu.com/item/联邦资料处理标准/3940777)（FIPS），并授权在非密级政府通信中使用，随后该算法在国际上广泛流传开来。需要注意的是，在某些文献中，作为算法的DES称为数据加密算法（Data Encryption Algorithm,DEA），已与作为标准的DES区分开来

###### 基本原则

DES设计中使用了分组密码设计的两个原则：混淆（confusion）和扩散(diffusion)，其目的是抗击敌手对密码系统的统计分析。混淆是使密文的统计特性与密钥的取值之间的关系尽可能复杂化，以使密钥和明文以及密文之间的依赖性对密码分析者来说是无法利用的。扩散的作用就是将每一位明文的影响尽可能迅速地作用到较多的输出密文位中，以便在大量的密文中消除明文的统计结构，并且使每一位密钥的影响尽可能迅速地扩展到较多的密文位中，以防对密钥进行逐段破译。

###### 算法步骤

DES算法把64位的明文输入块变为64位的密文输出块,它所使用的密钥也是64位（实际用到了56位，第8、16、24、32、40、48、56、64位是校验位， 使得每个密钥都有奇数个1），其算法主要分为两步：

1）初始置换

其功能是把输入的64位数据块按位重新组合，并把输出分为L0、R0两部分，每部分各长32位，其置换规则为将输入的第58位换到第一位,第50位换到第2位……依此类推,最后一位是原来的第7位。L0、R0则是换位输出后的两部分，L0是输出的左32位，R0是右32位,例:设置换前的输入值为D1D2D3……D64,则经过初始置换后的结果为:L0=D58D50……D8;R0=D57D49……D7。

其置换规则见下表：

58,50,42,34,26,18,10,2,

60,52,44,36,28,20,12,4,

62,54,46,38,30,22,14,6,

64,56,48,40,32,24,16,8,

57,49,41,33,25,17,9,1,

59,51,43,35,27,19,11,3,

61,53,45,37,29,21,13,5,

63,55,47,39,31,23,15,7,

2）逆置换

经过16次迭代运算后,得到L16、R16,将此作为输入，进行逆置换，逆置换正好是初始置换的逆运算，由此即得到密文输出。

此算法是[对称加密算法](https://baike.baidu.com/item/对称加密算法)体系中的代表,在计算机网络系统中广泛使用。

###### DES和3DES

3DES（即Triple DES）是DES向AES过渡的[加密算法](https://baike.baidu.com/item/加密算法)，它使用3条56位的密钥对数据进行三次加密。是DES的一个更安全的变形。它以DES为基本模块，通过组合分组方法设计出分组加密算法。比起最初的DES，3DES更为安全。

该方法使用两个密钥，执行三次DES算法，加密的过程是加密-解密-加密，解密的过程是解密-加密-解密。

3DES加密过程为：C=Ek3(Dk2(Ek1(P)))

3DES解密过程为：P=Dk1(EK2(Dk3(C)))

采用两个密钥进行三重加密的好处有：

①两个密钥合起来有效密钥长度有112bit，可以满足商业应用的需要，若采用总长为168bit的三个密钥，会产生不必要的开销。

②加密时采用加密-解密-加密，而不是加密-加密-加密的形式，这样有效的实现了与现有DES系统的向后兼容问题。因为当K1=K2时，三重DES的效果就和原来的DES一样，有助于逐渐推广三重DES。

③三重DES具有足够的安全性，还没有关于攻破3DES的报道。



##### [AES](https://baike.baidu.com/item/%E9%AB%98%E7%BA%A7%E5%8A%A0%E5%AF%86%E6%A0%87%E5%87%86/468774?fromtitle=aes&fromid=5903&fr=aladdin)

密码学中的高级加密标准（Advanced Encryption Standard，AES），又称Rijndael[加密法](https://baike.baidu.com/item/加密法/9684302)，是[美国联邦政府](https://baike.baidu.com/item/美国联邦政府/8370227)采用的一种区块加密标准。

这个标准用来替代原先的[DES](https://baike.baidu.com/item/DES)（Data Encryption Standard），已经被多方分析且广为全世界所使用。经过五年的甄选流程，高级加密标准由美国国家标准与技术研究院 （NIST）于2001年11月26日发布于FIPS PUB 197，并在2002年5月26日成为有效的标准。2006年，高级加密标准已然成为对称密钥加密中最流行的算法之一 [1] 。

该算法为比利时密码学家Joan Daemen和Vincent Rijmen所设计，结合两位作者的名字，以Rijdael之名命之，投稿高级加密标准的甄选流程。（Rijdael的发音近于 "Rhine doll"。）



###### AES加密模式

对称/[分组密码](https://baike.baidu.com/item/分组密码)一般分为流加密(如OFB、CFB等)和块加密(如ECB、CBC等)。对于流加密，需要将分组密码转化为流模式工作。对于块加密(或称分组加密)，如果要加密超过块大小的数据，就需要涉及填充和链加密模式。

> ECB(Electronic Code Book电子密码本)模式
>

电子密码本（Electronic Code Book,，ECB）模式是使用分组[密码算法](https://baike.baidu.com/item/密码算法)的最明显的方式，其使用方式是一个明文分组加密成一个密文分组，相同的明文分组永远被加密成相同的密文分组，在理论上制造这样的一个密码本是可行的，但实际上要进行大量的预计算耗费存储空间，最容易的运行模式是每个明文分组可被独立地进行加密，但受分组[重放攻击](https://baike.baidu.com/item/重放攻击)。

ECB模式是最早采用和最简单的模式，它将加密的数据分成若干组，每组的大小跟加密[密钥](https://baike.baidu.com/item/密钥)长度相同，然后每组都用相同的密钥进行加密。

**优点:**

1.简单；　2.有利于并行计算；　3.误差不会被传送；　**缺点:**　1.不能隐藏明文的模式；　2.可能对明文进行主动攻击；　因此，此模式适于加密小消息。

> CBC(Cipher Block Chaining，加密块链)模式
>

密码分组链接模式（Cipher Block Chaining，CBC）模式中，明文被加密之前要与前面的密文进行异或运算，如果前面的明文分组不同才能将完全相同的明文分组加密成不同的密文分组，这会给密码分析者提供有用的线索，为了防止这种情况发生使用一个随机[数据分组](https://baike.baidu.com/item/数据分组/6203850)作为加密的第一个分组叫作初始化向量（initialization Vector，IV），这样就可以把完全相同的信息加密成不同的密文消息。

**优点：**

1.不容易主动攻击,安全性好于ECB,适合传输长度长的[报文](https://baike.baidu.com/item/报文),是SSL、IPSec的标准。　**缺点：**　1.不利于[并行计算](https://baike.baidu.com/item/并行计算)；　2.误差传递；　3.需要初始化向量IV

**CFB(Cipher FeedBack Mode，加密反馈)模式**

密码反馈模式（Cipher-Feedback，[CFB](https://baike.baidu.com/item/CFB/4294370)）是把分组[密码算法](https://baike.baidu.com/item/密码算法/231826)用于自[同步序列密码](https://baike.baidu.com/item/同步序列密码)的一种方法，在CFB模式下，整个[数据分组](https://baike.baidu.com/item/数据分组/6203850)在接收完之后才能进行加密，在此模式下数据可以在比分组小的多的单元里进行处理。

**优点：**

1.隐藏了明文模式;　2.[分组密码](https://baike.baidu.com/item/分组密码)转化为流模式;　3.可以及时加密传送小于分组的数据;　**缺点:**　1.不利于并行计算;　2.误差传送：一个明文单元损坏影响多个单元;　3.唯一的IV;

> OFB(Output FeedBack，输出反馈)模式
>

[输出反馈](https://baike.baidu.com/item/输出反馈/4302811)模式（Output-Feedback，[OFB](https://baike.baidu.com/item/OFB/2176393)）是将[分组密码](https://baike.baidu.com/item/分组密码)用于[同步序列密码](https://baike.baidu.com/item/同步序列密码)运行的一种方法，它有一个很好的特性就是在明文存在前的大部分工作可以离线进行。

**优点:**

1.隐藏了明文模式;　2.分组密码转化为流模式;　3.可以及时加密传送小于分组的数据;　**缺点:**　1.不利于并行计算;　2.对明文的主动攻击是可能的;　3.误差传送：一个明文单元损坏影响多个单元



以上几种模式中密码分组链接模式是在[安全协议](https://baike.baidu.com/item/安全协议/231526)中使用的最为普遍，在无线应用协议中安全层定义的分组[加密算法](https://baike.baidu.com/item/加密算法)都是[CBC模式](https://baike.baidu.com/item/CBC模式/2966536)。

###### CTR(Counter，计数)模式

计数模式（[CTR模式](https://baike.baidu.com/item/CTR模式/2441312)）加密是对一系列输入[数据块](https://baike.baidu.com/item/数据块)(称为计数)进行加密，产生一系列的输出块，输出块与明文异或得到密文。对于最后的数据块，可能是长u位的局部数据块，这u位就将用于异或操作，而剩下的b-u位将被丢弃（b表示块的长度）。CTR解密类似。这一系列的计数必须互不相同的。假定计数表示为T1, T2, …, Tn。CTR模式可定义如下：

CTR加密公式如下：

Cj = Pj XOR Ek(Tj)

C*n = P*n XOR MSBu(Ek(Tn)) j =1，2… n-1;

CTR解密公式如下：

Pj = Cj XOR Ek(Tj)

P*n = C*n XOR MSBu(Ek(Tn)) j =1，2 … n-1;

加密方式：[密码算法](https://baike.baidu.com/item/密码算法)产生一个16 [字节](https://baike.baidu.com/item/字节)的[伪随机码](https://baike.baidu.com/item/伪随机码)块流，伪随机码块与输入的明文进行异或运算后产生密文输出。密文与同样的伪随机码进行异或运算后可以重产生明文。

CTR 模式被广泛用于 ATM 网络安全和 IPSec应用中，相对于其它模式而言，CTR模式具有如下特点：

■ 硬件效率：允许同时处理多块明文 / 密文。

■ 软件效率：允许[并行计算](https://baike.baidu.com/item/并行计算)，可以很好地利用 CPU 流水等[并行技术](https://baike.baidu.com/item/并行技术)。

■ [预处理](https://baike.baidu.com/item/预处理)：算法和加密盒的输出不依靠明文和密文的输入，因此如果有足够的保证安全的[存储器](https://baike.baidu.com/item/存储器)，[加密算法](https://baike.baidu.com/item/加密算法)将仅仅是一系列异或运算，这将极大地提高吞吐量。

■ 随机访问：第 i 块密文的解密不依赖于第 i-1 块密文，提供很高的随机访问能力

■ 可证明的安全性：能够证明 CTR 至少和其他模式一样安全（CBC, CFB, OFB, ...）

■ 简单性：与其它模式不同，CTR模式仅要求实现加密算法，但不要求实现解密算法。对于 AES 等加/解密本质上不同的算法来说，这种简化是巨大的。

■ 无填充，可以高效地作为流式加密使用。

■ 错误不传播：密文传输中每个比特位被错误反转, 仅只影响该密文所在区块的解密. 在CTR模式下, 经过k+1步的自同步后, 后续密文皆可以正确解密.(k表示区块长度128)

■ 必须配合消息验证码(MAC)使用.

■ 不能进行完整性校验: 密文传输过程中丢失比特位将导致后续比特位无法正确解密.



##### [RC5](https://baike.baidu.com/item/RC5/634454?fr=aladdin)

RC5分组[密码算法](https://baike.baidu.com/item/密码算法/231826)是1994由麻萨诸塞技术研究所的Ronald L. Rivest教授发明的，并由[RSA](https://baike.baidu.com/item/RSA)实验室分析。它是参数可变的分组密码算法，三个可变的参数是：分组大小、[密钥](https://baike.baidu.com/item/密钥/101144)大小和加密轮数。在此算法中使用了三种运算：[异或](https://baike.baidu.com/item/异或/10993677)、加和循环。

RC5是种比较新的算法，Rivest设计了RC5的一种特殊的实现方式，因此RC5算法有一个面向字的结构：RC5-w/r/b，这里w是[字长](https://baike.baidu.com/item/字长)其值可以是16、32或64对于不同的字长明文和密文块的分组长度为2w位，r是加密轮数，b是密钥[字节](https://baike.baidu.com/item/字节)长度。

###### 参考代码

rfc 2040文档中列出了RC5算法密钥生成和加密实现的C代码，在此笔者参照文档中定义的算法结构，编写了用于对密文解密的程序代码（此代码经多次测试运行良好），供读者参考。

```c

// 宏定义
// 1、补充了两个个宏定义：
#define SHL1(x,s,w) ((RC5_WORD)((x)<<((w)-((s)&ROT_MASK))))
#define ROTR(x,s,w) ((RC5_WORD)(SHR1((x),(s))|SHL1((x),(s),(w))))
// 函数定义
// 2、解密函数定义如下：
void RC5_Block_Decrypt (RC5_WORD *S,int R,char *in,char *out)
{
int i;
RC5_WORD A,B;
A = in[0] & 0xFF;
A += (in[1] & 0xFF) << 8;
A += (in[2] & 0xFF) << 16;
A += (in[3] & 0xFF) << 24;
B = in[4] & 0xFF;
B += (in[5] & 0xFF) << 8;
B += (in[6] & 0xFF) << 16;
B += (in[7] & 0xFF) << 24;
for(i=R;i>=1;i--){
    B=ROTR((B-S[2*i+1]),A,W);
    B=B^A;
    A=ROTR((A-S[2*i]),B,W);
    A=A^B;
}
B=B-S[1];
A=A-S[0];
out[0] = (A >> 0) & 0xFF;
out[1] = (A >> 8) & 0xFF;
out[2] = (A >> 16) & 0xFF;
out[3] = (A >> 24) & 0xFF;
out[4] = (B >> 0) & 0xFF;
out[5] = (B >> 8) & 0xFF;
out[6] = (B >> 16) & 0xFF;
out[7] = (B >> 24) & 0xFF;
return;
}/*End of RC5_Block_Decrypt */
int RC5_CBC_Decrypt_Init (pAlg, pKey)
    rc5CBCAlg *pAlg;
    rc5UserKey *pKey;
{
if ((pAlg == ((rc5CBCAlg *) 0)) ||
(pKey == ((rc5UserKey *) 0)))
    return (0);
RC5_Key_Expand (pKey->keyLength, pKey->keyBytes,pAlg->R, pAlg->S);
    return (RC5_CBC_SetIV(pAlg, pAlg->I));
}
int RC5_CBC_Decrypt_Update(rc5CBCAlg *pAlg,int N,char *C,int *plainLen,char *P)
{
int plainIndex,cipherIndex,j;
plainIndex=cipherIndex=0;
for(j=0;j<BB;j++)
{
    P[plainIndex]=pAlg->chainBlock[j];
    plainIndex++;
}
plainIndex=0;
while(cipherIndex<N)
{
    if(pAlg->inputBlockIndex<BB)
    {
        pAlg->inputBlock[pAlg->inputBlockIndex]=C[cipherIndex];
        pAlg->inputBlockIndex++;
        cipherIndex++;
    }
    if(pAlg->inputBlockIndex==BB)
    {
        pAlg->inputBlockIndex=0;
        RC5_Block_Decrypt (pAlg->S,pAlg->R,pAlg->inputBlock,pAlg->chainBlock);
        for(j=0;j<BB;j++)
        {
            if(plainIndex<BB)
                P[plainIndex]^=pAlg->chainBlock[j];
            else
                P[plainIndex]=C[cipherIndex-16+j]^pAlg->chainBlock[j];
                plainIndex++;
            }
        }
    }
    *plainLen=plainIndex;
    return (1);
}/*End of RC5_CBC_Decrypt_Update*/
```

##### [DH](https://baike.baidu.com/item/DH/4895102#viewPageContent)

Diffie-Hellman:一种确保[共享](https://baike.baidu.com/item/共享/3456161)KEY安全穿越不安全网络的方法，它是[OAKLEY](https://baike.baidu.com/item/OAKLEY/10245822)的一个组成部分。

Whitfield Diffie与Martin Hellman在1976年提出了一个奇妙的密钥交换协议，称为Diffie-Hellman密钥交换协议/算法(Diffie-Hellman Key Exchange/Agreement Algorithm)。这个机制的巧妙在于需要安全通信的双方可以用这个方法确定对称密钥。然后可以用这个密钥进行加密和解密。但是注意，这个密钥交换协议/算法只能用于密钥的交换，而不能进行消息的加密和解密。双方确定要用的密钥后，要使用其他对称密钥操作加密算法实现加密和解密消息。



##### [SHA](https://www.cnblogs.com/block2016/p/5632234.html)

**安全散列算法**（英语：Secure Hash Algorithm，缩写为SHA）是一个[密码散列函数](https://baike.baidu.com/item/密码散列函数)家族，是[FIPS](https://baike.baidu.com/item/FIPS)所认证的安全[散列算法](https://baike.baidu.com/item/散列算法)。能计算出一个数字消息所对应到的，长度固定的字符串（又称消息摘要）的算法。且若输入的消息不同，它们对应到不同字符串的机率很高。

SHA家族的五个算法，分别是[SHA-1](https://baike.baidu.com/item/SHA-1)、SHA-224、SHA-256、SHA-384，和SHA-512，由[美国国家安全局](https://baike.baidu.com/item/美国国家安全局)（NSA）所设计，并由[美国国家标准与技术研究院](https://baike.baidu.com/item/美国国家标准与技术研究院/3931459)（NIST）发布；是美国的政府标准。后四者有时并称为SHA-2。SHA-1在许多安全协定中广为使用，包括[TLS](https://baike.baidu.com/item/TLS)和[SSL](https://baike.baidu.com/item/SSL)、[PGP](https://baike.baidu.com/item/PGP)、[SSH](https://baike.baidu.com/item/SSH)、S/MIME和IPsec，曾被视为是[MD5](https://baike.baidu.com/item/MD5)（更早之前被广为使用的杂凑函数）的后继者。但SHA-1的安全性如今被密码学家严重质疑；虽然至今尚未出现对SHA-2有效的攻击，它的算法跟SHA-1基本上仍然相似；因此有些人开始发展其他替代的杂凑算法。



###### SHA0 



###### SHA1 

最初载明的算法于1993年发布，称做安全杂凑标准（Secure Hash Standard），FIPS PUB 180。这个版本常被称为SHA-0。它在发布之后很快就被NSA撤回，并且由1995年发布的修订版本FIPS PUB 180-1（通常称为SHA-1）取代。SHA-1和SHA-0的算法只在压缩函数的讯息转换部分差了一个位元的循环位移。根据NSA的说法，它修正了一个在原始算法中会降低杂凑安全性的弱点。然而NSA并没有提供任何进一步的解释或证明该弱点已被修正。而后SHA-0和SHA-1的弱点相继被攻破，SHA-1似乎是显得比SHA-0有抵抗性，这多少证实了NSA当初修正算法以增进安全性的声明。

SHA-0和SHA-1可将一个最大2的64次方位元的讯息，转换成一串160位元的讯息摘要；其设计原理相似于MIT教授Ronald L. Rivest所设计的密码学杂凑算法[MD4](https://baike.baidu.com/item/MD4)和[MD5](https://baike.baidu.com/item/MD5)。

###### SHA2

NIST发布了三个额外的SHA变体，这三个函数都将讯息对应到更长的讯息摘要。以它们的摘要长度（以位元计算）加在原名后面来命名：SHA-256，SHA-384和SHA-512。它们发布于2001年的FIPS PUB 180-2草稿中，随即通过审查和评论。包含SHA-1的FIPS PUB 180-2，于2002年以官方标准发布。2004年2月，发布了一次FIPS PUB 180-2的变更通知，加入了一个额外的变种SHA-224"，这是为了符合双金钥3DES所需的金钥长度而定义。

SHA-256和SHA-512是很新的杂凑函数，前者以定义一个word为32位元，后者则定义一个word为64位元。它们分别使用了不同的偏移量，或用不同的常数，然而，实际上二者结构是相同的，只在循环执行的次数上有所差异。SHA-224以及SHA-384则是前述二种杂凑函数的截短版，利用不同的初始值做计算。

这些新的杂凑函数并没有接受像SHA-1一样的公众密码社群做详细的检验，所以它们的密码安全性还不被大家广泛的信任。Gilbert和Handschuh在2003年曾对这些新变种作过一些研究，声称他们没有找到弱点

###### 参考

[[SHA算法](https://www.cnblogs.com/block2016/p/5632234.html)](https://www.cnblogs.com/block2016/p/5632234.html)

[百度百科-SHA算法](https://baike.baidu.com/item/SHA%E5%AE%B6%E6%97%8F/9849595?fromtitle=SHA&fromid=9533316&fr=aladdin)