import axios, { AxiosError, AxiosResponse } from 'axios'
import toast from 'react-hot-toast'


const http = axios.create({
    baseURL: 'https://demo.kaidev.site/api/',

    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

http.interceptors.request.use(
    function (config) {

        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')

        return config
    },
    function (error) {


        return Promise.reject(error?.message)
    }
)

http.interceptors.response.use(
    (response: AxiosResponse) => {

        return response.data;

    },
    (error: AxiosError): Promise<AxiosError> => {
        const statusCode = error.request?.status;
        console.log(statusCode);

        if (statusCode === 403 || statusCode === 401) {
            toast.error('Login expired');
            setTimeout(() => {
                localStorage.removeItem('token');
                location.href = '/login';
            }, 1000);
        }




        return Promise.reject(error)
    }
)

export default http