---
date: '2021-11-17'
title: 'Solution -「HDU 6314」Matrix'

---

对多步容斥不熟练啊，我建议我自己看看[这个](https://blog.csdn.net/werkeytom_ftd/article/details/74701513)。

[link。](http://acm.hdu.edu.cn/showproblem.php?pid=6314)

首先将问题弱化为 1-d，我们待定容斥系数 $f_i$，可以写出答案的式子：$\sum\limits_{i=a}^nf_i\binom{n}{i}2^{n-i}$。解释就是，我们想让 $\binom{n}{i}2^{n-i}$ 达到“至少”的效果，但是明显会算重，所以通过这个容斥系数 $f_i$ 达到“恰好”的效果，于是原题“至少”的答案就是这个。

每一个“恰好” $i$ 个的方案数在最终的答案中的贡献次数为 $1$，也就是说 $\sum\limits_{j=a}^if_j\binom{i}{j}=1$。这个的意思就是如果至少有 $i$ 的方案数重了，那么它一定是从前面开始重的（就是说 $1,\dots,i-1$ 的随便摆的部分跟它重了），所以从前面开始容斥。

然后就好算了，可以直接得出 $f_i=\sum\limits_{j=a}^{i-1}f_j\binom{i-1}{j-1}$，或者你也可以用下吸收公式推式子。

但实际上这个题还有一些常数的优化，具体可以看看 Siyuan 的博客。

```cpp
#include<bits/stdc++.h>
#define il __inline__ __attribute__((always_inline))
constexpr int kMod=998244353;
__int128 sum;
int n,m,A,B,i,j,k;
int coef[2][3100],pw[9000100],bin[3100][3100];
il void MCase() {
  for(k=0; k<2; ++k) {
    coef[k][0]=1;
    for(int i=(k?B:A); i<=(k?m:n); ++i) coef[k][i]=1ll*(((i-(k?B:A))&1)?-1:1)*bin[i-1][(k?B:A)-1]%kMod*bin[k?m:n][i]%kMod;
  }
  int res=0;
  for(i=A; i<=n; ++i)
    for(j=B; j<=m; ++j) (res+=1ll*coef[0][i]*coef[1][j]%kMod*pw[(n-i)*(m-j)]%kMod)%=kMod;
  std::printf("%d\n",res<0?res+kMod:res);
}
signed main(int argc,char const* argv[]) {
  pw[0]=1;
  for(i=1; i<9000100; ++i) pw[i]=1ll*pw[i-1]*2%kMod;
  bin[0][0]=1;
  for(i=1; i<3100; ++i) {
    bin[i][0]=1;
    for(j=1; j<=i; ++j) bin[i][j]=(bin[i-1][j]+bin[i-1][j-1])%kMod;
  }
  for(; ~std::scanf("%d%d%d%d",&n,&m,&A,&B);) MCase();
  return 0;
}
```