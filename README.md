# IRMARO Website

Official website for **IRMARO — Life & Career Coach & Mentor**.

The website is built with Astro and designed as a lightweight, responsive bilingual website with English as the default language and Polish as the second language.

## Website structure

The current website includes:

### English

- Home
- About
- Offer
- Book a session
- Perspectives
- Contact
- Privacy Policy
- Terms

### Polish

- Start
- O mnie
- Oferta
- Umów sesję
- Perspektywy
- Kontakt
- Polityka prywatności
- Regulamin

The root URL `/` redirects to the English version:

`/en/`

The Polish version is available under:

`/pl/`

A language switcher is available in the main navigation and allows users to move between corresponding English and Polish pages.

---

## Current implementation

The following elements are already implemented:

- bilingual EN / PL website structure
- English version as the default language
- responsive desktop, tablet and mobile layout
- responsive navigation
- PL / EN language switcher with flags
- active-page indication in the navigation
- IRMARO visual identity and colour palette
- responsive Home page
- Offer section
- Book a session page
- Perspectives section
- Contact page
- bilingual contact form
- individual coaching project enquiry flow
- responsive footer
- IRMARO logo in the footer
- LinkedIn link
- Privacy Policy and Terms links
- `robots.txt`
- `llms.txt`
- XML sitemap structure
- Netlify-compatible build configuration
- Netlify Forms-compatible contact form

### Booking flow

The Book a session / Umów sesję page currently contains three options:

1. Intro call
2. 1:1 session — online or onsite in Oulu
3. Longer coaching process — individual quotation

The longer-process option redirects directly to the Contact page and automatically selects:

**Individual coaching project quotation**

or:

**Indywidualna wycena projektu coachingowego**

in the contact form.

---

## Technology

The website uses:

- Astro
- HTML
- CSS
- TypeScript
- Git / GitHub
- Netlify for deployment and hosting

The project intentionally uses a lightweight architecture without a traditional CMS.

---

## Remaining implementation

The main remaining items are:

final page content
final photos and visual assets
Cal.com booking links
Netlify deployment
Netlify Forms email notifications
custom domain connection
final Privacy Policy
final Terms
final SEO metadata and structured data
Google Search Console
Bing Webmaster Tools

Additional functionality can be introduced later if required.