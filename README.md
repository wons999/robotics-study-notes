# Robotics Study Notes

Study and research notes for robotics foundations, control, reinforcement learning, VLA research, and paper surveys.

The public site is built with Astro/Starlight and published through GitHub Pages:

https://wons999.github.io/robotics-study-notes/

## 자료를 추가하는 작업자에게

[AGENTS.md](AGENTS.md)와 [자료 추가·수정 절차](rules/contributing.md)를 먼저 읽는다. 세부 규칙의 담당 범위는 다음과 같다.

| 문서 | 읽는 목적 |
| --- | --- |
| [content.md](rules/content.md) | 저장 위치, MDX 형식, metadata·검토 상태, route·주제·목록 연결 |
| [survey.md](rules/survey.md) | 원문·부록·그림/표·공식 코드 대조, 수치 해석, 5-pass 검토 |
| [seminar.md](rules/seminar.md) | 발표 자료 구조와 전체 슬라이드 시각 검증 |
| [WORKING.md](WORKING.md) | 현재 작업 상태와 남은 관리 과제 |

재사용할 작성·운영 결정을 새로 정했다면 같은 작업에서 해당 규칙도 갱신한다. 문서 목록은 metadata에서 생성하고 주제 페이지에는 읽기 순서와 비교 이유를 쓴다. `verified`는 기록한 범위의 내용 검토이며 모델 재현 성공을 뜻하지 않는다.

## 개발과 확인용 서버

실행 호스트는 사용자의 현재 호스트 운영 규칙을 따른다. 아래 명령은 선택된 호스트의 **최신 source 사본**에서 Node 24와 `package-lock.json`을 기준으로 실행한다. remote build 사본은 수정 후 먼저 동기화한다. 의존성 초기 설치나 lockfile 변경 시 `npm ci`를 사용한다.

수정 중에는 dev 서버를 사용한다. 기본 개발 경로는 `/`이며 접속 주소는 `http://127.0.0.1:4321/`이다.

```bash
npm run dev -- --host 127.0.0.1 --port 4321
```

배포 형태를 확인할 때는 다음처럼 build와 preview에 **같은 site/base 설정**을 적용한다. 접속 주소는 `http://127.0.0.1:4388/robotics-study-notes/`이다.

```bash
SITE_URL=https://wons999.github.io/robotics-study-notes BASE_PATH=/robotics-study-notes npm run build
SITE_URL=https://wons999.github.io/robotics-study-notes BASE_PATH=/robotics-study-notes npm run preview -- --host 127.0.0.1 --port 4388
```

preview는 `dist`를 제공하므로 source 수정만으로 갱신되지 않는다. 다시 build한 뒤 해당 route에 새 내용이 보이는지 확인한다. config·환경·dependency·base 또는 visibly stale한 상태가 바뀌면 자신이 시작한 서버만 재시작한다. 포트가 사용 중이면 빈 포트를 선택하고 URL·터널·검사 설정도 함께 맞춘다.

remote 서버는 별도 터미널 또는 관리되는 background process로 유지하고 local loopback 터널로 연결한다. 아래 `preview_host`에는 사용자가 지정한 SSH 별칭을 넣는다. dev 서버라면 두 포트를 4321로 바꾼다.

```bash
preview_host='사용자가 지정한 SSH 별칭'
ssh -o BatchMode=yes -o ExitOnForwardFailure=yes -N -L 127.0.0.1:4388:127.0.0.1:4388 "$preview_host"
```

작업이 끝나면 최신 사이트와 접속 URL을 확인하고 서버·터널을 유지한다. 시작한 프로세스의 PID 또는 control socket, 로그, 검증한 source를 기록한다. 요청 없이 다른 사람의 프로세스를 종료하지 않는다.

허용된 local 실행에서 Node가 맞지 않을 때는 Docker Node 24를 사용할 수 있다. 다음은 저장소 root에서 실행하는 dev 예시다. Docker image가 없다면 다운로드도 사용자의 네트워크·실행 호스트 규칙을 따른다.

```bash
docker run --rm --user "$(id -u):$(id -g)" -p 127.0.0.1:4322:4321 -v "$PWD:/app" -w /app node:24-alpine npm run dev -- --host 0.0.0.0 --port 4321
```

이 예시의 local 접속 주소는 `http://127.0.0.1:4322/`다.

## Study Rhythm

- Build foundations: FK, IK, Jacobian, dynamics, and control.
- Track current research: VLA, RL, manipulation, sensing, and robotics benchmarks.
- Maintain paper surveys under `src/content/docs/paper-notes/`.
- Maintain robot learning maps under `src/content/docs/robot-learning/`.
- Convert each study session into a durable note with references, implementation ideas, and open questions.

## Deployment

`.github/workflows/deploy.yml`이 main push에서 GitHub Pages를 빌드·배포한다. push·게시가 요청/승인된 작업에서는 해당 commit의 Actions 완료와 실제 공개 route를 확인한 뒤 게시 완료를 보고한다. PR 검증은 `.github/workflows/validate.yml`이다.

## Content Management

Document types, topics, review status, and review dates live in MDX `research` frontmatter. The survey catalog is generated from this metadata; topic pages provide curated reading paths. Detailed instructions are in [content.md](rules/content.md). `WORKING.md` records current state, not permanent rules.

| 명령 | 확인 범위 |
| --- | --- |
| `npm run check:content` | 내부 route·local 이미지·필수 metadata와 등록된 asset manifest checksum |
| `npm run build` | 위 콘텐츠 검사, Astro 타입 검사, 정적 사이트·검색 index 생성 |
| `npm test` | 콘텐츠 검사기의 누락 검출 테스트 |
| `npm run test:ui` | 실행 중인 서버에서 목록·등록된 논문 이미지·T-Rex 전체 덱 회귀 검사 |

브라우저 검사는 선택된 실행 호스트의 Chromium 경로를 지정한다. 아래 명령은 위의 배포 base preview를 사용한다.

```bash
CHECK_SITE_URL=http://127.0.0.1:4388/robotics-study-notes CHROMIUM_EXECUTABLE_PATH=/path/to/chrome npm run test:ui
```

변경별 필요한 검사는 [공통 절차의 검증 표](rules/contributing.md#5-변경에-맞는-검증)를 따른다. 자동 검사에 등록한 그림 수와 checksum이 맞아도 원문 내용·crop·가독성 검토는 별도로 수행한다.
