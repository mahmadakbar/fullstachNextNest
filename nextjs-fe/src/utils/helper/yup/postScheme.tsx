import * as yup from 'yup'

export const addPostScheme = yup.object({
  title: yup.string().required('Title harus diisi'),
  content: yup.string(),
  published: yup.boolean(),
  image: yup.mixed<any>().test('fileSize', 'File size is too large max 1MB', (value: any) => {
    return !value || value.length === 0 || value?.[0]?.size <= 1048576
  }),
})
