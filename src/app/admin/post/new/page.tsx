import { Button } from '@/components/Button';

export const dynamic = 'force-static';

export default async function AdminPostNewPage() {
  return (
    <div className='py-16 text-6xl flex gap-4 flex-wrap items-center'>
      <Button variant='default' size='sm'> Create new </Button>
      <Button variant='ghost' size='md'> Create new </Button>
      <Button variant='danger' size='lg'> Create new </Button>
    </div>
  );
}
