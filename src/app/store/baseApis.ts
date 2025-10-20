
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { url } from '../utils/imageUtils';
const baseApis = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl:url,
        prepareHeaders: (headers) => {
            const token = Cookies.get('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['team'],
    endpoints: () => ({}),
});

export default baseApis;
