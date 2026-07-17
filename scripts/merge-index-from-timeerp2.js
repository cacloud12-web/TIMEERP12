#!/usr/bin/env node
/**
 * Import index.html from Timeerp 2, preserving current-only functionality.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SOURCE = path.join(ROOT, '..', 'Timeerp 2', 'index.html');
const CURRENT = path.join(ROOT, 'index.html');
const JS_SRC = path.join(ROOT, '..', 'Timeerp 2', 'js');
const JS_DST = path.join(ROOT, 'js');

function extractBetween(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker);
  if (start === -1) throw new Error('Missing marker: ' + startMarker);
  const end = text.indexOf(endMarker, start + startMarker.length);
  if (end === -1) throw new Error('Missing marker: ' + endMarker);
  return text.slice(start, end);
}

function replaceBetween(text, startMarker, endMarker, replacement) {
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker, start + startMarker.length);
  if (start === -1 || end === -1) throw new Error('Markers not found for replacement');
  return text.slice(0, start) + replacement + text.slice(end);
}

function sliceLines(lines, start, end) {
  return lines.slice(start - 1, end).join('\n');
}

const curText = fs.readFileSync(CURRENT, 'utf8');
const curLines = curText.split('\n');
let out = fs.readFileSync(SOURCE, 'utf8');

// --- CSS blocks from current (enhanced workflow + sticky header) ---
const workflowCss = sliceLines(curLines, 1853, 2188);
const stickyCss = sliceLines(curLines, 2190, 2447);

out = replaceBetween(
  out,
  '    /* ========== MANUFACTURING WORKFLOW — Time ERP image-gallery (#25b7a7) ========== */',
  '  /* ========== STICKY CARD FOLD — Time ERP Core ERP capabilities (#25b7a7) ========== */',
  workflowCss + '\n'
);

out = replaceBetween(
  out,
  '  /* ========== STICKY CARD FOLD — Time ERP Core ERP capabilities (#25b7a7) ========== */',
  '  /* ========== BENEFITS (Time ERP alignment-curve layout, Time ERP theme) ========== */',
  stickyCss + '\n'
);

// --- Typography scale from current ---
out = out.replace(
  /h1 \{\s*font-size: clamp\(1\.75rem, 2\.5vw, 2\.375rem\);\s*font-weight: 400;/,
  'h1 {\n      font-size: clamp(1.75rem, 2.8vw, 2.25rem);\n      font-weight: 600;'
);
out = out.replace(
  /h2 \{\s*font-size: clamp\(1\.75rem, 2\.5vw, 2\.375rem\);\s*font-weight: 400;/,
  'h2 {\n      font-size: clamp(1.75rem, 2.8vw, 2.25rem);\n      font-weight: 600;'
);
out = out.replace(
  /\.section-lead h1,\s*\n\s*\.section-lead h2 \{\s*\n\s*font-size: clamp\(1\.75rem, 2\.5vw, 2\.375rem\);\s*\n\s*font-weight: 400;/,
  '.section-lead h1,\n    .section-lead h2 {\n      font-size: clamp(1.75rem, 2.8vw, 2.25rem);\n      font-weight: 600;'
);
out = out.replace(
  /h3 \{\s*font-size: 22px;\s*font-weight: 400;/,
  'h3 {\n      font-size: 18px;\n      font-weight: 600;'
);

// --- HTML: workflow section ---
const workflowHtml = extractBetween(curText, '  <!-- SECTION 3: OVERVIEW', '  <!-- SECTION 5: CORE CAPABILITIES');
out = replaceBetween(out, '  <!-- SECTION 3: OVERVIEW', '  <!-- SECTION 5: CORE CAPABILITIES', workflowHtml);

// --- HTML: sticky-card header ---
const stickyHeader = `      <div class="sticky-card-header">
        <div class="section-eyebrow-row">
          <span class="section-label">Core ERP capabilities</span>
          <span class="section-eyebrow-line" aria-hidden="true"></span>
        </div>
        <h2 class="sticky-card-heading">Strengthen manufacturing operations end-to-end</h2>
      </div>
`;

out = out.replace(
  /      <div class="sticky-card-header">[\s\S]*?      <\/div>\n\n      <div class="sticky-card-wrapper">/,
  stickyHeader + '\n      <div class="sticky-card-wrapper">'
);

// --- HTML: industries eyebrow ---
out = out.replace(
  /      <div class="section-lead anim-up">\s*<div class="section-heading-tag light">\s*<p>Industries<\/p>\s*<\/div>/,
  `      <div class="section-lead anim-up">
        <div class="section-eyebrow-row">
          <span class="section-label">Industries</span>
          <span class="section-eyebrow-line" aria-hidden="true"></span>
        </div>`
);

// --- Nav: multi-plant / enterprise scale link ---
out = out.replace(
  /<a href="#solutions" class="solutions-mega__scale-item" role="menuitem">\s*<span class="solutions-mega__scale-icon"[^>]*>[\s\S]*?public[\s\S]*?<\/span>\s*<span class="solutions-mega__scale-text">Multi-plant operations \(50\+ staff\)<\/span>\s*<\/a>/,
  '<a href="custom_quote.html" class="solutions-mega__scale-item" role="menuitem">\n                      <span class="solutions-mega__scale-icon" aria-hidden="true"><span class="material-symbols-outlined">public</span></span>\n                      <span class="solutions-mega__scale-text">Enterprise / multi-plant</span>\n                    </a>'
);
out = out.replace(
  /<a href="#solutions" class="mobile-nav__sublink">Multi-plant operations<\/a>/,
  '<a href="custom_quote.html" class="mobile-nav__sublink">Enterprise / multi-plant</a>'
);

// --- Footer: industry vertical pages ---
out = out.replace(
  /<div class="footer-col__panel"><ul>\s*<li><a href="#industries">Manufacturing<\/a><\/li>\s*<li><a href="#industries">Component assembly<\/a><\/li>\s*<li><a href="#industries">Industrial machinery<\/a><\/li>\s*<li><a href="#industries">Consumer durables<\/a><\/li>\s*<li><a href="#industries">Distribution<\/a><\/li>\s*<\/ul><\/div>/,
  `<div class="footer-col__panel"><ul>
              <li><a href="CA.html">Chartered Accountant</a></li>
              <li><a href="construction.html">Construction</a></li>
              <li><a href="real_Estate.html">Real Estate</a></li>
              <li><a href="property_dealer.html">Property Dealer</a></li>
            </ul></div>`
);

// --- footer-bar.css ---
if (!out.includes('css/footer-bar.css')) {
  out = out.replace('  </style>\n</head>', '  </style>\n  <link rel="stylesheet" href="css/footer-bar.css">\n</head>');
}

// --- Script tags: site-chrome + scroll-animations, keep enhanced flow-cinema ---
out = out.replace(
  '  <script src="js/navbar-mega-menu.js"></script>',
  `  <script src="js/site-chrome.js"></script>
  <script src="js/scroll-animations.js"></script>
  <script src="js/navbar-mega-menu.js"></script>`
);

// --- Remove duplicate inline scroll/nav (keep modal + forms) ---
out = out.replace(
  /\s*\/\* IntersectionObserver — animate once \*\/[\s\S]*?document\.addEventListener\('keydown', function \(e\) \{\s*if \(e\.key === 'Escape' && hamburger\.classList\.contains\('active'\)\) \{\s*setMobileNavOpen\(false\);\s*\}\s*\}\);\s*/,
  '\n\n      '
);

fs.writeFileSync(CURRENT, out, 'utf8');

// Copy identical JS from Timeerp 2 (flow-cinema stays current — scroll highlight)
const copyJs = [
  'navbar-mega-menu.js',
  'pricing-toggle.js',
  'sticky-card-section.js',
  'benefits-cycle.js',
  'footer-accordion.js'
];

copyJs.forEach(function (file) {
  fs.copyFileSync(path.join(JS_SRC, file), path.join(JS_DST, file));
});

console.log('Merged index.html from Timeerp 2 with preserved functionality.');
console.log('Copied JS:', copyJs.join(', '));
console.log('Kept current: site-chrome.js, scroll-animations.js, flow-cinema.js');
