import { Container } from '@/components/Container';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ThemeProvider } from '@/store/ThemeContext/ThemeContext';
import type { Metadata } from 'next';
import './globals.css';
import { ToastifyContainer } from '@/components/ToastifyContainer';

export const metadata: Metadata = {
  title: {
    default: 'The blog - a blog building with NextJS',
    template: '%s | The Blog',
  },
  description: 'This is a blog tha was building with NextJS',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='en' className='dark'>
      <body>
        <ThemeProvider>
          <Container>
            <Header />
            {children}
            <Footer />
          </Container>
          <ToastifyContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
