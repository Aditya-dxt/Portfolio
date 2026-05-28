import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aditya Dixit | Full Stack Developer & Software Engineer',
  description:
    'Portfolio of Aditya Dixit — Full Stack Developer, AI/ML Enthusiast, Open Source Contributor, and Hackathon Finalist. B.Tech CSE student passionate about building impactful digital experiences.',
  keywords: [
    'Aditya Dixit',
    'Full Stack Developer',
    'Software Engineer',
    'Portfolio',
    'React',
    'Next.js',
    'AI/ML',
    'Hackathon',
    'Web Developer',
    'PSIT',
    'Kanpur',
  ],
  authors: [{ name: 'Aditya Dixit' }],
  creator: 'Aditya Dixit',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Aditya Dixit | Full Stack Developer',
    description:
      'Full Stack Developer, AI/ML Enthusiast, and Hackathon Finalist building impactful digital experiences.',
    siteName: 'Aditya Dixit Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Dixit | Full Stack Developer',
    description:
      'Full Stack Developer, AI/ML Enthusiast, and Hackathon Finalist building impactful digital experiences.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
