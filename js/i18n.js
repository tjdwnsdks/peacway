(function() {
  'use strict';

  const STORAGE_KEY = 'peaceway_lang';
  const LANGS = ['ko', 'en', 'ja', 'zh-CN', 'zh-TW'];

  const initialTitle = document.title;
  const descMeta = document.querySelector('meta[name="description"]');
  const initialDesc = descMeta ? (descMeta.getAttribute('content') || '') : '';

  function getNested(obj, path) {
    if (!path || !obj) return undefined;
    const parts = path.split('.');
    let cur = obj;
    for (let i = 0; i < parts.length; i++) {
      if (cur == null || typeof cur !== 'object') return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function ensureFallbackDefaults() {
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      if (el.dataset.i18nDefault === undefined) {
        el.dataset.i18nDefault = el.textContent;
      }
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
      if (el.dataset.i18nHtmlDefault === undefined) {
        el.dataset.i18nHtmlDefault = el.innerHTML;
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      if (el.dataset.i18nPlaceholderDefault === undefined) {
        el.dataset.i18nPlaceholderDefault = el.placeholder || '';
      }
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function(el) {
      if (el.dataset.i18nAriaDefault === undefined) {
        const a = el.getAttribute('aria-label');
        el.dataset.i18nAriaDefault = a != null ? a : '';
      }
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
      if (el.dataset.i18nTitleDefault === undefined) {
        const t = el.getAttribute('title');
        el.dataset.i18nTitleDefault = t != null ? t : '';
      }
    });
  }

  function applyMeta(dict) {
    const page = document.documentElement.dataset.page;
    const m = page && dict.meta ? dict.meta[page] : null;
    if (m && m.title && String(m.title).length) {
      document.title = m.title;
    } else {
      document.title = initialTitle;
    }
    if (descMeta) {
      if (m && m.description && String(m.description).length) {
        descMeta.setAttribute('content', m.description);
      } else {
        descMeta.setAttribute('content', initialDesc);
      }
    }
  }

  function applyTranslations(dict) {
    ensureFallbackDefaults();

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      const key = el.getAttribute('data-i18n');
      const val = getNested(dict, key);
      if (val !== undefined && val !== null && String(val).length) {
        el.textContent = val;
      } else if (el.dataset.i18nDefault !== undefined) {
        el.textContent = el.dataset.i18nDefault;
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
      const key = el.getAttribute('data-i18n-html');
      const val = getNested(dict, key);
      if (val !== undefined && val !== null && String(val).length) {
        el.innerHTML = val;
      } else if (el.dataset.i18nHtmlDefault !== undefined) {
        el.innerHTML = el.dataset.i18nHtmlDefault;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = getNested(dict, key);
      if (val !== undefined && val !== null && String(val).length) {
        el.placeholder = val;
      } else if (el.dataset.i18nPlaceholderDefault !== undefined) {
        el.placeholder = el.dataset.i18nPlaceholderDefault;
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function(el) {
      const key = el.getAttribute('data-i18n-aria');
      const val = getNested(dict, key);
      if (val !== undefined && val !== null && String(val).length) {
        el.setAttribute('aria-label', val);
      } else if (el.dataset.i18nAriaDefault !== undefined) {
        el.setAttribute('aria-label', el.dataset.i18nAriaDefault);
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
      const key = el.getAttribute('data-i18n-title');
      const val = getNested(dict, key);
      if (val !== undefined && val !== null && String(val).length) {
        el.setAttribute('title', val);
      } else if (el.dataset.i18nTitleDefault !== undefined) {
        el.setAttribute('title', el.dataset.i18nTitleDefault);
      }
    });

    applyMeta(dict);
  }

  function updateLangButton(lang) {
    const btn = document.getElementById('langCurrent');
    if (btn) btn.textContent = lang.toUpperCase();
  }

  function setDocumentLang(lang) {
    document.documentElement.lang = lang;
  }

  function dispatchReady() {
    window.dispatchEvent(new CustomEvent('i18n-ready'));
  }

  function runLang(lang) {
    if (!LANGS.includes(lang)) lang = 'ko';
    updateLangButton(lang);
    setDocumentLang(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    fetch('locales/' + encodeURIComponent(lang) + '.json')
      .then(function(r) {
        if (!r.ok) throw new Error('fetch failed');
        return r.json();
      })
      .then(function(dict) {
        applyTranslations(dict);
        dispatchReady();
      })
      .catch(function() {
        document.title = initialTitle;
        if (descMeta) descMeta.setAttribute('content', initialDesc);
        dispatchReady();
      });
  }

  function initDropdown() {
    const switcher = document.getElementById('langSwitcher');
    const currentBtn = document.getElementById('langCurrent');
    const dropdown = document.getElementById('langDropdown');
    if (!switcher || !currentBtn || !dropdown) return;

    currentBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', function() {
      dropdown.classList.remove('open');
    });

    switcher.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    dropdown.querySelectorAll('li[data-lang]').forEach(function(li) {
      li.addEventListener('click', function(e) {
        e.stopPropagation();
        const lang = li.getAttribute('data-lang');
        if (!lang || !LANGS.includes(lang)) return;
        dropdown.classList.remove('open');
        runLang(lang);
      });
    });
  }

  let stored = 'ko';
  try {
    stored = localStorage.getItem(STORAGE_KEY) || 'ko';
  } catch (e) {}
  if (!LANGS.includes(stored)) stored = 'ko';

  initDropdown();
  runLang(stored);
})();
