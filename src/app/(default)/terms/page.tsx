'use client'
import SectionLayout from '@/app/components/component-layout/SectionLayout'
import PageTopBanner from '@/app/components/status-banner/PageTopBanner'
import { useTermsConditionQuery } from '@/app/store/service/manageApis'
import React from 'react'

function Page() {
    const { data, isLoading } = useTermsConditionQuery(undefined)
    if (isLoading) return <div>Loading...</div>
    return (
        <div>
            <PageTopBanner
                title="Terms and Conditions"
                description="Clear guidelines to ensure fairness, transparency, and security for all."
            />
            <SectionLayout className='mt-12'>
                <div
                    style={{ fontFamily: 'sans-serif' }}
                    dangerouslySetInnerHTML={{
                        __html: data?.data?.description || ''
                    }} />
            </SectionLayout>
        </div>
    )
}

export default Page