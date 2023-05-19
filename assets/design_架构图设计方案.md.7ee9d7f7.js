import{_ as s,c as a,o as n,N as e}from"./chunks/framework.0799945b.js";const l="/assets/image-20220309155637462.fda7eaef.png",p="/assets/image-20220309155804989.c4bc08df.png",t="/assets/image-20220309155917023.710f5320.png",o="/assets/image-20220309160053599.372dc99b.png",c="/assets/image-20220309160154946.1ed98a32.png",i="/assets/image-20220309160255362.89930330.png",r="/assets/image-20220309160338530.b65784a6.png",d="/assets/image-20220309160429856.87328af8.png",A="/assets/image-20220309160454497.dd95f056.png",C="/assets/image-20220309160544784.2b634c3c.png",k=JSON.parse('{"title":"架构设计","description":"","frontmatter":{},"headers":[],"relativePath":"design/架构图设计方案.md"}'),h={name:"design/架构图设计方案.md"},u=e('<h1 id="架构设计" tabindex="-1">架构设计 <a class="header-anchor" href="#架构设计" aria-label="Permalink to &quot;架构设计&quot;">​</a></h1><h2 id="架构图" tabindex="-1">架构图 <a class="header-anchor" href="#架构图" aria-label="Permalink to &quot;架构图&quot;">​</a></h2><h3 id="_4r架构" tabindex="-1">4R架构 <a class="header-anchor" href="#_4r架构" aria-label="Permalink to &quot;4R架构&quot;">​</a></h3><p><img src="'+l+'" alt="image-20220309155637462"></p><h3 id="_4-1架构视图" tabindex="-1">4+1架构视图 <a class="header-anchor" href="#_4-1架构视图" aria-label="Permalink to &quot;4+1架构视图&quot;">​</a></h3><p><img src="'+p+'" alt="image-20220309155804989"></p><h3 id="常见架构图" tabindex="-1">常见架构图 <a class="header-anchor" href="#常见架构图" aria-label="Permalink to &quot;常见架构图&quot;">​</a></h3><p><img src="'+t+'" alt="image-20220309155917023"></p><h4 id="业务架构" tabindex="-1">业务架构 <a class="header-anchor" href="#业务架构" aria-label="Permalink to &quot;业务架构&quot;">​</a></h4><p><img src="'+o+'" alt="image-20220309160053599"></p><h4 id="客户端架构、前端架构" tabindex="-1">客户端架构、前端架构 <a class="header-anchor" href="#客户端架构、前端架构" aria-label="Permalink to &quot;客户端架构、前端架构&quot;">​</a></h4><p><img src="'+c+'" alt="image-20220309160154946"></p><h4 id="系统架构" tabindex="-1">系统架构 <a class="header-anchor" href="#系统架构" aria-label="Permalink to &quot;系统架构&quot;">​</a></h4><p><img src="'+i+'" alt="image-20220309160255362"></p><p><img src="'+r+'" alt="image-20220309160338530"></p><h4 id="应用架构" tabindex="-1">应用架构 <a class="header-anchor" href="#应用架构" aria-label="Permalink to &quot;应用架构&quot;">​</a></h4><p><img src="'+d+'" alt="image-20220309160429856"></p><h4 id="部署架构" tabindex="-1">部署架构 <a class="header-anchor" href="#部署架构" aria-label="Permalink to &quot;部署架构&quot;">​</a></h4><p><img src="'+A+'" alt="image-20220309160454497"></p><h3 id="系统时序图" tabindex="-1">系统时序图 <a class="header-anchor" href="#系统时序图" aria-label="Permalink to &quot;系统时序图&quot;">​</a></h3><p><img src="'+C+`" alt="image-20220309160544784"></p><h4 id="时序图学习" tabindex="-1">时序图学习 <a class="header-anchor" href="#时序图学习" aria-label="Permalink to &quot;时序图学习&quot;">​</a></h4><h5 id="idea-plantuml" tabindex="-1">idea-PlantUML <a class="header-anchor" href="#idea-plantuml" aria-label="Permalink to &quot;idea-PlantUML&quot;">​</a></h5><blockquote><h6 id="时序图" tabindex="-1">时序图 <a class="header-anchor" href="#时序图" aria-label="Permalink to &quot;时序图&quot;">​</a></h6><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@startuml</span></span>
<span class="line"><span style="color:#A6ACCD;">title Oauth2令牌颁发之授权码模式</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">actor User as user</span></span>
<span class="line"><span style="color:#A6ACCD;">participant &quot;User Agent&quot; as userAgent</span></span>
<span class="line"><span style="color:#A6ACCD;">participant &quot;Client&quot; as client</span></span>
<span class="line"><span style="color:#A6ACCD;">participant &quot;Auth Login&quot; as login</span></span>
<span class="line"><span style="color:#A6ACCD;">participant &quot;Auth Server&quot; as server</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">autonumber</span></span>
<span class="line"><span style="color:#A6ACCD;">user-&gt;userAgent:访问客户端</span></span>
<span class="line"><span style="color:#A6ACCD;">activate userAgent</span></span>
<span class="line"><span style="color:#A6ACCD;">userAgent-&gt;login:重定向到授权页面+clientId+redirectUrl</span></span>
<span class="line"><span style="color:#A6ACCD;">activate login</span></span>
<span class="line"><span style="color:#A6ACCD;">login-&gt;server:用户名+密码+clientId+redirectUrl</span></span>
<span class="line"><span style="color:#A6ACCD;">activate server</span></span>
<span class="line"><span style="color:#A6ACCD;">server--&gt;login:返回授权码</span></span>
<span class="line"><span style="color:#A6ACCD;">login--&gt;userAgent:重定向到redirectUrl+授权码code</span></span>
<span class="line"><span style="color:#A6ACCD;">deactivate login</span></span>
<span class="line"><span style="color:#A6ACCD;">userAgent-&gt;client:使用授权码code换取令牌</span></span>
<span class="line"><span style="color:#A6ACCD;">activate client</span></span>
<span class="line"><span style="color:#A6ACCD;">client-&gt;server:授权码code+clientId+clientSecret</span></span>
<span class="line"><span style="color:#A6ACCD;">server--&gt;client:颁发访问令牌accessToken+refreshToken</span></span>
<span class="line"><span style="color:#A6ACCD;">deactivate server</span></span>
<span class="line"><span style="color:#A6ACCD;">client--&gt;userAgent:返回访问和刷新令牌</span></span>
<span class="line"><span style="color:#A6ACCD;">deactivate client</span></span>
<span class="line"><span style="color:#A6ACCD;">userAgent--&gt; user:令牌颁发完成</span></span>
<span class="line"><span style="color:#A6ACCD;">deactivate userAgent</span></span>
<span class="line"><span style="color:#A6ACCD;">@enduml</span></span></code></pre></div><ul><li><p>本时序图关键说明如下：</p></li><li><ul><li><code>title</code>可以用于指定UML图的标题；</li></ul></li><li><p>通过<code>actor</code>可以声明人形的参与者；</p></li><li><p>通过<code>participant</code>可以声明普通类型的参与者；</p></li><li><p>通过<code>as</code>可以给参与者取别名；</p></li><li><p>通过<code>-&gt;</code>可以绘制参与者之间的关系，虚线箭头可以使用<code>--&gt;</code>；</p></li><li><p>在每个参与者关系后面，可以使用<code>:</code>给关系添加说明；</p></li><li><p>通过<code>autonumber</code>我们可以给参与者关系自动添加序号；</p></li><li><p>通过<code>activate</code>和<code>deactivate</code>可以指定参与者的生命线。</p></li><li><p>右键时序图时，可以生成一个在线访问的链接；</p></li><li><p>直接访问这个链接，可以在线访问UML时序图，并进行编辑</p></li></ul><h5 id="活动图" tabindex="-1">活动图 <a class="header-anchor" href="#活动图" aria-label="Permalink to &quot;活动图&quot;">​</a></h5><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@startuml</span></span>
<span class="line"><span style="color:#A6ACCD;">title 生成确认单流程</span></span>
<span class="line"><span style="color:#A6ACCD;">start</span></span>
<span class="line"><span style="color:#A6ACCD;">:获取购物车信息并计算好优惠;</span></span>
<span class="line"><span style="color:#A6ACCD;">:从ums_member_receive_address表中\\n获取会员收货地址列表;</span></span>
<span class="line"><span style="color:#A6ACCD;">:获取该会员所有优惠券信息;</span></span>
<span class="line"><span style="color:#A6ACCD;">switch(根据use_type判断每个优惠券是否可用)</span></span>
<span class="line"><span style="color:#A6ACCD;">case(0)</span></span>
<span class="line"><span style="color:#A6ACCD;"> :全场通用;</span></span>
<span class="line"><span style="color:#A6ACCD;"> if (判断所有商品总金额是否\\n满足使用起点金额) then (否)</span></span>
<span class="line"><span style="color:#A6ACCD;">     :得到用户不可用优惠券列表;</span></span>
<span class="line"><span style="color:#A6ACCD;">     stop</span></span>
<span class="line"><span style="color:#A6ACCD;"> endif</span></span>
<span class="line"><span style="color:#A6ACCD;">case(-1)</span></span>
<span class="line"><span style="color:#A6ACCD;">  :指定分类;</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (判断指定分类商品总金额\\n是否满足使用起点金额) then (否)</span></span>
<span class="line"><span style="color:#A6ACCD;">      :得到用户不可用优惠券列表;</span></span>
<span class="line"><span style="color:#A6ACCD;">      stop</span></span>
<span class="line"><span style="color:#A6ACCD;"> endif</span></span>
<span class="line"><span style="color:#A6ACCD;">case(-2)</span></span>
<span class="line"><span style="color:#A6ACCD;">  :判断指定商品总金额是否满足使用起点金额;</span></span>
<span class="line"><span style="color:#A6ACCD;">  if (判断指定分类商品总金额\\n是否满足使用起点金额) then (否)</span></span>
<span class="line"><span style="color:#A6ACCD;">      :得到用户不可用优惠券列表;</span></span>
<span class="line"><span style="color:#A6ACCD;">      stop</span></span>
<span class="line"><span style="color:#A6ACCD;"> endif</span></span>
<span class="line"><span style="color:#A6ACCD;">endswitch</span></span>
<span class="line"><span style="color:#A6ACCD;">:得到用户可用优惠券列表;</span></span>
<span class="line"><span style="color:#A6ACCD;">:获取用户积分;</span></span>
<span class="line"><span style="color:#A6ACCD;">:获取积分使用规则;</span></span>
<span class="line"><span style="color:#A6ACCD;">:计算总金额，活动优惠，应付金额;</span></span>
<span class="line"><span style="color:#A6ACCD;">stop</span></span>
<span class="line"><span style="color:#A6ACCD;">@enduml</span></span></code></pre></div><ul><li><p>本活动图关键说明如下：</p></li><li><ul><li>通过<code>start</code>和<code>stop</code>可以表示流程的开始和结束；</li></ul></li><li><p>通过<code>:</code>和<code>;</code>中间添加文字来定义活动流程节点；</p></li><li><p>通过<code>if</code>+<code>then</code>+<code>endif</code>定义条件判断；</p></li><li><p>通过<code>switch</code>+<code>case</code>+<code>endswitch</code>定义switch判断。</p></li></ul></blockquote>`,24),g=[u];function m(y,D,_,b,q,f){return n(),a("div",null,g)}const P=s(h,[["render",m]]);export{k as __pageData,P as default};
