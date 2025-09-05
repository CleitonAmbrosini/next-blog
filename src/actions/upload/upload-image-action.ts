'use server';

import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Invalid data' });
  }

  const file = formData.get('file');

  if (
    !(file instanceof File) ||
    file.size > IMAGE_UPLOAD_MAX_SIZE ||
    !file.type.startsWith('image/')
  ) {
    return makeResult({ error: 'Invalid file' });
  }

  return makeResult({ url: 'url' });
}
