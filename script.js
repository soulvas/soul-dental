/* SOUL dental clinic — script.js */

/* ===== БУРГЕР-МЕНЮ ===== */
(function () {
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ===== ВЫПАДАЮЩИЙ СПИСОК УСЛУГ (мобильные) ===== */
(function () {
  var dropdownLinks = document.querySelectorAll('.nav__item > .nav__link');
  dropdownLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var item = link.parentElement;
      var dropdown = item.querySelector('.nav__dropdown');
      if (!dropdown) return;
      if (window.innerWidth <= 960) {
        e.preventDefault();
        item.classList.toggle('is-open');
      }
    });
  });
})();


/* ===== КОМПАКТНАЯ ШАПКА + ПЛАВАЮЩАЯ КНОПКА ===== */
(function () {
  var header = document.querySelector('.header');
  var floatBtn = document.getElementById('floatBtn');

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('header--compact', y > 60);
    if (floatBtn) floatBtn.classList.toggle('is-visible', y > 300);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ===== FAQ АККОРДЕОН ===== */
function toggleFaq(btn) {
  var item = btn.parentElement;
  item.classList.toggle('is-open');
}


/* ===== ФОРМА ЗАПИСИ (заглушка) ===== */
function sendForm(event, formId) {
  event.preventDefault();
  var form = document.getElementById(formId);
  var successBlock = document.getElementById('success-' + formId);
  if (!form || !successBlock) return;

  var phoneInput = form.querySelector('input[type="tel"]');
  if (phoneInput) {
    var digits = phoneInput.value.replace(/\D/g, '');
    if (digits.length < 10) {
      phoneInput.style.borderColor = '#D85A30';
      phoneInput.focus();
      return;
    }
    phoneInput.style.borderColor = '';
  }

  var fields = form.querySelectorAll('div:not(.form-record__success):not(.form-record__buttons), .form-record__buttons');
  fields.forEach(function (el) { el.style.display = 'none'; });
  successBlock.style.display = 'block';

  setTimeout(function () {
    form.reset();
    fields.forEach(function (el) { el.style.display = ''; });
    successBlock.style.display = 'none';
  }, 8000);
}


/* ===== МАСКА ТЕЛЕФОНА ===== */
(function () {
  document.querySelectorAll('input[type="tel"]').forEach(function (input) {
    input.addEventListener('input', function () {
      var digits = input.value.replace(/\D/g, '');
      if (digits.startsWith('7') || digits.startsWith('8')) digits = digits.slice(1);
      digits = digits.slice(0, 10);
      var f = '';
      if (digits.length > 0) f = '+7 (' + digits.slice(0, 3);
      if (digits.length >= 3) f += ') ' + digits.slice(3, 6);
      if (digits.length >= 6) f += '-' + digits.slice(6, 8);
      if (digits.length >= 8) f += '-' + digits.slice(8, 10);
      input.value = f;
    });
  });
})();


/* ===== ПЛЕЕР-ЗАГЛУШКА (кнопка в блоке музыки) ===== */
(function () {
  var playBtn = document.querySelector('.player-stub__btn');
  if (!playBtn) return;
  var playing = false;
  playBtn.addEventListener('click', function () {
    playing = !playing;
    playBtn.textContent = playing ? '⏸' : '▶';
  });
})();


/* ===== SAX MUSIC BUTTON ===== */
(function () {
  var btn = document.getElementById('vinylBtn');
  if (!btn) return;
  btn.addEventListener('click', function () {
    btn.setAttribute('data-hint', 'Подборка появится позже');
    setTimeout(function () { btn.removeAttribute('data-hint'); }, 3000);
  });
})();


/* ===== MAX PENDING TOOLTIP ===== */
function showMaxPending(e) {
  e.preventDefault();
  var toast = document.getElementById('max-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'max-toast';
    toast.style.cssText = [
      'position:fixed', 'bottom:110px', 'left:50%', 'transform:translateX(-50%)',
      'background:#04342C', 'color:#fff', 'padding:12px 22px',
      'border-radius:10px', 'font-size:0.88rem', 'font-family:inherit',
      'z-index:9999', 'white-space:nowrap', 'box-shadow:0 4px 18px rgba(4,52,44,0.35)',
      'pointer-events:none', 'transition:opacity 0.3s'
    ].join(';');
    document.body.appendChild(toast);
  }
  toast.textContent = 'Ссылка на MAX будет добавлена после подтверждения клиникой';
  toast.style.opacity = '1';
  clearTimeout(toast._t);
  toast._t = setTimeout(function () { toast.style.opacity = '0'; }, 3500);
}

/* ===== SCROLL REVEAL ===== */
(function () {
  var SELECTORS = [
    '.card-service', '.why-item', '.card-review', '.card-doctor',
    '.step', '.faq-item', '.indication-item', '.situation-item',
    '.hero__content', '.hero__photo', '.founder',
    '.section-title', '.section-label', '.page-hero h1',
  ];

  var els = document.querySelectorAll(SELECTORS.join(','));
  if (!els.length) return;

  /* Назначаем задержки для элементов в одном родителе */
  var seen = new Map();
  els.forEach(function (el) {
    var parent = el.parentElement;
    var idx = seen.get(parent) || 0;
    seen.set(parent, idx + 1);
    el.classList.add('reveal-ready');
    if (idx > 0) el.setAttribute('data-delay', Math.min(idx, 4));
  });

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  els.forEach(function (el) { obs.observe(el); });
})();


/* ===== АНИМИРОВАННЫЕ СЧЁТЧИКИ ===== */
(function () {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function animate(el) {
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || '';
    var isFloat = el.dataset.count.includes('.');
    var duration = 1400;
    var start = performance.now();

    function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = (isFloat ? val.toFixed(1) : Math.floor(val)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animate(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { obs.observe(el); });
})();
