import{_ as s,c as a,o as n,a as l}from"./app.1af635ee.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"Druid","slug":"druid","link":"#druid","children":[{"level":3,"title":"\u6E90\u7801\u5206\u6790","slug":"\u6E90\u7801\u5206\u6790","link":"#\u6E90\u7801\u5206\u6790","children":[]},{"level":3,"title":"\u4F7F\u7528\u6307\u5357","slug":"\u4F7F\u7528\u6307\u5357","link":"#\u4F7F\u7528\u6307\u5357","children":[]}]}],"relativePath":"study/orm/Druid.md"}'),p={name:"study/orm/Druid.md"},o=l(`<h2 id="druid" tabindex="-1">Druid <a class="header-anchor" href="#druid" aria-hidden="true">#</a></h2><blockquote><p>Druid\u662F\u963F\u91CC\u5DF4\u5DF4\u5F00\u53D1\u7684\u53F7\u79F0\u4E3A\u76D1\u63A7\u800C\u751F\u7684\u6570\u636E\u5E93\u8FDE\u63A5\u6C60</p></blockquote><h3 id="\u6E90\u7801\u5206\u6790" tabindex="-1">\u6E90\u7801\u5206\u6790 <a class="header-anchor" href="#\u6E90\u7801\u5206\u6790" aria-hidden="true">#</a></h3><blockquote><ul><li>stat\uFF1ADruid\u5185\u7F6E\u63D0\u4F9B\u4E00\u4E2A<code>StatFilter</code>,\u7528\u4E8E\u7EDF\u8BA1\u76D1\u63A7\u4FE1\u606F\u3002</li><li>wall\uFF1ADruid\u9632\u5FA1SQL\u6CE8\u5165\u653B\u51FB\u7684<code>WallFilter</code>\u5C31\u662F\u901A\u8FC7Druid\u7684SQL Parser\u5206\u6790\u3002Druid\u63D0\u4F9B\u7684SQL Parser\u53EF\u4EE5\u5728JDBC\u5C42\u62E6\u622ASQL\u505A\u76F8\u5E94\u5904\u7406\uFF0C\u6BD4\u5982\u8BF4\u5206\u5E93\u5206\u8868\u3001\u5BA1\u8BA1\u7B49\u3002</li><li>log4j2\uFF1A\u8FD9\u4E2A\u5C31\u662F \u65E5\u5FD7\u8BB0\u5F55\u7684\u529F\u80FD\uFF0C\u53EF\u4EE5\u628Asql\u8BED\u53E5\u6253\u5370\u5230log4j2 \u4F9B\u6392\u67E5\u95EE\u9898\u3002</li></ul></blockquote><h3 id="\u4F7F\u7528\u6307\u5357" tabindex="-1">\u4F7F\u7528\u6307\u5357 <a class="header-anchor" href="#\u4F7F\u7528\u6307\u5357" aria-hidden="true">#</a></h3><h4 id="\u57FA\u672C\u914D\u7F6E" tabindex="-1">\u57FA\u672C\u914D\u7F6E <a class="header-anchor" href="#\u57FA\u672C\u914D\u7F6E" aria-hidden="true">#</a></h4><blockquote><p><code>pom.xml</code></p><div class="language-xml"><button class="copy"></button><span class="lang">xml</span><pre><code><span class="line"><span style="color:#676E95;">&lt;!-- druid\u6570\u636E\u6E90 --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">com.alibaba</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">druid-spring-boot-starter</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">1.1.23</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;">&lt;!-- mysql8 \u9A71\u52A8--&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">mysql</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">mysql-connector-java</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">scope</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">runtime</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">scope</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div></blockquote><blockquote><ul><li><strong>\u914D\u7F6EDruid\u6570\u636E\u6E90\uFF08\u8FDE\u63A5\u6C60\uFF09</strong> \uFF1A\u5982\u540C\u4EE5\u524D c3p0\u3001dbcp \u6570\u636E\u6E90\u53EF\u4EE5\u8BBE\u7F6E\u6570\u636E\u6E90\u8FDE\u63A5\u521D\u59CB\u5316\u5927\u5C0F\u3001\u6700\u5927\u8FDE\u63A5\u6570\u3001\u7B49\u5F85\u65F6\u95F4\u3001\u6700\u5C0F\u8FDE\u63A5\u6570 \u7B49\u4E00\u6837\uFF0CDruid \u6570\u636E\u6E90\u540C\u7406\u53EF\u4EE5\u8FDB\u884C\u8BBE\u7F6E\uFF1B</li><li><strong>\u914D\u7F6E Druid web \u76D1\u63A7 filter\uFF08<code>WebStatFilter</code>\uFF09</strong> \uFF1A\u8FD9\u4E2A\u8FC7\u6EE4\u5668\u7684\u4F5C\u7528\u5C31\u662F\u7EDF\u8BA1 web \u5E94\u7528\u8BF7\u6C42\u4E2D\u6240\u6709\u7684\u6570\u636E\u5E93\u4FE1\u606F\uFF0C\u6BD4\u5982 \u53D1\u51FA\u7684 sql \u8BED\u53E5\uFF0Csql \u6267\u884C\u7684\u65F6\u95F4\u3001\u8BF7\u6C42\u6B21\u6570\u3001\u8BF7\u6C42\u7684 url \u5730\u5740\u3001\u4EE5\u53CAseesion \u76D1\u63A7\u3001\u6570\u636E\u5E93\u8868\u7684\u8BBF\u95EE\u6B21\u6570 \u7B49\u7B49\u3002</li><li><strong>\u914D\u7F6E Druid \u540E\u53F0\u7BA1\u7406 Servlet\uFF08<code>StatViewServlet</code>\uFF09</strong> \uFF1ADruid \u6570\u636E\u6E90\u5177\u6709\u76D1\u63A7\u7684\u529F\u80FD\uFF0C\u5E76\u63D0\u4F9B\u4E86\u4E00\u4E2A web \u754C\u9762\u65B9\u4FBF\u7528\u6237\u67E5\u770B\uFF0C\u7C7B\u4F3C\u5B89\u88C5 \u8DEF\u7531\u5668 \u65F6\uFF0C\u4EBA\u5BB6\u4E5F\u63D0\u4F9B\u4E86\u4E00\u4E2A\u9ED8\u8BA4\u7684 web \u9875\u9762\uFF1B\u9700\u8981\u8BBE\u7F6E Druid \u7684\u540E\u53F0\u7BA1\u7406\u9875\u9762\u7684\u5C5E\u6027\uFF0C\u6BD4\u5982 \u767B\u5F55\u8D26\u53F7\u3001\u5BC6\u7801 \u7B49\uFF1B</li></ul></blockquote><blockquote><p><code>application.yml</code></p><p><code>com.alibaba.druid.spring.boot.autoconfigure.properties.DruidStatProperties</code> <code>org.springframework.boot.autoconfigure.jdbc.DataSourceProperties</code></p><div class="language-yaml"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#676E95;">########## \u914D\u7F6E\u6570\u636E\u6E90 \uFF08Druid\uFF09##########</span></span>
<span class="line"><span style="color:#F07178;">spring</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">datasource</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">   </span><span style="color:#676E95;">########## JDBC \u57FA\u672C\u914D\u7F6E ##########</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#F07178;">username</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">xxx</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#F07178;">password</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">xxx</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#F07178;">driver-class-name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">com.mysql.cj.jdbc.Driver</span><span style="color:#A6ACCD;">   </span><span style="color:#676E95;"># mysql8 \u7684\u8FDE\u63A5\u9A71\u52A8</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#F07178;">url</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">jdbc:mysql://127.0.0.1:3306/test?serverTimezone=Asia/Shanghai</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#F07178;">platform</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mysql</span><span style="color:#A6ACCD;">                               </span><span style="color:#676E95;"># \u6570\u636E\u5E93\u7C7B\u578B</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">com.alibaba.druid.pool.DruidDataSource</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;"># \u6307\u5B9A\u6570\u636E\u6E90\u7C7B\u578B</span></span>
<span class="line"><span style="color:#89DDFF;">   </span><span style="color:#676E95;">########## \u8FDE\u63A5\u6C60 \u914D\u7F6E ##########</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#F07178;">druid</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;"># \u914D\u7F6E\u521D\u59CB\u5316\u5927\u5C0F\u3001\u6700\u5C0F\u3001\u6700\u5927</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">initial-size</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">minIdle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">max-active</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;"># \u914D\u7F6E\u83B7\u53D6\u8FDE\u63A5\u7B49\u5F85\u8D85\u65F6\u7684\u65F6\u95F4(\u5355\u4F4D\uFF1A\u6BEB\u79D2)</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">max-wait</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">60000</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;"># \u914D\u7F6E\u95F4\u9694\u591A\u4E45\u624D\u8FDB\u884C\u4E00\u6B21\u68C0\u6D4B\uFF0C\u68C0\u6D4B\u9700\u8981\u5173\u95ED\u7684\u7A7A\u95F2\u8FDE\u63A5\uFF0C\u5355\u4F4D\u662F\u6BEB\u79D2</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">time-between-eviction-runs-millis</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2000</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;"># \u914D\u7F6E\u4E00\u4E2A\u8FDE\u63A5\u5728\u6C60\u4E2D\u6700\u5C0F\u751F\u5B58\u7684\u65F6\u95F4\uFF0C\u5355\u4F4D\u662F\u6BEB\u79D2</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">min-evictable-idle-time-millis</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">600000</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">max-evictable-idle-time-millis</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">900000</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;"># \u7528\u6765\u6D4B\u8BD5\u8FDE\u63A5\u662F\u5426\u53EF\u7528\u7684SQL\u8BED\u53E5,\u9ED8\u8BA4\u503C\u6BCF\u79CD\u6570\u636E\u5E93\u90FD\u4E0D\u76F8\u540C,\u8FD9\u662Fmysql</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">validationQuery</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">select 1</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;"># \u5E94\u7528\u5411\u8FDE\u63A5\u6C60\u7533\u8BF7\u8FDE\u63A5\uFF0C\u5E76\u4E14testOnBorrow\u4E3Afalse\u65F6\uFF0C\u8FDE\u63A5\u6C60\u5C06\u4F1A\u5224\u65AD\u8FDE\u63A5\u662F\u5426\u5904\u4E8E\u7A7A\u95F2\u72B6\u6001\uFF0C\u5982\u679C\u662F\uFF0C\u5219\u9A8C\u8BC1\u8FD9\u6761\u8FDE\u63A5\u662F\u5426\u53EF\u7528</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">testWhileIdle</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;"># \u5982\u679C\u4E3Atrue\uFF0C\u9ED8\u8BA4\u662Ffalse\uFF0C\u5E94\u7528\u5411\u8FDE\u63A5\u6C60\u7533\u8BF7\u8FDE\u63A5\u65F6\uFF0C\u8FDE\u63A5\u6C60\u4F1A\u5224\u65AD\u8FD9\u6761\u8FDE\u63A5\u662F\u5426\u662F\u53EF\u7528\u7684</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">testOnBorrow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;"># \u5982\u679C\u4E3Atrue\uFF08\u9ED8\u8BA4false\uFF09\uFF0C\u5F53\u5E94\u7528\u4F7F\u7528\u5B8C\u8FDE\u63A5\uFF0C\u8FDE\u63A5\u6C60\u56DE\u6536\u8FDE\u63A5\u7684\u65F6\u5019\u4F1A\u5224\u65AD\u8BE5\u8FDE\u63A5\u662F\u5426\u8FD8\u53EF\u7528</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">testOnReturn</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;"># \u662F\u5426\u7F13\u5B58preparedStatement\uFF0C\u4E5F\u5C31\u662FPSCache\u3002PSCache\u5BF9\u652F\u6301\u6E38\u6807\u7684\u6570\u636E\u5E93\u6027\u80FD\u63D0\u5347\u5DE8\u5927\uFF0C\u6BD4\u5982\u8BF4oracle</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">poolPreparedStatements</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;"># \u8981\u542F\u7528PSCache\uFF0C\u5FC5\u987B\u914D\u7F6E\u5927\u4E8E0\uFF0C\u5F53\u5927\u4E8E0\u65F6\uFF0C poolPreparedStatements\u81EA\u52A8\u89E6\u53D1\u4FEE\u6539\u4E3Atrue\uFF0C</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;"># \u5728Druid\u4E2D\uFF0C\u4E0D\u4F1A\u5B58\u5728Oracle\u4E0BPSCache\u5360\u7528\u5185\u5B58\u8FC7\u591A\u7684\u95EE\u9898\uFF0C</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;"># \u53EF\u4EE5\u628A\u8FD9\u4E2A\u6570\u503C\u914D\u7F6E\u5927\u4E00\u4E9B\uFF0C\u6BD4\u5982\u8BF4100</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">maxOpenPreparedStatements</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">20</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;"># \u8FDE\u63A5\u6C60\u4E2D\u7684minIdle\u6570\u91CF\u4EE5\u5185\u7684\u8FDE\u63A5\uFF0C\u7A7A\u95F2\u65F6\u95F4\u8D85\u8FC7minEvictableIdleTimeMillis\uFF0C\u5219\u4F1A\u6267\u884CkeepAlive\u64CD\u4F5C</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">keepAlive</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;"># Spring \u76D1\u63A7\uFF0C\u5229\u7528aop \u5BF9\u6307\u5B9A\u63A5\u53E3\u7684\u6267\u884C\u65F6\u95F4\uFF0Cjdbc\u6570\u8FDB\u884C\u8BB0\u5F55</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">aop-patterns</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">com.springboot.template.dao.*</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;">########### \u542F\u7528\u5185\u7F6E\u8FC7\u6EE4\u5668\uFF08\u7B2C\u4E00\u4E2A stat\u5FC5\u987B\uFF0C\u5426\u5219\u76D1\u63A7\u4E0D\u5230SQL\uFF09##########</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">filters</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stat,wall,log4j2</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;"># \u81EA\u5DF1\u914D\u7F6E\u76D1\u63A7\u7EDF\u8BA1\u62E6\u622A\u7684filter</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">filter</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">       </span><span style="color:#676E95;"># \u5F00\u542Fdruiddatasource\u7684\u72B6\u6001\u76D1\u63A7</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">stat</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F07178;">enabled</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F07178;">db-type</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mysql</span></span>
<span class="line"><span style="color:#89DDFF;">         </span><span style="color:#676E95;"># \u5F00\u542F\u6162sql\u76D1\u63A7\uFF0C\u8D85\u8FC72s \u5C31\u8BA4\u4E3A\u662F\u6162sql\uFF0C\u8BB0\u5F55\u5230\u65E5\u5FD7\u4E2D</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F07178;">log-slow-sql</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F07178;">slow-sql-millis</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2000</span></span>
<span class="line"><span style="color:#89DDFF;">       </span><span style="color:#676E95;"># \u65E5\u5FD7\u76D1\u63A7\uFF0C\u4F7F\u7528slf4j \u8FDB\u884C\u65E5\u5FD7\u8F93\u51FA</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">slf4j</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F07178;">enabled</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F07178;">statement-log-error-enabled</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F07178;">statement-create-after-log-enabled</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F07178;">statement-close-after-log-enabled</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F07178;">result-set-open-after-log-enabled</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span><span style="color:#F07178;">result-set-close-after-log-enabled</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;">########## \u914D\u7F6EWebStatFilter\uFF0C\u7528\u4E8E\u91C7\u96C6web\u5173\u8054\u76D1\u63A7\u7684\u6570\u636E ##########</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">web-stat-filter</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">enabled</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;">                   </span><span style="color:#676E95;"># \u542F\u52A8 StatFilter</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">url-pattern</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/*</span><span style="color:#A6ACCD;">                 </span><span style="color:#676E95;"># \u8FC7\u6EE4\u6240\u6709url</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">exclusions</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u6392\u9664\u4E00\u4E9B\u4E0D\u5FC5\u8981\u7684url</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">session-stat-enable</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;">       </span><span style="color:#676E95;"># \u5F00\u542Fsession\u7EDF\u8BA1\u529F\u80FD</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">session-stat-max-count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#A6ACCD;">    </span><span style="color:#676E95;"># session\u7684\u6700\u5927\u4E2A\u6570,\u9ED8\u8BA4100</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;">########## \u914D\u7F6EStatViewServlet\uFF08\u76D1\u63A7\u9875\u9762\uFF09\uFF0C\u7528\u4E8E\u5C55\u793ADruid\u7684\u7EDF\u8BA1\u4FE1\u606F ##########</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">stat-view-servlet</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">enabled</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;">                   </span><span style="color:#676E95;"># \u542F\u7528StatViewServlet</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">url-pattern</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/druid/*</span><span style="color:#A6ACCD;">           </span><span style="color:#676E95;"># \u8BBF\u95EE\u5185\u7F6E\u76D1\u63A7\u9875\u9762\u7684\u8DEF\u5F84\uFF0C\u5185\u7F6E\u76D1\u63A7\u9875\u9762\u7684\u9996\u9875\u662F/druid/index.html</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">reset-enable</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;">              </span><span style="color:#676E95;"># \u4E0D\u5141\u8BB8\u6E05\u7A7A\u7EDF\u8BA1\u6570\u636E,\u91CD\u65B0\u8BA1\u7B97</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">login-username</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">root</span><span style="color:#A6ACCD;">            </span><span style="color:#676E95;"># \u914D\u7F6E\u76D1\u63A7\u9875\u9762\u8BBF\u95EE\u5BC6\u7801</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">login-password</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">123</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">allow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">127.0.0.1</span><span style="color:#A6ACCD;">           </span><span style="color:#676E95;"># \u5141\u8BB8\u8BBF\u95EE\u7684\u5730\u5740\uFF0C\u5982\u679Callow\u6CA1\u6709\u914D\u7F6E\u6216\u8005\u4E3A\u7A7A\uFF0C\u5219\u5141\u8BB8\u6240\u6709\u8BBF\u95EE</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">deny</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">                                        </span><span style="color:#676E95;"># \u62D2\u7EDD\u8BBF\u95EE\u7684\u5730\u5740\uFF0Cdeny\u4F18\u5148\u4E8Eallow\uFF0C\u5982\u679C\u5728deny\u5217\u8868\u4E2D\uFF0C\u5C31\u7B97\u5728allow\u5217\u8868\u4E2D\uFF0C\u4E5F\u4F1A\u88AB\u62D2\u7EDD</span></span>
<span class="line"></span></code></pre></div></blockquote><h4 id="\u914D\u7F6E-filter" tabindex="-1">\u914D\u7F6E Filter <a class="header-anchor" href="#\u914D\u7F6E-filter" aria-hidden="true">#</a></h4><blockquote><p><code>spring.datasource.druid.filters=stat,wall,log4j ...</code></p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;"># \u914D\u7F6EStatFilter </span></span>
<span class="line"><span style="color:#A6ACCD;">spring.datasource.druid.filter.stat.enabled=true</span></span>
<span class="line"><span style="color:#A6ACCD;">spring.datasource.druid.filter.stat.db-type=h2</span></span>
<span class="line"><span style="color:#A6ACCD;">spring.datasource.druid.filter.stat.log-slow-sql=true</span></span>
<span class="line"><span style="color:#A6ACCD;">spring.datasource.druid.filter.stat.slow-sql-millis=2000</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># \u914D\u7F6EWallFilter </span></span>
<span class="line"><span style="color:#A6ACCD;">spring.datasource.druid.filter.wall.enabled=true</span></span>
<span class="line"><span style="color:#A6ACCD;">spring.datasource.druid.filter.wall.db-type=h2</span></span>
<span class="line"><span style="color:#A6ACCD;">spring.datasource.druid.filter.wall.config.delete-allow=false</span></span>
<span class="line"><span style="color:#A6ACCD;">spring.datasource.druid.filter.wall.config.drop-table-allow=false</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u76EE\u524D\u4E3A\u4EE5\u4E0B Filter \u63D0\u4F9B\u4E86\u914D\u7F6E\u652F\u6301\uFF0C\u6839\u636E\uFF08spring.datasource.druid.filter.*\uFF09\u8FDB\u884C\u914D\u7F6E\u3002</p><ul><li>StatFilter</li><li>WallFilter</li><li>ConfigFilter</li><li>EncodingConvertFilter</li><li>Slf4jLogFilter</li><li>Log4jFilter</li><li>Log4j2Filter</li><li>CommonsLogFilter</li></ul><p>\u4E0D\u60F3\u4F7F\u7528\u5185\u7F6E\u7684 Filters\uFF0C\u8981\u60F3\u4F7F\u81EA\u5B9A\u4E49 Filter \u914D\u7F6E\u751F\u6548\u9700\u8981\u5C06\u5BF9\u5E94 Filter \u7684 enabled \u8BBE\u7F6E\u4E3A true \uFF0CDruid Spring Boot Starter \u9ED8\u8BA4\u7981\u7528 StatFilter\uFF0C\u53EF\u4EE5\u5C06\u5176 enabled \u8BBE\u7F6E\u4E3A true \u6765\u542F\u7528\u5B83\u3002</p></blockquote><h4 id="\u76D1\u63A7\u9875\u9762" tabindex="-1">\u76D1\u63A7\u9875\u9762 <a class="header-anchor" href="#\u76D1\u63A7\u9875\u9762" aria-hidden="true">#</a></h4><blockquote><p>/druid/login.html</p></blockquote><h4 id="sql\u76D1\u63A7" tabindex="-1">sql\u76D1\u63A7 <a class="header-anchor" href="#sql\u76D1\u63A7" aria-hidden="true">#</a></h4><blockquote><div class="language-yaml"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#F07178;">spring</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">datasource</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#F07178;">druid</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#89DDFF;">     </span><span style="color:#676E95;">########## \u914D\u7F6EWebStatFilter\uFF0C\u7528\u4E8E\u91C7\u96C6web\u5173\u8054\u76D1\u63A7\u7684\u6570\u636E ##########</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span><span style="color:#F07178;">web-stat-filter</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">enabled</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;">                   </span><span style="color:#676E95;"># \u542F\u52A8 StatFilter</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">url-pattern</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/*</span><span style="color:#A6ACCD;">                 </span><span style="color:#676E95;"># \u8FC7\u6EE4\u6240\u6709url</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">exclusions</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;"># \u6392\u9664\u4E00\u4E9B\u4E0D\u5FC5\u8981\u7684url</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">session-stat-enable</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;">       </span><span style="color:#676E95;"># \u5F00\u542Fsession\u7EDF\u8BA1\u529F\u80FD</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#F07178;">session-stat-max-count</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#A6ACCD;">    </span><span style="color:#676E95;"># session\u7684\u6700\u5927\u4E2A\u6570,\u9ED8\u8BA4100</span></span>
<span class="line"></span></code></pre></div></blockquote><h4 id="spring\u76D1\u63A7" tabindex="-1">spring\u76D1\u63A7 <a class="header-anchor" href="#spring\u76D1\u63A7" aria-hidden="true">#</a></h4><blockquote><p>\u8BBF\u95EE\u4E4B\u540Espring\u76D1\u63A7\u9ED8\u8BA4\u662F\u6CA1\u6709\u6570\u636E\u7684\uFF1B\u8FD9\u9700\u8981\u5BFC\u5165SprngBoot\u7684AOP\u7684Starter</p><div class="language-xml"><button class="copy"></button><span class="lang">xml</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">org.springframework.boot</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">spring-boot-starter-aop</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>application.yml \u914D\u7F6E:</p><div class="language-yaml"><button class="copy"></button><span class="lang">yaml</span><pre><code><span class="line"><span style="color:#676E95;">#Spring\u76D1\u63A7AOP\u5207\u5165\u70B9\uFF0C\u5982com.springboot.template.dao.*,\u914D\u7F6E\u591A\u4E2A\u82F1\u6587\u9017\u53F7\u5206\u9694</span></span>
<span class="line"><span style="color:#C3E88D;">spring.datasource.druid.aop-patterns=&quot;com.springboot.template.dao.*&quot;</span></span>
<span class="line"></span></code></pre></div></blockquote><h4 id="\u83B7\u53D6-druid-\u7684\u76D1\u63A7\u6570\u636E" tabindex="-1">\u83B7\u53D6 Druid \u7684\u76D1\u63A7\u6570\u636E <a class="header-anchor" href="#\u83B7\u53D6-druid-\u7684\u76D1\u63A7\u6570\u636E" aria-hidden="true">#</a></h4><blockquote><p>Druid \u7684\u76D1\u63A7\u6570\u636E\u53EF\u4EE5\u5728 <strong>\u5F00\u542F StatFilter \u540E</strong> \uFF0C\u901A\u8FC7 <code>DruidStatManagerFacade</code> \u8FDB\u884C\u83B7\u53D6;</p><p><code>DruidStatManagerFacade#getDataSourceStatDataList</code> \u8BE5\u65B9\u6CD5\u53EF\u4EE5\u83B7\u53D6\u6240\u6709\u6570\u636E\u6E90\u7684\u76D1\u63A7\u6570\u636E\uFF0C</p><p>\u9664\u6B64\u4E4B\u5916 <code>DruidStatManagerFacade</code> \u8FD8\u63D0\u4F9B\u4E86\u4E00\u4E9B\u5176\u4ED6\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u6309\u9700\u9009\u62E9\u4F7F\u7528\u3002</p><div class="language-java"><button class="copy"></button><span class="lang">java</span><pre><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">RestController</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">RequestMapping</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">value</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/druid</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DruidStatController</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">GetMapping</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/stat</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">Object</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">druidStat</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;">// \u83B7\u53D6\u6570\u636E\u6E90\u7684\u76D1\u63A7\u6570\u636E</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">return</span><span style="color:#A6ACCD;"> DruidStatManagerFacade</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getInstance</span><span style="color:#89DDFF;">().</span><span style="color:#82AAFF;">getDataSourceStatDataList</span><span style="color:#89DDFF;">();</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div></blockquote>`,19),e=[o];function t(r,c,y,D,F,i){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{A as __pageData,d as default};