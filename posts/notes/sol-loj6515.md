---
date: '2023-11-07'
title: 'Solution -「Yali Camp 2018」贪玩蓝月'
---

我说怎么 T2 被暴切，原来大家都做过这道题，这下是 🤡 了。

## Desc.

[Link.](https://loj.ac/p/6515)

有 $m$ 次事件，和一个初始为空的双端队列，格式如下：

- `IF w v`：$\text{PUSH-FRONT}(w, v)$；
- `IG w v`：$\text{PUSH-BACK}(w, v)$；
- `DF`：$\text{POP-FRONT}$；
- `DG`：$\text{POP-BACK}$；
- `QU l r`：询问在当前队列中选取若干二元组 $S$，使得 $\sum w \in S \bmod p \in [l, r]$，且 $\sum v \in S$ 最大。

$m \leqslant 5 \times 10^4$，$p \leqslant 500$。

## Sol.

朴素 DP 很容易，设 $f_{i, s}$ 表示前 $i$ 个元素中，$w$ 和模 $p$ 的余数为 $s$ 的最大 $v$ 和。关键是如何维护双端队列的操作。

如果维护的数据结构是栈，那么这个题就变得很容易了，恰好，我们有用栈实现双端队列的方法，以下是 tly 的解说：

>至少支持：双端插入删除（删除时非空），维护半群运算（只有结合律），做到均摊 $\mathcal O(n)$ 次运算。
>
>比如双端插入删除元素，求矩阵乘或者 min 之类的不可减信息。
>
>……
>
>具体做法是维护两个栈，分别用于前端插入删除/后端插入删除。这个时候就是「插入同端删除，也即可撤回」的情况了。
>
>如果一个栈空了，这个时候就不能直接把另一个栈弄过来。
>
>考虑将另一个栈的元素按中点划分开，分别装入两个栈，这样复杂度是均摊 $\mathcal O(n)$。
>39
>具体原因考虑势能函数 $\Phi = |size_1 - size_2|$，每次 $\Phi$ 至多增加 $1$，重构则清零（或变成 $1$），因此复杂度均摊下来线性。
>
>（有删改）

代码很简洁。

```cpp
int __tmp, m, p, w[2][50100], v[2][50100], top[2], q[600];
ll dp[2][50100][600];
string op;
void insert(int a, int b, int f) {
    w[f][++top[f]] = a, v[f][top[f]] = b;
    for (int i=0;i<p;++i)
        dp[f][top[f]][(i+a)%p] = max(dp[f][top[f]-1][i]+b, dp[f][top[f]-1][(i+a)%p]);
}
void remove(int f) {
    if (top[f] == 0) {
        int tmp = top[f^1];
        top[0] = top[1] = 0;
        for (int i=(tmp+1)/2;i>=1;--i) insert(w[f^1][i], v[f^1][i], f);
        for (int i=(tmp+1)/2+1;i<=tmp;++i) insert(w[f^1][i], v[f^1][i], f^1);
    }
    top[f]--;
}
ll ask(int l, int r) {
    ll res = -1, *f = dp[0][top[0]], *g = dp[1][top[1]];
    int h = 1, t = 0;
    for (int i=r;i>=l;--i) {
        while (h <= t && g[i] >= g[q[t]]) t--;
        q[++t] = i;
    }
    for (int i=0;i<p;++i) {
        while (h <= t && ((i+q[h])%p < l || (i+q[h])%p > r)) h++;
        while (h <= t && g[(l+p-i)%p] >= g[q[t]]) t--;
        q[++t] = (l+p-i)%p;
        cmax(res, f[i]+g[q[h]]);
    }
    return res;
}
int main() {
    ios::sync_with_stdio(0);
    cin.tie(nullptr);
    for (int i=0;i<2;++i)
        memset(dp[i][0]+1, 0xcf, sizeof dp[i][0]);
    cin >> __tmp >> m >> p;
    for (int a, b; m--;) {
        cin >> op;
        if (op[0] == 'I' || op[0] == 'Q') cin >> a >> b;
        if (op == "IF") insert(a%p, b, 0);
        else if (op == "IG") insert(a%p, b, 1);
        else if (op == "DF") remove(0);
        else if (op == "DG") remove(1);
        else cout << ask(a, b) << "\n";
    }
}
```

---

> 我既没有愁苦到足以成为诗人，又没有冷漠到像个哲学家。但我清醒到足以成为一个废人。
>
> [—— E·M·齐奥朗 - *眼泪与圣徒*](https://book.douban.com/subject/25774978/)
