import{_ as e,o as a,c as i,Q as t}from"./chunks/framework.8048b864.js";const _=JSON.parse('{"title":"生产问题记录","description":"","frontmatter":{},"headers":[],"relativePath":"生产问题记录/20230621q1.md","filePath":"生产问题记录/20230621q1.md","lastUpdated":null}'),p={name:"生产问题记录/20230621q1.md"},o=t('<h1 id="生产问题记录" tabindex="-1">生产问题记录 <a class="header-anchor" href="#生产问题记录" aria-label="Permalink to &quot;生产问题记录&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#_1、线上-pod-反复重启">1、线上 pod 反复重启</a><ul><li><a href="#_1-1、问题描述">1.1、问题描述</a></li><li><a href="#_1-2、问题定位">1.2、问题定位</a></li><li><a href="#_1-3、解决方案">1.3、解决方案</a></li></ul></li></ul></nav><h2 id="_1、线上-pod-反复重启" tabindex="-1">1、线上 pod 反复重启 <a class="header-anchor" href="#_1、线上-pod-反复重启" aria-label="Permalink to &quot;1、线上 pod 反复重启&quot;">​</a></h2><ul><li>[20230621] 伟酱</li></ul><h3 id="_1-1、问题描述" tabindex="-1">1.1、问题描述 <a class="header-anchor" href="#_1-1、问题描述" aria-label="Permalink to &quot;1.1、问题描述&quot;">​</a></h3><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405292208199.png" alt="image-20230621135148765"></p><blockquote><p>1.k8s pod mdm-institution-svc-latest-7ff8854b7b-5j4s2 从凌晨开始 反复 重启</p></blockquote><h3 id="_1-2、问题定位" tabindex="-1">1.2、问题定位 <a class="header-anchor" href="#_1-2、问题定位" aria-label="Permalink to &quot;1.2、问题定位&quot;">​</a></h3><p>1.通过告警查看 grafa 监控 查看服务 JVM</p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405292209741.png" alt="image-20230621142524374"></p><p><code>服务占用pod内存几乎打满</code></p><p>2.定位慢接口或接口请求</p><p>通过skyingwalking 发现 /departmentTrading/list 这个接口的请求相对较多</p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405292209527.png" alt="image-20230621142055398"></p><p>但接口响应是正常的</p><p>3.进入pod查看 jvm配置和 pod内存</p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405292209055.png" alt="image-20230621143048422"></p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405292209023.png" alt="image-20230621143256352"></p><p>分析一波GC 感觉也没什么问题</p><p>这样一看 似乎不是 jvm本身的问题，问题指向到运维K8s POD那边</p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405292209327.png" alt="image-20230621143538652"></p><p>CICD上看了一下这个服务的JVM配置</p><p><code>最小和最大堆内存 设置为 8G</code></p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405292209541.png" alt="image-20230621143948800"></p><p><code>JVM堆内存分配多了！</code></p><p><code>当jvm服务JVM内存+堆外内存 超过 POD内存 limit ，POD直接 kill 了</code></p><h3 id="_1-3、解决方案" tabindex="-1">1.3、解决方案 <a class="header-anchor" href="#_1-3、解决方案" aria-label="Permalink to &quot;1.3、解决方案&quot;">​</a></h3><p>最后重新合理分配一下 JVM 堆内存</p><blockquote><p>-Xms6144m -Xmx6144m</p></blockquote><p>重新滚动一下服务</p><p><img src="https://cdn.jsdelivr.net/gh/liuxiaowei2018/image/repo/202405292209806.png" alt="image-20230621144531728"></p><p>监控正常 服务也没有再发生告警！</p><p><code>解决问题！</code></p><blockquote><p>堆外内存 是如何被使用的？[待续...]</p></blockquote>',34),l=[o];function r(d,n,s,c,h,m){return a(),i("div",null,l)}const u=e(p,[["render",r]]);export{_ as __pageData,u as default};
