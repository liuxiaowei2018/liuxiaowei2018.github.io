import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.8048b864.js";const p="/assets/image-20220410210134400.7b90b39c.png",A=JSON.parse('{"title":"SpringCloudGateway","description":"","frontmatter":{},"headers":[],"relativePath":"second/cloud/springCloudGateway.md","filePath":"second/cloud/springCloudGateway.md","lastUpdated":1697536192000}'),o={name:"second/cloud/springCloudGateway.md"},e=l('<h1 id="springcloudgateway" tabindex="-1">SpringCloudGateway <a class="header-anchor" href="#springcloudgateway" aria-label="Permalink to &quot;SpringCloudGateway&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#_1、入门">1、入门</a></li><li><a href="#_2、应用">2、应用</a><ul><li><a href="#swagger聚合文档">swagger聚合文档</a></li><li><a href="#nacos动态路由">nacos动态路由</a></li></ul></li></ul></nav><h2 id="_1、入门" tabindex="-1">1、入门 <a class="header-anchor" href="#_1、入门" aria-label="Permalink to &quot;1、入门&quot;">​</a></h2><h2 id="_2、应用" tabindex="-1">2、应用 <a class="header-anchor" href="#_2、应用" aria-label="Permalink to &quot;2、应用&quot;">​</a></h2><h3 id="swagger聚合文档" tabindex="-1">swagger聚合文档 <a class="header-anchor" href="#swagger聚合文档" aria-label="Permalink to &quot;swagger聚合文档&quot;">​</a></h3><blockquote><p>访问地址: localhost:8080/doc.html [8080为网关端口]</p></blockquote><h5 id="创建swagger-starter" tabindex="-1">创建swagger-starter <a class="header-anchor" href="#创建swagger-starter" aria-label="Permalink to &quot;创建swagger-starter&quot;">​</a></h5><p>目录结构如下：</p><p><img src="'+p+`" alt="image-20220410210134400"></p><blockquote><p><code>添加依赖</code></p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!--swagger--&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;io.springfox&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;springfox-boot-starter&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!--swagger-ui--&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;com.github.xiaoymin&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;swagger-bootstrap-ui&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!--swagger--&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;io.springfox&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;springfox-boot-starter&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!--swagger-ui--&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;com.github.xiaoymin&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;swagger-bootstrap-ui&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p><code>自动配置类配置Swagger</code></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Data</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">ConfigurationProperties</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">prefix</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> SwaggerProperties.PREFIX)</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">EnableConfigurationProperties</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SwaggerProperties</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String PREFIX</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;spring.swagger&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//包</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String basePackage;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//作者相关信息</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Author author;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//API的相关信息</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> ApiInfo apiInfo;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Data</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ApiInfo</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  String title;</span></span>
<span class="line"><span style="color:#E1E4E8;">  String description;</span></span>
<span class="line"><span style="color:#E1E4E8;">  String version;</span></span>
<span class="line"><span style="color:#E1E4E8;">  String termsOfServiceUrl;</span></span>
<span class="line"><span style="color:#E1E4E8;">  String license;</span></span>
<span class="line"><span style="color:#E1E4E8;">  String licenseUrl;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Data</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Author</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String email;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String url;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Data</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">ConfigurationProperties</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">prefix</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> SwaggerProperties.PREFIX)</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">EnableConfigurationProperties</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SwaggerProperties</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String PREFIX</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;spring.swagger&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//包</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String basePackage;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//作者相关信息</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Author author;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//API的相关信息</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> ApiInfo apiInfo;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Data</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ApiInfo</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  String title;</span></span>
<span class="line"><span style="color:#24292E;">  String description;</span></span>
<span class="line"><span style="color:#24292E;">  String version;</span></span>
<span class="line"><span style="color:#24292E;">  String termsOfServiceUrl;</span></span>
<span class="line"><span style="color:#24292E;">  String license;</span></span>
<span class="line"><span style="color:#24292E;">  String licenseUrl;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Data</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Author</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String name;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String email;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String url;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Swagger的配置分为如下部分：</p><ol><li>API文档基本信息配置</li><li>授权信息配置（基于OAuth2的认证配置）</li></ol></blockquote><h5 id="微服务依赖swagger-starter" tabindex="-1">微服务依赖swagger-starter <a class="header-anchor" href="#微服务依赖swagger-starter" aria-label="Permalink to &quot;微服务依赖swagger-starter&quot;">​</a></h5><blockquote><p><code>pom.xml</code></p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;com.open&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;swagger-starter&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;com.open&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;swagger-starter&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p><code>application.yml</code></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">spring</span><span style="color:#E1E4E8;">:  </span></span>
<span class="line"><span style="color:#85E89D;">swagger</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#85E89D;">basePackage</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">com.open.member.controller</span></span>
<span class="line"><span style="color:#85E89D;">apiInfo</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">title</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">会员中心</span></span>
<span class="line"><span style="color:#85E89D;">description</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">会员中心文档</span></span>
<span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1.0</span></span>
<span class="line"><span style="color:#85E89D;">author</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">xxx</span></span>
<span class="line"><span style="color:#85E89D;">email</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">xxx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">spring</span><span style="color:#24292E;">:  </span></span>
<span class="line"><span style="color:#22863A;">swagger</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#22863A;">basePackage</span><span style="color:#24292E;">: </span><span style="color:#032F62;">com.open.member.controller</span></span>
<span class="line"><span style="color:#22863A;">apiInfo</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">title</span><span style="color:#24292E;">: </span><span style="color:#032F62;">会员中心</span></span>
<span class="line"><span style="color:#22863A;">description</span><span style="color:#24292E;">: </span><span style="color:#032F62;">会员中心文档</span></span>
<span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1.0</span></span>
<span class="line"><span style="color:#22863A;">author</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">xxx</span></span>
<span class="line"><span style="color:#22863A;">email</span><span style="color:#24292E;">: </span><span style="color:#032F62;">xxx</span></span></code></pre></div></blockquote><h5 id="网关聚合" tabindex="-1">网关聚合 <a class="header-anchor" href="#网关聚合" aria-label="Permalink to &quot;网关聚合&quot;">​</a></h5><blockquote><p><code>pom.xml</code></p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!--swagger--&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;io.springfox&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;springfox-boot-starter&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;com.github.xiaoymin&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;swagger-bootstrap-ui&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!--swagger--&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;io.springfox&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;springfox-boot-starter&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;com.github.xiaoymin&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;swagger-bootstrap-ui&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p><code>GatewaySwaggerResourcesProvider.java</code></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> com.open.gateway.swagger;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.beans.factory.annotation.Value;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.cloud.gateway.route.RouteLocator;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.context.annotation.Primary;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.stereotype.Component;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> springfox.documentation.swagger.web.SwaggerResource;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> springfox.documentation.swagger.web.SwaggerResourcesProvider;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> javax.annotation.Resource;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.ArrayList;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.HashSet;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.List;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.Set;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">* </span><span style="color:#F97583;">@author</span><span style="color:#6A737D;"> liuxiaowei</span></span>
<span class="line"><span style="color:#6A737D;">* @date 2022年03月16日 22:50</span></span>
<span class="line"><span style="color:#6A737D;">* @Description swagger配置</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Primary</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">GatewaySwaggerResourcesProvider</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SwaggerResourcesProvider</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String SWAGGER2URL </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/v2/api-docs&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#F97583;">Resource</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> RouteLocator routeLocator;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#F97583;">Value</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;\${spring.application.name}&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String application;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> List&lt;</span><span style="color:#F97583;">SwaggerResource</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      List&lt;</span><span style="color:#F97583;">SwaggerResource</span><span style="color:#E1E4E8;">&gt; resources </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">      List&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; routeHosts </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 获取所有可用的host：serviceId</span></span>
<span class="line"><span style="color:#E1E4E8;">      routeLocator.</span><span style="color:#B392F0;">getRoutes</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(route </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> route.</span><span style="color:#B392F0;">getUri</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getHost</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">              .</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(route </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">application.</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(route.</span><span style="color:#B392F0;">getUri</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getHost</span><span style="color:#E1E4E8;">()))</span></span>
<span class="line"><span style="color:#E1E4E8;">              .</span><span style="color:#B392F0;">subscribe</span><span style="color:#E1E4E8;">(route </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> routeHosts.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(route.</span><span style="color:#B392F0;">getUri</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getHost</span><span style="color:#E1E4E8;">()));</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 记录已经添加过的server</span></span>
<span class="line"><span style="color:#E1E4E8;">      Set&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; delayed </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> HashSet&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">      routeHosts.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(instance </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 拼接url</span></span>
<span class="line"><span style="color:#E1E4E8;">          String url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> instance.</span><span style="color:#B392F0;">toLowerCase</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> SWAGGER2URL;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">delayed.</span><span style="color:#B392F0;">contains</span><span style="color:#E1E4E8;">(url)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">              delayed.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(url);</span></span>
<span class="line"><span style="color:#E1E4E8;">              SwaggerResource swaggerResource </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SwaggerResource</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">              swaggerResource.</span><span style="color:#B392F0;">setUrl</span><span style="color:#E1E4E8;">(url);</span></span>
<span class="line"><span style="color:#E1E4E8;">              swaggerResource.</span><span style="color:#B392F0;">setName</span><span style="color:#E1E4E8;">(instance);</span></span>
<span class="line"><span style="color:#E1E4E8;">              resources.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(swaggerResource);</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">      });</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> resources;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> com.open.gateway.swagger;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.beans.factory.annotation.Value;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.cloud.gateway.route.RouteLocator;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.context.annotation.Primary;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.stereotype.Component;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> springfox.documentation.swagger.web.SwaggerResource;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> springfox.documentation.swagger.web.SwaggerResourcesProvider;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> javax.annotation.Resource;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.ArrayList;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.HashSet;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.List;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.Set;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">* </span><span style="color:#D73A49;">@author</span><span style="color:#6A737D;"> liuxiaowei</span></span>
<span class="line"><span style="color:#6A737D;">* @date 2022年03月16日 22:50</span></span>
<span class="line"><span style="color:#6A737D;">* @Description swagger配置</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Primary</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">GatewaySwaggerResourcesProvider</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SwaggerResourcesProvider</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String SWAGGER2URL </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/v2/api-docs&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#D73A49;">Resource</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> RouteLocator routeLocator;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#D73A49;">Value</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;\${spring.application.name}&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String application;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> List&lt;</span><span style="color:#D73A49;">SwaggerResource</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      List&lt;</span><span style="color:#D73A49;">SwaggerResource</span><span style="color:#24292E;">&gt; resources </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">      List&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; routeHosts </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 获取所有可用的host：serviceId</span></span>
<span class="line"><span style="color:#24292E;">      routeLocator.</span><span style="color:#6F42C1;">getRoutes</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(route </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> route.</span><span style="color:#6F42C1;">getUri</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getHost</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">              .</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(route </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">application.</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(route.</span><span style="color:#6F42C1;">getUri</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getHost</span><span style="color:#24292E;">()))</span></span>
<span class="line"><span style="color:#24292E;">              .</span><span style="color:#6F42C1;">subscribe</span><span style="color:#24292E;">(route </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> routeHosts.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(route.</span><span style="color:#6F42C1;">getUri</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getHost</span><span style="color:#24292E;">()));</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 记录已经添加过的server</span></span>
<span class="line"><span style="color:#24292E;">      Set&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; delayed </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> HashSet&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">      routeHosts.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(instance </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 拼接url</span></span>
<span class="line"><span style="color:#24292E;">          String url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> instance.</span><span style="color:#6F42C1;">toLowerCase</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> SWAGGER2URL;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">delayed.</span><span style="color:#6F42C1;">contains</span><span style="color:#24292E;">(url)) {</span></span>
<span class="line"><span style="color:#24292E;">              delayed.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(url);</span></span>
<span class="line"><span style="color:#24292E;">              SwaggerResource swaggerResource </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SwaggerResource</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">              swaggerResource.</span><span style="color:#6F42C1;">setUrl</span><span style="color:#24292E;">(url);</span></span>
<span class="line"><span style="color:#24292E;">              swaggerResource.</span><span style="color:#6F42C1;">setName</span><span style="color:#24292E;">(instance);</span></span>
<span class="line"><span style="color:#24292E;">              resources.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(swaggerResource);</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">      });</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> resources;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></blockquote><h3 id="nacos动态路由" tabindex="-1">nacos动态路由 <a class="header-anchor" href="#nacos动态路由" aria-label="Permalink to &quot;nacos动态路由&quot;">​</a></h3>`,15),t=[e];function r(c,E,y,i,g,d){return a(),n("div",null,t)}const F=s(o,[["render",r]]);export{A as __pageData,F as default};
