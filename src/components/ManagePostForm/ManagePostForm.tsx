'use client';

import type { PublicPost } from '@/dto/post/dto';
import { useState } from 'react';
import { Button } from '../Button';
import { ImageUploader } from '../ImageUploader';
import { InputCheckbox } from '../InputCheckbox';
import { InputText } from '../InputText';
import { MarkdownEditor } from '../MarkdownEditor';

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const [content, setContent] = useState(publicPost?.content || '');

  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='Title'
          placeholder='Post title'
          name='title'
          type='text'
          defaultValue={publicPost?.title || ''}
        />

        <InputText
          labelText='Excerpt'
          placeholder='Post summary'
          name='excerpt'
          type='text'
          defaultValue={publicPost?.excerpt || ''}
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
          defaultValue={publicPost?.coverImageUrl || ''}
        />

        <InputCheckbox
          type='checkbox'
          name='published'
          labelText='Publish post'
          defaultChecked={publicPost?.published}
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
