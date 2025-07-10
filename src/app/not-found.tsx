import clsx from 'clsx';

export default function NotFoundPage() {
  return (
    <>
      <title>Page not found!</title>
      <div
        className={clsx(
          'min-h-[320px] bg-slate-900 text-slate-100',
          'mb-16 p-8 rounded-xl',
          'flex items-center justify-center',
          'text-center',
        )}
      >
        <div>
          <h1 className='text-7xl/tight mb-8'>404</h1>
          <p>Erro 404 - The page you are trying to access does not exist.</p>
        </div>
      </div>
    </>
  );
}
