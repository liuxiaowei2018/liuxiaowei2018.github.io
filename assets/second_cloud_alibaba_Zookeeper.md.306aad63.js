import{_ as s,c as a,o as n,a as l}from"./app.1af635ee.js";const C=JSON.parse('{"title":"Zookeeper","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u539F\u7406","slug":"\u539F\u7406","link":"#\u539F\u7406","children":[]},{"level":2,"title":"\u5B89\u88C5","slug":"\u5B89\u88C5","link":"#\u5B89\u88C5","children":[]},{"level":2,"title":"\u5E94\u7528","slug":"\u5E94\u7528","link":"#\u5E94\u7528","children":[]}],"relativePath":"second/cloud/alibaba/Zookeeper.md"}'),p={name:"second/cloud/alibaba/Zookeeper.md"},o=l(`<h1 id="zookeeper" tabindex="-1">Zookeeper <a class="header-anchor" href="#zookeeper" aria-hidden="true">#</a></h1><h2 id="\u539F\u7406" tabindex="-1">\u539F\u7406 <a class="header-anchor" href="#\u539F\u7406" aria-hidden="true">#</a></h2><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#A6ACCD;">zookeeper\u5728\u5206\u5E03\u5F0F\u7CFB\u7EDF\u4E2D\u4E3A\u96C6\u7FA4\u63D0\u4F9B\u6CE8\u518C\u4E2D\u5FC3\u6765\u7BA1\u7406\u96C6\u7FA4 \u4E3B\u8981\u91C7\u7528\u7684\u662F \u6587\u4EF6\u7CFB\u7EDF+\u76D1\u542C\u901A\u77E5\u673A\u5236 \u5B9E\u73B0</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5B9E\u73B0\u5206\u5E03\u5F0F\u9501 \u5206\u5E03\u5F0F\u4E8B\u52A1 \u5206\u5E03\u5F0F\u4EFB\u52A1\u7B49</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5BA2\u6237\u7AEF\u76D1\u542Czookeeper\u4E2D\u8282\u70B9\u7684\u72B6\u6001\uFF0C\u5982\u679C\u8282\u70B9\u6570\u636E\u53D1\u751F\u7ED9\u53D8\uFF0Czookeeper\u4F1A\u901A\u8FC7\u76D1\u542C\u673A\u5236\u901A\u77E5\u5BA2\u6237\u7AEF</span></span>
<span class="line"></span></code></pre></div><h2 id="\u5B89\u88C5" tabindex="-1">\u5B89\u88C5 <a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a></h2><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">#docker\u5F00\u542Fzookeeper</span></span>
<span class="line"><span style="color:#A6ACCD;">docker exec -it zookeeper bash</span></span>
<span class="line"><span style="color:#A6ACCD;">cd bin/</span></span>
<span class="line"><span style="color:#A6ACCD;">./zkServer.sh status</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="\u5E94\u7528" tabindex="-1">\u5E94\u7528 <a class="header-anchor" href="#\u5E94\u7528" aria-hidden="true">#</a></h2><h4 id="zookeeper\u9501" tabindex="-1">Zookeeper\u9501 <a class="header-anchor" href="#zookeeper\u9501" aria-hidden="true">#</a></h4><blockquote><p>\u4E34\u65F6\u6709\u5E8F\u8282\u70B9</p><div class="language-java"><button class="copy"></button><span class="lang">java</span><pre><code><span class="line"><span style="color:#676E95;">/*</span></span>
<span class="line"><span style="color:#676E95;">* ZkConfig</span></span>
<span class="line"><span style="color:#676E95;">*/</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Configuration</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ZkConfig</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Bean</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">CuratorFramework</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">cf</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#C792EA;">RetryPolicy</span><span style="color:#A6ACCD;"> retryPolicy </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ExponentialBackoffRetry</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">3000</span><span style="color:#89DDFF;">,</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#C792EA;">CuratorFramework</span><span style="color:#A6ACCD;"> cf </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> CuratorFrameworkFactory</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">builder</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">connectString</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">192.168.136.129:2181,192.168.136.129:2182,192.168.136.129:2183</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">retryPolicy</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">retryPolicy</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">build</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">cf</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">start</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> cf</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span></code></pre></div><div class="language-java"><button class="copy"></button><span class="lang">java</span><pre><code><span class="line"><span style="color:#676E95;">//\u521B\u5EFA\u9501\u5BF9\u8C61</span></span>
<span class="line"><span style="color:#C792EA;">InterProcessMutex</span><span style="color:#A6ACCD;"> mutex </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">InterProcessMutex</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">cf</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/lock</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#89DDFF;">try</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	mutex</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">acquire</span><span style="color:#89DDFF;">();</span><span style="color:#676E95;">//\u83B7\u53D6\u9501</span></span>
<span class="line"><span style="color:#89DDFF;">	</span><span style="color:#676E95;">//\u5177\u4F53\u4E1A\u52A1\u4EE3\u7801...</span></span>
<span class="line"><span style="color:#A6ACCD;">	mutex</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">release</span><span style="color:#89DDFF;">();</span><span style="color:#676E95;">//\u91CA\u653E\u9501</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">catch</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">Exception</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">e</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	e</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">printStackTrace</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></blockquote>`,8),e=[o];function c(r,t,D,y,F,A){return n(),a("div",null,e)}const d=s(p,[["render",c]]);export{C as __pageData,d as default};