import baseApis from "../baseApis";

const clubApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        clubJoinFee: builder.query({
            query: () => ({
                url: '/club-join-fee',
                method: 'GET',
            })
        }),
        clubCreate: builder.mutation({
            query: (data) => ({
                url: '/club/create',
                method: 'POST',
                body: data,
            })
        })
    })
})

export const { useClubJoinFeeQuery, useClubCreateMutation } = clubApis