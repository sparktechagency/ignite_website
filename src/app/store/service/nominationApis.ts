import baseApis from "../baseApis";

const nominationApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        createNomination: builder.mutation({
            query: (data) => ({
                url: '/nomination/create',
                method: 'POST',
                body: data,
            }),
        })
    })
})

export const { useCreateNominationMutation } = nominationApis