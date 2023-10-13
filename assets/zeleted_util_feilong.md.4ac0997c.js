import{_ as t,o as e,c as l,Q as o}from"./chunks/framework.8048b864.js";const E=JSON.parse('{"title":"Feilong","description":"","frontmatter":{},"headers":[],"relativePath":"zeleted/util/feilong.md","filePath":"zeleted/util/feilong.md","lastUpdated":1697176108000}'),a={name:"zeleted/util/feilong.md"},n=o(`<h1 id="feilong" tabindex="-1">Feilong <a class="header-anchor" href="#feilong" aria-label="Permalink to &quot;Feilong&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#功能">功能</a></li><li><a href="#使用">使用</a></li></ul></nav><blockquote><p>官网地址：<a href="http://feilong-core.mydoc.io/" target="_blank" rel="noreferrer">http://feilong-core.mydoc.io/</a></p><p>Github：<a href="https://github.com/ifeilong/feilong" target="_blank" rel="noreferrer">https://github.com/ifeilong/feilong</a> 码云Gitee：<a href="https://gitee.com/ifeilong/feilong" target="_blank" rel="noreferrer">https://gitee.com/ifeilong/feilong</a></p></blockquote><h2 id="功能" tabindex="-1">功能 <a class="header-anchor" href="#功能" aria-label="Permalink to &quot;功能&quot;">​</a></h2><h4 id="feilong简介" tabindex="-1">feilong简介 <a class="header-anchor" href="#feilong简介" aria-label="Permalink to &quot;feilong简介&quot;">​</a></h4><blockquote><p>Reduce development, Release ideas (灵感从重复简单的代码中释放出来)</p><ol><li>从大量重复的底层代码中脱身,提高工作效率;</li><li>让代码更简炼，易写、易读、易于维护;</li></ol></blockquote><h4 id="feilong-优点" tabindex="-1">feilong 优点 <a class="header-anchor" href="#feilong-优点" aria-label="Permalink to &quot;feilong 优点&quot;">​</a></h4><blockquote><ol><li>有常用的工具类 (如 处理日期的 <code>DateUtil</code>,处理 集合 的 CollectionsUtil 等)</li><li>有常用的JAVA常量类 (如日期格式 <code>DatePattern</code>, 时间间隔 TimeInterval 等)</li><li>不必要的<code>Exception</code> 转成了<code>RuntimeException</code>,减少不必要的代码</li><li>国内中文注释最完善的API</li><li>有完善的单元测试</li></ol></blockquote><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h2><blockquote><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;com.github.ifeilong&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;feilong&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;3.0.6&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;com.github.ifeilong&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;feilong&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;3.0.6&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></blockquote><h4 id="项目模块" tabindex="-1">项目模块 <a class="header-anchor" href="#项目模块" aria-label="Permalink to &quot;项目模块&quot;">​</a></h4><table><thead><tr><th>module</th><th>描述</th></tr></thead><tbody><tr><td>feilong-core</td><td>核心包</td></tr><tr><td>feilong-validator</td><td>常用的校验, 包含可配置式的手机号码, 邮编等等</td></tr><tr><td>feilong-json</td><td>json format以及tobean toMap等常见操作</td></tr><tr><td>feilong-io</td><td>文件常见操作</td></tr><tr><td>feilong-servlet</td><td>基于http servlet 的封装,含常见request,response操作快捷封装</td></tr><tr><td>feilong-accessor</td><td>便捷式使用session ,cookie</td></tr><tr><td>feilong-formatter</td><td>将Map,bean,list format成友好形式</td></tr><tr><td>feilong-net-http</td><td>http封装操作</td></tr><tr><td>feilong-net-jsoup</td><td>jsoup操作</td></tr><tr><td>feilong-net-filetransfer</td><td>ftp/sftp操作</td></tr><tr><td>feilong-template</td><td>模板操作,如velocity</td></tr><tr><td>feilong-net-mail</td><td>发送邮件,接收邮件操作</td></tr><tr><td>feilong-net-cxf</td><td>cxf操作</td></tr><tr><td>feilong-xml</td><td>xml format以及tobean toMap等常见操作</td></tr><tr><td>feilong-security</td><td>加密解密操作</td></tr><tr><td>feilong-context</td><td>上下文操作</td></tr><tr><td>feilong-namespace</td><td>可以spring xml 来配置的便捷操作</td></tr><tr><td>feilong-taglib</td><td>jsp 自定义标签</td></tr><tr><td>feilong-tools</td><td>可用性操作</td></tr><tr><td>feilong-office-csv</td><td>csv生成操作</td></tr><tr><td>feilong-office-excel</td><td>excel操作,xml配置式来生成和读取excel文件</td></tr><tr><td>feilong-office-zip</td><td>压缩解压缩操作</td></tr><tr><td>feilong-component</td><td>组件式操作,含配置式即可获取数据--&gt;转成excel--&gt;打成zip压缩包--&gt;发送邮件</td></tr><tr><td>feilong</td><td>一体化total jar包,包含上述所有功能</td></tr><tr><td>feilong-with-optional</td><td>一体化total jar包,包含上述所有功能,且包含所有optional jar依赖</td></tr></tbody></table>`,12),s=[n];function r(i,d,p,c,g,f){return e(),l("div",null,s)}const y=t(a,[["render",r]]);export{E as __pageData,y as default};
