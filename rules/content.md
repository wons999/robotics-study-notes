# Content organization

자료 추가의 공통 순서와 완료 기준은 [contributing.md](contributing.md), 상세 연구 검증은 [survey.md](survey.md), 슬라이드 검증은 [seminar.md](seminar.md)를 따른다.

## 저장 위치와 역할

| 경로 | 역할 |
| --- | --- |
| `src/content/docs/paper-notes/<slug>.mdx` | 개별 논문·공식 article/release 분석, 계열 overview. `research.kind`로 구분 |
| `src/content/docs/robot-learning/` | 연구 지도와 robot learning의 연결 설명 |
| `src/content/docs/robotics-foundations/`, `robot-systems/` | 기초 개념·시스템 학습 자료 |
| `src/content/docs/topics/` | 연구 질문·권장 읽기 순서·비교 조건. 논문 본문을 복제하지 않음 |
| `src/content/docs/seminars/` | 발표 자료 landing과 숨겨진 slide-only route |
| `src/content/docs/experiments/`, `weekly-log/` | 공개 가능한 실험/학습 노트·기록 |
| `public/<topic>/` | 원문 그림·표와 provenance manifest |
| `rules/`, `AGENTS.md`, README | 작성자·agent를 위한 영구 운영 규칙. 사이트 본문과 구분 |

## 공통 메타데이터

```yaml
research:
  kind: paper
  topics: [vla, sensing]
  status: reviewing
  reviewedAt: null
  source: https://arxiv.org/abs/0000.00000
```

- `kind`: paper / release / article / overview / map / note / foundation / system / seminar / log / index. `index`는 자료 목록에서 제외한다.
- `topics`: vla / sensing / action / data / humanoid / foundations. 복수 선택 가능.
- `status`: draft는 작성 중, reviewing은 재검토 필요, verified는 기록한 범위의 내용 검증 완료.
- `reviewedAt`: 내용 검토일 YYYY-MM-DD를 YAML 문자열로 작성한다(예: `'2026-10-08'`). 따옴표 없는 날짜는 Astro에서 Date 객체로 해석해 string schema 검사를 실패할 수 있다. 미등록은 null. 이동·메타데이터 이관 날짜를 검토일로 쓰지 않는다.
- `family`: groot / pi / molmo / ecot 등 모델 계열 문서에만 기록한다.
- `source`: 원문 URL. 새 Survey에는 반드시 기록한다.

허용 값과 상태 제약의 실제 정의는 `src/content.config.ts`, 표시 이름은 `src/data/research.ts`다. 새 topic/kind가 필요하면 schema·label·읽기 경로·검사를 함께 수정한다. 기존 topic으로 표현 가능한 자료를 위해 새 분류를 늘리지 않는다.

## 새 연구 문서의 MDX 시작 형식

아래 `<slug>`·제목·description·source는 실제 자료로 교체한다. frontmatter의 title이 페이지 제목을 만들므로 본문에 같은 H1을 반복하지 않는다.

```mdx
---
title: 자료의 대표 이름
description: 다루는 질문과 검토 범위
research:
  kind: paper
  topics: [vla, action]
  status: draft
  reviewedAt: null
  source: https://arxiv.org/abs/실제-ID와-version
---

import ResearchMeta from '../../../components/ResearchMeta.astro';
import PaperFigure from '../../../components/PaperFigure.astro';
import SectionFeedback from '../../../components/SectionFeedback.astro';

<ResearchMeta entryId="paper-notes/<slug>" />
<SectionFeedback page="자료의 대표 이름" section="메타데이터" />

## 메타데이터

원문 version·날짜·공식 project/code·검토 commit과 범위.
이후 본문 구성은 rules/survey.md를 따른다.
```

`ResearchMeta.entryId`는 파일 확장자를 제외한 collection ID와 일치시킨다. 쓰지 않는 component import는 제거한다. `PaperFigure src="/<topic>/figure-01.png"`처럼 public-root 경로를 사용하면 component가 site base를 붙인다. `/robotics-study-notes`를 이미지나 내부 콘텐츠 링크에 직접 중복 삽입하지 않는다.

일반 Markdown 내부 링크는 source 파일 위치가 아닌 **출력 route**를 기준으로 작성한다. 예를 들어 `/paper-notes/a/`에서 다른 Survey는 `../b/`, 주제는 `../../topics/vla/`다. 기존 source 파일을 이동해 해결하기 전에 현재 URL과 `scripts/check-content.mjs`의 검사 결과를 확인한다.

## 링크 열기 규칙

외부 웹 페이지 링크는 `target="_blank"`와 `rel="noopener noreferrer"`로 새 탭/창에서 연다. 내부 문서·목차 이동은 현재 탭을 유지한다. 실제 탭/창 선택은 브라우저 설정에 따른다.

`src/components/SiteHead.astro`가 상단 메뉴·Markdown/MDX 본문·공통 component의 외부 HTTP/HTTPS 링크에 이 규칙을 적용한다. 새 자료의 Markdown 링크마다 HTML을 작성할 필요는 없다. 현재 preview origin과 `SITE_URL`의 origin은 내부로 취급하므로, 확인용 서버에서도 공개 사이트의 절대 URL을 외부로 오인하지 않는다. fragment·메일·전화 링크와 `download` 링크는 기존 동작을 유지한다. 새 component에서 외부 링크를 직접 작성할 때도 위 속성을 명시하고, 기존 `rel` 값은 보존한다.

공통 링크 처리 변경은 홈페이지 상단 링크, 논문 원문·프로젝트 링크가 새 탭으로 열리고 원래 페이지가 유지되는지 확인한다. 내부 카드·문서 링크가 현재 탭에서 이동하는지도 `npm run test:ui`로 검증한다.

## 운영

파일 경로는 기존 URL을 보존한다. 논문을 주제별로 복제하거나 이동하지 않는다. 논문 목록은 `ResearchCatalog`가 공통 메타데이터에서 생성하고, `topics/`는 질문·권장 읽기 순서·비교 조건을 사람이 작성한다. 비교 표와 기술 해설은 유지하되, 단순 문서 inventory를 여러 곳에서 수동 관리하지 않는다.

새 Survey는 `ResearchMeta`를 본문 첫 부분에 추가한다. 내용 검토와 모델 재현을 구분한다. `verified`는 PDF·수치·코드 공개 범위 등의 내용 검토가 완료되었다는 뜻이며, 본문 검증 메모에 확인 범위와 미확인 항목을 남긴다. 기존 문서 이관은 `reviewing`, 검토일 `null`을 기본으로 한다.

## 세미나

- 슬라이드 데이터: `src/data/<topic>-slides.ts`.
- 주제별 adapter: `src/components/<Topic>SeminarDeck.astro`.
- 공통 표시 컴포넌트: `src/components/SeminarDeck.astro`.
- 공통 interaction: `public/seminar-controls.js`.

T-Rex의 기존 figure variant와 시각 스타일은 유지한다. 새로운 세미나에서 필요한 스타일만 공통 컴포넌트에 추가하고, 기존 슬라이드 번호 예외는 전수 검증 없이 다른 덱에 적용하지 않는다. 세미나의 landing/slides 분리와 Exit 동작은 `AGENTS.md`, 세부 QA는 `rules/seminar.md`를 따른다.

## 검증

`npm run build`는 콘텐츠 링크·이미지·필수 메타데이터 확인, Astro 타입 검사, 정적 사이트 빌드를 수행한다. `npm test`는 콘텐츠 검사기의 누락 검출을 검증한다. PR workflow는 둘 다 실행하며, main 배포도 동일한 콘텐츠 검사를 거친다. 외부 URL의 유효성은 작성 시 원문을 직접 확인한다. CI에서는 외부 사이트 장애로 전체 검증을 불안정하게 만들지 않도록 네트워크 요청을 하지 않는다.

브라우저 회귀 확인은 build와 같은 base로 preview를 실행한 뒤 `CHECK_SITE_URL=http://127.0.0.1:4388/robotics-study-notes CHROMIUM_EXECUTABLE_PATH=/path/to/chrome npm run test:ui`로 실행한다. 목록 검색·상태 필터, 주제·계열 페이지, 등록된 논문의 그림·표 전체, T-Rex 전체 슬라이드를 세 해상도에서 확인한다. 새 논문의 manifest와 UI 검사 등록은 [contributing.md](contributing.md#4-찾을-수-있도록-연결)를 따른다. 이미지 manifest 변경은 원문/crop 검토 후 checksum을 갱신한다.

본문·결과 표는 좁은 화면과 desktop에서도 확인한다. 전체 페이지가 가로로 넘치지 않는지, caption·축·legend가 잘리지 않는지 확인한다. 자동 로딩 검사가 그림 내용의 정확성과 가독성을 대신하지 않는다.
