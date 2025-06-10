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
    h1: 'text-2xl/ sm:text-4xl/tight',
    h2: 'text-xl sm:text-2xl/tight',
  };

  const commonClasses = 'font-extrabold';

  return (
    <Tag className={clsx(mapTagClasses[Tag], commonClasses)}>
      <Link href={url}>{children}</Link>
    </Tag>
  );
}
