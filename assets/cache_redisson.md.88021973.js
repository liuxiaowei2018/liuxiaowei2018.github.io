import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8048b864.js";const u=JSON.parse('{"title":"Redisson","description":"","frontmatter":{},"headers":[],"relativePath":"cache/redisson.md","filePath":"cache/redisson.md","lastUpdated":null}'),e={name:"cache/redisson.md"},o=l(`<h1 id="redisson" tabindex="-1">Redisson <a class="header-anchor" href="#redisson" aria-label="Permalink to &quot;Redisson&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#_1、redisson入门">1、Redisson入门</a></li><li><a href="#_2、redisson应用">2、Redisson应用</a><ul><li><a href="#spring-boot-starter集成">Spring Boot Starter集成</a></li></ul></li><li><a href="#_3、redisson扩展">3、Redisson扩展</a></li></ul></nav><h2 id="_1、redisson入门" tabindex="-1">1、Redisson入门 <a class="header-anchor" href="#_1、redisson入门" aria-label="Permalink to &quot;1、Redisson入门&quot;">​</a></h2><blockquote><p>官方文档：<a href="https://github.com/redisson/redisson/wiki" target="_blank" rel="noreferrer">https://github.com/redisson/redisson/wiki</a></p></blockquote><p>Redis官方推荐，基于Netty的客户端工具，支持Redis 90%以上的命令。底层优化规避很多不正确的用法 例如: keys被转换为scan。支持单机、哨兵、单主集群、多主集群等模式</p><h2 id="_2、redisson应用" tabindex="-1">2、Redisson应用 <a class="header-anchor" href="#_2、redisson应用" aria-label="Permalink to &quot;2、Redisson应用&quot;">​</a></h2><blockquote><p>参考文档：<a href="https://blog.csdn.net/A_art_xiang/article/details/125538972" target="_blank" rel="noreferrer">https://blog.csdn.net/A_art_xiang/article/details/125538972</a></p></blockquote><h3 id="spring-boot-starter集成" tabindex="-1">Spring Boot Starter集成 <a class="header-anchor" href="#spring-boot-starter集成" aria-label="Permalink to &quot;Spring Boot Starter集成&quot;">​</a></h3><p>支持Spring Boot 1.3.x - 2.7.x</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">     &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">         &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.redisson&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">         &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;redisson-spring-boot-starter&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">         &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;3.17.4&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">     &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">     &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">         &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.redisson&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">         &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;redisson-spring-boot-starter&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">         &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;3.17.4&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">     &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>Redisson的配置：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">spring</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">redis</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">redisson</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">file</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">classpath:redisson.yaml</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">config</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#9ECBFF;">        clusterServersConfig:</span></span>
<span class="line"><span style="color:#9ECBFF;">          idleConnectionTimeout: 10000</span></span>
<span class="line"><span style="color:#9ECBFF;">          connectTimeout: 10000</span></span>
<span class="line"><span style="color:#9ECBFF;">          timeout: 3000</span></span>
<span class="line"><span style="color:#9ECBFF;">          retryAttempts: 3</span></span>
<span class="line"><span style="color:#9ECBFF;">          retryInterval: 1500</span></span>
<span class="line"><span style="color:#9ECBFF;">          failedSlaveReconnectionInterval: 3000</span></span>
<span class="line"><span style="color:#9ECBFF;">          failedSlaveCheckInterval: 60000</span></span>
<span class="line"><span style="color:#9ECBFF;">          password: null</span></span>
<span class="line"><span style="color:#9ECBFF;">          subscriptionsPerConnection: 5</span></span>
<span class="line"><span style="color:#9ECBFF;">          clientName: null</span></span>
<span class="line"><span style="color:#9ECBFF;">          loadBalancer: !&lt;org.redisson.connection.balancer.RoundRobinLoadBalancer&gt; {}</span></span>
<span class="line"><span style="color:#9ECBFF;">          subscriptionConnectionMinimumIdleSize: 1</span></span>
<span class="line"><span style="color:#9ECBFF;">          subscriptionConnectionPoolSize: 50</span></span>
<span class="line"><span style="color:#9ECBFF;">          slaveConnectionMinimumIdleSize: 24</span></span>
<span class="line"><span style="color:#9ECBFF;">          slaveConnectionPoolSize: 64</span></span>
<span class="line"><span style="color:#9ECBFF;">          masterConnectionMinimumIdleSize: 24</span></span>
<span class="line"><span style="color:#9ECBFF;">          masterConnectionPoolSize: 64</span></span>
<span class="line"><span style="color:#9ECBFF;">          readMode: &quot;SLAVE&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          subscriptionMode: &quot;SLAVE&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          nodeAddresses:</span></span>
<span class="line"><span style="color:#9ECBFF;">          - &quot;redis://127.0.0.1:7004&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          - &quot;redis://127.0.0.1:7001&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          - &quot;redis://127.0.0.1:7000&quot;</span></span>
<span class="line"><span style="color:#9ECBFF;">          scanInterval: 1000</span></span>
<span class="line"><span style="color:#9ECBFF;">          pingConnectionInterval: 0</span></span>
<span class="line"><span style="color:#9ECBFF;">          keepAlive: false</span></span>
<span class="line"><span style="color:#9ECBFF;">          tcpNoDelay: false</span></span>
<span class="line"><span style="color:#9ECBFF;">        threads: 16</span></span>
<span class="line"><span style="color:#9ECBFF;">        nettyThreads: 32</span></span>
<span class="line"><span style="color:#9ECBFF;">        codec: !&lt;org.redisson.codec.MarshallingCodec&gt; {}</span></span>
<span class="line"><span style="color:#9ECBFF;">        transportMode: &quot;NIO&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">spring</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">redis</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">redisson</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">file</span><span style="color:#24292E;">: </span><span style="color:#032F62;">classpath:redisson.yaml</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">config</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#032F62;">        clusterServersConfig:</span></span>
<span class="line"><span style="color:#032F62;">          idleConnectionTimeout: 10000</span></span>
<span class="line"><span style="color:#032F62;">          connectTimeout: 10000</span></span>
<span class="line"><span style="color:#032F62;">          timeout: 3000</span></span>
<span class="line"><span style="color:#032F62;">          retryAttempts: 3</span></span>
<span class="line"><span style="color:#032F62;">          retryInterval: 1500</span></span>
<span class="line"><span style="color:#032F62;">          failedSlaveReconnectionInterval: 3000</span></span>
<span class="line"><span style="color:#032F62;">          failedSlaveCheckInterval: 60000</span></span>
<span class="line"><span style="color:#032F62;">          password: null</span></span>
<span class="line"><span style="color:#032F62;">          subscriptionsPerConnection: 5</span></span>
<span class="line"><span style="color:#032F62;">          clientName: null</span></span>
<span class="line"><span style="color:#032F62;">          loadBalancer: !&lt;org.redisson.connection.balancer.RoundRobinLoadBalancer&gt; {}</span></span>
<span class="line"><span style="color:#032F62;">          subscriptionConnectionMinimumIdleSize: 1</span></span>
<span class="line"><span style="color:#032F62;">          subscriptionConnectionPoolSize: 50</span></span>
<span class="line"><span style="color:#032F62;">          slaveConnectionMinimumIdleSize: 24</span></span>
<span class="line"><span style="color:#032F62;">          slaveConnectionPoolSize: 64</span></span>
<span class="line"><span style="color:#032F62;">          masterConnectionMinimumIdleSize: 24</span></span>
<span class="line"><span style="color:#032F62;">          masterConnectionPoolSize: 64</span></span>
<span class="line"><span style="color:#032F62;">          readMode: &quot;SLAVE&quot;</span></span>
<span class="line"><span style="color:#032F62;">          subscriptionMode: &quot;SLAVE&quot;</span></span>
<span class="line"><span style="color:#032F62;">          nodeAddresses:</span></span>
<span class="line"><span style="color:#032F62;">          - &quot;redis://127.0.0.1:7004&quot;</span></span>
<span class="line"><span style="color:#032F62;">          - &quot;redis://127.0.0.1:7001&quot;</span></span>
<span class="line"><span style="color:#032F62;">          - &quot;redis://127.0.0.1:7000&quot;</span></span>
<span class="line"><span style="color:#032F62;">          scanInterval: 1000</span></span>
<span class="line"><span style="color:#032F62;">          pingConnectionInterval: 0</span></span>
<span class="line"><span style="color:#032F62;">          keepAlive: false</span></span>
<span class="line"><span style="color:#032F62;">          tcpNoDelay: false</span></span>
<span class="line"><span style="color:#032F62;">        threads: 16</span></span>
<span class="line"><span style="color:#032F62;">        nettyThreads: 32</span></span>
<span class="line"><span style="color:#032F62;">        codec: !&lt;org.redisson.codec.MarshallingCodec&gt; {}</span></span>
<span class="line"><span style="color:#032F62;">        transportMode: &quot;NIO&quot;</span></span></code></pre></div><h2 id="_3、redisson扩展" tabindex="-1">3、Redisson扩展 <a class="header-anchor" href="#_3、redisson扩展" aria-label="Permalink to &quot;3、Redisson扩展&quot;">​</a></h2><blockquote><p>参考文档：<a href="https://blog.csdn.net/A_art_xiang/article/details/125525864" target="_blank" rel="noreferrer">https://blog.csdn.net/A_art_xiang/article/details/125525864</a></p></blockquote>`,14),p=[o];function t(c,r,i,d,y,E){return n(),a("div",null,p)}const g=s(e,[["render",t]]);export{u as __pageData,g as default};
