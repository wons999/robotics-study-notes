# AGENTS.md

## Project

- Main site repository: `wons999/robotics-study-notes`
- Public site: `https://wons999.github.io/robotics-study-notes/`
- Admin feedback repository: `wons999/robotics-study-notes-feedback`
- The admin feedback repository is private. Unauthenticated GitHub REST requests can return `404 Not Found`; use the authenticated GitHub connector/app or an authenticated GitHub session when checking it.

## Feedback and Issue Workflow

The homepage does not store feedback directly. Feedback links on the site open a prefilled GitHub Issue creation page in the private admin repository:

- Component: `src/components/SectionFeedback.astro`
- Current target repo in code: `wons999/robotics-study-notes-feedback`
- Issue creation URL pattern: `https://github.com/wons999/robotics-study-notes-feedback/issues/new?...`
- Link text shown on the site: `관리자 피드백 남기기`

When checking user/site feedback, check issues in `wons999/robotics-study-notes-feedback`, not in the main public site repository. The main repository is for site source code and deployment; the feedback repository is the admin inbox.

## Agent Operating Rules

- Before substantive survey or seminar work, read `rules/survey.md` and follow it strictly. Do not rely on memory of previous survey mistakes or fixes.
- For paper survey updates, download or otherwise obtain the paper PDF when available, inspect the PDF directly, extract the paper's figures/tables as local assets when relevant, and verify the written content against the PDF figure/table inventory.
- Before changing content based on site feedback, inspect the relevant issue in `wons999/robotics-study-notes-feedback`.
- When a feedback issue is addressed, mention the issue number in the commit message or final summary when practical.
- Do not add personal workplace details, private project details, or sensitive robot/system information to public site content.
- Keep public-facing wording general unless the user explicitly asks for a more specific private note.
- If the feedback repo cannot be read through unauthenticated tools, treat that as expected for a private repository and use the GitHub connector or an authenticated GitHub tool.

## Local Repo Notes

- This repo was moved to `/home/wh/study/robotics-study-notes`.
- Use this directory as the working copy for code and content changes.
- The site is built with Astro/Starlight.
- Run `npm run build` before committing meaningful site changes.
- The host Node version can be older than Astro's supported range. For local serving and builds, prefer Docker Node 24, for example:
  `docker run --rm --user 1000:1000 -p 4322:4321 -v /home/wh/study/robotics-study-notes:/app -w /app node:24-alpine npm run dev -- --host 0.0.0.0`
- If port 4321 is already allocated, expose the container on 4322 and open `http://127.0.0.1:4322/seminars/t-rex/`.
- Astro dev server usually hot-reloads `.astro` and `.mdx` content changes. For localhost checks, first verify the running dev server reflects the change; restart it when Astro config, environment/base path, dependencies, container state, or visibly stale content is involved.
- For seminar deck visual QA, use Playwright with the cached Chromium binary at `/home/wh/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome` and launch with `args: ['--no-sandbox']`. Check fullscreen-like viewports such as 1920x1080, 2560x1440, and 3840x2160 when changing slide layout, tables, figures, or typography.

## T-Rex Seminar Notes

- The T-Rex seminar landing page should stay lightweight: title, `발표 슬라이드 보기` button, and presentation materials only.
- Do not reintroduce the small embedded deck preview on `src/content/docs/seminars/t-rex.mdx` unless the user explicitly asks for it.
- The slide-only route is `src/content/docs/seminars/t-rex/slides.mdx`; keep it hidden from sidebar/search/pagination and preserve the `?fullscreen=1&returnTo=../` entry flow.
- The deck `Exit` behavior from the slide-only fullscreen view should return to `/seminars/t-rex/`.
- For seminar tables and diagrams, keep projector readability in mind: visual boxes need clear contrast against the page background, table lines should be white, and table cell backgrounds should remain the base deck background rather than the visual box color.
- When changing seminar slide layout, validate the actual slide route `/seminars/t-rex/slides/?fullscreen=1&returnTo=../`, not only the landing page.
