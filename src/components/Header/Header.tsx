import clsx from 'clsx';
import { ThemeToggle } from '../ToggleTheme';

export function Header() {
  return (
    <header className='flex align-items-center justify-center py-8 relative'>
      <h1
        className={clsx(
          'text-4xl/normal font-extrabold',
          'sm:text-5xl/normal',
          'md:text-6xl/normal',
          'lg:text-7xl/normal'
        )}
      >
        <a href='#'>The blog</a>
      </h1>
      <ThemeToggle />
    </header>
  );
}
