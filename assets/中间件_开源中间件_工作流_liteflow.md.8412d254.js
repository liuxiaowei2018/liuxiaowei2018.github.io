import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8048b864.js";const f=JSON.parse('{"title":"LiteFlow","description":"","frontmatter":{},"headers":[],"relativePath":"中间件/开源中间件/工作流/liteflow.md","filePath":"中间件/开源中间件/工作流/liteflow.md","lastUpdated":null}'),o={name:"中间件/开源中间件/工作流/liteflow.md"},p=l(`<h1 id="liteflow" tabindex="-1">LiteFlow <a class="header-anchor" href="#liteflow" aria-label="Permalink to &quot;LiteFlow&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#_1、liteflow入门">1、LiteFlow入门</a><ul><li><a href="#_1-1、springboot集成liteflow">1.1、SpringBoot集成LiteFlow</a></li><li><a href="#_1-2、价格计算引擎案例">1.2、价格计算引擎案例</a></li></ul></li></ul></nav><h2 id="_1、liteflow入门" tabindex="-1">1、LiteFlow入门 <a class="header-anchor" href="#_1、liteflow入门" aria-label="Permalink to &quot;1、LiteFlow入门&quot;">​</a></h2><p>一个轻量，快速的组件式流程引擎框架，组件编排，帮助解耦业务代码，让每一个业务片段都是一个组件，并支持热加载规则配置，实现即时修改</p><p>LiteFlow适用于拥有复杂逻辑的业务，比如说<strong>价格引擎</strong>，<strong>下单流程</strong>等，这些业务往往都拥有很多步骤，这些步骤完全可以按照业务粒度拆分成一个个独立的组件，进行装配复用变更。使用LiteFlow，你会得到一个灵活度高，扩展性很强的系统。因为组件之间相互独立，也也可以避免改一处而动全身的这样的风险。</p><blockquote><p>官方文档：<a href="https://liteflow.yomahub.com/docs/" target="_blank" rel="noreferrer">https://liteflow.yomahub.com/docs/</a></p></blockquote><h3 id="_1-1、springboot集成liteflow" tabindex="-1">1.1、SpringBoot集成LiteFlow <a class="header-anchor" href="#_1-1、springboot集成liteflow" aria-label="Permalink to &quot;1.1、SpringBoot集成LiteFlow&quot;">​</a></h3><h4 id="依赖集成" tabindex="-1">依赖集成 <a class="header-anchor" href="#依赖集成" aria-label="Permalink to &quot;依赖集成&quot;">​</a></h4><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;com.yomahub&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;liteflow-spring-boot-starter&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;2.6.10&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;com.yomahub&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;liteflow-spring-boot-starter&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;2.6.10&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h4 id="配置集成" tabindex="-1">配置集成 <a class="header-anchor" href="#配置集成" aria-label="Permalink to &quot;配置集成&quot;">​</a></h4><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">liteflow.rule-source</span><span style="color:#E1E4E8;">=config/flow.xml</span></span>
<span class="line"><span style="color:#6A737D;">#-----------------以下非必须-----------------</span></span>
<span class="line"><span style="color:#6A737D;">#liteflow是否开启，默认为true</span></span>
<span class="line"><span style="color:#F97583;">liteflow.enable</span><span style="color:#E1E4E8;">=true</span></span>
<span class="line"><span style="color:#6A737D;">#liteflow的banner是否开启，默认为true</span></span>
<span class="line"><span style="color:#F97583;">liteflow.print-banner</span><span style="color:#E1E4E8;">=true</span></span>
<span class="line"><span style="color:#6A737D;">#zkNode的节点，只有使用zk作为配置源的时候才起作用</span></span>
<span class="line"><span style="color:#F97583;">liteflow.zk-node</span><span style="color:#E1E4E8;">=/lite-flow/flow</span></span>
<span class="line"><span style="color:#6A737D;">#slot的数量，默认值为1024</span></span>
<span class="line"><span style="color:#F97583;">liteflow.slot-size</span><span style="color:#E1E4E8;">=1024</span></span>
<span class="line"><span style="color:#6A737D;">#并行节点的线程池Builder，LiteFlow提供了默认的Builder</span></span>
<span class="line"><span style="color:#F97583;">liteflow.thread-executor-class</span><span style="color:#E1E4E8;">=com.yomahub.liteflow.thread.LiteFlowDefaultExecutorBuilder</span></span>
<span class="line"><span style="color:#6A737D;">#异步线程最长的等待时间秒(只用于when)，默认值为16</span></span>
<span class="line"><span style="color:#F97583;">liteflow.when-max-wait-seconds</span><span style="color:#E1E4E8;">=20</span></span>
<span class="line"><span style="color:#6A737D;">#异步线程池最大线程数，默认为16</span></span>
<span class="line"><span style="color:#F97583;">liteflow.when-max-workers</span><span style="color:#E1E4E8;">=16</span></span>
<span class="line"><span style="color:#6A737D;">#异步线程池等待队列数，默认为512</span></span>
<span class="line"><span style="color:#F97583;">liteflow.when-queue-limit</span><span style="color:#E1E4E8;">=512</span></span>
<span class="line"><span style="color:#6A737D;">#是否在启动的时候就解析规则，默认为true</span></span>
<span class="line"><span style="color:#F97583;">liteflow.parse-on-start</span><span style="color:#E1E4E8;">=true</span></span>
<span class="line"><span style="color:#6A737D;">#全局重试次数，默认为0</span></span>
<span class="line"><span style="color:#F97583;">liteflow.retry-count</span><span style="color:#E1E4E8;">=0</span></span>
<span class="line"><span style="color:#6A737D;">#是否支持不同类型的加载方式混用，默认为false</span></span>
<span class="line"><span style="color:#F97583;">liteflow.support-multiple-type</span><span style="color:#E1E4E8;">=false</span></span>
<span class="line"><span style="color:#6A737D;">#是否开启监控log打印，默认值为false</span></span>
<span class="line"><span style="color:#F97583;">liteflow.monitor.enable-log</span><span style="color:#E1E4E8;">=true</span></span>
<span class="line"><span style="color:#6A737D;">#监控队列存储大小，默认值为200</span></span>
<span class="line"><span style="color:#F97583;">liteflow.monitor.queue-limit</span><span style="color:#E1E4E8;">=300</span></span>
<span class="line"><span style="color:#6A737D;">#监控一开始延迟多少执行，默认值为300000毫秒，也就是5分钟</span></span>
<span class="line"><span style="color:#F97583;">liteflow.monitor.delay</span><span style="color:#E1E4E8;">=10000</span></span>
<span class="line"><span style="color:#6A737D;">#监控日志打印每过多少时间执行一次，默认值为300000毫秒，也就是5分钟</span></span>
<span class="line"><span style="color:#F97583;">liteflow.monitor.period</span><span style="color:#E1E4E8;">=10000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">liteflow.rule-source</span><span style="color:#24292E;">=config/flow.xml</span></span>
<span class="line"><span style="color:#6A737D;">#-----------------以下非必须-----------------</span></span>
<span class="line"><span style="color:#6A737D;">#liteflow是否开启，默认为true</span></span>
<span class="line"><span style="color:#D73A49;">liteflow.enable</span><span style="color:#24292E;">=true</span></span>
<span class="line"><span style="color:#6A737D;">#liteflow的banner是否开启，默认为true</span></span>
<span class="line"><span style="color:#D73A49;">liteflow.print-banner</span><span style="color:#24292E;">=true</span></span>
<span class="line"><span style="color:#6A737D;">#zkNode的节点，只有使用zk作为配置源的时候才起作用</span></span>
<span class="line"><span style="color:#D73A49;">liteflow.zk-node</span><span style="color:#24292E;">=/lite-flow/flow</span></span>
<span class="line"><span style="color:#6A737D;">#slot的数量，默认值为1024</span></span>
<span class="line"><span style="color:#D73A49;">liteflow.slot-size</span><span style="color:#24292E;">=1024</span></span>
<span class="line"><span style="color:#6A737D;">#并行节点的线程池Builder，LiteFlow提供了默认的Builder</span></span>
<span class="line"><span style="color:#D73A49;">liteflow.thread-executor-class</span><span style="color:#24292E;">=com.yomahub.liteflow.thread.LiteFlowDefaultExecutorBuilder</span></span>
<span class="line"><span style="color:#6A737D;">#异步线程最长的等待时间秒(只用于when)，默认值为16</span></span>
<span class="line"><span style="color:#D73A49;">liteflow.when-max-wait-seconds</span><span style="color:#24292E;">=20</span></span>
<span class="line"><span style="color:#6A737D;">#异步线程池最大线程数，默认为16</span></span>
<span class="line"><span style="color:#D73A49;">liteflow.when-max-workers</span><span style="color:#24292E;">=16</span></span>
<span class="line"><span style="color:#6A737D;">#异步线程池等待队列数，默认为512</span></span>
<span class="line"><span style="color:#D73A49;">liteflow.when-queue-limit</span><span style="color:#24292E;">=512</span></span>
<span class="line"><span style="color:#6A737D;">#是否在启动的时候就解析规则，默认为true</span></span>
<span class="line"><span style="color:#D73A49;">liteflow.parse-on-start</span><span style="color:#24292E;">=true</span></span>
<span class="line"><span style="color:#6A737D;">#全局重试次数，默认为0</span></span>
<span class="line"><span style="color:#D73A49;">liteflow.retry-count</span><span style="color:#24292E;">=0</span></span>
<span class="line"><span style="color:#6A737D;">#是否支持不同类型的加载方式混用，默认为false</span></span>
<span class="line"><span style="color:#D73A49;">liteflow.support-multiple-type</span><span style="color:#24292E;">=false</span></span>
<span class="line"><span style="color:#6A737D;">#是否开启监控log打印，默认值为false</span></span>
<span class="line"><span style="color:#D73A49;">liteflow.monitor.enable-log</span><span style="color:#24292E;">=true</span></span>
<span class="line"><span style="color:#6A737D;">#监控队列存储大小，默认值为200</span></span>
<span class="line"><span style="color:#D73A49;">liteflow.monitor.queue-limit</span><span style="color:#24292E;">=300</span></span>
<span class="line"><span style="color:#6A737D;">#监控一开始延迟多少执行，默认值为300000毫秒，也就是5分钟</span></span>
<span class="line"><span style="color:#D73A49;">liteflow.monitor.delay</span><span style="color:#24292E;">=10000</span></span>
<span class="line"><span style="color:#6A737D;">#监控日志打印每过多少时间执行一次，默认值为300000毫秒，也就是5分钟</span></span>
<span class="line"><span style="color:#D73A49;">liteflow.monitor.period</span><span style="color:#24292E;">=10000</span></span></code></pre></div><p><strong>config/flow.xml</strong></p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;?</span><span style="color:#85E89D;">xml</span><span style="color:#B392F0;"> version</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;1.0&quot;</span><span style="color:#B392F0;"> encoding</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span><span style="color:#E1E4E8;">?&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">flow</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">chain</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;chain1&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;</span><span style="color:#85E89D;">then</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;a,b,c&quot;</span><span style="color:#E1E4E8;">/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;</span><span style="color:#85E89D;">when</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;d,e&quot;</span><span style="color:#E1E4E8;">/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">chain</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">flow</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;?</span><span style="color:#22863A;">xml</span><span style="color:#6F42C1;"> version</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;1.0&quot;</span><span style="color:#6F42C1;"> encoding</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#24292E;">?&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">flow</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">chain</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;chain1&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   &lt;</span><span style="color:#22863A;">then</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;a,b,c&quot;</span><span style="color:#24292E;">/&gt;</span></span>
<span class="line"><span style="color:#24292E;">   &lt;</span><span style="color:#22863A;">when</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;d,e&quot;</span><span style="color:#24292E;">/&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">chain</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">flow</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><h4 id="执行测试" tabindex="-1">执行测试 <a class="header-anchor" href="#执行测试" aria-label="Permalink to &quot;执行测试&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MainTest</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Resource</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> FlowExecutor flowExecutor;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">testConfig</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        LiteflowResponse&lt;</span><span style="color:#F97583;">DefaultSlot</span><span style="color:#E1E4E8;">&gt; response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> flowExecutor.</span><span style="color:#B392F0;">execute2Resp</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;chain1&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;arg&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MainTest</span><span style="color:#24292E;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Resource</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> FlowExecutor flowExecutor;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">testConfig</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        LiteflowResponse&lt;</span><span style="color:#D73A49;">DefaultSlot</span><span style="color:#24292E;">&gt; response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> flowExecutor.</span><span style="color:#6F42C1;">execute2Resp</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;chain1&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;arg&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="_1-2、价格计算引擎案例" tabindex="-1">1.2、价格计算引擎案例 <a class="header-anchor" href="#_1-2、价格计算引擎案例" aria-label="Permalink to &quot;1.2、价格计算引擎案例&quot;">​</a></h3><blockquote><p><a href="https://liteflow.yomahub.com/docs/example/example-project-case" target="_blank" rel="noreferrer">https://liteflow.yomahub.com/docs/example/example-project-case</a></p></blockquote>`,17),e=[p];function t(c,r,i,E,y,u){return n(),a("div",null,e)}const h=s(o,[["render",t]]);export{f as __pageData,h as default};
