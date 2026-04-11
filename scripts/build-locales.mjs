import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const ko = JSON.parse(fs.readFileSync(path.join(root, 'locales/ko.json'), 'utf8'));

function deepClone(o) {
  return JSON.parse(JSON.stringify(o));
}

const en = deepClone(ko);
Object.assign(en.meta.index, { title: 'PEACEWAY PAJU — Planting trees of peace on a former minefield', description: 'A sustainable tourism program at the DMZ border where people from around the world plant peace flowering trees and experience Korean culture.' });
Object.assign(en.meta.about, { title: 'About — PEACEWAY PAJU', description: 'DMZ Peace Footsteps Farm, partnerships, and spaces — PEACEWAY PAJU' });
Object.assign(en.meta.programs, { title: 'Programs — PEACEWAY PAJU', description: 'Peace tree planting, mine education, cultural experiences — PEACEWAY PAJU' });
Object.assign(en.meta.journey, { title: 'Journey — PEACEWAY PAJU', description: 'Visitor journey, route, and duration — PEACEWAY PAJU' });
Object.assign(en.meta.garden, { title: 'Peace Garden — PEACEWAY PAJU', description: 'Peace flowering trees guide and seasonal bloom calendar — PEACEWAY PAJU' });
Object.assign(en.meta.contact, { title: 'Contact — PEACEWAY PAJU', description: 'Program booking, inquiries, and FAQ — PEACEWAY PAJU' });
Object.assign(en.meta.patent, { title: 'AI Interpretation — PEACEWAY PAJU', description: 'AI real-time interpreting tourism platform, patent-pending technology — PEACEWAY PAJU' });

Object.assign(en.nav, { home: 'Home', about: 'About', programs: 'Programs', journey: 'Journey', garden: 'Peace Garden', contact: 'Contact', patent: 'AI Interpretation', ariaMenu: 'Menu' });
Object.assign(en.lang, { ko: 'Korean', en: 'English', ja: 'Japanese', zhCN: 'Simplified Chinese', zhTW: 'Traditional Chinese' });

Object.assign(en.home.hero, { badge: 'Sustainable Tourism · DMZ Paju', tagline: 'Planting trees of peace on a former minefield', desc: 'At the DMZ border, people from around the world plant peace flowering trees,<br>and take part in sustainable tourism experiencing Korean culture.', btnPrograms: 'View programs', btnContact: 'Book / Contact' });
Object.assign(en.home.pillar1, { title: 'Plant trees', desc: 'Plant peace flowering trees directly on DMZ land. A world-unique experience.' });
Object.assign(en.home.pillar2, { title: 'Record peace', desc: 'Register online permanently and follow your tree’s growth.' });
Object.assign(en.home.pillar3, { title: 'Learn history', desc: 'Peace history education helps you feel the reality of division.' });
Object.assign(en.home, { stat1: 'Target countries', stat2: 'Target trees planted', stat3: 'Target participants' });
Object.assign(en.home.compare, { label: 'Why PEACEWAY?', title: 'Why PEACEWAY?', hItem: 'Item', hRibbon: 'Imjingak ribbon tying', hPaju: 'PEACEWAY PAJU', c11: 'Act', c12: 'Write wishes on ribbons', c13: 'Plant flowering trees', c21: 'Durability', c22: 'Blown away by wind', c23: 'Roots grow and thrive', c31: 'Record', c32: 'None', c33: 'Permanent online record + growth tracking', c41: 'Education', c42: 'Simple viewing', c43: 'Peace history + mine awareness', c51: 'Engagement', c52: 'Passive', c53: 'Active, incl. culture', c61: 'Place', c62: 'General tourist site', c63: 'DMZ farm inside the Civilian Control Line (restricted)' });
Object.assign(en.home.cta, { title: 'Plant a tree of peace with us', subtitle: 'Until the DMZ minefield becomes a flower garden.', btnInquiry: 'Program booking / inquiry', btnInstagram: 'Follow on Instagram' });

en.compare.quote = '"Ribbons are carried away by the wind,<br>but trees put down roots."';

Object.assign(en.about, { label: 'About', title: 'Why plant trees in the DMZ?', subtitle: 'Planting symbols of peace with your own hands on a site of global conflict. That is how PEACEWAY began.', calloutTitle: '🌿 Paju DMZ Peace Footsteps Farm', flow1: 'Minefield', flow2: 'Flower field', flow3: 'Peace forest', flow4: 'World peace landmark', partnersTitle: '🤝 Three-way partnership', spaceTitle: '📍 About the spaces', calloutBody: 'A symbolic space leaving “peaceful footsteps” on DMZ land shaped like footprints from above—inside the Civilian Control Line where access is tightly limited. People from around the world plant trees here.', spaceBody: '<strong>DMZ Peace Footsteps Farm</strong> — Located in Paju, Gyeonggi within the Civilian Control Line. Farmland operated with military approval; a special area with restricted public access. By car, about 30 minutes from central Paju.<br><br><strong>Cherry Blossom Village (벼꽃피는마을)</strong> — A rural experience site in Paju. Cozy village setting for cultural programs such as K-bibimbap and mother-of-pearl craft.' });
Object.assign(en.about.partner1, { name: 'K-MIND', role: 'CEO Jeong-mo Lee', desc: 'Overall planning, online platform, DMZ farm ownership and management' });
Object.assign(en.about.partner2, { name: 'Cherry Blossom Village', role: 'CEO Sang-il Choi', desc: 'Offline experiences, local produce, cultural programs' });
Object.assign(en.about.partner3, { name: 'Korea Mine Research Institute', role: 'Peace history education partner', desc: 'Mine education & experiences, overall safety management' });

Object.assign(en.programs, { label: 'Programs', title: '🌳 Experience programs', subtitle: 'A world-unique peace tourism experience only possible in the DMZ.', treeTitle: '🌳 Peace tree planting', treeBadge: '★ Core program', treeLead: 'World-unique—plant flowering trees directly on DMZ land. Your tree is registered online and growth can be tracked.', treeCalloutHtml: '<strong>Three reasons this program is special</strong><br>🌍 <strong>World-unique</strong> — Plant trees directly on DMZ land<br>📱 <strong>Permanent record</strong> — Track your tree’s growth online<br>🇰🇷 <strong>Historic meaning</strong> — Inter-Korean summit tree (golden rain) planted in the DMZ', flowLabel: 'Experience flow', flowT1: 'Choose tree', flowT2: 'Planting', flowT3: 'Write message', flowT4: 'Photos', flowT5: 'Online registration', thDuration: 'Duration', thPeople: 'Group size', thPlace: 'Location', treeDur: 'Approx. 60 min', treeNum: '10–30', treeLoc: 'DMZ Peace Footsteps Farm', mineTitle: '💣 Peace history program — mine education', mineLead: 'Grasp the reality of division through safe replica mines and metal detectors.', mineWarnHtml: '⚠️ <strong>Safety:</strong> Only inert training replicas are used. Partner: Korea Mine Research Institute.', mineF1: 'DMZ peace history', mineF2: 'Metal detector basics', mineF3: 'Detection practice', mineF4: 'Replica observation', mineTipHtml: '💡 <strong>Flow:</strong> Right after peace history → tree planting next to it (wishing for global peace).', mineDur: 'Approx. 40 min', cultureTitle: '🎨 Cultural experience (food & craft)', culture1: 'K-bibimbap DIY', culture1p: 'Make bibimbap with Paju produce; pick your own fresh ingredients.', culture1m1: '⏱ ~40 min', culture1m2: '👥 10–30', culture1m3: '📍 Cherry Blossom Village', culture2: 'North Korean food experience', culture2p: 'Cook and taste dishes such as faux-meat rice and corn rice cakes—understanding division through food.', culture2m1: '⏱ ~50 min', culture2m2: '👥 10–20', culture2m3: '📍 Cherry Blossom Village', culture3: 'Mother-of-pearl craft', culture3p: 'Phone cases, key rings, hand mirrors with traditional mother-of-pearl.', culture3m1: '⏱ ~40 min', culture3m2: '👥 10–20', culture3m3: '📍 Cherry Blossom Village' });

Object.assign(en.journey, { label: 'Journey', title: '🗺️ Visitor journey', subtitle: 'A day in the DMZ—planting peace.', s1h: 'Online booking', s1p: 'Choose programs and request dates', s1m1: '🌐 Online', s1m2: '⏱ Advance', s2h: 'Peace history — mine experience', s2p: 'DMZ history + detector practice + replica observation', s2m1: '📍 DMZ farm', s2m2: '⏱ ~40 min', s2m3: '💡 Education', s3h: 'Peace tree planting', s3p: 'Choose tree → plant → message → photos', s3m1: '📍 DMZ farm', s3m2: '⏱ ~60 min', s3m3: '🌳 Core', s4h: 'Cultural experience', s4p: 'K-bibimbap / DPRK food / craft (pick 1–2)', s4m1: '📍 Cherry Blossom Village', s4m2: '⏱ ~40–90 min', s4m3: '🎨 Culture', s5h: 'Online record', s5p: 'Tree info + peace message registered online', s5m1: '📱 Online', s5m2: '⏱ ~10 min', s6h: 'Growth tracking', s6p: 'Follow your tree after returning home (phase 2 updates)', s6m1: '🌐 Online', s6m2: '⏱ Ongoing', s6m3: '🌱 Growth', totalHtml: '🕐 Total time: <strong>~4–5 hours</strong> &nbsp;|&nbsp; Meet-up: designated Paju location &nbsp;|&nbsp; Bring: comfortable clothes, hat', btnContact: 'Book / Contact' });

Object.assign(en.garden, { label: 'Peace Garden', title: '🌸 Peace flowering trees', subtitle: 'Trees planted in the DMZ peace garden—each carries a story of peace.', tree1mean: 'Flower meaning: waiting, wishes', tree1sea: 'Bloom: Jun–Jul', tree1peace: 'Symbol tree from Inter-Korean summits', tree2mean: 'Flower meaning: constancy', tree2sea: 'Bloom: Jul–Oct', tree2peace: 'National flower of Korea—resolve for peace', tree3mean: 'Flower meaning: peace', tree3sea: 'Bloom: May–Jun', tree3peace: 'UN symbol of peace', tree4mean: 'Flower meaning: noble love', tree4sea: 'Bloom: Mar–Apr', tree4peace: 'Purity and new beginnings', tree5mean: 'Flower meaning: enduring love', tree5sea: 'Bloom: Mar–Apr', tree5peace: 'Hope that heralds spring', tree6mean: 'Flower meaning: everlasting love', tree6sea: 'Bloom: May–Jun', tree6peace: 'Tree of peace and good harvest', calTitle: '📅 Seasonal bloom calendar', calLead: 'Available trees vary by season.', m3: 'Mar', m4: 'Apr', m5: 'May', m6: 'Jun', m7: 'Jul', m8: 'Aug', m9: 'Sep', m10: 'Oct', m11: 'Nov', m12: 'Dec', m1: 'Jan', m2: 'Feb', cal31: 'Magnolia<br>Cornus', cal51: 'Olive<br>Fringe tree', cal61: 'Golden rain<br>Olive', cal71: 'Golden rain<br>Rose of Sharon', cal81: 'Rose of Sharon', cal91: 'Rose of Sharon', cal101: 'Rose of Sharon<br>Fall foliage', cal111: 'Winter prep<br>Planting possible', cal121: 'Winter<br>Rest', cal011: 'Winter<br>Rest', cal021: 'Spring prep<br>Planting possible', ctaHtml: '💡 <strong>Visiting soon?</strong> Check which trees can be planted and what is blooming—then <a href="contact.html" style="color:var(--forest-light); font-weight:600;">book a program</a>.' });

Object.assign(en.contact, { label: 'Contact', title: '📬 Inquiry & booking', subtitle: 'Ask about programs or book. We aim to reply within 2 business days.' });
Object.assign(en.contact.form, { name: 'Name *', email: 'Email *', phone: 'Phone', programs: 'Preferred program(s) *', date: 'Preferred date', num: 'Group size', country: 'Nationality', note: 'Other questions', namePh: 'Enter your name', emailPh: 'email@example.com', phonePh: '010-0000-0000', numPh: 'Number of participants', countryPh: 'Nationality', notePh: 'Ask anything', cbTree: '🌳 Tree planting', cbMine: '💣 Peace history (mines)', cbBibim: '🍚 Bibimbap', cbNK: '🥟 DPRK food', cbCraft: '🎨 Craft', submit: 'Submit inquiry', footnote: 'We will email you within 2 business days' });
Object.assign(en.contact, { cardEmail: 'Email', cardPhone: 'Phone', cardPhoneP: 'Phone to be announced', cardKakao: 'KakaoTalk channel', cardKakaoL: 'PEACEWAY PAJU channel', cardInsta: 'Instagram', cardMap: 'How to get here', cardMapHtml: 'Paju, Gyeonggi (Civilian Control Line area)<br>Details after booking is confirmed', faqTitle: '❓ FAQ' });
en.contact.faq1q = 'Q. Can foreigners join?'; en.contact.faq1a = 'Yes—the program welcomes international visitors. Advance booking and ID checks are required due to the Civilian Control Line.';
en.contact.faq2q = 'Q. Is English interpretation available?'; en.contact.faq2a = 'Basic English support is provided; professional interpreters can be arranged for groups. AI live interpreting is planned.';
en.contact.faq3q = 'Q. How much does it cost?'; en.contact.faq3a = 'Fees depend on program mix and group size; we send a quote via the inquiry form.';
en.contact.faq4q = 'Q. Is the mine exercise safe?'; en.contact.faq4a = 'Yes—only inert training replicas, supervised by Korea Mine Research Institute experts.';
en.contact.faq5q = 'Q. Can I see my tree later?'; en.contact.faq5a = 'Yes—once the online tracking phase launches, you can follow your tree with photos and location data.';
en.contact.faq6q = 'Q. Group bookings?'; en.contact.faq6a = 'Yes—welcome for 10+ guests; tailored options for companies and schools.';
en.contact.faq7q = 'Q. What if it rains?'; en.contact.faq7a = 'Light rain: we provide rain gear; severe weather: we reschedule.';
en.contact.faq8q = 'Q. Can children join?'; en.contact.faq8a = 'Children aged 7+ with a guardian.';
en.contact.faq9q = 'Q. Parking?'; en.contact.faq9a = 'Designated lots near the site—details after booking.';
en.contact.faq10q = 'Q. How do we get there?'; en.contact.faq10a = 'About 30 minutes by car from central Paju; entry requires prior approval—we send directions when you book. Shuttles possible for groups.';

Object.assign(en.patent, { label: 'Technology', title: '🌐 AI interpreting tourism platform', subtitle: 'Innovation from PEACEWAY PAJU—a future of peace tourism without language barriers', badge: 'Patent pending', patentTitle: 'AI bidirectional interpreting guide platform', calloutGoldHtml: 'The world’s first group-tourism interpreting system where one guide serves many nationalities in their own languages via AI two-way interpreting.', f1h: 'Live two-way interpreting', f1p: 'Guide’s Korean is converted to text + voice in each guest’s language', f2h: 'Multilingual group chat', f2p: 'Guests chat in their languages with live mutual translation', f3h: 'AI agent interpreting', f3p: 'Self-improving quality using AI engines such as GPT and Gemini', f4h: 'Personal devices', f4p: 'Smartphone + earbuds for each guest’s language', flowSec: 'How the system flows', fl1: 'Guide<br>Korean briefing', fl2: 'AI agent<br>Live interpreting', fl3: 'Group chat<br>Multilingual', fl4: 'Guest device<br>Native language', fl5: 'Guest question<br>Back to Korean', bottomHtml: '<strong>🌍 PEACEWAY PAJU × AI interpreting</strong><br>With this technology, 30+ nationalities on the DMZ peace tour can receive real-time information in their languages from a single guide—and talk across borders in real time.' });

fs.writeFileSync(path.join(root, 'locales/en.json'), JSON.stringify(en, null, 2));

const ja = deepClone(ko);
Object.assign(ja.meta.index, { title: 'PEACEWAY PAJU — 地雷原に平和の樹を', description: 'DMZ沿線で世界の人々が平和の花樹を植え、韓国文化を体験する持続可能な観光プログラム' });
Object.assign(ja.meta.about, { title: 'About — PEACEWAY PAJU', description: 'DMZ「平和の足跡」農場、パートナーシップ、空間のご紹介 — PEACEWAY PAJU' });
Object.assign(ja.meta.programs, { title: 'Programs — PEACEWAY PAJU', description: '平和の樹木植栽、地雷教育、文化体験プログラム — PEACEWAY PAJU' });
Object.assign(ja.meta.journey, { title: 'Journey — PEACEWAY PAJU', description: '参加者の旅路、動線、所要時間のご案内 — PEACEWAY PAJU' });
Object.assign(ja.meta.garden, { title: 'Peace Garden — PEACEWAY PAJU', description: '平和の花樹ガイド、四季の開花カレンダー — PEACEWAY PAJU' });
Object.assign(ja.meta.contact, { title: 'Contact — PEACEWAY PAJU', description: 'プログラム予約・お問い合わせ、FAQ — PEACEWAY PAJU' });
Object.assign(ja.meta.patent, { title: 'AI通訳 — PEACEWAY PAJU', description: 'AI同時通訳観光プラットフォーム、特許出願技術 — PEACEWAY PAJU' });
Object.assign(ja.nav, { home: 'ホーム', about: '概要', programs: 'プログラム', journey: '旅程', garden: 'ピースガーデン', contact: 'お問い合わせ', patent: 'AI通訳', ariaMenu: 'メニュー' });
Object.assign(ja.lang, { ko: '韓国語', en: 'English', ja: '日本語', zhCN: '簡体中国語', zhTW: '繁体中国語' });
Object.assign(ja.home.hero, { tagline: '地雷原に平和の樹を植える', desc: 'DMZ沿線で世界の人々が平和の花樹を直接植え、<br>韓国文化を体験する持続可能観光プログラム', btnPrograms: 'プログラムを見る', btnContact: '予約・お問い合わせ' });
Object.assign(ja.home.pillar1, { title: '樹を植える', desc: 'DMZの地に平和の花樹を直接植栽。世界でここだけの体験。' });
Object.assign(ja.home.pillar2, { title: '平和を記録する', desc: 'オンラインに永続登録し、自分の樹の成長を追跡。' });
Object.assign(ja.home.pillar3, { title: '歴史を学ぶ', desc: '平和の歴史教育で分断の現実を肌で知る。' });
Object.assign(ja.home, { stat1: '目標参加国', stat2: '目標植栽本数', stat3: '目標参加者' });
Object.assign(ja.home.compare, { title: 'なぜPEACEWAYか', hItem: '項目', hRibbon: '臨津閣リボン結び', hPaju: 'PEACEWAY PAJU', c11: '行為', c12: 'リボンに願い', c13: '花樹を直接植栽', c21: '持続性', c22: '風に流される', c23: '根を張って成長', c31: '記録', c32: 'なし', c33: 'オンライン永久登録＋成長追跡', c41: '教育', c42: '見学のみ', c43: '平和歴史＋地雷体験', c51: '参加度', c52: '受動的', c53: '能動的・文化含む', c61: '場所', c62: '一般観光地', c63: 'DMZ民間人統制線内農場（非公開）' });
Object.assign(ja.home.cta, { title: '平和の樹を一緒に植えませんか', subtitle: 'DMZの地雷原が花園になる日まで。', btnInquiry: 'プログラム予約・問い合わせ', btnInstagram: 'Instagramをフォロー' });
ja.compare.quote = '「リボンは風に流れるが、<br>樹は根を下ろす。」';
Object.assign(ja.about, { title: 'なぜDMZに樹を植えるのか', subtitle: '紛争の地に平和の象徴を自分の手で植えること。それがPEACEWAYの出発点です。', calloutBody: '衛星から見ると足跡型のDMZの地に「平和の足跡」を残す象徴的空間。民間人統制線の内側、一般の立ち入りが難しい場所で世界の人々が樹を植えます。', spaceBody: '<strong>DMZ平和の足跡農場</strong> — 京畿道坡州市・民間人統制線内。軍の許可の下で運営される農地で立ち入りが制限された特別区域。車で坡州から約30分。<br><br><strong>ベクコットピヌンマウル（桜の村）</strong> — 坡州の農村体験空間。Kビビンバや螺鈿細工など文化プログラム。' });
Object.assign(ja.programs, { subtitle: 'DMZでしかできない、世界唯一の平和観光を。', treeLead: '世界唯一 — DMZに直接花樹を植える体験。オンライン永久登録と成長追跡。', flowLabel: '体験の流れ', thDuration: '所要時間', thPeople: '人数', thPlace: '場所', treeDur: '約60分', mineLead: '分断の現実を安全教育と金属探知機で体感。', mineF1: 'DMZ平和史学習', mineF2: '金属探知機の使い方', mineF3: '探知体験', mineF4: '地雷模型の観察', mineDur: '約40分' });
Object.assign(ja.journey, { title: '🗺️ 参加者の旅路', subtitle: 'DMZの一日、平和を植える旅。', s1h: 'オンライン予約', s1p: 'プログラム選択と希望日申込', btnContact: '予約・お問い合わせ' });

const jaProg = ja.programs;
jaProg.title = '🌳 体験プログラム'; jaProg.treeTitle = '🌳 平和の樹植栽'; jaProg.treeBadge = '★ 核心プログラム'; jaProg.mineTitle = '💣 平和歴史プログラム — 地雷教育';

const jaJ = ja.journey;
jaJ.s2h = '平和歴史教育 — 地雷体験'; jaJ.s3h = '平和の樹植栽'; jaJ.s4h = '文化体験'; jaJ.s5h = 'オンライン記録'; jaJ.s6h = '樹木成長の追跡';
jaJ.totalHtml = '🕐 所要時間: <strong>約4〜5時間</strong> &nbsp;|&nbsp; 集合: 坡州指定場所 &nbsp;|&nbsp; 準備: 楽な服装、帽子';

Object.assign(ja.contact, { title: '📬 お問い合わせ・予約', subtitle: 'ご予約・ご質問はお気軽に。2営業日以内に返信します。', faqTitle: '❓ よくある質問' });
Object.assign(ja.contact.form, { name: 'お名前 *', email: 'メール *', phone: '電話', programs: '希望プログラム *', date: '希望日', num: '人数', country: '国籍', note: 'その他', namePh: 'お名前を入力', emailPh: 'email@example.com', phonePh: '010-0000-0000', numPh: '参加人数', countryPh: '国籍', notePh: 'ご質問をご自由に', cbTree: '🌳 樹木植栽', cbMine: '💣 平和歴史（地雷）', cbBibim: '🍚 ビビンバ', cbNK: '🥟 北朝鮮料理', cbCraft: '🎨 工芸', submit: '送信', footnote: '送信後2営業日以内にメールでご連絡します' });
Object.assign(ja.contact, {
  label: 'Contact',
  cardEmail: 'メール',
  cardPhone: '電話',
  cardPhoneP: '電話番号は後日ご案内',
  cardKakao: 'KakaoTalkチャンネル',
  cardKakaoL: 'PEACEWAY PAJUチャンネルへ',
  cardInsta: 'Instagram',
  cardMap: 'アクセス',
  cardMapHtml: '京畿道坡州市・民間人統制線エリア<br>詳細は予約確定後にご案内',
  faq1q: 'Q. 外国人も参加できますか？',
  faq1a: 'はい。海外からのゲスト向けのプログラムです。民間人統制線エリアのため、事前予約と身分確認が必要です。',
  faq2q: 'Q. 英語通訳はありますか？',
  faq2a: '基本的な英語サポートがあります。団体では専門通訳の手配が可能です。AIリアルタイム通訳の導入も予定しています。',
  faq3q: 'Q. 参加費はいくらですか？',
  faq3a: 'プログラム構成と人数によって異なります。お問い合わせフォームからお見積りをご案内します。',
  faq4q: 'Q. 地雷教育体験は安全ですか？',
  faq4a: 'はい。不発の教育用模型のみを使用し、韓国地雷研究所の専門家が安全管理します。',
  faq5q: 'Q. 植えた樹を後から確認できますか？',
  faq5a: 'はい。オンライン追跡が整備されれば、写真や位置情報で成長をフォローできます。',
  faq6q: 'Q. 団体予約はできますか？',
  faq6a: 'はい。10名以上の団体を歓迎します。企業研修や教育旅行向けの構成も可能です。',
  faq7q: 'Q. 雨天でも実施しますか？',
  faq7a: '小雨の場合はレインギアを用意して実施します。悪天候時は日程変更のご相談が可能です。',
  faq8q: 'Q. お子様も参加できますか？',
  faq8a: '7歳以上で保護者同伴であれば参加可能です。',
  faq9q: 'Q. 駐車場はありますか？',
  faq9a: '会場近くの指定駐車場をご利用いただけます。詳細は予約確定後にお知らせします。',
  faq10q: 'Q. アクセス方法は？',
  faq10a: '坡州から車で約30分です。民間人統制線入域の事前許可が必要なため、予約時に詳細をご案内します。団体向けシャトルもご相談ください。',
});

Object.assign(ja.patent, { title: '🌐 AI同時通訳観光プラットフォーム', subtitle: 'PEACEWAY PAJUの革新的技術 — 言語の壁のない平和観光へ', badge: '特許出願技術', calloutGoldHtml: '1名のガイドが多国の参加者に対し、AIによるリアルタイム双方向同時通訳を通じて、それぞれの母語で観光案内を届ける、世界初のグループ観光通訳システムです。', flowSec: 'システム運用フロー' });

fs.writeFileSync(path.join(root, 'locales/ja.json'), JSON.stringify(ja, null, 2));

const zhCN = deepClone(en);
Object.assign(zhCN.meta.index, { title: 'PEACEWAY PAJU — 在雷场上种下和平之树', description: '在DMZ沿线，各国参与者亲手种植和平花树、体验韩国文化的可持续旅游项目。' });
Object.assign(zhCN.meta.patent, { title: 'AI 同传 — PEACEWAY PAJU', description: 'AI 实时口译旅游平台，专利申请中的技术 — PEACEWAY PAJU' });
Object.assign(zhCN.nav, { home: '首页', about: '关于', programs: '项目', journey: '行程', garden: '和平花园', contact: '联系', patent: 'AI 同传', ariaMenu: '菜单' });
Object.assign(zhCN.lang, { ko: '韩语', en: '英语', ja: '日语', zhCN: '简体中文', zhTW: '繁体中文' });
Object.assign(zhCN.home.hero, { tagline: '在雷场上种下和平之树', desc: '在 DMZ 沿线，各国参与者亲手种植和平花树，<br>并通过可持续旅游体验韩国文化。', btnPrograms: '查看项目', btnContact: '预约咨询' });
Object.assign(zhCN.home.pillar1, { title: '种树', desc: '在 DMZ 土地直接栽植和平花树，全球独一无二的体验。' });
Object.assign(zhCN.home.pillar2, { title: '记录和平', desc: '在线永久登记，跟踪你种下的树的成长。' });
Object.assign(zhCN.home.pillar3, { title: '学习历史', desc: '通过和平历史教育亲身体会分裂的现实。' });
Object.assign(zhCN.home, { stat1: '目标参与国家', stat2: '目标植树株数', stat3: '目标参与人数' });
Object.assign(zhCN.home.compare, { title: '为什么是 PEACEWAY？', hItem: '项目', hRibbon: '临津阁系丝带', hPaju: 'PEACEWAY PAJU', c11: '行为', c12: '在丝带上写下愿望', c13: '亲手栽植花树', c21: '持续性', c22: '随风飘散', c23: '扎根成长', c31: '记录', c32: '无', c33: '在线永久登记 + 成长追踪', c41: '教育', c42: '单纯参观', c43: '和平历史教育 + 地雷体验', c51: '参与度', c52: '被动', c53: '主动 · 含文化体验', c61: '地点', c62: '一般旅游区', c63: 'DMZ 民间通达线内农场（非公开）' });
Object.assign(zhCN.home.cta, { title: '与我们一起种下和平之树', subtitle: '直到 DMZ 雷场变成花海的那一天。', btnInquiry: '项目预约咨询', btnInstagram: '关注 Instagram' });
zhCN.compare.quote = '“丝带会被风吹走，<br>树木却要把根扎下。”';
Object.assign(zhCN.about, { title: '为什么在 DMZ 种树？', subtitle: '在冲突之地亲手种下和平的象征，这就是 PEACEWAY 的起点。', calloutBody: '从卫星上看像脚印形的 DMZ 土地上留下“和平足迹”的象征空间。在民间通达线内侧、一般人难以进入的地方，由来自世界各地的人种树。', spaceBody: '<strong>DMZ 和平足迹农场</strong> — 位于京畿道坡州民间通达线内，在军方许可下运营的农田，属限制进入的特殊区域。从坡州市区乘车约 30 分钟。<br><br><strong>樱花盛开村（벼꽃피는마을）</strong> — 坡州乡村体验空间，可参加 K-拌饭、螺钿工艺等文化项目。' });
Object.assign(zhCN.programs, { subtitle: '仅在 DMZ 才能实现的、世界唯一的和平观光体验。', flowLabel: '体验流程', thDuration: '时长', thPeople: '人数', thPlace: '地点', treeDur: '约 60 分钟', mineDur: '约 40 分钟', cultureTitle: '🎨 文化体验（饮食 · 工艺）' });
Object.assign(zhCN.journey, { title: '🗺️ 访客行程', subtitle: '在 DMZ 的一天，种下和平的旅程。', btnContact: '预约咨询', totalHtml: '🕐 总时长：<strong>约 4～5 小时</strong> &nbsp;|&nbsp; 集合：坡州指定地点 &nbsp;|&nbsp; 请准备舒适服装、帽子' });
Object.assign(zhCN.garden, { calTitle: '📅 四季开花日历', calLead: '可种植的树种因季节而异。', cal111: '越冬准备<br>可植树', cal121: '冬季<br>休整', cal011: '冬季<br>休整', cal021: '春季准备<br>可植树' });
Object.assign(zhCN.contact, { title: '📬 咨询 · 预约', subtitle: '项目预约及疑问欢迎联系，我们将在 2 个工作日内回复。', faqTitle: '❓ 常见问题' });
Object.assign(zhCN.contact.form, { name: '姓名 *', email: '邮箱 *', phone: '电话', programs: '意向项目 *', date: '希望日期', num: '人数', country: '国籍', note: '其他问题', namePh: '请输入姓名', emailPh: 'email@example.com', phonePh: '010-0000-0000', numPh: '参加人数', countryPh: '请输入国籍', notePh: '请填写您的问题', cbTree: '🌳 植树', cbMine: '💣 和平历史（地雷教育）', cbBibim: '🍚 拌饭', cbNK: '🥟 朝鲜风味餐', cbCraft: '🎨 手工艺', submit: '提交咨询', footnote: '提交后我们将在 2 个工作日内邮件回复' });
Object.assign(zhCN.contact, {
  label: '联系',
  cardEmail: '邮箱',
  cardPhone: '电话',
  cardPhoneP: '咨询电话稍后公布',
  cardKakao: 'KakaoTalk 频道',
  cardKakaoL: '前往 PEACEWAY PAJU 频道',
  cardInsta: 'Instagram',
  cardMap: '交通与位置',
  cardMapHtml: '京畿道坡州市民间通达线一带<br>详细地址将在预约确认后通知',
  faq1q: '问：外国人可以参加吗？',
  faq1a: '可以。本项目欢迎国际访客；鉴于民间通达线区域规定，需提前预约并完成身份核验。',
  faq2q: '问：提供英语口译吗？',
  faq2a: '提供基础英语协助；团体可安排专业口译。AI 实时口译也在计划中。',
  faq3q: '问：费用是多少？',
  faq3a: '视项目组合与人数而定，我们会通过咨询表单发送报价。',
  faq4q: '问：地雷教育体验安全吗？',
  faq4a: '安全。仅使用安全的训练用模型，并由韩国地雷研究所专家监督。',
  faq5q: '问：之后还能看到我种的树吗？',
  faq5a: '可以。在线追踪功能上线后，可通过照片与位置信息跟进树木生长。',
  faq6q: '问：可以团体预约吗？',
  faq6a: '可以，欢迎 10 人以上团体，并可为企业和学校定制方案。',
  faq7q: '问：下雨还去吗？',
  faq7a: '小雨会提供雨具并照常进行；恶劣天气将改期。',
  faq8q: '问：儿童能参加吗？',
  faq8a: '7 岁及以上可在监护人陪同下参加。',
  faq9q: '问：在哪里停车？',
  faq9a: '可使用场地附近指定停车场，详情在预约确认后告知。',
  faq10q: '问：怎么去？',
  faq10a: '从坡州市区驾车约 30 分钟；进入民间通达线需事先许可，预约时我们将说明路线。团体可协商班车。',
});
Object.assign(zhCN.patent, { title: '🌐 AI 实时口译旅游平台', subtitle: 'PEACEWAY PAJU 正在准备的创新 — 无障碍语言的和平旅游未来', badge: '专利申请技术', flowSec: '系统运行流程' });

fs.writeFileSync(path.join(root, 'locales/zh-CN.json'), JSON.stringify(zhCN, null, 2));

const zhTW = deepClone(zhCN);
Object.assign(zhTW.meta.index, { title: 'PEACEWAY PAJU — 在雷場上種下和平之樹', description: '在 DMZ 沿線，各國參與者親手種植和平花樹、體驗韓國文化的永續旅遊方案。' });
Object.assign(zhTW.meta.patent, { title: 'AI 同聲傳譯 — PEACEWAY PAJU', description: 'AI 即時口譯觀光平台，專利申請中的技術 — PEACEWAY PAJU' });
Object.assign(zhTW.nav, { home: '首頁', about: '關於', programs: '方案', journey: '行程', garden: '和平花園', contact: '聯絡', patent: 'AI 同聲傳譯', ariaMenu: '選單' });
Object.assign(zhTW.lang, { ko: '韓語', en: '英語', ja: '日語', zhCN: '簡體中文', zhTW: '繁體中文' });
Object.assign(zhTW.home.hero, { tagline: '在雷場上種下和平之樹', desc: '在 DMZ 沿線，各國參與者親手種植和平花樹，<br>並透過永續旅遊體驗韓國文化。', btnPrograms: '查看方案', btnContact: '預約諮詢' });
Object.assign(zhTW.home.pillar1, { title: '種樹', desc: '在 DMZ 土地直接栽植和平花樹，全球獨一無二的體驗。' });
Object.assign(zhTW.home.pillar2, { title: '記錄和平', desc: '線上永久登錄，追蹤您種下的樹的成長。' });
Object.assign(zhTW.home.pillar3, { title: '學習歷史', desc: '透過和平歷史教育親身體會分裂的現實。' });
Object.assign(zhTW.home, { stat1: '目標參與國家', stat2: '目標植樹株數', stat3: '目標參與人數' });
Object.assign(zhTW.home.compare, { title: '為什麼是 PEACEWAY？', hItem: '項目', hRibbon: '臨津閣繫絲帶', hPaju: 'PEACEWAY PAJU', c11: '行為', c12: '在絲帶上寫下願望', c13: '親手栽植花樹', c21: '持續性', c22: '隨風飄散', c23: '扎根成長', c31: '紀錄', c32: '無', c33: '線上永久登錄＋成長追蹤', c41: '教育', c42: '單純參觀', c43: '和平歷史教育＋地雷體驗', c51: '參與度', c52: '被動', c53: '主動 · 含文化體驗', c61: '地點', c62: '一般旅遊區', c63: 'DMZ 民間通達線內農場（非公開）' });
Object.assign(zhTW.home.cta, { title: '與我們一起種下和平之樹', subtitle: '直到 DMZ 雷場變成花海的那一天。', btnInquiry: '方案預約諮詢', btnInstagram: '關注 Instagram' });
zhTW.compare.quote = '「絲帶會被風吹走，<br>樹木卻要把根扎下。」';
Object.assign(zhTW.about, { title: '為什麼在 DMZ 種樹？', subtitle: '在衝突之地親手種下和平的象徵，這就是 PEACEWAY 的起點。', calloutBody: '從衛星上看像腳印形的 DMZ 土地上留下「和平足跡」的象徵空間。在民間通達線內側、一般人難以進入的地方，由來自世界各地的人種樹。', spaceBody: '<strong>DMZ 和平足跡農場</strong> — 位於京畿道坡州民間通達線內，在軍方許可下運作的農田，屬限制進入的特殊區域。從坡州市區乘車約 30 分鐘。<br><br><strong>櫻花盛開村（벼꽃피는마을）</strong> — 坡州鄉村體驗空間，可參加 K-拌飯、螺鈿工藝等文化項目。' });
Object.assign(zhTW.journey, { btnContact: '預約諮詢', totalHtml: '🕐 總時數：<strong>約 4～5 小時</strong> &nbsp;|&nbsp; 集合：坡州指定地點 &nbsp;|&nbsp;請準備舒適服裝、帽子' });
Object.assign(zhTW.contact, { title: '📬 諮詢 · 預約', subtitle: '方案預約及疑問歡迎聯繫，我們將在 2 個工作天內回覆。', faqTitle: '❓ 常見問題' });
Object.assign(zhTW.contact.form, { name: '姓名 *', email: '電子郵件 *', phone: '電話', programs: '意向方案 *', date: '希望日期', num: '人數', country: '國籍', note: '其他問題', namePh: '請輸入姓名', emailPh: 'email@example.com', phonePh: '010-0000-0000', numPh: '參加人數', countryPh: '請輸入國籍', notePh: '請留下您的問題', cbTree: '🌳 種樹', cbMine: '💣 和平歷史（地雷教育）', cbBibim: '🍚 拌飯', cbNK: '🥟 朝鮮風味餐', cbCraft: '🎨 手工藝', submit: '送出諮詢', footnote: '送出後我們將在 2 個工作天內以電郵回覆' });
Object.assign(zhTW.contact, {
  label: '聯絡',
  cardEmail: '電子郵件',
  cardPhone: '電話',
  cardPhoneP: '諮詢電話稍後公布',
  cardKakao: 'KakaoTalk 頻道',
  cardKakaoL: '前往 PEACEWAY PAJU 頻道',
  cardInsta: 'Instagram',
  cardMap: '交通與位置',
  cardMapHtml: '京畿道坡州市民間通達線一帶<br>詳細地址將於預約確認後通知',
  faq1q: '問：外國人可以參加嗎？',
  faq1a: '可以。本方案歡迎國際訪客；考量民間通達線區域規定，需事先預約並完成身分核驗。',
  faq2q: '問：有英語口譯嗎？',
  faq2a: '提供基礎英語協助；團體可安排專業口譯。AI 即時口譯亦在規劃中。',
  faq3q: '問：費用多少？',
  faq3a: '視方案組合與人數而定，我們會透過諮詢表單提供報價。',
  faq4q: '問：地雷教育體驗安全嗎？',
  faq4a: '安全。僅使用安全的訓練用模型，並由韓國地雷研究所專家督導。',
  faq5q: '問：之後還能看到我種的樹嗎？',
  faq5a: '可以。線上追蹤功能上線後，可透過照片與位置資訊追蹤生長。',
  faq6q: '問：可以團體預約嗎？',
  faq6a: '可以，歡迎 10 人以上團體，並可為企業與學校客製方案。',
  faq7q: '問：下雨還去嗎？',
  faq7a: '小雨會提供雨具並照常進行；惡劣天氣將改期。',
  faq8q: '問：兒童能參加嗎？',
  faq8a: '7 歲及以上可在監護人陪同下參加。',
  faq9q: '問：在哪裡停車？',
  faq9a: '可使用場地附近指定停車場，詳情於預約確認後告知。',
  faq10q: '問：怎麼去？',
  faq10a: '從坡州市區開車約 30 分鐘；進入民間通達線需事先許可，預約時我們將說明路線。團體可洽詢接駁。',
});
Object.assign(zhTW.patent, { title: '🌐 AI 即時口譯觀光平台', subtitle: 'PEACEWAY PAJU 正在準備的創新 — 無語言隔閡的和平觀光未來', badge: '專利申請技術', flowSec: '系統運作流程' });

fs.writeFileSync(path.join(root, 'locales/zh-TW.json'), JSON.stringify(zhTW, null, 2));

console.log('Wrote en.json, ja.json, zh-CN.json, zh-TW.json');
