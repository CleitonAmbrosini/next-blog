import { findAllPublicPostsCached } from '@/lib/post/queries/public';
import type { PostModel } from '@/models/post/post-model';
import { PostImage } from '../PostImage';
import { PostSummary } from '../PostSummary';

export async function PostList() {
  const posts = await findAllPublicPostsCached();

  return (
    <div className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.slice(1).map((post: PostModel) => {
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

            <PostSummary
              postLink={postLink}
              postHeading='h2'
              createdAt={post.createdAt}
              excerpt={post.excerpt}
              title={post.title}
            />
          </div>
        );
      })}
    </div>
  );
}
