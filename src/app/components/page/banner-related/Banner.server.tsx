import React from 'react';
import { BannerSEO } from './BannerSEO';
import BannerClient from './BannerClient';
import { BannerProps } from '@/app/types/banner';
import SEO from '../../seo/SEO';

export const BannerServer = () => {
    const bannerData: BannerProps = {
        title: "Be The Spark",
        description: `The IGNITE Foundation is working to remove the socioeconomic "pay to play" barrier in US youth sports. Enabling talented young athletes access to high level coaching & programming, to follow their dreams. Be The Spark and support them on their journey`,
        image: {
            src: "../../../../../public/assets/image/banenrImage.webp",
            alt: "Youth athletes participating in various sports events",
            width: 500,
            height: 500,
        },
    };

    return (
        <>
            <BannerSEO
                title={bannerData.title}
                description={bannerData.description}
                imageUrl={bannerData.image.src}
            />
            <SEO
                title={bannerData.title}
                description={bannerData.description}
                keywords={[bannerData.title, bannerData.description]}
                ogImage={bannerData.image.src}
            />
            <BannerClient {...bannerData} />
        </>
    );
};