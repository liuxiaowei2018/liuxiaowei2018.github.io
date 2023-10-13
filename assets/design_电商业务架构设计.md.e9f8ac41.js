import{_ as a,o as e,c as t,Q as o}from"./chunks/framework.8048b864.js";const s="/assets/image-20220424214111566.7c9437f6.png",r="/assets/image-20220420131410875.a98d16ef.png",n="/assets/image-20220420132506808.ee9c3723.png",i="/assets/image-20220420131449543.4262bc1e.png",l="/assets/image-20220420132354168.76a0dce1.png",k=JSON.parse('{"title":"架构设计","description":"","frontmatter":{},"headers":[],"relativePath":"design/电商业务架构设计.md","filePath":"design/电商业务架构设计.md","lastUpdated":1684476376000}'),c={name:"design/电商业务架构设计.md"},p=o('<h1 id="架构设计" tabindex="-1">架构设计 <a class="header-anchor" href="#架构设计" aria-label="Permalink to &quot;架构设计&quot;">​</a></h1><h2 id="电商业务架构设计" tabindex="-1">电商业务架构设计 <a class="header-anchor" href="#电商业务架构设计" aria-label="Permalink to &quot;电商业务架构设计&quot;">​</a></h2><h3 id="名词定义" tabindex="-1">名词定义 <a class="header-anchor" href="#名词定义" aria-label="Permalink to &quot;名词定义&quot;">​</a></h3><h4 id="电商模式" tabindex="-1">电商模式 <a class="header-anchor" href="#电商模式" aria-label="Permalink to &quot;电商模式&quot;">​</a></h4><p>市面上有 5 种常见的电商模式： B2B、B2C、C2B、C2C、O2O</p><p>B2B 模式</p><blockquote><p>B2B (Business to Business)， 是指商家与商家建立的商业关系。 如：阿里巴巴</p></blockquote><p>B2C 模式</p><blockquote><p>B2C (Business to Consumer)， 就是我们经常看到的供应商直接把商品卖给用户，即“商对客” 模式，也就是通常说的商业零售，直接面向消费者销售产品和服务。如：苏宁易购、京东、天猫、小米商城</p></blockquote><p>C2B 模式</p><blockquote><p>C2B (Customer to Business)，即消费者对企业。先有消费者需求产生而后有企业生产，即先有消费者提出需求，后有生产企业按需求组织生产</p></blockquote><p>C2C 模式</p><blockquote><p>C2C (Customer to Consumer) ，客户之间自己把东西放上网去卖，如：淘宝，闲鱼</p></blockquote><p>O2O 模式</p><blockquote><p>O2O 即 Online To Offline，也即将线下商务的机会与互联网结合在了一起，让互联网成为线下交易的前台。线上快速支付，线下优质服务。如：饿了么，美团，淘票票，京东到家</p></blockquote><h4 id="商品、sku、spu" tabindex="-1">商品、SKU、SPU <a class="header-anchor" href="#商品、sku、spu" aria-label="Permalink to &quot;商品、SKU、SPU&quot;">​</a></h4><p><strong>SKU：Stock Keeping Unit</strong></p><p>SKU 从<strong>库存</strong>视角，以库存进出为单位，可以是件、瓶、箱等等。</p><p><strong>SPU：Standard Product Unit</strong></p><p>中文翻译为标准产品单位。SPU 从<strong>产品</strong>视角，是产品信息聚合的<strong>最小单位</strong>，是一组可复用、易检索的标准化信息的集合，该集合描述了一个产品的特性。通俗点讲，属性值、特性相同的商品就可以被称为一个 SPU 。例如 iPhone 8 就是一个 SPU ，iPhone 8 Plus 也是一个 SPU ，这个与<strong>商家</strong>无关，与颜色、款式、套餐等<strong>规格</strong>无关。</p><p><strong>商品：Product</strong></p><p>商家出售某个 SPU ，那么这就是一个商品。商品在 SPU 之上，增加了销售价格、促销活动、运费等等信息。另外，<strong>一个商品可以包含多个 SKU</strong>。</p><p><img src="'+s+'" alt="image-20220424214111566"></p><h3 id="架构设计-1" tabindex="-1">架构设计 <a class="header-anchor" href="#架构设计-1" aria-label="Permalink to &quot;架构设计&quot;">​</a></h3><h4 id="系统架构" tabindex="-1">系统架构 <a class="header-anchor" href="#系统架构" aria-label="Permalink to &quot;系统架构&quot;">​</a></h4><p><img src="'+r+'" alt="image-20220420131410875"></p><h4 id="业务架构" tabindex="-1">业务架构 <a class="header-anchor" href="#业务架构" aria-label="Permalink to &quot;业务架构&quot;">​</a></h4><p><img src="'+n+'" alt="image-20220420132506808"></p><p><img src="'+i+'" alt="image-20220420131449543"></p><h4 id="原型架构" tabindex="-1">原型架构 <a class="header-anchor" href="#原型架构" aria-label="Permalink to &quot;原型架构&quot;">​</a></h4><p><img src="'+l+'" alt="image-20220420132354168"></p><h3 id="数据库实体设计" tabindex="-1">数据库实体设计 <a class="header-anchor" href="#数据库实体设计" aria-label="Permalink to &quot;数据库实体设计&quot;">​</a></h3><h4 id="商品" tabindex="-1">商品 <a class="header-anchor" href="#商品" aria-label="Permalink to &quot;商品&quot;">​</a></h4><h5 id="商品信息" tabindex="-1">商品信息 <a class="header-anchor" href="#商品信息" aria-label="Permalink to &quot;商品信息&quot;">​</a></h5>',34),h=[p];function d(u,m,_,g,b,q){return e(),t("div",null,h)}const f=a(c,[["render",d]]);export{k as __pageData,f as default};
