import baseApis from "../baseApis";

const manageApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        termsCondition: builder.query({
            query: () => ({
                url: '/terms-condition',
                method: 'GET',
            })
        }),
        privacyPolicy: builder.query({
            query: () => ({
                url: '/privacy-policy',
                method: 'GET',
            })
        }),
        faq: builder.query({
            query: () => ({
                url: '/faq/get-all',
                method: 'GET',
            })
        })
    })
})

export const { useTermsConditionQuery, usePrivacyPolicyQuery, useFaqQuery } = manageApis
