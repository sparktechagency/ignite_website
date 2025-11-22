import { Metadata } from 'next';

type GenerateMetadataParams = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
};

export const generateMetadata = ({
  title,
  description,
  path,
  keywords = [],
  image = '/images/og-default.jpg',
}: GenerateMetadataParams): Metadata => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ignitefoundation.us';
  const url = `${baseUrl}${path}`;
  const ogImage = `${baseUrl}${image.startsWith('/') ? '' : '/'}${image}`;

  return {
    title: {
      default: title,
      template: `%s | IGNITE Foundation`,
    },
    description,
    keywords: ['IGNITE Foundation', 'youth sports', 'athletics', 'sports foundation', ...keywords],
    openGraph: {
      title,
      description,
      url,
      siteName: 'IGNITE Foundation',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@ignitefoundation',
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
};
