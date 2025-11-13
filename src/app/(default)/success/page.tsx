'use client'
import React from 'react'
import { ICONS } from '@/app/constant/index.image'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PaymentSuccess() {
    const searchParams = useSearchParams()
    const paymentType = searchParams.get('paymentType')
    const router = useRouter()

    // Define message content dynamically
    const message = (() => {
        switch (paymentType) {
            case 'club':
                return {
                    icon: ICONS.success,
                    title: 'You’ve Successfully Joined the Club!',
                    subtitle:
                        'Congratulations and welcome to the IGNITE family! Your payment has been received successfully, and your club membership is now confirmed. Our team will review your details and reach out shortly with further updates. Thank you for supporting our mission to empower young athletes through sports!',
                    buttonLabel: 'Go to Home',
                    redirect: '/',
                }
            case 'donation':
                return {
                    icon: ICONS.success,
                    title: 'Payment Successful — Thank You for Your Generous Donation!',
                    subtitle:
                        'Your donation has been received successfully. Your contribution directly supports IGNITE’s mission to empower young athletes and create opportunities through sports. A confirmation email with your payment details has been sent to your inbox.',
                    buttonLabel: 'Go to Home',
                    redirect: '/',
                }
            default:
                return {
                    icon: ICONS.multiply,
                    title: 'Invalid or Missing Payment Information',
                    subtitle:
                        'It seems there’s an issue with your payment details. Please try again or contact support.',
                    buttonLabel: 'Return to Home',
                    redirect: '/',
                }
        }
    })()

    return (
        <SuccessLayout>
            <div className="z-[777] bg-white p-3 rounded-md shadow inset-shadow-2xs border border-gray-300 relative max-w-screen-md mx-auto flex flex-col items-center justify-center gap-4 text-center px-4">
                <Image
                    src={message.icon}
                    alt="Payment success"
                    width={100}
                    height={100}
                    className="w-20 h-20 mb-4"
                />

                <h1 className="text-3xl font-semibold text-gray-800">
                    {message.title}
                </h1>

                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl">
                    {message.subtitle}
                </p>

                <button
                    onClick={() => router.push(message.redirect)}
                    className={cn(
                        'bg-gradient-to-r from-[#BF0A30] to-[#003F91] text-white px-8 py-3 rounded-lg text-lg mt-6 font-medium transition-all hover:scale-105 hover:shadow-lg'
                    )}
                >
                    {message.buttonLabel}
                </button>
            </div>
        </SuccessLayout>
    )
}

function SuccessLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-[calc(100vh-64px)] overflow-hidden w-full bg-white relative flex items-center justify-center">
            <div
                className="absolute inset-0 z-0 "
                style={{
                    backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 20%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 80% 80%, rgba(59,130,246,0.3), transparent)
      `,
                    backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
                }}
            />
            {children}
        </div>
    )
}
