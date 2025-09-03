import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';

export const dynamic = 'force-static';

export default async function AdminPostNewPage() {
  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText placeholder='Name' />
        <div>
          <InputText placeholder='Surname' />
        </div>

        <div className='mt-4'>
          <Button type='submit' size='lg' variant='default'>
            Create
          </Button>
        </div>
      </div>
    </form>
  );
}
