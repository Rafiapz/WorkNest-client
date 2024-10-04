import * as Yup from 'yup'

export const loginSchema = Yup.object({
    email: Yup.string().trim().email('Invalid email address').required('This field is required'),
    password: Yup.string().trim().min(6, 'Password must be at least 6 characters long').required('This field is required'),
});
