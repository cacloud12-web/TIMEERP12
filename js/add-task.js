/**
 * Add Task page
 */
(function() {
  'use strict';

  var clock = document.getElementById('dvTopClock');
  function tick() {
    if (!clock) return;
    var d = new Date(), h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
    var ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12;
    clock.textContent = h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + ' ' + ap;
  }
  tick(); setInterval(tick, 1000);

  var title = document.getElementById('taskTitle');
  var count = document.getElementById('titleCount');
  if (title && count) {
    title.addEventListener('input', function() {
      count.textContent = title.value.length + ' / 200';
    });
  }

  document.querySelectorAll('.at-status-pill').forEach(function(pill) {
    pill.addEventListener('click', function() {
      document.querySelectorAll('.at-status-pill').forEach(function(p) { p.classList.remove('is-active'); });
      pill.classList.add('is-active');
    });
  });

  document.querySelectorAll('.at-accordion').forEach(function(acc) {
    var btn = acc.querySelector('.at-acc-btn');
    if (!btn) return;
    btn.addEventListener('click', function() { acc.classList.toggle('is-open'); });
  });

  var stagesList = document.getElementById('stagesList');
  var addStageBtn = document.getElementById('addStageBtn');
  var stageRowHtml =
    '<div class="at-stage-row">' +
      '<select><option value="">Select Stage</option><option>A</option><option>B</option><option>C</option><option>Preparation</option><option>Review</option></select>' +
      '<select><option value="">Select Assignee</option><option>Ankit Sharma</option><option>Deepak Agarwal</option><option>Saksham</option></select>' +
      '<input type="text" placeholder="Enter Weightage">' +
      '<button type="button" class="at-stage-del" title="Remove stage" aria-label="Remove stage"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></svg></button>' +
    '</div>';

  if (addStageBtn && stagesList) {
    addStageBtn.addEventListener('click', function() {
      stagesList.insertAdjacentHTML('beforeend', stageRowHtml);
    });
  }
  if (stagesList) {
    stagesList.addEventListener('click', function(e) {
      var del = e.target.closest('.at-stage-del');
      if (!del) return;
      var row = del.closest('.at-stage-row');
      if (row && stagesList.querySelectorAll('.at-stage-row').length > 1) row.remove();
    });
  }

  var form = document.getElementById('addTaskForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      window.location.href = 'task_management.html';
    });
  }
})();
