import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.8048b864.js";const u=JSON.parse('{"title":"xxlJob","description":"","frontmatter":{},"headers":[],"relativePath":"second/task/xxlJob.md","filePath":"second/task/xxlJob.md","lastUpdated":1684222286000}'),p={name:"second/task/xxlJob.md"},o=l(`<h1 id="xxljob" tabindex="-1">xxlJob <a class="header-anchor" href="#xxljob" aria-label="Permalink to &quot;xxlJob&quot;">​</a></h1><blockquote><p>官方文档：<a href="https://www.xuxueli.com/xxl-job" target="_blank" rel="noreferrer">https://www.xuxueli.com/xxl-job</a></p></blockquote><h2 id="源码结构" tabindex="-1">源码结构 <a class="header-anchor" href="#源码结构" aria-label="Permalink to &quot;源码结构&quot;">​</a></h2><blockquote><ol><li><code>xxl-job-admin：调度中心</code></li><li><code>xxl-job-core：公共依赖</code></li><li><code>xxl-job-executor-samples：执行器Sample示例（选择合适的版本执行器，可直接使用，也可以参考其并将现有项目改造成执行器）</code></li><li><code> ：xxl-job-executor-sample-springboot：Springboot版本，通过Springboot管理执行器，推荐这种方式；</code></li><li><code> ：xxl-job-executor-sample-frameless：无框架版本；</code></li></ol></blockquote><h2 id="数据库结构" tabindex="-1">数据库结构 <a class="header-anchor" href="#数据库结构" aria-label="Permalink to &quot;数据库结构&quot;">​</a></h2><blockquote><p>xxl_job_lock：任务调度锁表； xxl_job_group：执行器信息表，维护任务执行器信息； xxl_job_info：调度扩展信息表： 用于保存XXL-JOB调度任务的扩展信息，如任务分组、任务名、机器地址、执行器、执行入参和报警邮件等等； xxl_job_log：调度日志表： 用于保存XXL-JOB任务调度的历史信息，如调度结果、执行结果、调度入参、调度机器和执行器等等； xxl_job_log_report：调度日志报表：用户存储XXL-JOB任务调度日志的报表，调度中心报表功能页面会用到； xxl_job_logglue：任务GLUE日志：用于保存GLUE更新历史，用于支持GLUE的版本回溯功能； xxl_job_registry：执行器注册表，维护在线的执行器和调度中心机器地址信息； xxl_job_user：系统用户表；</p></blockquote><h2 id="调度中心配置说明" tabindex="-1">调度中心配置说明 <a class="header-anchor" href="#调度中心配置说明" aria-label="Permalink to &quot;调度中心配置说明&quot;">​</a></h2><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">### 调度中心JDBC链接</span></span>
<span class="line"><span style="color:#F97583;">spring.datasource.url</span><span style="color:#E1E4E8;">=jdbc:mysql://127.0.0.1:3306/xxl_job?</span><span style="color:#F97583;">useUnicode</span><span style="color:#E1E4E8;">=true&amp;</span><span style="color:#F97583;">characterEncoding</span><span style="color:#E1E4E8;">=UTF-8&amp;</span><span style="color:#F97583;">autoReconnect</span><span style="color:#E1E4E8;">=true&amp;</span><span style="color:#F97583;">serverTimezone</span><span style="color:#E1E4E8;">=Asia/Shanghai</span></span>
<span class="line"><span style="color:#F97583;">spring.datasource.username</span><span style="color:#E1E4E8;">=root</span></span>
<span class="line"><span style="color:#F97583;">spring.datasource.password</span><span style="color:#E1E4E8;">=root</span></span>
<span class="line"><span style="color:#F97583;">spring.datasource.driver-class-name</span><span style="color:#E1E4E8;">=com.mysql.cj.jdbc.Driver</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### 报警邮箱</span></span>
<span class="line"><span style="color:#F97583;">spring.mail.host</span><span style="color:#E1E4E8;">=smtp.qq.com</span></span>
<span class="line"><span style="color:#F97583;">spring.mail.port</span><span style="color:#E1E4E8;">=25</span></span>
<span class="line"><span style="color:#F97583;">spring.mail.username</span><span style="color:#E1E4E8;">=xxx@qq.com</span></span>
<span class="line"><span style="color:#F97583;">spring.mail.password</span><span style="color:#E1E4E8;">=xxx</span></span>
<span class="line"><span style="color:#F97583;">spring.mail.properties.mail.smtp.auth</span><span style="color:#E1E4E8;">=true</span></span>
<span class="line"><span style="color:#F97583;">spring.mail.properties.mail.smtp.starttls.enable</span><span style="color:#E1E4E8;">=true</span></span>
<span class="line"><span style="color:#F97583;">spring.mail.properties.mail.smtp.starttls.required</span><span style="color:#E1E4E8;">=true</span></span>
<span class="line"><span style="color:#F97583;">spring.mail.properties.mail.smtp.socketFactory.class</span><span style="color:#E1E4E8;">=javax.net.ssl.SSLSocketFactory</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#6A737D;">### 调度中心通讯TOKEN [选填]：非空时启用；</span></span>
<span class="line"><span style="color:#F97583;">xxl.job.accessToken</span><span style="color:#E1E4E8;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#6A737D;">### 调度中心国际化配置 [必填]： 默认为 &quot;zh_CN&quot;/中文简体, 可选范围为 &quot;zh_CN&quot;/中文简体, &quot;zh_TC&quot;/中文繁体 and &quot;en&quot;/英文；</span></span>
<span class="line"><span style="color:#F97583;">xxl.job.i18n</span><span style="color:#E1E4E8;">=zh_CN</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#6A737D;">## 调度线程池最大线程配置【必填】</span></span>
<span class="line"><span style="color:#F97583;">xxl.job.triggerpool.fast.max</span><span style="color:#E1E4E8;">=200</span></span>
<span class="line"><span style="color:#F97583;">xxl.job.triggerpool.slow.max</span><span style="color:#E1E4E8;">=100</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#6A737D;">### 调度中心日志表数据保存天数 [必填]：过期日志自动清理；限制大于等于7时生效，否则, 如-1，关闭自动清理功能；</span></span>
<span class="line"><span style="color:#F97583;">xxl.job.logretentiondays</span><span style="color:#E1E4E8;">=30</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">### 调度中心JDBC链接</span></span>
<span class="line"><span style="color:#D73A49;">spring.datasource.url</span><span style="color:#24292E;">=jdbc:mysql://127.0.0.1:3306/xxl_job?</span><span style="color:#D73A49;">useUnicode</span><span style="color:#24292E;">=true&amp;</span><span style="color:#D73A49;">characterEncoding</span><span style="color:#24292E;">=UTF-8&amp;</span><span style="color:#D73A49;">autoReconnect</span><span style="color:#24292E;">=true&amp;</span><span style="color:#D73A49;">serverTimezone</span><span style="color:#24292E;">=Asia/Shanghai</span></span>
<span class="line"><span style="color:#D73A49;">spring.datasource.username</span><span style="color:#24292E;">=root</span></span>
<span class="line"><span style="color:#D73A49;">spring.datasource.password</span><span style="color:#24292E;">=root</span></span>
<span class="line"><span style="color:#D73A49;">spring.datasource.driver-class-name</span><span style="color:#24292E;">=com.mysql.cj.jdbc.Driver</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### 报警邮箱</span></span>
<span class="line"><span style="color:#D73A49;">spring.mail.host</span><span style="color:#24292E;">=smtp.qq.com</span></span>
<span class="line"><span style="color:#D73A49;">spring.mail.port</span><span style="color:#24292E;">=25</span></span>
<span class="line"><span style="color:#D73A49;">spring.mail.username</span><span style="color:#24292E;">=xxx@qq.com</span></span>
<span class="line"><span style="color:#D73A49;">spring.mail.password</span><span style="color:#24292E;">=xxx</span></span>
<span class="line"><span style="color:#D73A49;">spring.mail.properties.mail.smtp.auth</span><span style="color:#24292E;">=true</span></span>
<span class="line"><span style="color:#D73A49;">spring.mail.properties.mail.smtp.starttls.enable</span><span style="color:#24292E;">=true</span></span>
<span class="line"><span style="color:#D73A49;">spring.mail.properties.mail.smtp.starttls.required</span><span style="color:#24292E;">=true</span></span>
<span class="line"><span style="color:#D73A49;">spring.mail.properties.mail.smtp.socketFactory.class</span><span style="color:#24292E;">=javax.net.ssl.SSLSocketFactory</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;">### 调度中心通讯TOKEN [选填]：非空时启用；</span></span>
<span class="line"><span style="color:#D73A49;">xxl.job.accessToken</span><span style="color:#24292E;">=</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;">### 调度中心国际化配置 [必填]： 默认为 &quot;zh_CN&quot;/中文简体, 可选范围为 &quot;zh_CN&quot;/中文简体, &quot;zh_TC&quot;/中文繁体 and &quot;en&quot;/英文；</span></span>
<span class="line"><span style="color:#D73A49;">xxl.job.i18n</span><span style="color:#24292E;">=zh_CN</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;">## 调度线程池最大线程配置【必填】</span></span>
<span class="line"><span style="color:#D73A49;">xxl.job.triggerpool.fast.max</span><span style="color:#24292E;">=200</span></span>
<span class="line"><span style="color:#D73A49;">xxl.job.triggerpool.slow.max</span><span style="color:#24292E;">=100</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#6A737D;">### 调度中心日志表数据保存天数 [必填]：过期日志自动清理；限制大于等于7时生效，否则, 如-1，关闭自动清理功能；</span></span>
<span class="line"><span style="color:#D73A49;">xxl.job.logretentiondays</span><span style="color:#24292E;">=30</span></span></code></pre></div><blockquote><p>调度中心访问地址：<a href="https://link.juejin.cn/?target=http%3A%2F%2F127.0.0.1%3A8080%2Fxxl-job-admin" target="_blank" rel="noreferrer">http://127.0.0.1:8080/xxl-job-admin</a> (<strong>该地址执行器将会使用到，作为回调地址</strong>)</p><p>默认登录账号：&quot;admin/123456&quot;</p></blockquote><h2 id="创建执行器" tabindex="-1">创建执行器 <a class="header-anchor" href="#创建执行器" aria-label="Permalink to &quot;创建执行器&quot;">​</a></h2><p>1.创建一个简单的SpringBoot项目，引入xxlJob公共依赖。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- xxlJob公共依赖 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;com.xuxueli&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;xxl-job-core&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;2.3.0&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- xxlJob公共依赖 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;com.xuxueli&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;xxl-job-core&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;2.3.0&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>2.修改application.properties</p><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 端口号</span></span>
<span class="line"><span style="color:#F97583;">server.port</span><span style="color:#E1E4E8;">=8081</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### 调度中心部署根地址：如调度中心集群部署存在多个地址则用逗号分隔。执行器将会使用该地址进行&quot;执行器心跳注册&quot;和&quot;任务结果回调&quot;；为空则关闭自动注册；</span></span>
<span class="line"><span style="color:#F97583;">xxl.job.admin.addresses</span><span style="color:#E1E4E8;">=http://127.0.0.1:8080/xxl-job-admin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### xxl-job, access token</span></span>
<span class="line"><span style="color:#F97583;">xxl.job.accessToken</span><span style="color:#E1E4E8;">=default_token</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### 执行器AppName[选填]：执行器心跳注册分组依据；为空则关闭自动注册</span></span>
<span class="line"><span style="color:#F97583;">xxl.job.executor.appname</span><span style="color:#E1E4E8;">=xxl-job-test</span></span>
<span class="line"><span style="color:#6A737D;">### 执行器注册 [选填]：优先使用该配置作为注册地址，为空时使用内嵌服务 ”IP:PORT“ 作为注册地址。从而更灵活的支持容器类型执行器动态IP和动态映射端口问题。</span></span>
<span class="line"><span style="color:#F97583;">xxl.job.executor.address</span><span style="color:#E1E4E8;">=</span></span>
<span class="line"><span style="color:#6A737D;">### 执行器IP [选填]：默认为空表示自动获取IP，多网卡时可手动设置指定IP，该IP不会绑定Host仅作为通讯实用；地址信息用于 &quot;执行器注册&quot; 和 &quot;调度中心请求并触发任务&quot;；</span></span>
<span class="line"><span style="color:#F97583;">xxl.job.executor.ip</span><span style="color:#E1E4E8;">=</span></span>
<span class="line"><span style="color:#6A737D;">### 执行器端口号 [选填]：小于等于0则自动获取；默认端口为9999，单机部署多个执行器时，注意要配置不同执行器端口；</span></span>
<span class="line"><span style="color:#F97583;">xxl.job.executor.port</span><span style="color:#E1E4E8;">=9000</span></span>
<span class="line"><span style="color:#6A737D;">### 执行器运行日志文件存储磁盘路径 [选填] ：需要对该路径拥有读写权限；为空则使用默认路径；</span></span>
<span class="line"><span style="color:#F97583;">xxl.job.executor.logpath</span><span style="color:#E1E4E8;">=/data/applogs/xxl-job/jobhandler</span></span>
<span class="line"><span style="color:#6A737D;">### 执行器日志文件保存天数 [选填] ： 过期日志自动清理, 限制值大于等于3时生效; 否则, 如-1, 关闭自动清理功能；</span></span>
<span class="line"><span style="color:#F97583;">xxl.job.executor.logretentiondays</span><span style="color:#E1E4E8;">=3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 端口号</span></span>
<span class="line"><span style="color:#D73A49;">server.port</span><span style="color:#24292E;">=8081</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### 调度中心部署根地址：如调度中心集群部署存在多个地址则用逗号分隔。执行器将会使用该地址进行&quot;执行器心跳注册&quot;和&quot;任务结果回调&quot;；为空则关闭自动注册；</span></span>
<span class="line"><span style="color:#D73A49;">xxl.job.admin.addresses</span><span style="color:#24292E;">=http://127.0.0.1:8080/xxl-job-admin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### xxl-job, access token</span></span>
<span class="line"><span style="color:#D73A49;">xxl.job.accessToken</span><span style="color:#24292E;">=default_token</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">### 执行器AppName[选填]：执行器心跳注册分组依据；为空则关闭自动注册</span></span>
<span class="line"><span style="color:#D73A49;">xxl.job.executor.appname</span><span style="color:#24292E;">=xxl-job-test</span></span>
<span class="line"><span style="color:#6A737D;">### 执行器注册 [选填]：优先使用该配置作为注册地址，为空时使用内嵌服务 ”IP:PORT“ 作为注册地址。从而更灵活的支持容器类型执行器动态IP和动态映射端口问题。</span></span>
<span class="line"><span style="color:#D73A49;">xxl.job.executor.address</span><span style="color:#24292E;">=</span></span>
<span class="line"><span style="color:#6A737D;">### 执行器IP [选填]：默认为空表示自动获取IP，多网卡时可手动设置指定IP，该IP不会绑定Host仅作为通讯实用；地址信息用于 &quot;执行器注册&quot; 和 &quot;调度中心请求并触发任务&quot;；</span></span>
<span class="line"><span style="color:#D73A49;">xxl.job.executor.ip</span><span style="color:#24292E;">=</span></span>
<span class="line"><span style="color:#6A737D;">### 执行器端口号 [选填]：小于等于0则自动获取；默认端口为9999，单机部署多个执行器时，注意要配置不同执行器端口；</span></span>
<span class="line"><span style="color:#D73A49;">xxl.job.executor.port</span><span style="color:#24292E;">=9000</span></span>
<span class="line"><span style="color:#6A737D;">### 执行器运行日志文件存储磁盘路径 [选填] ：需要对该路径拥有读写权限；为空则使用默认路径；</span></span>
<span class="line"><span style="color:#D73A49;">xxl.job.executor.logpath</span><span style="color:#24292E;">=/data/applogs/xxl-job/jobhandler</span></span>
<span class="line"><span style="color:#6A737D;">### 执行器日志文件保存天数 [选填] ： 过期日志自动清理, 限制值大于等于3时生效; 否则, 如-1, 关闭自动清理功能；</span></span>
<span class="line"><span style="color:#D73A49;">xxl.job.executor.logretentiondays</span><span style="color:#24292E;">=3</span></span></code></pre></div>`,14),e=[o];function t(c,r,i,y,E,x){return a(),n("div",null,e)}const b=s(p,[["render",t]]);export{u as __pageData,b as default};
