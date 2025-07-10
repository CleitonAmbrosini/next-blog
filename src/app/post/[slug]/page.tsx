import { findPostBySlugCached } from '@/lib/post/queries';
import type { Metadata } from 'next';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPostBySlugCached(slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;
  const post = await findPostBySlugCached(slug);

  return (
    <>
      <div>{post.content}</div>
    </>
  );
}
