import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';



const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Resi - AI Resume Builder',
  description: 'Create professional resumes with AI assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
   
    <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
            <main className="flex-1">{children}</main>
         
       
          <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}