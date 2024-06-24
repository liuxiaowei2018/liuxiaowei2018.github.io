import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8048b864.js";const D=JSON.parse('{"title":"并发编程-阻塞队列","description":"","frontmatter":{},"headers":[],"relativePath":"java/juc/阻塞队列.md","filePath":"java/juc/阻塞队列.md","lastUpdated":1719210606000}'),p={name:"java/juc/阻塞队列.md"},o=l(`<h1 id="并发编程-阻塞队列" tabindex="-1">并发编程-阻塞队列 <a class="header-anchor" href="#并发编程-阻塞队列" aria-label="Permalink to &quot;并发编程-阻塞队列&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#arrayblockingqueue">ArrayBlockingQueue</a><ul><li><a href="#构造方法">构造方法</a></li><li><a href="#put方法">put方法</a></li><li><a href="#add方法">add方法</a></li><li><a href="#offer方法">offer方法</a></li><li><a href="#offer-e-time-unit-方法">offer(e, time, unit)方法</a></li><li><a href="#poll方法">poll方法</a></li><li><a href="#remove方法">remove方法</a></li><li><a href="#take方法">take方法</a></li><li><a href="#poll-time-unit-方法">poll(time, unit)方法</a></li><li><a href="#peek方法">peek方法</a></li><li><a href="#element方法">element方法</a></li></ul></li><li><a href="#linkedblockingqueue">LinkedBlockingQueue</a><ul><li><a href="#构造方法-1">构造方法</a></li><li><a href="#offer方法-1">offer方法</a></li><li><a href="#add方法-1">add方法</a></li><li><a href="#put方法-1">put方法</a></li><li><a href="#offer-e-time-unit-方法-1">offer(e, time, unit)方法</a></li><li><a href="#poll方法-1">poll方法</a></li><li><a href="#remove方法-1">remove方法</a></li><li><a href="#take方法-1">take方法</a></li><li><a href="#poll-time-unit-方法-1">poll(time, unit)方法</a></li><li><a href="#peek方法-1">peek方法</a></li><li><a href="#element方法-1">element方法</a></li></ul></li><li><a href="#synchronousqueue">SynchronousQueue</a><ul><li><a href="#构造方法-2">构造方法</a></li><li><a href="#transferstack">TransferStack</a></li><li><a href="#transferqueue">TransferQueue</a></li><li><a href="#offer方法-2">offer方法</a></li><li><a href="#add方法-2">add方法</a></li><li><a href="#put方法-2">put方法</a></li><li><a href="#offer-e-time-unit-方法-2">offer(e, time, unit)方法</a></li><li><a href="#poll方法-2">poll方法</a></li><li><a href="#remove方法-2">remove方法</a></li><li><a href="#take方法-2">take方法</a></li><li><a href="#poll-time-unit-方法-2">poll(time, unit)方法</a></li><li><a href="#peek方法-2">peek方法</a></li><li><a href="#element方法-2">element方法</a></li></ul></li><li><a href="#linkedtransferqueue">LinkedTransferQueue</a></li><li><a href="#priorityblockingqueue">PriorityBlockingQueue</a></li><li><a href="#delayqueue">DelayQueue</a></li><li><a href="#q-a">Q&amp;A</a></li></ul></nav><blockquote><p>BlockingQueue</p><p>阻塞队列本身也是队列，但是它是适用于多线程环境下的，基于ReentrantLock实现的。</p></blockquote><p>接口定义如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BlockingQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Queue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">   	</span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(E </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 入队，如果队列已满，返回false否则返回true（非阻塞）</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(E </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 入队，如果队列已满，阻塞线程直到能入队为止</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(E </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> InterruptedException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 入队，如果队列已满，阻塞线程直到能入队或超时、中断为止，入队成功返回true否则false</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(E </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">timeout</span><span style="color:#E1E4E8;">, TimeUnit </span><span style="color:#FFAB70;">unit</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> InterruptedException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 出队，如果队列为空，阻塞线程直到能出队为止</span></span>
<span class="line"><span style="color:#E1E4E8;">    E </span><span style="color:#B392F0;">take</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> InterruptedException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 出队，如果队列为空，阻塞线程直到能出队超时、中断为止，出队成功正常返回，否则返回null</span></span>
<span class="line"><span style="color:#E1E4E8;">    E </span><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">timeout</span><span style="color:#E1E4E8;">, TimeUnit </span><span style="color:#FFAB70;">unit</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> InterruptedException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 返回此队列理想情况下（在没有内存或资源限制的情况下）可以不阻塞地入队的数量，如果没有限制，则返回 Integer.MAX_VALUE</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">remainingCapacity</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">(Object </span><span style="color:#FFAB70;">o</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">contains</span><span style="color:#E1E4E8;">(Object </span><span style="color:#FFAB70;">o</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  	</span><span style="color:#6A737D;">// 一次性从BlockingQueue中获取所有可用的数据对象（还可以指定获取数据的个数）</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">drainTo</span><span style="color:#E1E4E8;">(Collection&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">super</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">c</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">drainTo</span><span style="color:#E1E4E8;">(Collection&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">super</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">c</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">maxElements</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BlockingQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Queue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">   	</span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(E </span><span style="color:#E36209;">e</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 入队，如果队列已满，返回false否则返回true（非阻塞）</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(E </span><span style="color:#E36209;">e</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 入队，如果队列已满，阻塞线程直到能入队为止</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(E </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> InterruptedException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 入队，如果队列已满，阻塞线程直到能入队或超时、中断为止，入队成功返回true否则false</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(E </span><span style="color:#E36209;">e</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> </span><span style="color:#E36209;">timeout</span><span style="color:#24292E;">, TimeUnit </span><span style="color:#E36209;">unit</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> InterruptedException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 出队，如果队列为空，阻塞线程直到能出队为止</span></span>
<span class="line"><span style="color:#24292E;">    E </span><span style="color:#6F42C1;">take</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> InterruptedException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 出队，如果队列为空，阻塞线程直到能出队超时、中断为止，出队成功正常返回，否则返回null</span></span>
<span class="line"><span style="color:#24292E;">    E </span><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> </span><span style="color:#E36209;">timeout</span><span style="color:#24292E;">, TimeUnit </span><span style="color:#E36209;">unit</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> InterruptedException;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 返回此队列理想情况下（在没有内存或资源限制的情况下）可以不阻塞地入队的数量，如果没有限制，则返回 Integer.MAX_VALUE</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">remainingCapacity</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">(Object </span><span style="color:#E36209;">o</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">contains</span><span style="color:#24292E;">(Object </span><span style="color:#E36209;">o</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  	</span><span style="color:#6A737D;">// 一次性从BlockingQueue中获取所有可用的数据对象（还可以指定获取数据的个数）</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">drainTo</span><span style="color:#24292E;">(Collection&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">super</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">c</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">drainTo</span><span style="color:#24292E;">(Collection&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">super</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">c</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">maxElements</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><table><thead><tr><th>操作</th><th>抛出异常</th><th>返回特定值</th><th>阻塞</th><th>阻塞一段时间</th></tr></thead><tbody><tr><td>放数据</td><td>add()</td><td>offer()</td><td>put()</td><td>offer(e, time, unit)</td></tr><tr><td>取数据（同时删除数据）</td><td>remove()</td><td>poll()</td><td>take()</td><td>poll(time, unit)</td></tr><tr><td>取数据（不删除）</td><td>element()</td><td>peek()</td><td>不支持</td><td>不支持</td></tr></tbody></table><p><code>BlockingQueue</code>有5个常见的实现类（应用于不同的场景）。</p><ul><li>ArrayBlockingQueue：基于数组实现的阻塞队列，创建队列时需指定容量大小，是有界队列。</li><li>LinkedBlockingQueue：无界带缓冲阻塞队列（没有容量限制，也可以限制容量，也会阻塞，链表实现）。</li><li>SynchronousQueue：无缓冲阻塞队列（相当于没有容量的ArrayBlockingQueue，因此只有阻塞的情况）。</li><li>PriorityBlockingQueue - 是一个支持优先级的阻塞队列，元素的获取顺序按优先级决定；是无界队列。</li><li>DelayQueue - 基于PriorityQueue实现的，是无界队列；它能够实现延迟获取元素，同样支持优先级。</li></ul><h2 id="arrayblockingqueue" tabindex="-1">ArrayBlockingQueue <a class="header-anchor" href="#arrayblockingqueue" aria-label="Permalink to &quot;ArrayBlockingQueue&quot;">​</a></h2><p><code>ArrayBlockingQueue</code>队列具有以下特点：</p><ol><li>ArrayBlockingQueue实现了BlockingQueue接口，提供了四组放数据和读数据的方法，来满足不同的场景。</li><li>ArrayBlockingQueue底层基于数组实现，采用循环数组，提升了数组的空间利用率。</li><li>ArrayBlockingQueue初始化的时候，必须指定队列长度，是有界的阻塞队列，所以要预估好队列长度，保证生产者和消费者速率相匹配。</li><li>ArrayBlockingQueue的方法是线程安全的，使用ReentrantLock在操作前后加锁释放锁来线程安全。</li></ol><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ArrayBlockingQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AbstractQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BlockingQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;, java.io.</span><span style="color:#B392F0;">Serializable</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 用来存放数据的数组</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">[] items;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 下次取数据的数组下标位置</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> takeIndex;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 下次放数据的数组下标位置</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> putIndex;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 元素个数</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> count;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 独占锁，用来保证存取数据安全</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock lock;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 取数据的条件</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Condition notEmpty;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 放数据的条件</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Condition notFull;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ArrayBlockingQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AbstractQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BlockingQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;, java.io.</span><span style="color:#6F42C1;">Serializable</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 用来存放数据的数组</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">[] items;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 下次取数据的数组下标位置</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> takeIndex;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 下次放数据的数组下标位置</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> putIndex;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 元素个数</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> count;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 独占锁，用来保证存取数据安全</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock lock;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 取数据的条件</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Condition notEmpty;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 放数据的条件</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Condition notFull;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>ArrayBlockingQueue</code>底层是基于数组实现的，使用对象数组items存储元素。</p><p>为了实现队列特性（一端插入，另一端删除），定义了两个指针，takeIndex表示下次取数据的位置，putIndex表示下次放数据的位置。</p><p>另外<code>ArrayBlockingQueue</code>还使用<code>ReentrantLock</code>保证线程安全，并且定义了两个条件 notEmpty notFull，当条件满足的时候才允许放数据或者取数据。</p><h3 id="构造方法" tabindex="-1">构造方法 <a class="header-anchor" href="#构造方法" aria-label="Permalink to &quot;构造方法&quot;">​</a></h3><p><code>ArrayBlockingQueue</code>常用的初始化方法有两个：</p><ol><li>指定容量大小</li><li>指定容量大小和是否是公平锁</li></ol><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 指定容量大小的构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">BlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; blockingDeque1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ArrayBlockingQueue&lt;&gt;(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 指定容量大小、公平锁的构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">BlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; blockingDeque1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ArrayBlockingQueue&lt;&gt;(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 指定容量大小的构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">BlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; blockingDeque1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ArrayBlockingQueue&lt;&gt;(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 指定容量大小、公平锁的构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">BlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; blockingDeque1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ArrayBlockingQueue&lt;&gt;(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span></span></code></pre></div><p>源码实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 指定容量大小的构造方法（默认是非公平锁）</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ArrayBlockingQueue</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> capacity) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">(capacity, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 指定容量大小、公平锁的构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">capacity</span><span style="color:#6A737D;"> 数组容量</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">fair</span><span style="color:#6A737D;">     是否是公平锁</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ArrayBlockingQueue</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> capacity, </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> fair) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (capacity </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IllegalArgumentException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.items </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">[capacity];</span></span>
<span class="line"><span style="color:#E1E4E8;">    lock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ReentrantLock</span><span style="color:#E1E4E8;">(fair);</span></span>
<span class="line"><span style="color:#E1E4E8;">    notEmpty </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> lock.</span><span style="color:#B392F0;">newCondition</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    notFull </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> lock.</span><span style="color:#B392F0;">newCondition</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 指定容量大小的构造方法（默认是非公平锁）</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ArrayBlockingQueue</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> capacity) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">(capacity, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 指定容量大小、公平锁的构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">capacity</span><span style="color:#6A737D;"> 数组容量</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">fair</span><span style="color:#6A737D;">     是否是公平锁</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ArrayBlockingQueue</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> capacity, </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> fair) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (capacity </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IllegalArgumentException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.items </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">[capacity];</span></span>
<span class="line"><span style="color:#24292E;">    lock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ReentrantLock</span><span style="color:#24292E;">(fair);</span></span>
<span class="line"><span style="color:#24292E;">    notEmpty </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> lock.</span><span style="color:#6F42C1;">newCondition</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    notFull </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> lock.</span><span style="color:#6F42C1;">newCondition</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>放数据的方法有四个：</p><table><thead><tr><th>操作</th><th>抛出异常</th><th>返回特定值</th><th>阻塞</th><th>阻塞一段时间</th></tr></thead><tbody><tr><td>放数据</td><td>add()</td><td>offer()</td><td>put()</td><td>offer(e, time, unit)</td></tr></tbody></table><h3 id="put方法" tabindex="-1">put方法 <a class="header-anchor" href="#put方法" aria-label="Permalink to &quot;put方法&quot;">​</a></h3><p>put()方法在数组满的时候，会一直阻塞，直到有其他线程取走数据，空出位置，才能添加成功。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * put方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(E e) throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">checkNotNull</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock lock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.lock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    lock.</span><span style="color:#B392F0;">lockInterruptibly</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 3. 如果队列已满，就一直阻塞，直到被唤醒</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (count </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> items.length) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            notFull.</span><span style="color:#B392F0;">await</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 4. 如果队列未满，直接入队</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">enqueue</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 5. 释放锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        lock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * put方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(E e) throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">checkNotNull</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock lock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.lock;</span></span>
<span class="line"><span style="color:#24292E;">    lock.</span><span style="color:#6F42C1;">lockInterruptibly</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 3. 如果队列已满，就一直阻塞，直到被唤醒</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (count </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> items.length) {</span></span>
<span class="line"><span style="color:#24292E;">            notFull.</span><span style="color:#6F42C1;">await</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 4. 如果队列未满，直接入队</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">enqueue</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 5. 释放锁</span></span>
<span class="line"><span style="color:#24292E;">        lock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="add方法" tabindex="-1">add方法 <a class="header-anchor" href="#add方法" aria-label="Permalink to &quot;add方法&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * add方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 是否添加成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(E e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(e)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IllegalStateException</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Queue full&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * add方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 是否添加成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(E e) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(e)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IllegalStateException</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Queue full&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>add()方法在数组满的时候，会抛出异常，底层基于offer()实现。</p><h3 id="offer方法" tabindex="-1">offer方法 <a class="header-anchor" href="#offer方法" aria-label="Permalink to &quot;offer方法&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * offer方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 是否插入成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(E e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">checkNotNull</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 加锁</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock lock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.lock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    lock.</span><span style="color:#B392F0;">lock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 3. 判断数组是否已满，如果满了就直接返回false结束</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (count </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> items.length) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 4. 否则就插入</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">enqueue</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 5. 释放锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        lock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 入队</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">x</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">enqueue</span><span style="color:#E1E4E8;">(E x) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 获取数组</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">[] items </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.items;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 直接放入数组</span></span>
<span class="line"><span style="color:#E1E4E8;">    items[putIndex] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> x;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 3. 移动putIndex位置，如果到达数组的末尾就从头开始</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">putIndex </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> items.length) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        putIndex </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 4. 计数</span></span>
<span class="line"><span style="color:#E1E4E8;">    count</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 5. 唤醒因为队列为空，等待取数据的线程</span></span>
<span class="line"><span style="color:#E1E4E8;">    notEmpty.</span><span style="color:#B392F0;">signal</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * offer方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 是否插入成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(E e) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">checkNotNull</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 加锁</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock lock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.lock;</span></span>
<span class="line"><span style="color:#24292E;">    lock.</span><span style="color:#6F42C1;">lock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 3. 判断数组是否已满，如果满了就直接返回false结束</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (count </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> items.length) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 4. 否则就插入</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">enqueue</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 5. 释放锁</span></span>
<span class="line"><span style="color:#24292E;">        lock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 入队</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">x</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">enqueue</span><span style="color:#24292E;">(E x) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 获取数组</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">[] items </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.items;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 直接放入数组</span></span>
<span class="line"><span style="color:#24292E;">    items[putIndex] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> x;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 3. 移动putIndex位置，如果到达数组的末尾就从头开始</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">putIndex </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> items.length) {</span></span>
<span class="line"><span style="color:#24292E;">        putIndex </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 4. 计数</span></span>
<span class="line"><span style="color:#24292E;">    count</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 5. 唤醒因为队列为空，等待取数据的线程</span></span>
<span class="line"><span style="color:#24292E;">    notEmpty.</span><span style="color:#6F42C1;">signal</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>offer()在数组满的时候，会返回false，表示添加失败。 为了循环利用数组，添加元素的时候如果已经到了队尾，就从队头重新开始，相当于一个循环队列。</p><h3 id="offer-e-time-unit-方法" tabindex="-1">offer(e, time, unit)方法 <a class="header-anchor" href="#offer-e-time-unit-方法" aria-label="Permalink to &quot;offer(e, time, unit)方法&quot;">​</a></h3><p>在数组满的时候， offer(e, time, unit)方法会阻塞一段时间。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * offer方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">e</span><span style="color:#6A737D;">       元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">unit</span><span style="color:#6A737D;">    时间单位</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 是否添加成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(E e, </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">checkNotNull</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 把超时时间转换为纳秒</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> nanos </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> unit.</span><span style="color:#B392F0;">toNanos</span><span style="color:#E1E4E8;">(timeout);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 3. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock lock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.lock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    lock.</span><span style="color:#B392F0;">lockInterruptibly</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 4. 循环判断队列是否已满</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (count </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> items.length) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nanos </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 6. 如果队列已满，且超时时间已过，则返回false</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 5. 如果队列已满，则等待指定时间</span></span>
<span class="line"><span style="color:#E1E4E8;">            nanos </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> notFull.</span><span style="color:#B392F0;">awaitNanos</span><span style="color:#E1E4E8;">(nanos);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 7. 如果队列未满，则入队</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">enqueue</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 8. 释放锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        lock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * offer方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">e</span><span style="color:#6A737D;">       元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">unit</span><span style="color:#6A737D;">    时间单位</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 是否添加成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(E e, </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">checkNotNull</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 把超时时间转换为纳秒</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> nanos </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> unit.</span><span style="color:#6F42C1;">toNanos</span><span style="color:#24292E;">(timeout);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 3. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock lock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.lock;</span></span>
<span class="line"><span style="color:#24292E;">    lock.</span><span style="color:#6F42C1;">lockInterruptibly</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 4. 循环判断队列是否已满</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (count </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> items.length) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nanos </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 6. 如果队列已满，且超时时间已过，则返回false</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 5. 如果队列已满，则等待指定时间</span></span>
<span class="line"><span style="color:#24292E;">            nanos </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> notFull.</span><span style="color:#6F42C1;">awaitNanos</span><span style="color:#24292E;">(nanos);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 7. 如果队列未满，则入队</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">enqueue</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 8. 释放锁</span></span>
<span class="line"><span style="color:#24292E;">        lock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>取数据（取出数据并删除）的方法有四个：</p><table><thead><tr><th>操作</th><th>抛出异常</th><th>返回特定值</th><th>阻塞</th><th>阻塞一段时间</th></tr></thead><tbody><tr><td>取数据（同时删除数据）</td><td>remove()</td><td>poll()</td><td>take()</td><td>poll(time, unit)</td></tr></tbody></table><h3 id="poll方法" tabindex="-1">poll方法 <a class="header-anchor" href="#poll方法" aria-label="Permalink to &quot;poll方法&quot;">​</a></h3><p>poll()方法在弹出元素的时候如果数组为空则返回null，表示弹出失败（取数据跟放数据一样都是循环遍历数组）。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * poll方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 加锁</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock lock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.lock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    lock.</span><span style="color:#B392F0;">lock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 2. 如果数组为空，则返回null，否则返回队列头部元素</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (count </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dequeue</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 3. 释放锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        lock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 出列</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">dequeue</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 取出队列头部元素</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">[] items </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.items;</span></span>
<span class="line"><span style="color:#E1E4E8;">    E x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (E) items[takeIndex];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 取出元素后，把该位置置空</span></span>
<span class="line"><span style="color:#E1E4E8;">    items[takeIndex] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 3. 移动takeIndex位置，如果到达数组的末尾就从头开始</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">takeIndex </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> items.length) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        takeIndex </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 4. 元素个数减一</span></span>
<span class="line"><span style="color:#E1E4E8;">    count</span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (itrs </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        itrs.</span><span style="color:#B392F0;">elementDequeued</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 5. 唤醒因为队列已满，等待放数据的线程</span></span>
<span class="line"><span style="color:#E1E4E8;">    notFull.</span><span style="color:#B392F0;">signal</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * poll方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 加锁</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock lock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.lock;</span></span>
<span class="line"><span style="color:#24292E;">    lock.</span><span style="color:#6F42C1;">lock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 2. 如果数组为空，则返回null，否则返回队列头部元素</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (count </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dequeue</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 3. 释放锁</span></span>
<span class="line"><span style="color:#24292E;">        lock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 出列</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">dequeue</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 取出队列头部元素</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">[] items </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.items;</span></span>
<span class="line"><span style="color:#24292E;">    E x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (E) items[takeIndex];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 取出元素后，把该位置置空</span></span>
<span class="line"><span style="color:#24292E;">    items[takeIndex] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 3. 移动takeIndex位置，如果到达数组的末尾就从头开始</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">takeIndex </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> items.length) {</span></span>
<span class="line"><span style="color:#24292E;">        takeIndex </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 4. 元素个数减一</span></span>
<span class="line"><span style="color:#24292E;">    count</span><span style="color:#D73A49;">--</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (itrs </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        itrs.</span><span style="color:#6F42C1;">elementDequeued</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 5. 唤醒因为队列已满，等待放数据的线程</span></span>
<span class="line"><span style="color:#24292E;">    notFull.</span><span style="color:#6F42C1;">signal</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> x;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="remove方法" tabindex="-1">remove方法 <a class="header-anchor" href="#remove方法" aria-label="Permalink to &quot;remove方法&quot;">​</a></h3><p>如果数组为空，remove()会抛出异常。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * remove方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 直接调用poll方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    E x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 如果取到数据，直接返回，否则抛出异常</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (x </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NoSuchElementException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * remove方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 直接调用poll方法</span></span>
<span class="line"><span style="color:#24292E;">    E x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 如果取到数据，直接返回，否则抛出异常</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (x </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> x;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NoSuchElementException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="take方法" tabindex="-1">take方法 <a class="header-anchor" href="#take方法" aria-label="Permalink to &quot;take方法&quot;">​</a></h3><p>如果数组为空，take()方法就一直阻塞，直到被唤醒。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * take方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">take</span><span style="color:#E1E4E8;">() throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock lock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.lock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    lock.</span><span style="color:#B392F0;">lockInterruptibly</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 2. 如果数组为空，就一直阻塞，直到被唤醒</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (count </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            notEmpty.</span><span style="color:#B392F0;">await</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 3. 如果数组不为空，就从数组中取数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dequeue</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 4. 释放锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        lock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * take方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">take</span><span style="color:#24292E;">() throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock lock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.lock;</span></span>
<span class="line"><span style="color:#24292E;">    lock.</span><span style="color:#6F42C1;">lockInterruptibly</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 2. 如果数组为空，就一直阻塞，直到被唤醒</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (count </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            notEmpty.</span><span style="color:#6F42C1;">await</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 3. 如果数组不为空，就从数组中取数据</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dequeue</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 4. 释放锁</span></span>
<span class="line"><span style="color:#24292E;">        lock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="poll-time-unit-方法" tabindex="-1">poll(time, unit)方法 <a class="header-anchor" href="#poll-time-unit-方法" aria-label="Permalink to &quot;poll(time, unit)方法&quot;">​</a></h3><p>在数组满的时候， poll(time, unit)方法会阻塞一段时间。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * poll方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">unit</span><span style="color:#6A737D;">    时间单位</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 把超时时间转换成纳秒</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> nanos </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> unit.</span><span style="color:#B392F0;">toNanos</span><span style="color:#E1E4E8;">(timeout);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock lock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.lock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    lock.</span><span style="color:#B392F0;">lockInterruptibly</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 3. 如果数组为空，就开始阻塞</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (count </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nanos </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 5. 如果数组为空，且超时时间已过，则返回null</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 4. 阻塞到到指定时间</span></span>
<span class="line"><span style="color:#E1E4E8;">            nanos </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> notEmpty.</span><span style="color:#B392F0;">awaitNanos</span><span style="color:#E1E4E8;">(nanos);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 6. 如果数组不为空，则出列</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dequeue</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 7. 释放锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        lock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * poll方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">unit</span><span style="color:#6A737D;">    时间单位</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 把超时时间转换成纳秒</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> nanos </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> unit.</span><span style="color:#6F42C1;">toNanos</span><span style="color:#24292E;">(timeout);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock lock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.lock;</span></span>
<span class="line"><span style="color:#24292E;">    lock.</span><span style="color:#6F42C1;">lockInterruptibly</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 3. 如果数组为空，就开始阻塞</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (count </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nanos </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 5. 如果数组为空，且超时时间已过，则返回null</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 4. 阻塞到到指定时间</span></span>
<span class="line"><span style="color:#24292E;">            nanos </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> notEmpty.</span><span style="color:#6F42C1;">awaitNanos</span><span style="color:#24292E;">(nanos);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 6. 如果数组不为空，则出列</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dequeue</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 7. 释放锁</span></span>
<span class="line"><span style="color:#24292E;">        lock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>取数据的方法</p><table><thead><tr><th>操作</th><th>抛出异常</th><th>返回特定值</th><th>阻塞</th><th>阻塞一段时间</th></tr></thead><tbody><tr><td>取数据（不删除）</td><td>element()</td><td>peek()</td><td>不支持</td><td>不支持</td></tr></tbody></table><h3 id="peek方法" tabindex="-1">peek方法 <a class="header-anchor" href="#peek方法" aria-label="Permalink to &quot;peek方法&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * peek方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">peek</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 加锁</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock lock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.lock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    lock.</span><span style="color:#B392F0;">lock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 2. 返回数组头部元素，如果数组为空，则返回null</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">itemAt</span><span style="color:#E1E4E8;">(takeIndex);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 3. 释放锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        lock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 返回当前位置元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">itemAt</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (E) items[i];</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * peek方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">peek</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 加锁</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock lock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.lock;</span></span>
<span class="line"><span style="color:#24292E;">    lock.</span><span style="color:#6F42C1;">lock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 2. 返回数组头部元素，如果数组为空，则返回null</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">itemAt</span><span style="color:#24292E;">(takeIndex);</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 3. 释放锁</span></span>
<span class="line"><span style="color:#24292E;">        lock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 返回当前位置元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">final</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">itemAt</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (E) items[i];</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="element方法" tabindex="-1">element方法 <a class="header-anchor" href="#element方法" aria-label="Permalink to &quot;element方法&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * element方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">element</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 调用peek方法查询数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    E x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">peek</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 如果查到数据，直接返回</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (x </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 3. 如果没找到，则抛出异常</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NoSuchElementException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * element方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">element</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 调用peek方法查询数据</span></span>
<span class="line"><span style="color:#24292E;">    E x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">peek</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 如果查到数据，直接返回</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (x </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> x;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 3. 如果没找到，则抛出异常</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NoSuchElementException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="linkedblockingqueue" tabindex="-1">LinkedBlockingQueue <a class="header-anchor" href="#linkedblockingqueue" aria-label="Permalink to &quot;LinkedBlockingQueue&quot;">​</a></h2><p><code>LinkedBlockingQueue</code>队列具有以下特点：</p><ol><li><code>LinkedBlockingQueue</code>实现了<code>BlockingQueue</code>接口，提供了四组放数据和读数据的方法，来满足不同的场景。</li><li><code>LinkedBlockingQueue</code>底层基于链表实现，支持从头部弹出数据，从尾部添加数据。</li><li><code>LinkedBlockingQueue</code>初始化的时候，如果不指定队列长度，默认长度是Integer最大值，有内存溢出风险，建议初始化的时候指定队列长度。</li><li><code>LinkedBlockingQueue</code>的方法是线程安全的，分别使用了读写两把锁，比<code>ArrayBlockingQueue</code>性能更好。</li></ol><blockquote><p>Java线程池中的固定大小线程池就是基于<code>LinkedBlockingQueue</code>实现的。</p></blockquote><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 创建固定大小的线程池</span></span>
<span class="line"><span style="color:#E1E4E8;">ExecutorService executorService </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Executors.</span><span style="color:#B392F0;">newFixedThreadPool</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 底层使用LinkedBlockingQueue队列存储任务</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> ExecutorService </span><span style="color:#B392F0;">newFixedThreadPool</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> nThreads) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ThreadPoolExecutor</span><span style="color:#E1E4E8;">(nThreads, nThreads,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                  </span><span style="color:#79B8FF;">0L</span><span style="color:#E1E4E8;">, TimeUnit.MILLISECONDS,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                  </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> LinkedBlockingQueue&lt;</span><span style="color:#F97583;">Runnable</span><span style="color:#E1E4E8;">&gt;());</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 创建固定大小的线程池</span></span>
<span class="line"><span style="color:#24292E;">ExecutorService executorService </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Executors.</span><span style="color:#6F42C1;">newFixedThreadPool</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 底层使用LinkedBlockingQueue队列存储任务</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> ExecutorService </span><span style="color:#6F42C1;">newFixedThreadPool</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> nThreads) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ThreadPoolExecutor</span><span style="color:#24292E;">(nThreads, nThreads,</span></span>
<span class="line"><span style="color:#24292E;">                                  </span><span style="color:#005CC5;">0L</span><span style="color:#24292E;">, TimeUnit.MILLISECONDS,</span></span>
<span class="line"><span style="color:#24292E;">                                  </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> LinkedBlockingQueue&lt;</span><span style="color:#D73A49;">Runnable</span><span style="color:#24292E;">&gt;());</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LinkedBlockingQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AbstractQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BlockingQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;, java.io.</span><span style="color:#B392F0;">Serializable</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 容量大小</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> capacity;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 元素个数</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> AtomicInteger count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AtomicInteger</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 头节点</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">transient</span><span style="color:#E1E4E8;"> Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; head;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 尾节点</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">transient</span><span style="color:#E1E4E8;"> Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; last;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 取数据的锁</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock takeLock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ReentrantLock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 取数据的条件（队列非空）</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Condition notEmpty </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> takeLock.</span><span style="color:#B392F0;">newCondition</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 放数据的锁</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock putLock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ReentrantLock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 放数据的条件（队列非满）</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Condition notFull </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> putLock.</span><span style="color:#B392F0;">newCondition</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 链表节点类</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Node</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#6A737D;">        /**</span></span>
<span class="line"><span style="color:#6A737D;">         * 节点元素</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#E1E4E8;">        E item;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#6A737D;">        /**</span></span>
<span class="line"><span style="color:#6A737D;">         * 后继节点</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#E1E4E8;">        Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; next;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">Node</span><span style="color:#E1E4E8;">(E </span><span style="color:#FFAB70;">x</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            item </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> x;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LinkedBlockingQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AbstractQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BlockingQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;, java.io.</span><span style="color:#6F42C1;">Serializable</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 容量大小</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> capacity;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 元素个数</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> AtomicInteger count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AtomicInteger</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 头节点</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">transient</span><span style="color:#24292E;"> Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; head;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 尾节点</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">transient</span><span style="color:#24292E;"> Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; last;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 取数据的锁</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock takeLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ReentrantLock</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 取数据的条件（队列非空）</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Condition notEmpty </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> takeLock.</span><span style="color:#6F42C1;">newCondition</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 放数据的锁</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock putLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ReentrantLock</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 放数据的条件（队列非满）</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Condition notFull </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> putLock.</span><span style="color:#6F42C1;">newCondition</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 链表节点类</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Node</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#6A737D;">        /**</span></span>
<span class="line"><span style="color:#6A737D;">         * 节点元素</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#24292E;">        E item;</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#6A737D;">        /**</span></span>
<span class="line"><span style="color:#6A737D;">         * 后继节点</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#24292E;">        Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; next;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">Node</span><span style="color:#24292E;">(E </span><span style="color:#E36209;">x</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            item </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> x;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202406222027417.png" alt="image-20240622202717389"></p><p><code>LinkedBlockingQueue</code>底层是基于链表实现的，定义了头节点head和尾节点last，由链表节点类Node可以看出是个单链表。</p><blockquote><p><code>ArrayBlockingQueue</code>中只使用了一把锁，入队出队操作共用这把锁。而LinkedBlockingQueue则使用了两把锁，分别是出队锁takeLock和入队锁putLock，为什么要这么设计呢？</p><p><code>LinkedBlockingQueue</code>把两把锁分开，性能更好，为什么<code>ArrayBlockingQueue</code>不这样设计呢？</p></blockquote><p>原因是<code>ArrayBlockingQueue</code>是基于数组实现的，所有数据都存储在同一个数组对象里面，对同一个对象没办法使用两把锁，会有数据可见性的问题。而<code>LinkedBlockingQueue</code>底层是基于链表实现的，从头节点删除，尾节点插入，头尾节点分别是两个对象，可以分别使用两把锁，提升操作性能。</p><h3 id="构造方法-1" tabindex="-1">构造方法 <a class="header-anchor" href="#构造方法-1" aria-label="Permalink to &quot;构造方法&quot;">​</a></h3><p>LinkedBlockingQueue常用的初始化方法有两个：</p><ol><li>无参构造方法</li><li>指定容量大小的有参构造方法</li></ol><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 无参构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">BlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; blockingQueue1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> LinkedBlockingQueue&lt;&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 指定容量大小的构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">BlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; blockingQueue2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> LinkedBlockingQueue&lt;&gt;(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 无参构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">BlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; blockingQueue1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> LinkedBlockingQueue&lt;&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 指定容量大小的构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">BlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; blockingQueue2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> LinkedBlockingQueue&lt;&gt;(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">);</span></span></code></pre></div><p>源码实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 无参构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LinkedBlockingQueue</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">(Integer.MAX_VALUE);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 指定容量大小的构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LinkedBlockingQueue</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> capacity) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (capacity </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IllegalArgumentException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 设置容量大小，初始化头尾结点</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.capacity </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> capacity;</span></span>
<span class="line"><span style="color:#E1E4E8;">    last </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> head </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 无参构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LinkedBlockingQueue</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">(Integer.MAX_VALUE);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 指定容量大小的构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LinkedBlockingQueue</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> capacity) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (capacity </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IllegalArgumentException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 设置容量大小，初始化头尾结点</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.capacity </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> capacity;</span></span>
<span class="line"><span style="color:#24292E;">    last </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> head </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>LinkedBlockingQueue的无参构造方法使用的链表容量是Integer的最大值，存储大量数据的时候，会有内存溢出的风险，建议使用有参构造方法，指定容量大小。</p><p>有参构造方法还会初始化头尾节点，节点值为null。</p><p>LinkedBlockingQueue初始化的时候，不支持指定是否使用公平锁，只能使用非公平锁，而<code>ArrayBlockingQueue</code>是支持指定的。</p><table><thead><tr><th>操作</th><th>抛出异常</th><th>返回特定值</th><th>一直阻塞</th><th>阻塞指定时间</th></tr></thead><tbody><tr><td>放数据</td><td>add()</td><td>offer()</td><td>put()</td><td>offer(e, time, unit)</td></tr><tr><td>取数据（同时删除数据）</td><td>remove()</td><td>poll()</td><td>take()</td><td>poll(time, unit)</td></tr><tr><td>取数据（不删除）</td><td>element()</td><td>peek()</td><td>不支持</td><td>不支持</td></tr></tbody></table><p><strong>这四组方法的区别是：</strong></p><ol><li>当队列满的时候，再次添加数据，add()会抛出异常，offer()会返回false，put()会一直阻塞，offer(e, time, unit)会阻塞指定时间，然后返回false。</li><li>当队列为空的时候，再次取数据，remove()会抛出异常，poll()会返回null，take()会一直阻塞，poll(time, unit)会阻塞指定时间，然后返回null。</li></ol><h3 id="offer方法-1" tabindex="-1">offer方法 <a class="header-anchor" href="#offer方法-1" aria-label="Permalink to &quot;offer方法&quot;">​</a></h3><p>在链表尾部插入。 offer()方法在队列满的时候，会直接返回false，表示插入失败。</p><p>追加元素到链表末尾，如果是第一次添加元素，就唤醒因为队列为空而等待取数据的线程。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * offer方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 是否插入成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(E e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (e </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NullPointerException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 如果队列已满，则直接返回false，表示插入失败</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> AtomicInteger count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.count;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (count.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> capacity) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; node </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 3. 获取put锁，并加锁</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock putLock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.putLock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    putLock.</span><span style="color:#B392F0;">lock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 4. 加锁后，再次判断队列是否已满，如果未满，则入队</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (count.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> capacity) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">enqueue</span><span style="color:#E1E4E8;">(node);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 5. 队列个数加一</span></span>
<span class="line"><span style="color:#E1E4E8;">            c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> count.</span><span style="color:#B392F0;">getAndIncrement</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 6. 如果队列未满，则唤醒因为队列已满而等待放数据的线程（用来补偿，不加也行）</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (c </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> capacity) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                notFull.</span><span style="color:#B392F0;">signal</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 7. 释放锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        putLock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 8. c等于0，表示插入前，队列为空，是第一次插入，需要唤醒因为队列为空而等待取数据的线程</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (c </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">signalNotEmpty</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 9. 返回是否插入成功</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> c </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 入队</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">node</span><span style="color:#6A737D;"> 节点</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">enqueue</span><span style="color:#E1E4E8;">(LinkedBlockingQueue.Node</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">E</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> node) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 直接追加到链表末尾</span></span>
<span class="line"><span style="color:#E1E4E8;">    last </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> last.next </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> node;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 唤醒因为队列为空而等待取数据的线程</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">signalNotEmpty</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock takeLock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.takeLock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    takeLock.</span><span style="color:#B392F0;">lock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        notEmpty.</span><span style="color:#B392F0;">signal</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        takeLock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * offer方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 是否插入成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(E e) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (e </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NullPointerException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 如果队列已满，则直接返回false，表示插入失败</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> AtomicInteger count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.count;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (count.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> capacity) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; node </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;(e);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 3. 获取put锁，并加锁</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock putLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.putLock;</span></span>
<span class="line"><span style="color:#24292E;">    putLock.</span><span style="color:#6F42C1;">lock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 4. 加锁后，再次判断队列是否已满，如果未满，则入队</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (count.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> capacity) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">enqueue</span><span style="color:#24292E;">(node);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 5. 队列个数加一</span></span>
<span class="line"><span style="color:#24292E;">            c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> count.</span><span style="color:#6F42C1;">getAndIncrement</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 6. 如果队列未满，则唤醒因为队列已满而等待放数据的线程（用来补偿，不加也行）</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (c </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> capacity) {</span></span>
<span class="line"><span style="color:#24292E;">                notFull.</span><span style="color:#6F42C1;">signal</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 7. 释放锁</span></span>
<span class="line"><span style="color:#24292E;">        putLock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 8. c等于0，表示插入前，队列为空，是第一次插入，需要唤醒因为队列为空而等待取数据的线程</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (c </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">signalNotEmpty</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 9. 返回是否插入成功</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> c </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 入队</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">node</span><span style="color:#6A737D;"> 节点</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">enqueue</span><span style="color:#24292E;">(LinkedBlockingQueue.Node</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">E</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> node) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 直接追加到链表末尾</span></span>
<span class="line"><span style="color:#24292E;">    last </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> last.next </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> node;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 唤醒因为队列为空而等待取数据的线程</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">signalNotEmpty</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock takeLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.takeLock;</span></span>
<span class="line"><span style="color:#24292E;">    takeLock.</span><span style="color:#6F42C1;">lock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        notEmpty.</span><span style="color:#6F42C1;">signal</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        takeLock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="add方法-1" tabindex="-1">add方法 <a class="header-anchor" href="#add方法-1" aria-label="Permalink to &quot;add方法&quot;">​</a></h3><p>add()方法在数组满的时候，会抛出异常，底层基于offer()实现。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * add方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 是否添加成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(E e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(e)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IllegalStateException</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Queue full&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * add方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 是否添加成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(E e) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(e)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IllegalStateException</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Queue full&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="put方法-1" tabindex="-1">put方法 <a class="header-anchor" href="#put方法-1" aria-label="Permalink to &quot;put方法&quot;">​</a></h3><p>put()方法在数组满的时候，会一直阻塞，直到有其他线程取走数据，空出位置，才能添加成功。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * put方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(E e) throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (e </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NullPointerException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; node </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock putLock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.putLock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    putLock.</span><span style="color:#B392F0;">lockInterruptibly</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> AtomicInteger count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.count;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 3. 如果队列已满，就一直阻塞，直到被唤醒</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (count.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> capacity) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            notFull.</span><span style="color:#B392F0;">await</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 4. 如果队列未满，则直接入队</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">enqueue</span><span style="color:#E1E4E8;">(node);</span></span>
<span class="line"><span style="color:#E1E4E8;">        c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> count.</span><span style="color:#B392F0;">getAndIncrement</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 5. 如果队列未满，则唤醒因为队列已满而等待放数据的线程（用来补偿，不加也行）</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (c </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> capacity) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            notFull.</span><span style="color:#B392F0;">signal</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 6. 释放锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        putLock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 7. c等于0，表示插入前，队列为空，是第一次插入，需要唤醒因为队列为空而等待取数据的线程</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (c </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">signalNotEmpty</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * put方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(E e) throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (e </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NullPointerException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; node </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;(e);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock putLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.putLock;</span></span>
<span class="line"><span style="color:#24292E;">    putLock.</span><span style="color:#6F42C1;">lockInterruptibly</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> AtomicInteger count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.count;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 3. 如果队列已满，就一直阻塞，直到被唤醒</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (count.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> capacity) {</span></span>
<span class="line"><span style="color:#24292E;">            notFull.</span><span style="color:#6F42C1;">await</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 4. 如果队列未满，则直接入队</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">enqueue</span><span style="color:#24292E;">(node);</span></span>
<span class="line"><span style="color:#24292E;">        c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> count.</span><span style="color:#6F42C1;">getAndIncrement</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 5. 如果队列未满，则唤醒因为队列已满而等待放数据的线程（用来补偿，不加也行）</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (c </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> capacity) {</span></span>
<span class="line"><span style="color:#24292E;">            notFull.</span><span style="color:#6F42C1;">signal</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 6. 释放锁</span></span>
<span class="line"><span style="color:#24292E;">        putLock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 7. c等于0，表示插入前，队列为空，是第一次插入，需要唤醒因为队列为空而等待取数据的线程</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (c </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">signalNotEmpty</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="offer-e-time-unit-方法-1" tabindex="-1">offer(e, time, unit)方法 <a class="header-anchor" href="#offer-e-time-unit-方法-1" aria-label="Permalink to &quot;offer(e, time, unit)方法&quot;">​</a></h3><p>在数组满的时候， offer(e, time, unit)方法会阻塞一段时间。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * offer方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">e</span><span style="color:#6A737D;">       元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">unit</span><span style="color:#6A737D;">    时间单位</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 是否添加成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(E e, </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (e </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NullPointerException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 把超时时间转换为纳秒</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> nanos </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> unit.</span><span style="color:#B392F0;">toNanos</span><span style="color:#E1E4E8;">(timeout);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> AtomicInteger count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.count;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock putLock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.putLock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    putLock.</span><span style="color:#B392F0;">lockInterruptibly</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 4. 循环判断队列是否已满</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (count.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> capacity) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nanos </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 6. 如果队列已满，且超时时间已过，则返回false</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 5. 如果队列已满，则等待指定时间</span></span>
<span class="line"><span style="color:#E1E4E8;">            nanos </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> notFull.</span><span style="color:#B392F0;">awaitNanos</span><span style="color:#E1E4E8;">(nanos);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 7. 如果队列未满，则入队</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">enqueue</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;(e));</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 8. 如果队列未满，则唤醒因为队列已满而等待放数据的线程（用来补偿，不加也行）</span></span>
<span class="line"><span style="color:#E1E4E8;">        c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> count.</span><span style="color:#B392F0;">getAndIncrement</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (c </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> capacity) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            notFull.</span><span style="color:#B392F0;">signal</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 9. 释放锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        putLock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 10. c等于0，表示插入前，队列为空，是第一次插入，需要唤醒因为队列为空而等待取数据的线程</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (c </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">signalNotEmpty</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * offer方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">e</span><span style="color:#6A737D;">       元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">unit</span><span style="color:#6A737D;">    时间单位</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 是否添加成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(E e, </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (e </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NullPointerException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 把超时时间转换为纳秒</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> nanos </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> unit.</span><span style="color:#6F42C1;">toNanos</span><span style="color:#24292E;">(timeout);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> AtomicInteger count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.count;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock putLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.putLock;</span></span>
<span class="line"><span style="color:#24292E;">    putLock.</span><span style="color:#6F42C1;">lockInterruptibly</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 4. 循环判断队列是否已满</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (count.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> capacity) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nanos </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 6. 如果队列已满，且超时时间已过，则返回false</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 5. 如果队列已满，则等待指定时间</span></span>
<span class="line"><span style="color:#24292E;">            nanos </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> notFull.</span><span style="color:#6F42C1;">awaitNanos</span><span style="color:#24292E;">(nanos);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 7. 如果队列未满，则入队</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">enqueue</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;(e));</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 8. 如果队列未满，则唤醒因为队列已满而等待放数据的线程（用来补偿，不加也行）</span></span>
<span class="line"><span style="color:#24292E;">        c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> count.</span><span style="color:#6F42C1;">getAndIncrement</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (c </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> capacity) {</span></span>
<span class="line"><span style="color:#24292E;">            notFull.</span><span style="color:#6F42C1;">signal</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 9. 释放锁</span></span>
<span class="line"><span style="color:#24292E;">        putLock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 10. c等于0，表示插入前，队列为空，是第一次插入，需要唤醒因为队列为空而等待取数据的线程</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (c </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">signalNotEmpty</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="poll方法-1" tabindex="-1">poll方法 <a class="header-anchor" href="#poll方法-1" aria-label="Permalink to &quot;poll方法&quot;">​</a></h3><p>poll()方法取数据都是从链表头部弹出元素。 poll()方法在弹出元素的时候，如果队列为空，直接返回null，表示弹出失败。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * poll方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果队列为空，则返回null</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> AtomicInteger count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.count;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (count.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    E x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 加锁</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock takeLock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.takeLock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    takeLock.</span><span style="color:#B392F0;">lock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 3. 如果队列不为空，则取出队头元素</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (count.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dequeue</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 4. 元素个数减一</span></span>
<span class="line"><span style="color:#E1E4E8;">            c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> count.</span><span style="color:#B392F0;">getAndDecrement</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 5. 如果队列不为空，则唤醒因为队列为空而等待取数据的线程</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (c </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                notEmpty.</span><span style="color:#B392F0;">signal</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 6. 释放锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        takeLock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 7. 如果取数据之前，队列已满，取数据之后队列肯定不满了，则唤醒因为队列已满而等待放数据的线程</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (c </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> capacity) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">signalNotFull</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 取出队头元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">dequeue</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; h </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> head;</span></span>
<span class="line"><span style="color:#E1E4E8;">    Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; first </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> h.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">    h.next </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> h;</span></span>
<span class="line"><span style="color:#E1E4E8;">    head </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> first;</span></span>
<span class="line"><span style="color:#E1E4E8;">    E x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> first.item;</span></span>
<span class="line"><span style="color:#E1E4E8;">    first.item </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 唤醒因为队列已满而等待放数据的线程</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">signalNotFull</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock putLock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.putLock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    putLock.</span><span style="color:#B392F0;">lock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        notFull.</span><span style="color:#B392F0;">signal</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        putLock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * poll方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果队列为空，则返回null</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> AtomicInteger count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.count;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (count.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    E x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 加锁</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock takeLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.takeLock;</span></span>
<span class="line"><span style="color:#24292E;">    takeLock.</span><span style="color:#6F42C1;">lock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 3. 如果队列不为空，则取出队头元素</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (count.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dequeue</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 4. 元素个数减一</span></span>
<span class="line"><span style="color:#24292E;">            c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> count.</span><span style="color:#6F42C1;">getAndDecrement</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 5. 如果队列不为空，则唤醒因为队列为空而等待取数据的线程</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (c </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                notEmpty.</span><span style="color:#6F42C1;">signal</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 6. 释放锁</span></span>
<span class="line"><span style="color:#24292E;">        takeLock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 7. 如果取数据之前，队列已满，取数据之后队列肯定不满了，则唤醒因为队列已满而等待放数据的线程</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (c </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> capacity) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">signalNotFull</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> x;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 取出队头元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">dequeue</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; h </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> head;</span></span>
<span class="line"><span style="color:#24292E;">    Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; first </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> h.next;</span></span>
<span class="line"><span style="color:#24292E;">    h.next </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> h;</span></span>
<span class="line"><span style="color:#24292E;">    head </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> first;</span></span>
<span class="line"><span style="color:#24292E;">    E x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> first.item;</span></span>
<span class="line"><span style="color:#24292E;">    first.item </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> x;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 唤醒因为队列已满而等待放数据的线程</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">signalNotFull</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock putLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.putLock;</span></span>
<span class="line"><span style="color:#24292E;">    putLock.</span><span style="color:#6F42C1;">lock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        notFull.</span><span style="color:#6F42C1;">signal</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        putLock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="remove方法-1" tabindex="-1">remove方法 <a class="header-anchor" href="#remove方法-1" aria-label="Permalink to &quot;remove方法&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * remove方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 直接调用poll方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    E x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 如果取到数据，直接返回，否则抛出异常</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (x </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NoSuchElementException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * remove方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 直接调用poll方法</span></span>
<span class="line"><span style="color:#24292E;">    E x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 如果取到数据，直接返回，否则抛出异常</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (x </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> x;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NoSuchElementException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="take方法-1" tabindex="-1">take方法 <a class="header-anchor" href="#take方法-1" aria-label="Permalink to &quot;take方法&quot;">​</a></h3><p>如果队列为空，take()方法就一直阻塞，直到被唤醒。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * take方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">take</span><span style="color:#E1E4E8;">() throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    E x;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> AtomicInteger count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.count;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock takeLock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.takeLock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    takeLock.</span><span style="color:#B392F0;">lockInterruptibly</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 2. 如果队列为空，就一直阻塞，直到被唤醒</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (count.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            notEmpty.</span><span style="color:#B392F0;">await</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 3. 如果队列不为空，则取出队头元素</span></span>
<span class="line"><span style="color:#E1E4E8;">        x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dequeue</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 4. 队列元素个数减一</span></span>
<span class="line"><span style="color:#E1E4E8;">        c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> count.</span><span style="color:#B392F0;">getAndDecrement</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 5. 如果队列不为空，则唤醒因为队列为空而等待取数据的线程</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (c </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            notEmpty.</span><span style="color:#B392F0;">signal</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 6. 释放锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        takeLock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 7. 如果取数据之前，队列已满，取数据之后队列肯定不满了，则唤醒因为队列已满而等待放数据的线程</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (c </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> capacity) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">signalNotFull</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * take方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">take</span><span style="color:#24292E;">() throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">    E x;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> AtomicInteger count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.count;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock takeLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.takeLock;</span></span>
<span class="line"><span style="color:#24292E;">    takeLock.</span><span style="color:#6F42C1;">lockInterruptibly</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 2. 如果队列为空，就一直阻塞，直到被唤醒</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (count.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            notEmpty.</span><span style="color:#6F42C1;">await</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 3. 如果队列不为空，则取出队头元素</span></span>
<span class="line"><span style="color:#24292E;">        x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dequeue</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 4. 队列元素个数减一</span></span>
<span class="line"><span style="color:#24292E;">        c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> count.</span><span style="color:#6F42C1;">getAndDecrement</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 5. 如果队列不为空，则唤醒因为队列为空而等待取数据的线程</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (c </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            notEmpty.</span><span style="color:#6F42C1;">signal</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 6. 释放锁</span></span>
<span class="line"><span style="color:#24292E;">        takeLock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 7. 如果取数据之前，队列已满，取数据之后队列肯定不满了，则唤醒因为队列已满而等待放数据的线程</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (c </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> capacity) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">signalNotFull</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> x;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="poll-time-unit-方法-1" tabindex="-1">poll(time, unit)方法 <a class="header-anchor" href="#poll-time-unit-方法-1" aria-label="Permalink to &quot;poll(time, unit)方法&quot;">​</a></h3><p>在队列满的时候， poll(time, unit)方法会阻塞指定时间，然后返回null。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * poll方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">unit</span><span style="color:#6A737D;">    时间单位</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    E x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 把超时时间转换成纳秒</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> nanos </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> unit.</span><span style="color:#B392F0;">toNanos</span><span style="color:#E1E4E8;">(timeout);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> AtomicInteger count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.count;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock takeLock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.takeLock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    takeLock.</span><span style="color:#B392F0;">lockInterruptibly</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 3. 循环判断队列是否为空</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (count.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nanos </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 5. 如果队列为空，且超时时间已过，则返回null</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 4. 阻塞到到指定时间</span></span>
<span class="line"><span style="color:#E1E4E8;">            nanos </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> notEmpty.</span><span style="color:#B392F0;">awaitNanos</span><span style="color:#E1E4E8;">(nanos);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 6. 如果队列不为空，则取出队头元素</span></span>
<span class="line"><span style="color:#E1E4E8;">        x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dequeue</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 7. 队列元素个数减一</span></span>
<span class="line"><span style="color:#E1E4E8;">        c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> count.</span><span style="color:#B392F0;">getAndDecrement</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 8. 如果队列不为空，则唤醒因为队列为空而等待取数据的线程</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (c </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            notEmpty.</span><span style="color:#B392F0;">signal</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 9. 释放锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        takeLock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 7. 如果取数据之前，队列已满，取数据之后队列肯定不满了，则唤醒因为队列已满而等待放数据的线程</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (c </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> capacity) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">signalNotFull</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * poll方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">unit</span><span style="color:#6A737D;">    时间单位</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">    E x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 把超时时间转换成纳秒</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> nanos </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> unit.</span><span style="color:#6F42C1;">toNanos</span><span style="color:#24292E;">(timeout);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> AtomicInteger count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.count;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 加可中断的锁，防止一直阻塞</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock takeLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.takeLock;</span></span>
<span class="line"><span style="color:#24292E;">    takeLock.</span><span style="color:#6F42C1;">lockInterruptibly</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 3. 循环判断队列是否为空</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (count.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nanos </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 5. 如果队列为空，且超时时间已过，则返回null</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 4. 阻塞到到指定时间</span></span>
<span class="line"><span style="color:#24292E;">            nanos </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> notEmpty.</span><span style="color:#6F42C1;">awaitNanos</span><span style="color:#24292E;">(nanos);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 6. 如果队列不为空，则取出队头元素</span></span>
<span class="line"><span style="color:#24292E;">        x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dequeue</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 7. 队列元素个数减一</span></span>
<span class="line"><span style="color:#24292E;">        c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> count.</span><span style="color:#6F42C1;">getAndDecrement</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 8. 如果队列不为空，则唤醒因为队列为空而等待取数据的线程</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (c </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            notEmpty.</span><span style="color:#6F42C1;">signal</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 9. 释放锁</span></span>
<span class="line"><span style="color:#24292E;">        takeLock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 7. 如果取数据之前，队列已满，取数据之后队列肯定不满了，则唤醒因为队列已满而等待放数据的线程</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (c </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> capacity) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">signalNotFull</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> x;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="peek方法-1" tabindex="-1">peek方法 <a class="header-anchor" href="#peek方法-1" aria-label="Permalink to &quot;peek方法&quot;">​</a></h3><p>如果数组为空，直接返回null。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * peek方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">peek</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 如果队列为空，则返回null</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (count.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 加锁</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock takeLock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.takeLock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    takeLock.</span><span style="color:#B392F0;">lock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 3. 取出队头元素</span></span>
<span class="line"><span style="color:#E1E4E8;">        Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; first </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> head.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (first </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> first.item;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 4. 释放锁</span></span>
<span class="line"><span style="color:#E1E4E8;">        takeLock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * peek方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">peek</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 如果队列为空，则返回null</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (count.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 加锁</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock takeLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.takeLock;</span></span>
<span class="line"><span style="color:#24292E;">    takeLock.</span><span style="color:#6F42C1;">lock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 3. 取出队头元素</span></span>
<span class="line"><span style="color:#24292E;">        Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; first </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> head.next;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (first </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> first.item;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 4. 释放锁</span></span>
<span class="line"><span style="color:#24292E;">        takeLock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="element方法-1" tabindex="-1">element方法 <a class="header-anchor" href="#element方法-1" aria-label="Permalink to &quot;element方法&quot;">​</a></h3><p>如果队列为空，则抛出异常。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * element方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">element</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 调用peek方法查询数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    E x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">peek</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 如果查到数据，直接返回</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (x </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 3. 如果没找到，则抛出异常</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NoSuchElementException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * element方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">element</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 调用peek方法查询数据</span></span>
<span class="line"><span style="color:#24292E;">    E x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">peek</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 如果查到数据，直接返回</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (x </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> x;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 3. 如果没找到，则抛出异常</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NoSuchElementException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="synchronousqueue" tabindex="-1">SynchronousQueue <a class="header-anchor" href="#synchronousqueue" aria-label="Permalink to &quot;SynchronousQueue&quot;">​</a></h2><p><code>SynchronousQueue</code>被称为<code>同步队列</code>，当生产者往队列中放元素的时候，必须等待消费者把这个元素取走，否则一直阻塞。消费者取元素的时候，同理也必须等待生产者放队列中放元素。（同步生产-消费）</p><blockquote><p>Java线程池中的带缓存的线程池就是基于<code>SynchronousQueue</code>实现的。</p></blockquote><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 创建带缓存的线程池</span></span>
<span class="line"><span style="color:#E1E4E8;">ExecutorService executorService </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Executors.</span><span style="color:#B392F0;">newCachedThreadPool</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 底层使用SynchronousQueue队列处理任务</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> ExecutorService </span><span style="color:#B392F0;">newFixedThreadPool</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> nThreads) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ThreadPoolExecutor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, Integer.MAX_VALUE,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">60L</span><span style="color:#E1E4E8;">, TimeUnit.SECONDS,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> SynchronousQueue&lt;</span><span style="color:#F97583;">Runnable</span><span style="color:#E1E4E8;">&gt;());</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 创建带缓存的线程池</span></span>
<span class="line"><span style="color:#24292E;">ExecutorService executorService </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Executors.</span><span style="color:#6F42C1;">newCachedThreadPool</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 底层使用SynchronousQueue队列处理任务</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> ExecutorService </span><span style="color:#6F42C1;">newFixedThreadPool</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> nThreads) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ThreadPoolExecutor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, Integer.MAX_VALUE,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">60L</span><span style="color:#24292E;">, TimeUnit.SECONDS,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> SynchronousQueue&lt;</span><span style="color:#D73A49;">Runnable</span><span style="color:#24292E;">&gt;());</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>SynchronousQueue</code>队列具有以下特点：</p><ol><li><code>SynchronousQueue</code>实现了<code>BlockingQueue</code>接口，提供了四组放数据和读数据的方法，来满足不同的场景。</li><li><code>SynchronousQueue</code>底层有两种实现方式，分别是基于栈实现非公平策略，以及基于队列实现的公平策略。</li><li><code>SynchronousQueue</code>初始化的时候，可以指定使用公平策略还是非公平策略。</li><li><code>SynchronousQueue</code>不存储元素，不适合作为缓存队列使用。适用于生产者与消费者速度相匹配的场景，可减少任务执行的等待时间。</li></ol><p><code>SynchronousQueue</code>底层是基于Transferer抽象类实现的，放数据和取数据的逻辑都耦合在transfer()方法中。而Transferer抽象类又有两个实现类，分别是基于栈结构实现和基于队列实现。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SynchronousQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AbstractQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BlockingQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;, java.io.</span><span style="color:#B392F0;">Serializable</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 转接器（栈和队列的父类）</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">abstract</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Transferer</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#6A737D;">        /**</span></span>
<span class="line"><span style="color:#6A737D;">         * 转移（put和take都用这一个方法）</span></span>
<span class="line"><span style="color:#6A737D;">         *</span></span>
<span class="line"><span style="color:#6A737D;">         * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">e</span><span style="color:#6A737D;">     元素</span></span>
<span class="line"><span style="color:#6A737D;">         * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">timed</span><span style="color:#6A737D;"> 是否超时</span></span>
<span class="line"><span style="color:#6A737D;">         * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">nanos</span><span style="color:#6A737D;"> 纳秒</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">abstract</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">transfer</span><span style="color:#E1E4E8;">(E </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">timed</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">nanos</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 栈实现类</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TransferStack</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Transferer</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 队列实现类</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TransferQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Transferer</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SynchronousQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AbstractQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BlockingQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;, java.io.</span><span style="color:#6F42C1;">Serializable</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 转接器（栈和队列的父类）</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">abstract</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Transferer</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#6A737D;">        /**</span></span>
<span class="line"><span style="color:#6A737D;">         * 转移（put和take都用这一个方法）</span></span>
<span class="line"><span style="color:#6A737D;">         *</span></span>
<span class="line"><span style="color:#6A737D;">         * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">e</span><span style="color:#6A737D;">     元素</span></span>
<span class="line"><span style="color:#6A737D;">         * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">timed</span><span style="color:#6A737D;"> 是否超时</span></span>
<span class="line"><span style="color:#6A737D;">         * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">nanos</span><span style="color:#6A737D;"> 纳秒</span></span>
<span class="line"><span style="color:#6A737D;">         */</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">abstract</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">transfer</span><span style="color:#24292E;">(E </span><span style="color:#E36209;">e</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#E36209;">timed</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> </span><span style="color:#E36209;">nanos</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 栈实现类</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TransferStack</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Transferer</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 队列实现类</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TransferQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Transferer</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="构造方法-2" tabindex="-1">构造方法 <a class="header-anchor" href="#构造方法-2" aria-label="Permalink to &quot;构造方法&quot;">​</a></h3><p><code>SynchronousQueue</code>常用的初始化方法有两个：</p><ol><li>无参构造方法</li><li>指定容量大小的有参构造方法</li></ol><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 无参构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">BlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; blockingQueue1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> SynchronousQueue&lt;&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 有参构造方法，指定是否使用公平锁（默认使用非公平锁）</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">BlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; blockingQueue2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> SynchronousQueue&lt;&gt;(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 无参构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">BlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; blockingQueue1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> SynchronousQueue&lt;&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 有参构造方法，指定是否使用公平锁（默认使用非公平锁）</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">BlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; blockingQueue2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> SynchronousQueue&lt;&gt;(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span></span></code></pre></div><p>对应的源码实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 无参构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SynchronousQueue</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 有参构造方法，指定是否使用公平锁</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SynchronousQueue</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> fair) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    transferer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fair </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> TransferQueue&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;() </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> TransferStack&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 无参构造方法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SynchronousQueue</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 有参构造方法，指定是否使用公平锁</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SynchronousQueue</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> fair) {</span></span>
<span class="line"><span style="color:#24292E;">    transferer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fair </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> TransferQueue&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;() </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> TransferStack&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>SynchronousQueue</code>的无参构造方法默认使用的非公平策略，有参构造方法可以指定使用公平策略。</p><ol><li><strong>公平策略</strong>，基于队列实现的是公平策略，先进先出。</li><li><strong>非公平策略</strong>，基于栈实现的是非公平策略，先进后出。</li></ol><h3 id="transferstack" tabindex="-1">TransferStack <a class="header-anchor" href="#transferstack" aria-label="Permalink to &quot;TransferStack&quot;">​</a></h3><blockquote><p>TODO</p></blockquote><h3 id="transferqueue" tabindex="-1">TransferQueue <a class="header-anchor" href="#transferqueue" aria-label="Permalink to &quot;TransferQueue&quot;">​</a></h3><blockquote><p>TODO</p></blockquote><h3 id="offer方法-2" tabindex="-1">offer方法 <a class="header-anchor" href="#offer方法-2" aria-label="Permalink to &quot;offer方法&quot;">​</a></h3><p>底层都是调用的transfer()方法实现。 如果没有匹配到合适的节点，offer()方法会直接返回false，表示插入失败。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * offer方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 是否插入成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(E e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (e </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NullPointerException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 调用底层transfer方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> transferer.</span><span style="color:#B392F0;">transfer</span><span style="color:#E1E4E8;">(e, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * offer方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 是否插入成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(E e) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (e </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NullPointerException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 调用底层transfer方法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> transferer.</span><span style="color:#6F42C1;">transfer</span><span style="color:#24292E;">(e, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="add方法-2" tabindex="-1">add方法 <a class="header-anchor" href="#add方法-2" aria-label="Permalink to &quot;add方法&quot;">​</a></h3><p>如果没有匹配到合适的节点，add()方法会抛出异常，底层基于offer()实现。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * add方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 是否添加成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(E e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(e)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IllegalStateException</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Queue full&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * add方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 是否添加成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(E e) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(e)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IllegalStateException</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Queue full&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="put方法-2" tabindex="-1">put方法 <a class="header-anchor" href="#put方法-2" aria-label="Permalink to &quot;put方法&quot;">​</a></h3><p>如果没有匹配到合适的节点，put()方法会一直阻塞，直到有其他线程取走数据，才能添加成功。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * put方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(E e) throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (e </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NullPointerException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 调用底层transfer方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (transferer.</span><span style="color:#B392F0;">transfer</span><span style="color:#E1E4E8;">(e, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Thread.</span><span style="color:#B392F0;">interrupted</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">InterruptedException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * put方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">e</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(E e) throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (e </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NullPointerException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 调用底层transfer方法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (transferer.</span><span style="color:#6F42C1;">transfer</span><span style="color:#24292E;">(e, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        Thread.</span><span style="color:#6F42C1;">interrupted</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">InterruptedException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="offer-e-time-unit-方法-2" tabindex="-1">offer(e, time, unit)方法 <a class="header-anchor" href="#offer-e-time-unit-方法-2" aria-label="Permalink to &quot;offer(e, time, unit)方法&quot;">​</a></h3><p>如果没有匹配到合适的节点， offer(e, time, unit)方法会阻塞一段时间，然后返回false。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * offer方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">e</span><span style="color:#6A737D;">       元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">unit</span><span style="color:#6A737D;">    时间单位</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 是否添加成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(E e, </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> timeout, TimeUnit unit)</span></span>
<span class="line"><span style="color:#E1E4E8;">        throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (e </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NullPointerException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 调用底层transfer方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (transferer.</span><span style="color:#B392F0;">transfer</span><span style="color:#E1E4E8;">(e, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, unit.</span><span style="color:#B392F0;">toNanos</span><span style="color:#E1E4E8;">(timeout)) </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">Thread.</span><span style="color:#B392F0;">interrupted</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">InterruptedException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * offer方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">e</span><span style="color:#6A737D;">       元素</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">unit</span><span style="color:#6A737D;">    时间单位</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 是否添加成功</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(E e, </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> timeout, TimeUnit unit)</span></span>
<span class="line"><span style="color:#24292E;">        throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 判空，传参不允许为null</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (e </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NullPointerException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 调用底层transfer方法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (transferer.</span><span style="color:#6F42C1;">transfer</span><span style="color:#24292E;">(e, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, unit.</span><span style="color:#6F42C1;">toNanos</span><span style="color:#24292E;">(timeout)) </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">Thread.</span><span style="color:#6F42C1;">interrupted</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">InterruptedException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="poll方法-2" tabindex="-1">poll方法 <a class="header-anchor" href="#poll方法-2" aria-label="Permalink to &quot;poll方法&quot;">​</a></h3><p>底层都是调用的transfer方法实现。</p><p>poll()方法在弹出元素的时候，如果没有匹配到合适的节点，直接返回null，表示弹出失败。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * poll方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 调用底层transfer方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> transferer.</span><span style="color:#B392F0;">transfer</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * poll方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 调用底层transfer方法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> transferer.</span><span style="color:#6F42C1;">transfer</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="remove方法-2" tabindex="-1">remove方法 <a class="header-anchor" href="#remove方法-2" aria-label="Permalink to &quot;remove方法&quot;">​</a></h3><p>如果没有匹配到合适的节点，remove()会抛出异常。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * remove方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 直接调用poll方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    E x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 如果取到数据，直接返回，否则抛出异常</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (x </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NoSuchElementException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * remove方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 直接调用poll方法</span></span>
<span class="line"><span style="color:#24292E;">    E x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 如果取到数据，直接返回，否则抛出异常</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (x </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> x;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NoSuchElementException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="take方法-2" tabindex="-1">take方法 <a class="header-anchor" href="#take方法-2" aria-label="Permalink to &quot;take方法&quot;">​</a></h3><p>如果没有匹配到合适的节点，take()方法就一直阻塞，直到被唤醒。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * take方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">take</span><span style="color:#E1E4E8;">() throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 调用底层transfer方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    E e </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> transferer.</span><span style="color:#B392F0;">transfer</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (e </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> e;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    Thread.</span><span style="color:#B392F0;">interrupted</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">InterruptedException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * take方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">take</span><span style="color:#24292E;">() throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 调用底层transfer方法</span></span>
<span class="line"><span style="color:#24292E;">    E e </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> transferer.</span><span style="color:#6F42C1;">transfer</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (e </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> e;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    Thread.</span><span style="color:#6F42C1;">interrupted</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">InterruptedException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="poll-time-unit-方法-2" tabindex="-1">poll(time, unit)方法 <a class="header-anchor" href="#poll-time-unit-方法-2" aria-label="Permalink to &quot;poll(time, unit)方法&quot;">​</a></h3><p>如果没有匹配到合适的节点， poll(time, unit)方法会阻塞指定时间，然后返回null。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * poll方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">unit</span><span style="color:#6A737D;">    时间单位</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 调用底层transfer方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    E e </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> transferer.</span><span style="color:#B392F0;">transfer</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, unit.</span><span style="color:#B392F0;">toNanos</span><span style="color:#E1E4E8;">(timeout));</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (e </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">Thread.</span><span style="color:#B392F0;">interrupted</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> e;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">InterruptedException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * poll方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">timeout</span><span style="color:#6A737D;"> 超时时间</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">unit</span><span style="color:#6A737D;">    时间单位</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> 元素</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> timeout, TimeUnit unit) throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 调用底层transfer方法</span></span>
<span class="line"><span style="color:#24292E;">    E e </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> transferer.</span><span style="color:#6F42C1;">transfer</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, unit.</span><span style="color:#6F42C1;">toNanos</span><span style="color:#24292E;">(timeout));</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (e </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">Thread.</span><span style="color:#6F42C1;">interrupted</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> e;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">InterruptedException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="peek方法-2" tabindex="-1">peek方法 <a class="header-anchor" href="#peek方法-2" aria-label="Permalink to &quot;peek方法&quot;">​</a></h3><p>直接返回null，<code>SynchronousQueue</code>不支持这种操作。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * peek方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">peek</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * peek方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">peek</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="element方法-2" tabindex="-1">element方法 <a class="header-anchor" href="#element方法-2" aria-label="Permalink to &quot;element方法&quot;">​</a></h3><p>底层调用的也是peek()方法，也是不支持这种操作。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * element方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> E </span><span style="color:#B392F0;">element</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1. 调用peek方法查询数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    E x </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">peek</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 2. 如果查到数据，直接返回</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (x </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> x;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 3. 如果没找到，则抛出异常</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NoSuchElementException</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * element方法入口</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> E </span><span style="color:#6F42C1;">element</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1. 调用peek方法查询数据</span></span>
<span class="line"><span style="color:#24292E;">    E x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">peek</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 2. 如果查到数据，直接返回</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (x </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> x;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 3. 如果没找到，则抛出异常</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NoSuchElementException</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="linkedtransferqueue" tabindex="-1">LinkedTransferQueue <a class="header-anchor" href="#linkedtransferqueue" aria-label="Permalink to &quot;LinkedTransferQueue&quot;">​</a></h2><p>在JDK7的时候，基于SynchronousQueue产生了一个更强大的TransferQueue，它保留了SynchronousQueue的匹配交接机制，并且与等待队列进行融合。</p><p>SynchronousQueue并没有使用锁，而是采用CAS操作保证生产者与消费者的协调，但是它没有容量，而LinkedBlockingQueue虽然是有容量且无界的，但是内部基本都是基于锁实现的，性能并不是很好，这时，我们就可以将它们各自的优点单独拿出来，揉在一起，就成了性能更高的LinkedTransferQueue</p><p>相比 <code>SynchronousQueue</code> ，它多了一个可以存储的队列，我们依然可以像阻塞队列那样获取队列中所有元素的值，简单来说，<code>LinkedTransferQueue</code>其实就是一个多了存储队列的<code>SynchronousQueue</code>。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] args) throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    LinkedTransferQueue&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; queue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> LinkedTransferQueue&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 插入时，会先检查是否有其他线程等待获取，如果是，直接进行交接，否则插入到存储队列中</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 不会像 SynchronousQueue 那样必须等一个匹配的才可以</span></span>
<span class="line"><span style="color:#E1E4E8;">    queue.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;1&quot;</span><span style="color:#E1E4E8;">);  </span></span>
<span class="line"><span style="color:#E1E4E8;">    queue.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;2&quot;</span><span style="color:#E1E4E8;">); </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 直接打印所有的元素，这在SynchronousQueue下只能是空，因为单独的入队或出队操作都会被阻塞</span></span>
<span class="line"><span style="color:#E1E4E8;">    queue.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(System.out</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">println);   </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] args) throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    LinkedTransferQueue&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; queue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> LinkedTransferQueue&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 插入时，会先检查是否有其他线程等待获取，如果是，直接进行交接，否则插入到存储队列中</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 不会像 SynchronousQueue 那样必须等一个匹配的才可以</span></span>
<span class="line"><span style="color:#24292E;">    queue.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">);  </span></span>
<span class="line"><span style="color:#24292E;">    queue.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;2&quot;</span><span style="color:#24292E;">); </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 直接打印所有的元素，这在SynchronousQueue下只能是空，因为单独的入队或出队操作都会被阻塞</span></span>
<span class="line"><span style="color:#24292E;">    queue.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(System.out</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">println);   </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="priorityblockingqueue" tabindex="-1">PriorityBlockingQueue <a class="header-anchor" href="#priorityblockingqueue" aria-label="Permalink to &quot;PriorityBlockingQueue&quot;">​</a></h2><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PriorityBlockingQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AbstractQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BlockingQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;, java.io.</span><span style="color:#B392F0;">Serializable</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">transient</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">[] queue;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">transient</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> size;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> PriorityQueue&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; q;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">transient</span><span style="color:#E1E4E8;"> Comparator&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">super</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; comparator;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock lock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ReentrantLock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Condition notEmpty </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> lock.</span><span style="color:#B392F0;">newCondition</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">transient</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">volatile</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> allocationSpinLock;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PriorityBlockingQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AbstractQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BlockingQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;, java.io.</span><span style="color:#6F42C1;">Serializable</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">transient</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">[] queue;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">transient</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> size;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> PriorityQueue&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; q;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">transient</span><span style="color:#24292E;"> Comparator&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">super</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; comparator;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock lock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ReentrantLock</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Condition notEmpty </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> lock.</span><span style="color:#6F42C1;">newCondition</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">transient</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">volatile</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> allocationSpinLock;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>TODO</p></blockquote><h2 id="delayqueue" tabindex="-1">DelayQueue <a class="header-anchor" href="#delayqueue" aria-label="Permalink to &quot;DelayQueue&quot;">​</a></h2><p>实现延时出队，也就是说当一个元素插入后，如果没有超过一定时间，那么是无法让此元素出队的。</p><blockquote><p><code>DelayQueue</code>是一种本地延迟队列，比如希望我们的任务在5秒后执行，就可以使用<code>DelayQueue</code>实现。</p><p>常见的使用场景有：</p><ul><li>订单10分钟内未支付，就取消。</li><li>缓存过期后，就删除。</li><li>消息的延迟发送等。</li></ul></blockquote><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DelayQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Delayed</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AbstractQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BlockingQueue</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 排它锁，用于保证线程安全</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">transient</span><span style="color:#E1E4E8;"> ReentrantLock lock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ReentrantLock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 底层是基于PriorityQueue实现</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> PriorityQueue&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; q </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> PriorityQueue&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 当前线程</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Thread leader </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 条件队列</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Condition available </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> lock.</span><span style="color:#B392F0;">newCondition</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DelayQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">Delayed</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AbstractQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BlockingQueue</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 排它锁，用于保证线程安全</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">transient</span><span style="color:#24292E;"> ReentrantLock lock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ReentrantLock</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 底层是基于PriorityQueue实现</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> PriorityQueue&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; q </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> PriorityQueue&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 当前线程</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Thread leader </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 条件队列</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Condition available </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> lock.</span><span style="color:#6F42C1;">newCondition</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>DelayQueue</code>实现了<code>BlockingQueue</code>接口，是一个阻塞队列。并且<code>DelayQueue</code>里面的元素需要实现<code>Delayed</code>接口。使用了<code>ReentrantLock</code>保证线程安全，使用了<code>Condition</code>作条件队列，当队列中没有过期元素的时候，取数据的线程需要在条件队列中等待。</p><p><code>DelayQueue</code>只接受Delayed的实现类作为元素：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 这里继承了Comparable，它支持优先级</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Delayed</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Comparable</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">Delayed</span><span style="color:#E1E4E8;">&gt; {  </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获取剩余等待时间，正数表示还需要进行等待，0或负数表示等待结束</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getDelay</span><span style="color:#E1E4E8;">(TimeUnit </span><span style="color:#FFAB70;">unit</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 这里继承了Comparable，它支持优先级</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Delayed</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Comparable</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">Delayed</span><span style="color:#24292E;">&gt; {  </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获取剩余等待时间，正数表示还需要进行等待，0或负数表示等待结束</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getDelay</span><span style="color:#24292E;">(TimeUnit </span><span style="color:#E36209;">unit</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>示例：<strong>DelayedTask</strong>.java <strong>DelayQueueTest</strong>.java</p><p>输出结果：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">10</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">30</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">10.000</span><span style="color:#E1E4E8;"> [main] INFO com.test.DelayQueueTest </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> 开始运行任务</span></span>
<span class="line"><span style="color:#79B8FF;">10</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">30</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">11.000</span><span style="color:#E1E4E8;"> [main] INFO com.test.DelayQueueTest </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> 任务1开始运行</span></span>
<span class="line"><span style="color:#79B8FF;">10</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">30</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">13.000</span><span style="color:#E1E4E8;"> [main] INFO com.test.DelayQueueTest </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> 任务2开始运行</span></span>
<span class="line"><span style="color:#79B8FF;">10</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">30</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">15.000</span><span style="color:#E1E4E8;"> [main] INFO com.test.DelayQueueTest </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> 任务3开始运行</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">10</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">30</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">10.000</span><span style="color:#24292E;"> [main] INFO com.test.DelayQueueTest </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> 开始运行任务</span></span>
<span class="line"><span style="color:#005CC5;">10</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">30</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">11.000</span><span style="color:#24292E;"> [main] INFO com.test.DelayQueueTest </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> 任务1开始运行</span></span>
<span class="line"><span style="color:#005CC5;">10</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">30</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">13.000</span><span style="color:#24292E;"> [main] INFO com.test.DelayQueueTest </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> 任务2开始运行</span></span>
<span class="line"><span style="color:#005CC5;">10</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">30</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">15.000</span><span style="color:#24292E;"> [main] INFO com.test.DelayQueueTest </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> 任务3开始运行</span></span></code></pre></div></blockquote><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 自定义延迟任务</span></span>
<span class="line"><span style="color:#6A737D;"> **/</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DelayedTask</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Delayed</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 任务到期时间</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> expirationTime;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 任务</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Runnable task;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">execute</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        task.</span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DelayedTask</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">delay</span><span style="color:#E1E4E8;">, Runnable </span><span style="color:#FFAB70;">task</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 到期时间 = 当前时间 + 延迟时间</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.expirationTime </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> System.</span><span style="color:#B392F0;">currentTimeMillis</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> delay;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.task </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> task;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回延迟时间</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getDelay</span><span style="color:#E1E4E8;">(@</span><span style="color:#F97583;">NotNull</span><span style="color:#E1E4E8;"> TimeUnit </span><span style="color:#FFAB70;">unit</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> unit.</span><span style="color:#B392F0;">convert</span><span style="color:#E1E4E8;">(expirationTime </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> System.</span><span style="color:#B392F0;">currentTimeMillis</span><span style="color:#E1E4E8;">(), TimeUnit.MILLISECONDS);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 任务列表按照到期时间排序</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">compareTo</span><span style="color:#E1E4E8;">(@</span><span style="color:#F97583;">NotNull</span><span style="color:#E1E4E8;"> Delayed </span><span style="color:#FFAB70;">o</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Long.</span><span style="color:#B392F0;">compare</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.expirationTime, ((DelayedTask) o).expirationTime);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 自定义延迟任务</span></span>
<span class="line"><span style="color:#6A737D;"> **/</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DelayedTask</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Delayed</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 任务到期时间</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> expirationTime;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 任务</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Runnable task;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">execute</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        task.</span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DelayedTask</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> </span><span style="color:#E36209;">delay</span><span style="color:#24292E;">, Runnable </span><span style="color:#E36209;">task</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 到期时间 = 当前时间 + 延迟时间</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.expirationTime </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> System.</span><span style="color:#6F42C1;">currentTimeMillis</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> delay;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.task </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> task;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 返回延迟时间</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getDelay</span><span style="color:#24292E;">(@</span><span style="color:#D73A49;">NotNull</span><span style="color:#24292E;"> TimeUnit </span><span style="color:#E36209;">unit</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> unit.</span><span style="color:#6F42C1;">convert</span><span style="color:#24292E;">(expirationTime </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> System.</span><span style="color:#6F42C1;">currentTimeMillis</span><span style="color:#24292E;">(), TimeUnit.MILLISECONDS);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 任务列表按照到期时间排序</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">compareTo</span><span style="color:#24292E;">(@</span><span style="color:#D73A49;">NotNull</span><span style="color:#24292E;"> Delayed </span><span style="color:#E36209;">o</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Long.</span><span style="color:#6F42C1;">compare</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.expirationTime, ((DelayedTask) o).expirationTime);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * DelayQueue测试类</span></span>
<span class="line"><span style="color:#6A737D;"> **/</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Slf4j</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DelayQueueTest</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 初始化延迟队列</span></span>
<span class="line"><span style="color:#E1E4E8;">        DelayQueue&lt;</span><span style="color:#F97583;">DelayedTask</span><span style="color:#E1E4E8;">&gt; delayQueue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> DelayQueue&lt;&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 添加3个任务，延迟时间分别是3秒、1秒、5秒</span></span>
<span class="line"><span style="color:#E1E4E8;">        delayQueue.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DelayedTask</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3000</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> log.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;任务2开始运行&quot;</span><span style="color:#E1E4E8;">)));</span></span>
<span class="line"><span style="color:#E1E4E8;">        delayQueue.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DelayedTask</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> log.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;任务1开始运行&quot;</span><span style="color:#E1E4E8;">)));</span></span>
<span class="line"><span style="color:#E1E4E8;">        delayQueue.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DelayedTask</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">5000</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> log.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;任务3开始运行&quot;</span><span style="color:#E1E4E8;">)));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 运行任务</span></span>
<span class="line"><span style="color:#E1E4E8;">        log.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;开始运行任务&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">delayQueue.</span><span style="color:#B392F0;">isEmpty</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//阻塞获取最先到期的任务</span></span>
<span class="line"><span style="color:#E1E4E8;">            DelayedTask task </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> delayQueue.</span><span style="color:#B392F0;">take</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            task.</span><span style="color:#B392F0;">execute</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * DelayQueue测试类</span></span>
<span class="line"><span style="color:#6A737D;"> **/</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Slf4j</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DelayQueueTest</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 初始化延迟队列</span></span>
<span class="line"><span style="color:#24292E;">        DelayQueue&lt;</span><span style="color:#D73A49;">DelayedTask</span><span style="color:#24292E;">&gt; delayQueue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> DelayQueue&lt;&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 添加3个任务，延迟时间分别是3秒、1秒、5秒</span></span>
<span class="line"><span style="color:#24292E;">        delayQueue.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DelayedTask</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3000</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> log.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;任务2开始运行&quot;</span><span style="color:#24292E;">)));</span></span>
<span class="line"><span style="color:#24292E;">        delayQueue.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DelayedTask</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> log.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;任务1开始运行&quot;</span><span style="color:#24292E;">)));</span></span>
<span class="line"><span style="color:#24292E;">        delayQueue.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DelayedTask</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">5000</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> log.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;任务3开始运行&quot;</span><span style="color:#24292E;">)));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 运行任务</span></span>
<span class="line"><span style="color:#24292E;">        log.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;开始运行任务&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">delayQueue.</span><span style="color:#6F42C1;">isEmpty</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//阻塞获取最先到期的任务</span></span>
<span class="line"><span style="color:#24292E;">            DelayedTask task </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> delayQueue.</span><span style="color:#6F42C1;">take</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            task.</span><span style="color:#6F42C1;">execute</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>DelayQueue</code>队列具有以下特点：</p><ol><li><code>DelayQueue</code>实现了<code>BlockingQueue</code>接口，提供了四组放数据和读数据的方法，来满足不同的场景。</li><li><code>DelayQueue</code>底层采用组合的方式，复用<code>PriorityQueue</code>的按照延迟时间排序任务的功能，实现了延迟队列。</li><li><code>DelayQueue</code>是线程安全的，内部使用<code>ReentrantLock</code>加锁。</li></ol><h2 id="q-a" tabindex="-1">Q&amp;A <a class="header-anchor" href="#q-a" aria-label="Permalink to &quot;Q&amp;A&quot;">​</a></h2><blockquote><p><code>ArrayBlockingQueue</code>与<code>LinkedBlockingQueue</code>区别是什么？</p></blockquote><p><strong>相同点：</strong></p><ol><li>都是继承自<code>AbstractQueue</code>抽象类，并实现了<code>BlockingQueue</code>接口，所以两者拥有相同的读写方法，出现的地方可以相互替换。</li></ol><p><strong>不同点：</strong></p><ol><li>底层结构不同，<code>ArrayBlockingQueue</code>底层基于数组实现，初始化的时候必须指定数组长度，无法扩容。<code>LinkedBlockingQueue</code>底层基于链表实现，链表最大长度是Integer最大值。</li><li>占用内存大小不同，<code>ArrayBlockingQueue</code>一旦初始化，数组长度就确定了，不会随着元素增加而改变。<code>LinkedBlockingQueue</code>会随着元素越多，链表越长，占用内存越大。</li><li>性能不同，<code>ArrayBlockingQueue</code>的入队和出队共用一把锁，并发较低。<code>LinkedBlockingQueue</code>入队和出队使用两把独立的锁，并发情况下性能更高。</li><li>公平锁选项，<code>ArrayBlockingQueue</code>初始化的时候，可以指定使用公平锁或者非公平锁，公平锁模式下，可以按照线程等待的顺序来操作队列。<code>LinkedBlockingQueue</code>只支持非公平锁。</li><li>适用场景不同，<code>ArrayBlockingQueue</code>适用于明确限制队列大小的场景，防止生产速度大于消费速度的时候，造成内存溢出、资源耗尽。<code>LinkedBlockingQueue</code>适用于业务高峰期可以自动扩展消费速度的场景。</li></ol><blockquote><p>阻塞队列的特性各不相同，在使用的时候该怎么选择呢？</p></blockquote><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202406222109478.png" alt="image-20240622210909411"></p><blockquote><p>阻塞队列实现生产者消费者模型</p></blockquote><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Main</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        BlockingQueue&lt;</span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">&gt; queue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ArrayBlockingQueue&lt;&gt;(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Runnable supplier </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    String name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Thread.</span><span style="color:#B392F0;">currentThread</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getName</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                    System.err.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">time</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot;生产者 &quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">name</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot; 正在准备餐品...&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    TimeUnit.SECONDS.</span><span style="color:#B392F0;">sleep</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    System.err.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">time</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot;生产者 &quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">name</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot; 已出餐！&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    queue.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Object</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">                } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (InterruptedException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    e.</span><span style="color:#B392F0;">printStackTrace</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        };</span></span>
<span class="line"><span style="color:#E1E4E8;">        Runnable consumer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    String name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Thread.</span><span style="color:#B392F0;">currentThread</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getName</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">time</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot;消费者 &quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">name</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot; 正在等待出餐...&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    queue.</span><span style="color:#B392F0;">take</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">time</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot;消费者 &quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">name</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot; 取到了餐品。&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    TimeUnit.SECONDS.</span><span style="color:#B392F0;">sleep</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">time</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot;消费者 &quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">name</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot; 已经将饭菜吃完了！&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (InterruptedException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    e.</span><span style="color:#B392F0;">printStackTrace</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">break</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        };</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Thread</span><span style="color:#E1E4E8;">(supplier, </span><span style="color:#9ECBFF;">&quot;Supplier-&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">i).</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Thread</span><span style="color:#E1E4E8;">(consumer, </span><span style="color:#9ECBFF;">&quot;Consumer-&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">i).</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">time</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        SimpleDateFormat format </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SimpleDateFormat</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;HH:mm:ss&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;[&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">format.</span><span style="color:#B392F0;">format</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Date</span><span style="color:#E1E4E8;">()) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;] &quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Main</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        BlockingQueue&lt;</span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">&gt; queue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ArrayBlockingQueue&lt;&gt;(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        Runnable supplier </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                    String name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Thread.</span><span style="color:#6F42C1;">currentThread</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getName</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                    System.err.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">time</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot;生产者 &quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">name</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot; 正在准备餐品...&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                    TimeUnit.SECONDS.</span><span style="color:#6F42C1;">sleep</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                    System.err.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">time</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot;生产者 &quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">name</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot; 已出餐！&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                    queue.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Object</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">                } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (InterruptedException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    e.</span><span style="color:#6F42C1;">printStackTrace</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        };</span></span>
<span class="line"><span style="color:#24292E;">        Runnable consumer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                    String name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Thread.</span><span style="color:#6F42C1;">currentThread</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getName</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">time</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot;消费者 &quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">name</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot; 正在等待出餐...&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                    queue.</span><span style="color:#6F42C1;">take</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">time</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot;消费者 &quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">name</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot; 取到了餐品。&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                    TimeUnit.SECONDS.</span><span style="color:#6F42C1;">sleep</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">time</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot;消费者 &quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">name</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot; 已经将饭菜吃完了！&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (InterruptedException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    e.</span><span style="color:#6F42C1;">printStackTrace</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">break</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        };</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Thread</span><span style="color:#24292E;">(supplier, </span><span style="color:#032F62;">&quot;Supplier-&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">i).</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Thread</span><span style="color:#24292E;">(consumer, </span><span style="color:#032F62;">&quot;Consumer-&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">i).</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">time</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        SimpleDateFormat format </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SimpleDateFormat</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;HH:mm:ss&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;[&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">format.</span><span style="color:#6F42C1;">format</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Date</span><span style="color:#24292E;">()) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;] &quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,188),e=[o];function c(t,r,E,y,i,u){return n(),a("div",null,e)}const F=s(p,[["render",c]]);export{D as __pageData,F as default};
