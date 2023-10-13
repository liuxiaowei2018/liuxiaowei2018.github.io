import{_ as s,o as e,c as a,Q as n}from"./chunks/framework.8048b864.js";const l="/assets/image-20220309155637462.fda7eaef.png",p="/assets/image-20220309155804989.c4bc08df.png",o="/assets/image-20220309155917023.710f5320.png",c="/assets/image-20220309160053599.372dc99b.png",t="/assets/image-20220309160154946.1ed98a32.png",i="/assets/image-20220309160255362.89930330.png",r="/assets/image-20220309160338530.b65784a6.png",d="/assets/image-20220309160429856.87328af8.png",h="/assets/image-20220309160454497.dd95f056.png",u="/assets/image-20220309160544784.2b634c3c.png",g="/assets/image-20220407140441861.692dc435.png",y="/assets/image-20220407140708992.42a9a6ee.png",S=JSON.parse('{"title":"架构设计","description":"","frontmatter":{},"headers":[],"relativePath":"design/index.md","filePath":"design/index.md","lastUpdated":1686896377000}'),m={name:"design/index.md"},b=n('<h1 id="架构设计" tabindex="-1">架构设计 <a class="header-anchor" href="#架构设计" aria-label="Permalink to &quot;架构设计&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#如何做好架构设计">如何做好架构设计</a><ul><li><a href="#了解架构图">了解架构图</a></li><li><a href="#高可用架构通用设计">高可用架构通用设计</a></li></ul></li></ul></nav><h2 id="如何做好架构设计" tabindex="-1">如何做好架构设计 <a class="header-anchor" href="#如何做好架构设计" aria-label="Permalink to &quot;如何做好架构设计&quot;">​</a></h2><h3 id="了解架构图" tabindex="-1">了解架构图 <a class="header-anchor" href="#了解架构图" aria-label="Permalink to &quot;了解架构图&quot;">​</a></h3><h4 id="_4r架构" tabindex="-1">4R架构 <a class="header-anchor" href="#_4r架构" aria-label="Permalink to &quot;4R架构&quot;">​</a></h4><p><img src="'+l+'" alt="image-20220309155637462"></p><h4 id="_4-1架构视图" tabindex="-1">4+1架构视图 <a class="header-anchor" href="#_4-1架构视图" aria-label="Permalink to &quot;4+1架构视图&quot;">​</a></h4><p><img src="'+p+'" alt="image-20220309155804989"></p><h4 id="常见架构图" tabindex="-1">常见架构图 <a class="header-anchor" href="#常见架构图" aria-label="Permalink to &quot;常见架构图&quot;">​</a></h4><p><img src="'+o+'" alt="image-20220309155917023"></p><h5 id="业务架构" tabindex="-1">业务架构 <a class="header-anchor" href="#业务架构" aria-label="Permalink to &quot;业务架构&quot;">​</a></h5><p><img src="'+c+'" alt="image-20220309160053599"></p><h5 id="客户端架构、前端架构" tabindex="-1">客户端架构、前端架构 <a class="header-anchor" href="#客户端架构、前端架构" aria-label="Permalink to &quot;客户端架构、前端架构&quot;">​</a></h5><p><img src="'+t+'" alt="image-20220309160154946"></p><h5 id="系统架构" tabindex="-1">系统架构 <a class="header-anchor" href="#系统架构" aria-label="Permalink to &quot;系统架构&quot;">​</a></h5><p><img src="'+i+'" alt="image-20220309160255362"></p><p><img src="'+r+'" alt="image-20220309160338530"></p><h5 id="应用架构" tabindex="-1">应用架构 <a class="header-anchor" href="#应用架构" aria-label="Permalink to &quot;应用架构&quot;">​</a></h5><p><img src="'+d+'" alt="image-20220309160429856"></p><h5 id="部署架构" tabindex="-1">部署架构 <a class="header-anchor" href="#部署架构" aria-label="Permalink to &quot;部署架构&quot;">​</a></h5><p><img src="'+h+'" alt="image-20220309160454497"></p><h4 id="系统时序图" tabindex="-1">系统时序图 <a class="header-anchor" href="#系统时序图" aria-label="Permalink to &quot;系统时序图&quot;">​</a></h4><p><img src="'+u+`" alt="image-20220309160544784"></p><h5 id="idea-plantuml" tabindex="-1">idea-PlantUML <a class="header-anchor" href="#idea-plantuml" aria-label="Permalink to &quot;idea-PlantUML&quot;">​</a></h5><blockquote><h6 id="时序图" tabindex="-1">时序图 <a class="header-anchor" href="#时序图" aria-label="Permalink to &quot;时序图&quot;">​</a></h6><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">@startuml</span></span>
<span class="line"><span style="color:#e1e4e8;">title Oauth2令牌颁发之授权码模式</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">actor User as user</span></span>
<span class="line"><span style="color:#e1e4e8;">participant &quot;User Agent&quot; as userAgent</span></span>
<span class="line"><span style="color:#e1e4e8;">participant &quot;Client&quot; as client</span></span>
<span class="line"><span style="color:#e1e4e8;">participant &quot;Auth Login&quot; as login</span></span>
<span class="line"><span style="color:#e1e4e8;">participant &quot;Auth Server&quot; as server</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">autonumber</span></span>
<span class="line"><span style="color:#e1e4e8;">user-&gt;userAgent:访问客户端</span></span>
<span class="line"><span style="color:#e1e4e8;">activate userAgent</span></span>
<span class="line"><span style="color:#e1e4e8;">userAgent-&gt;login:重定向到授权页面+clientId+redirectUrl</span></span>
<span class="line"><span style="color:#e1e4e8;">activate login</span></span>
<span class="line"><span style="color:#e1e4e8;">login-&gt;server:用户名+密码+clientId+redirectUrl</span></span>
<span class="line"><span style="color:#e1e4e8;">activate server</span></span>
<span class="line"><span style="color:#e1e4e8;">server--&gt;login:返回授权码</span></span>
<span class="line"><span style="color:#e1e4e8;">login--&gt;userAgent:重定向到redirectUrl+授权码code</span></span>
<span class="line"><span style="color:#e1e4e8;">deactivate login</span></span>
<span class="line"><span style="color:#e1e4e8;">userAgent-&gt;client:使用授权码code换取令牌</span></span>
<span class="line"><span style="color:#e1e4e8;">activate client</span></span>
<span class="line"><span style="color:#e1e4e8;">client-&gt;server:授权码code+clientId+clientSecret</span></span>
<span class="line"><span style="color:#e1e4e8;">server--&gt;client:颁发访问令牌accessToken+refreshToken</span></span>
<span class="line"><span style="color:#e1e4e8;">deactivate server</span></span>
<span class="line"><span style="color:#e1e4e8;">client--&gt;userAgent:返回访问和刷新令牌</span></span>
<span class="line"><span style="color:#e1e4e8;">deactivate client</span></span>
<span class="line"><span style="color:#e1e4e8;">userAgent--&gt; user:令牌颁发完成</span></span>
<span class="line"><span style="color:#e1e4e8;">deactivate userAgent</span></span>
<span class="line"><span style="color:#e1e4e8;">@enduml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">@startuml</span></span>
<span class="line"><span style="color:#24292e;">title Oauth2令牌颁发之授权码模式</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">actor User as user</span></span>
<span class="line"><span style="color:#24292e;">participant &quot;User Agent&quot; as userAgent</span></span>
<span class="line"><span style="color:#24292e;">participant &quot;Client&quot; as client</span></span>
<span class="line"><span style="color:#24292e;">participant &quot;Auth Login&quot; as login</span></span>
<span class="line"><span style="color:#24292e;">participant &quot;Auth Server&quot; as server</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">autonumber</span></span>
<span class="line"><span style="color:#24292e;">user-&gt;userAgent:访问客户端</span></span>
<span class="line"><span style="color:#24292e;">activate userAgent</span></span>
<span class="line"><span style="color:#24292e;">userAgent-&gt;login:重定向到授权页面+clientId+redirectUrl</span></span>
<span class="line"><span style="color:#24292e;">activate login</span></span>
<span class="line"><span style="color:#24292e;">login-&gt;server:用户名+密码+clientId+redirectUrl</span></span>
<span class="line"><span style="color:#24292e;">activate server</span></span>
<span class="line"><span style="color:#24292e;">server--&gt;login:返回授权码</span></span>
<span class="line"><span style="color:#24292e;">login--&gt;userAgent:重定向到redirectUrl+授权码code</span></span>
<span class="line"><span style="color:#24292e;">deactivate login</span></span>
<span class="line"><span style="color:#24292e;">userAgent-&gt;client:使用授权码code换取令牌</span></span>
<span class="line"><span style="color:#24292e;">activate client</span></span>
<span class="line"><span style="color:#24292e;">client-&gt;server:授权码code+clientId+clientSecret</span></span>
<span class="line"><span style="color:#24292e;">server--&gt;client:颁发访问令牌accessToken+refreshToken</span></span>
<span class="line"><span style="color:#24292e;">deactivate server</span></span>
<span class="line"><span style="color:#24292e;">client--&gt;userAgent:返回访问和刷新令牌</span></span>
<span class="line"><span style="color:#24292e;">deactivate client</span></span>
<span class="line"><span style="color:#24292e;">userAgent--&gt; user:令牌颁发完成</span></span>
<span class="line"><span style="color:#24292e;">deactivate userAgent</span></span>
<span class="line"><span style="color:#24292e;">@enduml</span></span></code></pre></div><ul><li><p>本时序图关键说明如下：</p></li><li><ul><li><code>title</code>可以用于指定UML图的标题；</li></ul></li><li><p>通过<code>actor</code>可以声明人形的参与者；</p></li><li><p>通过<code>participant</code>可以声明普通类型的参与者；</p></li><li><p>通过<code>as</code>可以给参与者取别名；</p></li><li><p>通过<code>-&gt;</code>可以绘制参与者之间的关系，虚线箭头可以使用<code>--&gt;</code>；</p></li><li><p>在每个参与者关系后面，可以使用<code>:</code>给关系添加说明；</p></li><li><p>通过<code>autonumber</code>我们可以给参与者关系自动添加序号；</p></li><li><p>通过<code>activate</code>和<code>deactivate</code>可以指定参与者的生命线。</p></li><li><p>右键时序图时，可以生成一个在线访问的链接；</p></li><li><p>直接访问这个链接，可以在线访问UML时序图，并进行编辑</p></li></ul><h5 id="活动图" tabindex="-1">活动图 <a class="header-anchor" href="#活动图" aria-label="Permalink to &quot;活动图&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">@startuml</span></span>
<span class="line"><span style="color:#e1e4e8;">title 生成确认单流程</span></span>
<span class="line"><span style="color:#e1e4e8;">start</span></span>
<span class="line"><span style="color:#e1e4e8;">:获取购物车信息并计算好优惠;</span></span>
<span class="line"><span style="color:#e1e4e8;">:从ums_member_receive_address表中\\n获取会员收货地址列表;</span></span>
<span class="line"><span style="color:#e1e4e8;">:获取该会员所有优惠券信息;</span></span>
<span class="line"><span style="color:#e1e4e8;">switch(根据use_type判断每个优惠券是否可用)</span></span>
<span class="line"><span style="color:#e1e4e8;">case(0)</span></span>
<span class="line"><span style="color:#e1e4e8;"> :全场通用;</span></span>
<span class="line"><span style="color:#e1e4e8;"> if (判断所有商品总金额是否\\n满足使用起点金额) then (否)</span></span>
<span class="line"><span style="color:#e1e4e8;">     :得到用户不可用优惠券列表;</span></span>
<span class="line"><span style="color:#e1e4e8;">     stop</span></span>
<span class="line"><span style="color:#e1e4e8;"> endif</span></span>
<span class="line"><span style="color:#e1e4e8;">case(-1)</span></span>
<span class="line"><span style="color:#e1e4e8;">  :指定分类;</span></span>
<span class="line"><span style="color:#e1e4e8;">  if (判断指定分类商品总金额\\n是否满足使用起点金额) then (否)</span></span>
<span class="line"><span style="color:#e1e4e8;">      :得到用户不可用优惠券列表;</span></span>
<span class="line"><span style="color:#e1e4e8;">      stop</span></span>
<span class="line"><span style="color:#e1e4e8;"> endif</span></span>
<span class="line"><span style="color:#e1e4e8;">case(-2)</span></span>
<span class="line"><span style="color:#e1e4e8;">  :判断指定商品总金额是否满足使用起点金额;</span></span>
<span class="line"><span style="color:#e1e4e8;">  if (判断指定分类商品总金额\\n是否满足使用起点金额) then (否)</span></span>
<span class="line"><span style="color:#e1e4e8;">      :得到用户不可用优惠券列表;</span></span>
<span class="line"><span style="color:#e1e4e8;">      stop</span></span>
<span class="line"><span style="color:#e1e4e8;"> endif</span></span>
<span class="line"><span style="color:#e1e4e8;">endswitch</span></span>
<span class="line"><span style="color:#e1e4e8;">:得到用户可用优惠券列表;</span></span>
<span class="line"><span style="color:#e1e4e8;">:获取用户积分;</span></span>
<span class="line"><span style="color:#e1e4e8;">:获取积分使用规则;</span></span>
<span class="line"><span style="color:#e1e4e8;">:计算总金额，活动优惠，应付金额;</span></span>
<span class="line"><span style="color:#e1e4e8;">stop</span></span>
<span class="line"><span style="color:#e1e4e8;">@enduml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">@startuml</span></span>
<span class="line"><span style="color:#24292e;">title 生成确认单流程</span></span>
<span class="line"><span style="color:#24292e;">start</span></span>
<span class="line"><span style="color:#24292e;">:获取购物车信息并计算好优惠;</span></span>
<span class="line"><span style="color:#24292e;">:从ums_member_receive_address表中\\n获取会员收货地址列表;</span></span>
<span class="line"><span style="color:#24292e;">:获取该会员所有优惠券信息;</span></span>
<span class="line"><span style="color:#24292e;">switch(根据use_type判断每个优惠券是否可用)</span></span>
<span class="line"><span style="color:#24292e;">case(0)</span></span>
<span class="line"><span style="color:#24292e;"> :全场通用;</span></span>
<span class="line"><span style="color:#24292e;"> if (判断所有商品总金额是否\\n满足使用起点金额) then (否)</span></span>
<span class="line"><span style="color:#24292e;">     :得到用户不可用优惠券列表;</span></span>
<span class="line"><span style="color:#24292e;">     stop</span></span>
<span class="line"><span style="color:#24292e;"> endif</span></span>
<span class="line"><span style="color:#24292e;">case(-1)</span></span>
<span class="line"><span style="color:#24292e;">  :指定分类;</span></span>
<span class="line"><span style="color:#24292e;">  if (判断指定分类商品总金额\\n是否满足使用起点金额) then (否)</span></span>
<span class="line"><span style="color:#24292e;">      :得到用户不可用优惠券列表;</span></span>
<span class="line"><span style="color:#24292e;">      stop</span></span>
<span class="line"><span style="color:#24292e;"> endif</span></span>
<span class="line"><span style="color:#24292e;">case(-2)</span></span>
<span class="line"><span style="color:#24292e;">  :判断指定商品总金额是否满足使用起点金额;</span></span>
<span class="line"><span style="color:#24292e;">  if (判断指定分类商品总金额\\n是否满足使用起点金额) then (否)</span></span>
<span class="line"><span style="color:#24292e;">      :得到用户不可用优惠券列表;</span></span>
<span class="line"><span style="color:#24292e;">      stop</span></span>
<span class="line"><span style="color:#24292e;"> endif</span></span>
<span class="line"><span style="color:#24292e;">endswitch</span></span>
<span class="line"><span style="color:#24292e;">:得到用户可用优惠券列表;</span></span>
<span class="line"><span style="color:#24292e;">:获取用户积分;</span></span>
<span class="line"><span style="color:#24292e;">:获取积分使用规则;</span></span>
<span class="line"><span style="color:#24292e;">:计算总金额，活动优惠，应付金额;</span></span>
<span class="line"><span style="color:#24292e;">stop</span></span>
<span class="line"><span style="color:#24292e;">@enduml</span></span></code></pre></div><ul><li><p>本活动图关键说明如下：</p></li><li><ul><li>通过<code>start</code>和<code>stop</code>可以表示流程的开始和结束；</li></ul></li><li><p>通过<code>:</code>和<code>;</code>中间添加文字来定义活动流程节点；</p></li><li><p>通过<code>if</code>+<code>then</code>+<code>endif</code>定义条件判断；</p></li><li><p>通过<code>switch</code>+<code>case</code>+<code>endswitch</code>定义switch判断。</p></li></ul></blockquote><h3 id="高可用架构通用设计" tabindex="-1">高可用架构通用设计 <a class="header-anchor" href="#高可用架构通用设计" aria-label="Permalink to &quot;高可用架构通用设计&quot;">​</a></h3><blockquote><p>大型互联网架构设计，需要考虑的点，<code>高并发</code>、<code>高性能</code>、<code>高可用</code>、<code>高扩展</code>。</p></blockquote><h4 id="一、系统拆分" tabindex="-1">一、系统拆分 <a class="header-anchor" href="#一、系统拆分" aria-label="Permalink to &quot;一、系统拆分&quot;">​</a></h4><p>将一个复杂的业务域按DDD的思想拆分成若干子系统，每个子系统负责专属的业务功能，做好垂直化建设，各个子系统之间做好边界隔离，降低风险蔓延。</p><h4 id="二、解耦" tabindex="-1">二、解耦 <a class="header-anchor" href="#二、解耦" aria-label="Permalink to &quot;二、解耦&quot;">​</a></h4><p>软件开发原则“高内聚、低耦合”。</p><p>小到<code>接口抽象</code>、<code>MVC 分层</code>，大到 <code>SOLID 原则</code>、<code>23种设计模式</code>。核心都是降低不同模块间的耦合度，避免一处错误改动影响到整个系统。</p><p>以<code>开闭原则</code>为例，对扩展是开放的，对修改是关闭的。随着业务功能迭代，如何做到每次改动不对原来的旧代码产生影响。</p><p>Spring 框架给我们提供了一个很好的思路，里面有个重要设计 <code>AOP</code> ，全称（Aspect Oriented Programming），面向切面编程。</p><p>核心就是采用动态代理技术，通过对字节码进行增强，在方法调用的时候进行拦截，以便于在方法调用前后，增加我们需要的额外处理逻辑。</p><p>还有一个重要思路就是<code>事件机制</code>，通过<code>发布订阅模式</code>，新增的需求，只需要订阅对应的<code>事件通知</code>，针对性消费即可。不会对原来的代码侵入性修改，是不是会好很多。</p><h4 id="三、异步" tabindex="-1">三、异步 <a class="header-anchor" href="#三、异步" aria-label="Permalink to &quot;三、异步&quot;">​</a></h4><p>同步指一个进程在执行请求的时候，若该请求需要一段时间才能返回信息，那么这个进程将会一直等待下去，直到收到返回信息才继续执行下去。</p><p>如果是非实时响应的动作可以采用异步来完成，线程不需要一直等待，而是继续执行后面的逻辑。</p><p>如：线程池（ThreadPoolExecutor）、消息队列 等都是这个原理</p><p>比如一个用户在淘宝下了一笔购物订单，关心的是订单是否创建成功，能否进行后续的付款流程</p><p>至于其他业务动作，如短信通知、邮件通知、生成订单快照、创建超时任务记录，这些非核心动作用户并不是特别关心。</p><p>我们可以采用消息队列的<code>发布/订阅</code> 机制，数据库插入订单记录后，发布一条消息到 MQ，然后就可以告知用户下单成功。</p><p>其他事情，由不同的 Task 任务订阅消息异步处理，彼此间互不干扰。</p><h4 id="四、重试" tabindex="-1">四、重试 <a class="header-anchor" href="#四、重试" aria-label="Permalink to &quot;四、重试&quot;">​</a></h4><p>重试主要是体现在远程的RPC调用，受 <code>网络抖动</code>、<code>线程资源阻塞</code> 等因素影响，请求无法及时响应。</p><p>为了提升用户体验，调用方可以通过 <code>重试</code> 方式再次发送请求，尝试获取结果。比过：浏览器的 F5 刷新机制就是类似道理。</p><p>接口重试是一把双刃剑，虽然客户端收到了<code>响应超时</code>结果，但是我们无法确定，服务端是否已经执行完成。如果盲目地重试，可能会带来严重后果。比如：银行转账。</p><p><code>重试</code>通常跟<code>幂等</code>组合使用，如果一个接口支持了 <code>幂等</code>，那你就可以随便重试</p><p>关于的 <code>幂等</code> 的解决方案</p><ul><li>插入前先执行查询操作，看是否存在，再决定是否插入</li><li>增加唯一索引</li><li>建防重表</li><li>引入状态机，比如付款后，订单状态调整为<code>已付款</code>，SQL 更新记录前 增加条件判断</li><li>增加分布式锁</li><li>采用 Token 机制，服务端增加 token 校验，只有第一次请求是合法的</li></ul><h4 id="五、补偿" tabindex="-1">五、补偿 <a class="header-anchor" href="#五、补偿" aria-label="Permalink to &quot;五、补偿&quot;">​</a></h4><p>不是所有的请求都能收到成功响应。除了<code>重试</code> 机制外，还可以采用补偿玩法，实现数据<code>最终一致性</code>。</p><p>业务补偿根据处理的方向分为两部分：</p><ul><li>正向。多个操作构成一个分布式事务，如果部分成功、部分失败，我们会通过最大努力机制将<code>失败</code>的任务推进到成功状态</li><li>逆向。同上道理，我们也可以采用反向操作，将部分成功任务恢复到<code>初始状态</code></li></ul><blockquote><p>注意：补偿操作有个重要前提，业务能接受短时间内的数据不一致。</p></blockquote><p>补偿有很多的实现方式：</p><p>1、本地建表方式，存储相关数据，然后通过定时任务扫描提取，并借助反射机制触发执行</p><p>2、也可以采用简单的消息中间件，构建业务消息体，由下游的的消费任务执行。如果失败，可以借助MQ的重试机制，多次重试</p><h4 id="六、备份" tabindex="-1">六、备份 <a class="header-anchor" href="#六、备份" aria-label="Permalink to &quot;六、备份&quot;">​</a></h4><p>任何服务器都有宕机的可能性，一旦存储了数据，带上状态，如果发生故障，数据丢失，后果是我们无法承受的。</p><p>所以，<code>容灾备份</code>也就变成了互联网的基本能力。</p><p>如何备份，不同的框架有不用的玩法。以 Redis 为例：</p><p><img src="`+g+'" alt="image-20220407140441861"></p><p>Redis 借助 <code>RDB</code> 和 <code>AOF</code> 来实现两台服务器间的数据同步</p><ul><li>RDB，全量数据同步</li><li>AOF，增量数据同步，回放日志</li></ul><p>一旦主节点挂了怎么办？</p><p>这里引入哨兵机制。哨兵机制可以实现主从库的自动切换，有效解决了故障转移。整个过程分为三个阶段：监控、选主、通知。</p><p>除了 Redis 中间件外，其他常见的 MySQL、Kafka 消息中间件、HBase 、ES 等 ，凡是涉及到数据存储的介质，都有备份机制，一旦主节点挂了，会启用备份节点，保证数据不会丢失。</p><h4 id="七、多活策略" tabindex="-1">七、多活策略 <a class="header-anchor" href="#七、多活策略" aria-label="Permalink to &quot;七、多活策略&quot;">​</a></h4><p>在一些极端情况，如：机房断电、机房火灾、地震、山洪等不可抗力因素，所有的服务器都可能出现故障，无法对外提供服务，导致整体业务瘫痪。</p><p>为了降低风险，保证服务的24小时可用性，我们会采用 <code>多活策略</code>。</p><p>常见的<code>多活</code>方案有，<code>同城双活</code>、<code>两地三中心</code>、<code>三地五中心</code>、<code>异地双活</code>、<code>异地多活</code></p><h4 id="八、隔离" tabindex="-1">八、隔离 <a class="header-anchor" href="#八、隔离" aria-label="Permalink to &quot;八、隔离&quot;">​</a></h4><p>隔离属于物理层面的分割，将若干的系统低耦合设计，独立部署，从物理上隔开。</p><p>每个子系统有自己独立的代码库，独立开发，独立发布。一旦出现故障，也不会相互干扰。当然如果不同子系统间有相互依赖，这种情况比较特殊，需要有默认值或者异常特殊处理，这属于业务层面解决方案。</p><p>隔离属于分布式技术的衍生产物，我们最常见的微服务解决方案。</p><p>将一个大型的复杂系统拆分成若干个微服务系统，这些微服务子系统通常由不同的团队开发、维护，独立部署，服务之间通过 <code>RPC</code> 远程调用。</p><p>隔离使得系统间边界更加清晰，故障可以更加隔离开来，问题的发现与解决也更加快速，系统的可用性也更高。</p><h4 id="九、限流" tabindex="-1">九、限流 <a class="header-anchor" href="#九、限流" aria-label="Permalink to &quot;九、限流&quot;">​</a></h4><p>高并发系统，如果遇到流量洪峰，超过了当前系统的承载能力。CPU、内存、Load负载飚的很高，最后处理不过来，所有请求都超时无法正常响应。</p><p>解决方案-<strong>限流</strong></p><p>限流定义：</p><blockquote><p>限制到达系统的并发请求数量，保证系统能够正常响应部分用户请求，而对于超过限制的流量，则通过拒绝服务的方式保证整体系统的可用性。</p></blockquote><p><strong>根据作用范围：限流分为单机版限流、分布式限流</strong></p><p>1、单机版限流</p><p>主要借助于本机内存来实现计数器，比如通过AtomicLong#incrementAndGet()，但是要注意之前不用的key定期做清理，释放内存。</p><p>纯内存实现，无需和其他节点统计汇总，性能最高。但是优点也是缺点，无法做到全局统一化的限流。</p><p>2、分布式限流</p><p>单机版限流仅能保护自身节点，但无法保护应用依赖的各种服务，并且在进行节点扩容、缩容时也无法准确控制整个服务的请求限制。而分布式限流，以集群为维度，可以方便的控制这个集群的请求限制，从而保护下游依赖的各种服务资源。</p><p><strong>限流支持多个维度：</strong></p><ul><li>整个系统一定时间内（比如每分钟）处理多少请求</li><li>单个接口一定时间内处理多少流量</li><li>单个IP、城市、渠道、设备id、用户id等在一定时间内发送的请求数</li><li>如果是开放平台，则为每个appkey设置独立的访问速率规则</li></ul><p><strong>常见的限流算法：</strong></p><ul><li>计数器限流</li><li>滑动窗口限流</li><li>漏桶限流</li><li>令牌桶限流</li></ul><h4 id="十、熔断" tabindex="-1">十、熔断 <a class="header-anchor" href="#十、熔断" aria-label="Permalink to &quot;十、熔断&quot;">​</a></h4><p>熔断，其实是对调用链路中某个资源出现不稳定状态时（如：调用超时或异常比例升高），对这个资源的调用进行限制，让请求快速失败，避免影响到其它的资源而导致级联错误。</p><p>熔断的主要方式是使用断路器阻断对故障服务器的调用</p><p>断路器有三种状态，关闭、打开、半打开。</p><p><img src="'+y+'" alt="image-20220407140708992"></p><p>1、关闭（Closed）状态：在这个状态下，请求都会被转发给后端服务。同时会记录请求失败的次数，当请求失败次数在一段时间超过一定次数就会进入打开状态。</p><p>2、打开（Open）状态：在这个状态下，熔断器会直接拒绝请求，返回错误，而不去调用后端服务。同时，会有一个定时器，时间到的时候会变成半打开状态。目的是假设服务会在一段时间内恢复正常。</p><p>3、半打开（Half Open）状态：在这个状态下，熔断器会尝试把部分请求转发给后端服务，目的是为了探测后端服务是否恢复。如果请求失败会进入打开状态，成功情况下会进入关闭状态，同时重置计数。</p><p>目前，市面流行的解决方案是阿里的开源框架 <code>Sentinel</code>，提供了Dashboard控制台用于定义资源以及规则配置</p><h4 id="十一、降级" tabindex="-1">十一、降级 <a class="header-anchor" href="#十一、降级" aria-label="Permalink to &quot;十一、降级&quot;">​</a></h4><p><strong>降级是通过暂时关闭某些非核心服务或者组件从而保护核心系统的可用性。</strong></p><p>降级是系统保护的一种重要手段。使<code>有限资源</code>发挥最大价值，临时关闭一些非核心功能，减轻系统压力，并将有限资源留给核心业务。</p><p>比如电商大促，业务在峰值时刻，系统抵挡不住全部的流量时，系统的负载、CPU 的使用率都超过了预警水位，可以对一些非核心的功能进行降级，降低系统压力，比如把<code>商品评价</code>、<code>成交记录</code>等功能临时关掉。弃车保帅，保证 <code>创建订单</code>、<code>订单支付</code> 等核心功能的正常使用。</p>',107),q=[b];function f(_,k,v,P,x,A){return e(),a("div",null,q)}const C=s(m,[["render",f]]);export{S as __pageData,C as default};
