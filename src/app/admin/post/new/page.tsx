import { ManagePostForm } from '@/components/ManagePostForm';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Create new post',
};

export default async function AdminPostNewPage() {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl font-extrabold'>Create new post</h1>
      <ManagePostForm />
    </div>
  );
}
