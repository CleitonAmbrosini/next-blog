import PostsListAdmin from '@/components/PostsListAdmin/PostsListAdmin';
import { SpinLoader } from '@/components/SpinLoader';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Post Admin',
};

export default async function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader className='p-16' />}>
      <PostsListAdmin />
    </Suspense>
  );
}
