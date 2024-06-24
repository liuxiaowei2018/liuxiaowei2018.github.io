import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8048b864.js";const d=JSON.parse('{"title":"Elasticsearch生产实践","description":"","frontmatter":{},"headers":[],"relativePath":"elasticsearch/Elasticsearch生产实践.md","filePath":"elasticsearch/Elasticsearch生产实践.md","lastUpdated":1719224116000}'),p={name:"elasticsearch/Elasticsearch生产实践.md"},o=l(`<h1 id="elasticsearch生产实践" tabindex="-1">Elasticsearch生产实践 <a class="header-anchor" href="#elasticsearch生产实践" aria-label="Permalink to &quot;Elasticsearch生产实践&quot;">​</a></h1><h2 id="es深分页" tabindex="-1">ES深分页 <a class="header-anchor" href="#es深分页" aria-label="Permalink to &quot;ES深分页&quot;">​</a></h2><p>Elasticsearch 的From/Size方式提供了分页的功能，同时，也有相应的限制。</p><p>举个例子，一个索引，有10亿数据，分10个 shards，然后，一个搜索请求，from=1000000，size=100，这时候，会带来严重的性能问题：CPU，内存，IO，网络带宽。</p><p>在 query 阶段，每个shards需要返回 1000100 条数据给 coordinating node，而 coordinating node 需要接收<code>10 * 1000</code>，100 条数据，即使每条数据只有 <code>_doc _id</code> 和 <code>_score</code>，这数据量也很大了。</p><p><strong>「在另一方面，我们意识到，这种深度分页的请求并不合理，因为我们是很少人为的看很后面的请求的，在很多的业务场景中，都直接限制分页，比如只能看前100页。」</strong></p><p>比如，有1千万粉丝的微信大V，要给所有粉丝群发消息，或者给某省粉丝群发，这时候就需要取得所有符合条件的粉丝，而最容易想到的就是利用 from + size 来实现，不过，这个是不现实的，这时，可以采用 Elasticsearch 提供的其他方式来实现遍历。</p><h3 id="scroll" tabindex="-1">Scroll <a class="header-anchor" href="#scroll" aria-label="Permalink to &quot;Scroll&quot;">​</a></h3><p>可以把scroll理解为关系型数据库里的cursor，因此，scroll并不适合用来做实时搜索，而更适合用于后台批处理任务，比如群发。</p><p>这个分页的用法，<strong>「不是为了实时查询数据」</strong>，而是为了**「一次性查询大量的数据（甚至是全部的数据」**）。</p><p>因为这个scroll相当于维护了一份当前索引段的快照信息，这个快照信息是你执行这个scroll查询时的快照。在这个查询后的任何新索引进来的数据，都不会在这个快照中查询到。</p><p>但是它相对于from和size，不是查询所有数据然后剔除不要的部分，而是记录一个读取的位置，保证下一次快速继续读取。</p><p>不考虑排序的时候，可以结合<code>SearchType.SCAN</code>使用。</p><p>scroll可以分为初始化和遍历两部，初始化时将**「所有符合搜索条件的搜索结果缓存起来（注意，这里只是缓存的doc_id，而并不是真的缓存了所有的文档数据，取数据是在fetch阶段完成的）」**，可以想象成快照。</p><p>在遍历时，从这个快照里取数据，也就是说，在初始化后，对索引插入、删除、更新数据都不会影响遍历结果。</p><p>遍历结果。</p><p><strong>「基本使用」</strong></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">POST /twitter/tweet/_search?scroll=</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">m</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;size&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;match&quot;</span><span style="color:#E1E4E8;"> : {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;title&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;elasticsearch&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">POST /twitter/tweet/_search?scroll=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">m</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;size&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;match&quot;</span><span style="color:#24292E;"> : {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;title&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;elasticsearch&quot;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>初始化指明 index 和 type，然后，加上参数 scroll，表示暂存搜索结果的时间，其它就像一个普通的search请求一样。会返回一个<code>_scroll_id</code>，<code>_scroll_id</code>用来下次取数据用。</p><p><strong>「遍历」</strong></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">POST /_search?scroll=</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">m</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;scroll_id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;XXXXXXXXXXXXXXXXXXXXXXX I am scroll id XXXXXXXXXXXXXXX&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">POST /_search?scroll=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">m</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;scroll_id&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;XXXXXXXXXXXXXXXXXXXXXXX I am scroll id XXXXXXXXXXXXXXX&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>scroll_id</code>即 上一次遍历取回的<code>_scroll_id</code>或者是初始化返回的<code>_scroll_id</code>，同样的，需要带 scroll 参数。</p><p>重复这一步骤，直到返回的数据为空，即遍历完成。</p><p><strong>「注意，每次都要传参数 scroll，刷新搜索结果的缓存时间」</strong>。另外，<strong>「不需要指定 index 和 type」</strong>。</p><p>设置scroll的时候，需要使搜索结果缓存到下一次遍历完成，<strong>「同时，也不能太长，毕竟空间有限。」</strong></p><p><strong>「缺点：」</strong></p><ol><li><strong>「scroll_id会占用大量的资源（特别是排序的请求）」</strong></li><li>同样的，scroll后接超时时间，频繁的发起scroll请求，会出现一些列问题。</li><li><strong>「是生成的历史快照，对于数据的变更不会反映到快照上。」</strong></li></ol><p><strong>「优点：」</strong></p><p>适用于非实时处理大量数据的情况，比如要进行数据迁移或者索引变更之类的。</p><h3 id="scroll-scan" tabindex="-1">Scroll Scan <a class="header-anchor" href="#scroll-scan" aria-label="Permalink to &quot;Scroll Scan&quot;">​</a></h3><p>ES提供scroll scan方式进一步提高遍历性能，但是scroll scan不支持排序，因此scroll scan适合不需要排序的场景。</p><p><strong>「基本使用」</strong></p><p>Scroll Scan 的遍历与普通 Scroll 一样，初始化存在一点差别。</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">POST /my_index/my_type/_search?search_type=scan&amp;scroll=</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">m&amp;size=</span><span style="color:#79B8FF;">50</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">: { </span><span style="color:#79B8FF;">&quot;match_all&quot;</span><span style="color:#E1E4E8;">: {}}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">POST /my_index/my_type/_search?search_type=scan&amp;scroll=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">m&amp;size=</span><span style="color:#005CC5;">50</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">: { </span><span style="color:#005CC5;">&quot;match_all&quot;</span><span style="color:#24292E;">: {}}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>需要指明参数：</p><ul><li><code>search_type</code>：赋值为scan，表示采用 Scroll Scan 的方式遍历，同时告诉 Elasticsearch 搜索结果不需要排序。</li><li>scroll：同上，传时间。</li><li>size：与普通的 size 不同，这个 size 表示的是每个 shard 返回的 size 数，最终结果最大为 <code>number_of_shards * size</code>。</li></ul><p><strong>「Scroll Scan与Scroll的区别」</strong></p><ol><li>Scroll-Scan结果**「没有排序」**，按index顺序返回，没有排序，可以提高取数据性能。</li><li>初始化时只返回 <code>_scroll_id</code>，没有具体的hits结果</li><li>size控制的是每个分片的返回的数据量，而不是整个请求返回的数据量。</li></ol><h3 id="sliced-scroll" tabindex="-1">Sliced Scroll <a class="header-anchor" href="#sliced-scroll" aria-label="Permalink to &quot;Sliced Scroll&quot;">​</a></h3><p>如果你数据量很大，用Scroll遍历数据那确实是接受不了，现在Scroll接口可以并发来进行数据遍历了。</p><p>每个Scroll请求，可以分成多个Slice请求，可以理解为切片，各Slice独立并行，比用Scroll遍历要快很多倍。</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">POST /index/type/_search?scroll=</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">m</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">: { </span><span style="color:#79B8FF;">&quot;match_all&quot;</span><span style="color:#E1E4E8;">: {}},</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;slice&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;max&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">    }   </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">POST ip:port/index/type/_search?scroll=</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">m</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">: { </span><span style="color:#79B8FF;">&quot;match_all&quot;</span><span style="color:#E1E4E8;">: {}},</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;slice&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;max&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#E1E4E8;">    }   </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">POST /index/type/_search?scroll=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">m</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">: { </span><span style="color:#005CC5;">&quot;match_all&quot;</span><span style="color:#24292E;">: {}},</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;slice&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;max&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">    }   </span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">POST ip:port/index/type/_search?scroll=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">m</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">: { </span><span style="color:#005CC5;">&quot;match_all&quot;</span><span style="color:#24292E;">: {}},</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;slice&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;max&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#24292E;">    }   </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>上边的示例可以单独请求两块数据，最终五块数据合并的结果与直接scroll scan相同。</p><p>其中max是分块数，id是第几块。</p><blockquote><p>官方文档中建议max的值不要超过shard的数量，否则可能会导致内存爆炸。</p></blockquote><h3 id="search-after" tabindex="-1">Search After <a class="header-anchor" href="#search-after" aria-label="Permalink to &quot;Search After&quot;">​</a></h3><p><code>Search_after</code>是 ES 5 新引入的一种分页查询机制，其原理几乎就是和scroll一样，因此代码也几乎是一样的。</p><p><strong>「基本使用：」</strong></p><p>第一步：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">POST twitter/_search</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;size&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;match&quot;</span><span style="color:#E1E4E8;"> : {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;title&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;es&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;sort&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span><span style="color:#79B8FF;">&quot;date&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;asc&quot;</span><span style="color:#E1E4E8;">},</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span><span style="color:#79B8FF;">&quot;_id&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;desc&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">POST twitter/_search</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;size&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;match&quot;</span><span style="color:#24292E;"> : {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;title&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;es&quot;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;sort&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">        {</span><span style="color:#005CC5;">&quot;date&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;asc&quot;</span><span style="color:#24292E;">},</span></span>
<span class="line"><span style="color:#24292E;">        {</span><span style="color:#005CC5;">&quot;_id&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;desc&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>返回出的结果信息 ：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;took&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#79B8FF;">29</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;timed_out&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;_shards&quot;</span><span style="color:#E1E4E8;"> : {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;total&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;successful&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;skipped&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;failed&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;hits&quot;</span><span style="color:#E1E4E8;"> : {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;total&quot;</span><span style="color:#E1E4E8;"> : {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">&quot;value&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">&quot;relation&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;eq&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;max_score&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;hits&quot;</span><span style="color:#E1E4E8;"> : [</span></span>
<span class="line"><span style="color:#E1E4E8;">          {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#FDAEB7;font-style:italic;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;sort&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">:</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#FDAEB7;font-style:italic;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">            ]</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#FDAEB7;font-style:italic;">}</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#FDAEB7;font-style:italic;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">            },</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&quot;sort&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">:</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#79B8FF;">124648691</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">&quot;624812&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            ]</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#FDAEB7;font-style:italic;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">        ]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;took&quot;</span><span style="color:#24292E;"> : </span><span style="color:#005CC5;">29</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;timed_out&quot;</span><span style="color:#24292E;"> : </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;_shards&quot;</span><span style="color:#24292E;"> : {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;total&quot;</span><span style="color:#24292E;"> : </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;successful&quot;</span><span style="color:#24292E;"> : </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;skipped&quot;</span><span style="color:#24292E;"> : </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;failed&quot;</span><span style="color:#24292E;"> : </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;hits&quot;</span><span style="color:#24292E;"> : {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;total&quot;</span><span style="color:#24292E;"> : {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#005CC5;">&quot;value&quot;</span><span style="color:#24292E;"> : </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#005CC5;">&quot;relation&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;eq&quot;</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;max_score&quot;</span><span style="color:#24292E;"> : </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;hits&quot;</span><span style="color:#24292E;"> : [</span></span>
<span class="line"><span style="color:#24292E;">          {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#B31D28;font-style:italic;">...</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;sort&quot;</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">:</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#B31D28;font-style:italic;">...</span></span>
<span class="line"><span style="color:#24292E;">            ]</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#B31D28;font-style:italic;">}</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#B31D28;font-style:italic;">...</span></span>
<span class="line"><span style="color:#24292E;">            },</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&quot;sort&quot;</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">:</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#005CC5;">124648691</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#032F62;">&quot;624812&quot;</span></span>
<span class="line"><span style="color:#24292E;">            ]</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#B31D28;font-style:italic;">}</span></span>
<span class="line"><span style="color:#24292E;">        ]</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><p>上面的请求会为每一个文档返回一个包含sort排序值的数组。</p><p>这些sort排序值可以被用于<code>search_after</code>参数里以便抓取下一页的数据。</p><p>比如，我们可以使用最后的一个文档的sort排序值，将它传递给<code>search_after</code>参数：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">GET twitter/_search</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;size&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;match&quot;</span><span style="color:#E1E4E8;"> : {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;title&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;es&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;search_after&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#79B8FF;">124648691</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;624812&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;sort&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span><span style="color:#79B8FF;">&quot;date&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;asc&quot;</span><span style="color:#E1E4E8;">},</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span><span style="color:#79B8FF;">&quot;_id&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;desc&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">GET twitter/_search</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;size&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;match&quot;</span><span style="color:#24292E;"> : {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;title&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;es&quot;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;search_after&quot;</span><span style="color:#24292E;">: [</span><span style="color:#005CC5;">124648691</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;624812&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;sort&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">        {</span><span style="color:#005CC5;">&quot;date&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;asc&quot;</span><span style="color:#24292E;">},</span></span>
<span class="line"><span style="color:#24292E;">        {</span><span style="color:#005CC5;">&quot;_id&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;desc&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>若我们想接着上次读取的结果进行读取下一页数据，第二次查询在第一次查询时的语句基础上添加<code>search_after</code>，并指明从哪个数据后开始读取。</p><p><strong>「基本原理」</strong></p><p>es维护一个实时游标，它以上一次查询的最后一条记录为游标，方便对下一页的查询，它是一个无状态的查询，因此每次查询的都是最新的数据。</p><p>由于它采用记录作为游标，因此**「SearchAfter要求doc中至少有一条全局唯一变量（每个文档具有一个唯一值的字段应该用作排序规范）」**</p><p><strong>「优缺点」</strong></p><p><strong>「优点：」</strong></p><ol><li>无状态查询，可以防止在查询过程中，数据的变更无法及时反映到查询中。</li><li>不需要维护<code>scroll_id</code>，不需要维护快照，因此可以避免消耗大量的资源。</li></ol><p><strong>「缺点：」</strong></p><ol><li>由于无状态查询，因此在查询期间的变更可能会导致跨页面的不一值。</li><li>排序顺序可能会在执行期间发生变化，具体取决于索引的更新和删除。</li><li>至少需要制定一个唯一的不重复字段来排序。</li><li>它不适用于大幅度跳页查询，或者全量导出，对第N页的跳转查询相当于对es不断重复的执行N次search after，而全量导出则是在短时间内执行大量的重复查询。</li></ol><p><code>SEARCH_AFTER</code>不是自由跳转到任意页面的解决方案，而是并行滚动多个查询的解决方案。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><table><thead><tr><th>分页方式</th><th>性能</th><th>优点</th><th>缺点</th><th>场景</th></tr></thead><tbody><tr><td>from + size</td><td>低</td><td>灵活性好，实现简单</td><td>深度分页问题</td><td>数据量比较小，能容忍深度分页问题</td></tr><tr><td>scroll</td><td>中</td><td>解决了深度分页问题</td><td>无法反应数据的实时性（快照版本）维护成本高，需要维护一个 scroll_id</td><td>海量数据的导出需要查询海量结果集的数据</td></tr><tr><td>search_after</td><td>高</td><td>性能最好不存在深度分页问题能够反映数据的实时变更</td><td>实现复杂，需要有一个全局唯一的字段连续分页的实现会比较复杂，因为每一次查询都需要上次查询的结果，它不适用于大幅度跳页查询</td><td>海量数据的分页</td></tr></tbody></table><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202406241744017.png" alt="image-20240624174405578"></p><ul><li><p>如果数据量小（from+size在10000条内），或者只关注结果集的TopN数据，可以使用from/size 分页，简单粗暴</p></li><li><p>数据量大，深度翻页，后台批处理任务（数据迁移）之类的任务，使用 scroll 方式</p></li><li><p>数据量大，深度翻页，用户实时、高并发查询需求，使用 search after 方式</p></li></ul><blockquote><p>ES7版本变更：<a href="https://www.elastic.co/guide/en/elasticsearch/reference/master/paginate-search-results.html#scroll-search-results" target="_blank" rel="noreferrer">带PIT的search_after来进行查询</a></p></blockquote><p>在<code>7.*</code>版本中，ES官方不再推荐使用Scroll方法来进行深分页，推荐使用带PIT的<code>search_after</code>来进行查询；</p><p>从<code>7.*</code>版本开始，您可以使用<code>SEARCH_AFTER</code>参数通过上一页中的一组排序值检索下一页命中。</p><p>使用<code>SEARCH_AFTER</code>需要多个具有相同查询和排序值的搜索请求。</p><p>如果这些请求之间发生刷新，则结果的顺序可能会更改，从而导致页面之间的结果不一致。</p><p>为防止出现这种情况，您可以创建一个时间点(PIT)来在搜索过程中保留当前索引状态。</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">POST /my-index</span><span style="color:#79B8FF;">-000001</span><span style="color:#E1E4E8;">/_pit?keep_alive=</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">m</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">返回一个PIT ID</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;46ToAwMDaWR5BXV1aWQyKwZub2RlXzMAAAAAAAAAACoBYwADaWR4BXV1aWQxAgZub2RlXzEAAAAAAAAAAAEBYQADaWR5BXV1aWQyKgZub2RlXzIAAAAAAAAAAAwBYgACBXV1aWQyAAAFdXVpZDEAAQltYXRjaF9hbGw_gAAAAA==&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">POST /my-index</span><span style="color:#005CC5;">-000001</span><span style="color:#24292E;">/_pit?keep_alive=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">m</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">返回一个PIT ID</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;46ToAwMDaWR5BXV1aWQyKwZub2RlXzMAAAAAAAAAACoBYwADaWR4BXV1aWQxAgZub2RlXzEAAAAAAAAAAAEBYQADaWR5BXV1aWQyKgZub2RlXzIAAAAAAAAAAAwBYgACBXV1aWQyAAAFdXVpZDEAAQltYXRjaF9hbGw_gAAAAA==&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在搜索请求中指定PIT：</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">GET /_search</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;size&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">10000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;match&quot;</span><span style="color:#E1E4E8;"> : {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;user.id&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;elkbee&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;pit&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:  </span><span style="color:#9ECBFF;">&quot;46ToAwMDaWR5BXV1aWQyKwZub2RlXzMAAAAAAAAAACoBYwADaWR4BXV1aWQxAgZub2RlXzEAAAAAAAAAAAEBYQADaWR5BXV1aWQyKgZub2RlXzIAAAAAAAAAAAwBYgACBXV1aWQyAAAFdXVpZDEAAQltYXRjaF9hbGw_gAAAAA==&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">&quot;keep_alive&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;1m&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;sort&quot;</span><span style="color:#E1E4E8;">: [ </span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span><span style="color:#79B8FF;">&quot;@timestamp&quot;</span><span style="color:#E1E4E8;">: {</span><span style="color:#79B8FF;">&quot;order&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;asc&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">&quot;format&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;strict_date_optional_time_nanos&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">&quot;numeric_type&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;date_nanos&quot;</span><span style="color:#E1E4E8;"> }}</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">GET /_search</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;size&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">10000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;match&quot;</span><span style="color:#24292E;"> : {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;user.id&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;elkbee&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;pit&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:  </span><span style="color:#032F62;">&quot;46ToAwMDaWR5BXV1aWQyKwZub2RlXzMAAAAAAAAAACoBYwADaWR4BXV1aWQxAgZub2RlXzEAAAAAAAAAAAEBYQADaWR5BXV1aWQyKgZub2RlXzIAAAAAAAAAAAwBYgACBXV1aWQyAAAFdXVpZDEAAQltYXRjaF9hbGw_gAAAAA==&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#005CC5;">&quot;keep_alive&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;1m&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;sort&quot;</span><span style="color:#24292E;">: [ </span></span>
<span class="line"><span style="color:#24292E;">    {</span><span style="color:#005CC5;">&quot;@timestamp&quot;</span><span style="color:#24292E;">: {</span><span style="color:#005CC5;">&quot;order&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;asc&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">&quot;format&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;strict_date_optional_time_nanos&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">&quot;numeric_type&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;date_nanos&quot;</span><span style="color:#24292E;"> }}</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="es数据清理" tabindex="-1">ES数据清理 <a class="header-anchor" href="#es数据清理" aria-label="Permalink to &quot;ES数据清理&quot;">​</a></h2><ol><li>先扩容。</li><li>找到只读索引。</li><li>清除索引的数据。</li><li>通知用户。</li><li>完美。</li></ol><h3 id="参考笔记" tabindex="-1">参考笔记 <a class="header-anchor" href="#参考笔记" aria-label="Permalink to &quot;参考笔记&quot;">​</a></h3><p>ES的默认磁盘使用机制</p><p><strong>当为85%时</strong>：Elasticsearch不会将碎片分配给磁盘使用率超过85%的节点（cluster.routing.allocation.disk.watermark.low: &quot;85%&quot;）</p><p><strong>当为90%时</strong>：Elasticsearch尝试重新分配给磁盘低于使用率90%的节点（cluster.routing.allocation.disk.watermark.high: &quot;90%&quot;）</p><p><strong>当为85%时</strong>：Elasticsearch执行只读模块（cluster.routing.allocation.disk.watermark.flood_stage: &quot;85%&quot;）</p><blockquote><p>查看 es 的 索引数据</p><p>GET /_cat/allocation?v</p></blockquote><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202406241702383.png" alt="image-20240624170215002"></p><table><thead><tr><th>参数</th><th>解释</th></tr></thead><tbody><tr><td><strong>shards</strong></td><td>分片个数</td></tr><tr><td><strong>disk.used</strong></td><td>已用磁盘大小</td></tr><tr><td><strong>disk.indices</strong></td><td>索引所占磁盘大小</td></tr><tr><td><strong>disk.avail</strong></td><td>可以使用磁盘大小</td></tr><tr><td><strong>disk.total</strong></td><td>磁盘总容量</td></tr><tr><td><strong>disk.percent</strong></td><td>磁盘使用百分比</td></tr><tr><td><strong>node</strong></td><td>节点名称</td></tr></tbody></table><p>从磁盘情况可以看出节点<code>es-cn-oew1s63x6001fxazs-0e6b24df-0001</code> 使用率基本在 60%-80%，如果超过85%，索引会变成只读。ES把这个索引置为 <code>read_only_allow_delete: true</code></p><h2 id="多表关联设计" tabindex="-1">多表关联设计 <a class="header-anchor" href="#多表关联设计" aria-label="Permalink to &quot;多表关联设计&quot;">​</a></h2><blockquote><p>关系型数据库中的多表之间的关联查询，ES中有什么好的解决方案？文档结构除了对象之间的嵌套还有什么好的解决方案？</p></blockquote><p>以下<code>四种</code>常用的方法，用来在 Elasticsearch 中进行关联数据的管理：</p><h3 id="应用端关联" tabindex="-1">应用端关联 <a class="header-anchor" href="#应用端关联" aria-label="Permalink to &quot;应用端关联&quot;">​</a></h3><p>这是普遍使用的技术，即在应用接口层面来处理关联关系。</p><blockquote><ol><li>存储层面：独立两个索引存储。</li><li>实际业务层面分两次请求：</li></ol><p>第一次查询返回：Top5中文姓名和成绩； 根据第一次查询的结果，第二次查询返回：Top5中文姓名和英文姓名；</p><p>将第一次查询结果和第二次查询结果组合后，返回给用户。</p><p>即：实际业务层面是进行了两次查询，统一返回给用户。用户是<code>无感知</code>的。</p></blockquote><p><strong>适用场景</strong>：<code>数据量少</code>的业务场景。</p><p><strong>优点</strong>：数据量少时，用户体验好。</p><p><strong>缺点</strong>：数据量大，两次查询耗时肯定会比较长，影响用户体验。</p><p><strong>引申场景</strong>：关系型数据库和ES 结合，各取所长。将关系型数据库全量同步到 ES 存储，不做冗余存储。</p><p>如前所述：ES 擅长的是检索，而 MySQL 才擅长关系管理。所以可以考虑二者结合，使用 ES 多索引建立相同的别名，针对别名检索到对应 ID 后再回 MySQL 查询，业务层面通过关联 ID join 出需要的数据。</p><h3 id="宽表冗余存储" tabindex="-1">宽表冗余存储 <a class="header-anchor" href="#宽表冗余存储" aria-label="Permalink to &quot;宽表冗余存储&quot;">​</a></h3><p><code>冗余存储</code>，对每个文档保持一定数量的冗余数据可以在需要访问时避免进行关联。</p><p>这点通过logstash 同步关联数据到ES时，通常会建议：先通过视图对Mysql数据做好多表关联，然后同步视图数据到ES。此处的视图就是宽表。</p><p>示例：姓名、英文名、成绩两张表合为一张表存储。</p><p><strong>适用场景</strong>：一对多或者多对多关联。</p><p><strong>优点</strong>：速度快。因为每个文档都包含了所需的所有信息，当这些信息需要在查询进行匹配时，并不需要进行昂贵的关联操作。</p><p><strong>缺点</strong>：索引更新或删除数据，应用程序不得不处理宽表的冗余数据；由于冗余存储，导致某些搜索和聚合操作可能无法按照预期工作。</p><h3 id="嵌套文档-nested-存储" tabindex="-1">嵌套文档（Nested）存储 <a class="header-anchor" href="#嵌套文档-nested-存储" aria-label="Permalink to &quot;嵌套文档（Nested）存储&quot;">​</a></h3><p>Nested类型是ES Mapping定义的<code>集合类型</code>之一，它是比object类型更NB的支持独立检索的类型。</p><p>举例：有一个文档描述了一个帖子和一个包含帖子上所有评论的内部对象评论。可以借助 Nested 实现。</p><p><strong>注意1</strong>：当使用嵌套文档时，使用通用的查询方式是无法访问到的，必须使用合适的查询方式（nested query、nested filter、nested facet等），很多场景下，使用嵌套文档的复杂度在于索引阶段对关联关系的组织拼装。</p><p><strong>注意2</strong>：</p><blockquote><p>index.mapping.nested_fields.limit 缺省值是50。</p><p>即：一个索引中最大允许拥有50个nested类型的数据。</p></blockquote><blockquote><p>index.mapping.nested_objects.limit 缺省值是10000。</p><p>即：1个文档中所有nested类型json对象数据的总量是10000。</p></blockquote><p><strong>适用场景</strong>：1 对少量，子文档偶尔更新、查询频繁的场景。如果需要索引对象数组并保持数组中每个对象的独立性，则应使用嵌套 Nested 数据类型而不是对象 Oject 数据类型。</p><p><strong>优点</strong>：nested文档可以将父子关系的两部分数据（举例：博客+评论）关联起来做任何的查询。</p><p><strong>缺点</strong>：查询相对较慢，更新子文档需要更新整篇文档。</p><h3 id="父子文档存储" tabindex="-1">父子文档存储 <a class="header-anchor" href="#父子文档存储" aria-label="Permalink to &quot;父子文档存储&quot;">​</a></h3><p><strong>注意</strong>：6.X之前的版本的父子文档存储在相同索引的不同type中。<code>而6.X之上的版本，单索引下已不存在多type的概念</code>。父子文档Join的都是基于相同索引相同type实现的。</p><p>Join类型是ES Mapping定义的类型之一，用于在同一索引的文档中创建父/子关系。 关系部分定义文档中的一组可能关系，每个关系是父名称和子名称。</p><p><strong>适用场景</strong>：子文档数据量要<code>明显多于</code>父文档的数据量，存在1 对多量的关系；子文档更新频繁的场景。</p><p><strong>举例</strong>：1 个产品和供应商之间是1对N的关联关系。 当使用父子文档时，使用has_child 或者has_parent做父子关联查询。</p><p><strong>优点</strong>：父子文档可独立更新。</p><p><strong>缺点</strong>：维护Join关系需要占据部分内存，查询较Nested更耗资源。</p><h2 id="别名重建索引" tabindex="-1">别名重建索引 <a class="header-anchor" href="#别名重建索引" aria-label="Permalink to &quot;别名重建索引&quot;">​</a></h2><p>假设我们现在有一个索引 bucket_size_index</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">PUT /bucket_size_index </span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;settings&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;number_of_shards&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;number_of_replicas&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;mappings&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;properties&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;long&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;size&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;long&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;tenantId&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;long&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;time&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;date&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;format&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">PUT /bucket_size_index </span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;settings&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;number_of_shards&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">6</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;number_of_replicas&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;mappings&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;properties&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;long&quot;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;size&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;long&quot;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;tenantId&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;long&quot;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;time&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;date&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;format&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>在项目中我们不要直接使用<code>bucket_size_index</code>，先创建一个别名<code>bucket_size_alias</code></p><p><strong>项目中使用别名替代索引</strong></p></blockquote><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">POST /_aliases</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;actions&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;add&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;index&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bucket_size_index&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;alias&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bucket_size_alias&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">POST /_aliases</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;actions&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;add&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;index&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;bucket_size_index&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;alias&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;bucket_size_alias&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我们需要再添加一个字段<code>bucket_name</code>，我们可以创建了个新的索引 <code>bucket_size_index_2</code></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">PUT /bucket_size_index_</span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;settings&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;number_of_shards&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;number_of_replicas&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;mappings&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;properties&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;long&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;bucket_name&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;keyword&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;size&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;long&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;tenantId&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;long&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;time&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;date&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;format&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">PUT /bucket_size_index_</span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;settings&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;number_of_shards&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">6</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;number_of_replicas&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;mappings&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;properties&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;long&quot;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;bucket_name&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;keyword&quot;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;size&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;long&quot;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;tenantId&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;long&quot;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;time&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;date&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;format&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis&quot;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>使用_reindex将<code>bucket_size_index</code>中的数据重建到 <code>bucket_size_index_2</code>中</strong></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">POST _reindex</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;source&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;index&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bucket_size_index&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;dest&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;index&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bucket_size_index_2&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">POST _reindex</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;source&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;index&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;bucket_size_index&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;dest&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;index&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;bucket_size_index_2&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>如果数据量非常大<code>reindex</code>会很慢，接口会超时，我们可以使用异步<code>reindex</code></p></blockquote><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">POST _reindex?wait_for_completion=</span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;source&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;index&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bucket_size_index&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;dest&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;index&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bucket_size_index_2&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">POST _reindex?wait_for_completion=</span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;source&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;index&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;bucket_size_index&quot;</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;dest&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;index&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;bucket_size_index_2&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>接口会返回任务ID</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span><span style="color:#79B8FF;">&quot;task&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;jnj5k6NlQK-LvEopzRycxw:90463975&quot;</span><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span><span style="color:#005CC5;">&quot;task&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;jnj5k6NlQK-LvEopzRycxw:90463975&quot;</span><span style="color:#24292E;">}</span></span></code></pre></div><p>可以查询取消任务状态</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 查询所有状态</span></span>
<span class="line"><span style="color:#E1E4E8;">GET _tasks?detailed=</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">&amp;actions=*reindex</span></span>
<span class="line"><span style="color:#6A737D;">// 查询指定任务状态</span></span>
<span class="line"><span style="color:#E1E4E8;">GET /_tasks/jnj</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">k</span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">NlQK-LvEopzRycxw:</span><span style="color:#79B8FF;">90463975</span></span>
<span class="line"><span style="color:#6A737D;">// 取消任务</span></span>
<span class="line"><span style="color:#E1E4E8;">POST _tasks/jnj</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">k</span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">NlQK-LvEopzRycxw:</span><span style="color:#79B8FF;">90463975</span><span style="color:#E1E4E8;">/_cancel</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 查询所有状态</span></span>
<span class="line"><span style="color:#24292E;">GET _tasks?detailed=</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">&amp;actions=*reindex</span></span>
<span class="line"><span style="color:#6A737D;">// 查询指定任务状态</span></span>
<span class="line"><span style="color:#24292E;">GET /_tasks/jnj</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">k</span><span style="color:#005CC5;">6</span><span style="color:#24292E;">NlQK-LvEopzRycxw:</span><span style="color:#005CC5;">90463975</span></span>
<span class="line"><span style="color:#6A737D;">// 取消任务</span></span>
<span class="line"><span style="color:#24292E;">POST _tasks/jnj</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">k</span><span style="color:#005CC5;">6</span><span style="color:#24292E;">NlQK-LvEopzRycxw:</span><span style="color:#005CC5;">90463975</span><span style="color:#24292E;">/_cancel</span></span></code></pre></div><p><strong>修改别名指向</strong></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">POST /_aliases</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">&quot;actions&quot;</span><span style="color:#E1E4E8;"> : [</span></span>
<span class="line"><span style="color:#E1E4E8;">      { </span><span style="color:#79B8FF;">&quot;remove&quot;</span><span style="color:#E1E4E8;">:  { </span><span style="color:#79B8FF;">&quot;index&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bucket_size_index&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">&quot;alias&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bucket_size_alias&quot;</span><span style="color:#E1E4E8;"> } },</span></span>
<span class="line"><span style="color:#E1E4E8;">      { </span><span style="color:#79B8FF;">&quot;add&quot;</span><span style="color:#E1E4E8;">:  { </span><span style="color:#79B8FF;">&quot;index&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bucket_size_index_2&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">&quot;alias&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;bucket_size_alias&quot;</span><span style="color:#E1E4E8;"> } }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">POST /_aliases</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#005CC5;">&quot;actions&quot;</span><span style="color:#24292E;"> : [</span></span>
<span class="line"><span style="color:#24292E;">      { </span><span style="color:#005CC5;">&quot;remove&quot;</span><span style="color:#24292E;">:  { </span><span style="color:#005CC5;">&quot;index&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;bucket_size_index&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">&quot;alias&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;bucket_size_alias&quot;</span><span style="color:#24292E;"> } },</span></span>
<span class="line"><span style="color:#24292E;">      { </span><span style="color:#005CC5;">&quot;add&quot;</span><span style="color:#24292E;">:  { </span><span style="color:#005CC5;">&quot;index&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;bucket_size_index_2&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">&quot;alias&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;bucket_size_alias&quot;</span><span style="color:#24292E;"> } }</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>发现新添加的数据有<code>bucket_mame</code>这个字段，老数据没有<code>bucket_name</code>字段数据，这里我们可以通过<code>_update_by_query</code>批量给<code>bucket_name</code>添加个默认值</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">POST /bucket_size_alias/_update_by_query</span></span>
<span class="line"><span style="color:#e1e4e8;">{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;query&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">        &quot;bool&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">            &quot;must_not&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">                &quot;exists&quot;: {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    &quot;field&quot;: &quot;bucket_name&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    },</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;script&quot;:{</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;inline&quot; : &quot;ctx._source.bucket_name= &#39;default_bucket_name&#39;&quot;,</span></span>
<span class="line"><span style="color:#e1e4e8;">    &quot;lang&quot; : &quot;painless&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">POST /bucket_size_alias/_update_by_query</span></span>
<span class="line"><span style="color:#24292e;">{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;query&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">        &quot;bool&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">            &quot;must_not&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">                &quot;exists&quot;: {</span></span>
<span class="line"><span style="color:#24292e;">                    &quot;field&quot;: &quot;bucket_name&quot;</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    },</span></span>
<span class="line"><span style="color:#24292e;">    &quot;script&quot;:{</span></span>
<span class="line"><span style="color:#24292e;">    &quot;inline&quot; : &quot;ctx._source.bucket_name= &#39;default_bucket_name&#39;&quot;,</span></span>
<span class="line"><span style="color:#24292e;">    &quot;lang&quot; : &quot;painless&quot;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="references" tabindex="-1">References <a class="header-anchor" href="#references" aria-label="Permalink to &quot;References&quot;">​</a></h2><ul><li><a href="https://juejin.cn/post/6844903807042715655" target="_blank" rel="noreferrer">Elasticsearch多表关联设计指南</a></li><li><a href="https://mp.weixin.qq.com/s?__biz=MzI2NDY1MTA3OQ==&amp;mid=2247484228&amp;idx=1&amp;sn=a75546e29f5eb9be0d7d6c834bd91b83&amp;chksm=eaa82b6cdddfa27a7f5fb5d35394acaba2b0d088f1bde9d0310075573bc38d576f861f26854f&amp;scene=21#wechat_redirect" target="_blank" rel="noreferrer">Elasticsearch Nested类型深入详解</a></li><li><a href="https://mp.weixin.qq.com/s?__biz=MzI2NDY1MTA3OQ==&amp;mid=2247483998&amp;idx=1&amp;sn=6c407a0e0a30c1237451ddd1b40f5c0b&amp;chksm=eaa82a76dddfa3604354a969ec1520121294e188ea2ba5120a3a29026c379fb45f53394d4a27&amp;scene=21#wechat_redirect" target="_blank" rel="noreferrer">Elasticsearch 6.X 新类型Join深入详解</a></li><li><a href="https://juejin.cn/post/7314227647176212532#heading-2" target="_blank" rel="noreferrer">Alias别名的2个核心场景</a></li></ul>`,146),e=[o];function t(c,r,E,y,i,u){return n(),a("div",null,e)}const F=s(p,[["render",t]]);export{d as __pageData,F as default};
