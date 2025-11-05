import { Metadata } from 'next';
import { generateOGImageUrl } from './og-utils';

type PageMetadataParams = {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    noIndex?: boolean;
    image?: {
        url: string;
        width?: number;
        height?: number;
        alt?: string;
    };
};


export function generatePageMetadata({
    title,
    description,
    path,
    keywords = [],
    noIndex = false,
    image,
}: PageMetadataParams): Metadata {
    const siteName = 'IGNITE Foundation';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ignitefoundation.us';
    const url = `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;


    const ogImage = image?.url || generateOGImageUrl(
        title,
        description,
        baseUrl
    );

    const metadata: Metadata = {
        title: {
            default: title,
            template: `%s | ${siteName}`,
        },
        description,
        metadataBase: new URL(baseUrl),
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url,
            siteName,
            title,
            description,
            images: [
                {
                    url: ogImage,
                    width: image?.width || 1200,
                    height: image?.height || 630,
                    alt: image?.alt || title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            creator: '@ignitefoundation',
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: url,
        },
    };


    const baseKeywords = [

        'IGNITE Foundation', 'IGNITE', 'IGNITE Sports', 'IGNITE Youth Foundation',
        'IGNITE Athletics', 'IGNITE Sports Foundation', 'IGNITE Youth Sports',


        'youth sports', 'youth athletics', 'youth development', 'youth empowerment',
        'sports education', 'sports training', 'athlete development', 'youth programs',
        'sports for kids', 'youth coaching', 'sports coaching', 'youth fitness',
        'community sports', 'youth leadership', 'sports academy', 'youth academy',


        'basketball', 'soccer', 'football', 'volleyball', 'tennis', 'baseball',
        'softball', 'track and field', 'swimming', 'gymnastics', 'martial arts',
        'wrestling', 'boxing', 'golf', 'hockey', 'lacrosse', 'rugby', 'cricket',
        'badminton', 'table tennis', 'cheerleading', 'dance', 'skating', 'skiing',
        'snowboarding', 'surfing', 'skateboarding', 'bmx', 'cycling', 'running',
        'cross country', 'triathlon', 'weightlifting', 'powerlifting', 'fencing',
        'archery', 'shooting', 'equestrian', 'rowing', 'sailing', 'climbing',
        'parkour', 'fitness', 'calisthenics', 'yoga for athletes',


        'kids sports', 'teens sports', 'youth athletes', 'high school sports',
        'middle school sports', 'elementary sports', 'after school programs',
        'summer sports camps', 'winter sports programs', 'youth sports leagues',
        'youth tournaments', 'youth championships', 'youth sports events',


        'character development', 'teamwork', 'discipline', 'sportsmanship',
        'leadership skills', 'confidence building', 'self-esteem', 'mental health',
        'physical fitness', 'healthy lifestyle', 'obesity prevention', 'active kids',
        'youth wellness', 'sports psychology', 'injury prevention', 'sports nutrition',
        'academic performance', 'scholarship opportunities', 'college recruitment',
        'sports scholarships', 'youth mentoring', 'life skills', 'career in sports',


        'sports clinics', 'training camps', 'youth leagues', 'sports facilities',
        'equipment donation', 'sports grants', 'community outreach', 'youth advocacy',
        'sports events', 'charity tournaments', 'fundraising events', 'volunteer opportunities',
        'coach training', 'referee certification', 'sports management', 'youth coaching certification',


        'youth sports near me', 'sports programs for kids', 'youth athletics programs',
        'community sports clubs', 'youth sports foundation', 'nonprofit sports organization',


        'summer sports camps', 'winter sports programs', 'spring training',
        'fall sports leagues', 'year-round sports', 'seasonal sports activities',


        'adaptive sports', 'special olympics', 'inclusive sports',
        'sports for disabled youth', 'wheelchair sports', 'paralympic sports',
        'inclusive coaching', 'accessible sports', 'youth with disabilities',


        'recreational sports', 'competitive sports', 'elite youth athletes',
        'travel teams', 'select sports', 'club sports', 'school sports',
        'varsity sports', 'junior varsity', 'youth olympics',


        'concussion awareness', 'sports injuries', 'youth sports safety',
        'sports first aid', 'hydration for athletes', 'sports physicals',
        'youth health', 'preventing burnout', 'overtraining prevention',


        'youth sports parenting', 'sports parenting tips', 'travel sports',
        'youth sports cost', 'affordable sports programs', 'volunteer coaching',
        'sports team management', 'youth sports blog', 'parenting athletes',


        'sports and education', 'student athletes', 'academic eligibility',
        'balancing sports and school', 'sports scholarships', 'college athletics',
        'NCAA eligibility', 'NAIA sports', 'junior college sports',


        'sports technology', 'youth sports apps', 'sports performance tracking',
        'video analysis', 'sports analytics', 'youth sports wearables',
        'virtual training', 'esports for youth', 'gaming and sports',


        'women in sports', 'girls sports', 'youth sports equality',
        'diversity in sports', 'youth sports activism', 'sports for social change',
        'youth empowerment through sports', 'community building through sports',
        'youth sports research', 'sports medicine for kids', 'youth sports trends',


        'global youth sports', 'international competitions', 'youth sports exchange',
        'sports diplomacy', 'olympic development', 'youth world championships',


        'youth sports photography', 'sports videography', 'sports broadcasting',
        'sports journalism', 'sports marketing', 'youth sports sponsorships',
        'sports facility management', 'youth sports equipment', 'sports apparel',
        'youth sports nutrition', 'sports supplements for teens', 'youth recovery',
        'sports psychology for kids', 'mental toughness', 'sports motivation',
        'youth sports quotes', 'inspirational athletes', 'sports role models',


        'youth sports in [Your City]', '[Your City] youth athletics',
        'youth sports clubs near me', 'youth sports leagues [Your State]',


        'ignight', 'ignit', 'ignit foundation', 'youth sport', 'atheltics',
        'sports for youth', 'youth sport foundation', 'ignite youth',


        ...keywords
    ];


    metadata.keywords = [...new Set([...baseKeywords, ...keywords])].slice(0, 1000);
    return metadata;
}


export function generateDynamicPageMetadata(
    params: Record<string, string | string[]>,
    generateParams: (params: Record<string, string | string[]>) => PageMetadataParams
): Metadata {
    return generatePageMetadata(generateParams(params));
}


export function generateStaticParams<T extends { slug: string }>(
    items: T[],
    paramKey: string = 'slug'
): { [key: string]: string }[] {
    return items.map((item) => ({
        [paramKey]: item.slug,
    }));
}
