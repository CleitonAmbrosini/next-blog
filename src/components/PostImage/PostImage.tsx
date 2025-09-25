import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type PostImageProps = {
  linkProps: React.ComponentProps<typeof Link>;
  imageProps: React.ComponentProps<typeof Image>;
};

export function PostImage({ linkProps, imageProps }: PostImageProps) {
  console.log(imageProps.src);
  return (
    <Link
      {...linkProps}
      className={clsx(
        'w-full',
        'h-full',
        'overflow-hidden',
        'rounded-xl',
        linkProps.className,
      )}
    >
      <Image
        {...imageProps}
        className={clsx(
          'w-full',
          'h-full',
          'object-cover',
          'object-center',
          'group-hover:scale-105',
          'transition',
          'duration-300',
          imageProps.className,
        )}
        alt={imageProps.alt}
        src={imageProps.src}
      />
    </Link>
  );
}
