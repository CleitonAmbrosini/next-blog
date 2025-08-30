import clsx from 'clsx';

type ButtonsVariants = 'default' | 'ghost' | 'danger';
type ButtonsSizes = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant: ButtonsVariants;
  size: ButtonsSizes;
} & React.ComponentProps<'button'>;

export function Button({ variant, size, children, ...props }: ButtonProps) {
  const buttonVariants: Record<ButtonsVariants, string> = {
    default: clsx('bg-blue-600 text-blue-100'),
    ghost: clsx('bg-slate-200 text-slate-900'),
    danger: clsx('bg-red-600 text-red-100'),
  };

  const buttonSizes: Record<ButtonsSizes, string> = {
    sm: clsx(''),
    md: clsx(''),
    lg: clsx(''),
  };

  const buttonClass = clsx(buttonVariants[variant], buttonSizes[size]);

  return (
    <button {...props} className={buttonClass}>
      {children}
    </button>
  );
}
