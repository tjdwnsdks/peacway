/**
 * FAQ(.faq-q)·접이식 블록(.toggle-header) 공통: 헤더 다음 형제 요소의 max-height 토글
 * @param {HTMLElement} el 헤더 요소
 */
function toggleAccordionHeader(el) {
  if (!el || typeof el.classList === 'undefined') return;
  var body = el.nextElementSibling;
  if (!body) return;
  el.classList.toggle('open');
  body.style.maxHeight = body.style.maxHeight ? null : body.scrollHeight + 'px';
}

/** programs.html 등 — 기존 onclick 호환 */
function toggleBlock(el) {
  toggleAccordionHeader(el);
}

/** contact.html FAQ — 기존 onclick 호환 */
function toggleFaq(el) {
  toggleAccordionHeader(el);
}

function currentPageFile() {
  var path = window.location.pathname.split('/').pop() || '';
  if (path === '' || path === '/') return 'index.html';
  return path;
}

function setActiveNav() {
  var page = currentPageFile();
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    var href = a.getAttribute('href') || '';
    var file = href.split('/').pop() || '';
    a.classList.toggle('active', file === page);
  });
}

function initMobileNav() {
  var mobileToggle = document.getElementById('mobileToggle');
  var navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
      });
    });
  }
}

function initPatentStoreDownloadClicks() {
  var wrap = document.querySelector('.patent-app-download');
  if (!wrap || wrap.dataset.patentStoreBound === '1') return;
  wrap.dataset.patentStoreBound = '1';
  wrap.addEventListener('click', function(e) {
    var a = e.target.closest('.patent-store-btn');
    if (!a || !wrap.contains(a)) return;
    e.preventDefault();
    var msgEl = document.getElementById('patentDownloadPendingMsg');
    var msg =
      msgEl && msgEl.textContent && msgEl.textContent.trim()
        ? msgEl.textContent.trim()
        : '준비중입니다.';
    window.alert(msg);
  });
}

function initFadeInObserver() {
  var fadeEls = document.querySelectorAll('.fade-in');
  if (!fadeEls.length) return;
  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );
  fadeEls.forEach(function(el) {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initMobileNav();
  setActiveNav();
  initPatentStoreDownloadClicks();
  initFadeInObserver();
});

window.addEventListener('i18n-ready', function() {
  setActiveNav();
  initPatentStoreDownloadClicks();
});
