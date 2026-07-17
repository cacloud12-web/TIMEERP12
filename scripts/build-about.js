const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const content = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
const styles = styleMatch ? styleMatch[1] : '';

const navStart = content.indexOf('<!-- SECTION 1: NAVBAR -->');
const navEnd = content.indexOf('<!-- SECTION 2: HERO -->');
let navbar = content.slice(navStart, navEnd);
navbar = navbar.replace('href="#" class="navbar__logo"', 'href="index.html" class="navbar__logo"');
navbar = navbar.replace(/href="#([a-zA-Z0-9_-]+)"/g, 'href="index.html#$1"');

const footerStart = content.indexOf('<!-- SECTION 11: FOOTER -->');
const footerEnd = content.indexOf('<!-- SECTION 12: DEMO MODAL -->');
let footer = content.slice(footerStart, footerEnd);
footer = footer.replace(/href="#([a-zA-Z0-9_-]+)"/g, 'href="index.html#$1"');
footer = footer.replace('<li><a href="#">About us</a></li>', '<li><a href="about.html">About us</a></li>');
footer = footer.replace('href="#" class="footer-brand__logo"', 'href="index.html" class="footer-brand__logo"');

const aboutCss = `
    /* ========== ABOUT PAGE ========== */
    .about-hero {
      position: relative;
      padding: calc(72px + 80px) 0 var(--section-pad);
      background: linear-gradient(165deg, #3dd5c5 0%, #25b7a7 28%, #1a9e8f 52%, #0d7a6e 78%, #083530 100%);
      overflow: hidden;
    }
    .about-hero__inner { position: relative; z-index: 2; }
    .about-hero .section-lead { max-width: 680px; margin-bottom: 0; }
    .about-hero__decoration {
      position: absolute;
      right: -80px;
      top: 50%;
      transform: translateY(-50%);
      width: 420px;
      height: 420px;
      border-radius: 50%;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      pointer-events: none;
    }
    .about-hero__decoration::after {
      content: '';
      position: absolute;
      inset: 40px;
      border-radius: 50%;
      border: 1px dashed rgba(255,255,255,0.2);
    }

    .about-stats {
      background: transparent;
      margin-top: -72px;
      position: relative;
      z-index: 3;
      padding: 0 0 80px;
      overflow: visible;
    }
    .about-stats .section-inner {
      padding-left: var(--content-pad-x);
      padding-right: var(--content-pad-x);
      overflow: visible;
    }
    .about-stats__grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      align-items: stretch;
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      box-shadow: 0 16px 40px rgba(37, 183, 167, 0.1);
      padding: 48px 16px;
      overflow: visible;
    }
    .about-stat {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 20px;
      text-align: center;
      transition: background var(--transition-med);
      cursor: default;
      overflow: visible;
    }
    .about-stat:not(:last-child)::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 72px;
      background: var(--border);
    }
    .about-stat:hover {
      background: transparent;
    }
    .about-stat__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      width: 100%;
      overflow: visible;
    }
    .about-stat__value {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 2px;
      margin: 0;
      padding: 6px 0;
      min-height: 54px;
      line-height: 1;
      overflow: visible;
      text-align: center;
    }
    .about-stat__number {
      font-size: 42px;
      font-weight: 700;
      color: var(--primary);
      line-height: 1.15;
      letter-spacing: -0.01em;
      font-variant-numeric: tabular-nums;
      display: block;
      padding: 2px 0;
      overflow: visible;
    }
    .about-stat__suffix {
      font-size: 36px;
      font-weight: 700;
      color: var(--primary);
      line-height: 1.15;
      display: block;
      padding: 2px 0 0;
      overflow: visible;
    }
    .about-stat__label {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.45;
      max-width: 168px;
      margin: 0;
      min-height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .about-story { background: var(--bg-light); }
    .about-story__grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: center;
    }
    .about-story__visual {
      position: relative;
      border-radius: var(--radius-img);
      overflow: hidden;
      box-shadow: var(--shadow-card);
      aspect-ratio: 4/3;
      background: linear-gradient(135deg, var(--primary-light), #fff);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .about-story__visual img {
      width: 70%;
      height: auto;
      object-fit: contain;
    }
    .about-story__badge {
      position: absolute;
      bottom: 24px;
      left: 24px;
      background: var(--white);
      padding: 16px 20px;
      border-radius: var(--radius-btn);
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      font-size: 14px;
      font-weight: 600;
      color: var(--text-dark);
    }
    .about-story__badge span { color: var(--primary); }

    .about-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .about-tab {
      padding: 12px 24px;
      font-size: 14px;
      font-weight: 600;
      color: var(--text-body);
      background: var(--white);
      border: 2px solid var(--border);
      border-radius: var(--radius-btn);
      cursor: pointer;
      transition: all var(--transition-med);
    }
    .about-tab:hover {
      border-color: var(--primary);
      color: var(--primary);
      background: var(--primary-light);
    }
    .about-tab.is-active {
      background: var(--primary);
      border-color: var(--primary);
      color: var(--white);
      box-shadow: 0 4px 16px rgba(37,183,167,0.35);
    }
    .about-tab-panel {
      display: none;
      animation: tabFadeIn 0.35s ease;
    }
    .about-tab-panel.is-active { display: block; }
    @keyframes tabFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: none; }
    }
    .about-tab-panel p {
      font-size: 16px;
      line-height: 1.75;
      color: var(--text-body);
      max-width: 640px;
    }

    .about-values__grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .about-value-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 32px 28px;
      transition: all var(--transition-med);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .about-value-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: var(--primary);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform var(--transition-med);
    }
    .about-value-card:hover {
      border-color: rgba(37,183,167,0.35);
      box-shadow: var(--shadow-card);
      transform: translateY(-4px);
    }
    .about-value-card.is-active {
      border-color: var(--primary);
      box-shadow: var(--shadow-card);
      transform: translateY(-4px);
    }
    .about-value-card:hover::before { transform: scaleX(1); }
    .about-value-card.is-active::before { transform: scaleX(1); }
    .about-value-card__icon {
      width: 48px;
      height: 48px;
      background: var(--primary-light);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      transition: background var(--transition-med), transform var(--transition-med);
    }
    .about-value-card__icon .material-symbols-outlined {
      font-size: 26px;
      color: var(--primary);
      transition: color var(--transition-med);
    }
    .about-value-card:hover .about-value-card__icon {
      background: var(--primary);
      transform: scale(1.08);
    }
    .about-value-card.is-active .about-value-card__icon {
      background: var(--primary);
      transform: scale(1.08);
    }
    .about-value-card:hover .about-value-card__icon .material-symbols-outlined {
      color: var(--white);
    }
    .about-value-card.is-active .about-value-card__icon .material-symbols-outlined {
      color: var(--white);
    }
    .about-value-card h3 {
      font-size: 20px;
      margin-bottom: 10px;
      background: none;
      -webkit-text-fill-color: var(--text-dark);
      color: var(--text-dark);
      filter: none;
    }
    .about-value-card p {
      font-size: 14px;
      line-height: 1.65;
      color: var(--text-muted);
      margin: 0;
    }

    .about-timeline { position: relative; padding-left: 32px; }
    .about-timeline::before {
      content: '';
      position: absolute;
      left: 7px;
      top: 8px;
      bottom: 8px;
      width: 2px;
      background: linear-gradient(180deg, var(--primary), var(--border));
    }
    .about-timeline__item {
      position: relative;
      padding-bottom: 40px;
      padding-left: 28px;
    }
    .about-timeline__item:last-child { padding-bottom: 0; }
    .about-timeline__dot {
      position: absolute;
      left: -32px;
      top: 6px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--white);
      border: 3px solid var(--primary);
      transition: transform var(--transition-med), box-shadow var(--transition-med);
    }
    .about-timeline__item:hover .about-timeline__dot {
      transform: scale(1.25);
      box-shadow: 0 0 0 6px rgba(37,183,167,0.15);
    }
    .about-timeline__year {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 6px;
    }
    .about-timeline__title {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-dark);
      margin-bottom: 8px;
      background: none;
      -webkit-text-fill-color: var(--text-dark);
      filter: none;
    }
    .about-timeline__desc {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.65;
      max-width: 520px;
    }

    .about-team__grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 24px;
    }
    .about-team-card {
      text-align: center;
      padding: 28px 20px;
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      transition: all var(--transition-med);
    }
    .about-team-card:hover {
      border-color: rgba(37,183,167,0.3);
      box-shadow: var(--shadow-card);
      transform: translateY(-4px);
    }
    .about-team-card__avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-light), var(--primary));
      margin: 0 auto 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 700;
      color: var(--white);
      transition: transform var(--transition-med);
    }
    .about-team-card:hover .about-team-card__avatar { transform: scale(1.08); }
    .about-team-card h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
      background: none;
      -webkit-text-fill-color: var(--text-dark);
      color: var(--text-dark);
      filter: none;
    }
    .about-team-card p {
      font-size: 13px;
      color: var(--text-muted);
      margin: 0;
    }

    @media (max-width: 1024px) {
      .about-stats__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        padding: 40px 12px;
        row-gap: 36px;
      }
      .about-stat { padding: 0 16px; }
      .about-stat::after { display: none; }
      .about-stat:nth-child(odd) {
        border-right: 1px solid var(--border);
      }
      .about-stat:nth-child(-n+2) {
        padding-bottom: 36px;
        border-bottom: 1px solid var(--border);
      }
      .about-stat__label { max-width: 220px; }
      .about-story__grid { grid-template-columns: 1fr; gap: 40px; }
      .about-values__grid { grid-template-columns: repeat(2, 1fr); }
      .about-team__grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .about-stats { margin-top: -48px; padding-bottom: 56px; }
      .about-stats__grid {
        grid-template-columns: 1fr;
        padding: 32px 20px;
        row-gap: 0;
      }
      .about-stat {
        padding: 28px 12px;
        border-right: none !important;
        border-bottom: 1px solid var(--border);
      }
      .about-stat:nth-child(-n+2) { padding-bottom: 28px; }
      .about-stat:last-child { border-bottom: none; }
      .about-stat__number { font-size: 36px; line-height: 1.15; padding: 2px 0; }
      .about-stat__suffix { font-size: 30px; line-height: 1.15; }
      .about-stat__value { min-height: 48px; padding: 6px 0; }
      .about-stat__label { max-width: 260px; min-height: auto; }
      .about-values__grid,
      .about-team__grid { grid-template-columns: 1fr; }
      .about-hero__decoration { display: none; }
    }

    /* About page headings — match pricing section style */
    .about-page .section-lead {
      text-align: left;
      margin-bottom: 48px;
      max-width: 720px;
    }
    .about-page .section-lead .section-label {
      margin-bottom: 20px;
    }
    .about-page .section-lead h1,
    .about-page .section-lead h2 {
      font-size: clamp(1.75rem, 2.5vw, 2.25rem);
      font-weight: 500;
      line-height: 1.28;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
      max-width: 550px;
      background: none;
      -webkit-background-clip: unset;
      background-clip: unset;
      -webkit-text-fill-color: #000;
      color: #000;
      filter: none;
    }
    .about-page .section-lead > p {
      font-size: 16px;
      line-height: 1.65;
      color: #404040;
      max-width: 640px;
      letter-spacing: -0.2px;
    }
    .about-story .section-lead {
      margin-bottom: 32px;
    }
    .about-hero .section-label {
      border-color: rgba(255, 255, 255, 0.4);
      background: rgba(255, 255, 255, 0.14);
      color: rgba(255, 255, 255, 0.95);
    }
    .about-hero .section-label::before {
      background: #fff;
    }
    .about-hero .section-lead h1 {
      font-size: clamp(1.75rem, 2.5vw, 2.25rem);
      font-weight: 500;
      line-height: 1.28;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
      max-width: 550px;
      background: none;
      -webkit-text-fill-color: #fff;
      color: #fff;
      filter: none;
    }
    .about-hero .section-lead > p {
      font-size: 16px;
      line-height: 1.65;
      color: rgba(255, 255, 255, 0.88);
      max-width: 640px;
      letter-spacing: -0.2px;
    }
`;

const aboutBody = `
  <section class="about-hero" id="about-hero">
    <div class="about-hero__decoration" aria-hidden="true"></div>
    <div class="section-inner about-hero__inner">
      <div class="section-lead anim-up">
        <span class="section-label">About TimeERP</span>
        <h1>Built for manufacturers who need clarity, control, and speed</h1>
        <p>TimeERP is manufacturing ERP software from Law Seva Management Private Limited — designed to connect planning, shop-floor execution, inventory, and finance in one platform teams actually use every day.</p>
      </div>
    </div>
  </section>

  <section class="about-stats">
    <div class="section-inner">
      <div class="about-stats__grid anim-fade">
        <div class="about-stat" tabindex="0">
          <div class="about-stat__body">
            <div class="about-stat__value"><span class="about-stat__number" data-count="2000">0</span><span class="about-stat__suffix">+</span></div>
            <p class="about-stat__label">Manufacturing teams onboarded</p>
          </div>
        </div>
        <div class="about-stat" tabindex="0">
          <div class="about-stat__body">
            <div class="about-stat__value"><span class="about-stat__number" data-count="15">0</span><span class="about-stat__suffix">+</span></div>
            <p class="about-stat__label">Years of ERP expertise</p>
          </div>
        </div>
        <div class="about-stat" tabindex="0">
          <div class="about-stat__body">
            <div class="about-stat__value"><span class="about-stat__number" data-count="98">0</span><span class="about-stat__suffix">%</span></div>
            <p class="about-stat__label">Customer satisfaction rate</p>
          </div>
        </div>
        <div class="about-stat" tabindex="0">
          <div class="about-stat__body">
            <div class="about-stat__value"><span class="about-stat__number" data-count="50">0</span><span class="about-stat__suffix">+</span></div>
            <p class="about-stat__label">Industries served</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="about-story section" id="story">
    <div class="section-inner">
      <div class="about-story__grid">
        <div class="about-story__visual anim-left">
          <img src="assets/Time_erp.png" alt="TimeERP platform" width="280" height="280" loading="lazy">
          <div class="about-story__badge">Trusted by <span>2,000+</span> teams</div>
        </div>
        <div class="anim-right">
          <div class="section-lead">
            <span class="section-label">Our story</span>
            <h2>From shop-floor challenges to a complete ERP platform</h2>
          </div>
          <div class="about-tabs" role="tablist" aria-label="Company story">
            <button type="button" class="about-tab is-active" role="tab" aria-selected="true" data-tab="mission">Mission</button>
            <button type="button" class="about-tab" role="tab" aria-selected="false" data-tab="vision">Vision</button>
            <button type="button" class="about-tab" role="tab" aria-selected="false" data-tab="approach">Approach</button>
          </div>
          <div class="about-tab-panel is-active" id="panel-mission" role="tabpanel">
            <p>We help manufacturing businesses run operations with precision — planning, execution, visibility, and traceability in one platform. Every feature in TimeERP exists because a real plant team needed it.</p>
          </div>
          <div class="about-tab-panel" id="panel-vision" role="tabpanel" hidden>
            <p>To become the most trusted ERP for mid-size and growing manufacturers across India and beyond — where every production line, warehouse, and finance desk works from a single source of truth.</p>
          </div>
          <div class="about-tab-panel" id="panel-approach" role="tabpanel" hidden>
            <p>We build alongside our customers. Implementation is guided, not dumped. Our team understands BOMs, job cards, and WIP — not just spreadsheets — so onboarding feels practical from day one.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="values" style="background: var(--bg-light);">
    <div class="section-inner">
      <div class="section-lead anim-up">
        <span class="section-label">What we stand for</span>
        <h2>Values that shape every product decision</h2>
        <p>Click any card to explore how we put these principles into practice.</p>
      </div>
      <div class="about-values__grid">
        <article class="about-value-card anim-up stagger-0" tabindex="0">
          <div class="about-value-card__icon"><span class="material-symbols-outlined">precision_manufacturing</span></div>
          <h3>Precision</h3>
          <p>Accurate data from BOM to dispatch — no guesswork on the shop floor.</p>
        </article>
        <article class="about-value-card anim-up stagger-1" tabindex="0">
          <div class="about-value-card__icon"><span class="material-symbols-outlined">visibility</span></div>
          <h3>Transparency</h3>
          <p>Real-time visibility across plants, work centers, and inventory levels.</p>
        </article>
        <article class="about-value-card anim-up stagger-2" tabindex="0">
          <div class="about-value-card__icon"><span class="material-symbols-outlined">handshake</span></div>
          <h3>Partnership</h3>
          <p>We grow when our customers grow — support that understands manufacturing.</p>
        </article>
        <article class="about-value-card anim-up stagger-0" tabindex="0">
          <div class="about-value-card__icon"><span class="material-symbols-outlined">touch_app</span></div>
          <h3>Simplicity</h3>
          <p>Powerful ERP without the complexity — interfaces teams adopt quickly.</p>
        </article>
        <article class="about-value-card anim-up stagger-1" tabindex="0">
          <div class="about-value-card__icon"><span class="material-symbols-outlined">lightbulb</span></div>
          <h3>Innovation</h3>
          <p>Continuous improvements driven by customer feedback and industry trends.</p>
        </article>
        <article class="about-value-card anim-up stagger-2" tabindex="0">
          <div class="about-value-card__icon"><span class="material-symbols-outlined">verified_user</span></div>
          <h3>Integrity</h3>
          <p>Secure, compliant, and honest — your operational data stays protected.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section" id="timeline">
    <div class="section-inner">
      <div class="section-lead anim-up">
        <span class="section-label">Our journey</span>
        <h2>Milestones that built TimeERP</h2>
      </div>
      <div class="about-timeline anim-up">
        <div class="about-timeline__item">
          <span class="about-timeline__dot" aria-hidden="true"></span>
          <p class="about-timeline__year">2010</p>
          <h3 class="about-timeline__title">Founded in Delhi NCR</h3>
          <p class="about-timeline__desc">Law Seva Management Private Limited begins helping manufacturers digitize operations and compliance workflows.</p>
        </div>
        <div class="about-timeline__item">
          <span class="about-timeline__dot" aria-hidden="true"></span>
          <p class="about-timeline__year">2016</p>
          <h3 class="about-timeline__title">First manufacturing ERP modules</h3>
          <p class="about-timeline__desc">Production planning, BOM management, and inventory modules launched for component assembly plants.</p>
        </div>
        <div class="about-timeline__item">
          <span class="about-timeline__dot" aria-hidden="true"></span>
          <p class="about-timeline__year">2020</p>
          <h3 class="about-timeline__title">TimeERP platform unified</h3>
          <p class="about-timeline__desc">Shop-floor execution, quality checkpoints, and financial control brought into a single integrated platform.</p>
        </div>
        <div class="about-timeline__item">
          <span class="about-timeline__dot" aria-hidden="true"></span>
          <p class="about-timeline__year">2024</p>
          <h3 class="about-timeline__title">2,000+ teams onboarded</h3>
          <p class="about-timeline__desc">Expanded across manufacturing, distribution, and industrial machinery with mobile apps for shop-floor teams.</p>
        </div>
        <div class="about-timeline__item">
          <span class="about-timeline__dot" aria-hidden="true"></span>
          <p class="about-timeline__year">2026</p>
          <h3 class="about-timeline__title">AI-powered production insights</h3>
          <p class="about-timeline__desc">Next-generation analytics and traceability tools for multi-plant manufacturing networks.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="team" style="background: var(--bg-light);">
    <div class="section-inner">
      <div class="section-lead anim-up">
        <span class="section-label">Leadership</span>
        <h2>The team behind TimeERP</h2>
        <p>Founded by the leadership team at Law Seva Management Private Limited — creators of CA Cloud Desk.</p>
      </div>
      <div class="about-team__grid">
        <div class="about-team-card anim-up stagger-0">
          <div class="about-team-card__avatar">SB</div>
          <h3>Saurabh Bhardwaj</h3>
          <p>Founder &amp; CEO</p>
        </div>
        <div class="about-team-card anim-up stagger-1">
          <div class="about-team-card__avatar">J</div>
          <h3>Janki</h3>
          <p>Co-Founder &amp; Director</p>
        </div>
        <div class="about-team-card anim-up stagger-2">
          <div class="about-team-card__avatar">PE</div>
          <h3>Product &amp; Engineering</h3>
          <p>Technology &amp; Platform Team</p>
        </div>
        <div class="about-team-card anim-up stagger-3">
          <div class="about-team-card__avatar">CS</div>
          <h3>Customer Success</h3>
          <p>Support &amp; Client Relations</p>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-banner" id="cta">
    <div class="container">
      <div class="section-lead anim-up">
        <h2>Ready to see TimeERP in action?</h2>
        <p>Join thousands of manufacturing teams running operations with precision and control.</p>
      </div>
      <div class="anim-up stagger-1" style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center;">
        <a href="index.html#hero" class="btn btn--white">Start Free Trial</a>
        <a href="index.html#contact" class="btn btn--ghost" style="border-color:#fff;color:#fff;">Contact Sales</a>
      </div>
    </div>
  </section>
`;

const aboutScripts = `
  <script src="js/site-chrome.js"></script>
  <script src="js/scroll-animations.js"></script>
  <script src="js/navbar-mega-menu.js"></script>
  <script src="js/footer-accordion.js"></script>
  <script>
    (function () {
      'use strict';

      var statsAnimated = false;
      function animateCounters() {
        if (statsAnimated) return;
        document.querySelectorAll('.about-stat__number[data-count]').forEach(function (el) {
          var target = parseInt(el.getAttribute('data-count'), 10);
          var duration = 1800;
          var start = performance.now();
          function tick(now) {
            var progress = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = String(Math.floor(target * eased));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
        statsAnimated = true;
      }
      var statsSection = document.querySelector('.about-stats');
      if (statsSection) {
        var statsObserver = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            animateCounters();
            statsObserver.disconnect();
          }
        }, { threshold: 0.3 });
        statsObserver.observe(statsSection);
      }

      var tabs = document.querySelectorAll('.about-tab');
      var panels = document.querySelectorAll('.about-tab-panel');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var id = tab.getAttribute('data-tab');
          tabs.forEach(function (t) {
            t.classList.toggle('is-active', t === tab);
            t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
          });
          panels.forEach(function (panel) {
            var active = panel.id === 'panel-' + id;
            panel.classList.toggle('is-active', active);
            panel.hidden = !active;
          });
        });
      });

      document.querySelectorAll('.about-value-card').forEach(function (card) {
        card.addEventListener('click', function () {
          var wasActive = card.classList.contains('is-active');
          document.querySelectorAll('.about-value-card').forEach(function (c) {
            c.classList.remove('is-active');
          });
          if (!wasActive) {
            card.classList.add('is-active');
          }
        });
      });
    })();
  </script>
`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Us — TimeERP</title>
  <meta name="description" content="Learn about TimeERP — manufacturing ERP software built for precision, control, and real shop-floor operations.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet">
  <style>
${styles}
${aboutCss}
  </style>
</head>
<body class="about-page">

${navbar}

${aboutBody}

${footer}

${aboutScripts}
</body>
</html>
`;

fs.writeFileSync(path.join(root, 'about.html'), html, 'utf8');
console.log('about.html created:', html.length, 'bytes');
