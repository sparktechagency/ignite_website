'use client'
import Head from 'next/head';
import { usePathname } from 'next/navigation';

import { ReactNode } from 'react';

type SEOProps = {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    ogType?: 'website' | 'article' | 'profile' | 'book';
    article?: {
        publishedTime?: string;
        modifiedTime?: string;
        authors?: string[];
        section?: string;
        tags?: string[];
    };
    noIndex?: boolean;
    canonicalUrl?: string;
    children?: ReactNode;
};

export const SEO = ({
    title,
    description,
    keywords = [],
    ogImage = '/images/og-default.jpg',
    ogType = 'website',
    article,
    noIndex = false,
    canonicalUrl,
    children,
}: SEOProps) => {
    const pathname = usePathname();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ignitefoundation.us';
    const url = canonicalUrl || `${baseUrl}${pathname}`;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
    const siteName = 'IGNITE Foundation';
    const twitterHandle = '@ignitefoundation';

    // Combine default keywords with provided ones and deduplicate
    const allKeywords = Array.from(new Set([
        'youth sports', 'athletics', 'sports foundation', 'youth development',
        'sports programs', 'youth empowerment', 'youth leadership', 'community sports',
        'sports education', 'youth fitness', 'youth mentoring', 'sports coaching',
        'youth tournaments', 'sports scholarships', 'youth wellness',
        ...keywords
    ]));

    // Generate article specific meta tags if article data is provided
    const articleMeta = article ? {
        'article:published_time': article.publishedTime,
        'article:modified_time': article.modifiedTime,
        'article:section': article.section,
        'article:tag': article.tags?.join(', '),
        'article:author': article.authors?.[0],
    } : {};

    // Generate meta robots tag
    const robotsContent = noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';

    return (
        <>
            <Head>
                <title>{`${title} | ${siteName}`}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={allKeywords.join(', ')} />
                <meta name="robots" content={robotsContent} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=1" />
                <meta name="theme-color" content="#1a1a1a" />

                {/* Canonical URL */}
                <link rel="canonical" href={url} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content={ogType} />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={`${title} | ${siteName}`} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={fullOgImage} />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:locale" content="en_US" />

                {/* Article specific meta tags */}
                {Object.entries(articleMeta).map(([key, value]) =>
                    value ? <meta key={key} property={key} content={value} /> : null
                )}

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={url} />
                <meta name="twitter:title" content={`${title} | ${siteName}`} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={fullOgImage} />
                <meta name="twitter:creator" content={twitterHandle} />
                <meta name="twitter:site" content={twitterHandle} />

                {/* Favicons */}
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />

                {/* Additional meta tags */}
                <meta name="author" content={siteName} />
                <meta name="publisher" content={siteName} />
                <meta name="copyright" content={`© ${new Date().getFullYear()} ${siteName}`} />
                <meta name="language" content="English" />
                <meta name="revisit-after" content="7 days" />
                <meta name="rating" content="general" />
                <meta name="distribution" content="global" />

                {/* Structured Data - Organization */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: siteName,
                            url: baseUrl,
                            logo: `${baseUrl}/logo.png`,
                            sameAs: [
                                'https://facebook.com/ignitefoundation',
                                'https://twitter.com/ignitefoundation',
                                'https://instagram.com/ignitefoundation',
                                'https://youtube.com/ignitefoundation',
                                'https://linkedin.com/company/ignitefoundation',
                            ],
                            contactPoint: [
                                {
                                    '@type': 'ContactPoint',
                                    telephone: '+1-555-555-5555',
                                    contactType: 'customer service',
                                    email: 'info@ignitefoundation.us',
                                    areaServed: 'US',
                                    availableLanguage: 'English',
                                },
                            ],
                        }),
                    }}
                />

                {/* Structured Data - WebPage */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebPage',
                            name: title,
                            description: description,
                            url: url,
                            publisher: {
                                '@type': 'Organization',
                                name: siteName,
                                logo: {
                                    '@type': 'ImageObject',
                                    url: `${baseUrl}/logo.png`,
                                },
                            },
                        }),
                    }}
                />

                {/* Additional children elements */}
                {children}
            </Head>
        </>
    );
};

export default SEO;