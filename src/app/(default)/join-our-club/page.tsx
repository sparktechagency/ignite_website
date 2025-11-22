'use client'
import SectionLayout from '@/app/components/component-layout/SectionLayout'
import PageTopBanner from '@/app/components/status-banner/PageTopBanner'
import { IMAGE } from '@/app/constant/index.image'
import { useClubJoinFeeQuery } from '@/app/store/service/clubApis'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

function Page() {
    const [quantity, setQuantity] = useState(1)
    const [subscribed, setSubscribed] = useState(true)
    const { data: clubJoinFee } = useClubJoinFeeQuery(undefined)

    const router = useRouter()

    return (
        <div className="min-h-screen">
            <PageTopBanner
                title="Join our Be The Spark Club"
                description="Complete the form below to register as an academy, club, or elite coach. Your membership helps connect talented youth with coaching opportunities while supporting IGNITE’s mission."
            />

            <SectionLayout className='mt-12'>
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                    <div className="w-full md:w-1/2 space-y-5">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Join Our Be The Spark Club
                        </h1>

                        <div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-[#003F91]">
                                {!clubJoinFee?.data?.isDiscountActive ? "Price" : "Launch Price"}: ${clubJoinFee?.data?.isDiscountActive ? clubJoinFee?.data?.fee - clubJoinFee?.data?.discountAmount || 0 : clubJoinFee?.data?.fee}
                            </h3>
                            {clubJoinFee?.data?.isDiscountActive && <p className="text-gray-500 line-through text-sm">
                                Original Price: ${clubJoinFee?.data?.fee || 0}/year
                            </p>}
                        </div>

                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            <strong>Description:</strong><br />
                            Academies & Clubs, join our Be The Spark Club and become part of IGNITE’s trusted network of providers of elite coaching. We’ll connect you with young athletes registered in our database, in your region.
                        </p>

                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            Your membership puts you in the network where we will connect talented youth with coaching opportunities, while your tax-deductible subscription goes directly towards our IGNITE fund
                        </p>


                        <div>
                            <h4 className="font-semibold mb-2 text-gray-800">Frequency Options</h4>
                            <div
                                className={cn(`border rounded-lg bg-white shadow px-4 py-3 flex items-center gap-3 cursor-pointer transition`,
                                    subscribed ? 'border-[#003F91] bg-blue-50' : 'border-gray-300'
                                )}
                                onClick={() => setSubscribed(!subscribed)}
                            >
                                <input
                                    type="radio"
                                    checked={subscribed}
                                    onChange={() => setSubscribed(!subscribed)}
                                    className="accent-[#003F91] cursor-pointer"
                                />
                                <label className="text-sm sm:text-base text-gray-700">
                                    Subscribe (Every 12 months)
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                🛈 Cancellable at any time – you have the power to discontinue the service or cancel the agreement whenever you choose.
                            </p>
                        </div>


                        <div className="mt-6">
                            <h4 className="font-semibold mb-2 text-gray-800">Quantity Selector</h4>
                            <div className="flex items-center border overflow-hidden border-gray-300 rounded-md w-fit">
                                <button
                                    className="px-3 py-2 cursor-pointer bg-gray-100 text-gray-600 hover:text-[#003F91]"
                                    onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 border  text-gray-800 font-medium">{quantity}</span>
                                <button
                                    className="px-3 py-2 cursor-pointer bg-gray-100 text-gray-600 hover:text-[#003F91]"
                                    onClick={() => setQuantity(prev => prev + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>


                        <button
                            disabled={!quantity || !subscribed}
                            onClick={() => {
                                if (!quantity || !subscribed) {
                                    return
                                }
                                if (Cookies.get('clubInfo')) {
                                    Cookies.remove('clubInfo')
                                }
                                Cookies.set('clubInfo', JSON.stringify({
                                    quantity,
                                    subscribed,
                                }))
                                router.push('/join-our-club/club-details')
                            }}
                            className={cn("mt-8 cursor-pointer bg-gradient-to-r from-[#7B1113] to-[#003F91] text-white px-6 py-3 rounded font-semibold hover:opacity-90 transition", {
                                'opacity-50 cursor-not-allowed': !quantity || !subscribed
                            })}>
                            Join Now
                        </button>
                    </div>

                    <div className="w-full hidden md:flex md:w-1/2  justify-center">
                        <div className="p-2 bg-gradient-to-r from-[#BF0A30] to-[#003F91] rounded">
                            <Image
                                src={IMAGE.join.src}
                                alt="Be The Spark Club"
                                width={500}
                                height={500}
                                className="object-contain rounded"
                            />
                        </div>
                    </div>
                </div>
            </SectionLayout>
        </div>
    )
}

export default Page
