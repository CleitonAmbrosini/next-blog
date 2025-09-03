'use client';

import { useState } from 'react';
import { Button } from '../Button';
import { InputCheckbox } from '../InputCheckbox';
import { InputText } from '../InputText';
import { MarkdownEditor } from '../MarkdownEditor';

export function ManagePostForm() {
  const [content, setContent] = useState('');

  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText placeholder='Name' />
        <div>
          <InputText placeholder='Surname' />
        </div>

        <InputCheckbox />

        <MarkdownEditor
          labelText='Content'
          disabled={false}
          textAreaName='content'
          value={content}
          setValue={setContent}
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
