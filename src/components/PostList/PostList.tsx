import type { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { PostHeading } from '../PostHeading';
import { PostImage } from '../PostImage';

export async function PostList() {
  const posts = await postRepository.findAll();

  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.map((post: PostModel) => (
        <div className='flex flex-col gap-4 group' key={post.id}>
          <PostImage
            linkProps={{
              href: `/post/${post.slug}`,
            }}
            imageProps={{
              width: 1200,
              height: 720,
              src: post.coverImageUrl,
              alt: post.title,
            }}
          />

          <div className='flex flex-col gap-4 sm:justify-center'>
            <time
              dateTime={post.createAt}
              className='dark:text-slate-500 text-slate-600 text-sm/tight block'
            >
              {post.createAt}
            </time>

            <PostHeading as='h2' url='#'>
              {post.title}
            </PostHeading>

            <p>{post.excerpt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
