'use client';

import { deletePostAction } from '@/actions/post/delete-post-action';
import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { Dialog } from '../Dialog';

type DeletePostButton = {
  title: string;
  id: string;
};

export function DeletePostButton({ title, id }: DeletePostButton) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);

  function handleConfirm() {
    toast.dismiss();
    startTransition(async () => {
      const result = await deletePostAction(id);
      setShowDialog(false);

      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success('Post successfully deleted');
    });
  }

  return (
    <>
      <button
        className={clsx(
          'text-red-500 cursor-pointer transition',
          '[&_svg]:w-4 [&_svg]:h-4 ',
          'hover:scale-120 hover:text-red-700',
          'disabled:text-slate-200 disabled:cursor-not-allowed',
        )}
        aria-label={`Delete post ${title}`}
        title={`Delete post ${id}`}
        onClick={() => setShowDialog(true)}
        disabled={isPending}
      >
        <Trash2Icon />
      </button>

      <Dialog
        isVisible={showDialog}
        title='Delete post'
        content={`Are you sure you want to delete the post: '${title}'?`}
        onCancel={() => setShowDialog(false)}
        onConfirm={handleConfirm}
        disabledButtons={isPending}
      />
    </>
  );
}
