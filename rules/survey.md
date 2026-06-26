# Paper Survey Rules

이 문서는 로보틱스 논문 Survey 노트를 만들 때 반복해서 따라야 하는 제작 규칙이다. 기준 사례는 T-Rex Survey이며, 목표는 논문을 단순 요약하지 않고 나중에 세미나 자료, 구현 검토, 후속 연구 맵으로 재사용할 수 있게 정리하는 것이다.

## 기본 원칙

- 논문 Survey와 세미나 자료 작업은 항상 `effort high`로 수행한다. 빠른 요약 모드로 처리하지 말고, 원문/appendix/공식 코드/공식 모델카드/빌드 결과를 확인하는 검증 루프를 기본값으로 둔다.
- Survey는 논문 초록/결론 요약이 아니라, 문제 설정, 시스템 설정, 데이터셋, 방법론, 모델 구조, 학습 recipe, 실험 결과, appendix, 한계, 관련 연구 흐름을 함께 정리한다.
- 개별 논문 Survey는 항상 deep dive로 작성한다. “family overview”, “model inventory”, “현재 공개 코드 요약” 때문에 논문 내부의 방법론, 수식, 데이터 생성, 실험, appendix depth를 줄이지 않는다.
- 여러 버전이나 model family가 있는 경우에는 family overview와 개별 논문 Survey를 분리한다. family overview는 얕고 넓게, 개별 논문 Survey는 깊고 좁게 작성한다.
- 공식 project site나 lab site에 논문, article, release note, model announcement가 함께 올라와 있으면 전체 inventory를 먼저 만든다. 그런 뒤 각 항목을 `paper Survey`, `release note`, `article note`, `model card`로 분류하고, 어느 항목도 한두 문단짜리 얕은 메모로 끝내지 않는다.
- article/release note도 실험 수치, deployment evidence, caveat, 공개 범위, code/checkpoint 공개 여부, model family 안에서의 위치를 빠짐없이 정리한다. 논문이 아니라는 이유로 공식 글의 세부 claim을 생략하지 않는다.
- 논문/project page에 model 구조, method diagram, dataset figure, result/ablation plot, qualitative example image가 있으면 Survey 본문에 실제 시각 자료를 첨부한다. “검토했다”만 쓰고 이미지를 생략하지 않는다.
- 논문 PDF가 공개되어 있으면 PDF를 직접 다운로드하거나 로컬에 확보한 뒤, PDF 기준으로 figure/table을 확인한다. abstract page나 project page만 보고 Survey를 작성하지 않는다.
- PDF에서 `Figure 1`, `Table 1` 같은 caption inventory를 먼저 만들고, Survey 본문에 `Figure/Table Inventory`를 남긴다. 각 figure/table은 “어디에 반영했는지”와 “무엇을 읽어야 하는지”를 함께 적는다.
- Method, dataset, model architecture, experiment/result figure는 가능하면 PDF에서 직접 crop 또는 page render로 추출해 local asset으로 저장한다. 전체 페이지 screenshot만 붙이고 끝내지 말고, 본문 분석 위치에 맞는 figure-level 이미지를 배치한다.
- PDF crop asset을 만든 뒤에는 저장된 모든 이미지를 직접 열어 전수 검수한다. figure/table 본체, 축/legend, figure 번호, caption을 포함하기로 한 경우 caption 끝이 잘리지 않았는지 확인하고, 불필요한 주변 본문이 들어간 asset은 다시 crop한다.
- 공식 이미지 파일이 제공되면 `public/<topic>/` 아래에 저장해 로컬 asset으로 참조한다. 이미지가 React/SVG/canvas/video component로만 렌더링되어 파일 URL이 없으면 브라우저 screenshot을 떠서 첨부하고, caption에 screenshot 출처와 section을 적는다.
- 동영상만 있는 경우에도 대표 frame, poster image, 또는 screenshot을 첨부해 실험 setting과 qualitative result를 시각적으로 확인할 수 있게 한다.
- 하나의 문서 안에 family와 논문을 같이 다뤄야 한다면, overview는 앞쪽에 짧게 두고 본문 대부분은 기준 논문 deep dive에 사용한다.
- 각 섹션은 논문을 다시 열지 않아도 핵심 조건을 확인할 수 있을 정도로 구체적으로 쓴다.
- public site에 올리는 내용에는 개인 workplace detail, private project detail, 민감한 robot/system 정보를 넣지 않는다.
- 논문 원문, appendix, project page, 공식 코드, 공식 dataset card가 있으면 먼저 확인한다.
- 확실하지 않은 내용은 추정해서 쓰지 말고 `확인 필요`로 남긴 뒤 원문 또는 코드 확인 후 반영한다.

## 논문 Survey 템플릿

새 논문 Survey 문서를 만들 때는 아래 순서를 기본 템플릿으로 사용한다. 논문 성격상 필요 없는 항목은 삭제하기보다 “해당 없음” 또는 “공개 자료 기준 미확인”으로 이유를 남긴다.

```md
---
title: 논문 대표 이름
description: 논문의 핵심 주제와 Survey 범위를 한 문장으로 적는다.
---

import SectionFeedback from '../../../components/SectionFeedback.astro';

# 논문 대표 이름

<SectionFeedback page="논문 대표 이름" section="메타데이터" />

## 메타데이터

| 항목 | 내용 |
| --- | --- |
| 논문 | full title |
| 저자/그룹 | 공개 논문 기준 |
| 공개 | arXiv/venue/date |
| 링크 | paper/project/code/dataset/model |
| 태그 | 핵심 키워드 |

## 한 줄 요약

논문 contribution을 과장 없이 한 문장으로 쓴다.

## 문제의식

기존 방법의 병목, 이 논문이 푸는 mismatch, target setting을 정리한다.

## 시스템 설정

robot embodiment, sensor, observation, action, control frequency, evaluation setup을 표로 정리한다.

## Dataset

dataset source, 수집 방식, 규모, episode/sample schema, modality, annotation, filtering, release 여부를 정리한다.

## Method

핵심 아이디어, 변수 정의, objective, inference/control loop, 기존 방법과 다른 점을 설명한다.

## Model Architecture

backbone, encoder, fusion, action head, controller/policy interface, config와 tensor/action shape를 정리한다.

## Training Recipe

pretraining, finetuning/post-training, loss, optimizer, scheduler, batch size, augmentation, distributed setup을 정리한다.

## Experiments and Results

main result, ablation, data efficiency, dataset ablation, failure case를 빠짐없이 정리한다.

## Appendix Notes

appendix의 dataset schema, baseline detail, task rubric, failure analysis, implementation note를 반영한다.

## Code-Level Check

공식 코드가 있으면 model/loss/training/inference/dataset loader 경로를 확인하고 논문 설명과 차이를 분리한다.

## 한계와 주의

재현성, dataset bias, hardware dependency, unsafe assumption, 공개되지 않은 구성요소를 정리한다.

## Citation Trail

직접 비교 논문과 기반 방법론을 나누어 연결 이유를 적는다.

## 검증 메모

5-pass 검토 결과와 build 결과를 남긴다.
```

문서의 `title`과 H1에는 “Deep Survey” 같은 작업 단계 이름을 붙이지 않는다. 웹에는 논문 대표 이름 또는 모델 대표 이름만 보이게 하고, 깊이는 본문 품질과 검증 메모로 보장한다.

## Family Overview와 Paper Deep Dive 분리

- family overview 문서는 모델 계열, 버전 차이, 공개 checkpoint, 코드/데이터 공개 상태, 어떤 개별 논문을 읽어야 하는지 안내하는 index 역할을 한다.
- family overview는 세부 수식, 모든 appendix, 모든 result table을 반복 전사하지 않아도 된다. 대신 각 개별 논문 Survey로 연결한다.
- 개별 paper Survey는 family overview보다 훨씬 깊어야 한다. 논문의 contribution이 model family 중 한 버전에 해당하더라도, 해당 논문 자체의 problem setup, method, dataset, training, result, appendix를 T-Rex Survey 수준으로 정리한다.
- model card나 release note만 있는 버전은 “paper Survey”라고 부르지 않는다. 이 경우 “model/release note”로 구분하고, 공개 code/model card 기준의 구현 차이를 정리한다.
- article note는 formal paper가 아니어도 `메타데이터`, `한 줄 요약`, `핵심 주장`, `공식 근거/수치`, `family 안에서의 위치`, `한계와 주의`, `5-pass 검증 메모`를 기본으로 둔다.
- 같은 family 안에서 N1, N1.5, N1.7처럼 이름이 비슷해도 논문/모델/코드 기준이 다르면 같은 표에 수치를 섞지 않는다. paper 기준 수치와 model card 기준 수치를 분리해서 표기한다.

## 권장 문서 구조

- 메타데이터: 제목, 저자, 연도/venue, 링크, 키워드, Survey 안에서의 위치를 적는다.
- 한 줄 요약: 논문의 contribution을 과장 없이 한 문장으로 쓴다.
- 문제의식: 기존 방법이 왜 부족한지, 논문이 어떤 mismatch나 bottleneck을 해결하려는지 정리한다.
- 시스템 설정: robot embodiment, sensors, observation, action, control frequency, evaluation setup을 표로 정리한다.
- 데이터셋: 출처, 규모, episode/sample schema, modality, annotation, cleaning, release policy를 확인한다.
- 방법론: 핵심 아이디어, objective, inference/control loop, 기존 방법과 다른 점을 설명한다.
- 모델 구조: backbone, encoders, action head, policy/control interface, 중요한 architectural choice를 구체적으로 쓴다.
- 학습 recipe: pretraining, mid-training, finetuning/post-training, loss, augmentation, optimizer/hyperparameter를 정리한다.
- 실험과 결과: main result, ablation, data efficiency, dataset ablation, failure case를 빠짐없이 정리한다.
- 시각 자료: model 구조, method diagram, result plot/table image, qualitative example을 원문에서 가져와 첨부하고 caption을 단다.
- Appendix: main text에서 압축된 구현, baseline, task rubric, dataset schema, failure analysis를 별도 섹션으로 보강한다.
- Citation Trail: 직접 비교 논문과 기반 방법론을 나누고, 현재 논문과 어떤 질문에서 연결되는지 쓴다.
- 저자/그룹 연구 흐름: 필요할 때만 추가하되, 공개 자료와 논문 내 baseline/related work에서 확인 가능한 범위로 작성한다.

## 원문과 수치 정확도

- PDF 기반 Survey는 작성 전에 `PDF 확보 -> text/caption 추출 -> figure/table inventory 작성 -> figure/table 이미지 추출 -> 본문 작성 -> inventory 대조` 순서로 진행한다.
- result, ablation, dataset statistics, model configuration 수치는 원문 table/figure와 최소 두 번 대조한다.
- figure/table은 원칙적으로 모두 검토한다. 세미나에 다 넣지 않더라도 Survey에는 어떤 실험이 있었는지 빠뜨리지 않는다.
- 핵심 figure/table은 Survey에 이미지로 첨부한다. 특히 model architecture, method overview, main result, ablation, qualitative example은 텍스트 요약만으로 대체하지 않는다.
- 실험 결과 figure/table은 전부 Survey에 반영한다. main result, language result, fine-tuning result, complex task result처럼 실험 섹션을 이루는 figure는 “대표 몇 개”만 고르지 않는다.
- PDF에서 crop한 figure/table asset은 원문 번호가 드러나는 파일명 또는 caption으로 추적 가능하게 한다.
- 공식 article의 inline chart, video caption, partner/deployment claim, caveat 문장도 result 근거로 취급한다. formal table이 없더라도 숫자, task list, comparison target, 실패 조건을 빠짐없이 옮긴다.
- 행/열 이름, metric 단위, 평균 계산 방식, task 순서, baseline 이름을 임의로 바꾸지 않는다.
- 원문 figure에서 읽은 값과 table 값이 다를 수 있으면, Survey에 사용한 출처를 명확히 확인한다.
- 논문의 “평균”이 단순 평균인지, task별 rollout 평균인지, success/progress rubric 평균인지 확인한다.
- main result만 쓰고 실패 사례나 약한 task를 생략하지 않는다.

## 공개 코드 확인 원칙

- 논문 코드가 공개되어 있으면 Survey 작성 전에 반드시 코드 repository를 확인한다.
- 코드 확인은 README 수준에서 멈추지 말고, 실제 model, loss, training, inference, dataset loader 경로를 찾아 읽는다.
- 방법론 설명은 논문 수식만 복사하지 말고, 코드에서 그 수식이 어떤 함수, class, tensor shape, control loop로 구현되는지 확인해 반영한다.
- 모델 구조는 논문 figure만 보고 쓰지 말고, 실제 module 구성, backbone, encoder, projection layer, action head, parameter sharing, frozen/trainable 여부를 코드에서 확인한다.
- 학습 방식은 training script/config에서 loss term, sampling distribution, augmentation, optimizer, scheduler, batch size, precision, distributed setup을 확인한다.
- inference/control loop는 deployment code, policy wrapper, server/client, cache, action chunking, control frequency, thread/lock 처리까지 가능한 범위에서 확인한다.
- dataset이 공개되어 있거나 loader가 있으면 sample schema, key names, tensor shape, normalization, filtering, annotation loading 방식을 확인한다.
- 논문 설명과 코드 구현이 다르게 보이면 둘을 섞어 단정하지 말고, “논문 설명”과 “코드 구현에서 확인한 것”을 구분해 쓴다.
- 코드가 공개되어 있지 않거나 접근할 수 없으면 Survey에 “공개 코드 미확인” 또는 “코드 비공개/접근 불가”를 명시한다.
- third-party fork나 비공식 재현 코드는 공식 코드처럼 취급하지 않는다. 사용했다면 비공식 출처라고 표시한다.

## 방법론 작성 기준

- 문제를 어떤 변수, trajectory, token, latent, controller, objective로 재정의했는지 먼저 설명한다.
- objective는 loss 이름만 쓰지 말고 target, conditioning, sampling distribution, 학습 구간을 함께 적는다.
- inference는 학습 objective와 어떻게 대응되는지 설명한다.
- multi-rate, asynchronous, cache, recurrent, diffusion/flow, transformer expert처럼 시간 구조가 중요한 방법은 runtime 순서로 풀어 쓴다.
- tactile, force, proprioception, language, image 같은 modality가 어디에서 fusion되는지 명확히 쓴다.
- “모듈을 추가했다”가 아니라, 그 모듈이 어떤 정보 병목을 해결하고 어떤 실패를 줄이는지 설명한다.

## 모델 구조 작성 기준

- 모델 figure가 있으면 figure를 넣고, 이어서 구성요소별 역할을 표로 정리한다.
- configuration table이 있으면 hidden size, layer 수, action dimension, action horizon/chunk, inference step, parameter count를 전사한다.
- encoder는 입력 shape, preprocessing, tokenization/projection, frozen/trainable 여부를 확인한다.
- action interface는 action dimension, control target, chunk length, relative/absolute command 차이를 확인한다.
- code-level 확인이 가능한 경우 class/function/module 이름을 필요한 만큼 언급하되, Survey가 코드 덤프가 되지 않게 역할 중심으로 쓴다.

## 데이터셋 작성 기준

- 데이터셋은 “얼마나 큰가”보다 “무엇을 어떻게 모았는가”를 먼저 설명한다.
- episode/sample schema를 field-level 표로 정리한다.
- modality별 sensor, frequency, synchronization, timestamp 기준을 확인한다.
- annotation이 있으면 누가/무엇으로 생성했고 사람이 검수했는지 확인한다.
- cleaning/filtering 조건은 dataset quality와 직접 연결되므로 별도 항목으로 적는다.
- release plan, license, loader/preprocess script 공개 여부를 확인한다.

## 실험과 결과 작성 기준

- main result, ablation, data efficiency, dataset ablation, failure analysis를 모두 확인한다.
- baseline은 이름만 나열하지 말고 어떤 계열인지, 논문 platform에 맞춰 어떻게 adaptation됐는지 적는다.
- task별 result가 있는 경우 평균만 쓰지 말고 어떤 task가 강하고 약한지 해석한다.
- ablation은 “성능이 떨어졌다”에서 멈추지 말고 어떤 설계 요소가 검증된 것인지 적는다.
- evaluation rubric이 있으면 success rate가 어떤 stage/partial credit을 반영하는지 설명한다.

## Appendix 작성 기준

- Appendix는 선택 사항이 아니라 Survey의 핵심 근거로 본다.
- 모델/학습 detail, baseline implementation, real-world setup, evaluation task, dataset schema, failure case는 appendix에서 보강되는 경우가 많다.
- Appendix figure/table은 main text figure/table과 같은 중요도로 확인한다.
- Appendix 내용을 main text와 중복해서 쓰더라도, 재현과 해석에 필요한 detail이면 별도 섹션으로 정리한다.

## 관련 연구와 연구 흐름

- Citation Trail은 직접 비교 논문과 기반 방법론을 분리한다.
- 직접 비교 논문은 현재 논문이 어떤 baseline/related work로 상대화되는지 설명한다.
- 기반 방법론은 현재 논문 안에서 실제로 어떤 위치에 쓰였는지 연결한다.
- 저자/그룹 연구 흐름은 논문, project page, 공개 profile 같은 공개 자료에 근거해 작성한다.
- 저자 흐름은 추측성 서사를 만들지 말고, baseline 구성과 method choice를 이해하는 데 필요한 범위로 제한한다.

## 5-pass 검토 방식

Survey 초안 작성 후에는 같은 글을 막연히 여러 번 읽지 말고, 각 pass마다 다른 실패 모드를 잡는다. 최종 Survey에는 필요하면 “검증 메모”나 “5-pass 검토 기록”을 남겨 어떤 기준으로 다듬었는지 추적 가능하게 한다.

| Pass | 보는 곳 | 목적 | 산출물 |
| --- | --- | --- | --- |
| 1. 구조/coverage pass | `rules/survey.md`, 논문 목차, 현재 Survey 목차 | 빠진 섹션을 찾는다. 문제 설정, 시스템 설정, 데이터셋, 방법론, 모델 구조, 학습, 실험, appendix, 한계, citation trail이 모두 있는지 확인한다. | 빠진 섹션 목록, 추가/삭제할 목차 |
| 2. 사실/수치 pass | 논문 PDF/HTML main text, table, figure, appendix | result, ablation, dataset size, model config, baseline 이름, metric 단위, 평균 계산 기준이 틀리지 않았는지 확인한다. | result/data/model 수치 표, 출처 메모 |
| 3. 코드 구현 pass | official repository의 model, loss, training, inference, dataset loader | 논문 설명이 실제 코드 구현과 맞는지 확인한다. class/function, tensor shape, loss, action interface, preprocessing, config override를 본다. | 코드 경로별 확인 메모, 논문 설명과 코드 구현의 차이 |
| 4. 해석/연결 pass | 관련 Survey, citation trail, 세미나 흐름 | “그래서 왜 중요한가”를 정리한다. 기존 Survey, baseline, 후속 연구, 구현 관점과 어떻게 이어지는지 확인한다. | 기억할 점, 비교표, citation trail, 세미나용 흐름 |
| 5. 문서 품질/빌드 pass | 작성한 MDX, 내부 링크, 외부 링크, build output | 문장 흐름, 중복, 불확실한 표현, 미해결 항목, 깨진 링크, MDX component 오류, public site에 부적절한 정보가 없는지 확인한다. | `npm run build` 결과, 미해결 항목 검색 결과, 최종 diff 확인 |

특히 Pass 2는 생략하지 않는다. 논문의 result table, ablation figure, appendix table은 Survey 품질을 가장 크게 좌우한다. main result만 요약하고 figure/table 결과를 빠뜨리면 세미나 자료와 후속 구현 검토에서 같은 실수가 반복된다.

## 검증

- Survey 작성 후 원문 PDF/HTML과 수치, figure 번호, table 번호, appendix 제목을 다시 대조한다.
- 공식 코드가 있으면 Survey에 적은 model/loss/inference/dataset 설명이 코드와 모순되지 않는지 다시 확인한다.
- 의미 있는 문서 변경 후 `npm run build`를 실행한다.
- 외부 링크, 이미지 링크, internal link가 깨지지 않는지 확인한다.
- public site에 부적절한 private detail이 들어가지 않았는지 마지막에 확인한다.

## 금지와 주의

- 논문을 읽지 않고 abstract, project page, Twitter/X thread, blog만 보고 Survey를 작성하지 않는다.
- result 수치나 ablation 결론을 기억이나 눈대중으로 재구성하지 않는다.
- 공개 코드가 있는데도 논문 figure만 보고 모델 구조를 단정하지 않는다.
- code-level detail을 확인하지 못했는데 확인한 것처럼 쓰지 않는다.
- baseline 조건을 생략한 채 “A가 B보다 좋다”라고만 쓰지 않는다.
- 한계와 실패 사례를 결론 뒤에 형식적으로만 붙이지 않는다.
