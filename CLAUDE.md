# Akash portfolio: project brief for Claude Code

Live: https://akash-sg.github.io (GitHub Pages, branch `main`, folder `/`). Push to `main` = deploy (about 1 minute).

## Who and what
Akash S G, Bangalore (hometown Shimoga). Graduate highway engineer by day; side business in brand, web, video, photography and vibe-coding. The site wins clients. Brand name is just "Akash". English only. No face photos. Work only. Main call to action is the enquiry form; WhatsApp is a quiet link in the footer.

## Chosen look: Direction F "Big Sky"
Sky-blue (#4FA9FF) hero, giant white "Akash", three tilted floating logo cards (logos only, random each load, small mono captions), navy #0B1B33 text, Bricolage Grotesque for display, Instrument Sans for body, DM Mono for small labels. Scroll-driven, moving background, 3D/modern feel. Must stand out, not look templated.

## Stack
Plain HTML/CSS/JS, no framework, no build step. Works by double-clicking index.html.
- `index.html`: page, base CSS, hero, form and form spam checks, main script
- `data.js`: ALL content (site info, categories, projects, packages, steps, testimonials). Edit this to update the site.
- `work.js`: hero random logos, Chapter I category cards, category list overlay, project case overlay, How it works timeline
- `extra.js`: heading word reveal, services marquee, price count-up, hover tilt
- `images/`: project images. Website projects have `x.jpg` (front view) and `x-full.jpg` (full page, scrolls inside a browser frame)

## Rules to keep
- Content changes go in `data.js`, not in the HTML.
- `prefers-reduced-motion` must switch motion off.
- Check desktop (1440x900, 1280x720, 1920x1080) and phone (390x844); no horizontal overflow; desktop hero images must not overlap the tagline.
- Packages are "starting from" prices (Brand Starter 5,000; Website 12,000 to confirm; Full Identity 25,000); real prices vary.
- Form posts to FormSubmit (`formEmail` in data.js). Needs one-time email activation by Akash. Spam checks: honeypot, 4 second minimum, contact validation, no links in name/business, one per minute. After sending it offers a prefilled WhatsApp message.
- Families in invitation/newborn images need consent before public launch (repo is public).

## Open items
- Activate FormSubmit (send a test enquiry, click the email link), then swap the email for the random code FormSubmit gives.
- Testimonials are placeholders and hidden (`placeholder: true`); replace with real ones.
- Picklo card screenshot is outdated; the site is now live at pickloshimoga.com.
- Akash is not happy with the desktop hero and wants a better one; he has the scroll-craft skill (nateherk-design) installed and wants it used to improve the scroll effects.
- LinkedIn link missing. WhatsApp: 918762290104.
- ARV and Clean Eats descriptions are generic; ask Akash for a line each.
