import{_ as e,o as t,c as a,Q as r}from"./chunks/framework.8048b864.js";const o="/assets/image-20220314095319072.746e3ac4.png",s="/assets/image-20220314095353213.031e6764.png",l="/assets/image-20220314095415068.afa17c91.png",p="/assets/image-20220314095437724.b43d85a9.png",i="/assets/image-20220314095459036.75a8c238.png",c="/assets/image-20220314095627869.097feae9.png",n="/assets/image-20220314095644316.8bd3e137.png",h="/assets/image-20220314095751467.e5d0b092.png",T=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"zeleted/test/ApacheJMeter.md","filePath":"zeleted/test/ApacheJMeter.md","lastUpdated":1697176108000}'),m={name:"zeleted/test/ApacheJMeter.md"},_=r('<h2 id="apache-jmeter" tabindex="-1">Apache JMeter <a class="header-anchor" href="#apache-jmeter" aria-label="Permalink to &quot;Apache JMeter&quot;">​</a></h2><nav class="table-of-contents"><ul><li><a href="#apache-jmeter">Apache JMeter</a><ul><li><a href="#jmeter使用指南">JMeter使用指南</a></li></ul></li></ul></nav><blockquote><p>下载地址：<a href="http://jmeter.apache.org/download_jmeter.cg" target="_blank" rel="noreferrer">http://jmeter.apache.org/download_jmeter.cg</a></p><p>官方文档：<a href="https://jmeter.apache.org/usermanual/get-started.html" target="_blank" rel="noreferrer">https://jmeter.apache.org/usermanual/get-started.html</a></p><p>参考链接: <a href="https://blog.csdn.net/pengjiangchun/article/details/105707405?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522163600260516780261960697%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&amp;request_id=163600260516780261960697&amp;biz_id=0&amp;utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-105707405.first_rank_v2_pc_rank_v29&amp;utm_term=jmeter%E6%8E%A5%E5%8F%A3%E6%B5%8B%E8%AF%95%E6%95%99%E7%A8%8B&amp;spm=1018.2226.3001.4187" target="_blank" rel="noreferrer">https://blog.csdn.net/pengjiangchun/article/details/105707405?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522163600260516780261960697%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&amp;request_id=163600260516780261960697&amp;biz_id=0&amp;utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-105707405.first_rank_v2_pc_rank_v29&amp;utm_term=jmeter接口测试教程&amp;spm=1018.2226.3001.4187</a></p></blockquote><h3 id="jmeter使用指南" tabindex="-1">JMeter使用指南 <a class="header-anchor" href="#jmeter使用指南" aria-label="Permalink to &quot;JMeter使用指南&quot;">​</a></h3><h4 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h4><h5 id="http请求模拟" tabindex="-1">Http请求模拟 <a class="header-anchor" href="#http请求模拟" aria-label="Permalink to &quot;Http请求模拟&quot;">​</a></h5><h6 id="_1、新建线程组" tabindex="-1">1、新建线程组 <a class="header-anchor" href="#_1、新建线程组" aria-label="Permalink to &quot;1、新建线程组&quot;">​</a></h6><blockquote><p>操作：<strong>鼠标右键测试计划 -&gt; 添加 -&gt; Threads(Users) -&gt; 线程组 -&gt; 修改测试计划名称</strong></p><p><img src="'+o+'" alt="image-20220314095319072"></p></blockquote><h6 id="_2、添加取样器http请求" tabindex="-1">2、添加取样器HTTP请求 <a class="header-anchor" href="#_2、添加取样器http请求" aria-label="Permalink to &quot;2、添加取样器HTTP请求&quot;">​</a></h6><blockquote><p>操作：<strong>鼠标右键线程组 -&gt; 添加 -&gt; Sampler -&gt; HTTP请求 -&gt; 填写请求参数</strong></p><p><img src="'+s+'" alt="image-20220314095353213"></p></blockquote><h6 id="_3、开始http请求" tabindex="-1">3、开始Http请求 <a class="header-anchor" href="#_3、开始http请求" aria-label="Permalink to &quot;3、开始Http请求&quot;">​</a></h6><p>a. 添加<strong>察看结果树</strong> 监听器，方便查看请求结果</p><blockquote><p>操作：鼠标右键线程组 -&gt; 添加 -&gt; 监听器 -&gt; 察看结果树</p><p><img src="'+l+'" alt="image-20220314095415068"></p></blockquote><p>b. 点击<strong>工具栏上单击启动按钮（绿色箭头）</strong> 启动测试计划</p><blockquote><p><img src="'+p+'" alt="image-20220314095437724"></p><p>PS：响应数据默认显示格式为Text，可切换为JSON Path Tester格式</p><p><img src="'+i+'" alt="image-20220314095459036"></p></blockquote><h5 id="响应参数获取" tabindex="-1">响应参数获取 <a class="header-anchor" href="#响应参数获取" aria-label="Permalink to &quot;响应参数获取&quot;">​</a></h5><blockquote><p><strong>将上一个接口的返回值作为下一个接口的请求参数</strong></p></blockquote><h6 id="_1、添加后置处理器json-extractor" tabindex="-1">1、添加后置处理器JSON Extractor <a class="header-anchor" href="#_1、添加后置处理器json-extractor" aria-label="Permalink to &quot;1、添加后置处理器JSON Extractor&quot;">​</a></h6><blockquote><p>操作：<strong>将鼠标放置“获取即将上映电影”的HTTP请求上，并按右键 -&gt; 添加 -&gt; 后置处理器 -&gt; JSON Extractor -&gt; 填入变量名等信息</strong></p><p><img src="'+c+'" alt="image-20220314095627869"></p></blockquote><h6 id="_2、添加取样器http请求获取电影条目信息及参数使用" tabindex="-1">2、添加取样器HTTP请求获取电影条目信息及参数使用 <a class="header-anchor" href="#_2、添加取样器http请求获取电影条目信息及参数使用" aria-label="Permalink to &quot;2、添加取样器HTTP请求获取电影条目信息及参数使用&quot;">​</a></h6><blockquote><p><img src="'+n+'" alt="image-20220314095644316"></p></blockquote><h6 id="_3、启动测试计划" tabindex="-1">3、启动测试计划 <a class="header-anchor" href="#_3、启动测试计划" aria-label="Permalink to &quot;3、启动测试计划&quot;">​</a></h6><blockquote><p>PS：如果需要<strong>多变量取值</strong> 的话，可在JSON Extractor的配置中通过分号(;)将多个变量名分开。</p><p>多个变量名的话，还需要填写<strong>Default Vaules</strong> ，不然启动测试计划后会找不到变量，导致请求失败</p><p><img src="'+h+'" alt="image-20220314095751467"></p></blockquote><h4 id="阶梯式压测" tabindex="-1">阶梯式压测 <a class="header-anchor" href="#阶梯式压测" aria-label="Permalink to &quot;阶梯式压测&quot;">​</a></h4><blockquote><p>...</p></blockquote>',25),g=[_];function d(u,b,q,k,f,P){return t(),a("div",null,g)}const j=e(m,[["render",d]]);export{T as __pageData,j as default};
