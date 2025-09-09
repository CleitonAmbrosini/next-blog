'use client';

import { useState } from 'react';
import { Button } from '../Button';
import { ImageUploader } from '../ImageUploader';
import { InputText } from '../InputText';
import { MarkdownEditor } from '../MarkdownEditor';
import { InputCheckbox } from '../InputCheckbox';

export function ManagePostForm() {
  const [content, setContent] = useState('');

  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='Title'
          placeholder='Post title'
          name='title'
          type='text'
        />

        <InputText
          labelText='Excerpt'
          placeholder='Post summary'
          name='excerpt'
          type='text'
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
        />

        <InputCheckbox type='checkbox' name='published' labelText='Publish post' />

        <div className='mt-4'>
          <Button type='submit' size='lg' variant='default'>
            Create
          </Button>
        </div>
      </div>
    </form>
  );
}
