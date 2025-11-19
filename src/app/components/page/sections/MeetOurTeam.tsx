'use client'
import { ICONS, IMAGE } from '@/app/constant/index.image';
import { Card, Modal } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import SectionHeaderText from '../../status-banner/SectionHeaderText';
import { useGetTeamQuery } from '@/app/store/service/teamApis';
import { imageUrl } from '@/app/utils/imageUtils';
import SEO from '../../seo/SEO';

interface teamTypes {
    _id: string;
    name: string;
    position: string;
    profile_image: string;
    data: any
}

function MeetOurTeam() {
    const { data: teamData, isLoading } = useGetTeamQuery({ limit: 999 })

    if (isLoading) {
        return (
            <div className="grid max-w-7xl px-2 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index} loading />
                ))}
            </div>
        )
    }
    return (
        <div className='max-w-7xl px-2 mx-auto'>
            <SectionHeaderText
                title='Meet Our Team'
                description='Our dedicated team works tirelessly to ignite the potential of every young athlete. Get to know the people making it all possible.'
                className='my-12'
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamData?.map((item: teamTypes, index: number) => (
                    <TeamMember key={index} {...item} data={item} />
                ))}
            </div>
        </div>
    )
}

export default MeetOurTeam


const TeamMember = ({ name, profile_image, position, data }: teamTypes) => {
    const [showModal, isShowModal] = useState(false)
    const [record, setRecord] = useState<{ profile_image: string, name: string, position: string }>(null)
    return (
        <>
            <div
                onClick={() => {
                    setRecord(data)
                    isShowModal(true)
                }
                }
                className='border cursor-pointer rounded-md p-2 border-gray-200 bg-white'>
                <SEO
                    title="Meet Our Team"
                    description="Meet our dedicated team working tirelessly to ignite the potential of every young athlete."
                    keywords={['join', 'network', 'elite coaching', 'competitive programming', 'providers', 'athletes', 'athletic goals', 'youth sports', 'athletics', 'sports foundation', 'youth development', 'sports programs', 'youth empowerment', 'youth leadership', 'community sports', 'sports education', 'youth fitness', 'youth mentoring', 'sports coaching', 'youth tournaments', 'sports scholarships', 'youth wellness', 'team', 'athletes', 'athletic goals', 'youth sports', 'athletics', 'sports foundation', 'youth development', 'sports programs', 'youth empowerment', 'youth leadership', 'community sports', 'sports education', 'youth fitness', 'youth mentoring', 'sports coaching', 'youth tournaments', 'sports scholarships', 'youth wellness']}
                    ogImage="/assets/image/about-us.png"
                    article={{
                        authors: ['IGNITE Foundation'],
                        tags: ['youth sports', 'athletics', 'sports foundation', 'youth development', 'sports programs', 'youth empowerment', 'youth leadership', 'community sports', 'sports education', 'youth fitness', 'youth mentoring', 'sports coaching', 'youth tournaments', 'sports scholarships', 'youth wellness']
                    }}
                />
                <div className='w-full h-auto rounded-md overflow-hidden aspect-square'>
                    <Image
                        src={imageUrl({ image: profile_image })}
                        alt={`${name} Image`}
                        width={400}
                        height={400}
                        className='w-full h-full object-center object-contain md:object-cover'
                    />
                </div>
                <div className='p-2'>
                    <h2 className='text-xl font-semibold mt-4 line-clamp-1'>{name}</h2>
                    <p className='text-sm font-medium text-[#6B7280] line-clamp-1'>{position}</p>
                </div>
            </div>

            <Modal
                open={showModal}
                footer={null}
                onCancel={() => isShowModal(false)}
                centered
            >
                <div className='w-full h-auto rounded-md overflow-hidden aspect-square'>
                    <Image
                        src={imageUrl({ image: record?.profile_image })}
                        alt={`${name} Image`}
                        width={400}
                        height={400}
                        className='w-full h-full object-center object-contain md:object-cover'
                    />
                </div>
                <div className='p-2'>
                    <h2 className='text-xl font-semibold mt-4'>{name}</h2>
                    <p className='text-sm font-medium text-[#6B7280]'>{position}</p>
                </div>
            </Modal>
        </>
    )
}