(function () {
  "use strict";

  var API = '/api';

  var state = {
    viewYear: new Date().getFullYear(),
    viewMonth: new Date().getMonth(), // 0-indexed
    filter: 'all',
    search: '',
    openId: null,
    pauseTargetId: null,
    customers: [], // last fetched list (already annotated with status + bill)
  };

  // ---------- tiny fetch helpers ----------
  function qs(params) {
    var parts = [];
    Object.keys(params).forEach(function (k) {
      if (params[k] !== undefined && params[k] !== null && params[k] !== '') {
        parts.push(encodeURIComponent(k) + '=' + encodeURIComponent(params[k]));
      }
    });
    return parts.length ? '?' + parts.join('&') : '';
  }
  async function apiGet(path) {
    var res = await fetch(API + path);
    if (!res.ok) throw new Error('Request failed: ' + path);
    return res.json();
  }
  async function apiSend(method, path, body) {
    var res = await fetch(API + path, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      var err = await res.json().catch(function () { return {}; });
      throw new Error(err.error || 'Request failed: ' + path);
    }
    if (res.status === 204) return null;
    return res.json();
  }

  // ---------- date helpers (for labels only; billing math lives server-side) ----------
  function todayISO() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function fromISO(s) {
    var p = s.split('-').map(Number);
    return new Date(p[0], p[1] - 1, p[2]);
  }
  function monthLabel(y, m) {
    return new Date(y, m, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  }
  function fmtDate(iso) {
    return fromISO(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function fmtMoney(n) {
    return '₹' + Math.round(n).toLocaleString('en-IN');
  }
  function initials(name) {
    return name.trim().split(/\s+/).slice(0, 2).map(function (w) { return w[0] || ''; }).join('').toUpperCase();
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  // ---------- data loading ----------
  async function refresh() {
    var period = { year: state.viewYear, month: state.viewMonth };
    var [customers, summary] = await Promise.all([
      apiGet('/customers' + qs({ search: state.search, status: state.filter, year: period.year, month: period.month })),
      apiGet('/summary' + qs(period)),
    ]);
    state.customers = customers;
    render(summary);
  }

  // ---------- rendering ----------
  function render(summary) {
    document.getElementById('monthLabel').textContent = monthLabel(state.viewYear, state.viewMonth);

    document.getElementById('heroTotal').textContent = fmtMoney(summary.total);
    document.getElementById('countActive').textContent = summary.active;
    document.getElementById('countPaused').textContent = summary.paused;

    var now = new Date();
    var isCurrentMonth = state.viewYear === now.getFullYear() && state.viewMonth === now.getMonth();
    document.getElementById('heroLabel').textContent = isCurrentMonth
      ? 'expected this month'
      : 'billed for ' + monthLabel(state.viewYear, state.viewMonth);

    var listEl = document.getElementById('list');
    listEl.innerHTML = '';
    document.getElementById('emptyState').style.display = state.customers.length === 0 && !state.search && state.filter === 'all' ? 'block' : 'none';

    state.customers.forEach(function (c) {
      var isOpen = state.openId === c.id;
      var b = c.bill;

      var card = document.createElement('div');
      card.className = 'card';

      var row = document.createElement('div');
      row.className = 'card-row';
      row.innerHTML =
        '<div class="avatar">' + initials(c.name) + '</div>' +
        '<div class="card-main">' +
          '<div class="card-name">' + escapeHtml(c.name) + '</div>' +
          '<div class="card-phone">' + escapeHtml(c.phone) + '</div>' +
        '</div>' +
        '<span class="pill ' + (c.status === 'active' ? 'pill-active' : 'pill-paused') + '">' + (c.status === 'active' ? 'Active' : 'Paused') + '</span>' +
        '<div class="card-right">' +
          '<div>' +
            '<div class="bill-amt">' + fmtMoney(b.bill) + '</div>' +
            '<div class="bill-sub">' + b.deliveredWeekdays + ' / ' + b.totalWeekdaysInMonth + ' days</div>' +
          '</div>' +
        '</div>' +
        '<div class="chev ' + (isOpen ? 'open' : '') + '">›</div>';
      row.addEventListener('click', function () {
        state.openId = isOpen ? null : c.id;
        render(summary);
      });
      card.appendChild(row);

      var detail = document.createElement('div');
      detail.className = 'detail' + (isOpen ? ' open' : '');
      if (isOpen) {
        detail.innerHTML = buildDetail(c, b);
        wireDetailEvents(detail, c.id);
      }
      card.appendChild(detail);

      listEl.appendChild(card);
    });
  }

  function buildDetail(c, b) {
    var pausesHtml = c.pauses.length
      ? c.pauses.map(function (p, idx) {
          var range = fmtDate(p.start) + ' → ' + (p.end ? fmtDate(p.end) : 'ongoing');
          return '<div class="pause-item"><span>' + range + '</span><button data-remove-pause="' + idx + '">Remove</button></div>';
        }).join('')
      : '<div class="hint" style="margin:0 0 10px;">No pauses recorded.</div>';

    return (
      '<div class="detail-grid">' +
        '<div class="kv"><div class="k">Plan price</div><div class="v">' + fmtMoney(c.planPrice) + ' / month</div></div>' +
        '<div class="kv"><div class="k">Customer since</div><div class="v">' + fmtDate(c.startDate) + '</div></div>' +
      '</div>' +
      '<div class="bill-box">' +
        '<div class="bill-line"><span>Weekdays in month</span><span>' + b.totalWeekdaysInMonth + '</span></div>' +
        '<div class="bill-line"><span>Paused weekdays</span><span>−' + b.pausedWeekdays + '</span></div>' +
        '<div class="bill-line"><span>Per-day rate</span><span>' + fmtMoney(b.perDay) + '</span></div>' +
        '<div class="bill-line total"><span>Bill for ' + monthLabel(state.viewYear, state.viewMonth) + '</span><span>' + fmtMoney(b.bill) + '</span></div>' +
      '</div>' +
      '<div class="pause-list">' + pausesHtml + '</div>' +
      '<div class="row-actions">' +
        (c.status === 'paused'
          ? '<button class="btn btn-primary btn-small" data-resume>Resume today</button>'
          : '<button class="btn btn-ghost btn-small" data-pause>Pause deliveries</button>') +
        '<button class="btn btn-danger-outline btn-small" data-delete>Remove customer</button>' +
      '</div>'
    );
  }

  function wireDetailEvents(detailEl, customerId) {
    var pauseBtn = detailEl.querySelector('[data-pause]');
    var resumeBtn = detailEl.querySelector('[data-resume]');
    var deleteBtn = detailEl.querySelector('[data-delete]');
    var removePauseBtns = detailEl.querySelectorAll('[data-remove-pause]');

    if (pauseBtn) pauseBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      openPauseModal(customerId);
    });
    if (resumeBtn) resumeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      apiSend('POST', '/customers/' + customerId + '/resume').then(refresh).catch(showError);
    });
    if (deleteBtn) deleteBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (confirm('Remove this customer? This cannot be undone.')) {
        apiSend('DELETE', '/customers/' + customerId).then(function () {
          state.openId = null;
          refresh();
        }).catch(showError);
      }
    });
    removePauseBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var idx = btn.getAttribute('data-remove-pause');
        apiSend('DELETE', '/customers/' + customerId + '/pauses/' + idx).then(refresh).catch(showError);
      });
    });
  }

  function showError(err) {
    alert(err.message || 'Something went wrong.');
  }

  // ---------- add customer modal ----------
  var addOverlay = document.getElementById('addOverlay');
  document.getElementById('openAdd').addEventListener('click', function () {
    document.getElementById('cName').value = '';
    document.getElementById('cPhone').value = '';
    document.getElementById('cPrice').value = '';
    document.getElementById('cStart').value = todayISO();
    document.getElementById('addError').style.display = 'none';
    addOverlay.classList.add('open');
  });
  document.getElementById('cancelAdd').addEventListener('click', function () { addOverlay.classList.remove('open'); });
  addOverlay.addEventListener('click', function (e) { if (e.target === addOverlay) addOverlay.classList.remove('open'); });

  document.getElementById('saveAdd').addEventListener('click', function () {
    var name = document.getElementById('cName').value.trim();
    var phone = document.getElementById('cPhone').value.trim();
    var price = parseFloat(document.getElementById('cPrice').value);
    var start = document.getElementById('cStart').value || todayISO();

    if (!name || !phone || !price || price <= 0) {
      document.getElementById('addError').style.display = 'block';
      return;
    }
    apiSend('POST', '/customers', { name: name, phone: phone, planPrice: price, startDate: start })
      .then(function () {
        addOverlay.classList.remove('open');
        return refresh();
      })
      .catch(showError);
  });

  // ---------- pause modal ----------
  var pauseOverlay = document.getElementById('pauseOverlay');
  function openPauseModal(id) {
    state.pauseTargetId = id;
    document.getElementById('pStart').value = todayISO();
    document.getElementById('pEnd').value = '';
    document.getElementById('pauseError').style.display = 'none';
    pauseOverlay.classList.add('open');
  }
  document.getElementById('cancelPause').addEventListener('click', function () { pauseOverlay.classList.remove('open'); });
  pauseOverlay.addEventListener('click', function (e) { if (e.target === pauseOverlay) pauseOverlay.classList.remove('open'); });

  document.getElementById('savePause').addEventListener('click', function () {
    var start = document.getElementById('pStart').value;
    var end = document.getElementById('pEnd').value;
    if (!start) return;
    if (end && end < start) {
      document.getElementById('pauseError').style.display = 'block';
      return;
    }
    apiSend('POST', '/customers/' + state.pauseTargetId + '/pause', { start: start, end: end || null })
      .then(function () {
        pauseOverlay.classList.remove('open');
        return refresh();
      })
      .catch(showError);
  });

  // ---------- controls ----------
  var searchTimer;
  document.getElementById('search').addEventListener('input', function (e) {
    state.search = e.target.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(refresh, 200); // debounce
  });
  document.getElementById('tabs').addEventListener('click', function (e) {
    var btn = e.target.closest('.tab');
    if (!btn) return;
    document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
    btn.classList.add('active');
    state.filter = btn.getAttribute('data-filter');
    refresh();
  });
  document.getElementById('prevMonth').addEventListener('click', function () {
    state.viewMonth--; if (state.viewMonth < 0) { state.viewMonth = 11; state.viewYear--; }
    refresh();
  });
  document.getElementById('nextMonth').addEventListener('click', function () {
    state.viewMonth++; if (state.viewMonth > 11) { state.viewMonth = 0; state.viewYear++; }
    refresh();
  });

  // ---------- init ----------
  refresh().catch(showError);
})();
