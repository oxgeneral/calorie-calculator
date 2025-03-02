import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Научный калькулятор калорий',
  description: 'Рассчитайте оптимальный дефицит калорий на основе научных данных',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <main className="container mx-auto py-8 px-4">
          {children}
        </main>
      </body>
    </html>
  );
} 