import {
  Container,
  Header,
  PostHeading,
  PostImage,
  PostList,
  SpinLoader,
} from '@/components';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <Container>
      <Header />

      <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
        <PostImage
          linkProps={{
            href: '',
          }}
          imageProps={{
            src: '/images/bryen_1.png',
            width: 1200,
            height: 720,
            alt: 'Post title',
            priority: true,
          }}
        />

        <div className='flex flex-col gap-4 sm:justify-center'>
          <time
            dateTime='2025-05-20'
            className='dark:text-slate-500 text-slate-600 text-sm/tight block'
          >
            20/05/2025 10:00
          </time>

          <PostHeading url='#'>Título do post</PostHeading>

          <p>content</p>
        </div>
      </section>

      <Suspense fallback={<SpinLoader />}>
        <PostList />
      </Suspense>
      <footer>
        <p className='text-6xl font-bold text-center py-8'>Aqui é o footer</p>
      </footer>
    </Container>
  );
}
