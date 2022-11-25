import{_ as s,c as a,o as n,a as l}from"./app.91d57d2c.js";const p="/assets/image-20220909170526705.ff64ab80.png",o="/assets/image-20220909170632059.3bb00a9d.png",e="/assets/image-20220909170852667.42756cb7.png",c="/assets/image-20220909172040657.012e4b10.png",t="/assets/image-20220909172232717.dd363504.png",b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"Nacos","slug":"nacos","link":"#nacos","children":[{"level":3,"title":"Nacos\u67B6\u6784","slug":"nacos\u67B6\u6784","link":"#nacos\u67B6\u6784","children":[]},{"level":3,"title":"\u6269\u5C55","slug":"\u6269\u5C55","link":"#\u6269\u5C55","children":[]}]}],"relativePath":"second/cloud/alibaba/Nacos.md"}'),r={name:"second/cloud/alibaba/Nacos.md"},i=l('<h2 id="nacos" tabindex="-1">Nacos <a class="header-anchor" href="#nacos" aria-hidden="true">#</a></h2><h3 id="nacos\u67B6\u6784" tabindex="-1">Nacos\u67B6\u6784 <a class="header-anchor" href="#nacos\u67B6\u6784" aria-hidden="true">#</a></h3><p><img src="'+p+'" alt="image-20220909170526705"></p><blockquote><ul><li>Provider APP\uFF1A\u670D\u52A1\u63D0\u4F9B\u8005</li><li>Consumer APP\uFF1A\u670D\u52A1\u6D88\u8D39\u8005</li><li>Name Server\uFF1A\u901A\u8FC7VIP\uFF08Virtual IP\uFF09\u6216DNS\u7684\u65B9\u5F0F\u5B9E\u73B0Nacos\u9AD8\u53EF\u7528\u96C6\u7FA4\u7684\u670D\u52A1\u8DEF\u7531</li><li>Nacos Server\uFF1ANacos\u670D\u52A1\u63D0\u4F9B\u8005\uFF0C\u91CC\u9762\u5305\u542B\u7684Open API\u662F\u529F\u80FD\u8BBF\u95EE\u5165\u53E3\uFF0CConig Service\u3001Naming Service \u662FNacos\u63D0\u4F9B\u7684\u914D\u7F6E\u670D\u52A1\u3001\u547D\u540D\u670D\u52A1\u6A21\u5757\u3002Consitency Protocol\u662F\u4E00\u81F4\u6027\u534F\u8BAE\uFF0C\u7528\u6765\u5B9E\u73B0Nacos\u96C6\u7FA4\u8282\u70B9\u7684\u6570\u636E\u540C\u6B65\uFF0C\u8FD9\u91CC\u4F7F\u7528\u7684\u662FRaft\u7B97\u6CD5\uFF08Etcd\u3001Redis\u54E8\u5175\u9009\u4E3E\uFF09</li><li>Nacos Console\uFF1A\u63A7\u5236\u53F0</li></ul></blockquote><h4 id="\u6CE8\u518C\u4E2D\u5FC3" tabindex="-1">\u6CE8\u518C\u4E2D\u5FC3 <a class="header-anchor" href="#\u6CE8\u518C\u4E2D\u5FC3" aria-hidden="true">#</a></h4><h5 id="\u539F\u7406\u56FE" tabindex="-1">\u539F\u7406\u56FE <a class="header-anchor" href="#\u539F\u7406\u56FE" aria-hidden="true">#</a></h5><ul><li>\u670D\u52A1\u5B9E\u4F8B\u5728\u542F\u52A8\u65F6\u6CE8\u518C\u5230\u670D\u52A1\u6CE8\u518C\u8868\uFF0C\u5E76\u5728\u5173\u95ED\u65F6\u6CE8\u9500</li><li>\u670D\u52A1\u6D88\u8D39\u8005\u67E5\u8BE2\u670D\u52A1\u6CE8\u518C\u8868\uFF0C\u83B7\u5F97\u53EF\u7528\u5B9E\u4F8B</li><li>\u670D\u52A1\u6CE8\u518C\u4E2D\u5FC3\u9700\u8981\u8C03\u7528\u670D\u52A1\u5B9E\u4F8B\u7684\u5065\u5EB7\u68C0\u67E5API\u6765\u9A8C\u8BC1\u5B83\u662F\u5426\u80FD\u591F\u5904\u7406\u8BF7\u6C42</li></ul><p><img src="'+o+'" alt="image-20220909170632059"></p><h5 id="\u6CE8\u518C" tabindex="-1">\u6CE8\u518C <a class="header-anchor" href="#\u6CE8\u518C" aria-hidden="true">#</a></h5><p>\u5728Spring-Cloud-Common\u5305\u4E2D\u6709\u4E00\u4E2A\u7C7B<code>org.springframework.cloud. client.serviceregistry .ServiceRegistry</code> ,\u5B83\u662FSpring Cloud\u63D0\u4F9B\u7684\u670D\u52A1\u6CE8\u518C\u7684\u6807\u51C6\u3002\u96C6\u6210\u5230Spring Cloud\u4E2D\u5B9E\u73B0\u670D\u52A1\u6CE8\u518C\u7684\u7EC4\u4EF6,\u90FD\u4F1A\u5B9E\u73B0\u8BE5\u63A5\u53E3\u3002\u8BE5\u63A5\u53E3\u6709\u4E00\u4E2A\u5B9E\u73B0\u7C7B\u662F<code>NacoServiceRegistry</code></p><p>SpringCloud\u96C6\u6210Nacos\u7684\u5B9E\u73B0\u8FC7\u7A0B\uFF1A</p><p>\u5728spring-clou-commons\u5305\u7684META-INF/spring.factories\u4E2D\u5305\u542B\u81EA\u52A8\u88C5\u914D\u7684\u914D\u7F6E\u4FE1\u606F\u5982\u4E0B\uFF1A</p><p>\u5176\u4E2DAutoServiceRegistrationAutoConfiguration\u5C31\u662F\u670D\u52A1\u6CE8\u518C\u76F8\u5173\u7684\u914D\u7F6E\u7C7B\uFF1A</p><p><img src="'+e+'" alt="image-20220909170852667"></p><p>\u5728AutoServiceRegistrationAutoConfiguration\u914D\u7F6E\u7C7B\u4E2D,\u6CE8\u5165\u4E86\u4E00\u4E2AAutoServiceRegistration\u5B9E\u4F8B</p><p>AbstractAutoServiceRegistration\u62BD\u8C61\u7C7B\u5B9E\u73B0\u4E86\u8BE5\u63A5\u53E3,\u5E76\u4E14\u6700\u91CD\u8981\u7684\u662FNacosAutoServiceRegistration\u7EE7\u627F\u4E86AbstractAutoServiceRegistration\u3002</p><p>Nacos\u662F\u901A\u8FC7Spring\u7684\u4E8B\u4EF6\u673A\u5236\u7EE7\u627F\u5230SpringCloud\u4E2D\u53BB\u7684</p><p>AbstractAutoServiceRegistration\u5B9E\u73B0\u4E86onApplicationEvent\u62BD\u8C61\u65B9\u6CD5,\u5E76\u4E14\u76D1\u542CWebServerInitializedEvent\u4E8B\u4EF6(\u5F53Webserver\u521D\u59CB\u5316\u5B8C\u6210\u4E4B\u540E) , \u8C03\u7528this.bind ( event )\u65B9\u6CD5\u3002</p><p>\u6700\u7EC8\u4F1A\u8C03\u7528NacosServiceREgistry.register()\u65B9\u6CD5\u8FDB\u884C\u670D\u52A1\u6CE8\u518C\u3002</p><h5 id="\u5FC3\u8DF3\u673A\u5236" tabindex="-1">\u5FC3\u8DF3\u673A\u5236 <a class="header-anchor" href="#\u5FC3\u8DF3\u673A\u5236" aria-hidden="true">#</a></h5><p>\u5FC3\u8DF3\u673A\u5236\u5C31\u662F\u5BA2\u6237\u7AEF\u901A\u8FC7schedule\u5B9A\u65F6\u5411\u670D\u52A1\u7AEF\u53D1\u9001\u4E00\u4E2A\u6570\u636E\u5305 ,\u7136\u540E\u542F\u52A8-\u4E2A\u7EBF\u7A0B\u4E0D\u65AD\u68C0\u6D4B\u670D\u52A1\u7AEF\u7684\u56DE\u5E94,\u5982\u679C\u5728\u8BBE\u5B9A\u65F6\u95F4\u5185\u6CA1\u6709\u6536\u5230\u670D\u52A1\u7AEF\u7684\u56DE\u5E94,\u5219\u8BA4\u4E3A\u670D\u52A1\u5668\u51FA\u73B0\u4E86\u6545\u969C\u3002Nacos\u670D\u52A1\u7AEF\u4F1A\u6839\u636E\u5BA2\u6237\u7AEF\u7684\u5FC3\u8DF3\u5305\u4E0D\u65AD\u66F4\u65B0\u670D\u52A1\u7684\u72B6\u6001\u3002</p><p>\u603B\u7ED3\uFF1A</p><ul><li><p>Nacos\u5BA2\u6237\u7AEF\u901A\u8FC7Open API\u7684\u5F62\u5F0F\u53D1\u9001\u670D\u52A1\u6CE8\u518C\u8BF7\u6C42</p></li><li><p>Nacos\u670D\u52A1\u7AEF\u6536\u5230\u8BF7\u6C42\u540E\uFF0C\u505A\u4EE5\u4E0B\u4E09\u4EF6\u4E8B\uFF1A</p></li><li><ol><li>\u6784\u5EFA\u4E00\u4E2AService\u5BF9\u8C61\u4FDD\u5B58\u5230ConcurrentHashMap\u96C6\u5408\u4E2D</li><li>\u4F7F\u7528\u5B9A\u65F6\u4EFB\u52A1\u5BF9\u5F53\u524D\u670D\u52A1\u4E0B\u7684\u6240\u6709\u5B9E\u4F8B\u5EFA\u7ACB\u5FC3\u8DF3\u68C0\u6D4B\u673A\u5236</li><li>\u57FA\u4E8E\u6570\u636E\u4E00\u81F4\u6027\u534F\u8BAE\u670D\u52A1\u6570\u636E\u8FDB\u884C\u540C\u6B65</li></ol></li></ul><h4 id="\u914D\u7F6E\u4E2D\u5FC3" tabindex="-1">\u914D\u7F6E\u4E2D\u5FC3 <a class="header-anchor" href="#\u914D\u7F6E\u4E2D\u5FC3" aria-hidden="true">#</a></h4><h5 id="\u63A8\u62C9\u6A21\u578B" tabindex="-1">\u63A8\u62C9\u6A21\u578B <a class="header-anchor" href="#\u63A8\u62C9\u6A21\u578B" aria-hidden="true">#</a></h5><h6 id="\u63A8\u6A21\u578B" tabindex="-1"><strong>\u63A8\u6A21\u578B</strong> <a class="header-anchor" href="#\u63A8\u6A21\u578B" aria-hidden="true">#</a></h6><p>\u5BA2\u6237\u7AEF\u4E0E\u670D\u52A1\u7AEF\u5EFA\u7ACB<code>TCP</code>\u957F\u8FDE\u63A5\uFF0C\u5F53\u670D\u52A1\u7AEF\u914D\u7F6E\u6570\u636E\u6709\u53D8\u52A8\uFF0C\u7ACB\u523B\u901A\u8FC7\u5EFA\u7ACB\u7684\u957F\u8FDE\u63A5\u5C06\u6570\u636E\u63A8\u9001\u7ED9\u5BA2\u6237\u7AEF\u3002</p><p>\u4F18\u52BF\uFF1A\u957F\u94FE\u63A5\u7684\u4F18\u70B9\u662F\u5B9E\u65F6\u6027\uFF0C\u4E00\u65E6\u6570\u636E\u53D8\u52A8\uFF0C\u7ACB\u5373\u63A8\u9001\u53D8\u66F4\u6570\u636E\u7ED9\u5BA2\u6237\u7AEF\uFF0C\u800C\u4E14\u5BF9\u4E8E\u5BA2\u6237\u7AEF\u800C\u8A00\uFF0C\u8FD9\u79CD\u65B9\u5F0F\u66F4\u4E3A\u7B80\u5355\uFF0C\u53EA\u5EFA\u7ACB\u8FDE\u63A5\u63A5\u6536\u6570\u636E\uFF0C\u5E76\u4E0D\u9700\u8981\u5173\u5FC3\u662F\u5426\u6709\u6570\u636E\u53D8\u66F4\u8FD9\u7C7B\u903B\u8F91\u7684\u5904\u7406\u3002</p><p>\u5F0A\u7AEF\uFF1A\u957F\u8FDE\u63A5\u53EF\u80FD\u4F1A\u56E0\u4E3A\u7F51\u7EDC\u95EE\u9898\uFF0C\u5BFC\u81F4\u4E0D\u53EF\u7528\uFF0C\u4E5F\u5C31\u662F\u4FD7\u79F0\u7684<code>\u5047\u6B7B</code>\u3002\u8FDE\u63A5\u72B6\u6001\u6B63\u5E38\uFF0C\u4F46\u5B9E\u9645\u4E0A\u5DF2\u65E0\u6CD5\u901A\u4FE1\uFF0C\u6240\u4EE5\u8981\u6709\u7684\u5FC3\u8DF3\u673A\u5236<code>KeepAlive</code>\u6765\u4FDD\u8BC1\u8FDE\u63A5\u7684\u53EF\u7528\u6027\uFF0C\u624D\u53EF\u4EE5\u4FDD\u8BC1\u914D\u7F6E\u6570\u636E\u7684\u6210\u529F\u63A8\u9001\u3002</p><h6 id="\u62C9\u6A21\u578B" tabindex="-1"><strong>\u62C9\u6A21\u578B</strong> <a class="header-anchor" href="#\u62C9\u6A21\u578B" aria-hidden="true">#</a></h6><p>\u5BA2\u6237\u7AEF\u4E3B\u52A8\u7684\u5411\u670D\u52A1\u7AEF\u53D1\u8BF7\u6C42\u62C9\u914D\u7F6E\u6570\u636E\uFF0C\u5E38\u89C1\u7684\u65B9\u5F0F\u5C31\u662F\u8F6E\u8BE2\uFF0C\u6BD4\u5982\u6BCF3s\u5411\u670D\u52A1\u7AEF\u8BF7\u6C42\u4E00\u6B21\u914D\u7F6E\u6570\u636E\u3002</p><p>\u8F6E\u8BE2\u7684\u4F18\u70B9\u662F\u5B9E\u73B0\u6BD4\u8F83\u7B80\u5355\u3002\u4F46\u5F0A\u7AEF\u4E5F\u663E\u800C\u6613\u89C1\uFF0C\u8F6E\u8BE2\u65E0\u6CD5\u4FDD\u8BC1\u6570\u636E\u7684\u5B9E\u65F6\u6027\uFF0C\u4EC0\u4E48\u65F6\u5019\u8BF7\u6C42\uFF1F\u95F4\u9694\u591A\u957F\u65F6\u95F4\u8BF7\u6C42\u4E00\u6B21\uFF1F\u90FD\u662F\u4E0D\u5F97\u4E0D\u8003\u8651\u7684\u95EE\u9898\uFF0C\u800C\u4E14\u8F6E\u8BE2\u65B9\u5F0F\u5BF9\u670D\u52A1\u7AEF\u8FD8\u4F1A\u4EA7\u751F\u4E0D\u5C0F\u7684\u538B\u529B\u3002</p><h5 id="nacos\u957F\u8F6E\u8BE2" tabindex="-1">Nacos\u957F\u8F6E\u8BE2 <a class="header-anchor" href="#nacos\u957F\u8F6E\u8BE2" aria-hidden="true">#</a></h5><p><code>nacos</code>\u91C7\u7528\u7684\u662F\u5BA2\u6237\u7AEF\u4E3B\u52A8\u62C9<code>pull</code>\u6A21\u578B\uFF0C\u5E94\u7528\u957F\u8F6E\u8BE2\uFF08<code>Long Polling</code>\uFF09\u7684\u65B9\u5F0F\u6765\u83B7\u53D6\u914D\u7F6E\u6570\u636E\u3002</p><blockquote><p><strong>\u957F\u8F6E\u8BE2</strong></p><p>\u5BA2\u6237\u7AEF\u53D1\u8D77\u8BF7\u6C42\u540E\uFF0C\u670D\u52A1\u7AEF\u4E0D\u4F1A\u7ACB\u5373\u8FD4\u56DE\u8BF7\u6C42\u7ED3\u679C\uFF0C\u800C\u662F\u5C06\u8BF7\u6C42\u6302\u8D77\u7B49\u5F85\u4E00\u6BB5\u65F6\u95F4\uFF0C\u5982\u679C\u6B64\u6BB5\u65F6\u95F4\u5185\u670D\u52A1\u7AEF\u6570\u636E\u53D8\u66F4\uFF0C\u7ACB\u5373\u54CD\u5E94\u5BA2\u6237\u7AEF\u8BF7\u6C42\uFF0C\u82E5\u662F\u4E00\u76F4\u65E0\u53D8\u5316\u5219\u7B49\u5230\u6307\u5B9A\u7684\u8D85\u65F6\u65F6\u95F4\u540E\u54CD\u5E94\u8BF7\u6C42\uFF0C\u5BA2\u6237\u7AEF\u91CD\u65B0\u53D1\u8D77\u957F\u94FE\u63A5\u3002</p><p><img src="'+c+'" alt="image-20220909172040657"></p></blockquote><h5 id="\u67B6\u6784\u8BBE\u8BA1" tabindex="-1">\u67B6\u6784\u8BBE\u8BA1 <a class="header-anchor" href="#\u67B6\u6784\u8BBE\u8BA1" aria-hidden="true">#</a></h5><p>\u5BA2\u6237\u7AEF\u3001\u63A7\u5236\u53F0\u901A\u8FC7\u53D1\u9001Http\u8BF7\u6C42\u5C06\u914D\u7F6E\u6570\u636E\u6CE8\u518C\u5230\u670D\u52A1\u7AEF\uFF0C\u670D\u52A1\u7AEF\u6301\u4E45\u5316\u6570\u636E\u5230Mysql\u3002</p><p>\u5BA2\u6237\u7AEF\u62C9\u53D6\u914D\u7F6E\u6570\u636E\uFF0C\u5E76\u6279\u91CF\u8BBE\u7F6E\u5BF9<code>dataId</code>\u7684\u76D1\u542C\u53D1\u8D77\u957F\u8F6E\u8BE2\u8BF7\u6C42\uFF0C\u5982\u670D\u52A1\u7AEF\u914D\u7F6E\u9879\u53D8\u66F4\u7ACB\u5373\u54CD\u5E94\u8BF7\u6C42\uFF0C\u5982\u65E0\u6570\u636E\u53D8\u66F4\u5219\u5C06\u8BF7\u6C42\u6302\u8D77\u4E00\u6BB5\u65F6\u95F4\uFF0C\u76F4\u5230\u8FBE\u5230\u8D85\u65F6\u65F6\u95F4\u3002\u4E3A\u51CF\u5C11\u5BF9\u670D\u52A1\u7AEF\u538B\u529B\u4EE5\u53CA\u4FDD\u8BC1\u914D\u7F6E\u4E2D\u5FC3\u53EF\u7528\u6027\uFF0C\u62C9\u53D6\u5230\u914D\u7F6E\u6570\u636E\u5BA2\u6237\u7AEF\u4F1A\u4FDD\u5B58\u4E00\u4EFD\u5FEB\u7167\u5728\u672C\u5730\u6587\u4EF6\u4E2D\uFF0C\u4F18\u5148\u8BFB\u53D6\u3002</p><p><img src="'+t+`" alt="image-20220909172232717"></p><h3 id="\u6269\u5C55" tabindex="-1">\u6269\u5C55 <a class="header-anchor" href="#\u6269\u5C55" aria-hidden="true">#</a></h3><h4 id="nacos2-0\u65B0\u529F\u80FD" tabindex="-1">nacos2.0\u65B0\u529F\u80FD <a class="header-anchor" href="#nacos2-0\u65B0\u529F\u80FD" aria-hidden="true">#</a></h4><blockquote><h5 id="_1-\u4F7F\u7528" tabindex="-1">1.\u4F7F\u7528 <a class="header-anchor" href="#_1-\u4F7F\u7528" aria-hidden="true">#</a></h5><p><code>pom.xml</code></p><div class="language-xml"><button class="copy"></button><span class="lang">xml</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">com.alibaba.boot</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">nacos-config-spring-boot-starter</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">0.2.10</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p><code>NacosConfigApplication.java</code></p><div class="language-java"><button class="copy"></button><span class="lang">java</span><pre><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">SpringBootApplication</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">NacosPropertySource</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">dataId</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">com.alibaba.nacos.example.properties</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">autoRefreshed</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true)</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">NacosConfigApplication</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">static</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">String</span><span style="color:#89DDFF;">[]</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">args</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">          SpringApplication</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">run</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">NacosConfigApplication</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">class</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> args</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><code>TestController.java</code></p><div class="language-java"><button class="copy"></button><span class="lang">java</span><pre><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Controller</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">RequestMapping</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">config</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ConfigController</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">NacosValue</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">value</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\${connectTimeoutInMills:5000}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">autoRefreshed</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true)</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> connectTimeoutInMills</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">RequestMapping</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">value</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/get</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">method</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> GET</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">ResponseBody</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">get</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">          </span><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> connectTimeoutInMills</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h5 id="_2-nacosvalue\u6CE8\u89E3" tabindex="-1">2.<code>@NacosValue\u6CE8\u89E3</code> <a class="header-anchor" href="#_2-nacosvalue\u6CE8\u89E3" aria-hidden="true">#</a></h5><h5 id="_3-refreshscope\u6CE8\u89E3" tabindex="-1">3.<code>@RefreshScope\u6CE8\u89E3</code> <a class="header-anchor" href="#_3-refreshscope\u6CE8\u89E3" aria-hidden="true">#</a></h5><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">\u4F7F\u7528 Nacos Config \u5B9E\u73B0 Bean \u52A8\u6001\u5237\u65B0</span></span>
<span class="line"><span style="color:#A6ACCD;">Nacos Confg \u652F\u6301\u6807\u51C6 Spring Cloud @ RefreshScope\u7279\u6027\uFF0C\u5373\u5E94\u7528\u8BA2\u9605\u67D0\u4E2ANacos \u914D\u7F6E\u540E\uFF0C\u5F53\u914D\u7F6E\u5185\u5BB9\u53D8\u5316\u65F6\uFF0CRefresh Scope Beans \u4E2D\u7684\u7ED1\u5B9A\u914D\u7F6E\u7684\u5C5E\u6027\u5C06\u6709\u6761\u4EF6\u7684\u66F4\u65B0\u3002\u6240\u8C13\u7684\u6761\u4EF6\u662F\u6307 Bean \u5FC5\u987B:</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5FC5\u987B\u6761\u4EF6\uFF1ABean \u7684\u58F0\u660E\u7C7B\u5FC5\u987B\u6807\u6CE8 @RefreshScope</span></span>
<span class="line"><span style="color:#A6ACCD;">\u4E8C\u9009\u4E00\u6761\u4EF6\uFF1A</span></span>
<span class="line"><span style="color:#A6ACCD;">  1.\u5C5E\u6027\uFF08\u975Estatic\u5B57\u6BB5\uFF09\u6807\u6CE8 @Value</span></span>
<span class="line"><span style="color:#A6ACCD;">      2. Bean\u6807\u6CE8@ConfigurationProperties</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><div class="language-java"><button class="copy"></button><span class="lang">java</span><pre><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">RestController</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">RefreshScope</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">TestNacosController</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">Value</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">\${top.fsn.id}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">String</span><span style="color:#A6ACCD;"> id</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">RequestMapping</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">test</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">String</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">test</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> id</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><div class="language-java"><button class="copy"></button><span class="lang">java</span><pre><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">EnableConfigurationProperties</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">User</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">class</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">SpringBootApplication</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">NacosConfigSampleApplication</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">static</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">String</span><span style="color:#89DDFF;">[]</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">args</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      SpringApplication</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">run</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">NacosConfigSampleApplication</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">class</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> args</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">RefreshScope</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">ConfigurationProperties</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">prefix</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">laker</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">User</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">String</span><span style="color:#A6ACCD;"> name</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">int</span><span style="color:#A6ACCD;"> age</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></blockquote>`,42),D=[i];function y(C,A,F,d,u,h){return n(),a("div",null,D)}const v=s(r,[["render",y]]);export{b as __pageData,v as default};
