import { postRepository } from '@/repositories/post';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findAllPublicPostsCached = async () => {
  'use cache';
  cacheTag('posts');
  return await postRepository.findAllPublic();
};

export const findPostBySlugCached = async (slug: string) => {
  'use cache';
  cacheTag(`posts-${slug}`);
  const post = await postRepository
    .findBySlugPublic(slug)
    .catch(() => undefined);
  if (!post) notFound();
  return post;
};

export const findPostByIdCached = cache(
  async (id: string) => await postRepository.findById(id),
);
