import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rachit Garg — Frontend Developer',
  description:
    'Frontend Developer specializing in React.js, Next.js, and TypeScript. Building scalable, performant web applications.',
  keywords: ['Frontend Developer', 'React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Bangalore'],
  authors: [{ name: 'Rachit Garg' }],
  openGraph: {
    title: 'Rachit Garg — Frontend Developer',
    description: 'Building dynamic, responsive web applications with React.js, Next.js & TypeScript.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080808',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="noise-overlay">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-grid antialiased">
        {children}
      </body>
    </html>
  );
}
