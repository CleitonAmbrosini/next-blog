'use client';

import { uploadImageAction } from '@/actions/upload/upload-image-action';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../Button';

type ImageUploaderProps = {
  disabled: boolean;
};

export function ImageUploader({ disabled = false }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();
  const [imgURL, setImgURL] = useState('');

  function handleChooseFile() {
    if (!fileInputRef.current) {
      setImgURL('');
      return;
    }

    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();
    if (!fileInputRef.current) {
      setImgURL('');
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) {
      setImgURL('');
      return;
    }

    const uploadMaxSize =
      Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;
    if (file.size > uploadMaxSize) {
      toast.error(
        `Maximum image size allowed is ${(uploadMaxSize / 1024).toFixed(2)}KB.`,
      );

      fileInput.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        fileInput.value = '';
        setImgURL('');
        return;
      }

      setImgURL(result.url);
      toast.success('Image sent');
    });

    fileInput.value = '';
  }

  return (
    <div className='flex flex-col gap-4 py-4'>
      <Button
        size='md'
        variant='default'
        type='button'
        onClick={handleChooseFile}
        disabled={isUploading || disabled}
      >
        <ImageUpIcon />
        Send an image
      </Button>
      {!!imgURL && (
        <div className='flex flex-col gap-4 '>
          <p>
            <b>URL: {imgURL}</b>
          </p>

          {/* eslint-disable-next-line */}
          <img className='rounded-lg w-[300px]' src={imgURL} />
        </div>
      )}
      <input
        ref={fileInputRef}
        className='hidden'
        name='file'
        type='file'
        accept='image/*'
        onChange={handleChange}
        disabled={isUploading || disabled}
      />
    </div>
  );
}
