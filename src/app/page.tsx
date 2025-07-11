import { PostFeatured, PostList, SpinLoader } from '@/components';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
        <PostFeatured />
        <PostList />
      </Suspense>
    </>
  );
}
