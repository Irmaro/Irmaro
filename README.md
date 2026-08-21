# Friend Website Starter — EN default / PL switch

Minimalny starter Astro do wdrożenia podczas spotkania.

## Domyślny język

- `/` przekierowuje do `/en/`
- wersja angielska: `/en/...`
- wersja polska: `/pl/...`
- w nagłówku jest przełącznik `PL` / `EN`
- przełącznik prowadzi do odpowiednika tej samej podstrony

## Start lokalny

```bash
npm install
npm run dev
```

Astro zwykle pokaże:

`http://localhost:4321`

## Build

```bash
npm run build
```

Katalog publikowany przez Netlify:

`dist`

## Netlify

- Production branch: `main`
- Base directory: puste
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables: brak na tym etapie

## Najszybsze zmiany podczas spotkania

Następnie ustal:
- menu / podstrony,
- kolory w `src/styles/global.css`,
- główny nagłówek,
- czy potrzebny jest blog,
- kalendarz,
- formularz,
- które funkcje będą płatne,
- social media.

## Po zakupie domeny

Zastąp `https://example.com` właściwą domeną w:
- `astro.config.mjs`
- `public/robots.txt`
- `public/sitemap.xml`

## Do zrobienia po szkielecie

- właściwe treści i zdjęcia,
- finalny formularz,
- Cal.com,
- Stripe, jeśli potrzebny,
- finalne Privacy Policy i Terms,
- SEO/meta/schema,
- Google Search Console,
- Bing Webmaster Tools.