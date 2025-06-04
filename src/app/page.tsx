import { Container, Header, PostList, SpinLoader } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <Container>
      <Header />

      <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
        <Link href='' className='w-full h-full overflow-hidden rounded-xl'>
          <Image
            className='group-hover:scale-105 transition duration-300'
            src='/images/bryen_0.png'
            width={1200}
            height={720}
            alt='Post title'
          />
        </Link>
        <div></div>
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
