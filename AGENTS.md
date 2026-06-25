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

- Before changing content based on site feedback, inspect the relevant issue in `wons999/robotics-study-notes-feedback`.
- When a feedback issue is addressed, mention the issue number in the commit message or final summary when practical.
- Do not add personal workplace details, private project details, or sensitive robot/system information to public site content.
- Keep public-facing wording general unless the user explicitly asks for a more specific private note.
- If the feedback repo cannot be read through unauthenticated tools, treat that as expected for a private repository and use the GitHub connector or an authenticated GitHub tool.

## Local Repo Notes

- This repo was moved to `~/workspace/robotics-study-notes`.
- Use this directory as the working copy for code and content changes.
- The site is built with Astro/Starlight.
- Run `npm run build` before committing meaningful site changes.
- The host Node version can be older than Astro's supported range. For local serving and builds, prefer Docker Node 24, for example:
  `docker run --rm --user 1000:1000 -p 4322:4321 -v /home/wh/study/robotics-study-notes:/app -w /app node:24-alpine npm run dev -- --host 0.0.0.0`
- If port 4321 is already allocated, expose the container on 4322 and open `http://127.0.0.1:4322/seminars/t-rex/`.
- For seminar deck visual QA, use Playwright with the cached Chromium binary at `/home/wh/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome` and launch with `args: ['--no-sandbox']`. Check fullscreen-like viewports such as 1920x1080, 2560x1440, and 3840x2160 when changing slide layout, tables, figures, or typography.
