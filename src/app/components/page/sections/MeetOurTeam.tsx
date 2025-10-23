'use client'
import { ICONS, IMAGE } from '@/app/constant/index.image';
import { Card } from 'antd'
import Image from 'next/image'
import React from 'react'
import SectionHeaderText from '../../status-banner/SectionHeaderText';
import { useGetTeamQuery } from '@/app/store/service/teamApis';
import { imageUrl } from '@/app/utils/imageUtils';

interface teamTypes {
    _id: string;
    name: string;
    position: string;
    profile_image: string;

}

function MeetOurTeam() {
    const { data: teamData, isLoading } = useGetTeamQuery(undefined)
    console.log(teamData)
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
                    <TeamMember key={index} {...item} />
                ))}
            </div>
        </div>
    )
}

export default MeetOurTeam


const TeamMember = ({ name, profile_image, position }: teamTypes) => {
    return (
        <div className='border rounded-md p-2 border-gray-200 bg-white'>
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
    )
}