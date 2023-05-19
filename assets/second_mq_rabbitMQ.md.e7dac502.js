import{_ as s,c as a,o as n,N as l}from"./chunks/framework.0799945b.js";const o="/assets/image-20230426182140713.e60048b8.png",e="/assets/image-20230426183056796.16e29fe5.png",p="/assets/image-20230426183200529.9e8920f4.png",t="/assets/image-20230425153439925.082bdf1a.png",c="/assets/image-20230426182711392.8fc5fc8b.png",r="/assets/image-20230426182327281.4724d6df.png",i="/assets/image-20230426182405029.2a6abfd8.png",m=JSON.parse('{"title":"RabbitMQ","description":"","frontmatter":{},"headers":[],"relativePath":"second/mq/rabbitMQ.md"}'),y={name:"second/mq/rabbitMQ.md"},D=l('<h1 id="rabbitmq" tabindex="-1">RabbitMQ <a class="header-anchor" href="#rabbitmq" aria-label="Permalink to &quot;RabbitMQ&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#原理篇">原理篇</a><ul><li><a href="#rabbitmq组件">RabbitMQ组件</a></li><li><a href="#rabbitmq通信模型">RabbitMQ通信模型</a></li><li><a href="#rabbitmq-ttl">RabbitMQ TTL</a></li><li><a href="#rabbitmq-dlx">RabbitMQ DLX</a></li><li><a href="#rabbitmq-confirm机制">RabbitMQ Confirm机制</a></li><li><a href="#rabbitmq-return机制">RabbitMQ Return机制</a></li><li><a href="#rabbitmq-ack与nack">RabbitMQ ACK与NACK</a></li><li><a href="#rabbitmq高可用">RabbitMQ高可用</a></li></ul></li><li><a href="#应用篇">应用篇</a><ul><li><a href="#rabbitmq-控制台">RabbitMQ 控制台</a></li><li><a href="#exchanges">Exchanges</a></li><li><a href="#rabbitmq-使用">RabbitMQ 使用</a></li><li><a href="#rabbitmq-延时插件">RabbitMQ 延时插件</a></li></ul></li></ul></nav><h2 id="原理篇" tabindex="-1">原理篇 <a class="header-anchor" href="#原理篇" aria-label="Permalink to &quot;原理篇&quot;">​</a></h2><h3 id="rabbitmq组件" tabindex="-1">RabbitMQ组件 <a class="header-anchor" href="#rabbitmq组件" aria-label="Permalink to &quot;RabbitMQ组件&quot;">​</a></h3><ul><li><code>Broker</code> ：一个RabbitMQ实例就是一个Broker</li><li><code>Virtual Host</code> ：虚拟主机。<strong>相当于MySQL的DataBase</strong> ，一个Broker上可以存在多个vhost，vhost之间相互隔离。每个vhost都拥有自己的队列、交换机、绑定和权限机制。vhost必须在连接时指定，默认的vhost是/。</li><li><code>Exchange</code> ：交换机，用来接收生产者发送的消息并将这些消息路由给服务器中的队列。</li><li><code>Queue</code> ：消息队列，用来保存消息直到发送给消费者。它是消息的容器。一个消息可投入一个或多个队列。</li><li><code>Banding</code> ：绑定关系，用于 <strong>消息队列和交换机之间的关联</strong> 。通过路由键（ <strong>Routing Key</strong> ）将交换机和消息队列关联起来。</li><li><code>Channel</code> ：管道，一条双向数据流通道。不管是发布消息、订阅队列还是接收消息，这些动作都是通过管道完成。因为对于操作系统来说，建立和销毁TCP都是非常昂贵的开销，所以引入了管道的概念，以复用一条TCP连接。</li><li><code>Connection</code> ：生产者/消费者 与broker之间的TCP连接。</li><li><code>Publisher</code> ：消息的生产者。</li><li><code>Consumer</code> ：消息的消费者。</li><li><code>Message</code> ：消息，它是由消息头和消息体组成。消息头则包括 <strong>Routing-Key</strong> 、 <strong>Priority</strong> （优先级）等</li></ul><p><img src="'+o+`" alt="image-20230426182140713"></p><h3 id="rabbitmq通信模型" tabindex="-1">RabbitMQ通信模型 <a class="header-anchor" href="#rabbitmq通信模型" aria-label="Permalink to &quot;RabbitMQ通信模型&quot;">​</a></h3><h4 id="simple" tabindex="-1">simple <a class="header-anchor" href="#simple" aria-label="Permalink to &quot;simple&quot;">​</a></h4><blockquote><p>生产者将消息发送到队列中，一个消费者一定能从队列中获取消息</p></blockquote><h4 id="work-queue" tabindex="-1">Work Queue <a class="header-anchor" href="#work-queue" aria-label="Permalink to &quot;Work Queue&quot;">​</a></h4><blockquote><p>多个消费者对应同一个队列，提高数据的消费能力。多个消费者绑定到同一个队列上，共同消费队列中的数据，队列中数据一旦消费了就自动删除，不会重复执行。 若多个消费者同时监听一个队列，默认情况下MQ平均分配消息</p></blockquote><h4 id="publish-subscribe" tabindex="-1">Publish/Subscribe <a class="header-anchor" href="#publish-subscribe" aria-label="Permalink to &quot;Publish/Subscribe&quot;">​</a></h4><p>生产者发送消息给交换机（exchange）了，由交换机确定发送给具体队列。这个交换机用来接收生产者发送的数据，并将将其转发给对应的队列，根据交换机发送数据的不同方式，分成3种：</p><ul><li><p>1.Fanout:广播模式，将消息发送给所有的队列</p></li><li><p>2.Direct:定向，把消息发送给 routingkey 相同的队列</p></li></ul><blockquote><p>队列与交换机不能任意绑定，需要指定一个Routingkey(路由key) 在消息的发送发向交换机发送消息是，也需要指定RoutingKey 交换机就会把消息发送给Routingkey一样的队列</p></blockquote><ul><li><p>3.Topic:通配符，把消息发送给符合 routing pattern（路由模式）的队列</p><blockquote><p>routingkey可以采用通配符进行定义，一般都是有一个或多个单词组成，多个单词之间使用“.”分割</p></blockquote><ul><li>通配符规则 .# : 匹配一个或多个单词 .* : 匹配一个单词</li><li>routing key 为一个句点号 <code>&quot;.&quot;</code> 分隔的字符串。我们将被句点号<code>&quot;.&quot;</code>分隔开的每一段独立的字符串称为一个单词，例如 “stock.usd.nyse”、”nyse.vmw”、”quick.orange.rabbit”</li><li>binding key 与 routing key 一样也是句点号 <code>&quot;.&quot;</code> 分隔的字符串。</li><li>binding key 中可以存在两种特殊字符 <code>&quot;*&quot;</code> 与 <code>&quot;#&quot;</code>，用于做模糊匹配。其中 <code>&quot;*&quot;</code> 用于匹配一个单词，<code>&quot;#&quot;</code> 用于匹配多个单词（可以是零个）。</li></ul></li></ul><h3 id="rabbitmq-ttl" tabindex="-1">RabbitMQ TTL <a class="header-anchor" href="#rabbitmq-ttl" aria-label="Permalink to &quot;RabbitMQ TTL&quot;">​</a></h3><p>TTL（Time To Live）：生存时间。RabbitMQ支持消息的过期时间，一共2种。</p><ul><li><strong>在消息发送时进行指定</strong> 。通过配置消息体的 Properties ，可以指定当前消息的过期时间。</li><li><strong>在创建Exchange时指定</strong> 。从进入消息队列开始计算，只要超过了队列的超时时间配置，那么消息会自动清除。</li></ul><h3 id="rabbitmq-dlx" tabindex="-1">RabbitMQ DLX <a class="header-anchor" href="#rabbitmq-dlx" aria-label="Permalink to &quot;RabbitMQ DLX&quot;">​</a></h3><p>死信队列（DLX Dead-Letter-Exchange）：当消息在一个队列中变成死信之后，它会被重新推送到另一个队列，这个队列就是死信队列。</p><p>DLX也是一个正常的Exchange，和一般的Exchange没有区别，它能在任何的队列上被指定，实际上就是设置某个队列的属性。</p><p>当这个队列中有死信时，RabbitMQ就会自动的将这个消息重新发布到设置的Exchange上去，进而被路由到另一个队列。</p><h4 id="死信队列-dlx-产生来源" tabindex="-1">死信队列(DLX)产生来源 <a class="header-anchor" href="#死信队列-dlx-产生来源" aria-label="Permalink to &quot;死信队列(DLX)产生来源&quot;">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">①：消息被拒绝（basic.reject/basic.nack)，且 requeue = false(代表不重新回到队列)</span></span>
<span class="line"><span style="color:#A6ACCD;">②：消息因TTL过期（就是任务消息上携带过期时间）</span></span>
<span class="line"><span style="color:#A6ACCD;">③：消息队列的消息数量已经超过最大队列长度，先入队的消息会被丢弃变为死信</span></span></code></pre></div><p><img src="`+e+'" alt="image-20230426183056796"></p><h5 id="消息ttl过期产生死信" tabindex="-1">消息TTL过期产生死信 <a class="header-anchor" href="#消息ttl过期产生死信" aria-label="Permalink to &quot;消息TTL过期产生死信&quot;">​</a></h5><p><img src="'+p+'" alt="image-20230426183200529"></p><h5 id="队列达到最大长度产生死信" tabindex="-1">队列达到最大长度产生死信 <a class="header-anchor" href="#队列达到最大长度产生死信" aria-label="Permalink to &quot;队列达到最大长度产生死信&quot;">​</a></h5><h3 id="rabbitmq-confirm机制" tabindex="-1">RabbitMQ Confirm机制 <a class="header-anchor" href="#rabbitmq-confirm机制" aria-label="Permalink to &quot;RabbitMQ Confirm机制&quot;">​</a></h3><ul><li>消息的确认，是指生产者投递消息后，如果Broker收到消息，则会给我们生产者一个应答。</li><li>生产者进行接受应答，用来确认这条消息是否正常的发送到了Broker，这种方式也是 <strong>消息的可靠性投递的核心保障！</strong></li></ul><blockquote><p>如何实现Confirm确认消息？</p></blockquote><p><img src="'+t+`" alt="image-20230425153439925"></p><ol><li><strong>在channel上开启确认模式</strong> ：<code>channel.confirmSelect()</code></li><li><strong>在channel上开启监听</strong> ：addConfirmListener ，监听成功和失败的处理结果，根据具体的结果对消息进行重新发送或记录日志处理等后续操作。</li></ol><h3 id="rabbitmq-return机制" tabindex="-1">RabbitMQ Return机制 <a class="header-anchor" href="#rabbitmq-return机制" aria-label="Permalink to &quot;RabbitMQ Return机制&quot;">​</a></h3><p>Return Listener <strong>用于处理一些不可路由的消息</strong> 。</p><p>我们的消息生产者，通过指定一个Exchange和Routing，把消息送达到某一个队列中去，然后我们的消费者监听队列进行消息的消费处理操作。</p><p>但是在某些情况下，如果我们在发送消息的时候，当前的exchange不存在或者指定的路由key路由不到，这个时候我们需要监听这种不可达消息，就需要使用到<code>Returrn Listener</code>。</p><p>基础API中有个关键的配置项 Mandatory ：如果为true，监听器会收到路由不可达的消息，然后进行处理。如果为false，broker端会自动删除该消息。</p><p>同样，通过监听的方式， <code>chennel.addReturnListener(ReturnListener rl)</code> 传入已经重写过handleReturn方法的ReturnListener。</p><h3 id="rabbitmq-ack与nack" tabindex="-1">RabbitMQ ACK与NACK <a class="header-anchor" href="#rabbitmq-ack与nack" aria-label="Permalink to &quot;RabbitMQ ACK与NACK&quot;">​</a></h3><p>消费端进行消费的时候，如果由于业务异常可以进行日志的记录，然后进行补偿。但是对于服务器宕机等严重问题，我们需要 <strong>手动ACK</strong> 保障消费端消费成功。</p><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// deliveryTag：消息在mq中的唯一标识  </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// multiple：是否批量(和qos设置类似的参数)  </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// requeue：是否需要重回队列。或者丢弃或者重回队首再次消费。  </span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">basicNack</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">long</span><span style="color:#A6ACCD;"> deliveryTag</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">boolean</span><span style="color:#A6ACCD;"> multiple</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">boolean</span><span style="color:#A6ACCD;"> requeue</span><span style="color:#89DDFF;">)</span></span></code></pre></div><p>消息在 <strong>消费端重回队列</strong> 是为了对没有成功处理消息，把消息重新返回到Broker。一般来说，实际应用中都会关闭重回队列（ <strong>避免进入死循环</strong> ），也就是设置为false。</p><h3 id="rabbitmq高可用" tabindex="-1">RabbitMQ高可用 <a class="header-anchor" href="#rabbitmq高可用" aria-label="Permalink to &quot;RabbitMQ高可用&quot;">​</a></h3><h4 id="消息顺序消费" tabindex="-1">消息顺序消费 <a class="header-anchor" href="#消息顺序消费" aria-label="Permalink to &quot;消息顺序消费&quot;">​</a></h4><blockquote><p>如何保证 RabbitMQ 消息的顺序消费？</p></blockquote><p>思路就是<code>拆分queue</code>，使得一个queue只对应一个消费者，这样消费者一定是按照顺序消费的；</p><p>如果消息数量较大，那我们可以按照消息类型拆分<a href="https://so.csdn.net/so/search?q=%E9%98%9F%E5%88%97&amp;spm=1001.2101.3001.7020" target="_blank" rel="noreferrer">队列</a>，你管你消息再多，不可能所有消息都是需要顺序性消费的吧，我们可以灵活一点，视情况而定，比如某三个消息ABC的对应的操作是需要顺序消费的，那就把这三个放到同一个队列；如果有多组这样的ABC消息需要保证顺序，那我们就多搞几个队列；不需要保证顺序的消息就放在其它队列；</p><h4 id="消息重复消费" tabindex="-1">消息重复消费 <a class="header-anchor" href="#消息重复消费" aria-label="Permalink to &quot;消息重复消费&quot;">​</a></h4><blockquote><p>如何保证 RabbitMQ 消息不会重复消费？</p></blockquote><p>这个要分情况：</p><ul><li><p>如果是direct模式：</p><p>一个队列对应一个消费者，那不存在重复消费的问题；如果是一个队列对应多个消费者，那消费者会通过轮询来消费，也不会存在重复消费的问题；</p></li><li><p>如果是topic或者广播模式：</p><p>一个队列对应了多个消费者，且消费者会同时收到消息，那就会出现重复消费的问题，如果我们不希望出现重复消费，我们可以给消息加一个唯一id，存到redis里面，消息消费成功后就存到redis里面去，这里我们可以用redis的set类型，然后每次消费之前先看看redis里面有没有该id；</p></li></ul><h2 id="应用篇" tabindex="-1">应用篇 <a class="header-anchor" href="#应用篇" aria-label="Permalink to &quot;应用篇&quot;">​</a></h2><h3 id="rabbitmq-控制台" tabindex="-1">RabbitMQ 控制台 <a class="header-anchor" href="#rabbitmq-控制台" aria-label="Permalink to &quot;RabbitMQ 控制台&quot;">​</a></h3><h3 id="exchanges" tabindex="-1">Exchanges <a class="header-anchor" href="#exchanges" aria-label="Permalink to &quot;Exchanges&quot;">​</a></h3><p><img src="`+c+'" alt="image-20230426182711392"></p><h4 id="queues" tabindex="-1">Queues <a class="header-anchor" href="#queues" aria-label="Permalink to &quot;Queues&quot;">​</a></h4><p><img src="'+r+'" alt="image-20230426182327281"></p><h4 id="add-a-new-queue" tabindex="-1">Add a new queue <a class="header-anchor" href="#add-a-new-queue" aria-label="Permalink to &quot;Add a new queue&quot;">​</a></h4><p><img src="'+i+`" alt="image-20230426182405029"></p><h3 id="rabbitmq-使用" tabindex="-1">RabbitMQ 使用 <a class="header-anchor" href="#rabbitmq-使用" aria-label="Permalink to &quot;RabbitMQ 使用&quot;">​</a></h3><blockquote><div class="language-xml"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">org.springframework.boot</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">spring-boot-starter-amqp</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F07178;">spring</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">rabbitmq</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">host</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">120.26.184.26</span></span>
<span class="line"><span style="color:#F07178;">username</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">admin</span></span>
<span class="line"><span style="color:#F07178;">password</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">123456</span></span>
<span class="line"><span style="color:#F07178;">virtual-host</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/test</span></span>
<span class="line"><span style="color:#F07178;">port</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5672</span></span>
<span class="line"><span style="color:#F07178;">listener</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">simple</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">acknowledge-mode</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">manual</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#手动签收消息</span></span>
<span class="line"><span style="color:#F07178;">publisher-confirms</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">#开启confirm机制</span></span>
<span class="line"><span style="color:#F07178;">publisher-returns</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">#开启return机制</span></span></code></pre></div><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">* MqConfig</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">*/</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Configuration</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MqConfig</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//1.创建交换机</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">TopicExchange</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">topicExchange</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">TopicExchange</span><span style="color:#A6ACCD;"> topicExchange </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">TopicExchange</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">springboot?topic-exchange</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> topicExchange</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//2.创建队列</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">Queue</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">queue</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">//第二个参数为true表示队列支持持久化</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#C792EA;">Queue</span><span style="color:#A6ACCD;"> queue </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Queue</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">springboot-queue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false,false,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">null);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> queue</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//3.将交换机和队列进行绑定</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">Binding</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">binding</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">TopicExchange</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">exchange</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">Queue</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">queue</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> BindingBuilder</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">bind</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">queue</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">to</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">exchange</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">with</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">*.red.*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">RunWith</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">SpringJUnit4ClassRunner</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">class</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">SpringBootTest</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">classes</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> MqApplication</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">class</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Publisher</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">RabbitTemplate</span><span style="color:#A6ACCD;"> rabbitTemplate</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Test</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">publisher</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">//发送消息</span></span>
<span class="line"><span style="color:#A6ACCD;">        rabbitTemplate</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">convertAndSend</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">springboot-topic.exchange</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">yangguang.red.dog</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">阳光的红色的大黄狗</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="language-java"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Component</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Consumer</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">//定义消费者，并监听队列</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">RabbitListener</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">queues</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">springboot-queue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getMessage</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">String</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">msg</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">Channel</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">channel</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">Messagemessage</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">throws</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">IOException</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        System</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">out</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">println</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">接收的数据为：</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">+</span><span style="color:#A6ACCD;"> msg</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">try</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">//业务逻辑</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> i</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">/</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">//模拟异常</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">//手动签收</span></span>
<span class="line"><span style="color:#A6ACCD;">            channel</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">basicAck</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">message</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getMessageProperties</span><span style="color:#89DDFF;">().</span><span style="color:#82AAFF;">getDeliveryTag</span><span style="color:#89DDFF;">(),false);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">catch</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">Exception</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">e</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">//让消息重回队列</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">//参数1：消息的标记</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">//参数2：是否进行批量应答</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">//参数3：拒绝接收消息之后，这个消息是否继续会队列</span></span>
<span class="line"><span style="color:#A6ACCD;">            channel</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">basicNack</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">message</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getMessageProperties</span><span style="color:#89DDFF;">().</span><span style="color:#82AAFF;">getDeliveryTag</span><span style="color:#89DDFF;">(),false,true</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></blockquote><h3 id="rabbitmq-延时插件" tabindex="-1">RabbitMQ 延时插件 <a class="header-anchor" href="#rabbitmq-延时插件" aria-label="Permalink to &quot;RabbitMQ 延时插件&quot;">​</a></h3><h4 id="docker环境安装" tabindex="-1">Docker环境安装 <a class="header-anchor" href="#docker环境安装" aria-label="Permalink to &quot;Docker环境安装&quot;">​</a></h4><blockquote><p><code>https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/tag/v3.8.0</code></p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">#拷贝到rabbitmq容器 b6c96d8d8e6f 中</span></span>
<span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cp</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rabbitmq_delayed_message_exchange-3.8.0.ez</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">43ecd6492677:/plugins</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#进入容器</span></span>
<span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">exec</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-it</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">43ecd6492677</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/bin/bash</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#启用插件</span></span>
<span class="line"><span style="color:#FFCB6B;">rabbitmq-plugins</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">enable</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rabbitmq_delayed_message_exchange</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#查看</span></span>
<span class="line"><span style="color:#FFCB6B;">rabbitmq-plugins</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">list</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#重新启动容器</span></span>
<span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">43ecd6492677</span></span></code></pre></div></blockquote>`,66),C=[D];function F(A,b,u,d,h,g){return n(),a("div",null,C)}const f=s(y,[["render",F]]);export{m as __pageData,f as default};