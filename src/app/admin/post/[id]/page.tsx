import { ManagePostForm } from '@/components/ManagePostForm';
import { makePublicPostFromDb } from '@/dto/post/dto';
import { findPostByIdAdmin } from '@/lib/post/queries/admin';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Edit post',
};

type AdminPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminPostIdPage({ params }: AdminPostPageProps) {
  const { id } = await params;
  const post = await findPostByIdAdmin(id);

  const publicPost = makePublicPostFromDb(post);

  return (
    <div className='py-16 text-6xl'>
      <h1 className='text-xl font-extrabold'>Edit post</h1>
      <ManagePostForm mode='update' publicPost={publicPost} />
    </div>
  );
}
