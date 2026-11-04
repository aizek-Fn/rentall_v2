/* =========================================================
   RentAll — interaksi (JavaScript murni, tanpa library)
   Halaman tetap bisa dibaca & dipakai tanpa file ini;
   JavaScript hanya menambah:
   1.  Menu mobile (tutup otomatis) + bayangan header + tombol ke atas
   2.  Penanda menu aktif saat scroll
   3.  Pencarian: validasi tanggal, filter kategori, ringkasan hasil
   4.  Klik kartu kategori -> mengisi pilihan kategori di pencarian
   5.  Angka statistik berhitung + animasi muncul saat scroll
   6.  FAQ: satu jawaban terbuka pada satu waktu
   7.  Modal Masuk / Daftar (fokus, Escape, tanpa lompat ke atas)
   8.  Validasi form + tampil/sembunyikan kata sandi
   9.  Notifikasi kecil (toast)
   ========================================================= */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smooth = reduceMotion ? 'auto' : 'smooth';
  const norm = (t) => String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  const fmtID = (n, d = 0) => new Intl.NumberFormat('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);
  const create = (tag, cls, html) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html) el.innerHTML = html;
    return el;
  };

  /* ---------- 9. Toast ---------- */
  const toastEl = create('div', 'toast');
  toastEl.setAttribute('role', 'status');
  toastEl.setAttribute('aria-live', 'polite');
  document.body.append(toastEl);
  let toastTimer;
  const toast = (msg) => {
    toastEl.textContent = msg;
    toastEl.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-show'), 4500);
  };

  /* ---------- 1. Header, menu mobile, tombol ke atas ---------- */
  const header = $('.site-header');
  const navToggle = $('#nav-toggle');
  const navPanel = $('.nav-panel');
  const burgerLabel = $('.nav-burger .sr-only');

  const setNav = (open) => {
    navToggle.checked = open;
    burgerLabel.textContent = open ? 'Tutup menu navigasi' : 'Buka menu navigasi';
  };
  navToggle.addEventListener('change', () => setNav(navToggle.checked));
  navPanel.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('click', (e) => { if (navToggle.checked && !e.target.closest('.site-header')) setNav(false); });
  window.matchMedia('(min-width: 960px)').addEventListener('change', (e) => { if (e.matches) setNav(false); });

  const toTop = create('button', 'to-top',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 14 6-6 6 6"/></svg>');
  toTop.type = 'button';
  toTop.setAttribute('aria-label', 'Kembali ke atas');
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: smooth }));
  document.body.append(toTop);

  /* ---------- 2. Menu aktif saat scroll ---------- */
  const navLinks = $$('.nav-links a');
  const navTargets = navLinks.map((a) => $(a.getAttribute('href')));

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    toTop.classList.toggle('is-show', window.scrollY > 700);

    const probe = window.scrollY + header.offsetHeight + 120;
    let current = 0;
    navTargets.forEach((t, i) => { if (t && t.getBoundingClientRect().top + window.scrollY <= probe) current = i; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = navLinks.length - 1;
    navLinks.forEach((a, i) => {
      a.classList.toggle('active', i === current);
      if (i === current) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // tautan placeholder (href="#") tidak perlu melompat ke atas halaman
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href="#"]');
    if (a && !a.closest('.modal')) e.preventDefault();
  });

  /* ---------- 3. Pencarian + filter kategori ---------- */
  const searchForm = $('.search-card');
  const qInput = $('#q');
  const catSelect = $('#kategori-pilih');
  const startInput = $('#mulai');
  const endInput = $('#selesai');
  const catSection = $('#kategori');
  const catGrid = $('.cat-grid');
  const cards = $$('.cat-card');

  searchForm.noValidate = true;       // validasi ditangani di bawah (pesan lebih jelas)
  const searchError = create('p', 'search-error');
  searchError.setAttribute('role', 'alert');
  searchError.hidden = true;
  searchForm.after(searchError);

  const resultBar = create('div', 'result-bar');
  resultBar.hidden = true;
  const resultText = create('p', 'result-text');
  resultText.setAttribute('role', 'status');
  resultText.setAttribute('aria-live', 'polite');
  const resultReset = create('button', 'result-reset', 'Reset pencarian');
  resultReset.type = 'button';
  resultBar.append(resultText, resultReset);
  catGrid.before(resultBar);

  const emptyMsg = create('p', 'cat-empty', 'Belum ada kategori yang cocok. Coba kata kunci lain, misalnya <strong>tenda</strong>, <strong>kamera</strong>, atau <strong>sofa</strong>.');
  emptyMsg.hidden = true;
  catGrid.after(emptyMsg);

  const toISO = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const today = toISO(new Date());
  startInput.min = today;
  endInput.min = today;
  const shortDate = (iso) => new Date(iso + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  const rentalDays = () => {
    if (!startInput.value || !endInput.value) return 0;
    return Math.max(1, Math.round((new Date(endInput.value) - new Date(startInput.value)) / 86400000));
  };

  startInput.addEventListener('change', () => {
    endInput.min = startInput.value || today;
    if (endInput.value && startInput.value && endInput.value < startInput.value) endInput.value = startInput.value;
    searchError.hidden = true;
  });
  endInput.addEventListener('change', () => { searchError.hidden = true; });

  const dateError = () => {
    if (Boolean(startInput.value) !== Boolean(endInput.value)) return 'Isi tanggal mulai dan tanggal selesai sekaligus.';
    if (startInput.value && startInput.value < today) return 'Tanggal mulai tidak boleh sebelum hari ini.';
    if (startInput.value && endInput.value < startInput.value) return 'Tanggal selesai tidak boleh lebih awal dari tanggal mulai.';
    return '';
  };

  const applyFilter = () => {
    const terms = norm(qInput.value).split(/[,\s]+/).filter(Boolean);
    const cat = catSelect.value;
    let shown = 0;
    cards.forEach((card) => {
      const name = $('h3', card).textContent.trim();
      const hay = norm(`${name} ${card.dataset.keywords || ''}`);
      const ok = (!cat || name === cat) && (!terms.length || terms.some((t) => hay.includes(t)));
      card.hidden = !ok;
      if (ok) shown += 1;
    });

    const days = rentalDays();
    const parts = [`<strong>${shown} kategori</strong> ditemukan`];
    if (terms.length) parts.push(`“${qInput.value.trim().replace(/[<>&]/g, '')}”`);
    if (cat) parts.push(cat.replace(/&/g, '&amp;'));
    if (days) parts.push(`${shortDate(startInput.value)} – ${shortDate(endInput.value)} (${days} hari)`);
    resultText.innerHTML = parts.join(' · ');
    resultBar.hidden = false;
    emptyMsg.hidden = shown > 0;
    catGrid.hidden = shown === 0;
  };

  const resetFilter = () => {
    searchForm.reset();
    endInput.min = today;
    searchError.hidden = true;
    cards.forEach((c) => { c.hidden = false; });
    resultBar.hidden = true;
    emptyMsg.hidden = true;
    catGrid.hidden = false;
  };

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const err = dateError();
    searchError.textContent = err;
    searchError.hidden = !err;
    if (err) { (startInput.value && endInput.value ? endInput : (startInput.value ? endInput : startInput)).focus(); return; }
    applyFilter();
    catSection.scrollIntoView({ behavior: smooth });
  });
  resultReset.addEventListener('click', resetFilter);

  $('.link-more').addEventListener('click', (e) => {
    e.preventDefault();
    if (!resultBar.hidden) resetFilter();
    catSection.scrollIntoView({ behavior: smooth });
  });

  /* ---------- 4. Klik kartu kategori ---------- */
  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const name = $('h3', card).textContent.trim();
      const option = [...catSelect.options].find((o) => o.textContent.trim() === name);
      if (option) catSelect.value = option.value || option.textContent;
      $('.search').scrollIntoView({ behavior: smooth, block: 'center' });
      setTimeout(() => startInput.focus({ preventScroll: true }), reduceMotion ? 0 : 500);
      toast(`Kategori “${name}” dipilih. Tentukan tanggal sewa, lalu tekan Cari Sekarang.`);
    });
  });

  /* ---------- 5. Counter + animasi muncul ---------- */
  const counters = $$('[data-count]');
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = fmtID(target, dec) + suffix; return; }
    const t0 = performance.now();
    const dur = 1300;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmtID(target * eased, dec) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { runCounter(en.target); countObs.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach((c) => { c.textContent = fmtID(0, parseInt(c.dataset.decimals || '0', 10)) + (c.dataset.suffix || ''); countObs.observe(c); });

    if (!reduceMotion) {
      const revealSel = '.section-head, .cat-card, .why-item, .tentang-text, .stat-card, .faq-intro, .faq-list details, .contact-info, .contact-form';
      const items = $$(revealSel);
      items.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.setProperty('--d', `${(i % 6) * 70}ms`);
      });
      const revObs = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); revObs.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      items.forEach((el) => revObs.observe(el));
    }
  }

  /* ---------- 6. FAQ: satu terbuka sekaligus ---------- */
  const faqs = $$('.faq-list details');
  faqs.forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
  }));

  /* ---------- 7. Modal Masuk / Daftar ---------- */
  const modals = $$('.modal');
  let lastFocus = null;

  const openModal = (id) => {
    const m = document.getElementById(id);
    if (!m) return;
    if (!modals.some((x) => x.classList.contains('is-open'))) lastFocus = document.activeElement;
    modals.forEach((x) => x.classList.toggle('is-open', x === m));
    document.body.classList.add('modal-open');
    setTimeout(() => { const f = $('input', m); if (f) f.focus(); }, 60);
  };
  const closeModals = (restore = true) => {
    modals.forEach((x) => x.classList.remove('is-open'));
    document.body.classList.remove('modal-open');
    if (restore && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    lastFocus = null;
  };

  document.addEventListener('click', (e) => {
    const opener = e.target.closest('a[href="#masuk"], a[href="#daftar"]');
    if (opener) {
      e.preventDefault();
      setNav(false);
      openModal(opener.getAttribute('href').slice(1));
      return;
    }
    if (e.target.closest('.modal-backdrop, .modal-close')) { e.preventDefault(); closeModals(); }
  });

  document.addEventListener('keydown', (e) => {
    const open = modals.find((x) => x.classList.contains('is-open'));
    if (e.key === 'Escape') {
      if (open) closeModals();
      else if (navToggle.checked) setNav(false);
      return;
    }
    if (e.key === 'Tab' && open) {      // fokus tetap di dalam modal
      const f = $$('a[href], button, input, textarea, select', open).filter((el) => !el.disabled && el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // kalau halaman dibuka langsung dengan #masuk / #daftar
  if (['#masuk', '#daftar'].includes(location.hash)) {
    const id = location.hash.slice(1);
    history.replaceState(null, '', location.pathname + location.search);
    openModal(id);
  }

  /* ---------- 8. Validasi form + lihat kata sandi ---------- */
  $$('input[type="password"]').forEach((input) => {
    const wrap = create('span', 'pw-wrap');
    input.replaceWith(wrap);
    const btn = create('button', 'pw-toggle',
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/></svg>');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Tampilkan kata sandi');
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', () => {
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.setAttribute('aria-pressed', String(show));
      btn.setAttribute('aria-label', show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
    });
    wrap.append(input, btn);
  });

  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const labelOf = (el) => {
    const l = el.id && $(`label[for="${el.id}"]`);
    return l ? l.textContent.trim() : 'Kolom ini';
  };
  const clearError = (el) => {
    el.removeAttribute('aria-invalid');
    el.removeAttribute('aria-describedby');
    const old = document.getElementById(`${el.id}-err`);
    if (old) old.remove();
  };
  const setError = (el, msg) => {
    clearError(el);
    const err = create('small', 'field-error', msg);
    err.id = `${el.id}-err`;
    el.setAttribute('aria-invalid', 'true');
    el.setAttribute('aria-describedby', err.id);
    const holder = el.closest('.field') || el.closest('.modal-row');
    if (holder && holder.classList.contains('modal-row')) holder.after(err); else (holder || el.parentElement).append(err);
  };
  const validate = (form) => {
    let firstBad = null;
    $$('input, textarea', form).forEach((el) => {
      clearError(el);
      const val = el.value.trim();
      let msg = '';
      if (el.type === 'checkbox') { if (el.required && !el.checked) msg = 'Centang kotak ini untuk melanjutkan.'; }
      else if (el.required && !val) msg = `${labelOf(el)} wajib diisi.`;
      else if (el.type === 'email' && val && !EMAIL.test(val)) msg = 'Format email belum benar, contoh: nama@email.com.';
      else if (el.minLength > 0 && val && el.value.length < el.minLength) msg = `${labelOf(el)} minimal ${el.minLength} karakter.`;
      if (msg) { setError(el, msg); if (!firstBad) firstBad = el; }
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  };
  const watchForm = (form) => {
    form.noValidate = true;
    form.addEventListener('input', (e) => { if (e.target.id) clearError(e.target); });
    form.addEventListener('change', (e) => { if (e.target.id) clearError(e.target); });
  };

  // Form kontak -> membuka aplikasi email (tidak ada server yang menerima data)
  const contactForm = $('.contact-form');
  watchForm(contactForm);
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate(contactForm)) return;
    const f = new FormData(contactForm);
    const subject = `Pesan dari ${f.get('nama')}`;
    const body = `${f.get('pesan')}\n\nNama: ${f.get('nama')}\nEmail: ${f.get('email')}`;
    toast('Membuka aplikasi email Anda untuk mengirim pesan…');
    window.location.href = `mailto:halo@rentall.id?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  // Form Masuk / Daftar -> belum ada server, jadi hanya divalidasi dan diberi tahu
  $$('.modal form').forEach((form) => {
    watchForm(form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate(form)) return;
      const isRegister = form.closest('.modal').id === 'daftar';
      const nama = isRegister ? String(new FormData(form).get('d-nama')).trim().split(/\s+/)[0] : '';
      form.reset();
      closeModals(false);
      toast(isRegister
        ? `Data valid, ${nama}. (Demo: formulir belum terhubung ke server.)`
        : 'Data valid. (Demo: formulir belum terhubung ke server.)');
    });
  });
})();
