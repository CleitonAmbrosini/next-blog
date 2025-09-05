'use client';

import { ImageUpIcon } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '../Button';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  return (
    <div className='flex flex-col gap-2 py-4'>
      <Button
        size='md'
        variant='default'
        type='button'
        onClick={handleChooseFile}
      >
        <ImageUpIcon />
        Send an image
      </Button>
      <input
        ref={fileInputRef}
        className='hidden'
        name='file'
        type='file'
        accept='image/*'
      />
    </div>
  );
}
