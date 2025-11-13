import React from 'react'
import SectionHeaderText from '../../status-banner/SectionHeaderText'
import { ICONS } from '@/app/constant/index.image'
import SEO from '../../seo/SEO'

function BeTheSpark() {
    return (
        <div className='container mx-auto px-4 bg-[#F5F7FA] flex items-center justify-center flex-col gap-4'>
            <SEO
                title="Be The Spark"
                description="Here's our story - a short film showing how IGNITE is working to remove the financial barriers that are keeping so many talented American youth athletes from achieving their athletic goals"
                keywords={['youth sports', 'athletics', 'sports foundation', 'youth development', 'sports programs', 'youth empowerment', 'youth leadership', 'community sports', 'sports education', 'youth fitness', 'youth mentoring', 'sports coaching', 'youth tournaments', 'sports scholarships', 'youth wellness']}
                ogImage="/assets/video/kid_playing.mp4"
                article={{
                    authors: ['IGNITE Foundation'],
                    tags: ['youth sports', 'athletics', 'sports foundation', 'youth development', 'sports programs', 'youth empowerment', 'youth leadership', 'community sports', 'sports education', 'youth fitness', 'youth mentoring', 'sports coaching', 'youth tournaments', 'sports scholarships', 'youth wellness']
                }}
            />
            <SectionHeaderText
                title="Be The Spark"
                description={`Here's our story - a short film showing how IGNITE is working to remove the financial barriers that are keeping so many talented American youth athletes from achieving their athletic goals`}
                icon={ICONS.fire} />
            <div className='h-auto shadow-lg max-w-screen-lg aspect-video mx-auto rounded-2xl overflow-hidden'>
                <video src="https://d1m86avknwgx1f.cloudfront.net/videos/Ignite+Video+(1).mp4" controls autoPlay muted loop className='w-full h-full  object-fill'></video>
            </div>
        </div>
    )
}

export default BeTheSpark