import { InputText } from '@/components/InputText';

export const dynamic = 'force-static';

export default async function AdminPostNewPage() {
  return (
    <div className='flex flex-col gap-6'>
      <InputText placeholder='Name' />
      <div>
        <InputText placeholder='Surname' />
      </div>
    </div>
  );
}
