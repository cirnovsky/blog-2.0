---
date: '2023-10-13'
title: 'Solution Set -「Nhk R2」'

---

## A

观察数据范围， 我们可以发现 $n \leq 3000, k \leq 10^9$ 指向的是时间复杂度大概率是 $O(n^2)$ 的。 又由于是回文串， 和回文串相关的 $O(n^2)$ 算法最容易想到的就是枚举对称点暴力扩展。 

接着再考虑如何处理操作， 如果我们单独有一个回文串， 想要扩展它的长度， 最优的方法就是在对称点进行操作， 这样每次操作后序列依旧回文， 如 $\texttt{bab}$ 可以操作为 $\texttt{baab}$ ， $\texttt{bcbbcb}$ 可以操作为 $\texttt{bcbbbcb}$ 。 

但是如果不是整个序列为回文串的话， 我们直接找最长回文子串然后在对称点进行操作不一定最优， 所以需要考虑在两侧进行操作（因为不在回文串两侧一定不是最优）， 这时候有两种情况， 一种是可以通过在一侧进行操作后就能继续匹配， 如 $\texttt{bbabc}$ 可以对右侧的 $\texttt{b}$ 操作后扩展回文串长度， 回文串由 $\texttt{bab}$ 变为 $\texttt{bbabb}$ 这个时候我们执行这个操作， 因为这次操作和在对称点进行操作比一定不劣， 如果两端加数都不能继续匹配， 如 $\texttt{cbabd}$ ， 就停止两侧的扩展， 因为此时想要在两侧操作后能扩展， 当且仅当同时对两边进行相同次数的操作， 这样和在对称点操作比起来一定不优。

最后， 如果我们有一段到了序列的首或尾， 我们直接选择在中间操作， 一直操作到长度等于 $k$ 。

## B

从题目最强的限制入手，考虑如何使得每个点恰好处于一个环上？

这是一个很典的 trick，对于任何在环上的点 $p$，出入度都为 $1$，于是将它拆成两个点，记为 $p_{in}, p_{out}$。原图上的一条边 $(u, v)$ 在拆点后的图上就表示为 $(u_{out}, v_{in})$，如果要满足限制，当且仅当该图存在完美匹配。  

现在加入双边权的限制，这是 `0/1 分数规划` 的模型，具体地，我们二分答案 $mid$，如果有解，则满足 $\large\frac{\sum_{i \in E} a_i }{\sum_{i \in E} b_i } \ge mid$，化一下式子变成 $\sum_{i \in E} a_i - mid \cdot {\sum_{i \in E} b_i } \ge 0$，于是重新对每一条边赋权为 $c_i = a_i - mid \cdot b_i$，检验是否有解直接跑 `KM` 即可。  

复杂度取决于 `KM` 的实现方式，较优秀的为 $\Theta(n^3) \log V$，其中 $V$ 是 $a_i, b_i$ 的值域。

## C

让我们来挖掘一些性质。不妨设 $n=2$，它的 $0\sim 2^n-1$ 的序列用二进制表示即为:

$$
\begin{matrix}
00 \\
01 \\
10 \\
11 \\
\end{matrix}
$$

那么当 $n=3$ 时，就相当于是在这个序列前加了一位，这一位可能是 $1$ 也可能是 $0$，列出来即为:

$$
\begin{matrix}
0\quad 00 \\
0\quad 01 \\
0\quad 10 \\
0\quad 11 \\
1\quad 00 \\
1\quad 01 \\
1\quad 10 \\
1\quad 11 \\
\end{matrix}
$$

所以可以发现:

1. 异或值是对称的；
2. 其最中间的数值是 $2^n-1$。

我们再对比上面 $n=2$ 与 $n=3$ 的区别，可以发现，题目的问题可以递推求解。

我们设第一个问题是的答案是 $f$，第二个问题是 $g$。那么有以下式子:

$$
\begin{cases}
f_i=2\times f_{i-1}+\binom{n}{i} \\
\\
g_i=2\times g_{i-1}+i\binom{n}{i}
\end{cases}
$$

我们把上面第一个式子化为求和式，即为 $\displaystyle\sum_{i=1}^n2^{n-i}\binom{n}{i}$，又因为 $\displaystyle\binom{n}{i}=\binom{n}{n-i}$，所以 $\displaystyle=\sum_{i=1}^n2^{n-i}\binom{n}{n-i}\displaystyle=-2^n\times\binom{n}{n}+\sum_{i=0}^n2^{n-i}\binom{n}{n-i}$，换一下元，即 $\displaystyle-2^n\times\binom{n}{n}+\sum_{i=0}^n2^{i}\binom{n}{i}$，又通过二项式定理，得到原式即 $(2+1)^n-2^n=3^n-2^n$，用快速幂求解即可。

我们把上面第二个式子化为求和式，即为 $\displaystyle\sum_{i=1}^ni\times2^{n-i}(2^i-1)\binom{n}{i}$ 因为加上 $i=0$ 其值不变故可写为 $\displaystyle\sum_{i=0}^ni\times2^{n-i}(2^i-1)\binom{n}{i}$，将括号拆开 $\displaystyle\sum_{i=0}^ni2^{n}\binom{n}{i}-\sum_{i=0}^ni2^{n-i}\binom{n}{i}$ 我们将其看作左右两个式子求解，先看左边，即为 $\displaystyle\sum_{i=0}^ni2^{n}\binom{n}{i}$，将 $2^n$ 提出，即 $\displaystyle2^{n}\sum_{i=0}^ni\binom{n}{i}=2^{n-1}(\sum_{i=0}^ni\binom{n}{i}+\sum_{i=0}^ni\binom{n}{i})$ 再将式子括号右边的求和式通过 $\binom{n}{i}=\binom{n}{n-i}$ 变换一下，即 $\displaystyle 2^{n-1}(\sum_{i=0}^ni\binom{n}{i}+\sum_{i=0}^ni\binom{n}{n-i})$ 再换元，即 $\displaystyle2^{n-1}(\sum_{i=0}^ni\binom{n}{i}+\sum_{i=0}^n(n-i)\binom{n}{i})$ 再将括号中的数加起来，即 $=2^{n-1}\sum_{i=0}^nn\binom{n}{i}$，再将 $n$ 提出，即 $\displaystyle n2^{n-1}\sum_{i=0}^n\binom{n}{i}$ 再用二项式定理，可化为：$n2^{n-1}2^n=n2^{2n-1}$。

我们再考虑右边的式子 $\displaystyle-\sum_{i=0}^ni2^{n-i}\binom{n}{i}$，给其加上一个 $\displaystyle n\sum_{i=0}^{n}2^{n-i}\binom{n}{i}$，再减去，即 $\displaystyle\sum_{i=0}^{n}(n-i)2^{n-i}\binom{n}{i}-n\sum_{i=0}^{n}2^{n-i}\binom{n}{i}$ 右边式子的结果在上面求解第一个问题已经算过，为 $n*3^n$，化简即为 $\displaystyle\sum_{i=0}^{n}(n-i)2^{n-i}\binom{n}{i}-n*3^n$ 再换元，即为 $\displaystyle\sum_{i=0}^{n}i2^i\binom{n}{i}-n*3^n$ 再通过组合恒等式$\displaystyle\binom{n}{m}=n/m*\binom{n-1}{m-1}$，可化为 $\displaystyle\sum_{i=0}^{n}n2^i\binom{n-1}{i-1}-n*3^n$，提出 $2*n$，即为 $\displaystyle 2n\sum_{i=0}^{n}2^{i-1}\binom{n-1}{i-1}-n*3^n$ 再换元，即为 $\displaystyle 2n\sum_{i=0}^{n-1}2^{i}\binom{n-1}{i}-n*3^n$ 再用二项式定理，可化为 $\displaystyle 2n*3^{n-1}-n*3^n=-n*3^{n-1}$。

综上所述，第二问答案为 $n2^{2n-1}-n*3^{n-1}$，可用快速幂求解。

## D 

一个结论是任意无向图度数为奇数的点有偶数个。因为一条边会使得度数总和增加 $2$，度数总和永远是偶数。

所以如果建一个虚点向所有度数为奇数的点连边，则这个新图存在欧拉回路。

考虑初始图为二分图。然后加上虚点。

考虑从虚点出发，每走一条边，就染成跟上一条边不相同的颜色，即黑白间隔染色。则不被虚点连向的点（度数为偶数），每次进入这个点就会出这个点，边能一一对应。设**初始图中** $a_x$ 表示 $x$ 点为端点的边有 $a_x$ 条被染成白色，$b_x$ 表示以 $x$ 为端点的边有 $b_x$ 条被染成黑色，则对于度数为偶数的点 $|a_x-b_x|=0$。对于度数为奇数的点，加上虚点连向的边，一样可以做到一进一出一一对应。由于虚点连向的边不产生贡献，所以 $|a_x-b_x|=1$。

则二分图 $\sum_x |a_x-b_x|$ 的答案为图中度数为奇数的点的个数。



考虑本题。驿站发件处看做左部点，收件处看做右部点，是一个二分图。所以可以用上述结论。

对于一个询问新加入的点，会对其右上的点的度数产生影响，而新加入点的度数为左下的点数。

首先二维数点求出初始答案，记为 $ans1$。然后记录每个点的度数奇偶性。

对于新加入的点分为三个二维数点。

第一个算新加入点的度数，记为 $deg1$。

第二个算新加入点右上角的点数，记为 $cnt1$。

第三个算新加入点右上角度数为偶数的点数，记为 $cnt2$

新答案为 $ans1+[deg1\%2=1]+cnt2-(cnt1-cnt2)$。

## E

前三种操作维护起来比较简单，这里就略过了，第四种操作只需要注意到「最多操作 $\log_2 n$ 次」的性质即可。

主要来看询问部分。

整个图的形状就是一根「主链」上挂了若干根「副链」，由此可以发现这个图中的最长简单链的长相一定类似如下的图示：

$$
\cdots{\color{black}\bullet\ \bullet\ \bullet\ }\color{black}\bullet\ {\color{black}\bullet\ }{\color{red}{\bullet\ \bullet\ \bullet\ \bullet\ \bullet\ }}{\color{black}\bullet\ }\color{black}\bullet\ {\color{black}\bullet\ \bullet\ \bullet}\cdots\  \\
\cdots{\color{black}\bullet\ \color{red}{\bullet\ }\color{black}\bullet\ \bullet\ \bullet\ \color{red}{\bullet\ }}\color{black}\bullet\cdots \\
\cdots{\color{black}\bullet\ \color{red}{\bullet\ }\color{black}\bullet\ \bullet\ \bullet\ \color{red}{\bullet\ }}\color{black}\bullet\cdots \\
\cdots{\color{black}\bullet\ \color{red}{\bullet\ }\color{black}\bullet\ \bullet\ \bullet\ \color{red}{\bullet\ }}\color{black}\bullet\cdots \\
\vdots
$$

其中红色的点是图中的最长链。那么我们考虑暴力怎么做。我们处理出两个东西，一个是上面那个图的第一层的权值前缀和 $a_i$，以及不包含第一层元素的每一条单链的权值和 $b_i$，那么答案即 $\max\limits_{1\leqslant i\leqslant j\leqslant n}\{a_j-a_{i-1}+b_i+b_j\}$。此时就可以考虑平衡树套线段树了，平衡树维护第一层的结点，线段树维护每条链除第一层结点外的部分，维护方法参见最大子段和。

## F

记所有有颜色的边的属性集合 $S$ 。

首先在外层容斥，枚举 $S\in [0,2^w)$，计算被覆盖的的边中不包含 $S$ 中属性，并且没有被覆盖的边的数目恰好为 $i$ 的配对方案数。

暴力的 DP 做法是记录子树内还没有被匹配的点的数目，复杂度$O(n^5)$，不能通过。出题人特意卡了这种做法。

如果一条边没有覆盖，那么所有点对间的路径都不能经过这条边，这样我们可以把一个连通块分成两个子联通块进行求解。但是这样就要记录连通块里面所有的点，无法通过

考虑二项式反演。记 $g(i)$ 表示钦定断了 $i$ 条边（即$i$条边没有被覆盖）的方案数，$f(i)$ 表示恰好断了 $i$ 条边的方案数，注意这里的下标 $i$ **不包含一定不被覆盖的边**。那么有：

$g(i)=\sum _{j=i}^{n-1}\binom{j}{i}f(j)\Rightarrow f(i)=\sum_{j=i}^{n-1}(-1)^{j-i}\binom{j}{i}g_j$

而 $g(i)$ 是好算的，也就是剩下的每个连通块内部任意连边的方案数的乘积

记 $h(n)$ 表示大小为 $n$ 的连通块任意连边的方案数，如果 $n$ 为奇数那么答案是 $0$，如果 $n$ 为偶数那么答案是 $(n-1)\times (n-3)\times ...\times 1$ 

考虑 DP。设 $dp(u, i, j)$ 表示以 $u$ 为根的子树，已经断了 $i$ 条边，连通块大小为 $j$ 的方案数。对于一条边 $(u,v,w)$ 转移式子如下：

$1.1$ $dp(u, i, j) \times dp(v, i_2, j_2) \times h(j_2) \to dp(u, i + i_2+1, j)$

$1.2$ 如果 $w\notin S$，$dp(u,i,j)\times dp(v,i_2,j_2)\to dp(u,i+i_2,j+j_2)$

这个 DP  的时间复杂度上界是 $O(n^4)$ 的，因此总复杂度 $O(2^wn^4)$ 。

但是注意到每个连通块大小都是必须偶数，因此常数极小，实测单次 DP 计算量在 $10^6$ 左右，链的情况可以卡满。注意要把 DP 值为 0 的状态跳过，否则无法通过

数据里面造了一些几条链并起来的情况，暴力要跑 4s 以上，std 能稳定在 0.5s 内出解。随机数据下基本卡不了。如果有人暴力冲过去了或者正解被卡常了，出题人在这里谢罪:(

考虑到打这场比赛的大佬肯定还是比较多的，如果场切这道题的大佬们有更精确的分析复杂度的方式欢迎赛后分享。