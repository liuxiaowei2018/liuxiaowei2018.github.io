import{_ as t,o as a,c as e,Q as r}from"./chunks/framework.8048b864.js";const o="/assets/image-20231019112218692.2d95959a.png",l="/assets/image-20231019112424452.be4d5f8d.png",f=JSON.parse('{"title":"数据结构入门","description":"","frontmatter":{},"headers":[],"relativePath":"alg/structure/index.md","filePath":"alg/structure/index.md","lastUpdated":1697785485000}'),s={name:"alg/structure/index.md"},n=r('<h1 id="数据结构入门" tabindex="-1">数据结构入门 <a class="header-anchor" href="#数据结构入门" aria-label="Permalink to &quot;数据结构入门&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#数据结构分类">数据结构分类</a><ul><li><a href="#逻辑结构-线性与非线性">逻辑结构：线性与非线性</a></li><li><a href="#物理结构-连续与分散">物理结构：连续与分散</a></li></ul></li></ul></nav><h2 id="数据结构分类" tabindex="-1">数据结构分类 <a class="header-anchor" href="#数据结构分类" aria-label="Permalink to &quot;数据结构分类&quot;">​</a></h2><p>常见的数据结构包括数组、链表、栈、队列、哈希表、树、堆、图，它们可以从“逻辑结构”和“物理结构”两个维度进行分类。</p><h3 id="逻辑结构-线性与非线性" tabindex="-1">逻辑结构：线性与非线性 <a class="header-anchor" href="#逻辑结构-线性与非线性" aria-label="Permalink to &quot;逻辑结构：线性与非线性&quot;">​</a></h3><p>逻辑结构可被分为“线性”和“非线性”两大类。线性结构比较直观，指数据在逻辑关系上呈线性排列；非线性结构则相反，呈非线性排列。</p><ul><li><strong>线性数据结构</strong>：数组、链表、栈、队列、哈希表。</li><li><strong>非线性数据结构</strong>：树、堆、图、哈希表。</li></ul><p><img src="'+o+'" alt="image-20231019112218692"></p><p>非线性数据结构可以进一步被划分为树形结构和网状结构。</p><ul><li><strong>树形结构</strong>：树、堆、哈希表，元素之间是一对多的关系。</li><li><strong>网状结构</strong>：图，元素之间是多对多的关系。</li></ul><h3 id="物理结构-连续与分散" tabindex="-1">物理结构：连续与分散 <a class="header-anchor" href="#物理结构-连续与分散" aria-label="Permalink to &quot;物理结构：连续与分散&quot;">​</a></h3><p><strong>在算法运行过程中，相关数据都存储在内存中</strong>。</p><p><strong>系统通过内存地址来访问目标位置的数据</strong>。如图所示，计算机根据特定规则为表格中的每个单元格分配编号，确保每个内存空间都有唯一的内存地址。有了这些地址，程序便可以访问内存中的数据。</p><p><img src="'+l+'" alt="image-20231019112424452"></p><p><strong>所有数据结构都是基于数组、链表或二者的组合实现的</strong>。例如，栈和队列既可以使用数组实现，也可以使用链表实现；而哈希表的实现可能同时包含数组和链表。</p><ul><li><strong>基于数组可实现</strong>：栈、队列、哈希表、树、堆、图、矩阵、张量（维度 (\\geq 3) 的数组）等。</li><li><strong>基于链表可实现</strong>：栈、队列、哈希表、树、堆、图等。</li></ul><p>基于数组实现的数据结构也被称为“静态数据结构”，这意味着此类数据结构在初始化后长度不可变。</p><p>相对应地，基于链表实现的数据结构被称为“动态数据结构”，这类数据结构在初始化后，仍可以在程序运行过程中对其长度进行调整。</p><blockquote><p>参考文档：<a href="https://www.hello-algo.com/chapter_data_structure/" target="_blank" rel="noreferrer">https://www.hello-algo.com/chapter_data_structure/</a></p></blockquote>',19),i=[n];function c(p,d,h,_,u,g){return a(),e("div",null,i)}const b=t(s,[["render",c]]);export{f as __pageData,b as default};
