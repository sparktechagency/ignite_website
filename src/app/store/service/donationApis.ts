import baseApis from "../baseApis";

const donationApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        createDonation: builder.mutation({
            query: (data) => ({
                url: '/donation/create',
                method: 'POST',
                body: data,
            }),
        })
    })
})
export const { useCreateDonationMutation } = donationApis