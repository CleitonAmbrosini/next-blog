'use client';

import { createPostAction } from '@/actions/post/create-post-action';
import { makePartialPublicPost, type PublicPost } from '@/dto/post/dto';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../Button';
import { ImageUploader } from '../ImageUploader';
import { InputCheckbox } from '../InputCheckbox';
import { InputText } from '../InputText';
import { MarkdownEditor } from '../MarkdownEditor';

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };
  const [state, action, isPending] = useActionState(
    createPostAction,
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

  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='Author'
          placeholder='Post author'
          name='author'
          type='text'
          defaultValue={formState.author}
        />

        <InputText
          labelText='Title'
          placeholder='Post title'
          name='title'
          type='text'
          defaultValue={formState.title}
        />

        <InputText
          labelText='Excerpt'
          placeholder='Post summary'
          name='excerpt'
          type='text'
          defaultValue={formState.excerpt}
        />

        <MarkdownEditor
          labelText='Content'
          value={content}
          setValue={setContent}
          textAreaName='content'
          disabled={false}
        />

        <ImageUploader />

        <InputText
          labelText='URL Cover Image'
          placeholder='example.com/img/url'
          name='coverImageUrl'
          type='text'
          defaultValue={formState.coverImageUrl}
        />

        <InputCheckbox
          type='checkbox'
          name='published'
          labelText='Publish post'
          defaultChecked={formState.published}
        />

        <div className='mt-4'>
          <Button type='submit' size='lg' variant='default'>
            Create
          </Button>
        </div>
      </div>
    </form>
  );
}
