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
