import{_ as a,c as e,o as t,N as o}from"./chunks/framework.0799945b.js";const l="/assets/image-20220407132500900.d850769f.png",m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"design/日志系统架构设计.md"}'),i={name:"design/日志系统架构设计.md"},r=o('<h2 id="日志系统架构设计" tabindex="-1">日志系统架构设计 <a class="header-anchor" href="#日志系统架构设计" aria-label="Permalink to &quot;日志系统架构设计&quot;">​</a></h2><h3 id="审计日志组件" tabindex="-1">审计日志组件 <a class="header-anchor" href="#审计日志组件" aria-label="Permalink to &quot;审计日志组件&quot;">​</a></h3><h4 id="需求" tabindex="-1">需求 <a class="header-anchor" href="#需求" aria-label="Permalink to &quot;需求&quot;">​</a></h4><blockquote><p>所有系统都会有日志，但我们区分了 <strong>系统日志</strong> 和 <strong>操作日志</strong></p><ul><li>系统日志：主要用于开发者调试排查系统问题的，不要求固定格式和可读性</li><li>操作日志：主要面向用户的，要求简单易懂，反映出用户所做的动作。</li></ul><p>通过操作日志可追溯到 某人在某时干了某事情，如：</p><p><img src="'+l+'" alt="image-20220407132500900"></p></blockquote><h4 id="功能" tabindex="-1">功能 <a class="header-anchor" href="#功能" aria-label="Permalink to &quot;功能&quot;">​</a></h4><blockquote><ol><li>基于SpringBoot能够快速接入</li><li>对业务代码具有低入侵性</li></ol><p>自定义 spring-boot-starter-log</p><p>具备以下功能：</p><ul><li>自定义spring boot starter</li><li>定义日志注解</li><li>AOP拦截日志注解方法</li><li>定义日志动态内容模板</li></ul><p>模板中又需要实现：</p><ul><li>动态模板表达式解析：用强大的SpEL来解析表达式</li><li>自定义函数：支持目标方法前置/后置的自定义函数</li></ul></blockquote><h3 id="elk日志系统" tabindex="-1">ELK日志系统 <a class="header-anchor" href="#elk日志系统" aria-label="Permalink to &quot;ELK日志系统&quot;">​</a></h3><h3 id="生产日志可视化" tabindex="-1">生产日志可视化 <a class="header-anchor" href="#生产日志可视化" aria-label="Permalink to &quot;生产日志可视化&quot;">​</a></h3>',8),s=[r];function n(c,_,h,d,p,u){return t(),e("div",null,s)}const q=a(i,[["render",n]]);export{m as __pageData,q as default};
