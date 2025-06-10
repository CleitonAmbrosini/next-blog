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
            className='w-full h-full object-cover object-center group-hover:scale-105 transition duration-300'
            src='/images/bryen_0.png'
            width={1200}
            height={720}
            alt='Post title'
            priority
          />
        </Link>
        <div className='flex flex-col gap-4 sm:justify-center'>
          <time
            dateTime='2025-05-20'
            className='dark:text-slate-500 text-slate-600 text-sm/tight block'
          >
            20/05/2025 10:00
          </time>

          <h1 className='text-2xl/tight font-extrabold sm:text-4xl/tight'>
            <Link href=''>Titulo</Link>
          </h1>

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
