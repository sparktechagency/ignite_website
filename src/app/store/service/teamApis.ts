import baseApis from "../baseApis";

const teamApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getTeam: builder.query({
            query: () => ({
                url: '/member/get-all',
                method: 'GET',
            }),
            transformResponse: (response: any) => response?.data?.result?.reverse(),
            providesTags: ['team']
        })
    })
})

export const { useGetTeamQuery } = teamApis