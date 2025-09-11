import { isUrlOrRelativePath } from '@/utils/is-url-or-relative-path';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Title must have at least 3 characters')
    .max(120, 'Title must have a maximum of 120 characters'),
  content: z
    .string()
    .trim()
    .min(3, 'Content must have at least 3 characters')
    .transform(val => sanitizeHtml(val)),
  author: z
    .string()
    .trim()
    .min(4, 'Author needs a minimum of 4 characters')
    .max(100, 'Author name must not be longer than 100 characters'),
  excerpt: z
    .string()
    .trim()
    .min(3, 'Excerpt needs a minimum of 3 characters')
    .max(200, 'Excerpt must not be longer than 200 characters'),
  coverImageUrl: z.string().trim().refine(isUrlOrRelativePath, {
    message: 'Cover URL must be a URL or path to image',
  }),
  published: z
    .union([
      z.literal('on'),
      z.literal('true'),
      z.literal('false'),
      z.literal(true),
      z.literal(false),
      z.literal(null),
      z.literal(undefined),
    ])
    .default(false)
    .transform(val => val === 'on' || val === 'true' || val === true),
});

export const PostCreateSchema = PostBaseSchema;

export const PostUpdateSchema = PostBaseSchema.extend({});
