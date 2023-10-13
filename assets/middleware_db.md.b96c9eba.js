import{_ as a,o as t,c as r,Q as e}from"./chunks/framework.8048b864.js";const o="/assets/image-20230212115908598.28ab9726.png",l="/assets/image-20230212115938764.f2316adf.png",i="/assets/image-20230212120435741.9c7af073.png",d="/assets/image-20230212120603841.b35de937.png",n="/assets/image-20230421180540593.073d7ac4.png",_=JSON.parse('{"title":"数据库中间件","description":"","frontmatter":{},"headers":[],"relativePath":"middleware/db.md","filePath":"middleware/db.md","lastUpdated":1697176108000}'),s={name:"middleware/db.md"},h=e('<h1 id="数据库中间件" tabindex="-1">数据库中间件 <a class="header-anchor" href="#数据库中间件" aria-label="Permalink to &quot;数据库中间件&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#orm框架">ORM框架</a><ul><li><a href="#mybatis">Mybatis</a></li><li><a href="#mybatis-plus">Mybatis Plus</a></li></ul></li><li><a href="#数据库连接池">数据库连接池</a><ul><li><a href="#druid">Druid</a></li></ul></li><li><a href="#分库分表">分库分表</a><ul><li><a href="#前言">前言</a></li><li><a href="#shardingjdbc">ShardingJdbc</a></li></ul></li><li><a href="#etl框架">ETL框架</a><ul><li><a href="#canal">Canal</a></li></ul></li></ul></nav><blockquote><p>数据库中间件：数据库就是底层，我们写的程序就是业务端，数据库中间件就是（和业务无关）的可以实现数据库一些功能的组件。</p></blockquote><h2 id="orm框架" tabindex="-1">ORM框架 <a class="header-anchor" href="#orm框架" aria-label="Permalink to &quot;ORM框架&quot;">​</a></h2><blockquote><p>ORM（Object Relational Mapping）框架采用<a href="https://baike.baidu.com/item/%E5%85%83%E6%95%B0%E6%8D%AE/1946090?fromModule=lemma_inlink" target="_blank" rel="noreferrer">元数据</a>来描述对象与关系映射的细节，元数据一般采用<a href="https://baike.baidu.com/item/XML%E6%A0%BC%E5%BC%8F/4660509?fromModule=lemma_inlink" target="_blank" rel="noreferrer">XML格式</a>，并且存放在专门的对象一映射文件中</p></blockquote><h3 id="mybatis" tabindex="-1">Mybatis <a class="header-anchor" href="#mybatis" aria-label="Permalink to &quot;Mybatis&quot;">​</a></h3><blockquote><p>MyBatis 是支持定制化SQL、存储过程以及高级映射的优秀的持久层框架。</p></blockquote><h3 id="mybatis-plus" tabindex="-1">Mybatis Plus <a class="header-anchor" href="#mybatis-plus" aria-label="Permalink to &quot;Mybatis Plus&quot;">​</a></h3><blockquote><p>MyBatis-Plus (opens new window)（简称 MP）是一个 MyBatis (opens new window)的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。</p></blockquote><h2 id="数据库连接池" tabindex="-1">数据库连接池 <a class="header-anchor" href="#数据库连接池" aria-label="Permalink to &quot;数据库连接池&quot;">​</a></h2><h3 id="druid" tabindex="-1">Druid <a class="header-anchor" href="#druid" aria-label="Permalink to &quot;Druid&quot;">​</a></h3><blockquote><p>Druid是阿里巴巴开发的号称为监控而生的数据库连接池</p></blockquote><h2 id="分库分表" tabindex="-1">分库分表 <a class="header-anchor" href="#分库分表" aria-label="Permalink to &quot;分库分表&quot;">​</a></h2><h3 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h3><blockquote><p>针对公司的公司业务发展越好，用户就越多，数据量越大，请求量越大，那你单个数据库一定扛不住</p><p>当单表数据量达到千万级别，需要考虑分库分表</p></blockquote><p>比如你单表都几千万数据了，你确定你能扛住么？绝对不行，<strong>单表数据量太大</strong>，会极大影响你的 sql <strong>执行的性能</strong>，到了后面你的 sql 可能就跑的很慢了。一般来说，就以我的经验来看，单表到几百万的时候，性能就会相对差一些了，你就得分表了。</p><p><code>分表是啥意思？</code>就是把一个表的数据放到多个表中，然后查询的时候你就查一个表。比如按照用户 id 来分表，将一个用户的数据就放在一个表中。然后操作的时候你对一个用户就操作那个表就好了。这样可以控制每个表的数据量在可控的范围内，比如每个表就固定在 200 万以内。</p><p><code>分库是啥意思？</code>就是你一个库一般我们经验而言，最多支撑到并发 2000，一定要扩容了，而且一个健康的单库并发值你最好保持在每秒 1000 左右，不要太大。那么你可以将一个库的数据拆分到多个库中，访问的时候就访问一个库好了。</p><table><thead><tr><th>#</th><th>分库分表前</th><th>分库分表后</th></tr></thead><tbody><tr><td>并发支撑情况</td><td>MySQL 单机部署，扛不住高并发</td><td>MySQL 从单机到多机，能承受的并发增加了多倍</td></tr><tr><td>磁盘使用情况</td><td>MySQL 单机磁盘容量几乎撑满</td><td>拆分为多个库，数据库服务器磁盘使用率大大降低</td></tr><tr><td>SQL 执行性能</td><td>单表数据量太大，SQL 越跑越慢</td><td>单表数据量减少，SQL 执行效率明显提升</td></tr></tbody></table><h4 id="中间件选型" tabindex="-1">中间件选型 <a class="header-anchor" href="#中间件选型" aria-label="Permalink to &quot;中间件选型&quot;">​</a></h4><p>比较常见的分库分表中间件包括：</p><ul><li>Cobar</li><li>TDDL</li><li>Atlas</li><li>Sharding-jdbc</li><li>Mycat</li></ul><table><thead><tr><th></th><th>描述</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td>Cobar</td><td>阿里 b2b 团队开发和开源的，属于 proxy 层方案，就是介于应用服务器和数据库服务器之间。应用程序通过 JDBC 驱动访问 Cobar 集群，Cobar 根据 SQL 和分库规则对 SQL 做分解，然后分发到 MySQL 集群不同的数据库实例上执行</td><td></td><td>不支持读写分离、存储过程、跨库 join 和分页等操作</td></tr><tr><td>TDDL</td><td>淘宝团队开发的，属于 client 层方案</td><td>支持基本的 crud 语法和读写分离</td><td>不支持 join、多表查询等语法，还依赖淘宝的 diamond 配置管理系统</td></tr><tr><td>Atlas</td><td>360 开源，属于 proxy 层方案</td><td></td><td>维护都在 5 年前</td></tr><tr><td>Sharding-jdbc</td><td>client 层方案，是<a href="https://shardingsphere.apache.org/" target="_blank" rel="noreferrer"><code>ShardingSphere</code></a>的 client 层方案，<a href="https://shardingsphere.apache.org/" target="_blank" rel="noreferrer"><code>ShardingSphere</code></a>还提供 proxy 层的方案 Sharding-Proxy</td><td>支持分库分表、读写分离、分布式 id 生成、柔性事务（最大努力送达型事务、TCC 事务）</td><td></td></tr><tr><td>Mycat</td><td>基于 Cobar 改造的，属于 proxy 层方案</td><td></td><td>相比于 Sharding jdbc 来说，年轻一些，经历的锤炼少一些</td></tr></tbody></table><p><strong>总结</strong></p><p>综上，现在其实建议考量的，就是 Sharding-jdbc 和 Mycat，这两个都可以去考虑使用。</p><p>Sharding-jdbc 这种 client 层方案的<strong>优点在于不用部署，运维成本低，不需要代理层的二次转发请求，性能很高</strong>，但是如果遇到升级啥的需要各个系统都重新升级版本再发布，各个系统都需要<strong>耦合</strong> Sharding-jdbc 的依赖；</p><p>Mycat 这种 proxy 层方案的<strong>缺点在于需要部署</strong>，自己运维一套中间件，运维成本高，但是<strong>好处在于对于各个项目是透明的</strong>，如果遇到升级之类的都是自己中间件那里搞就行了。</p><p>通常来说，这两个方案其实都可以选用，但是我个人建议中小型公司选用 Sharding-jdbc，client 层方案轻便，而且维护成本低，不需要额外增派人手，而且中小型公司系统复杂度会低一些，项目也没那么多；但是中大型公司最好还是选用 Mycat 这类 proxy 层方案，因为可能大公司系统和项目非常多，团队很大，人员充足，那么最好是专门弄个人来研究和维护 Mycat，然后大量项目直接透明使用即可。</p><h4 id="垂直拆分与水平拆分" tabindex="-1">垂直拆分与水平拆分 <a class="header-anchor" href="#垂直拆分与水平拆分" aria-label="Permalink to &quot;垂直拆分与水平拆分&quot;">​</a></h4><p><strong>水平拆分</strong>的意思，就是把一个表的数据给弄到多个库的多个表里去，但是每个库的表结构都一样，只不过每个库表放的数据是不同的，所有库表的数据加起来就是全部数据。水平拆分的意义，就是将数据均匀放更多的库里，然后用多个库来扛更高的并发，还有就是用多个库的存储容量来进行扩容。</p><p><img src="'+o+'" alt="image-20230212115908598"></p><p><strong>垂直拆分</strong>的意思，就是<strong>把一个有很多字段的表给拆分成多个表</strong>，<strong>或者是多个库上去</strong>。每个库表的结构都不一样，每个库表都包含部分字段。一般来说，会<strong>将较少的访问频率很高的字段放到一个表里去</strong>，然后<strong>将较多的访问频率很低的字段放到另外一个表里去</strong>。因为数据库是有缓存的，你访问频率高的行字段越少，就可以在缓存里缓存更多的行，性能就越好。这个一般在表层面做的较多一些。</p><p><img src="'+l+'" alt="image-20230212115938764"></p><p><strong>分库分表一般采用的方式</strong>：</p><ul><li>一种是按照 range 来分，就是每个库一段连续的数据，这个一般是按比如<strong>时间范围</strong>来的，但是这种一般较少用，因为很容易产生热点问题，大量的流量都打在最新的数据上了。</li><li>或者是按照某个字段 hash 一下均匀分散（较为常用）</li></ul><p>range 来分，好处在于说，扩容的时候很简单，因为你只要预备好，给每个月都准备一个库就可以了，到了一个新的月份的时候，自然而然，就会写新的库了；缺点，但是大部分的请求，都是访问最新的数据。实际生产用 range，要看场景。</p><p>hash 分发，好处在于说，可以平均分配每个库的数据量和请求压力；坏处在于说扩容起来比较麻烦，会有一个数据迁移的过程，之前的数据需要重新计算 hash 值重新分配到不同的库或表。</p><h4 id="分库分表的平滑过渡" tabindex="-1">分库分表的平滑过渡 <a class="header-anchor" href="#分库分表的平滑过渡" aria-label="Permalink to &quot;分库分表的平滑过渡&quot;">​</a></h4><blockquote><p>现有一个未分库分表的系统，未来要分库分表，如何设计才可以让系统从未分库分表<strong>动态切换</strong>到分库分表？</p></blockquote><h5 id="停机迁移方案" tabindex="-1">停机迁移方案 <a class="header-anchor" href="#停机迁移方案" aria-label="Permalink to &quot;停机迁移方案&quot;">​</a></h5><p>凌晨 12 点开始运维，网站或者 app 挂个公告，说 0 点到早上 6 点进行运维，无法访问。</p><p>接着到 0 点停机，系统停掉，没有流量写入了，此时老的单库单表数据库静止了。然后你之前得写好一个<strong>导数的一次性工具</strong>，此时直接跑起来，然后将单库单表的数据哗哗哗读出来，写到分库分表里面去。</p><p>导数完了之后，就 ok 了，修改系统的数据库连接配置啥的，包括可能代码和 SQL 也许有修改，那你就用最新的代码，然后直接启动连到新的分库分表上去。</p><p>最后验证一下。</p><p><img src="'+i+'" alt="image-20230212120435741"></p><h5 id="双写迁移方案" tabindex="-1">双写迁移方案 <a class="header-anchor" href="#双写迁移方案" aria-label="Permalink to &quot;双写迁移方案&quot;">​</a></h5><p>在线上系统里面，之前所有写库的地方，增删改操作，<strong>除了对老库增删改，都加上对新库的增删改</strong>，这就是所谓的<strong>双写</strong>，同时写俩库，老库和新库。</p><p><strong>系统部署</strong>之后，新库数据差太远，用之前说的导数工具，跑起来读老库数据写新库，写的时候要根据 gmt_modified 这类字段判断这条数据最后修改的时间，除非是读出来的数据在新库里没有，或者是比新库的数据新才会写。简单来说，就是不允许用老数据覆盖新数据。</p><p>导完一轮之后，有可能数据还是存在不一致，那么就程序自动做一轮校验，比对新老库每个表的每条数据，接着如果有不一样的，就针对那些不一样的，从老库读数据再次写。反复循环，直到两个库每个表的数据都完全一致为止。</p><p>当数据完全一致了，就 ok 了，基于仅仅使用分库分表的最新代码，重新部署一次，不就仅仅基于分库分表在操作了么，还没有停机时间，是常用的一种迁移方案。</p><p><img src="'+d+'" alt="image-20230212120603841"></p><h4 id="分库分表的动态扩容缩容" tabindex="-1">分库分表的动态扩容缩容 <a class="header-anchor" href="#分库分表的动态扩容缩容" aria-label="Permalink to &quot;分库分表的动态扩容缩容&quot;">​</a></h4><h5 id="停机扩容" tabindex="-1">停机扩容 <a class="header-anchor" href="#停机扩容" aria-label="Permalink to &quot;停机扩容&quot;">​</a></h5><p>跟停机迁移一样，步骤几乎一致，唯一的一点就是那个导数的工具，是把现有库表的数据抽出来慢慢倒入到新的库和表里去。但是数据量特别大这种停机扩容的方案是不行的，不推荐使用</p><h5 id="优化扩容" tabindex="-1">优化扩容 <a class="header-anchor" href="#优化扩容" aria-label="Permalink to &quot;优化扩容&quot;">​</a></h5><ol><li>设定好几台数据库服务器，每台服务器上几个库，每个库多少个表，推荐是 32 库 * 32 表，对于大部分公司来说，可能几年都够了。</li><li>路由的规则，orderId 模 32 = 库，orderId / 32 模 32 = 表</li><li>扩容的时候，申请增加更多的数据库服务器，装好 MySQL，呈倍数扩容，4 台服务器，扩到 8 台服务器，再到 16 台服务器。</li><li>由 DBA 负责将原先数据库服务器的库，迁移到新的数据库服务器上去，库迁移是有一些便捷的工具的。</li><li>我们这边就是修改一下配置，调整迁移的库所在数据库服务器的地址。</li><li>重新发布系统，上线，原先的路由规则变都不用变，直接可以基于 n 倍的数据库服务器的资源，继续进行线上系统的提供服务。</li></ol><h3 id="shardingjdbc" tabindex="-1">ShardingJdbc <a class="header-anchor" href="#shardingjdbc" aria-label="Permalink to &quot;ShardingJdbc&quot;">​</a></h3><blockquote><p>官方文档：<a href="https://github.com/apache/shardingsphere" target="_blank" rel="noreferrer">https://github.com/apache/shardingsphere</a></p></blockquote><h2 id="etl框架" tabindex="-1">ETL框架 <a class="header-anchor" href="#etl框架" aria-label="Permalink to &quot;ETL框架&quot;">​</a></h2><blockquote><p><strong>ETL</strong>，是英文 Extract-Transform-Load 的缩写，用来描述将数据从来源端经过抽取（extract）、转换（transform）、加载（load）至目的端的过程。<strong>ETL</strong>一词较常用在<a href="https://so.csdn.net/so/search?q=%E6%95%B0%E6%8D%AE%E4%BB%93%E5%BA%93&amp;spm=1001.2101.3001.7020" target="_blank" rel="noreferrer">数据仓库</a>，但其对象并不限于数据仓库。</p></blockquote><p><a href="https://so.csdn.net/so/search?q=ETL&amp;spm=1001.2101.3001.7020" target="_blank" rel="noreferrer">ETL</a>是构建数据仓库的重要一环，用户从数据源抽取出所需的数据，经过数据清洗,最终按照预先定义好的数据仓库模型，将数据加载到数据仓库中去。</p><h3 id="canal" tabindex="-1">Canal <a class="header-anchor" href="#canal" aria-label="Permalink to &quot;Canal&quot;">​</a></h3><blockquote><p>Canal，主要用途是基于 <strong>MySQL 数据库增量日志解析</strong>，提供<strong>增量数据订阅和消费</strong>。</p></blockquote><p><img src="'+n+'" alt="image-20230421180540593"></p><blockquote><p>官方文档：<a href="https://github.com/alibaba/canal" target="_blank" rel="noreferrer">https://github.com/alibaba/canal</a></p></blockquote><p>​</p><h1 id="⮞-mybatis" tabindex="-1"><a href="./../second/db/mybatis.html">⮞ Mybatis</a> <a class="header-anchor" href="#⮞-mybatis" aria-label="Permalink to &quot;[⮞ Mybatis](./../second/db/mybatis.md)&quot;">​</a></h1>',67),c=[h];function p(b,g,u,m,q,f){return t(),r("div",null,c)}const y=a(s,[["render",p]]);export{_ as __pageData,y as default};
