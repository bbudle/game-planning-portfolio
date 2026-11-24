(() => {
  'use strict';
  const data = window.PORTFOLIO_DATA;
  const $ = (selector) => document.querySelector(selector);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeLocal = (value, type) => {
    if (typeof value !== 'string' || !value.trim() || value.includes('..')) return null;
    const url = value.trim().replace(/^\.\//, '');
    // Video is served as an ordinary static media file, never via YouTube or an iframe.
    if (type === 'video' && /^media\/[a-zA-Z0-9가-힣_%().\/-]+\.(?:mp4|webm|ogv)$/i.test(url)) return url;
    if (type === 'pdf' && /^docs\/[a-zA-Z0-9가-힣_%().\/-]+\.pdf$/i.test(url)) return url;
    return null;
  };
  const videoType = (path) => path.toLowerCase().endsWith('.webm') ? 'video/webm' : path.toLowerCase().endsWith('.ogv') ? 'video/ogg' : 'video/mp4';
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const project = data?.projects?.find(p => p.id === id);
  const title = $('#detailTitle');
  const player = $('#detailPlayer');
  const docs = $('#detailDocuments');
  if (!project) {
    $('#detailCategory').textContent = '포트폴리오';
    title.textContent = '프로젝트를 찾을 수 없습니다';
    $('#detailDescription').textContent = '목록으로 돌아가 프로젝트를 다시 선택해 주세요.';
    $('.detail__media').hidden = true;
    docs.hidden = true;
    document.title = '프로젝트를 찾을 수 없습니다 | PORTFOLIO';
    return;
  }
  document.title = `${project.title} | PORTFOLIO`;
  $('#detailCategory').textContent = project.category === 'work' ? '실무 프로젝트' : project.category === 'prototype' ? '개인 프로젝트 · 기획 검증 프로토타입' : '개인 프로젝트';
  title.textContent = project.title;
  $('#detailDescription').textContent = [project.genre, project.description].filter(Boolean).join(' · ');
  const video = safeLocal(project.video?.href, 'video');
  if (video) {
    const el = document.createElement('video');
    el.className = 'detail__video';
    el.controls = true;
    el.preload = 'metadata';
    el.playsInline = true;
    if (project.image && /^assets\/[a-zA-Z0-9_.%()\/-]+$/.test(project.image)) el.poster = project.image;
    el.setAttribute('aria-label', `${project.title} 대표 영상`);
    const source = document.createElement('source');
    source.src = video;
    source.type = videoType(video);
    el.append(source);
    el.append(document.createTextNode('이 브라우저에서는 동영상 재생을 지원하지 않습니다.'));
    el.addEventListener('error', () => {
      player.innerHTML = '<div class="detail__pending"><span>영상을 불러올 수 없습니다.</span><small>영상 파일 경로와 형식을 확인해 주세요.</small></div>';
    });
    player.replaceChildren(el);
  }
  const pdfs = Array.isArray(project.pdfs) ? project.pdfs : [];
  if (!pdfs.length) {
    docs.innerHTML = '<div class="detail__pdf detail__pdf--pending"><span>기획 PDF 준비 중</span><small>준비 중</small></div>';
    return;
  }
  docs.innerHTML = pdfs.map((pdf, i) => {
    const href = safeLocal(pdf.href, 'pdf');
    const label = esc(pdf.label || `기획 포트폴리오 ${i+1}`);
    return href
      ? `<a class="detail__pdf" href="${esc(href)}" target="_blank" rel="noopener noreferrer"><span>${label} · PDF 보기</span><small>새 탭에서 열기 ↗</small></a>`
      : `<div class="detail__pdf detail__pdf--pending"><span>${label} · PDF 보기</span><small>준비 중</small></div>`;
  }).join('');
})();
