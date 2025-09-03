import { ManagePostForm } from '@/components/ManagePostForm';

export const dynamic = 'force-static';

export default async function AdminPostNewPage() {
  return (
    <>
      <ManagePostForm />
    </>
  );
}
