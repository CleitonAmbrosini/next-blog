'use server';

import type { PublicPost } from '@/dto/post/dto';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Wrong data'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  console.log(formDataToObj);

  return {
    formState: { ...prevState.formState },
    errors: [],
  };
}
