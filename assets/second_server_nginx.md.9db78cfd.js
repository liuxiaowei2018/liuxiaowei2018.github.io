import{_ as s,c as n,o as a,N as l}from"./chunks/framework.0799945b.js";const d=JSON.parse('{"title":"Nginx","description":"","frontmatter":{},"headers":[],"relativePath":"second/server/nginx.md"}'),p={name:"second/server/nginx.md"},e=l(`<h1 id="nginx" tabindex="-1">Nginx <a class="header-anchor" href="#nginx" aria-label="Permalink to &quot;Nginx&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#nginx使用场景">Nginx使用场景</a></li><li><a href="#nginx目录信息">Nginx目录信息</a></li><li><a href="#nginx-常用命令">Nginx 常用命令</a></li><li><a href="#nginx全局配置">Nginx全局配置</a></li><li><a href="#nginx-配置代码">Nginx 配置代码</a></li><li><a href="#nginx部署流程">Nginx部署流程</a></li></ul></nav><h2 id="nginx使用场景" tabindex="-1">Nginx使用场景 <a class="header-anchor" href="#nginx使用场景" aria-label="Permalink to &quot;Nginx使用场景&quot;">​</a></h2><blockquote><ol><li>静态资源服务，通过本地文件系统提供服务；</li><li>反向代理服务，延伸出包括缓存、负载均衡等；</li><li><code>API</code> 服务， <code>OpenResty</code> ；</li></ol></blockquote><h2 id="nginx目录信息" tabindex="-1">Nginx目录信息 <a class="header-anchor" href="#nginx目录信息" aria-label="Permalink to &quot;Nginx目录信息&quot;">​</a></h2><blockquote><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># Nginx配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">/etc/nginx/nginx.conf # nginx 主配置文件</span></span>
<span class="line"><span style="color:#A6ACCD;">/etc/nginx/nginx.conf.default</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 可执行程序文件</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/bin/nginx-upgrade</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/sbin/nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># nginx库文件</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/lib/systemd/system/nginx.service # 用于配置系统守护进程</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/lib64/nginx/modules # Nginx模块目录</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 帮助文档</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/doc/nginx-1.16.1</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/doc/nginx-1.16.1/CHANGES</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/doc/nginx-1.16.1/README</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/doc/nginx-1.16.1/README.dynamic</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/doc/nginx-1.16.1/UPGRADE-NOTES-1.6-to-1.10</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 静态资源目录</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/nginx/html/404.html</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/nginx/html/50x.html</span></span>
<span class="line"><span style="color:#A6ACCD;">/usr/share/nginx/html/index.html</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 存放Nginx日志文件</span></span>
<span class="line"><span style="color:#A6ACCD;">/var/log/nginx</span></span></code></pre></div><ol><li><code>/etc/nginx/conf.d/</code> 是子配置项存放处， <code>/etc/nginx/nginx.conf</code> 主配置文件会默认把这个文件夹中所有子配置项都引入；</li><li><code>/usr/share/nginx/html/</code> 静态文件都放在这个文件夹，也可以根据你自己的习惯放在其他地方；</li></ol></blockquote><h2 id="nginx-常用命令" tabindex="-1">Nginx 常用命令 <a class="header-anchor" href="#nginx-常用命令" aria-label="Permalink to &quot;Nginx 常用命令&quot;">​</a></h2><blockquote><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># 开机配置</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl enable nginx # 开机自动启动</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl disable nginx # 关闭开机自动启动</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 启动Nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl start nginx # 启动Nginx成功后，可以直接访问主机IP，此时会展示Nginx默认页面</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 停止Nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl stop nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 重启Nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl restart nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 重新加载Nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl reload nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 查看 Nginx 运行状态</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl status nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 查看Nginx进程</span></span>
<span class="line"><span style="color:#A6ACCD;">ps -ef | grep nginx</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 杀死Nginx进程</span></span>
<span class="line"><span style="color:#A6ACCD;">kill -9 pid # 根据上面查看到的Nginx进程号，杀死Nginx进程，-9 表示强制结束进程</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -s reload  # 向主进程发送信号，重新加载配置文件，热重启</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -s reopen  # 重启 Nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -s stop    # 快速关闭</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -s quit    # 等待工作进程处理完成后关闭</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -T         # 查看当前 Nginx 最终的配置</span></span>
<span class="line"><span style="color:#A6ACCD;">nginx -t         # 检查配置是否有问题</span></span></code></pre></div></blockquote><h2 id="nginx全局配置" tabindex="-1">Nginx全局配置 <a class="header-anchor" href="#nginx全局配置" aria-label="Permalink to &quot;Nginx全局配置&quot;">​</a></h2><h5 id="性能配置" tabindex="-1">性能配置 <a class="header-anchor" href="#性能配置" aria-label="Permalink to &quot;性能配置&quot;">​</a></h5><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#nginx.conf全局配置</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">user nginx;</span></span>
<span class="line"><span style="color:#A6ACCD;">worker_processes </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">; 	#worker_processes表示工作进程个数，值越大nginx处理能力越强</span></span>
<span class="line"><span style="color:#A6ACCD;">error_log /var/log/nginx/error.log warn; 	#记录错误日志信息</span></span>
<span class="line"><span style="color:#A6ACCD;">pid /var/run/nginx.pid; 	#记录nginx的进程信息</span></span>
<span class="line"><span style="color:#A6ACCD;">events </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;"> worker_connections 1024; #worker_connections值越大，nginx处理越强</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h5 id="location路径映射" tabindex="-1">Location路径映射 <a class="header-anchor" href="#location路径映射" aria-label="Permalink to &quot;Location路径映射&quot;">​</a></h5><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">#1、精确匹配</span></span>
<span class="line"><span style="color:#C3E88D;">location = /abc {</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">#/abc/aaa/bb 不匹配</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">#/abc/  不匹配</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">#/Abc  不匹配</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">#/abc  匹配</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#2、通用匹配</span></span>
<span class="line"><span style="color:#C3E88D;">location /abc {</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># 匹配所有以/abc开头的请求</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># /abc/abb/aacc 匹配</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># /abc/  匹配</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># /abc 匹配</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;"># /aaa/abc 不匹配</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#3、正则匹配</span></span>
<span class="line"><span style="color:#C3E88D;">location ~ /xxx{</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">#匹配以/xxx开头的，并且区分大小写</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#C3E88D;">location ~* /xxx{</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;font-style:italic;">#匹配以/xxx开头的，并且不区分大小写</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#C3E88D;">location ^~ /images/{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">#匹配以images开头</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#C3E88D;">location ~* \\.(gif|jpg|png)$ {</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">#匹配以.gif|.jpg|.png结尾的请求的，而且不区分大小写</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#4、全部匹配</span></span>
<span class="line"><span style="color:#C3E88D;">location /{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">#匹配所有</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="nginx-配置代码" tabindex="-1">Nginx 配置代码 <a class="header-anchor" href="#nginx-配置代码" aria-label="Permalink to &quot;Nginx 配置代码&quot;">​</a></h2><h5 id="虚拟主机" tabindex="-1">虚拟主机 <a class="header-anchor" href="#虚拟主机" aria-label="Permalink to &quot;虚拟主机&quot;">​</a></h5><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ports:</span></span>
<span class="line"><span style="color:#A6ACCD;">  - </span><span style="color:#F78C6C;">8081</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">8081</span><span style="color:#A6ACCD;"> #指定端口号的映射</span></span>
<span class="line"><span style="color:#A6ACCD;">  - </span><span style="color:#F78C6C;">8082</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">8082</span><span style="color:#A6ACCD;"> #指定端口号的映射</span></span>
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
<span class="line"><span style="color:#A6ACCD;">#分别会访问/usr/share/nginx/html</span><span style="color:#F78C6C;">-8081</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">8082</span><span style="color:#A6ACCD;">)下的index.html文件</span></span></code></pre></div><h5 id="侦听端口" tabindex="-1">侦听端口 <a class="header-anchor" href="#侦听端口" aria-label="Permalink to &quot;侦听端口&quot;">​</a></h5><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">  </span></span>
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
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h5 id="访问日志" tabindex="-1">访问日志 <a class="header-anchor" href="#访问日志" aria-label="Permalink to &quot;访问日志&quot;">​</a></h5><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Relative or full path to log file </span></span>
<span class="line"><span style="color:#A6ACCD;">    access_log /path/to/file.log;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Turn &#39;on&#39; or &#39;off&#39;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    access_log on;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h5 id="域名" tabindex="-1">域名 <a class="header-anchor" href="#域名" aria-label="Permalink to &quot;域名&quot;">​</a></h5><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    # Listen to yourdomain.com </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name yourdomain.com;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Listen to multiple domains  server_name yourdomain.com www.yourdomain.com; </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Listen to all domains</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name *.yourdomain.com; </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Listen to all top-level domains </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name yourdomain.*; </span></span>
<span class="line"><span style="color:#A6ACCD;">    # Listen to unspecified Hostnames (Listens to IP address itself) </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name </span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h5 id="静态资源" tabindex="-1">静态资源 <a class="header-anchor" href="#静态资源" aria-label="Permalink to &quot;静态资源&quot;">​</a></h5><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name yourdomain.com;  </span></span>
<span class="line"><span style="color:#A6ACCD;">    location / {      </span></span>
<span class="line"><span style="color:#A6ACCD;">        root /path/to/website; </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h5 id="重定向" tabindex="-1">重定向 <a class="header-anchor" href="#重定向" aria-label="Permalink to &quot;重定向&quot;">​</a></h5><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80;</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name www.yourdomain.com;</span></span>
<span class="line"><span style="color:#A6ACCD;">    return 301 http</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;font-style:italic;">//yourdomain.com$request_uri;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80; </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name www.yourdomain.com; </span></span>
<span class="line"><span style="color:#A6ACCD;">    location /redirect-url { </span></span>
<span class="line"><span style="color:#A6ACCD;">    	return 301 http</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;font-style:italic;">//otherdomain.com; </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h5 id="反向代理" tabindex="-1">反向代理 <a class="header-anchor" href="#反向代理" aria-label="Permalink to &quot;反向代理&quot;">​</a></h5><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80; </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name yourdomain.com;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #反向代理将请求转发给3000</span></span>
<span class="line"><span style="color:#A6ACCD;">    location / {  </span></span>
<span class="line"><span style="color:#A6ACCD;">    	proxy_pass http</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;font-style:italic;">//0.0.0.0:3000; </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h5 id="负载均衡" tabindex="-1">负载均衡 <a class="header-anchor" href="#负载均衡" aria-label="Permalink to &quot;负载均衡&quot;">​</a></h5><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">负载均衡策略:</span></span>
<span class="line"><span style="color:#A6ACCD;">    backup：热备，等主服务器停止工作了，备份机才工作</span></span>
<span class="line"><span style="color:#A6ACCD;">    轮询：将客户端的请求轮流分配给不同的主机</span></span>
<span class="line"><span style="color:#A6ACCD;">    权重：可以设置多台服务器的接收百分比！</span></span>
<span class="line"><span style="color:#A6ACCD;">    ip_hash：基于客户端的ip进行服务器分配</span></span>
<span class="line"><span style="color:#A6ACCD;">    fair：根据服务器的请求时间来进行分配</span></span>
<span class="line"><span style="color:#A6ACCD;">    url_hash：基于请求的地址进行服务器分配</span></span></code></pre></div><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#vim /nginx/conf.d/default.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">#</span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#A6ACCD;">upstream node_js </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    #默认nginx采用的是轮询策略</span></span>
<span class="line"><span style="color:#A6ACCD;">    server 0.0.0.0</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">3000</span><span style="color:#A6ACCD;">; </span></span>
<span class="line"><span style="color:#A6ACCD;">    server </span><span style="color:#F78C6C;">0.0</span><span style="color:#A6ACCD;">.</span><span style="color:#F78C6C;">0.0</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">4000</span><span style="color:#A6ACCD;">; </span></span>
<span class="line"><span style="color:#A6ACCD;">    server </span><span style="color:#F78C6C;">123.131</span><span style="color:#A6ACCD;">.</span><span style="color:#F78C6C;">121.122</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span><span style="color:#F78C6C;">2</span></span>
<span class="line"><span style="color:#A6ACCD;">upstream tomcats</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    server 192.168.127.130</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">8080</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    server </span><span style="color:#F78C6C;">192.168</span><span style="color:#A6ACCD;">.</span><span style="color:#F78C6C;">127.130</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">8081</span><span style="color:#A6ACCD;"> backup; #热备</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span><span style="color:#F78C6C;">3</span></span>
<span class="line"><span style="color:#A6ACCD;">upstream tomcats</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    server 192.168.127.130</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">8080</span><span style="color:#A6ACCD;"> weight=</span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">; #权重</span></span>
<span class="line"><span style="color:#A6ACCD;">    server </span><span style="color:#F78C6C;">192.168</span><span style="color:#A6ACCD;">.</span><span style="color:#F78C6C;">127.130</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">8081</span><span style="color:#A6ACCD;"> weight=</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">#</span><span style="color:#F78C6C;">4</span></span>
<span class="line"><span style="color:#A6ACCD;">upstream tomcats</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    ip_hash; #ip_hash策略</span></span>
<span class="line"><span style="color:#A6ACCD;">    server 192.168.127.130</span><span style="color:#89DDFF;">:</span><span style="color:#F78C6C;">8080</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    server </span><span style="color:#F78C6C;">192.168</span><span style="color:#A6ACCD;">.</span><span style="color:#F78C6C;">127.130</span><span style="color:#A6ACCD;">:</span><span style="color:#F78C6C;">8081</span><span style="color:#A6ACCD;">; </span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80; </span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name localhost;</span></span>
<span class="line"><span style="color:#A6ACCD;">    location / {    </span></span>
<span class="line"><span style="color:#A6ACCD;">    	proxy_pass http</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;font-style:italic;">//node_js; </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h5 id="ssl-协议" tabindex="-1">SSL 协议 <a class="header-anchor" href="#ssl-协议" aria-label="Permalink to &quot;SSL 协议&quot;">​</a></h5><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
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
<span class="line"><span style="color:#A6ACCD;">    return 301 https</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;font-style:italic;">//$host$request_uri;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h5 id="动静分离" tabindex="-1">动静分离 <a class="header-anchor" href="#动静分离" aria-label="Permalink to &quot;动静分离&quot;">​</a></h5><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen 80;</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name localhost;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    #代理动态资源</span></span>
<span class="line"><span style="color:#A6ACCD;">    location /{</span></span>
<span class="line"><span style="color:#A6ACCD;">        proxy_pass http</span><span style="color:#89DDFF;">:</span><span style="color:#676E95;font-style:italic;">//192.168.127.130:8080;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">     #静态资源配置</span></span>
<span class="line"><span style="color:#A6ACCD;">    location /html </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">     	root /data;	#静态资源的路径</span></span>
<span class="line"><span style="color:#A6ACCD;">     	index index.html; #默认访问的资源</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    location /img </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">     	root /data;</span></span>
<span class="line"><span style="color:#A6ACCD;">     	autoindex on;#以列表显示当前目录下的所有图片</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h5 id="https" tabindex="-1">HTTPS <a class="header-anchor" href="#https" aria-label="Permalink to &quot;HTTPS&quot;">​</a></h5><blockquote><p><strong>HTTPS 工作流程</strong></p><ol><li>客户端（浏览器）访问 <code>https://www.baidu.com</code> 百度网站；</li><li>百度服务器返回 <code>HTTPS</code> 使用的 <code>CA</code> 证书；</li><li>浏览器验证 <code>CA</code> 证书是否为合法证书；</li><li>验证通过，证书合法，生成一串随机数并使用公钥（证书中提供的）进行加密；</li><li>发送公钥加密后的随机数给百度服务器；</li><li>百度服务器拿到密文，通过私钥进行解密，获取到随机数（公钥加密，私钥解密，反之也可以）；</li><li>百度服务器把要发送给浏览器的内容，使用随机数进行加密后传输给浏览器；</li><li>此时浏览器可以使用随机数进行解密，获取到服务器的真实传输内容；</li></ol></blockquote><h6 id="配置证书" tabindex="-1">配置证书 <a class="header-anchor" href="#配置证书" aria-label="Permalink to &quot;配置证书&quot;">​</a></h6><p>下载证书的压缩文件，里面有个 <code>Nginx</code> 文件夹，把 <code>xxx.crt</code> 和 <code>xxx.key</code> 文件拷贝到服务器目录，再进行如下配置：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server {</span></span>
<span class="line"><span style="color:#A6ACCD;">  listen 443 ssl http2 default_server;   # SSL 访问端口号为 443</span></span>
<span class="line"><span style="color:#A6ACCD;">  server_name lion.club;         # 填写绑定证书的域名(我这里是随便写的)</span></span>
<span class="line"><span style="color:#A6ACCD;">  ssl_certificate /etc/nginx/https/lion.club_bundle.crt;   # 证书地址</span></span>
<span class="line"><span style="color:#A6ACCD;">  ssl_certificate_key /etc/nginx/https/lion.club.key;      # 私钥地址</span></span>
<span class="line"><span style="color:#A6ACCD;">  ssl_session_timeout 10m;</span></span>
<span class="line"><span style="color:#A6ACCD;">  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # 支持ssl协议版本，默认为后三个，主流版本是[TLSv1.2]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">    root         /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#A6ACCD;">    index        index.html index.htm;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>如此配置后就能正常访问 <code>HTTPS</code> 版的网站</p><h5 id="跨域-cors" tabindex="-1">跨域 CORS <a class="header-anchor" href="#跨域-cors" aria-label="Permalink to &quot;跨域 CORS&quot;">​</a></h5><p>例如：</p><ul><li>前端 <code>server</code> 的域名为： <code>fe.server.com</code></li><li>后端服务的域名为： <code>dev.server.com</code></li></ul><p>现在我在 <code>fe.server.com</code> 对 <code>dev.server.com</code> 发起请求一定会出现跨域。</p><p>现在我们只需要启动一个 <code>Nginx</code> 服务器，将 <code>server_name</code> 设置为 <code>fe.server.com</code> 然后设置相应的 <code>location</code> 以拦截前端需要跨域的请求，最后将请求代理回 <code>dev.server.com</code> 。如下面的配置：</p><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">server</span><span style="color:#A6ACCD;"> { </span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> listen </span><span style="color:#A6ACCD;">     </span><span style="color:#F78C6C;">80</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> server_name </span><span style="color:#A6ACCD;"> fe.server.com</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">/ </span><span style="color:#A6ACCD;">{  </span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#89DDFF;"> proxy_pass </span><span style="color:#A6ACCD;">dev.server.com</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>这样可以完美绕过浏览器的同源策略： <code>fe.server.com</code> 访问 <code>Nginx</code> 的 <code>fe.server.com</code> 属于同源访问，而 <code>Nginx</code> 对服务端转发的请求不会触发浏览器的同源策略。</p><h5 id="gzip-压缩" tabindex="-1">gzip 压缩 <a class="header-anchor" href="#gzip-压缩" aria-label="Permalink to &quot;gzip 压缩&quot;">​</a></h5><blockquote><p><code>GZIP</code> 是规定的三种标准 <code>HTTP</code> 压缩格式之一。目前绝大多数的网站都在使用 <code>GZIP</code> 传输 <code>HTML</code> 、<code>CSS</code> 、 <code>JavaScript</code> 等资源文件。</p><p>对于文本文件， <code>GZiP</code> 的效果非常明显，开启后传输所需流量大约会降至 <code>1/4~1/3</code> 。</p><p>并不是每个浏览器都支持 <code>gzip</code> 的，如何知道客户端是否支持 <code>gzip</code> 呢，请求头中的 <code>Accept-Encoding</code> 来标识对压缩的支持。</p><p>启用 <code>gzip</code> 同时需要客户端和服务端的支持，如果客户端支持 <code>gzip</code> 的解析，那么只要服务端能够返回 <code>gzip</code> 的文件就可以启用 <code>gzip</code> 了,我们可以通过 <code>Nginx</code> 的配置来让服务端支持 <code>gzip</code> 。</p><p><code>respone</code> 中 <code>content-encoding:gzip</code> ，指服务端开启了 <code>gzip</code> 的压缩方式</p></blockquote><p>在 <code>/etc/nginx/conf.d/</code> 文件夹中新建配置文件 <code>gzip.conf</code> ：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># # 默认off，是否开启gzip</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip on;</span></span>
<span class="line"><span style="color:#A6ACCD;"># 要采用 gzip 压缩的 MIME 文件类型，其中 text/html 被系统强制启用；</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># ---- 以上两个参数开启就可以支持Gzip压缩了 ---- #</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 默认 off，该模块启用后，Nginx 首先检查是否存在请求静态文件的 gz 结尾的文件，如果有则直接返回该 .gz 文件内容；</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_static on;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 默认 off，nginx做为反向代理时启用，用于设置启用或禁用从代理服务器上收到相应内容 gzip 压缩；</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_proxied any;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 用于在响应消息头中添加 Vary：Accept-Encoding，使代理服务器根据请求头中的 Accept-Encoding 识别是否启用 gzip 压缩；</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_vary on;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># gzip 压缩比，压缩级别是 1-9，1 压缩级别最低，9 最高，级别越高压缩率越大，压缩时间越长，建议 4-6；</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_comp_level 6;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 获取多少内存用于缓存压缩结果，16 8k 表示以 8k*16 为单位获得；</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_buffers 16 8k;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 允许压缩的页面最小字节数，页面字节数从header头中的 Content-Length 中进行获取。默认值是 0，不管页面多大都压缩。建议设置成大于 1k 的字节数，小于 1k 可能会越压越大；</span></span>
<span class="line"><span style="color:#A6ACCD;"># gzip_min_length 1k;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># 默认 1.1，启用 gzip 所需的 HTTP 最低版本；</span></span>
<span class="line"><span style="color:#A6ACCD;">gzip_http_version 1.1;</span></span></code></pre></div><h2 id="nginx部署流程" tabindex="-1">Nginx部署流程 <a class="header-anchor" href="#nginx部署流程" aria-label="Permalink to &quot;Nginx部署流程&quot;">​</a></h2>`,53),o=[e];function c(t,i,r,C,A,y){return a(),n("div",null,o)}const g=s(p,[["render",c]]);export{d as __pageData,g as default};
