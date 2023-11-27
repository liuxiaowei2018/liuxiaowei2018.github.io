import{_ as t,o as e,c as l,Q as a}from"./chunks/framework.8048b864.js";const h=JSON.parse('{"title":"任务调度中间件","description":"","frontmatter":{},"headers":[],"relativePath":"middleware/task.md","filePath":"middleware/task.md","lastUpdated":1697625092000}'),n={name:"middleware/task.md"},s=a('<h1 id="任务调度中间件" tabindex="-1">任务调度中间件 <a class="header-anchor" href="#任务调度中间件" aria-label="Permalink to &quot;任务调度中间件&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#概述">概述</a></li><li><a href="#导航">导航</a></li></ul></nav><h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h2><blockquote><p>任务调度中间件框架，可以用来管理和协调系统任务的执行。</p></blockquote><ul><li><p>Quartz</p><p><code>Quartz</code>可以视为第一代任务调度框架，基本上是现有所有分布式调度框架的“祖宗”。由于历史原因，它不提供Web界面，只能通过API完成任务的配置，使用起来不够方便和灵活，同时它仅支持单机执行，无法有效利用整个集群的计算能力。</p></li><li><p>XxlJob</p><p><code>xxl-job</code>可以视为第二代任务调度框架，在一定程度上解决了Quartz的不足，在过去几年中是个非常优秀的调度框架，不过放到今天来看，还是存在着一些不足的，具体如下：</p><ul><li><strong>数据库支持单一：</strong> 仅支持MySQL，使用其他DB需要自己魔改代码</li><li><strong>有限的分布式计算能力：</strong> 仅支持静态分片，无法很好的完成复杂任务的计算</li><li><strong>不支持工作流：</strong> 无法配置各个任务之间的依赖关系，不适用于有DAG需求的场景</li></ul></li><li><p>PowerJob</p><p><code>PowerJob</code>在任务调度的基础上，还额外提供了分布式计算和工作流功能，其主要特性如下：</p><ul><li><strong>使用简单：</strong> 提供前端Web界面，允许开发者可视化地完成调度任务的管理（增、删、改、查）、任务运行状态监控和运行日志查看等功能。</li><li><strong>定时策略完善：</strong> 支持CRON表达式、固定频率、固定延迟和API四种定时调度策略。</li><li><strong>执行模式丰富：</strong> 支持单机、广播、Map、MapReduce四种执行模式，其中Map/MapReduce处理器能使开发者寥寥数行代码便获得集群分布式计算的能力。</li><li><strong>DAG工作流支持：</strong> 支持在线配置任务依赖关系，可视化得对任务进行编排，同时还支持上下游任务间的数据传递</li><li><strong>执行器支持广泛：</strong> 支持Spring Bean、内置/外置Java类、Shell、Python等处理器，应用范围广。</li><li><strong>运维便捷：</strong> 支持在线日志功能，执行器产生的日志可以在前端控制台页面实时显示，降低debug成本，极大地提高开发效率。</li><li><strong>依赖精简：</strong> 最小仅依赖关系型数据库（MySQL/PostgreSQL/Oracle/MS SQLServer…），同时支持所有Spring Data JPA所支持的关系型数据库。</li><li><strong>高可用&amp;高性能：</strong> 调度服务器经过精心设计，一改其他调度框架基于数据库锁的策略，实现了无锁化调度。部署多个调度服务器可以同时实现高可用和性能的提升（支持无限的水平扩展）。</li><li><strong>故障转移与恢复：</strong> 任务执行失败后，可根据配置的重试策略完成重试，只要执行器集群有足够的计算节点，任务就能顺利完成。</li></ul></li></ul><table><thead><tr><th style="text-align:left;"></th><th style="text-align:left;">QuartZ（单点）</th><th style="text-align:left;">xxl-job</th><th style="text-align:left;">PowerJob</th></tr></thead><tbody><tr><td style="text-align:left;">定时类型</td><td style="text-align:left;">CRON</td><td style="text-align:left;">CRON</td><td style="text-align:left;"><strong>CRON、固定频率、固定延迟、OpenAPI</strong></td></tr><tr><td style="text-align:left;">任务类型</td><td style="text-align:left;">内置Java</td><td style="text-align:left;">内置Java、GLUE Java、Shell、Python等脚本</td><td style="text-align:left;"><strong>内置Java、外置Java（容器）、Shell、Python等脚本</strong></td></tr><tr><td style="text-align:left;">分布式任务</td><td style="text-align:left;">无</td><td style="text-align:left;">静态分片</td><td style="text-align:left;"><strong>MapReduce动态分片</strong></td></tr><tr><td style="text-align:left;">在线任务治理</td><td style="text-align:left;">不支持</td><td style="text-align:left;">支持</td><td style="text-align:left;"><strong>支持</strong></td></tr><tr><td style="text-align:left;">日志白屏化</td><td style="text-align:left;">不支持</td><td style="text-align:left;">支持</td><td style="text-align:left;"><strong>支持</strong></td></tr><tr><td style="text-align:left;">调度方式及性能</td><td style="text-align:left;">基于数据库锁，有性能瓶颈</td><td style="text-align:left;">基于数据库锁，有性能瓶颈</td><td style="text-align:left;"><strong>无锁化设计，性能强劲无上限</strong></td></tr><tr><td style="text-align:left;">报警监控</td><td style="text-align:left;">无</td><td style="text-align:left;">邮件</td><td style="text-align:left;"><strong>邮件，提供接口允许开发者扩展</strong></td></tr><tr><td style="text-align:left;">系统依赖</td><td style="text-align:left;">JDBC支持的关系型数据库（MySQL、Oracle…）</td><td style="text-align:left;">MySQL</td><td style="text-align:left;"><strong>任意Spring Data Jpa支持的关系型数据库（MySQL、Oracle…）</strong></td></tr><tr><td style="text-align:left;">DAG工作流</td><td style="text-align:left;">不支持</td><td style="text-align:left;">不支持</td><td style="text-align:left;"><strong>支持</strong></td></tr></tbody></table><h2 id="导航" tabindex="-1">导航 <a class="header-anchor" href="#导航" aria-label="Permalink to &quot;导航&quot;">​</a></h2><blockquote><p><a href="./../second/task/xxlJob.html">任务调度中间件二级目录</a></p></blockquote>',8),r=[s];function d(o,i,g,f,x,y){return e(),l("div",null,r)}const p=t(n,[["render",d]]);export{h as __pageData,p as default};
