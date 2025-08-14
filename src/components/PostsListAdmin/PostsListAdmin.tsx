import { findAllPostAdmin } from '@/lib/post/queries/admin';
import clsx from 'clsx';
import Link from 'next/link';
import { DeletePostButton } from '../DeletePostButton';

export default async function PostsListAdmin() {
  const posts = await findAllPostAdmin();

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

      <div
        className={clsx(
          'fixed inset-0 z-50',
          'bg-black/50 backdrop-blur-xs',
          'flex items-center justify-center',
        )}
      >
        <div
          className={clsx(
            'bg-slate-100 p-6 rounded-lg max-w-2xl mx-6',
            'flex flex-col gap-6',
            'shadow-lg shadow-black/30',
          )}
        >
          <h3 className='tex-xl font-bold'>Title</h3>
          <p>content</p>
          <div className='flex items-center justify-around gap-4'>
            <button
              className={clsx(
                'bg-slate-200 hover:bg-slate-300 text-slate-950 transition',
                'flex items-center justify-center',
                'py-2 px-6 rounded-lg cursor-pointer',
              )}
              autoFocus
            >
              Cancel
            </button>
            <button
              className={clsx(
                'bg-blue-500 hover:bg-blue-600 text-slate-200 transition',
                'flex items-center justify-center',
                'py-2 px-6 rounded-lg cursor-pointer',
              )}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
