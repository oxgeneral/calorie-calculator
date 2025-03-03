import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Худей научно',
  description: 'Научный подход к снижению веса',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={cn("min-h-screen bg-black text-white antialiased", inter.className)}>
        <div className="mx-auto max-w-[430px] min-h-screen bg-black relative">
          {children}
        </div>
      </body>
    </html>
  );
} 