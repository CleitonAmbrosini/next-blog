'use server';

import {
  makePartialPublicPost,
  makePublicPostFromDb,
  type PublicPost,
} from '@/dto/post/dto';
import { PostUpdateSchema } from '@/lib/post/validations';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { revalidateTag } from 'next/cache';

type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: true;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Wrong data'],
    };
  }

  const id = formData.get('id')?.toString() || '';

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['Wrong ID'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParseObj = PostUpdateSchema.safeParse(formDataToObj);

  if (!zodParseObj.success) {
    const errors = getZodErrorMessages(zodParseObj.error);
    return {
      errors,
      formState: makePartialPublicPost(formDataToObj),
    };
  }

  const validPostData = zodParseObj.data;
  const newPost = {
    ...validPostData,
  };

  let post;
  try {
    post = await postRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObj),
        errors: [e.message],
      };
    }
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ['An error occurred when trying to save the post.'],
    };
  }

  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    formState: makePublicPostFromDb(post),
    errors: [],
    success: true,
  };
}
