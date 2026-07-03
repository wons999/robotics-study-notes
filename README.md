# Robotics Study Notes

Study and research notes for robotics foundations, control, reinforcement learning, VLA research, and paper surveys.

The public site is built with Astro/Starlight and published through GitHub Pages:

https://wons999.github.io/robotics-study-notes/

## Local Development

The host Node version can be older than Astro's supported range. Prefer Docker Node 24 for local serving and builds:

```bash
docker run --rm --user 1000:1000 -p 4322:4321 -v /home/wh/study/robotics-study-notes:/app -w /app node:24-alpine npm run dev -- --host 0.0.0.0
docker run --rm --user 1000:1000 -v /home/wh/study/robotics-study-notes:/app -w /app node:24-alpine npm run build
```

## Study Rhythm

- Build foundations: FK, IK, Jacobian, dynamics, and control.
- Track current research: VLA, RL, manipulation, sensing, and robotics benchmarks.
- Maintain paper surveys under `src/content/docs/paper-notes/`.
- Maintain robot learning maps under `src/content/docs/robot-learning/`.
- Convert each study session into a durable note with references, implementation ideas, and open questions.

## Deployment

This project is ready for GitHub Pages through `.github/workflows/deploy.yml`.
