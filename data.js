/*
  포트폴리오 콘텐츠 수정 파일
  - 내 전용 editor.html에서 손쉽게 수정하거나, 이 파일을 직접 수정할 수 있습니다.
  - 변경 사항을 GitHub에 업로드하면 공개 페이지에 반영됩니다.
  - image: 이미지 파일의 상대 경로. 이미지가 없다면 null 유지하세요.
  - stage: 개인 프로젝트에만 사용. 0=기획, 1=프로토타이핑, 2=테스트 빌드, 3=출시.
  - stage가 아직 검증되지 않았다면 null로 두면 "진행 단계 확인 중"으로 표시됩니다.
  - pdfs: 여러 건 가능. URL이 없으면 href: null, PDF는 열리지 않고 '준비 중'으로 표시됩니다.
  - video: 같은 방식으로 URL이 없으면 null.
  - 타인의 참고 PDF 자료는 이 프로젝트에 포함하지 않았습니다.
*/
window.PORTFOLIO_DATA = {
  profile: {
    name: '김재웅',
    role: '게임 기획자',
    slogan: '선택이 전략이 되도록.',
    intro: '유저의 선택이 의미 있는 결과와 다음 판단으로 이어지도록 전투와 시스템을 설계합니다.',
    career: { company: '(주)페이즈포 · 게임 기획', period: '2025.08 – 2025.12' },
    gameRecordUrl: 'https://bbudle.github.io/game_collection.html',
    careerPdfUrl: 'docs/경력기술서.pdf' // 업로드한 경력기술서 원본 파일
  },
  projects: [
    {
      id: 'jjaekjjaek', category: 'work', order: 1,
      title: '짹짹', genre: '모바일 캐주얼 · 라이브 서비스',
      description: '라이브 서비스 운영과 플레이 흐름 개선 경험.',
      image: null,
      pdfs: [{label: '라이브·콘텐츠', href: null}],
      video: {label: '플레이 영상', href: null}
    },
    {
      id: 'arcana', category: 'work', order: 2,
      title: '아르카나', genre: '룰렛 기반 전투 · 전략 RPG',
      description: '확률과 선택이 전투 결과를 만드는 룰렛 전투 시스템.',
      image: null,
      pdfs: [
        {label: '전투 기획', href: null},
        {label: '시스템·콘텐츠', href: null}
      ],
      video: {label: '플레이 영상', href: null}
    },
    {
      id: 'fantasy-chess', category: 'personal', order: 1,
      title: '판타지 체스', genre: '전략 오토배틀러',
      description: '부대 배치와 경제·시너지 선택으로 전략을 만드는 게임.',
      image: null,
      stage: 1, // 잠정 표시. 공개 전 최신 기획·개발 현황으로 교체
      pdfs: [
        {label: '전략적 선택·설계 판단·검증 과정', href: 'docs/fantasy-chess.pdf'}
      ],
      video: {label: '플레이 영상', href: null}
    },
    {
      id: 'smash-legacy', category: 'personal', order: 2,
      title: 'Smash & Legacy', genre: '3D 액션 로그라이트',
      description: '전투와 성장의 반복을 통해 선택을 쌓아가는 게임.',
      image: null,
      stage: 1, // 잠정 표시
      pdfs: [
        {label: '세대 계승·아웃게임 성장 설계', href: 'docs/smash-legacy.pdf'}
      ],
      video: {label: '플레이 영상', href: null}
    },
    {
      id: 'stellar-observatory', category: 'personal', order: 3,
      title: '눈동자 그녀 우주', genre: '천체 관측 · 힐링 / 코즈믹 호러',
      description: '낮의 일상과 밤의 관측이 교차하는 서사형 게임.',
      image: 'assets/observatory-card.webp', // 사용자 제공 원본 이미지 사용
      stage: 0, // 잠정 표시
      pdfs: [{label: '시스템·콘텐츠 기획', href: null}],
      video: {label: '플레이 영상', href: null}
    },
    {
      id: 'combat-prototype', category: 'personal', order: 4,
      stage: 1, // 프로토타이핑 단계까지 완료. 출시 단계로 과장하지 않음
      title: '귀무자 전투 프로토타입', genre: '2D 액션 전투 · Unreal Engine',
      description: '같은 공격에 여러 대응을 준비했을 때, 각 행동을 선택할 이유가 생기는지 시험했습니다.',
      image: 'assets/combat-prototype-cover.webp',
      pdfs: [{label: '전투 설계·구현·검증 사례', href: 'docs/combat-prototype.pdf'}],
      video: {label: '대표 영상', href: 'media/combat-prototype.mp4'}
    },
    {
      id: 'system-prototype', category: 'personal', order: 5,
      stage: 1, // 프로토타이핑 단계까지 완료. 출시 단계로 과장하지 않음
      title: '성장·영토 확장 프로토타입', genre: '방치형·전략 시스템 · Unreal Engine',
      description: '사냥의 성과를 점령·배치·에너지 공급과 연결해 다음 성장 목표를 만드는 구조를 시험했습니다.',
      image: 'assets/system-prototype-cover.webp',
      pdfs: [{label: '성장·시스템 설계·검증 사례', href: 'docs/system-prototype.pdf'}],
      video: {label: '대표 영상', href: 'media/system-prototype.mp4'}
    }
  ]
};
