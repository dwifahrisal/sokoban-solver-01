const F=require('fs'),I=process.env.MAKEFUN_INPUT_DIR,O=process.env.MAKEFUN_OUTPUT_DIR;
for(const id of F.readdirSync(I)){
const R=F.readFileSync(I+'/'+id+'/level.txt','utf8').split('\n');
const w=Math.max(...R.map(s=>s.length)),N=w*R.length,D=[-w,w,-1,1],M={'.':1,'*':3,'+':5,'$':2,'@':4};
const W=new Uint8Array(N).fill(1),G=[],B=[];let P=0;
R.forEach((s,y)=>{for(let x=0;x<s.length;x++){const c=s[x],i=y*w+x;if(c=='#')continue;W[i]=0;const m=M[c];
if(m&1)G.push(i);if(m&2)B.push(i);if(m&4)P=i;}});
const LV=new Uint8Array(N),qq=G.slice();for(const g of G)LV[g]=1;
for(let i=0;i<qq.length;i++)for(const d of D){const y=qq[i]-d;if(!W[y]&&!W[y-d]&&!LV[y]){LV[y]=1;qq.push(y);}}
const hr=P/w|0,rid=i=>2*(((i%w)-1)/7|0)+((i/w|0)>hr?1:0),RM=[];
for(const b of B){const k=rid(b);(RM[k]=RM[k]||{b:[],g:[]}).b.push(b);}
for(const g of G){const k=rid(g);(RM[k]=RM[k]||{b:[],g:[]}).g.push(g);}
let mv='',pl=P;
for(let ri=0;ri<RM.length;ri++){
const rm=RM[ri];if(!rm)continue;
const w2=W.slice();
for(let k=0;k<RM.length;k++){if(k==ri||!RM[k])continue;for(const c of (RM[k].done?RM[k].g:RM[k].b))w2[c]=1;}
const GM=new Uint8Array(N);for(const g of rm.g)GM[g]=1;
const bx=rm.b.slice().sort((a,b)=>a-b);
const bk=[[[bx,pl]]],DS=new Map(),PR=new Map();
DS.set(bx.join('-')+','+pl,0);
let sol=null;
for(let c=0;c<bk.length&&!sol;c++){
const q=bk[c];
while(q.length){
const st=q.pop(),bs=st[0],p=st[1],k0=bs.join('-')+','+p;
if(DS.get(k0)!=c)continue;
if(bs.every(x=>GM[x])){sol=k0;break;}
for(let k=0;k<4;k++){
const d=D[k],r=p+d;
if(w2[r])continue;
const bi=bs.indexOf(r);
let nb=bs,nc=c;
if(bi>=0){const t=r+d;if(w2[t]||bs.includes(t)||!LV[t])continue;nb=bs.slice();nb[bi]=t;nb.sort((a,b)=>a-b);nc=c+1;}
const k2=nb.join('-')+','+r;
if(!DS.has(k2)||DS.get(k2)>nc){DS.set(k2,nc);PR.set(k2,[k0,k]);(bk[nc]=bk[nc]||[]).push([nb,r]);}
}
}
}
if(!sol)break;
let s=sol,mm='';
while(s){const pr=PR.get(s);if(!pr)break;mm='udlr'[pr[1]]+mm;s=pr[0];}
mv+=mm;pl=+sol.split(',')[1];rm.done=true;}
const d=O+'/'+id;
F.mkdirSync(d,{recursive:true});F.writeFileSync(d+'/solution.txt',mv);
}
