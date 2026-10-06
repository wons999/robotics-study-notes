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
          items: [
            { label: 'Survey 안내', slug: 'paper-notes' },
            { label: '전체 목록·검토 상태', slug: 'paper-notes/catalog' },
            { label: 'VLA 연구 지도', slug: 'paper-notes/vla-survey-map' },
            { label: 'GR00T 계열', slug: 'paper-notes/groot' },
            { label: 'PI 계열', slug: 'paper-notes/pi' },
            { label: 'Molmo 계열', slug: 'paper-notes/molmo' },
            { label: 'ECoT 계열', slug: 'paper-notes/ecot' }
          ]
        },
        {
          label: '주제별 읽기 경로',
          items: [{ autogenerate: { directory: 'topics' } }]
        },
        {
          label: '세미나',
          items: [{ autogenerate: { directory: 'seminars' } }]
        },
        {
          label: '노트',
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
