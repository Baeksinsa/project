// 검색
document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const q = document.getElementById('searchInput').value.trim();
  if (!q) return;
  window.open('https://search.naver.com/search.naver?query=' + encodeURIComponent(q), '_blank');
});

// 헤드라인 롤링
const headlines = [
  ['연합뉴스', '오늘의 주요 뉴스를 확인하세요'],
  ['KBS', '전국 대체로 맑음…일교차 크게 벌어져'],
  ['한국경제', '코스피, 외국인 매수세에 상승 마감'],
  ['전자신문', '차세대 AI 반도체 경쟁 본격화'],
];
let hIdx = 0;
const headlineEl = document.getElementById('headline');
setInterval(() => {
  hIdx = (hIdx + 1) % headlines.length;
  headlineEl.querySelector('.press').textContent = headlines[hIdx][0];
  headlineEl.querySelector('.headline-text').textContent = headlines[hIdx][1];
}, 3000);

// 주제별 콘텐츠
const themeData = {
  ent:    { color: '#ffe3ec', emoji: '🎬', items: ['신작 드라마 첫 방송 시청률 화제', '올가을 개봉 영화 기대작 총정리', '인기 아이돌 컴백 쇼케이스 현장', '예능 프로그램 새 시즌 확정'] },
  sports: { color: '#e3f2ff', emoji: '⚽', items: ['프로야구 포스트시즌 일정 확정', '국가대표 평가전 명단 발표', '해외파 선수 시즌 첫 골 기록', '마라톤 대회 참가 신청 시작'] },
  game:   { color: '#ede7ff', emoji: '🎮', items: ['기대작 RPG 사전예약 100만 돌파', 'e스포츠 월드 챔피언십 개막', '인디 게임 추천 TOP 5', '신규 콘솔 출시일 공개'] },
  it:     { color: '#e3fff1', emoji: '💻', items: ['생성형 AI 최신 동향 정리', '새 스마트폰 언박싱 리뷰', '양자컴퓨터 상용화 어디까지 왔나', '개발자가 알아야 할 보안 수칙'] },
  food:   { color: '#fff4e0', emoji: '🍜', items: ['가을 제철 음식 레시피 모음', '서울 숨은 맛집 BEST 10', '10분 완성 자취 요리', '홈카페 디저트 만들기'] },
  travel: { color: '#e0f7ff', emoji: '✈️', items: ['단풍 명소 국내 여행지 추천', '주말 당일치기 근교 여행', '가성비 해외여행지 TOP 5', '캠핑 초보를 위한 준비물'] },
};

const themeList = document.getElementById('themeList');
function renderTheme(key) {
  const { color, emoji, items } = themeData[key];
  themeList.innerHTML = items.map((title) => `
    <li><a href="#">
      <span class="thumb" style="background:${color}">${emoji}</span>
      <div><p class="title">${title}</p><p class="source">네이버 주제판</p></div>
    </a></li>`).join('');
}

document.getElementById('themeTabs').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  document.querySelectorAll('#themeTabs button').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  renderTheme(btn.dataset.theme);
});

// 뉴스스탠드 탭
document.querySelectorAll('.tabs button').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tabs button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

renderTheme('ent');
