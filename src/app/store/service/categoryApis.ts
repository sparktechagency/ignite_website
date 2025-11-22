import baseApis from "../baseApis";

const categoryApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: (params) => ({
                url: '/category/get-all',
                method: 'GET',
                params
            }),
        })
    })
})

export const { useGetCategoryQuery } = categoryApis