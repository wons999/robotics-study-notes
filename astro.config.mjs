import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const repoName = 'robotics-study-notes';
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://example.com',
  base: process.env.BASE_PATH ?? (isGitHubActions ? `/${repoName}` : '/'),
  integrations: [
    starlight({
      title: 'Robotics Study Notes',
      description: 'A working notebook for robotics foundations, control, RL, and VLA research.',
      customCss: ['./src/styles/custom.css'],
      head: [
        {
          tag: 'script',
          content:
            "try { if (!localStorage.getItem('starlight-theme')) localStorage.setItem('starlight-theme', 'dark'); } catch {}"
        }
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com'
        }
      ],
      sidebar: [
        {
          label: '시작',
          items: [
            { label: '홈', slug: '' },
            { label: '공부 로드맵', slug: 'roadmap' }
          ]
        },
        {
          label: '로보틱스 기초',
          items: [{ autogenerate: { directory: 'robotics-foundations' } }]
        },
        {
          label: '로봇 시스템',
          items: [{ autogenerate: { directory: 'robot-systems' } }]
        },
        {
          label: '로봇 러닝',
          items: [{ autogenerate: { directory: 'robot-learning' } }]
        },
        {
          label: '논문 Survey',
          items: [{ autogenerate: { directory: 'paper-notes' } }]
        },
        {
          label: '세미나',
          items: [{ autogenerate: { directory: 'seminars' } }]
        },
        {
          label: '실험 노트',
          items: [{ autogenerate: { directory: 'experiments' } }]
        },
        {
          label: '주간 로그',
          items: [{ autogenerate: { directory: 'weekly-log' } }]
        }
      ]
    })
  ]
});
