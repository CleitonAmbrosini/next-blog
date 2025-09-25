'use server';

import { postRepository } from '@/repositories/post';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  if (!id || typeof id !== 'string') {
    return {
      error: 'Invalid data',
    };
  }

  let post;
  try {
    post = await postRepository.delete(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        errors: e.message,
      };
    }
    return {
      errors: 'An error occurred when trying to save the post.',
    };
  }

  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    error: '',
  };
}
