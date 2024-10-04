import axios, { AxiosError } from "axios";


const BASE_URL = 'http://localhost:5500'


const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

apiClient.interceptors.request.use((config: any) => {

    const token = localStorage.getItem('WorkNestToken');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config
},
    (error: AxiosError) => {

        return Promise.reject(error)
    }

)

apiClient.interceptors.response.use((response: any) => {

    return response
},
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

export default apiClient

