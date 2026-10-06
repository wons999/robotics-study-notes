# Content organization

## 공통 메타데이터

```yaml
research:
  kind: paper
  topics: [vla, sensing]
  status: reviewing
  reviewedAt: null
  source: https://arxiv.org/abs/0000.00000
```

- `kind`: paper / release / article / overview / map / note / foundation / system / seminar / log.
- `topics`: vla / sensing / action / data / humanoid / foundations. 복수 선택 가능.
- `status`: draft는 작성 중, reviewing은 재검토 필요, verified는 기록한 범위의 내용 검증 완료.
- `reviewedAt`: 내용 검토일 YYYY-MM-DD. 미등록은 null. 이동·메타데이터 이관 날짜를 검토일로 쓰지 않는다.
- `family`: groot / pi / molmo / ecot 등 모델 계열 문서에만 기록한다.
- `source`: 원문 URL. 새 Survey에는 반드시 기록한다.

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

브라우저 회귀 확인은 preview 실행 후 `CHECK_SITE_URL=http://127.0.0.1:4388/robotics-study-notes CHROMIUM_EXECUTABLE_PATH=/path/to/chrome npm run test:ui`로 실행한다. 목록 검색·상태 필터, 주제·계열 페이지, 논문 59개 이미지, 전체 슬라이드를 세 해상도에서 확인한다. 이미지 manifest 변경은 원문/crop 검토 후 checksum을 갱신한다.
