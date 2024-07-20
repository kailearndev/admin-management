import * as Yup from 'yup'

export const updateUserValidate = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),

    dateOfBirth: Yup.string().required(),

    helloPicture: Yup.string().required(),

    gender: Yup.number().required(),

    nationality: Yup.string().required(),

    profilePicture: Yup.string().required(),


})
