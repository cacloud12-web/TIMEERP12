/**
 * TIME ERP Blog, WordPress-ready post feed.
 * Posts render from fetchPosts(). Until WP is connected, one live article is shown.
 *
 * WP REST example:
 *   fetch(WP_API + '/wp/v2/posts?_embed').then(...map to { id, title, excerpt, date, author, category, image, content, link })
 */
(function () {
  'use strict';

  /** Set your WordPress REST base when ready, e.g. 'https://cms.timeerp.com/wp-json' */
  var WP_API = '';

  /**
   * Live articles published on the site.
   * Images: assets/blog/ and timeerp blog/hrms-images/
   */
  var DEMO_POSTS = [
    {
      id: 3,
      slug: 'attendance-mistakes-that-break-payroll',
      title: 'Attendance Mistakes That Break Payroll',
      excerpt: 'The attendance gaps that create salary disputes, delayed pay cycles, and HR fire drills, and how TIME ERP keeps punches, leave, and payroll data aligned.',
      date: '2026-09-21',
      author: 'TIME ERP Editorial Team',
      category: 'Attendance',
      readingTime: '6 min',
      image: '/assets/blog/hrms/hrms-attendance.png',
      link: 'attendance-mistakes-that-break-payroll.html',
      content: [
        'Most salary disputes do not start in finance. They start with unclear attendance and late approvals.',
        '## Why attendance drives payroll',
        'Payable days, leave, and overtime all depend on clean attendance before the cut-off.',
        '## Common mistakes',
        'Punches without policy, leave stuck in chat, late manager approvals, and field teams outside the system.',
        '## How TIME ERP helps',
        'Cloud attendance, linked leave, manager approvals, and reports HR and accounts can trust.',
        'Read the full guide for the checklist and FAQs.'
      ]
    },
    {
      id: 2,
      slug: 'hrms-software-features-benefits',
      title: 'HRMS Software: Features, Benefits, and Why Every Growing Business Needs It',
      excerpt: 'What HRMS software is, essential features, and why growing businesses need one platform for attendance, leave, payroll, and employee records.',
      date: '2026-07-31',
      author: 'TIME ERP Editorial Team',
      category: 'HRMS',
      readingTime: '5 min',
      image: '/assets/blog/hrms/hrms-hero.png',
      link: 'hrms-software-features-benefits.html',
      content: [
        'Growing teams struggle when attendance, leave, payroll, and employee records live in spreadsheets.',
        '## What is HRMS?',
        'HRMS brings the employee lifecycle into one secure system—from onboarding to attendance, leave, payroll support, and reports.',
        '## Why growing businesses need it',
        'Structured workflows reduce payroll errors, speed up approvals, and free HR to focus on people—not paperwork.',
        '## Key features',
        'Employee records, attendance tracking, leave management, payroll integration, self-service, and workforce analytics.',
        'Read the full guide for features, productivity benefits, and FAQs.'
      ]
    },
    {
      id: 1,
      slug: 'why-msmes-need-time-erp',
      title: 'Why MSMEs Need TIME ERP',
      excerpt: 'A practical guide for MSMEs on challenges, ERP basics, TIME ERP modules, benefits, and why one platform beats disconnected tools.',
      date: '2026-07-25',
      author: 'TIME ERP Editorial Team',
      category: 'MSME Growth',
      readingTime: '3 min',
      image: '/assets/blog/image1.png',
      link: 'why-msmes-need-time-erp.html',
      content: [
        'Growing MSMEs need clear systems for people, customers, projects, billing, and communication.',
        'Spreadsheets work early on. They break as teams grow. Visibility drops.',
        '## What are MSMEs?',
        'MSMEs are Micro, Small, and Medium Enterprises. They create jobs at lower capital cost than large industries and support rural growth.',
        '## Why ERP matters',
        'ERP connects core processes in one system for speed and control. Cloud ERP gives live insights across finance, operations, and HR.',
        '## How TIME ERP helps',
        'TIME ERP brings HRMS, CRM, tasks, projects, billing, and reports into one login so teams avoid duplicate tools and shared data stays clear.',
        'Read the full guide for modules, benefits, industry fit, and FAQs.'
      ]
    }
  ];
  var DEMO_POST = DEMO_POSTS[0];

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function formatDate(iso) {
    try {
      return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
    } catch (e) {
      return iso;
    }
  }

  function renderContent(blocks) {
    if (!blocks || !blocks.length) return '';
    return blocks.map(function (block) {
      if (block.indexOf('## ') === 0) {
        return '<h3>' + escapeHtml(block.slice(3)) + '</h3>';
      }
      return '<p>' + escapeHtml(block) + '</p>';
    }).join('');
  }

  function mapWpPost(wp) {
    var embedded = wp._embedded || {};
    var author = (embedded.author && embedded.author[0] && embedded.author[0].name) || 'TIME ERP';
    var media = embedded['wp:featuredmedia'] && embedded['wp:featuredmedia'][0];
    var terms = embedded['wp:term'] && embedded['wp:term'][0];
    var category = (terms && terms[0] && terms[0].name) || 'Update';
    var rawContent = (wp.content && wp.content.rendered) || '';
    var text = rawContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    var mins = Math.max(3, Math.round(text.split(/\s+/).length / 200));
    return {
      id: wp.id,
      slug: wp.slug,
      title: (wp.title && wp.title.rendered) ? wp.title.rendered.replace(/&#(\d+);/g, function (_, n) { return String.fromCharCode(n); }) : 'Untitled',
      excerpt: ((wp.excerpt && wp.excerpt.rendered) || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
      date: (wp.date || '').slice(0, 10),
      author: author,
      category: category,
      readingTime: mins + ' min',
      image: (media && media.source_url) || 'assets/home-icons/task-blog.svg',
      link: wp.link || '#',
      contentHtml: rawContent
    };
  }

  function fetchPosts() {
    if (!WP_API) {
      return Promise.resolve(DEMO_POSTS.slice());
    }
    return fetch(WP_API + '/wp/v2/posts?_embed&per_page=20')
      .then(function (res) {
        if (!res.ok) throw new Error('WP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (!Array.isArray(data) || !data.length) return [];
        return data.map(mapWpPost);
      })
      .catch(function () {
        return DEMO_POSTS.slice();
      });
  }

  function hasArticlePage(post) {
    return !!(post && post.link && /\.html($|\?|#)/i.test(post.link));
  }

  function postCard(post) {
    var openAttr = hasArticlePage(post)
      ? 'href="' + escapeHtml(post.link) + '"'
      : 'type="button" data-open-post="' + escapeHtml(String(post.id)) + '"';
    var openTag = hasArticlePage(post) ? 'a' : 'button';
    var imageSrc = String(post.image || '').trim();
    if (imageSrc && imageSrc.charAt(0) !== '/' && !/^https?:\/\//i.test(imageSrc)) {
      imageSrc = '/' + imageSrc.replace(/^(\.\/)+/, '');
    }
    return ''
      + '<article class="blog-post" data-id="' + escapeHtml(String(post.id)) + '">'
      +   '<a class="blog-post__cover" href="' + escapeHtml(post.link || '#') + '" aria-hidden="true" tabindex="-1">'
      +     '<div class="blog-post__cover-inner">'
      +       '<img src="' + escapeHtml(imageSrc) + '" alt="' + escapeHtml(post.title || '') + '" width="1200" height="514" loading="lazy" decoding="async">'
      +     '</div>'
      +   '</a>'
      +   '<div class="blog-post__body">'
      +     '<span class="blog-badge">' + escapeHtml(post.category) + '</span>'
      +     '<h2><a href="' + escapeHtml(post.link || '#') + '">' + escapeHtml(post.title) + '</a></h2>'
      +     '<p class="blog-post__excerpt">' + escapeHtml(post.excerpt) + '</p>'
      +     '<div class="blog-meta">'
      +       '<span><span class="material-symbols-outlined" aria-hidden="true">person</span>' + escapeHtml(post.author) + '</span>'
      +       '<span><span class="material-symbols-outlined" aria-hidden="true">calendar_month</span>' + escapeHtml(formatDate(post.date)) + '</span>'
      +       '<span><span class="material-symbols-outlined" aria-hidden="true">schedule</span>' + escapeHtml(post.readingTime) + ' read</span>'
      +     '</div>'
      +     '<div class="blog-post__actions">'
      +       '<' + openTag + ' class="btn btn--primary" ' + openAttr + '>Read article</' + openTag + '>'
      +     '</div>'
      +   '</div>'
      + '</article>';
  }

  function emptyState() {
    return ''
      + '<div class="blog-empty">'
      +   '<span class="material-symbols-outlined" aria-hidden="true">edit_note</span>'
      +   '<strong>No articles yet</strong>'
      +   '<p>When posts are published from WordPress, they will show here automatically.</p>'
      + '</div>';
  }

  function showList() {
    var feed = document.getElementById('blogFeed');
    var article = document.getElementById('blogArticle');
    if (feed) feed.style.display = '';
    if (article) {
      article.classList.remove('is-open');
      article.hidden = true;
    }
  }

  function openPost(post) {
    if (hasArticlePage(post)) {
      window.location.href = post.link;
      return;
    }
    var feed = document.getElementById('blogFeed');
    var article = document.getElementById('blogArticle');
    if (!article || !post) return;
    if (feed) feed.style.display = 'none';
    document.getElementById('blogArticleCat').textContent = post.category;
    document.getElementById('blogArticleTitle').textContent = post.title;
    document.getElementById('blogArticleMeta').innerHTML =
      '<span><span class="material-symbols-outlined" aria-hidden="true">person</span>' + escapeHtml(post.author) + '</span>'
      + '<span><span class="material-symbols-outlined" aria-hidden="true">calendar_month</span>' + escapeHtml(formatDate(post.date)) + '</span>'
      + '<span><span class="material-symbols-outlined" aria-hidden="true">schedule</span>' + escapeHtml(post.readingTime) + ' read</span>';
    var body = document.getElementById('blogArticleBody');
    if (post.contentHtml) body.innerHTML = post.contentHtml;
    else body.innerHTML = renderContent(post.content || []);
    article.hidden = false;
    article.classList.add('is-open');
    article.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function render(posts) {
    var feed = document.getElementById('blogFeed');
    if (!feed) return;
    if (!posts || !posts.length) {
      feed.innerHTML = emptyState();
      return;
    }
    feed.innerHTML = posts.map(postCard).join('');
  }

  var postsCache = [];

  function init() {
    var back = document.getElementById('blogArticleBack');
    if (back) back.addEventListener('click', showList);

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-open-post]');
      if (!btn) return;
      var id = btn.getAttribute('data-open-post');
      var post = postsCache.filter(function (p) { return String(p.id) === String(id); })[0];
      if (post) openPost(post);
    });

    fetchPosts().then(function (posts) {
      postsCache = posts || [];
      render(postsCache);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
