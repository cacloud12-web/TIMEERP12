#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SOURCE = path.join(ROOT, '..', 'Timeerp 2', 'index.html');
const TARGET = path.join(ROOT, 'index.html');

function extractBetween(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker);
  if (start === -1) throw new Error('Missing start: ' + startMarker);
  const end = text.indexOf(endMarker, start + startMarker.length);
  if (end === -1) throw new Error('Missing end: ' + endMarker);
  return text.slice(start, end);
}

const src = fs.readFileSync(SOURCE, 'utf8');
let out = fs.readFileSync(TARGET, 'utf8');

const workflowCss = extractBetween(
  src,
  '    /* ========== MANUFACTURING WORKFLOW — Time ERP image-gallery (#25b7a7) ========== */',
  '  /* ========== STICKY CARD FOLD — Time ERP Core ERP capabilities (#25b7a7) ========== */'
);

const stickyCss = extractBetween(
  src,
  '  /* ========== STICKY CARD FOLD — Time ERP Core ERP capabilities (#25b7a7) ========== */',
  '  /* ========== BENEFITS (Time ERP alignment-curve layout, Time ERP theme) ========== */'
);

const workflowHtml = extractBetween(
  src,
  '  <!-- SECTION 3: OVERVIEW — Time ERP image-gallery -->',
  '  <!-- SECTION 5: CORE CAPABILITIES — Time ERP sticky card fold -->'
);

const stickyHtml = extractBetween(
  src,
  '  <!-- SECTION 5: CORE CAPABILITIES — Time ERP sticky card fold -->',
  '  <!-- SECTION 6: BENEFITS -->'
);

// CSS
out = out.replace(
  /    \/\* ========== MANUFACTURING WORKFLOW — Time ERP image-gallery \(#25b7a7\) ========== \*\/[\s\S]*?  \/\* ========== STICKY CARD FOLD — Time ERP Core ERP capabilities \(#25b7a7\) ========== \*\//,
  workflowCss.trimEnd()
);

out = out.replace(
  /  \/\* ========== STICKY CARD FOLD — Time ERP Core ERP capabilities \(#25b7a7\) ========== \*\/[\s\S]*?  \/\* ========== BENEFITS \(Time ERP alignment-curve layout, Time ERP theme\) ========== \*\//,
  stickyCss.trimEnd()
);

// HTML — workflow section
out = out.replace(
  /  <!-- SECTION 3: OVERVIEW — Time ERP image-gallery -->[\s\S]*?(?=\n\n  <section class="sticky-card-section"|\n  <!-- SECTION 5: CORE CAPABILITIES)/,
  workflowHtml
);

// HTML — sticky section (with or without SECTION 5 comment)
if (out.includes('  <!-- SECTION 5: CORE CAPABILITIES — Time ERP sticky card fold -->')) {
  out = out.replace(
    /  <!-- SECTION 5: CORE CAPABILITIES — Time ERP sticky card fold -->[\s\S]*?  <!-- SECTION 6: BENEFITS -->/,
    stickyHtml
  );
} else {
  out = out.replace(
    /\n\n  <section class="sticky-card-section" id="capabilities">[\s\S]*?  <!-- SECTION 6: BENEFITS -->/,
    '\n\n' + stickyHtml
  );
}

fs.writeFileSync(TARGET, out, 'utf8');

fs.copyFileSync(path.join(ROOT, '..', 'Timeerp 2', 'js', 'flow-cinema.js'), path.join(ROOT, 'js', 'flow-cinema.js'));
fs.copyFileSync(path.join(ROOT, '..', 'Timeerp 2', 'js', 'sticky-card-section.js'), path.join(ROOT, 'js', 'sticky-card-section.js'));

console.log('Re-imported workflow + sticky sections from Timeerp 2.');
