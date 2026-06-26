# Paper Survey Rules

이 문서는 로보틱스 논문 Survey 노트를 만들 때 반복해서 따라야 하는 제작 규칙이다. 기준 사례는 T-Rex Survey이며, 목표는 논문을 단순 요약하지 않고 나중에 세미나 자료, 구현 검토, 후속 연구 맵으로 재사용할 수 있게 정리하는 것이다.

## 기본 원칙

- Survey는 논문 초록/결론 요약이 아니라, 문제 설정, 시스템 설정, 데이터셋, 방법론, 모델 구조, 학습 recipe, 실험 결과, appendix, 한계, 관련 연구 흐름을 함께 정리한다.
- 각 섹션은 논문을 다시 열지 않아도 핵심 조건을 확인할 수 있을 정도로 구체적으로 쓴다.
- public site에 올리는 내용에는 개인 workplace detail, private project detail, 민감한 robot/system 정보를 넣지 않는다.
- 논문 원문, appendix, project page, 공식 코드, 공식 dataset card가 있으면 먼저 확인한다.
- 확실하지 않은 내용은 추정해서 쓰지 말고 `확인 필요`로 남긴 뒤 원문 또는 코드 확인 후 반영한다.

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
- Appendix: main text에서 압축된 구현, baseline, task rubric, dataset schema, failure analysis를 별도 섹션으로 보강한다.
- Citation Trail: 직접 비교 논문과 기반 방법론을 나누고, 현재 논문과 어떤 질문에서 연결되는지 쓴다.
- 저자/그룹 연구 흐름: 필요할 때만 추가하되, 공개 자료와 논문 내 baseline/related work에서 확인 가능한 범위로 작성한다.

## 원문과 수치 정확도

- result, ablation, dataset statistics, model configuration 수치는 원문 table/figure와 최소 두 번 대조한다.
- figure/table은 원칙적으로 모두 검토한다. 세미나에 다 넣지 않더라도 Survey에는 어떤 실험이 있었는지 빠뜨리지 않는다.
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
