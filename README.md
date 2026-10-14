# FreelanceTools.in – static site
Deploy free on GitHub Pages: create a public repo `tools-site`, push these files, then go to Settings → Pages → Deploy from branch `main` / root.
Before deploying, replace `YOURUSER` (sitemap.xml, robots.txt, canonical tags) and `GUMROAD_PITCH_KIT_URL` / `GUMROAD_TEMPLATES_URL`:
`sed -i 's/YOURUSER/<github-user>/g; s#GUMROAD_PITCH_KIT_URL#<url>#g; s#GUMROAD_TEMPLATES_URL#<url>#g' *.html *.xml robots.txt`
Then submit sitemap.xml in Google Search Console.
