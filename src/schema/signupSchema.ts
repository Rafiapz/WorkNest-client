import * as Yup from 'yup'

export const signupSchema = Yup.object({
    email: Yup.string().trim().email('Invalid email address').required('This field is required'),
    fullName: Yup.string().trim().min(3, 'Name must be atleast 3 letters').required('This field is required'),
    password: Yup.string().trim().min(6, 'Password must be at least 6 characters long').required('This field is required'),
    confirmPassword: Yup.string().trim()
        .oneOf([Yup.ref("password")], 'Passwords must match').required('This field is required'),
    role: Yup.string().oneOf(['employee', 'manager'], 'You must select a role').required('This field is required'),

});
