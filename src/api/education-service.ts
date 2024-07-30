import http from "./api"

const getEducation = async (filter: Object) => {
    try {
        let res = await http.get('admin/education/me', {
            params: filter
        })
        return res.data
    } catch (error) {

    }

}
const getEducationDetail = async (id: string ) => {
    try {
        let res = await http.get(`admin/education/${id}`)
        return res.data
    } catch (error) {

    }

}
const updateEducations = async (id?: string | number, body?: {
    id: string,
    bio: string,
    description: string,
    educations: [{
        universityName: string
        universityDate: string
        universityPara: string
        order: number
    }],
    experiences: [{
        dates: string
        type: string
        position: string
        bullets: string
        order: number
    }],
    degrees: [{
        name: string
        fileId: string
        description: string
        order: number
    }],
    isActive: true,

}) => {
    try {
        let res = await http.put(`admin/education/${id}`, body)
        return res
    } catch (error) {

    }
}
// }
// const uploadFile = async (file: File) => {
//     let formData = new FormData()
//     formData.append('file', file);
//     try {
//         let res = await http.post(`file/upload`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         })
//         return res
//     } catch (error) {

//     }

// }
export const EducationService = {
    getEducation,
    updateEducations,
    getEducationDetail
}