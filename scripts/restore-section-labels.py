#!/usr/bin/env python3
"""Restore section label text (plain, no box) removed from HTML pages."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PLAIN_LABEL_CSS = """    .section-label{
      display:block;
      margin-bottom:20px;
      font-size:12px;line-height:14px;font-weight:600;letter-spacing:.08em;
      text-transform:uppercase;color:#1a9e8f;
    }"""

# (file, marker in heading tag, label_class, text)
# marker: id="..." or unique substring inside h1/h2
RESTORE: list[tuple[str, str, str, str]] = [
    # home1.html
    ('home1.html', 'id="hero-title"', 'eyebrow', 'Enterprise Cloud ERP'),
    ('home1.html', 'id="industries-title"', 'eyebrow', 'Industry Solutions'),
    ('home1.html', 'id="hub-title"', 'eyebrow', 'Unified Platform'),
    ('home1.html', 'id="modules-title"', 'eyebrow', 'Modules'),
    ('home1.html', 'id="task-title"', 'eyebrow', 'Flagship Feature'),
    ('home1.html', 'id="mobile-title"', 'eyebrow', 'Mobile App'),
    ('home1.html', 'id="testimonials-title"', 'eyebrow', 'Testimonials'),
    ('home1.html', 'id="faq-title"', 'eyebrow', 'FAQ'),
    # index.html
    ('index.html', 'hero-delay-1">Run manufacturing', 'eyebrow', 'ERP Software for Manufacturing'),
    ('index.html', 'image-gallery-heading">Manufacturing execution', 'section-label', 'Manufacturing in Time ERP'),
    ('index.html', 'Built for diverse manufacturing environments', 'section-label', 'Industries'),
    ('index.html', 'Plans built for every stage of manufacturing growth', 'section-label', 'Pricing'),
    # about.html
    ('about.html', 'From shop-floor challenges to a complete ERP platform', 'section-label', 'Our story'),
    ('about.html', 'Values that shape every product decision', 'section-label', 'What we stand for'),
    ('about.html', 'Milestones that built TimeERP', 'section-label', 'Our journey'),
    # careers.html
    ('careers.html', 'Join the team shaping the future of operations software', 'section-label', 'Careers'),
    ('careers.html', 'id="car-why-heading"', 'section-label', 'Why join'),
    ('careers.html', 'id="car-security-heading"', 'section-label', 'Core security'),
    ('careers.html', 'id="car-offers-heading"', 'section-label', 'Benefits'),
    ('careers.html', 'id="car-testimonials-heading"', 'section-label', 'Team voices'),
    ('careers.html', 'id="car-vacancies-heading"', 'section-label', 'Open positions'),
    ('careers.html', 'id="car-faq-heading"', 'section-label', 'FAQ'),
    # community.html
    ('community.html', 'Connect with manufacturing professionals', 'section-label', 'Community'),
    ('community.html', 'id="comm-benefits-heading"', 'section-label', 'Why join'),
    ('community.html', 'id="comm-channels-heading"', 'section-label', 'Channels'),
    ('community.html', 'id="comm-discussions-heading"', 'section-label', 'Discussions'),
    ('community.html', 'id="comm-events-heading"', 'section-label', 'Events'),
    ('community.html', 'id="comm-ideas-heading"', 'section-label', 'Ideas board'),
    ('community.html', 'id="comm-faq-heading"', 'section-label', 'FAQ'),
    # trust_centre.html
    ('trust_centre.html', 'How TimeERP protects your business data', 'section-label', 'Trust Center'),
    ('trust_centre.html', 'id="tc-approach-heading"', 'section-label', 'Our approach'),
    ('trust_centre.html', 'id="tc-industry-heading"', 'section-label', 'By industry'),
    ('trust_centre.html', 'id="tc-faq-heading"', 'section-label', 'FAQ'),
    # custom_quote.html
    ('custom_quote.html', 'Request your custom quote', 'section-label', 'Enterprise'),
    ('custom_quote.html', 'Enterprise-grade security for your operations', 'section-label', 'Core security'),
    ('custom_quote.html', 'id="cq-faq-heading"', 'section-label', 'FAQ'),
    # real_time_support.html
    ('real_time_support.html', 'Real-time support status', 'section-label', 'Support status'),
    ('real_time_support.html', 'id="rts-performance-heading"', 'section-label', 'Performance'),
    ('real_time_support.html', 'id="rts-components-heading"', 'section-label', 'Channels'),
    ('real_time_support.html', 'id="rts-uptime-heading"', 'section-label', 'Uptime'),
    ('real_time_support.html', 'id="rts-events-heading"', 'section-label', 'History'),
]

INDUSTRY_PAGES: dict[str, list[tuple[str, str]]] = {
    'construction.html': [
        ('sp-hero', 'Construction'),
        ('Everything your contracting group needs', 'Construction pillars'),
        ('From site Excel chaos', 'Why builders choose TimeERP'),
        ('How construction groups run on TimeERP', 'End-to-end workflow'),
        ('How builders use TimeERP', 'Construction use cases'),
        ('One platform to plan, build, and bill', 'Core solutions'),
        ('Built for every layer of construction', 'Project modules'),
        ('Security built in. Visit our Trust Center', 'Code security'),
        ('See every site at a glance', 'Project command dashboard'),
        ('Site supervisor apps for daily', 'Field &amp; site mobile'),
        ('Onboarding built for construction groups', 'Onboarding'),
        ('Bring your tech stack together', 'Integrations'),
        ('Everything you need to run projects at scale', 'Built for construction'),
        ('See how much time your team spends', 'Admin workload estimator'),
        ('Site Excel vs TimeERP for construction', 'Compare'),
        ('Common questions from construction firms', 'FAQ'),
    ],
    'CA.html': [
        ('sp-hero', 'Chartered Accountant'),
        ('Everything your CA firm needs', 'Practice pillars'),
        ('From filing season chaos', 'Why CA firms choose TimeERP'),
        ('How CA firms run on CA Cloud Desk', 'End-to-end workflow'),
        ('Why Chartered Accountants rely', 'Trusted by CA firms'),
        ('One platform to run, grow', 'Core solutions'),
        ('Built for every service line', 'Practice modules'),
        ('Security built in. Visit our Trust Center', 'Code security'),
        ('See your practice at a glance', 'Partner dashboard'),
        ('Client portal &amp; mobile apps', 'Mobile &amp; client access'),
        ('Onboarding built for CA practices', 'Onboarding'),
        ('Bring your tech stack together', 'Integrations'),
        ('Everything you need to run a modern Chartered Accountant', 'Built for CA practices'),
        ('Estimate time and cost savings', 'Practice ROI calculator'),
        ('Spreadsheets vs TimeERP for CA', 'Compare'),
        ('Common questions from CA firms', 'FAQ'),
    ],
    'real_Estate.html': [
        ('sp-hero', 'Real Estate'),
        ('Business operations and financial compliance', 'Real estate operations'),
        ('From scattered project files', 'Why real estate firms choose TimeERP'),
        ('How real estate firms run on TimeERP', 'End-to-end workflow'),
        ('Why developers and real estate groups', 'Trusted by real estate firms'),
        ('One platform for projects, stakeholders', 'Core solutions'),
        ('Built for every layer of real estate', 'Real estate modules'),
        ('Security built in. Visit our Trust Center', 'Code security'),
        ('See your portfolio at a glance', 'Operations dashboard'),
        ('Branded portal for buyers', 'Stakeholder portal'),
        ('Onboarding built for real estate developers', 'Onboarding'),
        ('Bring your tech stack together', 'Integrations'),
        ('Everything you need to run real estate operations at scale', 'Built for real estate'),
        ('Estimate time and cost savings for your real estate', 'Operations ROI calculator'),
        ('Excel trackers vs TimeERP for real estate', 'Compare'),
        ('Common questions from real estate developers', 'FAQ'),
    ],
    'property_dealer.html': [
        ('sp-hero', 'Property Dealer'),
        ('Everything your property dealer firm needs', 'Brokerage pillars'),
        ('From WhatsApp leads to one deal-closing', 'Why brokers choose TimeERP'),
        ('How property dealers run on TimeERP', 'End-to-end workflow'),
        ('Why property dealers rely on TimeERP', 'Trusted by brokerages'),
        ('One platform to list, sell, and earn', 'Core solutions'),
        ('Built for every layer of property dealing', 'Brokerage modules'),
        ('Security built in. Visit our Trust Center', 'Code security'),
        ('See your pipeline at a glance', 'Brokerage dashboard'),
        ('Field-ready CRM for property agents', 'Agent mobile CRM'),
        ('Onboarding built for property dealer firms', 'Onboarding'),
        ('Bring your tech stack together', 'Integrations'),
        ('Everything you need to close deals at scale', 'Built for property dealers'),
        ('Estimate time and cost savings for your property dealer', 'Brokerage ROI calculator'),
        ('Excel registers vs TimeERP for property dealers', 'Compare'),
        ('Common questions from property dealer firms', 'FAQ'),
    ],
}


def label_html(label_class: str, text: str, indent: str = '          ') -> str:
    if label_class == 'eyebrow':
        style = ' style="text-align:center"' if text == 'FAQ' else ''
        return f'{indent}<p class="eyebrow"{style}>{text}</p>\n'
    return f'{indent}<span class="section-label">{text}</span>\n'


def already_has_label_before(html: str, marker: str, text: str) -> bool:
    idx = html.find(marker)
    if idx == -1:
        return True
    window = html[max(0, idx - 400):idx]
    return f'>{text}</' in window or f'>{text}<' in window


def insert_before_marker(html: str, marker: str, label_class: str, text: str) -> str:
    if marker not in html or already_has_label_before(html, marker, text.replace('&amp;', '&')):
        return html
    # find line start before marker
    idx = html.find(marker)
    line_start = html.rfind('\n', 0, idx) + 1
    indent = re.match(r'\s*', html[line_start:idx]).group(0)
    insertion = label_html(label_class, text, indent)
    return html[:line_start] + insertion + html[line_start:]


def insert_sp_hero_label(html: str, text: str) -> str:
    if already_has_label_before(html, '<section class="sp-hero">', text.replace('&amp;', '&')):
        return html
    pattern = r'(<section class="sp-hero">[\s\S]*?<div class="anim-up">\s*)(<h1>)'
    repl = rf'\1<span class="section-label">{text}</span>\n          \2'
    return re.sub(pattern, repl, html, count=1)


def strip_section_label_css(content: str) -> str:
    # Remove ::before icon blocks
    content = re.sub(
        r'\s*\.section-label::before\s*\{[^}]*\}',
        '',
        content,
        flags=re.DOTALL,
    )
    # Replace main .section-label block (multiline)
    content = re.sub(
        r'\.section-label\s*\{[^}]*\}',
        PLAIN_LABEL_CSS.strip(),
        content,
        count=1,
    )
    # Hero / page overrides: keep color only, strip box
    hero_overrides = [
        (r'\.car-hero \.section-label\{[^}]*\}', '.car-hero .section-label{color:rgba(255,255,255,.95);}'),
        (r'\.tc-hero \.section-label,\s*\n\s*\.trust-centre-page \.tc-hero \.section-lead \.section-label\{[^}]*\}', '.tc-hero .section-label,.trust-centre-page .tc-hero .section-lead .section-label{color:rgba(255,255,255,.95);}'),
        (r'\.comm-hero \.section-label,\s*\n\s*\.community-page \.comm-hero \.section-lead \.section-label\{[^}]*\}', '.comm-hero .section-label,.community-page .comm-hero .section-lead .section-label{color:rgba(255,255,255,.95);}'),
        (r'\.rts-hero \.section-label,\s*\n\s*\.real-time-support-page \.rts-hero \.section-lead \.section-label\{[^}]*\}', '.rts-hero .section-label,.real-time-support-page .rts-hero .section-lead .section-label{color:rgba(255,255,255,.95);}'),
        (r'\.cq-hero \.section-label\{[^}]*\}', '.cq-hero .section-label{color:rgba(255,255,255,.95);}'),
        (r'\.sp-hero \.section-label\{[^}]*\}', '.sp-hero .section-label{color:#1a9e8f;}'),
        (r'\.about-hero \.section-label\s*\{[^}]*\}', '.about-hero .section-label{color:rgba(255,255,255,.95);}'),
        (r'\.about-page \.section-lead \.section-label\s*\{[^}]*\}', '.about-page .section-lead .section-label{margin-bottom:20px;}'),
        (r'\.trust-centre-page \.section-lead \.section-label\{[^}]*\}', '.trust-centre-page .section-lead .section-label{margin-bottom:20px;}'),
        (r'\.community-page \.section-lead \.section-label\{[^}]*\}', '.community-page .section-lead .section-label{margin-bottom:20px;}'),
        (r'\.real-time-support-page \.section-lead \.section-label\{[^}]*\}', '.real-time-support-page .section-lead .section-label{margin-bottom:20px;}'),
        (r'\.pricing \.section-lead \.section-label\s*\{[^}]*\}', '.pricing .section-lead .section-label{margin-bottom:20px;}'),
    ]
    for pattern, replacement in hero_overrides:
        content = re.sub(pattern, replacement, content)
    # Remove display:none on about-hero label
    content = content.replace('.about-hero .section-label { display: none }', '.about-hero .section-label{color:rgba(255,255,255,.95);}')
    content = re.sub(r'\.about-page \.section-lead \.section-label::before\s*\{[^}]*\}', '', content)
    content = re.sub(r'\.tc-hero \.section-label::before\{display:none;\}', '', content)
    content = re.sub(r'\.comm-hero \.section-label::before\{display:none;\}', '', content)
    content = re.sub(r'\.rts-hero \.section-label::before\{display:none;\}', '', content)
    return content


def main() -> None:
    by_file: dict[str, list[tuple[str, str, str]]] = {}
    for fname, marker, cls, text in RESTORE:
        by_file.setdefault(fname, []).append((marker, cls, text))

    for fname, pairs in INDUSTRY_PAGES.items():
        for marker, text in pairs:
            if marker == 'sp-hero':
                by_file.setdefault(fname, []).append(('__SP_HERO__', 'section-label', text))
            else:
                by_file.setdefault(fname, []).append((marker, 'section-label', text))

    for fname, items in sorted(by_file.items()):
        path = ROOT / fname
        if not path.exists():
            print(f'skip missing {fname}')
            continue
        html = path.read_text(encoding='utf-8')
        original = html
        for marker, cls, text in items:
            if marker == '__SP_HERO__':
                html = insert_sp_hero_label(html, text)
            else:
                html = insert_before_marker(html, marker, cls, text)
        if html != original:
            path.write_text(html, encoding='utf-8')
            print(f'restored labels in {fname}')

    # CSS updates
    for path in ROOT.glob('*.html'):
        content = path.read_text(encoding='utf-8')
        if '.section-label' not in content:
            continue
        updated = strip_section_label_css(content)
        if updated != content:
            path.write_text(updated, encoding='utf-8')
            print(f'updated section-label CSS in {path.name}')

    # contact_sales cs-label already plain — ensure consistency
    cs = ROOT / 'contact_sales.html'
    if cs.exists():
        print('contact_sales.html cs-label preserved (plain text)')


if __name__ == '__main__':
    main()
