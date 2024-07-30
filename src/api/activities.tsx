import http from "./api"

const getActivitiesDetail = async (id: string | undefined) => {
    try {
        let res = await http.get(`admin/post/${id}`)
        return res.data
    } catch (error) {

    }

}
const createActivities = async (body: {
   
    title: string,
    content: string,
    description: string,
    isPublish: true,
    video?: string,
    imageArticle: string,
    imageHeaders: string[],
}) => {
    try {
        let res = await http.post(`admin/post/`, body)
        return res.data
    } catch (error) {

    }

}

export const fetchActivities = async (filter: Object) => {
    const response = await http
      .get('admin/posts',{params: filter})
      
      
  
    return response.data;
  };
const updateActivities = async (id: string | undefined, body: {
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
    updateActivities,
    fetchActivities
}