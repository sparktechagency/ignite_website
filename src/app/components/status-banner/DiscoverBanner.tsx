import React from 'react'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { IMAGE } from '@/app/constant/index.image'
import { cn } from '@/lib/utils'

function DiscoverBanner({ title, description, listbutton, buttonText, route ,className}: { title: string, description: string, listbutton: boolean, buttonText: string, route: string ,className?: string}) {
    return (
        <div
            className={cn(
                "container relative bg-gradient-to-r from-[#BF0A30] to-[#003F91] md:p-16 p-8 rounded-4xl w-full overflow-hidden  mx-auto h-fit mb-28 flex items-center md:flex-row flex-col  justify-center md:justify-between",
                className
            )}>
            <div className="absolute pointer-events-none inset-0">
                <Image src={IMAGE.discoverBannerImage.src} alt={title} fill className='object-cover' />
            </div>
            <div className='flex flex-col w-full gap-4'>
                <h1
                    className="font-medium text-white text-2xl lg:text-4xl xl:text-5xl tracking-normal">{title}</h1>
                <p className="text-white text-lg lg:text-xl xl:text-2xl">{description}</p>
            </div>
            <div className='flex md:items-center md:justify-center w-full mt-3 md:mt-0 flex-col md:flex-row gap-4 md:gap-6'>
                {listbutton &&
                    <Link
                        href={route}
                    >
                        <Button
                            className='border border-white bg-transparent md:px-6 px-4 text-lg md:py-6 py-4 rounded cursor-pointer hover:!text-white'>
                            <ArrowUpRight /> {buttonText}
                        </Button>
                    </Link>}
            </div>
        </div>
    )
}

export default DiscoverBanner