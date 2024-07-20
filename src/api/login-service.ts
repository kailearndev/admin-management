import axios from "axios"
import { LoginState } from "../pages/Auth/type"

const login = async (body: LoginState) => {
    try {
        let res = await axios.post('https://demo.kaidev.site/api/account/login', body)
        return res.data
    } catch (error) {

    }
}
export const LoginService = {
    login
}