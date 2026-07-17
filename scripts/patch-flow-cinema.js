const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');
const fragmentPath = path.join(__dirname, '../partials/flow-cinema.html');

let html = fs.readFileSync(indexPath, 'utf8');
const fragment = fs.readFileSync(fragmentPath, 'utf8');

const startMarker = '      <motion class="flow-scroller anim-up"';
const startMarker2 = '      <div class="flow-scroller anim-up"';
const endMarker = '  </section>\n\n  <!-- SECTION 5: CORE CAPABILITIES -->';

let start = html.indexOf(startMarker2);
if (start === -1) start = html.indexOf(startMarker);

const end = html.indexOf(endMarker);
if (start === -1 || end === -1) {
  console.error('Markers not found', { start, end });
  process.exit(1);
}

html = html.slice(0, start) + fragment + '\n' + html.slice(end);
fs.writeFileSync(indexPath, html);
console.log('Patched flow cinema section');
