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
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com'
        }
      ],
      sidebar: [
        {
          label: 'Start',
          items: [
            { label: 'Home', slug: '' },
            { label: 'Study Roadmap', slug: 'roadmap' }
          ]
        },
        {
          label: 'Robotics Foundations',
          items: [{ autogenerate: { directory: 'robotics-foundations' } }]
        },
        {
          label: 'Robot Systems',
          items: [{ autogenerate: { directory: 'robot-systems' } }]
        },
        {
          label: 'Robot Learning',
          items: [{ autogenerate: { directory: 'robot-learning' } }]
        },
        {
          label: 'Paper Notes',
          items: [{ autogenerate: { directory: 'paper-notes' } }]
        },
        {
          label: 'Experiments',
          items: [{ autogenerate: { directory: 'experiments' } }]
        },
        {
          label: 'Weekly Log',
          items: [{ autogenerate: { directory: 'weekly-log' } }]
        }
      ]
    })
  ]
});
