# 현재 작업 상태

최종 갱신: 2026-10-08

## 구조

- Astro/Starlight 문서 사이트. 공개 URL과 저장소는 `README.md`, 영구 운영 규칙은 `AGENTS.md`.
- 공통 메타데이터·주제·검토 상태·작성 흐름: `rules/content.md`.
- 작업 시작·자료 추가·검증·확인용 서버·인계의 공통 절차: `rules/contributing.md`.
- 상세 Survey 작성·원문 검증: `rules/survey.md`.
- 세미나 구성·전수 시각 QA: `rules/seminar.md`.
- 전체 Survey 목록: `/paper-notes/catalog/`. 주제별 읽기 경로: `/topics/`.
- metadata migration은 기존 문서의 재검증을 뜻하지 않는다. 기존 문서는 검토 중이며 검토일 미등록.

## 세미나

T-Rex landing은 `/seminars/t-rex/`, 실제 slide route는 `/seminars/t-rex/slides/?fullscreen=1&returnTo=../`.
`src/data/trex-slides.ts`가 내용, `TRexSeminarDeck.astro`가 T-Rex adapter, `SeminarDeck.astro`가 표시·스타일, `public/seminar-controls.js`가 공통 제어다. T-Rex slide 번호 예외는 `data-content="trex"`에 제한한다.

## 이번 변경

- 2026-10-13: LWD(2605.00416v4)·ALOE(2602.12691v3)를 사용자 요청에 따라 한 페이지 `/paper-notes/lwd-aloe-vla-post-training/`에서 상세 정리하고 비교했다. 전체40쪽 main/appendix·알고리즘, Figure23개/Table20개를 검토하고43개 crop·별도 source checksum manifest를 첨부했다.
- DIVL의 replay-Q distribution/quantile 대 current-policy Q bootstrap, QAM 대 clipped weighted-flow, fleet streaming 대 iterative collection을 구분했다. mixed partial/binary metric, reward·budget, source 수치·error-bar·architecture 차이, cumulative/per-round intervention 분모와 공개 code 범위를 기록했다. LWD official train code는 미확인이고 ALOE GitHub는 홈페이지 소스·Coming Soon 상태다.
- 공통 주제·RECAP에서 통합 노트를 연결하고 두 manifest·단일 route43-image 검사를 등록했다. 여러 논문을 한 페이지에서 비교하는 제작 규칙을 `rules/survey.md`에 추가했다.
- 검증: 문서118개·이미지285개, Astro 오류/경고/hint0, 콘텐츠 검사기5 tests, 목록96개·외부 링크·등록 이미지·T-Rex3해상도 UI 통과. 통합 문서1440/390 폭·수식/방법/비교 화면과 전체 crop을 직접 확인했다. 모델 학습·실물 성능 재현은 수행하지 않았다.

- Latent Action Model 후속 자료: 계열 overview와 LAPA(2410.11758v2), Moto(2412.04445v4), UniVLA(2505.06111v3), LAOM(2502.00379v5) 개별 상세 Survey를 추가했다. main/appendix·공식 model/loss/training/loader/inference를 고정 commit으로 대조하고 총105개 figure/table crop과 PDF/asset checksum manifest를 첨부했다.
- LARA와 reciprocal link, action/data/VLA 주제 읽기 경로, asset/UI 검사를 갱신했다. LAM의 timestamp·capacity·supervision 단계·runtime decoder·metric 비교 규칙을 `rules/survey.md`에 기록했다.
- 검증: 문서117개·이미지242개 검사, Astro 오류/경고/hint0, 콘텐츠 검사기5 tests, 목록95개·외부 새 탭/내부 이동·전체 등록 이미지·T-Rex 세 해상도 UI 통과. 새5문서의 desktop1440/mobile390 폭·방법/비교 화면을 확인했다. source 내부 수치 차이, Moto LPIPS gradient 및 UniVLA old-code restart를 포함한 paper/code 차이를 기록했다. 모델 학습·성공률 재현은 수행하지 않았다.

- LARA(arXiv 2606.07100v2) 상세 Survey를 추가했다. PDF 16쪽·공식 code commit·checkpoint file inventory를 확인하고 그림 10개·표 6개를 provenance manifest와 함께 첨부했다. full/enhancement/refinement, layer 악화, 원문 stage 수식·teaser·loss-weight 불일치와 release default 차이를 구분했다.
- data/action/VLA 읽기 경로와 N1.6·π0.5 노트에서 LARA로 연결하고 asset/UI 검사에 등록했다. 원문 내부 불일치를 처리하는 규칙을 `rules/survey.md`에 보강했다.
- LARA 검증: cwh build 오류·경고·hint 0, 콘텐츠 검사기 테스트5개, 목록90개·등록 이미지137개·세미나 UI 회귀 통과. LARA desktop1440/mobile390 이미지·본문 시각 검수와 페이지 폭 검사 통과. 검토일2026-10-08/내용검증완료로 기록하며 모델 학습·성공률 재현은 수행하지 않았다.

- 기존 문서의 URL을 유지하고 공통 research metadata와 상태 표시 추가.
- 목록 자동 생성, 검색·종류·상태 필터, 여섯 주제 읽기 경로 추가.
- PR 콘텐츠 검증과 main 빌드의 링크·이미지·metadata 검사 추가.
- 기존 잘못된 상대 링크를 웹 route 기준으로 수정.
- Astra embodied-policy 평가 Survey와 PDF Figure 22개·Table 37개, checksum manifest 추가.
- Unexpected Robot Policy, GPT-Policy, CodeActionBench 상세 Survey와 62개 PDF crop 추가. 기존 Astra 글을 포함한 네 논문은 `/topics/vla/`에서 비교·연결한다.
- README·AGENTS에서 자료 추가 절차로 진입하도록 연결하고, source version·crop manifest·수치 비교·검토 상태·preview base/갱신·작업 후 서버 유지 기준을 문서화했다.
- 외부 웹 링크는 공통 Head에서 새 탭으로 열고, 내부 문서 이동은 유지한다. 링크 열기 규칙은 `rules/content.md`에 기록했다.
- 링크 변경 검증: cwh에서 build(오류·경고·hint 0), 콘텐츠 검사기 테스트 5개, UI 회귀(외부 새 탭·내부 이동·논문 이미지·세미나) 통과. 운영 문서 링크 32개도 확인했다.

## 확인용 사이트

- 현재 사용자용 URL: `http://127.0.0.1:4388/robotics-study-notes/paper-notes/lwd-aloe-vla-post-training/`.
- 서버는 build output을 제공하는 preview다. 코드·콘텐츠 변경 시 source 사본을 동기화하고 동일한 site/base로 다시 build해야 한다.
- 2026-10-13 확인: cwh preview npm PID215915/node PID215929, port4388; local SSH tunnel PID430297, control socket `/tmp/robotics-notes-01a10eb1-preview-ssh.sock`. preview log는 cwh의 `/tmp/robotics-notes-01a10eb1/papers-preview.log`다. 이 URL의 가용성은 일시적인 실행 상태이므로 다음 작업 시작 시 실제 응답을 확인한다. 영구 명령과 인계 절차는 README와 `rules/contributing.md`를 따른다.

## 남은 관리 과제

- 기존 Survey 내용을 원문과 재검토하면서 검토 상태와 날짜를 개별 갱신한다.
- 주제별 읽기 순서는 연구 질문 변화에 맞게 편집한다.
- 새 세미나를 만들 때 T-Rex 전용 시각 예외를 새 콘텐츠에 복제하지 않는다.

## 검증 entrypoint

`npm run build`와 `npm test`. 코드 관련 실행은 현재 작업의 호스트 운영 규칙을 따른다. 서비스와 원본 작업 트리의 single-writer를 유지한다.
