import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.8048b864.js";const d=JSON.parse('{"title":"Canal","description":"","frontmatter":{},"headers":[],"relativePath":"中间件/数据库中间件/canal/canal.md","filePath":"中间件/数据库中间件/canal/canal.md","lastUpdated":1719224116000}'),p={name:"中间件/数据库中间件/canal/canal.md"},o=l(`<h1 id="canal" tabindex="-1">Canal <a class="header-anchor" href="#canal" aria-label="Permalink to &quot;Canal&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#示例">示例</a><ul><li><a href="#搭建canal环境">搭建Canal环境</a></li><li><a href="#springboot整合canal">springboot整合canal</a></li><li><a href="#canal-spring-boot-starter">canal-spring-boot-starter</a></li><li><a href="#canal实际测试">canal实际测试</a></li></ul></li></ul></nav><p>主要用途是基于 MySQL 数据库增量日志解析，提供增量数据订阅和消费。</p><p>基于日志增量订阅和消费的业务包括：</p><ul><li>数据库镜像</li><li>数据库实时备份</li><li>索引构建和实时维护(拆分异构索引、倒排索引等)</li><li>业务 cache 刷新</li><li>带业务逻辑的增量数据处理</li></ul><p>当前的 canal 支持源端 MySQL 版本包括 5.1.x , 5.5.x , 5.6.x , 5.7.x , 8.0.x</p><blockquote><p>官方文档：<a href="https://github.com/alibaba/canal/wiki/QuickStart" target="_blank" rel="noreferrer">https://github.com/alibaba/canal/wiki/QuickStart</a></p></blockquote><p>canal 工作原理</p><ul><li><p>canal 模拟 MySQL slave 的交互协议，伪装自己为 MySQL slave ，向 MySQL master 发送dump 协议</p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301632665.png" alt="image-20230615143944915"></p><ul><li>MySQL master 将数据变更写入二进制日志( binary log, 其中记录叫做二进制日志事件binary log events，可以通过 show binlog events 进行查看)</li><li>MySQL slave 将 master 的 binary log events 拷贝到它的中继日志(relay log)</li><li>MySQL slave 重放 relay log 中事件，将数据变更反映它自己的数据</li></ul></li><li><p>MySQL master 收到 dump 请求，开始推送 binary log 给 slave (即 canal )</p></li><li><p>canal 解析 binary log 对象(原始为 byte 流)</p></li></ul><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><h3 id="搭建canal环境" tabindex="-1">搭建Canal环境 <a class="header-anchor" href="#搭建canal环境" aria-label="Permalink to &quot;搭建Canal环境&quot;">​</a></h3><h4 id="mysql配置" tabindex="-1">mysql配置 <a class="header-anchor" href="#mysql配置" aria-label="Permalink to &quot;mysql配置&quot;">​</a></h4><blockquote><p>当前的canal开源版本支持5.7及以下的版本</p></blockquote><blockquote><p>canal的原理是基于mysql binlog技术，需要开启mysql的binlog写入功能，并且配置binlog模式为row。</p></blockquote><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">[mysqld]</span><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#F97583;">log-bin</span><span style="color:#E1E4E8;">=mysql-bin </span></span>
<span class="line"><span style="color:#F97583;">binlog-format</span><span style="color:#E1E4E8;">=ROW </span><span style="color:#6A737D;">#选择row模式  </span></span>
<span class="line"><span style="color:#F97583;">server_id</span><span style="color:#E1E4E8;">=1 </span><span style="color:#6A737D;">#配置mysql replaction需要定义，不能和canal的slaveId重复</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">[mysqld]</span><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#D73A49;">log-bin</span><span style="color:#24292E;">=mysql-bin </span></span>
<span class="line"><span style="color:#D73A49;">binlog-format</span><span style="color:#24292E;">=ROW </span><span style="color:#6A737D;">#选择row模式  </span></span>
<span class="line"><span style="color:#D73A49;">server_id</span><span style="color:#24292E;">=1 </span><span style="color:#6A737D;">#配置mysql replaction需要定义，不能和canal的slaveId重复</span></span></code></pre></div><p>数据库重启后, 简单测试 <code>my.cnf</code> 配置是否生效:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql&gt; show variables like &#39;binlog_format&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| Variable_name | Value |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+-------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| binlog_format | ROW   |</span></span>
<span class="line"><span style="color:#e1e4e8;">+---------------+-------+</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql&gt; show variables like &#39;binlog_format&#39;;</span></span>
<span class="line"><span style="color:#24292e;">+---------------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| Variable_name | Value |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+-------+</span></span>
<span class="line"><span style="color:#24292e;">| binlog_format | ROW   |</span></span>
<span class="line"><span style="color:#24292e;">+---------------+-------+</span></span></code></pre></div><blockquote><p>canal的原理是模拟自己为mysql slave，所以这里一定需要做为mysql slave的相关权限</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">mysql -uroot -proot</span></span>
<span class="line"><span style="color:#e1e4e8;">#创建账号(账号：canal;密码：canal）</span></span>
<span class="line"><span style="color:#e1e4e8;">CREATE USER canal IDENTIFIED BY &#39;canal&#39;; </span></span>
<span class="line"><span style="color:#e1e4e8;">#授予权限</span></span>
<span class="line"><span style="color:#e1e4e8;">GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO &#39;canal&#39;@&#39;%&#39;;</span></span>
<span class="line"><span style="color:#e1e4e8;">#刷新并应用权限</span></span>
<span class="line"><span style="color:#e1e4e8;">FLUSH PRIVILEGES;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">mysql -uroot -proot</span></span>
<span class="line"><span style="color:#24292e;">#创建账号(账号：canal;密码：canal）</span></span>
<span class="line"><span style="color:#24292e;">CREATE USER canal IDENTIFIED BY &#39;canal&#39;; </span></span>
<span class="line"><span style="color:#24292e;">#授予权限</span></span>
<span class="line"><span style="color:#24292e;">GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO &#39;canal&#39;@&#39;%&#39;;</span></span>
<span class="line"><span style="color:#24292e;">#刷新并应用权限</span></span>
<span class="line"><span style="color:#24292e;">FLUSH PRIVILEGES;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#针对已有的账户可通过grants查询权限：</span></span>
<span class="line"><span style="color:#e1e4e8;">show grants for &#39;canal&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#针对已有的账户可通过grants查询权限：</span></span>
<span class="line"><span style="color:#24292e;">show grants for &#39;canal&#39;</span></span></code></pre></div><blockquote><p>导入初始化SQL canal/canal_admin/canal_manager.sql</p></blockquote><h4 id="canal配置" tabindex="-1">Canal配置 <a class="header-anchor" href="#canal配置" aria-label="Permalink to &quot;Canal配置&quot;">​</a></h4><h5 id="docker-compose部署canal" tabindex="-1">docker-compose部署Canal <a class="header-anchor" href="#docker-compose部署canal" aria-label="Permalink to &quot;docker-compose部署Canal&quot;">​</a></h5><p>docker-compose-canal.yml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;3&#39;</span></span>
<span class="line"><span style="color:#85E89D;">networks</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">canal</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">canal_admin</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">canal/canal-admin:v1.1.5</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">canal_admin</span><span style="color:#E1E4E8;">             </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">unless-stopped</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:                               </span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;./canal/canal-admin/conf/application.yml:/home/admin/canal-admin/conf/application.yml&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;"># 如果需要jvm内存控制可放开下面注释，修改\`JAVA_OPTS\`参数</span></span>
<span class="line"><span style="color:#6A737D;">#      - &quot;./canal/canal-admin/bin/startup.sh:/home/admin/canal-admin/bin/startup.sh&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;./canal/canal-admin/logs:/home/admin/canal-admin/logs&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">TZ</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Asia/Shanghai</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">LANG</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">en_US.UTF-8</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">canal.adminUser</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">admin</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">canal.adminPasswd</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">xxx</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">spring.datasource.address</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">xxx:13306</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">spring.datasource.database</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">canal_manager</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">spring.datasource.username</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">xxx</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">spring.datasource.password</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">xxx</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;8089:8089&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">networks</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">canal</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">canal_server</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">canal/canal-server:v1.1.5</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">canal_server</span><span style="color:#E1E4E8;">            </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">unless-stopped</span><span style="color:#E1E4E8;">                   </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:                                 </span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;./canal/canal-server/conf/example/instance.properties:/home/admin/canal-server/conf/example/instance.properties&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;./canal/canal-server/conf/canal.properties:/home/admin/canal-server/conf/canal.properties&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;./canal/canal-server/conf/canal_local.properties:/home/admin/canal-server/conf/canal_local.properties&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;./canal/canal-server/logs:/home/admin/canal-server/logs&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">:                           </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">TZ</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">Asia/Shanghai</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">LANG</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">en_US.UTF-8</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">canal.register.ip</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">81.68.218.181</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">canal.admin.manager</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">canal_admin:8089</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">canal.admin.port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">11110</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">canal.admin.user</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">admin</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">canal.admin.passwd</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9</span></span>
<span class="line"><span style="color:#6A737D;">#      canal.admin.register.cluster: online</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;11110:11110&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;11111:11111&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;11112:11112&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">depends_on</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">canal_admin</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">links</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">canal_admin</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">networks</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">canal</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;3&#39;</span></span>
<span class="line"><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">canal</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">canal_admin</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">canal/canal-admin:v1.1.5</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">canal_admin</span><span style="color:#24292E;">             </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">unless-stopped</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:                               </span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;./canal/canal-admin/conf/application.yml:/home/admin/canal-admin/conf/application.yml&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;"># 如果需要jvm内存控制可放开下面注释，修改\`JAVA_OPTS\`参数</span></span>
<span class="line"><span style="color:#6A737D;">#      - &quot;./canal/canal-admin/bin/startup.sh:/home/admin/canal-admin/bin/startup.sh&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;./canal/canal-admin/logs:/home/admin/canal-admin/logs&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">TZ</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Asia/Shanghai</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">LANG</span><span style="color:#24292E;">: </span><span style="color:#032F62;">en_US.UTF-8</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">canal.adminUser</span><span style="color:#24292E;">: </span><span style="color:#032F62;">admin</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">canal.adminPasswd</span><span style="color:#24292E;">: </span><span style="color:#032F62;">xxx</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">spring.datasource.address</span><span style="color:#24292E;">: </span><span style="color:#032F62;">xxx:13306</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">spring.datasource.database</span><span style="color:#24292E;">: </span><span style="color:#032F62;">canal_manager</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">spring.datasource.username</span><span style="color:#24292E;">: </span><span style="color:#032F62;">xxx</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">spring.datasource.password</span><span style="color:#24292E;">: </span><span style="color:#032F62;">xxx</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;8089:8089&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">canal</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">canal_server</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">canal/canal-server:v1.1.5</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">canal_server</span><span style="color:#24292E;">            </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">unless-stopped</span><span style="color:#24292E;">                   </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:                                 </span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;./canal/canal-server/conf/example/instance.properties:/home/admin/canal-server/conf/example/instance.properties&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;./canal/canal-server/conf/canal.properties:/home/admin/canal-server/conf/canal.properties&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;./canal/canal-server/conf/canal_local.properties:/home/admin/canal-server/conf/canal_local.properties&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;./canal/canal-server/logs:/home/admin/canal-server/logs&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">:                           </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">TZ</span><span style="color:#24292E;">: </span><span style="color:#032F62;">Asia/Shanghai</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">LANG</span><span style="color:#24292E;">: </span><span style="color:#032F62;">en_US.UTF-8</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">canal.register.ip</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">81.68.218.181</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">canal.admin.manager</span><span style="color:#24292E;">: </span><span style="color:#032F62;">canal_admin:8089</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">canal.admin.port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">11110</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">canal.admin.user</span><span style="color:#24292E;">: </span><span style="color:#032F62;">admin</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">canal.admin.passwd</span><span style="color:#24292E;">: </span><span style="color:#032F62;">6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9</span></span>
<span class="line"><span style="color:#6A737D;">#      canal.admin.register.cluster: online</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;11110:11110&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;11111:11111&quot;</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;11112:11112&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">depends_on</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">canal_admin</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">links</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">canal_admin</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">networks</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">canal</span></span></code></pre></div><h5 id="canal-properties" tabindex="-1">canal.properties <a class="header-anchor" href="#canal-properties" aria-label="Permalink to &quot;canal.properties&quot;">​</a></h5><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># canal admin config</span></span>
<span class="line"><span style="color:#6A737D;">#canal.admin.manager = 127.0.0.1:8089</span></span>
<span class="line"><span style="color:#F97583;">canal.admin.port</span><span style="color:#E1E4E8;"> = 11110</span></span>
<span class="line"><span style="color:#F97583;">canal.admin.user</span><span style="color:#E1E4E8;"> = admin</span></span>
<span class="line"><span style="color:#F97583;">canal.admin.passwd</span><span style="color:#E1E4E8;"> = 6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># tcp, kafka, rocketMQ, rabbitMQ</span></span>
<span class="line"><span style="color:#F97583;">canal.serverMode</span><span style="color:#E1E4E8;"> = rabbitMQ</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">rabbitmq.host</span><span style="color:#E1E4E8;"> = xxx:5672</span></span>
<span class="line"><span style="color:#F97583;">rabbitmq.virtual.host</span><span style="color:#E1E4E8;"> = /</span></span>
<span class="line"><span style="color:#F97583;">rabbitmq.exchange</span><span style="color:#E1E4E8;"> = canal.exchange</span></span>
<span class="line"><span style="color:#F97583;">rabbitmq.username</span><span style="color:#E1E4E8;"> = admin</span></span>
<span class="line"><span style="color:#F97583;">rabbitmq.password</span><span style="color:#E1E4E8;"> = admin</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># canal admin config</span></span>
<span class="line"><span style="color:#6A737D;">#canal.admin.manager = 127.0.0.1:8089</span></span>
<span class="line"><span style="color:#D73A49;">canal.admin.port</span><span style="color:#24292E;"> = 11110</span></span>
<span class="line"><span style="color:#D73A49;">canal.admin.user</span><span style="color:#24292E;"> = admin</span></span>
<span class="line"><span style="color:#D73A49;">canal.admin.passwd</span><span style="color:#24292E;"> = 6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># tcp, kafka, rocketMQ, rabbitMQ</span></span>
<span class="line"><span style="color:#D73A49;">canal.serverMode</span><span style="color:#24292E;"> = rabbitMQ</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">rabbitmq.host</span><span style="color:#24292E;"> = xxx:5672</span></span>
<span class="line"><span style="color:#D73A49;">rabbitmq.virtual.host</span><span style="color:#24292E;"> = /</span></span>
<span class="line"><span style="color:#D73A49;">rabbitmq.exchange</span><span style="color:#24292E;"> = canal.exchange</span></span>
<span class="line"><span style="color:#D73A49;">rabbitmq.username</span><span style="color:#24292E;"> = admin</span></span>
<span class="line"><span style="color:#D73A49;">rabbitmq.password</span><span style="color:#24292E;"> = admin</span></span></code></pre></div><h5 id="example-instance-propertios" tabindex="-1">example/instance.propertios <a class="header-anchor" href="#example-instance-propertios" aria-label="Permalink to &quot;example/instance.propertios&quot;">​</a></h5><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">canal.instance.master.address</span><span style="color:#E1E4E8;">=xxx:3306</span></span>
<span class="line"><span style="color:#6A737D;"># username/password</span></span>
<span class="line"><span style="color:#F97583;">canal.instance.dbUsername</span><span style="color:#E1E4E8;">=canal</span></span>
<span class="line"><span style="color:#F97583;">canal.instance.dbPassword</span><span style="color:#E1E4E8;">=canal</span></span>
<span class="line"><span style="color:#F97583;">canal.instance.connectionCharset</span><span style="color:#E1E4E8;"> = UTF-8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># table regex 只同步test数据库下的t_user表</span></span>
<span class="line"><span style="color:#F97583;">canal.instance.filter.regex</span><span style="color:#E1E4E8;">=test\\\\.t_user</span></span>
<span class="line"><span style="color:#6A737D;"># table black regex</span></span>
<span class="line"><span style="color:#F97583;">canal.instance.filter.black.regex</span><span style="color:#E1E4E8;">=mysql\\\\.slave_.*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># mq config</span></span>
<span class="line"><span style="color:#F97583;">canal.mq.topic</span><span style="color:#E1E4E8;">=canal_routing_key</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">canal.instance.master.address</span><span style="color:#24292E;">=xxx:3306</span></span>
<span class="line"><span style="color:#6A737D;"># username/password</span></span>
<span class="line"><span style="color:#D73A49;">canal.instance.dbUsername</span><span style="color:#24292E;">=canal</span></span>
<span class="line"><span style="color:#D73A49;">canal.instance.dbPassword</span><span style="color:#24292E;">=canal</span></span>
<span class="line"><span style="color:#D73A49;">canal.instance.connectionCharset</span><span style="color:#24292E;"> = UTF-8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># table regex 只同步test数据库下的t_user表</span></span>
<span class="line"><span style="color:#D73A49;">canal.instance.filter.regex</span><span style="color:#24292E;">=test\\\\.t_user</span></span>
<span class="line"><span style="color:#6A737D;"># table black regex</span></span>
<span class="line"><span style="color:#D73A49;">canal.instance.filter.black.regex</span><span style="color:#24292E;">=mysql\\\\.slave_.*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># mq config</span></span>
<span class="line"><span style="color:#D73A49;">canal.mq.topic</span><span style="color:#24292E;">=canal_routing_key</span></span></code></pre></div><h3 id="springboot整合canal" tabindex="-1">springboot整合canal <a class="header-anchor" href="#springboot整合canal" aria-label="Permalink to &quot;springboot整合canal&quot;">​</a></h3><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-amqp&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-amqp&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># RabbitMQ配置</span></span>
<span class="line"><span style="color:#85E89D;">spring</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">rabbitmq</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">addresses</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">xxx:5672</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 指定client连接到的server的地址，多个以逗号分隔</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">username</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">admin</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">password</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">admin</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">virtual-host</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># RabbitMQ配置</span></span>
<span class="line"><span style="color:#22863A;">spring</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">rabbitmq</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">addresses</span><span style="color:#24292E;">: </span><span style="color:#032F62;">xxx:5672</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 指定client连接到的server的地址，多个以逗号分隔</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">username</span><span style="color:#24292E;">: </span><span style="color:#032F62;">admin</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">password</span><span style="color:#24292E;">: </span><span style="color:#032F62;">admin</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">virtual-host</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Slf4j</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CanalRabbitMqListener</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">RabbitListener</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">bindings</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            @</span><span style="color:#F97583;">QueueBinding</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">Queue</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> MqConstant.CANAL_QUEUE, </span><span style="color:#79B8FF;">durable</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;true&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#79B8FF;">exchange</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">Exchange</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> MqConstant.CANAL_EXCHANGE),</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#79B8FF;">key</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> MqConstant.CANAL_ROUTING_KEY</span></span>
<span class="line"><span style="color:#E1E4E8;">            )</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">handleCanalDataChange</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">message</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        log.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;[canal] 接收消息: {}&quot;</span><span style="color:#E1E4E8;">, JSON.</span><span style="color:#B392F0;">toJSONString</span><span style="color:#E1E4E8;">(message));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Slf4j</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CanalRabbitMqListener</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">RabbitListener</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">bindings</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            @</span><span style="color:#D73A49;">QueueBinding</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">Queue</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> MqConstant.CANAL_QUEUE, </span><span style="color:#005CC5;">durable</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;true&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#005CC5;">exchange</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">Exchange</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> MqConstant.CANAL_EXCHANGE),</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#005CC5;">key</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> MqConstant.CANAL_ROUTING_KEY</span></span>
<span class="line"><span style="color:#24292E;">            )</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handleCanalDataChange</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">message</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        log.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;[canal] 接收消息: {}&quot;</span><span style="color:#24292E;">, JSON.</span><span style="color:#6F42C1;">toJSONString</span><span style="color:#24292E;">(message));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MqConstant</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    String CANAL_EXCHANGE </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;canal.exchange&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    String CANAL_QUEUE </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;canal_queue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    String CANAL_ROUTING_KEY </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;canal_routing_key&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MqConstant</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    String CANAL_EXCHANGE </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;canal.exchange&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    String CANAL_QUEUE </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;canal_queue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    String CANAL_ROUTING_KEY </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;canal_routing_key&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="canal-spring-boot-starter" tabindex="-1">canal-spring-boot-starter <a class="header-anchor" href="#canal-spring-boot-starter" aria-label="Permalink to &quot;canal-spring-boot-starter&quot;">​</a></h3><blockquote><p>tips: 可参考 <a href="https://github.com/NormanGyllenhaal/canal-client" target="_blank" rel="noreferrer">https://github.com/NormanGyllenhaal/canal-client</a> 此方式需将<code>canal.properties</code>配置文件中的<code>canal.serverMode</code>属性值修改为<code>tcp</code></p></blockquote><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- https://mvnrepository.com/artifact/top.javatool/canal-spring-boot-starter --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;top.javatool&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;canal-spring-boot-starter&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;1.2.1-RELEASE&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- https://mvnrepository.com/artifact/top.javatool/canal-spring-boot-starter --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;top.javatool&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;canal-spring-boot-starter&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;1.2.1-RELEASE&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">canal</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">server</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">xxx:11111</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># canal-admin中Instance管理下需存在example实例配置</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">destination</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">example</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">canal</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">server</span><span style="color:#24292E;">: </span><span style="color:#032F62;">xxx:11111</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># canal-admin中Instance管理下需存在example实例配置</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">destination</span><span style="color:#24292E;">: </span><span style="color:#032F62;">example</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Slf4j</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">CanalTable</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;t_user&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserHandler</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">EntryHandler</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">User</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">insert</span><span style="color:#E1E4E8;">(User </span><span style="color:#FFAB70;">user</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        log.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;insert message  {}&quot;</span><span style="color:#E1E4E8;">, user);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;">(User </span><span style="color:#FFAB70;">before</span><span style="color:#E1E4E8;">, User </span><span style="color:#FFAB70;">after</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        log.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;update before {} &quot;</span><span style="color:#E1E4E8;">, before);</span></span>
<span class="line"><span style="color:#E1E4E8;">        log.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;update after {}&quot;</span><span style="color:#E1E4E8;">, after);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">delete</span><span style="color:#E1E4E8;">(User </span><span style="color:#FFAB70;">user</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        log.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;delete  {}&quot;</span><span style="color:#E1E4E8;">, user);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Slf4j</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">CanalTable</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;t_user&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserHandler</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">EntryHandler</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">User</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">insert</span><span style="color:#24292E;">(User </span><span style="color:#E36209;">user</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        log.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;insert message  {}&quot;</span><span style="color:#24292E;">, user);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">update</span><span style="color:#24292E;">(User </span><span style="color:#E36209;">before</span><span style="color:#24292E;">, User </span><span style="color:#E36209;">after</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        log.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;update before {} &quot;</span><span style="color:#24292E;">, before);</span></span>
<span class="line"><span style="color:#24292E;">        log.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;update after {}&quot;</span><span style="color:#24292E;">, after);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">delete</span><span style="color:#24292E;">(User </span><span style="color:#E36209;">user</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        log.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;delete  {}&quot;</span><span style="color:#24292E;">, user);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Data</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Table</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;t_user&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">User</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Serializable</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 主键</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Id</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">GeneratedValue</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">strategy</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> GenerationType.IDENTITY)</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Column</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;user_id&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Integer userId;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 用户名</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Column</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;username&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String username;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 密码</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Column</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;password&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String password;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 性别</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Column</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">name</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;sex&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Integer sex;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 备注</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String remark;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 时间</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Date date;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Data</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Table</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;t_user&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">User</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Serializable</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 主键</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Id</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">GeneratedValue</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">strategy</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> GenerationType.IDENTITY)</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Column</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;user_id&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Integer userId;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 用户名</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Column</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;username&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String username;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 密码</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Column</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;password&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String password;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 性别</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Column</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">name</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;sex&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Integer sex;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 备注</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String remark;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 时间</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Date date;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>经测试发现这个jar存在一些bug，ex：针对表字段，数据原本为空，修改为有值的时候，如果java这边用非String字段类型去接收会报错！</p></blockquote><h3 id="canal实际测试" tabindex="-1">canal实际测试 <a class="header-anchor" href="#canal实际测试" aria-label="Permalink to &quot;canal实际测试&quot;">​</a></h3><h4 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h4><p>访问地址：<code>http://ip地址:8089</code> 默认登录账号密码：<code>admin/123456</code></p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301631622.png" alt="image-20230903124418202"></p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301631028.png" alt="image-20230903125933698"></p><h5 id="_1、canal-properties" tabindex="-1">1、canal.properties <a class="header-anchor" href="#_1、canal-properties" aria-label="Permalink to &quot;1、canal.properties&quot;">​</a></h5><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># canal admin config</span></span>
<span class="line"><span style="color:#6A737D;">#canal.admin.manager = 127.0.0.1:8089</span></span>
<span class="line"><span style="color:#F97583;">canal.admin.port</span><span style="color:#E1E4E8;"> = 11110</span></span>
<span class="line"><span style="color:#F97583;">canal.admin.user</span><span style="color:#E1E4E8;"> = admin</span></span>
<span class="line"><span style="color:#F97583;">canal.admin.passwd</span><span style="color:#E1E4E8;"> = 6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># tcp, kafka, rocketMQ, rabbitMQ</span></span>
<span class="line"><span style="color:#F97583;">canal.serverMode</span><span style="color:#E1E4E8;"> = rabbitMQ</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">rabbitmq.host</span><span style="color:#E1E4E8;"> = 81.68.218.181:5672</span></span>
<span class="line"><span style="color:#F97583;">rabbitmq.virtual.host</span><span style="color:#E1E4E8;"> = dev</span></span>
<span class="line"><span style="color:#F97583;">rabbitmq.exchange</span><span style="color:#E1E4E8;"> = canal.exchange</span></span>
<span class="line"><span style="color:#F97583;">rabbitmq.username</span><span style="color:#E1E4E8;"> = admin</span></span>
<span class="line"><span style="color:#F97583;">rabbitmq.password</span><span style="color:#E1E4E8;"> = admin</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># canal admin config</span></span>
<span class="line"><span style="color:#6A737D;">#canal.admin.manager = 127.0.0.1:8089</span></span>
<span class="line"><span style="color:#D73A49;">canal.admin.port</span><span style="color:#24292E;"> = 11110</span></span>
<span class="line"><span style="color:#D73A49;">canal.admin.user</span><span style="color:#24292E;"> = admin</span></span>
<span class="line"><span style="color:#D73A49;">canal.admin.passwd</span><span style="color:#24292E;"> = 6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># tcp, kafka, rocketMQ, rabbitMQ</span></span>
<span class="line"><span style="color:#D73A49;">canal.serverMode</span><span style="color:#24292E;"> = rabbitMQ</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">rabbitmq.host</span><span style="color:#24292E;"> = 81.68.218.181:5672</span></span>
<span class="line"><span style="color:#D73A49;">rabbitmq.virtual.host</span><span style="color:#24292E;"> = dev</span></span>
<span class="line"><span style="color:#D73A49;">rabbitmq.exchange</span><span style="color:#24292E;"> = canal.exchange</span></span>
<span class="line"><span style="color:#D73A49;">rabbitmq.username</span><span style="color:#24292E;"> = admin</span></span>
<span class="line"><span style="color:#D73A49;">rabbitmq.password</span><span style="color:#24292E;"> = admin</span></span></code></pre></div><h5 id="_2、test-instance-propertios" tabindex="-1">2、test/instance.propertios <a class="header-anchor" href="#_2、test-instance-propertios" aria-label="Permalink to &quot;2、test/instance.propertios&quot;">​</a></h5><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301632271.png" alt="image-20230903124716465"></p><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">canal.instance.master.address</span><span style="color:#E1E4E8;">=81.68.218.181:13306</span></span>
<span class="line"><span style="color:#6A737D;"># username/password</span></span>
<span class="line"><span style="color:#F97583;">canal.instance.dbUsername</span><span style="color:#E1E4E8;">=canal</span></span>
<span class="line"><span style="color:#F97583;">canal.instance.dbPassword</span><span style="color:#E1E4E8;">=canal</span></span>
<span class="line"><span style="color:#F97583;">canal.instance.connectionCharset</span><span style="color:#E1E4E8;"> = UTF-8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># table regex 只同步test数据库下的t_user表</span></span>
<span class="line"><span style="color:#F97583;">canal.instance.filter.regex</span><span style="color:#E1E4E8;">=test\\\\.t_user</span></span>
<span class="line"><span style="color:#6A737D;"># table black regex</span></span>
<span class="line"><span style="color:#F97583;">canal.instance.filter.black.regex</span><span style="color:#E1E4E8;">=mysql\\\\.slave_.*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># mq config</span></span>
<span class="line"><span style="color:#F97583;">canal.mq.topic</span><span style="color:#E1E4E8;">=canal_routing_key</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">canal.instance.master.address</span><span style="color:#24292E;">=81.68.218.181:13306</span></span>
<span class="line"><span style="color:#6A737D;"># username/password</span></span>
<span class="line"><span style="color:#D73A49;">canal.instance.dbUsername</span><span style="color:#24292E;">=canal</span></span>
<span class="line"><span style="color:#D73A49;">canal.instance.dbPassword</span><span style="color:#24292E;">=canal</span></span>
<span class="line"><span style="color:#D73A49;">canal.instance.connectionCharset</span><span style="color:#24292E;"> = UTF-8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># table regex 只同步test数据库下的t_user表</span></span>
<span class="line"><span style="color:#D73A49;">canal.instance.filter.regex</span><span style="color:#24292E;">=test\\\\.t_user</span></span>
<span class="line"><span style="color:#6A737D;"># table black regex</span></span>
<span class="line"><span style="color:#D73A49;">canal.instance.filter.black.regex</span><span style="color:#24292E;">=mysql\\\\.slave_.*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># mq config</span></span>
<span class="line"><span style="color:#D73A49;">canal.mq.topic</span><span style="color:#24292E;">=canal_routing_key</span></span></code></pre></div><blockquote><p>tips: 这里不要用默认的 我们直接新建一个 test的 instance</p></blockquote><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301632332.png" alt="image-20230903125039931"></p><h4 id="mq监听canal消息数据" tabindex="-1">mq监听canal消息数据 <a class="header-anchor" href="#mq监听canal消息数据" aria-label="Permalink to &quot;mq监听canal消息数据&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Slf4j</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CanalRabbitMqListener</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String CANAL_EXCHANGE </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;canal.exchange&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String CANAL_QUEUE </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;canal_queue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String CANAL_ROUTING_KEY </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;canal_routing_key&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">RabbitListener</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">bindings</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            @</span><span style="color:#F97583;">QueueBinding</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">Queue</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> CANAL_QUEUE, </span><span style="color:#79B8FF;">durable</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;true&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#79B8FF;">exchange</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">Exchange</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> CANAL_EXCHANGE),</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#79B8FF;">key</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> CANAL_ROUTING_KEY</span></span>
<span class="line"><span style="color:#E1E4E8;">            )</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">handleCanalDataChange</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">message</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        log.</span><span style="color:#B392F0;">info</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;[canal] 接收消息: {}&quot;</span><span style="color:#E1E4E8;">, JsonUtils.</span><span style="color:#B392F0;">obj2json</span><span style="color:#E1E4E8;">(message));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Slf4j</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CanalRabbitMqListener</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String CANAL_EXCHANGE </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;canal.exchange&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String CANAL_QUEUE </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;canal_queue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String CANAL_ROUTING_KEY </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;canal_routing_key&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">RabbitListener</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">bindings</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            @</span><span style="color:#D73A49;">QueueBinding</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">Queue</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> CANAL_QUEUE, </span><span style="color:#005CC5;">durable</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;true&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#005CC5;">exchange</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">Exchange</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> CANAL_EXCHANGE),</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#005CC5;">key</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> CANAL_ROUTING_KEY</span></span>
<span class="line"><span style="color:#24292E;">            )</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handleCanalDataChange</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">message</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        log.</span><span style="color:#6F42C1;">info</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;[canal] 接收消息: {}&quot;</span><span style="color:#24292E;">, JsonUtils.</span><span style="color:#6F42C1;">obj2json</span><span style="color:#24292E;">(message));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h5 id="_1-test库t-user表新增一条数据" tabindex="-1">1.test库t_user表新增一条数据 <a class="header-anchor" href="#_1-test库t-user表新增一条数据" aria-label="Permalink to &quot;1.test库t_user表新增一条数据&quot;">​</a></h5><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301633966.png" alt="image-20230903125650045"></p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301632118.png" alt="image-20230903125720185"></p><p><code>新增数据消息体</code></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;data&quot;</span><span style="color:#E1E4E8;">:[</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;user_key&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;新增&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;user_value&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;add&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;database&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;es&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">1693715762000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;isDdl&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;mysqlType&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;int&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;user_key&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;varchar(32)&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;user_value&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;varchar(64)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;old&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;pkNames&quot;</span><span style="color:#E1E4E8;">:[</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;id&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;sql&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;sqlType&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;user_key&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;user_value&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">12</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;table&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;t_user&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;ts&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">1693715763019</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;INSERT&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;data&quot;</span><span style="color:#24292E;">:[</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;user_key&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;新增&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;user_value&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;add&quot;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;database&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;es&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">1693715762000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;isDdl&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;mysqlType&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;int&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;user_key&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;varchar(32)&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;user_value&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;varchar(64)&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;old&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;pkNames&quot;</span><span style="color:#24292E;">:[</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;id&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;sql&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;sqlType&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;user_key&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">12</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;user_value&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">12</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;table&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;t_user&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;ts&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">1693715763019</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;INSERT&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h5 id="_2-修改一条数据" tabindex="-1">2.修改一条数据 <a class="header-anchor" href="#_2-修改一条数据" aria-label="Permalink to &quot;2.修改一条数据&quot;">​</a></h5><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301632366.png" alt="image-20230903130159953"></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;data&quot;</span><span style="color:#E1E4E8;">:[</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;2&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;user_key&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;修改&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;user_value&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;update&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;database&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;es&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">1693717247000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;isDdl&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;mysqlType&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;int&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;user_key&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;varchar(32)&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;user_value&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;varchar(64)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;old&quot;</span><span style="color:#E1E4E8;">:[</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;user_key&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;新增2&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;user_value&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;add2&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;pkNames&quot;</span><span style="color:#E1E4E8;">:[</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;id&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;sql&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;sqlType&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;user_key&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;user_value&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">12</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;table&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;t_user&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;ts&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">1693717247148</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;UPDATE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;data&quot;</span><span style="color:#24292E;">:[</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;2&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;user_key&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;修改&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;user_value&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;update&quot;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;database&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;es&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">1693717247000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;isDdl&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;mysqlType&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;int&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;user_key&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;varchar(32)&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;user_value&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;varchar(64)&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;old&quot;</span><span style="color:#24292E;">:[</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;user_key&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;新增2&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;user_value&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;add2&quot;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;pkNames&quot;</span><span style="color:#24292E;">:[</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;id&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;sql&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;sqlType&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;user_key&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">12</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;user_value&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">12</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;table&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;t_user&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;ts&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">1693717247148</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;UPDATE&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h5 id="_3-删除一条数据" tabindex="-1">3.删除一条数据 <a class="header-anchor" href="#_3-删除一条数据" aria-label="Permalink to &quot;3.删除一条数据&quot;">​</a></h5><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;data&quot;</span><span style="color:#E1E4E8;">:[</span></span>
<span class="line"><span style="color:#E1E4E8;">        {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;2&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;user_key&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;修改&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;user_value&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;update&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;database&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;es&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">1693717401000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;isDdl&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;mysqlType&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;int&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;user_key&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;varchar(32)&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;user_value&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;varchar(64)&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;old&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;pkNames&quot;</span><span style="color:#E1E4E8;">:[</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;id&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;sql&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;sqlType&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;user_key&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">12</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;user_value&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">12</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;table&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;t_user&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;ts&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">1693717401178</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;DELETE&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;data&quot;</span><span style="color:#24292E;">:[</span></span>
<span class="line"><span style="color:#24292E;">        {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;2&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;user_key&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;修改&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;user_value&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;update&quot;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;database&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;es&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">1693717401000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;isDdl&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;mysqlType&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;int&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;user_key&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;varchar(32)&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;user_value&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;varchar(64)&quot;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;old&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;pkNames&quot;</span><span style="color:#24292E;">:[</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;id&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;sql&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;sqlType&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;user_key&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">12</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;user_value&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">12</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;table&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;t_user&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;ts&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">1693717401178</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;DELETE&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,65),e=[o];function t(c,r,E,y,i,u){return a(),n("div",null,e)}const q=s(p,[["render",t]]);export{d as __pageData,q as default};
