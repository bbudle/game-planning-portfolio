(() => {
  'use strict';
  const data = window.PORTFOLIO_DATA;
  if (!data || !Array.isArray(data.projects)) return;
  const $ = (selector) => document.querySelector(selector);
  const stages = ['기획', '프로토타이핑', '테스트 빌드', '출시'];
  const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = (url) => {
    if (!url || typeof url !== 'string') return null;
    const value = url.trim();
    if (/^https:\/\//i.test(value)) return value;
    if (/^(?:\.\/)?(?:assets|docs|media)\/[a-zA-Z0-9가-힣_.%()\/-]+$/.test(value) && !value.includes('..')) return value;
    return null;
  };
  const icon = (kind) => kind === 'pdf'
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4Z" fill="currentColor" stroke="none"/></svg>';

  function resourceRow(kind, label, url, projectId) {
    const href = safeUrl(url);
    const text = kind === 'pdf' ? `PDF 보기 · ${label}` : '영상 보기';
    const content = `${icon(kind)}<span class="resource-row__label">${escapeHtml(text)}</span>`;
    // PDF는 PDF 보기 버튼을 눌렀을 때만 원본 파일을 직접 연다.
    if (kind === 'pdf' && href && (/(?:\.pdf)(?:[?#].*)?$/i.test(href) || /^https:\/\//i.test(href))) {
      return `<a class="resource-row" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(text)} · 새 탭에서 열기">${content}<span class="resource-row__arrow" aria-hidden="true">↗</span></a>`;
    }
    // 영상 보기 버튼은 우리 사이트의 재생 페이지로만 이동한다. (YouTube/외부 임베드 없음)
    if (kind === 'video' && href && /^(?:\.\/)?media\/[a-zA-Z0-9가-힣_%().\/-]+\.(?:mp4|webm|ogv)$/i.test(href)) {
      return `<a class="resource-row" href="project.html?id=${encodeURIComponent(projectId)}" aria-label="${escapeHtml(text)} · 프로젝트 페이지에서 재생">${content}<span class="resource-row__arrow" aria-hidden="true">→</span></a>`;
    }
    return `<div class="resource-row resource-row--pending" title="자료 준비 중" aria-label="${escapeHtml(text)} · 준비 중">${content}<span class="resource-row__pending">준비 중</span></div>`;
  }

  function progress(stage) {
    if (stage === null || !Number.isInteger(stage) || stage < 0 || stage > 3) {
      return '<div class="progress progress--unknown"><span>진행 단계 확인 중</span></div>';
    }
    return `<div class="progress" aria-label="개발 단계: ${stages[stage]}"><div class="progress__stages">${stages.map((s, i) => `<span class="progress__stage ${i===stage?'is-current':''}">${s}</span>`).join('')}</div><div class="progress__track">${stages.map((s,i) => `<span class="progress__segment ${i<=stage?'is-passed':''} ${i===stage?'is-current':''}" style="--stage-index:${i}" title="${s}"></span>`).join('')}</div></div>`;
  }

  function projectCard(project) {
    const isPersonal = project.category === 'personal';
    const hasImage = !!safeUrl(project.image);
    const rows = (Array.isArray(project.pdfs) ? project.pdfs : []).map((pdf) => resourceRow('pdf', pdf.label, pdf.href, project.id)).join('');
    const video = project.video ? resourceRow('video', project.video.label, project.video.href, project.id) : '';
    const art = hasImage ? `style="--cover:url('${escapeHtml(project.image)}')"` : '';
    return `<article class="project-card ${hasImage?'project-card--illustrated':'project-card--empty'} " id="${escapeHtml(project.id)}">
      <div class="project-card__cover" ${art}>
        <div class="project-card__info">
          <h3>${escapeHtml(project.title)}</h3>
          <p class="project-card__genre">${escapeHtml(project.genre)}</p>
          <p class="project-card__description">${escapeHtml(project.description)}</p>
        </div>
        ${isPersonal && project.showProgress !== false ? progress(project.stage) : ''}
      </div>
      <div class="project-card__resources" aria-label="${escapeHtml(project.title)} 자료">${rows}${video}</div>
    </article>`;
  }

  const works = data.projects.filter((p) => p.category === 'work').sort((a,b)=>a.order-b.order);
  const personal = data.projects.filter((p) => p.category === 'personal').sort((a,b)=>a.order-b.order);
  $('#workCards').innerHTML = works.map(projectCard).join('');
  $('#personalCards').innerHTML = personal.map(projectCard).join('');

  function renderProfile() {
    const p = data.profile;
    if (!p) return;
    $('#profileName').textContent = p.name;
    $('#profileRole').textContent = p.role;
    $('#profileSlogan').textContent = p.slogan;
    $('#profileIntro').textContent = p.intro;
    $('#careerCompany').textContent = p.career.company;
    $('#careerPeriod').textContent = p.career.period;
    $('#mobileName').textContent = p.name;
    $('#mobileIntro').textContent = p.slogan;
    $('#year').textContent = new Date().getFullYear();
    const record = safeUrl(p.gameRecordUrl);
    const recordLink = $('#recordLink');
    const mobileRecord = $('.intro-mobile__links a');
    if (record) { recordLink.href = record; mobileRecord.href = record; }
    else { recordLink.removeAttribute('href'); recordLink.classList.add('nav-link--disabled'); mobileRecord.removeAttribute('href'); }
    const career = safeUrl(p.careerPdfUrl);
    const careerLink = $('#careerLink');
    if (career) {
      careerLink.href = career;
      careerLink.target = '_blank';
      careerLink.rel = 'noopener noreferrer';
      careerLink.classList.remove('nav-link--disabled');
      careerLink.removeAttribute('aria-disabled');
      careerLink.querySelector('.nav-link__arrow').textContent='↗';
      const mobileCareer = $('#mobileCareer');
      mobileCareer.href = career;
      mobileCareer.target = '_blank';
      mobileCareer.rel = 'noopener noreferrer';
      mobileCareer.textContent = '경력기술서 PDF ↗';
    } else {
      careerLink.removeAttribute('href');
      careerLink.classList.add('nav-link--disabled');
      careerLink.setAttribute('aria-disabled', 'true');
      careerLink.querySelector('.nav-link__arrow').textContent = '준비 중';
      const mobileCareer = $('#mobileCareer');
      mobileCareer.removeAttribute('href');
      mobileCareer.textContent = '경력기술서 준비 중';
    }
  }
  renderProfile();

  const layout = $('#layout');
  const toggle = $('#sidebarToggle');
  let saved = null;
  try { saved = localStorage.getItem('portfolio-sidebar-collapsed'); } catch (_) { /* storage can be disabled on local preview */ }
  const setCollapsed = (collapsed) => {
    layout.classList.toggle('is-collapsed',collapsed);
    toggle.setAttribute('aria-expanded',String(!collapsed));
    toggle.setAttribute('aria-label',collapsed?'사이드바 펼치기':'사이드바 접기');
    toggle.setAttribute('title',collapsed?'사이드바 펼치기':'사이드바 접기');
    try { localStorage.setItem('portfolio-sidebar-collapsed', String(collapsed)); } catch (_) { /* safe fallback */ }
  };
  setCollapsed(saved === 'true');
  toggle.addEventListener('click',() => setCollapsed(!layout.classList.contains('is-collapsed')));
})();
