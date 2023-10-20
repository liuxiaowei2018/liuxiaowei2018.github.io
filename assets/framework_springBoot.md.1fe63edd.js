import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8048b864.js";const p="/assets/image-20230112164305474.87f3f051.png",e="/assets/image-20230112164654112.105ffaac.png",o="/assets/image-20230112164923407.f5db8b0f.png",t="/assets/image-20230112164940576.27f04feb.png",c="/assets/image-20230112165023728.b79e40d2.png",r="/assets/image-20230112165110441.a1197091.png",i="/assets/image-20230110115113929.297d393f.png",m=JSON.parse('{"title":"SpringBoot","description":"","frontmatter":{},"headers":[],"relativePath":"framework/springBoot.md","filePath":"framework/springBoot.md","lastUpdated":1697785485000}'),y={name:"framework/springBoot.md"},E=l(`<h1 id="springboot" tabindex="-1">SpringBoot <a class="header-anchor" href="#springboot" aria-label="Permalink to &quot;SpringBoot&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#_1、springboot应用">1、SpringBoot应用</a></li><li><a href="#_2、springboot扩展">2、SpringBoot扩展</a><ul><li><a href="#springboot自动装配原理">SpringBoot自动装配原理</a></li><li><a href="#spring-boot启动流程">Spring Boot启动流程</a></li><li><a href="#springboot注解">SpringBoot注解</a></li><li><a href="#springboot配置文件">SpringBoot配置文件</a></li></ul></li></ul></nav><h2 id="_1、springboot应用" tabindex="-1">1、SpringBoot应用 <a class="header-anchor" href="#_1、springboot应用" aria-label="Permalink to &quot;1、SpringBoot应用&quot;">​</a></h2><h4 id="springboot-参数校验" tabindex="-1">SpringBoot 参数校验 <a class="header-anchor" href="#springboot-参数校验" aria-label="Permalink to &quot;SpringBoot 参数校验&quot;">​</a></h4><h5 id="版本依赖" tabindex="-1">版本依赖 <a class="header-anchor" href="#版本依赖" aria-label="Permalink to &quot;版本依赖&quot;">​</a></h5><p>如果spring-boot版本小于2.3.x，spring-boot-starter-web会自动传入hibernate-validator依赖</p><p>如果spring-boot版本大于2.3.x，则需要手动引入依赖：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.hibernate&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;hibernate-validator&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;6.0.1.Final&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.hibernate&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;hibernate-validator&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;6.0.1.Final&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>对于web服务来说，为防止非法参数对业务造成影响，Controller层要做参数校验</p><p>大部分情况下，请求参数分为如下两种形式：</p><ul><li>POST、PUT请求，使用requestBody传递参数；</li><li>GET请求，使用requestParam/PathVariable传递参数。</li></ul><h5 id="requestbody参数校验" tabindex="-1">requestBody参数校验 <a class="header-anchor" href="#requestbody参数校验" aria-label="Permalink to &quot;requestBody参数校验&quot;">​</a></h5><p>POST、PUT请求一般会使用requestBody传递参数，这种情况下，后端使用DTO对象进行接收。只要给DTO对象加上@Validated注解就能实现自动参数校验。比如，有一个保存User的接口，要求userName长度是2-10，account和password字段长度是6-20。</p><p>如果校验失败，会抛出MethodArgumentNotValidException异常，Spring默认会将其转为400（Bad Request）请求。</p><blockquote><p>DTO表示数据传输对象（Data Transfer Object），用于服务器和客户端之间交互传输使用的。在spring-web项目中可以表示用于接收请求参数的Bean对象。</p></blockquote><p>在DTO字段上声明约束注解</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">@Data</span></span>
<span class="line"><span style="color:#e1e4e8;">public class UserDTO {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    private Long userId;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @NotNull</span></span>
<span class="line"><span style="color:#e1e4e8;">    @Length(min = 2, max = 10)</span></span>
<span class="line"><span style="color:#e1e4e8;">    private String userName;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @NotNull</span></span>
<span class="line"><span style="color:#e1e4e8;">    @Length(min = 6, max = 20)</span></span>
<span class="line"><span style="color:#e1e4e8;">    private String account;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @NotNull</span></span>
<span class="line"><span style="color:#e1e4e8;">    @Length(min = 6, max = 20)</span></span>
<span class="line"><span style="color:#e1e4e8;">    private String password;</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">@Data</span></span>
<span class="line"><span style="color:#24292e;">public class UserDTO {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    private Long userId;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @NotNull</span></span>
<span class="line"><span style="color:#24292e;">    @Length(min = 2, max = 10)</span></span>
<span class="line"><span style="color:#24292e;">    private String userName;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @NotNull</span></span>
<span class="line"><span style="color:#24292e;">    @Length(min = 6, max = 20)</span></span>
<span class="line"><span style="color:#24292e;">    private String account;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @NotNull</span></span>
<span class="line"><span style="color:#24292e;">    @Length(min = 6, max = 20)</span></span>
<span class="line"><span style="color:#24292e;">    private String password;</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>在方法参数上声明校验注解</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">@PostMapping(&quot;/save&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">public Result saveUser(@RequestBody @Validated UserDTO userDTO) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 校验通过，才会执行业务逻辑处理</span></span>
<span class="line"><span style="color:#e1e4e8;">    return Result.ok();</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">@PostMapping(&quot;/save&quot;)</span></span>
<span class="line"><span style="color:#24292e;">public Result saveUser(@RequestBody @Validated UserDTO userDTO) {</span></span>
<span class="line"><span style="color:#24292e;">    // 校验通过，才会执行业务逻辑处理</span></span>
<span class="line"><span style="color:#24292e;">    return Result.ok();</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>这种情况下，使用@Valid和@Validated都可以。</p><h5 id="requestparam-pathvariable参数校验" tabindex="-1">requestParam/PathVariable参数校验 <a class="header-anchor" href="#requestparam-pathvariable参数校验" aria-label="Permalink to &quot;requestParam/PathVariable参数校验&quot;">​</a></h5><p>GET请求一般会使用requestParam/PathVariable传参。如果参数比较多(比如超过6个)，还是推荐使用DTO对象接收。</p><p>否则，推荐将一个个参数平铺到方法入参中。在这种情况下，必须在Controller类上标注@Validated注解，并在入参上声明约束注解(如@Min等)。如果校验失败，会抛出ConstraintViolationException异常。</p><p>代码示例如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">@RequestMapping(&quot;/api/user&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">@RestController</span></span>
<span class="line"><span style="color:#e1e4e8;">@Validated</span></span>
<span class="line"><span style="color:#e1e4e8;">public class UserController {</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 路径变量</span></span>
<span class="line"><span style="color:#e1e4e8;">    @GetMapping(&quot;{userId}&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    public Result detail(@PathVariable(&quot;userId&quot;) @Min(10000000000000000L) Long userId) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        // 校验通过，才会执行业务逻辑处理</span></span>
<span class="line"><span style="color:#e1e4e8;">        UserDTO userDTO = new UserDTO();</span></span>
<span class="line"><span style="color:#e1e4e8;">        userDTO.setUserId(userId);</span></span>
<span class="line"><span style="color:#e1e4e8;">        userDTO.setAccount(&quot;11111111111111111&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;">        userDTO.setUserName(&quot;xixi&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;">        userDTO.setAccount(&quot;11111111111111111&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;">        return Result.ok(userDTO);</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    // 查询参数</span></span>
<span class="line"><span style="color:#e1e4e8;">    @GetMapping(&quot;getByAccount&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    public Result getByAccount(@Length(min = 6, max = 20) @NotNull String  account) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        // 校验通过，才会执行业务逻辑处理</span></span>
<span class="line"><span style="color:#e1e4e8;">        UserDTO userDTO = new UserDTO();</span></span>
<span class="line"><span style="color:#e1e4e8;">        userDTO.setUserId(10000000000000003L);</span></span>
<span class="line"><span style="color:#e1e4e8;">        userDTO.setAccount(account);</span></span>
<span class="line"><span style="color:#e1e4e8;">        userDTO.setUserName(&quot;xixi&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;">        userDTO.setAccount(&quot;11111111111111111&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;">        return Result.ok(userDTO);</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">@RequestMapping(&quot;/api/user&quot;)</span></span>
<span class="line"><span style="color:#24292e;">@RestController</span></span>
<span class="line"><span style="color:#24292e;">@Validated</span></span>
<span class="line"><span style="color:#24292e;">public class UserController {</span></span>
<span class="line"><span style="color:#24292e;">    // 路径变量</span></span>
<span class="line"><span style="color:#24292e;">    @GetMapping(&quot;{userId}&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    public Result detail(@PathVariable(&quot;userId&quot;) @Min(10000000000000000L) Long userId) {</span></span>
<span class="line"><span style="color:#24292e;">        // 校验通过，才会执行业务逻辑处理</span></span>
<span class="line"><span style="color:#24292e;">        UserDTO userDTO = new UserDTO();</span></span>
<span class="line"><span style="color:#24292e;">        userDTO.setUserId(userId);</span></span>
<span class="line"><span style="color:#24292e;">        userDTO.setAccount(&quot;11111111111111111&quot;);</span></span>
<span class="line"><span style="color:#24292e;">        userDTO.setUserName(&quot;xixi&quot;);</span></span>
<span class="line"><span style="color:#24292e;">        userDTO.setAccount(&quot;11111111111111111&quot;);</span></span>
<span class="line"><span style="color:#24292e;">        return Result.ok(userDTO);</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    // 查询参数</span></span>
<span class="line"><span style="color:#24292e;">    @GetMapping(&quot;getByAccount&quot;)</span></span>
<span class="line"><span style="color:#24292e;">    public Result getByAccount(@Length(min = 6, max = 20) @NotNull String  account) {</span></span>
<span class="line"><span style="color:#24292e;">        // 校验通过，才会执行业务逻辑处理</span></span>
<span class="line"><span style="color:#24292e;">        UserDTO userDTO = new UserDTO();</span></span>
<span class="line"><span style="color:#24292e;">        userDTO.setUserId(10000000000000003L);</span></span>
<span class="line"><span style="color:#24292e;">        userDTO.setAccount(account);</span></span>
<span class="line"><span style="color:#24292e;">        userDTO.setUserName(&quot;xixi&quot;);</span></span>
<span class="line"><span style="color:#24292e;">        userDTO.setAccount(&quot;11111111111111111&quot;);</span></span>
<span class="line"><span style="color:#24292e;">        return Result.ok(userDTO);</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h5 id="统一异常处理" tabindex="-1">统一异常处理 <a class="header-anchor" href="#统一异常处理" aria-label="Permalink to &quot;统一异常处理&quot;">​</a></h5><p>前面说过，如果校验失败，会抛出MethodArgumentNotValidException或者ConstraintViolationException异常。在实际项目开发中，通常会用统一异常处理来返回一个更友好的提示。</p><p>比如我们系统要求无论发送什么异常，http的状态码必须返回200，由业务码去区分系统的异常情况。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">@RestControllerAdvice</span></span>
<span class="line"><span style="color:#e1e4e8;">public class CommonExceptionHandler {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @ExceptionHandler({MethodArgumentNotValidException.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">    @ResponseStatus(HttpStatus.OK)</span></span>
<span class="line"><span style="color:#e1e4e8;">    @ResponseBody</span></span>
<span class="line"><span style="color:#e1e4e8;">    public Result handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        BindingResult bindingResult = ex.getBindingResult();</span></span>
<span class="line"><span style="color:#e1e4e8;">        StringBuilder sb = new StringBuilder(&quot;校验失败:&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;">        for (FieldError fieldError : bindingResult.getFieldErrors()) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            sb.append(fieldError.getField()).append(&quot;：&quot;).append(fieldError.getDefaultMessage()).append(&quot;, &quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        String msg = sb.toString();</span></span>
<span class="line"><span style="color:#e1e4e8;">       return Result.fail(BusinessCode.参数校验失败, msg);</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @ExceptionHandler({ConstraintViolationException.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">    @ResponseStatus(HttpStatus.OK)</span></span>
<span class="line"><span style="color:#e1e4e8;">    @ResponseBody</span></span>
<span class="line"><span style="color:#e1e4e8;">    public Result handleConstraintViolationException(ConstraintViolationException ex) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        return Result.fail(BusinessCode.参数校验失败, ex.getMessage());</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">@RestControllerAdvice</span></span>
<span class="line"><span style="color:#24292e;">public class CommonExceptionHandler {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @ExceptionHandler({MethodArgumentNotValidException.class})</span></span>
<span class="line"><span style="color:#24292e;">    @ResponseStatus(HttpStatus.OK)</span></span>
<span class="line"><span style="color:#24292e;">    @ResponseBody</span></span>
<span class="line"><span style="color:#24292e;">    public Result handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {</span></span>
<span class="line"><span style="color:#24292e;">        BindingResult bindingResult = ex.getBindingResult();</span></span>
<span class="line"><span style="color:#24292e;">        StringBuilder sb = new StringBuilder(&quot;校验失败:&quot;);</span></span>
<span class="line"><span style="color:#24292e;">        for (FieldError fieldError : bindingResult.getFieldErrors()) {</span></span>
<span class="line"><span style="color:#24292e;">            sb.append(fieldError.getField()).append(&quot;：&quot;).append(fieldError.getDefaultMessage()).append(&quot;, &quot;);</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        String msg = sb.toString();</span></span>
<span class="line"><span style="color:#24292e;">       return Result.fail(BusinessCode.参数校验失败, msg);</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @ExceptionHandler({ConstraintViolationException.class})</span></span>
<span class="line"><span style="color:#24292e;">    @ResponseStatus(HttpStatus.OK)</span></span>
<span class="line"><span style="color:#24292e;">    @ResponseBody</span></span>
<span class="line"><span style="color:#24292e;">    public Result handleConstraintViolationException(ConstraintViolationException ex) {</span></span>
<span class="line"><span style="color:#24292e;">        return Result.fail(BusinessCode.参数校验失败, ex.getMessage());</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h5 id="进阶使用" tabindex="-1">进阶使用 <a class="header-anchor" href="#进阶使用" aria-label="Permalink to &quot;进阶使用&quot;">​</a></h5><h6 id="分组校验" tabindex="-1">分组校验 <a class="header-anchor" href="#分组校验" aria-label="Permalink to &quot;分组校验&quot;">​</a></h6><p>在实际项目中，可能多个方法需要使用同一个DTO类来接收参数，而不同方法的校验规则很可能是不一样的。这个时候，简单地在DTO类的字段上加约束注解无法解决这个问题。因此，spring-validation支持了分组校验的功能，专门用来解决这类问题。</p><p>还是上面的例子，比如保存User的时候，UserId是可空的，但是更新User的时候，UserId的值必须&gt;=10000000000000000L；其它字段的校验规则在两种情况下一样。这个时候使用分组校验的代码示例如下：</p><p>约束注解上声明适用的分组信息groups</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">@Data</span></span>
<span class="line"><span style="color:#e1e4e8;">public class UserDTO {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @Min(value = 10000000000000000L, groups = Update.class)</span></span>
<span class="line"><span style="color:#e1e4e8;">    private Long userId;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">    @Length(min = 2, max = 10, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">    private String userName;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">    @Length(min = 6, max = 20, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">    private String account;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">    @Length(min = 6, max = 20, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">    private String password;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    /**</span></span>
<span class="line"><span style="color:#e1e4e8;">     * 保存的时候校验分组</span></span>
<span class="line"><span style="color:#e1e4e8;">     */</span></span>
<span class="line"><span style="color:#e1e4e8;">    public interface Save {</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    /**</span></span>
<span class="line"><span style="color:#e1e4e8;">     * 更新的时候校验分组</span></span>
<span class="line"><span style="color:#e1e4e8;">     */</span></span>
<span class="line"><span style="color:#e1e4e8;">    public interface Update {</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">@Data</span></span>
<span class="line"><span style="color:#24292e;">public class UserDTO {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @Min(value = 10000000000000000L, groups = Update.class)</span></span>
<span class="line"><span style="color:#24292e;">    private Long userId;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">    @Length(min = 2, max = 10, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">    private String userName;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">    @Length(min = 6, max = 20, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">    private String account;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">    @Length(min = 6, max = 20, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">    private String password;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    /**</span></span>
<span class="line"><span style="color:#24292e;">     * 保存的时候校验分组</span></span>
<span class="line"><span style="color:#24292e;">     */</span></span>
<span class="line"><span style="color:#24292e;">    public interface Save {</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    /**</span></span>
<span class="line"><span style="color:#24292e;">     * 更新的时候校验分组</span></span>
<span class="line"><span style="color:#24292e;">     */</span></span>
<span class="line"><span style="color:#24292e;">    public interface Update {</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>@Validated注解上指定校验分组</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">@PostMapping(&quot;/save&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">public Result saveUser(@RequestBody @Validated(UserDTO.Save.class) UserDTO userDTO) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 校验通过，才会执行业务逻辑处理</span></span>
<span class="line"><span style="color:#e1e4e8;">    return Result.ok();</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">@PostMapping(&quot;/update&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">public Result updateUser(@RequestBody @Validated(UserDTO.Update.class) UserDTO userDTO) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 校验通过，才会执行业务逻辑处理</span></span>
<span class="line"><span style="color:#e1e4e8;">    return Result.ok();</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">@PostMapping(&quot;/save&quot;)</span></span>
<span class="line"><span style="color:#24292e;">public Result saveUser(@RequestBody @Validated(UserDTO.Save.class) UserDTO userDTO) {</span></span>
<span class="line"><span style="color:#24292e;">    // 校验通过，才会执行业务逻辑处理</span></span>
<span class="line"><span style="color:#24292e;">    return Result.ok();</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">@PostMapping(&quot;/update&quot;)</span></span>
<span class="line"><span style="color:#24292e;">public Result updateUser(@RequestBody @Validated(UserDTO.Update.class) UserDTO userDTO) {</span></span>
<span class="line"><span style="color:#24292e;">    // 校验通过，才会执行业务逻辑处理</span></span>
<span class="line"><span style="color:#24292e;">    return Result.ok();</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h6 id="嵌套校验" tabindex="-1">嵌套校验 <a class="header-anchor" href="#嵌套校验" aria-label="Permalink to &quot;嵌套校验&quot;">​</a></h6><p>前面的示例中，DTO类里面的字段都是基本数据类型和String类型。但是实际场景中，有可能某个字段也是一个对象，这种情况先，可以使用嵌套校验。</p><p>比如，上面保存User信息的时候同时还带有Job信息。需要注意的是，此时DTO类的对应字段必须标记@Valid注解。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">@Data</span></span>
<span class="line"><span style="color:#e1e4e8;">public class UserDTO {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @Min(value = 10000000000000000L, groups = Update.class)</span></span>
<span class="line"><span style="color:#e1e4e8;">    private Long userId;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">    @Length(min = 2, max = 10, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">    private String userName;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">    @Length(min = 6, max = 20, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">    private String account;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">    @Length(min = 6, max = 20, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">    private String password;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">    @Valid</span></span>
<span class="line"><span style="color:#e1e4e8;">    private Job job;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @Data</span></span>
<span class="line"><span style="color:#e1e4e8;">    public static class Job {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        @Min(value = 1, groups = Update.class)</span></span>
<span class="line"><span style="color:#e1e4e8;">        private Long jobId;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">        @Length(min = 2, max = 10, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">        private String jobName;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">        @Length(min = 2, max = 10, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">        private String position;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    /**</span></span>
<span class="line"><span style="color:#e1e4e8;">     * 保存的时候校验分组</span></span>
<span class="line"><span style="color:#e1e4e8;">     */</span></span>
<span class="line"><span style="color:#e1e4e8;">    public interface Save {</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    /**</span></span>
<span class="line"><span style="color:#e1e4e8;">     * 更新的时候校验分组</span></span>
<span class="line"><span style="color:#e1e4e8;">     */</span></span>
<span class="line"><span style="color:#e1e4e8;">    public interface Update {</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">@Data</span></span>
<span class="line"><span style="color:#24292e;">public class UserDTO {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @Min(value = 10000000000000000L, groups = Update.class)</span></span>
<span class="line"><span style="color:#24292e;">    private Long userId;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">    @Length(min = 2, max = 10, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">    private String userName;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">    @Length(min = 6, max = 20, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">    private String account;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">    @Length(min = 6, max = 20, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">    private String password;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">    @Valid</span></span>
<span class="line"><span style="color:#24292e;">    private Job job;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @Data</span></span>
<span class="line"><span style="color:#24292e;">    public static class Job {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        @Min(value = 1, groups = Update.class)</span></span>
<span class="line"><span style="color:#24292e;">        private Long jobId;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">        @Length(min = 2, max = 10, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">        private String jobName;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        @NotNull(groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">        @Length(min = 2, max = 10, groups = {Save.class, Update.class})</span></span>
<span class="line"><span style="color:#24292e;">        private String position;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    /**</span></span>
<span class="line"><span style="color:#24292e;">     * 保存的时候校验分组</span></span>
<span class="line"><span style="color:#24292e;">     */</span></span>
<span class="line"><span style="color:#24292e;">    public interface Save {</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    /**</span></span>
<span class="line"><span style="color:#24292e;">     * 更新的时候校验分组</span></span>
<span class="line"><span style="color:#24292e;">     */</span></span>
<span class="line"><span style="color:#24292e;">    public interface Update {</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>嵌套校验结合分组校验一起使用。还有就是嵌套集合校验会对集合里面的每一项都进行校验，例如<code>List&lt;Job&gt;</code>字段会对这个list里面的每一个Job对象都进行校验</p><h6 id="集合校验" tabindex="-1">集合校验 <a class="header-anchor" href="#集合校验" aria-label="Permalink to &quot;集合校验&quot;">​</a></h6><p>如果请求体直接传递了json数组给后台，并希望对数组中的每一项都进行参数校验。此时，如果我们直接使用java.util.Collection下的list或者set来接收数据，参数校验并不会生效！我们可以使用自定义list集合来接收参数：</p><p>包装List类型，并声明@Valid注解</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">public class ValidationList&lt;E&gt; implements List&lt;E&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @Delegate // @Delegate是lombok注解</span></span>
<span class="line"><span style="color:#e1e4e8;">    @Valid // 一定要加@Valid注解</span></span>
<span class="line"><span style="color:#e1e4e8;">    public List&lt;E&gt; list = new ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    // 一定要记得重写toString方法</span></span>
<span class="line"><span style="color:#e1e4e8;">    @Override</span></span>
<span class="line"><span style="color:#e1e4e8;">    public String toString() {</span></span>
<span class="line"><span style="color:#e1e4e8;">        return list.toString();</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">public class ValidationList&lt;E&gt; implements List&lt;E&gt; {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @Delegate // @Delegate是lombok注解</span></span>
<span class="line"><span style="color:#24292e;">    @Valid // 一定要加@Valid注解</span></span>
<span class="line"><span style="color:#24292e;">    public List&lt;E&gt; list = new ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    // 一定要记得重写toString方法</span></span>
<span class="line"><span style="color:#24292e;">    @Override</span></span>
<span class="line"><span style="color:#24292e;">    public String toString() {</span></span>
<span class="line"><span style="color:#24292e;">        return list.toString();</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>@Delegate注解受lombok版本限制，1.18.6以上版本可支持。如果校验不通过，会抛出NotReadablePropertyException，同样可以使用统一异常进行处理。</p><p>比如，我们需要一次性保存多个User对象，Controller层的方法可以这么写：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">@PostMapping(&quot;/saveList&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">public Result saveList(@RequestBody @Validated(UserDTO.Save.class) ValidationList&lt;UserDTO&gt; userList) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 校验通过，才会执行业务逻辑处理</span></span>
<span class="line"><span style="color:#e1e4e8;">    return Result.ok();</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">@PostMapping(&quot;/saveList&quot;)</span></span>
<span class="line"><span style="color:#24292e;">public Result saveList(@RequestBody @Validated(UserDTO.Save.class) ValidationList&lt;UserDTO&gt; userList) {</span></span>
<span class="line"><span style="color:#24292e;">    // 校验通过，才会执行业务逻辑处理</span></span>
<span class="line"><span style="color:#24292e;">    return Result.ok();</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h6 id="自定义校验" tabindex="-1">自定义校验 <a class="header-anchor" href="#自定义校验" aria-label="Permalink to &quot;自定义校验&quot;">​</a></h6><p>业务需求总是比框架提供的这些简单校验要复杂的多，我们可以自定义校验来满足我们的需求。</p><p>自定义spring validation非常简单，假设我们自定义加密id（由数字或者a-f的字母组成，32-256长度）校验，主要分为两步：</p><p>自定义约束注解</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER})</span></span>
<span class="line"><span style="color:#e1e4e8;">@Retention(RUNTIME)</span></span>
<span class="line"><span style="color:#e1e4e8;">@Documented</span></span>
<span class="line"><span style="color:#e1e4e8;">@Constraint(validatedBy = {EncryptIdValidator.class})</span></span>
<span class="line"><span style="color:#e1e4e8;">public @interface EncryptId {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    // 默认错误消息</span></span>
<span class="line"><span style="color:#e1e4e8;">    String message() default &quot;加密id格式错误&quot;;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    // 分组</span></span>
<span class="line"><span style="color:#e1e4e8;">    Class&lt;?&gt;[] groups() default {};</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    // 负载</span></span>
<span class="line"><span style="color:#e1e4e8;">    Class&lt;? extends Payload&gt;[] payload() default {};</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER})</span></span>
<span class="line"><span style="color:#24292e;">@Retention(RUNTIME)</span></span>
<span class="line"><span style="color:#24292e;">@Documented</span></span>
<span class="line"><span style="color:#24292e;">@Constraint(validatedBy = {EncryptIdValidator.class})</span></span>
<span class="line"><span style="color:#24292e;">public @interface EncryptId {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    // 默认错误消息</span></span>
<span class="line"><span style="color:#24292e;">    String message() default &quot;加密id格式错误&quot;;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    // 分组</span></span>
<span class="line"><span style="color:#24292e;">    Class&lt;?&gt;[] groups() default {};</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    // 负载</span></span>
<span class="line"><span style="color:#24292e;">    Class&lt;? extends Payload&gt;[] payload() default {};</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>实现ConstraintValidator接口编写约束校验器</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">public class EncryptIdValidator implements ConstraintValidator&lt;EncryptId, String&gt; {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    private static final Pattern PATTERN = Pattern.compile(&quot;^[a-f\\\\d]{32,256}$&quot;);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    @Override</span></span>
<span class="line"><span style="color:#e1e4e8;">    public boolean isValid(String value, ConstraintValidatorContext context) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        // 不为null才进行校验</span></span>
<span class="line"><span style="color:#e1e4e8;">        if (value != null) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            Matcher matcher = PATTERN.matcher(value);</span></span>
<span class="line"><span style="color:#e1e4e8;">            return matcher.find();</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        return true;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">public class EncryptIdValidator implements ConstraintValidator&lt;EncryptId, String&gt; {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    private static final Pattern PATTERN = Pattern.compile(&quot;^[a-f\\\\d]{32,256}$&quot;);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    @Override</span></span>
<span class="line"><span style="color:#24292e;">    public boolean isValid(String value, ConstraintValidatorContext context) {</span></span>
<span class="line"><span style="color:#24292e;">        // 不为null才进行校验</span></span>
<span class="line"><span style="color:#24292e;">        if (value != null) {</span></span>
<span class="line"><span style="color:#24292e;">            Matcher matcher = PATTERN.matcher(value);</span></span>
<span class="line"><span style="color:#24292e;">            return matcher.find();</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        return true;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>这样我们就可以使用@EncryptId进行参数校验了！</p><h6 id="编程式校验" tabindex="-1">编程式校验 <a class="header-anchor" href="#编程式校验" aria-label="Permalink to &quot;编程式校验&quot;">​</a></h6><p>上面的示例都是基于注解来实现自动校验的，在某些情况下，我们可能希望以编程方式调用验证。这个时候可以注入javax.validation.Validator对象，然后再调用其api。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">@Autowired</span></span>
<span class="line"><span style="color:#e1e4e8;">private javax.validation.Validator globalValidator;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">// 编程式校验</span></span>
<span class="line"><span style="color:#e1e4e8;">@PostMapping(&quot;/saveWithCodingValidate&quot;)</span></span>
<span class="line"><span style="color:#e1e4e8;">public Result saveWithCodingValidate(@RequestBody UserDTO userDTO) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    Set&lt;ConstraintViolation&lt;UserDTO&gt;&gt; validate = globalValidator.validate(userDTO, UserDTO.Save.class);</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 如果校验通过，validate为空；否则，validate包含未校验通过项</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (validate.isEmpty()) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        // 校验通过，才会执行业务逻辑处理</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    } else {</span></span>
<span class="line"><span style="color:#e1e4e8;">        for (ConstraintViolation&lt;UserDTO&gt; userDTOConstraintViolation : validate) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            // 校验失败，做其它逻辑</span></span>
<span class="line"><span style="color:#e1e4e8;">            System.out.println(userDTOConstraintViolation);</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">    return Result.ok();</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">@Autowired</span></span>
<span class="line"><span style="color:#24292e;">private javax.validation.Validator globalValidator;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">// 编程式校验</span></span>
<span class="line"><span style="color:#24292e;">@PostMapping(&quot;/saveWithCodingValidate&quot;)</span></span>
<span class="line"><span style="color:#24292e;">public Result saveWithCodingValidate(@RequestBody UserDTO userDTO) {</span></span>
<span class="line"><span style="color:#24292e;">    Set&lt;ConstraintViolation&lt;UserDTO&gt;&gt; validate = globalValidator.validate(userDTO, UserDTO.Save.class);</span></span>
<span class="line"><span style="color:#24292e;">    // 如果校验通过，validate为空；否则，validate包含未校验通过项</span></span>
<span class="line"><span style="color:#24292e;">    if (validate.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292e;">        // 校验通过，才会执行业务逻辑处理</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    } else {</span></span>
<span class="line"><span style="color:#24292e;">        for (ConstraintViolation&lt;UserDTO&gt; userDTOConstraintViolation : validate) {</span></span>
<span class="line"><span style="color:#24292e;">            // 校验失败，做其它逻辑</span></span>
<span class="line"><span style="color:#24292e;">            System.out.println(userDTOConstraintViolation);</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">    return Result.ok();</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h6 id="快速失败-fail-fast" tabindex="-1">快速失败(Fail Fast) <a class="header-anchor" href="#快速失败-fail-fast" aria-label="Permalink to &quot;快速失败(Fail Fast)&quot;">​</a></h6><p>Spring Validation默认会校验完所有字段，然后才抛出异常。可以通过一些简单的配置，开启Fali Fast模式，一旦校验失败就立即返回。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">@Bean</span></span>
<span class="line"><span style="color:#e1e4e8;">public Validator validator() {</span></span>
<span class="line"><span style="color:#e1e4e8;">    ValidatorFactory validatorFactory = Validation.byProvider(HibernateValidator.class)</span></span>
<span class="line"><span style="color:#e1e4e8;">            .configure()</span></span>
<span class="line"><span style="color:#e1e4e8;">            // 快速失败模式</span></span>
<span class="line"><span style="color:#e1e4e8;">            .failFast(true)</span></span>
<span class="line"><span style="color:#e1e4e8;">            .buildValidatorFactory();</span></span>
<span class="line"><span style="color:#e1e4e8;">    return validatorFactory.getValidator();</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">@Bean</span></span>
<span class="line"><span style="color:#24292e;">public Validator validator() {</span></span>
<span class="line"><span style="color:#24292e;">    ValidatorFactory validatorFactory = Validation.byProvider(HibernateValidator.class)</span></span>
<span class="line"><span style="color:#24292e;">            .configure()</span></span>
<span class="line"><span style="color:#24292e;">            // 快速失败模式</span></span>
<span class="line"><span style="color:#24292e;">            .failFast(true)</span></span>
<span class="line"><span style="color:#24292e;">            .buildValidatorFactory();</span></span>
<span class="line"><span style="color:#24292e;">    return validatorFactory.getValidator();</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h5 id="实现原理" tabindex="-1">实现原理 <a class="header-anchor" href="#实现原理" aria-label="Permalink to &quot;实现原理&quot;">​</a></h5><h6 id="requestbody参数校验实现原理" tabindex="-1">requestBody参数校验实现原理 <a class="header-anchor" href="#requestbody参数校验实现原理" aria-label="Permalink to &quot;requestBody参数校验实现原理&quot;">​</a></h6><p>在spring-mvc中，RequestResponseBodyMethodProcessor是用于解析@RequestBody标注的参数以及处理@ResponseBody标注方法的返回值的。显然，执行参数校验的逻辑肯定就在解析参数的方法resolveArgument()中：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">public class RequestResponseBodyMethodProcessor extends AbstractMessageConverterMethodProcessor {</span></span>
<span class="line"><span style="color:#e1e4e8;">    @Override</span></span>
<span class="line"><span style="color:#e1e4e8;">    public Object resolveArgument(MethodParameter parameter, @Nullable ModelAndViewContainer mavContainer,</span></span>
<span class="line"><span style="color:#e1e4e8;">                                  NativeWebRequest webRequest, @Nullable WebDataBinderFactory binderFactory) throws Exception {</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        parameter = parameter.nestedIfOptional();</span></span>
<span class="line"><span style="color:#e1e4e8;">        //将请求数据封装到DTO对象中</span></span>
<span class="line"><span style="color:#e1e4e8;">        Object arg = readWithMessageConverters(webRequest, parameter, parameter.getNestedGenericParameterType());</span></span>
<span class="line"><span style="color:#e1e4e8;">        String name = Conventions.getVariableNameForParameter(parameter);</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">        if (binderFactory != null) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            WebDataBinder binder = binderFactory.createBinder(webRequest, arg, name);</span></span>
<span class="line"><span style="color:#e1e4e8;">            if (arg != null) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                // 执行数据校验</span></span>
<span class="line"><span style="color:#e1e4e8;">                validateIfApplicable(binder, parameter);</span></span>
<span class="line"><span style="color:#e1e4e8;">                if (binder.getBindingResult().hasErrors() &amp;&amp; isBindExceptionRequired(binder, parameter)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                    throw new MethodArgumentNotValidException(parameter, binder.getBindingResult());</span></span>
<span class="line"><span style="color:#e1e4e8;">                }</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">            if (mavContainer != null) {</span></span>
<span class="line"><span style="color:#e1e4e8;">                mavContainer.addAttribute(BindingResult.MODEL_KEY_PREFIX + name, binder.getBindingResult());</span></span>
<span class="line"><span style="color:#e1e4e8;">            }</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        return adaptArgumentIfNecessary(arg, parameter);</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">public class RequestResponseBodyMethodProcessor extends AbstractMessageConverterMethodProcessor {</span></span>
<span class="line"><span style="color:#24292e;">    @Override</span></span>
<span class="line"><span style="color:#24292e;">    public Object resolveArgument(MethodParameter parameter, @Nullable ModelAndViewContainer mavContainer,</span></span>
<span class="line"><span style="color:#24292e;">                                  NativeWebRequest webRequest, @Nullable WebDataBinderFactory binderFactory) throws Exception {</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        parameter = parameter.nestedIfOptional();</span></span>
<span class="line"><span style="color:#24292e;">        //将请求数据封装到DTO对象中</span></span>
<span class="line"><span style="color:#24292e;">        Object arg = readWithMessageConverters(webRequest, parameter, parameter.getNestedGenericParameterType());</span></span>
<span class="line"><span style="color:#24292e;">        String name = Conventions.getVariableNameForParameter(parameter);</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">        if (binderFactory != null) {</span></span>
<span class="line"><span style="color:#24292e;">            WebDataBinder binder = binderFactory.createBinder(webRequest, arg, name);</span></span>
<span class="line"><span style="color:#24292e;">            if (arg != null) {</span></span>
<span class="line"><span style="color:#24292e;">                // 执行数据校验</span></span>
<span class="line"><span style="color:#24292e;">                validateIfApplicable(binder, parameter);</span></span>
<span class="line"><span style="color:#24292e;">                if (binder.getBindingResult().hasErrors() &amp;&amp; isBindExceptionRequired(binder, parameter)) {</span></span>
<span class="line"><span style="color:#24292e;">                    throw new MethodArgumentNotValidException(parameter, binder.getBindingResult());</span></span>
<span class="line"><span style="color:#24292e;">                }</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">            if (mavContainer != null) {</span></span>
<span class="line"><span style="color:#24292e;">                mavContainer.addAttribute(BindingResult.MODEL_KEY_PREFIX + name, binder.getBindingResult());</span></span>
<span class="line"><span style="color:#24292e;">            }</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        return adaptArgumentIfNecessary(arg, parameter);</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>可以看到，resolveArgument()调用了validateIfApplicable()进行参数校验。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">protected void validateIfApplicable(WebDataBinder binder, MethodParameter parameter) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    // 获取参数注解，比如@RequestBody、@Valid、@Validated</span></span>
<span class="line"><span style="color:#e1e4e8;">    Annotation[] annotations = parameter.getParameterAnnotations();</span></span>
<span class="line"><span style="color:#e1e4e8;">    for (Annotation ann : annotations) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        // 先尝试获取@Validated注解</span></span>
<span class="line"><span style="color:#e1e4e8;">        Validated validatedAnn = AnnotationUtils.getAnnotation(ann, Validated.class);</span></span>
<span class="line"><span style="color:#e1e4e8;">        //如果直接标注了@Validated，那么直接开启校验。</span></span>
<span class="line"><span style="color:#e1e4e8;">        //如果没有，那么判断参数前是否有Valid起头的注解。</span></span>
<span class="line"><span style="color:#e1e4e8;">        if (validatedAnn != null || ann.annotationType().getSimpleName().startsWith(&quot;Valid&quot;)) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            Object hints = (validatedAnn != null ? validatedAnn.value() : AnnotationUtils.getValue(ann));</span></span>
<span class="line"><span style="color:#e1e4e8;">            Object[] validationHints = (hints instanceof Object[] ? (Object[]) hints : new Object[] {hints});</span></span>
<span class="line"><span style="color:#e1e4e8;">            //执行校验</span></span>
<span class="line"><span style="color:#e1e4e8;">            binder.validate(validationHints);</span></span>
<span class="line"><span style="color:#e1e4e8;">            break;</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">protected void validateIfApplicable(WebDataBinder binder, MethodParameter parameter) {</span></span>
<span class="line"><span style="color:#24292e;">    // 获取参数注解，比如@RequestBody、@Valid、@Validated</span></span>
<span class="line"><span style="color:#24292e;">    Annotation[] annotations = parameter.getParameterAnnotations();</span></span>
<span class="line"><span style="color:#24292e;">    for (Annotation ann : annotations) {</span></span>
<span class="line"><span style="color:#24292e;">        // 先尝试获取@Validated注解</span></span>
<span class="line"><span style="color:#24292e;">        Validated validatedAnn = AnnotationUtils.getAnnotation(ann, Validated.class);</span></span>
<span class="line"><span style="color:#24292e;">        //如果直接标注了@Validated，那么直接开启校验。</span></span>
<span class="line"><span style="color:#24292e;">        //如果没有，那么判断参数前是否有Valid起头的注解。</span></span>
<span class="line"><span style="color:#24292e;">        if (validatedAnn != null || ann.annotationType().getSimpleName().startsWith(&quot;Valid&quot;)) {</span></span>
<span class="line"><span style="color:#24292e;">            Object hints = (validatedAnn != null ? validatedAnn.value() : AnnotationUtils.getValue(ann));</span></span>
<span class="line"><span style="color:#24292e;">            Object[] validationHints = (hints instanceof Object[] ? (Object[]) hints : new Object[] {hints});</span></span>
<span class="line"><span style="color:#24292e;">            //执行校验</span></span>
<span class="line"><span style="color:#24292e;">            binder.validate(validationHints);</span></span>
<span class="line"><span style="color:#24292e;">            break;</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>看到这里，大家应该能明白为什么这种场景下@Validated、@Valid两个注解可以混用。我们接下来继续看WebDataBinder.validate()实现。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">@Override</span></span>
<span class="line"><span style="color:#e1e4e8;">public void validate(Object target, Errors errors, Object... validationHints) {</span></span>
<span class="line"><span style="color:#e1e4e8;">    if (this.targetValidator != null) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        processConstraintViolations(</span></span>
<span class="line"><span style="color:#e1e4e8;">            //此处调用Hibernate Validator执行真正的校验</span></span>
<span class="line"><span style="color:#e1e4e8;">            this.targetValidator.validate(target, asValidationGroups(validationHints)), errors);</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">@Override</span></span>
<span class="line"><span style="color:#24292e;">public void validate(Object target, Errors errors, Object... validationHints) {</span></span>
<span class="line"><span style="color:#24292e;">    if (this.targetValidator != null) {</span></span>
<span class="line"><span style="color:#24292e;">        processConstraintViolations(</span></span>
<span class="line"><span style="color:#24292e;">            //此处调用Hibernate Validator执行真正的校验</span></span>
<span class="line"><span style="color:#24292e;">            this.targetValidator.validate(target, asValidationGroups(validationHints)), errors);</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>最终发现底层最终还是调用了Hibernate Validator进行真正的校验处理。</p><h6 id="方法级别的参数校验实现原理" tabindex="-1">方法级别的参数校验实现原理 <a class="header-anchor" href="#方法级别的参数校验实现原理" aria-label="Permalink to &quot;方法级别的参数校验实现原理&quot;">​</a></h6><p>上面提到的将参数一个个平铺到方法参数中，然后在每个参数前面声明约束注解的校验方式，就是方法级别的参数校验。</p><p>实际上，这种方式可用于任何Spring Bean的方法上，比如Controller/Service等。其底层实现原理就是AOP，具体来说是通过MethodValidationPostProcessor动态注册AOP切面，然后使用MethodValidationInterceptor对切点方法织入增强。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">public class MethodValidationPostProcessor extends AbstractBeanFactoryAwareAdvisingPostProcessorimplements InitializingBean {</span></span>
<span class="line"><span style="color:#e1e4e8;">    @Override</span></span>
<span class="line"><span style="color:#e1e4e8;">    public void afterPropertiesSet() {</span></span>
<span class="line"><span style="color:#e1e4e8;">        //为所有\`@Validated\`标注的Bean创建切面</span></span>
<span class="line"><span style="color:#e1e4e8;">        Pointcut pointcut = new AnnotationMatchingPointcut(this.validatedAnnotationType, true);</span></span>
<span class="line"><span style="color:#e1e4e8;">        //创建Advisor进行增强</span></span>
<span class="line"><span style="color:#e1e4e8;">        this.advisor = new DefaultPointcutAdvisor(pointcut, createMethodValidationAdvice(this.validator));</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    //创建Advice，本质就是一个方法拦截器</span></span>
<span class="line"><span style="color:#e1e4e8;">    protected Advice createMethodValidationAdvice(@Nullable Validator validator) {</span></span>
<span class="line"><span style="color:#e1e4e8;">        return (validator != null ? new MethodValidationInterceptor(validator) : new MethodValidationInterceptor());</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">public class MethodValidationPostProcessor extends AbstractBeanFactoryAwareAdvisingPostProcessorimplements InitializingBean {</span></span>
<span class="line"><span style="color:#24292e;">    @Override</span></span>
<span class="line"><span style="color:#24292e;">    public void afterPropertiesSet() {</span></span>
<span class="line"><span style="color:#24292e;">        //为所有\`@Validated\`标注的Bean创建切面</span></span>
<span class="line"><span style="color:#24292e;">        Pointcut pointcut = new AnnotationMatchingPointcut(this.validatedAnnotationType, true);</span></span>
<span class="line"><span style="color:#24292e;">        //创建Advisor进行增强</span></span>
<span class="line"><span style="color:#24292e;">        this.advisor = new DefaultPointcutAdvisor(pointcut, createMethodValidationAdvice(this.validator));</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    //创建Advice，本质就是一个方法拦截器</span></span>
<span class="line"><span style="color:#24292e;">    protected Advice createMethodValidationAdvice(@Nullable Validator validator) {</span></span>
<span class="line"><span style="color:#24292e;">        return (validator != null ? new MethodValidationInterceptor(validator) : new MethodValidationInterceptor());</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><p>接着看一下MethodValidationInterceptor：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">public class MethodValidationInterceptor implements MethodInterceptor {</span></span>
<span class="line"><span style="color:#e1e4e8;">    @Override</span></span>
<span class="line"><span style="color:#e1e4e8;">    public Object invoke(MethodInvocation invocation) throws Throwable {</span></span>
<span class="line"><span style="color:#e1e4e8;">        //无需增强的方法，直接跳过</span></span>
<span class="line"><span style="color:#e1e4e8;">        if (isFactoryBeanMetadataMethod(invocation.getMethod())) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            return invocation.proceed();</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        //获取分组信息</span></span>
<span class="line"><span style="color:#e1e4e8;">        Class&lt;?&gt;[] groups = determineValidationGroups(invocation);</span></span>
<span class="line"><span style="color:#e1e4e8;">        ExecutableValidator execVal = this.validator.forExecutables();</span></span>
<span class="line"><span style="color:#e1e4e8;">        Method methodToValidate = invocation.getMethod();</span></span>
<span class="line"><span style="color:#e1e4e8;">        Set&lt;ConstraintViolation&lt;Object&gt;&gt; result;</span></span>
<span class="line"><span style="color:#e1e4e8;">        try {</span></span>
<span class="line"><span style="color:#e1e4e8;">            //方法入参校验，最终还是委托给Hibernate Validator来校验</span></span>
<span class="line"><span style="color:#e1e4e8;">            result = execVal.validateParameters(</span></span>
<span class="line"><span style="color:#e1e4e8;">                invocation.getThis(), methodToValidate, invocation.getArguments(), groups);</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        catch (IllegalArgumentException ex) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            ...</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        //有异常直接抛出</span></span>
<span class="line"><span style="color:#e1e4e8;">        if (!result.isEmpty()) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            throw new ConstraintViolationException(result);</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        //真正的方法调用</span></span>
<span class="line"><span style="color:#e1e4e8;">        Object returnValue = invocation.proceed();</span></span>
<span class="line"><span style="color:#e1e4e8;">        //对返回值做校验，最终还是委托给Hibernate Validator来校验</span></span>
<span class="line"><span style="color:#e1e4e8;">        result = execVal.validateReturnValue(invocation.getThis(), methodToValidate, returnValue, groups);</span></span>
<span class="line"><span style="color:#e1e4e8;">        //有异常直接抛出</span></span>
<span class="line"><span style="color:#e1e4e8;">        if (!result.isEmpty()) {</span></span>
<span class="line"><span style="color:#e1e4e8;">            throw new ConstraintViolationException(result);</span></span>
<span class="line"><span style="color:#e1e4e8;">        }</span></span>
<span class="line"><span style="color:#e1e4e8;">        return returnValue;</span></span>
<span class="line"><span style="color:#e1e4e8;">    }</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">public class MethodValidationInterceptor implements MethodInterceptor {</span></span>
<span class="line"><span style="color:#24292e;">    @Override</span></span>
<span class="line"><span style="color:#24292e;">    public Object invoke(MethodInvocation invocation) throws Throwable {</span></span>
<span class="line"><span style="color:#24292e;">        //无需增强的方法，直接跳过</span></span>
<span class="line"><span style="color:#24292e;">        if (isFactoryBeanMetadataMethod(invocation.getMethod())) {</span></span>
<span class="line"><span style="color:#24292e;">            return invocation.proceed();</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        //获取分组信息</span></span>
<span class="line"><span style="color:#24292e;">        Class&lt;?&gt;[] groups = determineValidationGroups(invocation);</span></span>
<span class="line"><span style="color:#24292e;">        ExecutableValidator execVal = this.validator.forExecutables();</span></span>
<span class="line"><span style="color:#24292e;">        Method methodToValidate = invocation.getMethod();</span></span>
<span class="line"><span style="color:#24292e;">        Set&lt;ConstraintViolation&lt;Object&gt;&gt; result;</span></span>
<span class="line"><span style="color:#24292e;">        try {</span></span>
<span class="line"><span style="color:#24292e;">            //方法入参校验，最终还是委托给Hibernate Validator来校验</span></span>
<span class="line"><span style="color:#24292e;">            result = execVal.validateParameters(</span></span>
<span class="line"><span style="color:#24292e;">                invocation.getThis(), methodToValidate, invocation.getArguments(), groups);</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        catch (IllegalArgumentException ex) {</span></span>
<span class="line"><span style="color:#24292e;">            ...</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        //有异常直接抛出</span></span>
<span class="line"><span style="color:#24292e;">        if (!result.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292e;">            throw new ConstraintViolationException(result);</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        //真正的方法调用</span></span>
<span class="line"><span style="color:#24292e;">        Object returnValue = invocation.proceed();</span></span>
<span class="line"><span style="color:#24292e;">        //对返回值做校验，最终还是委托给Hibernate Validator来校验</span></span>
<span class="line"><span style="color:#24292e;">        result = execVal.validateReturnValue(invocation.getThis(), methodToValidate, returnValue, groups);</span></span>
<span class="line"><span style="color:#24292e;">        //有异常直接抛出</span></span>
<span class="line"><span style="color:#24292e;">        if (!result.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292e;">            throw new ConstraintViolationException(result);</span></span>
<span class="line"><span style="color:#24292e;">        }</span></span>
<span class="line"><span style="color:#24292e;">        return returnValue;</span></span>
<span class="line"><span style="color:#24292e;">    }</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="_2、springboot扩展" tabindex="-1">2、SpringBoot扩展 <a class="header-anchor" href="#_2、springboot扩展" aria-label="Permalink to &quot;2、SpringBoot扩展&quot;">​</a></h2><h3 id="springboot自动装配原理" tabindex="-1">SpringBoot自动装配原理 <a class="header-anchor" href="#springboot自动装配原理" aria-label="Permalink to &quot;SpringBoot自动装配原理&quot;">​</a></h3><p>Spring Boot关于自动配置的源码在<code>spring-boot-autoconfigure-x.x.x.x.jar</code>中</p><p>SpringBoot 的核心注解 <code>SpringBootApplication</code></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Target</span><span style="color:#E1E4E8;">({ElementType.TYPE})</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Retention</span><span style="color:#E1E4E8;">(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Documented</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Inherited</span></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#79B8FF;">1.</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">SpringBootConfiguration</span></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#79B8FF;">2.</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">ComponentScan</span></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#79B8FF;">3.</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">EnableAutoConfiguration</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SpringBootApplication</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Target</span><span style="color:#E1E4E8;">({ElementType.TYPE})</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Retention</span><span style="color:#E1E4E8;">(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Documented</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Configuration</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//实际上它也是一个配置类</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">SpringBootConfiguration</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Target</span><span style="color:#24292E;">({ElementType.TYPE})</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Retention</span><span style="color:#24292E;">(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Documented</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Inherited</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#005CC5;">1.</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">@</span><span style="color:#D73A49;">SpringBootConfiguration</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#005CC5;">2.</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">@</span><span style="color:#D73A49;">ComponentScan</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#005CC5;">3.</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">@</span><span style="color:#D73A49;">EnableAutoConfiguration</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SpringBootApplication</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Target</span><span style="color:#24292E;">({ElementType.TYPE})</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Retention</span><span style="color:#24292E;">(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Documented</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Configuration</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//实际上它也是一个配置类</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">SpringBootConfiguration</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以把 <code>@SpringBootApplication</code>看作是 <code>@Configuration</code>、<code>@EnableAutoConfiguration</code>、<code>@ComponentScan</code> 注解的集合。根据 SpringBoot 官网，这三个注解的作用分别是：</p><ul><li><code>@EnableAutoConfiguration</code>：启用 SpringBoot 的自动配置机制</li><li><code>@Configuration</code>：允许在上下文中注册额外的 bean 或导入其他配置类</li><li><code>@ComponentScan</code>： 扫描被<code>@Component</code> (<code>@Service</code>,<code>@Controller</code>)注解的 bean，注解默认会扫描启动类所在的包下所有的类 ，可以自定义不扫描某些 bean。如下图所示，容器中将排除<code>TypeExcludeFilter</code>和<code>AutoConfigurationExcludeFilter</code>。</li></ul><p><img src="`+p+`" alt="image-20230112164305474"></p><p><code>@EnableAutoConfiguration</code> 是实现自动装配的重要注解，我们以这个注解入手。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Target</span><span style="color:#E1E4E8;">({ElementType.TYPE})</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Retention</span><span style="color:#E1E4E8;">(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Documented</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Inherited</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">AutoConfigurationPackage</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//作用：将main包下的所有组件注册到容器中</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Import</span><span style="color:#E1E4E8;">({AutoConfigurationImportSelector.class}) </span><span style="color:#6A737D;">//加载自动装配类 xxxAutoconfiguration</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">EnableAutoConfiguration</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    String ENABLED_OVERRIDE_PROPERTY </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;spring.boot.enableautoconfiguration&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    Class</span><span style="color:#F97583;">&lt;?&gt;</span><span style="color:#E1E4E8;">[] </span><span style="color:#B392F0;">exclude</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#B392F0;">excludeName</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {};</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Target</span><span style="color:#24292E;">({ElementType.TYPE})</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Retention</span><span style="color:#24292E;">(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Documented</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Inherited</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">AutoConfigurationPackage</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//作用：将main包下的所有组件注册到容器中</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Import</span><span style="color:#24292E;">({AutoConfigurationImportSelector.class}) </span><span style="color:#6A737D;">//加载自动装配类 xxxAutoconfiguration</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">EnableAutoConfiguration</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    String ENABLED_OVERRIDE_PROPERTY </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;spring.boot.enableautoconfiguration&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    Class</span><span style="color:#D73A49;">&lt;?&gt;</span><span style="color:#24292E;">[] </span><span style="color:#6F42C1;">exclude</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#6F42C1;">excludeName</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {};</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这个注解也是一个派生注解，其中的关键功能由@Import提供，其导入的AutoConfigurationImportSelector的<code>selectImports()</code>方法通过<code>SpringFactoriesLoader.loadFactoryNames()</code>扫描所有具有<strong>META-INF/spring.factories</strong> 的jar包。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AutoConfigurationImportSelector</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DeferredImportSelector</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">BeanClassLoaderAware</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">ResourceLoaderAware</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">BeanFactoryAware</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">EnvironmentAware</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">Ordered</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DeferredImportSelector</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ImportSelector</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ImportSelector</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#B392F0;">selectImports</span><span style="color:#E1E4E8;">(AnnotationMetadata </span><span style="color:#FFAB70;">var1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AutoConfigurationImportSelector</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DeferredImportSelector</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">BeanClassLoaderAware</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">ResourceLoaderAware</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">BeanFactoryAware</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">EnvironmentAware</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">Ordered</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DeferredImportSelector</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ImportSelector</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ImportSelector</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#6F42C1;">selectImports</span><span style="color:#24292E;">(AnnotationMetadata </span><span style="color:#E36209;">var1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] NO_IMPORTS </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//获取所有符合条件的类的全限定类名，这些类需要被加载到 IoC 容器中</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#B392F0;">selectImports</span><span style="color:#E1E4E8;">(AnnotationMetadata annotationMetadata) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// &lt;1&gt;.判断自动装配开关是否打开</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">isEnabled</span><span style="color:#E1E4E8;">(annotationMetadata)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> NO_IMPORTS;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//&lt;2&gt;.获取所有需要装配的bean</span></span>
<span class="line"><span style="color:#E1E4E8;">        AutoConfigurationMetadata autoConfigurationMetadata </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> AutoConfigurationMetadataLoader.</span><span style="color:#B392F0;">loadMetadata</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.beanClassLoader);</span></span>
<span class="line"><span style="color:#E1E4E8;">        AutoConfigurationImportSelector.AutoConfigurationEntry autoConfigurationEntry </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">getAutoConfigurationEntry</span><span style="color:#E1E4E8;">(autoConfigurationMetadata, annotationMetadata);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> StringUtils.</span><span style="color:#B392F0;">toStringArray</span><span style="color:#E1E4E8;">(autoConfigurationEntry.</span><span style="color:#B392F0;">getConfigurations</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] NO_IMPORTS </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//获取所有符合条件的类的全限定类名，这些类需要被加载到 IoC 容器中</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#6F42C1;">selectImports</span><span style="color:#24292E;">(AnnotationMetadata annotationMetadata) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// &lt;1&gt;.判断自动装配开关是否打开</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">isEnabled</span><span style="color:#24292E;">(annotationMetadata)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> NO_IMPORTS;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//&lt;2&gt;.获取所有需要装配的bean</span></span>
<span class="line"><span style="color:#24292E;">        AutoConfigurationMetadata autoConfigurationMetadata </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> AutoConfigurationMetadataLoader.</span><span style="color:#6F42C1;">loadMetadata</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.beanClassLoader);</span></span>
<span class="line"><span style="color:#24292E;">        AutoConfigurationImportSelector.AutoConfigurationEntry autoConfigurationEntry </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">getAutoConfigurationEntry</span><span style="color:#24292E;">(autoConfigurationMetadata, annotationMetadata);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> StringUtils.</span><span style="color:#6F42C1;">toStringArray</span><span style="color:#24292E;">(autoConfigurationEntry.</span><span style="color:#6F42C1;">getConfigurations</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><code>getAutoConfigurationEntry()</code>方法，这个方法主要负责加载自动配置类的</p><p><img src="`+e+`" alt="image-20230112164654112"></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> AutoConfigurationEntry EMPTY_ENTRY </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AutoConfigurationEntry</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">AutoConfigurationEntry </span><span style="color:#B392F0;">getAutoConfigurationEntry</span><span style="color:#E1E4E8;">(AutoConfigurationMetadata autoConfigurationMetadata, AnnotationMetadata annotationMetadata) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//&lt;1&gt;.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">isEnabled</span><span style="color:#E1E4E8;">(annotationMetadata)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> EMPTY_ENTRY;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//&lt;2&gt;.</span></span>
<span class="line"><span style="color:#E1E4E8;">        AnnotationAttributes attributes </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">getAttributes</span><span style="color:#E1E4E8;">(annotationMetadata);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//&lt;3&gt;.</span></span>
<span class="line"><span style="color:#E1E4E8;">        List&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; configurations </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">getCandidateConfigurations</span><span style="color:#E1E4E8;">(annotationMetadata, attributes);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//&lt;4&gt;.</span></span>
<span class="line"><span style="color:#E1E4E8;">        configurations </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">removeDuplicates</span><span style="color:#E1E4E8;">(configurations);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Set&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; exclusions </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">getExclusions</span><span style="color:#E1E4E8;">(annotationMetadata, attributes);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">checkExcludedClasses</span><span style="color:#E1E4E8;">(configurations, exclusions);</span></span>
<span class="line"><span style="color:#E1E4E8;">        configurations.</span><span style="color:#B392F0;">removeAll</span><span style="color:#E1E4E8;">(exclusions);</span></span>
<span class="line"><span style="color:#E1E4E8;">        configurations </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(configurations, autoConfigurationMetadata);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">fireAutoConfigurationImportEvents</span><span style="color:#E1E4E8;">(configurations, exclusions);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> AutoConfigurationImportSelector.</span><span style="color:#B392F0;">AutoConfigurationEntry</span><span style="color:#E1E4E8;">(configurations, exclusions);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> AutoConfigurationEntry EMPTY_ENTRY </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AutoConfigurationEntry</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">AutoConfigurationEntry </span><span style="color:#6F42C1;">getAutoConfigurationEntry</span><span style="color:#24292E;">(AutoConfigurationMetadata autoConfigurationMetadata, AnnotationMetadata annotationMetadata) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//&lt;1&gt;.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">isEnabled</span><span style="color:#24292E;">(annotationMetadata)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> EMPTY_ENTRY;</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//&lt;2&gt;.</span></span>
<span class="line"><span style="color:#24292E;">        AnnotationAttributes attributes </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">getAttributes</span><span style="color:#24292E;">(annotationMetadata);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//&lt;3&gt;.</span></span>
<span class="line"><span style="color:#24292E;">        List&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; configurations </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">getCandidateConfigurations</span><span style="color:#24292E;">(annotationMetadata, attributes);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//&lt;4&gt;.</span></span>
<span class="line"><span style="color:#24292E;">        configurations </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">removeDuplicates</span><span style="color:#24292E;">(configurations);</span></span>
<span class="line"><span style="color:#24292E;">        Set&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; exclusions </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">getExclusions</span><span style="color:#24292E;">(annotationMetadata, attributes);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">checkExcludedClasses</span><span style="color:#24292E;">(configurations, exclusions);</span></span>
<span class="line"><span style="color:#24292E;">        configurations.</span><span style="color:#6F42C1;">removeAll</span><span style="color:#24292E;">(exclusions);</span></span>
<span class="line"><span style="color:#24292E;">        configurations </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(configurations, autoConfigurationMetadata);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">fireAutoConfigurationImportEvents</span><span style="color:#24292E;">(configurations, exclusions);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> AutoConfigurationImportSelector.</span><span style="color:#6F42C1;">AutoConfigurationEntry</span><span style="color:#24292E;">(configurations, exclusions);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>第 1 步</strong>:</p><p>判断自动装配开关是否打开。默认<code>spring.boot.enableautoconfiguration=true</code>，可在 <code>application.properties</code> 或 <code>application.yml</code> 中设置</p><p><img src="`+o+'" alt="image-20230112164923407"></p><p><strong>第 2 步</strong> ：</p><p>用于获取<code>EnableAutoConfiguration</code>注解中的 <code>exclude</code> 和 <code>excludeName</code>。</p><p><img src="'+t+'" alt="image-20230112164940576"></p><p><strong>第 3 步</strong></p><p>获取需要自动装配的所有配置类，读取<code>META-INF/spring.factories</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">spring-boot/spring-boot-project/spring-boot-autoconfigure/src/main/resources/META-INF/spring.factories</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">spring-boot/spring-boot-project/spring-boot-autoconfigure/src/main/resources/META-INF/spring.factories</span></span></code></pre></div><p><img src="'+c+`" alt="image-20230112165023728"></p><p><strong>第 4 步</strong> ：</p><p>筛选，<code>@ConditionalOnXXX</code> 中的所有条件都满足，该类才会生效。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//举例: RabbitAutoConfiguration</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Configuration</span></span>
<span class="line"><span style="color:#6A737D;">// 检查相关的类：RabbitTemplate 和 Channel是否存在</span></span>
<span class="line"><span style="color:#6A737D;">// 存在才会加载</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">ConditionalOnClass</span><span style="color:#E1E4E8;">({ RabbitTemplate.class, Channel.class })</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">EnableConfigurationProperties</span><span style="color:#E1E4E8;">(RabbitProperties.class)</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Import</span><span style="color:#E1E4E8;">(RabbitAnnotationDrivenConfiguration.class)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RabbitAutoConfiguration</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//举例: RabbitAutoConfiguration</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Configuration</span></span>
<span class="line"><span style="color:#6A737D;">// 检查相关的类：RabbitTemplate 和 Channel是否存在</span></span>
<span class="line"><span style="color:#6A737D;">// 存在才会加载</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">ConditionalOnClass</span><span style="color:#24292E;">({ RabbitTemplate.class, Channel.class })</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">EnableConfigurationProperties</span><span style="color:#24292E;">(RabbitProperties.class)</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Import</span><span style="color:#24292E;">(RabbitAnnotationDrivenConfiguration.class)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RabbitAutoConfiguration</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><img src="`+r+`" alt="image-20230112165110441"></p><p><code>spring.factories</code>文件也是一组一组的key=value的形式，其中一个key是<code>EnableAutoConfiguration</code>类的全类名，而它的value是一个<code>xxxxAutoConfiguration</code>的类名的列表，这些类名以逗号分隔;</p><p>在<code>SpringApplication.run(...)</code>的内部就会执行<code>selectImports()</code>方法，找到所有JavaConfig自动配置类的全限定名对应的class，然后将所有自动配置类加载到Spring容器中。</p><h3 id="spring-boot启动流程" tabindex="-1">Spring Boot启动流程 <a class="header-anchor" href="#spring-boot启动流程" aria-label="Permalink to &quot;Spring Boot启动流程&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">SpringBootApplication</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Application</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">       SpringApplication.</span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(Application.class, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">SpringBootApplication</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Application</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception {</span></span>
<span class="line"><span style="color:#24292E;">       SpringApplication.</span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(Application.class, args);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p>从源码声明可以看出，<strong>@SpringBootApplication相当于 @SpringBootConfiguration + @ComponentScan + @EnableAutoConfiguration</strong> ，因此我们直接拆开来分析。</p></blockquote><p>上面三个注解都在做一件事：<strong>注册bean到spring容器</strong>。他们通过不同的条件不同的方式来完成：</p><ul><li>@SpringBootConfiguration 通过与 @Bean 结合完成Bean的 JavaConfig 配置；</li><li>@ComponentScan 通过范围扫描的方式，扫描特定注解注释的类，将其注册到Spring容器；</li><li>@EnableAutoConfiguration 通过 spring.factories 的配置，并结合 @Condition 条件，完成bean的注册；</li></ul><p>除了上面的三个注解，还可以使用@Import注解将bean注册到Spring容器</p><ul><li>@Import 通过导入的方式，将指定的class注册解析到Spring容器；</li></ul><h4 id="启动流程" tabindex="-1">启动流程 <a class="header-anchor" href="#启动流程" aria-label="Permalink to &quot;启动流程&quot;">​</a></h4><p><strong>SpringApplication的实例化</strong></p><ul><li>推断应用类型是否是Web环境</li><li>设置初始化器（Initializer）</li><li>设置监听器（Listener）</li><li>推断应用入口类（Main）</li></ul><p><strong>SpringApplication.run方法</strong></p><ul><li>获取SpringApplicationRunListeners</li><li>准备配置环境ConfigurableEnvironment</li><li>创建ApplicationContext应用上下文</li><li>ApplicationContext前置处理</li><li>ApplicationContext刷新</li><li>ApplicationContext后置处理</li></ul><h4 id="构造方法解析" tabindex="-1">构造方法解析 <a class="header-anchor" href="#构造方法解析" aria-label="Permalink to &quot;构造方法解析&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// SpringApplication.java</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 资源加载器</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> ResourceLoader resourceLoader;</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 主要的 Java Config 类的数组</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Set&lt;Class&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt;&gt; primarySources;</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Web 应用类型</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> WebApplicationType webApplicationType;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * ApplicationContextInitializer 数组</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> List&lt;ApplicationContextInitializer&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt;&gt; initializers;</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * ApplicationListener 数组</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> List&lt;ApplicationListener&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt;&gt; listeners;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SpringApplication</span><span style="color:#E1E4E8;">(Class</span><span style="color:#F97583;">&lt;?&gt;</span><span style="color:#E1E4E8;">... primarySources) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, primarySources);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SpringApplication</span><span style="color:#E1E4E8;">(ResourceLoader resourceLoader, Class</span><span style="color:#F97583;">&lt;?&gt;</span><span style="color:#E1E4E8;">... primarySources) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.resourceLoader </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> resourceLoader;</span></span>
<span class="line"><span style="color:#E1E4E8;">    Assert.</span><span style="color:#B392F0;">notNull</span><span style="color:#E1E4E8;">(primarySources, </span><span style="color:#9ECBFF;">&quot;PrimarySources must not be null&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.primarySources </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> LinkedHashSet&lt;&gt;(Arrays.</span><span style="color:#B392F0;">asList</span><span style="color:#E1E4E8;">(primarySources));</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.webApplicationType </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> WebApplicationType.</span><span style="color:#B392F0;">deduceFromClasspath</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 初始化 initializers 属性</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setInitializers</span><span style="color:#E1E4E8;">((Collection) </span><span style="color:#B392F0;">getSpringFactoriesInstances</span><span style="color:#E1E4E8;">(ApplicationContextInitializer.class));</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 初始化 listeners 属性</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setListeners</span><span style="color:#E1E4E8;">((Collection) </span><span style="color:#B392F0;">getSpringFactoriesInstances</span><span style="color:#E1E4E8;">(ApplicationListener.class));</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.mainApplicationClass </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">deduceMainApplicationClass</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// SpringApplication.java</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 资源加载器</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> ResourceLoader resourceLoader;</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 主要的 Java Config 类的数组</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Set&lt;Class&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt;&gt; primarySources;</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Web 应用类型</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> WebApplicationType webApplicationType;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * ApplicationContextInitializer 数组</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> List&lt;ApplicationContextInitializer&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt;&gt; initializers;</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * ApplicationListener 数组</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> List&lt;ApplicationListener&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt;&gt; listeners;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SpringApplication</span><span style="color:#24292E;">(Class</span><span style="color:#D73A49;">&lt;?&gt;</span><span style="color:#24292E;">... primarySources) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, primarySources);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SpringApplication</span><span style="color:#24292E;">(ResourceLoader resourceLoader, Class</span><span style="color:#D73A49;">&lt;?&gt;</span><span style="color:#24292E;">... primarySources) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.resourceLoader </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> resourceLoader;</span></span>
<span class="line"><span style="color:#24292E;">    Assert.</span><span style="color:#6F42C1;">notNull</span><span style="color:#24292E;">(primarySources, </span><span style="color:#032F62;">&quot;PrimarySources must not be null&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.primarySources </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> LinkedHashSet&lt;&gt;(Arrays.</span><span style="color:#6F42C1;">asList</span><span style="color:#24292E;">(primarySources));</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.webApplicationType </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> WebApplicationType.</span><span style="color:#6F42C1;">deduceFromClasspath</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 初始化 initializers 属性</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setInitializers</span><span style="color:#24292E;">((Collection) </span><span style="color:#6F42C1;">getSpringFactoriesInstances</span><span style="color:#24292E;">(ApplicationContextInitializer.class));</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 初始化 listeners 属性</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setListeners</span><span style="color:#24292E;">((Collection) </span><span style="color:#6F42C1;">getSpringFactoriesInstances</span><span style="color:#24292E;">(ApplicationListener.class));</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.mainApplicationClass </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">deduceMainApplicationClass</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h5 id="getspringfactoriesinstances" tabindex="-1">getSpringFactoriesInstances(...) <a class="header-anchor" href="#getspringfactoriesinstances" aria-label="Permalink to &quot;getSpringFactoriesInstances(...)&quot;">​</a></h5><p><code>#getSpringFactoriesInstances(Class&lt;T&gt; type)</code> 方法，获得指定类对应的对象们。代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// SpringApplication.java</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">T</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> Collection</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">T</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getSpringFactoriesInstances</span><span style="color:#E1E4E8;">(Class</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">T</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> type) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getSpringFactoriesInstances</span><span style="color:#E1E4E8;">(type, </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> Class&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt;[] {});</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">T</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> Collection</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">T</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getSpringFactoriesInstances</span><span style="color:#E1E4E8;">(Class</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">T</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> type,</span></span>
<span class="line"><span style="color:#E1E4E8;">        Class</span><span style="color:#F97583;">&lt;?&gt;</span><span style="color:#E1E4E8;">[] parameterTypes, Object... args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ClassLoader classLoader </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getClassLoader</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Use names and ensure unique to protect against duplicates</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// &lt;1&gt; 加载指定类型对应的，在 \`META-INF/spring.factories\` 里的类名的数组</span></span>
<span class="line"><span style="color:#E1E4E8;">    Set&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; names </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> LinkedHashSet&lt;&gt;(</span></span>
<span class="line"><span style="color:#E1E4E8;">            SpringFactoriesLoader.</span><span style="color:#B392F0;">loadFactoryNames</span><span style="color:#E1E4E8;">(type, classLoader));</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// &lt;2&gt; 创建对象们</span></span>
<span class="line"><span style="color:#E1E4E8;">    List&lt;</span><span style="color:#F97583;">T</span><span style="color:#E1E4E8;">&gt; instances </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createSpringFactoriesInstances</span><span style="color:#E1E4E8;">(type, parameterTypes,</span></span>
<span class="line"><span style="color:#E1E4E8;">            classLoader, args, names);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// &lt;3&gt; 排序对象们</span></span>
<span class="line"><span style="color:#E1E4E8;">    AnnotationAwareOrderComparator.</span><span style="color:#B392F0;">sort</span><span style="color:#E1E4E8;">(instances);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> instances;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// SpringApplication.java</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">T</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> Collection</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">T</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getSpringFactoriesInstances</span><span style="color:#24292E;">(Class</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">T</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> type) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getSpringFactoriesInstances</span><span style="color:#24292E;">(type, </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> Class&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt;[] {});</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">T</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> Collection</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">T</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getSpringFactoriesInstances</span><span style="color:#24292E;">(Class</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">T</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> type,</span></span>
<span class="line"><span style="color:#24292E;">        Class</span><span style="color:#D73A49;">&lt;?&gt;</span><span style="color:#24292E;">[] parameterTypes, Object... args) {</span></span>
<span class="line"><span style="color:#24292E;">    ClassLoader classLoader </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getClassLoader</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Use names and ensure unique to protect against duplicates</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// &lt;1&gt; 加载指定类型对应的，在 \`META-INF/spring.factories\` 里的类名的数组</span></span>
<span class="line"><span style="color:#24292E;">    Set&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; names </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> LinkedHashSet&lt;&gt;(</span></span>
<span class="line"><span style="color:#24292E;">            SpringFactoriesLoader.</span><span style="color:#6F42C1;">loadFactoryNames</span><span style="color:#24292E;">(type, classLoader));</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// &lt;2&gt; 创建对象们</span></span>
<span class="line"><span style="color:#24292E;">    List&lt;</span><span style="color:#D73A49;">T</span><span style="color:#24292E;">&gt; instances </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createSpringFactoriesInstances</span><span style="color:#24292E;">(type, parameterTypes,</span></span>
<span class="line"><span style="color:#24292E;">            classLoader, args, names);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// &lt;3&gt; 排序对象们</span></span>
<span class="line"><span style="color:#24292E;">    AnnotationAwareOrderComparator.</span><span style="color:#6F42C1;">sort</span><span style="color:#24292E;">(instances);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> instances;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li><p><code>&lt;1&gt;</code>处，调用SpringFactoriesLoader#loadFactoryNames(Class&lt;?&gt; factoryClass, ClassLoader classLoader)</p><p>方法，加载指定类型对应的，在META-INF/spring.factories里的类名的数组。</p><ul><li>在 <a href="https://github.com/YunaiV/spring-boot/blob/master/spring-boot-project/spring-boot-autoconfigure/src/main/resources/META-INF/spring.factories" target="_blank" rel="noreferrer"><code>META-INF/spring.factories</code></a> 文件中，会以 KEY-VALUE 的格式，配置每个类对应的实现类们。</li></ul></li><li><p><code>&lt;2&gt;</code> 处，调用 <code>#createSpringFactoriesInstances(Class&lt;T&gt; type, Class&lt;?&gt;[] parameterTypes, ClassLoader classLoader, Object[] args, Set&lt;String&gt; names)</code> 方法，创建对象们。</p></li><li><p><code>&lt;3&gt;</code> 处，调用 <code>AnnotationAwareOrderComparator#sort(List&lt;?&gt; list)</code> 方法，排序对象们。例如说，类上有 <a href="https://www.jianshu.com/p/8442d21222ef" target="_blank" rel="noreferrer"><code>@Order</code></a> 注解。</p></li></ul><h5 id="run-方法解析" tabindex="-1">run()方法解析 <a class="header-anchor" href="#run-方法解析" aria-label="Permalink to &quot;run()方法解析&quot;">​</a></h5><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// SpringApplication.java</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> ConfigurableApplicationContext </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(String... args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">// &lt;1&gt; 创建 StopWatch 对象，并启动。</span></span>
<span class="line"><span style="color:#E1E4E8;">   StopWatch stopWatch </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StopWatch</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">   stopWatch.</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   ConfigurableApplicationContext context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">   Collection&lt;</span><span style="color:#F97583;">SpringBootExceptionReporter</span><span style="color:#E1E4E8;">&gt; exceptionReporters </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ArrayList&lt;&gt;();    </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">// &lt;2&gt; 设置java.awt.headless系统属性，默认为true</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">// Headless模式是系统的一种配置模式。在该模式下，系统缺少了显示设备、键盘或鼠标。</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#B392F0;">configureHeadlessProperty</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">// 获得 SpringApplicationRunListener 的数组</span></span>
<span class="line"><span style="color:#E1E4E8;">   SpringApplicationRunListeners listeners </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getRunListeners</span><span style="color:#E1E4E8;">(args);</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">// 通知监听者，开始启动</span></span>
<span class="line"><span style="color:#E1E4E8;">   listeners.</span><span style="color:#B392F0;">starting</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// &lt;3&gt; 创建  ApplicationArguments 对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        ApplicationArguments applicationArguments </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DefaultApplicationArguments</span><span style="color:#E1E4E8;">(args);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// &lt;4&gt; 加载属性配置。执行完成后，所有的 environment 的属性都会加载进来，包括 application.properties 和外部的属性配置。</span></span>
<span class="line"><span style="color:#E1E4E8;">        ConfigurableEnvironment environment </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">prepareEnvironment</span><span style="color:#E1E4E8;">(listeners, applicationArguments);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">configureIgnoreBeanInfo</span><span style="color:#E1E4E8;">(environment);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// &lt;5&gt; 打印 Spring Banner</span></span>
<span class="line"><span style="color:#E1E4E8;">        Banner printedBanner </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">printBanner</span><span style="color:#E1E4E8;">(environment);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// &lt;6&gt; 创建 Spring 容器</span></span>
<span class="line"><span style="color:#E1E4E8;">        context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createApplicationContext</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// &lt;7&gt; 注册异常分析器</span></span>
<span class="line"><span style="color:#E1E4E8;">        exceptionReporters </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getSpringFactoriesInstances</span><span style="color:#E1E4E8;">(SpringBootExceptionReporter.class,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                                         </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Class</span><span style="color:#E1E4E8;">[] { ConfigurableApplicationContext.class }, context);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// &lt;8&gt; Spring上下文前置处理-主要是调用所有初始化类的 initialize 方法 </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">prepareContext</span><span style="color:#E1E4E8;">(context, environment, listeners, applicationArguments, printedBanner);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// &lt;9&gt; Spring上下文刷新-初始化 Spring 容器</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">refreshContext</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// &lt;10&gt; 执行 Spring 容器的初始化的后置逻辑。默认实现为空。</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">afterRefresh</span><span style="color:#E1E4E8;">(context, applicationArguments);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// &lt;11&gt; 停止 StopWatch 统计时长</span></span>
<span class="line"><span style="color:#E1E4E8;">        stopWatch.</span><span style="color:#B392F0;">stop</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// &lt;12&gt; 打印 Spring Boot 启动的时长日志。</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.logStartupInfo) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StartupInfoLogger</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.mainApplicationClass).</span><span style="color:#B392F0;">logStarted</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">getApplicationLog</span><span style="color:#E1E4E8;">(), stopWatch);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// &lt;13&gt; 通知 SpringApplicationRunListener 的数组，Spring 容器启动完成。</span></span>
<span class="line"><span style="color:#E1E4E8;">        listeners.</span><span style="color:#B392F0;">started</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// &lt;14&gt; 调用 ApplicationRunner 或者 CommandLineRunner 的运行方法。</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">callRunners</span><span style="color:#E1E4E8;">(context, applicationArguments);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (Throwable </span><span style="color:#FFAB70;">ex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// &lt;14.1&gt; 如果发生异常，则进行处理，并抛出 IllegalStateException 异常</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">handleRunFailure</span><span style="color:#E1E4E8;">(context, ex, exceptionReporters, listeners);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IllegalStateException</span><span style="color:#E1E4E8;">(ex);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// &lt;15&gt; 通知 SpringApplicationRunListener 的数组，Spring 容器运行中。</span></span>
<span class="line"><span style="color:#E1E4E8;">        listeners.</span><span style="color:#B392F0;">running</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (Throwable </span><span style="color:#FFAB70;">ex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// &lt;15.1&gt; 如果发生异常，则进行处理，并抛出 IllegalStateException 异常</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">handleRunFailure</span><span style="color:#E1E4E8;">(context, ex, exceptionReporters, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IllegalStateException</span><span style="color:#E1E4E8;">(ex);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> context;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// SpringApplication.java</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> ConfigurableApplicationContext </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(String... args) {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">// &lt;1&gt; 创建 StopWatch 对象，并启动。</span></span>
<span class="line"><span style="color:#24292E;">   StopWatch stopWatch </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StopWatch</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">   stopWatch.</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   ConfigurableApplicationContext context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">   Collection&lt;</span><span style="color:#D73A49;">SpringBootExceptionReporter</span><span style="color:#24292E;">&gt; exceptionReporters </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ArrayList&lt;&gt;();    </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">// &lt;2&gt; 设置java.awt.headless系统属性，默认为true</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">// Headless模式是系统的一种配置模式。在该模式下，系统缺少了显示设备、键盘或鼠标。</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6F42C1;">configureHeadlessProperty</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">// 获得 SpringApplicationRunListener 的数组</span></span>
<span class="line"><span style="color:#24292E;">   SpringApplicationRunListeners listeners </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getRunListeners</span><span style="color:#24292E;">(args);</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">// 通知监听者，开始启动</span></span>
<span class="line"><span style="color:#24292E;">   listeners.</span><span style="color:#6F42C1;">starting</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// &lt;3&gt; 创建  ApplicationArguments 对象</span></span>
<span class="line"><span style="color:#24292E;">        ApplicationArguments applicationArguments </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DefaultApplicationArguments</span><span style="color:#24292E;">(args);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// &lt;4&gt; 加载属性配置。执行完成后，所有的 environment 的属性都会加载进来，包括 application.properties 和外部的属性配置。</span></span>
<span class="line"><span style="color:#24292E;">        ConfigurableEnvironment environment </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">prepareEnvironment</span><span style="color:#24292E;">(listeners, applicationArguments);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">configureIgnoreBeanInfo</span><span style="color:#24292E;">(environment);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// &lt;5&gt; 打印 Spring Banner</span></span>
<span class="line"><span style="color:#24292E;">        Banner printedBanner </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">printBanner</span><span style="color:#24292E;">(environment);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// &lt;6&gt; 创建 Spring 容器</span></span>
<span class="line"><span style="color:#24292E;">        context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createApplicationContext</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// &lt;7&gt; 注册异常分析器</span></span>
<span class="line"><span style="color:#24292E;">        exceptionReporters </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getSpringFactoriesInstances</span><span style="color:#24292E;">(SpringBootExceptionReporter.class,</span></span>
<span class="line"><span style="color:#24292E;">                                                         </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">Class</span><span style="color:#24292E;">[] { ConfigurableApplicationContext.class }, context);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// &lt;8&gt; Spring上下文前置处理-主要是调用所有初始化类的 initialize 方法 </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">prepareContext</span><span style="color:#24292E;">(context, environment, listeners, applicationArguments, printedBanner);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// &lt;9&gt; Spring上下文刷新-初始化 Spring 容器</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">refreshContext</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// &lt;10&gt; 执行 Spring 容器的初始化的后置逻辑。默认实现为空。</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">afterRefresh</span><span style="color:#24292E;">(context, applicationArguments);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// &lt;11&gt; 停止 StopWatch 统计时长</span></span>
<span class="line"><span style="color:#24292E;">        stopWatch.</span><span style="color:#6F42C1;">stop</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// &lt;12&gt; 打印 Spring Boot 启动的时长日志。</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.logStartupInfo) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StartupInfoLogger</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.mainApplicationClass).</span><span style="color:#6F42C1;">logStarted</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">getApplicationLog</span><span style="color:#24292E;">(), stopWatch);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// &lt;13&gt; 通知 SpringApplicationRunListener 的数组，Spring 容器启动完成。</span></span>
<span class="line"><span style="color:#24292E;">        listeners.</span><span style="color:#6F42C1;">started</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// &lt;14&gt; 调用 ApplicationRunner 或者 CommandLineRunner 的运行方法。</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">callRunners</span><span style="color:#24292E;">(context, applicationArguments);</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (Throwable </span><span style="color:#E36209;">ex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// &lt;14.1&gt; 如果发生异常，则进行处理，并抛出 IllegalStateException 异常</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">handleRunFailure</span><span style="color:#24292E;">(context, ex, exceptionReporters, listeners);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IllegalStateException</span><span style="color:#24292E;">(ex);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// &lt;15&gt; 通知 SpringApplicationRunListener 的数组，Spring 容器运行中。</span></span>
<span class="line"><span style="color:#24292E;">        listeners.</span><span style="color:#6F42C1;">running</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (Throwable </span><span style="color:#E36209;">ex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// &lt;15.1&gt; 如果发生异常，则进行处理，并抛出 IllegalStateException 异常</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">handleRunFailure</span><span style="color:#24292E;">(context, ex, exceptionReporters, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IllegalStateException</span><span style="color:#24292E;">(ex);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> context;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ul><li><p><code>&lt;1&gt;</code> 处，创建 StopWatch 对象，并调用 <code>StopWatch#run()</code> 方法来启动。StopWatch 主要用于简单统计 run 启动过程的时长。</p></li><li><p><code>&lt;2&gt;</code> 处，配置 headless 属性。这个逻辑，可以无视，和 AWT 相关。</p></li><li><p><code>&lt;3&gt;</code> 处，调用 <code>#getRunListeners(String[] args)</code> 方法，获得 SpringApplicationRunListener 数组，并启动监听。代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// SpringApplication.java</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> SpringApplicationRunListeners </span><span style="color:#B392F0;">getRunListeners</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	Class&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt;[] types </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> Class&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt;[] { SpringApplication.class, </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[].class };</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SpringApplicationRunListeners</span><span style="color:#E1E4E8;">(logger, </span><span style="color:#B392F0;">getSpringFactoriesInstances</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">			SpringApplicationRunListener.class, types, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">, args));</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// SpringApplication.java</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> SpringApplicationRunListeners </span><span style="color:#6F42C1;">getRunListeners</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] args) {</span></span>
<span class="line"><span style="color:#24292E;">	Class&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt;[] types </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> Class&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt;[] { SpringApplication.class, </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[].class };</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SpringApplicationRunListeners</span><span style="color:#24292E;">(logger, </span><span style="color:#6F42C1;">getSpringFactoriesInstances</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">			SpringApplicationRunListener.class, types, </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">, args));</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li><li><p><code>&lt;4&gt;</code> 处，调用 <code>#prepareEnvironment(SpringApplicationRunListeners listeners, ApplicationArguments applicationArguments)</code> 方法，加载属性配置。执行完成后，所有的 environment 的属性都会加载进来，包括 <code>application.properties</code> 和外部的属性配置</p></li><li><p><code>&lt;5&gt;</code> 处，调用 <code>#printBanner(ConfigurableEnvironment environment)</code> 方法，打印 Spring Banner 。</p></li><li><p><code>&lt;6&gt;</code> 处，调用 <code>#createApplicationContext()</code> 方法，创建 Spring 容器</p></li><li><p><code>&lt;7&gt;</code> 处，通过 <code>#getSpringFactoriesInstances(Class&lt;T&gt; type)</code> 方法，进行获得 SpringBootExceptionReporter 类型的对象数组。SpringBootExceptionReporter ，记录启动过程中的异常信息。</p></li><li><p><code>&lt;8&gt;</code> 处，调用 <code>#prepareContext(...)</code> 方法，主要是调用所有初始化类的 <code>#initialize(...)</code> 方法。</p></li><li><p><code>&lt;9&gt;</code> 处，调用 \`\`#refreshContext(ConfigurableApplicationContext context)\` 方法，启动（刷新） Spring 容器</p></li><li><p><code>&lt;10&gt;</code> 处，调用 <code>#afterRefresh(ConfigurableApplicationContext context, ApplicationArguments args)</code> 方法，执行 Spring 容器的初始化的后置逻辑。<strong>默认实现为空</strong>。</p></li><li><p><code>&lt;11&gt;</code> 处，停止 StopWatch 统计时长。</p></li><li><p><code>&lt;12&gt;</code> 处，打印 Spring Boot 启动的时长日志。</p></li><li><p><code>&lt;13&gt;</code> 处，调用 <code>SpringApplicationRunListeners#started(ConfigurableApplicationContext context)</code> 方法，通知 SpringApplicationRunListener 的数组，Spring 容器启动完成。</p></li><li><p><code>&lt;14&gt;</code> 处，调用 <code>#callRunners(ApplicationContext context, ApplicationArguments args)</code> 方法，调用 ApplicationRunner 或者 CommandLineRunner 的运行方法。</p></li><li><p><code>&lt;15&gt;</code> 处，调用 <code>SpringApplicationRunListeners#running(ConfigurableApplicationContext context)</code> 方法，通知 SpringApplicationRunListener 的数组，Spring 容器运行中。</p></li></ul><h3 id="springboot注解" tabindex="-1">SpringBoot注解 <a class="header-anchor" href="#springboot注解" aria-label="Permalink to &quot;SpringBoot注解&quot;">​</a></h3><h4 id="条件注解" tabindex="-1">条件注解 <a class="header-anchor" href="#条件注解" aria-label="Permalink to &quot;条件注解&quot;">​</a></h4><ul><li><code>@ConditionalOnBean</code>：当容器里有指定 Bean 的条件下</li><li><code>@ConditionalOnMissingBean</code>：当容器里没有指定 Bean 的情况下</li><li><code>@ConditionalOnSingleCandidate</code>：当指定 Bean 在容器中只有一个，或者虽然有多个但是指定首选 Bean</li><li><code>@ConditionalOnClass</code>：当类路径下有指定类的条件下</li><li><code>@ConditionalOnMissingClass</code>：当类路径下没有指定类的条件下</li><li><code>@ConditionalOnProperty</code>：指定的属性是否有指定的值</li><li><code>@ConditionalOnResource</code>：类路径是否有指定的值</li><li><code>@ConditionalOnExpression</code>：基于 SpEL 表达式作为判断条件</li><li><code>@ConditionalOnJava</code>：基于 Java 版本作为判断条件</li><li><code>@ConditionalOnJndi</code>：在 JNDI 存在的条件下差在指定的位置</li><li><code>@ConditionalOnNotWebApplication</code>：当前项目不是 Web 项目的条件下</li><li><code>@ConditionalOnWebApplication</code>：当前项目是 Web 项 目的条件下</li></ul><h3 id="springboot配置文件" tabindex="-1">SpringBoot配置文件 <a class="header-anchor" href="#springboot配置文件" aria-label="Permalink to &quot;SpringBoot配置文件&quot;">​</a></h3><h4 id="加载顺序" tabindex="-1">加载顺序 <a class="header-anchor" href="#加载顺序" aria-label="Permalink to &quot;加载顺序&quot;">​</a></h4><blockquote><p>当Spring Boot 项目中可以存在多个 application.properties 或 apllication.yml时，Spring Boot 启动时会扫描以下 5 个位置的 application.properties 或 apllication.yml 文件，并将它们作为 Spring boot 的默认配置文件。以下是加载默认配置文件的优先级顺序，从高到底，高优先级的配置可以覆盖低优先级的配置信息：</p><p>1&gt; file:./config/*/</p><p>2&gt; file:./config/</p><p>3&gt; file:./</p><p>4&gt; classpath:/config/</p><p>5&gt; classpath:/</p></blockquote><p><img src="`+i+'" alt="image-20230110115113929"></p>',138),d=[E];function u(g,A,h,b,v,C){return n(),a("div",null,d)}const D=s(y,[["render",u]]);export{m as __pageData,D as default};
