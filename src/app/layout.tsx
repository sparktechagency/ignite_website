import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/common/Header";
import ReduxProvider from "./providers/ReduxProvider";
import { ConfigProvider, ThemeConfig } from "antd";
import Footer from "./components/common/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const siteName = 'IGNITE Foundation';
const siteDescription = 'Empowering young athletes through sports, education, and community development programs.';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ignitefoundation.us';

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    creator: '@ignitefoundation',
    images: [`${siteUrl}/images/og-default.jpg`],
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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const themeConfig: ThemeConfig = {
  token: {
    borderRadius: 4,
    fontSize: 16,
    colorPrimary: '#1a1a1a',
  },
  components: {
    Radio: {
      buttonSolidCheckedBg: 'rgb(136,148,166)',
      buttonSolidCheckedHoverBg: 'rgb(127,132,139)',
      borderRadius: 1,
    },
    Checkbox: {
      colorPrimary: "rgb(0,0,0)",
      colorPrimaryHover: "rgb(0,0,0)"
    },
    Select: {
      optionSelectedColor: "rgba(255,255,255,0.88)",
      fontSizeLG: 16
    },
    Input: {
      fontSizeLG: 20,
    },
    Form: {
      labelFontSize: 18,
      labelHeight: 32
    }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ReduxProvider>
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          <Header />
          <ConfigProvider theme={themeConfig}>
            <main>
              {children}
            </main>
          </ConfigProvider>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
