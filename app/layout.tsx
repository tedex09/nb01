import './globals.css';
import type { Metadata } from 'next';
import { Red_Hat_Display } from 'next/font/google';
import SpatialNavigationInit from '@/providers/SpatialNavigationInit';

const sora = Red_Hat_Display({ 
  subsets: ['latin'],
  display: 'swap'
 });

export const metadata: Metadata = {
  title: 'Nimbus',
  description: 'Watch Live TV, Movies and Radio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <SpatialNavigationInit />
        {children}
      </body>
    </html>
  );
}