import { formatDateTime, formatDistanceToNow } from '@/utils/fomat-datetime';

type PostDateProps = {
  dateTime: string;
};

export function PostDate({ dateTime }: PostDateProps) {
  return (
    <time
      dateTime={dateTime}
      className='dark:text-slate-500 text-slate-600 text-sm/tight'
      title={formatDistanceToNow(dateTime)}
    >
      {formatDateTime(dateTime)}
    </time>
  );
}
