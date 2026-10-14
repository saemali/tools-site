(()=>{const $=i=>document.getElementById(i),R=n=>{const e=document.querySelector(`input[name="${n}"]:checked`);return e?e.value:($(n)||{}).value},
f=(x,d=2)=>'₹'+(+x).toLocaleString('en-IN',{maximumFractionDigits:d}),fx=x=>(+x).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2}),N=i=>Math.max(0,parseFloat($(i).value)||0),
esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),row=(a,b)=>`<div class="row"><span>${a}</span><b>${b}</b></div>`;
const t=$('theme');if(t){t.setAttribute('aria-pressed',document.documentElement.dataset.theme=='dark');t.onclick=()=>{const d=document.documentElement,n=d.dataset.theme=='dark'?'light':'dark';d.dataset.theme=n;localStorage.theme=n;t.setAttribute('aria-pressed',n=='dark')}};
const C={
gst(){const a=N('a'),r=+R('r'),base=R('m')=='add'?a:a*100/(100+r),g=base*r/100;
 return `<span>Total amount</span><div class="big">${f(base+g)}</div>`+row('Taxable value',f(base))+(R('s')=='intra'?row(`CGST ${r/2}%`,f(g/2))+row(`SGST ${r/2}%`,f(g/2)):row(`IGST ${r}%`,f(g)))+row('Total GST',f(g))+'<p class="note">Most freelance services: 18%. Check your SAC code\'s rate on CBIC.</p>'},
tds(){const a=N('a'),y=Math.max(N('y'),a),k=R('r'),rate={'194Jb':10,'194Ja':2,'194Ci':1,'194Co':2}[k];let applies,why;
 if(k.startsWith('194J')){applies=y>50000;why='194J applies once this client pays you over ₹50,000 in the financial year.'}else{applies=a>30000||y>100000;why='194C applies if a single payment exceeds ₹30,000 or the year\'s total exceeds ₹1,00,000.'}
 let r=applies?rate:0;if($('np').checked&&applies)r=Math.max(r,20);const td=a*r/100;
 return `<span>Amount reaching your bank</span><div class="big">${f(a-td)}</div>`+row('Fee',f(a))+row(`TDS deducted (${r}%)`,'− '+f(td))+`<p class="note">${applies?'TDS applies. ':'No TDS yet: below the threshold. '}${why} TDS is claimable in your ITR (check Form 26AS/AIS).</p>`},
emi(){const p=N('p'),i=N('r')/1200,n=Math.round(N('n'));if(!n)return '<p>Enter a tenure.</p>';const e=i?p*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1):p/n,T=e*n;
 return `<span>Monthly EMI</span><div class="big">${f(e,0)}</div>`+row('Principal',f(p,0))+row('Total interest',f(T-p,0))+row('Total payment',f(T,0))+`<div style="height:12px;border-radius:8px;background:var(--line);overflow:hidden;margin-top:14px" role="img" aria-label="Interest is ${T?Math.round((T-p)/T*100):0}% of total"><div style="height:100%;width:${T?p/T*100:0}%;background:var(--p)"></div></div><p class="note">Purple = principal, grey = interest.</p>`},
regime(){const s=N('s'),o=N('o'),b=N('b'),h=N('h'),rt=N('rt'),m=R('m')=='y',ag=R('ag'),c=Math.min(N('c'),150000),d=N('d'),np=Math.min(N('np'),50000),hl=Math.min(N('hl'),200000),ot=N('ot');
 const hra=h?Math.max(0,Math.min(h,rt-0.1*b,(m?.5:.4)*b)):0,sdO=Math.min(s,50000),sdN=Math.min(s,75000);
 const tiO=Math.max(0,s-hra-sdO+o-hl-c-d-np-ot),tiN=Math.max(0,s-sdN+o);
 const sl=(x,L)=>{let t=0,p=0;for(const[u,r]of L){if(x>p)t+=(Math.min(x,u)-p)*r;p=u}return t};
 const ex=ag=='80'?500000:ag=='60'?300000:250000,OL=[[ex,0],[500000,.05],[1000000,.2],[Infinity,.3]],NL=[[400000,0],[800000,.05],[1200000,.1],[1600000,.15],[2000000,.2],[2400000,.25],[Infinity,.3]];
 let tO=sl(tiO,OL);if(tiO<=500000)tO=Math.max(0,tO-12500);
 let tN=sl(tiN,NL);if(tiN<=1200000)tN=Math.max(0,tN-60000);else if(tN>tiN-1200000)tN=tiN-1200000;
 const fO=Math.round(tO*1.04),fN=Math.round(tN*1.04),best=fN<=fO?'New regime':'Old regime',sv=Math.abs(fO-fN);
 return `<span>${best} saves you</span><div class="big">${f(sv,0)}</div>`+row('Old regime taxable income',f(tiO,0))+row('Old regime tax (incl. 4% cess)',f(fO,0))+row('New regime taxable income',f(tiN,0))+row('New regime tax (incl. 4% cess)',f(fN,0))+row('HRA exemption (old regime only)',f(hra,0))+`<p class="note">${tiO>5000000||tiN>5000000?'Income above ₹50 lakh attracts surcharge, which this tool does not add. ':''}Estimate for a resident individual, FY 2026-27. Not tax advice.</p>`},
gstlate(){const dl=Math.round(N('dl')),nil=R('nil')=='y',band=R('band'),tax=N('tx'),di=Math.round(N('di'));
 const cap=nil?500:{a:2000,b:5000,c:10000}[band],perDay=nil?20:50,raw=dl*perDay,fee=Math.min(raw,cap),it=tax*0.18*di/365;
 return `<span>Total late fee + interest</span><div class="big">${f(fee+it,0)}</div>`+row(`Late fee (${f(perDay,0)}/day × ${dl} days)`,f(raw,0))+row('Late fee after cap',f(fee,0)+(raw>cap?' (capped)':''))+row('Split: CGST + SGST',f(fee/2,0)+' + '+f(fee/2,0))+row(`Interest @18% p.a. for ${di} days`,f(it,0))+`<p class="note">No late fee under IGST. Interest applies only to tax paid late in cash, not to ITC. Not tax advice.</p>`},
invoice(){const rows=$('it').value.split('\n').filter(x=>x.trim()).map(l=>l.split('|').map(s=>s.trim()));let sub=0,h='';
 rows.forEach(r=>{const q=parseFloat(r[2])||0,rt=parseFloat(r[3])||0,a=q*rt;sub+=a;h+=`<tr><td>${esc(r[0]||'')}</td><td>${esc(r[1]||'')}</td><td>${q}</td><td>${fx(rt)}</td><td>${fx(a)}</td></tr>`});
 const gr=+R('gr'),g=sub*gr/100,tx=gr==0?'':R('sp')=='intra'?`<tr><td colspan=4>CGST ${gr/2}%</td><td>${fx(g/2)}</td></tr><tr><td colspan=4>SGST ${gr/2}%</td><td>${fx(g/2)}</td></tr>`:`<tr><td colspan=4>IGST ${gr}%</td><td>${fx(g)}</td></tr>`;
 return `<div class="ph"><div><div class="ttl">${gr?'TAX INVOICE':'INVOICE'}</div><b>${esc($('fn').value)}</b><br>${$('fg').value?'GSTIN: '+esc($('fg').value):''}</div><div style="text-align:right">No: <b>${esc($('no').value)}</b><br>Date: ${new Date().toLocaleDateString('en-IN')}</div></div>
 <p><b>Bill to:</b> ${esc($('cn').value)}${$('cg').value?'<br>GSTIN: '+esc($('cg').value):''}<br>Place of supply: ${R('sp')=='intra'?'Same state':'Other state (IGST)'}</p>
 <table><tr><th>Description</th><th>SAC</th><th>Qty</th><th>Rate ₹</th><th>Amount ₹</th></tr>${h}<tr><td colspan=4>Subtotal</td><td>${fx(sub)}</td></tr>${tx}<tr class="gt"><th colspan=4>Total</th><th>₹${fx(sub+g)}</th></tr></table><p style="font-size:12px;color:#555;margin-top:14px">Thank you for your business! 🙏</p>`}};
const fm=document.querySelector('[data-calc]');if(fm){const k=fm.dataset.calc,o=k=='invoice'?$('inv'):$('o'),u=()=>o.innerHTML=C[k]();fm.addEventListener('input',u);fm.addEventListener('change',u);u();window.__calc=C}
})();
