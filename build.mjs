/* ------------------------------------------------------------
   build.mjs - inlines fonts and images into the template as
   data URIs, so the page is one file that works with no network.

   Produces:
     index.html     full standalone document - open this to present
     artifact.html  body-only, for publishing as a Claude Artifact

   Run:  node build.mjs
   ------------------------------------------------------------ */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

/* woff2, embedded so the handwriting survives an offline laptop */
const FONTS = {
  FONT_CAVEAT: 'caveat-latin.woff2',
  FONT_INTER: 'inter-latin.woff2',
};

const IMAGES = {
  IMG_PM: 'PM.webp',
  IMG_PLAYBOOK: 'Migration-playbook.webp',
  IMG_LINEAGE: 'Cross-sys-Lineage.webp',
};

const TEMPLATE = process.argv[2] || 'index.template.html';
let html = readFileSync(join(here, TEMPLATE), 'utf8');

const inline = (token, path, mime) => {
  if (!html.includes(`{{${token}}}`)) return;
  if (!existsSync(path)) throw new Error(`missing asset for {{${token}}}: ${path}`);
  const b64 = readFileSync(path).toString('base64');
  html = html.replaceAll(`{{${token}}}`, `data:${mime};base64,${b64}`);
};

for (const [t, f] of Object.entries(FONTS)) inline(t, join(here, 'fonts', f), 'font/woff2');
for (const [t, f] of Object.entries(IMAGES)) inline(t, join(here, 'assets', f), 'image/webp');

const left = html.match(/\{\{[A-Z_]+\}\}/g);
if (left) throw new Error(`unreplaced tokens: ${[...new Set(left)].join(', ')}`);

/* artifact.html - the publisher supplies doctype/head/body itself */
writeFileSync(join(here, 'artifact.html'), html);

/* index.html - a complete document for opening straight off disk */
const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="Pavan Mankineni - eighteen years in SAP data and analytics, told as a journey." />
${html}
</html>`
  .replace('</style>\n', '</style>\n</head>\n<body>\n')
  .replace(/\n<\/html>$/, '\n</body>\n</html>');

writeFileSync(join(here, 'index.html'), doc);

const kb = (s) => `${Math.round(Buffer.byteLength(s) / 1024)} KB`;
console.log(`source        ${TEMPLATE}`);
console.log(`index.html    ${kb(doc)}`);
console.log(`artifact.html ${kb(html)}`);
