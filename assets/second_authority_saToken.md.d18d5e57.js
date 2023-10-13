import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8048b864.js";const p="/assets/image-20220103160519462.d89a69d8.png",g=JSON.parse('{"title":"sa-token","description":"","frontmatter":{},"headers":[],"relativePath":"second/authority/saToken.md","filePath":"second/authority/saToken.md","lastUpdated":1682072757000}'),o={name:"second/authority/saToken.md"},e=l('<h1 id="sa-token" tabindex="-1">sa-token <a class="header-anchor" href="#sa-token" aria-label="Permalink to &quot;sa-token&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#介绍">介绍</a></li><li><a href="#springboot-集成sa-token">SpringBoot 集成sa-token</a></li><li><a href="#springcloud-集成sa-token">SpringCloud 集成sa-token</a></li></ul></nav><blockquote><p>sa-token官网地址：<a href="https://sa-token.dev33.cn/doc/index.html#/" target="_blank" rel="noreferrer">https://sa-token.dev33.cn/doc/index.html#/</a></p></blockquote><p><img src="'+p+`" alt="image-20220103160519462"></p><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><blockquote><p>sa-token是一个轻量级Java权限认证框架，主要解决：登录认证、权限认证、Session会话、单点登录、OAuth2.0 等一系列权限相关问题</p><p>框架针对踢人下线、自动续签、前后台分离、分布式会话……等常见业务进行N多适配，通过sa-token，可以以一种极简的方式实现系统的权限认证部分</p><p>与其它权限认证框架相比，sa-token 具有以下优势：</p><ol><li><p>简单 ：可零配置启动框架，真正的开箱即用，低成本上手</p></li><li><p>强大 ：目前已集成几十项权限相关特性，涵盖了大部分业务场景的解决方案</p></li><li><p>易用 ：如丝般顺滑的API调用，大量高级特性统统只需一行代码即可实现</p></li><li><p>高扩展 ：几乎所有组件都提供了扩展接口，90%以上的逻辑都可以按需重写</p></li></ol><h4 id="sa-token-能做什么" tabindex="-1">Sa-Token 能做什么？ <a class="header-anchor" href="#sa-token-能做什么" aria-label="Permalink to &quot;Sa-Token 能做什么？&quot;">​</a></h4><ul><li><p>登录验证 —— 轻松登录鉴权，并提供五种细分场景值</p></li><li><p>权限验证 —— 适配RBAC权限模型，不同角色不同授权</p></li><li><p>Session会话 —— 专业的数据缓存中心</p></li><li><p>踢人下线 —— 将违规用户立刻清退下线</p></li><li><p>持久层扩展 —— 可集成Redis、Memcached等专业缓存中间件，重启数据不丢失</p></li><li><p>分布式会话 —— 提供jwt集成和共享数据中心两种分布式会话方案</p></li><li><p>单点登录 —— 一处登录，处处通行</p></li><li><p>模拟他人账号 —— 实时操作任意用户状态数据</p></li><li><p>临时身份切换 —— 将会话身份临时切换为其它账号</p></li><li><p>无Cookie模式 —— APP、小程序等前后台分离场景</p></li><li><p>同端互斥登录 —— 像QQ一样手机电脑同时在线，但是两个手机上互斥登录</p></li><li><p>多账号认证体系 —— 比如一个商城项目的user表和admin表分开鉴权</p></li><li><p>花式token生成 —— 内置六种token风格，还可自定义token生成策略</p></li><li><p>注解式鉴权 —— 优雅的将鉴权与业务代码分离</p></li><li><p>路由拦截式鉴权 —— 根据路由拦截鉴权，可适配restful模式</p></li><li><p>自动续签 —— 提供两种token过期策略，灵活搭配使用，还可自动续签</p></li><li><p>会话治理 —— 提供方便灵活的会话查询接口</p></li><li><p>组件自动注入 —— 零配置与Spring等框架集成</p></li></ul><h4 id="代码示例" tabindex="-1">代码示例 <a class="header-anchor" href="#代码示例" aria-label="Permalink to &quot;代码示例&quot;">​</a></h4><p>sa-token的API调用非常简单，有多简单呢？以登录验证为例，只需要：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 在登录时写入当前会话的账号id</span></span>
<span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">setLoginId</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10001</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 然后在任意需要校验登录处调用以下API</span></span>
<span class="line"><span style="color:#6A737D;">// 如果当前会话未登录，这句代码会抛出 \`NotLoginException\`异常</span></span>
<span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">checkLogin</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 在登录时写入当前会话的账号id</span></span>
<span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">setLoginId</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10001</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 然后在任意需要校验登录处调用以下API</span></span>
<span class="line"><span style="color:#6A737D;">// 如果当前会话未登录，这句代码会抛出 \`NotLoginException\`异常</span></span>
<span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">checkLogin</span><span style="color:#24292E;">();</span></span></code></pre></div><p>权限认证示例 (只有具有user:add权限的会话才可以进入请求)</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">SaCheckPermission</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user:add&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">RequestMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/user/insert&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">insert</span><span style="color:#E1E4E8;">(SysUser user) {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;用户增加&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">SaCheckPermission</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user:add&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">RequestMapping</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/user/insert&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">insert</span><span style="color:#24292E;">(SysUser user) {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;用户增加&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>将某个账号踢下线 (待到对方再次访问系统时会抛出<code>NotLoginException</code>异常)</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 使账号id为10001的会话注销登录</span></span>
<span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">logoutByLoginId</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10001</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 使账号id为10001的会话注销登录</span></span>
<span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">logoutByLoginId</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10001</span><span style="color:#24292E;">);</span></span></code></pre></div><p>一行代码完成以下功能：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">setLoginId</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10001</span><span style="color:#E1E4E8;">);                </span><span style="color:#6A737D;">// 标记当前会话登录的账号id</span></span>
<span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">getLoginId</span><span style="color:#E1E4E8;">();                     </span><span style="color:#6A737D;">// 获取当前会话登录的账号id</span></span>
<span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">isLogin</span><span style="color:#E1E4E8;">();                        </span><span style="color:#6A737D;">// 获取当前会话是否已经登录, 返回true或false</span></span>
<span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">logout</span><span style="color:#E1E4E8;">();                         </span><span style="color:#6A737D;">// 当前会话注销登录</span></span>
<span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">logoutByLoginId</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10001</span><span style="color:#E1E4E8;">);           </span><span style="color:#6A737D;">// 让账号为10001的会话注销登录（踢人下线）</span></span>
<span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">hasRole</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;super-admin&quot;</span><span style="color:#E1E4E8;">);           </span><span style="color:#6A737D;">// 查询当前账号是否含有指定角色标识, 返回true或false</span></span>
<span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">hasPermission</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user:add&quot;</span><span style="color:#E1E4E8;">);        </span><span style="color:#6A737D;">// 查询当前账号是否含有指定权限, 返回true或false</span></span>
<span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">getSession</span><span style="color:#E1E4E8;">();                     </span><span style="color:#6A737D;">// 获取当前账号id的Session</span></span>
<span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">getSessionByLoginId</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10001</span><span style="color:#E1E4E8;">);       </span><span style="color:#6A737D;">// 获取账号id为10001的Session</span></span>
<span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">getTokenValueByLoginId</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10001</span><span style="color:#E1E4E8;">);    </span><span style="color:#6A737D;">// 获取账号id为10001的token令牌值</span></span>
<span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">setLoginId</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10001</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;PC&quot;</span><span style="color:#E1E4E8;">);          </span><span style="color:#6A737D;">// 指定设备标识登录</span></span>
<span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">logoutByLoginId</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10001</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;PC&quot;</span><span style="color:#E1E4E8;">);     </span><span style="color:#6A737D;">// 指定设备标识进行强制注销 (不同端不受影响)</span></span>
<span class="line"><span style="color:#E1E4E8;">StpUtil.</span><span style="color:#B392F0;">switchTo</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10044</span><span style="color:#E1E4E8;">);                  </span><span style="color:#6A737D;">// 将当前会话身份临时切换为其它账号</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">setLoginId</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10001</span><span style="color:#24292E;">);                </span><span style="color:#6A737D;">// 标记当前会话登录的账号id</span></span>
<span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">getLoginId</span><span style="color:#24292E;">();                     </span><span style="color:#6A737D;">// 获取当前会话登录的账号id</span></span>
<span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">isLogin</span><span style="color:#24292E;">();                        </span><span style="color:#6A737D;">// 获取当前会话是否已经登录, 返回true或false</span></span>
<span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">logout</span><span style="color:#24292E;">();                         </span><span style="color:#6A737D;">// 当前会话注销登录</span></span>
<span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">logoutByLoginId</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10001</span><span style="color:#24292E;">);           </span><span style="color:#6A737D;">// 让账号为10001的会话注销登录（踢人下线）</span></span>
<span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">hasRole</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;super-admin&quot;</span><span style="color:#24292E;">);           </span><span style="color:#6A737D;">// 查询当前账号是否含有指定角色标识, 返回true或false</span></span>
<span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">hasPermission</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user:add&quot;</span><span style="color:#24292E;">);        </span><span style="color:#6A737D;">// 查询当前账号是否含有指定权限, 返回true或false</span></span>
<span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">getSession</span><span style="color:#24292E;">();                     </span><span style="color:#6A737D;">// 获取当前账号id的Session</span></span>
<span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">getSessionByLoginId</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10001</span><span style="color:#24292E;">);       </span><span style="color:#6A737D;">// 获取账号id为10001的Session</span></span>
<span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">getTokenValueByLoginId</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10001</span><span style="color:#24292E;">);    </span><span style="color:#6A737D;">// 获取账号id为10001的token令牌值</span></span>
<span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">setLoginId</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10001</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;PC&quot;</span><span style="color:#24292E;">);          </span><span style="color:#6A737D;">// 指定设备标识登录</span></span>
<span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">logoutByLoginId</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10001</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;PC&quot;</span><span style="color:#24292E;">);     </span><span style="color:#6A737D;">// 指定设备标识进行强制注销 (不同端不受影响)</span></span>
<span class="line"><span style="color:#24292E;">StpUtil.</span><span style="color:#6F42C1;">switchTo</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10044</span><span style="color:#24292E;">);                  </span><span style="color:#6A737D;">// 将当前会话身份临时切换为其它账号</span></span></code></pre></div></blockquote><h2 id="springboot-集成sa-token" tabindex="-1">SpringBoot 集成sa-token <a class="header-anchor" href="#springboot-集成sa-token" aria-label="Permalink to &quot;SpringBoot 集成sa-token&quot;">​</a></h2><h4 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h4><blockquote><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- Sa-Token 权限认证, 在线文档：http://sa-token.dev33.cn/ --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;cn.dev33&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;sa-token-spring-boot-starter&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;1.25.0&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- sa-token整合redis (使用jdk默认序列化方式) --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;cn.dev33&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;sa-token-dao-redis&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;1.25.0&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- Sa-Token 权限认证, 在线文档：http://sa-token.dev33.cn/ --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;cn.dev33&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;sa-token-spring-boot-starter&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;1.25.0&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- sa-token整合redis (使用jdk默认序列化方式) --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;cn.dev33&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;sa-token-dao-redis&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;1.25.0&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">server</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8010</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">spring</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">servlet</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">multipart</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">location</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">C:/var/guoheng/picture/</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">max-file-size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">10MB</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">max-request-size</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">10MB</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">datasource</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">driver-class-name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">com.mysql.cj.jdbc.Driver</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">url</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">jdbc:mysql://127.0.0.1:3306/fire_control?useUnicode=true&amp;characterEncoding=utf8&amp;characterSetResults=utf8&amp;allowMultiQueries=true&amp;serverTimezone=GMT%2B8</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">username</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">root</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">password</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">root</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">com.alibaba.druid.pool.DruidDataSource</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">#########  druid连接池配置  #########</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">druid</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 连接池建立时创建的初始化连接数</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">initial-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 连接池中最大的活跃连接数</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">max-active</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 连接池中最小的活跃连接数</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">min-idle</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 连接时最大等待时间，单位毫秒。配置了maxWait之后，缺省启用公平锁，并发效率会有所下降，如果需要可以通过配置useUnfairLock属性为true使用非公平锁。</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">max-wait</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">60000</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 是否缓存preparedStatement，也就是PSCache。PSCache对支持游标的数据库性能提升巨大，比如说oracle。在mysql下建议关闭。</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">pool-prepared-statements</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 指定每个连接上PSCache的大小，要启用PSCache，必须配置大于0，当大于0时，poolPreparedStatements自动触发修改为true。在Druid中，不会存在Oracle下PSCache占用内存过多的问题，可以把这个数值配置大一些，比如说100。</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">max-pool-prepared-statement-per-connection-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">-1</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 用来检测连接是否有效的sql，要求是一个查询语句。如果validationQuery为null，testOnBorrow、testOnReturn、testWhileIdle都不会其作用。（不同数据库不同）</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">validation-query</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">SELECT &#39;x&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 指定连接校验查询的超时时间，单位：秒。</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">validation-query-timeout</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 是否在获得连接后检测其可用性,连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能。</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">test-on-borrow</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 是否在连接放回连接池后检测其可用性，做了这个配置会降低性能。</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">test-on-return</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 是否在连接空闲一段时间后检测其可用性，建议配置为true，不影响性能，并且保证安全性。申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">test-while-idle</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒。</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">time-between-eviction-runs-millis</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">60000</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 配置一个连接在池中最小生存的时间，单位是毫秒。</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">min-evictable-idle-time-millis</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">300000</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 登陆超时时间，单位是秒。</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">login-timeout</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 查询超时时间，单位是秒。</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">query-timeout</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 事务查询超时时间，单位是秒。</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">transaction-query-timeout</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">60</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 异步关闭连接。</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">async-close-connection-enable</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;"># 属性类型是字符串，通过别名的方式配置扩展插件，常用的插件有：监控统计用的filter:stat，日志用的filter:log4j，防御sql注入的filter:wall</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">filters</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">stat</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;">##########  StatViewServlet监控配置  ##########</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">stat-view-servlet</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">login-username</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">guoheng</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">login-password</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">guoheng</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">allow</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">deny</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">aop</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">auto</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">###################  redis配置  ###################</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">redis</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">host</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">127.0.0.1</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">6379</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">password</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#85E89D;">jedis</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#85E89D;">pool</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">max-active</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">max-wait</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">-1</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">max-idle</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">min-idle</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#85E89D;">time-between-eviction-runs</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">30000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">################### sa-token配置 ###################</span></span>
<span class="line"><span style="color:#85E89D;">sa-token</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># token名称 (同时也是cookie名称)</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">token-name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">satoken</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># token有效期，单位s 默认30天, -1代表永不过期</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">timeout</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">2592000</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># token临时有效期 (指定时间内无操作就视为token过期) 单位: 秒</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">activity-timeout</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">3600</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 是否允许同一账号并发登录 (为true时允许一起登录, 为false时新登录挤掉旧登录)</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">is-concurrent</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 在多人登录同一账号时，是否共用一个token (为true时所有登录共用一个token, 为false时每次登录新建一个token)</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">is-share</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># token风格</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">token-style</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">simple-uuid</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># 是否输出操作日志</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">is-log</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">mybatis</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#85E89D;">mapper-locations</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">classpath*:mapper/*.xml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">server</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8010</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">spring</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">servlet</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">multipart</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">location</span><span style="color:#24292E;">: </span><span style="color:#032F62;">C:/var/guoheng/picture/</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">max-file-size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">10MB</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">max-request-size</span><span style="color:#24292E;">: </span><span style="color:#032F62;">10MB</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">datasource</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">driver-class-name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">com.mysql.cj.jdbc.Driver</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">url</span><span style="color:#24292E;">: </span><span style="color:#032F62;">jdbc:mysql://127.0.0.1:3306/fire_control?useUnicode=true&amp;characterEncoding=utf8&amp;characterSetResults=utf8&amp;allowMultiQueries=true&amp;serverTimezone=GMT%2B8</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">username</span><span style="color:#24292E;">: </span><span style="color:#032F62;">root</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">password</span><span style="color:#24292E;">: </span><span style="color:#032F62;">root</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">com.alibaba.druid.pool.DruidDataSource</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">#########  druid连接池配置  #########</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">druid</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 连接池建立时创建的初始化连接数</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">initial-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 连接池中最大的活跃连接数</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">max-active</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 连接池中最小的活跃连接数</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">min-idle</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 连接时最大等待时间，单位毫秒。配置了maxWait之后，缺省启用公平锁，并发效率会有所下降，如果需要可以通过配置useUnfairLock属性为true使用非公平锁。</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">max-wait</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">60000</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 是否缓存preparedStatement，也就是PSCache。PSCache对支持游标的数据库性能提升巨大，比如说oracle。在mysql下建议关闭。</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">pool-prepared-statements</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 指定每个连接上PSCache的大小，要启用PSCache，必须配置大于0，当大于0时，poolPreparedStatements自动触发修改为true。在Druid中，不会存在Oracle下PSCache占用内存过多的问题，可以把这个数值配置大一些，比如说100。</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">max-pool-prepared-statement-per-connection-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">-1</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 用来检测连接是否有效的sql，要求是一个查询语句。如果validationQuery为null，testOnBorrow、testOnReturn、testWhileIdle都不会其作用。（不同数据库不同）</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">validation-query</span><span style="color:#24292E;">: </span><span style="color:#032F62;">SELECT &#39;x&#39;</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 指定连接校验查询的超时时间，单位：秒。</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">validation-query-timeout</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 是否在获得连接后检测其可用性,连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能。</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">test-on-borrow</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 是否在连接放回连接池后检测其可用性，做了这个配置会降低性能。</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">test-on-return</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 是否在连接空闲一段时间后检测其可用性，建议配置为true，不影响性能，并且保证安全性。申请连接的时候检测，如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">test-while-idle</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒。</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">time-between-eviction-runs-millis</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">60000</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 配置一个连接在池中最小生存的时间，单位是毫秒。</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">min-evictable-idle-time-millis</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">300000</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 登陆超时时间，单位是秒。</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">login-timeout</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 查询超时时间，单位是秒。</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">query-timeout</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 事务查询超时时间，单位是秒。</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">transaction-query-timeout</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">60</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 异步关闭连接。</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">async-close-connection-enable</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;"># 属性类型是字符串，通过别名的方式配置扩展插件，常用的插件有：监控统计用的filter:stat，日志用的filter:log4j，防御sql注入的filter:wall</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">filters</span><span style="color:#24292E;">: </span><span style="color:#032F62;">stat</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;">##########  StatViewServlet监控配置  ##########</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">stat-view-servlet</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">login-username</span><span style="color:#24292E;">: </span><span style="color:#032F62;">guoheng</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">login-password</span><span style="color:#24292E;">: </span><span style="color:#032F62;">guoheng</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">allow</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">deny</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">aop</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">auto</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">###################  redis配置  ###################</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">redis</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">host</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">127.0.0.1</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">6379</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">password</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#22863A;">jedis</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#22863A;">pool</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">max-active</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">max-wait</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">-1</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">max-idle</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">min-idle</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#22863A;">time-between-eviction-runs</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">30000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">################### sa-token配置 ###################</span></span>
<span class="line"><span style="color:#22863A;">sa-token</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;"># token名称 (同时也是cookie名称)</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">token-name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">satoken</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;"># token有效期，单位s 默认30天, -1代表永不过期</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">timeout</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">2592000</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;"># token临时有效期 (指定时间内无操作就视为token过期) 单位: 秒</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">activity-timeout</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">3600</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 是否允许同一账号并发登录 (为true时允许一起登录, 为false时新登录挤掉旧登录)</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">is-concurrent</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 在多人登录同一账号时，是否共用一个token (为true时所有登录共用一个token, 为false时每次登录新建一个token)</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">is-share</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;"># token风格</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">token-style</span><span style="color:#24292E;">: </span><span style="color:#032F62;">simple-uuid</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;"># 是否输出操作日志</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">is-log</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">mybatis</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#22863A;">mapper-locations</span><span style="color:#24292E;">: </span><span style="color:#032F62;">classpath*:mapper/*.xml</span></span></code></pre></div><p><code>SaTokenConfigure</code></p><p>两个sa-token的config(使用过滤器的路由鉴权)</p><p>PS:拦截器鉴权N多坑，不传satoken也能访问接口</p><p>特别注意路由一定要有区分性，例如：/user和/user/{id} 这种方式satoken框架认为是同一个路由！！导致路由鉴权将两个权限码合并认证</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> cn.dev33.satoken.context.SaHolder;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> cn.dev33.satoken.filter.SaServletFilter;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> cn.dev33.satoken.router.SaRouter;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> cn.dev33.satoken.stp.StpUtil;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.context.annotation.Bean;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.context.annotation.Configuration;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.web.servlet.config.annotation.WebMvcConfigurer;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> result.Result;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.Arrays;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">* @program: fire</span></span>
<span class="line"><span style="color:#6A737D;">* @description:</span></span>
<span class="line"><span style="color:#6A737D;">* @create: 2021-08-31 12:15</span></span>
<span class="line"><span style="color:#6A737D;">**/</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Configuration</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SaTokenConfigure</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WebMvcConfigurer</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">   /**</span></span>
<span class="line"><span style="color:#6A737D;">    * 注册 [sa-token全局过滤器]</span></span>
<span class="line"><span style="color:#6A737D;">    */</span></span>
<span class="line"><span style="color:#E1E4E8;">   @</span><span style="color:#F97583;">Bean</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> SaServletFilter </span><span style="color:#B392F0;">getSaServletFilter</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SaServletFilter</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">               </span><span style="color:#6A737D;">// 指定 [拦截路由] 与 [放行路由]</span></span>
<span class="line"><span style="color:#E1E4E8;">               .</span><span style="color:#B392F0;">addInclude</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/**&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">addExclude</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">               </span><span style="color:#6A737D;">// 认证函数: 每次请求执行</span></span>
<span class="line"><span style="color:#E1E4E8;">               .</span><span style="color:#B392F0;">setAuth</span><span style="color:#E1E4E8;">(r </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                   System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;---------- sa全局认证&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                   SaRouter.</span><span style="color:#B392F0;">match</span><span style="color:#E1E4E8;">(Arrays.</span><span style="color:#B392F0;">asList</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/**&quot;</span><span style="color:#E1E4E8;">), Arrays.</span><span style="color:#B392F0;">asList</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/login&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/druid/**&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/default/**&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/swagger-ui.html&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/swagger-resources/**&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;swagger/**&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/webjars/**&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/swagger-ui.html/*&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/swagger-resources&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/*.html&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/**/*.html&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/**/*.css&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/**/*.js&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/**/*.svg&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/**/*.ico&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/**/*.png&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/**/*.jpg&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/**/*.xlsx&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/**/*.docx&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/**/*.pdf&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/webSocket/**&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/*/api-docs&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#9ECBFF;">&quot;/v2/api-docs-ext&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                   ), StpUtil</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">checkLogin);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 路由一定要有区分性</span></span>
<span class="line"><span style="color:#E1E4E8;">                   SaRouter.</span><span style="color:#B392F0;">match</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/user&quot;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> StpUtil.</span><span style="color:#B392F0;">checkPermission</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;0001&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">                   SaRouter.</span><span style="color:#B392F0;">match</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/user/get/{id}&quot;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> StpUtil.</span><span style="color:#B392F0;">checkPermission</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;001101&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">               })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">               </span><span style="color:#6A737D;">// 异常处理函数：每次认证函数发生异常时执行此函数</span></span>
<span class="line"><span style="color:#E1E4E8;">               .</span><span style="color:#B392F0;">setError</span><span style="color:#E1E4E8;">(e </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                   </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Result.</span><span style="color:#B392F0;">failure</span><span style="color:#E1E4E8;">(e.</span><span style="color:#B392F0;">getMessage</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">               })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">               </span><span style="color:#6A737D;">// 前置函数：在每次认证函数之前执行</span></span>
<span class="line"><span style="color:#E1E4E8;">               .</span><span style="color:#B392F0;">setBeforeAuth</span><span style="color:#E1E4E8;">(r </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                   </span><span style="color:#6A737D;">// ---------- 设置一些安全响应头 ----------</span></span>
<span class="line"><span style="color:#E1E4E8;">                   SaHolder.</span><span style="color:#B392F0;">getResponse</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#6A737D;">// 服务器名称</span></span>
<span class="line"><span style="color:#E1E4E8;">                           .</span><span style="color:#B392F0;">setServer</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;sa-server&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#6A737D;">// 是否可以在iframe显示视图：DENY=不可以 | SAMEORIGIN=同域下可以 | ALLOW-FROM uri=指定域名下可以</span></span>
<span class="line"><span style="color:#E1E4E8;">                           .</span><span style="color:#B392F0;">setHeader</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;X-Frame-Options&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;SAMEORIGIN&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#6A737D;">// 是否启用浏览器默认XSS防护： 0=禁用 | 1=启用 | 1; mode=block 启用, 并在检查到XSS攻击时，停止渲染页面</span></span>
<span class="line"><span style="color:#E1E4E8;">                           .</span><span style="color:#B392F0;">setHeader</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;X-Frame-Options&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;1; mode=block&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                           </span><span style="color:#6A737D;">// 禁用浏览器内容嗅探</span></span>
<span class="line"><span style="color:#E1E4E8;">                           .</span><span style="color:#B392F0;">setHeader</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;X-Content-Type-Options&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;nosniff&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                   ;</span></span>
<span class="line"><span style="color:#E1E4E8;">               });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> cn.dev33.satoken.context.SaHolder;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> cn.dev33.satoken.filter.SaServletFilter;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> cn.dev33.satoken.router.SaRouter;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> cn.dev33.satoken.stp.StpUtil;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.context.annotation.Bean;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.context.annotation.Configuration;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.web.servlet.config.annotation.WebMvcConfigurer;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> result.Result;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.Arrays;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">* @program: fire</span></span>
<span class="line"><span style="color:#6A737D;">* @description:</span></span>
<span class="line"><span style="color:#6A737D;">* @create: 2021-08-31 12:15</span></span>
<span class="line"><span style="color:#6A737D;">**/</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Configuration</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SaTokenConfigure</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WebMvcConfigurer</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">   /**</span></span>
<span class="line"><span style="color:#6A737D;">    * 注册 [sa-token全局过滤器]</span></span>
<span class="line"><span style="color:#6A737D;">    */</span></span>
<span class="line"><span style="color:#24292E;">   @</span><span style="color:#D73A49;">Bean</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> SaServletFilter </span><span style="color:#6F42C1;">getSaServletFilter</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SaServletFilter</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">               </span><span style="color:#6A737D;">// 指定 [拦截路由] 与 [放行路由]</span></span>
<span class="line"><span style="color:#24292E;">               .</span><span style="color:#6F42C1;">addInclude</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/**&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">addExclude</span><span style="color:#24292E;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">               </span><span style="color:#6A737D;">// 认证函数: 每次请求执行</span></span>
<span class="line"><span style="color:#24292E;">               .</span><span style="color:#6F42C1;">setAuth</span><span style="color:#24292E;">(r </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                   System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;---------- sa全局认证&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                   SaRouter.</span><span style="color:#6F42C1;">match</span><span style="color:#24292E;">(Arrays.</span><span style="color:#6F42C1;">asList</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/**&quot;</span><span style="color:#24292E;">), Arrays.</span><span style="color:#6F42C1;">asList</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/login&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/druid/**&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/default/**&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/swagger-ui.html&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/swagger-resources/**&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;swagger/**&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/webjars/**&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/swagger-ui.html/*&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/swagger-resources&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/*.html&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/**/*.html&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/**/*.css&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/**/*.js&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/**/*.svg&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/**/*.ico&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/**/*.png&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/**/*.jpg&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/**/*.xlsx&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/**/*.docx&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/**/*.pdf&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/webSocket/**&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/*/api-docs&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#032F62;">&quot;/v2/api-docs-ext&quot;</span></span>
<span class="line"><span style="color:#24292E;">                   ), StpUtil</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">checkLogin);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 路由一定要有区分性</span></span>
<span class="line"><span style="color:#24292E;">                   SaRouter.</span><span style="color:#6F42C1;">match</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/user&quot;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> StpUtil.</span><span style="color:#6F42C1;">checkPermission</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;0001&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">                   SaRouter.</span><span style="color:#6F42C1;">match</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/user/get/{id}&quot;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> StpUtil.</span><span style="color:#6F42C1;">checkPermission</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;001101&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">               })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">               </span><span style="color:#6A737D;">// 异常处理函数：每次认证函数发生异常时执行此函数</span></span>
<span class="line"><span style="color:#24292E;">               .</span><span style="color:#6F42C1;">setError</span><span style="color:#24292E;">(e </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                   </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Result.</span><span style="color:#6F42C1;">failure</span><span style="color:#24292E;">(e.</span><span style="color:#6F42C1;">getMessage</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">               })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">               </span><span style="color:#6A737D;">// 前置函数：在每次认证函数之前执行</span></span>
<span class="line"><span style="color:#24292E;">               .</span><span style="color:#6F42C1;">setBeforeAuth</span><span style="color:#24292E;">(r </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                   </span><span style="color:#6A737D;">// ---------- 设置一些安全响应头 ----------</span></span>
<span class="line"><span style="color:#24292E;">                   SaHolder.</span><span style="color:#6F42C1;">getResponse</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#6A737D;">// 服务器名称</span></span>
<span class="line"><span style="color:#24292E;">                           .</span><span style="color:#6F42C1;">setServer</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;sa-server&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#6A737D;">// 是否可以在iframe显示视图：DENY=不可以 | SAMEORIGIN=同域下可以 | ALLOW-FROM uri=指定域名下可以</span></span>
<span class="line"><span style="color:#24292E;">                           .</span><span style="color:#6F42C1;">setHeader</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;X-Frame-Options&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;SAMEORIGIN&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#6A737D;">// 是否启用浏览器默认XSS防护： 0=禁用 | 1=启用 | 1; mode=block 启用, 并在检查到XSS攻击时，停止渲染页面</span></span>
<span class="line"><span style="color:#24292E;">                           .</span><span style="color:#6F42C1;">setHeader</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;X-Frame-Options&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;1; mode=block&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                           </span><span style="color:#6A737D;">// 禁用浏览器内容嗅探</span></span>
<span class="line"><span style="color:#24292E;">                           .</span><span style="color:#6F42C1;">setHeader</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;X-Content-Type-Options&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;nosniff&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                   ;</span></span>
<span class="line"><span style="color:#24292E;">               });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>设置登录用户权限和角色的地方（从权限\\角色表中查询放置），这里只校验了权限，没有校验角色</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> cn.dev33.satoken.stp.StpInterface;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.demo.app.mapper.permission.PermissionMapper;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.demo.app.mapper.permission.RolePermissionMapper;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.demo.app.mapper.role.RoleMapper;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.demo.app.mapper.user.UserMapper;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.demo.app.mapper.user.UserRoleMapper;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> model.entity.sys.RolePermission;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> model.entity.sys.SysPermission;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> model.entity.sys.SysRole;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> model.entity.sys.UserRole;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.stereotype.Component;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.List;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.stream.Collectors;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">* @program: fire</span></span>
<span class="line"><span style="color:#6A737D;">* @description: 用户登录赋予相应权限</span></span>
<span class="line"><span style="color:#6A737D;">* @create: 2021-08-31 13:07</span></span>
<span class="line"><span style="color:#6A737D;">**/</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StpInterfaceImpl</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StpInterface</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">   UserMapper userMapper;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">   UserRoleMapper userRoleMapper;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">   RoleMapper roleMapper;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">   PermissionMapper permissionMapper;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">   RolePermissionMapper rolePermissionMapper;</span></span>
<span class="line"><span style="color:#E1E4E8;">   @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> List&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">getPermissionList</span><span style="color:#E1E4E8;">(Object </span><span style="color:#FFAB70;">userId</span><span style="color:#E1E4E8;">, String </span><span style="color:#FFAB70;">s</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#6A737D;">// 用户存在，查找角色</span></span>
<span class="line"><span style="color:#E1E4E8;">       QueryWrapper&lt;</span><span style="color:#F97583;">UserRole</span><span style="color:#E1E4E8;">&gt; userRoleQueryWrapper </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">       userRoleQueryWrapper.</span><span style="color:#B392F0;">eq</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user_id&quot;</span><span style="color:#E1E4E8;">, userId);</span></span>
<span class="line"><span style="color:#E1E4E8;">       List&lt;</span><span style="color:#F97583;">UserRole</span><span style="color:#E1E4E8;">&gt; userRoles </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> userRoleMapper.</span><span style="color:#B392F0;">selectList</span><span style="color:#E1E4E8;">(userRoleQueryWrapper);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#6A737D;">// 角色查找权限</span></span>
<span class="line"><span style="color:#E1E4E8;">       QueryWrapper&lt;</span><span style="color:#F97583;">RolePermission</span><span style="color:#E1E4E8;">&gt; rolePermissionQueryWrapper </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">       rolePermissionQueryWrapper.</span><span style="color:#B392F0;">in</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;role_id&quot;</span><span style="color:#E1E4E8;">, userRoles.</span><span style="color:#B392F0;">stream</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(UserRole</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">getRoleId).</span><span style="color:#B392F0;">collect</span><span style="color:#E1E4E8;">(Collectors.</span><span style="color:#B392F0;">toList</span><span style="color:#E1E4E8;">()));</span></span>
<span class="line"><span style="color:#E1E4E8;">       List&lt;</span><span style="color:#F97583;">RolePermission</span><span style="color:#E1E4E8;">&gt; rolePermissions </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> rolePermissionMapper.</span><span style="color:#B392F0;">selectList</span><span style="color:#E1E4E8;">(rolePermissionQueryWrapper);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">       QueryWrapper&lt;</span><span style="color:#F97583;">SysPermission</span><span style="color:#E1E4E8;">&gt; permissionQueryWrapper </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">       permissionQueryWrapper.</span><span style="color:#B392F0;">in</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;id&quot;</span><span style="color:#E1E4E8;">, rolePermissions.</span><span style="color:#B392F0;">stream</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(RolePermission</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">getPermissionId).</span><span style="color:#B392F0;">distinct</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">collect</span><span style="color:#E1E4E8;">(Collectors.</span><span style="color:#B392F0;">toList</span><span style="color:#E1E4E8;">()));</span></span>
<span class="line"><span style="color:#E1E4E8;">       List&lt;</span><span style="color:#F97583;">SysPermission</span><span style="color:#E1E4E8;">&gt; sysPermissions </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> permissionMapper.</span><span style="color:#B392F0;">selectList</span><span style="color:#E1E4E8;">(permissionQueryWrapper);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">       List&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; permissions </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sysPermissions.</span><span style="color:#B392F0;">stream</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(SysPermission</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">getCode).</span><span style="color:#B392F0;">distinct</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">collect</span><span style="color:#E1E4E8;">(Collectors.</span><span style="color:#B392F0;">toList</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> permissions;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> List&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">getRoleList</span><span style="color:#E1E4E8;">(Object </span><span style="color:#FFAB70;">userId</span><span style="color:#E1E4E8;">, String </span><span style="color:#FFAB70;">s</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#6A737D;">// 用户存在，查找角色</span></span>
<span class="line"><span style="color:#E1E4E8;">       QueryWrapper&lt;</span><span style="color:#F97583;">UserRole</span><span style="color:#E1E4E8;">&gt; userRoleQueryWrapper </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">       userRoleQueryWrapper.</span><span style="color:#B392F0;">eq</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user_id&quot;</span><span style="color:#E1E4E8;">, userId);</span></span>
<span class="line"><span style="color:#E1E4E8;">       List&lt;</span><span style="color:#F97583;">UserRole</span><span style="color:#E1E4E8;">&gt; userRoles </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> userRoleMapper.</span><span style="color:#B392F0;">selectList</span><span style="color:#E1E4E8;">(userRoleQueryWrapper);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#6A737D;">// 查询角色</span></span>
<span class="line"><span style="color:#E1E4E8;">       QueryWrapper&lt;</span><span style="color:#F97583;">SysRole</span><span style="color:#E1E4E8;">&gt; sysRoleQueryWrapper </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> QueryWrapper&lt;</span><span style="color:#F97583;">SysRole</span><span style="color:#E1E4E8;">&gt;().</span><span style="color:#B392F0;">in</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;id&quot;</span><span style="color:#E1E4E8;">, userRoles.</span><span style="color:#B392F0;">stream</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(UserRole</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">getRoleId).</span><span style="color:#B392F0;">collect</span><span style="color:#E1E4E8;">(Collectors.</span><span style="color:#B392F0;">toList</span><span style="color:#E1E4E8;">()));</span></span>
<span class="line"><span style="color:#E1E4E8;">       List&lt;</span><span style="color:#F97583;">SysRole</span><span style="color:#E1E4E8;">&gt; sysRoles </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> roleMapper.</span><span style="color:#B392F0;">selectList</span><span style="color:#E1E4E8;">(sysRoleQueryWrapper);</span></span>
<span class="line"><span style="color:#E1E4E8;">       List&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; roleNames </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> sysRoles.</span><span style="color:#B392F0;">stream</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(SysRole</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">getRoleName).</span><span style="color:#B392F0;">distinct</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">collect</span><span style="color:#E1E4E8;">(Collectors.</span><span style="color:#B392F0;">toList</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> roleNames;</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> cn.dev33.satoken.stp.StpInterface;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.demo.app.mapper.permission.PermissionMapper;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.demo.app.mapper.permission.RolePermissionMapper;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.demo.app.mapper.role.RoleMapper;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.demo.app.mapper.user.UserMapper;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.demo.app.mapper.user.UserRoleMapper;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> model.entity.sys.RolePermission;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> model.entity.sys.SysPermission;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> model.entity.sys.SysRole;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> model.entity.sys.UserRole;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.beans.factory.annotation.Autowired;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.stereotype.Component;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.List;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.stream.Collectors;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">* @program: fire</span></span>
<span class="line"><span style="color:#6A737D;">* @description: 用户登录赋予相应权限</span></span>
<span class="line"><span style="color:#6A737D;">* @create: 2021-08-31 13:07</span></span>
<span class="line"><span style="color:#6A737D;">**/</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StpInterfaceImpl</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StpInterface</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">   UserMapper userMapper;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">   UserRoleMapper userRoleMapper;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">   RoleMapper roleMapper;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">   PermissionMapper permissionMapper;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">   RolePermissionMapper rolePermissionMapper;</span></span>
<span class="line"><span style="color:#24292E;">   @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> List&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">getPermissionList</span><span style="color:#24292E;">(Object </span><span style="color:#E36209;">userId</span><span style="color:#24292E;">, String </span><span style="color:#E36209;">s</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6A737D;">// 用户存在，查找角色</span></span>
<span class="line"><span style="color:#24292E;">       QueryWrapper&lt;</span><span style="color:#D73A49;">UserRole</span><span style="color:#24292E;">&gt; userRoleQueryWrapper </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">       userRoleQueryWrapper.</span><span style="color:#6F42C1;">eq</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user_id&quot;</span><span style="color:#24292E;">, userId);</span></span>
<span class="line"><span style="color:#24292E;">       List&lt;</span><span style="color:#D73A49;">UserRole</span><span style="color:#24292E;">&gt; userRoles </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> userRoleMapper.</span><span style="color:#6F42C1;">selectList</span><span style="color:#24292E;">(userRoleQueryWrapper);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6A737D;">// 角色查找权限</span></span>
<span class="line"><span style="color:#24292E;">       QueryWrapper&lt;</span><span style="color:#D73A49;">RolePermission</span><span style="color:#24292E;">&gt; rolePermissionQueryWrapper </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">       rolePermissionQueryWrapper.</span><span style="color:#6F42C1;">in</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;role_id&quot;</span><span style="color:#24292E;">, userRoles.</span><span style="color:#6F42C1;">stream</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(UserRole</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">getRoleId).</span><span style="color:#6F42C1;">collect</span><span style="color:#24292E;">(Collectors.</span><span style="color:#6F42C1;">toList</span><span style="color:#24292E;">()));</span></span>
<span class="line"><span style="color:#24292E;">       List&lt;</span><span style="color:#D73A49;">RolePermission</span><span style="color:#24292E;">&gt; rolePermissions </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> rolePermissionMapper.</span><span style="color:#6F42C1;">selectList</span><span style="color:#24292E;">(rolePermissionQueryWrapper);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">       QueryWrapper&lt;</span><span style="color:#D73A49;">SysPermission</span><span style="color:#24292E;">&gt; permissionQueryWrapper </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">       permissionQueryWrapper.</span><span style="color:#6F42C1;">in</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;id&quot;</span><span style="color:#24292E;">, rolePermissions.</span><span style="color:#6F42C1;">stream</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(RolePermission</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">getPermissionId).</span><span style="color:#6F42C1;">distinct</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">collect</span><span style="color:#24292E;">(Collectors.</span><span style="color:#6F42C1;">toList</span><span style="color:#24292E;">()));</span></span>
<span class="line"><span style="color:#24292E;">       List&lt;</span><span style="color:#D73A49;">SysPermission</span><span style="color:#24292E;">&gt; sysPermissions </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> permissionMapper.</span><span style="color:#6F42C1;">selectList</span><span style="color:#24292E;">(permissionQueryWrapper);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">       List&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; permissions </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sysPermissions.</span><span style="color:#6F42C1;">stream</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(SysPermission</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">getCode).</span><span style="color:#6F42C1;">distinct</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">collect</span><span style="color:#24292E;">(Collectors.</span><span style="color:#6F42C1;">toList</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> permissions;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> List&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">getRoleList</span><span style="color:#24292E;">(Object </span><span style="color:#E36209;">userId</span><span style="color:#24292E;">, String </span><span style="color:#E36209;">s</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6A737D;">// 用户存在，查找角色</span></span>
<span class="line"><span style="color:#24292E;">       QueryWrapper&lt;</span><span style="color:#D73A49;">UserRole</span><span style="color:#24292E;">&gt; userRoleQueryWrapper </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">       userRoleQueryWrapper.</span><span style="color:#6F42C1;">eq</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user_id&quot;</span><span style="color:#24292E;">, userId);</span></span>
<span class="line"><span style="color:#24292E;">       List&lt;</span><span style="color:#D73A49;">UserRole</span><span style="color:#24292E;">&gt; userRoles </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> userRoleMapper.</span><span style="color:#6F42C1;">selectList</span><span style="color:#24292E;">(userRoleQueryWrapper);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6A737D;">// 查询角色</span></span>
<span class="line"><span style="color:#24292E;">       QueryWrapper&lt;</span><span style="color:#D73A49;">SysRole</span><span style="color:#24292E;">&gt; sysRoleQueryWrapper </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> QueryWrapper&lt;</span><span style="color:#D73A49;">SysRole</span><span style="color:#24292E;">&gt;().</span><span style="color:#6F42C1;">in</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;id&quot;</span><span style="color:#24292E;">, userRoles.</span><span style="color:#6F42C1;">stream</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(UserRole</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">getRoleId).</span><span style="color:#6F42C1;">collect</span><span style="color:#24292E;">(Collectors.</span><span style="color:#6F42C1;">toList</span><span style="color:#24292E;">()));</span></span>
<span class="line"><span style="color:#24292E;">       List&lt;</span><span style="color:#D73A49;">SysRole</span><span style="color:#24292E;">&gt; sysRoles </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> roleMapper.</span><span style="color:#6F42C1;">selectList</span><span style="color:#24292E;">(sysRoleQueryWrapper);</span></span>
<span class="line"><span style="color:#24292E;">       List&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; roleNames </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> sysRoles.</span><span style="color:#6F42C1;">stream</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(SysRole</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">getRoleName).</span><span style="color:#6F42C1;">distinct</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">collect</span><span style="color:#24292E;">(Collectors.</span><span style="color:#6F42C1;">toList</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> roleNames;</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>WebMvcConfig</code></p><p>配置文件冲突的问题，之前在webMvc里面配置的有静态文件读取和跨域等，与satoken的配置起了冲突，修改自己的配置文件</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.beans.factory.annotation.Value;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.context.annotation.Configuration;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.web.servlet.config.annotation.CorsRegistry;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.web.servlet.config.annotation.WebMvcConfigurer;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">* 类功能描述: CorsConfig</span></span>
<span class="line"><span style="color:#6A737D;">*</span></span>
<span class="line"><span style="color:#6A737D;">* </span><span style="color:#F97583;">@author</span><span style="color:#6A737D;"> Eternal</span></span>
<span class="line"><span style="color:#6A737D;">* @date 2019-11-26 15:11</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Configuration</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WebMvcConfig</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WebMvcConfigurer</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   @</span><span style="color:#F97583;">Value</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;\${spring.servlet.multipart.location}&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String uploadFileUrl;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">   /**</span></span>
<span class="line"><span style="color:#6A737D;">    * 跨域配置</span></span>
<span class="line"><span style="color:#6A737D;">    *</span></span>
<span class="line"><span style="color:#6A737D;">    * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">registry</span></span>
<span class="line"><span style="color:#6A737D;">    */</span></span>
<span class="line"><span style="color:#E1E4E8;">   @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">addCorsMappings</span><span style="color:#E1E4E8;">(CorsRegistry </span><span style="color:#FFAB70;">registry</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">       registry.</span><span style="color:#B392F0;">addMapping</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/**&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">               .</span><span style="color:#B392F0;">allowedOrigins</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;*&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">               .</span><span style="color:#B392F0;">allowedMethods</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;POST&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;GET&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;PUT&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;DELETE&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;OPTIONS&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">               .</span><span style="color:#B392F0;">maxAge</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3600</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">               </span><span style="color:#6A737D;">// 是否允许发送Cookie</span></span>
<span class="line"><span style="color:#E1E4E8;">               .</span><span style="color:#B392F0;">allowCredentials</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">               .</span><span style="color:#B392F0;">allowedHeaders</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;*&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">addResourceHandlers</span><span style="color:#E1E4E8;">(ResourceHandlerRegistry </span><span style="color:#FFAB70;">registry</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#6A737D;">// 静态文件</span></span>
<span class="line"><span style="color:#E1E4E8;">       registry.</span><span style="color:#B392F0;">addResourceHandler</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/**&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">addResourceLocations</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;classpath:/static/&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#6A737D;">// swagger</span></span>
<span class="line"><span style="color:#E1E4E8;">       registry.</span><span style="color:#B392F0;">addResourceHandler</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;swagger-ui.html&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">addResourceLocations</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;classpath:/META-INF/resources/&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">       registry.</span><span style="color:#B392F0;">addResourceHandler</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/webjars/**&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">addResourceLocations</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;classpath:/META-INF/resources/webjars/&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#6A737D;">// 上传文件</span></span>
<span class="line"><span style="color:#E1E4E8;">       registry.</span><span style="color:#B392F0;">addResourceHandler</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;/file/**&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">addResourceLocations</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;file:/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> uploadFileUrl);</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.beans.factory.annotation.Value;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.context.annotation.Configuration;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.web.servlet.config.annotation.CorsRegistry;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.web.servlet.config.annotation.WebMvcConfigurer;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">* 类功能描述: CorsConfig</span></span>
<span class="line"><span style="color:#6A737D;">*</span></span>
<span class="line"><span style="color:#6A737D;">* </span><span style="color:#D73A49;">@author</span><span style="color:#6A737D;"> Eternal</span></span>
<span class="line"><span style="color:#6A737D;">* @date 2019-11-26 15:11</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Configuration</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WebMvcConfig</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WebMvcConfigurer</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   @</span><span style="color:#D73A49;">Value</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;\${spring.servlet.multipart.location}&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String uploadFileUrl;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">   /**</span></span>
<span class="line"><span style="color:#6A737D;">    * 跨域配置</span></span>
<span class="line"><span style="color:#6A737D;">    *</span></span>
<span class="line"><span style="color:#6A737D;">    * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">registry</span></span>
<span class="line"><span style="color:#6A737D;">    */</span></span>
<span class="line"><span style="color:#24292E;">   @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">addCorsMappings</span><span style="color:#24292E;">(CorsRegistry </span><span style="color:#E36209;">registry</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">       registry.</span><span style="color:#6F42C1;">addMapping</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/**&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">               .</span><span style="color:#6F42C1;">allowedOrigins</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;*&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">               .</span><span style="color:#6F42C1;">allowedMethods</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;POST&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;GET&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;PUT&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;DELETE&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;OPTIONS&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">               .</span><span style="color:#6F42C1;">maxAge</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3600</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">               </span><span style="color:#6A737D;">// 是否允许发送Cookie</span></span>
<span class="line"><span style="color:#24292E;">               .</span><span style="color:#6F42C1;">allowCredentials</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">               .</span><span style="color:#6F42C1;">allowedHeaders</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;*&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">addResourceHandlers</span><span style="color:#24292E;">(ResourceHandlerRegistry </span><span style="color:#E36209;">registry</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6A737D;">// 静态文件</span></span>
<span class="line"><span style="color:#24292E;">       registry.</span><span style="color:#6F42C1;">addResourceHandler</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/**&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">addResourceLocations</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;classpath:/static/&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6A737D;">// swagger</span></span>
<span class="line"><span style="color:#24292E;">       registry.</span><span style="color:#6F42C1;">addResourceHandler</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;swagger-ui.html&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">addResourceLocations</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;classpath:/META-INF/resources/&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">       registry.</span><span style="color:#6F42C1;">addResourceHandler</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/webjars/**&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">addResourceLocations</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;classpath:/META-INF/resources/webjars/&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6A737D;">// 上传文件</span></span>
<span class="line"><span style="color:#24292E;">       registry.</span><span style="color:#6F42C1;">addResourceHandler</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;/file/**&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">addResourceLocations</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;file:/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> uploadFileUrl);</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></blockquote><h4 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h4><h2 id="springcloud-集成sa-token" tabindex="-1">SpringCloud 集成sa-token <a class="header-anchor" href="#springcloud-集成sa-token" aria-label="Permalink to &quot;SpringCloud 集成sa-token&quot;">​</a></h2>`,11),t=[e];function r(c,E,y,i,u,F){return n(),a("div",null,t)}const A=s(o,[["render",r]]);export{g as __pageData,A as default};
