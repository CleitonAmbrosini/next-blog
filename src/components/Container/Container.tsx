import clsx from 'clsx';

type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className={clsx('text-textc-primary', 'bg-surface', 'min-h-screen')}>
      <div className='w-[1300px] mx-auto px-8'>{children}</div>
    </div>
  );
}
