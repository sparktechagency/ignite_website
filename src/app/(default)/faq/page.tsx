'use client';
import React from 'react';
import PageTopBanner from '@/app/components/status-banner/PageTopBanner';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { useFaqQuery } from '@/app/store/service/manageApis';

function FaQ() {
    const { data:faqData, isLoading } = useFaqQuery(undefined)
    if (isLoading) return <div>Loading...</div>


    return (
        <div className="min-h-screen">
            <PageTopBanner
                title="Frequently asked questions"
                description="Learn about how IGNITE is fueling the dreams of young athletes"
            />
            <div className='container mx-auto'>
                <h1 className='text-3xl mt-6 font-bold text-[#022C22] mb-6'>Frequently asked questions</h1>
                {faqData?.data?.length > 0 ? (
                    <div className="">
                        <Accordion
                            className="rounded-lg p-0"
                            type="single"
                            collapsible
                            defaultValue="item-1"
                        >
                            {faqData?.data?.map(
                                (
                                    item: { question: string; answer: string, _id: string },
                                    index: number
                                ) => (
                                    <AccordionItem value={`item-${index + 1}`} key={item?._id}>
                                        <AccordionTrigger className="font-poppins py-3 font-medium text-lg md:text-xl text-[#000] transition-all ease-in-out duration-300">
                                            {item?.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-[#6B7280] leading-relaxed  py-3 text-base md:text-base">
                                            {item?.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                )
                            )}
                        </Accordion>
                    </div>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
}

export default FaQ;
