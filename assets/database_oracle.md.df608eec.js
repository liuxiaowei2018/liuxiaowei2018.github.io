import{_ as s,o as a,c as n,Q as e}from"./chunks/framework.8048b864.js";const l="/assets/image-20230519130021293.68b8649c.png",o="/assets/image-20230519130133351.dd29f15d.png",p="/assets/image-20230519130315499.6841d030.png",b=JSON.parse('{"title":"Oracle","description":"","frontmatter":{},"headers":[],"relativePath":"database/oracle.md","filePath":"database/oracle.md","lastUpdated":1697176108000}'),c={name:"database/oracle.md"},r=e('<h1 id="oracle" tabindex="-1">Oracle <a class="header-anchor" href="#oracle" aria-label="Permalink to &quot;Oracle&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#原理篇">原理篇</a><ul><li><a href="#体系结构">体系结构</a></li><li><a href="#数据存储结构">数据存储结构</a></li><li><a href="#实例">实例</a></li><li><a href="#用户">用户</a></li><li><a href="#字段数据类型">字段数据类型</a></li></ul></li><li><a href="#运维篇">运维篇</a><ul><li><a href="#oracle11安装">Oracle11安装</a></li></ul></li><li><a href="#使用篇">使用篇</a></li></ul></nav><p>Oracle Database，又名 <code>Oracle RDBMS</code>，简称 Oracle。是甲骨文公司开发的一款<code>关系型数据库</code>。它为各行业在各类环境下（服务器、虚拟机、微机环境下）可以快速搭建一种高效率、可靠性好、高吞吐量的数据库解决方案。</p><h2 id="原理篇" tabindex="-1">原理篇 <a class="header-anchor" href="#原理篇" aria-label="Permalink to &quot;原理篇&quot;">​</a></h2><h3 id="体系结构" tabindex="-1">体系结构 <a class="header-anchor" href="#体系结构" aria-label="Permalink to &quot;体系结构&quot;">​</a></h3><p><img src="'+l+'" alt="image-20230519130021293"></p><h3 id="数据存储结构" tabindex="-1">数据存储结构 <a class="header-anchor" href="#数据存储结构" aria-label="Permalink to &quot;数据存储结构&quot;">​</a></h3><p>Oracle 数据库实际上是一个<code>数据的物理储存系统</code>，数据结构逻辑由<code>物理存储结构</code>与<code>逻辑存储结构</code>构成。</p><blockquote><p>数据结构逻辑关系如下图：</p></blockquote><p><img src="'+o+'" alt="image-20230519130133351"></p><h4 id="物理存储结构" tabindex="-1">物理存储结构 <a class="header-anchor" href="#物理存储结构" aria-label="Permalink to &quot;物理存储结构&quot;">​</a></h4><blockquote><p>存储数据的纯文件。当执行一个 <code>CREATE DATABASE</code> 语句来创建一个新的数据库时，将创建下列文件：</p></blockquote><ul><li><strong>数据文件</strong>：Oracle 数据文件是<code>数据存储的物理单位</code>，数据库的<code>数据是存储在表空间中</code>的。一旦数据文件被加入到某个表空间后，就不能删除这个文件，如果要删除某个数据文件，只能删除其所属于的表空间才行。</li><li><strong>控制文件</strong>：每个 Oracle 数据库都有一个包含元数据的控制文件。元数据用来描述包括<code>数据库名称</code>和<code>数据文件位置</code>的数据库物理结构。</li><li><strong>联机重做日志文件</strong>：每个 Oracle 数据库都有一个联机重做日志，里面包含两个或多个联机重做日志文件。联机重做日志由重做条目组成，能够<code>记录下所有对数据所做的更改</code>。</li></ul><p>除这些文件外，Oracle 数据库还包括如参数文件、网络文件、备份文件以及用于备份和恢复的归档重做日志文件等重要文件。</p><h4 id="逻辑存储结构" tabindex="-1">逻辑存储结构 <a class="header-anchor" href="#逻辑存储结构" aria-label="Permalink to &quot;逻辑存储结构&quot;">​</a></h4><blockquote><p>Oracle 数据库使用逻辑存储结构对<code>磁盘空间使用情况</code>进行精细控制。以下是 Oracle 数据库中的逻辑存储结构：</p></blockquote><ul><li><strong>数据块(Data blocks)</strong>：Oracle 将数据存储在数据块中。数据块也被称为逻辑块，Oracle 块或页，对应于磁盘上的字节数。</li><li><strong>区(Extents)</strong>：用于存储特定类型信息的逻辑连续数据块的具体数量。</li><li><strong>段(Segments)</strong>：分配用于存储用户对象(例如表或索引)的一组范围。</li><li><strong>表空间(Tablespaces)</strong>：Oracle 对物理数据库数据文件（<code>ora/dbf</code>）的逻辑映射。一个数据库在逻辑上被划分成一到若干个表空间，<strong>每个表空间由同一磁盘上的一个或多个数据文件（datafile）组成，一个数据文件只能属于一个表空间</strong>。</li></ul><h3 id="实例" tabindex="-1">实例 <a class="header-anchor" href="#实例" aria-label="Permalink to &quot;实例&quot;">​</a></h3><p>Oracle 实例是客户端应用程序(用户)和数据库之间的接口。<strong>Oracle 实例由三个主要部分组成：系统全局区 (SGA)，程序全局区 (PGA) 和后台进程</strong>。</p><p><img src="'+p+`" alt="image-20230519130315499"></p><p><code>SGA</code> 是实例启动时分配的<code>共享内存结构</code>(所有进程都可用的)，<strong>关闭时释放</strong>。是一组包含一个数据库实例的数据和控制信息的共享内存结构。</p><p><code>PGA</code> 是会话开始时为每个会话分配的<code>私有内存区</code>，当<strong>会话结束时释放</strong>。</p><h4 id="oracle-数据库的后台进程" tabindex="-1">Oracle 数据库的后台进程 <a class="header-anchor" href="#oracle-数据库的后台进程" aria-label="Permalink to &quot;Oracle 数据库的后台进程&quot;">​</a></h4><ul><li><strong>PMON</strong>：数据库中最活跃的一个进程，是调节所有其他进程的<code>进程监视器</code>。能够清理异常连接的数据库连接，并自动向侦听器进程注册数据库实例。</li><li><strong>SMON</strong>：执行系统级清理操作的<code>系统监视进程</code>。它有两个主要职责，包括在发生故障的情况下自动恢复实例，例如断电和清理临时文件。</li><li><strong>DBWR</strong>：数据库编写器。Oracle 在内存中执行每个操作而不是磁盘中，因为在内存中的处理速度比在磁盘上快。DBWR 进程从磁盘读取数据并将其写回到磁盘。一个 Oracle 实例有许多数据库编写器，如：DBW0，DBW1，DBW2等等。</li><li><strong>LGWR</strong>：日志写入过程，是可恢复架构的关键。在数据库中发生的每一个变化都被写出到一个名为 redo 日志文件中用于恢复目的，而这些变化是由 LGWR 进程编写和记录的。LGWR 进程首先将更改写入内存，然后将磁盘写入重做日志，然后将其用于恢复。</li><li><strong>CKPT</strong>：检查点进程。在 Oracle 中，磁盘上的数据称为块，内存中的数据称为缓冲区。当该块写入缓冲区并更改时，缓冲区变脏，需要将其写入磁盘。CKPT 进程使用检查点信息更新控制和数据文件头，并向脏盘写入脏缓冲区的信号。请注意，Oracle 12c 允许全面和增量检查点。</li></ul><h3 id="用户" tabindex="-1">用户 <a class="header-anchor" href="#用户" aria-label="Permalink to &quot;用户&quot;">​</a></h3><p>表当中的数据是由 Oracle 用户放入到表空间当中的，而这些表空间会<strong>随机的把数据放入到一个或者多个数据文件当中</strong>。对表数据的管理是<strong>通过用户对表的管理去查询</strong>，而不是直接对数据文件或表空间进行查询。因为不同用户可以在同一个表空间上面建立相同的表名，但是通过不同的用户管理自己的表数据。</p><h3 id="字段数据类型" tabindex="-1">字段数据类型 <a class="header-anchor" href="#字段数据类型" aria-label="Permalink to &quot;字段数据类型&quot;">​</a></h3><p>Oracle 表是一个二维的数据结构，有列字段和对应列的数据构成一个数据存储的结构。可以简单看成行和列的二维表，列代表着Oracle字段（column），行代表着一行数据（即一条数据记录）。</p><table><thead><tr><th>**数据类型 **</th><th>**类型解释 **</th></tr></thead><tbody><tr><td>VARCHAR2(length)</td><td>字符串类型：存储可变的长度的字符串，length:是字符串的最大长度，默认不填的时候是1，最大长度不超过4000。</td></tr><tr><td>CHAR(length)</td><td>字符串类型：存储固定长度的字符串，length:字符串的固定长度大小，默认是1，最大长度不超过2000。</td></tr><tr><td>NUMBER(a,b)</td><td>数值类型：存储数值类型，可以存整数，也可以存浮点型。a代表数值的最大位数：包含小数位和小数点，b代表小数的位数。例子：number(6,2)，输入123.12345，实际存入：123.12 。number(4,2)，输入12312.345，实际春如：提示不能存入，超过存储的指定的精度。</td></tr><tr><td>DATA</td><td>时间类型：存储的是日期和时间，包括年、月、日、时、分、秒。例子：内置函数sysdate获取的就是DATA类型</td></tr><tr><td>TIMESTAMP</td><td>时间类型：存储的不仅是日期和时间，还包含了时区。例子：内置函数systimestamp获取的就是timestamp类型</td></tr><tr><td>CLOB</td><td>大字段类型：存储的是大的文本，比如：非结构化的txt文本，字段大于4000长度的字符串。</td></tr><tr><td>BLOB</td><td>二进制类型：存储的是二进制对象，比如图片、视频、声音等转换过来的二进制对象</td></tr></tbody></table><h2 id="运维篇" tabindex="-1">运维篇 <a class="header-anchor" href="#运维篇" aria-label="Permalink to &quot;运维篇&quot;">​</a></h2><h3 id="oracle11安装" tabindex="-1">Oracle11安装 <a class="header-anchor" href="#oracle11安装" aria-label="Permalink to &quot;Oracle11安装&quot;">​</a></h3><blockquote><p>使用 docker-compose 安装流程</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 创建docker-compose文件</span></span>
<span class="line"><span style="color:#e1e4e8;">mkdir -p oracle</span></span>
<span class="line"><span style="color:#e1e4e8;">cd oracle</span></span>
<span class="line"><span style="color:#e1e4e8;">vim docker-compose.yml</span></span>
<span class="line"><span style="color:#e1e4e8;"># 启动容器修改配置</span></span>
<span class="line"><span style="color:#e1e4e8;">docker-compose up -d</span></span>
<span class="line"><span style="color:#e1e4e8;">docker exec -it oracle bash</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /home/oracle/</span></span>
<span class="line"><span style="color:#e1e4e8;">source .bash_profile</span></span>
<span class="line"><span style="color:#e1e4e8;"># 容器配置数据库用户</span></span>
<span class="line"><span style="color:#e1e4e8;"># 配置用户 mike </span></span>
<span class="line"><span style="color:#e1e4e8;"># 密码为  yca1cahk</span></span>
<span class="line"><span style="color:#e1e4e8;">sqlplus /nolog</span></span>
<span class="line"><span style="color:#e1e4e8;">SQL&gt; conn /as sysdba</span></span>
<span class="line"><span style="color:#e1e4e8;">SQL&gt; alter user system identified by system;</span></span>
<span class="line"><span style="color:#e1e4e8;">SQL&gt; alter user sys identified by system;</span></span>
<span class="line"><span style="color:#e1e4e8;">SQL&gt; create user mike identified by yca1cahk; </span></span>
<span class="line"><span style="color:#e1e4e8;">SQL&gt; grant connect,resource,dba to mike;</span></span>
<span class="line"><span style="color:#e1e4e8;">SQL&gt; ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;</span></span>
<span class="line"><span style="color:#e1e4e8;">SQL&gt; alter system set processes=2000 scope=spfile;</span></span>
<span class="line"><span style="color:#e1e4e8;">SQL&gt; select * from dba_users t where t.username = &#39;MIKE&#39;;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 创建docker-compose文件</span></span>
<span class="line"><span style="color:#24292e;">mkdir -p oracle</span></span>
<span class="line"><span style="color:#24292e;">cd oracle</span></span>
<span class="line"><span style="color:#24292e;">vim docker-compose.yml</span></span>
<span class="line"><span style="color:#24292e;"># 启动容器修改配置</span></span>
<span class="line"><span style="color:#24292e;">docker-compose up -d</span></span>
<span class="line"><span style="color:#24292e;">docker exec -it oracle bash</span></span>
<span class="line"><span style="color:#24292e;">cd /home/oracle/</span></span>
<span class="line"><span style="color:#24292e;">source .bash_profile</span></span>
<span class="line"><span style="color:#24292e;"># 容器配置数据库用户</span></span>
<span class="line"><span style="color:#24292e;"># 配置用户 mike </span></span>
<span class="line"><span style="color:#24292e;"># 密码为  yca1cahk</span></span>
<span class="line"><span style="color:#24292e;">sqlplus /nolog</span></span>
<span class="line"><span style="color:#24292e;">SQL&gt; conn /as sysdba</span></span>
<span class="line"><span style="color:#24292e;">SQL&gt; alter user system identified by system;</span></span>
<span class="line"><span style="color:#24292e;">SQL&gt; alter user sys identified by system;</span></span>
<span class="line"><span style="color:#24292e;">SQL&gt; create user mike identified by yca1cahk; </span></span>
<span class="line"><span style="color:#24292e;">SQL&gt; grant connect,resource,dba to mike;</span></span>
<span class="line"><span style="color:#24292e;">SQL&gt; ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;</span></span>
<span class="line"><span style="color:#24292e;">SQL&gt; alter system set processes=2000 scope=spfile;</span></span>
<span class="line"><span style="color:#24292e;">SQL&gt; select * from dba_users t where t.username = &#39;MIKE&#39;;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 持久化操作</span></span>
<span class="line"><span style="color:#e1e4e8;">docker cp oracle:/home/oracle/app/oracle/oradata/helowin/ oracle/</span></span>
<span class="line"><span style="color:#e1e4e8;">cd oracle/</span></span>
<span class="line"><span style="color:#e1e4e8;"># 把 helowin 目录所有者赋予 500，因为500是容器内 oracle 组合用户的 id</span></span>
<span class="line"><span style="color:#e1e4e8;">chown -R 500.500 helowin/</span></span>
<span class="line"><span style="color:#e1e4e8;"># 关闭容器并且添加配置</span></span>
<span class="line"><span style="color:#e1e4e8;">docker-compose down</span></span>
<span class="line"><span style="color:#e1e4e8;">vim docker-compose.yml</span></span>
<span class="line"><span style="color:#e1e4e8;">docker-compose up -d</span></span>
<span class="line"><span style="color:#e1e4e8;">docker logs -f oracle</span></span>
<span class="line"><span style="color:#e1e4e8;"># 发现有错误进入容器内部解决</span></span>
<span class="line"><span style="color:#e1e4e8;">docker exec -it oracle bash</span></span>
<span class="line"><span style="color:#e1e4e8;">cd /home/oracle/</span></span>
<span class="line"><span style="color:#e1e4e8;">source .bash_profile </span></span>
<span class="line"><span style="color:#e1e4e8;"># 删除新生成的版本控制文件，将数据卷中的版本控制文件复制为新生成的版本控制文件</span></span>
<span class="line"><span style="color:#e1e4e8;">rm -rf /home/oracle/app/oracle/flash_recovery_area/helowin/control02.ctl</span></span>
<span class="line"><span style="color:#e1e4e8;">cp /home/oracle/app/oracle/oradata/helowin/control01.ctl /home/oracle/app/oracle/flash_recovery_area/helowin/control02.ctl</span></span>
<span class="line"><span style="color:#e1e4e8;">sqlplus / as sysdba</span></span>
<span class="line"><span style="color:#e1e4e8;"># 关闭数据库实例，再启动数据库实例</span></span>
<span class="line"><span style="color:#e1e4e8;">SQL&gt; shutdown immediate</span></span>
<span class="line"><span style="color:#e1e4e8;">SQL&gt; startup</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 持久化操作</span></span>
<span class="line"><span style="color:#24292e;">docker cp oracle:/home/oracle/app/oracle/oradata/helowin/ oracle/</span></span>
<span class="line"><span style="color:#24292e;">cd oracle/</span></span>
<span class="line"><span style="color:#24292e;"># 把 helowin 目录所有者赋予 500，因为500是容器内 oracle 组合用户的 id</span></span>
<span class="line"><span style="color:#24292e;">chown -R 500.500 helowin/</span></span>
<span class="line"><span style="color:#24292e;"># 关闭容器并且添加配置</span></span>
<span class="line"><span style="color:#24292e;">docker-compose down</span></span>
<span class="line"><span style="color:#24292e;">vim docker-compose.yml</span></span>
<span class="line"><span style="color:#24292e;">docker-compose up -d</span></span>
<span class="line"><span style="color:#24292e;">docker logs -f oracle</span></span>
<span class="line"><span style="color:#24292e;"># 发现有错误进入容器内部解决</span></span>
<span class="line"><span style="color:#24292e;">docker exec -it oracle bash</span></span>
<span class="line"><span style="color:#24292e;">cd /home/oracle/</span></span>
<span class="line"><span style="color:#24292e;">source .bash_profile </span></span>
<span class="line"><span style="color:#24292e;"># 删除新生成的版本控制文件，将数据卷中的版本控制文件复制为新生成的版本控制文件</span></span>
<span class="line"><span style="color:#24292e;">rm -rf /home/oracle/app/oracle/flash_recovery_area/helowin/control02.ctl</span></span>
<span class="line"><span style="color:#24292e;">cp /home/oracle/app/oracle/oradata/helowin/control01.ctl /home/oracle/app/oracle/flash_recovery_area/helowin/control02.ctl</span></span>
<span class="line"><span style="color:#24292e;">sqlplus / as sysdba</span></span>
<span class="line"><span style="color:#24292e;"># 关闭数据库实例，再启动数据库实例</span></span>
<span class="line"><span style="color:#24292e;">SQL&gt; shutdown immediate</span></span>
<span class="line"><span style="color:#24292e;">SQL&gt; startup</span></span></code></pre></div><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;3.1&#39;</span></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">master</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">oracle</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">privileged</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">1521:1521</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;3.1&#39;</span></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">master</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">oracle</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">privileged</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">1521:1521</span></span></code></pre></div><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;3.1&#39;</span></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">master</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">oracle</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">privileged</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">1521:1521</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">./helowin/:/home/oracle/app/oracle/oradata/helowin/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;3.1&#39;</span></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">master</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">registry.cn-hangzhou.aliyuncs.com/helowin/oracle_11g</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">oracle</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">privileged</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">1521:1521</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">./helowin/:/home/oracle/app/oracle/oradata/helowin/</span></span></code></pre></div><h2 id="使用篇" tabindex="-1">使用篇 <a class="header-anchor" href="#使用篇" aria-label="Permalink to &quot;使用篇&quot;">​</a></h2><blockquote><p>参考文档： <a href="https://www.oraclejsq.com/article/010100139.html" target="_blank" rel="noreferrer">https://www.oraclejsq.com/article/010100139.html</a></p></blockquote>`,38),t=[r];function i(d,y,h,E,m,g){return a(),n("div",null,t)}const k=s(c,[["render",i]]);export{b as __pageData,k as default};
