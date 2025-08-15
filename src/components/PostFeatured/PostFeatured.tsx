import { findAllPublicPostsCached } from '@/lib/post/queries/public';
import { ErrorMessage } from '../ErrorMessage';
import { PostImage } from '../PostImage';
import { PostSummary } from '../PostSummary';

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();
  if (posts.length <= 1) {
    return (
      <ErrorMessage
        contentTitle='oops 😅'
        content={`we haven't created any posts yet`}
      />
    );
  }

  const featuredPost = posts[0];

  const postLink = `/post/${featuredPost.slug}`;

  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          src: featuredPost.coverImageUrl,
          width: 1200,
          height: 720,
          alt: featuredPost.title,
          priority: true,
        }}
      />

      <PostSummary
        postLink={postLink}
        postHeading='h1'
        createdAt={featuredPost.createdAt}
        excerpt={featuredPost.excerpt}
        title={featuredPost.title}
      />
    </section>
  );
}
