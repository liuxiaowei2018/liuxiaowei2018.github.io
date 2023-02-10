import{_ as s,c as a,o as n,a as e}from"./app.467f35a9.js";const l="/assets/image-20220331235027502.d679e7af.png",p="/assets/image-20220331235314112.ecb1759a.png",t="/assets/image-20220401000458822.94027bca.png",o="/assets/image-20220401004210342.87f29a1b.png",i="/assets/image-20220401004219871.8005da77.png",c="/assets/image-20220401004228377.a79326bb.png",r="/assets/image-20220401004235679.6a3e8681.png",d="/assets/image-20220401004240722.a3530af2.png",h="/assets/image-20220401004245375.4019dd99.png",u="/assets/image-20220401004250795.225b137a.png",C="/assets/image-20220401004320388.3d424ce8.png",g="/assets/image-20220401004327223.451cfc25.png",A="/assets/image-20220401004333552.2f6aa241.png",y="/assets/image-20220401004338025.be338097.png",m="/assets/image-20220401004342263.b5aa2fa4.png",D="/assets/image-20220401004347383.f0a39e93.png",b="/assets/image-20220401004351769.60061e7b.png",_="/assets/image-20220401004356436.e0dec1d3.png",q="/assets/image-20220401004439380.5153b316.png",G=JSON.parse('{"title":"Elasticsearch","description":"","frontmatter":{},"headers":[{"level":2,"title":"原理篇","slug":"原理篇","link":"#原理篇","children":[]},{"level":2,"title":"ES语法","slug":"es语法","link":"#es语法","children":[]},{"level":2,"title":"测试笔记","slug":"测试笔记","link":"#测试笔记","children":[]}],"relativePath":"study/database/Elasticsearch.md"}'),f={name:"study/database/Elasticsearch.md"},x=e(`<h1 id="elasticsearch" tabindex="-1">Elasticsearch <a class="header-anchor" href="#elasticsearch" aria-hidden="true">#</a></h1><h2 id="原理篇" tabindex="-1">原理篇 <a class="header-anchor" href="#原理篇" aria-hidden="true">#</a></h2><p>分布式的文档储存引擎，分布式的搜索引擎和分析引擎，支持PB级的数据。秒级。</p><p>Cluster集群-&gt;多个Node节点-&gt;shard分片和replica副本。</p><p>与数据库类比，则index是数据库，type是数据表，document是行数据。</p><p><strong>原理</strong>：基于lucene，核心思想是在多台机器上启动多个ES进程实例，组成一个集群。es中储存数据的基本单位是索引，一个索引差不多就是相当于是mysql里的一张表。</p><p>分多个shard的好处一是支持横向扩展（数据越多就加到新机器），二是提高性能，一个查询多个机器并行执行。</p><p><strong>es写数据过程</strong>：</p><blockquote><ul><li>客户端选择一个node发送请求过去，这个node就是coordinating node协调节点。</li><li>协调节点对document进行路由，将请求转发给对应的node（有primary shard）。</li><li>实际的node上的primary shard处理请求，然后将数据同步到replica node。</li><li>协调节点如果发现primary node和所有的replica node都搞定之后，就返回响应结果给客户端。</li></ul></blockquote><p><strong>es读数据过程</strong>：通过doc id来查询，会根据doc id进行hash，判断分配到哪个shard。</p><blockquote><ul><li>客户端发送请求到任意一个node，成为coordinating node协调节点。</li><li>协调节点对doc id进行哈希路由，将请求转发到对应的node，此时会使用round-robin随机轮询算法，在primary shard以及其所有replica中随机选择一个，让读请求负载均衡。</li><li>接收请求的node返回document给coordinatingnode协调节点。</li><li>协调节点返回document给客户端。</li></ul></blockquote><p><strong>es搜索数据</strong>：最强大的是做全文检索。</p><blockquote><ul><li>客户端发送请求到一个coordinating node协调节点。</li><li>协调节点将搜索请求转发到所有的shard对应的primary node或replica node。</li><li>query phase：每个shard将自己的搜索结果（其实就是一些doc id）返回给协调节点，由协调节点继续数据的合并、排序、分页等操作，产出最终结果。</li><li>fetch phase：接着由协调节点根据doc id去各个节点上拉取实际的document数据，最终返回给客户端</li></ul></blockquote><p><strong>总结一下写数据</strong>，数据先写入内存 buffer，然后每隔 1s，将数据 refresh 到 os cache，到了 os cache 数据就能被搜索到（所以我们才说 es 从写入到能被搜索到，中间有 1s 的延迟）。每隔 5s，将数据写入 translog 文件（这样如果机器宕机，内存数据全没，最多会有 5s 的数据丢失），translog 大到一定程度，或者默认每隔 30mins，会触发 commit 操作，将缓冲区的数据都 flush 到 segment file 磁盘文件中。</p><p><strong>删除/更新数据底层原理</strong>：删除操作，commit的时候会生成一个.del文件，将某个doc标识为deleted状态，搜索的时候根据.del文件就知道这个doc是否被删除了。更新是将原来的doc标识为deleted状态，然后新写入一条数据。segment file默认一秒钟一个，越来越多，定期merge，这是deleted状态doc物理删除。</p><p><strong>数据量大之后查询慢</strong>：单纯去查segment file磁盘文件，速度得按秒级来，但是es有机制是将查询数据缓存到filesystem cache，理论上filesystem cache够大缓存所有，那么速度可以毫秒级。最佳是至少一半数据放到filesystem cache，当然也可以把索引数据都放到filesystem cache，例如一行数据三十个字段，只cache其中三个要查的数据，采用es+mysql/hbase，一般建议es+hbase。如果还是多，那就数据预热、冷热分离（冷热数据各写入一个索引，不同机器以使尽可能保证cache热数据）。</p><p>document模型设计避免复杂的关联查询，大表设计这样。</p><p><strong>es分页很差</strong>：翻页越深，性能越差，因为分布式汇总数据的原因。scroll api/search_after像下拉微博一样</p><h2 id="es语法" tabindex="-1">ES语法 <a class="header-anchor" href="#es语法" aria-hidden="true">#</a></h2><blockquote><ul><li><a href="https://www.elastic.co/guide/cn/elasticsearch/guide/current/foreword_id.html" target="_blank" rel="noreferrer">参考文档</a></li></ul><table><thead><tr><th>概念</th><th>说明</th></tr></thead><tbody><tr><td>索引库（indices)</td><td>indices是index的复数，代表索引集</td></tr><tr><td>文档（document）</td><td>存入索引库原始的数据。比如每一条商品信息，就是一个文档</td></tr><tr><td>字段（field）</td><td>文档中的属性</td></tr><tr><td>映射配置（mappings）</td><td>字段的数据类型、属性、是否索引、是否存储等特性</td></tr></tbody></table></blockquote><h4 id="索引" tabindex="-1">索引 <a class="header-anchor" href="#索引" aria-hidden="true">#</a></h4><h5 id="创建索引" tabindex="-1">创建索引 <a class="header-anchor" href="#创建索引" aria-hidden="true">#</a></h5><p>创建索引的请求格式：</p><ul><li><p>请求方式：PUT</p></li><li><p>请求路径：/索引库名</p></li><li><p>请求参数：</p><ul><li><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">settings</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">number_of_shards</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">number_of_replicas</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></li><li><p>settings：索引库的设置</p><ul><li>number_of_shards：分片数量</li><li>number_of_replicas：副本数量</li></ul></li></ul></li></ul><p><strong>使用kibana创建</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">PUT [index]</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;settings&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;number_of_shards&quot;: 3,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;number_of_replicas&quot;: 2</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><img src="`+l+`" alt="image-20220331235027502"></p><h5 id="查看索引设置" tabindex="-1">查看索引设置 <a class="header-anchor" href="#查看索引设置" aria-hidden="true">#</a></h5><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">GET [index]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><img src="`+p+`" alt="image-20220331235314112"></p><p>使用 **GET * ** 查询所有索引库的配置</p><p>使用 **HEAD [index] ** 查看索引是否存在</p><h5 id="删除索引" tabindex="-1">删除索引 <a class="header-anchor" href="#删除索引" aria-hidden="true">#</a></h5><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">DELETE /索引库名</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="映射配置" tabindex="-1">映射配置 <a class="header-anchor" href="#映射配置" aria-hidden="true">#</a></h4><h5 id="创建映射字段" tabindex="-1">创建映射字段 <a class="header-anchor" href="#创建映射字段" aria-hidden="true">#</a></h5><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">PUT /索引库名/_mapping/类型名称</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;properties&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;字段名&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;type&quot;: &quot;类型&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;index&quot;: true，</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;store&quot;: true，</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;analyzer&quot;: &quot;分词器&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li><p>类型名称：type类似于数据库中的不同表[已移除]</p></li><li><p>字段名：任意填写 ，可以指定许多属性，例如：</p><ul><li>type：类型，可以是text、long、short、date、integer、object等</li><li>index：是否索引，默认为true</li><li>store：是否存储，默认为false</li><li>analyzer：分词器，这里的ik_max_word即使用ik分词器</li></ul></li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">PUT weige/_mapping</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;properties&quot;:{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;title&quot;:{</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;type&quot;:&quot;text&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;analyzer&quot;:&quot;ik_max_word&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;images&quot;:{</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;type&quot;:&quot;keyword&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;index&quot;:&quot;false&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;price&quot;:{</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;type&quot;:&quot;float&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h5 id="查看映射关系" tabindex="-1">查看映射关系 <a class="header-anchor" href="#查看映射关系" aria-hidden="true">#</a></h5><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">GET /索引库名/_mapping</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><img src="`+t+`" alt="image-20220401000458822"></p><h5 id="字段属性详解" tabindex="-1">字段属性详解 <a class="header-anchor" href="#字段属性详解" aria-hidden="true">#</a></h5><h6 id="type" tabindex="-1">type <a class="header-anchor" href="#type" aria-hidden="true">#</a></h6><blockquote><p>参考文档：<a href="https://www.elastic.co/guide/en/elasticsearch/reference/7.16/mapping-types.html" target="_blank" rel="noreferrer">https://www.elastic.co/guide/en/elasticsearch/reference/7.16/mapping-types.html</a></p></blockquote><p><strong>常用属性</strong>：</p><ul><li><p>String类型，又分两种：</p><ul><li>text：可分词，不可参与聚合</li><li>keyword：不可分词，数据会作为完整字段进行匹配，可以参与聚合</li></ul></li><li><p>Numerical：数值类型，分两类</p><ul><li>基本数据类型：long、interger、short、byte、double、float、half_float</li><li>浮点数的高精度类型：scaled_float <ul><li>需要指定一个精度因子，比如10或100。elasticsearch会把真实值乘以这个因子后存储，取出时再还原。</li></ul></li></ul></li><li><p>Date：日期类型</p></li></ul><p>​ elasticsearch可以对日期格式化为字符串存储，但是建议我们存储为毫秒值，存储为long，节省空间。</p><ul><li>复杂类型如：数组，对象等</li></ul><p>​ 比如存了个json对象：{people:{&quot;name&quot;:&quot;zhangSan&quot;,&quot;age&quot;:25}}，这个对象会被处理成两个字段：people.name和people.age</p><h6 id="index影响字段的索引情况" tabindex="-1">index影响字段的索引情况 <a class="header-anchor" href="#index影响字段的索引情况" aria-hidden="true">#</a></h6><ul><li><p>true：字段会被索引，则可以用来进行搜索。默认值就是true</p></li><li><p>false：字段不会被索引，不能用来搜索</p></li></ul><p>index的默认值就是true，也就是说你不进行任何配置，所有字段都会被索引。</p><p>但是有些字段是我们不希望被索引的，比如商品的图片信息，就需要手动设置index为false。</p><h6 id="store" tabindex="-1">store <a class="header-anchor" href="#store" aria-hidden="true">#</a></h6><p>是否将数据进行额外存储。</p><p>在lucene和solr时，如果一个字段的store设置为false，那么在文档列表中就不会有这个字段的值，用户的搜索结果中不会显示出来。</p><p>但是在Elasticsearch中，即便store设置为false，也可以搜索到结果。原因是Elasticsearch在创建文档索引时，会将文档中的原始数据备份，保存到一个叫做_source的属性中。而且我们可以通过过滤_source来选择哪些要显示，哪些不显示。</p><p>而如果设置store为true，就会在_source以外额外存储一份数据，多余，因此一般我们都会将store设置为false，事实上，store的默认值就是false。</p><h4 id="新增数据" tabindex="-1">新增数据 <a class="header-anchor" href="#新增数据" aria-hidden="true">#</a></h4><h5 id="随机生成id" tabindex="-1">随机生成id <a class="header-anchor" href="#随机生成id" aria-hidden="true">#</a></h5><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">POST /索引库名</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;key&quot;:&quot;value&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h5 id="自定义id" tabindex="-1">自定义id <a class="header-anchor" href="#自定义id" aria-hidden="true">#</a></h5><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">POST /索引库名/类型/id值{...}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">POST /weige/2</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;title&quot;:&quot;红米手机&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;images&quot;:&quot;http://image.leyou.com/12479122.jpg&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;price&quot;:2899.00</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h6 id="智能判断" tabindex="-1">智能判断 <a class="header-anchor" href="#智能判断" aria-hidden="true">#</a></h6><blockquote><p>在Solr中新增数据，只能使用提前配置好映射属性的字段，否则就会报错</p><p>在Elasticsearch中，不需要给索引库设置任何mapping映射，它也可以根据你输入的数据来判断类型，动态添加数据映射</p></blockquote><h4 id="修改数据" tabindex="-1">修改数据 <a class="header-anchor" href="#修改数据" aria-hidden="true">#</a></h4><p>新增的请求方式改为PUT，就是修改了。<strong>修改必须指定id</strong></p><ul><li>id对应文档存在，则修改</li><li>id对应文档不存在，则新增</li></ul><h4 id="删除数据" tabindex="-1">删除数据 <a class="header-anchor" href="#删除数据" aria-hidden="true">#</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">DELETE /索引库名/id值</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h4 id="查询" tabindex="-1">查询 <a class="header-anchor" href="#查询" aria-hidden="true">#</a></h4><ul><li>基本查询</li><li>结果过滤_source</li><li>高级查询</li><li>filter过滤</li><li>排序</li></ul><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">GET _search</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">query</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">match_all</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><blockquote><p>返回结果分析</p><ul><li>took：本次操作花费的时间，单位为毫秒</li><li>time_out：请求是否超时</li><li>_shards：说明本次操作共搜索了哪些分片</li><li>hits：搜索命中的记录</li><li>hits.total：符合条件的文档总数hits.hits：匹配度较高的前N个文档</li><li>hits.max_score：文档匹配得分，这里为最高分</li><li>_score：每个文档都有一个匹配得分，按照降序排列</li><li>source：显示了文档的原始内容</li></ul></blockquote><h5 id="基本查询" tabindex="-1">基本查询 <a class="header-anchor" href="#基本查询" aria-hidden="true">#</a></h5><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">GET /索引库名/_search</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;query&quot;:{</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;查询类型&quot;:{</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;查询条件&quot;:&quot;查询条件值&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>这里的query代表一个查询对象，里面可以有不同的查询属性</p><ul><li>查询类型：例如：<code>match_all</code>， <code>match</code>，<code>term</code> ， <code>range</code> 等 <ul><li>查询条件：查询条件会根据类型的不同，写法也有差异</li></ul></li></ul><h6 id="查询所有-match-all" tabindex="-1">查询所有（match_all) <a class="header-anchor" href="#查询所有-match-all" aria-hidden="true">#</a></h6><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">GET /索引库名/_search</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;query&quot;:{</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;match_all&quot;: {}</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><img src="`+o+'" alt="image-20220401004210342"></p><h6 id="匹配查询-match" tabindex="-1">匹配查询（match） <a class="header-anchor" href="#匹配查询-match" aria-hidden="true">#</a></h6><p>只有同时包含小米和电视的词条才会被搜索到</p><ul><li><p>or关系 match类型查询，会把查询条件进行分词，然后进行查询,多个词条之间是or的关系</p><p><img src="'+i+'" alt="image-20220401004219871"></p></li><li><p>and关系 某些情况下，我们需要更精确查找，我们希望这个关系变成and，可以这样做：</p></li></ul><p><img src="'+c+'" alt="image-20220401004228377"></p><ul><li>minimum_should_match match 查询支持 minimum_should_match 最小匹配参数， 这让我们可以指定必须匹配的词项数用来表示一个文档是否相关。我们可以将其设置为某个具体数字，更常用的做法是将其设置为一个百分数，因为我们无法控制用户搜索时输入的单词数量： 如果用户给定的条件分词后有 5 个查询词项，想查找只包含其中 4 个词的文档 ，只需指定最小匹配数时80%。<img src="'+r+'" alt="image-20220401004235679"></li></ul><h6 id="多字段查询-multi-match" tabindex="-1">多字段查询（multi_match） <a class="header-anchor" href="#多字段查询-multi-match" aria-hidden="true">#</a></h6><p>在title字段和brand字段中查询华为这个词 ，只要有一个满足就会被搜索到。</p><p><img src="'+d+'" alt="image-20220401004240722"></p><h6 id="词条匹配-term" tabindex="-1">词条匹配(term) <a class="header-anchor" href="#词条匹配-term" aria-hidden="true">#</a></h6><p><code>term</code> 查询被用于精确值匹配，这些精确值可能是数字、时间、布尔或者那些<strong>未分词</strong>的字符串 (keyword)</p><p><img src="'+h+'" alt="image-20220401004245375"></p><h6 id="多词条精确匹配-terms" tabindex="-1">多词条精确匹配(terms) <a class="header-anchor" href="#多词条精确匹配-terms" aria-hidden="true">#</a></h6><p><code>terms</code> 查询和 term 查询一样，但它允许你指定多值进行匹配。如果这个字段包含了指定值中的任何一个值，那么这个文档满足条件</p><p><img src="'+u+'" alt="image-20220401004250795"></p><h5 id="高级查询" tabindex="-1">高级查询 <a class="header-anchor" href="#高级查询" aria-hidden="true">#</a></h5><h6 id="布尔组合-bool" tabindex="-1">布尔组合（bool) <a class="header-anchor" href="#布尔组合-bool" aria-hidden="true">#</a></h6><p><code>bool</code>把各种其它查询通过<code>must</code>（与）、<code>must_not</code>（非）、<code>should</code>（或）的方式进行组合</p><ul><li>与：搜索条件的分词都必须匹配,match和term都要满足</li><li>非：搜索条件分词必须都不匹配</li><li>或：搜索条件分词只要有匹配就可以</li></ul><p>​ <img src="'+C+'" alt="image-20220401004320388"></p><p><img src="'+g+'" alt="image-20220401004327223"></p><h6 id="范围查询-range" tabindex="-1">范围查询(range) <a class="header-anchor" href="#范围查询-range" aria-hidden="true">#</a></h6><p><code>range</code>查询允许以下字符：</p><table><thead><tr><th>操作符</th><th>说明</th></tr></thead><tbody><tr><td>gt</td><td>大于</td></tr><tr><td>gte</td><td>大于等于</td></tr><tr><td>lt</td><td>小于</td></tr><tr><td>lte</td><td>小于等于</td></tr></tbody></table><p><img src="'+A+'" alt="image-20220401004333552"></p><h6 id="模糊查询-fuzzy" tabindex="-1">模糊查询(fuzzy) <a class="header-anchor" href="#模糊查询-fuzzy" aria-hidden="true">#</a></h6><p><code>fuzzy</code> 查询是 <code>term</code> 查询的模糊等价。它允许用户搜索词条与实际词条的拼写出现偏差，不指定<code>fuzziness</code>默认是1个偏差距离，例如搜索apple,输入adpla,这时偏差距离是2，通过<code>fuzziness</code>来指定允许的编辑距离，但是偏差的距离不得超过2。</p><p><img src="'+y+'" alt="image-20220401004338025"></p><h5 id="过滤-filter" tabindex="-1">过滤(filter) <a class="header-anchor" href="#过滤-filter" aria-hidden="true">#</a></h5><h6 id="条件查询中进行过滤" tabindex="-1">条件查询中进行过滤: <a class="header-anchor" href="#条件查询中进行过滤" aria-hidden="true">#</a></h6><p>​ 所有的查询都会影响到文档的评分及排名。如果我们需要在查询结果中进行过滤，并且不希望过滤条件影响评分，那么就不要把过滤条件作为查询条件来用。而是使用filter方式 。例如我想搜索2000-3000的小米手机，但我又不希望价格影响到我搜索小米手机的文档得分，那我把价格的范围查询放在filter里面。 <img src="'+m+`" alt="image-20220401004342263"></p><p>注意：<code>filter</code>中还可以再次进行<code>bool</code>组合条件过滤。</p><h6 id="无查询条件-直接过滤" tabindex="-1"><strong>无查询条件，直接过滤</strong> : <a class="header-anchor" href="#无查询条件-直接过滤" aria-hidden="true">#</a></h6><p>​ 如果一次查询只有过滤，没有查询条件，不希望进行评分，我们可以使用<code>constant_score</code>取代只有 filter 语句的 bool 查询。在性能上是完全相同的，但对于提高查询简洁性和清晰度有很大帮助。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">GET /leyou/_search</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;query&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;constant_score&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;filter&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;range&quot;: {&quot;price&quot;: {&quot;gte&quot;: 2000, &quot;lte&quot;: 3000}}</span></span>
<span class="line"><span style="color:#A6ACCD;">      }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h5 id="排序" tabindex="-1">排序 <a class="header-anchor" href="#排序" aria-hidden="true">#</a></h5><h6 id="单字段排序" tabindex="-1">单字段排序 <a class="header-anchor" href="#单字段排序" aria-hidden="true">#</a></h6><p><code>sort</code> 可以让我们按照不同的字段进行排序，并且通过<code>order</code>指定排序的方式</p><p><img src="`+D+'" alt="image-20220401004347383"></p><h6 id="多字段排序" tabindex="-1">多字段排序 <a class="header-anchor" href="#多字段排序" aria-hidden="true">#</a></h6><p>假定我们想要结合使用 price和 _score（得分） 进行查询，并且匹配的结果首先按照价格排序，然后按照相关性得分排序：</p><p><img src="'+b+'" alt="image-20220401004351769"></p><h5 id="结果过滤" tabindex="-1">结果过滤 <a class="header-anchor" href="#结果过滤" aria-hidden="true">#</a></h5><p>默认情况下，elasticsearch在搜索的结果中，会把文档中保存在<code>_source</code>的所有字段都返回。</p><p>只想获取其中的部分字段，可以添加<code>_source</code>的过滤</p><p><img src="'+_+'" alt="image-20220401004356436"></p><h6 id="指定includes和excludesincludes-来指定想要显示的字段" tabindex="-1">指定includes和excludesincludes：来指定想要显示的字段 <a class="header-anchor" href="#指定includes和excludesincludes-来指定想要显示的字段" aria-hidden="true">#</a></h6><ul><li>excludes：来指定不想要显示的字段</li></ul><p><img src="'+q+`" alt="image-20220401004439380"></p><h4 id="聚合aggregations" tabindex="-1">聚合aggregations <a class="header-anchor" href="#聚合aggregations" aria-hidden="true">#</a></h4><p>聚合可以让我们极其方便的实现对数据的统计、分析。例如：</p><ul><li>什么品牌的手机最受欢迎？</li><li>这些手机的平均价格、最高价格、最低价格？</li><li>这些手机每月的销售情况如何？</li></ul><p>Elasticsearch中的聚合，包含多种类型，最常用的两种，一个叫<code>桶</code>，一个叫<code>度量</code>：</p><blockquote><p>Elasticsearch中提供的划分桶的方式有很多：</p><ul><li><p>Date Histogram Aggregation：根据日期阶梯分组，例如给定阶梯为周，会自动每周分为一组</p></li><li><p>Histogram Aggregation：根据数值阶梯分组，与日期类似 （以10为周期，自动分为0~10,10~20,20~30）</p></li><li><p>Terms Aggregation：根据词条内容分组，词条内容完全匹配的为一组</p></li><li><p>Range Aggregation：数值和日期的范围分组，指定开始和结束，然后按段分组</p></li><li><p>……</p></li></ul><p>综上所述，bucket aggregations 只负责对数据进行分组，并不进行计算</p></blockquote><blockquote><p>分组完成以后，我们一般会对组中的数据进行聚合运算，例如求平均值、最大、最小、求和等，这些在ES中称为度量</p><p>比较常用的一些度量聚合方式：</p><ul><li>Avg Aggregation：求平均值</li><li>Max Aggregation：求最大值</li><li>Min Aggregation：求最小值</li><li>Percentiles Aggregation：求百分比</li><li>Stats Aggregation：同时返回avg、max、min、sum、count等</li><li>Sum Aggregation：求和</li><li>Top hits Aggregation：求前几</li><li>Value Count Aggregation：求总数</li><li>……</li></ul></blockquote><blockquote><p>参考：<a href="https://blog.csdn.net/kavito/article/details/88290222?spm=1001.2101.3001.6650.14&amp;utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-14.pc_relevant_paycolumn_v3&amp;depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-14.pc_relevant_paycolumn_v3&amp;utm_relevant_index=18" target="_blank" rel="noreferrer">https://blog.csdn.net/kavito/article/details/88290222?spm=1001.2101.3001.6650.14&amp;utm_medium=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-14.pc_relevant_paycolumn_v3&amp;depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~CTRLIST~Rate-14.pc_relevant_paycolumn_v3&amp;utm_relevant_index=18</a></p></blockquote><h2 id="测试笔记" tabindex="-1">测试笔记 <a class="header-anchor" href="#测试笔记" aria-hidden="true">#</a></h2><h4 id="_20220416" tabindex="-1">20220416 <a class="header-anchor" href="#_20220416" aria-hidden="true">#</a></h4><blockquote><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">#查询所有索引</span></span>
<span class="line"><span style="color:#A6ACCD;">GET _search</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;"> &quot;query&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">   &quot;match_all&quot;: {}</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">#查询全部别名</span></span>
<span class="line"><span style="color:#A6ACCD;">GET /_alias</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">#删除全部索引</span></span>
<span class="line"><span style="color:#A6ACCD;">DELETE /*</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">#查看某索引</span></span>
<span class="line"><span style="color:#A6ACCD;">GET /sample_document  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">#查看映射关系</span></span>
<span class="line"><span style="color:#A6ACCD;">GET /sample_document/_mapping</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">#查询某索引所有文档</span></span>
<span class="line"><span style="color:#A6ACCD;">GET /sample_document/_search</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   &quot;query&quot;:{</span></span>
<span class="line"><span style="color:#A6ACCD;">       &quot;match_all&quot;: {}</span></span>
<span class="line"><span style="color:#A6ACCD;">   }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></blockquote>`,140),k=[x];function v(F,E,T,S,w,z){return n(),a("div",null,k)}const R=s(f,[["render",v]]);export{G as __pageData,R as default};