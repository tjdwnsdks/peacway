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

function showToast(message, type) {
  var host = document.getElementById('toastHost');
  if (!host) {
    host = document.createElement('div');
    host.id = 'toastHost';
    host.className = 'toast-host';
    host.setAttribute('aria-live', 'polite');
    host.setAttribute('aria-atomic', 'true');
    document.body.appendChild(host);
  }

  var toast = document.createElement('div');
  toast.className = 'toast toast-' + (type || 'info');
  toast.textContent = message || '';
  host.appendChild(toast);

  requestAnimationFrame(function() {
    toast.classList.add('show');
  });

  setTimeout(function() {
    toast.classList.remove('show');
    setTimeout(function() {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 180);
  }, 2200);
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
    showToast(msg, 'info');
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

function markFooterEmailsClickable() {
  var targets = document.querySelectorAll('.footer .footer-location-farm, .footer .footer-location-tour');
  if (!targets.length) return;
  targets.forEach(function(el) {
    var text = el.textContent || '';
    if (!text) return;
    var replaced = text.replace(
      /\b(dmzfarmers@gmail\.com|hancodi@gmail\.com)\b/g,
      '<a href="#" class="footer-copy-email" data-email="$1">$1</a>'
    );
    if (replaced !== text) {
      el.innerHTML = replaced;
    }
  });
}

function copyTextFallback(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  var ok = false;
  try {
    ok = document.execCommand('copy');
  } catch (e) {
    ok = false;
  }
  document.body.removeChild(ta);
  return ok;
}

function initFooterEmailCopy() {
  if (document.body.dataset.footerEmailCopyBound === '1') return;
  document.body.dataset.footerEmailCopyBound = '1';
  document.addEventListener('click', function(e) {
    var a = e.target.closest('.footer-copy-email');
    if (!a) return;
    e.preventDefault();
    var email = a.getAttribute('data-email') || a.textContent || '';
    if (!email) return;

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard
        .writeText(email)
        .then(function() {
          showToast('이메일 주소가 복사되었습니다: ' + email, 'success');
        })
        .catch(function() {
          var ok = copyTextFallback(email);
          if (ok) showToast('이메일 주소가 복사되었습니다: ' + email, 'success');
          else showToast('복사에 실패했습니다. 직접 복사해주세요.', 'error');
        });
      return;
    }

    var copied = copyTextFallback(email);
    if (copied) showToast('이메일 주소가 복사되었습니다: ' + email, 'success');
    else showToast('복사에 실패했습니다. 직접 복사해주세요.', 'error');
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initMobileNav();
  setActiveNav();
  initPatentStoreDownloadClicks();
  initFadeInObserver();
  markFooterEmailsClickable();
  initFooterEmailCopy();
});

window.addEventListener('i18n-ready', function() {
  setActiveNav();
  initPatentStoreDownloadClicks();
  markFooterEmailsClickable();
});
