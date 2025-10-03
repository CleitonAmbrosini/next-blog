'use client';

import { logoutAction } from '@/actions/login/logout-action';
import clsx from 'clsx';
import {
  CircleXIcon,
  FileTextIcon,
  HourglassIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const [isPeding, startTransition] = useTransition();

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  const navClass = clsx(
    'bg-slate-900 text-slate-100 rounded-lg',
    'flex flex-col mb-8',
    'sm:flex-row sm:flex-wrap',
    !isOpen && 'overflow-hidden',
    !isOpen && 'h-10',
    'sm:overflow-visible sm:h-auto',
  );
  const linkClass = clsx(
    '[&>svg]:w-[16px] [&>svg]:h-[16px] px-4 cursor-pointer rounded-lg',
    'flex items-center justify-start gap-2',
    'transition hover:bg-slate-800',
    'h-10',
    'shrink-0',
  );
  const openCloseBtnClass = clsx(
    linkClass,
    'text-blue-200 italic',
    'sm:hidden',
  );

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    startTransition(async () => await logoutAction());
  }

  return (
    <nav className={navClass}>
      <button
        onClick={() => setIsOpen(state => !state)}
        className={openCloseBtnClass}
      >
        {!isOpen && (
          <>
            <MenuIcon />
            Open
          </>
        )}
        {isOpen && (
          <>
            <CircleXIcon />
            Close
          </>
        )}
      </button>

      <a className={linkClass} href='/' target='_blank'>
        <HouseIcon />
        Home
      </a>

      <Link className={linkClass} href='/admin/post'>
        <FileTextIcon />
        Posts
      </Link>

      <Link className={linkClass} href='/admin/post/new'>
        <PlusIcon />
        New post
      </Link>

      <a href='#' className={linkClass} onClick={handleLogout}>
        {isPeding && (
          <>
            <HourglassIcon />
            Wait...
          </>
        )}
        {!isPeding && (
          <>
            <LogOutIcon />
            Log Out
          </>
        )}
      </a>
    </nav>
  );
}
