import clsx from 'clsx';
import Link from 'next/link';

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2';
};

export function PostHeading({
  children,
  url,
  as: Tag = 'h2',
}: PostHeadingProps) {
  const mapTagClasses = {
    h1: 'text-2xl/ sm:text-4xl/tight font-extrabold',
    h2: 'sm:text-2xl/tight font-bold',
  };

  return (
    <Tag className={clsx(mapTagClasses[Tag])}>
      <Link className='hover:text-slate-600 transition' href={url}>{children}</Link>
    </Tag>
  );
}
