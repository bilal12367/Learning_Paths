import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const url = "http://localhost:5000/file"


const FileApi = createApi({
    reducerPath: 'file_api',
    baseQuery: fetchBaseQuery({ baseUrl: url, credentials: 'include' }),
    endpoints: (builder) => ({
        getImage: builder.query({
            query: (id: string) => ({
                url: `image/${id}`,
                responseHandler: async (resp) => resp
            }),

            keepUnusedDataFor: 60 * 60
        }),
        uploadFile: builder.mutation<IFile[], FormData>({
            query: (fileData: FormData) => ({
                url: '/upload',
                method: 'POST',
                body: fileData
            })
        }),
        deleteImage: builder.mutation<String, String>({
            query: (imageId: string) => ({
                url: `/image/${imageId}`,
                method: 'DELETE'
            }),
        })
    })
})

export const { useGetImageQuery, useUploadFileMutation, useDeleteImageMutation } = FileApi
export default FileApi