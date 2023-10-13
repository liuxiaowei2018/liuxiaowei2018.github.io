import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8048b864.js";const h=JSON.parse('{"title":"LiteFlow","description":"","frontmatter":{},"headers":[],"relativePath":"second/flow/liteflow.md","filePath":"second/flow/liteflow.md","lastUpdated":null}'),p={name:"second/flow/liteflow.md"},o=l(`<h1 id="liteflow" tabindex="-1">LiteFlow <a class="header-anchor" href="#liteflow" aria-label="Permalink to &quot;LiteFlow&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#简介">简介</a></li><li><a href="#springboot集成">springboot集成</a></li></ul></nav><blockquote><p>官方文档：<a href="https://liteflow.yomahub.com/docs/" target="_blank" rel="noreferrer">https://liteflow.yomahub.com/docs/</a></p></blockquote><h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><blockquote><p>一个轻量，快速的组件式流程引擎框架，组件编排，帮助解耦业务代码，让每一个业务片段都是一个组件，并支持热加载规则配置，实现即时修改</p><p>LiteFlow适用于拥有复杂逻辑的业务，比如说<strong>价格引擎</strong>，<strong>下单流程</strong>等，这些业务往往都拥有很多步骤，这些步骤完全可以按照业务粒度拆分成一个个独立的组件，进行装配复用变更。使用LiteFlow，你会得到一个灵活度高，扩展性很强的系统。因为组件之间相互独立，也也可以避免改一处而动全身的这样的风险。</p></blockquote><h2 id="springboot集成" tabindex="-1">springboot集成 <a class="header-anchor" href="#springboot集成" aria-label="Permalink to &quot;springboot集成&quot;">​</a></h2><h4 id="依赖" tabindex="-1">依赖 <a class="header-anchor" href="#依赖" aria-label="Permalink to &quot;依赖&quot;">​</a></h4><blockquote><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;com.yomahub&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;liteflow-spring-boot-starter&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;2.6.10&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;com.yomahub&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;liteflow-spring-boot-starter&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;2.6.10&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></blockquote><h4 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h4><blockquote><p><strong>组件定义</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;a&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ACmp</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NodeComponent</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#6A737D;">//do your business</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;a&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ACmp</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NodeComponent</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6A737D;">//do your business</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>application.properties</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">liteflow.rule-source=config/flow.xml</span></span>
<span class="line"><span style="color:#e1e4e8;">#-----------------以下非必须-----------------</span></span>
<span class="line"><span style="color:#e1e4e8;">#liteflow是否开启，默认为true</span></span>
<span class="line"><span style="color:#e1e4e8;">liteflow.enable=true</span></span>
<span class="line"><span style="color:#e1e4e8;">#liteflow的banner是否开启，默认为true</span></span>
<span class="line"><span style="color:#e1e4e8;">liteflow.print-banner=true</span></span>
<span class="line"><span style="color:#e1e4e8;">#zkNode的节点，只有使用zk作为配置源的时候才起作用</span></span>
<span class="line"><span style="color:#e1e4e8;">liteflow.zk-node=/lite-flow/flow</span></span>
<span class="line"><span style="color:#e1e4e8;">#slot的数量，默认值为1024</span></span>
<span class="line"><span style="color:#e1e4e8;">liteflow.slot-size=1024</span></span>
<span class="line"><span style="color:#e1e4e8;">#并行节点的线程池Builder，LiteFlow提供了默认的Builder</span></span>
<span class="line"><span style="color:#e1e4e8;">liteflow.thread-executor-class=com.yomahub.liteflow.thread.LiteFlowDefaultExecutorBuilder</span></span>
<span class="line"><span style="color:#e1e4e8;">#异步线程最长的等待时间秒(只用于when)，默认值为16</span></span>
<span class="line"><span style="color:#e1e4e8;">liteflow.when-max-wait-seconds=20</span></span>
<span class="line"><span style="color:#e1e4e8;">#异步线程池最大线程数，默认为16</span></span>
<span class="line"><span style="color:#e1e4e8;">liteflow.when-max-workers=16</span></span>
<span class="line"><span style="color:#e1e4e8;">#异步线程池等待队列数，默认为512</span></span>
<span class="line"><span style="color:#e1e4e8;">liteflow.when-queue-limit=512</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否在启动的时候就解析规则，默认为true</span></span>
<span class="line"><span style="color:#e1e4e8;">liteflow.parse-on-start=true</span></span>
<span class="line"><span style="color:#e1e4e8;">#全局重试次数，默认为0</span></span>
<span class="line"><span style="color:#e1e4e8;">liteflow.retry-count=0</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否支持不同类型的加载方式混用，默认为false</span></span>
<span class="line"><span style="color:#e1e4e8;">liteflow.support-multiple-type=false</span></span>
<span class="line"><span style="color:#e1e4e8;">#是否开启监控log打印，默认值为false</span></span>
<span class="line"><span style="color:#e1e4e8;">liteflow.monitor.enable-log=true</span></span>
<span class="line"><span style="color:#e1e4e8;">#监控队列存储大小，默认值为200</span></span>
<span class="line"><span style="color:#e1e4e8;">liteflow.monitor.queue-limit=300</span></span>
<span class="line"><span style="color:#e1e4e8;">#监控一开始延迟多少执行，默认值为300000毫秒，也就是5分钟</span></span>
<span class="line"><span style="color:#e1e4e8;">liteflow.monitor.delay=10000</span></span>
<span class="line"><span style="color:#e1e4e8;">#监控日志打印每过多少时间执行一次，默认值为300000毫秒，也就是5分钟</span></span>
<span class="line"><span style="color:#e1e4e8;">liteflow.monitor.period=10000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">liteflow.rule-source=config/flow.xml</span></span>
<span class="line"><span style="color:#24292e;">#-----------------以下非必须-----------------</span></span>
<span class="line"><span style="color:#24292e;">#liteflow是否开启，默认为true</span></span>
<span class="line"><span style="color:#24292e;">liteflow.enable=true</span></span>
<span class="line"><span style="color:#24292e;">#liteflow的banner是否开启，默认为true</span></span>
<span class="line"><span style="color:#24292e;">liteflow.print-banner=true</span></span>
<span class="line"><span style="color:#24292e;">#zkNode的节点，只有使用zk作为配置源的时候才起作用</span></span>
<span class="line"><span style="color:#24292e;">liteflow.zk-node=/lite-flow/flow</span></span>
<span class="line"><span style="color:#24292e;">#slot的数量，默认值为1024</span></span>
<span class="line"><span style="color:#24292e;">liteflow.slot-size=1024</span></span>
<span class="line"><span style="color:#24292e;">#并行节点的线程池Builder，LiteFlow提供了默认的Builder</span></span>
<span class="line"><span style="color:#24292e;">liteflow.thread-executor-class=com.yomahub.liteflow.thread.LiteFlowDefaultExecutorBuilder</span></span>
<span class="line"><span style="color:#24292e;">#异步线程最长的等待时间秒(只用于when)，默认值为16</span></span>
<span class="line"><span style="color:#24292e;">liteflow.when-max-wait-seconds=20</span></span>
<span class="line"><span style="color:#24292e;">#异步线程池最大线程数，默认为16</span></span>
<span class="line"><span style="color:#24292e;">liteflow.when-max-workers=16</span></span>
<span class="line"><span style="color:#24292e;">#异步线程池等待队列数，默认为512</span></span>
<span class="line"><span style="color:#24292e;">liteflow.when-queue-limit=512</span></span>
<span class="line"><span style="color:#24292e;">#是否在启动的时候就解析规则，默认为true</span></span>
<span class="line"><span style="color:#24292e;">liteflow.parse-on-start=true</span></span>
<span class="line"><span style="color:#24292e;">#全局重试次数，默认为0</span></span>
<span class="line"><span style="color:#24292e;">liteflow.retry-count=0</span></span>
<span class="line"><span style="color:#24292e;">#是否支持不同类型的加载方式混用，默认为false</span></span>
<span class="line"><span style="color:#24292e;">liteflow.support-multiple-type=false</span></span>
<span class="line"><span style="color:#24292e;">#是否开启监控log打印，默认值为false</span></span>
<span class="line"><span style="color:#24292e;">liteflow.monitor.enable-log=true</span></span>
<span class="line"><span style="color:#24292e;">#监控队列存储大小，默认值为200</span></span>
<span class="line"><span style="color:#24292e;">liteflow.monitor.queue-limit=300</span></span>
<span class="line"><span style="color:#24292e;">#监控一开始延迟多少执行，默认值为300000毫秒，也就是5分钟</span></span>
<span class="line"><span style="color:#24292e;">liteflow.monitor.delay=10000</span></span>
<span class="line"><span style="color:#24292e;">#监控日志打印每过多少时间执行一次，默认值为300000毫秒，也就是5分钟</span></span>
<span class="line"><span style="color:#24292e;">liteflow.monitor.period=10000</span></span></code></pre></div><p><strong>config/flow.xml</strong></p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;?</span><span style="color:#85E89D;">xml</span><span style="color:#B392F0;"> version</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;1.0&quot;</span><span style="color:#B392F0;"> encoding</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span><span style="color:#E1E4E8;">?&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">flow</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;</span><span style="color:#85E89D;">chain</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;chain1&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">       &lt;</span><span style="color:#85E89D;">then</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;a,b,c&quot;</span><span style="color:#E1E4E8;">/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">       &lt;</span><span style="color:#85E89D;">when</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;d,e&quot;</span><span style="color:#E1E4E8;">/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;/</span><span style="color:#85E89D;">chain</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">flow</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;?</span><span style="color:#22863A;">xml</span><span style="color:#6F42C1;"> version</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;1.0&quot;</span><span style="color:#6F42C1;"> encoding</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#24292E;">?&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">flow</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   &lt;</span><span style="color:#22863A;">chain</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;chain1&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">       &lt;</span><span style="color:#22863A;">then</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;a,b,c&quot;</span><span style="color:#24292E;">/&gt;</span></span>
<span class="line"><span style="color:#24292E;">       &lt;</span><span style="color:#22863A;">when</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;d,e&quot;</span><span style="color:#24292E;">/&gt;</span></span>
<span class="line"><span style="color:#24292E;">   &lt;/</span><span style="color:#22863A;">chain</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">flow</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>SpringBoot在启动时会自动装载规则文件</p></blockquote><h4 id="执行" tabindex="-1">执行 <a class="header-anchor" href="#执行" aria-label="Permalink to &quot;执行&quot;">​</a></h4><blockquote><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MainTest</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span></span>
<span class="line"><span style="color:#E1E4E8;">   @</span><span style="color:#F97583;">Resource</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> FlowExecutor flowExecutor;</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span></span>
<span class="line"><span style="color:#E1E4E8;">   @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">testConfig</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">       LiteflowResponse&lt;</span><span style="color:#F97583;">DefaultSlot</span><span style="color:#E1E4E8;">&gt; response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> flowExecutor.</span><span style="color:#B392F0;">execute2Resp</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;chain1&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;arg&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MainTest</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#24292E;">   @</span><span style="color:#D73A49;">Resource</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> FlowExecutor flowExecutor;</span></span>
<span class="line"><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#24292E;">   @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">testConfig</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">       LiteflowResponse&lt;</span><span style="color:#D73A49;">DefaultSlot</span><span style="color:#24292E;">&gt; response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> flowExecutor.</span><span style="color:#6F42C1;">execute2Resp</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;chain1&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;arg&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></blockquote><h4 id="价格计算引擎案例" tabindex="-1">价格计算引擎案例 <a class="header-anchor" href="#价格计算引擎案例" aria-label="Permalink to &quot;价格计算引擎案例&quot;">​</a></h4><blockquote><p><a href="https://liteflow.yomahub.com/docs/example/example-project-case" target="_blank" rel="noreferrer">https://liteflow.yomahub.com/docs/example/example-project-case</a></p></blockquote>`,14),e=[o];function t(c,r,i,y,E,u){return n(),a("div",null,e)}const f=s(p,[["render",t]]);export{h as __pageData,f as default};
