'use client';

import { deletePostAction } from '@/actions/post/delete-post-action';
import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import { useTransition } from 'react';

type DeletePostButton = {
  title: string;
  id: string;
};

export function DeletePostButton({ title, id }: DeletePostButton) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const result = await deletePostAction(id);
      alert(`Post ${result} deleted!`);
    });
  }

  return (
    <button
      className={clsx(
        'text-red-500 cursor-pointer transition',
        '[&_svg]:w-4 [&_svg]:h-4 ',
        'hover:scale-120 hover:text-red-700',
        'disabled:text-slate-200 disabled:cursor-not-allowed',
      )}
      aria-label={`Delete post ${title}`}
      title={`Delete post ${id}`}
      onClick={handleClick}
      disabled={isPending}
    >
      <Trash2Icon />
    </button>
  );
}
