function toggleBlock(el) {
  el.classList.toggle('open');
  const body = el.nextElementSibling;
  body.style.maxHeight = body.style.maxHeight ? null : body.scrollHeight + 'px';
}

function toggleFaq(el) {
  el.classList.toggle('open');
  const body = el.nextElementSibling;
  body.style.maxHeight = body.style.maxHeight ? null : body.scrollHeight + 'px';
}

function currentPageFile() {
  let path = window.location.pathname.split('/').pop() || '';
  if (path === '' || path === '/') return 'index.html';
  return path;
}

function setActiveNav() {
  const page = currentPageFile();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const file = href.split('/').pop() || '';
    a.classList.toggle('active', file === page);
  });
}

document.getElementById('mobileToggle').addEventListener('click', function() {
  document.getElementById('navLinks').classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function() {
    document.getElementById('navLinks').classList.remove('open');
  });
});

function initPatentStoreDownloadClicks() {
  const wrap = document.querySelector('.patent-app-download');
  if (!wrap || wrap.dataset.patentStoreBound === '1') return;
  wrap.dataset.patentStoreBound = '1';
  wrap.addEventListener('click', function (e) {
    const a = e.target.closest('.patent-store-btn');
    if (!a || !wrap.contains(a)) return;
    e.preventDefault();
    const msgEl = document.getElementById('patentDownloadPendingMsg');
    const msg =
      msgEl && msgEl.textContent && msgEl.textContent.trim()
        ? msgEl.textContent.trim()
        : '준비중입니다.';
    window.alert(msg);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initPatentStoreDownloadClicks();
});

window.addEventListener('i18n-ready', () => {
  setActiveNav();
  initPatentStoreDownloadClicks();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
