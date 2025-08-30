'use client';

import clsx from 'clsx';
import { Button } from '../Button';

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  disabledButtons: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function Dialog({
  isVisible = false,
  content,
  title,
  onCancel,
  onConfirm,
  disabledButtons,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabledButtons) return;

    onCancel();
  }

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50',
        'bg-black/50 backdrop-blur-xs',
        'flex items-center justify-center',
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          'bg-slate-100 p-6 rounded-lg max-w-2xl mx-6',
          'flex flex-col gap-6',
          'shadow-lg shadow-black/30',
        )}
        role='dialog'
        aria-modal={true}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        onClick={e => e.stopPropagation()}
      >
        <h3 id='dialog-title' className='tex-xl font-bold'>
          {title}
        </h3>
        <div id='dialog-description'>{content}</div>
        <div className='flex items-center justify-around gap-4'>
          <Button
            onClick={handleCancel}
            disabled={disabledButtons}
            autoFocus
            variant='ghost'
            size='md'
          >
            Cancel
          </Button>
          <Button
            variant='default'
            size='md'
            onClick={onConfirm}
            disabled={disabledButtons}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
