import{_ as s,c as n,o as a,a as l}from"./app.1af635ee.js";const d=JSON.parse('{"title":"Nginx","description":"","frontmatter":{},"headers":[{"level":2,"title":"Nginx\u4F7F\u7528\u573A\u666F","slug":"nginx\u4F7F\u7528\u573A\u666F","link":"#nginx\u4F7F\u7528\u573A\u666F","children":[]},{"level":2,"title":"Nginx\u76EE\u5F55\u4FE1\u606F","slug":"nginx\u76EE\u5F55\u4FE1\u606F","link":"#nginx\u76EE\u5F55\u4FE1\u606F","children":[]},{"level":2,"title":"Nginx \u5E38\u7528\u547D\u4EE4","slug":"nginx-\u5E38\u7528\u547D\u4EE4","link":"#nginx-\u5E38\u7528\u547D\u4EE4","children":[]},{"level":2,"title":"Nginx\u5168\u5C40\u914D\u7F6E","slug":"nginx\u5168\u5C40\u914D\u7F6E","link":"#nginx\u5168\u5C40\u914D\u7F6E","children":[]},{"level":2,"title":"Nginx \u914D\u7F6E\u4EE3\u7801","slug":"nginx-\u914D\u7F6E\u4EE3\u7801","link":"#nginx-\u914D\u7F6E\u4EE3\u7801","children":[]}],"relativePath":"second/server/Nginx.md"}'),p={name:"second/server/Nginx.md"},e=l(`<h1 id="nginx" tabindex="-1">Nginx <a class="header-anchor" href="#nginx" aria-hidden="true">#</a></h1><h2 id="nginx\u4F7F\u7528\u573A\u666F" tabindex="-1">Nginx\u4F7F\u7528\u573A\u666F <a class="header-anchor" href="#nginx\u4F7F\u7528\u573A\u666F" aria-hidden="true">#</a></h2><blockquote><ol><li>\u9759\u6001\u8D44\u6E90\u670D\u52A1\uFF0C\u901A\u8FC7\u672C\u5730\u6587\u4EF6\u7CFB\u7EDF\u63D0\u4F9B\u670D\u52A1\uFF1B</li><li>\u53CD\u5411\u4EE3\u7406\u670D\u52A1\uFF0C\u5EF6\u4F38\u51FA\u5305\u62EC\u7F13\u5B58\u3001\u8D1F\u8F7D\u5747\u8861\u7B49\uFF1B</li><li><code>API</code> \u670D\u52A1\uFF0C <code>OpenResty</code> \uFF1B</li></ol></blockquote><h2 id="nginx\u76EE\u5F55\u4FE1\u606F" tabindex="-1">Nginx\u76EE\u5F55\u4FE1\u606F <a class="header-anchor" href="#nginx\u76EE\u5F55\u4FE1\u606F" aria-hidden="true">#</a></h2><blockquote><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;"># Nginx\u914D\u7F6E\u6587\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">/etc/nginx/nginx.conf # nginx \u4E3B\u914D\u7F6E\u6587\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">/etc/nginx/nginx.conf.default</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u53EF\u6267\u884C\u7A0B\u5E8F\u6587\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/bin/nginx-upgrade</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/sbin/nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># nginx\u5E93\u6587\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/lib/systemd/system/nginx.service # \u7528\u4E8E\u914D\u7F6E\u7CFB\u7EDF\u5B88\u62A4\u8FDB\u7A0B</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/lib64/nginx/modules # Nginx\u6A21\u5757\u76EE\u5F55</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u5E2E\u52A9\u6587\u6863</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/doc/nginx-1.16.1</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/doc/nginx-1.16.1/CHANGES</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/doc/nginx-1.16.1/README</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/doc/nginx-1.16.1/README.dynamic</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/doc/nginx-1.16.1/UPGRADE-NOTES-1.6-to-1.10</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u9759\u6001\u8D44\u6E90\u76EE\u5F55</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/nginx/html/404.html</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/nginx/html/50x.html</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/nginx/html/index.html</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u5B58\u653ENginx\u65E5\u5FD7\u6587\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">/var/log/nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ol><li><code>/etc/nginx/conf.d/</code> \u662F\u5B50\u914D\u7F6E\u9879\u5B58\u653E\u5904\uFF0C <code>/etc/nginx/nginx.conf</code> \u4E3B\u914D\u7F6E\u6587\u4EF6\u4F1A\u9ED8\u8BA4\u628A\u8FD9\u4E2A\u6587\u4EF6\u5939\u4E2D\u6240\u6709\u5B50\u914D\u7F6E\u9879\u90FD\u5F15\u5165\uFF1B</li><li><code>/usr/share/nginx/html/</code> \u9759\u6001\u6587\u4EF6\u90FD\u653E\u5728\u8FD9\u4E2A\u6587\u4EF6\u5939\uFF0C\u4E5F\u53EF\u4EE5\u6839\u636E\u4F60\u81EA\u5DF1\u7684\u4E60\u60EF\u653E\u5728\u5176\u4ED6\u5730\u65B9\uFF1B</li></ol></blockquote><h2 id="nginx-\u5E38\u7528\u547D\u4EE4" tabindex="-1">Nginx \u5E38\u7528\u547D\u4EE4 <a class="header-anchor" href="#nginx-\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a></h2><blockquote><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;"># \u5F00\u673A\u914D\u7F6E</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl enable nginx # \u5F00\u673A\u81EA\u52A8\u542F\u52A8</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl disable nginx # \u5173\u95ED\u5F00\u673A\u81EA\u52A8\u542F\u52A8</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u542F\u52A8Nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl start nginx # \u542F\u52A8Nginx\u6210\u529F\u540E\uFF0C\u53EF\u4EE5\u76F4\u63A5\u8BBF\u95EE\u4E3B\u673AIP\uFF0C\u6B64\u65F6\u4F1A\u5C55\u793ANginx\u9ED8\u8BA4\u9875\u9762</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u505C\u6B62Nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl stop nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u91CD\u542FNginx</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl restart nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u91CD\u65B0\u52A0\u8F7DNginx</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl reload nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u67E5\u770B Nginx \u8FD0\u884C\u72B6\u6001</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl status nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u67E5\u770BNginx\u8FDB\u7A0B</span></span>
<span class="line"><span style="color:#A6ACCD;">ps -ef | grep nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u6740\u6B7BNginx\u8FDB\u7A0B</span></span>
<span class="line"><span style="color:#A6ACCD;">kill -9 pid # \u6839\u636E\u4E0A\u9762\u67E5\u770B\u5230\u7684Nginx\u8FDB\u7A0B\u53F7\uFF0C\u6740\u6B7BNginx\u8FDB\u7A0B\uFF0C-9 \u8868\u793A\u5F3A\u5236\u7ED3\u675F\u8FDB\u7A0B</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -s reload  # \u5411\u4E3B\u8FDB\u7A0B\u53D1\u9001\u4FE1\u53F7\uFF0C\u91CD\u65B0\u52A0\u8F7D\u914D\u7F6E\u6587\u4EF6\uFF0C\u70ED\u91CD\u542F</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -s reopen  # \u91CD\u542F Nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -s stop    # \u5FEB\u901F\u5173\u95ED</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -s quit    # \u7B49\u5F85\u5DE5\u4F5C\u8FDB\u7A0B\u5904\u7406\u5B8C\u6210\u540E\u5173\u95ED</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -T         # \u67E5\u770B\u5F53\u524D Nginx \u6700\u7EC8\u7684\u914D\u7F6E</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -t         # \u68C0\u67E5\u914D\u7F6E\u662F\u5426\u6709\u95EE\u9898</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></blockquote><h2 id="nginx\u5168\u5C40\u914D\u7F6E" tabindex="-1">Nginx\u5168\u5C40\u914D\u7F6E <a class="header-anchor" href="#nginx\u5168\u5C40\u914D\u7F6E" aria-hidden="true">#</a></h2><h5 id="\u6027\u80FD\u914D\u7F6E" tabindex="-1">\u6027\u80FD\u914D\u7F6E <a class="header-anchor" href="#\u6027\u80FD\u914D\u7F6E" aria-hidden="true">#</a></h5><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#A6ACCD;">#nginx.conf\u5168\u5C40\u914D\u7F6E</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">user nginx;</span></span>
<span class="line"><span style="color:#A6ACCD;">worker_processes </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">; 	#worker_processes\u8868\u793A\u5DE5\u4F5C\u8FDB\u7A0B\u4E2A\u6570\uFF0C\u503C\u8D8A\u5927nginx\u5904\u7406\u80FD\u529B\u8D8A\u5F3A</span></span>
<span class="line"><span style="color:#A6ACCD;">error_log /var/log/nginx/error.log warn; 	#\u8BB0\u5F55\u9519\u8BEF\u65E5\u5FD7\u4FE1\u606F</span></span>
<span class="line"><span style="color:#A6ACCD;">pid /var/run/nginx.pid; 	#\u8BB0\u5F55nginx\u7684\u8FDB\u7A0B\u4FE1\u606F</span></span>
<span class="line"><span style="color:#A6ACCD;">events </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;"> worker_connections 1024; #worker_connections\u503C\u8D8A\u5927\uFF0Cnginx\u5904\u7406\u8D8A\u5F3A</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h5 id="location\u8DEF\u5F84\u6620\u5C04" tabindex="-1">Location\u8DEF\u5F84\u6620\u5C04 <a class="header-anchor" href="#location\u8DEF\u5F84\u6620\u5C04" aria-hidden="true">#</a></h5><div class="language-yaml"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#676E95;">#1\u3001\u7CBE\u786E\u5339\u914D</span></span>
<span class="line"><span style="color:#C3E88D;">location = /abc {</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;">#/abc/aaa/bb \u4E0D\u5339\u914D</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;">#/abc/  \u4E0D\u5339\u914D</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;">#/Abc  \u4E0D\u5339\u914D</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;">#/abc  \u5339\u914D</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#676E95;">#2\u3001\u901A\u7528\u5339\u914D</span></span>
<span class="line"><span style="color:#C3E88D;">location /abc {</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># \u5339\u914D\u6240\u6709\u4EE5/abc\u5F00\u5934\u7684\u8BF7\u6C42</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># /abc/abb/aacc \u5339\u914D</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># /abc/  \u5339\u914D</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># /abc \u5339\u914D</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;"># /aaa/abc \u4E0D\u5339\u914D</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#676E95;">#3\u3001\u6B63\u5219\u5339\u914D</span></span>
<span class="line"><span style="color:#C3E88D;">location ~ /xxx{</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;">#\u5339\u914D\u4EE5/xxx\u5F00\u5934\u7684\uFF0C\u5E76\u4E14\u533A\u5206\u5927\u5C0F\u5199</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#C3E88D;">location ~* /xxx{</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;">#\u5339\u914D\u4EE5/xxx\u5F00\u5934\u7684\uFF0C\u5E76\u4E14\u4E0D\u533A\u5206\u5927\u5C0F\u5199</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#C3E88D;">location ^~ /images/{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#\u5339\u914D\u4EE5images\u5F00\u5934</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#C3E88D;">location ~* \\.(gif|jpg|png)$ {</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#\u5339\u914D\u4EE5.gif|.jpg|.png\u7ED3\u5C3E\u7684\u8BF7\u6C42\u7684\uFF0C\u800C\u4E14\u4E0D\u533A\u5206\u5927\u5C0F\u5199</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#676E95;">#4\u3001\u5168\u90E8\u5339\u914D</span></span>
<span class="line"><span style="color:#C3E88D;">location /{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">#\u5339\u914D\u6240\u6709</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="nginx-\u914D\u7F6E\u4EE3\u7801" tabindex="-1">Nginx \u914D\u7F6E\u4EE3\u7801 <a class="header-anchor" href="#nginx-\u914D\u7F6E\u4EE3\u7801" aria-hidden="true">#</a></h2><h5 id="\u865A\u62DF\u4E3B\u673A" tabindex="-1">\u865A\u62DF\u4E3B\u673A <a class="header-anchor" href="#\u865A\u62DF\u4E3B\u673A" aria-hidden="true">#</a></h5><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#A6ACCD;">ports:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - </span><span style="color:#F78C6C;">8081</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">8081</span><span style="color:#A6ACCD;"> #\u6307\u5B9A\u7AEF\u53E3\u53F7\u7684\u6620\u5C04</span></span>
<span class="line"><span style="color:#A6ACCD;">  - </span><span style="color:#F78C6C;">8082</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">8082</span><span style="color:#A6ACCD;"> #\u6307\u5B9A\u7AEF\u53E3\u53F7\u7684\u6620\u5C04</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">#vim /nginx/conf.d/default.conf</span></span>
<span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 8081;</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name localhost;</span></span>
<span class="line"><span style="color:#A6ACCD;">    location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">        root	/usr/share/nginx/html-8081;</span></span>
<span class="line"><span style="color:#A6ACCD;">        index 	index.html index.htm;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 8082;</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name localhost;</span></span>
<span class="line"><span style="color:#A6ACCD;">    location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">        root /usr/share/nginx/html-8082;</span></span>
<span class="line"><span style="color:#A6ACCD;">        index index.html index.htm;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">#\u5206\u522B\u4F1A\u8BBF\u95EE/usr/share/nginx/html</span><span style="color:#F78C6C;">-8081</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">8082</span><span style="color:#A6ACCD;">)\u4E0B\u7684index.html\u6587\u4EF6</span></span>
<span class="line"></span></code></pre></div><h5 id="\u4FA6\u542C\u7AEF\u53E3" tabindex="-1">\u4FA6\u542C\u7AEF\u53E3 <a class="header-anchor" href="#\u4FA6\u542C\u7AEF\u53E3" aria-hidden="true">#</a></h5><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Standard HTTP Protocol </span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80; </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Standard HTTPS Protocol </span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 443 ssl; </span></span>
<span class="line"><span style="color:#A6ACCD;">    # For http2  </span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 443 ssl http2; </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Listen on 80 using IPv6 </span></span>
<span class="line"><span style="color:#A6ACCD;">    listen [</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">:]:</span><span style="color:#F78C6C;">80</span><span style="color:#A6ACCD;">; </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Listen only on using IPv</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    listen </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">::</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">80</span><span style="color:#A6ACCD;"> ipv</span><span style="color:#F78C6C;">6</span><span style="color:#A6ACCD;">only=on;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h5 id="\u8BBF\u95EE\u65E5\u5FD7" tabindex="-1">\u8BBF\u95EE\u65E5\u5FD7 <a class="header-anchor" href="#\u8BBF\u95EE\u65E5\u5FD7" aria-hidden="true">#</a></h5><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Relative or full path to log file </span></span>
<span class="line"><span style="color:#A6ACCD;">    access_log /path/to/file.log;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Turn &#39;on&#39; or &#39;off&#39;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    access_log on;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h5 id="\u57DF\u540D" tabindex="-1">\u57DF\u540D <a class="header-anchor" href="#\u57DF\u540D" aria-hidden="true">#</a></h5><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    # Listen to yourdomain.com </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name yourdomain.com;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Listen to multiple domains  server_name yourdomain.com www.yourdomain.com; </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Listen to all domains</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name *.yourdomain.com; </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Listen to all top-level domains </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name yourdomain.*; </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Listen to unspecified Hostnames (Listens to IP address itself) </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h5 id="\u9759\u6001\u8D44\u6E90" tabindex="-1">\u9759\u6001\u8D44\u6E90 <a class="header-anchor" href="#\u9759\u6001\u8D44\u6E90" aria-hidden="true">#</a></h5><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name yourdomain.com;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    location / {      </span></span>
<span class="line"><span style="color:#A6ACCD;">        root /path/to/website; </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><h5 id="\u91CD\u5B9A\u5411" tabindex="-1">\u91CD\u5B9A\u5411 <a class="header-anchor" href="#\u91CD\u5B9A\u5411" aria-hidden="true">#</a></h5><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80;</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name www.yourdomain.com;</span></span>
<span class="line"><span style="color:#A6ACCD;">    return 301 http</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;">//yourdomain.com$request_uri;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80; </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name www.yourdomain.com; </span></span>
<span class="line"><span style="color:#A6ACCD;">    location /redirect-url { </span></span>
<span class="line"><span style="color:#A6ACCD;">    	return 301 http</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;">//otherdomain.com; </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><h5 id="\u53CD\u5411\u4EE3\u7406" tabindex="-1">\u53CD\u5411\u4EE3\u7406 <a class="header-anchor" href="#\u53CD\u5411\u4EE3\u7406" aria-hidden="true">#</a></h5><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80; </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name yourdomain.com;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #\u53CD\u5411\u4EE3\u7406\u5C06\u8BF7\u6C42\u8F6C\u53D1\u7ED93000</span></span>
<span class="line"><span style="color:#A6ACCD;">    location / {  </span></span>
<span class="line"><span style="color:#A6ACCD;">    	proxy_pass http</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;">//0.0.0.0:3000; </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><h5 id="\u8D1F\u8F7D\u5747\u8861" tabindex="-1">\u8D1F\u8F7D\u5747\u8861 <a class="header-anchor" href="#\u8D1F\u8F7D\u5747\u8861" aria-hidden="true">#</a></h5><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#A6ACCD;">\u8D1F\u8F7D\u5747\u8861\u7B56\u7565:</span></span>
<span class="line"><span style="color:#A6ACCD;">    backup\uFF1A\u70ED\u5907\uFF0C\u7B49\u4E3B\u670D\u52A1\u5668\u505C\u6B62\u5DE5\u4F5C\u4E86\uFF0C\u5907\u4EFD\u673A\u624D\u5DE5\u4F5C</span></span>
<span class="line"><span style="color:#A6ACCD;">    \u8F6E\u8BE2\uFF1A\u5C06\u5BA2\u6237\u7AEF\u7684\u8BF7\u6C42\u8F6E\u6D41\u5206\u914D\u7ED9\u4E0D\u540C\u7684\u4E3B\u673A</span></span>
<span class="line"><span style="color:#A6ACCD;">    \u6743\u91CD\uFF1A\u53EF\u4EE5\u8BBE\u7F6E\u591A\u53F0\u670D\u52A1\u5668\u7684\u63A5\u6536\u767E\u5206\u6BD4\uFF01</span></span>
<span class="line"><span style="color:#A6ACCD;">    ip_hash\uFF1A\u57FA\u4E8E\u5BA2\u6237\u7AEF\u7684ip\u8FDB\u884C\u670D\u52A1\u5668\u5206\u914D</span></span>
<span class="line"><span style="color:#A6ACCD;">    fair\uFF1A\u6839\u636E\u670D\u52A1\u5668\u7684\u8BF7\u6C42\u65F6\u95F4\u6765\u8FDB\u884C\u5206\u914D</span></span>
<span class="line"><span style="color:#A6ACCD;">    url_hash\uFF1A\u57FA\u4E8E\u8BF7\u6C42\u7684\u5730\u5740\u8FDB\u884C\u670D\u52A1\u5668\u5206\u914D</span></span>
<span class="line"></span></code></pre></div><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#A6ACCD;">#vim /nginx/conf.d/default.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">#</span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#A6ACCD;">upstream node_js </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    #\u9ED8\u8BA4nginx\u91C7\u7528\u7684\u662F\u8F6E\u8BE2\u7B56\u7565</span></span>
<span class="line"><span style="color:#A6ACCD;">    server 0.0.0.0</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">3000</span><span style="color:#A6ACCD;">; </span></span>
<span class="line"><span style="color:#A6ACCD;">    server </span><span style="color:#F78C6C;">0.0</span><span style="color:#A6ACCD;">.</span><span style="color:#F78C6C;">0.0</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">4000</span><span style="color:#A6ACCD;">; </span></span>
<span class="line"><span style="color:#A6ACCD;">    server </span><span style="color:#F78C6C;">123.131</span><span style="color:#A6ACCD;">.</span><span style="color:#F78C6C;">121.122</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span><span style="color:#F78C6C;">2</span></span>
<span class="line"><span style="color:#A6ACCD;">upstream tomcats</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    server 192.168.127.130</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">8080</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    server </span><span style="color:#F78C6C;">192.168</span><span style="color:#A6ACCD;">.</span><span style="color:#F78C6C;">127.130</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">8081</span><span style="color:#A6ACCD;"> backup; #\u70ED\u5907</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span><span style="color:#F78C6C;">3</span></span>
<span class="line"><span style="color:#A6ACCD;">upstream tomcats</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    server 192.168.127.130</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">8080</span><span style="color:#A6ACCD;"> weight=</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">; #\u6743\u91CD</span></span>
<span class="line"><span style="color:#A6ACCD;">    server </span><span style="color:#F78C6C;">192.168</span><span style="color:#A6ACCD;">.</span><span style="color:#F78C6C;">127.130</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">8081</span><span style="color:#A6ACCD;"> weight=</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span><span style="color:#F78C6C;">4</span></span>
<span class="line"><span style="color:#A6ACCD;">upstream tomcats</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    ip_hash; #ip_hash\u7B56\u7565</span></span>
<span class="line"><span style="color:#A6ACCD;">    server 192.168.127.130</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">8080</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    server </span><span style="color:#F78C6C;">192.168</span><span style="color:#A6ACCD;">.</span><span style="color:#F78C6C;">127.130</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">8081</span><span style="color:#A6ACCD;">; </span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80; </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name localhost;</span></span>
<span class="line"><span style="color:#A6ACCD;">    location / {    </span></span>
<span class="line"><span style="color:#A6ACCD;">    	proxy_pass http</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;">//node_js; </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><h5 id="ssl-\u534F\u8BAE" tabindex="-1">SSL \u534F\u8BAE <a class="header-anchor" href="#ssl-\u534F\u8BAE" aria-hidden="true">#</a></h5><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 443 ssl; </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name yourdomain.com;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ssl on; </span></span>
<span class="line"><span style="color:#A6ACCD;">    ssl_certificate /path/to/cert.pem;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ssl_certificate_key /path/to/privatekey.pem; </span></span>
<span class="line"><span style="color:#A6ACCD;">    ssl_stapling on;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ssl_stapling_verify on; </span></span>
<span class="line"><span style="color:#A6ACCD;">    ssl_trusted_certificate /path/to/fullchain.pem; </span></span>
<span class="line"><span style="color:#A6ACCD;">    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ssl_session_timeout 1h;</span></span>
<span class="line"><span style="color:#A6ACCD;">    ssl_session_cache shared</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">SSL:</span><span style="color:#F78C6C;">50</span><span style="color:#A6ACCD;">m;</span></span>
<span class="line"><span style="color:#A6ACCD;">    add_header Strict-Transport-Security max-age=</span><span style="color:#F78C6C;">15768000</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"># Permanent Redirect for HTTP to HTTPS</span></span>
<span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name yourdomain.com; </span></span>
<span class="line"><span style="color:#A6ACCD;">    return 301 https</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;">//$host$request_uri;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h5 id="\u52A8\u9759\u5206\u79BB" tabindex="-1">\u52A8\u9759\u5206\u79BB <a class="header-anchor" href="#\u52A8\u9759\u5206\u79BB" aria-hidden="true">#</a></h5><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#A6ACCD;">server</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80;</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name localhost;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    #\u4EE3\u7406\u52A8\u6001\u8D44\u6E90</span></span>
<span class="line"><span style="color:#A6ACCD;">    location /{</span></span>
<span class="line"><span style="color:#A6ACCD;">        proxy_pass http</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;">//192.168.127.130:8080;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">     #\u9759\u6001\u8D44\u6E90\u914D\u7F6E</span></span>
<span class="line"><span style="color:#A6ACCD;">    location /html </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">     	root /data;	#\u9759\u6001\u8D44\u6E90\u7684\u8DEF\u5F84</span></span>
<span class="line"><span style="color:#A6ACCD;">     	index index.html; #\u9ED8\u8BA4\u8BBF\u95EE\u7684\u8D44\u6E90</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    location /img </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">     	root /data;</span></span>
<span class="line"><span style="color:#A6ACCD;">     	autoindex on;#\u4EE5\u5217\u8868\u663E\u793A\u5F53\u524D\u76EE\u5F55\u4E0B\u7684\u6240\u6709\u56FE\u7247</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><h5 id="https" tabindex="-1">HTTPS <a class="header-anchor" href="#https" aria-hidden="true">#</a></h5><blockquote><p><strong>HTTPS \u5DE5\u4F5C\u6D41\u7A0B</strong></p><ol><li>\u5BA2\u6237\u7AEF\uFF08\u6D4F\u89C8\u5668\uFF09\u8BBF\u95EE <code>https://www.baidu.com</code> \u767E\u5EA6\u7F51\u7AD9\uFF1B</li><li>\u767E\u5EA6\u670D\u52A1\u5668\u8FD4\u56DE <code>HTTPS</code> \u4F7F\u7528\u7684 <code>CA</code> \u8BC1\u4E66\uFF1B</li><li>\u6D4F\u89C8\u5668\u9A8C\u8BC1 <code>CA</code> \u8BC1\u4E66\u662F\u5426\u4E3A\u5408\u6CD5\u8BC1\u4E66\uFF1B</li><li>\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u8BC1\u4E66\u5408\u6CD5\uFF0C\u751F\u6210\u4E00\u4E32\u968F\u673A\u6570\u5E76\u4F7F\u7528\u516C\u94A5\uFF08\u8BC1\u4E66\u4E2D\u63D0\u4F9B\u7684\uFF09\u8FDB\u884C\u52A0\u5BC6\uFF1B</li><li>\u53D1\u9001\u516C\u94A5\u52A0\u5BC6\u540E\u7684\u968F\u673A\u6570\u7ED9\u767E\u5EA6\u670D\u52A1\u5668\uFF1B</li><li>\u767E\u5EA6\u670D\u52A1\u5668\u62FF\u5230\u5BC6\u6587\uFF0C\u901A\u8FC7\u79C1\u94A5\u8FDB\u884C\u89E3\u5BC6\uFF0C\u83B7\u53D6\u5230\u968F\u673A\u6570\uFF08\u516C\u94A5\u52A0\u5BC6\uFF0C\u79C1\u94A5\u89E3\u5BC6\uFF0C\u53CD\u4E4B\u4E5F\u53EF\u4EE5\uFF09\uFF1B</li><li>\u767E\u5EA6\u670D\u52A1\u5668\u628A\u8981\u53D1\u9001\u7ED9\u6D4F\u89C8\u5668\u7684\u5185\u5BB9\uFF0C\u4F7F\u7528\u968F\u673A\u6570\u8FDB\u884C\u52A0\u5BC6\u540E\u4F20\u8F93\u7ED9\u6D4F\u89C8\u5668\uFF1B</li><li>\u6B64\u65F6\u6D4F\u89C8\u5668\u53EF\u4EE5\u4F7F\u7528\u968F\u673A\u6570\u8FDB\u884C\u89E3\u5BC6\uFF0C\u83B7\u53D6\u5230\u670D\u52A1\u5668\u7684\u771F\u5B9E\u4F20\u8F93\u5185\u5BB9\uFF1B</li></ol></blockquote><h6 id="\u914D\u7F6E\u8BC1\u4E66" tabindex="-1">\u914D\u7F6E\u8BC1\u4E66 <a class="header-anchor" href="#\u914D\u7F6E\u8BC1\u4E66" aria-hidden="true">#</a></h6><p>\u4E0B\u8F7D\u8BC1\u4E66\u7684\u538B\u7F29\u6587\u4EF6\uFF0C\u91CC\u9762\u6709\u4E2A <code>Nginx</code> \u6587\u4EF6\u5939\uFF0C\u628A <code>xxx.crt</code> \u548C <code>xxx.key</code> \u6587\u4EF6\u62F7\u8D1D\u5230\u670D\u52A1\u5668\u76EE\u5F55\uFF0C\u518D\u8FDB\u884C\u5982\u4E0B\u914D\u7F6E\uFF1A</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">server {</span></span>
<span class="line"><span style="color:#A6ACCD;">  listen 443 ssl http2 default_server;   # SSL \u8BBF\u95EE\u7AEF\u53E3\u53F7\u4E3A 443</span></span>
<span class="line"><span style="color:#A6ACCD;">  server_name lion.club;         # \u586B\u5199\u7ED1\u5B9A\u8BC1\u4E66\u7684\u57DF\u540D(\u6211\u8FD9\u91CC\u662F\u968F\u4FBF\u5199\u7684)</span></span>
<span class="line"><span style="color:#A6ACCD;">  ssl_certificate /etc/nginx/https/lion.club_bundle.crt;   # \u8BC1\u4E66\u5730\u5740</span></span>
<span class="line"><span style="color:#A6ACCD;">  ssl_certificate_key /etc/nginx/https/lion.club.key;      # \u79C1\u94A5\u5730\u5740</span></span>
<span class="line"><span style="color:#A6ACCD;">  ssl_session_timeout 10m;</span></span>
<span class="line"><span style="color:#A6ACCD;">  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # \u652F\u6301ssl\u534F\u8BAE\u7248\u672C\uFF0C\u9ED8\u8BA4\u4E3A\u540E\u4E09\u4E2A\uFF0C\u4E3B\u6D41\u7248\u672C\u662F[TLSv1.2]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">    root         /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#A6ACCD;">    index        index.html index.htm;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5982\u6B64\u914D\u7F6E\u540E\u5C31\u80FD\u6B63\u5E38\u8BBF\u95EE <code>HTTPS</code> \u7248\u7684\u7F51\u7AD9</p><h5 id="\u8DE8\u57DF-cors" tabindex="-1">\u8DE8\u57DF CORS <a class="header-anchor" href="#\u8DE8\u57DF-cors" aria-hidden="true">#</a></h5><p>\u4F8B\u5982\uFF1A</p><ul><li>\u524D\u7AEF <code>server</code> \u7684\u57DF\u540D\u4E3A\uFF1A <code>fe.server.com</code></li><li>\u540E\u7AEF\u670D\u52A1\u7684\u57DF\u540D\u4E3A\uFF1A <code>dev.server.com</code></li></ul><p>\u73B0\u5728\u6211\u5728 <code>fe.server.com</code> \u5BF9 <code>dev.server.com</code> \u53D1\u8D77\u8BF7\u6C42\u4E00\u5B9A\u4F1A\u51FA\u73B0\u8DE8\u57DF\u3002</p><p>\u73B0\u5728\u6211\u4EEC\u53EA\u9700\u8981\u542F\u52A8\u4E00\u4E2A <code>Nginx</code> \u670D\u52A1\u5668\uFF0C\u5C06 <code>server_name</code> \u8BBE\u7F6E\u4E3A <code>fe.server.com</code> \u7136\u540E\u8BBE\u7F6E\u76F8\u5E94\u7684 <code>location</code> \u4EE5\u62E6\u622A\u524D\u7AEF\u9700\u8981\u8DE8\u57DF\u7684\u8BF7\u6C42\uFF0C\u6700\u540E\u5C06\u8BF7\u6C42\u4EE3\u7406\u56DE <code>dev.server.com</code> \u3002\u5982\u4E0B\u9762\u7684\u914D\u7F6E\uFF1A</p><div class="language-nginx"><button class="copy"></button><span class="lang">nginx</span><pre><code><span class="line"><span style="color:#C792EA;">server</span><span style="color:#A6ACCD;"> { </span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> listen </span><span style="color:#A6ACCD;">     </span><span style="color:#F78C6C;">80</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> server_name </span><span style="color:#A6ACCD;"> fe.server.com</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">/ </span><span style="color:#A6ACCD;">{  </span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#89DDFF;"> proxy_pass </span><span style="color:#A6ACCD;">dev.server.com</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span></code></pre></div><p>\u8FD9\u6837\u53EF\u4EE5\u5B8C\u7F8E\u7ED5\u8FC7\u6D4F\u89C8\u5668\u7684\u540C\u6E90\u7B56\u7565\uFF1A <code>fe.server.com</code> \u8BBF\u95EE <code>Nginx</code> \u7684 <code>fe.server.com</code> \u5C5E\u4E8E\u540C\u6E90\u8BBF\u95EE\uFF0C\u800C <code>Nginx</code> \u5BF9\u670D\u52A1\u7AEF\u8F6C\u53D1\u7684\u8BF7\u6C42\u4E0D\u4F1A\u89E6\u53D1\u6D4F\u89C8\u5668\u7684\u540C\u6E90\u7B56\u7565\u3002</p><h5 id="gzip-\u538B\u7F29" tabindex="-1">gzip \u538B\u7F29 <a class="header-anchor" href="#gzip-\u538B\u7F29" aria-hidden="true">#</a></h5><blockquote><p><code>GZIP</code> \u662F\u89C4\u5B9A\u7684\u4E09\u79CD\u6807\u51C6 <code>HTTP</code> \u538B\u7F29\u683C\u5F0F\u4E4B\u4E00\u3002\u76EE\u524D\u7EDD\u5927\u591A\u6570\u7684\u7F51\u7AD9\u90FD\u5728\u4F7F\u7528 <code>GZIP</code> \u4F20\u8F93 <code>HTML</code> \u3001<code>CSS</code> \u3001 <code>JavaScript</code> \u7B49\u8D44\u6E90\u6587\u4EF6\u3002</p><p>\u5BF9\u4E8E\u6587\u672C\u6587\u4EF6\uFF0C <code>GZiP</code> \u7684\u6548\u679C\u975E\u5E38\u660E\u663E\uFF0C\u5F00\u542F\u540E\u4F20\u8F93\u6240\u9700\u6D41\u91CF\u5927\u7EA6\u4F1A\u964D\u81F3 <code>1/4~1/3</code> \u3002</p><p>\u5E76\u4E0D\u662F\u6BCF\u4E2A\u6D4F\u89C8\u5668\u90FD\u652F\u6301 <code>gzip</code> \u7684\uFF0C\u5982\u4F55\u77E5\u9053\u5BA2\u6237\u7AEF\u662F\u5426\u652F\u6301 <code>gzip</code> \u5462\uFF0C\u8BF7\u6C42\u5934\u4E2D\u7684 <code>Accept-Encoding</code> \u6765\u6807\u8BC6\u5BF9\u538B\u7F29\u7684\u652F\u6301\u3002</p><p>\u542F\u7528 <code>gzip</code> \u540C\u65F6\u9700\u8981\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u7AEF\u7684\u652F\u6301\uFF0C\u5982\u679C\u5BA2\u6237\u7AEF\u652F\u6301 <code>gzip</code> \u7684\u89E3\u6790\uFF0C\u90A3\u4E48\u53EA\u8981\u670D\u52A1\u7AEF\u80FD\u591F\u8FD4\u56DE <code>gzip</code> \u7684\u6587\u4EF6\u5C31\u53EF\u4EE5\u542F\u7528 <code>gzip</code> \u4E86,\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7 <code>Nginx</code> \u7684\u914D\u7F6E\u6765\u8BA9\u670D\u52A1\u7AEF\u652F\u6301 <code>gzip</code> \u3002</p><p><code>respone</code> \u4E2D <code>content-encoding:gzip</code> \uFF0C\u6307\u670D\u52A1\u7AEF\u5F00\u542F\u4E86 <code>gzip</code> \u7684\u538B\u7F29\u65B9\u5F0F</p></blockquote><p>\u5728 <code>/etc/nginx/conf.d/</code> \u6587\u4EF6\u5939\u4E2D\u65B0\u5EFA\u914D\u7F6E\u6587\u4EF6 <code>gzip.conf</code> \uFF1A</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;"># # \u9ED8\u8BA4off\uFF0C\u662F\u5426\u5F00\u542Fgzip</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip on;</span></span>
<span class="line"><span style="color:#A6ACCD;"># \u8981\u91C7\u7528 gzip \u538B\u7F29\u7684 MIME \u6587\u4EF6\u7C7B\u578B\uFF0C\u5176\u4E2D text/html \u88AB\u7CFB\u7EDF\u5F3A\u5236\u542F\u7528\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># ---- \u4EE5\u4E0A\u4E24\u4E2A\u53C2\u6570\u5F00\u542F\u5C31\u53EF\u4EE5\u652F\u6301Gzip\u538B\u7F29\u4E86 ---- #</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u9ED8\u8BA4 off\uFF0C\u8BE5\u6A21\u5757\u542F\u7528\u540E\uFF0CNginx \u9996\u5148\u68C0\u67E5\u662F\u5426\u5B58\u5728\u8BF7\u6C42\u9759\u6001\u6587\u4EF6\u7684 gz \u7ED3\u5C3E\u7684\u6587\u4EF6\uFF0C\u5982\u679C\u6709\u5219\u76F4\u63A5\u8FD4\u56DE\u8BE5 .gz \u6587\u4EF6\u5185\u5BB9\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_static on;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u9ED8\u8BA4 off\uFF0Cnginx\u505A\u4E3A\u53CD\u5411\u4EE3\u7406\u65F6\u542F\u7528\uFF0C\u7528\u4E8E\u8BBE\u7F6E\u542F\u7528\u6216\u7981\u7528\u4ECE\u4EE3\u7406\u670D\u52A1\u5668\u4E0A\u6536\u5230\u76F8\u5E94\u5185\u5BB9 gzip \u538B\u7F29\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_proxied any;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u7528\u4E8E\u5728\u54CD\u5E94\u6D88\u606F\u5934\u4E2D\u6DFB\u52A0 Vary\uFF1AAccept-Encoding\uFF0C\u4F7F\u4EE3\u7406\u670D\u52A1\u5668\u6839\u636E\u8BF7\u6C42\u5934\u4E2D\u7684 Accept-Encoding \u8BC6\u522B\u662F\u5426\u542F\u7528 gzip \u538B\u7F29\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_vary on;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># gzip \u538B\u7F29\u6BD4\uFF0C\u538B\u7F29\u7EA7\u522B\u662F 1-9\uFF0C1 \u538B\u7F29\u7EA7\u522B\u6700\u4F4E\uFF0C9 \u6700\u9AD8\uFF0C\u7EA7\u522B\u8D8A\u9AD8\u538B\u7F29\u7387\u8D8A\u5927\uFF0C\u538B\u7F29\u65F6\u95F4\u8D8A\u957F\uFF0C\u5EFA\u8BAE 4-6\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_comp_level 6;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u83B7\u53D6\u591A\u5C11\u5185\u5B58\u7528\u4E8E\u7F13\u5B58\u538B\u7F29\u7ED3\u679C\uFF0C16 8k \u8868\u793A\u4EE5 8k*16 \u4E3A\u5355\u4F4D\u83B7\u5F97\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_buffers 16 8k;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u5141\u8BB8\u538B\u7F29\u7684\u9875\u9762\u6700\u5C0F\u5B57\u8282\u6570\uFF0C\u9875\u9762\u5B57\u8282\u6570\u4ECEheader\u5934\u4E2D\u7684 Content-Length \u4E2D\u8FDB\u884C\u83B7\u53D6\u3002\u9ED8\u8BA4\u503C\u662F 0\uFF0C\u4E0D\u7BA1\u9875\u9762\u591A\u5927\u90FD\u538B\u7F29\u3002\u5EFA\u8BAE\u8BBE\u7F6E\u6210\u5927\u4E8E 1k \u7684\u5B57\u8282\u6570\uFF0C\u5C0F\u4E8E 1k \u53EF\u80FD\u4F1A\u8D8A\u538B\u8D8A\u5927\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;"># gzip_min_length 1k;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u9ED8\u8BA4 1.1\uFF0C\u542F\u7528 gzip \u6240\u9700\u7684 HTTP \u6700\u4F4E\u7248\u672C\uFF1B</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_http_version 1.1;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,51),o=[e];function c(t,r,i,C,A,y){return a(),n("div",null,o)}const g=s(p,[["render",c]]);export{d as __pageData,g as default};
