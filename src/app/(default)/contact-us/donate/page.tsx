import SectionLayout from '@/app/components/component-layout/SectionLayout'
import SupportAthletForm from '@/app/components/page/support-athlet-form/SupportAthletForm'
import PageTopBanner from '@/app/components/status-banner/PageTopBanner'
import React from 'react'

function page() {
    return (
        <div>
            <PageTopBanner title="Support Young Athletes" description="Help talented youth access elite coaching and competitive programs. Every contribution ignites their potential." />
            <SectionLayout className='md:my-28 my-16 p-3 rounded-2xl'>
                <SupportAthletForm />
            </SectionLayout>
        </div>
    )
}

export default page