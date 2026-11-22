const F=require('node:fs'),E=process.env,I=E.MAKEFUN_INPUT_DIR||'/input',O=E.MAKEFUN_OUTPUT_DIR||'/output';
for(const id of F.readdirSync(I)){
const L=F.readFileSync(I+'/'+id+'/level.txt').toString().split('\n');
const w=Math.max(...L.map(s=>s.length)),n=w*L.length,D=[-w,w,-1,1];
const W=new Uint8Array(n),G=new Uint8Array(n),B=[];let P=0;
L.forEach((s,y)=>[...s].forEach((c,x)=>{const i=y*w+x;W[i]=c=='#'?0:1;
if('.+*'.includes(c))G[i]=1;if('$*'.includes(c))B.push(i);if('@+'.includes(c))P=i;}));
const hr=P/w|0,rg=i=>2*(((i%w)-1)/7|0)+((i/w|0)>hr),M=[],X=[];
for(const b of B)(M[rg(b)]??=[]).push(b);
let mv='',pl=P;
M.forEach((rm,ri)=>{
if(!rm)return;
const f=W.slice();
M.forEach((r,k)=>{if(k!=ri&&r)for(const c of (X[k]||r))f[c]=0;});
const Z=new Int32Array(4*n),C=new Uint8Array(n);
const tg=(bs,v)=>{for(const b of bs)C[b]=v;};
const fl=(s,o,g)=>{let lo=s;const st=[s];Z[o+s]=g;
while(st.length){const p=st.pop();if(p<lo)lo=p;for(let k=0;k<4;k++){const q=p+D[k];
if(f[q]&&!C[q]&&Z[o+q]!=g){Z[o+q]=g;Z[o+n+q]=p;Z[o+2*n+q]=k;st.push(q);}}}return lo;};
const ky=(bs,lo)=>bs.reduce((h,b)=>h*n+b,lo);
const Q=[[rm,pl,'']],ix=new Map();let tm=1;
tg(rm,1);ix.set(ky(rm,fl(pl,0,++tm)),0);tg(rm,0);
let fd=-1;
for(let hd=0;fd<0&&hd<Q.length;hd++){
const[bs,pp]=Q[hd];
tg(bs,1);
const s=++tm;fl(pp,0,s);
for(let i=0;i<bs.length&&fd<0;i++){
for(let k=0;k<4;k++){
const d=D[k],b=bs[i],tt=b+d,stn=b-d;
if(Z[stn]!=s||!f[tt]||C[tt])continue;
let wk='';
for(let p=stn;p!=pp;p=Z[n+p])wk='udlr'[Z[2*n+p]]+wk;
C[b]=0;C[tt]=1;
const nb=bs.slice();nb[i]=tt;nb.sort((a,b)=>a-b);
const kk=ky(nb,fl(b,3*n,++tm));
C[tt]=0;C[b]=1;
if(ix.has(kk))continue;
ix.set(kk,Q.length);Q.push([nb,b,Q[hd][2]+wk+'UDLR'[k]]);
if(nb.every(x=>G[x])){fd=Q.length-1;break;}
}}
tg(bs,0);
}
if(fd<0)return;
const q=Q[fd];mv+=q[2];pl=q[1];X[ri]=q[0];});
F.mkdirSync(O+'/'+id,{recursive:true});F.writeFileSync(O+'/'+id+'/solution.txt',mv);
}
