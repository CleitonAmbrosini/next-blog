import { Button } from '@/components/Button';

export const dynamic = 'force-static';

export default async function AdminPostNewPage() {
  return (
    <div className='py-16 text-6xl'>
      <Button> Create new </Button>
    </div>
  );
}
