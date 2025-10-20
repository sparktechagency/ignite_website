import baseApis from "../baseApis";

const teamApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getTeam: builder.query({
            query: () => ({
                url: '/member/get-all',
                method: 'GET',
            }),
            providesTags: ['team']
        })
    })
})

export const { useGetTeamQuery } = teamApis