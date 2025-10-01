'use server';

import { createLoginSession, verifyPassword } from '@/lib/login/manage-login';
import { redirect } from 'next/navigation';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Wrong data.',
    };
  }

  const username = formData.get('username')?.toString().trim() || '';
  const password = formData.get('password')?.toString().trim() || '';

  if (!username || !password) {
    return {
      username,
      error: 'Enter username and password',
    };
  }

  const isValidUsername = username === process.env.LOGIN_USER;
  const isValidPassword = await verifyPassword(
    password,
    process.env.LOGIN_PASS || '',
  );

  if (!isValidUsername || !isValidPassword) {
    return {
      username,
      error: 'Invalid username or password',
    };
  }

  await createLoginSession(username);
  redirect('/admin/post');
}
