import React from 'react'
import Image from 'next/image'
import PageTopBanner from '@/app/components/status-banner/PageTopBanner'
import MeetOurTeam from '@/app/components/page/sections/MeetOurTeam'
import { IMAGE } from '@/app/constant/index.image'
import Link from 'next/link'
import { generatePageMetadata } from '@/app/lib/page-utils'
import { Metadata } from 'next'

export const metadata: Metadata = generatePageMetadata({
    title: 'About Us | IGNITE Foundation - Empowering Young Athletes',
    description: 'Discover the story behind IGNITE Foundation and our mission to support young athletes through sports, education, and community development programs. Learn about our values, team, and impact.',
    path: '/about-us',
    keywords: [
        'youth sports foundation',
        'athlete development programs',
        'youth empowerment through sports',
        'community sports initiatives',
        'sports education for youth',
        'nonprofit youth organization',
        'youth sports opportunities',
        'athletic scholarships',
        'youth mentorship programs',
        'sports and education'
    ],
    image: {
        url: '/images/og-about.jpg',
        alt: 'IGNITE Foundation Team - Committed to Youth Development',
        width: 1200,
        height: 630
    },
});

function Page() {
    return (
        <div className="min-h-screen">
            <PageTopBanner
                title="About Us"
                description="The support that our young athletes need the most – breaking barriers and fueling dreams."
            />

            <section className="py-8 md:py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                        <div className="flex-1 w-full">
                            <div className="relative max-w-lg mx-auto lg:max-w-none">
                                <Image
                                    src={IMAGE.aboutUsImage.src}
                                    alt="About IGNITE Foundation"
                                    width={IMAGE.aboutUsImage.width}
                                    height={IMAGE.aboutUsImage.height}
                                    priority
                                    className="w-full h-auto rounded-2xl transition-transform duration-500 hover:scale-[1.02]"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                />

                                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10 hidden md:block animate-pulse"></div>
                                <div className="absolute -top-4 -left-4 w-16 h-16 bg-secondary/10 rounded-full -z-10 hidden md:block animate-pulse"></div>
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <div className="max-w-lg mx-auto lg:max-w-none space-y-5 md:space-y-6">
                                <span className="inline-block text-primary font-semibold text-sm md:text-base uppercase tracking-wide">
                                    Why support the IGNITE Foundation?
                                </span>

                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                    Breaking Barriers. Unlocking Potential. Igniting Futures.
                                </h1>

                                <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
                                    <p>
                                        At IGNITE Foundation, we believe every child deserves the chance to chase their athletic dreams — regardless of financial background. Too many young athletes in the United States are held back by the rising costs of “pay-to-play” sports programs, clubs, and academies. We’re here to change that.
                                    </p>

                                    <p>
                                        By providing funding, mentorship, and access to professional training, IGNITE empowers talented but underprivileged youth to reach their full potential — on the field, in the gym, and in life.
                                    </p>

                                    <div className="space-y-2">
                                        <h2 className="text-primary text-lg md:text-xl font-semibold">Our Mission:</h2>
                                        <p>
                                            To break down financial barriers in youth sports by supporting deserving athletes with funding, mentorship, and resources — helping them access professional coaching and competitive opportunities they deserve.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <h2 className="text-primary text-lg md:text-xl font-semibold">Our Vision:</h2>
                                        <p>
                                            To create a future where talent, not financial status, determines opportunity — building a nationwide movement that empowers children, strengthens families, and unites communities through sport.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 md:pt-6">
                                    <Link
                                        href="/donate"
                                    >
                                        <button className="bg-gradient-to-r cursor-pointer from-[#BF0A30] to-[#003F91] text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 hover:scale-[1.03] shadow-md hover:shadow-xl">
                                            Donate Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <MeetOurTeam />
        </div>
    )
}

export default Page