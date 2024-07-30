import * as Yup from 'yup'

export const createActivitiesValidate = Yup.object().shape({
    title: Yup.string().required(),
    content: Yup.string().required(),
    description: Yup.string().required(),
    imageArticle: Yup.string().required(),
    imageHeaderUpdate: Yup.array()
    .of(Yup.string().required('File ID is required'))
    .min(1, 'At least one file ID is required')
    .required('File IDs are required'),

})
// title: "",
// content: "",
// description: "",
// isPublish: true,
// video: "",
// imageArticle: "",
// imageHeaders: [],

