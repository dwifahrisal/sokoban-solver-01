const F=require('fs'),I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
for(const id of F.readdirSync(I)){
const R=F.readFileSync(I+'/'+id+'/level.txt').toString().split('\n');
const w=Math.max(...R.map(s=>s.length)),N=w*R.length,D=[-w,w,-1,1];
const W=new Uint8Array(N),GM=new Uint8Array(N),B=[];let P=0;
R.forEach((s,y)=>[...s].forEach((c,x)=>{const i=y*w+x;if(c=='#')return;W[i]=1;
if('.+*'.includes(c))GM[i]=1;if('$*'.includes(c))B.push(i);if('@+'.includes(c))P=i;}));
const hr=P/w|0,rid=i=>2*(((i%w)-1)/7|0)+((i/w|0)>hr),RM=[],FIN=[];
for(const b of B)(RM[rid(b)]=RM[rid(b)]||[]).push(b);
let mv='',pl=P;
RM.forEach((rm,ri)=>{
if(!rm)return;
const w2=W.slice();
RM.forEach((r,k)=>{if(k!=ri&&r)for(const c of (FIN[k]||r))w2[c]=0;});
const Z=new Int32Array(6*N),occ=new Uint8Array(N),pd=new Uint8Array(N);
const fl=(f,o,a,s)=>{let lo=f;const st=[f];a[o+f]=s;
while(st.length){const p=st.pop();if(p<lo)lo=p;for(let k=0;k<4;k++){const r=p+D[k];
if(w2[r]&&!occ[r]&&a[o+r]!=s){a[o+r]=s;a[o+N+r]=p;a[o+2*N+r]=k;st.push(r);}}}return lo;};
const key=(nb,lo)=>{let k=lo;for(const b of nb)k=k*N+b;return k;};
const bx=rm,Q=[[bx,pl,'']],ix=new Map();let tm=1;
for(const b of bx)occ[b]=1;ix.set(key(bx,fl(pl,0,Z,++tm)),0);for(const b of bx)occ[b]=0;
let fd=-1;
for(let hd=0;fd<0&&hd<Q.length;hd++){
const bs=Q[hd][0],pp=Q[hd][1];
for(const b of bs)occ[b]=1;
const s=++tm;fl(pp,0,Z,s);
for(let i=0;i<bs.length&&fd<0;i++){
for(let k=0;k<4;k++){
const d=D[k],b=bs[i],tt=b+d,stn=b-d;
if(Z[stn]!=s||!w2[tt]||occ[tt])continue;
let wk='';
for(let p=stn;p!=pp;p=Z[N+p])wk='udlr'[Z[2*N+p]]+wk;
occ[b]=0;occ[tt]=1;
const nb=bs.slice();nb[i]=tt;nb.sort((a,b)=>a-b);
const kk=key(nb,fl(b,3*N,Z,++tm));
occ[tt]=0;occ[b]=1;
if(ix.has(kk))continue;
ix.set(kk,Q.length);Q.push([nb,b,Q[hd][2]+wk+'UDLR'[k]]);
if(nb.every(x=>GM[x])){fd=Q.length-1;break;}
}
}
for(const b of bs)occ[b]=0;
}
if(fd<0)return;
mv+=Q[fd][2];pl=Q[fd][1];FIN[ri]=Q[fd][0];});
F.mkdirSync(O+'/'+id,{recursive:true});F.writeFileSync(O+'/'+id+'/solution.txt',mv);
}
