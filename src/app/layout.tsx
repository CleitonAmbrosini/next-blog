import { ThemeProvider } from '@/store/ThemeContext/ThemeContext';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The blog - a blog building with NextJS',
  description: 'This is a blog tha was building with NextJS',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='en' className='dark'>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
