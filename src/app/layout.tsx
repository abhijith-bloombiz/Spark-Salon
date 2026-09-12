import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import 'lenis/dist/lenis.css';
import CustomCursor from '@/components/layout/CustomCursor';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import { SITE_CONFIG } from '@/config/site.config';

const protoFont = localFont({
  src: '../../public/font/sbb-nineteen-75-proto.otf',
  variable: '--font-proto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} | Luxury Atelier & Beauty Mall`,
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.name }],
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    title: `${SITE_CONFIG.name} | Luxury Atelier`,
    description: `${SITE_CONFIG.tagline}. More than a salon. It's a feeling.`,
    siteName: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#050507',
  width: 'device-width',
  initialScale: 1,
};

import SquircleSvgDefs from '@/components/ui/SquircleSvgDefs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={protoFont.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="image"
          href="/hero/sequence/frame_0001.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <link rel="preload" as="image" href="/hero/poster.webp" type="image/webp" />
      </head>
      <body className={protoFont.variable}>
        <SquircleSvgDefs />
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

