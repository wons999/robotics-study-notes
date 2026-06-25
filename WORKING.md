# WORKING.md

Last updated: 2026-06-25

This document is a handoff note for continuing the robotics-study-notes site, especially the T-Rex seminar deck. For repository-level agent rules, feedback repo workflow, and privacy constraints, also read `AGENTS.md`.

## Current Workspace

- Local repo: `/home/wh/study/robotics-study-notes`
- Main public repo: `wons999/robotics-study-notes`
- Public site target: `https://wons999.github.io/robotics-study-notes/`
- Admin feedback repo: `wons999/robotics-study-notes-feedback`
- Local seminar URL: `http://localhost:4321/seminars/t-rex/`
- Build system: Astro + Starlight

Useful commands:

```bash
cd /home/wh/study/robotics-study-notes
docker run --rm --user 1000:1000 -p 4322:4321 -v /home/wh/study/robotics-study-notes:/app -w /app node:24-alpine npm run dev -- --host 0.0.0.0
docker run --rm --user 1000:1000 -v /home/wh/study/robotics-study-notes:/app -w /app node:24-alpine npm run build
git status --short
```

The host Node version may be older than Astro's supported range. Use Docker Node 24 for local serving and builds unless the host environment has been updated. The build runs `astro check` and `astro build`; run it before commits or deployment updates.

## Important Files

- `src/components/TRexSeminarDeck.astro`
  - Main interactive web slide deck.
  - Contains slide data, deck controls, fallback fullscreen behavior, `returnTo` exit behavior, image lightbox, and most CSS for seminar layout.
- `src/content/docs/seminars/t-rex.mdx`
  - Lightweight seminar landing page.
  - Keep only the title, presentation slide button, and presentation materials unless the user asks for more.
  - The slide button points to `./slides/?fullscreen=1&returnTo=../`.
- `src/content/docs/seminars/t-rex/slides.mdx`
  - Slide-only page that imports `<TRexSeminarDeck />`.
  - Hidden from sidebar/search/pagination with frontmatter.
  - Used for fullscreen deck viewing without an embedded preview on the landing page.
- `src/content/docs/seminars/index.mdx`
  - Seminar index page.
- `public/trex/`
  - Local T-Rex figures used by the seminar deck.
  - Current assets include overview, dataset analysis, model, setup, split-step, data-efficiency, toothpaste, and failure-case images.
- `AGENTS.md`
  - Repository operating rules.
  - Important: site feedback/issues live in the private admin feedback repo, not the public site repo.

## Current Git State Notes

Always check the current state before editing or committing:

```bash
git status --short
```

Recent seminar work was committed and pushed to `origin/main`:

- `9eb0027 docs: record seminar deck local workflow`
- `f603769 feat: refine T-Rex seminar deck`
- `d54ac5c feat: simplify seminar slide entry`

Do not assume future work is committed unless `git status` confirms it.

## User Preferences For This Deck

- Primary viewing mode is deck fullscreen in a 16:9 screen, often around 1920x1080.
- The seminar landing page should open the deck through a button, not show a small embedded deck preview.
- When exiting the slide-only fullscreen deck, return to the T-Rex seminar landing page.
- Slides should feel full and dense enough for a seminar, not sparse.
- Text should be large enough for attendees to read in fullscreen.
- The user prefers more explanatory text than very minimal presentation slides.
- Long/wide tables and wide diagrams usually work better below the text.
- Some figures work better on the right if they are not very wide or if the slide benefits from split composition.
- Images should be clickable and expand in a lightbox.
- Avoid awkward presenter-specific phrasing like "발표에서는". Use more public-facing wording such as "핵심 관점", "정리하면", or direct content.
- Public content must not include private workplace details, private project details, or personal identifying details.
- Paper content should come first. Optional interpretation/insight can be added below, separated visually, but not every page needs an opinion section.

## Current Seminar Page Structure

- `/seminars/t-rex/`
  - Landing page only.
  - Shows the title, a `발표 슬라이드 보기` button, and presentation materials.
  - Should not embed the deck preview unless the user explicitly asks for it.
- `/seminars/t-rex/slides/?fullscreen=1&returnTo=../`
  - Slide-only page.
  - Opens the deck in fullscreen-like mode by default.
  - Exit should return to `/seminars/t-rex/`.
- `src/content/docs/seminars/t-rex/slides.mdx`
  - Keep this route hidden from sidebar/search/pagination.

## T-Rex Seminar Content Direction

The deck is intended to support a detailed seminar on the T-Rex paper, not just a short paper skim. The current direction is:

- Explain T-Rex as a system design for slow vision-language reasoning plus fast tactile correction.
- Cover dataset, model experts, tactile encoder, asynchronous cascaded flow matching, training recipe, experiments, limitations, and Appendix A-H.
- Preserve full experiment results where possible. Do not reduce tables to averages only.
- Include task descriptions, not only success rates.
- Distinguish what the paper says from our interpretation by putting interpretation in optional lower insight blocks.

Important detailed content already added:

- T-Rex dataset language instruction description.
- Per-primitive feasibility checklist explanation, including impossible object-primitive pair examples.
- Latent expert details: input/output, Qwen3VL-2B, dimensions, layers, params, sequence length.
- Action expert details: slow embeds, fast visual tokens, optional robot state, timestep/noisy action tokens, output `x_split` and cached KV.
- Tactile expert details: cached KV, `x_split`, current F6, F6 history, deformation maps, no raw vision in fast tick, final clean action output.
- Tactile encoder details:
  - `tacf6_embedder`
  - embedded force VQ-VAE
  - VQ-VAE reconstruction and commitment losses
  - dead-code revival
  - `DeformEncoder`
- Experiment setup and task tables.
- Main result table, ablation table, data-efficiency figures, training recipe table.
- Conclusion, limitations, failure cases, and Appendix A-H slides.

## Layout Work Already Done

Most recent layout work has focused on fullscreen 16:9.

Implemented behavior:

- Fullscreen mode uses a deck-local fallback class `.is-fullscreen` when browser fullscreen is not active.
- Starlight sidebars/headers are hidden in deck fullscreen so they do not overlay the deck.
- Images inside `.slide-visual` open in a lightbox when clicked.
- Slide 14 flow rail:
  - Noise, Action Expert, Split, Tactile Expert, Action boxes were normalized to equal grid cell sizes.
  - Starlight default sibling `margin-top` was reset inside diagram grids because it was shifting all but the first box down by 16px.
- Slides 15 and 16:
  - Bottom diagrams were aligned to the same position and height.
  - Arrows were removed from 15/16 as requested.
  - Verified in fullscreen: both lower diagrams measured `y=800`, `h=184`, `bottom=984` at 1920x1080.
- Slides 10-12:
  - Added `slide-visual-tight` variant.
  - Right diagram columns were narrowed and text columns widened to remove excessive empty right-side space.
- Slides 19, 20, 21, 22, 25, 28:
  - Added `table-center` class to relevant bottom tables.
  - Verified in fullscreen that left/right gaps are equal inside the visual box.
- Several slides were switched between split/stack/fill depending on figure/table aspect ratio.
- Normal embedded deck rendering, when used, should preserve the same 16:9-ish visual ratio as fullscreen instead of reflowing into a different layout.
- Visual boxes use a brighter contrast color than the default deck background for projector readability.
- Tables use white lines, rounded outer borders, and `display: table` with `border-collapse: separate` so inner lines remain continuous.
- Table cell backgrounds should remain `var(--sl-color-bg)`; do not make table cells the same color as the visual box.
- Appendix/result table visual boxes, especially around slides 30, 34-37, and 41-44, should shrink to table width and auto height when there is no need for a large empty box.
- Slide 3 should look consistent before and after fullscreen, with the same presentation ratio.

## CSS Patterns To Preserve

When changing layout, prefer slide-specific classes over broad CSS changes.

Current useful classes/patterns:

- `slide-split`: text + right visual.
- `slide-stack`: text above, visual/table/figure below.
- `slide-fill`: denser split layout.
- `slide-visual-tight`: used when right visual has too much empty width and text should get more column space.
- `compact-table`: smaller table inside a visual box.
- `wide-table`: wide result table variant.
- `table-center`: centers a reduced-width table inside the visual box.
- `compact-diagram`: used for diagrams that should be shorter and fit fullscreen.
- `no-arrows`: used where arrow separators should be removed.
- `compact-plot`, `setup-figure`, `small-figure`: figure sizing variants.
- `slide-insight`: optional interpretation block separated from paper-first content.

Avoid global changes to `.slide`, `.slide-visual`, `.mini-table`, or fullscreen font sizes unless you verify many affected slides. These selectors have broad impact.

## Verification Routine

For any visual/layout change:

1. Run:

```bash
docker run --rm --user 1000:1000 -v /home/wh/study/robotics-study-notes:/app -w /app node:24-alpine npm run build
```

2. Open or refresh:

```text
http://localhost:4322/seminars/t-rex/
```

3. Confirm the landing page has no embedded `[data-seminar-deck]` preview and has the `발표 슬라이드 보기` button.

4. Open the slide-only route:

```text
http://localhost:4322/seminars/t-rex/slides/?fullscreen=1&returnTo=../
```

5. Confirm the deck enters `.is-fullscreen` and `Exit` returns to `/seminars/t-rex/`.

6. Check the target slides in 16:9 viewports. The user has checked 1920x1080, 2560x1440, and 3840x2160.

7. Confirm:

- no content overflows below the fullscreen viewport;
- text is readable;
- tables/figures are centered or placed as intended;
- wide tables/figures have enough width but do not dominate empty space;
- lightbox still opens for images.

For table-centering checks, compare the table's left and right gaps against `.slide-visual`. For a centered table, the gap delta should be near zero.

## Known Pitfalls

- Starlight applies default spacing to adjacent elements. Inside CSS grid diagrams, reset direct-child `margin-top` when needed.
- A table can look left-aligned even if the visual box is centered if `.mini-table` is still `width: 100%` and `justify-self: stretch`.
- Setting seminar tables to `display: block` can break fixed table layout and make right-side lines disappear. Keep table elements as `display: table`.
- Table cell backgrounds should stay on the deck background color. The visual box should provide contrast around the table; table lines should remain white.
- Fullscreen layout may differ from normal embedded page layout. The user is usually judging fullscreen.
- The T-Rex landing page intentionally does not show an embedded deck preview.
- Preserve the `returnTo=../` slide link and exit behavior when changing the slide-only route.
- Changing a common selector can unexpectedly alter many slides because all slide CSS lives in `TRexSeminarDeck.astro`.
- Do not remove explanatory text just to make a slide look cleaner. The user prefers a detailed seminar style.
- Do not add private/personal details to public pages.

## Content Quality Rules For Future Edits

- If adding factual details from the paper, verify against the paper, appendix, or local extracted assets.
- Keep paper claims and our interpretation visually separated when interpretation is useful.
- For experiments, include full task/result rows when available.
- For limitations/future work, connect failures to concrete research directions such as recovery policies, force regulation, impedance/control, RL, or MPC.
- Use Korean prose for deck content unless there is a technical term that is clearer in English.

## Deployment / Commit Notes

- The site is intended for GitHub Pages.
- After meaningful changes:

```bash
docker run --rm --user 1000:1000 -v /home/wh/study/robotics-study-notes:/app -w /app node:24-alpine npm run build
git status --short
git add <changed files>
git commit -m "<clear message>"
```

- If a change addresses feedback from the private admin repo, mention the issue number in the commit message or summary when practical.
