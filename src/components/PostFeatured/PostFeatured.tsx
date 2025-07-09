import { PostImage } from '../PostImage';
import { PostSummary } from '../PostSummary';

export function PostFeatured() {
  const slug = 'qualquer';
  const postLink = `/post/${slug}`;

  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          src: '/images/bryen_1.png',
          width: 1200,
          height: 720,
          alt: 'Post title',
          priority: true,
        }}
      />

      <PostSummary
        postLink={postLink}
        postHeading='h1'
        createdAt='2025-04-08T00:24:38.616Z'
        excerpt='Em vez de configurar tudo manualmente, basta criar um arquivo com o nome certo e o Next.js entende que aquilo representa uma página.'
        title='Dicas para manter a saúde mental em dia'
      />
    </section>
  );
}
