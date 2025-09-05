'use client';

import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';
import { ImageUpIcon } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../Button';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    if (!fileInputRef.current) return;

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) return;

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      toast.error(
        `Maximum image size allowed is ${IMAGE_UPLOAD_MAX_SIZE / 1024}KB.`,
      );
      fileInput.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fileInput.value = '';
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
        onChange={handleChange}
      />
    </div>
  );
}
