import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8048b864.js";const B=JSON.parse('{"title":"Nginx","description":"","frontmatter":{},"headers":[],"relativePath":"中间件/extend/服务器/nginx.md","filePath":"中间件/extend/服务器/nginx.md","lastUpdated":1718873649000}'),p={name:"中间件/extend/服务器/nginx.md"},o=l(`<h1 id="nginx" tabindex="-1">Nginx <a class="header-anchor" href="#nginx" aria-label="Permalink to &quot;Nginx&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#nginx应用场景">Nginx应用场景</a><ul><li><a href="#使用场景">使用场景</a></li><li><a href="#目录信息">目录信息</a></li><li><a href="#常用命令">常用命令</a></li><li><a href="#全局配置">全局配置</a></li></ul></li></ul></nav><blockquote><p>官方文档：<a href="http://nginx.org/" target="_blank" rel="noreferrer">http://nginx.org/</a></p></blockquote><h2 id="nginx应用场景" tabindex="-1">Nginx应用场景 <a class="header-anchor" href="#nginx应用场景" aria-label="Permalink to &quot;Nginx应用场景&quot;">​</a></h2><h3 id="使用场景" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景" aria-label="Permalink to &quot;使用场景&quot;">​</a></h3><ol><li>静态资源服务，通过本地文件系统提供服务；</li><li>反向代理服务，延伸出包括缓存、负载均衡等；</li><li><code>API</code> 服务， <code>OpenResty</code> ；</li></ol><h3 id="目录信息" tabindex="-1">目录信息 <a class="header-anchor" href="#目录信息" aria-label="Permalink to &quot;目录信息&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># Nginx配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/nginx/nginx.conf # nginx 主配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">/etc/nginx/nginx.conf.default</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 可执行程序文件</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/bin/nginx-upgrade</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/sbin/nginx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># nginx库文件</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/lib/systemd/system/nginx.service # 用于配置系统守护进程</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/lib64/nginx/modules # Nginx模块目录</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 帮助文档</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/share/doc/nginx-1.16.1</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/share/doc/nginx-1.16.1/CHANGES</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/share/doc/nginx-1.16.1/README</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/share/doc/nginx-1.16.1/README.dynamic</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/share/doc/nginx-1.16.1/UPGRADE-NOTES-1.6-to-1.10</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 静态资源目录</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/share/nginx/html/404.html</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/share/nginx/html/50x.html</span></span>
<span class="line"><span style="color:#e1e4e8;">/usr/share/nginx/html/index.html</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 存放Nginx日志文件</span></span>
<span class="line"><span style="color:#e1e4e8;">/var/log/nginx</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># Nginx配置文件</span></span>
<span class="line"><span style="color:#24292e;">/etc/nginx/nginx.conf # nginx 主配置文件</span></span>
<span class="line"><span style="color:#24292e;">/etc/nginx/nginx.conf.default</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 可执行程序文件</span></span>
<span class="line"><span style="color:#24292e;">/usr/bin/nginx-upgrade</span></span>
<span class="line"><span style="color:#24292e;">/usr/sbin/nginx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># nginx库文件</span></span>
<span class="line"><span style="color:#24292e;">/usr/lib/systemd/system/nginx.service # 用于配置系统守护进程</span></span>
<span class="line"><span style="color:#24292e;">/usr/lib64/nginx/modules # Nginx模块目录</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 帮助文档</span></span>
<span class="line"><span style="color:#24292e;">/usr/share/doc/nginx-1.16.1</span></span>
<span class="line"><span style="color:#24292e;">/usr/share/doc/nginx-1.16.1/CHANGES</span></span>
<span class="line"><span style="color:#24292e;">/usr/share/doc/nginx-1.16.1/README</span></span>
<span class="line"><span style="color:#24292e;">/usr/share/doc/nginx-1.16.1/README.dynamic</span></span>
<span class="line"><span style="color:#24292e;">/usr/share/doc/nginx-1.16.1/UPGRADE-NOTES-1.6-to-1.10</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 静态资源目录</span></span>
<span class="line"><span style="color:#24292e;">/usr/share/nginx/html/404.html</span></span>
<span class="line"><span style="color:#24292e;">/usr/share/nginx/html/50x.html</span></span>
<span class="line"><span style="color:#24292e;">/usr/share/nginx/html/index.html</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 存放Nginx日志文件</span></span>
<span class="line"><span style="color:#24292e;">/var/log/nginx</span></span></code></pre></div><blockquote><ol><li><code>/etc/nginx/conf.d/</code> 是子配置项存放处， <code>/etc/nginx/nginx.conf</code> 主配置文件会默认把这个文件夹中所有子配置项都引入；</li><li><code>/usr/share/nginx/html/</code> 静态文件都放在这个文件夹，也可以根据你自己的习惯放在其他地方；</li></ol></blockquote><h3 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-label="Permalink to &quot;常用命令&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># 开机配置</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl enable nginx # 开机自动启动</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl disable nginx # 关闭开机自动启动</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 启动Nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl start nginx # 启动Nginx成功后，可以直接访问主机IP，此时会展示Nginx默认页面</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 停止Nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl stop nginx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 重启Nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl restart nginx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 重新加载Nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl reload nginx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看 Nginx 运行状态</span></span>
<span class="line"><span style="color:#e1e4e8;">systemctl status nginx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 查看Nginx进程</span></span>
<span class="line"><span style="color:#e1e4e8;">ps -ef | grep nginx</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 杀死Nginx进程</span></span>
<span class="line"><span style="color:#e1e4e8;">kill -9 pid # 根据上面查看到的Nginx进程号，杀死Nginx进程，-9 表示强制结束进程</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">nginx -s reload  # 向主进程发送信号，重新加载配置文件，热重启</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx -s reopen  # 重启 Nginx</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx -s stop    # 快速关闭</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx -s quit    # 等待工作进程处理完成后关闭</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx -T         # 查看当前 Nginx 最终的配置</span></span>
<span class="line"><span style="color:#e1e4e8;">nginx -t         # 检查配置是否有问题</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># 开机配置</span></span>
<span class="line"><span style="color:#24292e;">systemctl enable nginx # 开机自动启动</span></span>
<span class="line"><span style="color:#24292e;">systemctl disable nginx # 关闭开机自动启动</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 启动Nginx</span></span>
<span class="line"><span style="color:#24292e;">systemctl start nginx # 启动Nginx成功后，可以直接访问主机IP，此时会展示Nginx默认页面</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 停止Nginx</span></span>
<span class="line"><span style="color:#24292e;">systemctl stop nginx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 重启Nginx</span></span>
<span class="line"><span style="color:#24292e;">systemctl restart nginx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 重新加载Nginx</span></span>
<span class="line"><span style="color:#24292e;">systemctl reload nginx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看 Nginx 运行状态</span></span>
<span class="line"><span style="color:#24292e;">systemctl status nginx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 查看Nginx进程</span></span>
<span class="line"><span style="color:#24292e;">ps -ef | grep nginx</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 杀死Nginx进程</span></span>
<span class="line"><span style="color:#24292e;">kill -9 pid # 根据上面查看到的Nginx进程号，杀死Nginx进程，-9 表示强制结束进程</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">nginx -s reload  # 向主进程发送信号，重新加载配置文件，热重启</span></span>
<span class="line"><span style="color:#24292e;">nginx -s reopen  # 重启 Nginx</span></span>
<span class="line"><span style="color:#24292e;">nginx -s stop    # 快速关闭</span></span>
<span class="line"><span style="color:#24292e;">nginx -s quit    # 等待工作进程处理完成后关闭</span></span>
<span class="line"><span style="color:#24292e;">nginx -T         # 查看当前 Nginx 最终的配置</span></span>
<span class="line"><span style="color:#24292e;">nginx -t         # 检查配置是否有问题</span></span></code></pre></div><h3 id="全局配置" tabindex="-1">全局配置 <a class="header-anchor" href="#全局配置" aria-label="Permalink to &quot;全局配置&quot;">​</a></h3><blockquote><p>nginx.conf</p></blockquote><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">user nginx;</span></span>
<span class="line"><span style="color:#E1E4E8;">worker_processes </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">; 	#worker_processes表示工作进程个数，值越大nginx处理能力越强</span></span>
<span class="line"><span style="color:#E1E4E8;">error_log /var/log/nginx/error.log warn; 	#记录错误日志信息</span></span>
<span class="line"><span style="color:#E1E4E8;">pid /var/run/nginx.pid; 	#记录nginx的进程信息</span></span>
<span class="line"><span style="color:#E1E4E8;">events {</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">worker_connections</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">1024;</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">#worker_connections值越大，nginx处理越强</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">user nginx;</span></span>
<span class="line"><span style="color:#24292E;">worker_processes </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">; 	#worker_processes表示工作进程个数，值越大nginx处理能力越强</span></span>
<span class="line"><span style="color:#24292E;">error_log /var/log/nginx/error.log warn; 	#记录错误日志信息</span></span>
<span class="line"><span style="color:#24292E;">pid /var/run/nginx.pid; 	#记录nginx的进程信息</span></span>
<span class="line"><span style="color:#24292E;">events {</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">worker_connections</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">1024;</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">#worker_connections值越大，nginx处理越强</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="location路径映射" tabindex="-1">Location路径映射 <a class="header-anchor" href="#location路径映射" aria-label="Permalink to &quot;Location路径映射&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#1、精确匹配</span></span>
<span class="line"><span style="color:#9ECBFF;">location = /abc {</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;">#/abc/aaa/bb 不匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;">#/abc/  不匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;">#/Abc  不匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;">#/abc  匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">#2、通用匹配</span></span>
<span class="line"><span style="color:#9ECBFF;">location /abc {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># 匹配所有以/abc开头的请求</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># /abc/abb/aacc 匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># /abc/  匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># /abc 匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># /aaa/abc 不匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">#3、正则匹配</span></span>
<span class="line"><span style="color:#9ECBFF;">location ~ /xxx{</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;">#匹配以/xxx开头的，并且区分大小写</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">location ~* /xxx{</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;">#匹配以/xxx开头的，并且不区分大小写</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">location ^~ /images/{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#匹配以images开头</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">location ~* \\.(gif|jpg|png)$ {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#匹配以.gif|.jpg|.png结尾的请求的，而且不区分大小写</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">#4、全部匹配</span></span>
<span class="line"><span style="color:#9ECBFF;">location /{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">#匹配所有</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#1、精确匹配</span></span>
<span class="line"><span style="color:#032F62;">location = /abc {</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;">#/abc/aaa/bb 不匹配</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;">#/abc/  不匹配</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;">#/Abc  不匹配</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;">#/abc  匹配</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">#2、通用匹配</span></span>
<span class="line"><span style="color:#032F62;">location /abc {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># 匹配所有以/abc开头的请求</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># /abc/abb/aacc 匹配</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># /abc/  匹配</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># /abc 匹配</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># /aaa/abc 不匹配</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">#3、正则匹配</span></span>
<span class="line"><span style="color:#032F62;">location ~ /xxx{</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;">#匹配以/xxx开头的，并且区分大小写</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#032F62;">location ~* /xxx{</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;">#匹配以/xxx开头的，并且不区分大小写</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#032F62;">location ^~ /images/{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#匹配以images开头</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#032F62;">location ~* \\.(gif|jpg|png)$ {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#匹配以.gif|.jpg|.png结尾的请求的，而且不区分大小写</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">#4、全部匹配</span></span>
<span class="line"><span style="color:#032F62;">location /{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">#匹配所有</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="虚拟主机" tabindex="-1">虚拟主机 <a class="header-anchor" href="#虚拟主机" aria-label="Permalink to &quot;虚拟主机&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">ports:</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#79B8FF;">8081</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">8081</span><span style="color:#E1E4E8;"> #指定端口号的映射</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#79B8FF;">8082</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">8082</span><span style="color:#E1E4E8;"> #指定端口号的映射</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#vim /nginx/conf.d/default.conf</span></span>
<span class="line"><span style="color:#E1E4E8;">server {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">8081;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">localhost;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FDAEB7;font-style:italic;">root</span><span style="color:#E1E4E8;">	</span><span style="color:#FDAEB7;font-style:italic;">/usr/share/nginx/html-8081;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FDAEB7;font-style:italic;">index</span><span style="color:#E1E4E8;"> 	</span><span style="color:#FDAEB7;font-style:italic;">index.html</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">index.htm;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">server {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">8082;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">localhost;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FDAEB7;font-style:italic;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/usr/share/nginx/html-8082;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FDAEB7;font-style:italic;">index</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">index.html</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">index.htm;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">#分别会访问/usr/share/nginx/html</span><span style="color:#79B8FF;">-8081</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">8082</span><span style="color:#E1E4E8;">)下的index.html文件</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">ports:</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#005CC5;">8081</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">8081</span><span style="color:#24292E;"> #指定端口号的映射</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#005CC5;">8082</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">8082</span><span style="color:#24292E;"> #指定端口号的映射</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#vim /nginx/conf.d/default.conf</span></span>
<span class="line"><span style="color:#24292E;">server {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">8081;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server_name</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">localhost;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">location</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#B31D28;font-style:italic;">root</span><span style="color:#24292E;">	</span><span style="color:#B31D28;font-style:italic;">/usr/share/nginx/html-8081;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#B31D28;font-style:italic;">index</span><span style="color:#24292E;"> 	</span><span style="color:#B31D28;font-style:italic;">index.html</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">index.htm;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">server {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">8082;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server_name</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">localhost;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">location</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#B31D28;font-style:italic;">root</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/usr/share/nginx/html-8082;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#B31D28;font-style:italic;">index</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">index.html</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">index.htm;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">#分别会访问/usr/share/nginx/html</span><span style="color:#005CC5;">-8081</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">8082</span><span style="color:#24292E;">)下的index.html文件</span></span></code></pre></div><h4 id="侦听端口" tabindex="-1">侦听端口 <a class="header-anchor" href="#侦听端口" aria-label="Permalink to &quot;侦听端口&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">server {  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Standard</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">HTTP</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Protocol</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">80;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Standard</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">HTTPS</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Protocol</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">443</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">ssl;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">For</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">http2</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">443</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">ssl</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">http2;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">80</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">using</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">IPv6</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">[</span><span style="color:#E1E4E8;">:</span><span style="color:#FDAEB7;font-style:italic;">:]:</span><span style="color:#79B8FF;">80</span><span style="color:#FDAEB7;font-style:italic;">;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">only</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">using</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">IPv</span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">listen</span><span style="color:#E1E4E8;"> [</span><span style="color:#FDAEB7;font-style:italic;">::</span><span style="color:#E1E4E8;">]</span><span style="color:#FDAEB7;font-style:italic;">:</span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">ipv</span><span style="color:#79B8FF;">6</span><span style="color:#FDAEB7;font-style:italic;">only=on;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">server {  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Standard</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">HTTP</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Protocol</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">80;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Standard</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">HTTPS</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Protocol</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">443</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">ssl;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">For</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">http2</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">443</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">ssl</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">http2;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">on</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">80</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">using</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">IPv6</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">[</span><span style="color:#24292E;">:</span><span style="color:#B31D28;font-style:italic;">:]:</span><span style="color:#005CC5;">80</span><span style="color:#B31D28;font-style:italic;">;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">only</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">on</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">using</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">IPv</span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">listen</span><span style="color:#24292E;"> [</span><span style="color:#B31D28;font-style:italic;">::</span><span style="color:#24292E;">]</span><span style="color:#B31D28;font-style:italic;">:</span><span style="color:#005CC5;">80</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">ipv</span><span style="color:#005CC5;">6</span><span style="color:#B31D28;font-style:italic;">only=on;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="访问日志" tabindex="-1">访问日志 <a class="header-anchor" href="#访问日志" aria-label="Permalink to &quot;访问日志&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">server { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Relative</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">or</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">full</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">log</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">file</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">access_log</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/path/to/file.log;</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Turn</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">&#39;on&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">or</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">&#39;off&#39;</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">access_log</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">on;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">server { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Relative</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">or</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">full</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">path</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">to</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">log</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">file</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">access_log</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/path/to/file.log;</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Turn</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">&#39;on&#39;</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">or</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">&#39;off&#39;</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">access_log</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">on;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="域名" tabindex="-1">域名 <a class="header-anchor" href="#域名" aria-label="Permalink to &quot;域名&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">server {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">yourdomain.com</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">yourdomain.com;</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">multiple</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">domains</span><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">yourdomain.com</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">www.yourdomain.com;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">all</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">domains</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">*.yourdomain.com;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">all</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">top-level</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">domains</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">yourdomain.*;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">unspecified</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Hostnames</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">(Listens</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">IP</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">address</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">itself)</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">&quot;&quot;</span><span style="color:#FDAEB7;font-style:italic;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">server {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">to</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">yourdomain.com</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server_name</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">yourdomain.com;</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">to</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">multiple</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">domains</span><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">server_name</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">yourdomain.com</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">www.yourdomain.com;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">to</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">all</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">domains</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server_name</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">*.yourdomain.com;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">to</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">all</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">top-level</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">domains</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server_name</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">yourdomain.*;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">to</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">unspecified</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Hostnames</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">(Listens</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">to</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">IP</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">address</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">itself)</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server_name</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">&quot;&quot;</span><span style="color:#B31D28;font-style:italic;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="静态资源" tabindex="-1">静态资源 <a class="header-anchor" href="#静态资源" aria-label="Permalink to &quot;静态资源&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">server {  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">80;</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">yourdomain.com;</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">{</span><span style="color:#E1E4E8;">      </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FDAEB7;font-style:italic;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/path/to/website;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">server {  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">80;</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server_name</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">yourdomain.com;</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">location</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">{</span><span style="color:#24292E;">      </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#B31D28;font-style:italic;">root</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/path/to/website;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="重定向" tabindex="-1">重定向 <a class="header-anchor" href="#重定向" aria-label="Permalink to &quot;重定向&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">server { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">80;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">www.yourdomain.com;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">301</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">http</span><span style="color:#E1E4E8;">:</span><span style="color:#6A737D;">//yourdomain.com$request_uri;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">server {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">80;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">www.yourdomain.com;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/redirect-url</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">{</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    	</span><span style="color:#FDAEB7;font-style:italic;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">301</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">http</span><span style="color:#E1E4E8;">:</span><span style="color:#6A737D;">//otherdomain.com; </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">server { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">80;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server_name</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">www.yourdomain.com;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">return</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">301</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">http</span><span style="color:#24292E;">:</span><span style="color:#6A737D;">//yourdomain.com$request_uri;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">server {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">80;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server_name</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">www.yourdomain.com;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">location</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/redirect-url</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">{</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    	</span><span style="color:#B31D28;font-style:italic;">return</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">301</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">http</span><span style="color:#24292E;">:</span><span style="color:#6A737D;">//otherdomain.com; </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="反向代理" tabindex="-1">反向代理 <a class="header-anchor" href="#反向代理" aria-label="Permalink to &quot;反向代理&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">server { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">80;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">yourdomain.com;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">#反向代理将请求转发给3000</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">{</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    	</span><span style="color:#FDAEB7;font-style:italic;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">http</span><span style="color:#E1E4E8;">:</span><span style="color:#6A737D;">//0.0.0.0:3000; </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">server { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">80;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server_name</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">yourdomain.com;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">#反向代理将请求转发给3000</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">location</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">{</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    	</span><span style="color:#B31D28;font-style:italic;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">http</span><span style="color:#24292E;">:</span><span style="color:#6A737D;">//0.0.0.0:3000; </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="负载均衡" tabindex="-1">负载均衡 <a class="header-anchor" href="#负载均衡" aria-label="Permalink to &quot;负载均衡&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">负载均衡策略:</span></span>
<span class="line"><span style="color:#E1E4E8;">    backup：热备，等主服务器停止工作了，备份机才工作</span></span>
<span class="line"><span style="color:#E1E4E8;">    轮询：将客户端的请求轮流分配给不同的主机</span></span>
<span class="line"><span style="color:#E1E4E8;">    权重：可以设置多台服务器的接收百分比！</span></span>
<span class="line"><span style="color:#E1E4E8;">    ip_hash：基于客户端的ip进行服务器分配</span></span>
<span class="line"><span style="color:#E1E4E8;">    fair：根据服务器的请求时间来进行分配</span></span>
<span class="line"><span style="color:#E1E4E8;">    url_hash：基于请求的地址进行服务器分配</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">负载均衡策略:</span></span>
<span class="line"><span style="color:#24292E;">    backup：热备，等主服务器停止工作了，备份机才工作</span></span>
<span class="line"><span style="color:#24292E;">    轮询：将客户端的请求轮流分配给不同的主机</span></span>
<span class="line"><span style="color:#24292E;">    权重：可以设置多台服务器的接收百分比！</span></span>
<span class="line"><span style="color:#24292E;">    ip_hash：基于客户端的ip进行服务器分配</span></span>
<span class="line"><span style="color:#24292E;">    fair：根据服务器的请求时间来进行分配</span></span>
<span class="line"><span style="color:#24292E;">    url_hash：基于请求的地址进行服务器分配</span></span></code></pre></div><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#vim /nginx/conf.d/default.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">upstream node_js { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">#默认nginx采用的是轮询策略</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">0.0.0.0</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">3000</span><span style="color:#FDAEB7;font-style:italic;">;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0.0</span><span style="color:#FDAEB7;font-style:italic;">.</span><span style="color:#79B8FF;">0.0</span><span style="color:#FDAEB7;font-style:italic;">:</span><span style="color:#79B8FF;">4000</span><span style="color:#FDAEB7;font-style:italic;">;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">123.131</span><span style="color:#FDAEB7;font-style:italic;">.</span><span style="color:#79B8FF;">121.122</span><span style="color:#FDAEB7;font-style:italic;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">#</span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">upstream tomcats{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">192.168.127.130</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">8080</span><span style="color:#FDAEB7;font-style:italic;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">192.168</span><span style="color:#FDAEB7;font-style:italic;">.</span><span style="color:#79B8FF;">127.130</span><span style="color:#FDAEB7;font-style:italic;">:</span><span style="color:#79B8FF;">8081</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">backup;</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">#热备</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">#</span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">upstream tomcats{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">192.168.127.130</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">8080</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">weight=</span><span style="color:#79B8FF;">2</span><span style="color:#FDAEB7;font-style:italic;">;</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">#权重</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">192.168</span><span style="color:#FDAEB7;font-style:italic;">.</span><span style="color:#79B8FF;">127.130</span><span style="color:#FDAEB7;font-style:italic;">:</span><span style="color:#79B8FF;">8081</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">weight=</span><span style="color:#79B8FF;">1</span><span style="color:#FDAEB7;font-style:italic;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">#</span><span style="color:#79B8FF;">4</span></span>
<span class="line"><span style="color:#E1E4E8;">upstream tomcats{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">ip_hash;</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">#ip_hash策略</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">192.168.127.130</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">8080</span><span style="color:#FDAEB7;font-style:italic;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">192.168</span><span style="color:#FDAEB7;font-style:italic;">.</span><span style="color:#79B8FF;">127.130</span><span style="color:#FDAEB7;font-style:italic;">:</span><span style="color:#79B8FF;">8081</span><span style="color:#FDAEB7;font-style:italic;">;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">server {  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">80;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">localhost;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">{</span><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    	</span><span style="color:#FDAEB7;font-style:italic;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">http</span><span style="color:#E1E4E8;">:</span><span style="color:#6A737D;">//node_js; </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#vim /nginx/conf.d/default.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">upstream node_js { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">#默认nginx采用的是轮询策略</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">0.0.0.0</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">3000</span><span style="color:#B31D28;font-style:italic;">;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0.0</span><span style="color:#B31D28;font-style:italic;">.</span><span style="color:#005CC5;">0.0</span><span style="color:#B31D28;font-style:italic;">:</span><span style="color:#005CC5;">4000</span><span style="color:#B31D28;font-style:italic;">;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">123.131</span><span style="color:#B31D28;font-style:italic;">.</span><span style="color:#005CC5;">121.122</span><span style="color:#B31D28;font-style:italic;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">#</span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">upstream tomcats{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">192.168.127.130</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">8080</span><span style="color:#B31D28;font-style:italic;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#B31D28;font-style:italic;">.</span><span style="color:#005CC5;">127.130</span><span style="color:#B31D28;font-style:italic;">:</span><span style="color:#005CC5;">8081</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">backup;</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">#热备</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">#</span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">upstream tomcats{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">192.168.127.130</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">8080</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">weight=</span><span style="color:#005CC5;">2</span><span style="color:#B31D28;font-style:italic;">;</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">#权重</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#B31D28;font-style:italic;">.</span><span style="color:#005CC5;">127.130</span><span style="color:#B31D28;font-style:italic;">:</span><span style="color:#005CC5;">8081</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">weight=</span><span style="color:#005CC5;">1</span><span style="color:#B31D28;font-style:italic;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">#</span><span style="color:#005CC5;">4</span></span>
<span class="line"><span style="color:#24292E;">upstream tomcats{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">ip_hash;</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">#ip_hash策略</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">192.168.127.130</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">8080</span><span style="color:#B31D28;font-style:italic;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">192.168</span><span style="color:#B31D28;font-style:italic;">.</span><span style="color:#005CC5;">127.130</span><span style="color:#B31D28;font-style:italic;">:</span><span style="color:#005CC5;">8081</span><span style="color:#B31D28;font-style:italic;">;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">server {  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">80;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server_name</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">localhost;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">location</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">{</span><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    	</span><span style="color:#B31D28;font-style:italic;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">http</span><span style="color:#24292E;">:</span><span style="color:#6A737D;">//node_js; </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="ssl-协议" tabindex="-1">SSL 协议 <a class="header-anchor" href="#ssl-协议" aria-label="Permalink to &quot;SSL 协议&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">server { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">443</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">ssl;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">yourdomain.com;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">ssl</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">on;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">ssl_certificate</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/path/to/cert.pem;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">ssl_certificate_key</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/path/to/privatekey.pem;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">ssl_stapling</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">on;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">ssl_stapling_verify</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">on;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">ssl_trusted_certificate</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/path/to/fullchain.pem;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">ssl_protocols</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">TLSv1</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">TLSv1.1</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">TLSv1.2;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">ssl_session_timeout</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">1h;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">ssl_session_cache</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">shared</span><span style="color:#E1E4E8;">:</span><span style="color:#FDAEB7;font-style:italic;">SSL:</span><span style="color:#79B8FF;">50</span><span style="color:#FDAEB7;font-style:italic;">m;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">add_header</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Strict-Transport-Security</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">max-age=</span><span style="color:#79B8FF;">15768000</span><span style="color:#FDAEB7;font-style:italic;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;"># Permanent Redirect for HTTP to HTTPS</span></span>
<span class="line"><span style="color:#E1E4E8;">server {  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">80;</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">yourdomain.com;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">301</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">https</span><span style="color:#E1E4E8;">:</span><span style="color:#6A737D;">//$host$request_uri;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">server { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">443</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">ssl;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server_name</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">yourdomain.com;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">ssl</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">on;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">ssl_certificate</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/path/to/cert.pem;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">ssl_certificate_key</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/path/to/privatekey.pem;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">ssl_stapling</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">on;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">ssl_stapling_verify</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">on;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">ssl_trusted_certificate</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/path/to/fullchain.pem;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">ssl_protocols</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">TLSv1</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">TLSv1.1</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">TLSv1.2;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">ssl_session_timeout</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">1h;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">ssl_session_cache</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">shared</span><span style="color:#24292E;">:</span><span style="color:#B31D28;font-style:italic;">SSL:</span><span style="color:#005CC5;">50</span><span style="color:#B31D28;font-style:italic;">m;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">add_header</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Strict-Transport-Security</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">max-age=</span><span style="color:#005CC5;">15768000</span><span style="color:#B31D28;font-style:italic;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;"># Permanent Redirect for HTTP to HTTPS</span></span>
<span class="line"><span style="color:#24292E;">server {  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">80;</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server_name</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">yourdomain.com;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">return</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">301</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">https</span><span style="color:#24292E;">:</span><span style="color:#6A737D;">//$host$request_uri;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="动静分离" tabindex="-1">动静分离 <a class="header-anchor" href="#动静分离" aria-label="Permalink to &quot;动静分离&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">server{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">listen</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">80;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">server_name</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">localhost;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">#代理动态资源</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FDAEB7;font-style:italic;">proxy_pass</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">http</span><span style="color:#E1E4E8;">:</span><span style="color:#6A737D;">//192.168.127.130:8080;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">     #静态资源配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    location /html {</span></span>
<span class="line"><span style="color:#E1E4E8;">     	</span><span style="color:#FDAEB7;font-style:italic;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/data;</span><span style="color:#E1E4E8;">	</span><span style="color:#FDAEB7;font-style:italic;">#静态资源的路径</span></span>
<span class="line"><span style="color:#E1E4E8;">     	</span><span style="color:#FDAEB7;font-style:italic;">index</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">index.html;</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">#默认访问的资源</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    location /img {</span></span>
<span class="line"><span style="color:#E1E4E8;">     	</span><span style="color:#FDAEB7;font-style:italic;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">/data;</span></span>
<span class="line"><span style="color:#E1E4E8;">     	</span><span style="color:#FDAEB7;font-style:italic;">autoindex</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">on;#以列表显示当前目录下的所有图片</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">server{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">listen</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">80;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">server_name</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">localhost;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">#代理动态资源</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">location</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#B31D28;font-style:italic;">proxy_pass</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">http</span><span style="color:#24292E;">:</span><span style="color:#6A737D;">//192.168.127.130:8080;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">     #静态资源配置</span></span>
<span class="line"><span style="color:#24292E;">    location /html {</span></span>
<span class="line"><span style="color:#24292E;">     	</span><span style="color:#B31D28;font-style:italic;">root</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/data;</span><span style="color:#24292E;">	</span><span style="color:#B31D28;font-style:italic;">#静态资源的路径</span></span>
<span class="line"><span style="color:#24292E;">     	</span><span style="color:#B31D28;font-style:italic;">index</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">index.html;</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">#默认访问的资源</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    location /img {</span></span>
<span class="line"><span style="color:#24292E;">     	</span><span style="color:#B31D28;font-style:italic;">root</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">/data;</span></span>
<span class="line"><span style="color:#24292E;">     	</span><span style="color:#B31D28;font-style:italic;">autoindex</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">on;#以列表显示当前目录下的所有图片</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="https" tabindex="-1">HTTPS <a class="header-anchor" href="#https" aria-label="Permalink to &quot;HTTPS&quot;">​</a></h4><h5 id="工作流程" tabindex="-1">工作流程 <a class="header-anchor" href="#工作流程" aria-label="Permalink to &quot;工作流程&quot;">​</a></h5><blockquote><ol><li>客户端（浏览器）访问 <code>https://www.baidu.com</code> 百度网站；</li><li>百度服务器返回 <code>HTTPS</code> 使用的 <code>CA</code> 证书；</li><li>浏览器验证 <code>CA</code> 证书是否为合法证书；</li><li>验证通过，证书合法，生成一串随机数并使用公钥（证书中提供的）进行加密；</li><li>发送公钥加密后的随机数给百度服务器；</li><li>百度服务器拿到密文，通过私钥进行解密，获取到随机数（公钥加密，私钥解密，反之也可以）；</li><li>百度服务器把要发送给浏览器的内容，使用随机数进行加密后传输给浏览器；</li><li>此时浏览器可以使用随机数进行解密，获取到服务器的真实传输内容；</li></ol></blockquote><h5 id="配置证书" tabindex="-1">配置证书 <a class="header-anchor" href="#配置证书" aria-label="Permalink to &quot;配置证书&quot;">​</a></h5><p>下载证书压缩文件，里面有个 <code>Nginx</code> 文件夹，把 <code>xxx.crt</code> 和 <code>xxx.key</code> 文件拷贝到服务器目录，再进行配置：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">server {</span></span>
<span class="line"><span style="color:#e1e4e8;">  listen 443 ssl http2 default_server;   # SSL 访问端口号为 443</span></span>
<span class="line"><span style="color:#e1e4e8;">  server_name lion.club;         # 填写绑定证书的域名(我这里是随便写的)</span></span>
<span class="line"><span style="color:#e1e4e8;">  ssl_certificate /etc/nginx/https/lion.club_bundle.crt;   # 证书地址</span></span>
<span class="line"><span style="color:#e1e4e8;">  ssl_certificate_key /etc/nginx/https/lion.club.key;      # 私钥地址</span></span>
<span class="line"><span style="color:#e1e4e8;">  ssl_session_timeout 10m;</span></span>
<span class="line"><span style="color:#e1e4e8;">  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # 支持ssl协议版本，默认为后三个，主流版本是[TLSv1.2]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  location / {</span></span>
<span class="line"><span style="color:#e1e4e8;">    root         /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#e1e4e8;">    index        index.html index.htm;</span></span>
<span class="line"><span style="color:#e1e4e8;">  }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">server {</span></span>
<span class="line"><span style="color:#24292e;">  listen 443 ssl http2 default_server;   # SSL 访问端口号为 443</span></span>
<span class="line"><span style="color:#24292e;">  server_name lion.club;         # 填写绑定证书的域名(我这里是随便写的)</span></span>
<span class="line"><span style="color:#24292e;">  ssl_certificate /etc/nginx/https/lion.club_bundle.crt;   # 证书地址</span></span>
<span class="line"><span style="color:#24292e;">  ssl_certificate_key /etc/nginx/https/lion.club.key;      # 私钥地址</span></span>
<span class="line"><span style="color:#24292e;">  ssl_session_timeout 10m;</span></span>
<span class="line"><span style="color:#24292e;">  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # 支持ssl协议版本，默认为后三个，主流版本是[TLSv1.2]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  location / {</span></span>
<span class="line"><span style="color:#24292e;">    root         /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#24292e;">    index        index.html index.htm;</span></span>
<span class="line"><span style="color:#24292e;">  }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>如此配置后就能正常访问 <code>HTTPS</code> 版的网站</p><h4 id="跨域-cors" tabindex="-1">跨域 CORS <a class="header-anchor" href="#跨域-cors" aria-label="Permalink to &quot;跨域 CORS&quot;">​</a></h4><p>例如：</p><ul><li>前端 <code>server</code> 的域名为： <code>fe.server.com</code></li><li>后端服务的域名为： <code>dev.server.com</code></li></ul><p>现在我在 <code>fe.server.com</code> 对 <code>dev.server.com</code> 发起请求一定会出现跨域。</p><p>现在我们只需要启动一个 <code>Nginx</code> 服务器，将 <code>server_name</code> 设置为 <code>fe.server.com</code> 然后设置相应的 <code>location</code> 以拦截前端需要跨域的请求，最后将请求代理回 <code>dev.server.com</code> 。如下面的配置：</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">server</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> listen </span><span style="color:#E1E4E8;">     </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;"> server_name </span><span style="color:#E1E4E8;"> fe.server.com; </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">location</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">/ </span><span style="color:#E1E4E8;">{  </span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;"> proxy_pass </span><span style="color:#E1E4E8;">dev.server.com; </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">server</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> listen </span><span style="color:#24292E;">     </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;"> server_name </span><span style="color:#24292E;"> fe.server.com; </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">location</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">/ </span><span style="color:#24292E;">{  </span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;"> proxy_pass </span><span style="color:#24292E;">dev.server.com; </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这样可以完美绕过浏览器的同源策略： <code>fe.server.com</code> 访问 <code>Nginx</code> 的 <code>fe.server.com</code> 属于同源访问，而 <code>Nginx</code> 对服务端转发的请求不会触发浏览器的同源策略。</p><h4 id="gzip-压缩" tabindex="-1">gzip 压缩 <a class="header-anchor" href="#gzip-压缩" aria-label="Permalink to &quot;gzip 压缩&quot;">​</a></h4><p><code>GZIP</code> 是规定的三种标准 <code>HTTP</code> 压缩格式之一。目前绝大多数的网站都在使用 <code>GZIP</code> 传输 <code>HTML</code> 、<code>CSS</code> 、 <code>JavaScript</code> 等资源文件。</p><p>对于文本文件， <code>GZiP</code> 的效果非常明显，开启后传输所需流量大约会降至 <code>1/4~1/3</code> 。</p><p>并不是每个浏览器都支持 <code>gzip</code> 的，如何知道客户端是否支持 <code>gzip</code> 呢，请求头中的 <code>Accept-Encoding</code> 来标识对压缩的支持。</p><p>启用 <code>gzip</code> 同时需要客户端和服务端的支持，如果客户端支持 <code>gzip</code> 的解析，那么只要服务端能够返回 <code>gzip</code> 的文件就可以启用 <code>gzip</code> 了,我们可以通过 <code>Nginx</code> 的配置来让服务端支持 <code>gzip</code> 。</p><p><code>respone</code> 中 <code>content-encoding:gzip</code> ，指服务端开启了 <code>gzip</code> 的压缩方式</p><p>在 <code>/etc/nginx/conf.d/</code> 文件夹中新建配置文件 <code>gzip.conf</code> ：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># # 默认off，是否开启gzip</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip on;</span></span>
<span class="line"><span style="color:#e1e4e8;"># 要采用 gzip 压缩的 MIME 文件类型，其中 text/html 被系统强制启用；</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># ---- 以上两个参数开启就可以支持Gzip压缩了 ---- #</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认 off，该模块启用后，Nginx 首先检查是否存在请求静态文件的 gz 结尾的文件，如果有则直接返回该 .gz 文件内容；</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_static on;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认 off，nginx做为反向代理时启用，用于设置启用或禁用从代理服务器上收到相应内容 gzip 压缩；</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_proxied any;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 用于在响应消息头中添加 Vary：Accept-Encoding，使代理服务器根据请求头中的 Accept-Encoding 识别是否启用 gzip 压缩；</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_vary on;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># gzip 压缩比，压缩级别是 1-9，1 压缩级别最低，9 最高，级别越高压缩率越大，压缩时间越长，建议 4-6；</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_comp_level 6;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 获取多少内存用于缓存压缩结果，16 8k 表示以 8k*16 为单位获得；</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_buffers 16 8k;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 允许压缩的页面最小字节数，页面字节数从header头中的 Content-Length 中进行获取。默认值是 0，不管页面多大都压缩。建议设置成大于 1k 的字节数，小于 1k 可能会越压越大；</span></span>
<span class="line"><span style="color:#e1e4e8;"># gzip_min_length 1k;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 默认 1.1，启用 gzip 所需的 HTTP 最低版本；</span></span>
<span class="line"><span style="color:#e1e4e8;">gzip_http_version 1.1;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># # 默认off，是否开启gzip</span></span>
<span class="line"><span style="color:#24292e;">gzip on;</span></span>
<span class="line"><span style="color:#24292e;"># 要采用 gzip 压缩的 MIME 文件类型，其中 text/html 被系统强制启用；</span></span>
<span class="line"><span style="color:#24292e;">gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># ---- 以上两个参数开启就可以支持Gzip压缩了 ---- #</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 默认 off，该模块启用后，Nginx 首先检查是否存在请求静态文件的 gz 结尾的文件，如果有则直接返回该 .gz 文件内容；</span></span>
<span class="line"><span style="color:#24292e;">gzip_static on;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 默认 off，nginx做为反向代理时启用，用于设置启用或禁用从代理服务器上收到相应内容 gzip 压缩；</span></span>
<span class="line"><span style="color:#24292e;">gzip_proxied any;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 用于在响应消息头中添加 Vary：Accept-Encoding，使代理服务器根据请求头中的 Accept-Encoding 识别是否启用 gzip 压缩；</span></span>
<span class="line"><span style="color:#24292e;">gzip_vary on;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># gzip 压缩比，压缩级别是 1-9，1 压缩级别最低，9 最高，级别越高压缩率越大，压缩时间越长，建议 4-6；</span></span>
<span class="line"><span style="color:#24292e;">gzip_comp_level 6;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 获取多少内存用于缓存压缩结果，16 8k 表示以 8k*16 为单位获得；</span></span>
<span class="line"><span style="color:#24292e;">gzip_buffers 16 8k;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 允许压缩的页面最小字节数，页面字节数从header头中的 Content-Length 中进行获取。默认值是 0，不管页面多大都压缩。建议设置成大于 1k 的字节数，小于 1k 可能会越压越大；</span></span>
<span class="line"><span style="color:#24292e;"># gzip_min_length 1k;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 默认 1.1，启用 gzip 所需的 HTTP 最低版本；</span></span>
<span class="line"><span style="color:#24292e;">gzip_http_version 1.1;</span></span></code></pre></div>`,59),e=[o];function t(c,i,r,y,E,f){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{B as __pageData,d as default};
