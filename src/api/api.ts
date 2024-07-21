import axios from 'axios'


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
    (response: any) => {
        return response.data
    },
    (reject) => {
        if (reject?.response?.status === 403 || reject?.response?.status === 401) {

            localStorage.removeItem('token')
            window.location.href = '/login'

        }



        return Promise.reject(reject)
    }
)

export default http