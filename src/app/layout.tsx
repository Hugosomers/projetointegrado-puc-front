import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import StoreProvider from './StoreProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Investimento CDI  ',
  description: 'Saiba quanto você irá receber após um determinado período.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <StoreProvider>
        <body className={poppins.className}>{children}</body>
      </StoreProvider>
    </html>
  );
}
