import { emailPattern, passwordPattern } from '@utils/regex'
import * as yup from 'yup'

export const loginScheme = yup.object({
  email: yup
    .string()
    .email('Format Email tidak sesuai')
    .matches(emailPattern, 'Format Email tidak sesuai')
    .required('Email harus di isi'),
  password: yup.string().required('Password harus diisi'),
})

export const registerScheme = yup.object({
  name: yup.string().min(3, 'Name minimal 3 karakter').required('Name harus diisi'),
  email: yup
    .string()
    .email('Format Email tidak sesuai')
    .matches(emailPattern, 'Format Email tidak sesuai')
    .required('Email harus diisi'),
  password: yup.string().matches(passwordPattern, 'Password tidak sesuai').required('Password harus diisi'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password tidak sama')
    .required('Confirm Password harus diisi'),
})
