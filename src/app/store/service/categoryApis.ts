import baseApis from "../baseApis";

const categoryApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => ({
                url: '/category/get-all',
                method: 'GET',
            }),
        })
    })
})

export const { useGetCategoryQuery } = categoryApis