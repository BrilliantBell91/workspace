# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

개인 프로필 웹사이트 (static site). 단일 `index.html` 파일에 HTML, CSS, JavaScript가 모두 포함되어 있습니다.
- **호스팅**: GitHub Pages
- **기술 스택**: HTML5 + Tailwind CSS (CDN) + Vanilla JavaScript
- **빌드 프로세스**: 없음 (정적 사이트)

## 주요 개발 명령어

이 프로젝트는 빌드 도구가 필요 없습니다. 간단하게 파일을 수정하고 브라우저에서 `index.html`을 열어 변경사항을 확인하면 됩니다.

### 로컬 개발
```bash
# 로컬 서버 실행 (Python 설치 시)
python -m http.server 8000

# 또는 Node.js의 http-server 사용
npx http-server
```

그 후 `http://localhost:8000` 또는 `http://localhost:8080`에서 확인

### 배포
```bash
git add index.html
git commit -m "Update: [변경 내용]"
git push origin main
```

GitHub Pages는 main 브랜치의 변경사항을 자동으로 배포합니다.

## 파일 구조

```
my-profile-site/
├── index.html          # 프로필 웹사이트 (모든 컨텐츠 포함)
├── .nojekyll          # GitHub Pages에서 Jekyll 비활성화
├── .gitignore         # 제외 파일 목록
└── CLAUDE.md          # 이 파일
```

## 코드 아키텍처

### HTML 구조 (index.html)

**레이아웃**: Grid 레이아웃 (md:col-span-4)
- 좌측 사이드바 (md:col-span-1): 프로필 정보, LinkedIn/Email 버튼
- 메인 콘텐츠 (md:col-span-3): About, Skills, Projects, Contact 섹션

**섹션 구성** (scroll-based navigation)
- Navigation bar (fixed, 상단)
- About Me: 자기소개 및 3가지 핵심 역량
- Core Skills: 4개의 스킬 카드 (각 스킬에 태그 포함)
- Featured Projects: 3개의 프로젝트 카드
- Get in Touch: 이메일/LinkedIn 연락처
- Footer

### CSS 스타일링

**색상 체계**:
- Primary: Orange (#FB923C), Amber (#F59E0B)
- Background: Gradient orange/amber (from-orange-100 via-orange-50 to-amber-50)
- Dark elements: Gray-800/900

**주요 CSS 클래스** (인라인 `<style>` 태그):
- `.gradient-text`: 오렌지-앰버 그래디언트 텍스트
- `.gradient-bg`: 배경 그래디언트
- `.fade-in`: Intersection Observer로 트리거되는 페이드인 애니메이션
- `.avatar`: 프로필 사진 원형 컨테이너
- `.project-card`: 호버 시 위로 올라가는 카드
- `.nav-link`: 네비게이션 링크 (하단 언더라인 애니메이션)
- `.skill-tag`: 스킬 태그 (호버 시 주황색으로 변함)

**Tailwind 사용**: CDN에서 로드 (별도 설치 필요 없음)

### JavaScript 기능

**1. 프로필 이미지 로드** (line 325-331)
```javascript
// LinkedIn 프로필 이미지를 동적으로 로드
// img src에 LinkedIn 이미지 URL 설정
```
- LinkedIn에서 프로필 사진을 외부 URL로 가져옴
- 변경 시: `linkedinImageUrl` 값 수정

**2. 스무스 스크롤 네비게이션** (line 334-345)
- 앵커 링크 클릭 시 부드럽게 스크롤
- `a[href^="#"]` 선택자로 모든 앵커 링크에 적용

**3. Intersection Observer (페이드인 애니메이션)** (line 348-363)
- 스크롤해서 요소가 뷰포트에 들어오면 `.fade-in` 클래스에 `.visible` 추가
- `threshold: 0.1`, `rootMargin: '0px 0px -100px 0px'` 설정
- 모든 `.fade-in` 요소에 observer 적용

**4. 네비게이션 활성 상태 추적** (line 366-385)
- 스크롤 위치에 따라 현재 섹션 감지
- 해당 네비게이션 링크에 `.active` 클래스 추가
- `.active` 클래스는 링크 색상을 주황색으로 변경하고 하단 언더라인 표시

## 콘텐츠 수정 가이드

### 기본 정보 변경
- **이름**: nav의 `<a href="#">` 텍스트 또는 프로필 카드의 `<h2>` 텍스트
- **직급**: 프로필 카드의 `<p class="text-orange-400 font-semibold">` 텍스트
- **이메일**: `mailto:` 링크와 Contact 섹션의 이메일 주소
- **LinkedIn**: 링크 URL과 사용자 이름

### 섹션 추가/수정
1. 섹션을 Main Content에 `<section id="section-id">` 추가
2. Navigation bar에 해당 네비게이션 링크 추가 (`data-section` 속성 필수)
3. JavaScript 코드는 자동으로 감지 (별도 수정 불필요)

### 스킬/프로젝트 카드 추가
- Skills: `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">` 내에 카드 추가
- Projects: `<div class="grid grid-cols-1 md:grid-cols-3 gap-6">` 내에 카드 추가
- 카드는 `.fade-in` 클래스 포함 (자동 애니메이션 적용)

## 주의사항

- **외부 의존성**: Tailwind CSS는 CDN에서 로드되므로 인터넷 필요
- **LinkedIn 이미지 URL**: 주기적으로 만료될 수 있으므로 정기적으로 확인 필요
- **반응형 디자인**: `md:` 프리픽스는 768px 이상의 화면에 적용됨 (모바일 우선 설계)
- **애니메이션 성능**: fade-in 애니메이션은 많은 요소에 적용되어 있으므로, 추가할 때는 성능 모니터링 권장

## 배포 주의사항

- GitHub Pages에서 호스팅되므로 main 브랜치 변경사항이 자동 배포됨
- `.nojekyll` 파일로 Jekyll 프로세싱 비활성화 (HTML이 수정되지 않도록)
- 변경 후 GitHub에 push하면 몇 초 내에 배포 완료
