# FAQ additions for live HisaabMitra guides (DRAFT, do not edit live pages without approval)

Each block lists the target guide, new Q&A pairs in brand voice (from the former Quora answers), and FAQPage JSON-LD. The new questions are written not to repeat the guide's existing FAQ. **How to apply:** add the Q&A pairs to the guide's visible FAQ section, and merge the `mainEntity` items into that page's existing FAQPage script (do not add a second FAQPage block). A standalone script is also given for reference. All facts come from the fact-checked drafts (last checked 15 Oct 2026).


---

## Target: https://saemali.github.io/tools-site/gstr-3b-due-date-october-2026.html
Source draft: `01-gstr3b-due-date-oct-2026.md` · Converted from: Quora #1

**Which states file quarterly GSTR-3B on the 22nd and which on the 24th?**
The 22nd applies to Chhattisgarh, Madhya Pradesh, Gujarat, Maharashtra, Karnataka, Goa, Kerala, Tamil Nadu, Telangana, Andhra Pradesh, and the UTs of Daman & Diu and Dadra & Nagar Haveli, Puducherry, Andaman & Nicobar and Lakshadweep. The 24th applies to Himachal Pradesh, Punjab, Uttarakhand, Haryana, Rajasthan, Uttar Pradesh, Bihar, Sikkim, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, Meghalaya, Assam, West Bengal, Jharkhand, Odisha, J&K, Ladakh, Chandigarh and Delhi (CGST Rule 61(1)(ii) Table, substituted by Notification 82/2020-CT). Your portal dashboard shows your exact date.

**Do QRMP filers need to count PMT-06 payments when filing quarterly GSTR-3B?**
Yes. Tax already paid through PMT-06 for the first two months of the quarter sits in the cash ledger and is used against the quarter's liability. Subtract it to avoid paying the same tax twice.

`mainEntity` items to merge:
```json
[
  {
    "@type": "Question",
    "name": "Which states file quarterly GSTR-3B on the 22nd and which on the 24th?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The 22nd applies to Chhattisgarh, Madhya Pradesh, Gujarat, Maharashtra, Karnataka, Goa, Kerala, Tamil Nadu, Telangana, Andhra Pradesh, and the UTs of Daman & Diu and Dadra & Nagar Haveli, Puducherry, Andaman & Nicobar and Lakshadweep. The 24th applies to Himachal Pradesh, Punjab, Uttarakhand, Haryana, Rajasthan, Uttar Pradesh, Bihar, Sikkim, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, Meghalaya, Assam, West Bengal, Jharkhand, Odisha, J&K, Ladakh, Chandigarh and Delhi (CGST Rule 61(1)(ii) Table, substituted by Notification 82/2020-CT). Your portal dashboard shows your exact date."
    }
  },
  {
    "@type": "Question",
    "name": "Do QRMP filers need to count PMT-06 payments when filing quarterly GSTR-3B?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes. Tax already paid through PMT-06 for the first two months of the quarter sits in the cash ledger and is used against the quarter's liability. Subtract it to avoid paying the same tax twice."
    }
  }
]
```

Standalone (reference only):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which states file quarterly GSTR-3B on the 22nd and which on the 24th?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 22nd applies to Chhattisgarh, Madhya Pradesh, Gujarat, Maharashtra, Karnataka, Goa, Kerala, Tamil Nadu, Telangana, Andhra Pradesh, and the UTs of Daman & Diu and Dadra & Nagar Haveli, Puducherry, Andaman & Nicobar and Lakshadweep. The 24th applies to Himachal Pradesh, Punjab, Uttarakhand, Haryana, Rajasthan, Uttar Pradesh, Bihar, Sikkim, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, Meghalaya, Assam, West Bengal, Jharkhand, Odisha, J&K, Ladakh, Chandigarh and Delhi (CGST Rule 61(1)(ii) Table, substituted by Notification 82/2020-CT). Your portal dashboard shows your exact date."
      }
    },
    {
      "@type": "Question",
      "name": "Do QRMP filers need to count PMT-06 payments when filing quarterly GSTR-3B?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Tax already paid through PMT-06 for the first two months of the quarter sits in the cash ledger and is used against the quarter's liability. Subtract it to avoid paying the same tax twice."
      }
    }
  ]
}
</script>
```


---

## Target: https://saemali.github.io/tools-site/gstr-1-due-date-november-2026.html
Source draft: `06-gstr1-due-date-nov-2026.md` · Converted from: Quora #6

**What is the maximum late fee for GSTR-1?**
Under Notification 20/2021-CT, the late fee is capped at ₹500 per return for nil returns, ₹2,000 for aggregate turnover up to ₹1.5 crore, ₹5,000 for ₹1.5–5 crore, and ₹10,000 above ₹5 crore. The daily rate is ₹50 (₹25 CGST + ₹25 SGST), or ₹20 for a nil return.

**When is the IFF window for October 2026?**
QRMP filers can upload B2B invoices for October 2026 through IFF from 1 to 13 November 2026, under CGST Rule 59(2). IFF is optional.

`mainEntity` items to merge:
```json
[
  {
    "@type": "Question",
    "name": "What is the maximum late fee for GSTR-1?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Under Notification 20/2021-CT, the late fee is capped at ₹500 per return for nil returns, ₹2,000 for aggregate turnover up to ₹1.5 crore, ₹5,000 for ₹1.5–5 crore, and ₹10,000 above ₹5 crore. The daily rate is ₹50 (₹25 CGST + ₹25 SGST), or ₹20 for a nil return."
    }
  },
  {
    "@type": "Question",
    "name": "When is the IFF window for October 2026?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "QRMP filers can upload B2B invoices for October 2026 through IFF from 1 to 13 November 2026, under CGST Rule 59(2). IFF is optional."
    }
  }
]
```

Standalone (reference only):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the maximum late fee for GSTR-1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Under Notification 20/2021-CT, the late fee is capped at ₹500 per return for nil returns, ₹2,000 for aggregate turnover up to ₹1.5 crore, ₹5,000 for ₹1.5–5 crore, and ₹10,000 above ₹5 crore. The daily rate is ₹50 (₹25 CGST + ₹25 SGST), or ₹20 for a nil return."
      }
    },
    {
      "@type": "Question",
      "name": "When is the IFF window for October 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "QRMP filers can upload B2B invoices for October 2026 through IFF from 1 to 13 November 2026, under CGST Rule 59(2). IFF is optional."
      }
    }
  ]
}
</script>
```


---

## Target: https://saemali.github.io/tools-site/advance-tax-for-freelancers.html
Source draft: `07-advance-tax-for-freelancers-dec-2026.md` · Converted from: Quora #7

**Who has to pay advance tax?**
Anyone whose estimated tax for the year, after TDS, is ₹10,000 or more (Section 404, Income-tax Act 2025, unchanged from the old Act). Resident individuals aged 60 or more with no business or professional income are exempt (Section 403(3)).

**What interest applies if I miss an advance tax instalment?**
You pay interest under Section 424 (formerly 234B): 1% a month if advance tax paid is under 90% of assessed tax. Section 425 (formerly 234C): 3% on the shortfall at 15 Jun/15 Sep/15 Dec and 1% at 15 Mar. The rates are unchanged under the Income-tax Act 2025.

`mainEntity` items to merge:
```json
[
  {
    "@type": "Question",
    "name": "Who has to pay advance tax?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Anyone whose estimated tax for the year, after TDS, is ₹10,000 or more (Section 404, Income-tax Act 2025, unchanged from the old Act). Resident individuals aged 60 or more with no business or professional income are exempt (Section 403(3))."
    }
  },
  {
    "@type": "Question",
    "name": "What interest applies if I miss an advance tax instalment?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "You pay interest under Section 424 (formerly 234B): 1% a month if advance tax paid is under 90% of assessed tax. Section 425 (formerly 234C): 3% on the shortfall at 15 Jun/15 Sep/15 Dec and 1% at 15 Mar. The rates are unchanged under the Income-tax Act 2025."
    }
  }
]
```

Standalone (reference only):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who has to pay advance tax?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Anyone whose estimated tax for the year, after TDS, is ₹10,000 or more (Section 404, Income-tax Act 2025, unchanged from the old Act). Resident individuals aged 60 or more with no business or professional income are exempt (Section 403(3))."
      }
    },
    {
      "@type": "Question",
      "name": "What interest applies if I miss an advance tax instalment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You pay interest under Section 424 (formerly 234B): 1% a month if advance tax paid is under 90% of assessed tax. Section 425 (formerly 234C): 3% on the shortfall at 15 Jun/15 Sep/15 Dec and 1% at 15 Mar. The rates are unchanged under the Income-tax Act 2025."
      }
    }
  ]
}
</script>
```


---

## Target: https://saemali.github.io/tools-site/itc-claim-last-date-2026.html
Source draft: `08-itc-claim-last-date-2026.md` · Converted from: Quora #9

**What is the 180-day rule for ITC?**
If the recipient does not pay the supplier the value plus tax within 180 days of the invoice date, that ITC must be added to output tax liability with interest. It can be re-claimed once payment is made (second proviso to Section 16(2) of the CGST Act; Rule 37).

**Can ITC reversed under Rule 37A be claimed again?**
Yes. Once the supplier files the pending GSTR-3B, the recipient can re-claim the ITC reversed under Rule 37A in a later return (Notification 26/2022-CT).

`mainEntity` items to merge:
```json
[
  {
    "@type": "Question",
    "name": "What is the 180-day rule for ITC?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "If the recipient does not pay the supplier the value plus tax within 180 days of the invoice date, that ITC must be added to output tax liability with interest. It can be re-claimed once payment is made (second proviso to Section 16(2) of the CGST Act; Rule 37)."
    }
  },
  {
    "@type": "Question",
    "name": "Can ITC reversed under Rule 37A be claimed again?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes. Once the supplier files the pending GSTR-3B, the recipient can re-claim the ITC reversed under Rule 37A in a later return (Notification 26/2022-CT)."
    }
  }
]
```

Standalone (reference only):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the 180-day rule for ITC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "If the recipient does not pay the supplier the value plus tax within 180 days of the invoice date, that ITC must be added to output tax liability with interest. It can be re-claimed once payment is made (second proviso to Section 16(2) of the CGST Act; Rule 37)."
      }
    },
    {
      "@type": "Question",
      "name": "Can ITC reversed under Rule 37A be claimed again?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Once the supplier files the pending GSTR-3B, the recipient can re-claim the ITC reversed under Rule 37A in a later return (Notification 26/2022-CT)."
      }
    }
  ]
}
</script>
```
