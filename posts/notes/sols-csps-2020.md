---
date: '2020-11-10'
title: 'Solution Set -「CSP-S 2020」'

---

## Problem. 1 - Junior Julian

模拟模拟模拟摸死 CTR 的母。

考场代码：

```cpp
#include<cstdio>
namespace solveIt
{
void read(int &x)
{
	x=0;
	char c=getchar();
	int f=1;
	while(c<'0'||c>'9')
	{
		if(c=='-')	f=-1;
		c=getchar();
	}
	while(c>='0'&&c<='9')
	{
		x=(x<<3)+(x<<1)+(c^'0');
		c=getchar();
	}
	x*=f;
}
void write(int x)
{
	if(x<0)
	{
		putchar('-');
		x=-x;
	}
	if(x>9)	write(x/10);
	putchar(x%10+'0');
}
int Q;
int chkyearG(int mon) // 1:run 0:ping
{
	if(((mon%4==0)&&(mon%100!=0))||(mon%400==0))	return 1;
	else	return 0;
}
int chkyearJ(int mon) // 1:run 0:ping
{
	if(mon%4==0)	return 1;
	else	return 0;
}
int chkmontG(int mon,int yea) // 31: big,30: small,28/29: 2
{
	if(yea<0)	yea=-yea,yea--;
	if(mon==1||mon==3||mon==5||mon==7||mon==8||mon==10||mon==12)	return 31;
	else if(mon!=2)	return 30;
	else
	{
		if(chkyearG(yea))	return 29;
		else	return 28;
	}
}
int chkmontJ(int mon,int yea) // 31: big,30: small,28/29: 2
{
	if(yea<0)	yea=-yea,yea--;
	if(mon==1||mon==3||mon==5||mon==7||mon==8||mon==10||mon==12)	return 31;
	else if(mon!=2)	return 30;
	else
	{
		if(chkyearJ(yea))	return 29;
		else	return 28;
	}
}
void Main()
{
	read(Q);
	while(Q--)
	{
		int r;
		read(r);
		int days=1,months=1,years=-4713;
		int flag=0; // 0:Julian,1:Gregorian
		while(true)
		{
			if(years==0)	years=1;
			if(days==1&&months==10&&years==1582)
			{
				if(r<=3)
				{
					days+=r;
					break;
				}
				else if(r>3&&r<20)
				{
					days+=3;
					r-=3;
					days=15;
					days+=r;
					break;
				}
				else
				{
					flag=1;
					days=1;
					r-=21;
					months++;
				}
			}
			if(days+r<=(flag?chkmontG(months,years):chkmontJ(months,years)))
			{
				days+=r;
				break;
			}
			days=1;
			r-=(flag?chkmontG(months,years):chkmontJ(months,years));
			months++;
			if(months==13)	months=1,years++;
		}
		if(years>0)	printf("%d %d %d\n",days,months,years);
		else	printf("%d %d %d BC\n",days,months,-years);
	}
}
}
int main()
{
//	freopen("D:/csp-s(windows)/julian/julian3.in","r",stdin);
//	freopen("D:/my.out","w",stdout);
	freopen("julian.in","r",stdin);
	freopen("julian.out","w",stdout);
	solveIt::Main();
	return 0;
}
/*
There are 365 days in a ping year.
There are 366 days in a run year.
There are 4714 ping years in -4713(BC) to 1582
There are 1582 run years in -4713(BC) to 1582
There are 2299622 days in -4713(BC) to 1582
There are 3571 ping years BC
There are 1142 yun years BC
There are 1721387 days in BC
*/

```

下来重写：

```cpp
#include <cstdio>

typedef long long LL;

template<typename _T>
void read( _T &x ){
    x = 0; char c = getchar( ); _T f = 1;
    while( c < '0' || c > '9' ){ if( c == '-' )	f = -1; c = getchar( ); }
    while( c >= '0' && c <= '9' ){ x = ( x << 3 ) + ( x << 1 ) + ( c & 15 ); c = getchar(); }
    x *= f;
}

template<typename _T>
void write( _T x ){
    if( x < 0 ){ putchar( '-' ); x = -x; }
    if( x > 9 )	write( x / 10 );
    putchar( x % 10 + '0' );
}

int MonthDays( int x ){
    if( x == 1 || x == 3 || x == 5 || x == 7 || x == 8 || x == 10 || x == 12 )	return 31;
    else if( x == 2 )	return 28;
    else    return 30;
}

bool checkRJ( int x ){ return ! ( x % 4 ); }
bool checkRG( int x ){ return ( ( ! ( x % 4 ) ) && ( x % 100 ) ) || ( ! ( x % 400 ) ); }

int Q;

void GetData( LL& dBC, LL& dAJ, LL& dAG, LL& dFK ){
    for( int i = 4712; ~ i; -- i )  dBC += 365 + checkRJ( i );
    dAJ = dBC; dAG = dBC;
    for( int i = 1; i <= 1581; ++ i )	dAJ += 365 + checkRJ( i );
    for( int i = 1; i <= 1582; ++ i )	dAG += 365 + checkRG( i );
    dFK = dAJ + 365;
    for( int i = 1; i <= 9; ++ i )  dAJ += MonthDays( i );
    dAJ += 4;
}

int fuckCTR( int x, int y ){
    if( y < 0 )	++ y;
    if( x != 2 )    return MonthDays( x );
    if( y <= 1582 ) return MonthDays( x ) + checkRJ( y );
    else    return MonthDays( x ) + checkRG( y );
}

int main( ){
    LL dBC = 0, dAJ = 0, dAG = 0, dFK = 0;
    /*
     * several key time frame:
     * 4713.1.1
     * 1582.10.5~14 ( don't exist )
     * 1582.10.4 Julian Calendar has been fucked
     * 1582.10.15 Gregorian Calendar has been implemented
     * dBC - 1.1.1 (Julian Day)
     * dAJ - 1582.10.15 (Julian Day)
     * dFK - 1583.1.1 (Imagine that the fucking 10 days exist)
     * dAG - 1583.1.1 (the fucking 10 days don't exist(the fucking problem's description))
    */
    GetData( dBC, dAJ, dAG, dFK );
    read( Q ); while( Q -- > 0 ){
		LL R; read( R );
		if( R < dBC ){
		    int years = 4713 - R / ( 365 * 4 + 1 ) * 4; R %= ( 365 * 4 + 1 );
		    if( R >= 366 ){
			R -= 366; years --;
			if( R >= 365 ){ R -= 365; years --; }
			if( R >= 365 ){ R -= 365; years --; }
		    }
		    int months = 1;
		    while( R - fuckCTR( months, -years ) >= 0 ){ R -= fuckCTR( months, -years ); months ++; }
		    int days = R + 1;
		    printf( "%d %d %d BC\n", days, months, years );
		    continue;
		}
		if( R >= dAJ )	R += 10;
		if( R >= dBC && R < dFK ){
		    R -= dBC;
		    int years = R / ( 365 * 4 + 1 ) * 4 + 1; R %= ( 365 * 4 + 1 );
		    if( R >= 365 ){ R -= 365; years ++; }
		    if( R >= 365 ){ R -= 365; years ++; }
		    if( R >= 365 ){ R -= 365; years ++; }
		    int months = 1;
		    while( R - fuckCTR( months, years ) >= 0 ){ R -= fuckCTR( months, years ); months ++; }
		    int days = R + 1;
		    printf( "%d %d %d\n", days, months, years );
		    continue;
		}
		if( R >= dFK ){
		    R -= dBC; R += dAG - dFK;
		    int years = R / ( 365 * 400 + 24 * 4 + 1 ) * 400 + 1; R %= ( 365 * 400 + 24 * 4 + 1 );
		    if( R >= 365 * 100 + 24 ){ R -= 365 * 100 + 24; years += 100; }
		    if( R >= 365 * 100 + 24 ){ R -= 365 * 100 + 24; years += 100; }
		    if( R >= 365 * 100 + 24 ){ R -= 365 * 100 + 24; years += 100; }
		    years += R / ( 365 * 4 + 1 ) * 4; R %= ( 365 * 4 + 1 );
		    if( R >= 365 ){ R -= 365; years ++; }
		    if( R >= 365 ){ R -= 365; years ++; }
		    if( R >= 365 ){ R -= 365; years ++; }
		    int months = 1;
		    while( R - fuckCTR( months, years ) >= 0 ){ R -= fuckCTR( months, years ); months ++; }
		    int days = R + 1;
		    printf( "%d %d %d\n", days, months, years );
		}
    }
    return 0;
}
```

码风飞跃的变化

## Problem. 2 - Junior Zoo

把所有数或起来，然后计算需要买哪些饲料，然后统计 $1\texttt{ to }k$ 有哪些位没有被买，记为 $C$ 然后答案就是 $2^{C}-n$。

考场代码：

```cpp
#include<cstdio>
#include<vector>
namespace solveIt
{
void read(int &x)
{
	x=0;
	char c=getchar();
	int f=1;
	while(c<'0'||c>'9')
	{
		if(c=='-')	f=-1;
		c=getchar();
	}
	while(c>='0'&&c<='9')
	{
		x=(x<<3)+(x<<1)+(c^'0');
		c=getchar();
	}
	x*=f;
}
void write(int x)
{
	if(x<0)
	{
		putchar('-');
		x=-x;
	}
	if(x>9)	write(x/10);
	putchar(x%10+'0');
}
const int MAXN=1e6+5;
int n,m,c,k,a[MAXN],vis[MAXN],fuc[MAXN];
struct ask
{
	int w,s;
	ask(int W=0,int S=0){w=W;s=S;}
}as[MAXN];
void Main()
{
	read(n),read(m),read(c),read(k);
	for(int i=1;i<=n;++i)	read(a[i]),fuc[a[i]]=1;
	for(int i=1;i<=m;++i)	read(as[i].w),read(as[i].s);
	for(int i=1;i<=n;++i)
	{
		for(int j=1;j<=m;++j)
		{
//			printf("FU ");for(int i=1;i<=c;++i)	printf("%d ",vis[i]); puts("");
			if((a[i]>>as[j].w)&1)	vis[as[j].s]=1;//,printf("%d %d %d\n",a[i],as[j].w,as[j].s);
		}
	}
//	for(int i=1;i<=c;++i)	write(vis[i]),putchar(' '),write(i),putchar('\n');
	int up=(1<<k),ans=0;
	for(int s=0;s<up;++s)
	{
		if(fuc[s])	continue;
		bool flag=0,book=0;
		for(int i=1;i<=m;++i)
		{
			if((s>>as[i].w)&1)
			{
				flag=1;
				if(!vis[as[i].s])	book=1;
			}
			if(book)	break;
		}
		if(!flag)	ans++;
		else if(!book)	ans++;
	}
	write(ans);
}
}
int main()
{
	freopen("zoo.in","r",stdin);
	freopen("zoo.out","w",stdout);
	solveIt::Main();
	return 0;
}
```

下来改的：

```cpp
#include<cstdio>
#include<algorithm>
using namespace std;
namespace solveIt
{
typedef unsigned long long ULL;
void read(int &x)
{
	x=0;
	char c=getchar();
	int f=1;
	while(c<'0'||c>'9')
	{
		if(c=='-')	f=-1;
		c=getchar();
	}
	while(c>='0'&&c<='9')
	{
		x=(x<<3)+(x<<1)+(c^'0');
		c=getchar();
	}
	x*=f;
}
void readull(ULL &x)
{
	x=0;
	char c=getchar();
	ULL f=1;
	while(c<'0'||c>'9')
	{
		if(c=='-')	f=-1;
		c=getchar();
	}
	while(c>='0'&&c<='9')
	{
		x=(x<<3)+(x<<1)+(c^'0');
		c=getchar();
	}
	x*=f;
}
void write(int x)
{
	if(x<0)
	{
		putchar('-');
		x=-x;
	}
	if(x>9)	write(x/10);
	putchar(x%10+'0');
}
void writeull(ULL x)
{
	if(x<0)
	{
		putchar('-');
		x=-x;
	}
	if(x>9)	writeull(x/10);
	putchar(x%10+'0');
}
const int MAXN=1e6+5;
int n,m,c,k,len;
ULL a[MAXN],all,pri[MAXN];
bool fuc[70],buc[MAXN];
struct ask
{
	int w,s;
	ask(int W=0,int S=0){w=W;s=S;}
}as[MAXN];
void Main()
{
	read(n),read(m),read(c),read(k);
	for(int i=1;i<=n;++i)
	{
		readull(a[i]);
		all|=a[i];
	}
	for(int i=1;i<=m;++i)
	{
		read(as[i].w);
		read(as[i].s);
		pri[i]=as[i].s;
	}
	sort(pri+1,pri+1+m);
	len=unique(pri+1,pri+1+m)-pri-1;
	for(int i=1;i<=m;++i)	as[i].s=lower_bound(pri+1,pri+1+len,as[i].s)-pri;
	for(int i=1;i<=m;++i)
	{
		if((all>>as[i].w)&1)	buc[as[i].s]=1;
	}
	for(int i=1;i<=m;++i)
	{
		if(!buc[as[i].s])	fuc[as[i].w]=1;
	}
	int tot=0;
	for(int i=0;i<k;++i)
	{
		if(!fuc[i])	++tot;
	}
	if(tot==64)
	{
		if(n==0)	puts("18446744073709551616");
		else
		{
			ULL ans=0,two=1;
			for(int i=1;i<=63;++i)	two<<=1;
			ans+=two;
			ans-=n;
			ans+=two;
			writeull(ans);
		}
	}
	else	writeull((1ull<<tot)-n);
}
}
int main()
{
	// freopen("zoo.in","r",stdin);
	// freopen("zoo.out","w",stdout);
	solveIt::Main();
	return 0;
}
```

## Problem. 3 - Senior Call

[这儿](https://www.luogu.com.cn/blog/161849/ti-xie-p7077-han-shuo-diao-yong-post)

考场代码： （Loneliness）

下来改的：

```cpp
#include <queue>
#include <cstdio>
#define mod ( 998244353 )

using namespace std;
typedef long long LL;

const int MAXN = 1e6 + 5;

template<typename _T>
void read( _T &x ){
    x = 0; char c = getchar(); _T f = 1;
    while( c < '0' || c > '9' ){ if( c == '-' )	f = -1; c = getchar(); }
    while( c >= '0' && c <= '9' ){ x = ( x << 3 ) + ( x << 1 ) + ( c & 15 ); c = getchar(); }
    x *= f;
}

template<typename _T>
void write( _T x ){
    if( x < 0 ){ putchar( '-' ); x = -x; }
    if( x > 9 )	write( x / 10 );
    putchar( x % 10 + '0' );
}

struct starS{
    int to, nxt;
    starS( int T = 0, int N = 0 ){ to = T; nxt = N; }
} as[MAXN * 2];

struct operateS{
    int Tp, pos;
    LL add, mul, sum;
    operateS( int T = 0, int P = 0, LL A = 0, LL M = 0, LL S = 0 ){ Tp = T; pos = P; add = A; mul = M; sum = S; }
} opS[MAXN];

int N, M, Q;
int totE, totT;
int A[MAXN], topS[MAXN], degS[MAXN], firS[MAXN], queS[MAXN];

void pushEdge( int u, int v ){ as[++ totE] = starS( v, firS[u] ); firS[u] = totE; }

void TopSort( ){
    queue<int> align;
    for( int i = 1; i <= M; ++ i ){
		if( ! degS[i] )	align.push( i );
    }
    while( ! align.empty( ) ){
		int u = align.front( ); align.pop( );
		topS[++ totT] = u;
		for( int i = firS[u]; i; i = as[i].nxt ){
		    int v = as[i].to; degS[v] --;
		    if( ! degS[v] ) align.push( v );
		}
    }
}

int main( ){
    read( N );
    for( int i = 1; i <= N; ++ i )  read( A[i] );
    read( M );
    for( int i = 1; i <= M; ++ i ){
		read( opS[i].Tp );
		if( opS[i].Tp == 1 ){
		    read( opS[i].pos ); read( opS[i].add );
		    opS[i].mul = 1;
		}
		else if( opS[i].Tp == 2 ) {
		    read( opS[i].mul );
		    opS[i].add = opS[i].mul;
		}
		else{
		    read( opS[i].pos );
		    opS[i].mul = 1;
		    for( int j = 1, to; j <= opS[i].pos; ++ j ){ read( to ); pushEdge( i, to ); degS[to] ++; }
		}
    }
    TopSort( );
    for( int i = M; i; -- i ){
		int u = topS[i];
		for( int j = firS[u]; j; j = as[j].nxt ){
		    int v = as[j].to;
		    opS[u].mul = ( LL )opS[u].mul * opS[v].mul % mod;
		}
    }
    read( Q ); int now = 1;
    for( int i = 1; i <= Q; ++ i )  read( queS[i] );
    for( int i = Q; i; -- i ){ opS[queS[i]].sum = ( ( LL )opS[queS[i]].sum + now ) % mod; now = ( LL )now * opS[queS[i]].mul % mod; }
    for( int i = 1; i <= M; ++ i ){
		int u = topS[i], now = 1;
		for( int j = firS[u]; j; j = as[j].nxt ){
		    int v = as[j].to;
		    opS[v].sum = ( ( LL )opS[u].sum * now % mod + opS[v].sum ) % mod;
		    now = ( LL )now * opS[v].mul % mod;
		}
    }
    for( int i = 1; i <= N; ++ i )  A[i] = ( LL )A[i] * now % mod;
	    for( int i = 1; i <= M; ++ i ){
		if( opS[i].Tp == 1 )	A[opS[i].pos] = ( A[opS[i].pos] + ( LL )opS[i].add * opS[i].sum % mod ) % mod;
    }
    for( int i = 1; i <= N; ++ i )  write( A[i] ), putchar( ' ' );
    return 0;
}
```

## Problem. 4 - Senior Snakes

先讲个 $\texttt{70pts}$ 的做法。没脑子吃，然后回来判断。所有大样例有些多一的代码改一下就有。

正解应该就是利用序列单调性把 $\texttt{70pts}$ 的暴力的线段树改成其他的东西。

目前还没做出来，可以欣赏一下我考场的 186 行 SGST（含义见代码）。

考场代码：

（upd：这份代码下面是 $\texttt{70pts}$ 的代码：）

```cpp
#include<cstdio>
#include<algorithm>
using namespace std;
namespace solveIt
{
void read(int &x)
{
	x=0;
	char c=getchar();
	int f=1;
	while(c<'0'||c>'9')
	{
		if(c=='-')	f=-1;
		c=getchar();
	}
	while(c>='0'&&c<='9')
	{
		x=(x<<3)+(x<<1)+(c^'0');
		c=getchar();
	}
	x*=f;
}
void write(int x)
{
	if(x<0)
	{
		putchar('-');
		x=-x;
	}
	if(x>9)	write(x/10);
	putchar(x%10+'0');
}
struct node
{
	int val,pos;
	node(int V=0,int P=0)
	{
		val=V;
		pos=P;
	}
	bool operator<(const node&ano)const
	{
		if(val==ano.val)	return pos<ano.pos;
		else	return val<ano.val;
	}
};
const int MAXN=1e6+6;
int n,a[MAXN];
struct TREE
{
node mnx[MAXN*4],mxx[MAXN*4];
void upd(int x)
{
	mnx[x]=min(mnx[x<<1],mnx[x<<1|1]);
	mxx[x]=max(mxx[x<<1],mxx[x<<1|1]);
}
void build(int x,int l,int r)
{
	if(l^r)
	{
		int mid=(l+r)>>1;
		build(x<<1,l,mid);
		build(x<<1|1,mid+1,r);
		upd(x);
	}
	else
	{
		mnx[x]=node(a[l],l);
		mxx[x]=node(a[l],l);
	}
}
void ins(int x,int l,int r,int pos,int val)
{
	if(l^r)
	{
		int mid=(l+r)>>1;
		if(mid>=pos)	ins(x<<1,l,mid,pos,val);
		else	ins(x<<1|1,mid+1,r,pos,val);
		upd(x);
	}
	else
	{
		mnx[x].val+=val;
		mxx[x].val+=val;
	}
}
node findmin(int x,int l,int r,int fr,int ba)
{
	if(l>ba||r<fr)	return 1e9;
	if(l>=fr&&r<=ba)	return mnx[x];
	else
	{
		int mid=(l+r)>>1;
		return min(findmin(x<<1,l,mid,fr,ba),findmin(x<<1|1,mid+1,r,fr,ba));
	}
}
node findmax(int x,int l,int r,int fr,int ba)
{
	if(l>ba||r<fr)	return 0;
	if(l>=fr&&r<=ba)	return mxx[x];
	else
	{
		int mid=(l+r)>>1;
		return max(findmax(x<<1,l,mid,fr,ba),findmax(x<<1|1,mid+1,r,fr,ba));
	}
}
} tmx,tmn;
void Main()
{
	int t;
	read(t);
	int flag=1;
	while(t--)
	{
		read(n);
		if(flag==1)
		{
			for(int i=1;i<=n;++i)	read(a[i]);
			flag=0;
		}
		else
		{
			for(int i=1,p,v;i<=n;++i)
			{
				read(p);
				read(v);
				int tmxv=tmx.findmax(1,1,n,p,p).val;
				int tmnv=tmn.findmin(1,1,n,p,p).val;
				tmx.ins(1,1,n,p,-tmxv);
				tmx.ins(1,1,n,p,v);
				tmn.ins(1,1,n,p,-tmnv);
				tmn.ins(1,1,n,p,v);
			}
			for(int i=1;i<=n;++i)	a[i]=tmx.findmax(1,1,n,i,i).val;
//			for(int i=1;i<=n;++i)	write(a[i]),putchar(' '); puts("");
		}
		tmx.build(1,1,n);
		tmn.build(1,1,n);
		int ans=n;
		while(true)
		{
			node nowmax=tmx.findmax(1,1,n,1,n);
			tmx.ins(1,1,n,nowmax.pos,-nowmax.val);
			node secmax=tmx.findmax(1,1,n,1,n);
			tmx.ins(1,1,n,nowmax.pos,nowmax.val);
			
			node nowmin=tmn.findmin(1,1,n,1,n);
			tmn.ins(1,1,n,nowmin.pos,-nowmin.val+1e9);
			node secmin=tmn.findmin(1,1,n,1,n);
			tmn.ins(1,1,n,nowmin.pos,nowmin.val-1e9);
//			printf("nmx=(%d %d),nmn=(%d %d),smx=(%d %d),smn(%d %d)\n",nowmax.pos,nowmax.val,
//				nowmin.pos,nowmin.val,secmax.pos,secmax.val,secmin.pos,secmin.val);
			if(((nowmax.val-nowmin.val<secmin.val)
				&&((nowmax.val-nowmin.val>secmax.val)
					||(nowmax.val-nowmin.val==secmax.val&&nowmax.pos>secmax.pos)))
				||(((nowmax.val-nowmin.val==secmin.val)&&(nowmax.pos<secmin.val))
					&&((nowmax.val-nowmin.val>secmax.val)
						||((nowmax.val-nowmin.val==secmax.val)&&(nowmax.pos>secmax.pos))))
				||(nowmax.val-nowmin.val>secmin.val)
				||((nowmax.val-nowmin.val==secmin.val)&&(nowmax.pos>secmin.pos)))
			{
				tmn.ins(1,1,n,nowmax.pos,-nowmin.val);
				tmn.ins(1,1,n,nowmin.pos,-nowmin.val+1e9);
				tmx.ins(1,1,n,nowmax.pos,-nowmin.val);
				tmx.ins(1,1,n,nowmin.pos,-nowmin.val);
				ans--;
			}
			else	break;
		}
		write(ans);
		putchar('\n');
	}
}
}
int main()
{
//	freopen("D:/csp-s(windows)/snakes/snakes3.in","r",stdin);
	freopen("snakes.in","r",stdin);
	freopen("snakes.out","w",stdout);
	solveIt::Main();
	return 0;
}
/*
SGST - Strong-Guy Segment Tree
*/

```

$\texttt{70pts}$

```cpp
#include<cstdio>
#include<algorithm>
using namespace std;
namespace solveIt
{
void read(int &x)
{
	x=0;
	char c=getchar();
	int f=1;
	while(c<'0'||c>'9')
	{
		if(c=='-')  f=-1;
		c=getchar();
	}
	while(c>='0'&&c<='9')
	{
		x=(x<<3)+(x<<1)+(c^'0');
		c=getchar();
	}
	x*=f;
}
void write(int x)
{
	if(x<0)
	{
		putchar('-');
		x=-x;
	}
	if(x>9) write(x/10);
	putchar(x%10+'0');
}
struct node
{
	int val,pos;
	node(int V=0,int P=0)
	{
		val=V;
		pos=P;
	}
	bool operator<(const node&ano)const
	{
		if(val==ano.val)	return pos<ano.pos;
		else	return val<ano.val;
	}
};
const int MAXN=1e6+6;
int n,ans,a[MAXN];
struct TREE
{
node mnx[MAXN*4],mxx[MAXN*4];
int siz,tp;
TREE()
{
	siz=0;
}
void upd(int x)
{
	mnx[x]=min(mnx[x<<1],mnx[x<<1|1]);
	mxx[x]=max(mxx[x<<1],mxx[x<<1|1]);
}
void build(int x,int l,int r)
{
	if(l^r)
	{
		int mid=(l+r)>>1;
		build(x<<1,l,mid);
		build(x<<1|1,mid+1,r);
		upd(x);
	}
	else
	{
		mnx[x]=node(a[l],l);
		mxx[x]=node(a[l],l);
	}
}
void ins(int x,int l,int r,int pos,int val)
{
	if(l^r)
	{
		int mid=(l+r)>>1;
		if(mid>=pos)	ins(x<<1,l,mid,pos,val);
		else	ins(x<<1|1,mid+1,r,pos,val);
		upd(x);
	}
	else
	{
		mnx[x].val+=val;
		mxx[x].val+=val;
	}
}
node findmin(int x,int l,int r,int fr,int ba)
{
	if(l>ba||r<fr)  return 1e9;
	if(l>=fr&&r<=ba)	return mnx[x];
	else
	{
		int mid=(l+r)>>1;
		return min(findmin(x<<1,l,mid,fr,ba),findmin(x<<1|1,mid+1,r,fr,ba));
	}
}
node findmax(int x,int l,int r,int fr,int ba)
{
	if(l>ba||r<fr)  return 0;
	if(l>=fr&&r<=ba)	return mxx[x];
	else
	{
		int mid=(l+r)>>1;
		return max(findmax(x<<1,l,mid,fr,ba),findmax(x<<1|1,mid+1,r,fr,ba));
	}
}
void del(node one)
{
	if(tp==1)	ins(1,1,n,one.pos,-one.val);
	else	ins(1,1,n,one.pos,-one.val+1e9);
	siz--;
}
void buildemp(int f,int n)
{
	build(1,1,n);
	siz=n;
	tp=f;
}
};
struct treetoheap
{
TREE tmx,tmn;
node findmax(int l,int r)
{
	return tmx.findmax(1,1,n,l,r);
}
node findmin(int l,int r)
{
	return tmn.findmin(1,1,n,l,r);
}
void ins(node one)
{
	tmx.siz++;
	tmn.siz++;
	tmx.ins(1,1,n,one.pos,one.val);
	if(tmn.findmin(1,1,n,one.pos,one.pos).val==(int)1e9)	tmn.ins(1,1,n,one.pos,one.val-1e9);
	else	tmn.ins(1,1,n,one.pos,one.val);
}
void del(node one)
{
	tmx.del(one);
	tmn.del(one);
}
void buildemp(int n)
{
	tmx.buildemp(1,n);
	tmn.buildemp(0,n);
}
int siz()
{
	return tmx.siz;
}
} wer;
bool dfs()
{
	if(wer.siz()==2)	return 1;
	int f=0;
	while(wer.siz()>=3)
	{
		int siz=wer.siz();
		node nowmin=wer.findmin(1,n),nowmax=wer.findmax(1,n);
		wer.del(nowmin);
		wer.del(nowmax);
		node secmin=wer.findmin(1,n);
		wer.ins(node(nowmax.val-nowmin.val,nowmax.pos));
//		puts("\n/********************************************/");
//		printf("(%d %d %d)\n",secmin.val,secmin.pos,wer.siz());
//		for(int i=1;i<=n;++i)	printf("%d ",wer.findmax(i,i).val);puts("");
//		puts("/********************************************/\n");
		if(nowmax.val-nowmin.val<secmin.val)
		{
			if(!dfs())
			{
				ans=siz-1;
				return 1;
			}
			else if(f)
			{
				ans=siz;
				return 1;
			}
			else
			{
				ans=siz;
				return 0;
			}
		}
		++f;
	}
	ans=1;
	return 1;
}
void Main()
{
	int t;
	read(t);
	int flag=1;
	while(t--)
	{
		if(flag==1)
		{
			read(n);
			for(int i=1;i<=n;++i)   read(a[i]);
			flag=0;
		}
		else
		{
			int tmp;
			read(tmp);
			for(int i=1,p,v;i<=tmp;++i)
			{
				read(p);
				read(v);
				a[p]=v;
			}
		}
		if(n==3)
		{
			if(a[1]+a[2]<=a[3])	puts("1");
			else	puts("3");
			continue;
		}
		wer.buildemp(n);
		ans=n;
		bool WASTED=dfs();
		write(ans);
		putchar('\n');
		WASTED=!WASTED;
	}
}
}
int main()
{
//	freopen("snakes/snakes4.in","r",stdin);
//	freopen("snakes/fuck.out","w",stdout);
//	freopen("snakes.in","r",stdin);
//	freopen("snakes.out","w",stdout);
	solveIt::Main();
	return 0;
}
/*
SGST - Strong-Guy Segment Tree
*/
```