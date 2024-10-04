import { jsonConfig } from "../utils/apiUtils"
import apiClient from "../utils/axios"

export const fetchManagers = async () => {
    return apiClient.get('/user/fetch-managers')
}

export const addTask = async (form: FormData) => {
    return apiClient.post('/task/add-task', form, jsonConfig)
}

export const editTask = async (form: FormData, id: string) => {
    return apiClient.put(`/task/edit-task/${id}`, form, jsonConfig)
}

export const deleteTask = async (id: string) => {
    return apiClient.delete(`/task/delete-task/${id}`)
}