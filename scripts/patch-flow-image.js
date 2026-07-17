const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');
const fragmentPath = path.join(__dirname, '../partials/flow-cinema-image.html');

let html = fs.readFileSync(indexPath, 'utf8');
const fragment = fs.readFileSync(fragmentPath, 'utf8');

const start = html.indexOf('<motion class="flow-cinema" id="flowCinema"');
const start2 = html.indexOf('<div class="flow-cinema" id="flowCinema"');
const startIdx = start !== -1 ? start : start2;
const end = html.indexOf('  </section>\n\n  <!-- SECTION 5: CORE CAPABILITIES -->');

if (startIdx === -1 || end === -1) {
  console.error('Markers not found', { startIdx, end });
  process.exit(1);
}

html = html.slice(0, startIdx) + fragment.trim() + '\n\n' + html.slice(end);
fs.writeFileSync(indexPath, html);
console.log('Replaced flow cinema with image scroller');
