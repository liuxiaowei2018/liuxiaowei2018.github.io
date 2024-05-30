import{_ as e,o,c as r,Q as a}from"./chunks/framework.8048b864.js";const w=JSON.parse('{"title":"PowerJob","description":"","frontmatter":{},"headers":[],"relativePath":"中间件/开源中间件/分布式任务/powerJob.md","filePath":"中间件/开源中间件/分布式任务/powerJob.md","lastUpdated":null}'),t={name:"中间件/开源中间件/分布式任务/powerJob.md"},l=a('<h1 id="powerjob" tabindex="-1">PowerJob <a class="header-anchor" href="#powerjob" aria-label="Permalink to &quot;PowerJob&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#_1、powerjob扩展">1、PowerJob扩展</a><ul><li><a href="#整体架构">整体架构</a></li></ul></li></ul></nav><blockquote><p>PowerJob是新一代分布式任务调度与计算框架，支持CRON、API、固定频率、固定延迟等调度策略，提供工作流来编排任务解决依赖关系，能让您轻松完成作业的调度与繁杂任务的分布式计算。</p></blockquote><h2 id="_1、powerjob扩展" tabindex="-1">1、PowerJob扩展 <a class="header-anchor" href="#_1、powerjob扩展" aria-label="Permalink to &quot;1、PowerJob扩展&quot;">​</a></h2><h3 id="整体架构" tabindex="-1">整体架构 <a class="header-anchor" href="#整体架构" aria-label="Permalink to &quot;整体架构&quot;">​</a></h3><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405301648420.png" alt="image-20230504155003405"></p><blockquote><p>PowerJob由调度服务器（powerjob-server）和执行器(powerjob-worker)两部分组成，powerjob-server负责提供Web服务和完成任务的调度，powerjob-worker则负责执行用户所编写的任务代码，同时提供分布式计算能力。</p></blockquote>',7),i=[l];function s(n,p,b,c,_,d){return o(),r("div",null,i)}const u=e(t,[["render",s]]);export{w as __pageData,u as default};
