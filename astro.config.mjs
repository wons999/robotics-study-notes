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
            { autogenerate: { directory: 'paper-notes' } },
            {
              label: 'GR00T Model Family',
              items: [
                { label: 'Overview', slug: 'paper-notes/groot' },
                { label: 'GR00T N1', slug: 'paper-notes/groot/n1-open-foundation-model' },
                { label: 'GR00T N1.5', slug: 'paper-notes/groot/n1-5-release' },
                { label: 'GR00T N1.6', slug: 'paper-notes/groot/n1-6-release' },
                { label: 'GR00T N1.7', slug: 'paper-notes/groot/n1-7-release' }
              ]
            },
            {
              label: 'PI Model Family',
              items: [
                { label: 'Overview', slug: 'paper-notes/pi' },
                { label: 'π0', slug: 'paper-notes/pi/pi0-vla-flow-model' },
                { label: 'π0-FAST', slug: 'paper-notes/pi/pi0-fast-action-tokenization' },
                { label: 'OpenPI', slug: 'paper-notes/pi/openpi-release' },
                { label: 'HI Robot', slug: 'paper-notes/pi/hirobot-listen-think-harder' },
                { label: 'π0.5', slug: 'paper-notes/pi/pi05-open-world-generalization' },
                { label: 'Knowledge Insulation', slug: 'paper-notes/pi/knowledge-insulation' },
                { label: 'Real-Time Action Chunking', slug: 'paper-notes/pi/real-time-action-chunking' },
                { label: 'π*0.6 / RECAP', slug: 'paper-notes/pi/pistar06-recap-learns-from-experience' },
                { label: 'Human-to-Robot Transfer', slug: 'paper-notes/pi/human-to-robot-transfer' },
                { label: 'Robot Olympics / π0.6', slug: 'paper-notes/pi/moravec-robot-olympics' },
                { label: 'Physical Intelligence Layer', slug: 'paper-notes/pi/physical-intelligence-layer' },
                { label: 'MEM', slug: 'paper-notes/pi/mem-multiscale-embodied-memory' },
                { label: 'RLT', slug: 'paper-notes/pi/rlt-efficient-online-rl' },
                { label: 'π0.7', slug: 'paper-notes/pi/pi07-steerable-model' }
              ]
            }
          ]
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
