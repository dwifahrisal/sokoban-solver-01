const F=require('fs'),I=process.env.MAKEFUN_INPUT_DIR,O=process.env.MAKEFUN_OUTPUT_DIR;
for(const id of F.readdirSync(I)){
const R=F.readFileSync(I+'/'+id+'/level.txt','utf8').split('\n');
const w=Math.max(...R.map(s=>s.length)),N=w*R.length,D=[-w,w,-1,1];
const W=new Uint8Array(N).fill(1),G=[],B=[];let P=0;
R.forEach((s,y)=>[...s].forEach((c,x)=>{const i=y*w+x;if(c=='#')return;W[i]=0;
if('.+*+'.includes(c))G.push(i);if('$*'.includes(c))B.push(i);if('@+'.includes(c))P=i;}));
const LV=new Uint8Array(N),qq=G.slice();qq.forEach(g=>LV[g]=1);
for(let i=0;i<qq.length;i++)for(const d of D){const y=qq[i]-d;if(!W[y]&&!W[y-d]&&!LV[y])LV[y]=1,qq.push(y);}
const GM=new Uint8Array(N);G.forEach(g=>GM[g]=1);
const hr=P/w|0,rid=i=>2*(((i%w)-1)/7|0)+((i/w|0)>hr?1:0),RM=[],FIN=[];
for(const b of B)(RM[rid(b)]=RM[rid(b)]||[]).push(b);
let mv='',pl=P;
for(let ri=0;ri<RM.length;ri++){
const rm=RM[ri];if(!rm)continue;
const w2=W.slice();
RM.forEach((r,k)=>{if(k!=ri&&r)for(const c of (FIN[k]||r))w2[c]=1;});
const bx=rm.slice().sort((a,b)=>a-b);
const bk=[[[bx,pl]]],DS=new Map();
DS.set(bx.join('-')+','+pl,[0]);
let sol=null;
for(let c=0;c<bk.length&&!sol;c++){
const q=bk[c];
while(q.length){
const st=q.pop(),bs=st[0],p=st[1],k0=bs.join('-')+','+p;
if(DS.get(k0)[0]!=c)continue;
if(bs.every(x=>GM[x])){sol=k0;break;}
for(let k=0;k<4;k++){
const d=D[k],r=p+d;
if(w2[r])continue;
const bi=bs.indexOf(r);
let nb=bs,nc=c;
if(bi>=0){const t=r+d;if(w2[t]||bs.includes(t)||!LV[t])continue;nb=bs.slice();nb[bi]=t;nb.sort((a,b)=>a-b);nc=c+1;}
const k2=nb.join('-')+','+r;
const o=DS.get(k2);if(!o||o[0]>nc){DS.set(k2,[nc,k0,k,nb]);(bk[nc]=bk[nc]||[]).push([nb,r]);}
}
}
}
if(!sol)break;
let s=sol,mm='';
while(s){const pr=DS.get(s);if(!pr[1])break;mm='udlr'[pr[2]]+mm;s=pr[1];}
mv+=mm;pl=+sol.split(',')[1];FIN[ri]=DS.get(sol)[3];}
const d=O+'/'+id;
F.mkdirSync(d,{recursive:true});F.writeFileSync(d+'/solution.txt',mv);
}
