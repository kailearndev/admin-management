import { UserType, UserUpdateType } from "../pages/User/type"
import http from "./api"

const getUser = async () => {
    try {
        let res = await http.get('admin/profile/me')
        return res.data
    } catch (error) {

    }

}
const updateUser = async (id?: string | number, body?: UserUpdateType) => {
    try {
        let res = await http.put(`admin/profile/${id}`, body)
        return res
    } catch (error) {

    }

}
const uploadFile = async (file: File) => {
    let formData = new FormData()
    formData.append('file', file);
    try {
        let res = await http.post(`file/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return res
    } catch (error) {

    }

}
export const UserService = {
    getUser,
    updateUser,
    uploadFile
}