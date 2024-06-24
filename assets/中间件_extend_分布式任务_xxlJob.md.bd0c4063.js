import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.8048b864.js";const m=JSON.parse('{"title":"xxlJob","description":"","frontmatter":{},"headers":[],"relativePath":"中间件/extend/分布式任务/xxlJob.md","filePath":"中间件/extend/分布式任务/xxlJob.md","lastUpdated":1718873649000}'),p={name:"中间件/extend/分布式任务/xxlJob.md"},o=l(`<h1 id="xxljob" tabindex="-1">xxlJob <a class="header-anchor" href="#xxljob" aria-label="Permalink to &quot;xxlJob&quot;">​</a></h1><nav class="table-of-contents"><ul></ul></nav><blockquote><p>官方文档：<a href="https://www.xuxueli.com/xxl-job" target="_blank" rel="noreferrer">https://www.xuxueli.com/xxl-job</a></p></blockquote><table><thead><tr><th>组件/模块</th><th>描述</th></tr></thead><tbody><tr><td><code>xxl-job-admin</code></td><td>调度中心，负责任务的调度和管理。</td></tr><tr><td><code>xxl-job-core</code></td><td>公共依赖，包含XXL-JOB的核心功能和API。</td></tr><tr><td><code>xxl-job-executor-samples</code></td><td>执行器Sample示例，包括不同版本的执行器示例。</td></tr><tr><td><code>xxl-job-executor-sample-springboot</code></td><td>Springboot版本的执行器示例，推荐使用这种方式。</td></tr><tr><td><code>xxl-job-executor-sample-frameless</code></td><td>无框架版本的执行器示例，适合快速集成。</td></tr></tbody></table><table><thead><tr><th>表名</th><th>表中文名</th><th>描述</th></tr></thead><tbody><tr><td><code>xxl_job_lock</code></td><td>任务调度锁表</td><td>用于管理XXL-JOB任务调度的锁信息，确保任务调度的正确性</td></tr><tr><td><code>xxl_job_group</code></td><td>执行器信息表</td><td>维护XXL-JOB任务执行器的分组信息</td></tr><tr><td><code>xxl_job_info</code></td><td>调度扩展信息表</td><td>保存XXL-JOB调度任务的扩展信息，如任务分组、任务名等</td></tr><tr><td><code>xxl_job_log</code></td><td>调度日志表</td><td>保存XXL-JOB任务调度的历史信息，如调度结果等</td></tr><tr><td><code>xxl_job_log_report</code></td><td>调度日志报表</td><td>存储XXL-JOB任务调度日志的报表信息，用于报表功能页面</td></tr><tr><td><code>xxl_job_logglue</code></td><td>任务GLUE日志</td><td>保存GLUE更新历史，支持GLUE的版本回溯功能</td></tr><tr><td><code>xxl_job_registry</code></td><td>执行器注册表</td><td>维护在线的执行器和调度中心机器地址信息</td></tr><tr><td><code>xxl_job_user</code></td><td>系统用户表</td><td>存储XXL-JOB系统的用户信息</td></tr></tbody></table><div class="language-properties vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">properties</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">### 调度中心JDBC链接</span></span>
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
<span class="line"><span style="color:#D73A49;">xxl.job.logretentiondays</span><span style="color:#24292E;">=30</span></span></code></pre></div><p>调度中心访问地址：<a href="https://link.juejin.cn/?target=http%3A%2F%2F127.0.0.1%3A8080%2Fxxl-job-admin" target="_blank" rel="noreferrer">http://127.0.0.1:8080/xxl-job-admin</a> (<strong>该地址执行器将会使用到，作为回调地址</strong>)</p><p>默认登录账号：admin/123456</p>`,8),t=[o];function e(r,c,i,d,y,E){return a(),n("div",null,t)}const u=s(p,[["render",e]]);export{m as __pageData,u as default};
