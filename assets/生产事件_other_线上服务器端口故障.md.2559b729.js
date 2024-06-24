import{_ as s,o as a,c as l,Q as p}from"./chunks/framework.8048b864.js";const g=JSON.parse('{"title":"生产事件","description":"","frontmatter":{},"headers":[],"relativePath":"生产事件/other/线上服务器端口故障.md","filePath":"生产事件/other/线上服务器端口故障.md","lastUpdated":1719037022000}'),e={name:"生产事件/other/线上服务器端口故障.md"},o=p('<h1 id="生产事件" tabindex="-1">生产事件 <a class="header-anchor" href="#生产事件" aria-label="Permalink to &quot;生产事件&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#_1、线上服务器端口故障">1、线上服务器端口故障</a><ul><li><a href="#_1-1、问题描述">1.1、问题描述</a></li><li><a href="#_1-2、问题定位">1.2、问题定位</a></li><li><a href="#_1-3、解决方案">1.3、解决方案</a></li></ul></li></ul></nav><h2 id="_1、线上服务器端口故障" tabindex="-1">1、线上服务器端口故障 <a class="header-anchor" href="#_1、线上服务器端口故障" aria-label="Permalink to &quot;1、线上服务器端口故障&quot;">​</a></h2><h3 id="_1-1、问题描述" tabindex="-1">1.1、问题描述 <a class="header-anchor" href="#_1-1、问题描述" aria-label="Permalink to &quot;1.1、问题描述&quot;">​</a></h3><blockquote><p>1.服务器可以ping 百度</p><p>2.外网不能访问 服务器资源</p><p>3.防火墙是关的,端口安全组是开的</p><p>4.内部服务是以docker形式部署</p></blockquote><h3 id="_1-2、问题定位" tabindex="-1">1.2、问题定位 <a class="header-anchor" href="#_1-2、问题定位" aria-label="Permalink to &quot;1.2、问题定位&quot;">​</a></h3><p>0.外部服务访问(80端口为过滤状态,猜测有东西拦截)</p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405292208615.png" alt="image-20221202194109308"></p><p>1.本机查看服务器端口(又发现是正常的)</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">netstat</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-tunlp</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">netstat</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-tunlp</span></span></code></pre></div><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405292208455.png" alt="image-20221202194227091"></p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405292208384.png" alt="image-20221202194238263"></p><p>2.查看服务器端口规则(都是正常的)</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">iptables</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-L</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">iptables</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-L</span></span></code></pre></div><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405292208391.png" alt="image-20221202194337472"></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">iptables</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-I</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">INPUT</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tcp</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--dport</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-j</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ACCEPT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">iptables</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-I</span><span style="color:#24292E;"> </span><span style="color:#032F62;">INPUT</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tcp</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--dport</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">80</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-j</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ACCEPT</span></span></code></pre></div><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405292208239.png" alt="image-20221202194405734"></p><p>3.查看linux是否开启内网转发</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/sysctl.conf</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">forward</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">cat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/sysctl.conf</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#032F62;">forward</span></span></code></pre></div><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405292208064.png" alt="image-20221202194559701"></p><blockquote><p>找到问题了 !</p></blockquote><p><code>服务器配置错误</code></p><h3 id="_1-3、解决方案" tabindex="-1">1.3、解决方案 <a class="header-anchor" href="#_1-3、解决方案" aria-label="Permalink to &quot;1.3、解决方案&quot;">​</a></h3><blockquote><p>vim /etc/sysctl.conf</p><p>将参数改为1</p><p>sysctl -p</p><p>刷新配置</p></blockquote>',24),n=[o];function t(c,r,i,d,h,y){return a(),l("div",null,n)}const u=s(e,[["render",t]]);export{g as __pageData,u as default};
