import { ActivitiesValue } from "../pages/Activities/type"
import http from "./api"

const getActivitiesDetail = async (id: string) => {
    try {
        let res = await http.get(`admin/post/${id}`)
        return res.data
    } catch (error) {

    }

}
const createActivities = async (body: ActivitiesValue) => {
    try {
        let res = await http.post(`admin/post/`, body)
        return res.data
    } catch (error) {

    }

}
const updateActivities = async (id: string, body: {
    id: string
    title: string,
    content: string,
    description: string,
    isPublish: true,
    video?: string,
    imageArticle: string,
    imageHeaders: string[],
}) => {
    try {
        let res = await http.put(`admin/post/${id}`, body)
        return res.data
    } catch (error) {

    }

}
export const ActivitiesService = {
    getActivitiesDetail,
    createActivities,
    updateActivities
}