import { Container, Header } from '@/components';
import { ThemeProvider } from '@/store/ThemeContext/ThemeContext';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'The blog - a blog building with NextJS',
    template: '%s | The Blog'
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
            <footer>
              <p className='text-6xl font-bold text-center py-8'>
                Aqui é o footer
              </p>
            </footer>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
