/* ------------------------------------------------------------
   build.mjs - inlines assets/*.webp into the template as data URIs.

   Produces two files from one source:
     index.html     full standalone document - open this to present
     artifact.html  body-only, for publishing as a Claude Artifact

   Run:  node build.mjs
   ------------------------------------------------------------ */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

const IMAGES = {
  IMG_PM: 'PM.webp',
  IMG_PLAYBOOK: 'Migration-playbook.webp',
  IMG_LINEAGE: 'Cross-sys-Lineage.webp',
};

let html = readFileSync(join(here, 'index.template.html'), 'utf8');

for (const [token, file] of Object.entries(IMAGES)) {
  const b64 = readFileSync(join(here, 'assets', file)).toString('base64');
  html = html.replaceAll(`{{${token}}}`, `data:image/webp;base64,${b64}`);
}

const left = html.match(/\{\{[A-Z_]+\}\}/g);
if (left) throw new Error(`unreplaced tokens: ${[...new Set(left)].join(', ')}`);

// artifact.html - the publisher supplies doctype/head/body itself
writeFileSync(join(here, 'artifact.html'), html);

// index.html - a complete document for opening straight off disk
const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="Pavan Mankineni - SAP BI/HANA Solution Architect. Eighteen years across SAP BW, BW/4HANA and Datasphere." />
${html}
</html>`
  // the template opens with <title>...<style>; close head right after the style block
  .replace('</style>\n', '</style>\n</head>\n<body>\n')
  .replace(/\n<\/html>$/, '\n</body>\n</html>');

writeFileSync(join(here, 'index.html'), doc);

const kb = (s) => `${Math.round(Buffer.byteLength(s) / 1024)} KB`;
console.log(`index.html    ${kb(doc)}`);
console.log(`artifact.html ${kb(html)}`);
