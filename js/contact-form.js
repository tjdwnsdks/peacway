/**
 * contact.html 전용: /api/contact 로 문의 전송 (API 키는 서버만 사용)
 * 검증·피드백 문구는 locales/*.json 의 contact.formFeedback.* 에서 window.peacewayT 로 조회 (i18n.js 가 갱신)
 */
(function () {
  'use strict';

  var MIN_MESSAGE = 10;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var FB = 'contact.formFeedback.';

  function t(key) {
    var fn = window.peacewayT;
    if (typeof fn !== 'function') return '';
    var s = fn(FB + key);
    return s != null ? String(s) : '';
  }

  function getEl(id) {
    return document.getElementById(id);
  }

  function setFeedback(el, type, text) {
    if (!el) return;
    el.hidden = false;
    el.textContent = text;
    el.classList.remove('is-success', 'is-error', 'is-info');
    if (type === 'success') el.classList.add('is-success');
    else if (type === 'error') el.classList.add('is-error');
    else el.classList.add('is-info');
  }

  function clearFeedback(el) {
    if (!el) return;
    el.textContent = '';
    el.hidden = true;
    el.classList.remove('is-success', 'is-error', 'is-info');
  }

  function collectPrograms(form) {
    var keys = [];
    var labels = [];
    form.querySelectorAll('.checkbox-group input[type="checkbox"][name="program"]:checked').forEach(function (cb) {
      keys.push(cb.value);
      var span = cb.parentElement && cb.parentElement.querySelector('[data-i18n]');
      labels.push(span && span.textContent ? span.textContent.trim() : cb.value);
    });
    return { keys: keys, labels: labels.join(', ') };
  }

  function validate(name, email, progKeys, message, honeypot) {
    if (honeypot && String(honeypot).trim().length > 0) return { ok: false, silent: true };
    if (!name || name.trim().length < 2) return { ok: false, msg: t('valName') };
    if (!email || !EMAIL_RE.test(email.trim())) return { ok: false, msg: t('valEmail') };
    if (!progKeys.length) return { ok: false, msg: t('valPrograms') };
    var msgTrim = message != null ? String(message).trim() : '';
    if (msgTrim.length > 0 && msgTrim.length < MIN_MESSAGE) return { ok: false, msg: t('valMessage') };
    return { ok: true };
  }

  function bind() {
    if (document.documentElement.getAttribute('data-page') !== 'contact') return;

    var form = document.querySelector('.contact-form');
    if (!form || form.dataset.contactBound === '1') return;
    form.dataset.contactBound = '1';

    var btn = getEl('contactFormSubmit');
    var feedback = getEl('contactFormFeedback');
    var submitting = false;
    var defaultBtnText = btn ? btn.textContent : '';

    function setLoading(loading) {
      if (!btn) return;
      btn.disabled = loading;
      if (loading) {
        var sending = t('sending');
        btn.textContent = sending.length > 0 ? sending : '\u2026';
      } else {
        btn.textContent = defaultBtnText;
      }
    }

    if (btn) {
      defaultBtnText = btn.textContent;
    }

    window.addEventListener('i18n-ready', function () {
      if (btn && !submitting) defaultBtnText = btn.textContent;
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitting) return;

      var hpEl = getEl('contactWebsite');
      var honeypot = hpEl ? hpEl.value : '';

      var name = (getEl('contactName') && getEl('contactName').value) || '';
      var email = (getEl('contactEmail') && getEl('contactEmail').value) || '';
      var phone = (getEl('contactPhone') && getEl('contactPhone').value) || '';
      var preferredDate = (getEl('contactDate') && getEl('contactDate').value) || '';
      var partySize = (getEl('contactPartySize') && getEl('contactPartySize').value) || '';
      var nationality = (getEl('contactCountry') && getEl('contactCountry').value) || '';
      var message = (getEl('contactMessage') && getEl('contactMessage').value) || '';
      var progs = collectPrograms(form);

      var v = validate(name, email, progs.keys, message, honeypot);
      if (!v.ok) {
        if (v.silent) {
          setFeedback(feedback, 'success', t('success'));
          return;
        }
        setFeedback(feedback, 'error', v.msg);
        return;
      }

      clearFeedback(feedback);
      submitting = true;
      setLoading(true);

      var payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        programs: progs.keys,
        programsLabels: progs.labels,
        preferredDate: preferredDate.trim(),
        partySize: partySize.trim(),
        nationality: nationality.trim(),
        message: message.trim(),
        lang: document.documentElement.lang || 'ko',
        website: honeypot,
      };

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (r) {
          return r.text().then(function (text) {
            var data = {};
            if (text) {
              try {
                data = JSON.parse(text);
              } catch (err) {
                data = {};
              }
            }
            return { ok: r.ok, status: r.status, data: data };
          });
        })
        .then(function (result) {
          if (result.ok && result.data && result.data.ok) {
            setFeedback(feedback, 'success', t('success'));
            form.reset();
            if (hpEl) hpEl.value = '';
          } else if (result.status === 400) {
            setFeedback(feedback, 'error', t('errorBadRequest'));
          } else {
            setFeedback(feedback, 'error', t('errorServer'));
          }
        })
        .catch(function () {
          setFeedback(feedback, 'error', t('errorNetwork'));
        })
        .finally(function () {
          submitting = false;
          setLoading(false);
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
