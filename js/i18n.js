(function() {
  'use strict';

  const STORAGE_KEY = 'peaceway_lang';
  const LANGS = ['ko', 'en', 'ja', 'zh-CN', 'zh-TW'];

  const initialTitle = document.title;
  const descMeta = document.querySelector('meta[name="description"]');
  const initialDesc = descMeta ? (descMeta.getAttribute('content') || '') : '';

  /** 현재 UI 언어(드롭다운 선택·키보드 포커스 동기화용) */
  var activeLang = 'ko';

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
    activeLang = lang;
    updateLangButton(lang);
    syncLangListSelection(lang);
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
        syncLangListSelection(lang);
        dispatchReady();
      })
      .catch(function() {
        document.title = initialTitle;
        if (descMeta) descMeta.setAttribute('content', initialDesc);
        dispatchReady();
      });
  }

  /** 언어 목록 옵션의 aria-selected / 시각적 현재 언어 표시 */
  function syncLangListSelection(lang) {
    const dropdown = document.getElementById('langDropdown');
    if (!dropdown) return;
    dropdown.querySelectorAll('li[data-lang]').forEach(function(li) {
      const code = li.getAttribute('data-lang');
      const selected = code === lang;
      li.setAttribute('aria-selected', selected ? 'true' : 'false');
      li.classList.toggle('is-lang-active', selected);
    });
  }

  function initDropdown() {
    const switcher = document.getElementById('langSwitcher');
    const currentBtn = document.getElementById('langCurrent');
    const dropdown = document.getElementById('langDropdown');
    if (!switcher || !currentBtn || !dropdown) return;

    const items = Array.prototype.slice.call(dropdown.querySelectorAll('li[data-lang]'));
    if (!items.length) return;

    if (!currentBtn.getAttribute('aria-controls')) {
      currentBtn.setAttribute('aria-controls', dropdown.id);
    }
    if (!dropdown.getAttribute('role')) {
      dropdown.setAttribute('role', 'listbox');
    }
    dropdown.setAttribute('tabindex', '-1');

    items.forEach(function(li) {
      li.setAttribute('tabindex', '-1');
      if (!li.getAttribute('role')) {
        li.setAttribute('role', 'option');
      }
    });

    var isOpen = false;
    var listFocusIndex = 0;

    function setOpen(next) {
      isOpen = !!next;
      dropdown.classList.toggle('open', isOpen);
      currentBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (!isOpen) {
        items.forEach(function(li) {
          li.setAttribute('tabindex', '-1');
        });
      }
    }

    function openFromKeyboard() {
      setOpen(true);
      var idx = items.findIndex(function(li) {
        return li.getAttribute('data-lang') === activeLang;
      });
      if (idx < 0) idx = 0;
      listFocusIndex = idx;
      items.forEach(function(li, i) {
        li.setAttribute('tabindex', i === listFocusIndex ? '0' : '-1');
      });
      items[listFocusIndex].focus();
    }

    function moveFocus(delta) {
      if (!items.length) return;
      listFocusIndex = (listFocusIndex + delta + items.length) % items.length;
      items.forEach(function(li, i) {
        li.setAttribute('tabindex', i === listFocusIndex ? '0' : '-1');
      });
      items[listFocusIndex].focus();
    }

    /** 드롭다운이 이미 열린 상태에서, 버튼에 포커스가 있을 때 목록으로 포커스 진입 */
    function focusListFromButton() {
      var idx = items.findIndex(function(li) {
        return li.getAttribute('data-lang') === activeLang;
      });
      if (idx < 0) idx = 0;
      listFocusIndex = idx;
      items.forEach(function(li, i) {
        li.setAttribute('tabindex', i === listFocusIndex ? '0' : '-1');
      });
      items[listFocusIndex].focus();
    }

    function selectByIndex(index) {
      if (index < 0 || index >= items.length) return;
      var li = items[index];
      var lang = li.getAttribute('data-lang');
      if (!lang || !LANGS.includes(lang)) return;
      setOpen(false);
      currentBtn.focus();
      runLang(lang);
    }

    currentBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      setOpen(!isOpen);
    });

    currentBtn.addEventListener('keydown', function(e) {
      var k = e.key;
      if (k === 'Escape') {
        if (isOpen) {
          e.preventDefault();
          setOpen(false);
        }
        return;
      }
      if (k === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) {
          openFromKeyboard();
        } else {
          focusListFromButton();
        }
        return;
      }
      if (k === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) {
          openFromKeyboard();
          moveFocus(-1);
        } else {
          listFocusIndex = items.length - 1;
          items.forEach(function(li, i) {
            li.setAttribute('tabindex', i === listFocusIndex ? '0' : '-1');
          });
          items[listFocusIndex].focus();
        }
        return;
      }
      if (k === 'Enter' || k === ' ') {
        e.preventDefault();
        if (!isOpen) {
          openFromKeyboard();
        } else {
          setOpen(false);
          currentBtn.focus();
        }
        return;
      }
    });

    dropdown.addEventListener('keydown', function(e) {
      if (!isOpen) return;
      var k = e.key;
      if (k === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        currentBtn.focus();
        return;
      }
      if (k === 'ArrowDown') {
        e.preventDefault();
        moveFocus(1);
        return;
      }
      if (k === 'ArrowUp') {
        e.preventDefault();
        moveFocus(-1);
        return;
      }
      if (k === 'Home') {
        e.preventDefault();
        listFocusIndex = 0;
        items.forEach(function(li, i) {
          li.setAttribute('tabindex', i === 0 ? '0' : '-1');
        });
        items[0].focus();
        return;
      }
      if (k === 'End') {
        e.preventDefault();
        listFocusIndex = items.length - 1;
        items.forEach(function(li, i) {
          li.setAttribute('tabindex', i === listFocusIndex ? '0' : '-1');
        });
        items[listFocusIndex].focus();
        return;
      }
    });

    items.forEach(function(li, index) {
      li.addEventListener('click', function(e) {
        e.stopPropagation();
        selectByIndex(index);
      });
      li.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectByIndex(index);
        }
      });
    });

    document.addEventListener('click', function() {
      if (isOpen) {
        setOpen(false);
      }
    });

    switcher.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  /** URL ?lang= 코드가 유효하면 해당 언어( hreflang·직접 링크 진입용 ), 없으면 null */
  function getLangFromQuery() {
    try {
      var params = new URLSearchParams(window.location.search || '');
      var q = params.get('lang');
      if (q && LANGS.indexOf(q) !== -1) return q;
    } catch (e) {}
    return null;
  }

  var fromQuery = getLangFromQuery();
  var stored = 'ko';
  try {
    stored = localStorage.getItem(STORAGE_KEY) || 'ko';
  } catch (e) {}
  if (!LANGS.includes(stored)) stored = 'ko';

  var initialLang = fromQuery !== null ? fromQuery : stored;
  activeLang = initialLang;

  initDropdown();
  runLang(initialLang);
})();
