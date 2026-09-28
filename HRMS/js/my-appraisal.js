(function () {
  'use strict';

  var GOALS_BY_CYCLE = {
    '2026-27': [
      {
        title: 'Quality',
        weight: '100.00',
        rows: [
          { goal: 'Quality', description: '--', weight: '100.00', priority: 'medium', targetDate: '04/08/2026' }
        ]
      }
    ],
    itr: []
  };

  var tabs = document.querySelectorAll('.ma-tab');
  var panelGoals = document.getElementById('maPanelGoals');
  var panelSelf = document.getElementById('maPanelSelf');
  var cycleGoals = document.getElementById('maCycleGoals');
  var cycleSelf = document.getElementById('maCycleSelf');
  var goalsList = document.getElementById('maGoalsList');
  var selfEmpty = document.getElementById('maSelfEmpty');
  var activeTab = 'goals';

  function goalBlockHtml(block) {
    var rows = block.rows.map(function (row) {
      return '<tr>' +
        '<td>' + row.goal + '</td>' +
        '<td>' + row.description + '</td>' +
        '<td>' + row.weight + '</td>' +
        '<td><span class="ma-priority">' + row.priority + '</span></td>' +
        '<td>' + row.targetDate + '</td>' +
      '</tr>';
    }).join('');

    return '<article class="ma-goal-block">' +
      '<div class="ma-goal-block__head">' +
        '<h2 class="ma-goal-block__title">' + block.title + '</h2>' +
        '<span class="ma-goal-block__weight">Weight ' + block.weight + '%</span>' +
      '</div>' +
      '<div class="ma-goal-table-wrap">' +
        '<table class="ma-goal-table">' +
          '<thead><tr>' +
            '<th>Goal</th><th>Description</th><th>Weight %</th><th>Priority</th><th>Target Date</th>' +
          '</tr></thead>' +
          '<tbody>' + rows + '</tbody>' +
        '</table>' +
      '</div>' +
    '</article>';
  }

  function renderGoals() {
    if (!goalsList || !cycleGoals) return;
    var cycle = cycleGoals.value;
    var blocks = GOALS_BY_CYCLE[cycle] || [];
    goalsList.innerHTML = blocks.map(goalBlockHtml).join('');
  }

  function renderSelf() {
    if (!selfEmpty || !cycleSelf) return;
    var cycle = cycleSelf.value;
    selfEmpty.hidden = !cycle;
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var key = tab.getAttribute('data-tab');
      if (!key || key === activeTab) return;
      activeTab = key;
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-tab') === key;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (panelGoals) {
        var showGoals = key === 'goals';
        panelGoals.classList.toggle('is-active', showGoals);
        panelGoals.hidden = !showGoals;
      }
      if (panelSelf) {
        var showSelf = key === 'self';
        panelSelf.classList.toggle('is-active', showSelf);
        panelSelf.hidden = !showSelf;
      }
    });
  });

  if (cycleGoals) {
    cycleGoals.addEventListener('change', renderGoals);
  }
  if (cycleSelf) {
    cycleSelf.addEventListener('change', renderSelf);
  }

  renderGoals();
  renderSelf();
})();
