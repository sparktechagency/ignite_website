import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { ICONS } from "@/app/constant/index.image";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

const stats = [
    {
        id: 1,
        title: "Our Mission",
        description:
            "Breaking down the financial barriers for talented kids from lower income families, to play competitive sports and have access to professional coaching.",
        iconState: true,
        image: <Image
            src={ICONS.archer}
            alt="Youth athletes participating in various sports events"
            width={50}
            height={50}
            className="w-12 h-12 leading-0 object-contain"
        />,
        className: "bg-[#7c9cc5]"
    },
    {
        id: 2,
        title: "Our Promise",
        description:
            "Every donation goes directly toward supporting athletes — empowering tomorrow’s champions.",
        iconState: false,
        className: "bg-[#28A74580]"
    },
    {
        id: 3,
        title: "What We Do",
        description:
            "We connect families, donors, clubs & academies to create real opportunities for young athletes.",
        iconState: false,
        className: "bg-[#0096C780]"
    },
    {
        id: 4,
        title: "Our Vision",
        description:
            "A world where every child can achieve their sports dreams, no matter their financial situation.",
        iconState: true,
        image: <Image
            src={ICONS.idea}
            alt="Youth athletes participating in various sports events"
            width={50}
            height={50}
            className="w-12 h-12 leading-0 object-contain"
        />,
        className: "bg-[#D6282880]"
    },
];

function WhoWeAre() {
    return (
        <section
            className="w-full bg-gray-50 py-12"
            aria-labelledby="our-impact-heading"
        >
            <div className="container mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-12 px-4 sm:px-6 lg:px-8">

                {/* Left Content */}
                <div className="flex-1 flex flex-col items-start gap-6 lg:text-left">
                    <h2
                        id="our-impact-heading"
                        className="text-3xl md:text-4xl lg:text-5xl font-optima 
            tracking-wide leading-tight font-semibold text-gray-900"
                    >
                        Who We Are
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                        At IGNITE Foundation, we break financial barriers so every child has the chance to compete, grow, and shine.
                    </p>
                    <Link href="/mission-vision" >
                        <Button
                            asChild
                            className="bg-gradient-to-r text-white from-[#BF0A30] to-[#003F91] px-6 text-lg py-6 rounded cursor-pointer hover:!bg-white hover:!text-white"
                        >
                            Learn more
                        </Button>
                    </Link>
                </div>

                {/* Right Content */}
                <div className="flex-1 columns-1 sm:columns-2 gap-6 space-y-6">
                    {stats.map((stat) => (
                        <article key={stat.id} className="break-inside-avoid">
                            <Card className={cn(stat.className)}>
                                <CardContent className="p-6 flex flex-col gap-3 h-full">
                                    {stat.iconState && (
                                        <div className="w-12 h-12">
                                            {stat.image}
                                        </div>
                                    )}

                                    <h3 className="text-lg sm:text-xl font-semibold text-[#003F91]">
                                        {stat.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-white flex-1">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhoWeAre;