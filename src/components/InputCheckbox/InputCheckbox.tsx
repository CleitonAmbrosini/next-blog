import clsx from 'clsx';
import { useId } from 'react';

type InputCheckboxProps = {
  labelText?: string;
  type?: 'checkbox';
} & React.ComponentProps<'input'>;

export function InputCheckbox({
  labelText = '',
  type = 'checkbox',
  ...props
}: InputCheckboxProps) {
  const id = useId();

  return (
    <div className='flex flex-col gap-2'>
      <input
        {...props}
        className={clsx('', props.className)}
        id={id}
        type={type}
      />

      {labelText && (
        <label htmlFor={id} className='text-sm'>
          {labelText}
        </label>
      )}
    </div>
  );
}
