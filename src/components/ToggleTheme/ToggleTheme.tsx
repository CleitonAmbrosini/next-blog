'use client';

import { useTheme } from '@/store/ThemeContext/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-full border border-gray-300 dark:border-gray-600
                 bg-white dark:bg-gray-800 text-black dark:text-white hover:scale-105 transition'
      aria-label='Alternar tema'
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
