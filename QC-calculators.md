# QC: regime.html + gst-late-fee.html (commit a402a0b), FAQ additions (d33d732), invite galleries (8151592), Earn-Quality, 15 Oct 2026 IST
Review was read-only and nothing was edited. Levels: **F** = I read it on an official page today (full page or search extract). **S** = official text seen only through a secondary copy. **N** = statute as known, not opened today.

## A. regime.html: FAIL
**BLOCKER: the result panel is always empty.** The "Other income" input and the result div both use `id="o"`. In app.js, `$('o')` returns the input (it comes first in the page), so the result HTML is written into the input and never shows. I confirmed this with headless Chrome `--dump-dom`: `<div class="card result" ... id="o"></div>` is empty. Fix: rename the input to `id="oi"` and use `N('oi')` in regime().
The maths is correct (checked in node against hand working):
- Defaults (₹15L salary, basic ₹6L, HRA ₹2.4L, rent ₹3L, metro, 80C ₹1.5L, 80D ₹25k): HRA = min(2.4L, 3L−0.6L, 3L) = ₹2,40,000. Old taxable = ₹10,35,000. Old tax = 12,500 + 1,00,000 + 10,500 = 1,23,000, ×1.04 = **₹1,27,920**. New taxable = ₹14,25,000. New tax = 20,000 + 40,000 + 33,750 = 93,750, ×1.04 = **₹97,500**. New saves ₹30,420. The tool gives the same figures.
- ₹12.75L salary: new taxable ₹12,00,000, so tax is ₹0 after the rebate. ✓
- ₹12.85L salary: new taxable ₹12.10L. Slab tax is ₹61,500, and marginal relief caps it at ₹10,000, ×1.04 = ₹10,400. ✓
Scores: Visual 4 · Mobile 4 (code only) · Trust 4 · Empathy 4 · **Usability/a11y 2** (blank result, weak radio focus ring) · **Accuracy 2** (no output; rates correct) · Speed 5 · SEO 4 · **Competitor 3** (no slab-wise breakdown, no break-even deduction figure).
Other fixes:
1. Radio focus ring: `.opt input:focus-visible+span` uses a 35% purple mix, about 1.9:1 on white, below the 3:1 needed for non-text. Use `outline:3px solid var(--p);outline-offset:2px` (#6d28d9 on #fff is about 7:1).
2. 80D input is uncapped. Cap it at ₹1,00,000 (₹25k + ₹25k, or ₹50k + ₹50k for seniors) or add a note.
3. Optional: show slab-wise rows and "deductions needed to break even".
Official checks:
- (1) Deduction limits: 80C ₹1.5L, 80CCD(1B) ₹50k, 80D, 24(b) ₹2L, standard deduction ₹50k old / ₹75k new. These are on incometaxindia.gov.in pages that still describe the 1961 Act as amended by FA 2026 (F: https://www.incometaxindia.gov.in/w/various-deductions-under-the-income-tax-act , https://www.incometaxindia.gov.in/w/threshold-limits-under-income-tax-act , https://www.incometaxindia.gov.in/w/deductions). In the 2025 Act, 80C becomes **s.123 + Schedule XV** (F: https://www.incometaxindia.gov.in/w/schedule-xv-3). The new regime is **s.202** (F: https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/objective-and-scope-new-act). New-Act section numbers for 80D, 80CCD(1B), 24(b) and the standard deduction were **not confirmed**, so keep the page's line "old section numbers used".
- (2) Rebate: up to ₹60k at ≤₹12L (new regime) and ₹12.5k at ≤₹5L (old regime), confirmed (F, same deductions page, "Applicable from AY 2026-27"). That it sits in s.156 of the 2025 Act was **not opened** (N). Slabs: no rate change for TY 2026-27 per the FB 2026 memo the page cites (N, not re-opened).
- (3) HRA at 50%: the 8 cities are Mumbai, Kolkata, Delhi, Chennai, Hyderabad, Pune, Ahmedabad and Bengaluru, under **Rule 279** of the Income-tax Rules 2026 (S: rule text via incometax.futani.in, matches the EY alert; the official Rules PDF https://www.incometaxindia.gov.in/documents/d/guest/en-notified-it-rules-2026-20-03-2026-pdf was not read). The page should cite "Rule 279". The page's city list is correct.

## B. gst-late-fee.html: FAIL on a11y only (accuracy pass)
Hand checks: 10 days, non-nil, ≤₹1.5cr: 10 × ₹50 = ₹500 (under the ₹2,000 cap). Interest = 20,000 × 18% × 10/365 = ₹98.6, so the total is ₹599. ✓ Nil, 100 days: ₹2,000 raw, capped at ₹500. ✓ The result renders in Chrome.
Rates (N, from Notifications 19/2021-CT for GSTR-3B and 20/2021-CT for GSTR-1): ₹25 + ₹25 per day, nil ₹10 + ₹10. Caps: nil ₹500; ≤₹1.5cr ₹2,000; ₹1.5–5cr ₹5,000; >₹5cr ₹10,000 (all CGST + SGST combined). Correct. s.50(1) interest is 18% on the net cash portion (proviso, Notification 13/2017-CT). Correct.
Scores: Visual 4 · Mobile 4 · Trust 4 · Empathy 4 · **A11y 3** (same radio focus ring) · Accuracy 4 · Speed 5 · SEO 4 · Competitor 4.
Fixes: (1) the same focus-ring fix. (2) Add a note: "Wrongly availed and utilised ITC attracts 24% (s.50(3))". (3) Optional: GSTR-9 late fee (Notification 07/2023-CT, N) is ₹50/day (₹25 + ₹25), capped at 0.04% of state turnover for ≤₹5cr; ₹100/day, capped at 0.04%, for ₹5–20cr; ₹200/day, capped at 0.5%, for >₹20cr. (4) The source links point to gstcouncil.gov.in and tutorial.gst.gov.in, which are official. OK.

## D. FAQ additions (d33d732 / faq-additions.md)
1. GSTR-3B 22nd/24th: the state lists are correct, but the cite is wrong. Replace "(CGST Rule 61(1)(ii) table)" with "(proviso to CGST Rule 61(5), as amended by Notification 76/2020-Central Tax)" (N). It appears twice: in the visible FAQ and in the JSON-LD.
2. PMT-06: correct (N, Rule 61(5)/QRMP).
3. GSTR-1 caps: correct (N, 20/2021-CT).
4. IFF 1–13 Nov 2026: correct, but the first proviso to Rule 59(2) is the cite (N). OK.
5. Advance tax: the ₹10,000 limit in s.404 and the senior-citizen exemption exist. The exemption is **s.403(3)** of the 2025 Act (S: Act text via easevalue.com; the official Act PDF https://www.incometaxindia.gov.in/documents/d/guest/income_tax_act_2025_as_amended_by_fa_act_2026-pdf exists but I did not read it). The substance is on an official page (F: https://www.incometaxindia.gov.in/w/5.-important-terms-or-provisions-which-a-taxpayer-needs-to-know-to-comply-with-the-income-tax-law). Suggested text: "...Resident individuals aged 60 or more with no business or professional income are exempt (Section 403(3))."
6. Advance tax interest: "Section 424 (formerly 234B) / 425 (formerly 234C)" was **not verified**. Either drop the new section numbers ("interest under the old 234B/234C equivalents, 1% a month") or confirm them first.
7. 180-day ITC rule: correct (N, s.16(2) second proviso, Rule 37).
8. Rule 37A re-claim: correct (N, Notification 26/2022-CT).

## E. Invite galleries (8151592)
I rendered all 18 SVGs in headless Chrome (contact sheet /tmp/sheet.png). **Cultural:** the Muslim set is all geometric or architectural (star tile, arches, crescent and lanterns, vine, rosette, jaali), with no figures or people. ✓ The Hindu set (toran, rangoli, diyas, kalash, paisley, lotus) and the Christian set (rose window, rings, lilies, bells, candles, cake) are appropriate.
**Alt text:** present and descriptive. Small mismatches: Muslim g5 says "twelve-fold" but the render looks about 16-point (change to "a geometric rosette"). Hindu g1 shows no visible mango leaves (change to "a marigold garland toran"). Hindu g5's paisleys read as eye shapes (redraw or rename to "paisley motifs"). Christian g1 looks more like a flower than a rose window (change to "a floral stained-glass motif").
**Lightbox:** a native `<dialog>.showModal()` handles the focus trap, Esc to close and an implicit aria-modal. Focus goes to Close on open and returns to the trigger on close. Arrow keys work. Backdrop click closes it. Issues: (1) the no-`showModal` fallback just sets `open`, so there is no trap, Esc or modal. That's acceptable for old browsers, but add `aria-modal="true"` and an Esc handler in the fallback. (2) `#lb .btn.o` is white on a #000c backdrop, which is fine. (3) The caption `aria-live` re-announces on every arrow press. OK.
**Mobile 375px (code + headless):** the grid `minmax(200px,1fr)` gives one column at 375px, and controls are at least 46px. No overflow found in the code. **A real browser and phone test is still needed.**
Verdict: PASS with minor alt-text fixes, all optional to ship.
