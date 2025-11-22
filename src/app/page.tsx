import { Metadata } from 'next';
import { BannerServer } from "./components/page/banner-related/Banner.server"
import BeIGNITED from "./components/page/sections/BeIGNITED"
import BeTheSpark from "./components/page/sections/BeTheSpark"
import JoinOurNetwork from "./components/page/sections/JoinOurNetwork"
import TestimonialCarousel from "./components/page/sections/TestimonialCarousel"
import WhoWeAre from "./components/page/sections/WhoWeAre"
import WhyDoWeNeed from "./components/page/sections/WhyDoWeNeed"
import DiscoverBanner from "./components/status-banner/DiscoverBanner"
import { generatePageMetadata } from './lib/page-utils';

// Generate metadata for the home page
export const metadata: Metadata = generatePageMetadata({
  title: 'Home - IGNITE Foundation',
  description: 'Empowering young athletes through sports, education, and community development programs. Join us in creating opportunities for the next generation.',
  path: '/',
  keywords: [
    'youth sports',
    'athlete development',
    'sports education',
    'community programs',
    'youth empowerment',
  ],
  image: {
    url: '/images/og-home.jpg',
    alt: 'IGNITE Foundation - Empowering Young Athletes',
  },
});

export default function HomePage() {
  return (
    <>
      <div className="bg-[#F5F7FA] overflow-hidden flex items-center justify-center flex-col gap-0 md:gap-[120px] dark:bg-gray-900 transition-colors">
        <BannerServer />
        <BeTheSpark />
        <WhoWeAre />
        <WhyDoWeNeed />
        <div className="flex flex-col gap-12 w-full">
          <BeIGNITED />
          <JoinOurNetwork />
        </div>
        <TestimonialCarousel />
        <DiscoverBanner
          className="my-12 md:my-28 w-full"
          title="Fuel the Future of Youth Athletes"
          description="Your donation helps break barriers — giving every child the chance to access elite coaching, join competitive clubs, and chase their sports dreams."
          listbutton={true}
          buttonText="Donate Now"
          route="/donate"
        />
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'IGNITE Foundation',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ignitefoundation.us',
            logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ignitefoundation.us'}/logo.png`,
            description: 'Empowering young athletes through sports, education, and community development programs.',
            sameAs: [
              'https://facebook.com/ignitefoundation',
              'https://twitter.com/ignitefoundation',
              'https://instagram.com/ignitefoundation',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-555-555-5555',
              contactType: 'customer service',
            },
          }),
        }}
      />
    </>
  );
}