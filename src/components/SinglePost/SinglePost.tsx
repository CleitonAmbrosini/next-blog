import { findPostBySlugCached } from '@/lib/post/queries';
import Image from 'next/image';
import { PostDate } from '../PostDate';
import { PostHeading } from '../PostHeading';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostBySlugCached(slug);

  return (
    <article className='mb-16'>
      <header className='flex flex-col gap-4 mb-4'>
        <Image
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
          className='rounded-xl'
        />

        <PostHeading url={`/post/${post.slug}`}> {post.title} </PostHeading>

        <p>
          {post.author} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>

      <p className='mb-8 text-xl text-slate-600'>{post.excerpt}</p>

      <div>{post.content}</div>
    </article>
  );
}
