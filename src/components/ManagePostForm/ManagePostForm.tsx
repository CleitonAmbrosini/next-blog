'use client';

import { Button } from '../Button';
import { InputCheckbox } from '../InputCheckbox';
import { InputText } from '../InputText';

export function ManagePostForm() {
  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText placeholder='Name' />
        <div>
          <InputText placeholder='Surname' />
        </div>

        <InputCheckbox />

        <div className='mt-4'>
          <Button type='submit' size='lg' variant='default'>
            Create
          </Button>
        </div>
      </div>
    </form>
  );
}
