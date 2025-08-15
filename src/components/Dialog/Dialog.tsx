'use client';

import clsx from 'clsx';

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
          <button
            className={clsx(
              'bg-slate-200 hover:bg-slate-300 text-slate-950 transition',
              'flex items-center justify-center',
              'py-2 px-6 rounded-lg cursor-pointer',
              'disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed',
            )}
            onClick={handleCancel}
            disabled={disabledButtons}
            autoFocus
          >
            Cancel
          </button>
          <button
            className={clsx(
              'bg-blue-500 hover:bg-blue-600 text-slate-200 transition',
              'flex items-center justify-center',
              'py-2 px-6 rounded-lg cursor-pointer',
              'disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed',
            )}
            onClick={onConfirm}
            disabled={disabledButtons}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
