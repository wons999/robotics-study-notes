import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({ extend: z.object({
      research: z.object({
        kind: z.enum(['paper', 'release', 'article', 'overview', 'map', 'note', 'foundation', 'system', 'seminar', 'log', 'index']),
        topics: z.array(z.enum(['vla', 'sensing', 'action', 'data', 'humanoid', 'foundations'])),
        status: z.enum(['draft', 'reviewing', 'verified']),
        reviewedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
        family: z.string().optional(),
        source: z.url().optional()
      }).refine((value) => value.status !== 'verified' || value.reviewedAt !== null,
        '검증 완료 문서는 마지막 검토일이 필요합니다.').optional()
    }) })
  })
};
