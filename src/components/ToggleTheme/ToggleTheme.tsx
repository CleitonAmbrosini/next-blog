'use client';

import { useTheme } from '@/store/ThemeContext/ThemeContext';
import clsx from 'clsx';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        'rounded-full',
        'border',
        'border-gray-300',
        'dark:border-gray-600',
        'bg-white',
        'dark:bg-gray-800',
        'text-black',
        'dark:text-white',
        'hover:scale-105',
        'transition',
        'w-7',
        'h-7',
        'cursor-pointer',
        'absolute',
        'right-0',
      )}
      aria-label='Alternar tema'
    >
      {theme === 'dark' ? (
        <Sun size={22} className='m-auto' />
      ) : (
        <Moon size={22} className='m-auto' />
      )}
    </button>
  );
}
