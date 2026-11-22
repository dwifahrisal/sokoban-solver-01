const F=require('fs'),I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
for(const id of F.readdirSync(I)){
const R=F.readFileSync(I+'/'+id+'/level.txt','utf8').split('\n');
const w=Math.max(...R.map(s=>s.length)),N=w*R.length,D=[-w,w,-1,1];
const W=new Uint8Array(N).fill(1),G=[],B=[];let P=0;
R.forEach((s,y)=>[...s].forEach((c,x)=>{const i=y*w+x;if(c=='#')return;W[i]=0;
if('.+*'.includes(c))G.push(i);if('$*'.includes(c))B.push(i);if('@+'.includes(c))P=i;}));
const hr=P/w|0,rid=i=>2*(((i%w)-1)/7|0)+((i/w|0)>hr?1:0),RM=[],FIN=[],GM=new Uint8Array(N);
for(const g of G)GM[g]=1;
for(const b of B)(RM[rid(b)]=RM[rid(b)]||[]).push(b);
let mv='',pl=P;
for(let ri=0;ri<RM.length;ri++){
const rm=RM[ri];if(!rm)continue;
const w2=W.slice();
RM.forEach((r,k)=>{if(k!=ri&&r)for(const c of (FIN[k]||r))w2[c]=1;});
const occ=new Uint8Array(N),sn=new Int32Array(N),mk=new Int32Array(N),pr=new Int32Array(N),pd=new Uint8Array(N),pm=new Int32Array(N),px=new Uint8Array(N);
const fl=(f,a,pa,pd,s)=>{let lo=f;const st=[f];a[f]=s;pa[f]=-1;
while(st.length){const p=st.pop();if(p<lo)lo=p;for(let k=0;k<4;k++){const r=p+D[k];
if(!w2[r]&&!occ[r]&&a[r]!=s){a[r]=s;pa[r]=p;pd[r]=k;st.push(r);}}}return lo;};
const bx=rm.slice().sort((a,b)=>a-b),Q=[[bx,pl,'']],ix=new Map();let tm=1;
for(const b of bx)occ[b]=1;ix.set(bx.join('-')+'|'+fl(pl,sn,pr,pd,++tm),0);for(const b of bx)occ[b]=0;
let fd=-1;
for(let hd=0;fd<0&&hd<Q.length;hd++){
const bs=Q[hd][0],pp=Q[hd][1];
for(const b of bs)occ[b]=1;
const s=++tm;fl(pp,sn,pr,pd,s);
for(let i=0;i<bs.length&&fd<0;i++){
for(let k=0;k<4;k++){
const d=D[k],b=bs[i],tt=b+d,stn=b-d;
if(sn[stn]!=s||w2[tt]||occ[tt])continue;
let wk='';
for(let p=stn;p!=pp;p=pr[p])wk='udlr'[pd[p]]+wk;
occ[b]=0;occ[tt]=1;
const nb=bs.slice();nb[i]=tt;nb.sort((a,b)=>a-b);
const kk=nb.join('-')+'|'+fl(b,mk,pm,px,++tm);
occ[tt]=0;occ[b]=1;
if(ix.has(kk))continue;
ix.set(kk,Q.length);Q.push([nb,b,Q[hd][2]+wk+'UDLR'[k]]);
if(nb.every(x=>GM[x])){fd=Q.length-1;break;}
}
}
for(const b of bs)occ[b]=0;
}
if(fd<0)break;
mv+=Q[fd][2];pl=Q[fd][1];FIN[ri]=Q[fd][0];}
F.mkdirSync(O+'/'+id,{recursive:true});F.writeFileSync(O+'/'+id+'/solution.txt',mv);
}
