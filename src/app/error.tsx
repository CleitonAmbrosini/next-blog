'use client';

import { ErrorMessage } from '@/components';
import { useEffect } from 'react';

type RootErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function RootErrorPage({ error, reset }: RootErrorPageProps) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <ErrorMessage
      pageTitle='Internal Server Error'
      contentTitle='501'
      content={
        <button onClick={() => reset()}>Click here to try again.</button>
      }
    />
  );
}
