import { PostFeatured } from '@/components/PostFeatured';
import { PostList } from '@/components/PostList';
import { SpinLoader } from '@/components/SpinLoader';
import Link from 'next/link';
import { Suspense } from 'react';
import { InstallPrompt, PushNotificationManager } from './pwa-notifications';

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <>
      <PushNotificationManager />
      <InstallPrompt />
      <Link
        href={'/admin/post'}
        className='mb-6 rounded-xl bg-sky-950 text-slate-300 p-2 flex justify-center'
      >
        Admin
      </Link>
      <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
        <PostFeatured />
        <PostList />
      </Suspense>
    </>
  );
}
