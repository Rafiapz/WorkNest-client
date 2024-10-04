import * as Yup from 'yup'

export const taskSchema = Yup.object({
    title: Yup.string().trim().min(3, 'Title must be atleast 3 letters').required('Task Name is required'),
    assignedTo: Yup.array().min(1, 'At least one employee must be selected'),
    description: Yup.string().trim().min(6, 'Description must be atleast 6 letters').required('Description is required'),

});