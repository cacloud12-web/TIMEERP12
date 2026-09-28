/**
 * TIME ERP — Add Employee wizard
 */
(function () {
  'use strict';

  var TOTAL_STEPS = 6;
  var state = { step: 0 };

  var PERMISSION_GROUPS = [
    {
      title: 'Manage Settings',
      items: ['Manage Profile', 'View Profile', 'Customer Portal Policy', 'Task Settings', 'Create Branch', 'SMTP Configuration', 'Manage Notification', 'Billing Settings', 'Show & Modify All Task', 'Whatsapp']
    },
    {
      title: 'Customer',
      items: ['Create Customer', 'View Customer', 'Edit Customer', 'Customer Delete/Inactive', 'Download Utility', 'Customer Group', 'Create/Delete Custom Field', 'View Customer Password', '15 CB Form', 'GST', 'Cases']
    },
    {
      title: 'Employee',
      items: ['View Employee', 'Create Employee', 'Edit Employee']
    },
    {
      title: 'Communication',
      items: ['Send SMS', 'Send Email', 'IMAP', 'Send WhatsApp', 'Lead WhatsApp', 'WhatsApp All', 'WhatsApp RM', 'Send Notification']
    },
    {
      title: 'Services',
      items: ['Create Service Request', 'View Service Request', 'Manage Service', 'FAQ', 'Description']
    },
    {
      title: 'Community',
      items: ['Access Community', 'My Offer', 'Transfer Work', 'Received Work', 'Chat', 'Create Post']
    },
    {
      title: 'Tasks',
      items: ['View Task/Recurring Task', 'Create Task/Recurring Task', 'Task Customer', 'Update Task Stages', 'Task Stages', 'Create Task For Self', 'Create Task For Other', 'Delete Task/Recurring Task', 'Show Deleted Task', 'Task Action Buttons', 'Edit Task/Recurring Task']
    },
    {
      title: 'Edit Task',
      items: ['Task Name', 'Task Assignee', 'Task Reporter', 'Task Consultant', 'Task Service', 'Task Target Date', 'Task Priority', 'Task Due Date', 'Task Description', 'Task Complete', 'Show Completed Task', 'Tags']
    },
    {
      title: 'Documents',
      items: ['Create Documents', 'Delete Documents', 'View Documents', 'Share Documents', 'Add Documents', 'Add to Documents', 'Add Expiry', 'FAR View', 'FAR Add']
    },
    {
      title: 'Billing',
      items: ['Access To Billing Dashboard', 'Add Invoice', 'View Invoice', 'Proforma Invoice', 'Receipts', 'CN & DN', 'Opening Balance', 'Reported Transaction']
    },
    {
      title: 'HRMS',
      items: ['HR Management', 'Team Management']
    },
    {
      title: 'Payroll',
      items: ['Payroll Basic', 'Verify Pay Details']
    },
    {
      title: 'Report',
      items: ['Feedback report', 'Income report', 'Revenue report', 'Service Request report', 'Customer report', 'Task report', 'Partner report', 'Inward Outward report']
    },
    {
      title: 'Lead Management',
      items: ['Lead Access', 'Lead Add']
    },
    {
      title: 'Website',
      items: []
    }
  ];

  var CHEVRON = '<svg class="ae-perm-group__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var INFO_ICON = '<span class="ae-perm-group__info" title="Info" aria-hidden="true">i</span>';

  function toast(title, detail) {
    if (window.DashboardShell && window.DashboardShell.toast) {
      window.DashboardShell.toast(title, detail || '');
      return;
    }
    var stack = document.getElementById('toastStack');
    if (!stack) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<strong>' + title + '</strong>' + (detail ? '<span>' + detail + '</span>' : '');
    stack.appendChild(el);
    setTimeout(function () { el.remove(); }, 2800);
  }

  function switchLabel(on) { return on ? 'YES' : 'NO'; }

  function syncToggleText(input) {
    var text = input.parentElement && input.parentElement.querySelector('.ae-switch__text');
    if (text) text.textContent = switchLabel(input.checked);
  }

  function buildPermissionsInto(list, idPrefix) {
    if (!list) return;
    idPrefix = idPrefix || 'aePerm';
    var html = '';
    PERMISSION_GROUPS.forEach(function (group, gi) {
      var itemsHtml = '';
      if (!group.items.length) {
        itemsHtml = '<div class="ae-perm-empty">No permissions in this group</div>';
      } else {
        itemsHtml = '<div class="ae-perm-grid">' + group.items.map(function (label, ii) {
          var id = idPrefix + '_' + gi + '_' + ii;
          return (
            '<label class="ae-perm-item" for="' + id + '">' +
              '<span class="ae-switch ae-switch--sm">' +
                '<input type="checkbox" id="' + id + '" data-perm-item data-group="' + gi + '">' +
                '<span class="ae-switch__track"><span class="ae-switch__knob"></span></span>' +
              '</span>' +
              '<span class="ae-perm-item__label">' + label + '</span>' +
            '</label>'
          );
        }).join('') + '</div>';
      }
      var openClass = (!group.items.length) ? '' : ' is-open';
      html +=
        '<div class="ae-perm-group' + openClass + '" data-group-index="' + gi + '">' +
          '<div class="ae-perm-group__head" data-perm-toggle>' +
            '<input type="checkbox" class="ae-perm-group__check" data-group-check="' + gi + '" aria-label="Select all ' + group.title + '">' +
            '<span class="ae-perm-group__title">' + group.title + '</span>' +
            INFO_ICON +
            CHEVRON +
          '</div>' +
          '<div class="ae-perm-group__body">' + itemsHtml + '</div>' +
        '</div>';
    });
    list.innerHTML = html;
  }

  function buildPermissions() {
    buildPermissionsInto(document.getElementById('aePermList'), 'aePerm');
    buildPermissionsInto(document.getElementById('aeDesigPermList'), 'aeDesigPerm');
  }

  function goToStep(step) {
    if (step < 0 || step >= TOTAL_STEPS) return;
    state.step = step;

    document.querySelectorAll('.ae-panel').forEach(function (panel) {
      panel.classList.toggle('is-active', Number(panel.getAttribute('data-panel')) === step);
    });

    document.querySelectorAll('.ae-stepper__item').forEach(function (item) {
      var i = Number(item.getAttribute('data-step'));
      item.classList.toggle('is-active', i === step);
      item.classList.toggle('is-done', i < step);
    });

    var prevBtn = document.getElementById('aePrevBtn');
    var nextBtn = document.getElementById('aeNextBtn');
    var footer = document.getElementById('aeFooter');
    if (prevBtn) prevBtn.hidden = step === 0;
    if (nextBtn) nextBtn.textContent = step === TOTAL_STEPS - 1 ? 'Submit' : 'Next';
    /* Emergency Contacts: buttons sit under the input column */
    if (footer) footer.classList.toggle('ae-footer--inset', step === 4);

    var page = document.getElementById('aePage');
    if (page) page.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function validateStep0() {
    var fields = [
      { id: 'aeName', key: 'name', label: 'Name' },
      { id: 'aeMobile1', key: 'mobile1', label: 'Mobile No 1' },
      { id: 'aeEmail', key: 'email', label: 'Email Id' },
      { id: 'aeManager', key: 'manager', label: 'Manager' }
    ];
    var missing = [];
    fields.forEach(function (f) {
      var el = document.getElementById(f.id);
      var wrap = document.querySelector('[data-required="' + f.key + '"]');
      var ok = el && String(el.value || '').trim() !== '';
      if (wrap) wrap.classList.toggle('is-invalid', !ok);
      if (!ok) missing.push(f.label);
    });
    if (missing.length) {
      toast('Required fields missing', 'Please fill: ' + missing.join(', '));
      return false;
    }
    return true;
  }

  function clearInvalidOnInput(e) {
    var field = e.target.closest('[data-required]');
    if (field && String(e.target.value || '').trim()) field.classList.remove('is-invalid');
  }

  function bindToggles(root) {
    (root || document).querySelectorAll('[data-toggle-label]').forEach(function (input) {
      syncToggleText(input);
      input.addEventListener('change', function () { syncToggleText(input); });
    });
  }

  function bindPermissionsRoot(list) {
    if (!list || list.dataset.bound === '1') return;
    list.dataset.bound = '1';

    list.addEventListener('click', function (e) {
      if (e.target.closest('.ae-perm-group__info')) return;
      var head = e.target.closest('[data-perm-toggle]');
      if (!head || e.target.matches('[data-group-check]')) return;
      var group = head.closest('.ae-perm-group');
      if (group) group.classList.toggle('is-open');
    });

    list.addEventListener('change', function (e) {
      var t = e.target;
      if (t.matches('[data-group-check]')) {
        var gi = t.getAttribute('data-group-check');
        list.querySelectorAll('[data-perm-item][data-group="' + gi + '"]').forEach(function (cb) {
          cb.checked = t.checked;
        });
        return;
      }
      if (t.matches('[data-perm-item]')) {
        var groupIdx = t.getAttribute('data-group');
        var items = list.querySelectorAll('[data-perm-item][data-group="' + groupIdx + '"]');
        var allOn = true;
        items.forEach(function (cb) { if (!cb.checked) allOn = false; });
        var groupCheck = list.querySelector('[data-group-check="' + groupIdx + '"]');
        if (groupCheck) groupCheck.checked = allOn && items.length > 0;
      }
    });
  }

  function bindPermissions() {
    bindPermissionsRoot(document.getElementById('aePermList'));
    bindPermissionsRoot(document.getElementById('aeDesigPermList'));
  }

  function openDesignationModal() {
    var modal = document.getElementById('aeDesigModal');
    if (!modal) return;
    var name = document.getElementById('aeDesigName');
    var desc = document.getElementById('aeDesigDesc');
    if (name) name.value = '';
    if (desc) desc.value = '';
    var list = document.getElementById('aeDesigPermList');
    if (list) {
      list.querySelectorAll('input[type="checkbox"]').forEach(function (cb) { cb.checked = false; });
      list.querySelectorAll('.ae-perm-group').forEach(function (g, i) {
        var empty = !PERMISSION_GROUPS[i] || !PERMISSION_GROUPS[i].items.length;
        g.classList.toggle('is-open', !empty);
      });
    }
    modal.hidden = false;
    document.body.classList.add('ae-modal-open');
    if (name) setTimeout(function () { name.focus(); }, 50);
  }

  function closeDesignationModal() {
    var modal = document.getElementById('aeDesigModal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('ae-modal-open');
  }

  function bindDesignationModal() {
    var modal = document.getElementById('aeDesigModal');
    if (!modal) return;
    modal.querySelectorAll('[data-desig-close]').forEach(function (btn) {
      btn.addEventListener('click', closeDesignationModal);
    });
    var saveBtn = document.getElementById('aeDesigSave');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        var name = document.getElementById('aeDesigName');
        if (name && !String(name.value || '').trim()) {
          name.focus();
          toast('Required', 'Please enter a designation name.');
          return;
        }
        toast('Designation saved', name ? name.value.trim() : '');
        closeDesignationModal();
      });
    }
  }

  function bindProfilePreview() {
    var input = document.getElementById('aeProfileFile');
    var preview = document.getElementById('aeAvatarPreview');
    if (!input || !preview) return;
    input.addEventListener('change', function () {
      var file = input.files && input.files[0];
      if (!file) return;
      var url = URL.createObjectURL(file);
      preview.innerHTML = '<img src="' + url + '" alt="Profile preview">';
    });
  }

  function bindDocuments() {
    var input = document.getElementById('aeDocFile');
    var list = document.getElementById('aeDocList');
    if (!input || !list) return;
    input.addEventListener('change', function () {
      list.innerHTML = '';
      Array.prototype.forEach.call(input.files || [], function (file) {
        var row = document.createElement('div');
        row.className = 'ae-docs__file';
        row.textContent = file.name;
        list.appendChild(row);
      });
      if (input.files && input.files.length) {
        toast('Documents added', input.files.length + ' file(s) ready to upload');
      }
    });
  }

  function submitEmployee() {
    toast('Employee added', 'Employee saved successfully.');
    setTimeout(function () {
      window.location.href = 'viewemployee.html';
    }, 900);
  }

  function init() {
    buildPermissions();
    bindToggles(document);
    bindPermissions();
    bindProfilePreview();
    bindDocuments();
    goToStep(0);

    document.getElementById('aeStepper').addEventListener('click', function (e) {
      var item = e.target.closest('.ae-stepper__item');
      if (!item) return;
      goToStep(Number(item.getAttribute('data-step')));
    });

    document.getElementById('aePrevBtn').addEventListener('click', function () {
      goToStep(state.step - 1);
    });

    document.getElementById('aeNextBtn').addEventListener('click', function () {
      if (state.step === 0 && !validateStep0()) return;
      if (state.step === TOTAL_STEPS - 1) {
        submitEmployee();
        return;
      }
      goToStep(state.step + 1);
    });

    bindDesignationModal();
    document.getElementById('aeDesignationBtn').addEventListener('click', openDesignationModal);
    document.getElementById('aeDesignationSets').addEventListener('click', openDesignationModal);

    ['aeName', 'aeMobile1', 'aeEmail', 'aeManager'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', clearInvalidOnInput);
      if (el) el.addEventListener('change', clearInvalidOnInput);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
