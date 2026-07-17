import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PLAIN_LABEL_CSS = `    .section-label{
      display:block;
      margin-bottom:20px;
      font-size:12px;line-height:14px;font-weight:600;letter-spacing:.08em;
      text-transform:uppercase;color:#1a9e8f;
    }`;

const RESTORE = [
  ['home1.html', 'id="hero-title"', 'eyebrow', 'Enterprise Cloud ERP'],
  ['home1.html', 'id="industries-title"', 'eyebrow', 'Industry Solutions'],
  ['home1.html', 'id="hub-title"', 'eyebrow', 'Unified Platform'],
  ['home1.html', 'id="modules-title"', 'eyebrow', 'Modules'],
  ['home1.html', 'id="task-title"', 'eyebrow', 'Flagship Feature'],
  ['home1.html', 'id="mobile-title"', 'eyebrow', 'Mobile App'],
  ['home1.html', 'id="testimonials-title"', 'eyebrow', 'Testimonials'],
  ['home1.html', 'id="faq-title"', 'eyebrow', 'FAQ'],
  ['index.html', 'hero-delay-1">Run manufacturing', 'eyebrow', 'ERP Software for Manufacturing'],
  ['index.html', 'image-gallery-heading">Manufacturing execution', 'section-label', 'Manufacturing in Time ERP'],
  ['index.html', 'Built for diverse manufacturing environments', 'section-label', 'Industries'],
  ['index.html', 'Plans built for every stage of manufacturing growth', 'section-label', 'Pricing'],
  ['about.html', 'From shop-floor challenges to a complete ERP platform', 'section-label', 'Our story'],
  ['about.html', 'Values that shape every product decision', 'section-label', 'What we stand for'],
  ['about.html', 'Milestones that built TimeERP', 'section-label', 'Our journey'],
  ['careers.html', 'Join the team shaping the future of operations software', 'section-label', 'Careers'],
  ['careers.html', 'id="car-why-heading"', 'section-label', 'Why join'],
  ['careers.html', 'id="car-security-heading"', 'section-label', 'Core security'],
  ['careers.html', 'id="car-offers-heading"', 'section-label', 'Benefits'],
  ['careers.html', 'id="car-testimonials-heading"', 'section-label', 'Team voices'],
  ['careers.html', 'id="car-vacancies-heading"', 'section-label', 'Open positions'],
  ['careers.html', 'id="car-faq-heading"', 'section-label', 'FAQ'],
  ['community.html', 'Connect with manufacturing professionals', 'section-label', 'Community'],
  ['community.html', 'id="comm-benefits-heading"', 'section-label', 'Why join'],
  ['community.html', 'id="comm-channels-heading"', 'section-label', 'Channels'],
  ['community.html', 'id="comm-discussions-heading"', 'section-label', 'Discussions'],
  ['community.html', 'id="comm-events-heading"', 'section-label', 'Events'],
  ['community.html', 'id="comm-ideas-heading"', 'section-label', 'Ideas board'],
  ['community.html', 'id="comm-faq-heading"', 'section-label', 'FAQ'],
  ['trust_centre.html', 'How TimeERP protects your business data', 'section-label', 'Trust Center'],
  ['trust_centre.html', 'id="tc-approach-heading"', 'section-label', 'Our approach'],
  ['trust_centre.html', 'id="tc-industry-heading"', 'section-label', 'By industry'],
  ['trust_centre.html', 'id="tc-faq-heading"', 'section-label', 'FAQ'],
  ['custom_quote.html', 'Request your custom quote', 'section-label', 'Enterprise'],
  ['custom_quote.html', 'Enterprise-grade security for your operations', 'section-label', 'Core security'],
  ['custom_quote.html', 'id="cq-faq-heading"', 'section-label', 'FAQ'],
  ['real_time_support.html', 'Real-time support status', 'section-label', 'Support status'],
  ['real_time_support.html', 'id="rts-performance-heading"', 'section-label', 'Performance'],
  ['real_time_support.html', 'id="rts-components-heading"', 'section-label', 'Channels'],
  ['real_time_support.html', 'id="rts-uptime-heading"', 'section-label', 'Uptime'],
  ['real_time_support.html', 'id="rts-events-heading"', 'section-label', 'History'],
];

const INDUSTRY_PAGES = {
  'construction.html': [
    ['sp-hero', 'Construction'],
    ['Everything your contracting group needs', 'Construction pillars'],
    ['From site Excel chaos', 'Why builders choose TimeERP'],
    ['How construction groups run on TimeERP', 'End-to-end workflow'],
    ['How builders use TimeERP', 'Construction use cases'],
    ['One platform to plan, build, and bill', 'Core solutions'],
    ['Built for every layer of construction', 'Project modules'],
    ['Security built in. Visit our Trust Center', 'Code security'],
    ['See every site at a glance', 'Project command dashboard'],
    ['Site supervisor apps for daily', 'Field &amp; site mobile'],
    ['Onboarding built for construction groups', 'Onboarding'],
    ['Bring your tech stack together', 'Integrations'],
    ['Everything you need to run projects at scale', 'Built for construction'],
    ['See how much time your team spends', 'Admin workload estimator'],
    ['Site Excel vs TimeERP for construction', 'Compare'],
    ['Common questions from construction firms', 'FAQ'],
  ],
  'CA.html': [
    ['sp-hero', 'Chartered Accountant'],
    ['Everything your CA firm needs', 'Practice pillars'],
    ['From filing season chaos', 'Why CA firms choose TimeERP'],
    ['How CA firms run on CA Cloud Desk', 'End-to-end workflow'],
    ['Why Chartered Accountants rely', 'Trusted by CA firms'],
    ['One platform to run, grow', 'Core solutions'],
    ['Built for every service line', 'Practice modules'],
    ['Security built in. Visit our Trust Center', 'Code security'],
    ['See your practice at a glance', 'Partner dashboard'],
    ['Client portal &amp; mobile apps', 'Mobile &amp; client access'],
    ['Onboarding built for CA practices', 'Onboarding'],
    ['Bring your tech stack together', 'Integrations'],
    ['Everything you need to run a modern Chartered Accountant', 'Built for CA practices'],
    ['Estimate time and cost savings', 'Practice ROI calculator'],
    ['Spreadsheets vs TimeERP for CA', 'Compare'],
    ['Common questions from CA firms', 'FAQ'],
  ],
  'real_Estate.html': [
    ['sp-hero', 'Real Estate'],
    ['Business operations and financial compliance', 'Real estate operations'],
    ['From scattered project files', 'Why real estate firms choose TimeERP'],
    ['How real estate firms run on TimeERP', 'End-to-end workflow'],
    ['Why developers and real estate groups', 'Trusted by real estate firms'],
    ['One platform for projects, stakeholders', 'Core solutions'],
    ['Built for every layer of real estate', 'Real estate modules'],
    ['Security built in. Visit our Trust Center', 'Code security'],
    ['See your portfolio at a glance', 'Operations dashboard'],
    ['Branded portal for buyers', 'Stakeholder portal'],
    ['Onboarding built for real estate developers', 'Onboarding'],
    ['Bring your tech stack together', 'Integrations'],
    ['Everything you need to run real estate operations at scale', 'Built for real estate'],
    ['Estimate time and cost savings for your real estate', 'Operations ROI calculator'],
    ['Excel trackers vs TimeERP for real estate', 'Compare'],
    ['Common questions from real estate developers', 'FAQ'],
  ],
  'property_dealer.html': [
    ['sp-hero', 'Property Dealer'],
    ['Everything your property dealer firm needs', 'Brokerage pillars'],
    ['From WhatsApp leads to one deal-closing', 'Why brokers choose TimeERP'],
    ['How property dealers run on TimeERP', 'End-to-end workflow'],
    ['Why property dealers rely on TimeERP', 'Trusted by brokerages'],
    ['One platform to list, sell, and earn', 'Core solutions'],
    ['Built for every layer of property dealing', 'Brokerage modules'],
    ['Security built in. Visit our Trust Center', 'Code security'],
    ['See your pipeline at a glance', 'Brokerage dashboard'],
    ['Field-ready CRM for property agents', 'Agent mobile CRM'],
    ['Onboarding built for property dealer firms', 'Onboarding'],
    ['Bring your tech stack together', 'Integrations'],
    ['Everything you need to close deals at scale', 'Built for property dealers'],
    ['Estimate time and cost savings for your property dealer', 'Brokerage ROI calculator'],
    ['Excel registers vs TimeERP for property dealers', 'Compare'],
    ['Common questions from property dealer firms', 'FAQ'],
  ],
};

function labelHtml(labelClass, text, indent = '          ') {
  if (labelClass === 'eyebrow') {
    const style = text === 'FAQ' ? ' style="text-align:center"' : '';
    return `${indent}<p class="eyebrow"${style}>${text}</p>\n`;
  }
  return `${indent}<span class="section-label">${text}</span>\n`;
}

function alreadyHasLabelBefore(html, marker, text) {
  const idx = html.indexOf(marker);
  if (idx === -1) return true;
  const window = html.slice(Math.max(0, idx - 400), idx);
  const plain = text.replace(/&amp;/g, '&');
  return window.includes(`>${text}</`) || window.includes(`>${plain}</`);
}

function insertBeforeMarker(html, marker, labelClass, text) {
  if (!html.includes(marker) || alreadyHasLabelBefore(html, marker, text)) return html;
  const idx = html.indexOf(marker);
  const lineStart = html.lastIndexOf('\n', idx) + 1;
  const indent = html.slice(lineStart, idx).match(/^\s*/)[0];
  return html.slice(0, lineStart) + labelHtml(labelClass, text, indent) + html.slice(lineStart);
}

function insertSpHeroLabel(html, text) {
  if (alreadyHasLabelBefore(html, '<section class="sp-hero">', text)) return html;
  return html.replace(
    /(<section class="sp-hero">[\s\S]*?<div class="anim-up">\s*)(<h1>)/,
    `$1<span class="section-label">${text}</span>\n          $2`
  );
}

function stripSectionLabelCss(content) {
  let out = content.replace(/\s*\.section-label::before\s*\{[^}]*\}/g, '');
  out = out.replace(/\.section-label\s*\{[^}]*\}/, PLAIN_LABEL_CSS.trim());
  const heroOverrides = [
    [/\.car-hero \.section-label\{[^}]*\}/g, '.car-hero .section-label{color:rgba(255,255,255,.95);}'],
    [/\.tc-hero \.section-label,\s*\n\s*\.trust-centre-page \.tc-hero \.section-lead \.section-label\{[^}]*\}/g, '.tc-hero .section-label,.trust-centre-page .tc-hero .section-lead .section-label{color:rgba(255,255,255,.95);}'],
    [/\.comm-hero \.section-label,\s*\n\s*\.community-page \.comm-hero \.section-lead \.section-label\{[^}]*\}/g, '.comm-hero .section-label,.community-page .comm-hero .section-lead .section-label{color:rgba(255,255,255,.95);}'],
    [/\.rts-hero \.section-label,\s*\n\s*\.real-time-support-page \.rts-hero \.section-lead \.section-label\{[^}]*\}/g, '.rts-hero .section-label,.real-time-support-page .rts-hero .section-lead .section-label{color:rgba(255,255,255,.95);}'],
    [/\.cq-hero \.section-label\{[^}]*\}/g, '.cq-hero .section-label{color:rgba(255,255,255,.95);}'],
    [/\.sp-hero \.section-label\{[^}]*\}/g, '.sp-hero .section-label{color:#1a9e8f;}'],
    [/\.about-hero \.section-label\s*\{[^}]*\}/g, '.about-hero .section-label{color:rgba(255,255,255,.95);}'],
    [/\.about-page \.section-lead \.section-label\s*\{[^}]*\}/g, '.about-page .section-lead .section-label{margin-bottom:20px;}'],
    [/\.trust-centre-page \.section-lead \.section-label\{[^}]*\}/g, '.trust-centre-page .section-lead .section-label{margin-bottom:20px;}'],
    [/\.community-page \.section-lead \.section-label\{[^}]*\}/g, '.community-page .section-lead .section-label{margin-bottom:20px;}'],
    [/\.real-time-support-page \.section-lead \.section-label\{[^}]*\}/g, '.real-time-support-page .section-lead .section-label{margin-bottom:20px;}'],
    [/\.pricing \.section-lead \.section-label\s*\{[^}]*\}/g, '.pricing .section-lead .section-label{margin-bottom:20px;}'],
  ];
  for (const [pattern, replacement] of heroOverrides) out = out.replace(pattern, replacement);
  out = out.replace('.about-hero .section-label { display: none }', '.about-hero .section-label{color:rgba(255,255,255,.95);}');
  out = out.replace(/\.about-page \.section-lead \.section-label::before\s*\{[^}]*\}/g, '');
  return out;
}

const byFile = new Map();
for (const [fname, marker, cls, text] of RESTORE) {
  if (!byFile.has(fname)) byFile.set(fname, []);
  byFile.get(fname).push([marker, cls, text]);
}
for (const [fname, pairs] of Object.entries(INDUSTRY_PAGES)) {
  if (!byFile.has(fname)) byFile.set(fname, []);
  for (const [marker, text] of pairs) {
    byFile.get(fname).push([marker === 'sp-hero' ? '__SP_HERO__' : marker, 'section-label', text]);
  }
}

for (const [fname, items] of [...byFile.entries()].sort()) {
  const filePath = path.join(ROOT, fname);
  if (!fs.existsSync(filePath)) continue;
  let html = fs.readFileSync(filePath, 'utf8');
  const original = html;
  for (const [marker, cls, text] of items) {
    html = marker === '__SP_HERO__' ? insertSpHeroLabel(html, text) : insertBeforeMarker(html, marker, cls, text);
  }
  if (html !== original) {
    fs.writeFileSync(filePath, html);
    console.log(`restored labels in ${fname}`);
  }
}

for (const file of fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'))) {
  const filePath = path.join(ROOT, file);
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('.section-label')) continue;
  const updated = stripSectionLabelCss(content);
  if (updated !== content) {
    fs.writeFileSync(filePath, updated);
    console.log(`updated section-label CSS in ${file}`);
  }
}

console.log('contact_sales.html cs-label preserved (plain text)');
