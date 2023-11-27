import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.8048b864.js";const o="/assets/image-20220319111146744.c882a89e.png",e="/assets/image-20220319111607435.00900350.png",p="/assets/image-20220319111657555.d1bb1c38.png",g=JSON.parse('{"title":"Dubbo","description":"","frontmatter":{},"headers":[],"relativePath":"second/alibaba/dubbo.md","filePath":"second/alibaba/dubbo.md","lastUpdated":1697536192000}'),t={name:"second/alibaba/dubbo.md"},r=l(`<h1 id="dubbo" tabindex="-1">Dubbo <a class="header-anchor" href="#dubbo" aria-label="Permalink to &quot;Dubbo&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#_1、入门">1、入门</a></li><li><a href="#_2、应用">2、应用</a><ul><li><a href="#_2-1、dubbo注解">2.1、Dubbo注解</a></li><li><a href="#_2-n、dubbo-admin">2.n、dubbo-admin</a></li></ul></li><li><a href="#_3、扩展">3、扩展</a><ul><li><a href="#_3-1、架构">3.1、架构</a></li></ul></li></ul></nav><blockquote><p>官方文档：<a href="https://dubbo.apache.org/zh/docs/quick-start/" target="_blank" rel="noreferrer">https://dubbo.apache.org/zh/docs/quick-start/</a></p></blockquote><h2 id="_1、入门" tabindex="-1">1、入门 <a class="header-anchor" href="#_1、入门" aria-label="Permalink to &quot;1、入门&quot;">​</a></h2><p>Dubbo具有高效的远程调用、服务自动注册和发现、负载均衡、容错机制等众多特性。通过Dubbo，我们可以更方便地实现服务治理、服务调用链追踪、服务降级、服务熔断等重要功能。</p><ul><li>高效的远程调用，支持多种传输协议、序列化协议和集群容错机制；</li><li>可扩展的服务自动发现，支持多种注册中心；</li><li>丰富的负载均衡策略，支持轮询、随机、最少活跃调用等多种策略；</li><li>灵活的集群容错机制，支持多种容错策略；</li><li>多协议支持，Dubbo同时支持dubbo://、http:// 和 hessian://等多种协议。</li></ul><h2 id="_2、应用" tabindex="-1">2、应用 <a class="header-anchor" href="#_2、应用" aria-label="Permalink to &quot;2、应用&quot;">​</a></h2><h3 id="_2-1、dubbo注解" tabindex="-1">2.1、Dubbo注解 <a class="header-anchor" href="#_2-1、dubbo注解" aria-label="Permalink to &quot;2.1、Dubbo注解&quot;">​</a></h3><h4 id="dubboreference" tabindex="-1">@DubboReference <a class="header-anchor" href="#dubboreference" aria-label="Permalink to &quot;@DubboReference&quot;">​</a></h4><ul><li>version就是用来做服务版本升级用</li><li>check就是服务启动时是否需要检查服务是否可用</li><li>url基本上是用于开发联调时候用的，绕过注册中心，直连服务</li><li>timaout 超时时间设置</li><li>registry注册中心</li></ul><h3 id="_2-n、dubbo-admin" tabindex="-1">2.n、dubbo-admin <a class="header-anchor" href="#_2-n、dubbo-admin" aria-label="Permalink to &quot;2.n、dubbo-admin&quot;">​</a></h3><blockquote><p>官方文档：<a href="https://github.com/apache/dubbo-admin/" target="_blank" rel="noreferrer">https://github.com/apache/dubbo-admin/</a></p></blockquote><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;3.0&#39;</span></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">dubbo-admin</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">apache/dubbo-admin</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;9001:8080&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">networks</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">swarm-overlay</span><span style="color:#E1E4E8;">: {}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">admin.root.user.name=root</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">admin.root.user.password=xxx</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">admin.registry.address=&#39;nacos://xx:8848?group=DEFAULT_GROUP&amp;namespace=test&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">admin.config-center=&#39;nacos://xx:8848?group=DEFAULT_GROUP&amp;namespace=test&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#9ECBFF;">admin.metadata-report.address=&#39;nacos://xx:8848?group=dubbo&amp;namespace=test&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">on-failure</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">cpu_count</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">mem_limit</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">512m</span></span>
<span class="line"><span style="color:#85E89D;">networks</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">swarm-overlay</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">external</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;3.0&#39;</span></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">dubbo-admin</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">apache/dubbo-admin</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;9001:8080&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">swarm-overlay</span><span style="color:#24292E;">: {}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">admin.root.user.name=root</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">admin.root.user.password=xxx</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">admin.registry.address=&#39;nacos://xx:8848?group=DEFAULT_GROUP&amp;namespace=test&#39;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">admin.config-center=&#39;nacos://xx:8848?group=DEFAULT_GROUP&amp;namespace=test&#39;</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#032F62;">admin.metadata-report.address=&#39;nacos://xx:8848?group=dubbo&amp;namespace=test&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">on-failure</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">cpu_count</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">mem_limit</span><span style="color:#24292E;">: </span><span style="color:#032F62;">512m</span></span>
<span class="line"><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">swarm-overlay</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">external</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span></code></pre></div><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># nacos</span></span>
<span class="line"><span style="color:#F97583;">admin.registry.address</span><span style="color:#E1E4E8;">=nacos://127.0.0.1:8848</span></span>
<span class="line"><span style="color:#F97583;">admin.config-center</span><span style="color:#E1E4E8;">=nacos://127.0.0.1:8848</span></span>
<span class="line"><span style="color:#F97583;">admin.metadata-report.address</span><span style="color:#E1E4E8;">=nacos://127.0.0.1:8848</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># nacos</span></span>
<span class="line"><span style="color:#D73A49;">admin.registry.address</span><span style="color:#24292E;">=nacos://127.0.0.1:8848</span></span>
<span class="line"><span style="color:#D73A49;">admin.config-center</span><span style="color:#24292E;">=nacos://127.0.0.1:8848</span></span>
<span class="line"><span style="color:#D73A49;">admin.metadata-report.address</span><span style="color:#24292E;">=nacos://127.0.0.1:8848</span></span></code></pre></div><h2 id="_3、扩展" tabindex="-1">3、扩展 <a class="header-anchor" href="#_3、扩展" aria-label="Permalink to &quot;3、扩展&quot;">​</a></h2><h3 id="_3-1、架构" tabindex="-1">3.1、架构 <a class="header-anchor" href="#_3-1、架构" aria-label="Permalink to &quot;3.1、架构&quot;">​</a></h3><p><img src="`+o+'" alt="image-20220319111146744"></p><blockquote><p>节点的角色说明</p></blockquote><table><thead><tr><th style="text-align:left;">节点</th><th style="text-align:left;">角色说明</th></tr></thead><tbody><tr><td style="text-align:left;">Consumer</td><td style="text-align:left;">需要调用远程服务的服务消费方</td></tr><tr><td style="text-align:left;">Registry</td><td style="text-align:left;">注册中心</td></tr><tr><td style="text-align:left;">Provider</td><td style="text-align:left;">服务提供方</td></tr><tr><td style="text-align:left;">Container</td><td style="text-align:left;">服务运行的容器</td></tr><tr><td style="text-align:left;">Monitor</td><td style="text-align:left;">监控中心</td></tr></tbody></table><blockquote><p>整体流程</p></blockquote><p>1.首先服务提供者 <strong>Provider 启动然后向注册中心注册</strong>自己所能提供的服务。</p><p>2.服务消费者 <strong>Consumer 启动向注册中心订阅</strong>自己所需的服务。</p><p>3.然后注册中心将提供者元信息通知给 Consumer， 之后 Consumer 因为已经从注册中心获取提供者的地址，因此</p><p>可以<strong>通过负载均衡选择一个 Provider 直接调用</strong> 。</p><p>4.服务提供方元数据变更的话<strong>注册中心会把变更推送给服务消费者</strong>。</p><p>5.服务提供者和消费者都会在内存中记录着调用的次数和时间，然后<strong>定时的发送统计数据到监控中心</strong>。</p><p>注册中心和监控中心是可选的，你可以不要监控，也不要注册中心，直接在配置文件里面写然后提供方和消费方直连。注册中心、提供方和消费方之间都是长连接，和监控方不是长连接，并且消费方是直接调用提供方，不经过注册中心。注册中心和监控中心宕机了也不会影响到已经正常运行的提供者和消费者，因为消费者有本地缓存提供者的信息。</p><h4 id="_3-1-1、服务提供者" tabindex="-1">3.1.1、服务提供者 <a class="header-anchor" href="#_3-1-1、服务提供者" aria-label="Permalink to &quot;3.1.1、服务提供者&quot;">​</a></h4><p><img src="'+e+'" alt="image-20220319111607435"></p><p>Provider 启动，通过 Proxy 组件根据具体的协议 Protocol 将需要暴露出去的接口封装成 Invoker，Invoker 是 Dubbo 一个很核心的组件，代表一个可执行体。</p><p>然后再通过 Exporter 包装一下，这是为了在注册中心暴露自己套的一层，然后将 Exporter 通过 Registry 注册到注册中心。这就是整体服务暴露过程。</p><h4 id="_3-1-2、消费者调用流程" tabindex="-1">3.1.2、消费者调用流程 <a class="header-anchor" href="#_3-1-2、消费者调用流程" aria-label="Permalink to &quot;3.1.2、消费者调用流程&quot;">​</a></h4><p><img src="'+p+'" alt="image-20220319111657555"></p><p>消费者启动会向注册中心拉取服务提供者的元信息，然后调用流程也是从 Proxy 开始，毕竟都需要代理才能无感知。</p><p>Proxy 持有一个 Invoker 对象，调用 invoke 之后需要通过 Cluster 先从 Directory 获取所有可调用的远程服务的 Invoker 列表，如果配置了某些路由规则，比如某个接口只能调用某个节点的那就再过滤一遍 Invoker 列表。</p><p>剩下的 Invoker 再通过 LoadBalance 做负载均衡选取一个。然后再经过 Filter 做一些统计什么的，再通过 Client 做数据传输，比如用 Netty 来传输。</p><p>传输需要经过 Codec 接口做协议构造，再序列化。最终发往对应的服务提供者。</p><p>服务提供者接收到之后也会进行 Codec 协议处理，然后反序列化后将请求扔到线程池处理。某个线程会根据请求找到对应的 Exporter ，而找到 Exporter 其实就是找到了 Invoker，但是还会有一层层 Filter，经过一层层过滤链之后最终调用实现类然后原路返回结果。完成整个调用过程！</p>',38),c=[r];function i(d,E,y,b,u,m){return a(),n("div",null,c)}const _=s(t,[["render",i]]);export{g as __pageData,_ as default};