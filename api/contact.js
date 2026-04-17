/**
 * Vercel Serverless: POST /api/contact → Resend로 관리자 알림 메일
 *
 * 확장 포인트(스팸·남용 방지):
 * - Vercel KV / Upstash Redis로 IP·이메일별 일일 카운트 제한
 * - @vercel/edge-config 또는 미들웨어에서 geo·User-Agent 차단
 * - Turnstile / reCAPTCHA 검증을 본문에 token 필드 추가 후 여기서 검증
 */

const ALLOWED_LANG = ['ko', 'en', 'ja', 'zh-CN', 'zh-TW'];
const ALLOWED_PROGRAMS = ['tree', 'mine', 'bibim', 'nk', 'craft'];
const MIN_MESSAGE_LEN = 10;
const MAX = {
  name: 120,
  email: 254,
  phone: 80,
  preferredDate: 32,
  partySize: 20,
  nationality: 80,
  message: 8000,
  programsLabels: 500,
};

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function clampStr(v, max) {
  if (typeof v !== 'string') return '';
  var t = v.trim();
  if (t.length > max) return t.slice(0, max);
  return t;
}

function parseBody(req) {
  var b = req.body;
  if (b == null) return {};
  if (typeof b === 'string') {
    try {
      return JSON.parse(b || '{}');
    } catch (e) {
      return null;
    }
  }
  if (typeof b === 'object') return b;
  return {};
}

function validEmail(email) {
  if (!email || email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function row(label, value) {
  var v = value === '' || value == null ? '—' : String(value);
  return (
    '<tr><td style="padding:8px 12px;border:1px solid #e0e0e0;background:#f9f9f9;font-weight:600;vertical-align:top;white-space:nowrap">' +
    escapeHtml(label) +
    '</td><td style="padding:8px 12px;border:1px solid #e0e0e0">' +
    escapeHtml(v).replace(/\n/g, '<br>') +
    '</td></tr>'
  );
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ ok: false, code: 'METHOD_NOT_ALLOWED', message: 'POST only' }));
  }

  var body = parseBody(req);
  if (body === null) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ ok: false, code: 'BAD_JSON', message: 'Invalid JSON body' }));
  }

  var hp = body.website != null ? String(body.website).trim() : '';
  if (hp.length > 0) {
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true }));
  }

  var name = clampStr(body.name, MAX.name);
  var email = clampStr(body.email, MAX.email).toLowerCase();
  var phone = clampStr(body.phone, MAX.phone);
  var preferredDate = clampStr(body.preferredDate, MAX.preferredDate);
  var partySize = clampStr(body.partySize != null ? String(body.partySize) : '', MAX.partySize);
  var nationality = clampStr(body.nationality, MAX.nationality);
  var message = clampStr(body.message, MAX.message);
  var programsLabels = clampStr(body.programsLabels, MAX.programsLabels);

  var programs = body.programs;
  if (!Array.isArray(programs)) programs = [];
  programs = programs
    .map(function (p) {
      return String(p).toLowerCase();
    })
    .filter(function (p) {
      return ALLOWED_PROGRAMS.indexOf(p) !== -1;
    });
  var uniq = {};
  programs = programs.filter(function (p) {
    if (uniq[p]) return false;
    uniq[p] = true;
    return true;
  });

  var langRaw = typeof body.lang === 'string' ? body.lang.trim() : 'ko';
  var lang = ALLOWED_LANG.indexOf(langRaw) !== -1 ? langRaw : 'ko';

  if (name.length < 2) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({ ok: false, code: 'VALIDATION_ERROR', message: 'Name is required (min 2 chars)' })
    );
  }
  if (!validEmail(email)) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ ok: false, code: 'VALIDATION_ERROR', message: 'Valid email required' }));
  }
  if (programs.length === 0) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({ ok: false, code: 'VALIDATION_ERROR', message: 'Select at least one program' })
    );
  }
  /* 기타 문의사항: 비어 있으면 통과, 입력이 있으면 trim 기준 최소 길이 */
  if (message.length > 0 && message.length < MIN_MESSAGE_LEN) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Message min length ' + MIN_MESSAGE_LEN + ' when provided',
      })
    );
  }

  var apiKey = process.env.RESEND_API_KEY;
  var to = process.env.CONTACT_TO_EMAIL
  .split(',')
  .map(function(s) { return s.trim(); })
  .filter(function(s) { return s.length > 0; });
  var from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    res.statusCode = 500;
    return res.end(
      JSON.stringify({ ok: false, code: 'CONFIG_ERROR', message: 'Server email not configured' })
    );
  }

  var now = new Date();
  var receivedAtIso = now.toISOString();
  var receivedAtKst = now.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

  var programSummary = programsLabels || programs.join(', ');
  var subject = '[PEACEWAY PAJU 문의] ' + name + ' / ' + programSummary;
  if (subject.length > 998) subject = subject.slice(0, 995) + '...';

  var programsLine = programs.join(', ');
  var html =
    '<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;color:#222">' +
    '<h2 style="margin:0 0 16px">PEACEWAY PAJU — 웹 문의</h2>' +
    '<table style="border-collapse:collapse;width:100%;max-width:640px">' +
    row('이름', name) +
    row('이메일', email) +
    row('연락처', phone) +
    row('희망 프로그램 (코드)', programsLine) +
    row('희망 프로그램 (표시 라벨)', programsLabels) +
    row('희망 날짜', preferredDate) +
    row('인원수', partySize) +
    row('국적', nationality) +
    row('기타 문의사항', message) +
    row('접수 시각 (ISO)', receivedAtIso) +
    row('접수 시각 (Asia/Seoul)', receivedAtKst) +
    row('언어', lang) +
    '</table></body></html>';

  var payload = {
    from: from,
    to: to,
    reply_to: email,
    subject: subject,
    html: html,
  };

  var sendRes;
  try {
    sendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error('Resend fetch error', e);
    res.statusCode = 502;
    return res.end(JSON.stringify({ ok: false, code: 'SEND_FAILED', message: 'Email request failed' }));
  }

  if (!sendRes.ok) {
    var errText = await sendRes.text();
    console.error('Resend API error', sendRes.status, errText);
    res.statusCode = 502;
    return res.end(JSON.stringify({ ok: false, code: 'SEND_FAILED', message: 'Email delivery failed' }));
  }

  res.statusCode = 200;
  return res.end(JSON.stringify({ ok: true }));
};
