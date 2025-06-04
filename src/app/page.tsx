import { Container } from '@/components/Container';
import { PostList } from '@/components/PostList/inde';
import { SpinLoader } from '@/components/SpinLoader';
import ThemeToggle from '@/components/ToggleTheme/ToggleTheme';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <Container>
      <header className='flex align-items-center justify-center py-8 relative'>
        <h1 className='text-6xl font-bold text-center'>Aqui é a header</h1>
        <ThemeToggle />
      </header>
      <Suspense fallback={<SpinLoader />}>
        <PostList />
      </Suspense>
      <footer>
        <p className='text-6xl font-bold text-center py-8'>Aqui é o footer</p>
      </footer>
    </Container>
  );
}
