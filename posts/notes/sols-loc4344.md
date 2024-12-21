---
date: '2023-10-23'
title: 'Solution Set -「LOC 4344」'

---

[Link.](http://222.180.160.110:1024/contest/4344)

非常无语. 😅

### A. 道路 (road)

总共四种情况, 可分为拐一次弯和拐两次弯, 注意特判同行同列即可.

### B. 烟花 (firework)

转化后的题意就是, 每次选择一条边, 将边连接的两点缩成一点, 求在该点子树中选择不超过 $m$ 个儿子, 儿子们的子树大小之积之和. 朴素做法就是枚举断边, 令 $f_{i, j}$ 表示在前 $i$ 个儿子中选择了 $j$ 个的积之和, 转移即:
$$
f_{i, j} \rightarrowtail f_{i+1,j} \\
f_{i, j} \times a_i \rightarrowtail f_{i+1,j+1}
$$
其中 $a_i$ 表示第 $i+1$ 个儿子的子树大小 (0-indexed). 第一维可以滚掉. 发现这个贡献形式是可撤销的, 于是遍历到每条边时, 将端点之间的贡献消除即可.

### D. 树上的数 (tree)

一步一步翻译题意.

1. **存在相邻边编号更小**: 由于第一步加入的编号是 $1$, 就意味着我们一定按从小到大的顺序加载编号, 否则就会出现中间断开的情况;
2. **极差之和最小**: 由 (1) 得, 点 $u$ 编号最小的连边一定是父边, 那么编号最大的连边就是子树中最后被加载的儿子与 $u$ 连边的编号. 由于贡献是极差, 只与差值相关, 因此可以直接应用贪心, 按 BFS 序从子树大小最小的儿子加到重儿子, 这样就能获得最小的极差. 那么最小的极差和即为 $\displaystyle \sum_u size_u-size_{son_u}$.
3. **断边的影响**: 看了一多小时还不会, 先坑了. 🕳

---

> / 路在拥挤的行人中落寞孤独，因为它得不到行人的爱慕。 /
>
> / <span class="smallcaps" style="font-variant:small-caps;">The</span> road is lonely in its crowd for it is not loved. /
>
> —— [Rabindranath Tagore - *Stray Birds*](https://en.wikisource.org/wiki/Stray_Birds)