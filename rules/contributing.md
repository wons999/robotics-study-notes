# 자료 추가와 수정 절차

사람과 agent가 같은 순서로 작업하기 위한 공통 절차다. 새 논문, 연구 노트, 계열 overview, 기존 문서 보강, 세미나 작업에 적용한다. 사용자가 정한 범위·실행 호스트·게시 요청을 먼저 따른다.

## 시작할 때 읽는 문서

| 문서 | 역할 |
| --- | --- |
| [AGENTS.md](../AGENTS.md) | 프로젝트 제약, feedback 저장소, 작업 후 확인용 서버 유지 |
| 이 문서 | 시작부터 검증·인계까지의 작업 순서와 완료 기준 |
| [content.md](content.md) | 저장 위치, metadata, URL·목록·주제 연결, 공통 MDX 형식 |
| [survey.md](survey.md) | 논문·공식 연구 자료의 근거 확인, 상세 분석, 5-pass 검토 |
| [seminar.md](seminar.md) | 슬라이드 구조, 발표 화면과 전체 덱 검증 |
| [WORKING.md](../WORKING.md) | 현재 상태·남은 일. 영구 규칙의 대체 문서가 아님 |

## 1. 기존 상태와 자료의 종류 확인

`git status --short --branch`와 기존 문서를 읽는다. 작업 중인 변경을 보존하고 같은 자료의 중복 문서가 있는지 먼저 찾는다. 제목이 비슷해도 paper, release, article, overview를 원문에 맞게 구분한다. 기존 문서의 URL은 유지한다.

새 자료가 기존 연구 질문에 어떻게 연결되는지 정한다. 논문 상세 분석은 `paper-notes/`, 여러 버전의 안내는 overview, 권장 읽기 순서와 비교 조건은 `topics/`가 맡는다. 세부 저장 위치는 [content.md](content.md)를 따른다.

## 2. 원문과 공개 범위 고정

논문은 PDF version·공개일, 공식 project/code URL과 조사한 code commit을 기록한다. PDF·그림·표의 확보와 분석은 [survey.md](survey.md)의 순서대로 수행한다. 원문, 현재 공식 코드, 비공식 재현, 직접 실행한 결과를 구분한다.

도구·학습 코드가 공개되지 않았으면 그 범위를 명시한다. task-specific training이 없는 평가 논문은 architecture/training 항목에 해당 이유를 적는다. 제공된 controller·IK·geometry API·학습 policy가 맡는 역할을 설명한다.

## 3. 본문·metadata·asset 작성

[content.md](content.md)의 MDX 형식으로 시작하고, 검토 전에는 `draft` 또는 `reviewing` 상태를 사용한다. 제목과 description은 실제 내용을 설명하며 작업 단계 이름을 붙이지 않는다.

그림·표는 `public/<topic>/`에 두고 `PaperFigure`로 분석 위치에 첨부한다. 번호·page·읽을 내용과 본문 위치를 inventory에 남긴다. 연속 표의 모든 페이지를 포함하고 crop을 전수 확인한다. manifest 형식과 수치 비교 기준은 [survey.md](survey.md)를 따른다.

본문의 검증 메모에는 확인한 source/version·code 범위·검사 결과·미확인 항목을 적는다. 실제 수행하지 않은 pass·build·모델 재현을 완료했다고 쓰지 않는다.

## 4. 찾을 수 있도록 연결

`ResearchCatalog`는 metadata에서 목록을 생성한다. 수동 논문 목록을 여러 곳에 복제하지 않는다. 해당 `topics/`의 질문·읽기 순서에 자료를 연결하고, 관련 Survey와 비교 조건이 필요한 경우 reciprocal link를 추가한다. 개별 논문을 추가할 때마다 sidebar에 항목을 늘리지 않는다.

새 asset manifest는 `scripts/check-assets.mjs`의 검사 대상과 실제 crop 개수를 함께 등록한다. `scripts/check-site.mjs`의 논문 route·그림 개수에도 추가하면 `npm run test:ui`의 전수 로딩 검사에 포함된다. 현재 두 검사 모두 명시적으로 등록된 대상만 검사하므로, manifest 파일을 만들었다는 이유로 자동 검사된다고 가정하지 않는다.

## 5. 변경에 맞는 검증

| 변경 | 확인할 항목 |
| --- | --- |
| 사이트 본문·metadata·asset | 원문 대조, `npm run build`, 해당 route·그림·표·내부 링크의 브라우저 확인 |
| 목록·공통 UI·검사기 | `npm run build`, `npm test`, `npm run test:ui`; 새 검색어가 여러 자료와 겹치면 실제 검색 계약에 맞게 기대값 조정 |
| 세미나 layout·figure·table·typography·순서 | [seminar.md](seminar.md)의 전체 슬라이드·세 해상도·Exit/keyboard/lightbox 검증 |
| README·rules·AGENTS만 | 문서 간 링크, 실제 source/schema/scripts와 설명 일치, 실행 예시와 호스트 규칙의 일치 |

검증 명령은 사용자가 지정한 실행 호스트에서 수행한다. 원본 작업 트리와 remote build 사본을 구분하고, 사본이면 검사한 source commit/변경과 동기화 범위를 확인한다. 검사 실패를 기록만 하고 넘기지 말고 수정 후 해당 검사를 다시 실행한다.

`verified`는 기록한 범위의 내용 검토가 끝났을 때만 지정한다. build 성공이나 metadata 이관만으로 상태를 올리지 않는다. `reviewedAt`은 실제 내용 검토일이다.

## 6. 확인용 서버와 인계

사이트 변경 후에는 최신 결과의 확인용 서버를 띄우거나 재사용하고 **사용자가 확인할 수 있도록 유지한다**. README/rules만 바뀌었다면 기존 정상 서버를 유지하면 된다. 포트를 확인하고 다른 사람이 띄운 프로세스를 중지하지 않는다. 시작한 서버·SSH 터널의 PID 또는 control socket과 로그 위치를 작업 기록에 남긴다.

dev는 source 변경을 반영하지만 remote 사본은 먼저 동기화해야 한다. preview는 `dist`를 제공하므로 MDX 수정 뒤에도 **다시 build하기 전에는 바뀌지 않는다**. build와 preview의 `SITE_URL`·`BASE_PATH`를 맞춘다. 자세한 명령은 [README](../README.md#개발과-확인용-서버)를 따른다.

remote 서버는 loopback에 바인딩하고 사용자가 접근할 SSH 터널을 제공한다. 요청한 local URL에서 실제 HTTP 응답과 이번 변경을 확인한 뒤 페이지를 열고 최종 답변에 링크를 넣는다. 확인 완료를 위해 켠 서버를 작업 종료와 함께 자동으로 끄지 않는다.

최종 diff에서 범위와 무관한 변경·private detail·깨진 링크를 확인한다. 공유할 변경은 목적이 드러나는 commit으로 기록한다. push·게시에는 사용자의 요청 또는 기존 승인이 필요하다. 게시했다면 해당 commit의 deployment 완료와 공개 route를 확인한다. 배포되지 않은 결과를 게시 완료라고 보고하지 않는다.

## 완료 기준

- 원문 근거·문서 종류·metadata·검토 범위가 일치한다.
- 요구한 본문과 그림·표가 빠짐없이 있고 해당 주제에서 찾을 수 있다.
- 해당 변경에 필요한 검사가 통과했으며 미확인 항목을 공개 범위에 맞게 기록했다.
- 확인용 서버가 최신 사이트를 제공하고 사용자에게 접근 가능한 URL을 전달했다.
- 새 운영 결정·반복할 절차는 해당 `rules/`에 반영하고 `AGENTS.md`/README에서 연결했다. 현재 작업의 수치·서버 상태·남은 일은 `WORKING.md` 또는 작업 기록에 둔다.

## 규칙을 바꿀 때

자료를 추가하며 재사용할 결정이나 기존 안내와 다른 동작을 확인했다면 같은 작업에서 문서도 갱신한다. 공통 순서는 이 문서, 내용 구조는 `content.md`, 연구 검증은 `survey.md`, 슬라이드는 `seminar.md`를 수정한다. 일회성 결과를 영구 규칙으로 만들거나 같은 규칙을 여러 파일에 상세 복제하지 않는다. 관련 source·예시·검사기와 규칙이 충돌하지 않는지 다시 확인한다.
