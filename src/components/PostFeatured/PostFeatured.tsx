import { findAllPublicPostsCached } from '@/lib/post/queries';
import { PostImage } from '../PostImage';
import { PostSummary } from '../PostSummary';

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();
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
