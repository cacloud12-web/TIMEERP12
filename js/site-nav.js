/**
 * Shared TimeERP site header (home1-style).
 * Mount: <div id="site-header"></div>
 * Requires: css/site-nav.css + Material Symbols Outlined
 */
(function () {
  'use strict';

  var root = document.getElementById('site-header');
  if (!root) return;

  var pathname = (window.location.pathname || '').replace(/\\/g, '/');
  var path = pathname.split('/').pop() || 'index.html';
  var isHome = /^(index\.html)?$/i.test(path) || path === '' || path === 'index.html';
  var dirSegs = pathname.split('/').filter(Boolean);
  if (dirSegs.length && /\.[a-z0-9]+$/i.test(dirSegs[dirSegs.length - 1])) dirSegs.pop();
  var rootPrefix = dirSegs.length ? dirSegs.map(function () { return '..'; }).join('/') + '/' : '';
  var home = isHome ? '' : (rootPrefix + 'index.html');
  var hash = function (id) { return home ? home + '#' + id : '#' + id; };
  var logoMarkHref = rootPrefix + 'index.html';
  var logoTextHref = rootPrefix + 'home.html';

  function svgIcon(paths) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">' + paths + '</svg>';
  }

  var html = ''
    + '<header class="nav' + (isHome ? ' nav--home' : ' nav--inner') + '" id="nav" role="banner">'
    +   '<div class="container nav__inner nav__container">'
    +     '<div class="nav__logo" role="group" aria-label="TimeERP">'
    +       '<a href="' + logoMarkHref + '" class="nav__logo-mark" aria-label="TimeERP marketing home">'
    +         '<svg class="nav__logo-svg nav__logo-svg--mark" viewBox="0 0 48 48" width="48" height="48" role="img" focusable="false" aria-hidden="true">'
    +           '<g class="logo-mark" transform="translate(2 2)">'
    +             '<circle cx="22" cy="22" r="20" fill="#25b7a7"/>'
    +             '<path d="M22 2a20 20 0 0 0-14.14 5.86A20 20 0 0 0 2 22h6a16 16 0 0 1 14-14V2z" fill="#1a3354"/>'
    +             '<circle cx="22" cy="22" r="13.5" fill="#fff"/>'
    +             '<g class="logo-hands" transform="translate(22 22)">'
    +               '<g class="logo-hand logo-hand--hour"><line x1="0" y1="0" x2="-5.63" y2="-3.25" stroke="#25b7a7" stroke-width="2.4" stroke-linecap="round"/></g>'
    +               '<g class="logo-hand logo-hand--minute"><line x1="0" y1="0" x2="7.36" y2="-4.25" stroke="#1a3354" stroke-width="2.4" stroke-linecap="round"/></g>'
    +               '<circle cx="0" cy="0" r="2.2" fill="#25b7a7"/>'
    +             '</g>'
    +           '</g>'
    +         '</svg>'
    +       '</a>'
    +       '<a href="' + logoTextHref + '" class="nav__logo-wordmark" aria-label="TimeERP app login">'
    +         '<span class="nav__logo-time">Time</span><span class="nav__logo-erp">ERP</span>'
    +       '</a>'
    +     '</div>'
    +     '<nav class="nav__menu" aria-label="Main navigation">'
    +       '<button type="button" class="nav__link is-trigger" id="productsNavBtn" aria-expanded="false" aria-haspopup="true" aria-controls="productsMega">'
    +         'Products <span class="nav__chevron" aria-hidden="true">▾</span>'
    +       '</button>'
    +       '<button type="button" class="nav__link is-trigger" id="industriesNavBtn" aria-expanded="false" aria-haspopup="true" aria-controls="industriesMega">'
    +         'Industries <span class="nav__chevron" aria-hidden="true">▾</span>'
    +       '</button>'
    +       '<button type="button" class="nav__link is-trigger" id="resourcesNavBtn" aria-expanded="false" aria-haspopup="true" aria-controls="resourcesMega">'
    +         'Resources <span class="nav__chevron" aria-hidden="true">▾</span>'
    +       '</button>'
    +       '<button type="button" class="nav__link is-trigger" id="companyNavBtn" aria-expanded="false" aria-haspopup="true" aria-controls="companyMega">'
    +         'Company <span class="nav__chevron" aria-hidden="true">▾</span>'
    +       '</button>'
    +       '<a class="nav__link" href="price.html">Pricing</a>'
    +       '<a class="nav__link" href="contact_sales.html">Contact</a>'
    +     '</nav>'
    +     '<div class="nav__actions">'
    +       '<a class="btn btn--primary" href="#" data-book-demo>Book Demo</a>'
    +       (isHome ? '<a class="btn btn--ghost" href="home.html">Login</a>' : '')
    +       '<button type="button" class="nav__toggle" id="navToggle" aria-label="Open menu">☰</button>'
    +     '</div>'
    +   '</div>'
    +   '<div class="nav__drawer glass" id="navDrawer"></div>'
    + '</header>'
    + '<div class="industries-backdrop" id="industriesBackdrop" hidden></div>'
    + buildProductsMega()
    + '<div class="industries-mega" id="industriesMega" role="menu" aria-label="Industries menu" aria-hidden="true">'
    +   '<div class="industries-mega__inner">'
    +     '<div class="industries-mega__layout">'
    +       '<aside class="industries-mega__sidebar">'
    +         '<p class="industries-mega__label">Industries</p>'
    +         '<ul class="industries-mega__list">'
    +           '<li><a class="industries-mega__item" href="construction.html" role="menuitem"><span class="industries-mega__icon" aria-hidden="true">' + svgIcon('<path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6"/>') + '</span><span class="industries-mega__text">Construction<span>Projects, labour &amp; site billing</span></span></a></li>'
    +           '<li><a class="industries-mega__item" href="real_Estate.html" role="menuitem"><span class="industries-mega__icon" aria-hidden="true">' + svgIcon('<path d="M3 21h18M6 21V8l6-4 6 4v13M10 21v-5h4v5"/>') + '</span><span class="industries-mega__text">Real Estate<span>Properties, clients &amp; commissions</span></span></a></li>'
    +           '<li><a class="industries-mega__item" href="msme.html" role="menuitem"><span class="industries-mega__icon" aria-hidden="true">' + svgIcon('<path d="M4 20V10l8-5 8 5v10M9 20v-5h6v5M8 10h8"/>') + '</span><span class="industries-mega__text">MSME<span>Affordable all-in-one ERP</span></span></a></li>'
    +           '<li><a class="industries-mega__item" href="CA.html" role="menuitem"><span class="industries-mega__icon" aria-hidden="true">' + svgIcon('<path d="M8 7h8M8 12h5M6 21h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"/><path d="M14 16h2"/>') + '</span><span class="industries-mega__text">CA Firms<span>Compliance, tasks &amp; vault</span></span></a></li>'
    +           '<li><a class="industries-mega__item' + (path.toLowerCase() === 'startup_launchpad.html' ? ' is-active' : '') + '" href="startup_launchpad.html" role="menuitem"' + (path.toLowerCase() === 'startup_launchpad.html' ? ' aria-current="page"' : '') + '><span class="industries-mega__icon" aria-hidden="true">' + svgIcon('<path d="M12 19V5M12 5l-5 6M12 5l5 6"/><path d="M5 19h14"/>') + '</span><span class="industries-mega__text">Startup Launch Pad<span>Tools for early-stage growth</span></span></a></li>'
    +         '</ul>'
    +       '</aside>'
    +       '<div class="industries-mega__main">'
    +         '<p class="industries-mega__label">Popular modules</p>'
    +         '<div class="industries-mega__grid">'
    +           '<a class="industries-mega__link" href="hrms.html" role="menuitem"><span class="industries-mega__link-icon" aria-hidden="true">' + svgIcon('<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>') + '</span><span class="industries-mega__link-name">HRMS</span></a>'
    +           '<a class="industries-mega__link" href="crm.html" role="menuitem"><span class="industries-mega__link-icon" aria-hidden="true">' + svgIcon('<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>') + '</span><span class="industries-mega__link-name">CRM</span></a>'
    +           '<a class="industries-mega__link" href="payroll.html" role="menuitem"><span class="industries-mega__link-icon" aria-hidden="true">' + svgIcon('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>') + '</span><span class="industries-mega__link-name">Payroll</span></a>'
    +           '<a class="industries-mega__link" href="billing.html" role="menuitem"><span class="industries-mega__link-icon" aria-hidden="true">' + svgIcon('<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>') + '</span><span class="industries-mega__link-name">Billing</span></a>'
    +           '<a class="industries-mega__link" href="project_management.html" role="menuitem"><span class="industries-mega__link-icon" aria-hidden="true">' + svgIcon('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>') + '</span><span class="industries-mega__link-name">Projects</span></a>'
    +           '<a class="industries-mega__link" href="document_management.html" role="menuitem"><span class="industries-mega__link-icon" aria-hidden="true">' + svgIcon('<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>') + '</span><span class="industries-mega__link-name">Documents</span></a>'
    +           '<a class="industries-mega__link" href="property_dealer.html" role="menuitem"><span class="industries-mega__link-icon" aria-hidden="true">' + svgIcon('<path d="M15 7h3a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h3"/><path d="M9 7V5a3 3 0 016 0v2"/>') + '</span><span class="industries-mega__link-name">Property Dealer</span></a>'
    +         '</div>'
    +         '<a class="industries-mega__view-all" href="' + hash('industries') + '">View all industries →</a>'
    +       '</div>'
    +     '</div>'
    +     '<div class="industries-mega__footer">'
    +       '<a class="industries-mega__footer-btn" href="contact_sales.html">' + svgIcon('<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.5-1.1a2 2 0 012.1-.4c.9.3 1.7.5 2.6.6a2 2 0 011.7 2z"/>') + ' Contact sales</a>'
    +     '</div>'
    +   '</div>'
    + '</div>'
    + '<div class="resources-mega" id="resourcesMega" role="menu" aria-label="Resources menu" aria-hidden="true">'
    +   '<div class="resources-mega__inner">'
    +     '<div class="resources-mega__layout">'
    +       '<h2 class="resources-mega__heading">Resources</h2>'
    +       '<div class="resources-mega__columns">'
    +         '<div class="resources-mega__col">'
    +           resourcesItem('features.html', 'grid_view', 'Features', 'Explore attendance, shift planning, and automated tracking capabilities')
    +           resourcesItem('Academy.html', 'school', 'Academy', 'Self-paced, expert-led courses')
    +           resourcesItem('event_calendar.html', 'calendar_month', 'Event calendar', 'Meetings, deadlines & workplace events')
    +         '</div>'
    +         '<div class="resources-mega__col">'
    +           resourcesItem('help_centre.html', 'help', 'Help Centre', 'Guides, FAQs, platform resources')
    +           resourcesItem('setup.html', 'settings', 'Setup', 'Designations, HR, branches, SMTP & pay setup')
    +           resourcesItem('consultants.html', 'support_agent', 'Consultants', 'Hire TimeERP implementation experts')
    +         '</div>'
    +         '<div class="resources-mega__col">'
    +           resourcesItem('onboarding_services.html', 'person_add', 'Paid onboarding services', 'Get hands-on guidance and expert setup')
    +           resourcesItem('market.html', 'campaign', 'Marketing', 'Campaigns, leads, email, SMS & WhatsApp')
    +         '</div>'
    +       '</div>'
    +     '</div>'
    +     '<div class="resources-mega__footer">'
    +       '<a href="contact_sales.html" class="resources-mega__footer-btn"><span class="material-symbols-outlined" aria-hidden="true">call</span> Contact sales</a>'
    +     '</div>'
    +   '</div>'
    + '</div>'
    + '<div class="company-mega" id="companyMega" role="menu" aria-label="Company menu" aria-hidden="true">'
    +   '<div class="company-mega__inner">'
    +     '<div class="company-mega__layout">'
    +       '<h2 class="company-mega__heading">Company</h2>'
    +       '<div class="company-mega__columns">'
    +         '<div class="company-mega__col">'
    +           companyItem('about.html', 'info', 'About us', 'Explore our mission and values')
    +           companyItem('custom_quote.html', 'request_quote', 'Get a custom quote', 'Designed for firms with 25+ seats')
    +           companyItem('team.html', 'groups', 'Team', 'Meet the people behind TimeERP')
    +         '</div>'
    +         '<div class="company-mega__col">'
    +           companyItem('community.html', 'forum', 'Community', 'Connect with TIME ERP professionals')
    +           companyItem('contact_sales.html', 'call', 'Contact sales', 'Get in touch for tailored solutions')
    +           companyItem('security.html', 'shield', 'Security &amp; Trust', 'Cloud protection for workforce and business data')
    +         '</div>'
    +         '<div class="company-mega__col">'
    +           companyItem('real_time_support.html', 'monitor_heart', 'Real-time support status', 'Live support performance data')
    +           companyItem('careers.html', 'trending_up', 'Careers', 'Join the TimeERP team')
    +           companyItem('blog.html', 'article', 'Blog', 'Product insights and updates')
    +         '</div>'
    +       '</div>'
    +     '</div>'
    +     '<div class="company-mega__footer">'
    +       '<a href="contact_sales.html" class="company-mega__footer-btn"><span class="material-symbols-outlined" aria-hidden="true">call</span> Contact sales</a>'
    +       '<span class="company-mega__footer-btn company-mega__footer-btn--disabled" aria-disabled="true"><span class="material-symbols-outlined" aria-hidden="true">download</span> Download apps</span>'
    +     '</div>'
    +   '</div>'
    + '</div>';

  function companyItem(href, icon, title, desc) {
    var active = path.toLowerCase() === href.toLowerCase();
    return '<a href="' + href + '" class="company-mega__item' + (active ? ' is-active' : '') + '" role="menuitem"' + (active ? ' aria-current="page"' : '') + '>'
      + '<span class="company-mega__icon" aria-hidden="true"><span class="material-symbols-outlined">' + icon + '</span></span>'
      + '<span class="company-mega__text"><span class="company-mega__title">' + title + '</span><span class="company-mega__desc">' + desc + '</span></span>'
      + '</a>';
  }

  function resourcesItem(href, icon, title, desc) {
    var active = href.indexOf('.html') !== -1 && path.toLowerCase() === href.toLowerCase();
    return '<a href="' + href + '" class="resources-mega__item' + (active ? ' is-active' : '') + '" role="menuitem"' + (active ? ' aria-current="page"' : '') + '>'
      + '<span class="resources-mega__icon" aria-hidden="true"><span class="material-symbols-outlined">' + icon + '</span></span>'
      + '<span class="resources-mega__text"><span class="resources-mega__title">' + title + '</span><span class="resources-mega__desc">' + desc + '</span></span>'
      + '</a>';
  }

  function getProducts() {
    return [
      {
        id: 'dashboard',
        name: 'Dashboard',
        icon: 'dashboard',
        detailDesc: 'Real-time business overview with revenue analytics, attendance summary, and project status in one view.',
        features: [
          { name: 'Business Overview', icon: 'travel_explore' },
          { name: 'Revenue Analytics', icon: 'show_chart' },
          { name: 'Attendance Summary', icon: 'how_to_reg' },
          { name: 'Project Status', icon: 'pending_actions' },
          { name: 'Alerts', icon: 'notifications_active' },
          { name: 'Custom Widgets', icon: 'widgets' },
          { name: 'Exports', icon: 'download' }
        ],
        href: 'dashboard.html'
      },
      {
        id: 'hrms',
        name: 'HRMS & Payroll',
        icon: 'groups',
        detailDesc: 'Hire, onboard, manage people, and run payroll with attendance, leave, PF, ESI, TDS, and payslips in one HR hub.',
        features: [
          { name: 'Attendance', icon: 'fingerprint' },
          { name: 'Leave', icon: 'beach_access' },
          { name: 'Employee Records', icon: 'badge' },
          { name: 'Recruitment', icon: 'person_search' },
          { name: 'Salary Structure', icon: 'account_balance_wallet' },
          { name: 'PF & ESI', icon: 'shield' },
          { name: 'Payslips', icon: 'receipt' },
          { name: 'Payroll Reports', icon: 'analytics' }
        ],
        href: 'hrms.html'
      },
      {
        id: 'crm',
        name: 'CRM',
        icon: 'handshake',
        detailDesc: 'Comprehensive Customer Relationship Management to manage leads, pipeline, client interactions, and relationships.',
        features: [
          { name: 'Lead Management', icon: 'filter_alt' },
          { name: 'Sales Pipeline', icon: 'timeline' },
          { name: 'Customer Database', icon: 'contacts' },
          { name: 'Follow-ups', icon: 'reply_all' },
          { name: 'Quotations', icon: 'description' },
          { name: 'Tasks', icon: 'task_alt' },
          { name: 'Activity Timeline', icon: 'history' },
          { name: 'Customer Portal', icon: 'web' }
        ],
        href: 'crm.html'
      },
      {
        id: 'marketing',
        name: 'Marketing',
        icon: 'campaign',
        detailDesc: 'Manage leads, website presence, email, SMS, WhatsApp, ads, and broadcast campaigns from one marketing workspace.',
        features: [
          { name: 'Website Management', icon: 'language' },
          { name: 'Lead Management', icon: 'filter_alt' },
          { name: 'Community', icon: 'groups' },
          { name: 'Email Marketing', icon: 'mail' },
          { name: 'WhatsApp Marketing', icon: 'chat' },
          { name: 'SMS Campaigns', icon: 'sms' },
          { name: 'Google Ads', icon: 'ads_click' },
          { name: 'Broadcast Campaigns', icon: 'campaign' }
        ],
        href: 'market.html'
      },
      {
        id: 'document-management',
        name: 'Document Vault',
        icon: 'folder_open',
        detailDesc: 'Store, organize, and control business documents with secure sharing, version tracking, approvals, and compliance-ready records.',
        features: [
          { name: 'Store Documents', icon: 'lock' },
          { name: 'Create Agreement', icon: 'handshake' },
          { name: 'Inward Documents', icon: 'move_to_inbox' },
          { name: 'Outward Documents', icon: 'outbox' },
          { name: 'Document Sharing', icon: 'share' },
          { name: 'Document Version Control', icon: 'history' },
          { name: 'Document Search', icon: 'search' },
          { name: 'Document Categories', icon: 'category' },
          { name: 'Document Approval Workflow', icon: 'rule' },
          { name: 'Document History', icon: 'schedule' },
          { name: 'DSC Tracker', icon: 'verified' },
          { name: 'Fixed Asset Register', icon: 'inventory_2' }
        ],
        href: 'document_management.html'
      },
      {
        id: 'project-management',
        name: 'Project Management',
        icon: 'view_kanban',
        detailDesc: 'Plan, assign, and deliver client work across teams with recurring tasks, mobile access, timesheets, billing, and profit visibility in one workspace.',
        features: [
          { name: 'Multi Assign', icon: 'group_add' },
          { name: 'Multi Customer', icon: 'groups' },
          { name: 'Multi Client', icon: 'business' },
          { name: 'Create Task', icon: 'add_task' },
          { name: 'Recurring Task', icon: 'autorenew' },
          { name: 'Task Service Master', icon: 'home_repair_service' },
          { name: 'Task in Mobile App', icon: 'smartphone' },
          { name: 'Share Task with Client', icon: 'share' },
          { name: 'Bulk Action in Task', icon: 'dynamic_feed' },
          { name: 'Task Reminder', icon: 'notifications' },
          { name: 'Task Timesheet', icon: 'schedule' },
          { name: 'Task Permission', icon: 'admin_panel_settings' },
          { name: 'Task Billing', icon: 'receipt_long' },
          { name: 'Profit / Loss Report', icon: 'monitoring' }
        ],
        href: 'project_management.html'
      },
      {
        id: 'billing',
        name: 'Billing Management',
        icon: 'receipt_long',
        detailDesc: 'Configure billing setup and branches, then manage invoices, receipts, ledgers, adjustments, and integrated digital payments in one flow.',
        features: [
          { name: 'Setup', icon: 'settings' },
          { name: 'Add New Branch', icon: 'add_business' },
          { name: 'Invoice', icon: 'request_quote' },
          { name: 'Proforma Invoice', icon: 'description' },
          { name: 'Receipt', icon: 'receipt' },
          { name: 'Ledger', icon: 'menu_book' },
          { name: 'Adjustment', icon: 'tune' },
          { name: 'Credit Note (CN)', icon: 'note_add' },
          { name: 'Debit Note (DN)', icon: 'note' },
          { name: 'Reported Transactions', icon: 'sync_alt' },
          { name: 'BharatPe Integration', icon: 'payments' },
          { name: 'UPI AutoPay', icon: 'account_balance_wallet' }
        ],
        href: 'billing.html'
      }
    ];
  }

  function productNavItem(p, index) {
    return '<button type="button" class="products-mega__item' + (index === 0 ? ' is-active' : '') + '" role="menuitem" data-product-id="' + p.id + '" aria-pressed="' + (index === 0 ? 'true' : 'false') + '">'
      + '<span class="products-mega__item-label">' + p.name + '</span>'
      + '<span class="products-mega__item-arrow" aria-hidden="true">→</span>'
      + '</button>';
  }

  function productFeatures(features) {
    return features.map(function (f) {
      var name = typeof f === 'string' ? f : f.name;
      var icon = typeof f === 'string' ? 'check_circle' : f.icon;
      return '<div class="products-mega__feat">'
        + '<span class="products-mega__feat-icon" aria-hidden="true"><span class="material-symbols-outlined">' + icon + '</span></span>'
        + '<span class="products-mega__feat-name">' + name + '</span>'
        + '</div>';
    }).join('');
  }

  function buildProductsMega() {
    var products = getProducts();
    var first = products[0];
    var navItems = products.map(productNavItem).join('');
    return ''
      + '<div class="products-mega" id="productsMega" role="menu" aria-label="Products menu" aria-hidden="true">'
      +   '<div class="products-mega__inner">'
      +     '<div class="products-mega__layout">'
      +       '<aside class="products-mega__nav">'
      +         '<div class="products-mega__list" id="productsMegaGrid" role="listbox" aria-label="Product modules">'
      +           navItems
      +         '</div>'
      +       '</aside>'
      +       '<div class="products-mega__main" id="productsMegaDetail" aria-live="polite">'
      +         '<div class="products-mega__detail-inner" id="productsMegaDetailInner">'
      +           '<a class="products-mega__intro" id="productsMegaIntro" href="' + first.href + '" aria-label="Open ' + first.name + ' details — More">'
      +             '<div class="products-mega__intro-text">'
      +               '<h3 class="products-mega__detail-title" id="productsMegaTitle">' + first.name + '</h3>'
      +               '<p class="products-mega__detail-desc" id="productsMegaDesc">' + first.detailDesc + '</p>'
      +               '<span class="products-mega__more" id="productsMegaLearn">More <span aria-hidden="true">→</span></span>'
      +             '</div>'
      +             '<span class="products-mega__intro-visual" aria-hidden="true">'
      +               '<span class="material-symbols-outlined" id="productsMegaIcon">' + (first.icon || 'apps') + '</span>'
      +             '</span>'
      +           '</a>'
      +           '<div class="products-mega__features" id="productsMegaFeatures">' + productFeatures(first.features) + '</div>'
      +         '</div>'
      +       '</div>'
      +       '<aside class="products-mega__aside">'
      +         '<p class="products-mega__aside-title"><span aria-hidden="true">🔥</span> Recently released</p>'
      +         '<a class="products-mega__news" href="compliance_management.html">'
      +           '<span class="products-mega__news-thumb" aria-hidden="true"><span class="material-symbols-outlined">manage_search</span></span>'
      +           '<span class="products-mega__news-text">Compliance Dashboard: GST, TDS, EPFO &amp; ESIC reports in one place</span>'
      +         '</a>'
      +         '<a class="products-mega__news" href="market.html">'
      +           '<span class="products-mega__news-thumb" aria-hidden="true"><span class="material-symbols-outlined">campaign</span></span>'
      +           '<span class="products-mega__news-text">WhatsApp Marketing: campaigns, templates &amp; automation for outreach</span>'
      +         '</a>'
      +         '<a class="products-mega__news-link" href="' + hash('products') + '">See what\'s new <span aria-hidden="true">→</span></a>'
      +       '</aside>'
      +     '</div>'
      +     '<div class="products-mega__footer">'
      +       '<a href="contact_sales.html" class="products-mega__footer-btn"><span class="material-symbols-outlined" aria-hidden="true">call</span> Contact Sales</a>'
      +     '</div>'
      +   '</div>'
      + '</div>';
  }

  root.innerHTML = html;
  root.removeAttribute('id');

  if (rootPrefix) {
    root.querySelectorAll('a[href]').forEach(function (a) {
      var h = a.getAttribute('href');
      if (!h || h.charAt(0) === '#' || /^(https?:|mailto:|tel:|javascript:)/i.test(h) || h.indexOf('../') === 0 || h.charAt(0) === '/') return;
      a.setAttribute('href', rootPrefix + h);
    });
  }

  /* Scroll state */
  var navEl = document.getElementById('nav');
  if (navEl) {
    window.addEventListener('scroll', function () {
      navEl.classList.toggle('is-scrolled', window.scrollY > 20);
    }, { passive: true });
    navEl.classList.toggle('is-scrolled', window.scrollY > 20);
  }

  /* Industries + Resources + Company + Products megas */
  (function initNavMegas() {
    var backdrop = document.getElementById('industriesBackdrop');
    var drawer = document.getElementById('navDrawer');
    if (!backdrop) return;

    var menus = {
      products: {
        mega: document.getElementById('productsMega'),
        btn: document.getElementById('productsNavBtn'),
        openAttr: 'products-mega-open'
      },
      industries: {
        mega: document.getElementById('industriesMega'),
        btn: document.getElementById('industriesNavBtn'),
        openAttr: 'industries-mega-open'
      },
      resources: {
        mega: document.getElementById('resourcesMega'),
        btn: document.getElementById('resourcesNavBtn'),
        openAttr: 'resources-mega-open'
      },
      company: {
        mega: document.getElementById('companyMega'),
        btn: document.getElementById('companyNavBtn'),
        openAttr: 'company-mega-open'
      }
    };
    var active = null;
    var productMap = {};
    var productsMega = menus.products.mega;
    getProducts().forEach(function (p) { productMap[p.id] = p; });

    function syncMegaTop(mega) {
      if (!navEl || !mega) return;
      mega.style.top = Math.ceil(navEl.getBoundingClientRect().bottom) + 'px';
    }

    function closeMenu(key) {
      var m = menus[key];
      if (!m || !m.mega || !m.btn) return;
      m.mega.classList.remove('is-open');
      m.mega.setAttribute('aria-hidden', 'true');
      m.btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove(m.openAttr);
    }

    function setOpen(key, open) {
      var m = menus[key];
      if (!m || !m.mega || !m.btn) return;
      if (open) {
        Object.keys(menus).forEach(function (k) { if (k !== key) closeMenu(k); });
        if (drawer) drawer.classList.remove('is-open');
        syncMegaTop(m.mega);
        backdrop.hidden = false;
        backdrop.classList.add('is-open');
        m.mega.classList.add('is-open');
        m.mega.setAttribute('aria-hidden', 'false');
        m.btn.setAttribute('aria-expanded', 'true');
        document.body.classList.add(m.openAttr);
        active = key;
        if (key === 'products') {
          var detailEl = document.getElementById('productsMegaDetail');
          var layoutEl = m.mega.querySelector('.products-mega__layout');
          var navCol = m.mega.querySelector('.products-mega__nav');
          if (!window.matchMedia('(max-width: 980px)').matches && detailEl && navCol) {
            navCol.insertAdjacentElement('afterend', detailEl);
            detailEl.classList.remove('is-mobile-visible');
            if (layoutEl) layoutEl.classList.remove('is-accordion');
            m.mega.querySelectorAll('.products-mega__item').forEach(function (c) {
              c.classList.remove('is-expanded');
            });
          }
        }
      } else {
        closeMenu(key);
        if (active === key) active = null;
        if (!active) {
          backdrop.classList.remove('is-open');
          window.setTimeout(function () {
            if (!active) backdrop.hidden = true;
          }, 200);
        }
      }
    }

    function setProductDetail(id, animate) {
      var p = productMap[id];
      if (!p) return;
      var title = document.getElementById('productsMegaTitle');
      var desc = document.getElementById('productsMegaDesc');
      var features = document.getElementById('productsMegaFeatures');
      var intro = document.getElementById('productsMegaIntro');
      var iconEl = document.getElementById('productsMegaIcon');
      var detailInner = document.getElementById('productsMegaDetailInner');
      if (!title || !desc || !features || !intro) return;

      function apply() {
        title.textContent = p.name;
        desc.textContent = p.detailDesc;
        features.innerHTML = productFeatures(p.features);
        intro.setAttribute('href', rootPrefix + p.href);
        intro.setAttribute('aria-label', 'Open ' + p.name + ' details — More');
        if (iconEl) iconEl.textContent = p.icon || 'apps';
        if (detailInner) detailInner.classList.remove('is-animating');
      }

      document.querySelectorAll('.products-mega__item').forEach(function (item) {
        var on = item.getAttribute('data-product-id') === id;
        item.classList.toggle('is-active', on);
        item.setAttribute('aria-pressed', on ? 'true' : 'false');
      });

      if (animate && detailInner) {
        detailInner.classList.add('is-animating');
        window.setTimeout(apply, 120);
      } else {
        apply();
      }
    }

    Object.keys(menus).forEach(function (key) {
      var m = menus[key];
      if (!m.mega || !m.btn) return;
      m.btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(key, active !== key);
      });
      m.mega.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function (e) {
          var href = link.getAttribute('href') || '';
          if (href === '#' || href.indexOf('javascript:') === 0) {
            e.preventDefault();
            setOpen(key, false);
            return;
          }
          if (href && href.charAt(0) !== '#') {
            e.preventDefault();
            setOpen(key, false);
            window.location.assign(link.href);
            return;
          }
          setOpen(key, false);
        });
      });
    });

    if (productsMega) {
      var items = productsMega.querySelectorAll('.products-mega__item');
      var layoutEl = productsMega.querySelector('.products-mega__layout');
      var detailEl = document.getElementById('productsMegaDetail');
      var listEl = document.getElementById('productsMegaGrid');
      var introLink = document.getElementById('productsMegaIntro');

      if (introLink) {
        introLink.addEventListener('click', function (e) {
          var href = introLink.getAttribute('href') || '';
          if (!href || href === '#') {
            e.preventDefault();
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          setOpen('products', false);
          window.setTimeout(function () {
            window.location.href = href;
          }, 40);
        });
      }

      function placeDetailAfterItem(item) {
        if (!detailEl || !listEl || !item) return;
        if (window.matchMedia('(max-width: 980px)').matches) {
          item.insertAdjacentElement('afterend', detailEl);
          detailEl.classList.add('is-mobile-visible');
          if (layoutEl) layoutEl.classList.add('is-accordion');
        } else {
          var navCol = productsMega.querySelector('.products-mega__nav');
          if (navCol && navCol.nextElementSibling !== detailEl) {
            navCol.insertAdjacentElement('afterend', detailEl);
          }
          detailEl.classList.remove('is-mobile-visible');
          if (layoutEl) layoutEl.classList.remove('is-accordion');
        }
      }

      items.forEach(function (item) {
        var id = item.getAttribute('data-product-id');

        function openProductPage() {
          var p = productMap[id];
          var href = p && p.href ? p.href : '';
          if (!href || href === '#') return false;
          /* Always resolve from site root so /HRMS/ and nested folders work after deploy */
          if (href.charAt(0) !== '/' && href.indexOf('http') !== 0 && href.indexOf('../') !== 0) {
            href = rootPrefix + href;
          }
          setOpen('products', false);
          window.setTimeout(function () {
            window.location.href = href;
          }, 40);
          return true;
        }

        item.addEventListener('mouseenter', function () {
          if (window.matchMedia('(max-width: 980px)').matches) return;
          setProductDetail(id, true);
        });
        item.addEventListener('focus', function () { setProductDetail(id, true); });
        item.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var isMobile = window.matchMedia('(max-width: 980px)').matches;
          if (isMobile) {
            var already = item.classList.contains('is-expanded');
            items.forEach(function (c) { c.classList.remove('is-expanded'); });
            if (already) {
              openProductPage();
              return;
            }
            setProductDetail(id, true);
            item.classList.add('is-expanded');
            placeDetailAfterItem(item);
            return;
          }
          /* Desktop (TaxDome-style): hover previews, click opens the page */
          setProductDetail(id, false);
          openProductPage();
        });
        item.addEventListener('keydown', function (e) {
          if (e.key !== 'Enter' && e.key !== ' ') return;
          e.preventDefault();
          item.click();
        });
      });

      window.addEventListener('resize', function () {
        var expanded = productsMega.querySelector('.products-mega__item.is-expanded');
        if (expanded) placeDetailAfterItem(expanded);
        else if (!window.matchMedia('(max-width: 980px)').matches && detailEl) {
          var navCol = productsMega.querySelector('.products-mega__nav');
          if (navCol) navCol.insertAdjacentElement('afterend', detailEl);
          detailEl.classList.remove('is-mobile-visible');
          if (layoutEl) layoutEl.classList.remove('is-accordion');
        }
      }, { passive: true });
    }

    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-open-products]')) {
        e.preventDefault();
        e.stopPropagation();
        setOpen('products', true);
        return;
      }
      if (e.target.closest('[data-open-industries]')) {
        e.preventDefault();
        e.stopPropagation();
        setOpen('industries', true);
        return;
      }
      if (e.target.closest('[data-open-resources]')) {
        e.preventDefault();
        e.stopPropagation();
        setOpen('resources', true);
        return;
      }
      if (e.target.closest('[data-open-company]')) {
        e.preventDefault();
        e.stopPropagation();
        setOpen('company', true);
        return;
      }
      if (!active) return;
      var m = menus[active];
      if (e.target.closest('#' + m.mega.id) || e.target.closest('#' + m.btn.id)) return;
      setOpen(active, false);
    });

    backdrop.addEventListener('click', function () { if (active) setOpen(active, false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && active) setOpen(active, false);
    });
    window.addEventListener('resize', function () {
      if (active) syncMegaTop(menus[active].mega);
    }, { passive: true });
    window.addEventListener('scroll', function () {
      if (active) syncMegaTop(menus[active].mega);
    }, { passive: true });

    /* Resources: desktop hover open + delayed close (click still works for touch/keyboard) */
    (function initResourcesHover() {
      var res = menus.resources;
      if (!res || !res.mega || !res.btn) return;
      var closeTimer = null;
      var HOVER_CLOSE_MS = 240;
      var hoverMq = window.matchMedia('(hover: hover) and (pointer: fine)');

      function clearCloseTimer() {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
      }

      function scheduleHoverClose() {
        if (!hoverMq.matches) return;
        clearCloseTimer();
        closeTimer = setTimeout(function () {
          if (active === 'resources') setOpen('resources', false);
          closeTimer = null;
        }, HOVER_CLOSE_MS);
      }

      function openOnHover() {
        if (!hoverMq.matches) return;
        clearCloseTimer();
        setOpen('resources', true);
      }

      res.btn.addEventListener('mouseenter', openOnHover);
      res.btn.addEventListener('mouseleave', scheduleHoverClose);
      res.mega.addEventListener('mouseenter', clearCloseTimer);
      res.mega.addEventListener('mouseleave', scheduleHoverClose);

      res.mega.querySelectorAll('.resources-mega__item').forEach(function (item) {
        item.addEventListener('mouseenter', function () {
          res.mega.querySelectorAll('.resources-mega__item').forEach(function (el) {
            el.classList.toggle('is-hover', el === item);
          });
        });
        item.addEventListener('mouseleave', function () {
          item.classList.remove('is-hover');
        });
      });
    })();
  })();

  /* Mobile drawer */
  var navToggleEl = document.getElementById('navToggle');
  if (navToggleEl) {
    navToggleEl.addEventListener('click', function () {
      var d = document.getElementById('navDrawer');
      if (!d) return;
      if (!d.innerHTML) {
        d.innerHTML = ''
          + '<button type="button" class="nav__link is-trigger" data-open-products>Products</button>'
          + '<button type="button" class="nav__link is-trigger" data-open-industries>Industries</button>'
          + '<button type="button" class="nav__link is-trigger" data-open-resources>Resources</button>'
          + '<button type="button" class="nav__link is-trigger" data-open-company>Company</button>'
          + '<a class="nav__link" href="' + rootPrefix + 'price.html">Pricing</a>'
          + '<a class="nav__link" href="' + rootPrefix + 'contact_sales.html">Contact</a>'
          + '<a class="btn btn--primary" href="#" data-book-demo>Book Demo</a>'
          + (isHome ? '<a class="btn btn--ghost" href="' + rootPrefix + 'home.html">Login</a>' : '');
      }
      d.classList.toggle('is-open');
    });
  }

  /* Ensure Book Demo modal is available on every page */
  (function ensureBookDemoModal() {
    if (window.__TIMEERP_BOOK_DEMO_READY) return;
    if (document.querySelector('script[src*="book-demo-modal.js"]')) return;
    var s = document.createElement('script');
    s.src = rootPrefix + 'js/book-demo-modal.js?v=21';
    s.defer = true;
    s.setAttribute('data-book-demo-src', '1');
    document.body.appendChild(s);
  })();

  /* Ensure Inter + Material Symbols for nav icons/fonts on every page */
  (function ensureSiteNavFonts() {
    function hasStylesheet(match) {
      var links = document.querySelectorAll('link[rel="stylesheet"]');
      for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href') || '';
        if (href.indexOf(match) !== -1) return true;
      }
      return false;
    }
    function addStylesheet(href, marker) {
      if (hasStylesheet(marker)) return;
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.setAttribute('data-site-nav-font', marker);
      document.head.appendChild(link);
    }
    if (!document.querySelector('link[rel="preconnect"][href*="fonts.googleapis.com"]')) {
      var pre1 = document.createElement('link');
      pre1.rel = 'preconnect';
      pre1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(pre1);
      var pre2 = document.createElement('link');
      pre2.rel = 'preconnect';
      pre2.href = 'https://fonts.gstatic.com';
      pre2.crossOrigin = 'anonymous';
      document.head.appendChild(pre2);
    }
    addStylesheet(
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      'family=Inter'
    );
    addStylesheet(
      'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap',
      'Material+Symbols+Outlined'
    );
  })();
})();
