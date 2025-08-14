'use client';

import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';

type DeletePostButton = {
  title: string;
  id: string;
};

export function DeletePostButton({ title, id }: DeletePostButton) {
  function handleClick() {
    alert('Botao clicado');
  }

  return (
    <button
      className={clsx(
        'text-red-500 cursor-pointer transition',
        '[&_svg]:w-4 [&_svg]:h-4 ',
        'hover:scale-120 hover:text-red-700',
      )}
      aria-label={`Delete post ${title}`}
      title={`Delete post ${id}`}
      onClick={handleClick}
    >
      <Trash2Icon />
    </button>
  );
}
