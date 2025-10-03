import { LoginForm } from '@/components/LoginForm';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Log In',
};

export default async function AdminLoginPage() {
  return <LoginForm />;
}
