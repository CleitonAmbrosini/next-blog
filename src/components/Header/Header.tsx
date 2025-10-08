'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '../Button';

export function Header() {
  return (
    <header
      className={clsx(
        'flex align-items-center justify-between',
        'w-full py-4 px-8',
        'bg-surface text-textc-primary',
      )}
    >
      <div className=''>
        <Link href='/' className='cursor-pointer flex'>
          <Image
            src='/icons/icon-192.png'
            alt='Blogverse logo'
            width={38}
            height={38}
          />
          <h1 className={clsx('ml-2 text-2xl/normal font-bold')}>Blogverse</h1>
        </Link>
      </div>
      <div className='flex items-center mr-20'>
        <Link href='/' className='font-semibold hover:text-textc-secondary'>
          Posts
        </Link>
      </div>
      <div className='flex justify-self-end'>
        <Button
          size='md'
          variant='outline'
          onClick={() => redirect('/admin/login')}
        >
          Log In
        </Button>
      </div>
      {/* <ThemeToggle /> */}
    </header>
  );
}
