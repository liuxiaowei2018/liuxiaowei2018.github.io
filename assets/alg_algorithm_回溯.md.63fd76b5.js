import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.8048b864.js";const p="/assets/image-20231124163018465.1f1c39f4.png",A=JSON.parse('{"title":"回溯","description":"","frontmatter":{},"headers":[],"relativePath":"alg/algorithm/回溯.md","filePath":"alg/algorithm/回溯.md","lastUpdated":1701053945000}'),o={name:"alg/algorithm/回溯.md"},e=l(`<h1 id="回溯" tabindex="-1">回溯 <a class="header-anchor" href="#回溯" aria-label="Permalink to &quot;回溯&quot;">​</a></h1><p>「回溯算法 backtracking algorithm」是一种通过穷举来解决问题的方法，它的核心思想是从一个初始状态出发，暴力搜索所有可能的解决方案，当遇到正确的解则将其记录，直到找到解或者尝试了所有可能的选择都无法找到解为止。</p><p>回溯算法通常采用“深度优先搜索”来遍历解空间。在二叉树中，我们提到前序、中序和后序遍历都属于深度优先搜索。</p><h2 id="框架代码" tabindex="-1">框架代码 <a class="header-anchor" href="#框架代码" aria-label="Permalink to &quot;框架代码&quot;">​</a></h2><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/* 回溯算法框架 */</span></span>
<span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">backtrack</span><span style="color:#E1E4E8;">(State state, List</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Choice</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> choices, List</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">State</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> res) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 判断是否为解</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isSolution</span><span style="color:#E1E4E8;">(state)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 记录解</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">recordSolution</span><span style="color:#E1E4E8;">(state, res);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 停止继续搜索</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 遍历所有选择</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (Choice choice </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> choices) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 剪枝：判断选择是否合法</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isValid</span><span style="color:#E1E4E8;">(state, choice)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 尝试：做出选择，更新状态</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">makeChoice</span><span style="color:#E1E4E8;">(state, choice);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">backtrack</span><span style="color:#E1E4E8;">(state, choices, res);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 回退：撤销选择，恢复到之前的状态</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">undoChoice</span><span style="color:#E1E4E8;">(state, choice);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/* 回溯算法框架 */</span></span>
<span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">backtrack</span><span style="color:#24292E;">(State state, List</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Choice</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> choices, List</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">State</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> res) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 判断是否为解</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isSolution</span><span style="color:#24292E;">(state)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 记录解</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">recordSolution</span><span style="color:#24292E;">(state, res);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 停止继续搜索</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 遍历所有选择</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (Choice choice </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> choices) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 剪枝：判断选择是否合法</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isValid</span><span style="color:#24292E;">(state, choice)) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 尝试：做出选择，更新状态</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">makeChoice</span><span style="color:#24292E;">(state, choice);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">backtrack</span><span style="color:#24292E;">(state, choices, res);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 回退：撤销选择，恢复到之前的状态</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">undoChoice</span><span style="color:#24292E;">(state, choice);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>基于框架代码来解决问题。状态 <code>state</code> 为节点遍历路径，选择 <code>choices</code> 为当前节点的左子节点和右子节点，结果 <code>res</code> 是路径列表。</p><p>问题如下：</p><blockquote><p>在二叉树中搜索所有值为 7 的节点，请返回根节点到这些节点的路径，<strong>并要求路径中不包含值为 3 的节点</strong>。</p></blockquote><p><img src="`+p+'" alt="image-20231124163018465"></p>',9),c=[e];function t(r,E,i,y,h,d){return a(),n("div",null,c)}const D=s(o,[["render",t]]);export{A as __pageData,D as default};
