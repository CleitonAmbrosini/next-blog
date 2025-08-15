import { findAllPostAdmin } from '@/lib/post/queries/admin';
import clsx from 'clsx';
import Link from 'next/link';
import { DeletePostButton } from '../DeletePostButton';
import { ErrorMessage } from '../ErrorMessage';

export default async function PostsListAdmin() {
  const posts = await findAllPostAdmin();
  if (posts.length <= 1) {
    return (
      <ErrorMessage
        contentTitle='oops 😅'
        content={`we haven't created any posts yet`}
      />
    );
  }

  return (
    <div className='mb-16'>
      {posts.map(post => {
        return (
          <div
            className={clsx(
              'p-2',
              !post.published && 'bg-slate-200',
              'flex gap-2 items-center justify-between',
            )}
            key={post.id}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

            {!post.published && (
              <span className='text-xs text-slate-600 italic'>
                (Não publicado)
              </span>
            )}

            <DeletePostButton id={post.id} title={post.title} />
          </div>
        );
      })}
    </div>
  );
}
