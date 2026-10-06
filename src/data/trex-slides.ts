export const rawSlides = [
  {
    eyebrow: '1. Overview',
    title: 'T-Rex Overview',
    kicker: 'T-Rex는 tactile signal을 단순 observation이 아니라 action을 빠르게 보정하는 control signal로 다루는 robot policy다.',
    layout: 'split',
    visual: '<img src="/trex/trex-overview.png" alt="T-Rex overview figure" />',
    body: [
      '논문은 tactile-reactive dexterous manipulation을 위해 100시간 규모의 tactile-rich dataset, variable-rate Mixture-of-Transformer-Experts architecture, spatial-temporal tactile encoder, asynchronous cascaded flow matching을 제안한다.',
      'Figure 1은 T-Rex가 large-scale human egocentric pre-training, tactile-grounded robot mid-training, skill-specific post-training을 연결하고, low-frequency visuomotor planning과 high-frequency tactile refinement를 결합한다고 요약한다.'
    ],
    bullets: [
      'Contribution 1: 100h tactile-rich bimanual manipulation dataset',
      'Contribution 2: spatio-temporal tactile encoder와 tactile expert',
      'Contribution 3: asynchronous tactile-reactive cascaded flow matching'
    ],
    insight: '핵심 관점은 “tactile을 단순 observation으로 추가한 모델”이 아니라 “tactile이 action chunk를 다시 고치는 path를 가진 모델”로 이해하는 것이다.'
  },
  {
    eyebrow: '2. Dataset',
    title: 'T-Rex 데이터셋: 무엇을 모았나?',
    kicker: 'T-Rex Dataset은 downstream task 12개만 반복한 데이터가 아니라, reusable contact behavior를 넓게 모은 mid-training corpus다.',
    layout: 'stack',
    visual: '<img src="/trex/trex-dataset-analysis.png" alt="T-Rex dataset statistics" />',
    body: [
      'T-Rex Dataset은 207개 common household objects와 22개 motor primitives를 조합하고, 물리적으로 feasible한 object-motor primitive pair만 남겨 502개 조합을 구성한다.',
      'Appendix G에 따르면 최종 데이터는 7,755 episodes, 100 hours이며, median episode length는 29.8초, IQR은 21.0-41.1초다. 각 retained pair는 평균 16 demonstrations를 가진다.'
    ],
    bullets: [
      '207 objects, 22 motor primitives',
      '502 feasible object-primitive pairs',
      '7,755 episodes, 100 hours, 10 weeks collection'
    ]
  },
  {
    eyebrow: '2. Dataset',
    title: '데이터셋 episode는 어떤 학습 샘플인가?',
    kicker: 'Survey 기준으로 보면 T-Rex Dataset은 RGB-action pair가 아니라 timestamp가 맞춰진 multimodal trajectory다.',
    visual: '<table class="mini-table compact-table appendix-table table-center"><tr><th>Field</th><th>학습 샘플 관점</th><th>policy가 얻는 정보</th></tr><tr><td>head_rgb[t]</td><td>workspace 전체와 target/distractor</td><td>task context, object selection</td></tr><tr><td>wrist_rgb[t]</td><td>양손 주변 근접 시야</td><td>occlusion이 큰 contact 영역 보완</td></tr><tr><td>arm/hand state[t]</td><td>양팔 7-DoF와 양손 22-DoF state</td><td>현재 자세, grasp aperture, stability</td></tr><tr><td>wrist_pose[t]</td><td>양손 wrist SE(3) pose</td><td>object-relative manipulation geometry</td></tr><tr><td>tactile[t-k:t]</td><td>10 fingertips의 6D wrench history + deformation map</td><td>slip, force, contact location, local geometry</td></tr><tr><td>action[t:t+H]</td><td>arm delta + hand joint command chunk</td><td>flow matching target action</td></tr><tr><td>instruction</td><td>episode당 1개 imperative sentence</td><td>language-conditioned task grounding</td></tr></table>',
    body: [
      'Appendix G는 각 episode가 time-aligned bundle로 저장되며, vision, proprioception, wrist pose, tactile, action, language가 common timestamp 아래 묶인다고 설명한다.',
      'language instruction은 episode마다 정확히 1개가 붙는다. sampled head-camera frames 4-6장, target object name, motor-primitive name을 VLM에 제공해 single imperative sentence를 만들고, human annotator가 hallucination과 imprecise description을 검수한다.'
    ],
    bullets: [
      'RGB: head ZED X Mini 1개 + wrist ZED X One S 2개, 30Hz cadence',
      'tactile: deformation depth map과 6-axis net wrench를 같이 기록',
      'instruction count: 1 natural-language instruction per episode',
      'raw stream, derived tactile representation, loader/preprocess script 공개 계획'
    ],
    insight: '여기서 language는 단순 caption보다 “object-primitive taxonomy를 policy condition으로 바꾸는 접착제”에 가깝다.'
  },
  {
    eyebrow: '2. Dataset',
    title: '왜 task demo가 아니라 mid-training corpus인가?',
    kicker: 'T-Rex Dataset은 특정 평가 task를 외우게 하기보다, 다양한 object-primitive 조합에서 reusable contact prior를 만들도록 설계됐다.',
    visual: '<div class="dataset-funnel"><div class="funnel-row"><span>207 objects</span><strong aria-label="times">×</strong><span>22 motor primitives</span></div><div class="funnel-arrow">↓</div><div class="funnel-step">Per-primitive feasibility checklist</div><div class="invalid-pairs"><strong>Filtered examples</strong><span>solid block × pour</span><span>non-articulated object × twist</span><span>flat cloth × insert</span></div><div class="funnel-arrow">↓</div><div class="funnel-step emphasis">502 feasible object-primitive pairs</div><div class="pair-examples"><span>cup × twist</span><span>cloth × wipe</span><span>card × slide</span><span>tube × press</span><span>key × insert</span></div><div class="funnel-step">Reusable contact behavior prior</div></div>',
    body: [
      '논문은 기존 robot manipulation dataset이 parallel gripper나 grasp-centric dexterous hand에 치우쳐 tactile-rich dexterous interaction coverage가 제한적이라고 지적한다.',
      'T-Rex Dataset은 narrow task-specific demonstrations 대신 verb-noun combination, motor primitive, object interaction을 중심으로 구성된다. infeasible pair는 per-primitive feasibility checklist로 수동 제거한다.',
      '여기서 checklist는 primitive마다 “이 동작이 해당 object에 물리적으로 의미가 있는가”를 확인하는 기준이다. 논문은 solid block에 pour primitive를 적용하거나, articulating part가 없는 object에 twist primitive를 적용하는 경우처럼 성립하지 않는 조합을 제거한다고 설명한다.'
    ],
    bullets: [
      'scene backdrop, distractor, object pose를 다양화해 visual overfitting을 줄인다.',
      '예: solid block × pour, non-articulated object × twist 같은 조합은 제거한다.'
    ],
    insight: '이 슬라이드의 핵심은 T-Rex Dataset을 “평가 task rehearsal”이 아니라 “mid-training용 contact behavior coverage”로 해석하는 데 있다.'
  },
  {
    eyebrow: '3. Model',
    title: 'T-Rex 모델 구조 Overview',
    kicker: '모델의 핵심은 하나의 거대한 policy가 모든 것을 같은 속도로 처리하지 않는다는 점이다.',
    layout: 'split',
    visual: '<img src="/trex/trex-model.png" alt="T-Rex model architecture" />',
    body: [
      'Figure 3에서 T-Rex는 Mixture-of-Transformer-Experts backbone과 spatial-temporal tactile encoder로 구성된다. 세 expert는 latent expert, action expert, tactile expert다.',
      'Latent expert는 future visual prediction을 통해 temporally grounded context를 만들고, action expert는 low-frequency action denoising을 수행한다. tactile expert는 cached visual-language context를 재사용해 high-frequency tactile refinement를 수행한다.'
    ],
    bullets: [
      'Latent expert: visual-language latent context',
      'Action expert: low-frequency coarse action generation',
      'Tactile expert: high-frequency tactile refinement'
    ]
  },
  {
    eyebrow: '4. Latent Expert',
    title: 'Latent Expert: visual-language context를 만드는 slow reasoning module',
    kicker: 'Latent expert는 현재 이미지와 instruction을 바탕으로 task context와 future visual representation을 만든다.',
    visual: '<div class="expert-spec-card"><h3>Latent Expert</h3><div class="io-strip"><span>Input</span><strong>slow visual-language token prefix: [B, L_slow, 2048]</strong></div><table class="micro-table"><tr><td>Code path</td><td>slow images + language prompt → Qwen processor → slow_embeds</td></tr><tr><td>Typical slow image</td><td>head camera image; wrist tokens are split into fast_embeds</td></tr><tr><td>Optional tokens</td><td>future-prediction query tokens: [B, Q_future, 2048]</td></tr><tr><td>Backbone</td><td>Qwen3VL-2B</td></tr><tr><td>Hidden feature dim</td><td>2048</td></tr><tr><td>Layers / sequence</td><td>28 transformer layers, max 2048 tokens</td></tr><tr><td>Params</td><td>1.41B</td></tr><tr><td>Attention</td><td>Flash Attention 2</td></tr></table><div class="io-strip output"><span>Output</span><strong>latent hidden/KV context: [B, L_slow(+Q), 2048]</strong></div><small>The server splits the processed VL embedding into slow_embeds and fast_embeds before flow inference.</small></div>',
    body: [
      'Appendix A에 따르면 latent expert는 Qwen3VL-2B 기반이며 hidden feature dimension 2048, 28 transformer layers, max sequence length 2048, 1.41B parameters, Flash Attention 2를 사용한다.',
      '코드에서는 slow images와 language prompt를 Qwen processor에 넣어 `inputs_embeds`를 만든 뒤, `split_slow_fast_embeds()`로 slow prefix를 `slow_embeds`로 분리한다. 일반 JSON pipeline에서는 head camera가 `input_image_slow`로 들어간다.',
      'future visual prediction을 쓰는 경우 `flare_queries`가 slow embedding 뒤에 추가된다. Dataset에는 robot states와 actions도 기록되지만, latent expert의 직접 입력 경로는 visual-language token prefix다.'
    ],
    bullets: [
      '무거운 visual-language 계산은 slow stream에서 수행한다.',
      'latent context는 action generation과 tactile refinement의 공통 조건이 된다.'
    ],
    insight: 'future visual prediction은 world model 전체를 만드는 수준은 아니지만, 현재 관측을 action generation에 유용한 temporal context로 밀어주는 regularizer로 볼 수 있다.'
  },
  {
    eyebrow: '5. Action Expert',
    title: 'Action Expert: coarse action chunk를 만드는 module',
    kicker: 'Action expert는 visual-language context를 바탕으로 먼저 그럴듯한 action trajectory를 만든다.',
    visual: '<div class="expert-spec-card"><h3>Action Expert</h3><div class="io-strip"><span>Input</span><strong>slow VL context/KV + action-sequence tokens, hidden dim 2048</strong></div><table class="micro-table"><tr><td>Slow VL embedding</td><td>slow_embeds: [B, L_slow, 2048], input to Latent Expert</td></tr><tr><td>Latent context / KV</td><td>contextual hidden states + KV from slow VL tokens</td></tr><tr><td>Pre-training role</td><td>tactile expert 없이 full-range flow tau=1→0을 학습해 final action chunk까지 생성 가능</td></tr><tr><td>Future latent role</td><td>not a direct action input; L_future regularizes slow context, future-query tokens may remain in context/KV</td></tr><tr><td>Fast visual tokens</td><td>fast_embeds: [B, L_fast, 2048], prepended to action sequence</td></tr><tr><td>Robot state</td><td>optional state_embeds: [B, 1, 2048] from normalized 62D state</td></tr><tr><td>Flow tokens</td><td>tau token [B, 1, 2048] + noisy action tokens [B, 16, 2048]</td></tr><tr><td>Action dim / chunk</td><td>62D actions, Ta=16</td></tr><tr><td>Inference steps</td><td>6 Euler steps from tau=1 to tau_split=0.4</td></tr><tr><td>Params</td><td>1.41B</td></tr></table><div class="io-strip output"><span>Output</span><strong>x_split: [B, 16, 62] + refreshed KV_tau_split = [KV_lat | KV_act_tau_split]</strong></div><small>slow_embeds are input embeddings; the Action Expert is conditioned on contextualized slow VL states/KV.</small></div>',
    body: [
      'Pre-training에서는 tactile expert 없이 latent/action experts만 학습하므로 Action Expert가 full-range flow tau=1→0을 맡아 final action chunk까지 생성할 수 있도록 L_act를 학습한다. T-Rex runtime에서는 이 역할이 upper segment tau=1→tau_split의 coarse denoising으로 나뉜다.',
      '`slow_embeds`는 Qwen processor가 만든 입력 embedding이고, Latent Expert가 이를 처리해 contextual hidden states와 KV cache를 만든다. future latent prediction은 직접 action input이 아니라 L_future regularization과 future-query token context를 통해 Action Expert conditioning에 간접 기여한다.'
    ],
    bullets: [
      'pre-training: full-range flow로 final action까지 학습',
      'runtime: low-frequency visual action chunk generation',
      'arm end-effector delta + hand joint command',
      'tactile expert가 refinement할 boundary state를 만든다.'
    ]
  },
  {
    eyebrow: '6. Tactile Expert',
    title: 'Tactile Expert: action을 빠르게 보정하는 module',
    kicker: 'Tactile expert는 raw vision을 다시 보지 않고, cached context와 최신 tactile signal로 action chunk를 보정한다.',
    visual: '<div class="expert-spec-card"><h3>Tactile Expert</h3><div class="io-strip"><span>Input</span><strong>KV_tau_split + tactile tokens + tau token + x_tau action tokens</strong></div><table class="micro-table"><tr><td>Cached context</td><td>cloned [KV_lat | KV_act_tau_split] from slow tick</td></tr><tr><td>Boundary state</td><td>x_split: [B, 16, 62] from action expert</td></tr><tr><td>Tactile F6</td><td>current normalized wrench: [B, 10, 6] → [B, 10, 2048]</td></tr><tr><td>F6 history</td><td>[B, 16, 10, 6] → VQ codes [B, 10] → [B, 10, 2048]</td></tr><tr><td>Deformation</td><td>[B, 10, 1, H, W] → [B, 10, 28800] → [B, 10, 2048]</td></tr><tr><td>Tactile token seq</td><td>per-finger concat 기준 약 [B, 30, 2048]</td></tr><tr><td>Raw vision</td><td>not reprocessed in fast tick</td></tr><tr><td>Inference steps</td><td>4 Euler steps from tau_split=0.4 to 0</td></tr><tr><td>FFN / params</td><td>1536 intermediate, 0.62B params</td></tr></table><div class="io-strip output"><span>Output</span><strong>final action chunk: [B, 16, 62]</strong></div><small>tactile_flow_continue() returns the clean action directly, not a residual delta.</small></div>',
    body: [
      '구현 코드의 `tactile_flow_continue()`는 slow tick에서 저장한 cached KV를 clone하고, `x_split`에서 tau=0까지 남은 flow를 tactile expert로 적분한다. fast tick에서는 visual tower, latent expert, action expert를 다시 실행하지 않는다.',
      'tactile observation은 세 갈래다. current F6 frame은 `tacf6_embedder`로 들어가고, rolling F6 history는 embedded VQ-VAE가 discrete code로 바꾼 뒤 `tactile_code_embedder`로 들어가며, deformation map은 `DeformEncoder`와 projection을 거쳐 tactile token에 concat된다.',
      'Appendix A 기준 tactile expert는 action dimension 62, action chunk 16, 4 inference timesteps, FFN intermediate size 1536, 0.62B parameters를 사용한다. 구현 주석상 출력은 residual이 아니라 최종 clean action chunk다.'
    ],
    bullets: [
      'fast tactile refinement',
      'cached KV와 boundary state 재사용',
      'contact 변화가 action chunk 중간에 반영된다.'
    ],
    insight: '핵심 차이는 tactile을 input vector에 붙이는 것이 아니라, action denoising의 후반부 responsibility를 tactile expert에게 맡긴다는 점이다.'
  },
  {
    eyebrow: '6. Tactile Expert',
    title: 'Tactile Encoder: force와 deformation을 분리해서 표현한다',
    kicker: 'Tactile expert가 잘 동작하려면 raw tactile signal을 policy가 쓰기 좋은 representation으로 바꿔야 한다.',
    visual: '<div class="tactile-encoder-map"><h3>Spatial-Temporal Tactile Encoder</h3><div class="encoder-row"><b>Current F6 frame</b><span>Input [B, 10, 6]</span><i>q01/q99 normalize → tacf6_embedder</i><strong>Output [B, 10, 2048] instant force / torque tokens</strong></div><div class="encoder-row"><b>F6 history</b><span>Input [B, T=16, 10, 6]</span><i>embedded VQ-VAE → codebook K=64 → tactile_code_embedder</i><strong>codes [B, 10] → tokens [B, 10, 2048]</strong></div><div class="encoder-row"><b>Deformation maps</b><span>Input [B, 10, 1, H, W]</span><i>DeformEncoder → flatten [B, 10, 28800] → deform_proj</i><strong>Output [B, 10, 2048] spatial contact tokens</strong></div><div class="encoder-merge">concat along token axis: [B, 10, 2048] + [B, 10, 2048] + [B, 10, 2048] ≈ [B, 30, 2048]</div><div class="encoder-output">tactile_flow_continue(): tactile tokens + tau token [B,1,2048] + x action tokens [B,16,2048] + cached KV → [B,16,62]</div></div>',
    body: [
      '논문은 tactile observation을 temporal force dynamics와 spatial deformation signal로 나누어 encoding한다. 구현의 `_embed_tactile_observations()`도 이 구조와 맞게 tactile code embedding, current F6 embedding, deformation feature를 만든 뒤 channel이 아니라 token sequence 방향으로 concatenate한다.',
      'Current F6 frame은 10개 fingertip의 6D wrench를 현재 시점 contact signal로 사용한다. inference server는 tactile_f6를 q01/q99 statistics로 normalize하고, 모델은 `tacf6_embedder`로 hidden token을 만든다. 이 branch는 지금 누르는 힘과 torque를 바로 반영하기 위한 경로다.',
      'F6 history는 rolling 16-frame raw wrench history를 embedded VQ-VAE에 넣어 discrete tactile code로 바꾼다. codebook size와 per-hand/per-finger granularity는 VQ-VAE checkpoint/config를 따른다. 이 branch는 slip trend, contact impulse, grip 변화처럼 한 프레임으로 보기 어려운 시간 패턴을 압축한다.',
      'Deformation map branch는 10개 fingertip deformation image를 `DeformEncoder`로 encode하고, flatten된 feature를 `deform_proj`로 hidden token에 맞춘다. 이 branch는 접촉 위치, local edge, shear, object surface texture처럼 force vector만으로 보기 어려운 공간 정보를 제공한다.'
    ],
    bullets: [
      'tactile token sequence = tactile code + current F6 + deformation feature',
      'fast tick에서는 raw vision을 다시 보지 않고 tactile tokens와 cached KV로 lower flow를 적분한다.',
      '출력은 residual이 아니라 final clean action chunk다.'
    ],
    insight: 'force와 deformation을 분리한 것은 센서 값을 많이 넣기 위한 설계라기보다, 시간적 접촉 변화와 공간적 접촉 형상을 서로 다른 inductive bias로 다루려는 설계로 볼 수 있다.'
  },
  {
    eyebrow: '6. Tactile Encoder',
    title: 'tacf6_embedder: 현재 힘/토크를 바로 token화한다',
    kicker: '현재 frame의 6-axis wrench는 tactile expert가 가장 즉각적인 contact 상태를 읽는 경로다.',
    layout: 'fill',
    variant: 'visual-tight',
    visual: '<div class="expert-spec-card compact-spec"><h3>Current F6 Embedder</h3><div class="io-strip"><span>Input</span><strong>tactile_f6: [B, 10 fingers, 6D wrench]</strong></div><table class="micro-table"><tr><td>Preprocess</td><td>q01/q99 statistics normalize in inference server</td></tr><tr><td>Module</td><td>tacf6_embedder = ActionEmbedder(tacf6_dim=6, hidden_size=2048)</td></tr><tr><td>Per-finger mapping</td><td>[B, 10, 6] → [B, 10, 2048]</td></tr><tr><td>Role</td><td>current force / torque token</td></tr><tr><td>Training</td><td>VLA-specific module, initialized with Xavier and trained with tactile expert</td></tr><tr><td>Used in</td><td>_embed_tactile_observations() → tactile token sequence</td></tr></table><div class="io-strip output"><span>Output</span><strong>instantaneous contact tokens: [B, 10, 2048]</strong></div></div>',
    body: [
      '`tacf6_embedder`는 현재 시점의 force/torque vector를 Qwen hidden size에 맞는 tactile token으로 바꾸는 projection module이다. 코드에서는 `ActionEmbedder(tacf6_dim, H)`로 만들어지고, tactile_f6가 들어오면 tactile observation sequence의 한 부분으로 append된다.',
      '입력 tactile_f6는 raw sensor 값을 그대로 쓰지 않는다. inference server 쪽에서 q01/q99 statistics를 사용해 normalize한 뒤 모델에 전달한다. 따라서 이 branch는 sensor scale을 맞춘 현재 contact magnitude와 torque direction을 빠르게 반영하는 역할을 한다.',
      '학습 관점에서 `tacf6_embedder`는 frozen tactile tokenizer가 아니라 VLA-specific layer다. `initialize_vla_weights()`에서 Xavier 초기화되고, tactile expert의 flow-matching loss를 통해 downstream action refinement에 맞게 학습된다.'
    ],
    bullets: [
      '현재 frame 정보라 latency가 작고 fast tick에 바로 쓸 수 있다.',
      '한 프레임만 보기 때문에 slip trend 같은 시간 패턴은 VQ-VAE branch가 보완한다.',
      '현재 힘/토크 token은 tactile expert의 lower flow denoising에 직접 들어간다.'
    ]
  },
  {
    eyebrow: '6. Tactile Encoder',
    title: 'Force VQ-VAE: 16-frame F6 history를 discrete contact code로 만든다',
    kicker: 'VQ-VAE branch는 순간 힘이 아니라 접촉의 시간 패턴을 압축한다.',
    variant: 'visual-tight',
    visual: '<div class="expert-spec-card"><h3>Embedded Tactile VQ-VAE</h3><div class="io-strip"><span>Input</span><strong>raw F6 history: [B, T=16, 10 fingers, 6D]</strong></div><table class="micro-table"><tr><td>Split</td><td>[B,16,10,6] → two hands/five fingers, per-finger temporal windows</td></tr><tr><td>Encoder</td><td>shared 1D temporal CNN + finger identity embedding</td></tr><tr><td>Latent</td><td>256D continuous embedding per fingertip history</td></tr><tr><td>Quantizer</td><td>VQ-EMA codebook K=64</td></tr><tr><td>Discrete code</td><td>one code per finger: [B, 10]</td></tr><tr><td>Decoder</td><td>mirror 1D up-conv stack reconstructing F6 window</td></tr><tr><td>In VLA</td><td>frozen encode_only(); tactile_code_embedder maps code to 2048D</td></tr></table><div class="io-strip output"><span>Output</span><strong>VQ codes [B,10] → tactile code tokens [B,10,2048]</strong></div></div>',
    body: [
      'Standalone VQ-VAE는 F6 history window를 discrete code로 바꾸기 위해 별도로 학습된다. 기본 입력 단위는 한 손의 `[T=16, 5 fingers, 6 force/torque]` window이며, left/right hand는 independent samples로 취급해 데이터 효율을 높인다.',
      'Encoder는 small 1D CNN이다. 5 fingers × 6D를 channel로 접고, Conv1d + GroupNorm + GELU stem과 strided temporal conv blocks를 지나 256-d continuous latent를 만든다. Quantizer는 EMA 방식의 vector quantization을 사용하고, unused code를 되살리는 dead-code revival을 지원한다.',
      'VLA 안에서는 이 VQ-VAE를 다시 학습하지 않는다. `load_tactile_vqvae()`로 weights와 F6 normalization stats를 로드하고 `requires_grad=False`로 freeze한 뒤, fast tick에서 raw F6 history를 on-the-fly code로 encode한다.'
    ],
    bullets: [
      'VQ-VAE 자체: 별도 pretraining 필요',
      'VLA 내부: embedded VQ-VAE는 frozen tokenizer',
      'tactile_code_embedder는 integer code를 VLA hidden token으로 매핑한다.'
    ]
  },
  {
    eyebrow: '6. Tactile Encoder',
    title: 'VQ-VAE 학습 loss와 codebook 관리',
    kicker: 'Force VQ-VAE는 reconstruction quality뿐 아니라 codebook collapse를 막는 학습 안정성이 중요하다.',
    variant: 'visual-tight',
    visual: '<div class="vqvae-loss-map"><h3>VQ-VAE Training Objective</h3><div class="loss-card"><b>1. Magnitude-weighted reconstruction MSE</b><span>decoder가 quantized code만 보고 원래 F6 history window를 복원한다.</span><strong>큰 force/torque가 있는 contact 구간에 더 높은 weight</strong></div><div class="loss-card"><b>2. Commitment loss</b><span>encoder latent가 선택된 code vector 근처에 머물도록 한다.</span><strong>nearest-code assignment를 안정화</strong></div><div class="loss-card"><b>Dead-code revival</b><span>거의 선택되지 않는 code를 active encoder sample 근처로 재초기화한다.</span><strong>unused code slot과 codebook collapse를 줄임</strong></div></div>',
    body: [
      'Reconstruction loss는 decoder가 quantized code만 보고 원래 F6 window를 복원하도록 학습한다. 여기서는 magnitude-weighted MSE를 사용해 force magnitude가 큰 접촉 구간에 더 높은 weight를 준다. free-air나 near-zero contact frame이 많은 데이터에서 codebook이 “아무 힘도 없음” 패턴에만 쏠리는 것을 줄이기 위한 설계다.',
      'Commitment loss는 encoder output이 선택한 code vector 근처에 머물도록 압박한다. VQ는 nearest code를 고르는 비연속 연산이기 때문에, encoder가 codebook과 너무 멀리 떨어진 continuous latent를 만들면 code assignment가 불안정해진다. commitment term은 encoder가 discrete code vocabulary를 실제 latent space로 받아들이게 만든다.',
      'Dead-code revival은 codebook collapse를 줄이기 위한 장치다. 일부 code가 거의 선택되지 않으면 EMA update를 충분히 받지 못해 계속 unused 상태로 남을 수 있다. 구현은 usage가 낮은 code를 active encoder sample 근처로 재초기화해 codebook capacity가 dead slot으로 낭비되는 것을 줄인다.'
    ],
    bullets: [
      'reconstruction loss: contact dynamics를 복원 가능한 code로 압축',
      'commitment loss: encoder latent와 discrete vocabulary를 정렬',
      'dead-code revival: codebook usage를 넓혀 temporal contact pattern vocabulary를 유지'
    ]
  },
  {
    eyebrow: '6. Tactile Encoder',
    title: 'DeformEncoder: fingertip deformation map에서 공간 접촉 feature를 뽑는다',
    kicker: 'Deformation branch는 force vector가 놓치기 쉬운 접촉 위치, edge, shear, texture 정보를 담당한다.',
    visual: '<div class="expert-spec-card"><h3>DeformEncoder</h3><div class="io-strip"><span>Input</span><strong>tactile_deform: [B, 10 fingers, 1, H, W]</strong></div><table class="micro-table"><tr><td>Batch reshape</td><td>[B,10,1,H,W] → [B×10,1,H,W]</td></tr><tr><td>Stem</td><td>Conv2d 1→64, 7×7 stride 2 + BN/ReLU/MaxPool</td></tr><tr><td>Backbone</td><td>ResNet-18 layer1 → layer2 → layer3</td></tr><tr><td>Reshape</td><td>3×3 conv adapters re-project feature maps to 128 channels</td></tr><tr><td>Encoder output</td><td>[B×10, 128, 15, 15] → reshape [B,10,28800]</td></tr><tr><td>Projection</td><td>deform_proj = ActionEmbedder(28800, hidden_size=2048)</td></tr><tr><td>Checkpoint</td><td>pretrained/frozen encoder weights if provided</td></tr></table><div class="io-strip output"><span>Output</span><strong>deformation tokens: [B, 10, 2048]</strong></div></div>',
    body: [
      '`DeformEncoder`는 grayscale tactile deformation image를 CNN feature map으로 바꾸는 module이다. 구현은 ResNet-18을 변형해 1-channel input stem을 쓰고, layer1/layer2/layer3와 두 개의 reshape conv block을 거쳐 128-channel spatial feature map을 만든다.',
      '모델 wrapper는 10개 fingertip deformation map을 `[B×nf, 1, H, W]`로 펼쳐 encoder에 넣고, 나온 feature를 다시 `[B, nf, -1]`로 reshape한다. 코드에서 `deform_proj = ActionEmbedder(28800, H)`로 projection하므로, 기본 feature 크기는 128×15×15를 가정한다.',
      '학습 관점에서는 `DeformEncoder` checkpoint를 별도 로드하는 경로가 있다. `load_deform_encoder_weights()`는 checkpoint의 `encoder.*` weight를 DeformEncoder에 불러온다. 이후 VLA 안에서는 deformation feature를 Qwen hidden token으로 맞추는 `deform_proj`가 tactile expert 학습과 함께 맞춰진다.'
    ],
    bullets: [
      'force branch가 magnitude/torque를 본다면, deformation branch는 contact geometry를 본다.',
      'DeformEncoder는 spatial feature extractor이고, deform_proj가 tactile token dimension으로 맞춘다.',
      'edge contact, local shear, surface texture처럼 이미지형 tactile sensor에서 중요한 정보를 보존한다.'
    ]
  },
  {
    eyebrow: '7. Core Method',
    title: 'Asynchronous Tactile-Reactive Cascaded Flow Matching',
    kicker: 'T-Rex는 하나의 denoising path를 slow action expert와 fast tactile expert가 나누어 처리한다.',
    layout: 'stack',
    visual: '<div class="cascade-diagram compact-diagram"><h3>Cascaded Flow Matching</h3><div class="flow-rail"><div class="rail-node start"><b>Noise</b><span>x<sub>1</sub></span></div><div class="flow-arrow">→</div><div class="rail-segment slow"><strong>Action Expert</strong><span>slow coarse plan</span><small>visual-language context<br/>6 Euler steps</small></div><div class="flow-arrow">→</div><div class="rail-node split"><b>Split</b><span>x<sub>τ</sub></span><small>boundary state</small></div><div class="flow-arrow">→</div><div class="rail-segment fast"><strong>Tactile Expert</strong><span>fast tactile correction</span><small>cached KV + fresh tactile<br/>4 Euler steps</small></div><div class="flow-arrow">→</div><div class="rail-node end"><b>Action</b><span>x<sub>0</sub></span></div></div></div>',
    body: [
      'Flow-matching trajectory를 x1(noise)에서 x0(action)으로 가는 denoising path로 보고, T-Rex는 fixed split xτ에서 denoising responsibility를 나눈다.',
      'Action expert는 visual-language context로 upper segment를 처리하고, tactile expert는 cached KV와 최신 tactile tokens로 lower segment를 마무리한다.',
      '중요한 점은 tactile expert가 완전히 새 action을 처음부터 생성하는 것이 아니라, action expert가 만든 partially denoised boundary state xτ를 이어받는다는 점이다. 그래서 slow expert의 coarse visuomotor prior와 fast tactile feedback이 같은 flow trajectory 안에서 연결된다.'
    ],
    bullets: [
      'slow stream: visual-language 기반 coarse plan',
      'fixed split xτ: 두 expert가 만나는 boundary state',
      'fast stream: cached KV + fresh tactile로 lower flow correction'
    ]
  },
  {
    eyebrow: '7. Runtime',
    title: 'Runtime 관점: visual은 느리고 tactile은 빠르다',
    kicker: 'vision-language context는 조금 오래되어도 쓸 수 있지만, tactile signal은 지금 값을 봐야 한다.',
    layout: 'stack',
    visual: '<div class="runtime-diagram compact-diagram"><h3>Runtime: slow cache를 만들고 fast tactile tick이 재사용한다</h3><div class="runtime-sequence no-arrows"><div class="runtime-step slow-step"><b>Slow tick</b><span>visual-language encode + action expert</span><strong>commit cached KV + x<sub>τ</sub></strong><small>execution lock protects shared state</small></div><div class="runtime-step fast-step"><b>Fast tick 1</b><span>fresh tactile tokens</span><strong>x<sub>τ</sub> → action update</strong></div><div class="runtime-step fast-step"><b>Fast tick 2</b><span>new tactile frame</span><strong>reuse same cache</strong></div><div class="runtime-step fast-step"><b>Fast tick 3</b><span>new tactile frame</span><strong>latest action to 300Hz controller</strong></div></div></div>',
    body: [
      'Slow stream은 visual-language context, Gaussian noise에서 tau_split까지의 denoising, boundary state와 KV cache 저장을 담당한다.',
      'Fast stream은 action chunk 내부 offset에서 real-time tactile stream을 읽고, cached KV와 boundary state를 clone한 뒤 K_fast Euler step으로 action chunk를 갱신한다.',
      '논문은 fast tick이 slow tick의 cache commit 전에 시작하지 않도록 single-threaded request socket과 execution lock을 둔다. 학습 중 delay augmentation은 stale visual context와 fresh tactile frame 사이의 시간 차이를 미리 겪게 한다.'
    ],
    bullets: [
      'slow stream: visual-language context + xτ boundary state + KV cache commit',
      'fast stream: fresh tactile + cloned cache로 lower flow denoising',
      'low-level controller: 300Hz target 추종',
      'execution lock: slow cache가 commit되기 전 fast tick이 shared state를 읽지 않게 함'
    ]
  },
  {
    eyebrow: '8. Training',
    title: '학습 방법 Overview',
    kicker: 'T-Rex 학습은 human prior, robot tactile grounding, task adaptation을 세 단계로 나눈다.',
    layout: 'stack',
    visual: '<div class="training-stages training-detail compact-diagram no-arrows"><div><b>1</b><strong>Pre-training</strong><span>22,889h egocentric human video</span><small>latent/action experts만 학습. head-view visual-language representation과 retargeted human arm/hand motion으로 broad semantic + visuomotor prior를 만든다. tactile expert는 아직 없다.</small></div><div><b>2</b><strong>Mid-training</strong><span>100h T-Rex tactile robot data</span><small>robot multiview observation, executable 62D action, synchronized force/deformation tactile signal로 action expert를 robot embodiment에 맞추고 tactile expert의 high-frequency denoising을 학습한다.</small></div><div><b>3</b><strong>Post-training</strong><span>~100 target task demos</span><small>복잡하거나 task-specific한 skill에 대해 fine-tuning한다. mid-training에서 얻은 tactile-reactive behavior를 유지하면서 특정 task requirement에 맞춘다.</small></div></div>',
    body: [
      'Pre-training은 tactile 없이 human egocentric video에서 latent/action experts의 broad visuomotor prior를 만들고, mid-training은 100시간 robot tactile data로 그 prior를 robot-executable contact dynamics에 접지한다.',
      'Post-training은 약 100개 task demonstration으로 특정 skill에 적응하는 단계이며, 목표는 새로 tactile-reactive behavior를 배우는 것이 아니라 mid-training에서 얻은 접촉 반응성을 task requirement에 맞게 보존/조정하는 것이다.'
    ],
    bullets: [
      'pre-training: broad visual-motor-language prior',
      'mid-training: tactile-rich robot contact dynamics',
      'post-training: target task adaptation'
    ],
    insight: 'T-Rex의 데이터 전략은 “처음부터 robot tactile data로 foundation model을 만들기”보다 “human prior를 가져오고, mid-training에서 robot contact grounding을 붙이는” 쪽이다.'
  },
  {
    eyebrow: '8. Training',
    title: '학습 loss와 augmentation',
    kicker: '학습 objective는 action generation만 보지 않고 tactile refinement와 future visual prediction까지 함께 본다.',
    layout: 'fill',
    visual: '<div class="equation-panel"><h3>Training objective in the paper</h3><div class="equation-card"><b>Eq. (3) shared flow target</b><code>x_tau = (1 - tau) A_demo + tau epsilon, v* = epsilon - A_demo</code></div><div class="equation-card"><b>Eq. (6) cascaded losses</b><code>L_act = || f_act(x_tau_act, tau_act) - v* ||^2<br/>L_tac = || f_tac(x_tau_tac, tau_tac; KV_tau_split) - v* ||^2</code></div><div class="equation-card"><b>Eq. (7) total loss</b><code>L = L_act + lambda_tac L_tac + lambda_future L_future</code><small>lambda_tac = 1.0, lambda_future = 0.5</small></div><div class="equation-card"><b>Delay augmentation</b><code>delta ~ Uniform{0, 4, 8, 12}</code><small>c_tac frame index를 c_vl 대비 shift해 stale visual cache + fresh tactile stream 상황을 학습 중에 만든다.</small></div></div>',
    body: [
      '논문 Eq. (3), (6), (7)의 핵심은 action expert와 tactile expert가 서로 다른 target을 보는 것이 아니라 동일한 shared velocity target v* = epsilon - A_demo를 회귀한다는 점이다.',
      'Delay augmentation은 fast tick이 action chunk 내부 offset에서 비동기적으로 실행되는 배포 상황을 흉내내기 위해 delta를 {0,4,8,12}에서 뽑고, tactile context c_tac의 frame index를 visual context c_vl 대비 shift한다.'
    ],
    bullets: [
      'lambda_tac = 1.0, lambda_future = 0.5',
      'delta ~ Uniform{0, 4, 8, 12}: chunk 내부 fast tick offset과 같은 분포로 sampling된다.'
    ]
  },
  {
    eyebrow: '8. Training',
    title: 'Flow Matching 학습: 공통 target, 다른 conditioning',
    kicker: '두 expert의 공통점은 v* = ε - A_demo를 회귀한다는 점이고, 차이점은 어느 구간과 어떤 context를 보느냐다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table flow-loss-table table-center"><tr><th>구분</th><th>Action expert</th><th>Tactile expert</th></tr><tr><td>공통 target</td><td colspan="2">A_demo와 Gaussian noise epsilon으로 x_tau=(1-tau)A_demo+tau epsilon, v*=epsilon-A_demo를 만들고 MSE로 회귀</td></tr><tr><td>학습 구간</td><td>tau_act ~ Beta(1.5,1.0), tau in (0,1]</td><td>tau_tac = tau_split * tau_tilde, lower segment tau in (0,tau_split]</td></tr><tr><td>condition</td><td>c_vl: head/wrist camera feature, language prompt, future-prediction tokens</td><td>c_tac + KV_tau_split: high-frequency tactile tokens와 detached slow-stream cache</td></tr><tr><td>역할</td><td>standalone action generation 능력을 유지</td><td>raw vision 없이 cached context와 fresh tactile로 lower flow를 완성</td></tr></table>',
    body: [
      'Action expert와 tactile expert는 모두 Eq. (3)의 linear interpolant와 shared velocity target을 사용하지만, action expert는 전체 tau 영역에서 multimodal latent context c_vl에 condition된다.',
      'Tactile expert는 tau_split 이하 lower segment만 학습하고, raw visual observation 대신 slow stream에서 detach한 KV_tau_split과 현재 tactile context c_tac에 condition된다.'
    ],
    bullets: [
      'x1 = Gaussian noise, x0 = clean action chunk',
      '공통점: x_tau와 v* 정의, MSE regression, action chunk Ta=16',
      '차이점: tau 범위, condition source, raw vision 재실행 여부'
    ],
    insight: '이 구조 때문에 tactile expert의 출력은 “action에 더하는 보정량”이 아니라 tau=0까지 적분된 final clean action chunk로 해석해야 한다.'
  },
  {
    eyebrow: '8. Training',
    title: 'Action Expert vs Tactile Expert 학습 경로',
    kicker: '두 expert는 같은 target을 쓰지만, timestep 범위와 conditioning이 다르다.',
    layout: 'stack',
    visual: '<div class="conditioning-flow"><div><b>1. Sample noisy action</b><span>x1 = epsilon ~ N(0,I)</span><small>Action expert의 upper flow 시작점이다.</small></div><div><b>2. Detached slow pass</b><span>action expert를 no-grad로 tau=1 → tau_split까지 적분</span><small>x_hat_tau_split와 KV_act_tau_split를 만든다.</small></div><div><b>3. Refresh KV cache</b><span>KV_tau_split = [KV_lat | KV_act_tau_split]</span><small>action positions를 tau_split 상태로 re-encode해 tactile expert가 coherent한 partially-denoised context를 보게 한다.</small></div><div><b>4. Train tactile expert</b><span>input: x_tau_tac + c_tac + KV_tau_split</span><small>raw vision은 보지 않고 tactile tokens와 detached cache로 v*를 회귀한다.</small></div></div>',
    body: [
      'Action expert 학습은 tactile-blind full-range flow matching이다. c_vl에 condition된 상태에서 noisy action x_tau_act를 넣고, 출력 velocity를 shared target v*에 맞춘다.',
      'Tactile expert 학습에서는 먼저 action expert를 no-grad slow pass로 실행해 x_hat_tau_split와 KV_tau_split=[KV_lat|KV_act_tau_split]를 만든다. 이때 action expert의 noise action은 x1=epsilon에서 시작해 tau_split까지 부분 denoising된 상태로 cache에 들어가고, tactile expert는 이 detached cache와 lower-segment x_tau_tac에 condition된다.'
    ],
    bullets: [
      '공통점: 둘 다 v* = epsilon - A_demo를 회귀한다.',
      '차이점: tactile expert는 detached KV_tau_split + c_tac를 보고 raw vision은 다시 보지 않는다.',
      'total loss = loss_act + lambda_tac * loss_tac + lambda_future * loss_flare'
    ],
    insight: '학습도 inference와 같은 split 구조를 모사한다. tactile expert가 보는 cache는 단순 latent summary가 아니라 action expert가 τ_split까지 진행한 상태다.'
  },
  {
    eyebrow: '9. Experiment Setup',
    title: 'System and Evaluation Setup',
    kicker: 'Survey의 시스템 설정을 기준으로 보면, T-Rex 결과는 특정 bimanual tactile robot stack 위에서 해석해야 한다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table appendix-table table-center"><tr><th>항목</th><th>Survey 기준 핵심 설정</th></tr><tr><td>Robot</td><td>fixed-base bimanual Dexmate Vega-1</td></tr><tr><td>Arms / hands</td><td>양쪽 7-DoF arm + 양쪽 22-DoF Sharpa Wave dexterous hand</td></tr><tr><td>Observation</td><td>head RGB, wrist RGB 2개, robot state, fingertip force, tactile deformation map, language instruction</td></tr><tr><td>Action</td><td>arm relative end-effector delta + absolute finger joint command</td></tr><tr><td>Control view</td><td>low-frequency visual action chunk + high-frequency tactile correction</td></tr><tr><td>Evaluation</td><td>12 tasks, 16 rollouts/task, pose randomization, success/progress rubric</td></tr></table>',
    body: [
      '모든 real-world experiments는 fixed-base bimanual Dexmate Vega-1 robot과 두 개의 22-DoF Sharpa Wave dexterous hands에서 수행된다.',
      '평가는 Appendix F에 정의된 12개 tactile-reactive tasks에서 수행된다. 각 task는 16 trials로 평가하며, object position과 rotation은 trial마다 randomize한다.',
      'Appendix E는 모든 baseline이 같은 robot setup, action space, evaluation protocol을 사용하도록 adaptation되었다고 설명한다.'
    ],
    bullets: [
      'baseline 숫자는 off-the-shelf 결과가 아니라 T-Rex hardware에 맞춘 재현 결과다.',
      'multi-stage task는 최종 성공뿐 아니라 predefined stage hierarchy의 진행도를 반영한다.',
      'system setup 자체가 slow visual reasoning + fast tactile correction 문제를 만든다.'
    ]
  },
  {
    eyebrow: '9. Tasks',
    title: 'Evaluation Tasks: force-reactive와 tactile-deformation 상황',
    kicker: 'Appendix F는 12개 task가 force regulation, deformation sensing, insertion, bimanual coordination을 평가하도록 설계됐다고 설명한다.',
    layout: 'stack',
    visual: '<table class="mini-table task-table compact-table table-center"><tr><th>Task</th><th>논문 task 설명 요약</th><th>핵심 tactile difficulty</th></tr><tr><td>Flip Page</td><td>오른쪽 index finger로 책의 한 장을 들어 올려 왼쪽으로 넘기고 평평하게 편다.</td><td>thin sheet separation, single-finger contact</td></tr><tr><td>Transfer Egg</td><td>fragile egg를 green tray에서 들어 yellow tray로 옮기되 깨지지 않아야 한다.</td><td>fragile grasp, force regulation</td></tr><tr><td>Wipe Plate</td><td>오른손으로 cloth를 잡고 왼손으로 plate를 고정한 뒤 stain을 지운다.</td><td>surface contact, bimanual stabilization</td></tr><tr><td>Apply Toothpaste</td><td>toothbrush와 toothpaste tube를 잡고 bristles 위에 toothpaste bead를 짠다.</td><td>deformable object pressure control</td></tr><tr><td>Split Cup</td><td>nested cup stack에서 top cup 하나만 twist/rub으로 분리한다.</td><td>deformation/friction, exactly-one separation</td></tr><tr><td>Sort Mahjong</td><td>face-down Mahjong tile을 tactile sensing으로 식별해 matching box에 넣는다.</td><td>surface texture identification, bimanual box operation</td></tr></table>',
    body: [
      'Appendix F는 force-reactive task가 fragile object grasp, controlled pressure, slip resistance처럼 접촉 힘을 정밀하게 조절해야 하는 상황을 포함한다고 설명한다.',
      '또한 tactile-deformation sensitive task는 stacked cups나 Mahjong tile처럼 vision alone으로 알기 어려운 tactile pad deformation과 surface texture를 활용해야 한다.'
    ],
    bullets: [
      'Task I-VI: page, egg, plate, toothpaste, cup, Mahjong',
      'rubric은 additive 또는 progress-based 방식으로 task stage를 평가한다.',
      'additive는 독립 sub-step 점수를 합산하고, progress-based는 순서가 있는 stage hierarchy에서 가장 멀리 진행한 지점을 반영한다.'
    ]
  },
  {
    eyebrow: '9. Tasks',
    title: 'Evaluation Tasks: insertion, extraction, liquid handling, torque',
    kicker: '나머지 task들은 small-object grasp, insertion alignment, sliding extraction, liquid manipulation, multi-turn rotation을 포함한다.',
    layout: 'stack',
    visual: '<table class="mini-table task-table compact-table table-center"><tr><th>Task</th><th>논문 task 설명 요약</th><th>핵심 tactile difficulty</th></tr><tr><td>Open Lock</td><td>key를 grasp하고 padlock을 잡은 뒤 keyhole에 align/insert하고 rotate해 연다.</td><td>small object grip, insertion, torque</td></tr><tr><td>Refill Tablet</td><td>compartment lid를 열고 작은 ball을 넣은 뒤 lid를 다시 닫는다.</td><td>button press, lid manipulation, small object placement</td></tr><tr><td>Acid-Base Neut.</td><td>dropper로 acid solution을 aspirate/dispense하고 beaker를 swirl해 색 변화를 만든다.</td><td>liquid handling, bimanual coordination, gentle force</td></tr><tr><td>Extract Card</td><td>card sleeve에서 두 장 중 한 장만 밀어내고 single top card를 extract한다.</td><td>sliding friction, exactly-one extraction</td></tr><tr><td>Deal Poker</td><td>card stack을 handover하고 top card 하나만 빼서 card holder에 insert한다.</td><td>thin object isolation, handover, slot insertion</td></tr><tr><td>Screw Bulb</td><td>lightbulb를 handover하고 base를 고정한 뒤 여러 번 회전시켜 불이 켜지게 한다.</td><td>thread alignment, torque feedback, long-horizon precision</td></tr></table>',
    body: [
      'Appendix F의 Task VII-XII는 단순 grasp success보다 더 긴 action sequence를 요구한다. key insertion, compartment opening, liquid transfer, card extraction, card dealing, lightbulb screwing은 모두 시각 정보만으로 contact 상태를 안정적으로 판단하기 어렵다.',
      '논문은 각 task의 key stage figure와 grading rubric을 함께 제시해 Table 1 success rate가 단순 binary endpoint가 아니라 중간 진행도까지 반영할 수 있음을 명시한다.'
    ],
    bullets: [
      'Task VII-XII: lock, tablet box, acid-base, card case, poker, lightbulb',
      'thin object, insertion, torque, liquid, long-horizon contact sequence를 포함한다.'
    ],
    insight: '평가 task 구성 자체가 “tactile-reactive policy가 아니면 어디서 깨지는가”를 보여주는 stress test 역할을 한다.'
  },
  {
    eyebrow: '10. Results',
    title: 'Main Result: Table 1 전체 성공률',
    kicker: 'T-Rex는 12개 task 평균에서 65%를 기록하며, 가장 강한 baseline인 EgoScale 평균 35%보다 30%p 높다.',
    layout: 'stack',
    visual: '<table class="mini-table result-table wide-table compact-table table-center"><tr><th>Method</th><th>Flip</th><th>Egg</th><th>Wipe</th><th>Paste</th><th>Cup</th><th>Mahjong</th><th>Lock</th><th>Tablet</th><th>Acid</th><th>Card</th><th>Poker</th><th>Bulb</th><th>Avg</th></tr><tr><td>ViTacFormer</td><td>9</td><td>0</td><td>4</td><td>1</td><td>4</td><td>7</td><td>0</td><td>0</td><td>0</td><td>2</td><td>2</td><td>1</td><td>3</td></tr><tr><td>RDP</td><td>12</td><td>8</td><td>18</td><td>2</td><td>6</td><td>9</td><td>2</td><td>0</td><td>0</td><td>1</td><td>2</td><td>7</td><td>6</td></tr><tr><td>Tactile-VLA</td><td>38</td><td>14</td><td>24</td><td>0</td><td>21</td><td>27</td><td>8</td><td>0</td><td>9</td><td>4</td><td>11</td><td>18</td><td>15</td></tr><tr><td>EgoScale</td><td>68</td><td>44</td><td>34</td><td>38</td><td>33</td><td>36</td><td>19</td><td>12</td><td>43</td><td>41</td><td>28</td><td>18</td><td>35</td></tr><tr><td>pi_0.5</td><td>36</td><td>17</td><td>28</td><td>13</td><td>18</td><td>32</td><td>5</td><td>1</td><td>24</td><td>8</td><td>9</td><td>11</td><td>17</td></tr><tr><td>pi_0.5 + tactile</td><td>8</td><td>9</td><td>27</td><td>2</td><td>4</td><td>14</td><td>2</td><td>0</td><td>7</td><td>3</td><td>0</td><td>0</td><td>6</td></tr><tr class="highlight-row"><td><strong>T-Rex</strong></td><td><strong>96</strong></td><td><strong>75</strong></td><td><strong>69</strong></td><td><strong>66</strong></td><td><strong>78</strong></td><td><strong>65</strong></td><td><strong>47</strong></td><td><strong>41</strong></td><td><strong>76</strong></td><td><strong>70</strong></td><td><strong>57</strong></td><td><strong>35</strong></td><td><strong>65</strong></td></tr></table>',
    body: [
      'Table 1은 12개 tactile-reactive manipulation tasks에서 success rate를 보고한다. 모든 task는 16 evaluation rollouts로 평가되고, multi-stage task는 progress-based rubric을 사용한다.',
      'Baseline은 약한 비교군만 모은 것이 아니다. ViTacFormer/RDP/Tactile-VLA는 tactile-aware task-specific 계열이고, EgoScale/pi_0.5는 human/VLA foundation 계열이며, pi_0.5 + tactile은 tactile을 state에 단순 연결한 반례다.',
      '결과 해석에서 중요한 점은 T-Rex가 fragile grasp, deformable pressure, sliding extraction처럼 tactile feedback이 action correction에 직접 필요한 task에서 baseline과 큰 차이를 만든다는 점이다.'
    ],
    bullets: [
      '가장 강한 baseline EgoScale 평균 35 대비 +30%p',
      'Tactile-VLA/RDP/ViTacFormer: tactile을 쓰지만 foundation-scale slow/fast recipe는 약함',
      'EgoScale/pi_0.5: foundation prior는 강하지만 tactile correction path가 없음',
      'pi_0.5 + tactile 평균 6은 visual-only pi_0.5 평균 17보다 낮다.',
      '논문은 naive tactile conditioning이 성능을 저하시킬 수 있다고 해석한다.'
    ],
    insight: '실험 결과 슬라이드에서는 평균만 보지 말고, Screw Bulb/Open Lock처럼 여전히 어려운 task가 남아 있다는 점도 함께 짚어야 한다.'
  },
  {
    eyebrow: '10. Ablation',
    title: 'Ablation: Table 2 전체 결과',
    kicker: 'Table 2는 tactile signal 자체, tactile representation, asynchronous architecture가 모두 성능에 기여한다는 것을 보여준다.',
    layout: 'stack',
    visual: '<table class="mini-table result-table compact-table table-center"><tr><th>Configuration</th><th>Flip</th><th>Paste</th><th>Cup</th><th>Lock</th><th>Card</th><th>Bulb</th><th>Avg</th></tr><tr class="highlight-row"><td>Full Model</td><td>96</td><td>66</td><td>78</td><td>47</td><td>70</td><td>35</td><td>65</td></tr><tr><td>w/o Tactile</td><td>76</td><td>39</td><td>58</td><td>23</td><td>34</td><td>20</td><td>42 (-23)</td></tr><tr><td>MLP Force + Deform</td><td>89</td><td>58</td><td>72</td><td>44</td><td>58</td><td>29</td><td>58 (-7)</td></tr><tr><td>Deform only</td><td>82</td><td>57</td><td>71</td><td>36</td><td>55</td><td>25</td><td>54 (-11)</td></tr><tr><td>MLP Force + VQ-VAE Force</td><td>92</td><td>63</td><td>65</td><td>38</td><td>67</td><td>28</td><td>59 (-6)</td></tr><tr><td>w/o Async</td><td>92</td><td>61</td><td>73</td><td>45</td><td>59</td><td>30</td><td>60 (-5)</td></tr></table>',
    body: [
      'Table 2는 6개 representative tactile-reactive tasks에서 tactile modality와 architecture design을 ablation한다. Full Model 평균은 65다.',
      'Tactile을 제거하면 평균 42로 23 points 하락한다. 특히 Apply Toothpaste, Extract Card, Open Lock처럼 force regulation과 contact alignment가 중요한 task에서 drop이 크다.',
      'MLP Force + Deform, Deform only, MLP Force + VQ-VAE Force가 모두 full model보다 낮은 것은 “force를 넣었다” 자체보다 temporal force token, deformation feature, fusion timing의 조합이 중요하다는 의미다. w/o Async도 평균 60으로 떨어져, fast tactile refinement 경로가 단순 architecture 장식이 아니라 실제 성능 기여를 한다.'
    ],
    bullets: [
      'w/o tactile: contact-rich task에서 가장 큰 성능 하락',
      'representation ablation: force temporal token과 deformation map 모두 중요',
      'w/o async: fast tactile refinement 자체도 기여'
    ],
    insight: '가장 큰 drop은 w/o tactile이지만, representation과 async를 바꿔도 성능이 계속 떨어진다. 즉 성능은 “touch 유무” 하나가 아니라 touch representation과 timing까지 함께 만든 결과다.'
  },
  {
    eyebrow: '10. Ablation',
    title: 'Cascaded denoising split step',
    kicker: 'tactile expert가 denoising path의 어느 시점부터 개입하는지가 성능에 영향을 준다.',
    layout: 'stack',
    visual: '<div class="plot-frame compact-plot"><img class="plot-figure" src="/trex/trex-split-step.png" alt="Cascaded denoising split step ablation" /></div>',
    body: [
      'Figure 4는 Apply Toothpaste, Split Cup, Extract Card에서 denoising split step을 바꾼 success rate curve를 보여준다.',
      '논문은 split이 너무 작으면 action expert가 downstream tactile refinement에 충분한 visuomotor prior를 제공하지 못하고, split이 너무 크면 tactile expert가 tactile feedback을 반영할 capacity가 줄어든다고 설명한다.',
      '결과 해석의 포인트는 tactile expert가 denoising path 전체를 맡는 것이 아니라 “어느 정도 action prior가 생긴 뒤” 개입해야 한다는 점이다. 즉 split step은 계산 효율 파라미터가 아니라 slow visual planning과 fast tactile correction 사이의 역할 분담을 정하는 파라미터다.'
    ],
    bullets: [
      '너무 이른 tactile refinement: coarse action prior 부족',
      '너무 늦은 tactile refinement: contact feedback 반영 부족',
      '중간 split이 가장 안정적인 trade-off를 만든다.'
    ]
  },
  {
    eyebrow: '10. Data Efficiency',
    title: 'Figure 5: post-training data efficiency',
    kicker: 'T-Rex Dataset mid-training은 downstream task demonstration 수를 줄이는 방향으로 작동한다.',
    layout: 'stack',
    visual: '<div class="plot-frame compact-plot"><img class="plot-figure" src="/trex/trex-data-efficiency.png" alt="T-Rex data efficiency" /></div>',
    body: [
      'Figure 5는 post-training demonstrations 수를 10에서 200까지 바꿨을 때 tactile-grounded T-Rex mid-training data가 low-data regime에서 성능을 높인다고 보고한다.',
      'Apply Toothpaste, Split Cup, Extract Card에서 demo 수를 줄여도 T-Rex mid-training을 거친 모델이 no mid-training 조건보다 높은 curve를 보인다.',
      '결과적으로 mid-training corpus는 downstream fine-tuning이 적어도 쓸 수 있는 contact prior를 미리 형성하는 역할을 한다.'
    ],
    bullets: [
      '10, 20, 50, 100, 200 demos 구간을 비교',
      'low-data regime에서 tactile-grounded mid-training 효과가 크다.',
      'target task demo를 많이 모으는 것과 reusable prior를 만드는 것은 다른 문제다.'
    ],
    insight: '데이터 효율 결과는 “더 많은 task-specific demo”보다 “primitive-rich mid-training corpus”가 generalization에 더 유리할 수 있다는 논문 주장을 뒷받침한다.'
  },
  {
    eyebrow: '10. Dataset Ablation',
    title: 'Figure 6: mid-training dataset ablation',
    kicker: 'Figure 6은 100시간 T-Rex Dataset이 같은 100시간 task-specific dataset보다 더 잘 일반화되는지 직접 비교한다.',
    layout: 'stack',
    visual: '<div class="plot-frame compact-plot"><img class="plot-figure" src="/trex/trex-midtraining-ablation.png" alt="T-Rex mid-training dataset ablation" /></div>',
    body: [
      'Figure 6은 mid-training 없음, 11개 task에서 모은 100-hour task-specific dataset, 그리고 100-hour tactile-grounded T-Rex Dataset을 비교한다.',
      '평가는 6개 representative post-training tasks와 4개 easier zero-shot tasks로 나뉜다. zero-shot task는 T-Rex Dataset 안의 pick, slide, press, wipe motor primitive와 연결된다.',
      '논문은 T-Rex Dataset이 task-specific 100시간보다 stronger generalization과 zero-shot transfer를 보인다고 해석한다.'
    ],
    bullets: [
      '같은 100h data budget에서 dataset 구성의 차이를 검증',
      'post-training task와 zero-shot task를 모두 보고한다.',
      'primitive-rich tactile dataset이 task rehearsal보다 재사용 가능한 contact prior를 만든다.'
    ],
    insight: '이 결과가 빠지면 T-Rex Dataset의 핵심 주장, 즉 “평가 task를 많이 외운 것이 아니라 contact primitive coverage를 학습했다”는 주장이 약해진다.'
  },
  {
    eyebrow: '10. Training Recipe',
    title: 'Training Recipe Ablation: Table 3 전체 결과',
    kicker: 'Table 3는 human egocentric pre-training과 tactile-grounded mid-training이 각각 성능에 기여한다는 것을 6개 task로 검증한다.',
    layout: 'stack',
    visual: '<table class="mini-table result-table compact-table table-center"><tr><th>Pre-training</th><th>Mid-training</th><th>Flip</th><th>Paste</th><th>Cup</th><th>Lock</th><th>Card</th><th>Bulb</th><th>Avg</th></tr><tr><td>-</td><td>-</td><td>46</td><td>16</td><td>20</td><td>6</td><td>14</td><td>5</td><td>18</td></tr><tr><td>-</td><td>✓</td><td>75</td><td>34</td><td>45</td><td>10</td><td>32</td><td>9</td><td>34</td></tr><tr><td>✓</td><td>-</td><td>88</td><td>40</td><td>52</td><td>22</td><td>46</td><td>20</td><td>45</td></tr><tr class="highlight-row"><td>✓</td><td>✓</td><td>96</td><td>66</td><td>78</td><td>47</td><td>70</td><td>35</td><td>65</td></tr></table>',
    body: [
      'Table 3는 Flip Page, Apply Toothpaste, Split Cup, Open Lock, Extract Card, Screw Lightbulb 6개 task에서 training recipe를 ablation한다.',
      'Pre-training과 mid-training이 모두 없는 경우 평균 18, mid-training만 있는 경우 평균 34, pre-training만 있는 경우 평균 45, 둘 다 사용하는 full recipe는 평균 65다.',
      '흥미로운 점은 pre-training만 있는 조건이 mid-training만 있는 조건보다 평균이 높지만, 둘 중 하나만으로는 full recipe에 크게 못 미친다는 것이다. 논문 관점에서는 human egocentric pre-training이 broad semantic/visuomotor prior를 주고, tactile-grounded mid-training이 그 prior를 robot-executable contact-rich control로 bridge한다.'
    ],
    bullets: [
      'human pre-training은 broad semantic grounding과 coarse visuomotor prior를 제공한다.',
      'tactile-grounded mid-training은 robot-executable contact-rich control로 bridge한다.',
      'full recipe가 모든 6개 task에서 가장 높은 성능을 보인다.'
    ]
  },
  {
    eyebrow: '11. Conclusion',
    title: '결론: tactile-reactive policy의 설계 원칙',
    kicker: 'T-Rex의 결론은 “tactile을 넣자”가 아니라 “tactile이 action을 바꾸는 경로를 따로 설계하자”에 가깝다.',
    layout: 'fill',
    visual: '<div class="principle-map compact-principle-map"><div><b>1</b><span>Dataset coverage</span><small>primitive-rich contact prior</small></div><div><b>2</b><span>Tactile representation</span><small>force token + deformation feature</small></div><div><b>3</b><span>Frequency-aware architecture</span><small>slow reasoning + fast correction</small></div><div><b>4</b><span>Failure-aware next steps</span><small>recovery, control, RL</small></div></div>',
    body: [
      'T-Rex는 contact-rich manipulation에서 tactile feedback이 왜 필요한지, 그리고 어떻게 policy architecture 안에 넣어야 하는지를 비교적 선명하게 보여준다.',
      '특히 naive tactile concatenation이 실패한 결과는 중요한 메시지를 준다. tactile signal은 vision state 옆에 붙는 부가 정보가 아니라, action update를 빠르게 바꾸는 별도의 computational path가 필요하다.'
    ],
    bullets: [
      'dataset은 reusable contact behavior 중심으로 설계한다.',
      'tactile은 raw signal이 아니라 representation으로 다룬다.',
      'slow reasoning과 fast correction을 분리한다.'
    ]
  },
  {
    eyebrow: '11. Limitation',
    title: 'Limitation과 Future Work',
    kicker: 'T-Rex는 강한 결과를 보이지만, 실패 사례를 보면 online recovery와 fine control은 여전히 남아 있다.',
    layout: 'split',
    visual: '<img src="/trex/trex-failure-case.png" alt="T-Rex failure case analysis" />',
    body: [
      'Appendix H는 object collision, slipping off, imprecise positioning, excessive force 같은 실패를 보여준다. 이 실패들은 tactile을 못 봐서만 생기는 문제가 아니다. alignment, force magnitude regulation, multi-finger coordination, recovery policy가 함께 필요하다.',
      '따라서 future work는 tactile encoder를 더 좋게 만드는 것만으로 끝나지 않는다. online RL, model predictive control, impedance control, constraint-aware recovery policy를 어떻게 결합할지가 다음 질문이다.'
    ],
    bullets: [
      'offline BC만으로 long-horizon precision task를 끝까지 안정화하기 어렵다.',
      'sensor drift, calibration, device variation도 practical bottleneck이다.',
      'failure recovery와 contact-aware controller가 후속 연구 방향이다.'
    ]
  },
  {
    eyebrow: '12. Appendix A',
    title: 'Appendix A: Model and Training Details',
    kicker: 'Appendix A는 T-Rex가 어느 정도 모델 크기와 compute 위에서 성립하는지 보여준다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table appendix-table table-center"><tr><th>Module</th><th>Detail</th></tr><tr><td>Latent expert</td><td>Qwen3VL-2B, 28 layers, 1.41B params</td></tr><tr><td>Action expert</td><td>action dim 62, chunk 16, 1.41B params</td></tr><tr><td>Tactile expert</td><td>action dim 62, chunk 16, 0.62B params</td></tr><tr><td>Training</td><td>AdamW, LR 1e-4, H100 x24, ZeRO-1, bf16</td></tr></table>',
    body: [
      '이 부록의 핵심은 tactile expert가 action/latent expert보다 작다는 점이다. fast loop에서 자주 실행하려면 module 크기를 줄여야 하고, T-Rex는 이를 architecture 수준에서 반영한다.',
      '또한 24장의 H100을 사용하는 설정은 T-Rex가 작은 실험이 아니라 foundation-policy 규모의 학습 recipe에 가깝다는 점을 보여준다.'
    ],
    bullets: [
      'fast tactile expert는 0.62B 규모로 설계된다.',
      'compute requirement가 크므로 재현 시 모델 축소나 distillation이 필요할 수 있다.'
    ]
  },
  {
    eyebrow: '12. Appendix B',
    title: 'Appendix B: Asynchronous Cascaded Denoising Details',
    kicker: 'Appendix B는 T-Rex의 runtime 동작을 이해하는 핵심 부록이다.',
    visual: '<div class="runtime-cache"><div class="cache-main"><strong>Slow stream output</strong><span>KV cache</span><span>partially denoised boundary state</span></div><div class="cache-arrow">↓ copied into fast stream</div><div class="cache-main accent"><strong>Fast stream update</strong><span>latest tactile token</span><span>terminal denoising</span><span>updated action</span></div></div>',
    body: [
      'slow stream은 visual-language context와 partially-denoised boundary state를 만든다. fast stream은 raw vision을 다시 처리하지 않고, 이 cache와 boundary state를 이용해 tactile-conditioned denoising을 수행한다.',
      'delay augmentation은 실제 deployment에서 vision context와 tactile frame이 정확히 같은 시간에 오지 않는 문제를 학습 중에 미리 겪게 만든다. execution lock은 slow/fast stream이 shared state를 동시에 건드릴 때 생길 수 있는 race condition을 막는다.'
    ],
    bullets: [
      'cache reuse가 계산량을 줄인다.',
      'delay augmentation이 train/deploy mismatch를 줄인다.',
      'execution lock이 runtime 안정성을 만든다.'
    ]
  },
  {
    eyebrow: '12. Appendix C',
    title: 'Appendix C: Spatial-Temporal Tactile Encoder',
    kicker: 'Appendix C는 tactile signal을 policy token으로 바꾸는 구현 디테일을 설명한다.',
    visual: '<div class="two-column"><div><h4>Force VQ-VAE</h4><p>16-frame wrench history</p><p>codebook K=64</p><p>magnitude-weighted reconstruction</p></div><div><h4>Deformation Encoder</h4><p>single-channel depth map</p><p>ResNet-18 variant</p><p>pretrain then freeze</p></div></div>',
    body: [
      'force VQ-VAE는 최근 force history를 discrete code로 압축한다. sensor drift와 noise가 있는 raw force를 그대로 policy에 넣는 대신, contact pattern vocabulary로 묶는 역할을 한다.',
      'deformation encoder는 tactile depth map의 spatial geometry를 보존한다. force token이 시간적 변화를 잡는다면, deformation feature는 접촉 위치와 국소 형상을 잡는다.'
    ],
    bullets: [
      'temporal force는 contact dynamics를 압축한다.',
      'spatial deformation은 local contact geometry를 보존한다.',
      '둘을 함께 쓸 때 full model 성능이 나온다.'
    ]
  },
  {
    eyebrow: '12. Appendix D',
    title: 'Appendix D: Real-World Setup and Teleoperation Stack',
    kicker: 'Appendix D는 policy가 어떤 robot system 위에서 학습되고 평가됐는지 보여준다.',
    layout: 'stack',
    visual: '<div class="plot-frame small-figure"><img src="/trex/trex-setup.png" alt="T-Rex real-world setup" /></div>',
    body: [
      '실험은 고정형 bimanual Dexmate Vega-1과 양쪽 Sharpa Wave hand에서 수행된다. head camera는 workspace 전체를 보고, wrist camera는 손 주변의 occlusion을 보완한다.',
      'teleoperation은 Manus gloves와 VIVE tracker를 사용한다. low-level control은 300Hz로 실행되고, high-level policy는 더 낮은 주기로 action target을 갱신한다. 이 stack 자체가 T-Rex의 slow/fast design과 연결된다.'
    ],
    bullets: [
      'hardware와 sensor placement가 dataset distribution을 결정한다.',
      'teleoperation stack은 demonstration quality에 직접 영향을 준다.'
    ]
  },
  {
    eyebrow: '12. Appendix E',
    title: 'Appendix E: Baseline 재현 조건',
    kicker: 'Appendix E는 Table 1의 숫자가 어떤 adaptation 위에서 나온 것인지 설명한다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table appendix-table table-center"><tr><th>공통 조건</th><th>논문 반영 내용</th></tr><tr><td>비교 대상</td><td>ViTacFormer, RDP, Tactile-VLA, EgoScale, pi_0.5, pi_0.5 + tactile</td></tr><tr><td>학습 단위</td><td>12개 T-Rex task 각각에 대해 separate policy를 fine-tune/train</td></tr><tr><td>데이터</td><td>T-Rex post-training과 같은 task-specific demonstrations 사용</td></tr><tr><td>평가</td><td>같은 robot setup, action space, evaluation protocol로 통일</td></tr><tr><td>핵심 해석</td><td>baseline 이름만 비교한 것이 아니라 T-Rex hardware에 맞춘 재현 비교</td></tr></table>',
    body: [
      'Appendix E의 출발점은 공정성이다. 모든 baseline은 T-Rex와 같은 12개 task, 같은 post-training demonstration, 같은 평가 protocol 위에서 재현된다.',
      '따라서 Table 1은 원 논문의 off-the-shelf 숫자가 아니라, T-Rex의 bimanual dexterous robot setup에 맞게 action space와 tactile input을 맞춘 비교다.'
    ],
    bullets: [
      'embodiment와 hand DoF가 다르면 baseline 구현도 바뀐다.',
      'tactile input 형식도 플랫폼에 맞게 force/torque 기반으로 통일된다.'
    ]
  },
  {
    eyebrow: '12. Appendix E',
    title: 'Appendix E: Task-Specific Baselines',
    kicker: 'ViTacFormer, RDP, Tactile-VLA는 모두 task별 정책으로 재현된다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table appendix-table table-center"><tr><th>Baseline</th><th>구현/학습 조건</th><th>T-Rex setup adaptation</th></tr><tr><td>ViTacFormer</td><td>ACT-style visuo-tactile policy, 100 demos/task, 100 epochs, ACT chunk 100, hidden 512, FFN 3200, KL 10</td><td>6D per-finger force conditioning, bimanual control, Sharpa Wave 22-DoF 전체 finger joint 직접 예측</td></tr><tr><td>RDP</td><td>AT tokenizer 100 epochs, batch 64; LDP 200 epochs from latest AT checkpoint</td><td>10 fingertips의 6D force/torque를 high-frequency tactile conditioning으로 사용</td></tr><tr><td>Tactile-VLA</td><td>12개 task별 separate policy, 100 epochs, 8 GPUs, Simple-MLP tactile encoder</td><td>원래 GelSight tactile image 가정을 10 fingertips 6D force/torque vector로 대체</td></tr></table>',
    body: [
      'Appendix E는 small/task-specific tactile baselines도 단순 약한 비교군으로 두지 않는다. ViTacFormer와 RDP는 각각 원 공식 구현을 따르되 T-Rex의 bimanual setup에 맞게 조정된다.',
      'Tactile-VLA는 원래 GelSight image를 사용하지만, T-Rex 플랫폼에서는 fingertip force/torque가 tactile observation이므로 Simple-MLP encoder를 통해 6D wrench input으로 바꿔 학습한다.'
    ],
    bullets: [
      'ViTacFormer: future tactile prediction이 있는 ACT 계열 baseline',
      'RDP: slow-fast tactile-reactive diffusion baseline',
      'Tactile-VLA: tactile-aware VLA를 T-Rex tactile sensor 형식에 맞춰 재현'
    ]
  },
  {
    eyebrow: '12. Appendix E',
    title: 'Appendix E: Foundation Baselines',
    kicker: 'EgoScale과 pi_0.5 계열은 large pretrained VLA를 같은 task demo로 fine-tune한다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table appendix-table table-center"><tr><th>Baseline</th><th>초기화/학습</th><th>Action / tactile 조건</th></tr><tr><td>EgoScale</td><td>GR00T N1.7 구현, nvidia/GR00T-N1.7-3B checkpoint, 200 epochs, global batch 32, 8 GPUs</td><td>bimanual arm relative end-effector actions + Sharpa Wave 22-DoF hand joint actions, state dropout 0.2, image color jitter</td></tr><tr><td>pi_0.5</td><td>OpenPI official codebase, released pretrained checkpoint, same task demos로 separate fine-tuning</td><td>dual-arm joint control + 22-DoF dexterous hand joint control, action horizon 16</td></tr><tr><td>pi_0.5 + tactile</td><td>pi_0.5와 같은 fine-tuning setup, FSDP, 8 GPUs, global batch 16</td><td>state input에 single-step tactile observation, 즉 10 fingertips의 6D force/torque를 concatenate</td></tr></table>',
    body: [
      'EgoScale은 human egocentric pretraining 기반의 강한 foundation baseline이다. Appendix E는 GR00T N1.7 구현과 3B checkpoint를 사용해 각 task에 fine-tune했다고 명시한다.',
      'pi_0.5 + tactile은 T-Rex 주장에 중요한 반례다. tactile을 별도 fast expert로 쓰지 않고 state에 단순 연결하면 Table 1에서 오히려 성능이 크게 떨어진다.'
    ],
    bullets: [
      'foundation baseline도 task별 separate policy로 맞춰 비교한다.',
      'naive tactile concatenation은 tactile-reactive architecture의 필요성을 보여준다.'
    ]
  },
  {
    eyebrow: '12. Appendix F',
    title: 'Appendix F: Evaluation Protocol',
    kicker: 'Appendix F는 12개 task의 성격과 채점 방식을 명시한다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table appendix-table table-center"><tr><th>구분</th><th>논문 내용</th></tr><tr><td>Task scope</td><td>12개 contact-rich dexterous manipulation task</td></tr><tr><td>Force-reactive</td><td>fragile grasp, controlled pressure, slip resistance처럼 contact force를 정밀 조절해야 함</td></tr><tr><td>Tactile-deformation</td><td>stacked cup, mahjong texture처럼 tactile pad deformation이 핵심 정보가 됨</td></tr><tr><td>Long sequence</td><td>insertion, extraction, bimanual handover처럼 여러 단계가 이어짐</td></tr><tr><td>Additive rubric</td><td>독립적인 sub-step별 점수를 더해 partial completion을 계산</td></tr><tr><td>Progress-based rubric</td><td>순서가 중요한 stage hierarchy에서 어디까지 진행했는지로 점수화</td></tr></table>',
    body: [
      'Appendix F는 benchmark가 단순 pick-and-place가 아니라 force-reactive, tactile-deformation sensitive, bimanual coordination, long-horizon sequencing을 동시에 평가하도록 설계됐다고 설명한다.',
      '각 task는 key-stage figure와 text instruction, grading rubric을 함께 제공한다. Table 1의 success rate는 이 rubric 기반으로 계산되므로 task 정의를 같이 봐야 해석할 수 있다.'
    ],
    bullets: [
      'additive rubric: 각 sub-step별 부분 점수',
      'progress-based rubric: predefined hierarchy에서 어디까지 진행했는지 반영'
    ]
  },
  {
    eyebrow: '12. Appendix F',
    title: 'Appendix F: Task I-VI',
    kicker: '앞쪽 6개 task는 얇은 물체, fragile grasp, surface contact, deformable pressure, texture sensing을 포함한다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table task-table table-center"><tr><th>Task</th><th>Instruction / goal</th><th>Rubric stages</th></tr><tr><td>I Flip Page</td><td>오른쪽 index finger로 책 한 장을 오른쪽에서 왼쪽으로 넘김</td><td>single-finger touch, page lift, exactly one page flip + flatten</td></tr><tr><td>II Transfer Egg</td><td>오른손 thumb/index로 egg를 green tray에서 yellow tray로 이동</td><td>contact without knocking, lift intact, transport above tray, release intact</td></tr><tr><td>III Wipe Plate</td><td>오른손 cloth, 왼손 plate stabilization으로 stain 제거</td><td>grasp rag, press plate, contact plate, wipe fully, return rag + release plate</td></tr><tr><td>IV Apply Toothpaste</td><td>왼손 toothbrush, 오른손 tube로 bristles 위에 toothpaste bead를 짬</td><td>grasp toothbrush, grasp tube, dispense bead, return toothbrush, place tube</td></tr><tr><td>V Split Cup</td><td>nested cup stack에서 top cup 하나만 twist/rub으로 분리</td><td>stabilize stack, grasp top cup, separate exactly one cup, hold intact</td></tr><tr><td>VI Sort Mahjong</td><td>face-down tile을 tactile로 식별하고 matching compartment에 넣음</td><td>pick tile, open correct lid, place tile correctly, close lid with thumb</td></tr></table>',
    body: [
      'Task I-VI는 단순 grasp보다 contact quality가 중요하다. Flip Page는 single-sheet separation, Transfer Egg는 fragile force regulation, Wipe Plate는 surface contact와 bimanual stabilization을 본다.',
      'Apply Toothpaste와 Split Cup은 deformable/friction contact를, Sort Mahjong은 vision으로 보이지 않는 surface texture identification과 box operation을 요구한다.'
    ],
    bullets: [
      'rubric은 단계별 성공을 명시하므로 실패 위치를 분석할 수 있다.',
      'Sort Mahjong은 tactile sensing이 task identity 판단에 직접 연결되는 대표 task다.'
    ]
  },
  {
    eyebrow: '12. Appendix F',
    title: 'Appendix F: Task VII-XII',
    kicker: '뒤쪽 6개 task는 insertion, small object handling, liquid manipulation, sliding, handover, screw motion을 평가한다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table task-table table-center"><tr><th>Task</th><th>Instruction / goal</th><th>Rubric stages</th></tr><tr><td>VII Open Lock</td><td>key를 집고 padlock을 잡아 keyhole에 insert/rotate</td><td>grasp key, grasp padlock, align + insert key, rotate + open lock</td></tr><tr><td>VIII Refill Tablet</td><td>compartment lid를 열고 작은 ball을 넣은 뒤 닫음</td><td>press button, flip lid open, pick ball, place ball, press lid closed</td></tr><tr><td>IX Acid-Base Neut.</td><td>dropper로 acid를 aspirate/dispense하고 beaker를 swirl해 color transition 유도</td><td>grasp dropper, aspirate, pick beaker, dispense, swirl, color change, return dropper, place beaker</td></tr><tr><td>X Extract Card</td><td>card sleeve에서 two cards를 밀어낸 뒤 bottom card를 다시 넣고 top card만 extract</td><td>hold sleeve, rub cards out, push bottom card in, extract single top card</td></tr><tr><td>XI Deal Poker</td><td>card stack handover 후 top card 하나만 뽑아 slot에 insert</td><td>grasp stack, handover, flick exactly one card, grasp protruding card, insert into slot</td></tr><tr><td>XII Screw Bulb</td><td>bulb handover 후 socket을 고정하고 여러 번 rotate해 light-on</td><td>pick bulb, handover, stabilize socket, align + rotate threads, bulb seated + illuminated</td></tr></table>',
    body: [
      'Task VII-XII는 tactile feedback만이 아니라 fine visual alignment, finger-level coordination, force/torque control이 함께 맞아야 한다.',
      'Acid-Base Neutralization은 liquid handling과 color-change endpoint를 포함하고, Extract Card와 Deal Poker는 thin-object sliding과 exactly-one extraction을 엄격하게 본다.'
    ],
    bullets: [
      'Open Lock, Screw Bulb는 insertion/rotation tolerance가 중요하다.',
      'Extract Card, Deal Poker는 sliding friction과 single-object isolation을 평가한다.'
    ]
  },
  {
    eyebrow: '12. Appendix F',
    title: 'Appendix F: Task Figures의 의미',
    kicker: 'Figure 8-19는 예쁜 예시가 아니라 grading stage를 해석하는 기준이다.',
    layout: 'stack',
    visual: '<img src="/trex/trex-apply-toothpaste.png" alt="Apply Toothpaste task stages" />',
    body: [
      'Appendix F의 key-stage figure는 각 task가 어떤 physical transition을 요구하는지 보여준다. 예를 들어 Apply Toothpaste는 tube를 잡는 것보다 nozzle alignment와 squeezing force가 더 핵심이다.',
      '이 관점으로 보면 T-Rex benchmark는 “성공/실패” 숫자보다 어느 contact transition에서 실패하는지를 분석하기 좋게 설계된 benchmark다.'
    ],
    bullets: [
      'thin sheet/card: separation과 exactly-one extraction',
      'deformable/fragile object: pressure magnitude와 damage avoidance',
      'insertion/rotation: contact alignment와 torque feedback'
    ]
  },
  {
    eyebrow: '12. Appendix G',
    title: 'Appendix G: Episode Schema',
    kicker: 'Appendix G는 각 demonstration episode에 저장되는 stream을 명시한다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table appendix-table table-center"><tr><th>Modality</th><th>Episode에 저장되는 내용</th></tr><tr><td>RGB</td><td>head ZED X Mini 1개 + wrist ZED X One S wide-view 2개, 총 3개 monocular RGB streams, 30Hz</td></tr><tr><td>Proprioception</td><td>bimanual arm joint positions/velocities + Sharpa Wave hand joint states</td></tr><tr><td>Wrist pose</td><td>양쪽 wrist end-effector pose</td></tr><tr><td>Tactile</td><td>10 fingertips 각각의 single-channel deformation depth map + 6-axis net wrench</td></tr><tr><td>Language</td><td>episode motion을 설명하는 natural-language instruction</td></tr><tr><td>Sync</td><td>모든 stream은 common timestamp를 공유하고 high-level teleoperation thread의 30Hz cadence로 기록</td></tr></table>',
    body: [
      'Appendix G는 T-Rex Dataset을 time-aligned bundle로 정의한다. vision, proprioception, action-relevant pose, tactile, language가 같은 timestamp 아래 묶인다.',
      '이 schema는 T-Rex가 단순 image-action dataset이 아니라 tactile-synchronized mid-training dataset이라는 점을 명확히 한다.'
    ],
    bullets: [
      '30Hz high-level teleoperation cadence가 stream alignment의 기준이다.',
      'tactile은 force/torque와 deformation geometry를 모두 포함한다.'
    ]
  },
  {
    eyebrow: '12. Appendix G',
    title: 'Appendix G: Taxonomy and Statistics',
    kicker: '데이터셋은 downstream 12개 task 반복이 아니라 object-primitive 조합으로 구성된다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table appendix-table table-center"><tr><th>항목</th><th>수치 / 절차</th></tr><tr><td>Object pool</td><td>207 common household objects</td></tr><tr><td>Motor primitives</td><td>22 primitives</td></tr><tr><td>Feasibility filtering</td><td>object x primitive 후보 중 물리적으로 불가능한 조합 제거</td></tr><tr><td>Retained pairs</td><td>502 unique object-motor primitive combinations</td></tr><tr><td>Episodes / hours</td><td>7,755 episodes, 100 hours</td></tr><tr><td>Episode length</td><td>median 29.8s, IQR 21.0-41.1s</td></tr><tr><td>Coverage per pair</td><td>각 retained pair 평균 16 demonstrations</td></tr><tr><td>Collection period</td><td>teleoperators가 10 weeks 동안 수집</td></tr></table>',
    body: [
      'Appendix G의 핵심은 100시간이라는 양보다 taxonomy다. 207개 일상 object와 22개 primitive를 조합하고, pour-solid block이나 twist-non-articulated object처럼 불가능한 pair를 manual checklist로 제거한다.',
      '그 결과 502개 feasible object-motor primitive pair가 남고, 각 pair에 평균 16개 demonstration을 수집해 primitive별 action distribution을 넓게 보여준다.'
    ],
    bullets: [
      'Figure 2는 object category, motor primitive, object long-tail distribution을 보여준다.',
      'T-Rex mid-training은 reusable contact behavior coverage를 노린다.'
    ]
  },
  {
    eyebrow: '12. Appendix G',
    title: 'Appendix G: Scene Diversity and Cleaning',
    kicker: 'visual generalization과 tactile quality를 위해 scene variation과 cleaning이 별도로 들어간다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table appendix-table table-center"><tr><th>구성</th><th>논문 내용</th></tr><tr><td>Backdrops</td><td>6 distinct tabletop backdrops</td></tr><tr><td>Distractors</td><td>210개 이상 non-target item pool에서 random selection, scene당 보통 0-5개 visible</td></tr><tr><td>Object randomization</td><td>각 object-motor skill pair마다 initial object position/orientation randomization</td></tr><tr><td>Cleaning 1</td><td>unstable tactile measurements 제거</td></tr><tr><td>Cleaning 2</td><td>corrupted sensor streams 제거</td></tr><tr><td>Cleaning 3</td><td>teleop failure로 생긴 abnormal motions와 extreme joint-space velocities 제거</td></tr></table>',
    body: [
      'Scene diversity는 language-conditioned behavior를 위해 들어간다. target object만 놓고 반복 수집하는 것이 아니라 backdrop, distractor, object pose를 바꿔 visual/spatial overfitting을 줄인다.',
      'Data cleaning은 tactile-rich dataset에서 특히 중요하다. tactile measurement instability나 corrupted stream이 남으면 policy가 contact signal을 잘못 학습할 수 있다.'
    ],
    bullets: [
      'distractor는 language instruction에 따라 target을 골라야 하는 상황을 만든다.',
      'cleaning은 tactile quality와 action smoothness를 모두 본다.'
    ]
  },
  {
    eyebrow: '12. Appendix G',
    title: 'Appendix G: Language Annotation and Release',
    kicker: 'annotation과 release policy까지 Appendix G에 포함된다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table appendix-table table-center"><tr><th>단계</th><th>논문 내용</th></tr><tr><td>VLM input</td><td>head camera에서 sampled image frames 4-6장 + teleoperation 중 기록된 target object name, motor-primitive name</td></tr><tr><td>Annotation output</td><td>episode motion을 comprehensive하게 설명하는 single imperative sentence</td></tr><tr><td>Human verification</td><td>hallucination과 imprecise description을 human annotator가 필터링</td></tr><tr><td>Ethics</td><td>controlled lab data, released RGB에 third-party human subjects 없음, reset 중 teleoperator hand incidental frames는 clip</td></tr><tr><td>Release plan</td><td>raw sensor streams, derived tactile representations, language annotations, data loaders, preprocessing scripts를 MIT license로 공개 계획</td></tr></table>',
    body: [
      'Appendix G는 language instruction도 수작업 label만으로 만들지 않는다. VLM이 sampled frames와 최소 label을 보고 imperative sentence를 생성하고, 사람이 hallucination과 부정확한 설명을 걸러낸다.',
      'Release plan은 raw stream뿐 아니라 derived tactile representation과 preprocessing scripts까지 포함한다. 재현 관점에서는 데이터 파일만 공개하는 것보다 중요한 부분이다.'
    ],
    bullets: [
      'annotation은 target object와 motor primitive를 language-conditioned policy 입력으로 연결한다.',
      'ethics/release 항목은 공개 dataset으로서의 사용 조건을 명시한다.'
    ]
  },
  {
    eyebrow: '12. Appendix H',
    title: 'Appendix H: Failure Case Analysis',
    kicker: 'Appendix H는 T-Rex의 한계를 다음 연구 질문으로 바꾸는 부록이다.',
    layout: 'split',
    visual: '<img src="/trex/trex-failure-case.png" alt="T-Rex failure case analysis" />',
    body: [
      '실패 사례에는 object collision, slipping off, imprecise position, excessive force, sliding misalignment가 포함된다. 이 실패들은 tactile을 못 봐서만 생기는 문제가 아니다.',
      'Figure 20은 T-Rex가 tactile-reactive 구조를 갖고 있어도, contact-rich manipulation에서 geometric alignment와 force control이 동시에 틀어지면 실패할 수 있음을 보여준다. 예를 들어 물체와 충돌하거나, 잡은 물체가 미끄러지거나, insertion 위치가 조금 어긋나는 경우는 tactile signal만 추가한다고 자동으로 해결되지 않는다.',
      '특히 slipping off와 excessive force는 tactile feedback으로 징후를 볼 수 있지만, policy가 그 신호를 recovery action으로 바꾸는 closed-loop behavior를 충분히 학습하지 못하면 실패로 이어진다. imprecise positioning이나 sliding misalignment는 perception, kinematic control, contact constraint가 함께 맞아야 한다.',
      '따라서 T-Rex 이후의 연구는 tactile encoder 개선뿐 아니라 online adaptation, impedance control, constraint-aware recovery policy, RL/MPC 기반 fine control을 함께 고려해야 한다.'
    ],
    bullets: [
      'object collision: coarse trajectory나 object pose alignment가 틀어진 경우',
      'slipping / excessive force: force magnitude regulation과 grip recovery 필요',
      'imprecise positioning: insertion, sliding, torque task에서 contact constraint가 중요',
      'future work: tactile-reactive policy와 control/RL의 결합'
    ]
  },
  {
    eyebrow: '13. Research Context',
    title: '저자들의 연구 흐름으로 본 T-Rex',
    kicker: 'T-Rex는 여러 그룹의 연구 축이 만난 결과다. VLM/VLA robotics, robot foundation model, human egocentric scaling, tactile-reactive control이 한 시스템 안에서 결합된다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table appendix-table table-center"><tr><th>저자 / 그룹 흐름</th><th>기존 연구 방향</th><th>T-Rex와의 연결</th></tr><tr><td>Dantong Niu / UC Berkeley / Trevor Darrell</td><td>VLM for robotics, robot action prediction, language-grounded robot learning</td><td>instruction grounding, visual-language context, VLA policy 관점으로 연결</td></tr><tr><td>Zhuoyang Liu 계열</td><td>VLA manipulation, reasoning/action 분리, MoT, hybrid VLA 흐름</td><td>variable-rate Mixture-of-Transformer-Experts와 slow/fast expert 분리에 연결</td></tr><tr><td>NVIDIA GEAR / Ruijie Zheng / Yuke Zhu / Jim Fan</td><td>GR00T, generalist robot foundation model, large-scale humanoid/robot policy</td><td>EgoScale/GR00T 기반 human-video prior와 robot foundation policy 축을 제공</td></tr><tr><td>Danfei Xu 계열</td><td>learning from human data, long-horizon reasoning, robot learning systems</td><td>human prior를 robot embodiment와 long-horizon manipulation system으로 옮기는 문제와 연결</td></tr></table>',
    body: [
      'Appendix E의 baseline 구성은 T-Rex의 출발점을 보여준다. tactile baseline과 foundation VLA를 같은 robot/action/evaluation 조건에 맞춰 비교하고, tactile을 단순 state input으로 붙이는 것만으로는 충분하지 않다는 점을 강조한다.',
      '저자 흐름으로 보면 Berkeley 쪽의 VLM/VLA robotics, NVIDIA GEAR의 robot foundation model, human egocentric data scaling, tactile-reactive imitation learning이 T-Rex 안에서 합쳐진다.'
    ],
    bullets: [
      'EgoScale/GR00T 흐름: human video와 foundation policy로 dexterous prior를 만든다.',
      'pi_0.5 + tactile 결과: naive tactile concatenation은 오히려 성능을 떨어뜨릴 수 있다.',
      'T-Rex의 차이: tactile을 lower flow segment의 high-frequency expert로 배치한다.'
    ],
    insight: '정리하면 T-Rex는 “touch를 input에 추가”한 논문이 아니라, human video foundation prior를 robot tactile contact dynamics에 접지시키고 control-frequency mismatch를 구조적으로 나눈 논문이다.'
  },
  {
    eyebrow: '14. Citation Trail',
    title: '직접 비교해야 할 tactile/VLA 논문',
    kicker: 'Survey의 Citation Trail은 T-Rex를 단독 논문이 아니라 tactile-reactive policy 흐름 안에서 읽게 만든다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table appendix-table table-center"><tr><th>논문</th><th>T-Rex와의 연결</th><th>먼저 볼 포인트</th></tr><tr><td>Reactive Diffusion Policy</td><td>slow visual policy와 fast tactile correction 문제의식을 공유</td><td>action chunk 실행 중 tactile feedback 반영 방식</td></tr><tr><td>ViTacFormer</td><td>vision-touch cross-modal representation 계열의 가까운 비교군</td><td>future tactile prediction이 representation에 주는 역할</td></tr><tr><td>Tactile-VLA</td><td>VLA의 physical knowledge를 tactile feedback과 연결</td><td>tactile이 reasoning과 force control에 들어가는 방식</td></tr><tr><td>VLA-Touch</td><td>frozen VLA 주변에 tactile planning/execution module을 붙이는 modular approach</td><td>high-level tactile feedback과 low-level diffusion controller 분리</td></tr><tr><td>ForceVLA</td><td>force-aware MoE로 contact-rich VLA를 보강</td><td>force-torque signal과 fingertip tactile signal의 차이</td></tr></table>',
    body: [
      'T-Rex는 tactile signal을 쓰는 첫 논문이 아니다. 중요한 차이는 tactile을 action denoising 후반부의 high-frequency expert로 배치했다는 점이다.',
      '직접 비교 논문들은 tactile feedback을 representation, controller, modular planner, force-aware MoE 중 어디에 넣는지 서로 다르게 답한다.'
    ],
    bullets: [
      'RDP: slow-fast tactile correction의 가까운 선행 문제의식',
      'ViTacFormer/Tactile-VLA: tactile-aware policy baseline 축',
      'VLA-Touch/ForceVLA: modular tactile execution과 force-aware MoE 축'
    ]
  },
  {
    eyebrow: '14. Citation Trail',
    title: '기반 방법론: T-Rex를 읽는 배경',
    kicker: 'T-Rex의 novelty는 tactile sensor 하나가 아니라 flow matching, VQ-VAE, foundation VLA, data scaling이 결합되는 지점에 있다.',
    layout: 'stack',
    visual: '<table class="mini-table compact-table appendix-table table-center"><tr><th>기반</th><th>T-Rex에서 쓰이는 위치</th><th>먼저 볼 포인트</th></tr><tr><td>Flow Matching</td><td>action expert와 tactile expert가 하나의 denoising path를 나누어 처리</td><td>noise에서 action으로 가는 vector field 학습</td></tr><tr><td>VQ-VAE</td><td>fingertip force history를 discrete tactile token으로 압축</td><td>raw force를 token으로 바꿀 때 얻고 잃는 것</td></tr><tr><td>EgoScale</td><td>human egocentric data scaling과 dexterous prior 학습 기반</td><td>human video prior가 robot hand에 transfer되는 방식</td></tr><tr><td>pi_0 / pi_0.5</td><td>continuous action flow 기반 general robot control baseline</td><td>continuous action generation과 tactile feedback timing의 차이</td></tr><tr><td>Open X-Embodiment / RT-X</td><td>robot foundation model의 data scaling 배경</td><td>broad robot data와 tactile-rich data scaling의 차이</td></tr></table>',
    body: [
      'Flow Matching은 cascaded denoising의 수학적 기반이고, VQ-VAE는 temporal force history를 discrete contact vocabulary로 만드는 배경이다.',
      'EgoScale과 pi_0 계열은 강한 foundation prior를 제공하지만, T-Rex는 그 prior를 robot tactile contact dynamics에 mid-training으로 접지하고 fast correction path를 따로 둔다.'
    ],
    bullets: [
      'Flow Matching: 두 expert가 같은 action trajectory를 나누어 처리',
      'VQ-VAE: noisy force history를 reusable tactile token으로 압축',
      'EgoScale/pi_0: T-Rex가 넘어서야 하는 foundation baseline'
    ]
  }
];

