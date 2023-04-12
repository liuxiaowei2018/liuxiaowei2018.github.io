import{_ as a,c as t,o as e,N as p}from"./chunks/framework.0799945b.js";const s="/assets/1666167319.9dc468e1.png",r="/assets/1666167355.be448cdf.png",i="/assets/1666167384.19c739be.png",o="/assets/1666167405.4f00c38c.png",l="/assets/1666167429.2377965a.png",c="/assets/1666167452.ad29cdbe.png",n="/assets/1666167473.e47c1b1b.png",m="/assets/1666167501.8e27b910.png",P=JSON.parse('{"title":"消息中间件","description":"","frontmatter":{},"headers":[],"relativePath":"study/middleware/Mq.md"}'),_={name:"study/middleware/Mq.md"},d=p('<h1 id="消息中间件" tabindex="-1">消息中间件 <a class="header-anchor" href="#消息中间件" aria-label="Permalink to &quot;消息中间件&quot;">​</a></h1><h2 id="_1-1-为什么要用mq" tabindex="-1">1.1 为什么要用MQ <a class="header-anchor" href="#_1-1-为什么要用mq" aria-label="Permalink to &quot;1.1 为什么要用MQ&quot;">​</a></h2><p>消息队列是一种“先进先出”的数据结构</p><p><img src="'+s+'" alt="queue1.png"></p><p>其应用场景主要包含以下3个方面</p><ul><li>应用解耦</li></ul><p>系统的耦合性越高，容错性就越低。以电商应用为例，用户创建订单后，如果耦合调用库存系统、物流系统、支付系统，任何一个子系统出了故障或者因为升级等原因暂时不可用，都会造成下单操作异常，影响用户使用体验。</p><p><img src="'+r+'" alt="解耦1.png"></p><p>使用消息队列解耦合，系统的耦合性就会提高了。比如物流系统发生故障，需要几分钟才能来修复，在这段时间内，物流系统要处理的数据被缓存到消息队列中，用户的下单操作正常完成。当物流系统回复后，补充处理存在消息队列中的订单消息即可，终端系统感知不到物流系统发生过几分钟故障。</p><p><img src="'+i+'" alt="解耦2.png"></p><ul><li>流量削峰</li></ul><p><img src="'+o+'" alt="mq-5.png"></p><p>应用系统如果遇到系统请求流量的瞬间猛增，有可能会将系统压垮。有了消息队列可以将大量请求缓存起来，分散到很长一段时间处理，这样可以大大提到系统的稳定性和用户体验。</p><p><img src="'+l+'" alt="mq-6.png"></p><p>一般情况，为了保证系统的稳定性，如果系统负载超过阈值，就会阻止用户请求，这会影响用户体验，而如果使用消息队列将请求缓存起来，等待系统处理完毕后通知用户下单完毕，这样总不能下单体验要好。</p><p><u>处于经济考量目的：</u></p><p>业务系统正常时段的QPS如果是1000，流量最高峰是10000，为了应对流量高峰配置高性能的服务器显然不划算，这时可以使用消息队列对峰值流量削峰</p><ul><li>数据分发</li></ul><p><img src="'+c+'" alt="mq-1.png"></p><p>通过消息队列可以让数据在多个系统更加之间进行流通。数据的产生方不需要关心谁来使用数据，只需要将数据发送到消息队列，数据使用方直接在消息队列中直接获取数据即可</p><p><img src="'+n+'" alt="mq-2.png"></p><h2 id="_1-2-mq的优点和缺点" tabindex="-1">1.2 MQ的优点和缺点 <a class="header-anchor" href="#_1-2-mq的优点和缺点" aria-label="Permalink to &quot;1.2 MQ的优点和缺点&quot;">​</a></h2><p>优点：解耦、削峰、数据分发</p><p>缺点包含以下几点：</p><ul><li><p>系统可用性降低</p><p>系统引入的外部依赖越多，系统稳定性越差。一旦MQ宕机，就会对业务造成影响。</p><p>如何保证MQ的高可用？</p></li><li><p>系统复杂度提高</p><p>MQ的加入大大增加了系统的复杂度，以前系统间是同步的远程调用，现在是通过MQ进行异步调用。</p><p>如何保证消息没有被重复消费？怎么处理消息丢失情况？那么保证消息传递的顺序性？</p></li><li><p>一致性问题</p><p>A系统处理完业务，通过MQ给B、C、D三个系统发消息数据，如果B系统、C系统处理成功，D系统处理失败。</p><p>如何保证消息数据处理的一致性？</p></li></ul><h2 id="_1-3-各种mq产品的比较" tabindex="-1">1.3 各种MQ产品的比较 <a class="header-anchor" href="#_1-3-各种mq产品的比较" aria-label="Permalink to &quot;1.3 各种MQ产品的比较&quot;">​</a></h2><p>常见的MQ产品包括Kafka、ActiveMQ、RabbitMQ、RocketMQ。</p><p><img src="'+m+'" alt="MQ比较.png"></p><h2 id="rabbitmq" tabindex="-1">Rabbitmq <a class="header-anchor" href="#rabbitmq" aria-label="Permalink to &quot;Rabbitmq&quot;">​</a></h2><p><a href="./../../second/mq/RabbitMQ.html">开始学习</a></p><h2 id="rocketmq" tabindex="-1">RocketMq <a class="header-anchor" href="#rocketmq" aria-label="Permalink to &quot;RocketMq&quot;">​</a></h2><p><a href="./../../second/mq/RocketMQ.html">开始学习</a></p><h2 id="kafka" tabindex="-1">Kafka <a class="header-anchor" href="#kafka" aria-label="Permalink to &quot;Kafka&quot;">​</a></h2><p><a href="./../../second/mq/Kafka.html">开始学习</a></p>',34),h=[d];function q(u,b,f,g,k,M){return e(),t("div",null,h)}const x=a(_,[["render",q]]);export{P as __pageData,x as default};
