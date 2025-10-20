
'use client'
import SectionLayout from '@/app/components/component-layout/SectionLayout'
import PageTopBanner from '@/app/components/status-banner/PageTopBanner'
import { usePrivacyPolicyQuery } from '@/app/store/service/manageApis'
import { Card } from 'antd'

import React from 'react'

function page() {
    const { data, isLoading } = usePrivacyPolicyQuery(undefined)
    
    return (
        <>
            <PageTopBanner
                title="Privacy Policy"
                description="Protecting families and athletes — your trust is our priority."
            />
            <SectionLayout className='mt-12 min-h-[50vh]'>
                {isLoading ? <Card loading /> : <div
                    style={{ fontFamily: 'sans-serif' }}
                    dangerouslySetInnerHTML={{
                        __html: data?.data?.description || ''
                    }} />}
            </SectionLayout>
        </>
    )
}

export default page