import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.8048b864.js";const u=JSON.parse('{"title":"Redis","description":"","frontmatter":{},"headers":[],"relativePath":"redis/redis.md","filePath":"redis/redis.md","lastUpdated":1719037022000}'),p={name:"redis/redis.md"},e=l(`<h1 id="redis" tabindex="-1">Redis <a class="header-anchor" href="#redis" aria-label="Permalink to &quot;Redis&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#redis数据结构">Redis数据结构</a><ul><li><a href="#跳表">跳表</a></li></ul></li><li><a href="#redis-持久化">Redis 持久化</a><ul><li><a href="#rdb">RDB</a></li><li><a href="#aof">AOF</a></li></ul></li><li><a href="#redis-缓存策略">Redis 缓存策略</a><ul><li><a href="#缓存过期策略">缓存过期策略</a></li><li><a href="#缓存淘汰机制">缓存淘汰机制</a></li></ul></li><li><a href="#redis-缓存问题">Redis 缓存问题</a><ul><li><a href="#缓存穿透">缓存穿透</a></li><li><a href="#缓存击穿">缓存击穿</a></li><li><a href="#缓存雪崩">缓存雪崩</a></li><li><a href="#缓存倾斜">缓存倾斜</a></li><li><a href="#缓存与数据库双写一致性">缓存与数据库双写一致性</a></li></ul></li><li><a href="#redis-事务">Redis 事务</a></li><li><a href="#redis-高可用">Redis 高可用</a><ul><li><a href="#_2-6-1、redis-主从架构">2.6.1、Redis 主从架构</a></li><li><a href="#_2-6-2、redis-哨兵模式">2.6.2、Redis 哨兵模式</a></li><li><a href="#_2-6-3、redis分片集群">2.6.3、Redis分片集群</a></li></ul></li></ul></nav><h2 id="redis数据结构" tabindex="-1">Redis数据结构 <a class="header-anchor" href="#redis数据结构" aria-label="Permalink to &quot;Redis数据结构&quot;">​</a></h2><h3 id="跳表" tabindex="-1">跳表 <a class="header-anchor" href="#跳表" aria-label="Permalink to &quot;跳表&quot;">​</a></h3><p>将<strong>单链表先进行排序</strong>，然后针对 <strong>有序链表</strong> 为了实现高效的查找，可以使用跳表这种<a href="https://so.csdn.net/so/search?q=%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84&amp;spm=1001.2101.3001.7020" target="_blank" rel="noreferrer">数据结构</a>。</p><p>其根本思想是 <strong>二分查找</strong> 的思想。</p><p>跳表的前提条件是 针对 <strong>有序的单链表</strong> ，实现高效地查找，插入，删除。</p><p>Redis中的 有序集合 <strong>sorted set</strong> 就是用跳表实现的。</p><ul><li>跳表结合了链表和二分查找的思想</li><li>由原始链表和一些通过“跳跃”生成的链表组成</li><li>第0层是原始链表，越上层“跳跃”的越高，元素越少</li><li>上层链表是下层链表的子序列</li><li>查找时从顶层向下，不断缩小搜索范围</li></ul><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301659254.png" alt="image-20220831132054924"></p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301659685.png" alt="image-20220831132156312"></p><h2 id="redis-持久化" tabindex="-1">Redis 持久化 <a class="header-anchor" href="#redis-持久化" aria-label="Permalink to &quot;Redis 持久化&quot;">​</a></h2><h3 id="rdb" tabindex="-1">RDB <a class="header-anchor" href="#rdb" aria-label="Permalink to &quot;RDB&quot;">​</a></h3><p>RDB持久化是指<code>在指定的时间间隔内将内存中的数据集快照写入磁盘[默认]，将内存中数据以快照的方式写入到二进制文件中,默认的文件名为dump.rdb,具体操作是Redis进程执行fork操作创建子进程，RDB持久化过程由子进程负责，完成后自动结束</code>。阻塞只发生在fork阶段，一般时间很短。基本上Redis内部所有的RDB操作都是采用 <code>bgsave </code>命令</p><blockquote><p>Redis是单线程，RDB阻塞fork耗时问题？</p></blockquote><p>以RDB持久化的过程为例，假设我们在配置上是定时去执行RDB存储。edis有自己的一套事件处理机制，主要处理文件事件（命令请求和应答等等）和时间事件（RDB定时持久化、清理过期的Key等的），线程不停地轮询就绪的事件，发现RDB的事件可执行时，则调用BGSAVE命令，fork出一个子进程来进行完成持久化（生成RDB文件）</p><h3 id="aof" tabindex="-1">AOF <a class="header-anchor" href="#aof" aria-label="Permalink to &quot;AOF&quot;">​</a></h3><p>根据配置将写命令存储至日志文件中，顺序写（buffer缓冲区）&amp;&amp;异步刷盘(子线程)，重写AOF文件也是需要 fork 子进程。Redis4.0之后支持混合持久化。</p><p>AOF持久化策略</p><ul><li>appendfsync always：每执行一个写操作，立即将该命令持久化到AOF文件中，性能比较差</li><li>appendfsync everysec：每秒持久化一次</li><li>appendfsync no：redis根据不同的情况，在一定的时间段中进行持久化</li></ul><blockquote><p>同时开启了RDB和AOF，redis重启之后默认首先执行AOF中的命令，加载数据，之后同步RDB文件中的数据，有可能存在RDB文件中的数据将AOF执行后的数据覆盖</p></blockquote><h2 id="redis-缓存策略" tabindex="-1">Redis 缓存策略 <a class="header-anchor" href="#redis-缓存策略" aria-label="Permalink to &quot;Redis 缓存策略&quot;">​</a></h2><h3 id="缓存过期策略" tabindex="-1">缓存过期策略 <a class="header-anchor" href="#缓存过期策略" aria-label="Permalink to &quot;缓存过期策略&quot;">​</a></h3><p>1.<code>定期删除</code>，Redis 默认是每隔 100ms 就随机抽取一些设置了过期时间的 key，检查其是否过期，如果过期就删除。[100ms间隔查看3个key] 2.<code>惰性删除</code>，操作key时redis会检查key的有效期，如果到期则删除key，并返回空值给用户</p><h3 id="缓存淘汰机制" tabindex="-1">缓存淘汰机制 <a class="header-anchor" href="#缓存淘汰机制" aria-label="Permalink to &quot;缓存淘汰机制&quot;">​</a></h3><p>Redis内存已经存满的情况下，再添加一个新的key的数据，执行淘汰机制</p><ul><li>volatile-lru 在内存不足的时，Redis会将设置了过期时间的可以中干掉一个最近最少使用的key</li><li>allkeys-lru 在内存不足时，Redis会从所有的key中干掉一个最近最少使用的key（<strong>最常用</strong>）</li><li>volatile-lfu 在内存不足的时，Redis会将从设置了过期时间的key中干掉一个使用频次最少的key</li><li>allkeys-lfu 在内存不足的时，Redis会将从所有的key中干掉一个使用频次最少的key</li><li>volatile-random 在内存不足的时，Redis会随机的从设置了过期时间的key中干掉一个</li><li>allkeys-random 在内存不足的时，Redis会随机的从所有的key中干掉一个</li><li>volatile-ttl 在内部不足时，Redis将有效期最短的key干掉</li><li>noeviction 内存不足时，直接报错（<strong>Redis默认的策略</strong>）</li></ul><h4 id="lru算法实现" tabindex="-1">LRU算法实现 <a class="header-anchor" href="#lru算法实现" aria-label="Permalink to &quot;LRU算法实现&quot;">​</a></h4><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301659959.png" alt="image-20230211194643871"></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LRUCache</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">K</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">V</span><span style="color:#E1E4E8;">&gt; extend LinkedHashMap&lt;</span><span style="color:#F97583;">K</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">V</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> capacity;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 构造方法</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">capacity</span><span style="color:#6A737D;"> 缓存大小</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LRUCache</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">capacity</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">(capacity,</span><span style="color:#79B8FF;">0.75f</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.capacity </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> capacity;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 如果map中的数据量大于设定的最大容量，返回true，再新加入对象时删除最老的数据</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">eldest</span><span style="color:#6A737D;"> 最老的数据项</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> true则移除最老的数据</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Overrrite</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">removeEldestEntry</span><span style="color:#E1E4E8;">(Map.Entry&lt;</span><span style="color:#F97583;">K</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">V</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">eldest</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 当map中的数据量大于指定缓存容量时，自动移除最老的数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> capacity;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LRUCache</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">K</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">V</span><span style="color:#24292E;">&gt; extend LinkedHashMap&lt;</span><span style="color:#D73A49;">K</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">V</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> capacity;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 构造方法</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">capacity</span><span style="color:#6A737D;"> 缓存大小</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LRUCache</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">capacity</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">(capacity,</span><span style="color:#005CC5;">0.75f</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.capacity </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> capacity;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 如果map中的数据量大于设定的最大容量，返回true，再新加入对象时删除最老的数据</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">eldest</span><span style="color:#6A737D;"> 最老的数据项</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> true则移除最老的数据</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Overrrite</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">removeEldestEntry</span><span style="color:#24292E;">(Map.Entry&lt;</span><span style="color:#D73A49;">K</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">V</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">eldest</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 当map中的数据量大于指定缓存容量时，自动移除最老的数据</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> capacity;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="redis-缓存问题" tabindex="-1">Redis 缓存问题 <a class="header-anchor" href="#redis-缓存问题" aria-label="Permalink to &quot;Redis 缓存问题&quot;">​</a></h2><h3 id="缓存穿透" tabindex="-1">缓存穿透 <a class="header-anchor" href="#缓存穿透" aria-label="Permalink to &quot;缓存穿透&quot;">​</a></h3><p>缓存穿透是指长时间流量缓存无法命中Key，换而言之Key值不存在。假如一个查询条件无查询结果，并且业务对无结果的Key执行不缓存操作，每次查询流量都会打入数据库，当流量中有较多的Key长时间无法命中，缓存穿透现象发生。</p><blockquote><p>使用布隆过滤器</p></blockquote><blockquote><p>使用BitMap(<code>需要精确判断的场景，优先选择BitMap</code>)</p></blockquote><p>使用BitMap动态维护一个集合，当访问数据库前，先查询数据的主键是否存在集合中，以此作为是否访问数据库的依据。</p><p>BitMap新增数据或者移除数据属于轻量级操作，检查操作的准确度依赖于动态集合维护的闭环的完整性。比如向数据库增加数据时需要向BitMap中添加数据，从数据库中删除数据需要从BitMap中移除数据。如果要求严格的检查可靠性，则可以单独维护一个分布式定时任务，定期更新BitMap数据。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 查询订单详情</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">orderId</span><span style="color:#6A737D;"> 订单ID</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> BuOrder</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> BuOrder </span><span style="color:#B392F0;">getOrder</span><span style="color:#E1E4E8;">(Integer orderId) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/* 如果不存在，则快速返回，流量不走DB */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">RedisUtils.</span><span style="color:#B392F0;">getBit</span><span style="color:#E1E4E8;">(ORDER_BITMAP_KEY, orderId)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getById</span><span style="color:#E1E4E8;">(orderId);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 查询订单详情</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">orderId</span><span style="color:#6A737D;"> 订单ID</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> BuOrder</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> BuOrder </span><span style="color:#6F42C1;">getOrder</span><span style="color:#24292E;">(Integer orderId) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/* 如果不存在，则快速返回，流量不走DB */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">RedisUtils.</span><span style="color:#6F42C1;">getBit</span><span style="color:#24292E;">(ORDER_BITMAP_KEY, orderId)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getById</span><span style="color:#24292E;">(orderId);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="缓存击穿" tabindex="-1">缓存击穿 <a class="header-anchor" href="#缓存击穿" aria-label="Permalink to &quot;缓存击穿&quot;">​</a></h3><p>缓存击穿是指某个Key在访问流量较高的情况下，缓存突然失效，瞬间无缓冲流量全部打到数据库，数据库压力瞬间剧增。缓存击穿的特点是发生概率小、危害大。</p><blockquote><ul><li><p>适当延长热点Key缓存过期时间</p></li><li><p>更新缓存采用互斥锁来实现，只有获得锁的请求方能连接数据库查询数据</p></li></ul></blockquote><h3 id="缓存雪崩" tabindex="-1">缓存雪崩 <a class="header-anchor" href="#缓存雪崩" aria-label="Permalink to &quot;缓存雪崩&quot;">​</a></h3><p>存在某时刻大面积缓存Key失效的情况，当Key失效数据未更新，并且同时有流量请求时，可能会发生雪崩现象（数据库因查询连接过多宕机或者响应缓慢）。</p><blockquote><ul><li><p>不同的业务缓存采用不同的过期时间</p></li><li><p>相同的业务在原来恒定过期时间基础上增加随机数，尽可能减少缓存Key在同一时刻失效的数量。</p></li></ul></blockquote><h3 id="缓存倾斜" tabindex="-1">缓存倾斜 <a class="header-anchor" href="#缓存倾斜" aria-label="Permalink to &quot;缓存倾斜&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">问题：热点数据可能在某台redis服务器上，这样会导致这台redis服务器需要接收大量的请求！</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">.扩展主从结构，扩展大量的从服务器，减轻主服务器的压力</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">.将热点数据备份到JVM内存中</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">问题：热点数据可能在某台redis服务器上，这样会导致这台redis服务器需要接收大量的请求！</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">.扩展主从结构，扩展大量的从服务器，减轻主服务器的压力</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">.将热点数据备份到JVM内存中</span></span></code></pre></div><h3 id="缓存与数据库双写一致性" tabindex="-1">缓存与数据库双写一致性 <a class="header-anchor" href="#缓存与数据库双写一致性" aria-label="Permalink to &quot;缓存与数据库双写一致性&quot;">​</a></h3><h4 id="cache-aside-pattern" tabindex="-1">Cache Aside Pattern <a class="header-anchor" href="#cache-aside-pattern" aria-label="Permalink to &quot;Cache Aside Pattern&quot;">​</a></h4><ul><li>读的时候，先读缓存，缓存没有的话，就读数据库，然后取出数据后放入缓存，同时返回响应。</li><li>更新的时候，<strong>先更新数据库，然后再删除缓存</strong>。</li></ul><h4 id="初级缓存不一致问题及解决方案" tabindex="-1">初级缓存不一致问题及解决方案 <a class="header-anchor" href="#初级缓存不一致问题及解决方案" aria-label="Permalink to &quot;初级缓存不一致问题及解决方案&quot;">​</a></h4><p>问题：先更新数据库，再删除缓存。如果删除缓存失败了，那么会导致数据库中是新数据，缓存中是旧数据，数据就出现了不一致。</p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301659086.png" alt="image-20230211193245438"></p><p>解决思路 1：先删除缓存，再更新数据库。如果数据库更新失败了，那么数据库中是旧数据，缓存中是空的，那么数据不会不一致。因为读的时候缓存没有，所以去读了数据库中的旧数据，然后更新到缓存中。</p><p>解决思路 2：延时双删。依旧是先更新数据库，再删除缓存，唯一不同的是，我们把这个删除的动作，在不久之后再执行一次，比如 5s 之后。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(key, value) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">putToDb</span><span style="color:#E1E4E8;">(key, value);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">deleteFromRedis</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ... a few seconds later</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">deleteFromRedis</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(key, value) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">putToDb</span><span style="color:#24292E;">(key, value);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">deleteFromRedis</span><span style="color:#24292E;">(key);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ... a few seconds later</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">deleteFromRedis</span><span style="color:#24292E;">(key);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>删除的动作，可以有多种选择，比如：1. 使用 <code>DelayQueue</code>，会随着 JVM 进程的死亡，丢失更新的风险；2. 放在 <code>MQ</code>，但编码复杂度为增加。总之，我们需要综合各种因素去做设计，选择一个最合理的解决方案。</p></blockquote><h4 id="复杂的数据不一致问题分析" tabindex="-1">复杂的数据不一致问题分析 <a class="header-anchor" href="#复杂的数据不一致问题分析" aria-label="Permalink to &quot;复杂的数据不一致问题分析&quot;">​</a></h4><p>数据发生了变更，先删除了缓存，然后要去修改数据库，此时还没修改。一个请求过来，去读缓存，发现缓存空了，去查询数据库，<strong>查到了修改前的旧数据</strong>，放到了缓存中。随后数据变更的程序完成了数据库的修改。完了，数据库和缓存中的数据不一样了...</p><p><strong>为什么上亿流量高并发场景下，缓存会出现这个问题？</strong></p><p>只有在对一个数据在并发的进行读写的时候，才可能会出现这种问题。其实如果说你的并发量很低的话，特别是读并发很低，每天访问量就 1 万次，那么很少的情况下，会出现刚才描述的那种不一致的场景。但是问题是，如果每天的是上亿的流量，每秒并发读是几万，每秒只要有数据更新的请求，就<strong>可能会出现上述的数据库+缓存不一致的情况</strong>。</p><blockquote><p><strong>解决方案如下：</strong></p></blockquote><p>更新数据的时候，根据<strong>数据的唯一标识</strong>，将操作路由之后，发送到一个 jvm 内部队列中。读取数据的时候，如果发现数据不在缓存中，那么将重新执行“读取数据+更新缓存”的操作，根据唯一标识路由之后，也发送到同一个 jvm 内部队列中。</p><p>一个队列对应一个工作线程，每个工作线程<strong>串行</strong>拿到对应的操作，然后一条一条的执行。这样的话，一个数据变更的操作，先删除缓存，然后再去更新数据库，但是还没完成更新。此时如果一个读请求过来，没有读到缓存，那么可以先将缓存更新的请求发送到队列中，此时会在队列中积压，然后同步等待缓存更新完成。</p><h2 id="redis-事务" tabindex="-1">Redis 事务 <a class="header-anchor" href="#redis-事务" aria-label="Permalink to &quot;Redis 事务&quot;">​</a></h2><p>一个事务中存在多个命令，要么一起执行，要么一起失败！但是redis中的事务不具有原子性！ 开启事务，执行一系列命令，但是这些命令不会立即执行，而是放在一个队列中，如果要执行事务，队列中的命令全部执行！如果取消事务，这个队列中的所有命令全部作废！</p><ul><li>开启事务：multi</li><li>执行事务：exec</li><li>取消事务：discard</li></ul><blockquote><p>1.在命令执行的时候出错了，其他正常的命令还是会继续执行 2.命令在加入队列时出错了，在执行事务时会全部取消执行</p></blockquote><p>Redis事务一般和watch命令配置使用:</p><blockquote><p>watch主要用来监控一个key是否被修改，如果在事务执行过程中watch监控的key被修改了,事务自动取消执行（乐观锁），事务取消后，监控也就自动被取消。</p></blockquote><h2 id="redis-高可用" tabindex="-1">Redis 高可用 <a class="header-anchor" href="#redis-高可用" aria-label="Permalink to &quot;Redis 高可用&quot;">​</a></h2><h3 id="_2-6-1、redis-主从架构" tabindex="-1">2.6.1、Redis 主从架构 <a class="header-anchor" href="#_2-6-1、redis-主从架构" aria-label="Permalink to &quot;2.6.1、Redis 主从架构&quot;">​</a></h3><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301700077.png" alt="image-20230211184927946"></p><h4 id="主从复制" tabindex="-1">主从复制 <a class="header-anchor" href="#主从复制" aria-label="Permalink to &quot;主从复制&quot;">​</a></h4><p>「复制」也叫「同步」，在Redis使用的是「PSYNC」命令进行同步，该命令有两种模型：完全重同步和部分重同步。</p><p>如果是第一次「同步」，从服务器没有复制过任何的主服务器，或者从服务器要复制的主服务器跟上次复制的主服务器不一样，那就会采用「完全重同步」模式进行复制。</p><p>如果只是由于网络中断，只是「短时间」断连，那就会采用「部分重同步」模式进行复制；假如主从服务器的数据差距实在是过大了，还是会采用「完全重同步」模式进行复制。</p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301700550.png" alt="image-20230211185054861"></p><h5 id="完全同步" tabindex="-1">完全同步 <a class="header-anchor" href="#完全同步" aria-label="Permalink to &quot;完全同步&quot;">​</a></h5><p>主服务器要复制数据到从服务器，首先是建立Socket「连接」，这个过程干一些信息校验啊、身份校验等事情，</p><p>然后从服务器就会发「PSYNC」命令给主服务器，要求同步（这时会带「服务器ID」RUNID和「复制进度」offset参数，如果从服务器是新的，那就没有）</p><p>主服务器发现这是一个新的从服务器（因为参数没带上来），就会采用「完全重同步」模式，并把「服务器ID」(runId)和「复制进度」(offset)发给从服务器，从服务器就会记下这些信息。</p><p>随后，主服务器会在后台生成RDB文件，通过前面建立好的连接发给从服务器。</p><p>从服务器收到RDB文件后，首先把自己的数据清空，然后对RDB文件进行加载恢复。</p><p>这个过程中，主服务器也没闲着（继续接收着客户端的请求），主服务器把生成RDB文件「之后修改的命令」会用「buffer」记录下来，等到从服务器加载完RDB之后，主服务器会把「buffer」记录下的命令都发给从服务器，这样一来，主从服务器就达到了数据一致性了（复制过程是异步的，所以数据是『最终一致性』）。</p><h5 id="部分同步" tabindex="-1">部分同步 <a class="header-anchor" href="#部分同步" aria-label="Permalink to &quot;部分同步&quot;">​</a></h5><p>靠「offset」来进行部分重同步。每次主服务器传播命令的时候，都会把「offset」给到从服务器，主服务器和从服务器都会将「offset」保存起来（如果两边的offset存在差异，那么说明主从服务器数据未完全同步）。</p><p>从服务器断连之后，就会发「PSYNC」命令给主服务器，同样也会带着RUNID和offset（重连之后，这些信息还是存在的）。</p><p>主服务器收到命令之后，看RUNID是否能对得上，对得上，说明这可能以前就复制过一部分了，接着检查该「offset」是否在主服务器记录的offset还存在（因为主服务器记录offset使用的是一个环形buffer，如果该buffer满了，会覆盖以前的记录）</p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301700517.png" alt="image-20230211185350907"></p><p>如果找到了，那就把从缺失的一部分offer开始，把对应的修改命令发给从服务器；如果从环形buffer没找到，那只能使用「完全重同步」模式再次进行主从复制了</p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301700733.png" alt="image-20230211185413705"></p><h3 id="_2-6-2、redis-哨兵模式" tabindex="-1">2.6.2、Redis 哨兵模式 <a class="header-anchor" href="#_2-6-2、redis-哨兵模式" aria-label="Permalink to &quot;2.6.2、Redis 哨兵模式&quot;">​</a></h3><p>「哨兵」干的事情主要就是：监控（监控主服务器的状态）、选主（主服务器挂了，在从服务器选出一个作为主服务器）、通知（故障发送消息给管理员）和配置（作为配置中心，提供当前主服务器的信息）</p><p>可以把「哨兵」当做是运行在「特殊」模式下的Redis服务器，为了「高可用」，哨兵也是集群架构的。</p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301700949.png" alt="image-20230211185527710"></p><p>首先它需要跟Redis主从服务器创建对应的连接（获取它们的信息），每个哨兵不断地用ping命令看主服务器有没有下线，如果主服务器在「配置时间」内没有正常响应，那当前哨兵就「主观」认为该主服务器下线了；其他「哨兵」同样也会ping该主服务器，如果「足够多」（还是看配置）的哨兵认为该主服务器已经下线，那就认为「客观下线」，这时就要对主服务器执行故障转移操作。</p><p>「哨兵」之间会选出一个「领头」，选出领头的规则也比较多，总的来说就是先到先得(哪个快，就选哪个)，由「领头哨兵」对已下线的主服务器进行故障转移。</p><p>首先要在「从服务器」上挑选出一个，来作为主服务器（这里也挑选讲究，比如：从库的配置优先级、要判断哪个从服务器的复制offset最大、RunID大小、跟master断开连接的时长…) 然后，以前的从服务器都需要跟新的主服务器进行「主从复制」，已经下线的主服务器，再次重连的时候，需要让他成为新的主服务器的从服务器</p><blockquote><p><code>Redis在主从复制的和故障转移的过程中数据丢失问题</code></p></blockquote><p>1.「主从复制」流程来看，这个过程是异步的（在复制的过程中：主服务器会一直接收请求，然后把修改命令发给从服务器），假如主服务器的命令还没发完给从服务器，自己就挂掉了。这时候想要让从服务器顶上主服务器，但从服务器的数据是不全的</p><p>2.有可能哨兵认为主服务器挂了，但真实是主服务器并没有挂( 网络抖动)，而哨兵已经选举了一台从服务器当做是主服务器了，此时「客户端」还没反应过来，还继续写向旧主服务器写数据，等到旧主服务器重连的时候，已经被纳入到新主服务器的从服务器了…所以，那段时间里，客户端写进旧主服务器的数据就丢了（<code>脑裂问题</code>）</p><p>两种情况（主从复制延迟&amp;&amp;脑裂），都可以通过配置来「尽可能」避免数据的丢失（<code>达到一定的阈值，直接禁止主服务器接收写请求，企图减少数据丢失的风险</code>）</p><h3 id="_2-6-3、redis分片集群" tabindex="-1">2.6.3、Redis分片集群 <a class="header-anchor" href="#_2-6-3、redis分片集群" aria-label="Permalink to &quot;2.6.3、Redis分片集群&quot;">​</a></h3><blockquote><p>Redis集群配置问题</p></blockquote><ul><li>1.Redis集群无中心节点</li><li>2.集群中各个节点之间有个互访机制，ping-pong选举机制，Redis集群中节点必须是2N+1</li><li>3.Redis集群中总共分16384个槽位（slot），在存储数据时，就将key采用CRC16算法计算hash值，然后将该（hash值%16384）得到具体的槽位值，这个槽位值就是当前key存储的节点位置</li><li>4.为了保证redis集群中节点的可靠性，每个主节点配置一个从节点</li><li>5.当集群中半数以上节点宕机的话，整个集群就会宕机</li></ul>`,105),o=[e];function r(t,c,i,y,d,E){return a(),n("div",null,o)}const D=s(p,[["render",r]]);export{u as __pageData,D as default};
