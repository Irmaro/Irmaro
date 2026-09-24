import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
const exists = (name) => fs.existsSync(path.join(root, name));
const fail = (message) => { throw new Error(message); };
const paths = {
  header: 'src/components/Header.astro',
  footer: 'src/components/Footer.astro',
  layout: 'src/layouts/BaseLayout.astro',
  rootPage: 'src/pages/index.astro',
  pl: 'src/pages/pl',
  archivedPl: 'src/pages/_pl',
  englishHome: 'src/pages/en/index.astro',
};

try {
  if (!exists('package.json')) fail('Uruchom skrypt w katalogu głównym projektu Astro, obok package.json.');
  for (const key of ['header','footer','layout','pl','englishHome']) {
    if (!exists(paths[key])) fail(`Brak ${paths[key]}. Nie wprowadzono zmian.`);
  }
  if (exists(paths.archivedPl)) fail('src/pages/_pl już istnieje. Nie wprowadzono zmian.');
  if (exists('src/pages/[lang]')) fail('Wykryto trasy dynamiczne [lang]. Sprawdź je przed wyłączeniem PL.');

  const header = read(paths.header);
  const footer = read(paths.footer);
  const layout = read(paths.layout);
  if (!header.includes('dropdown-indicator" aria-hidden="true"><i></i><b></b>')) {
    fail('Header nie zawiera ostatniej poprawki „ziarenko”. Najpierw wgraj poprzednie patche.');
  }
  if (!header.includes("{isEn ? 'Pricing' : 'Cennik'}") || !footer.includes("{ label: 'Pricing'")) {
    fail('Menu nie odpowiada uzgodnionej wersji z Cennikiem. Nie wprowadzono zmian.');
  }
  const headerSwitch = /<div class="language-switch"[^>]*>[\s\S]*?<\/div>/;
  if (!headerSwitch.test(header)) fail('Nie znaleziono przełącznika języka w Header.');
  const footerSwitch = /<span class="footer-language">\s*<a href="\/pl\/">PL<\/a>\s*<span>\/<\/span>\s*<a href="\/en\/">EN<\/a>\s*<\/span>/;
  if (!footerSwitch.test(footer)) fail('Nie znaleziono przełącznika języka w Footer.');

  const paired = /const pairedUrl = pairedPath[\s\S]*?: null;/;
  if (!paired.test(layout)) fail('Nie znam tego układu metadanych językowych w BaseLayout. Nie wprowadzono zmian.');
  const canonical = 'const canonicalUrl = new URL(currentPath, siteUrl).toString();';
  if (!layout.includes(canonical)) fail('Nie znam reguły canonical w BaseLayout. Nie wprowadzono zmian.');
  if (!layout.includes('hreflang="pl"')) fail('Nie znaleziono polskich metadanych hreflang w BaseLayout. Nie wprowadzono zmian.');

  // Do not allow an existing rewrite to resurrect /pl/ as another route.
  const redirects = exists('public/_redirects') ? read('public/_redirects') : '';
  if (redirects.split(/\r?\n/).some(line => /^\s*(\/pl(?:\/|\s)|\/\*\s+)/.test(line))) {
    fail('W public/_redirects jest reguła dla /pl lub /*. Sprawdź ją przed wyłączeniem polskich tras.');
  }
  const netlify = exists('netlify.toml') ? read('netlify.toml') : '';
  if (/from\s*=\s*["']\/(?:pl(?:\/|\*)|\*)/.test(netlify)) {
    fail('W netlify.toml jest reguła dla /pl lub /*. Sprawdź ją przed wyłączeniem polskich tras.');
  }
  const astroConfig = ['astro.config.mjs','astro.config.ts','astro.config.js'].find(exists);
  if (astroConfig && /\bi18n\s*:/.test(read(astroConfig))) {
    fail('Projekt używa wbudowanego i18n Astro. Wymaga osobnej kontroli konfiguracji.');
  }

  const newHeader = header.replace(headerSwitch, match => `{false && (\n${match}\n      )}`);
  const newFooter = footer.replace(footerSwitch, match => `{false && (\n${match}\n        )}`);
  let newLayout = layout.replace(paired, 'const pairedUrl = null;\n');
  newLayout = newLayout.replace(canonical, "const canonicalUrl = new URL(currentPath === '/' ? '/en/' : currentPath, siteUrl).toString();");
  newLayout = newLayout.replace("inLanguage: ['en', 'pl']", "inLanguage: 'en'");
  if (newLayout === layout) fail('Nie wykryto zmian w BaseLayout.');
  // Existing root page, if any, is saved verbatim for later restoration.
  const newRoot = `---\nimport EnglishHome from './en/index.astro';\n---\n<EnglishHome />\n`;
  const edits = new Map([
    [paths.header, newHeader],
    [paths.footer, newFooter],
    [paths.layout, newLayout],
    [paths.rootPage, newRoot],
  ]);

  if (exists('public/sitemap.xml')) {
    let sitemap = read('public/sitemap.xml');
    sitemap = sitemap.replace(/<url>[^]*?<\/url>/g, block => /<loc>[^<]*\/pl(?:\/|<)/.test(block) ? '' : block);
    sitemap = sitemap.replace(/<xhtml:link\b[^>]*hreflang=["']pl["'][^>]*\/?>\s*/g, '');
    if (/\/pl(?:\/|<)/.test(sitemap)) fail('W public/sitemap.xml pozostały polskie adresy. Nie wprowadzono zmian.');
    edits.set('public/sitemap.xml', sitemap);
  }
  if (exists('public/llms.txt')) {
    const llms = read('public/llms.txt').split(/\r?\n/).filter(line => !/\/pl(?:\/|\b)/.test(line)).join('\n');
    edits.set('public/llms.txt', llms);
  }

  const backup = path.join(root, '.irmaro-english-only-backup');
  if (fs.existsSync(backup)) fail('Kopia .irmaro-english-only-backup już istnieje. Najpierw ją sprawdź.');
  const changed = [...edits.keys()].filter(name => !exists(name) || read(name) !== edits.get(name));
  // All checks have passed. Only now create the backup and mutate the project.
  fs.mkdirSync(backup, { recursive: true });
  for (const name of changed) {
    if (!exists(name)) continue;
    const target = path.join(backup, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(root, name), target);
  }
  try {
    for (const name of changed) {
      const target = path.join(root, name);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, edits.get(name));
    }
    fs.renameSync(path.join(root, paths.pl), path.join(root, paths.archivedPl));
  } catch (error) {
    for (const name of changed) {
      const original = path.join(backup, name);
      if (fs.existsSync(original)) fs.copyFileSync(original, path.join(root, name));
      else fs.rmSync(path.join(root, name), { force: true });
    }
    if (exists(paths.archivedPl) && !exists(paths.pl)) fs.renameSync(path.join(root, paths.archivedPl), path.join(root, paths.pl));
    throw error;
  }
  console.log('Gotowe. PL zachowane w src/pages/_pl; strona angielska działa pod / i /en/.');
  console.log('Przed publikacją uruchom npm run build oraz sprawdź brak dist/pl i linków /pl/ w HTML.');
  console.log('Kopia zmienionych plików: .irmaro-english-only-backup/');
} catch (error) {
  console.error(`Patch przerwany: ${error.message}`);
  process.exitCode = 1;
}
