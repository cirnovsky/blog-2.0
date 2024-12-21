---
date: '2021-11-18'
title: 'Solution Set -「容斥」1'

---

感谢教练布置任务让我有动力写东西！。21）

其实有些非显性异类混了进去，但是你看得出来。

### 「codeforces - 340E」Iahub and Permutations

[link。](http://codeforces.com/problemset/problem/340/E)

把 $1,\dots,n$ 中剩下没被固定的数的数量记作 $s$，再把这其中不担心有会填到自己身上去的情况的数字的数量记作 $h$，则总方案为 $s!$，考虑容斥把重叠方案去除，设容斥系数为 $f$。

则可以写出答案式：$\displaystyle \sum_{i=0}^{s-h}f_i\binom{s-h}{i}(s-i)!$。然后你考虑这个过程就是“所有数随便摆的方案数减去至少一个数冲突加上至少两个数冲突...”，所以 $f_i=(-1)^i$。

```cpp
#include<bits/stdc++.h>
constexpr int kMod=1e9+7;
int n,a[2100],fac[2100],ifac[2100],vis[2100],bin[2100][2100];
signed main() {
  std::ios_base::sync_with_stdio(false);
  std::cin.tie(nullptr),std::cout.tie(nullptr);
  fac[0]=1;
  for(int i=1; i<=2000; ++i) fac[i]=1ll*fac[i-1]*i%kMod;
  std::cin>>n;
  std::vector<int> vec;
  for(int i=1; i<=n; ++i) {
    std::cin>>a[i];
    if(~a[i]) vis[a[i]]=1;
  }
  bin[0][0]=1;
  for(int i=1; i<=n; ++i) {
    bin[i][0]=1;
    for(int j=1; j<=i; ++j) bin[i][j]=(bin[i-1][j]+bin[i-1][j-1])%kMod;
  }
  int s=0,h=0;
  for(int i=1; i<=n; ++i) {
    if(a[i]==-1) s++;
    if(vis[i]==0 && a[i]!=-1) h++;
  }
  int res=0;
  for(int i=0; i<=s-h; ++i) (res+=1ll*((i&1)?-1:1)*bin[s-h][i]*fac[s-i]%kMod)%=kMod;
  std::cout<<(res+kMod)%kMod<<"\n";
  return 0;
}
```

### 「codeforces - 520E」Pluses everywhere

[link。](https://codeforces.com/problemset/problem/520/E)

考虑每一个数位的贡献，这个取决于它右边第一个加号的位置，这个定了，它的系数就定了，即 $10^{s}$，其中 $s$ 为这个数位到右边第一个加号的距离减一，然后再乘一个二项式系数，当然如果这个加号在数字的最后要特殊处理。这个题是不是就做完了？

写下式子：$\displaystyle\sum_{i=0}^{n-1}\left(\left(d_i\sum_{x=0}^{n-2-i}\cdot\binom{n-x-2}{k-1}\cdot10^{x}\right)+d_i\cdot\binom{i}{k}\cdot10^{n-i-1}\right)$，然后交换求和顺序 $\displaystyle\left(\sum_{x=0}^{n-2}10^x\cdot\binom{n-x-2}{k-1}\cdot\sum_{i=0}^{n-x-2}d_i\right)+\left(\sum_{i=0}^{n-1}d_i\cdot\binom{i}{k}\cdot10^{n-i-1} \right)$。

前缀和后 $O(n)$ 算就好了。

```cpp
#include<bits/stdc++.h>
constexpr int kMod=1e9+7;
int n,k,dig[100100],fac[100100],ifac[100100],pw[100100],prs[100100];
int Binpw(int x,int y) {
  int res=1;
  for(; y; y>>=1,x=1ll*x*x%kMod)
    if(y&1) res=1ll*res*x%kMod;
  return res;
}
int Bin(const int x,const int y) {
  if(x<y) return 0;
  return 1ll*fac[x]*ifac[x-y]%kMod*ifac[y]%kMod;
}
signed main() {
  std::ios_base::sync_with_stdio(false);
  std::cin.tie(nullptr),std::cout.tie(nullptr);
  fac[0]=pw[0]=1;
  for(int i=1; i<=100000; ++i) fac[i]=1ll*fac[i-1]*i%kMod;
  for(int i=1; i<=100000; ++i) pw[i]=1ll*pw[i-1]*10%kMod;
  ifac[100000]=Binpw(fac[100000],kMod-2);
  for(int i=99999; ~i; --i) ifac[i]=1ll*ifac[i+1]*(i+1)%kMod;
  std::cin>>n>>k;
  char *grid=new char[n];
  std::cin>>grid;
  for(int i=0; i<n; ++i) dig[i]=grid[i]-'0';
  prs[0]=dig[0];
  for(int i=1; i<n; ++i) prs[i]=(prs[i-1]+dig[i])%kMod;
  int res=0;
  for(int i=0; i<=n-2; ++i) (res+=1ll*pw[i]*Bin(n-i-2,k-1)%kMod*prs[n-i-2]%kMod)%=kMod;
  for(int i=0; i<n; ++i) (res+=1ll*dig[i]*pw[n-i-1]%kMod*Bin(i,k)%kMod)%=kMod;
  std::cout<<res<<"\n";
  return 0;
}
```

### 「codeforces - 451E」Devu and Flowers

[link。](http://codeforces.com/problemset/problem/451/E)

你写出这个东西的 ogf：$\displaystyle G(x)=\prod_{i=1}^n\sum_{j=0}^{f_i}x^j=\frac{\prod_{i=1}^n1-x^{f_i+1}}{(1-x)^n}=\left(\prod_{i=1}^n1-x^{f_i+1}\right)\sum_{i=0}^{\infty}\binom{n+i-1}{n-1}x^i$。

然后发现不会了，于是考虑容斥！！.。》？

然后你发现你会了！！！。。1.！0

```cpp
#include<bits/stdc++.h>
constexpr int kMod=1e9+7;
int n;
long long f[30],s;
int Binpw(int x,int y) {
  int res=1;
  for(; y; y>>=1,x=1ll*x*x%kMod)
    if(y&1) res=1ll*res*x%kMod;
  return res;
}
int Bin(long long n,const long long k) {
  if(n<k) return 0;
  if(n==k) return 1;
  n%=kMod;
  int resx=1,resy=1;
  for(int i=0; i<k; ++i) {
    resx=1ll*resx*(n-i)%kMod;
    resy=1ll*resy*(i+1)%kMod; 
  }
  return static_cast<int>(1ll*resx*Binpw(resy,kMod-2)%kMod);
}
signed main() {
  std::ios_base::sync_with_stdio(false);
  std::cin.tie(nullptr),std::cout.tie(nullptr);
  std::cin>>n>>s;
  for(int i=0; i<n; ++i) std::cin>>f[i];
  const int kEntire=(1<<n);
  int res=0;
  for(int mask=0; mask<kEntire; ++mask) {
    long long tp=s;
    for(int j=0; j<n; ++j) {
      if(mask&(1<<j)) tp-=(f[j]+1);
    }
    (res+=((__builtin_popcount(mask)&1)?-1ll:1ll)*Bin(tp+n-1,n-1)%kMod)%=kMod;
  }
  std::cout<<(res+kMod)%kMod<<"\n";
  return 0;
}
```