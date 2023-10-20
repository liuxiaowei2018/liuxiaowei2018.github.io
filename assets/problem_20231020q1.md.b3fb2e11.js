import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.8048b864.js";const o="/assets/image-20231020104648031.b4a25604.png",l="/assets/image-20231020104711345.f804245a.png",g=JSON.parse('{"title":"生产问题排查","description":"","frontmatter":{},"headers":[],"relativePath":"problem/20231020q1.md","filePath":"problem/20231020q1.md","lastUpdated":1697785485000}'),e={name:"problem/20231020q1.md"},t=p(`<h1 id="生产问题排查" tabindex="-1">生产问题排查 <a class="header-anchor" href="#生产问题排查" aria-label="Permalink to &quot;生产问题排查&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#_1、线上遇到死锁问题">1、线上遇到死锁问题</a><ul><li><a href="#_1-1、问题描述">1.1、问题描述</a></li><li><a href="#_1-2、问题定位">1.2、问题定位</a></li><li><a href="#_1-3、解决方案">1.3、解决方案</a></li></ul></li></ul></nav><h2 id="_1、线上遇到死锁问题" tabindex="-1">1、线上遇到死锁问题 <a class="header-anchor" href="#_1、线上遇到死锁问题" aria-label="Permalink to &quot;1、线上遇到死锁问题&quot;">​</a></h2><h3 id="_1-1、问题描述" tabindex="-1">1.1、问题描述 <a class="header-anchor" href="#_1-1、问题描述" aria-label="Permalink to &quot;1.1、问题描述&quot;">​</a></h3><p>事情是这样的，在2023年10月19日的晚上七点左右，调用B服务RPC接口的其他服务，都陆续开始报【<strong>接口调用超时异常</strong>】，B服务已经有一个多月没有上线过了，而出故障的时间当天，流量也没陡增。最后触发pod自动重启。</p><p>重启后错误信息立马消失了，一直到当天凌晨，都没有再报错了。</p><h3 id="_1-2、问题定位" tabindex="-1">1.2、问题定位 <a class="header-anchor" href="#_1-2、问题定位" aria-label="Permalink to &quot;1.2、问题定位&quot;">​</a></h3><p>这种突然出问题，但跟流量和发版又没有关系的，大概率是触发某个隐藏的bug导致服务慢慢不可用了。</p><h4 id="查看日志" tabindex="-1">查看日志 <a class="header-anchor" href="#查看日志" aria-label="Permalink to &quot;查看日志&quot;">​</a></h4><blockquote><p>错误信息，集中在B服务的某个pod上，有相当多线程block住了。</p></blockquote><h4 id="查看-pod-dump文件" tabindex="-1">查看 pod dump文件 <a class="header-anchor" href="#查看-pod-dump文件" aria-label="Permalink to &quot;查看 pod dump文件&quot;">​</a></h4><p>之前说过我们的系统pod配置了自动dump，我们从OSS上把DUMP文件下载下来看一下具体的报错信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&quot;thread_14&quot; Id=xxxx BLOCKED on java.util.concurrent.ConcurrentHashMap$Node@687bfd0d owned by &quot;Dubbo-thread-499&quot; Id=1044</span></span>
<span class="line"><span style="color:#e1e4e8;">at java.util.concurrent.ConcurrentHashMap.putVal(ConcurrentHashMap.java:1027)</span></span>
<span class="line"><span style="color:#e1e4e8;">- blocked on java.util.concurrent.ConcurrentHashMap$Node@687bfd0d</span></span>
<span class="line"><span style="color:#e1e4e8;">at java.util.concurrent.ConcurrentHashMap.putIfAbsent(ConcurrentHashMap.java:1535)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;Dubbo-thread-499&quot; Id=cccc BLOCKED on java.util.concurrent.ConcurrentHashMap$ReservationNode@2205946f owned by &quot;thread_14&quot; Id=yyy</span></span>
<span class="line"><span style="color:#e1e4e8;">at java.util.concurrent.ConcurrentHashMap.putVal(ConcurrentHashMap.java:1027)</span></span>
<span class="line"><span style="color:#e1e4e8;">- blocked on java.util.concurrent.ConcurrentHashMap$ReservationNode@2205946f</span></span>
<span class="line"><span style="color:#e1e4e8;">at java.util.concurrent.ConcurrentHashMap.putIfAbsent(ConcurrentHashMap.java:1535)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&quot;thread_14&quot; Id=xxxx BLOCKED on java.util.concurrent.ConcurrentHashMap$Node@687bfd0d owned by &quot;Dubbo-thread-499&quot; Id=1044</span></span>
<span class="line"><span style="color:#24292e;">at java.util.concurrent.ConcurrentHashMap.putVal(ConcurrentHashMap.java:1027)</span></span>
<span class="line"><span style="color:#24292e;">- blocked on java.util.concurrent.ConcurrentHashMap$Node@687bfd0d</span></span>
<span class="line"><span style="color:#24292e;">at java.util.concurrent.ConcurrentHashMap.putIfAbsent(ConcurrentHashMap.java:1535)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">&quot;Dubbo-thread-499&quot; Id=cccc BLOCKED on java.util.concurrent.ConcurrentHashMap$ReservationNode@2205946f owned by &quot;thread_14&quot; Id=yyy</span></span>
<span class="line"><span style="color:#24292e;">at java.util.concurrent.ConcurrentHashMap.putVal(ConcurrentHashMap.java:1027)</span></span>
<span class="line"><span style="color:#24292e;">- blocked on java.util.concurrent.ConcurrentHashMap$ReservationNode@2205946f</span></span>
<span class="line"><span style="color:#24292e;">at java.util.concurrent.ConcurrentHashMap.putIfAbsent(ConcurrentHashMap.java:1535)</span></span></code></pre></div><p>居然有<strong>死锁</strong>，发现是两个线程，在两个ConcurrentHashMap对象之间，相互等待了。</p><p>也就是说：</p><ul><li>线程thread_14在<strong>已获得某种资源</strong>后，还想继续获取687bfd0d对象的锁，而这把锁整被线程Dubbo-thread-499拿在手上；</li><li>线程Dubbo-thread-499在<strong>已获得某种资源</strong>后，还想继续获取2205946f对象的锁，而这把锁整被线程thread_14拿在手上；</li></ul><p><code>ConcurrentHashMap出现死锁</code>，本地简单写了一段程序验证了一下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ConcurrentHashMap&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; map1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ConcurrentHashMap&lt;&gt;(</span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    ConcurrentHashMap&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; map2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ConcurrentHashMap&lt;&gt;(</span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Thread</span><span style="color:#E1E4E8;">(()</span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        map1.</span><span style="color:#B392F0;">computeIfAbsent</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a&quot;</span><span style="color:#E1E4E8;">, key </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            map2.</span><span style="color:#B392F0;">computeIfAbsent</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;b&quot;</span><span style="color:#E1E4E8;">, key2 </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }).</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Thread</span><span style="color:#E1E4E8;">(()</span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        map2.</span><span style="color:#B392F0;">computeIfAbsent</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;b&quot;</span><span style="color:#E1E4E8;">, key </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            map1.</span><span style="color:#B392F0;">computeIfAbsent</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a&quot;</span><span style="color:#E1E4E8;">, key2 </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }).</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] args) {</span></span>
<span class="line"><span style="color:#24292E;">    ConcurrentHashMap&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; map1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ConcurrentHashMap&lt;&gt;(</span><span style="color:#005CC5;">16</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    ConcurrentHashMap&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; map2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ConcurrentHashMap&lt;&gt;(</span><span style="color:#005CC5;">16</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Thread</span><span style="color:#24292E;">(()</span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        map1.</span><span style="color:#6F42C1;">computeIfAbsent</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a&quot;</span><span style="color:#24292E;">, key </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            map2.</span><span style="color:#6F42C1;">computeIfAbsent</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;b&quot;</span><span style="color:#24292E;">, key2 </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">    }).</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Thread</span><span style="color:#24292E;">(()</span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        map2.</span><span style="color:#6F42C1;">computeIfAbsent</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;b&quot;</span><span style="color:#24292E;">, key </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            map1.</span><span style="color:#6F42C1;">computeIfAbsent</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a&quot;</span><span style="color:#24292E;">, key2 </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">    }).</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在Intellij idea上运行上面的代码，并使用idea自带的Dump Threads功能，会发现真的触发死锁了。</p><p><img src="`+o+'" alt="image-20231020104648031"></p><p>看了一下<strong>jdk 1.8</strong>的ConcurrentHashMap的computeIfAbsent源代码，在<strong>并发</strong>的情况下，确实有概率性会触发死锁。</p><p><img src="'+l+'" alt="image-20231020104711345"></p><p>大概的执行序列是:</p><ul><li>1、生成ReservationNode预占节点；</li><li>2、对该节点进行加锁（<strong>这里是重点</strong>），然后将该节点放入指定key的槽位中；</li><li>3、执行<strong>我们传入的计算逻辑</strong>，当我们计算逻辑中包含有computeIfAbsent时，此时代码会重复上面的1~3步骤</li></ul><p>到这里就大概明白了，当执行一次computeIfAbsent的<strong>嵌套逻辑</strong>时，会有两个ReservationNode对象会被加锁，那在<strong>并发</strong>的情况下，是可能会产生死锁的。</p><p>具体是哪行代码触发的呢? 其实日志是有完整打印出来的，由于有敏感信息，这里不能贴出来。但是触发的诱因可以说一下：</p><blockquote><p>线程thread_14,是想更新一个用户的手机号信息，对应的代码逻辑会操作两个ConcurrentHashMap，先操作map1，再操作map2，这个两个map是作为本地缓存使用的，都会对其进行computeIfAbsent操作。而Dubbo-thread-499也是一样，也会操作这两个map，先操作map2，再操作map1。当有并发的情况下，处理的又是同一个手机号的时候，就可能触发死锁。</p></blockquote><h3 id="_1-3、解决方案" tabindex="-1">1.3、解决方案 <a class="header-anchor" href="#_1-3、解决方案" aria-label="Permalink to &quot;1.3、解决方案&quot;">​</a></h3><p>定位到代码，重新梳理业务逻辑实现，发现 <code>thread_14操作完map1这个本地缓存后，还要去操作map2</code>这个本地缓存 是没有必要的。因为这两份本地缓存的数据，都有对应的业务逻辑代码去保证它的准确性。</p><p>解决这次的死锁的方案也很简单，就是<strong>断掉其中一条路</strong>，避免死锁就可以了。正如刚才上面分析的，两份本地缓存都有各自的业务逻辑去确保它的准确性，没必要<strong>顺手去更新别人家的缓存</strong>。</p><p>修改代码，经过测试团队异常场景测试验证后，发版上线。问题解决！</p>',31),r=[t];function c(y,E,i,u,d,h){return a(),n("div",null,r)}const C=s(e,[["render",c]]);export{g as __pageData,C as default};
