import type { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { formatDateTime, formatDistanceToNow } from '@/utils/fomat-datetime';
import { PostHeading } from '../PostHeading';
import { PostImage } from '../PostImage';

export async function PostList() {
  const posts = await postRepository.findAll();

  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.map((post: PostModel) => {
        const postLink = `/post/${post.slug}`;

        return (
          <div className='flex flex-col gap-4 group' key={post.id}>
            <PostImage
              linkProps={{
                href: postLink,
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
                dateTime={post.createdAt}
                className='dark:text-slate-500 text-slate-600 text-sm/tight block'
                title={formatDistanceToNow(post.createdAt)}
              >
                {formatDateTime(post.createdAt)}
              </time>

              <PostHeading as='h2' url={postLink}>
                {post.title}
              </PostHeading>

              <p>{post.excerpt}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
