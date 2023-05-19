import{_ as a,c as e,o as p,N as t}from"./chunks/framework.0799945b.js";const r="/assets/1631074769542-7f549da8-6dc3-413b-b5e5-89b6aa83c4a0.ed3eb6d9.jpeg",o="/assets/1631074658272-dfebf3e1-8468-41c5-a650-325b9869d568.3daf8a43.jpeg",f=JSON.parse('{"title":"架构设计","description":"","frontmatter":{},"headers":[],"relativePath":"design/秒杀系统架构设计.md"}'),n={name:"design/秒杀系统架构设计.md"},h=t('<h1 id="架构设计" tabindex="-1">架构设计 <a class="header-anchor" href="#架构设计" aria-label="Permalink to &quot;架构设计&quot;">​</a></h1><h2 id="秒杀系统架构设计" tabindex="-1">秒杀系统架构设计 <a class="header-anchor" href="#秒杀系统架构设计" aria-label="Permalink to &quot;秒杀系统架构设计&quot;">​</a></h2><h3 id="设计1" tabindex="-1">设计1 <a class="header-anchor" href="#设计1" aria-label="Permalink to &quot;设计1&quot;">​</a></h3><h4 id="秒杀系统时序图" tabindex="-1">秒杀系统时序图 <a class="header-anchor" href="#秒杀系统时序图" aria-label="Permalink to &quot;秒杀系统时序图&quot;">​</a></h4><h5 id="同步下单流程" tabindex="-1">同步下单流程 <a class="header-anchor" href="#同步下单流程" aria-label="Permalink to &quot;同步下单流程&quot;">​</a></h5><p><img src="'+r+'" alt="2021-09-08-12-12-40-933204.jpeg"></p><h6 id="_1-用户发起秒杀请求" tabindex="-1">1.用户发起秒杀请求 <a class="header-anchor" href="#_1-用户发起秒杀请求" aria-label="Permalink to &quot;1.用户发起秒杀请求&quot;">​</a></h6><p>在同步下单流程中，首先，用户发起秒杀请求。商城服务需要依次执行如下流程来处理秒杀请求的业务。</p><p>（1）识别验证码是否正确</p><p>商城服务判断用户发起秒杀请求时提交的验证码是否正确。</p><p>（2）判断活动是否已经结束</p><p>验证当前秒杀活动是否已经结束。</p><p>（3）验证访问请求是否处于黑名单</p><p>在电商领域中，存在着很多的恶意竞争，也就是说，其他商家可能会通过不正当手段来恶意请求秒杀系统，占用系统大量的带宽和其他系统资源。</p><p>此时，就需要使用风控系统等实现黑名单机制。为了简单，也可以使用拦截器统计访问频次实现黑名单机制。</p><p>（4）验证真实库存是否足够</p><p>系统需要验证商品的真实库存是否足够，是否能够支持本次秒杀活动的商品库存量。</p><p>（5）扣减缓存中的库存</p><p>在秒杀业务中，往往会将商品库存等信息存放在缓存中，此时，还需要验证秒杀活动使用的商品库存是否足够，并且需要扣减秒杀活动的商品库存数量。</p><p>（6）计算秒杀的价格</p><p>由于在秒杀活动中，商品的秒杀价格和商品的真实价格存在差异，所以，需要计算商品的秒杀价格。</p><p>注意：如果在秒杀场景中，系统涉及的业务更加复杂的话，会涉及更多的业务操作，这里只是列举出一些常见的业务操作。</p><h6 id="_2-提交订单" tabindex="-1">2.提交订单 <a class="header-anchor" href="#_2-提交订单" aria-label="Permalink to &quot;2.提交订单&quot;">​</a></h6><p>（1）订单入口</p><p>将用户提交的订单信息保存到数据库中。</p><p>（2）扣减真实库存</p><p>订单入库后，需要在商品的真实库存中将本次成功下单的商品数量扣除。</p><p>如果使用上述流程开发了一个秒杀系统，当用户发起秒杀请求时，由于系统每个业务流程都是串行执行的，整体上系统的性能不会太高，当并发量太高时，会为用户弹出下面的排队页面，来提示用户进行等待。</p><h5 id="异步下单流程" tabindex="-1">异步下单流程 <a class="header-anchor" href="#异步下单流程" aria-label="Permalink to &quot;异步下单流程&quot;">​</a></h5><p><img src="'+o+'" alt="2021-09-08-12-12-41-188209.jpeg"></p><h6 id="_1-用户发起秒杀请求-1" tabindex="-1">1.用户发起秒杀请求 <a class="header-anchor" href="#_1-用户发起秒杀请求-1" aria-label="Permalink to &quot;1.用户发起秒杀请求&quot;">​</a></h6><p>用户发起秒杀请求后，商城服务会经过如下业务流程。</p><p>（1）检测验证码是否正确</p><p>用户发起秒杀请求时，会将验证码一同发送过来，系统会检验验证码是否有效，并且是否正确。</p><p>（2）是否限流</p><p>系统会对用户的请求进行是否限流的判断，这里，可以通过判断消息队列的长度来进行判断。因为将用户的请求放在了消息队列中，消息队列中堆积的是用户的请求，可以根据当前消息队列中存在的待处理的请求数量来判断是否需要对用户的请求进行限流处理。</p><p>例如，在秒杀活动中，出售1000件商品，此时在消息队列中存在1000个请求，如果后续仍然有用户发起秒杀请求，则后续的请求可以不再处理，直接向用户返回商品已售完的提示。</p><p>（3）发送MQ</p><p>用户的秒杀请求通过前面的验证后，就可以将用户的请求参数等信息发送到MQ中进行异步处理，同时，向用户响应结果信息。在商城服务中，会有专门的异步任务处理模块来消费消息队列中的请求，并处理后续的异步流程。</p><p>在用户发起秒杀请求时，异步下单流程比同步下单流程处理的业务操作更少，它将后续的操作通过MQ发送给异步处理模块进行处理，并迅速向用户返回响应结果，释放请求连接。</p><h6 id="_2-异步处理" tabindex="-1">2.异步处理 <a class="header-anchor" href="#_2-异步处理" aria-label="Permalink to &quot;2.异步处理&quot;">​</a></h6><p>可以将下单流程的如下操作进行异步处理。</p><p>（1）判断活动是否已经结束</p><p>（2）判断本次请求是否处于系统黑名单，为了防止电商领域同行的恶意竞争可以为系统增加黑名单机制，将恶意的请求放入系统的黑名单中。可以使用拦截器统计访问频次来实现。</p><p>（3）扣减缓存中的秒杀商品的库存数量。</p><p>（4）生成秒杀Token，这个Token是绑定当前用户和当前秒杀活动的，只有生成了秒杀Token的请求才有资格进行秒杀活动。</p><p>这里引入了异步处理机制，在异步处理中，系统使用多少资源，分配多少线程来处理相应的任务，是可以进行控制的。</p><h6 id="_3-短轮询查询秒杀结果" tabindex="-1">3.短轮询查询秒杀结果 <a class="header-anchor" href="#_3-短轮询查询秒杀结果" aria-label="Permalink to &quot;3.短轮询查询秒杀结果&quot;">​</a></h6><p>这里，可以采取客户端短轮询查询是否获得秒杀资格的方案。例如，客户端可以每隔3秒钟轮询请求服务器，查询是否获得秒杀资格，这里，在服务器的处理就是判断当前用户是否存在秒杀Token，如果服务器为当前用户生成了秒杀Token，则当前用户存在秒杀资格。否则继续轮询查询，直到超时或者服务器返回商品已售完或者无秒杀资格等信息为止。</p><p>采用短轮询查询秒杀结果时，在页面上同样可以提示用户排队处理中，但是此时客户端会每隔几秒轮询服务器查询秒杀资格的状态，相比于同步下单流程来说，无需长时间占用请求连接。</p><p>此时，可能会有网友会问：采用短轮询查询的方式，会不会存在直到超时也查询不到是否具有秒杀资格的状态呢？答案是：有可能！</p><p>这里试想一下秒杀的真实场景，商家参加秒杀活动本质上不是为了赚钱，而是提升商品的销量和商家的知名度，吸引更多的用户来买自己的商品。所以，不必保证用户能够100%的查询到是否具有秒杀资格的状态。</p><h6 id="_4-秒杀结算" tabindex="-1">4.秒杀结算 <a class="header-anchor" href="#_4-秒杀结算" aria-label="Permalink to &quot;4.秒杀结算&quot;">​</a></h6><p>（1）验证下单Token</p><p>客户端提交秒杀结算时，会将秒杀Token一同提交到服务器，商城服务会验证当前的秒杀Token是否有效。</p><p>（2）加入秒杀购物车</p><p>商城服务在验证秒杀Token合法并有效后，会将用户秒杀的商品添加到秒杀购物车。</p><h6 id="_5-提交订单" tabindex="-1">5.提交订单 <a class="header-anchor" href="#_5-提交订单" aria-label="Permalink to &quot;5.提交订单&quot;">​</a></h6><p>（1）订单入库</p><p>将用户提交的订单信息保存到数据库中。</p><p>（2）删除Token</p><p>秒杀商品订单入库成功后，删除秒杀Token。</p><p>这里大家可以思考一个问题：为什么只在异步下单流程的粉色部分采用异步处理，而没有在其他部分采取异步削峰和填谷的措施呢？</p><p>这是因为在异步下单流程的设计中，无论是在产品设计上还是在接口设计上，在用户发起秒杀请求阶段对用户的请求进行了限流操作，可以说，系统的限流操作是非常前置的。</p><p>在用户发起秒杀请求时进行了限流，系统的高峰流量已经被平滑解决了，再往后走，其实系统的并发量和系统流量并不是非常高了。</p><p>所以，网上很多的文章和帖子中在介绍秒杀系统时，说是在下单时使用异步削峰来进行一些限流操作，那都是在扯淡！因为下单操作在整个秒杀系统的流程中属于比较靠后的操作了，限流操作一定要前置处理，在秒杀业务后面的流程中做限流操作是没啥卵用的。</p><h3 id="设计2" tabindex="-1">设计2 <a class="header-anchor" href="#设计2" aria-label="Permalink to &quot;设计2&quot;">​</a></h3><blockquote><p><a href="https://www.yuque.com/fcant/sys/xgrf00" target="_blank" rel="noreferrer">https://www.yuque.com/fcant/sys/xgrf00</a></p></blockquote>',68),i=[h];function l(s,d,c,_,u,b){return p(),e("div",null,i)}const k=a(n,[["render",l]]);export{f as __pageData,k as default};
