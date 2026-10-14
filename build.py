import json,os
OUT='/workspace/earn/tools-site'; D='https://saemali.github.io/tools-site/'
LOGO='<svg class="logo" viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7a45"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs><rect width="40" height="40" rx="11" fill="url(#lg)"/><text x="20" y="28" text-anchor="middle" font-size="22" font-weight="800" fill="#fff" font-family="system-ui">₹</text></svg>'
def logo(i): return LOGO.replace('id="lg"',f'id="{i}"').replace('url(#lg)',f'url(#{i})')
ICON={'gst':'🧾','tds':'✂️','emi':'🏦','invoice':'📄'}
NAV=[('gst.html','GST'),('tds.html','TDS'),('emi.html','EMI'),('invoice.html','Invoice'),('guides.html','Guides')]
def page(fn,title,desc,body,faq=None,h1='',extra_schema=''):
    nav=''.join(f'<a href="{h}"{" aria-current=page" if h==fn else ""}>{t}</a>' for h,t in NAV)
    schema=extra_schema
    if faq: schema='<script type="application/ld+json">'+json.dumps({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in faq]},ensure_ascii=False)+'</script>'
    faqh=''.join(f'<details><summary>{q}</summary><p>{a}</p></details>' for q,a in (faq or []))
    faqsec=f'<section class="wrap faq"><h2>Common questions <span class="hi">· aksar pooche jaane wale sawaal</span></h2>{faqh}</section>' if faq else ''
    html=f'''<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title><meta name="description" content="{desc}"><link rel="canonical" href="{D}{'' if fn=='index.html' else fn}">
<meta property="og:title" content="{title}"><meta property="og:description" content="{desc}"><meta property="og:type" content="website"><meta property="og:image" content="{D}og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta property="og:url" content="{D}{'' if fn=='index.html' else fn}">
<meta name="theme-color" content="#7c3aed"><link rel="icon" href="favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="style.css">
<script>document.documentElement.dataset.theme=localStorage.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')</script>{schema}</head><body>
<a class="skip" href="#main">Skip to content</a>
<header class="top"><div class="wrap bar"><a class="brand" href="./">{logo("lg")}<span>Hisaab<b>Mitra</b></span></a><nav aria-label="Tools">{nav}</nav>
<button class="theme" id="theme" aria-label="Dark mode" aria-pressed="false">◐</button></div></header>
<main id="main">{body}</main>{faqsec}
<footer class="foot"><div class="wrap fgrid"><div><a class="brand" href="./">{logo("lg2")}<span>Hisaab<b>Mitra</b></span></a><p>Free, private money tools for India's freelancers and small businesses. आपका हिसाब, आसान भाषा में.</p></div>
<div><h4>Tools</h4>{''.join(f'<a href="{h}">{t} {"generator" if t=="Invoice" else "calculator"}</a>' for h,t in NAV if h!="guides.html")}<a href="guides.html">Guides</a></div>
<div><h4>About</h4><a href="about.html">About &amp; contact</a><a href="privacy.html">Privacy policy</a><a href="disclaimer.html">Disclaimer</a></div></div>
<p class="wrap fine">Estimates for general information only, not tax, legal or financial advice. Rates checked Oct 2026 against CBIC, India Budget and incometax.gov.in. Please confirm with a Chartered Accountant. © 2026 HisaabMitra.</p></footer>
<script src="app.js"></script></body></html>'''
    open(f'{OUT}/{fn}','w').write(html)
def tool(key,h1,hindi,lead,form,res):
    return f'''<section class="wrap phead"><span class="chip">{ICON[key]} Free tool · no signup</span><h1>{h1}</h1><p class="hi lead2">{hindi}</p><p class="lead">{lead}</p></section>
<section class="wrap calc"><form class="card form" onsubmit="return false" data-calc="{key}">{form}</form><div class="card result" aria-live="polite" id="o">{res}</div></section>'''
def sel(id,label,opts,default):
    o=''.join(f'<option value="{v}"{" selected" if v==default else ""}>{t}</option>' for v,t in opts)
    return f'<label for="{id}">{label}</label><select id="{id}">{o}</select>'
def seg(id,label,opts,default):
    o=''.join(f'<label class="opt"><input type="radio" name="{id}" value="{v}"{" checked" if v==default else ""}><span>{t}</span></label>' for v,t in opts)
    return f'<fieldset class="seg"><legend>{label}</legend>{o}</fieldset>'
def num(id,label,val,pre='₹',step='any'):
    return f'<label for="{id}">{label}</label><div class="inp">{"<span>"+pre+"</span>" if pre else ""}<input id="{id}" type="number" inputmode="decimal" min="0" step="{step}" value="{val}"></div>'

# HOME
cards=''.join(f'<a class="tcard" href="{k}.html"><span class="ic">{ICON[k]}</span><h3>{t}</h3><p>{d}</p><span class="go">Open tool →</span></a>' for k,t,d in [
('gst','GST Calculator','Add or remove GST at 5%, 18% or 40%, with the CGST/SGST/IGST split shown.'),
('tds','TDS Calculator','See how much TDS a client will deduct under 194J/194C and what reaches your bank.'),
('emi','EMI Calculator','Know your monthly EMI and total interest before you take a loan.'),
('invoice','GST Invoice Generator','Make a clean, client-ready GST invoice and save it as a PDF in a minute.')])
home=f'''<section class="hero"><div class="wrap hgrid"><div><span class="chip">🇮🇳 Made for Indian freelancers &amp; small businesses</span>
<h1>Your <em>hisaab</em>, sorted in seconds.</h1><p class="lead">GST, TDS and EMI calculators plus a free GST invoice maker. No signup, no ads following you around, and your numbers never leave your phone.</p>
<p class="hi">टैक्स की टेंशन कम, काम पर ध्यान ज़्यादा।</p><div class="cta"><a class="btn" href="gst.html">Calculate GST</a><a class="btn ghost" href="invoice.html">Make an invoice</a></div>
<ul class="ticks"><li>✓ 100% free</li><li>✓ Works offline in your browser</li><li>✓ Rates updated for GST 2.0</li></ul></div>
<div class="card demo" aria-hidden="true"><div class="dl"><span>Invoice amount</span><b>₹50,000</b></div><div class="dl"><span>GST @18%</span><b>+ ₹9,000</b></div><div class="dl"><span>TDS 194J @10%</span><b class="neg">− ₹5,000</b></div><div class="dl tot"><span>You receive</span><b>₹54,000</b></div></div></div></section>
<section class="wrap"><h2 class="sec">Pick a tool</h2><div class="grid">{cards}</div></section>
<section class="wrap why"><h2 class="sec">Why freelancers use HisaabMitra</h2><div class="grid3"><div class="card"><h3>🔒 Private</h3><p>Everything is calculated on your device. We don't store or see your numbers.</p></div><div class="card"><h3>📚 Sourced</h3><p>Rates are checked against CBIC and Income Tax Department sources, with the date shown.</p></div><div class="card"><h3>🤝 Plain language</h3><p>No jargon. Clear answers to "kitna milega?" and "kitna tax lagega?"</p></div></div></section>'''
page('index.html','HisaabMitra – Free GST, TDS & EMI Calculators and GST Invoice Generator','Free GST, TDS and EMI calculators and a GST invoice generator for Indian freelancers and small businesses. Private, no signup, updated for GST 2.0.',home,
 faq=[('Is HisaabMitra really free?','Yes. All tools are free with no signup. We may link to our own paid templates, clearly labelled.'),('Is my data safe?','Calculations run entirely in your browser. Nothing you type is sent to any server.'),('Are the GST rates current?','Yes. Since 22 September 2025 the main GST slabs are 0%, 5%, 18% and 40%. Most freelance services are at 18%.')])

gst=tool('gst','GST Calculator','जीएसटी जोड़ें या हटाएँ, CGST/SGST/IGST के साथ','Enter an amount to add GST to it, or to find the GST already included. Results update as you type.',
 num('a','Amount','10000')+seg('r','GST rate',[('0','0%'),('5','5%'),('18','18%'),('40','40%')],'18')+seg('m','What do you want?',[('add','Add GST'),('rem','Remove GST')],'add')+seg('s','Client location',[('intra','Same state'),('inter','Other state')],'intra'),'')
gst+='''<section class="wrap prose card"><h2>How GST is calculated</h2><p><b>Add GST:</b> GST = amount × rate ÷ 100. <b>Remove GST:</b> base = amount × 100 ÷ (100 + rate).</p><p>Within your state the tax splits equally into CGST and SGST. For a client in another state it's charged as IGST. Since 22 Sep 2025 the main slabs are 0%, 5%, 18% and 40%, and most professional services are at 18%. Source: <a href="https://cbic-gst.gov.in/gst-goods-services-rates.html" rel="noopener">CBIC</a>, <a href="https://www.pib.gov.in/FaqDetails.aspx?ModuleId=4&NoteId=155252&lang=1&reg=1" rel="noopener">PIB FAQ</a>.</p></section>'''
page('gst.html','GST Calculator India 2026 – Add or Remove GST (5%, 18%, 40%) | HisaabMitra','Free GST calculator updated for GST 2.0. Add or remove GST at 5%, 18% or 40% and see the CGST, SGST and IGST split instantly.',gst,
 faq=[('When does a freelancer need GST registration?','Generally when annual turnover from services crosses ₹20 lakh (₹10 lakh in special category states). The PIB FAQ on the 2025 rate changes confirms the thresholds were not changed.'),('Do I charge GST to foreign clients?','Exports of services can be zero-rated if you file a Letter of Undertaking (LUT) each financial year. Confirm eligibility with a CA.'),('What happened to the 12% and 28% slabs?','From 22 Sep 2025 most items moved to 5% or 18%, with 40% for specified luxury and sin goods.')])

tds=tool('tds','TDS Calculator for Freelancers','क्लाइंट कितना TDS काटेगा, और आपके हाथ में कितना आएगा?','Find out how much TDS a client deducts from your fee and what actually reaches your bank account.',
 num('a','Fee amount (excluding GST)','50000')+num('y','Total paid by this client in the year (incl. this bill)','50000')+sel('r','Type of payment',[('194Jb','194J / s.393 – professional fees (10%)'),('194Ja','194J / s.393 – technical services (2%)'),('194Ci','194C / s.393 – contract work, individual/HUF (1%)'),('194Co','194C / s.393 – contract work, others – company, firm, LLP etc. (2%)')],'194Jb')+'<label class="check"><input type="checkbox" id="np"> I haven\'t given my PAN to the client</label>','')
tds+='''<section class="wrap prose card"><h2>Thresholds used (FY 2025-26 onward)</h2><ul><li><b>194J:</b> no TDS while a client's fees to you stay at or under ₹50,000 in the year (raised from ₹30,000 by Budget 2025).</li><li><b>194C:</b> no TDS if a single payment is ₹30,000 or less and the year's total is ₹1,00,000 or less.</li><li><b>No PAN:</b> TDS at 20% (old section 206AA, now section 397(2) of the Income-tax Act, 2025).</li></ul><h3>From 1 April 2026: Income-tax Act, 2025</h3><p>For any payment or credit on or after 1 Apr 2026, the new Act applies and sections are renumbered: 194C is now <b>section 393(1) [Table: Sl. No. 6(i)]</b>, 194J (professional/technical fees) is now <b>section 393(1) [Table: Sl. No. 6(iii)]</b>, and the no-PAN rate (old 206AA) is <b>section 397(2)</b>. The Income Tax Department confirms that rates and thresholds remain the same under both Acts. <i>Checked 15 Oct 2026.</i> Official sources: <a href="https://www.incometaxindia.gov.in/w/section-393-6" rel="noopener">Section 393, Income-tax Act 2025</a>, <a href="https://www.incometaxindia.gov.in/w/section-397-6" rel="noopener">Section 397</a>, <a href="https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/tds-compliance" rel="noopener">TDS compliance FAQ (transition)</a>.</p><p>TDS isn't extra tax. It's an advance you claim back in your ITR, so check Form 26AS/AIS. Sources: <a href="https://www.indiabudget.gov.in/budget2025-26/doc/memo.pdf" rel="noopener">Finance Bill 2025 memorandum</a>, <a href="https://www.incometax.gov.in" rel="noopener">incometax.gov.in</a>.</p></section>'''
page('tds.html','TDS Calculator 2026 – 194J & 194C TDS on Freelance Fees | HisaabMitra','Free TDS calculator for freelancers: 194J (10%/2%) and 194C (1%/2%) with the ₹50,000 threshold applied. See exactly what reaches your bank.',tds,
 faq=[('Is TDS a loss?','No. TDS is tax paid in advance on your behalf. You claim it when filing your ITR and get a refund if it was more than your actual tax.'),('Why did my client deduct 10%?','Professional services fall under section 194J at 10% once the client pays you more than ₹50,000 in a financial year. From 1 April 2026 this is section 393(1) [Table: Sl. No. 6(iii)] of the Income-tax Act, 2025, with the same rate and threshold.'),('Which Act applies from 1 April 2026?','The Income-tax Act, 2025 applies to any payment or credit made on or after 1 April 2026. 194C becomes section 393(1) [Table: Sl. No. 6(i)] and 206AA (no PAN) becomes section 397(2). Rates and thresholds are unchanged. Checked 15 Oct 2026 against incometax.gov.in.'),('Is TDS deducted on GST?','Usually TDS is calculated on the fee excluding GST when GST is shown separately on the invoice.')])

emi=tool('emi','EMI Calculator','हर महीने की किस्त और कुल ब्याज, एक नज़र में','Plan a home, car, laptop or business loan with confidence. Know your EMI and total interest up front.',
 num('p','Loan amount','500000')+num('r','Interest rate (% per year)','10.5','%',)+num('n','Tenure (months)','36',''),'')
emi+='<section class="wrap prose card"><h2>The EMI formula</h2><p>EMI = P × r × (1+r)<sup>n</sup> ÷ ((1+r)<sup>n</sup> − 1), where P is the loan, r the monthly rate (annual ÷ 12 ÷ 100) and n the number of months. Banks may round slightly differently or add processing fees.</p></section>'
page('emi.html','EMI Calculator – Home, Car, Personal & Business Loan EMI | HisaabMitra','Free EMI calculator: enter loan amount, interest rate and tenure to see monthly EMI, total interest and total repayment instantly.',emi,
 faq=[('Does a longer tenure save money?','It lowers the EMI but increases the total interest you pay.'),('Is this the exact bank EMI?','It uses the standard reducing-balance formula. Your bank\'s figure may differ by a few rupees due to rounding and fees.')])

inv='''<section class="wrap phead noprint"><span class="chip">📄 Free tool · no signup</span><h1>GST Invoice Generator</h1><p class="hi lead2">प्रोफेशनल GST इनवॉइस, एक मिनट में</p><p class="lead">Fill in your details, and your invoice updates live. Then tap <b>Download PDF</b> (choose "Save as PDF"). Nothing is uploaded.</p></section>
<section class="wrap calc inv"><form class="card form noprint" onsubmit="return false" data-calc="invoice">
<label for="fn">Your name / business</label><input id="fn" value="Your Name"><label for="fg">Your GSTIN (optional)</label><input id="fg" placeholder="27ABCDE1234F1Z5">
<label for="cn">Bill to (client name &amp; address)</label><input id="cn" value="Client Pvt Ltd, Mumbai"><label for="cg">Client GSTIN (optional)</label><input id="cg">
<label for="no">Invoice number</label><input id="no" value="INV-001">'''+seg('gr','GST rate',[('0','0%'),('5','5%'),('18','18%'),('40','40%')],'18')+seg('sp','Client location',[('intra','Same state'),('inter','Other state')],'intra')+'''
<label for="it">Items, one per line: description | SAC | qty | rate</label><textarea id="it" rows="4">Website design | 998314 | 1 | 15000</textarea>
<button type="button" class="btn" onclick="window.print()">⬇ Download PDF</button></form>
<div class="card paper" id="inv" aria-live="polite"></div></section>'''
page('invoice.html','Free GST Invoice Generator India – Download PDF | HisaabMitra','Create a GST invoice online for free with CGST/SGST or IGST, SAC codes and totals. Download as PDF. No signup; nothing is uploaded.',inv,
 faq=[('What must a GST invoice include?','Supplier name, address and GSTIN, invoice number and date, recipient details, SAC/HSN code, taxable value, GST rate and amount, and place of supply.'),('Can I use this if I\'m not GST registered?','Choose 0% and the generator makes a regular invoice. Don\'t charge GST unless you are registered.')])

for fn,t,b in [('about.html','About & Contact','<p>HisaabMitra is a small, independent project that makes free money tools for India\'s freelancers and small businesses. We built it because GST and TDS shouldn\'t need a CA just to estimate a number.</p><p>Content is drafted with AI assistance and every rate and formula is checked by hand against official sources.</p><h2>Contact</h2><p>Found a mistake or want a new tool? Open an issue on <a href="https://github.com/saemali/tools-site/issues">GitHub</a>. We fix errors quickly.</p>'),
('privacy.html','Privacy Policy','<p><b>Last updated: 15 October 2026.</b></p><p>All calculators run entirely in your browser. We do not collect, store or transmit any numbers or details you type. We use no cookies, no analytics and no tracking. Your light/dark theme choice is saved only in your own browser\'s local storage.</p><p>The site is hosted on GitHub Pages, which may keep standard server logs (such as IP addresses) as described in <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub\'s privacy statement</a>.</p><p>Links to other websites go to third-party sites with their own policies.</p>'),
('disclaimer.html','Disclaimer','<p>HisaabMitra tools give estimates for general information only. They are not tax, legal or financial advice. Tax laws, rates and thresholds change. We check them against official sources (CBIC, Income Tax Department, Union Budget documents) and show the date, but you should confirm with a qualified Chartered Accountant before filing or invoicing.</p><p>We aren\'t liable for decisions made using these tools. Some links point to our own paid products, and these are always clearly labelled.</p>')]:
    page(fn,f'{t} | HisaabMitra',f'{t} for HisaabMitra free GST, TDS and EMI tools.',f'<section class="wrap phead"><h1>{t}</h1></section><section class="wrap prose card">{b}</section>')
open(f'{OUT}/favicon.svg','w').write(LOGO.replace(' class="logo"','').replace(' aria-hidden="true"',' xmlns="http://www.w3.org/2000/svg"'))
urls=''.join(f'<url><loc>{D}{p}</loc><lastmod>2026-10-15</lastmod></url>' for p in ['','gst.html','tds.html','emi.html','invoice.html','about.html','privacy.html','disclaimer.html'])
open(f'{OUT}/sitemap.xml','w').write(f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>')

# ARTICLES (from content/*.md)
import glob,re,markdown
ARTS=[]
for f in sorted(glob.glob(f'{OUT}/content/0*.md')):
    raw=open(f).read(); _,fm,body=raw.split('---',2)
    meta={k.strip():v.strip().strip('"') for k,v in (l.split(':',1) for l in fm.strip().splitlines() if ':' in l)}
    ARTS.append((os.path.basename(f),meta,body))
SLUG={fn:m['slug']+'.html' for fn,m,_ in ARTS}
for fn,m,body in ARTS:
    body=re.sub(r'```html\s*<script type="application/ld\+json">.*?</script>\s*```','',body,flags=re.S)
    body='\n'.join(l for l in body.split('\n') if '[PITCH_KIT_URL]' not in l)
    for k,v in SLUG.items(): body=body.replace(f']({k})',f']({D}{v})')
    fq=re.search(r'## FAQ\n(.*?)\n## ',body,re.S).group(1)
    faq=re.findall(r'\*\*(.+?\?)\*\*\n(.+)',fq)
    h1=re.search(r'^# (.+)$',body,re.M).group(1); body=re.sub(r'^# .+\n','',body,count=1,flags=re.M)
    html=markdown.markdown(body,extensions=['tables','fenced_code'])
    art=f'<article><section class="wrap phead"><span class="chip">📚 Guide · updated {m.get("last_checked","")}</span><h1>{h1}</h1></section><section class="wrap prose card">{html}</section></article>'
    sch='<script type="application/ld+json">'+json.dumps({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in faq]},ensure_ascii=False)+'</script>'
    page(SLUG[fn],m['title']+' | HisaabMitra',m['meta_description'],art,extra_schema=sch)
lst=''.join(f'<a class="tcard" href="{SLUG[fn]}"><h3>{m["title"]}</h3><p>{m["meta_description"]}</p><span class="go">Read guide →</span></a>' for fn,m,_ in ARTS)
page('guides.html','Guides: GST, TDS, advance tax & EMI for freelancers | HisaabMitra','Plain-language guides on GST due dates, GST rates, TDS, invoices, advance tax, ITC and loan EMIs for Indian freelancers and small businesses.',f'<section class="wrap phead"><h1>Guides</h1><p class="lead">Plain-language explainers, checked against official sources.</p></section><section class="wrap grid">{lst}</section>')
urls=''.join(f'<url><loc>{D}{p}</loc><lastmod>2026-10-15</lastmod></url>' for p in ['','gst.html','tds.html','emi.html','invoice.html','guides.html']+list(SLUG.values())+['about.html','privacy.html','disclaimer.html'])
open(f'{OUT}/sitemap.xml','w').write(f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>')
