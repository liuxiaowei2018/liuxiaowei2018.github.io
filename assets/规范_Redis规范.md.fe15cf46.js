import{_ as s,o as e,c as a,Q as n}from"./chunks/framework.8048b864.js";const g=JSON.parse('{"title":"Redis规范","description":"","frontmatter":{},"headers":[],"relativePath":"规范/Redis规范.md","filePath":"规范/Redis规范.md","lastUpdated":null}'),l={name:"规范/Redis规范.md"},p=n(`<h1 id="redis规范" tabindex="-1">Redis规范 <a class="header-anchor" href="#redis规范" aria-label="Permalink to &quot;Redis规范&quot;">​</a></h1><blockquote><p>本文介绍了在使用阿里云Redis的开发规范，从键值设计、命令使用、客户端使用、相关工具等方面进行说明，通过本文的介绍可以减少使用Redis过程带来的问题。</p></blockquote><h2 id="一、键值设计" tabindex="-1">一、键值设计 <a class="header-anchor" href="#一、键值设计" aria-label="Permalink to &quot;一、键值设计&quot;">​</a></h2><h4 id="_1-key名设计" tabindex="-1">1. key名设计 <a class="header-anchor" href="#_1-key名设计" aria-label="Permalink to &quot;1. key名设计&quot;">​</a></h4><ul><li>(1)【建议】: 可读性和可管理性</li></ul><p>以业务名(或数据库名)为前缀(防止key冲突)，用冒号分隔，比如业务名:表名:id</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ugc:video:1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ugc:video:1</span></span></code></pre></div><ul><li>(2)【建议】：简洁性</li></ul><p>保证语义的前提下，控制key的长度，当key较多时，内存占用也不容忽视，例如：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">user:{uid}:friends:messages:{mid}简化为u:{uid}:fr:m:{mid}。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">user:{uid}:friends:messages:{mid}简化为u:{uid}:fr:m:{mid}。</span></span></code></pre></div><ul><li>(3)【强制】：不要包含特殊字符</li></ul><p>反例：包含空格、换行、单双引号以及其他转义字符</p><p><a href="https://mp.weixin.qq.com/s?__biz=Mzg2NTEyNzE0OA==&amp;mid=2247483663&amp;idx=1&amp;sn=7c4ad441eaec6f0ff38d1c6a097b1fa4&amp;chksm=ce5f9e8cf928179a2c74227da95bec575bdebc682e8630b5b1bb2071c0a1b4be6f98d67c37ca&amp;scene=21#wechat_redirect" target="_blank" rel="noreferrer">详细解析</a></p><h4 id="_2-value设计" tabindex="-1">2. value设计 <a class="header-anchor" href="#_2-value设计" aria-label="Permalink to &quot;2. value设计&quot;">​</a></h4><ul><li>(1)【强制】：拒绝bigkey(防止网卡流量、慢查询)</li></ul><p>string类型控制在10KB以内，hash、list、set、zset元素个数不要超过5000。</p><p>反例：一个包含200万个元素的list。</p><p>非字符串的bigkey，不要使用del删除，使用hscan、sscan、zscan方式渐进式删除，同时要注意防止bigkey过期时间自动删除问题(例如一个200万的zset设置1小时过期，会触发del操作，造成阻塞，而且该操作不会不出现在慢查询中(latency可查))，<a href="https://developer.aliyun.com/article/531067#cc1" target="_blank" rel="noreferrer">查找方法</a>和<a href="https://developer.aliyun.com/article/531067#cc2" target="_blank" rel="noreferrer">删除方法</a></p><p><a href="https://mp.weixin.qq.com/s?__biz=Mzg2NTEyNzE0OA==&amp;mid=2247483677&amp;idx=1&amp;sn=5c320b46f0e06ce9369a29909d62b401&amp;chksm=ce5f9e9ef928178834021b6f9b939550ac400abae5c31e1933bafca2f16b23d028cc51813aec&amp;scene=21#wechat_redirect" target="_blank" rel="noreferrer">详细解析</a></p><ul><li>(2)【推荐】：选择适合的数据类型。</li></ul><p>例如：实体类型(要合理控制和使用数据结构内存编码优化配置,例如ziplist，但也要注意节省内存和性能之间的平衡)</p><p>反例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">set user:1:name tom</span></span>
<span class="line"><span style="color:#e1e4e8;">set user:1:age 19</span></span>
<span class="line"><span style="color:#e1e4e8;">set user:1:favor football</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">set user:1:name tom</span></span>
<span class="line"><span style="color:#24292e;">set user:1:age 19</span></span>
<span class="line"><span style="color:#24292e;">set user:1:favor football</span></span></code></pre></div><p>正例:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">hmset user:1 name tom age 19 favor football</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">hmset user:1 name tom age 19 favor football</span></span></code></pre></div><h4 id="_3-【推荐】-控制key的生命周期-redis不是垃圾桶。" tabindex="-1">3.【推荐】：控制key的生命周期，redis不是垃圾桶。 <a class="header-anchor" href="#_3-【推荐】-控制key的生命周期-redis不是垃圾桶。" aria-label="Permalink to &quot;3.【推荐】：控制key的生命周期，redis不是垃圾桶。&quot;">​</a></h4><p>建议使用expire设置过期时间(条件允许可以打散过期时间，防止集中过期)，不过期的数据重点关注idletime。</p><h2 id="二、命令使用" tabindex="-1">二、命令使用 <a class="header-anchor" href="#二、命令使用" aria-label="Permalink to &quot;二、命令使用&quot;">​</a></h2><h4 id="_1-【推荐】-o-n-命令关注n的数量" tabindex="-1">1.【推荐】 O(N)命令关注N的数量 <a class="header-anchor" href="#_1-【推荐】-o-n-命令关注n的数量" aria-label="Permalink to &quot;1.【推荐】 O(N)命令关注N的数量&quot;">​</a></h4><p>例如hgetall、lrange、smembers、zrange、sinter等并非不能使用，但是需要明确N的值。有遍历的需求可以使用hscan、sscan、zscan代替。</p><h4 id="_2-【推荐】-禁用命令" tabindex="-1">2.【推荐】：禁用命令 <a class="header-anchor" href="#_2-【推荐】-禁用命令" aria-label="Permalink to &quot;2.【推荐】：禁用命令&quot;">​</a></h4><p>禁止线上使用keys、flushall、flushdb等，通过redis的rename机制禁掉命令，或者使用scan的方式渐进式处理。</p><h4 id="_3-【推荐】合理使用select" tabindex="-1">3.【推荐】合理使用select <a class="header-anchor" href="#_3-【推荐】合理使用select" aria-label="Permalink to &quot;3.【推荐】合理使用select&quot;">​</a></h4><p>redis的多数据库较弱，使用数字进行区分，很多客户端支持较差，同时多业务用多数据库实际还是单线程处理，会有干扰。</p><h4 id="_4-【推荐】使用批量操作提高效率" tabindex="-1">4.【推荐】使用批量操作提高效率 <a class="header-anchor" href="#_4-【推荐】使用批量操作提高效率" aria-label="Permalink to &quot;4.【推荐】使用批量操作提高效率&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">原生命令：例如mget、mset。</span></span>
<span class="line"><span style="color:#e1e4e8;">非原生命令：可以使用pipeline提高效率。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">原生命令：例如mget、mset。</span></span>
<span class="line"><span style="color:#24292e;">非原生命令：可以使用pipeline提高效率。</span></span></code></pre></div><p>但要注意控制一次批量操作的<strong>元素个数</strong>(例如500以内，实际也和元素字节数有关)。</p><p>注意两者不同：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1. 原生是原子操作，pipeline是非原子操作。</span></span>
<span class="line"><span style="color:#e1e4e8;">2. pipeline可以打包不同的命令，原生做不到</span></span>
<span class="line"><span style="color:#e1e4e8;">3. pipeline需要客户端和服务端同时支持。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1. 原生是原子操作，pipeline是非原子操作。</span></span>
<span class="line"><span style="color:#24292e;">2. pipeline可以打包不同的命令，原生做不到</span></span>
<span class="line"><span style="color:#24292e;">3. pipeline需要客户端和服务端同时支持。</span></span></code></pre></div><h4 id="_5-【建议】redis事务功能较弱-不建议过多使用" tabindex="-1">5.【建议】Redis事务功能较弱，不建议过多使用 <a class="header-anchor" href="#_5-【建议】redis事务功能较弱-不建议过多使用" aria-label="Permalink to &quot;5.【建议】Redis事务功能较弱，不建议过多使用&quot;">​</a></h4><p>Redis的事务功能较弱(不支持回滚)，而且集群版本(自研和官方)要求一次事务操作的key必须在一个slot上(可以使用hashtag功能解决)</p><h4 id="_6-【建议】redis集群版本在使用lua上有特殊要求" tabindex="-1">6.【建议】Redis集群版本在使用Lua上有特殊要求： <a class="header-anchor" href="#_6-【建议】redis集群版本在使用lua上有特殊要求" aria-label="Permalink to &quot;6.【建议】Redis集群版本在使用Lua上有特殊要求：&quot;">​</a></h4><ul><li>1.所有key都应该由 KEYS 数组来传递，redis.call/pcall 里面调用的redis命令，key的位置，必须是KEYS array, 否则直接返回error，&quot;-ERR bad lua script for redis cluster, all the keys that the script uses should be passed using the KEYS array&quot;</li><li>2.所有key，必须在1个slot上，否则直接返回error, &quot;-ERR eval/evalsha command keys must in same slot&quot;</li></ul><h4 id="_7-【建议】必要情况下使用monitor命令时-要注意不要长时间使用。" tabindex="-1">7.【建议】必要情况下使用monitor命令时，要注意不要长时间使用。 <a class="header-anchor" href="#_7-【建议】必要情况下使用monitor命令时-要注意不要长时间使用。" aria-label="Permalink to &quot;7.【建议】必要情况下使用monitor命令时，要注意不要长时间使用。&quot;">​</a></h4><h2 id="三、客户端使用" tabindex="-1">三、客户端使用 <a class="header-anchor" href="#三、客户端使用" aria-label="Permalink to &quot;三、客户端使用&quot;">​</a></h2><h4 id="_1-【推荐】" tabindex="-1">1.【推荐】 <a class="header-anchor" href="#_1-【推荐】" aria-label="Permalink to &quot;1.【推荐】&quot;">​</a></h4><p>避免多个应用使用一个Redis实例</p><p>正例：不相干的业务拆分，公共数据做服务化。</p><h4 id="_2-【推荐】" tabindex="-1">2.【推荐】 <a class="header-anchor" href="#_2-【推荐】" aria-label="Permalink to &quot;2.【推荐】&quot;">​</a></h4><p>使用带有连接池的数据库，可以有效控制连接，同时提高效率，标准使用方式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">执行命令如下：</span></span>
<span class="line"><span style="color:#e1e4e8;">Jedis jedis = null;</span></span>
<span class="line"><span style="color:#e1e4e8;">try {</span></span>
<span class="line"><span style="color:#e1e4e8;">    jedis = jedisPool.getResource();</span></span>
<span class="line"><span style="color:#e1e4e8;">    //具体的命令</span></span>
<span class="line"><span style="color:#e1e4e8;">    jedis.executeCommand()</span></span>
<span class="line"><span style="color:#e1e4e8;">} catch (Exception e) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    logger.error(&quot;op key {} error: &quot; + e.getMessage(), key, e);</span></span>
<span class="line"><span style="color:#e1e4e8;">} finally {</span></span>
<span class="line"><span style="color:#e1e4e8;">    //注意这里不是关闭连接，在JedisPool模式下，Jedis会被归还给资源池。</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (jedis != null) </span></span>
<span class="line"><span style="color:#e1e4e8;">        jedis.close();</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">执行命令如下：</span></span>
<span class="line"><span style="color:#24292e;">Jedis jedis = null;</span></span>
<span class="line"><span style="color:#24292e;">try {</span></span>
<span class="line"><span style="color:#24292e;">    jedis = jedisPool.getResource();</span></span>
<span class="line"><span style="color:#24292e;">    //具体的命令</span></span>
<span class="line"><span style="color:#24292e;">    jedis.executeCommand()</span></span>
<span class="line"><span style="color:#24292e;">} catch (Exception e) {</span></span>
<span class="line"><span style="color:#24292e;">    logger.error(&quot;op key {} error: &quot; + e.getMessage(), key, e);</span></span>
<span class="line"><span style="color:#24292e;">} finally {</span></span>
<span class="line"><span style="color:#24292e;">    //注意这里不是关闭连接，在JedisPool模式下，Jedis会被归还给资源池。</span></span>
<span class="line"><span style="color:#24292e;">    if (jedis != null) </span></span>
<span class="line"><span style="color:#24292e;">        jedis.close();</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>下面是JedisPool优化方法的文章:</p><ul><li><a href="https://yq.aliyun.com/articles/236384" target="_blank" rel="noreferrer">Jedis常见异常汇总</a></li><li><a href="https://yq.aliyun.com/articles/236383" target="_blank" rel="noreferrer">JedisPool资源池优化</a></li></ul><h4 id="_3-【建议】" tabindex="-1">3.【建议】 <a class="header-anchor" href="#_3-【建议】" aria-label="Permalink to &quot;3.【建议】&quot;">​</a></h4><p>高并发下建议客户端添加熔断功能(例如netflix hystrix)</p><h4 id="_4-【推荐】" tabindex="-1">4.【推荐】 <a class="header-anchor" href="#_4-【推荐】" aria-label="Permalink to &quot;4.【推荐】&quot;">​</a></h4><p>设置合理的密码，如有必要可以使用SSL加密访问（阿里云Redis支持）</p><h4 id="_5-【建议】" tabindex="-1">5.【建议】 <a class="header-anchor" href="#_5-【建议】" aria-label="Permalink to &quot;5.【建议】&quot;">​</a></h4><p>根据自身业务类型，选好maxmemory-policy(最大内存淘汰策略)，设置好过期时间。</p><p>默认策略是volatile-lru，即超过最大内存后，在过期键中使用lru算法进行key的剔除，保证不过期数据不被删除，但是可能会出现OOM问题。</p><h5 id="其他策略如下" tabindex="-1">其他策略如下： <a class="header-anchor" href="#其他策略如下" aria-label="Permalink to &quot;其他策略如下：&quot;">​</a></h5><ul><li>allkeys-lru：根据LRU算法删除键，不管数据有没有设置超时属性，直到腾出足够空间为止。</li><li>allkeys-random：随机删除所有键，直到腾出足够空间为止。</li><li>volatile-random:随机删除过期键，直到腾出足够空间为止。</li><li>volatile-ttl：根据键值对象的ttl属性，删除最近将要过期数据。如果没有，回退到noeviction策略。</li><li>noeviction：不会剔除任何数据，拒绝所有写入操作并返回客户端错误信息&quot;(error) OOM command not allowed when used memory&quot;，此时Redis只响应读操作。</li></ul><h2 id="四、相关工具" tabindex="-1">四、相关工具 <a class="header-anchor" href="#四、相关工具" aria-label="Permalink to &quot;四、相关工具&quot;">​</a></h2><h4 id="_1-【推荐】-数据同步" tabindex="-1">1.【推荐】：数据同步 <a class="header-anchor" href="#_1-【推荐】-数据同步" aria-label="Permalink to &quot;1.【推荐】：数据同步&quot;">​</a></h4><p>redis间数据同步可以使用：redis-port</p><h4 id="_2-【推荐】-big-key搜索" tabindex="-1">2.【推荐】：big key搜索 <a class="header-anchor" href="#_2-【推荐】-big-key搜索" aria-label="Permalink to &quot;2.【推荐】：big key搜索&quot;">​</a></h4><p><a href="https://yq.aliyun.com/articles/117042" target="_blank" rel="noreferrer">redis大key搜索工具</a></p><h4 id="_3-【推荐】-热点key寻找" tabindex="-1">3.【推荐】：热点key寻找 <a class="header-anchor" href="#_3-【推荐】-热点key寻找" aria-label="Permalink to &quot;3.【推荐】：热点key寻找&quot;">​</a></h4><blockquote><p>内部实现使用monitor，所以建议短时间使用</p></blockquote><p><a href="https://github.com/facebookarchive/redis-faina" target="_blank" rel="noreferrer">facebook的redis-faina</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">阿里云Redis已经在内核层面解决热点key问题，欢迎使用。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">阿里云Redis已经在内核层面解决热点key问题，欢迎使用。</span></span></code></pre></div><h2 id="五、附录" tabindex="-1">五、附录 <a class="header-anchor" href="#五、附录" aria-label="Permalink to &quot;五、附录&quot;">​</a></h2><h3 id="_5-1、删除bigkey" tabindex="-1">5.1、删除bigkey <a class="header-anchor" href="#_5-1、删除bigkey" aria-label="Permalink to &quot;5.1、删除bigkey&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">1. 下面操作可以使用pipeline加速。</span></span>
<span class="line"><span style="color:#e1e4e8;">2. redis 4.0已经支持key的异步删除，欢迎使用。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">1. 下面操作可以使用pipeline加速。</span></span>
<span class="line"><span style="color:#24292e;">2. redis 4.0已经支持key的异步删除，欢迎使用。</span></span></code></pre></div><h4 id="_1-hash删除-hscan-hdel" tabindex="-1">1. Hash删除: hscan + hdel <a class="header-anchor" href="#_1-hash删除-hscan-hdel" aria-label="Permalink to &quot;1. Hash删除: hscan + hdel&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">public void delBigHash(String host, int port, String password, String bigHashKey) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    Jedis jedis = new Jedis(host, port);</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (password != null &amp;&amp; !&quot;&quot;.equals(password)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        jedis.auth(password);</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    ScanParams scanParams = new ScanParams().count(100);</span></span>
<span class="line"><span style="color:#e1e4e8;">    String cursor = &quot;0&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    do {</span></span>
<span class="line"><span style="color:#e1e4e8;">        ScanResult&lt;Entry&lt;String, String&gt;&gt; scanResult = jedis.hscan(bigHashKey, cursor, scanParams);</span></span>
<span class="line"><span style="color:#e1e4e8;">        List&lt;Entry&lt;String, String&gt;&gt; entryList = scanResult.getResult();</span></span>
<span class="line"><span style="color:#e1e4e8;">        if (entryList != null &amp;&amp; !entryList.isEmpty()) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            for (Entry&lt;String, String&gt; entry : entryList) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                jedis.hdel(bigHashKey, entry.getKey());</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        cursor = scanResult.getStringCursor();</span></span>
<span class="line"><span style="color:#e1e4e8;">    } while (!&quot;0&quot;.equals(cursor));</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    //删除bigkey</span></span>
<span class="line"><span style="color:#e1e4e8;">    jedis.del(bigHashKey);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">public void delBigHash(String host, int port, String password, String bigHashKey) {</span></span>
<span class="line"><span style="color:#24292e;">    Jedis jedis = new Jedis(host, port);</span></span>
<span class="line"><span style="color:#24292e;">    if (password != null &amp;&amp; !&quot;&quot;.equals(password)) {</span></span>
<span class="line"><span style="color:#24292e;">        jedis.auth(password);</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    ScanParams scanParams = new ScanParams().count(100);</span></span>
<span class="line"><span style="color:#24292e;">    String cursor = &quot;0&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    do {</span></span>
<span class="line"><span style="color:#24292e;">        ScanResult&lt;Entry&lt;String, String&gt;&gt; scanResult = jedis.hscan(bigHashKey, cursor, scanParams);</span></span>
<span class="line"><span style="color:#24292e;">        List&lt;Entry&lt;String, String&gt;&gt; entryList = scanResult.getResult();</span></span>
<span class="line"><span style="color:#24292e;">        if (entryList != null &amp;&amp; !entryList.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292e;">            for (Entry&lt;String, String&gt; entry : entryList) {</span></span>
<span class="line"><span style="color:#24292e;">                jedis.hdel(bigHashKey, entry.getKey());</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        cursor = scanResult.getStringCursor();</span></span>
<span class="line"><span style="color:#24292e;">    } while (!&quot;0&quot;.equals(cursor));</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    //删除bigkey</span></span>
<span class="line"><span style="color:#24292e;">    jedis.del(bigHashKey);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h4 id="_2-list删除-ltrim" tabindex="-1">2. List删除: ltrim <a class="header-anchor" href="#_2-list删除-ltrim" aria-label="Permalink to &quot;2. List删除: ltrim&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">public void delBigList(String host, int port, String password, String bigListKey) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    Jedis jedis = new Jedis(host, port);</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (password != null &amp;&amp; !&quot;&quot;.equals(password)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        jedis.auth(password);</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    long llen = jedis.llen(bigListKey);</span></span>
<span class="line"><span style="color:#e1e4e8;">    int counter = 0;</span></span>
<span class="line"><span style="color:#e1e4e8;">    int left = 100;</span></span>
<span class="line"><span style="color:#e1e4e8;">    while (counter &lt; llen) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        //每次从左侧截掉100个</span></span>
<span class="line"><span style="color:#e1e4e8;">        jedis.ltrim(bigListKey, left, llen);</span></span>
<span class="line"><span style="color:#e1e4e8;">        counter += left;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    //最终删除key</span></span>
<span class="line"><span style="color:#e1e4e8;">    jedis.del(bigListKey);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">public void delBigList(String host, int port, String password, String bigListKey) {</span></span>
<span class="line"><span style="color:#24292e;">    Jedis jedis = new Jedis(host, port);</span></span>
<span class="line"><span style="color:#24292e;">    if (password != null &amp;&amp; !&quot;&quot;.equals(password)) {</span></span>
<span class="line"><span style="color:#24292e;">        jedis.auth(password);</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    long llen = jedis.llen(bigListKey);</span></span>
<span class="line"><span style="color:#24292e;">    int counter = 0;</span></span>
<span class="line"><span style="color:#24292e;">    int left = 100;</span></span>
<span class="line"><span style="color:#24292e;">    while (counter &lt; llen) {</span></span>
<span class="line"><span style="color:#24292e;">        //每次从左侧截掉100个</span></span>
<span class="line"><span style="color:#24292e;">        jedis.ltrim(bigListKey, left, llen);</span></span>
<span class="line"><span style="color:#24292e;">        counter += left;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    //最终删除key</span></span>
<span class="line"><span style="color:#24292e;">    jedis.del(bigListKey);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h4 id="_3-set删除-sscan-srem" tabindex="-1">3. Set删除: sscan + srem <a class="header-anchor" href="#_3-set删除-sscan-srem" aria-label="Permalink to &quot;3. Set删除: sscan + srem&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">public void delBigSet(String host, int port, String password, String bigSetKey) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    Jedis jedis = new Jedis(host, port);</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (password != null &amp;&amp; !&quot;&quot;.equals(password)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        jedis.auth(password);</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    ScanParams scanParams = new ScanParams().count(100);</span></span>
<span class="line"><span style="color:#e1e4e8;">    String cursor = &quot;0&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    do {</span></span>
<span class="line"><span style="color:#e1e4e8;">        ScanResult&lt;String&gt; scanResult = jedis.sscan(bigSetKey, cursor, scanParams);</span></span>
<span class="line"><span style="color:#e1e4e8;">        List&lt;String&gt; memberList = scanResult.getResult();</span></span>
<span class="line"><span style="color:#e1e4e8;">        if (memberList != null &amp;&amp; !memberList.isEmpty()) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            for (String member : memberList) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                jedis.srem(bigSetKey, member);</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        cursor = scanResult.getStringCursor();</span></span>
<span class="line"><span style="color:#e1e4e8;">    } while (!&quot;0&quot;.equals(cursor));</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    //删除bigkey</span></span>
<span class="line"><span style="color:#e1e4e8;">    jedis.del(bigSetKey);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">public void delBigSet(String host, int port, String password, String bigSetKey) {</span></span>
<span class="line"><span style="color:#24292e;">    Jedis jedis = new Jedis(host, port);</span></span>
<span class="line"><span style="color:#24292e;">    if (password != null &amp;&amp; !&quot;&quot;.equals(password)) {</span></span>
<span class="line"><span style="color:#24292e;">        jedis.auth(password);</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    ScanParams scanParams = new ScanParams().count(100);</span></span>
<span class="line"><span style="color:#24292e;">    String cursor = &quot;0&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    do {</span></span>
<span class="line"><span style="color:#24292e;">        ScanResult&lt;String&gt; scanResult = jedis.sscan(bigSetKey, cursor, scanParams);</span></span>
<span class="line"><span style="color:#24292e;">        List&lt;String&gt; memberList = scanResult.getResult();</span></span>
<span class="line"><span style="color:#24292e;">        if (memberList != null &amp;&amp; !memberList.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292e;">            for (String member : memberList) {</span></span>
<span class="line"><span style="color:#24292e;">                jedis.srem(bigSetKey, member);</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        cursor = scanResult.getStringCursor();</span></span>
<span class="line"><span style="color:#24292e;">    } while (!&quot;0&quot;.equals(cursor));</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    //删除bigkey</span></span>
<span class="line"><span style="color:#24292e;">    jedis.del(bigSetKey);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h4 id="_4-sortedset删除-zscan-zrem" tabindex="-1">4. SortedSet删除: zscan + zrem <a class="header-anchor" href="#_4-sortedset删除-zscan-zrem" aria-label="Permalink to &quot;4. SortedSet删除: zscan + zrem&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">public void delBigZset(String host, int port, String password, String bigZsetKey) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    Jedis jedis = new Jedis(host, port);</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (password != null &amp;&amp; !&quot;&quot;.equals(password)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        jedis.auth(password);</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    ScanParams scanParams = new ScanParams().count(100);</span></span>
<span class="line"><span style="color:#e1e4e8;">    String cursor = &quot;0&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;">    do {</span></span>
<span class="line"><span style="color:#e1e4e8;">        ScanResult&lt;Tuple&gt; scanResult = jedis.zscan(bigZsetKey, cursor, scanParams);</span></span>
<span class="line"><span style="color:#e1e4e8;">        List&lt;Tuple&gt; tupleList = scanResult.getResult();</span></span>
<span class="line"><span style="color:#e1e4e8;">        if (tupleList != null &amp;&amp; !tupleList.isEmpty()) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            for (Tuple tuple : tupleList) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                jedis.zrem(bigZsetKey, tuple.getElement());</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        cursor = scanResult.getStringCursor();</span></span>
<span class="line"><span style="color:#e1e4e8;">    } while (!&quot;0&quot;.equals(cursor));</span></span>
<span class="line"><span style="color:#e1e4e8;">    </span></span>
<span class="line"><span style="color:#e1e4e8;">    //删除bigkey</span></span>
<span class="line"><span style="color:#e1e4e8;">    jedis.del(bigZsetKey);</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">public void delBigZset(String host, int port, String password, String bigZsetKey) {</span></span>
<span class="line"><span style="color:#24292e;">    Jedis jedis = new Jedis(host, port);</span></span>
<span class="line"><span style="color:#24292e;">    if (password != null &amp;&amp; !&quot;&quot;.equals(password)) {</span></span>
<span class="line"><span style="color:#24292e;">        jedis.auth(password);</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    ScanParams scanParams = new ScanParams().count(100);</span></span>
<span class="line"><span style="color:#24292e;">    String cursor = &quot;0&quot;;</span></span>
<span class="line"><span style="color:#24292e;">    do {</span></span>
<span class="line"><span style="color:#24292e;">        ScanResult&lt;Tuple&gt; scanResult = jedis.zscan(bigZsetKey, cursor, scanParams);</span></span>
<span class="line"><span style="color:#24292e;">        List&lt;Tuple&gt; tupleList = scanResult.getResult();</span></span>
<span class="line"><span style="color:#24292e;">        if (tupleList != null &amp;&amp; !tupleList.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292e;">            for (Tuple tuple : tupleList) {</span></span>
<span class="line"><span style="color:#24292e;">                jedis.zrem(bigZsetKey, tuple.getElement());</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        cursor = scanResult.getStringCursor();</span></span>
<span class="line"><span style="color:#24292e;">    } while (!&quot;0&quot;.equals(cursor));</span></span>
<span class="line"><span style="color:#24292e;">    </span></span>
<span class="line"><span style="color:#24292e;">    //删除bigkey</span></span>
<span class="line"><span style="color:#24292e;">    jedis.del(bigZsetKey);</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div>`,82),t=[p];function o(i,r,c,d,u,y){return e(),a("div",null,t)}const m=s(l,[["render",o]]);export{g as __pageData,m as default};
