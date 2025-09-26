'use client';

import { createPostAction } from '@/actions/post/create-post-action';
import { updatePostAction } from '@/actions/post/update-post-action';
import { makePartialPublicPost, type PublicPost } from '@/dto/post/dto';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../Button';
import { ImageUploader } from '../ImageUploader';
import { InputCheckbox } from '../InputCheckbox';
import { InputText } from '../InputText';
import { MarkdownEditor } from '../MarkdownEditor';
import { useRouter, useSearchParams } from 'next/navigation';

type ManagePostFormUpdateProps = {
  mode: 'update';
  publicPost: PublicPost;
};

type ManagePostFormCreateProps = {
  mode: 'create';
};

type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormCreateProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;
  const searchParams = useSearchParams();
  const created = searchParams.get('created');
  const router = useRouter();

  let publicPost;
  if (mode === 'update') {
    publicPost = props.publicPost;
  }

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };
  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );

  const { formState } = state;
  const [content, setContent] = useState(publicPost?.content || '');

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => toast.error(error));
    }
  }, [state.errors]);


   useEffect(() => {
     if (state.success) {
       toast.dismiss();
       toast.success('Updated post with success.');
     }
   }, [state]);

   useEffect(() => {
     if (created === '1') {
       toast.dismiss();
       toast.success('Create post with success.');
       const url = new URL(window.location.href);
       url.searchParams.delete('created');
       router.replace(url.toString());
     }
   }, [created, router]);

  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText name='id' type='text' defaultValue={formState.id} hidden />

        <InputText
          labelText='Author'
          placeholder='Post author'
          name='author'
          type='text'
          defaultValue={formState.author}
          disabled={isPending}
        />

        <InputText
          labelText='Title'
          placeholder='Post title'
          name='title'
          type='text'
          defaultValue={formState.title}
          disabled={isPending}
        />

        <InputText
          labelText='Excerpt'
          placeholder='Post summary'
          name='excerpt'
          type='text'
          defaultValue={formState.excerpt}
          disabled={isPending}
        />

        <MarkdownEditor
          labelText='Content'
          value={content}
          setValue={setContent}
          textAreaName='content'
          disabled={isPending}
        />

        <ImageUploader disabled={isPending} />

        <InputText
          labelText='URL Cover Image'
          placeholder='example.com/img/url'
          name='coverImageUrl'
          type='text'
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />

        <InputCheckbox
          type='checkbox'
          name='published'
          labelText='Publish post'
          defaultChecked={formState.published}
          disabled={isPending}
        />

        <div className='mt-4'>
          <Button
            type='submit'
            size='lg'
            variant='default'
            disabled={isPending}
          >
            Create
          </Button>
        </div>
      </div>
    </form>
  );
}
