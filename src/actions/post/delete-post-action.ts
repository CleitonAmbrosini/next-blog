'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { postRepository } from '@/repositories/post';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return {
      error: ['Log in again.'],
    };
  }

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
