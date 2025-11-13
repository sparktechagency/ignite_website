import PaymentSuccess from '@/app/components/page/succsess-page/PaymentSuccess'
import React, { Suspense } from 'react'

function page() {
    return (
        <Suspense fallback={<h1>...loading</h1>}>
            <PaymentSuccess />
        </Suspense>
    )
}

export default page