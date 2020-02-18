
# 数据库相关


## 数据库设计模式

1. 主拓展模式

一般应用于提取不同类型的对象的共同特征，比如在学校中，课程包含老师、学生;工厂有产品、人员。对于上面系统的设计设计人员表：user、teacher、student的单独成表。维护同样的userid同时作为二者主键。称为1对1关系。这被称为主扩展模式。

扩展表的主键既是扩展表的主键也是主表的外键

2. 主从模式

主从模式的应用场景最多。是典型的一对多的关系。比如贴吧的实现，整个吧就是一个主表。而贴吧有许多的从表就是不同楼主发的帖子，而每个帖子有用很多从表那就是每个楼所对应的信息。

3. 名值关系
　　主要处理系统设计阶段还不能完全确定的属性的对象。这些对象的属性在系统运行时会有很大的变更，或者是多个对象之间的属性存在很大的差异。
　　比如说一个学生的表，记录了一些学生必须有的属性：年龄身高体重姓名什么的。但是突然有一天有一个人穿越了，他就需要一个剑术值的数据。通常需要额外两个表来存储这种不确定是否会用会有的属性。

　　首先需要一个属性模版表，就是不管这个属性属于谁，属于何物，何时，我只是证明有这么一条额外属性而存在。那么上述的例子当中，属性模板表当中就需要添加一条属性：（属性代码一般给属性分类用）

　　ID 1 属性代码 1001 属性名称 剑术值

　　但是具体剑术值是多少，这个表不去讨论。存储数据的表称为额外属性表，这个表存储的字段分别标识
   1. 这条数据属于哪个人、物（角色id）
   2. 这条数据是什么属性 （属性模板ID）
   3. 属性的具体值是多少 （data)

4. 多对多关系
      多对多模式，也是比较常见的一种数据库设计模式，它所描述的两个对象不分主次、地位对等、互为一对多的关系。对于A表来说，一条记录对应着B表的多条记录，反过来对于B表来说，一条记录也对应着A表的多条记录，这种情况就是“多对多模式”。这个主要可以细分成两种情况。取决于关联表有没有业务需求。 

### [数据库设计范式](https://www.cnblogs.com/wsg25/p/9615100.html)

目前关系数据库有六种范式：第一范式（1NF）、第二范式（2NF）、第三范式（3NF）、巴斯-科德范式（BCNF）、第四范式(4NF）和第五范式（5NF，又称完美范式）。

而通常我们用的最多的就是第一范式（1NF）、第二范式（2NF）、第三范式（3NF），也就是本文要讲的“三大范式”。

* 第一范式（1NF）：要求数据库表的每一列都是不可分割的原子数据项。

举例说明：

学号|姓名|性别|年龄|家庭|学校
--:|:--:|:--:|:--:|:--:|:--
20191001001|xx|female|24|北京|研二、me
20191001002|xx|male|24|3口人、上海|研二、me
20191001003|xx|female|25|4口人、武汉|研三、ee
20191001004|xx|female|22|3口人、广州|研一、cs

上面表中的"家庭"、"学校"均不满足第一范式。因此调整如下：
学号|姓名|性别|年龄|家庭人口|专业|年级
--:|:--:|:--:|:--:|:--:|:--:|:--
20191001001|xx|female|24|5口人|me|研二|me
20191001002|xx|male|24|3口人|me|研二|me
20191001003|xx|female|25|4口人|mee|研三|ee
20191001004|xx|female|22|3口人|cs|研一|cs

* 第二范式（2NF）：在1NF的基础上，非码属性必须完全依赖于候选码（在1NF基础上消除非主属性对主码的部分函数依赖）

第二范式需要确保数据库表中的每一列都和主键相关，而不能只与主键的某一部分相关（主要针对联合主键而言）。

订单号|产品号|产品数量|产品折扣|产品价格|订单金额|订单时间
--:|:--:|:--:|:--:|:--:|:--:|:--
2008003|205|100|0.9|8.9|2870|20080103
2008003|206|200|0.8|9.9|2870|20080103
2008005|206|500|0.75|10|2870|20080103
2008006|206|400|0.88|9|2870|20080103
2008008|209|1000|0.95|8|14|2870|20080203
2008008|210|140|0.95|8|2870|20080213
2008008|211|350|0.9|10.9|2870|20080403
![](/images/database-design-formula-2-.png)

在上图所示的情况中，同一个订单中可能包含不同的产品，因此主键必须是“订单号”和“产品号”联合组成，

但可以发现，产品数量、产品折扣、产品价格与“订单号”和“产品号”都相关，但是订单金额和订单时间仅与“订单号”相关，与“产品号”无关，

这样就不满足第二范式的要求，调整如下，需分成两个表：

![](/images/database-design-formula-2.png) 
![](/images/database-design-formula-2-2.png)

* 第三范式（3NF）：在2NF基础上，任何非主属性不依赖于其它非主属性（在2NF基础上消除传递依赖）

第三范式需要确保数据表中的每一列数据都和主键直接相关，而不能间接相关。

![](/images/database-design-formula-3-1.png)
上表中，所有属性都完全依赖于学号，所以满足第二范式，但是“班主任性别”和“班主任年龄”直接依赖的是“班主任姓名”，

而不是主键“学号”，所以需做如下调整：

![](/images/database-design-formula-3-2.png)

这样以来，就满足了第三范式的要求。

ps:如果把上表中的班主任姓名改成班主任教工号可能更确切，更符合实际情况，不过只要能理解就行。

### [数据库五大约束](https://www.cnblogs.com/zhouguowei/p/9268788.html)

数据库中的五大约束包括：

1. 主键约束（Primay Key Coustraint） 唯一性，非空性；

2. 唯一约束 （Unique Counstraint）唯一性，可以空，但只能有一个；

3. 默认约束 (Default Counstraint) 该数据的默认值；

4. 外键约束 (Foreign Key Counstraint) 需要建立两表间的关系；

5. 非空约束（Not Null Counstraint）:设置非空约束，该字段不能为空。

## SQL语句
[1.SQL高级教程](https://blog.csdn.net/qq_36344771/article/details/81485063)

### SQL JOIN
join可以从两个表或者多个表中列的关系，查询数据

#### SQL inner join
inner join 与join是相同的
``` sql
SELECT column_name(s)
FROM table_name1
INNER JOIN table_name2 
ON table_name1.column_name=table_name2.column_name
```

#### SQL left join
left join关键字从坐标 返回所有的行（左表没有匹配项也会出现)

``` sql
SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo
FROM Persons
LEFT JOIN Orders
ON Persons.Id_P=Orders.Id_P
ORDER BY Persons.LastName
```

#### SQL rightjoin
right join关键字从右表中返回所有的行（即使右表没有匹配行）
```sql
SELECT column_name(s)
FROM table_name1
RIGHT JOIN table_name2
ON table_name1.column_name = table_name2.column_name
```

#### SQL union 和 union all
UNION 操作符用于合并两个或多个 SELECT 语句的结果集。
请注意，UNION 内部的 SELECT 语句必须拥有相同数量的列。列也必须拥有相似的数据类型。同时，每条 SELECT 语句中的列的顺序必须相同。
UNION
``` sql
SELECT column_name(s) FROM table_name1
UNION
SELECT column_name(s) FROM table_name2
--默认地，UNION 操作符选取不同的值。如果允许重复的值，请使用 UNION ALL。
```
UNION ALL

``` sql
SELECT column_name(s) FROM table_name1
UNION ALL
SELECT column_name(s) FROM table_name2
```

#### SQL SELECT INTO
SELECT INTO 语句从一个表中选取数据，然后把数据插入另一个表中。
SELECT INTO 语句常用于创建表的备份复件或者用于对记录进行存档。

``` js
SELECT *
INTO new_table_name[IN externaldatabase]
FROM old_tablename
```
利用select into制作备份
``` sql
SELECT *
INTO Persons IN 'Backup.mdb'
FROM Persons
```
希望拷贝某些域，可以在SELECT语句后面列出这些域
``` sql
SELECT LastFirst,FirstName
INTO Person_backup
FROM Persons
```
在SELECT INTO 后面添加WHERE子句
``` js
SELECT *
INTO Person_backup
FROM Perons
WHERE City="Chongqing"
```

#### SQL create table语句
``` sql
CREATE TABLE 表名称
(
      列名称1 数据类型,
      列名称2 数据类型,
      列名称3 数据类型,
)
```
常用数据类型如下：
数据类型	|描述
--:|:--
integer(size) int(size) smallint(size) tinyint(size)	|仅容纳整数。在括号内规定数字的最大位数。
decimal(size,d) numeric(size,d)	|容纳带有小数的数字。 “size” 规定数字的最大位数。”d” 规定小数点右侧的最大位数。
char(size)	|容纳固定长度的字符串（可容纳字母、数字以及特殊字符）。 在括号中规定字符串的长度。
varchar(size)	|容纳可变长度的字符串（可容纳字母、数字以及特殊的字符）。 在括号中规定字符串的最大长度。
date(yyyymmdd)	|容纳日期。

创建table实例，Person表包含5个列，列名如下："Id_P","LastName","FirstName","Address","City"
``` sql
CREATE TABLE Persons(
      Id_P int,
      LastName varchar(255),
      FirstName varchar(255),
      Address varchar(255),
      City varchar(255)
)
```

#### SQL NOT NULL
NOT NULL 约束强制列不接受 NULL 值。
NOT NULL 约束强制字段始终包含值。这意味着，如果不向字段添加值，就无法插入新记录或者更新记录。
``` sql
CREATE TABLE Person(
      Id_P int NOT NULL,
      LastName varchar(255) NOT NULL,
      FirstName varchar(255),
      Address varchar(255),
      City varchar(255)
)
```

#### SQL FOREIGN KEY
一个表中的 FOREIGN KEY 指向另一个表中的 PRIMARY KEY。
让我们通过一个例子来解释外键。请看下面两个表：
FOREIGN KEY 约束用于预防破坏表之间连接的动作。

FOREIGN KEY 约束也能防止非法数据插入外键列，因为它必须是它指向的那个表中的值之一。
下面的 SQL 在 “Orders” 表创建时为 “Id_P” 列创建 FOREIGN KEY：
MySQL:
``` sql
CREATE TABLE Orders
(
      Id_O int NOT NULL,
      OrderNo int NOT NULL,
      Id_P int,
      PRIMARY KEY (Id_O),
      FOREIGN KEY (Id_P) REFERENCES Persons(Id_P)
)
```
SQL SERVER /Oracle/MS Acess
```sql
CREATE TABLE Orders
(
      Id_O int NOT NULL PRIMARY KEY,
      OrderNo int NOT NULL,
      Id_P int FOREIGN KEY REFERENCES Persons(Id_P)
)
```

#### SQL CHECK
CHECK 约束用于限制列中的值的范围。
如果对单个列定义 CHECK 约束，那么该列只允许特定的值。
如果对一个表定义 CHECK 约束，那么此约束会在特定的列中对值进行限制。
下面的 SQL 在 “Persons” 表创建时为 “Id_P” 列创建 CHECK 约束。CHECK 约束规定 “Id_P” 列必须只包含大于 0 的整数。
MySQL 
``` sql
CREATE TABLE Person(
      Id_P int NOT NULL,
      LastName varchar(255) NOT NULL,
      FirstName varchar(255),
      Address varchar(255),
      City varchar(255),
      CHECK(Id_P>0)
)
```
SQL SERVER /Oracle/MS Acess
``` sql
CREATE TABLE Persons
(
      Id_P int NOT NULL CHECK (Id_P>0),
      LastName varchar(255) NOT NULL,
      FirstName varchar(255),
      Address varchar(255),
      City varchar(255)
)
```

#### SQL DEFAULT 约束
DEFAULT 约束用于向列中插入默认值。如果没有规定其他的值，那么会将默认值添加到所有的新记录。
``` sql
CREATE TABLE Persons
(
      Id_P int NOT NULL,
      LastName varchar(255) NOT NULL,
      FirstName varchar(255),
      Address varchar(255),
      City varchar(255) DEFAULT 'Sandnes'
)
```

#### SQL CREATE INDEX语句
CREATE INDEX 语句用于在表中创建索引。在不读取整个表的情况下，索引使数据库应用程序可以更快地查找数据。
索引您可以在表中创建索引，以便更加快速高效地查询数据。用户无法看到索引，它们只能被用来加速搜索/查询。

SQL 撤销索引、表以及数据库
通过使用 DROP 语句，可以轻松地删除索引、表和数据库。
``` sql
DROP TABLE 表名称
DROP DATABASE 数据库名称
```

#### SQL TRUNCATE TABLE语句
需要除去表内的数据，但并不删除表本身
请使用 TRUNCATE TABLE 命令（仅仅删除表格中的数据）：
``` sql
TRUNCATE TABLE 表名称
```

#### SQL ALTER TABLE语句
ALTER TABLE 语句用于在已有的表中添加、修改或删除列。
SQL ALTER TABLE 语法
如需在表中添加列，请使用下列语法:
``` sql
ALTER TABLE table_name
ADD column_name datatype
```
要删除表中的列，请使用下列语法
``` sql
ALTER TABLE table_name 
DROP COLUMN column_name
```

#### SQL AUTO INCREMENT 字段
Auto-increment 会在新记录插入表中时生成一个唯一的数字。我们通常希望在每次插入新记录时，自动地创建主键字段的值。我们可以在表中创建一个 auto-increment 字段。
下列 SQL 语句把 “Persons” 表中的 “P_Id” 列定义为 auto-increment 主键：
``` sql
CREATE TABLE Persons
(
      P_Id int NOT NULL AUTO_INCREMENT,
      LastName varchar(255) NOT NULL,
      FirstName varchar(255),
      Address varchar(255),
      City varchar(255),
      PRIMARY KEY (P_Id)
)
```
MySQL 使用 AUTO_INCREMENT 关键字来执行 auto-increment 任务。
默认地，AUTO_INCREMENT 的开始值是 1，每条新记录递增 1。
要让 AUTO_INCREMENT 序列以其他的值起始，请使用下列 SQL 语法：
``` sql
ALTER TABLE Persons AUTO_INCREMENT=100
```
要在 “Persons” 表中插入新记录，我们不必为 “P_Id” 列规定值（会自动添加一个唯一的值）：
``` sql
INSERT INTO Persons (FirstName,LastName)
VALUES ('Bill','Gates')
```
上面的 SQL 语句会在 “Persons” 表中插入一条新记录。”P_Id” 会被赋予一个唯一的值。”FirstName” 会被设置为 “Bill”，”LastName” 列会被设置为 “Gates”。

#### SQL CREATE VIEW 语句
``` sql
CREATE VIEW view_name AS
SELECT column_name(s)
FROM table_name
WHERE condition
```

#### SQL CREATE VIEW实例
可以从某个查询内部、某个存储过程内部，或者从另一个视图内部来使用视图。通过向视图添加函数、join 等等，我们可以向用户精确地提交我们希望提交的数据。

样本数据库 Northwind 拥有一些被默认安装的视图。视图 “Current Product List” 会从 Products 表列出所有正在使用的产品。这个视图使用下列 SQL 创建：

``` sql
CREATE VIEW [Current Product List] AS
SELECT ProductID,ProductName
FROM Products
WHERE Discontinued=No
```
查询上面的视图
``` sql
SELECT * FROM [Current Product List]
```

[2.必学高级SQL语句](https://blog.csdn.net/DARWIN_YU/article/details/1608653)

