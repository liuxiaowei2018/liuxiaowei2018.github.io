import{_ as t,c as a,o as d,a4 as e}from"./chunks/framework.PLIGnzYk.js";const u=JSON.parse('{"title":"开发环境配置","description":"","frontmatter":{},"headers":[],"relativePath":"developer/开发环境配置.md","filePath":"developer/开发环境配置.md","lastUpdated":1723692215000}'),s={name:"developer/开发环境配置.md"},i=e(`<h1 id="开发环境配置" tabindex="-1">开发环境配置 <a class="header-anchor" href="#开发环境配置" aria-label="Permalink to &quot;开发环境配置&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#_1、idea">1、IDEA</a><ul><li><a href="#类模板">类模板</a></li><li><a href="#内存配置">内存配置</a></li><li><a href="#debug调试">Debug调试</a></li><li><a href="#快捷键">快捷键</a></li><li><a href="#常用插件">常用插件</a></li><li><a href="#注释对齐">注释对齐</a></li><li><a href="#多实例启动">多实例启动</a></li><li><a href="#配置自动提示">配置自动提示</a></li></ul></li><li><a href="#_2、vscode">2、VsCode</a><ul><li><a href="#插件">插件</a></li></ul></li></ul></nav><h2 id="_1、idea" tabindex="-1">1、IDEA <a class="header-anchor" href="#_1、idea" aria-label="Permalink to &quot;1、IDEA&quot;">​</a></h2><h3 id="类模板" tabindex="-1">类模板 <a class="header-anchor" href="#类模板" aria-label="Permalink to &quot;类模板&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * \${TODO} </span></span>
<span class="line"><span> * @author liuxiaowei</span></span>
<span class="line"><span> * @date \${YEAR}-\${MONTH}-\${DAY} \${TIME}</span></span>
<span class="line"><span> * @Description</span></span>
<span class="line"><span> */</span></span></code></pre></div><h3 id="内存配置" tabindex="-1">内存配置 <a class="header-anchor" href="#内存配置" aria-label="Permalink to &quot;内存配置&quot;">​</a></h3><blockquote><p>电脑配置i7+16G</p><p>使用的是idea64.exe，所以配置idea64.exe.vmoptions</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>-Xms2048m</span></span>
<span class="line"><span>-Xmx4096m</span></span>
<span class="line"><span>-XX:ReservedCodeCacheSize=800m</span></span>
<span class="line"><span>-XX:+UseConcMarkSweepGC</span></span>
<span class="line"><span>-XX:SoftRefLRUPolicyMSPerMB=50</span></span></code></pre></div><h3 id="debug调试" tabindex="-1">Debug调试 <a class="header-anchor" href="#debug调试" aria-label="Permalink to &quot;Debug调试&quot;">​</a></h3><blockquote><p><a href="https://cloud.tencent.com/developer/article/2420185" target="_blank" rel="noreferrer">IDEA 2024 的30个Debug调试技巧</a></p><p><a href="https://blog.csdn.net/u014082714/article/details/103401436" target="_blank" rel="noreferrer">IDEA 阅读调试 Java 源码的技巧</a></p></blockquote><h3 id="快捷键" tabindex="-1">快捷键 <a class="header-anchor" href="#快捷键" aria-label="Permalink to &quot;快捷键&quot;">​</a></h3><blockquote><p><a href="https://blog.csdn.net/itomge/article/details/124917740" target="_blank" rel="noreferrer">IntelliJ IDEA 快捷键</a></p></blockquote><h3 id="常用插件" tabindex="-1">常用插件 <a class="header-anchor" href="#常用插件" aria-label="Permalink to &quot;常用插件&quot;">​</a></h3><table tabindex="0"><thead><tr><th><strong>插件/工具名称</strong></th><th><strong>描述</strong></th><th>引用</th></tr></thead><tbody><tr><td>Key Promoter X</td><td>提示您在 IntelliJ IDEA 中使用键盘快捷键而不是鼠标操作。</td><td></td></tr><tr><td>CodeGlance</td><td>在编辑器侧边栏显示代码地图和快速导航功能。</td><td>Y</td></tr><tr><td>SonarLint</td><td>集成 SonarQube 静态代码分析，实时检查代码质量和安全性问题。</td><td></td></tr><tr><td>GenerateO2O</td><td>生成代码以支持线上到线下（O2O）业务模式的转换。</td><td></td></tr><tr><td>.ignore</td><td>提供在项目中忽略特定文件和目录的支持，生成.gitignore文件。</td><td>Y</td></tr><tr><td>Save Actions</td><td>自动保存、格式化和优化代码的插件。</td><td>Y</td></tr><tr><td>arthsa idea</td><td>阿里巴巴开源的 Java 诊断工具 Arthas 的 IDEA 插件。</td><td>Y</td></tr><tr><td>ArthasHotSwap</td><td>Arthas 的热部署插件，支持在运行时动态修改 Java 类。</td><td></td></tr><tr><td>Alibaba Cloud Toolkit</td><td>阿里云开发工具包，提供与阿里云服务集成的功能和工具。</td><td></td></tr><tr><td>AllFormat</td><td>提供代码格式化和样式统一的功能，支持不同语言和文件类型。</td><td></td></tr><tr><td>VisualVM Launcher3</td><td>Java 虚拟机监控和分析工具 VisualVM 的插件版本。</td><td>Y</td></tr><tr><td>CamelCase</td><td>支持在代码中自动转换驼峰命名和下划线命名。</td><td>Y</td></tr><tr><td>Alibaba Guidelines</td><td>阿里巴巴编码规范插件，帮助开发者遵循阿里巴巴的编码规范。</td><td>Y</td></tr><tr><td>Grep Console</td><td>在控制台中过滤、高亮和分析输出信息的插件。</td><td>Y</td></tr><tr><td>SequenceDiagram</td><td>根据代码生成时序图的插件，支持多种代码语言。</td><td>Y</td></tr><tr><td>LeetCode Editor</td><td>集成 LeetCode 在 IDE 中刷题的插件，提供代码编辑和测试环境。</td><td></td></tr><tr><td>idea-yapi</td><td>集成 Yapi 接口管理平台的插件。</td><td></td></tr><tr><td>JUnit 5 Mockito code generator</td><td>自动生成 JUnit 5 和 Mockito 测试代码的插件。</td><td></td></tr><tr><td>activate-power-mode</td><td>给 IDE 添加激动人心的动画效果，增强编码体验。</td><td></td></tr><tr><td>Rainbow Brackets</td><td>根据括号的深度显示不同颜色，增强代码块的可读性。</td><td>Y</td></tr><tr><td>cyan Light Theme</td><td>提供清爽的青色主题，改变 IDE 的视觉外观。</td><td></td></tr><tr><td>stackoverflow</td><td>提供 Stack Overflow 搜索和浏览功能，帮助解决编程问题。</td><td></td></tr><tr><td>GsonFormatPlus</td><td>自动生成 Gson 相关的 Java 类和代码，简化 Gson 使用。</td><td></td></tr><tr><td>any-rule</td><td>提供多种代码规范检查和自动修复功能的插件。</td><td></td></tr><tr><td>Translation</td><td>提供代码注释和文档的翻译功能，支持多种语言。</td><td></td></tr><tr><td>MybatisLogFormat</td><td>格式化 MyBatis 输出的 SQL 日志的插件。</td><td></td></tr><tr><td>MybatisX</td><td>MyBatis 代码生成和 SQL 语句分析工具。</td><td></td></tr><tr><td>MyBatisCodeHelperPro</td><td>MyBatis 开发辅助工具，提供自动补全和查询优化功能。</td><td></td></tr><tr><td>Maven Helper</td><td>提供 Maven 项目管理和依赖查看的工具。</td><td>Y</td></tr><tr><td>Lombok</td><td>自动化生成 Java 代码中的样板代码，简化开发流程。</td><td>Y</td></tr><tr><td>Codota</td><td>提供智能代码建议和自动补全功能，基于大数据分析。</td><td></td></tr><tr><td>JRebel</td><td>提供 Java 热部署功能，无需重启应用即可更新代码。</td><td></td></tr><tr><td>Git Commit Template</td><td>提供 Git 提交消息模板和管理功能的插件。</td><td></td></tr><tr><td>IDEA MapStruct</td><td>提供 MapStruct 映射框架的支持和代码生成功能。</td><td></td></tr></tbody></table><h3 id="注释对齐" tabindex="-1">注释对齐 <a class="header-anchor" href="#注释对齐" aria-label="Permalink to &quot;注释对齐&quot;">​</a></h3><p>打开 IDEA 设置 <code>Editor -&gt; Code Style -&gt; Java -&gt; Code Generation</code>，找到下方的 <code>Comment code</code> 区域， 取消 <code>Line comment at first column</code> 的默认勾选，将 <code>Add a space at line comment start</code> 以及 <code>Enforce on reformat</code> 打上勾就可以了。</p><p><img src="https://knowledge-2018.oss-cn-shanghai.aliyuncs.com/img/202407191401493.png" alt="image-20240719140129424"></p><h3 id="多实例启动" tabindex="-1">多实例启动 <a class="header-anchor" href="#多实例启动" aria-label="Permalink to &quot;多实例启动&quot;">​</a></h3><p>打开服务配置，点击 <code>Modify options</code> 选项，勾选打开 <code>Operation System -&gt; Alow multiple instance</code> ，继续勾选打开 <code>Java -&gt; Program arguments</code>，然后在 <code>Program arguments</code> 输入框中指定端口，在 <code>Spring</code> 项目中通过 <code>--server.port=9999</code>，如下图（注意每次启动实例时，这里的端口不能相同），</p><p><img src="https://knowledge-2018.oss-cn-shanghai.aliyuncs.com/img/202407191406705.png" alt="image-20240719140639640"></p><h3 id="配置自动提示" tabindex="-1">配置自动提示 <a class="header-anchor" href="#配置自动提示" aria-label="Permalink to &quot;配置自动提示&quot;">​</a></h3><p>IDE是通过读取配置信息的元数据而实现自动提示的，而元数据在目录<code>META-INF</code>中的<code>spring-configuration-metadata.json</code> 或者 <code>additional-spring-configuration-metadata.json</code></p><p>工程中添加以下jar包</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;spring-boot-configuration-processor&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">optional</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;true&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">optional</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>搜索<code>Annotation Processor</code>并设置<code>Enable annotation processing</code></p><p>项目在重新编译后就会自动生成<code>spring-configuration-metadata.json</code>文件，自定义的配置实现自动提示</p><h2 id="_2、vscode" tabindex="-1">2、VsCode <a class="header-anchor" href="#_2、vscode" aria-label="Permalink to &quot;2、VsCode&quot;">​</a></h2><h3 id="插件" tabindex="-1">插件 <a class="header-anchor" href="#插件" aria-label="Permalink to &quot;插件&quot;">​</a></h3><table tabindex="0"><thead><tr><th><strong>插件名称</strong></th><th><strong>描述</strong></th></tr></thead><tbody><tr><td>Vetur</td><td>Vue.js 开发必备插件，提供语法高亮、智能感知、Emmet 支持以及代码格式化功能。</td></tr><tr><td>EsLint</td><td>JavaScript 和 TypeScript 的语法检查工具，用于代码风格和错误的静态分析和纠正。</td></tr><tr><td>Auto Close Tag</td><td>自动闭合 HTML/XML 标签的插件，在输入开始标签时自动补全对应的结束标签。</td></tr><tr><td>Auto Rename Tag</td><td>自动同步修改 HTML/XML 标签对的另一侧标签，确保标签闭合时的一致性。</td></tr><tr><td>JavaScript(ES6) code snippets</td><td>提供 ES6 语法的智能提示和快速输入，支持 JavaScript、TypeScript、JSX、Vue 等多种文件类型。</td></tr><tr><td>HTML CSS Support</td><td>提供在 HTML 标签中写 class 属性时的智能提示，显示当前项目所支持的样式类。</td></tr><tr><td>HTML Snippets</td><td>提供 HTML 快速自动补全的功能，加速编写 HTML 文件时的标签输入。</td></tr><tr><td>Open in browser</td><td>可以快速在浏览器中打开当前编辑的 HTML 文件或网页。</td></tr><tr><td>Live Server</td><td>以内置服务器的方式运行并实时更新静态和动态页面，支持本地开发和调试。</td></tr><tr><td>Chinese (Simplified) Language Pack for Visual Studio Code</td><td>Visual Studio Code 的简体中文语言包，提供界面和编辑器内容的中文化支持。</td></tr></tbody></table>`,29),r=[i];function n(o,l,p,h,c,g){return d(),a("div",null,r)}const E=t(s,[["render",n]]);export{u as __pageData,E as default};
