'use server';

import { asyncDelay } from '@/utils/async-delay';

export async function deletePostAction(id: string) {
  console.log('aaa', id);

  await asyncDelay(2000);

  return id;
}
