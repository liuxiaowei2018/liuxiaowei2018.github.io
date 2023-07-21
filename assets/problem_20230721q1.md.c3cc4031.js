import{_ as a,c as e,o as t,N as o}from"./chunks/framework.0799945b.js";const s="/assets/image-20230721171634888.7d56a1ce.png",i="/assets/image-20230721173900736.ef0e2638.png",p="/assets/image-20230721172159999.2a965dad.png",r="/assets/image-20230721172247250.1caaaee5.png",m="/assets/image-20230721172442785.02548eb3.png",l="/assets/image-20230721172610335.4e0f856a.png",c="/assets/image-20230721172732275.1234f1ec.png",n="/assets/image-20230721172746177.f5382276.png",g="/assets/image-20230721173029986.fa034ab2.png",_="/assets/image-20230721173329345.9e5e08af.png",d="/assets/image-20230721174144645.e07c8b54.png",u="/assets/image-20230721174157701.21b795bf.png",b="/assets/image-20230721174400683.0b117bf5.png",h="/assets/image-20230721174555334.48a48b4b.png",D=JSON.parse('{"title":"生产问题排查&复盘","description":"","frontmatter":{},"headers":[],"relativePath":"problem/20230721q1.md"}'),q={name:"problem/20230721q1.md"},f=o('<h1 id="生产问题排查-复盘" tabindex="-1">生产问题排查&amp;复盘 <a class="header-anchor" href="#生产问题排查-复盘" aria-label="Permalink to &quot;生产问题排查&amp;复盘&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#k8s容器jvm发生oom">K8S容器JVM发生OOM</a><ul><li><a href="#问题描述">问题描述</a></li><li><a href="#问题定位">问题定位</a></li><li><a href="#解决方案">解决方案</a></li></ul></li></ul></nav><h2 id="k8s容器jvm发生oom" tabindex="-1">K8S容器JVM发生OOM <a class="header-anchor" href="#k8s容器jvm发生oom" aria-label="Permalink to &quot;K8S容器JVM发生OOM&quot;">​</a></h2><ul><li>[20230721] 伟酱</li></ul><h3 id="问题描述" tabindex="-1">问题描述 <a class="header-anchor" href="#问题描述" aria-label="Permalink to &quot;问题描述&quot;">​</a></h3><p><img src="'+s+'" alt="image-20230721171634888"></p><blockquote><p>容器stable/mdm-territory-svc-latest-56db9dbbb9-n8sw7 发生OMM 自动重启</p></blockquote><h3 id="问题定位" tabindex="-1">问题定位 <a class="header-anchor" href="#问题定位" aria-label="Permalink to &quot;问题定位&quot;">​</a></h3><ol><li><p>pod中java服务 territory-svc JVM参数如下：</p><p><img src="'+i+'" alt="image-20230721173900736"></p></li><li><p>已配置-XX:+HeapDumpOnOutOfMemoryError，当发生内存溢出时，会自动dump文件。</p></li><li><p>运维工具将dump文件推送至OSS</p></li><li><p>OK! 那我们直接把DUMP文件下载下来，分析一下！</p></li></ol><p><img src="'+p+'" alt="image-20230721172159999"></p><p><code>将DUMP文件导入MAT进行分析</code></p><p><img src="'+r+'" alt="image-20230721172247250"></p><blockquote><p>到这里能大概猜测到是在操作数据库的时候数据量太大导致堆内存溢出</p></blockquote><p><code>通过Histogram定位大内存对象</code></p><p><img src="'+m+'" alt="image-20230721172442785"></p><blockquote><p>这里发现了一个我们业务中定义的对象 com.softium.territory.tery.po.TerritoryDepartmentPO</p></blockquote><p><code>通过tread_overview定位线程</code></p><p><img src="'+l+'" alt="image-20230721172610335"></p><p><img src="'+c+'" alt="image-20230721172732275"></p><p><img src="'+n+'" alt="image-20230721172746177"></p><blockquote><p>查看线程堆栈 这里我们可以通过搜索 业务代码中的包名 来定位业务代码</p></blockquote><p><img src="'+g+'" alt="image-20230721173029986"></p><blockquote><p>到这里我们定位到出现问题的代码了 我们看一下这段代码</p></blockquote><p><img src="'+_+'" alt="image-20230721173329345"></p><blockquote><p>显然，这里查询数据库时遇到极端条件，导致大量数据查询甚至全表查询，方法内返回的 List TerritoryDepartmentPO对象很大</p></blockquote><h3 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h3><h4 id="代码优化" tabindex="-1">代码优化 <a class="header-anchor" href="#代码优化" aria-label="Permalink to &quot;代码优化&quot;">​</a></h4><p><img src="'+d+'" alt="image-20230721174144645"></p><p><img src="'+u+'" alt="image-20230721174157701"></p><p><img src="'+b+'" alt="image-20230721174400683"></p><p><img src="'+h+'" alt="image-20230721174555334"></p><blockquote><p>1.这里返回参数需要的只有 productIds ，显然没有必要去查表的所有字段</p><p>2.jvm内存去重 改为数据库去重 ，把压力传递给数据库</p><p>3.查询命中了数据库索引了，虽然这次的问题瓶颈不在数据库，这里我们只返回product_id字段后 使用了 索引下推 ，顺便给数据库做了一波优化</p></blockquote><h4 id="jvm优化" tabindex="-1">JVM优化 <a class="header-anchor" href="#jvm优化" aria-label="Permalink to &quot;JVM优化&quot;">​</a></h4><p>考虑是否要重新合理分配一下 该POD JVM 堆内存</p><blockquote><p>-Xms2048m -Xmx4096m</p></blockquote><p><code>解决问题！</code></p>',36),k=[f];function M(O,v,P,x,S,V){return t(),e("div",null,k)}const J=a(q,[["render",M]]);export{D as __pageData,J as default};
