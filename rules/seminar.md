# Seminar Material Rules

이 문서는 논문 세미나 자료를 만들 때 반복해서 따라야 하는 제작 규칙이다. 목표는 발표자가 논문을 정확하고 읽기 쉬운 형태로 설명할 수 있게 만들고, 이전 T-Rex 세미나에서 겪은 레이아웃/검증 시행착오를 줄이는 것이다.

## 세미나 페이지 구성

- 세미나 랜딩 페이지는 가볍게 유지한다.
- 포함 항목은 제목, `발표 슬라이드 보기` 버튼, 발표 자료 링크만 둔다.
- 권장 발표 흐름, 반드시 전달할 Takeaway, 토론 질문 같은 보조 설명은 랜딩 페이지에 넣지 않는다.
- 슬라이드 미리보기 embedded deck은 만들지 않는다.

## 슬라이드 진입 방식

- 발표 슬라이드는 전용 slide-only route로 제공한다.
- 기본 진입은 `?fullscreen=1&returnTo=../` 형태를 사용한다.
- 발표 중 `Exit` 또는 종료 동작은 세미나 랜딩 페이지로 돌아오게 한다.
- 일반 화면과 fullscreen 화면의 비율/레이아웃이 크게 달라지지 않게 만든다.

## 콘텐츠 작성 원칙

- 논문 세미나는 단순 요약이 아니라, 논문의 문제의식, 방법, 실험, appendix, 한계, 관련 연구 흐름까지 설명할 수 있게 구성한다.
- 설명문만 길게 나열하지 말고, 표/도식/짧은 bullet을 섞어 발표자가 말로 풀 수 있게 만든다.
- 각 슬라이드는 하나의 질문이나 메시지를 중심으로 작성한다.
- 논문 appendix의 구현 디테일, baseline 조건, dataset schema, evaluation rubric은 가능한 한 별도 슬라이드로 보강한다.
- public site에 올리는 내용에는 개인 workplace detail, private project detail, 민감한 robot/system 정보를 넣지 않는다.

## Result와 표 정확도

- 논문의 main results, ablation studies, data efficiency, dataset ablation 등 실험 결과 figure/table은 원칙적으로 모두 세미나 자료에 포함한다.
- 공간 때문에 전체 figure/table을 한 슬라이드에 넣기 어렵다면, 결과별로 슬라이드를 나누고 누락하지 않는다.
- 특정 실험 결과를 제외해야 할 때는 왜 제외했는지 작업 기록에 명시한다.
- 논문의 result, ablation, dataset statistics, model configuration 수치는 실수 없이 원문에서 확실하게 가져온다.
- result/ablation table을 만들 때는 원문 table 또는 figure와 최소 두 번 대조한다.
- 행/열 이름, metric 단위, 평균 계산 방식, task 순서, baseline 이름을 임의로 줄이거나 바꾸지 않는다.
- 원문 figure에서 읽어온 값과 원문 table의 값이 다를 수 있으면, 슬라이드에 사용한 출처를 명확히 확인한다.
- 숫자를 직접 전사한 표는 발표 전 browser 화면이 아니라 원문 PDF/HTML과 다시 대조한다.
- 확실하지 않은 값은 추정해서 쓰지 말고 `확인 필요` 상태로 남긴 뒤 원문 확인 후 반영한다.

## 시각 자료 원칙

- 논문 figure, table, diagram은 실제 발표 화면에서 확인 가능한 크기로 넣는다.
- 도식/테이블/그림을 감싸는 박스는 콘텐츠보다 과하게 크지 않게 하고, 약간의 여백만 둔다.
- visual box 여백은 페이지 번호별 예외보다 이미지/테이블/도식 같은 콘텐츠 타입별 공통 CSS로 먼저 맞춘다.
- 슬라이드 레이아웃과 visual box 크기는 분리해서 관리한다. 레이아웃은 `stack`, `split`, `fill`, `visual-tight`처럼 화면 배치를 정하고, visual template은 콘텐츠 타입별 폭/여백을 정한다.
- visual template은 최소한 `figure`, `strip`, `table`, `table-wide`, `diagram`, `card`, `card-narrow`, `plot` 범주로 나눈다.
- 2-column 슬라이드에서는 오른쪽 visual 영역 전체를 임의로 키우지 말고, visual template token으로 박스 폭을 제한해 좌우 여백과 콘텐츠 밀도를 맞춘다.
- `visual-tight`은 작은 카드/도식이 필요한 예외적인 경우에만 사용하고, 이 경우에도 박스는 컬럼 안에서 중앙 정렬한다.
- 슬라이드 번호별 CSS selector는 마지막 수단으로만 사용한다. 번호가 밀리면 엉뚱한 페이지에 적용되므로, 먼저 콘텐츠 타입이나 명시적 variant로 해결한다.
- visual box 내부 padding은 해상도에 따라 과하게 커지지 않도록 px 기반 상한을 둔다.
- 박스 배경은 기본 배경과 충분히 대비되게 하되, 너무 튀지 않는 색을 사용한다.
- 테이블 선은 끊기지 않게 보이도록 하고, 외곽선은 rounded box와 충돌하지 않게 처리한다.
- 도식 내부 텍스트가 발표 화면에서 읽히는지 확인한다.

## 레이아웃 검증

- 슬라이드 레이아웃 수정 후 반드시 실제 브라우저 렌더링으로 확인한다.
- 슬라이드를 추가, 삭제, 재정렬한 뒤에는 전체 슬라이드를 전수 검수한다. 페이지 번호 기반 CSS selector가 밀려 기존 예외 규칙이 엉뚱한 페이지에 적용될 수 있기 때문이다.
- 최소 확인 viewport는 `1920x1080`, `2560x1440`, `3840x2160`이다.
- 화면 아래/오른쪽으로 넘치는 요소가 없는지 확인한다.
- 모든 슬라이드에서 visual box와 실제 테이블/도식/그림 콘텐츠의 간격을 확인한다.
- 콘텐츠를 감싸는 박스의 일반 목표 간격은 약 `20-35px` 수준이다. 너무 큰 빈 공간과 `0px`에 가까운 타이트한 여백을 모두 수정한다.
- visual box 검수는 단순 overflow 여부만 보지 말고, 콘텐츠 타입별 template이 적용됐는지 확인한다. 예를 들어 표는 표 폭에 맞게, 카드형 수식/구조도는 좁은 박스에, 긴 가로 figure는 strip/wide 계열에 들어가야 한다.
- `1920x1080`, `2560x1440`, `3840x2160`에서 같은 슬라이드의 박스가 서로 다른 성격으로 보이면 CSS media query보다 template token을 먼저 조정한다.
- 테이블 행/열 간격이 너무 좁아 줄바꿈으로 깨지지 않는지 확인한다.
- 텍스트 영역과 visual 영역의 비율이 조화로운지 확인한다.
- fullscreen 전/후 레이아웃 차이가 불필요하게 크지 않은지 확인한다.

## 개발과 검증 환경

- Astro/Starlight 세미나 자료는 Docker Node 24 환경을 우선 사용한다.
- 로컬 dev server는 보통 hot reload를 믿되, config/base path/dependency/container 상태가 바뀌었거나 화면이 stale하면 재시작한다.
- 의미 있는 변경 후 `npm run build`를 실행한다.
- 슬라이드 layout, figure, table, typography 변경 시 Playwright와 cached Chromium으로 fullscreen 렌더링을 확인한다.

## 작업 기록과 커밋

- 큰 세미나 작업을 마친 뒤 `WORKING.md`에 현재 구조, 주요 route, 검증 방법, 남은 이슈를 기록한다.
- 반복적으로 지켜야 할 운영 규칙은 `AGENTS.md` 또는 `rules/seminar.md`에 남긴다.
- 커밋은 기능 단위로 나눈다.
- 권장 커밋 단위는 콘텐츠 보강, 슬라이드 UI/레이아웃, 운영 문서/규칙이다.

## 금지와 주의

- 발표용 첫 화면을 마케팅 랜딩 페이지처럼 만들지 않는다.
- 슬라이드 안에 사용법 설명 텍스트를 넣지 않는다.
- 표/도식이 있는 박스를 장식용으로 크게 띄우지 않는다.
- 콘텐츠 타입이 같은데 슬라이드마다 박스 폭, 위치, 내부 여백이 제각각이면 개별 페이지 보정 전에 공통 visual template을 만든다.
- 검증 없이 1920 기준으로만 맞췄다고 끝내지 않는다.
- result 표나 ablation 표를 기억이나 눈대중으로 재구성하지 않는다.
- 논문 실험 결과 figure/table을 임의로 생략하지 않는다.
- 슬라이드 번호에 의존하는 CSS를 수정한 뒤 전체 슬라이드 전수 검수를 생략하지 않는다.
