# PEACEWAY PAJU — 정적 사이트 배포·검색엔진 안내

## 1. 도메인 placeholder 교체 (필수)

프로젝트에는 예시로 **`https://yourdomain.com`** 이 들어 있습니다. 실제 서비스 도메인으로 배포하기 전에 아래를 **일괄 치환**하세요.

| 대상 | 설명 |
|------|------|
| 모든 `*.html` | `<head>` 안의 `canonical`, `hreflang` 절대 URL |
| `robots.txt` | `Sitemap:` 줄 |
| `sitemap.xml` | 모든 `<loc>` |

예: `https://yourdomain.com` → `https://www.example.com`  
(www 유무, `http` vs `https` 는 실제 호스팅 정책에 맞추고, **canonical 과 실제 접속 URL이 일치**하도록 통일하세요.)

## 2. 다국어 URL (`?lang=`)과 i18n

- **hreflang** alternate 링크는 `페이지?lang=ko`, `?lang=en` … 형식입니다.
- **`js/i18n.js`** 는 페이지 로드 시 **`?lang=`** 값이 있으면 그 언어를 **localStorage 보다 우선** 적용합니다. 유효하지 않은 값이면 무시합니다.
- **canonical** 은 쿼리 **없는** 대표 URL만 가리킵니다 (중복 색인 완화).
- 내부 네비는 기존처럼 `about.html` 등 상대 경로이며, 언어는 전환 UI·localStorage 로 유지됩니다.

## 3. Google Search Console

1. [Google Search Console](https://search.google.com/search-console) 에서 속성 추가 (URL 접두어 또는 도메인).
2. 소유권 확인.
3. **사이트맵**에 `https://실제도메인/sitemap.xml` 제출.
4. **URL 검사**로 주요 페이지 색인 요청 (선택).

## 4. 네이버 서치어드바이저

1. [네이버 서치어드바이저](https://searchadvisor.naver.com/) 에 사이트 등록.
2. 소유 확인.
3. **요청 > 사이트맵 제출**에 `sitemap.xml` URL 입력.
4. **간단한 수집 요청**으로 중요 URL 요청 (선택).

## 5. 배포 후 확인

- 브라우저에서 `https://실제도메인/robots.txt` , `.../sitemap.xml` 이 **200** 으로 열리는지 확인.
- 각 HTML 소스에서 `canonical` / `hreflang` 이 모두 실제 도메인인지 확인.
- `https://실제도메인/about.html?lang=en` 접속 시 영어 UI로 로드되는지 확인.

## 6. 정적 파일 목록

- `index.html`, `about.html`, `programs.html`, `journey.html`, `garden.html`, `contact.html`, `patent.html`
- `robots.txt`, `sitemap.xml`
- `js/i18n.js`, `js/main.js`
- `locales/*.json`
