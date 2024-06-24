import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8048b864.js";const u=JSON.parse('{"title":"Druid","description":"","frontmatter":{},"headers":[],"relativePath":"中间件/数据库中间件/druid/druid.md","filePath":"中间件/数据库中间件/druid/druid.md","lastUpdated":1719224116000}'),p={name:"中间件/数据库中间件/druid/druid.md"},o=l(`<h1 id="druid" tabindex="-1">Druid <a class="header-anchor" href="#druid" aria-label="Permalink to &quot;Druid&quot;">​</a></h1><h2 id="druid-spring-boot-starter" tabindex="-1">druid-spring-boot-starter <a class="header-anchor" href="#druid-spring-boot-starter" aria-label="Permalink to &quot;druid-spring-boot-starter&quot;">​</a></h2><ul><li><strong>配置Druid数据源（连接池）</strong> ：如同以前 c3p0、dbcp 数据源可以设置数据源连接初始化大小、最大连接数、等待时间、最小连接数 等一样，Druid 数据源同理可以进行设置；</li><li><strong>配置 Druid web 监控 filter（<code>WebStatFilter</code>）</strong> ：这个过滤器的作用就是统计 web 应用请求中所有的数据库信息，比如 发出的 sql 语句，sql 执行的时间、请求次数、请求的 url 地址、以及seesion 监控、数据库表的访问次数 等等。</li><li><strong>配置 Druid 后台管理 Servlet（<code>StatViewServlet</code>）</strong> ：Druid 数据源具有监控的功能，并提供了一个 web 界面方便用户查看，类似安装 路由器 时，人家也提供了一个默认的 web 页面；需要设置 Druid 的后台管理页面的属性，比如 登录账号、密码 等；</li></ul><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- druid数据源 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;com.alibaba&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;druid-spring-boot-starter&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;1.1.23&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- druid数据源 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;com.alibaba&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;druid-spring-boot-starter&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;1.1.23&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><blockquote><p><code>com.alibaba.druid.spring.boot.autoconfigure.properties.DruidStatProperties</code> <code>org.springframework.boot.autoconfigure.jdbc.DataSourceProperties</code></p></blockquote><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">########## 配置数据源 （Druid）##########</span></span>
<span class="line"><span style="color:#85E89D;">spring</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">datasource</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#6A737D;">########## JDBC 基本配置 ##########</span></span>
<span class="line"><span style="color:#85E89D;">username</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">xxx</span></span>
<span class="line"><span style="color:#85E89D;">password</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">xxx</span></span>
<span class="line"><span style="color:#85E89D;">driver-class-name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">com.mysql.cj.jdbc.Driver</span><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;"># mysql8 的连接驱动</span></span>
<span class="line"><span style="color:#85E89D;">url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">jdbc:mysql://127.0.0.1:3306/test?serverTimezone=Asia/Shanghai</span></span>
<span class="line"><span style="color:#85E89D;">platform</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql</span><span style="color:#E1E4E8;">                               </span><span style="color:#6A737D;"># 数据库类型</span></span>
<span class="line"><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">com.alibaba.druid.pool.DruidDataSource</span><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># 指定数据源类型</span></span>
<span class="line"><span style="color:#6A737D;">########## 连接池 配置 ##########</span></span>
<span class="line"><span style="color:#85E89D;">druid</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#6A737D;"># 配置初始化大小、最小、最大</span></span>
<span class="line"><span style="color:#85E89D;">initial-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">5</span></span>
<span class="line"><span style="color:#85E89D;">minIdle</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">10</span></span>
<span class="line"><span style="color:#85E89D;">max-active</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span></span>
<span class="line"><span style="color:#6A737D;"># 配置获取连接等待超时的时间(单位：毫秒)</span></span>
<span class="line"><span style="color:#85E89D;">max-wait</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">60000</span></span>
<span class="line"><span style="color:#6A737D;"># 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒</span></span>
<span class="line"><span style="color:#85E89D;">time-between-eviction-runs-millis</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2000</span></span>
<span class="line"><span style="color:#6A737D;"># 配置一个连接在池中最小生存的时间，单位是毫秒</span></span>
<span class="line"><span style="color:#85E89D;">min-evictable-idle-time-millis</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">600000</span></span>
<span class="line"><span style="color:#85E89D;">max-evictable-idle-time-millis</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">900000</span></span>
<span class="line"><span style="color:#6A737D;"># 用来测试连接是否可用的SQL语句,默认值每种数据库都不相同,这是mysql</span></span>
<span class="line"><span style="color:#85E89D;">validationQuery</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">select 1</span></span>
<span class="line"><span style="color:#6A737D;"># 应用向连接池申请连接，并且testOnBorrow为false时，连接池将会判断连接是否处于空闲状态，如果是，则验证这条连接是否可用</span></span>
<span class="line"><span style="color:#85E89D;">testWhileIdle</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;"># 如果为true，默认是false，应用向连接池申请连接时，连接池会判断这条连接是否是可用的</span></span>
<span class="line"><span style="color:#85E89D;">testOnBorrow</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#6A737D;"># 如果为true（默认false），当应用使用完连接，连接池回收连接的时候会判断该连接是否还可用</span></span>
<span class="line"><span style="color:#85E89D;">testOnReturn</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#6A737D;"># 是否缓存preparedStatement，也就是PSCache。PSCache对支持游标的数据库性能提升巨大，比如说oracle</span></span>
<span class="line"><span style="color:#85E89D;">poolPreparedStatements</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;"># 要启用PSCache，必须配置大于0，当大于0时， poolPreparedStatements自动触发修改为true，</span></span>
<span class="line"><span style="color:#6A737D;"># 在Druid中，不会存在Oracle下PSCache占用内存过多的问题，</span></span>
<span class="line"><span style="color:#6A737D;"># 可以把这个数值配置大一些，比如说100</span></span>
<span class="line"><span style="color:#85E89D;">maxOpenPreparedStatements</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span></span>
<span class="line"><span style="color:#6A737D;"># 连接池中的minIdle数量以内的连接，空闲时间超过minEvictableIdleTimeMillis，则会执行keepAlive操作</span></span>
<span class="line"><span style="color:#85E89D;">keepAlive</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#6A737D;"># Spring 监控，利用aop 对指定接口的执行时间，jdbc数进行记录</span></span>
<span class="line"><span style="color:#85E89D;">aop-patterns</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;com.springboot.template.dao.*&quot;</span></span>
<span class="line"><span style="color:#6A737D;">########### 启用内置过滤器（第一个 stat必须，否则监控不到SQL）##########</span></span>
<span class="line"><span style="color:#85E89D;">filters</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">stat,wall,log4j2</span></span>
<span class="line"><span style="color:#6A737D;"># 自己配置监控统计拦截的filter</span></span>
<span class="line"><span style="color:#85E89D;">filter</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#6A737D;"># 开启druiddatasource的状态监控</span></span>
<span class="line"><span style="color:#85E89D;">stat</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#85E89D;">db-type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">mysql</span></span>
<span class="line"><span style="color:#6A737D;"># 开启慢sql监控，超过2s 就认为是慢sql，记录到日志中</span></span>
<span class="line"><span style="color:#85E89D;">log-slow-sql</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#85E89D;">slow-sql-millis</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2000</span></span>
<span class="line"><span style="color:#6A737D;"># 日志监控，使用slf4j 进行日志输出</span></span>
<span class="line"><span style="color:#85E89D;">slf4j</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#85E89D;">statement-log-error-enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#85E89D;">statement-create-after-log-enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#85E89D;">statement-close-after-log-enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#85E89D;">result-set-open-after-log-enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#85E89D;">result-set-close-after-log-enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#6A737D;">########## 配置WebStatFilter，用于采集web关联监控的数据 ##########</span></span>
<span class="line"><span style="color:#85E89D;">web-stat-filter</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">                   </span><span style="color:#6A737D;"># 启动 StatFilter</span></span>
<span class="line"><span style="color:#85E89D;">url-pattern</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/*</span><span style="color:#E1E4E8;">                 </span><span style="color:#6A737D;"># 过滤所有url</span></span>
<span class="line"><span style="color:#85E89D;">exclusions</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 排除一些不必要的url</span></span>
<span class="line"><span style="color:#85E89D;">session-stat-enable</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">       </span><span style="color:#6A737D;"># 开启session统计功能</span></span>
<span class="line"><span style="color:#85E89D;">session-stat-max-count</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># session的最大个数,默认100</span></span>
<span class="line"><span style="color:#6A737D;">########## 配置StatViewServlet（监控页面），用于展示Druid的统计信息 ##########</span></span>
<span class="line"><span style="color:#85E89D;">stat-view-servlet</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">                   </span><span style="color:#6A737D;"># 启用StatViewServlet</span></span>
<span class="line"><span style="color:#85E89D;">url-pattern</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/druid/*</span><span style="color:#E1E4E8;">           </span><span style="color:#6A737D;"># 访问内置监控页面的路径，内置监控页面的首页是/druid/index.html</span></span>
<span class="line"><span style="color:#85E89D;">reset-enable</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">              </span><span style="color:#6A737D;"># 不允许清空统计数据,重新计算</span></span>
<span class="line"><span style="color:#85E89D;">login-username</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">root</span><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># 配置监控页面访问密码</span></span>
<span class="line"><span style="color:#85E89D;">login-password</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">123</span></span>
<span class="line"><span style="color:#85E89D;">allow</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">127.0.0.1</span><span style="color:#E1E4E8;">           </span><span style="color:#6A737D;"># 允许访问的地址，如果allow没有配置或者为空，则允许所有访问</span></span>
<span class="line"><span style="color:#85E89D;">deny</span><span style="color:#E1E4E8;">:              </span><span style="color:#6A737D;"># 拒绝访问的地址，deny优先于allow，如果在deny列表中，就算在allow列表中，也会被拒绝</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">########## 配置数据源 （Druid）##########</span></span>
<span class="line"><span style="color:#22863A;">spring</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">datasource</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#6A737D;">########## JDBC 基本配置 ##########</span></span>
<span class="line"><span style="color:#22863A;">username</span><span style="color:#24292E;">: </span><span style="color:#032F62;">xxx</span></span>
<span class="line"><span style="color:#22863A;">password</span><span style="color:#24292E;">: </span><span style="color:#032F62;">xxx</span></span>
<span class="line"><span style="color:#22863A;">driver-class-name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">com.mysql.cj.jdbc.Driver</span><span style="color:#24292E;">   </span><span style="color:#6A737D;"># mysql8 的连接驱动</span></span>
<span class="line"><span style="color:#22863A;">url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">jdbc:mysql://127.0.0.1:3306/test?serverTimezone=Asia/Shanghai</span></span>
<span class="line"><span style="color:#22863A;">platform</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql</span><span style="color:#24292E;">                               </span><span style="color:#6A737D;"># 数据库类型</span></span>
<span class="line"><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">com.alibaba.druid.pool.DruidDataSource</span><span style="color:#24292E;">  </span><span style="color:#6A737D;"># 指定数据源类型</span></span>
<span class="line"><span style="color:#6A737D;">########## 连接池 配置 ##########</span></span>
<span class="line"><span style="color:#22863A;">druid</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#6A737D;"># 配置初始化大小、最小、最大</span></span>
<span class="line"><span style="color:#22863A;">initial-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">5</span></span>
<span class="line"><span style="color:#22863A;">minIdle</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">10</span></span>
<span class="line"><span style="color:#22863A;">max-active</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span></span>
<span class="line"><span style="color:#6A737D;"># 配置获取连接等待超时的时间(单位：毫秒)</span></span>
<span class="line"><span style="color:#22863A;">max-wait</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">60000</span></span>
<span class="line"><span style="color:#6A737D;"># 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒</span></span>
<span class="line"><span style="color:#22863A;">time-between-eviction-runs-millis</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2000</span></span>
<span class="line"><span style="color:#6A737D;"># 配置一个连接在池中最小生存的时间，单位是毫秒</span></span>
<span class="line"><span style="color:#22863A;">min-evictable-idle-time-millis</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">600000</span></span>
<span class="line"><span style="color:#22863A;">max-evictable-idle-time-millis</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">900000</span></span>
<span class="line"><span style="color:#6A737D;"># 用来测试连接是否可用的SQL语句,默认值每种数据库都不相同,这是mysql</span></span>
<span class="line"><span style="color:#22863A;">validationQuery</span><span style="color:#24292E;">: </span><span style="color:#032F62;">select 1</span></span>
<span class="line"><span style="color:#6A737D;"># 应用向连接池申请连接，并且testOnBorrow为false时，连接池将会判断连接是否处于空闲状态，如果是，则验证这条连接是否可用</span></span>
<span class="line"><span style="color:#22863A;">testWhileIdle</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#6A737D;"># 如果为true，默认是false，应用向连接池申请连接时，连接池会判断这条连接是否是可用的</span></span>
<span class="line"><span style="color:#22863A;">testOnBorrow</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#6A737D;"># 如果为true（默认false），当应用使用完连接，连接池回收连接的时候会判断该连接是否还可用</span></span>
<span class="line"><span style="color:#22863A;">testOnReturn</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#6A737D;"># 是否缓存preparedStatement，也就是PSCache。PSCache对支持游标的数据库性能提升巨大，比如说oracle</span></span>
<span class="line"><span style="color:#22863A;">poolPreparedStatements</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#6A737D;"># 要启用PSCache，必须配置大于0，当大于0时， poolPreparedStatements自动触发修改为true，</span></span>
<span class="line"><span style="color:#6A737D;"># 在Druid中，不会存在Oracle下PSCache占用内存过多的问题，</span></span>
<span class="line"><span style="color:#6A737D;"># 可以把这个数值配置大一些，比如说100</span></span>
<span class="line"><span style="color:#22863A;">maxOpenPreparedStatements</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span></span>
<span class="line"><span style="color:#6A737D;"># 连接池中的minIdle数量以内的连接，空闲时间超过minEvictableIdleTimeMillis，则会执行keepAlive操作</span></span>
<span class="line"><span style="color:#22863A;">keepAlive</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#6A737D;"># Spring 监控，利用aop 对指定接口的执行时间，jdbc数进行记录</span></span>
<span class="line"><span style="color:#22863A;">aop-patterns</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;com.springboot.template.dao.*&quot;</span></span>
<span class="line"><span style="color:#6A737D;">########### 启用内置过滤器（第一个 stat必须，否则监控不到SQL）##########</span></span>
<span class="line"><span style="color:#22863A;">filters</span><span style="color:#24292E;">: </span><span style="color:#032F62;">stat,wall,log4j2</span></span>
<span class="line"><span style="color:#6A737D;"># 自己配置监控统计拦截的filter</span></span>
<span class="line"><span style="color:#22863A;">filter</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#6A737D;"># 开启druiddatasource的状态监控</span></span>
<span class="line"><span style="color:#22863A;">stat</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#22863A;">db-type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">mysql</span></span>
<span class="line"><span style="color:#6A737D;"># 开启慢sql监控，超过2s 就认为是慢sql，记录到日志中</span></span>
<span class="line"><span style="color:#22863A;">log-slow-sql</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#22863A;">slow-sql-millis</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2000</span></span>
<span class="line"><span style="color:#6A737D;"># 日志监控，使用slf4j 进行日志输出</span></span>
<span class="line"><span style="color:#22863A;">slf4j</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#22863A;">statement-log-error-enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#22863A;">statement-create-after-log-enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#22863A;">statement-close-after-log-enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#22863A;">result-set-open-after-log-enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#22863A;">result-set-close-after-log-enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#6A737D;">########## 配置WebStatFilter，用于采集web关联监控的数据 ##########</span></span>
<span class="line"><span style="color:#22863A;">web-stat-filter</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">                   </span><span style="color:#6A737D;"># 启动 StatFilter</span></span>
<span class="line"><span style="color:#22863A;">url-pattern</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/*</span><span style="color:#24292E;">                 </span><span style="color:#6A737D;"># 过滤所有url</span></span>
<span class="line"><span style="color:#22863A;">exclusions</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 排除一些不必要的url</span></span>
<span class="line"><span style="color:#22863A;">session-stat-enable</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">       </span><span style="color:#6A737D;"># 开启session统计功能</span></span>
<span class="line"><span style="color:#22863A;">session-stat-max-count</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">    </span><span style="color:#6A737D;"># session的最大个数,默认100</span></span>
<span class="line"><span style="color:#6A737D;">########## 配置StatViewServlet（监控页面），用于展示Druid的统计信息 ##########</span></span>
<span class="line"><span style="color:#22863A;">stat-view-servlet</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">                   </span><span style="color:#6A737D;"># 启用StatViewServlet</span></span>
<span class="line"><span style="color:#22863A;">url-pattern</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/druid/*</span><span style="color:#24292E;">           </span><span style="color:#6A737D;"># 访问内置监控页面的路径，内置监控页面的首页是/druid/index.html</span></span>
<span class="line"><span style="color:#22863A;">reset-enable</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">              </span><span style="color:#6A737D;"># 不允许清空统计数据,重新计算</span></span>
<span class="line"><span style="color:#22863A;">login-username</span><span style="color:#24292E;">: </span><span style="color:#032F62;">root</span><span style="color:#24292E;">            </span><span style="color:#6A737D;"># 配置监控页面访问密码</span></span>
<span class="line"><span style="color:#22863A;">login-password</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">123</span></span>
<span class="line"><span style="color:#22863A;">allow</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">127.0.0.1</span><span style="color:#24292E;">           </span><span style="color:#6A737D;"># 允许访问的地址，如果allow没有配置或者为空，则允许所有访问</span></span>
<span class="line"><span style="color:#22863A;">deny</span><span style="color:#24292E;">:              </span><span style="color:#6A737D;"># 拒绝访问的地址，deny优先于allow，如果在deny列表中，就算在allow列表中，也会被拒绝</span></span></code></pre></div>`,6),e=[o];function t(c,r,y,i,E,d){return n(),a("div",null,e)}const A=s(p,[["render",t]]);export{u as __pageData,A as default};
