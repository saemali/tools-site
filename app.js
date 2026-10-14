(()=>{const $=i=>document.getElementById(i),R=n=>{const e=document.querySelector(`input[name="${n}"]:checked`);return e?e.value:($(n)||{}).value},
f=(x,d=2)=>'₹'+(+x).toLocaleString('en-IN',{maximumFractionDigits:d}),fx=x=>(+x).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2}),N=i=>Math.max(0,parseFloat($(i).value)||0),
esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),row=(a,b)=>`<div class="row"><span>${a}</span><b>${b}</b></div>`;
const t=$('theme');if(t)t.onclick=()=>{const d=document.documentElement,n=d.dataset.theme=='dark'?'light':'dark';d.dataset.theme=n;localStorage.theme=n};
const C={
gst(){const a=N('a'),r=+R('r'),base=R('m')=='add'?a:a*100/(100+r),g=base*r/100;
 return `<span>Total amount</span><div class="big">${f(base+g)}</div>`+row('Taxable value',f(base))+(R('s')=='intra'?row(`CGST ${r/2}%`,f(g/2))+row(`SGST ${r/2}%`,f(g/2)):row(`IGST ${r}%`,f(g)))+row('Total GST',f(g))+'<p class="note">Most freelance services: 18%. Check your SAC code\'s rate on CBIC.</p>'},
tds(){const a=N('a'),y=Math.max(N('y'),a),k=R('r'),rate={'194Jb':10,'194Ja':2,'194Ci':1,'194Co':2}[k];let applies,why;
 if(k.startsWith('194J')){applies=y>50000;why='194J applies once this client pays you over ₹50,000 in the financial year.'}else{applies=a>30000||y>100000;why='194C applies if a single payment exceeds ₹30,000 or the year\'s total exceeds ₹1,00,000.'}
 let r=applies?rate:0;if($('np').checked&&applies)r=Math.max(r,20);const td=a*r/100;
 return `<span>Amount reaching your bank</span><div class="big">${f(a-td)}</div>`+row('Fee',f(a))+row(`TDS deducted (${r}%)`,'− '+f(td))+`<p class="note">${applies?'TDS applies. ':'No TDS yet: below the threshold. '}${why} TDS is claimable in your ITR (check Form 26AS/AIS).</p>`},
emi(){const p=N('p'),i=N('r')/1200,n=Math.round(N('n'));if(!n)return '<p>Enter a tenure.</p>';const e=i?p*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1):p/n,T=e*n;
 return `<span>Monthly EMI</span><div class="big">${f(e,0)}</div>`+row('Principal',f(p,0))+row('Total interest',f(T-p,0))+row('Total payment',f(T,0))+`<div style="height:12px;border-radius:8px;background:var(--line);overflow:hidden;margin-top:14px" role="img" aria-label="Interest is ${T?Math.round((T-p)/T*100):0}% of total"><div style="height:100%;width:${T?p/T*100:0}%;background:var(--p)"></div></div><p class="note">Purple = principal, grey = interest.</p>`},
invoice(){const rows=$('it').value.split('\n').filter(x=>x.trim()).map(l=>l.split('|').map(s=>s.trim()));let sub=0,h='';
 rows.forEach(r=>{const q=parseFloat(r[2])||0,rt=parseFloat(r[3])||0,a=q*rt;sub+=a;h+=`<tr><td>${esc(r[0]||'')}</td><td>${esc(r[1]||'')}</td><td>${q}</td><td>${fx(rt)}</td><td>${fx(a)}</td></tr>`});
 const gr=+R('gr'),g=sub*gr/100,tx=gr==0?'':R('sp')=='intra'?`<tr><td colspan=4>CGST ${gr/2}%</td><td>${fx(g/2)}</td></tr><tr><td colspan=4>SGST ${gr/2}%</td><td>${fx(g/2)}</td></tr>`:`<tr><td colspan=4>IGST ${gr}%</td><td>${fx(g)}</td></tr>`;
 return `<div class="ph"><div><div class="ttl">${gr?'TAX INVOICE':'INVOICE'}</div><b>${esc($('fn').value)}</b><br>${$('fg').value?'GSTIN: '+esc($('fg').value):''}</div><div style="text-align:right">No: <b>${esc($('no').value)}</b><br>Date: ${new Date().toLocaleDateString('en-IN')}</div></div>
 <p><b>Bill to:</b> ${esc($('cn').value)}${$('cg').value?'<br>GSTIN: '+esc($('cg').value):''}<br>Place of supply: ${R('sp')=='intra'?'Same state':'Other state (IGST)'}</p>
 <table><tr><th>Description</th><th>SAC</th><th>Qty</th><th>Rate ₹</th><th>Amount ₹</th></tr>${h}<tr><td colspan=4>Subtotal</td><td>${fx(sub)}</td></tr>${tx}<tr class="gt"><th colspan=4>Total</th><th>₹${fx(sub+g)}</th></tr></table><p style="font-size:12px;color:#555;margin-top:14px">Thank you for your business! 🙏</p>`}};
const fm=document.querySelector('[data-calc]');if(fm){const k=fm.dataset.calc,o=k=='invoice'?$('inv'):$('o'),u=()=>o.innerHTML=C[k]();fm.addEventListener('input',u);fm.addEventListener('change',u);u();window.__calc=C}
})();
