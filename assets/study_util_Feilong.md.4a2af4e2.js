import{_ as t,c as e,o,a as l}from"./app.91d57d2c.js";const F=JSON.parse('{"title":"Feilong","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u529F\u80FD","slug":"\u529F\u80FD","link":"#\u529F\u80FD","children":[]},{"level":2,"title":"\u4F7F\u7528","slug":"\u4F7F\u7528","link":"#\u4F7F\u7528","children":[]}],"relativePath":"study/util/Feilong.md"}'),n={name:"study/util/Feilong.md"},a=l(`<h1 id="feilong" tabindex="-1">Feilong <a class="header-anchor" href="#feilong" aria-hidden="true">#</a></h1><blockquote><p>\u5B98\u7F51\u5730\u5740\uFF1A<a href="http://feilong-core.mydoc.io/" target="_blank" rel="noreferrer">http://feilong-core.mydoc.io/</a></p><p>Github\uFF1A<a href="https://github.com/ifeilong/feilong" target="_blank" rel="noreferrer">https://github.com/ifeilong/feilong</a> \u7801\u4E91Gitee\uFF1A<a href="https://gitee.com/ifeilong/feilong" target="_blank" rel="noreferrer">https://gitee.com/ifeilong/feilong</a></p></blockquote><h2 id="\u529F\u80FD" tabindex="-1">\u529F\u80FD <a class="header-anchor" href="#\u529F\u80FD" aria-hidden="true">#</a></h2><h4 id="feilong\u7B80\u4ECB" tabindex="-1">feilong\u7B80\u4ECB <a class="header-anchor" href="#feilong\u7B80\u4ECB" aria-hidden="true">#</a></h4><blockquote><p>Reduce development, Release ideas (\u7075\u611F\u4ECE\u91CD\u590D\u7B80\u5355\u7684\u4EE3\u7801\u4E2D\u91CA\u653E\u51FA\u6765)</p><ol><li>\u4ECE\u5927\u91CF\u91CD\u590D\u7684\u5E95\u5C42\u4EE3\u7801\u4E2D\u8131\u8EAB,\u63D0\u9AD8\u5DE5\u4F5C\u6548\u7387;</li><li>\u8BA9\u4EE3\u7801\u66F4\u7B80\u70BC\uFF0C\u6613\u5199\u3001\u6613\u8BFB\u3001\u6613\u4E8E\u7EF4\u62A4;</li></ol></blockquote><h4 id="feilong-\u4F18\u70B9" tabindex="-1">feilong \u4F18\u70B9 <a class="header-anchor" href="#feilong-\u4F18\u70B9" aria-hidden="true">#</a></h4><blockquote><ol><li>\u6709\u5E38\u7528\u7684\u5DE5\u5177\u7C7B (\u5982 \u5904\u7406\u65E5\u671F\u7684 <code>DateUtil</code>,\u5904\u7406 \u96C6\u5408 \u7684 CollectionsUtil \u7B49)</li><li>\u6709\u5E38\u7528\u7684JAVA\u5E38\u91CF\u7C7B (\u5982\u65E5\u671F\u683C\u5F0F <code>DatePattern</code>, \u65F6\u95F4\u95F4\u9694 TimeInterval \u7B49)</li><li>\u4E0D\u5FC5\u8981\u7684<code>Exception</code> \u8F6C\u6210\u4E86<code>RuntimeException</code>,\u51CF\u5C11\u4E0D\u5FC5\u8981\u7684\u4EE3\u7801</li><li>\u56FD\u5185\u4E2D\u6587\u6CE8\u91CA\u6700\u5B8C\u5584\u7684API</li><li>\u6709\u5B8C\u5584\u7684\u5355\u5143\u6D4B\u8BD5</li></ol></blockquote><h2 id="\u4F7F\u7528" tabindex="-1">\u4F7F\u7528 <a class="header-anchor" href="#\u4F7F\u7528" aria-hidden="true">#</a></h2><blockquote><div class="language-xml"><button class="copy"></button><span class="lang">xml</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">com.github.ifeilong</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">feilong</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">3.0.6</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div></blockquote><h4 id="\u9879\u76EE\u6A21\u5757" tabindex="-1">\u9879\u76EE\u6A21\u5757 <a class="header-anchor" href="#\u9879\u76EE\u6A21\u5757" aria-hidden="true">#</a></h4><table><thead><tr><th>module</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>feilong-core</td><td>\u6838\u5FC3\u5305</td></tr><tr><td>feilong-validator</td><td>\u5E38\u7528\u7684\u6821\u9A8C, \u5305\u542B\u53EF\u914D\u7F6E\u5F0F\u7684\u624B\u673A\u53F7\u7801, \u90AE\u7F16\u7B49\u7B49</td></tr><tr><td>feilong-json</td><td>json format\u4EE5\u53CAtobean toMap\u7B49\u5E38\u89C1\u64CD\u4F5C</td></tr><tr><td>feilong-io</td><td>\u6587\u4EF6\u5E38\u89C1\u64CD\u4F5C</td></tr><tr><td>feilong-servlet</td><td>\u57FA\u4E8Ehttp servlet \u7684\u5C01\u88C5,\u542B\u5E38\u89C1request,response\u64CD\u4F5C\u5FEB\u6377\u5C01\u88C5</td></tr><tr><td>feilong-accessor</td><td>\u4FBF\u6377\u5F0F\u4F7F\u7528session ,cookie</td></tr><tr><td>feilong-formatter</td><td>\u5C06Map,bean,list format\u6210\u53CB\u597D\u5F62\u5F0F</td></tr><tr><td>feilong-net-http</td><td>http\u5C01\u88C5\u64CD\u4F5C</td></tr><tr><td>feilong-net-jsoup</td><td>jsoup\u64CD\u4F5C</td></tr><tr><td>feilong-net-filetransfer</td><td>ftp/sftp\u64CD\u4F5C</td></tr><tr><td>feilong-template</td><td>\u6A21\u677F\u64CD\u4F5C,\u5982velocity</td></tr><tr><td>feilong-net-mail</td><td>\u53D1\u9001\u90AE\u4EF6,\u63A5\u6536\u90AE\u4EF6\u64CD\u4F5C</td></tr><tr><td>feilong-net-cxf</td><td>cxf\u64CD\u4F5C</td></tr><tr><td>feilong-xml</td><td>xml format\u4EE5\u53CAtobean toMap\u7B49\u5E38\u89C1\u64CD\u4F5C</td></tr><tr><td>feilong-security</td><td>\u52A0\u5BC6\u89E3\u5BC6\u64CD\u4F5C</td></tr><tr><td>feilong-context</td><td>\u4E0A\u4E0B\u6587\u64CD\u4F5C</td></tr><tr><td>feilong-namespace</td><td>\u53EF\u4EE5spring xml \u6765\u914D\u7F6E\u7684\u4FBF\u6377\u64CD\u4F5C</td></tr><tr><td>feilong-taglib</td><td>jsp \u81EA\u5B9A\u4E49\u6807\u7B7E</td></tr><tr><td>feilong-tools</td><td>\u53EF\u7528\u6027\u64CD\u4F5C</td></tr><tr><td>feilong-office-csv</td><td>csv\u751F\u6210\u64CD\u4F5C</td></tr><tr><td>feilong-office-excel</td><td>excel\u64CD\u4F5C,xml\u914D\u7F6E\u5F0F\u6765\u751F\u6210\u548C\u8BFB\u53D6excel\u6587\u4EF6</td></tr><tr><td>feilong-office-zip</td><td>\u538B\u7F29\u89E3\u538B\u7F29\u64CD\u4F5C</td></tr><tr><td>feilong-component</td><td>\u7EC4\u4EF6\u5F0F\u64CD\u4F5C,\u542B\u914D\u7F6E\u5F0F\u5373\u53EF\u83B7\u53D6\u6570\u636E--&gt;\u8F6C\u6210excel--&gt;\u6253\u6210zip\u538B\u7F29\u5305--&gt;\u53D1\u9001\u90AE\u4EF6</td></tr><tr><td>feilong</td><td>\u4E00\u4F53\u5316total jar\u5305,\u5305\u542B\u4E0A\u8FF0\u6240\u6709\u529F\u80FD</td></tr><tr><td>feilong-with-optional</td><td>\u4E00\u4F53\u5316total jar\u5305,\u5305\u542B\u4E0A\u8FF0\u6240\u6709\u529F\u80FD,\u4E14\u5305\u542B\u6240\u6709optional jar\u4F9D\u8D56</td></tr></tbody></table>`,11),s=[a];function r(d,i,c,p,f,g){return o(),e("div",null,s)}const D=t(n,[["render",r]]);export{F as __pageData,D as default};
