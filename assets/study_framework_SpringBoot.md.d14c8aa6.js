import{_ as s,c as n,o as a,a as l}from"./app.91d57d2c.js";const D=JSON.parse('{"title":"SpringBoot","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u539F\u7406\u7BC7","slug":"\u539F\u7406\u7BC7","link":"#\u539F\u7406\u7BC7","children":[]},{"level":2,"title":"\u5E94\u7528\u7BC7","slug":"\u5E94\u7528\u7BC7","link":"#\u5E94\u7528\u7BC7","children":[]}],"relativePath":"study/framework/SpringBoot.md"}'),p={name:"study/framework/SpringBoot.md"},e=l(`<h1 id="springboot" tabindex="-1">SpringBoot <a class="header-anchor" href="#springboot" aria-hidden="true">#</a></h1><h2 id="\u539F\u7406\u7BC7" tabindex="-1">\u539F\u7406\u7BC7 <a class="header-anchor" href="#\u539F\u7406\u7BC7" aria-hidden="true">#</a></h2><h4 id="\u81EA\u52A8\u914D\u7F6E" tabindex="-1">\u81EA\u52A8\u914D\u7F6E <a class="header-anchor" href="#\u81EA\u52A8\u914D\u7F6E" aria-hidden="true">#</a></h4><p>Spring Boot\u5173\u4E8E\u81EA\u52A8\u914D\u7F6E\u7684\u6E90\u7801\u5728<code>spring-boot-autoconfigure-x.x.x.x.jar</code>\u4E2D:</p><p><code>@SpringBootApplication</code>\u662F\u4E00\u4E2A\u590D\u5408\u6CE8\u89E3\u6216\u6D3E\u751F\u6CE8\u89E3\uFF0C\u5728<code>@SpringBootApplication</code>\u4E2D\u6709\u4E00\u4E2A\u6CE8\u89E3<code>@EnableAutoConfiguration</code>\uFF0C\u5F00\u542F\u81EA\u52A8\u914D\u7F6E\uFF0C\u5176\u5B9A\u4E49\u5982\u4E0B\uFF1A</p><p>\u8FD9\u4E2A\u6CE8\u89E3\u4E5F\u662F\u4E00\u4E2A\u6D3E\u751F\u6CE8\u89E3\uFF0C\u5176\u4E2D\u7684\u5173\u952E\u529F\u80FD\u7531@Import\u63D0\u4F9B\uFF0C\u5176\u5BFC\u5165\u7684AutoConfigurationImportSelector\u7684<code>selectImports()</code>\u65B9\u6CD5\u901A\u8FC7<code>SpringFactoriesLoader.loadFactoryNames()</code>\u626B\u63CF\u6240\u6709\u5177\u6709<strong>META-INF/spring.factories</strong> \u7684jar\u5305\u3002<code>spring-boot-autoconfigure-x.x.x.x.jar</code>\u91CC\u5C31\u6709\u4E00\u4E2A\u8FD9\u6837\u7684<code>spring.factories</code>\u6587\u4EF6\u3002</p><p>\u8FD9\u4E2A<code>spring.factories</code>\u6587\u4EF6\u4E5F\u662F\u4E00\u7EC4\u4E00\u7EC4\u7684key=value\u7684\u5F62\u5F0F\uFF0C\u5176\u4E2D\u4E00\u4E2Akey\u662F<code>EnableAutoConfiguration</code>\u7C7B\u7684\u5168\u7C7B\u540D\uFF0C\u800C\u5B83\u7684value\u662F\u4E00\u4E2A<code>xxxxAutoConfiguration</code>\u7684\u7C7B\u540D\u7684\u5217\u8868\uFF0C\u8FD9\u4E9B\u7C7B\u540D\u4EE5\u9017\u53F7\u5206\u9694;</p><p>\u8FD9\u4E2A<code>@EnableAutoConfiguration</code>\u6CE8\u89E3\u901A\u8FC7@SpringBootApplication\u88AB\u95F4\u63A5\u7684\u6807\u8BB0\u5728\u4E86Spring Boot\u7684\u542F\u52A8\u7C7B\u4E0A\u3002\u5728<code>SpringApplication.run(...)</code>\u7684\u5185\u90E8\u5C31\u4F1A\u6267\u884C<code>selectImports()</code>\u65B9\u6CD5\uFF0C\u627E\u5230\u6240\u6709JavaConfig\u81EA\u52A8\u914D\u7F6E\u7C7B\u7684\u5168\u9650\u5B9A\u540D\u5BF9\u5E94\u7684class\uFF0C\u7136\u540E\u5C06\u6240\u6709\u81EA\u52A8\u914D\u7F6E\u7C7B\u52A0\u8F7D\u5230Spring\u5BB9\u5668\u4E2D\u3002</p><h4 id="springboot\u6CE8\u89E3" tabindex="-1">SpringBoot\u6CE8\u89E3 <a class="header-anchor" href="#springboot\u6CE8\u89E3" aria-hidden="true">#</a></h4><h5 id="springboot\u6761\u4EF6\u6CE8\u89E3" tabindex="-1">springboot\u6761\u4EF6\u6CE8\u89E3 <a class="header-anchor" href="#springboot\u6761\u4EF6\u6CE8\u89E3" aria-hidden="true">#</a></h5><ul><li>@ConditionalOnBean\uFF1A\u5F53\u5BB9\u5668\u91CC\u6709\u6307\u5B9A Bean \u7684\u6761\u4EF6\u4E0B</li><li>@ConditionalOnMissingBean\uFF1A\u5F53\u5BB9\u5668\u91CC\u6CA1\u6709\u6307\u5B9A Bean \u7684\u60C5\u51B5\u4E0B</li><li>@ConditionalOnSingleCandidate\uFF1A\u5F53\u6307\u5B9A Bean \u5728\u5BB9\u5668\u4E2D\u53EA\u6709\u4E00\u4E2A\uFF0C\u6216\u8005\u867D\u7136\u6709\u591A\u4E2A\u4F46\u662F\u6307\u5B9A\u9996\u9009 Bean</li><li>@ConditionalOnClass\uFF1A\u5F53\u7C7B\u8DEF\u5F84\u4E0B\u6709\u6307\u5B9A\u7C7B\u7684\u6761\u4EF6\u4E0B</li><li>@ConditionalOnMissingClass\uFF1A\u5F53\u7C7B\u8DEF\u5F84\u4E0B\u6CA1\u6709\u6307\u5B9A\u7C7B\u7684\u6761\u4EF6\u4E0B</li><li>@ConditionalOnProperty\uFF1A\u6307\u5B9A\u7684\u5C5E\u6027\u662F\u5426\u6709\u6307\u5B9A\u7684\u503C</li><li>@ConditionalOnResource\uFF1A\u7C7B\u8DEF\u5F84\u662F\u5426\u6709\u6307\u5B9A\u7684\u503C</li><li>@ConditionalOnExpression\uFF1A\u57FA\u4E8E SpEL \u8868\u8FBE\u5F0F\u4F5C\u4E3A\u5224\u65AD\u6761\u4EF6</li><li>@ConditionalOnJava\uFF1A\u57FA\u4E8E Java \u7248\u672C\u4F5C\u4E3A\u5224\u65AD\u6761\u4EF6</li><li>@ConditionalOnJndi\uFF1A\u5728 JNDI \u5B58\u5728\u7684\u6761\u4EF6\u4E0B\u5DEE\u5728\u6307\u5B9A\u7684\u4F4D\u7F6E</li><li>@ConditionalOnNotWebApplication\uFF1A\u5F53\u524D\u9879\u76EE\u4E0D\u662F Web \u9879\u76EE\u7684\u6761\u4EF6\u4E0B</li><li>@ConditionalOnWebApplication\uFF1A\u5F53\u524D\u9879\u76EE\u662F Web\u9879\u76EE\u7684\u6761\u4EF6\u4E0B</li></ul><h2 id="\u5E94\u7528\u7BC7" tabindex="-1">\u5E94\u7528\u7BC7 <a class="header-anchor" href="#\u5E94\u7528\u7BC7" aria-hidden="true">#</a></h2><h4 id="springboot-\u53C2\u6570\u6821\u9A8C" tabindex="-1">SpringBoot \u53C2\u6570\u6821\u9A8C <a class="header-anchor" href="#springboot-\u53C2\u6570\u6821\u9A8C" aria-hidden="true">#</a></h4><h5 id="\u5F15\u5165\u4F9D\u8D56" tabindex="-1">\u5F15\u5165\u4F9D\u8D56 <a class="header-anchor" href="#\u5F15\u5165\u4F9D\u8D56" aria-hidden="true">#</a></h5><p>\u5982\u679Cspring-boot\u7248\u672C\u5C0F\u4E8E2.3.x\uFF0Cspring-boot-starter-web\u4F1A\u81EA\u52A8\u4F20\u5165hibernate-validator\u4F9D\u8D56</p><p>\u5982\u679Cspring-boot\u7248\u672C\u5927\u4E8E2.3.x\uFF0C\u5219\u9700\u8981\u624B\u52A8\u5F15\u5165\u4F9D\u8D56\uFF1A</p><div class="language-xml"><button class="copy"></button><span class="lang">xml</span><pre><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">org.hibernate</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">groupId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">hibernate-validator</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">artifactId</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">6.0.1.Final</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">version</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">dependency</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>\u5BF9\u4E8Eweb\u670D\u52A1\u6765\u8BF4\uFF0C\u4E3A\u9632\u6B62\u975E\u6CD5\u53C2\u6570\u5BF9\u4E1A\u52A1\u9020\u6210\u5F71\u54CD\uFF0CController\u5C42\u8981\u505A\u53C2\u6570\u6821\u9A8C</p><p>\u5927\u90E8\u5206\u60C5\u51B5\u4E0B\uFF0C\u8BF7\u6C42\u53C2\u6570\u5206\u4E3A\u5982\u4E0B\u4E24\u79CD\u5F62\u5F0F\uFF1A</p><ul><li>POST\u3001PUT\u8BF7\u6C42\uFF0C\u4F7F\u7528requestBody\u4F20\u9012\u53C2\u6570\uFF1B</li><li>GET\u8BF7\u6C42\uFF0C\u4F7F\u7528requestParam/PathVariable\u4F20\u9012\u53C2\u6570\u3002</li></ul><h5 id="requestbody\u53C2\u6570\u6821\u9A8C" tabindex="-1">requestBody\u53C2\u6570\u6821\u9A8C <a class="header-anchor" href="#requestbody\u53C2\u6570\u6821\u9A8C" aria-hidden="true">#</a></h5><p>POST\u3001PUT\u8BF7\u6C42\u4E00\u822C\u4F1A\u4F7F\u7528requestBody\u4F20\u9012\u53C2\u6570\uFF0C\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u540E\u7AEF\u4F7F\u7528DTO\u5BF9\u8C61\u8FDB\u884C\u63A5\u6536\u3002\u53EA\u8981\u7ED9DTO\u5BF9\u8C61\u52A0\u4E0A@Validated\u6CE8\u89E3\u5C31\u80FD\u5B9E\u73B0\u81EA\u52A8\u53C2\u6570\u6821\u9A8C\u3002\u6BD4\u5982\uFF0C\u6709\u4E00\u4E2A\u4FDD\u5B58User\u7684\u63A5\u53E3\uFF0C\u8981\u6C42userName\u957F\u5EA6\u662F2-10\uFF0Caccount\u548Cpassword\u5B57\u6BB5\u957F\u5EA6\u662F6-20\u3002</p><p>\u5982\u679C\u6821\u9A8C\u5931\u8D25\uFF0C\u4F1A\u629B\u51FAMethodArgumentNotValidException\u5F02\u5E38\uFF0CSpring\u9ED8\u8BA4\u4F1A\u5C06\u5176\u8F6C\u4E3A400\uFF08Bad Request\uFF09\u8BF7\u6C42\u3002</p><blockquote><p>DTO\u8868\u793A\u6570\u636E\u4F20\u8F93\u5BF9\u8C61\uFF08Data Transfer Object\uFF09\uFF0C\u7528\u4E8E\u670D\u52A1\u5668\u548C\u5BA2\u6237\u7AEF\u4E4B\u95F4\u4EA4\u4E92\u4F20\u8F93\u4F7F\u7528\u7684\u3002\u5728spring-web\u9879\u76EE\u4E2D\u53EF\u4EE5\u8868\u793A\u7528\u4E8E\u63A5\u6536\u8BF7\u6C42\u53C2\u6570\u7684Bean\u5BF9\u8C61\u3002</p></blockquote><p>\u5728DTO\u5B57\u6BB5\u4E0A\u58F0\u660E\u7EA6\u675F\u6CE8\u89E3</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@Data</span></span>
<span class="line"><span style="color:#A6ACCD;">public class UserDTO {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    private Long userId;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @NotNull</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Length(min = 2, max = 10)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String userName;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @NotNull</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Length(min = 6, max = 20)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String account;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @NotNull</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Length(min = 6, max = 20)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String password;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5728\u65B9\u6CD5\u53C2\u6570\u4E0A\u58F0\u660E\u6821\u9A8C\u6CE8\u89E3</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@PostMapping(&quot;/save&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public Result saveUser(@RequestBody @Validated UserDTO userDTO) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u6821\u9A8C\u901A\u8FC7\uFF0C\u624D\u4F1A\u6267\u884C\u4E1A\u52A1\u903B\u8F91\u5904\u7406</span></span>
<span class="line"><span style="color:#A6ACCD;">    return Result.ok();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u4F7F\u7528@Valid\u548C@Validated\u90FD\u53EF\u4EE5\u3002</p><h5 id="requestparam-pathvariable\u53C2\u6570\u6821\u9A8C" tabindex="-1">requestParam/PathVariable\u53C2\u6570\u6821\u9A8C <a class="header-anchor" href="#requestparam-pathvariable\u53C2\u6570\u6821\u9A8C" aria-hidden="true">#</a></h5><p>GET\u8BF7\u6C42\u4E00\u822C\u4F1A\u4F7F\u7528requestParam/PathVariable\u4F20\u53C2\u3002\u5982\u679C\u53C2\u6570\u6BD4\u8F83\u591A(\u6BD4\u5982\u8D85\u8FC76\u4E2A)\uFF0C\u8FD8\u662F\u63A8\u8350\u4F7F\u7528DTO\u5BF9\u8C61\u63A5\u6536\u3002</p><p>\u5426\u5219\uFF0C\u63A8\u8350\u5C06\u4E00\u4E2A\u4E2A\u53C2\u6570\u5E73\u94FA\u5230\u65B9\u6CD5\u5165\u53C2\u4E2D\u3002\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u5FC5\u987B\u5728Controller\u7C7B\u4E0A\u6807\u6CE8@Validated\u6CE8\u89E3\uFF0C\u5E76\u5728\u5165\u53C2\u4E0A\u58F0\u660E\u7EA6\u675F\u6CE8\u89E3(\u5982@Min\u7B49)\u3002\u5982\u679C\u6821\u9A8C\u5931\u8D25\uFF0C\u4F1A\u629B\u51FAConstraintViolationException\u5F02\u5E38\u3002</p><p>\u4EE3\u7801\u793A\u4F8B\u5982\u4E0B\uFF1A</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@RequestMapping(&quot;/api/user&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">@RestController</span></span>
<span class="line"><span style="color:#A6ACCD;">@Validated</span></span>
<span class="line"><span style="color:#A6ACCD;">public class UserController {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u8DEF\u5F84\u53D8\u91CF</span></span>
<span class="line"><span style="color:#A6ACCD;">    @GetMapping(&quot;{userId}&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public Result detail(@PathVariable(&quot;userId&quot;) @Min(10000000000000000L) Long userId) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // \u6821\u9A8C\u901A\u8FC7\uFF0C\u624D\u4F1A\u6267\u884C\u4E1A\u52A1\u903B\u8F91\u5904\u7406</span></span>
<span class="line"><span style="color:#A6ACCD;">        UserDTO userDTO = new UserDTO();</span></span>
<span class="line"><span style="color:#A6ACCD;">        userDTO.setUserId(userId);</span></span>
<span class="line"><span style="color:#A6ACCD;">        userDTO.setAccount(&quot;11111111111111111&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        userDTO.setUserName(&quot;xixi&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        userDTO.setAccount(&quot;11111111111111111&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return Result.ok(userDTO);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u67E5\u8BE2\u53C2\u6570</span></span>
<span class="line"><span style="color:#A6ACCD;">    @GetMapping(&quot;getByAccount&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    public Result getByAccount(@Length(min = 6, max = 20) @NotNull String  account) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // \u6821\u9A8C\u901A\u8FC7\uFF0C\u624D\u4F1A\u6267\u884C\u4E1A\u52A1\u903B\u8F91\u5904\u7406</span></span>
<span class="line"><span style="color:#A6ACCD;">        UserDTO userDTO = new UserDTO();</span></span>
<span class="line"><span style="color:#A6ACCD;">        userDTO.setUserId(10000000000000003L);</span></span>
<span class="line"><span style="color:#A6ACCD;">        userDTO.setAccount(account);</span></span>
<span class="line"><span style="color:#A6ACCD;">        userDTO.setUserName(&quot;xixi&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        userDTO.setAccount(&quot;11111111111111111&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        return Result.ok(userDTO);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h5 id="\u7EDF\u4E00\u5F02\u5E38\u5904\u7406" tabindex="-1">\u7EDF\u4E00\u5F02\u5E38\u5904\u7406 <a class="header-anchor" href="#\u7EDF\u4E00\u5F02\u5E38\u5904\u7406" aria-hidden="true">#</a></h5><p>\u524D\u9762\u8BF4\u8FC7\uFF0C\u5982\u679C\u6821\u9A8C\u5931\u8D25\uFF0C\u4F1A\u629B\u51FAMethodArgumentNotValidException\u6216\u8005ConstraintViolationException\u5F02\u5E38\u3002\u5728\u5B9E\u9645\u9879\u76EE\u5F00\u53D1\u4E2D\uFF0C\u901A\u5E38\u4F1A\u7528\u7EDF\u4E00\u5F02\u5E38\u5904\u7406\u6765\u8FD4\u56DE\u4E00\u4E2A\u66F4\u53CB\u597D\u7684\u63D0\u793A\u3002</p><p>\u6BD4\u5982\u6211\u4EEC\u7CFB\u7EDF\u8981\u6C42\u65E0\u8BBA\u53D1\u9001\u4EC0\u4E48\u5F02\u5E38\uFF0Chttp\u7684\u72B6\u6001\u7801\u5FC5\u987B\u8FD4\u56DE200\uFF0C\u7531\u4E1A\u52A1\u7801\u53BB\u533A\u5206\u7CFB\u7EDF\u7684\u5F02\u5E38\u60C5\u51B5\u3002</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@RestControllerAdvice</span></span>
<span class="line"><span style="color:#A6ACCD;">public class CommonExceptionHandler {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @ExceptionHandler({MethodArgumentNotValidException.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">    @ResponseStatus(HttpStatus.OK)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @ResponseBody</span></span>
<span class="line"><span style="color:#A6ACCD;">    public Result handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        BindingResult bindingResult = ex.getBindingResult();</span></span>
<span class="line"><span style="color:#A6ACCD;">        StringBuilder sb = new StringBuilder(&quot;\u6821\u9A8C\u5931\u8D25:&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        for (FieldError fieldError : bindingResult.getFieldErrors()) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            sb.append(fieldError.getField()).append(&quot;\uFF1A&quot;).append(fieldError.getDefaultMessage()).append(&quot;, &quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        String msg = sb.toString();</span></span>
<span class="line"><span style="color:#A6ACCD;">       return Result.fail(BusinessCode.\u53C2\u6570\u6821\u9A8C\u5931\u8D25, msg);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @ExceptionHandler({ConstraintViolationException.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">    @ResponseStatus(HttpStatus.OK)</span></span>
<span class="line"><span style="color:#A6ACCD;">    @ResponseBody</span></span>
<span class="line"><span style="color:#A6ACCD;">    public Result handleConstraintViolationException(ConstraintViolationException ex) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return Result.fail(BusinessCode.\u53C2\u6570\u6821\u9A8C\u5931\u8D25, ex.getMessage());</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h5 id="\u8FDB\u9636\u4F7F\u7528" tabindex="-1">\u8FDB\u9636\u4F7F\u7528 <a class="header-anchor" href="#\u8FDB\u9636\u4F7F\u7528" aria-hidden="true">#</a></h5><h6 id="\u5206\u7EC4\u6821\u9A8C" tabindex="-1">\u5206\u7EC4\u6821\u9A8C <a class="header-anchor" href="#\u5206\u7EC4\u6821\u9A8C" aria-hidden="true">#</a></h6><p>\u5728\u5B9E\u9645\u9879\u76EE\u4E2D\uFF0C\u53EF\u80FD\u591A\u4E2A\u65B9\u6CD5\u9700\u8981\u4F7F\u7528\u540C\u4E00\u4E2ADTO\u7C7B\u6765\u63A5\u6536\u53C2\u6570\uFF0C\u800C\u4E0D\u540C\u65B9\u6CD5\u7684\u6821\u9A8C\u89C4\u5219\u5F88\u53EF\u80FD\u662F\u4E0D\u4E00\u6837\u7684\u3002\u8FD9\u4E2A\u65F6\u5019\uFF0C\u7B80\u5355\u5730\u5728DTO\u7C7B\u7684\u5B57\u6BB5\u4E0A\u52A0\u7EA6\u675F\u6CE8\u89E3\u65E0\u6CD5\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\u3002\u56E0\u6B64\uFF0Cspring-validation\u652F\u6301\u4E86\u5206\u7EC4\u6821\u9A8C\u7684\u529F\u80FD\uFF0C\u4E13\u95E8\u7528\u6765\u89E3\u51B3\u8FD9\u7C7B\u95EE\u9898\u3002</p><p>\u8FD8\u662F\u4E0A\u9762\u7684\u4F8B\u5B50\uFF0C\u6BD4\u5982\u4FDD\u5B58User\u7684\u65F6\u5019\uFF0CUserId\u662F\u53EF\u7A7A\u7684\uFF0C\u4F46\u662F\u66F4\u65B0User\u7684\u65F6\u5019\uFF0CUserId\u7684\u503C\u5FC5\u987B&gt;=10000000000000000L\uFF1B\u5176\u5B83\u5B57\u6BB5\u7684\u6821\u9A8C\u89C4\u5219\u5728\u4E24\u79CD\u60C5\u51B5\u4E0B\u4E00\u6837\u3002\u8FD9\u4E2A\u65F6\u5019\u4F7F\u7528\u5206\u7EC4\u6821\u9A8C\u7684\u4EE3\u7801\u793A\u4F8B\u5982\u4E0B\uFF1A</p><p>\u7EA6\u675F\u6CE8\u89E3\u4E0A\u58F0\u660E\u9002\u7528\u7684\u5206\u7EC4\u4FE1\u606Fgroups</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@Data</span></span>
<span class="line"><span style="color:#A6ACCD;">public class UserDTO {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @Min(value = 10000000000000000L, groups = Update.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private Long userId;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Length(min = 2, max = 10, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String userName;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Length(min = 6, max = 20, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String account;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Length(min = 6, max = 20, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String password;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     * \u4FDD\u5B58\u7684\u65F6\u5019\u6821\u9A8C\u5206\u7EC4</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    public interface Save {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     * \u66F4\u65B0\u7684\u65F6\u5019\u6821\u9A8C\u5206\u7EC4</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    public interface Update {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>@Validated\u6CE8\u89E3\u4E0A\u6307\u5B9A\u6821\u9A8C\u5206\u7EC4</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@PostMapping(&quot;/save&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public Result saveUser(@RequestBody @Validated(UserDTO.Save.class) UserDTO userDTO) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u6821\u9A8C\u901A\u8FC7\uFF0C\u624D\u4F1A\u6267\u884C\u4E1A\u52A1\u903B\u8F91\u5904\u7406</span></span>
<span class="line"><span style="color:#A6ACCD;">    return Result.ok();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">@PostMapping(&quot;/update&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public Result updateUser(@RequestBody @Validated(UserDTO.Update.class) UserDTO userDTO) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u6821\u9A8C\u901A\u8FC7\uFF0C\u624D\u4F1A\u6267\u884C\u4E1A\u52A1\u903B\u8F91\u5904\u7406</span></span>
<span class="line"><span style="color:#A6ACCD;">    return Result.ok();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h6 id="\u5D4C\u5957\u6821\u9A8C" tabindex="-1">\u5D4C\u5957\u6821\u9A8C <a class="header-anchor" href="#\u5D4C\u5957\u6821\u9A8C" aria-hidden="true">#</a></h6><p>\u524D\u9762\u7684\u793A\u4F8B\u4E2D\uFF0CDTO\u7C7B\u91CC\u9762\u7684\u5B57\u6BB5\u90FD\u662F\u57FA\u672C\u6570\u636E\u7C7B\u578B\u548CString\u7C7B\u578B\u3002\u4F46\u662F\u5B9E\u9645\u573A\u666F\u4E2D\uFF0C\u6709\u53EF\u80FD\u67D0\u4E2A\u5B57\u6BB5\u4E5F\u662F\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u8FD9\u79CD\u60C5\u51B5\u5148\uFF0C\u53EF\u4EE5\u4F7F\u7528\u5D4C\u5957\u6821\u9A8C\u3002</p><p>\u6BD4\u5982\uFF0C\u4E0A\u9762\u4FDD\u5B58User\u4FE1\u606F\u7684\u65F6\u5019\u540C\u65F6\u8FD8\u5E26\u6709Job\u4FE1\u606F\u3002\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u6B64\u65F6DTO\u7C7B\u7684\u5BF9\u5E94\u5B57\u6BB5\u5FC5\u987B\u6807\u8BB0@Valid\u6CE8\u89E3\u3002</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@Data</span></span>
<span class="line"><span style="color:#A6ACCD;">public class UserDTO {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @Min(value = 10000000000000000L, groups = Update.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">    private Long userId;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Length(min = 2, max = 10, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String userName;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Length(min = 6, max = 20, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String account;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Length(min = 6, max = 20, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">    private String password;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Valid</span></span>
<span class="line"><span style="color:#A6ACCD;">    private Job job;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @Data</span></span>
<span class="line"><span style="color:#A6ACCD;">    public static class Job {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        @Min(value = 1, groups = Update.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">        private Long jobId;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">        @Length(min = 2, max = 10, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">        private String jobName;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">        @Length(min = 2, max = 10, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">        private String position;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     * \u4FDD\u5B58\u7684\u65F6\u5019\u6821\u9A8C\u5206\u7EC4</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    public interface Save {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    /**</span></span>
<span class="line"><span style="color:#A6ACCD;">     * \u66F4\u65B0\u7684\u65F6\u5019\u6821\u9A8C\u5206\u7EC4</span></span>
<span class="line"><span style="color:#A6ACCD;">     */</span></span>
<span class="line"><span style="color:#A6ACCD;">    public interface Update {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5D4C\u5957\u6821\u9A8C\u7ED3\u5408\u5206\u7EC4\u6821\u9A8C\u4E00\u8D77\u4F7F\u7528\u3002\u8FD8\u6709\u5C31\u662F\u5D4C\u5957\u96C6\u5408\u6821\u9A8C\u4F1A\u5BF9\u96C6\u5408\u91CC\u9762\u7684\u6BCF\u4E00\u9879\u90FD\u8FDB\u884C\u6821\u9A8C\uFF0C\u4F8B\u5982<code>List&lt;Job&gt;</code>\u5B57\u6BB5\u4F1A\u5BF9\u8FD9\u4E2Alist\u91CC\u9762\u7684\u6BCF\u4E00\u4E2AJob\u5BF9\u8C61\u90FD\u8FDB\u884C\u6821\u9A8C</p><h6 id="\u96C6\u5408\u6821\u9A8C" tabindex="-1">\u96C6\u5408\u6821\u9A8C <a class="header-anchor" href="#\u96C6\u5408\u6821\u9A8C" aria-hidden="true">#</a></h6><p>\u5982\u679C\u8BF7\u6C42\u4F53\u76F4\u63A5\u4F20\u9012\u4E86json\u6570\u7EC4\u7ED9\u540E\u53F0\uFF0C\u5E76\u5E0C\u671B\u5BF9\u6570\u7EC4\u4E2D\u7684\u6BCF\u4E00\u9879\u90FD\u8FDB\u884C\u53C2\u6570\u6821\u9A8C\u3002\u6B64\u65F6\uFF0C\u5982\u679C\u6211\u4EEC\u76F4\u63A5\u4F7F\u7528java.util.Collection\u4E0B\u7684list\u6216\u8005set\u6765\u63A5\u6536\u6570\u636E\uFF0C\u53C2\u6570\u6821\u9A8C\u5E76\u4E0D\u4F1A\u751F\u6548\uFF01\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528\u81EA\u5B9A\u4E49list\u96C6\u5408\u6765\u63A5\u6536\u53C2\u6570\uFF1A</p><p>\u5305\u88C5List\u7C7B\u578B\uFF0C\u5E76\u58F0\u660E@Valid\u6CE8\u89E3</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">public class ValidationList&lt;E&gt; implements List&lt;E&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @Delegate // @Delegate\u662Flombok\u6CE8\u89E3</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Valid // \u4E00\u5B9A\u8981\u52A0@Valid\u6CE8\u89E3</span></span>
<span class="line"><span style="color:#A6ACCD;">    public List&lt;E&gt; list = new ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u4E00\u5B9A\u8981\u8BB0\u5F97\u91CD\u5199toString\u65B9\u6CD5</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public String toString() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return list.toString();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>@Delegate\u6CE8\u89E3\u53D7lombok\u7248\u672C\u9650\u5236\uFF0C1.18.6\u4EE5\u4E0A\u7248\u672C\u53EF\u652F\u6301\u3002\u5982\u679C\u6821\u9A8C\u4E0D\u901A\u8FC7\uFF0C\u4F1A\u629B\u51FANotReadablePropertyException\uFF0C\u540C\u6837\u53EF\u4EE5\u4F7F\u7528\u7EDF\u4E00\u5F02\u5E38\u8FDB\u884C\u5904\u7406\u3002</p><p>\u6BD4\u5982\uFF0C\u6211\u4EEC\u9700\u8981\u4E00\u6B21\u6027\u4FDD\u5B58\u591A\u4E2AUser\u5BF9\u8C61\uFF0CController\u5C42\u7684\u65B9\u6CD5\u53EF\u4EE5\u8FD9\u4E48\u5199\uFF1A</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@PostMapping(&quot;/saveList&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public Result saveList(@RequestBody @Validated(UserDTO.Save.class) ValidationList&lt;UserDTO&gt; userList) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u6821\u9A8C\u901A\u8FC7\uFF0C\u624D\u4F1A\u6267\u884C\u4E1A\u52A1\u903B\u8F91\u5904\u7406</span></span>
<span class="line"><span style="color:#A6ACCD;">    return Result.ok();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h6 id="\u81EA\u5B9A\u4E49\u6821\u9A8C" tabindex="-1">\u81EA\u5B9A\u4E49\u6821\u9A8C <a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u6821\u9A8C" aria-hidden="true">#</a></h6><p>\u4E1A\u52A1\u9700\u6C42\u603B\u662F\u6BD4\u6846\u67B6\u63D0\u4F9B\u7684\u8FD9\u4E9B\u7B80\u5355\u6821\u9A8C\u8981\u590D\u6742\u7684\u591A\uFF0C\u6211\u4EEC\u53EF\u4EE5\u81EA\u5B9A\u4E49\u6821\u9A8C\u6765\u6EE1\u8DB3\u6211\u4EEC\u7684\u9700\u6C42\u3002</p><p>\u81EA\u5B9A\u4E49spring validation\u975E\u5E38\u7B80\u5355\uFF0C\u5047\u8BBE\u6211\u4EEC\u81EA\u5B9A\u4E49\u52A0\u5BC6id\uFF08\u7531\u6570\u5B57\u6216\u8005a-f\u7684\u5B57\u6BCD\u7EC4\u6210\uFF0C32-256\u957F\u5EA6\uFF09\u6821\u9A8C\uFF0C\u4E3B\u8981\u5206\u4E3A\u4E24\u6B65\uFF1A</p><p>\u81EA\u5B9A\u4E49\u7EA6\u675F\u6CE8\u89E3</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER})</span></span>
<span class="line"><span style="color:#A6ACCD;">@Retention(RUNTIME)</span></span>
<span class="line"><span style="color:#A6ACCD;">@Documented</span></span>
<span class="line"><span style="color:#A6ACCD;">@Constraint(validatedBy = {EncryptIdValidator.class})</span></span>
<span class="line"><span style="color:#A6ACCD;">public @interface EncryptId {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u9ED8\u8BA4\u9519\u8BEF\u6D88\u606F</span></span>
<span class="line"><span style="color:#A6ACCD;">    String message() default &quot;\u52A0\u5BC6id\u683C\u5F0F\u9519\u8BEF&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u5206\u7EC4</span></span>
<span class="line"><span style="color:#A6ACCD;">    Class&lt;?&gt;[] groups() default {};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u8D1F\u8F7D</span></span>
<span class="line"><span style="color:#A6ACCD;">    Class&lt;? extends Payload&gt;[] payload() default {};</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u5B9E\u73B0ConstraintValidator\u63A5\u53E3\u7F16\u5199\u7EA6\u675F\u6821\u9A8C\u5668</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">public class EncryptIdValidator implements ConstraintValidator&lt;EncryptId, String&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    private static final Pattern PATTERN = Pattern.compile(&quot;^[a-f\\\\d]{32,256}$&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public boolean isValid(String value, ConstraintValidatorContext context) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // \u4E0D\u4E3Anull\u624D\u8FDB\u884C\u6821\u9A8C</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (value != null) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            Matcher matcher = PATTERN.matcher(value);</span></span>
<span class="line"><span style="color:#A6ACCD;">            return matcher.find();</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        return true;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u8FD9\u6837\u6211\u4EEC\u5C31\u53EF\u4EE5\u4F7F\u7528@EncryptId\u8FDB\u884C\u53C2\u6570\u6821\u9A8C\u4E86\uFF01</p><h6 id="\u7F16\u7A0B\u5F0F\u6821\u9A8C" tabindex="-1">\u7F16\u7A0B\u5F0F\u6821\u9A8C <a class="header-anchor" href="#\u7F16\u7A0B\u5F0F\u6821\u9A8C" aria-hidden="true">#</a></h6><p>\u4E0A\u9762\u7684\u793A\u4F8B\u90FD\u662F\u57FA\u4E8E\u6CE8\u89E3\u6765\u5B9E\u73B0\u81EA\u52A8\u6821\u9A8C\u7684\uFF0C\u5728\u67D0\u4E9B\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u53EF\u80FD\u5E0C\u671B\u4EE5\u7F16\u7A0B\u65B9\u5F0F\u8C03\u7528\u9A8C\u8BC1\u3002\u8FD9\u4E2A\u65F6\u5019\u53EF\u4EE5\u6CE8\u5165javax.validation.Validator\u5BF9\u8C61\uFF0C\u7136\u540E\u518D\u8C03\u7528\u5176api\u3002</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@Autowired</span></span>
<span class="line"><span style="color:#A6ACCD;">private javax.validation.Validator globalValidator;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// \u7F16\u7A0B\u5F0F\u6821\u9A8C</span></span>
<span class="line"><span style="color:#A6ACCD;">@PostMapping(&quot;/saveWithCodingValidate&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">public Result saveWithCodingValidate(@RequestBody UserDTO userDTO) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    Set&lt;ConstraintViolation&lt;UserDTO&gt;&gt; validate = globalValidator.validate(userDTO, UserDTO.Save.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u5982\u679C\u6821\u9A8C\u901A\u8FC7\uFF0Cvalidate\u4E3A\u7A7A\uFF1B\u5426\u5219\uFF0Cvalidate\u5305\u542B\u672A\u6821\u9A8C\u901A\u8FC7\u9879</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (validate.isEmpty()) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // \u6821\u9A8C\u901A\u8FC7\uFF0C\u624D\u4F1A\u6267\u884C\u4E1A\u52A1\u903B\u8F91\u5904\u7406</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    } else {</span></span>
<span class="line"><span style="color:#A6ACCD;">        for (ConstraintViolation&lt;UserDTO&gt; userDTOConstraintViolation : validate) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            // \u6821\u9A8C\u5931\u8D25\uFF0C\u505A\u5176\u5B83\u903B\u8F91</span></span>
<span class="line"><span style="color:#A6ACCD;">            System.out.println(userDTOConstraintViolation);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    return Result.ok();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h6 id="\u5FEB\u901F\u5931\u8D25-fail-fast" tabindex="-1">\u5FEB\u901F\u5931\u8D25(Fail Fast) <a class="header-anchor" href="#\u5FEB\u901F\u5931\u8D25-fail-fast" aria-hidden="true">#</a></h6><p>Spring Validation\u9ED8\u8BA4\u4F1A\u6821\u9A8C\u5B8C\u6240\u6709\u5B57\u6BB5\uFF0C\u7136\u540E\u624D\u629B\u51FA\u5F02\u5E38\u3002\u53EF\u4EE5\u901A\u8FC7\u4E00\u4E9B\u7B80\u5355\u7684\u914D\u7F6E\uFF0C\u5F00\u542FFali Fast\u6A21\u5F0F\uFF0C\u4E00\u65E6\u6821\u9A8C\u5931\u8D25\u5C31\u7ACB\u5373\u8FD4\u56DE\u3002</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@Bean</span></span>
<span class="line"><span style="color:#A6ACCD;">public Validator validator() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    ValidatorFactory validatorFactory = Validation.byProvider(HibernateValidator.class)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .configure()</span></span>
<span class="line"><span style="color:#A6ACCD;">            // \u5FEB\u901F\u5931\u8D25\u6A21\u5F0F</span></span>
<span class="line"><span style="color:#A6ACCD;">            .failFast(true)</span></span>
<span class="line"><span style="color:#A6ACCD;">            .buildValidatorFactory();</span></span>
<span class="line"><span style="color:#A6ACCD;">    return validatorFactory.getValidator();</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h5 id="\u5B9E\u73B0\u539F\u7406" tabindex="-1">\u5B9E\u73B0\u539F\u7406 <a class="header-anchor" href="#\u5B9E\u73B0\u539F\u7406" aria-hidden="true">#</a></h5><h6 id="requestbody\u53C2\u6570\u6821\u9A8C\u5B9E\u73B0\u539F\u7406" tabindex="-1">requestBody\u53C2\u6570\u6821\u9A8C\u5B9E\u73B0\u539F\u7406 <a class="header-anchor" href="#requestbody\u53C2\u6570\u6821\u9A8C\u5B9E\u73B0\u539F\u7406" aria-hidden="true">#</a></h6><p>\u5728spring-mvc\u4E2D\uFF0CRequestResponseBodyMethodProcessor\u662F\u7528\u4E8E\u89E3\u6790@RequestBody\u6807\u6CE8\u7684\u53C2\u6570\u4EE5\u53CA\u5904\u7406@ResponseBody\u6807\u6CE8\u65B9\u6CD5\u7684\u8FD4\u56DE\u503C\u7684\u3002\u663E\u7136\uFF0C\u6267\u884C\u53C2\u6570\u6821\u9A8C\u7684\u903B\u8F91\u80AF\u5B9A\u5C31\u5728\u89E3\u6790\u53C2\u6570\u7684\u65B9\u6CD5resolveArgument()\u4E2D\uFF1A</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">public class RequestResponseBodyMethodProcessor extends AbstractMessageConverterMethodProcessor {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public Object resolveArgument(MethodParameter parameter, @Nullable ModelAndViewContainer mavContainer,</span></span>
<span class="line"><span style="color:#A6ACCD;">                                  NativeWebRequest webRequest, @Nullable WebDataBinderFactory binderFactory) throws Exception {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        parameter = parameter.nestedIfOptional();</span></span>
<span class="line"><span style="color:#A6ACCD;">        //\u5C06\u8BF7\u6C42\u6570\u636E\u5C01\u88C5\u5230DTO\u5BF9\u8C61\u4E2D</span></span>
<span class="line"><span style="color:#A6ACCD;">        Object arg = readWithMessageConverters(webRequest, parameter, parameter.getNestedGenericParameterType());</span></span>
<span class="line"><span style="color:#A6ACCD;">        String name = Conventions.getVariableNameForParameter(parameter);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        if (binderFactory != null) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            WebDataBinder binder = binderFactory.createBinder(webRequest, arg, name);</span></span>
<span class="line"><span style="color:#A6ACCD;">            if (arg != null) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                // \u6267\u884C\u6570\u636E\u6821\u9A8C</span></span>
<span class="line"><span style="color:#A6ACCD;">                validateIfApplicable(binder, parameter);</span></span>
<span class="line"><span style="color:#A6ACCD;">                if (binder.getBindingResult().hasErrors() &amp;&amp; isBindExceptionRequired(binder, parameter)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    throw new MethodArgumentNotValidException(parameter, binder.getBindingResult());</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">            if (mavContainer != null) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                mavContainer.addAttribute(BindingResult.MODEL_KEY_PREFIX + name, binder.getBindingResult());</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        return adaptArgumentIfNecessary(arg, parameter);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u53EF\u4EE5\u770B\u5230\uFF0CresolveArgument()\u8C03\u7528\u4E86validateIfApplicable()\u8FDB\u884C\u53C2\u6570\u6821\u9A8C\u3002</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">protected void validateIfApplicable(WebDataBinder binder, MethodParameter parameter) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // \u83B7\u53D6\u53C2\u6570\u6CE8\u89E3\uFF0C\u6BD4\u5982@RequestBody\u3001@Valid\u3001@Validated</span></span>
<span class="line"><span style="color:#A6ACCD;">    Annotation[] annotations = parameter.getParameterAnnotations();</span></span>
<span class="line"><span style="color:#A6ACCD;">    for (Annotation ann : annotations) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        // \u5148\u5C1D\u8BD5\u83B7\u53D6@Validated\u6CE8\u89E3</span></span>
<span class="line"><span style="color:#A6ACCD;">        Validated validatedAnn = AnnotationUtils.getAnnotation(ann, Validated.class);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //\u5982\u679C\u76F4\u63A5\u6807\u6CE8\u4E86@Validated\uFF0C\u90A3\u4E48\u76F4\u63A5\u5F00\u542F\u6821\u9A8C\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">        //\u5982\u679C\u6CA1\u6709\uFF0C\u90A3\u4E48\u5224\u65AD\u53C2\u6570\u524D\u662F\u5426\u6709Valid\u8D77\u5934\u7684\u6CE8\u89E3\u3002</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (validatedAnn != null || ann.annotationType().getSimpleName().startsWith(&quot;Valid&quot;)) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            Object hints = (validatedAnn != null ? validatedAnn.value() : AnnotationUtils.getValue(ann));</span></span>
<span class="line"><span style="color:#A6ACCD;">            Object[] validationHints = (hints instanceof Object[] ? (Object[]) hints : new Object[] {hints});</span></span>
<span class="line"><span style="color:#A6ACCD;">            //\u6267\u884C\u6821\u9A8C</span></span>
<span class="line"><span style="color:#A6ACCD;">            binder.validate(validationHints);</span></span>
<span class="line"><span style="color:#A6ACCD;">            break;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u770B\u5230\u8FD9\u91CC\uFF0C\u5927\u5BB6\u5E94\u8BE5\u80FD\u660E\u767D\u4E3A\u4EC0\u4E48\u8FD9\u79CD\u573A\u666F\u4E0B@Validated\u3001@Valid\u4E24\u4E2A\u6CE8\u89E3\u53EF\u4EE5\u6DF7\u7528\u3002\u6211\u4EEC\u63A5\u4E0B\u6765\u7EE7\u7EED\u770BWebDataBinder.validate()\u5B9E\u73B0\u3002</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">@Override</span></span>
<span class="line"><span style="color:#A6ACCD;">public void validate(Object target, Errors errors, Object... validationHints) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if (this.targetValidator != null) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        processConstraintViolations(</span></span>
<span class="line"><span style="color:#A6ACCD;">            //\u6B64\u5904\u8C03\u7528Hibernate Validator\u6267\u884C\u771F\u6B63\u7684\u6821\u9A8C</span></span>
<span class="line"><span style="color:#A6ACCD;">            this.targetValidator.validate(target, asValidationGroups(validationHints)), errors);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u6700\u7EC8\u53D1\u73B0\u5E95\u5C42\u6700\u7EC8\u8FD8\u662F\u8C03\u7528\u4E86Hibernate Validator\u8FDB\u884C\u771F\u6B63\u7684\u6821\u9A8C\u5904\u7406\u3002</p><h6 id="\u65B9\u6CD5\u7EA7\u522B\u7684\u53C2\u6570\u6821\u9A8C\u5B9E\u73B0\u539F\u7406" tabindex="-1">\u65B9\u6CD5\u7EA7\u522B\u7684\u53C2\u6570\u6821\u9A8C\u5B9E\u73B0\u539F\u7406 <a class="header-anchor" href="#\u65B9\u6CD5\u7EA7\u522B\u7684\u53C2\u6570\u6821\u9A8C\u5B9E\u73B0\u539F\u7406" aria-hidden="true">#</a></h6><p>\u4E0A\u9762\u63D0\u5230\u7684\u5C06\u53C2\u6570\u4E00\u4E2A\u4E2A\u5E73\u94FA\u5230\u65B9\u6CD5\u53C2\u6570\u4E2D\uFF0C\u7136\u540E\u5728\u6BCF\u4E2A\u53C2\u6570\u524D\u9762\u58F0\u660E\u7EA6\u675F\u6CE8\u89E3\u7684\u6821\u9A8C\u65B9\u5F0F\uFF0C\u5C31\u662F\u65B9\u6CD5\u7EA7\u522B\u7684\u53C2\u6570\u6821\u9A8C\u3002</p><p>\u5B9E\u9645\u4E0A\uFF0C\u8FD9\u79CD\u65B9\u5F0F\u53EF\u7528\u4E8E\u4EFB\u4F55Spring Bean\u7684\u65B9\u6CD5\u4E0A\uFF0C\u6BD4\u5982Controller/Service\u7B49\u3002\u5176\u5E95\u5C42\u5B9E\u73B0\u539F\u7406\u5C31\u662FAOP\uFF0C\u5177\u4F53\u6765\u8BF4\u662F\u901A\u8FC7MethodValidationPostProcessor\u52A8\u6001\u6CE8\u518CAOP\u5207\u9762\uFF0C\u7136\u540E\u4F7F\u7528MethodValidationInterceptor\u5BF9\u5207\u70B9\u65B9\u6CD5\u7EC7\u5165\u589E\u5F3A\u3002</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">public class MethodValidationPostProcessor extends AbstractBeanFactoryAwareAdvisingPostProcessorimplements InitializingBean {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public void afterPropertiesSet() {</span></span>
<span class="line"><span style="color:#A6ACCD;">        //\u4E3A\u6240\u6709\`@Validated\`\u6807\u6CE8\u7684Bean\u521B\u5EFA\u5207\u9762</span></span>
<span class="line"><span style="color:#A6ACCD;">        Pointcut pointcut = new AnnotationMatchingPointcut(this.validatedAnnotationType, true);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //\u521B\u5EFAAdvisor\u8FDB\u884C\u589E\u5F3A</span></span>
<span class="line"><span style="color:#A6ACCD;">        this.advisor = new DefaultPointcutAdvisor(pointcut, createMethodValidationAdvice(this.validator));</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    //\u521B\u5EFAAdvice\uFF0C\u672C\u8D28\u5C31\u662F\u4E00\u4E2A\u65B9\u6CD5\u62E6\u622A\u5668</span></span>
<span class="line"><span style="color:#A6ACCD;">    protected Advice createMethodValidationAdvice(@Nullable Validator validator) {</span></span>
<span class="line"><span style="color:#A6ACCD;">        return (validator != null ? new MethodValidationInterceptor(validator) : new MethodValidationInterceptor());</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>\u63A5\u7740\u770B\u4E00\u4E0BMethodValidationInterceptor\uFF1A</p><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">public class MethodValidationInterceptor implements MethodInterceptor {</span></span>
<span class="line"><span style="color:#A6ACCD;">    @Override</span></span>
<span class="line"><span style="color:#A6ACCD;">    public Object invoke(MethodInvocation invocation) throws Throwable {</span></span>
<span class="line"><span style="color:#A6ACCD;">        //\u65E0\u9700\u589E\u5F3A\u7684\u65B9\u6CD5\uFF0C\u76F4\u63A5\u8DF3\u8FC7</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (isFactoryBeanMetadataMethod(invocation.getMethod())) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            return invocation.proceed();</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        //\u83B7\u53D6\u5206\u7EC4\u4FE1\u606F</span></span>
<span class="line"><span style="color:#A6ACCD;">        Class&lt;?&gt;[] groups = determineValidationGroups(invocation);</span></span>
<span class="line"><span style="color:#A6ACCD;">        ExecutableValidator execVal = this.validator.forExecutables();</span></span>
<span class="line"><span style="color:#A6ACCD;">        Method methodToValidate = invocation.getMethod();</span></span>
<span class="line"><span style="color:#A6ACCD;">        Set&lt;ConstraintViolation&lt;Object&gt;&gt; result;</span></span>
<span class="line"><span style="color:#A6ACCD;">        try {</span></span>
<span class="line"><span style="color:#A6ACCD;">            //\u65B9\u6CD5\u5165\u53C2\u6821\u9A8C\uFF0C\u6700\u7EC8\u8FD8\u662F\u59D4\u6258\u7ED9Hibernate Validator\u6765\u6821\u9A8C</span></span>
<span class="line"><span style="color:#A6ACCD;">            result = execVal.validateParameters(</span></span>
<span class="line"><span style="color:#A6ACCD;">                invocation.getThis(), methodToValidate, invocation.getArguments(), groups);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        catch (IllegalArgumentException ex) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            ...</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        //\u6709\u5F02\u5E38\u76F4\u63A5\u629B\u51FA</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (!result.isEmpty()) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            throw new ConstraintViolationException(result);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        //\u771F\u6B63\u7684\u65B9\u6CD5\u8C03\u7528</span></span>
<span class="line"><span style="color:#A6ACCD;">        Object returnValue = invocation.proceed();</span></span>
<span class="line"><span style="color:#A6ACCD;">        //\u5BF9\u8FD4\u56DE\u503C\u505A\u6821\u9A8C\uFF0C\u6700\u7EC8\u8FD8\u662F\u59D4\u6258\u7ED9Hibernate Validator\u6765\u6821\u9A8C</span></span>
<span class="line"><span style="color:#A6ACCD;">        result = execVal.validateReturnValue(invocation.getThis(), methodToValidate, returnValue, groups);</span></span>
<span class="line"><span style="color:#A6ACCD;">        //\u6709\u5F02\u5E38\u76F4\u63A5\u629B\u51FA</span></span>
<span class="line"><span style="color:#A6ACCD;">        if (!result.isEmpty()) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            throw new ConstraintViolationException(result);</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        return returnValue;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,87),o=[e];function t(c,i,r,A,C,d){return a(),n("div",null,o)}const u=s(p,[["render",t]]);export{D as __pageData,u as default};
