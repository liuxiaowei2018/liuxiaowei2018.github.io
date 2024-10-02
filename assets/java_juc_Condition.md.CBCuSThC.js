import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.PLIGnzYk.js";const o=JSON.parse('{"title":"Condition","description":"","frontmatter":{},"headers":[],"relativePath":"java/juc/Condition.md","filePath":"java/juc/Condition.md","lastUpdated":1727778851000}'),h={name:"java/juc/Condition.md"},l=n(`<h1 id="condition" tabindex="-1">Condition <a class="header-anchor" href="#condition" aria-label="Permalink to &quot;Condition&quot;">​</a></h1><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Condition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  	//与调用锁对象的wait方法一样，会进入到等待状态，但是这里需要调用Condition的signal或signalAll方法进行唤醒</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //感觉就是和普通对象的wait和notify是对应的 同时，等待状态下是可以响应中断的</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> 	void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">throws</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> InterruptedException;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  	//同上，但不响应中断（看名字都能猜到）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  	void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> awaitUninterruptibly</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  	//等待指定时间，如果在指定时间（纳秒）内被唤醒，会返回剩余时间，如果超时，会返回0或负数，可以响应中断</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  	long</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> awaitNanos</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">long</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> nanosTimeout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">throws</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> InterruptedException;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  	//等待指定时间（可以指定时间单位），如果等待时间内被唤醒，返回true，否则返回false，可以响应中断</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  	boolean</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">long</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> time</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, TimeUnit </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">unit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">throws</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> InterruptedException;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  	//可以指定一个明确的时间点，如果在时间点之前被唤醒，返回true，否则返回false，可以响应中断</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  	boolean</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> awaitUntil</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Date </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">deadline</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">throws</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> InterruptedException;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  	//唤醒一个处于等待状态的线程，注意还得获得锁才能接着运行</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  	void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> signal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  	//同上，但是是唤醒所有等待线程</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  	void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> signalAll</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>在AQS中，Condition有一个实现类ConditionObject，而这里也是使用了链表实现了条件队列：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ConditionObject</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> implements</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Condition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, java.io.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Serializable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> final</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> long</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> serialVersionUID </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1173984872572414699L</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    /** 条件队列的头结点 */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> transient</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Node firstWaiter;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    /** 条件队列的尾结点 */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> transient</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Node lastWaiter;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  	//...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>这里是直接使用了AQS中的Node类，但是使用的是Node类中的nextWaiter字段连接节点，并且Node的status为CONDITION：</p><p><img src="https://knowledge-2018.oss-cn-shanghai.aliyuncs.com/img/202410011823345.jpeg" alt="image-20220307115850295"></p><p>我们知道，当一个线程调用<code>await()</code>方法时，会进入等待状态，直到其他线程调用<code>signal()</code>方法将其唤醒，而这里的条件队列，正是用于存储这些处于等待状态的线程。</p><p>我们先来看看最关键的<code>await()</code>方法是如何实现的，为了防止一会绕晕，在开始之前，我们先明确此方法的目标：</p><ul><li>只有已经持有锁的线程才可以使用此方法</li><li>当调用此方法后，会直接释放锁，无论加了多少次锁</li><li>只有其他线程调用<code>signal()</code>或是被中断时才会唤醒等待中的线程</li><li>被唤醒后，需要等待其他线程释放锁，拿到锁之后才可以继续执行，并且会恢复到之前的状态（await之前加了几层锁唤醒后依然是几层锁）</li></ul><p>源码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> final</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() throws InterruptedException {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (Thread.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">interrupted</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">())</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> InterruptedException</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//如果在调用await之前就被添加了中断标记，那么会直接抛出中断异常</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Node node </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> addConditionWaiter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//为当前线程创建一个新的节点，并将其加入到条件队列中</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> savedState </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fullyRelease</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(node);    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//完全释放当前线程持有的锁，并且保存一下state值，因为唤醒之后还得恢复</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> interruptMode </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//用于保存中断状态</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isOnSyncQueue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(node)) {   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//循环判断是否位于同步队列中，如果等待状态下的线程被其他线程唤醒，那么会正常进入到AQS的等待队列中（之后我们会讲）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        LockSupport.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">park</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//如果依然处于等待状态，那么继续挂起</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ((interruptMode </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> checkInterruptWhileWaiting</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(node)) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//看看等待的时候是不是被中断了</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            break</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  	//出了循环之后，那线程肯定是已经醒了，这时就差拿到锁就可以恢复运行了</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">acquireQueued</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(node, savedState) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> interruptMode </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> THROW_IE)  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//直接开始acquireQueued尝试拿锁（之前已经讲过了）从这里开始基本就和一个线程去抢锁是一样的了</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        interruptMode </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> REINTERRUPT;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  	//已经拿到锁了，基本可以开始继续运行了，这里再进行一下后期清理工作</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (node.nextWaiter </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        unlinkCancelledWaiters</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//将等待队列中，不是Node.CONDITION状态的节点移除</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (interruptMode </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//依然是响应中断</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        reportInterruptAfterWait</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(interruptMode);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  	//OK，接着该干嘛干嘛</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>实际上<code>await()</code>方法比较中规中矩，大部分操作也在我们的意料之中，那么我们接着来看<code>signal()</code>方法是如何实现的，同样的，为了防止各位绕晕，先明确signal的目标：</p><ul><li>只有持有锁的线程才能唤醒锁所属的Condition等待的线程</li><li>优先唤醒条件队列中的第一个，如果唤醒过程中出现问题，接着找往下找，直到找到一个可以唤醒的</li><li>唤醒操作本质上是将条件队列中的结点直接丢进AQS等待队列中，让其参与到锁的竞争中</li><li>拿到锁之后，线程才能恢复运行</li></ul><p><img src="https://knowledge-2018.oss-cn-shanghai.aliyuncs.com/img/202410011823092.jpeg" alt="image-20220307120449303"></p><p>源码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> final</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> signal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isHeldExclusively</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">())    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//先看看当前线程是不是持有锁的状态</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        throw</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IllegalMonitorStateException</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//不是？那你不配唤醒别人</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Node first </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> firstWaiter;    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//获取条件队列的第一个结点</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (first </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//如果队列不为空，获取到了，那么就可以开始唤醒操作</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        doSignal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(first);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">private</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> doSignal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Node first) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    do</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ( (firstWaiter </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> first.nextWaiter) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//如果当前节点在本轮循环没有后继节点了，条件队列就为空了</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            lastWaiter </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//所以这里相当于是直接清空</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        first.nextWaiter </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//将给定节点的下一个结点设置为null，因为当前结点马上就会离开条件队列了</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">transferForSignal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(first) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   //接着往下看</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">             (first </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> firstWaiter) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//能走到这里只能说明给定节点被设定为了取消状态，那就继续看下一个结点</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">final</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> boolean</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> transferForSignal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Node node) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    /*</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     * 如果这里CAS失败，那有可能此节点被设定为了取消状态</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">compareAndSetWaitStatus</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(node, Node.CONDITION, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //CAS成功之后，结点的等待状态就变成了默认值0，接着通过enq方法直接将节点丢进AQS的等待队列中，相当于唤醒并且可以等待获取锁了</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  	//这里enq方法返回的是加入之后等待队列队尾的前驱节点，就是原来的tail</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Node p </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> enq</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(node);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ws </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> p.waitStatus;   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//保存前驱结点的等待状态</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  	//如果上一个节点的状态为取消, 或者尝试设置上一个节点的状态为SIGNAL失败（可能是在ws&gt;0判断完之后马上变成了取消状态，导致CAS失败）</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (ws </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ||</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> !</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">compareAndSetWaitStatus</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(p, ws, Node.SIGNAL))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        LockSupport.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">unpark</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(node.thread);  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//直接唤醒线程</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>其实最让人不理解的就是倒数第二行，明明上面都正常进入到AQS等待队列了，应该是可以开始走正常流程了，那么这里为什么还要提前来一次unpark呢？</p><p>这里其实是为了进行优化而编写，直接unpark会有两种情况：</p><ul><li>如果插入结点前，AQS等待队列的队尾节点就已经被取消，则满足wc &gt; 0</li><li>如果插入node后，AQS内部等待队列的队尾节点已经稳定，满足tail.waitStatus == 0，但在执行ws &gt; 0之后!compareAndSetWaitStatus(p, ws, Node.SIGNAL)之前被取消，则CAS也会失败，满足compareAndSetWaitStatus(p, ws, Node.SIGNAL) == false</li></ul><p>如果这里被提前unpark，那么在<code>await()</code>方法中将可以被直接唤醒，并跳出while循环，直接开始争抢锁，因为前一个等待结点是被取消的状态，没有必要再等它了。所以，大致流程下：</p><p><img src="https://knowledge-2018.oss-cn-shanghai.aliyuncs.com/img/202410011823913.jpeg" alt="image-20220307131536020"></p>`,23),t=[l];function p(k,e,d,E,r,g){return a(),i("div",null,t)}const c=s(h,[["render",p]]);export{o as __pageData,c as default};
