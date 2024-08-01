import { useFormik } from 'formik';
import React, { ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ActivitiesService } from '../../api/activities';
import { UserService } from '../../api/user-service';
import { ActivitiesUpdate, ActivitiesValue } from './type';
import { createActivitiesValidate } from './validate';
import { useLoading } from '../../components/LoadingContext';


const Create = () => {
    const { setLoading } = useLoading();

    const navigate = useNavigate()
    const fileInputVideo = React.useRef<HTMLInputElement>(null);
    const fileImageArticle = React.useRef<HTMLInputElement>(null);
    const fileImageHeader = React.useRef<HTMLInputElement>(null);
    const handleFileInputVideo = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileUpload = e.target.files[0];
            setLoading(true)
            let res: any = await UserService.uploadFile(fileUpload as File)
            if (res?.statusCode === 200) {
                formik.setFieldValue('video', res?.data)
                toast.success('Upload success !!')
            }
            if (res?.statusCode === 400) {

                toast.error('Upload failed !!')
            }
            setLoading(false)
        }
    };
    const handleFileImageArticle = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileUpload = e.target.files[0];
            setLoading(true)
            let res: any = await UserService.uploadFile(fileUpload as File)
            if (res?.statusCode === 200) {
                formik.setFieldValue('imageArticle', res?.data)
                toast.success('Upload success !!')
            }
            if (res?.statusCode === 400) {

                toast.error('Upload failed !!')
            }
            setLoading(false)
        }
    };
    const handleFileImageHeader = async (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files[0]) {
            const fileUpload = e.target.files[0];
            setLoading(true)
            let res: any = await UserService.uploadFile(fileUpload as File);
            if (res?.statusCode === 200) {
                const currentImages = formik.values.imageHeaderUpdate || [];
                formik.setFieldValue('imageHeaders', [
                    ...formik.values.imageHeaders,
                    {
                        fileId: res.data,
                        url: '',
                        fileName: fileUpload.name,
                        contentType: fileUpload.type,
                    },
                ]);
                formik.setFieldValue('imageHeaderUpdate', [...currentImages, res?.data]);
                toast.success('Upload success !!');
            }
            if (res?.statusCode === 400) {

                toast.error('Upload failed !!')
            }
            setLoading(false)
        }
    };

    const handleCreatePost = async (values: ActivitiesValue) => {
        setLoading(true)
        let res = await ActivitiesService.createActivities({
            title: values.title,
            content: values.content,
            description: values.description,
            isPublish: true,
            imageArticle: values.imageArticle,
            imageHeaders: values?.imageHeaderUpdate as any,
            video: values.video
        })

        if (res) {
            toast.success('Create success !!')
            navigate('..', {
                relative: 'path'
            })
        }
        else {
            toast.error('Create failed !!')

        }
        setLoading(false)

    }
    const handleRemoveFile = (fileId: string) => {
        formik.setFieldValue(
            'imageHeaders',
            formik.values.imageHeaders.filter(item => item.fileId !== fileId)
        );
        formik.setFieldValue(
            'imageHeaderUpdate',
            formik.values.imageHeaderUpdate.filter(id => id !== fileId)
        );

        if (fileImageHeader.current) {
            fileImageHeader.current.value = '';
        }
    };


    const formik = useFormik({
        initialValues: ActivitiesUpdate,
        onSubmit: handleCreatePost,
        validationSchema: createActivitiesValidate
    })


    return (
        <>
            <div className='flex justify-end gap-2'>
            <button onClick={() => navigate('..', {
                    relative: 'path'
                })} className='btn '>Discard Changes</button>
                <button disabled={!!Object.keys(formik.errors).length || !formik.dirty} onClick={() => formik.handleSubmit()} className='btn btn-primary'>Save</button>
            </div>


            <div className='grid xl:grid-cols-2 gap-4' >
                <div className='flex flex-col gap-3 col-span-2' >
                    <label className='font-semibold'> Tittle </label>
                    < input onChange={formik.handleChange} value={formik.values.title} name='title' type="text" placeholder="Type here"


                        className={`input input-bordered w-full ${formik.errors.title ? 'input-error' : ''}`} />
                </div>
                < div className='flex flex-col gap-3' >
                    <label className='font-semibold' > Description </label>
                    < textarea rows={5} placeholder="Type here"


                        className={`textarea textarea-bordered w-full ${formik.errors.description ? 'textarea-error' : ''}`}

                        onChange={formik.handleChange} value={formik.values.description} name='description' />
                </div>
                < div className='flex flex-col gap-3' >
                    <label className='font-semibold' > Image Article </label>
                    {formik.values.imageArticle && <button className="btn">
                        {`${formik.values.imageArticle.substring(0, 30)}...`}

                        <svg
                            onClick={() => {
                                if (fileImageArticle.current) {
                                    fileImageArticle.current.value = ''
                                }

                                formik.setFieldValue('imageArticle', '')
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </button>}
                    <label className="form-control w-full max-w-xs" >
                        <input type="file"
                            className={`file-input file-input-bordered  w-full max-w-xs ${formik.errors.imageArticle ? 'file-input-error' : ''}`}


                            ref={fileImageArticle}
                            accept="image/png,image/jpeg"
                            onChange={handleFileImageArticle} />
                    </label>
                </div>

                < div className='flex flex-col gap-3' >
                    <label className='font-semibold' > Content </label>
                    < textarea rows={5} placeholder="Type here"

                        className={`textarea textarea-bordered w-full ${formik.errors.content ? 'textarea-error' : ''}`}

                        onChange={formik.handleChange} value={formik.values.content} name='content' />
                </div>

                < div className='flex flex-col gap-2' >
                    <label className='font-semibold'> Image Header </label>
                    <div className='grid grid-cols-1 gap-2'>
                        {formik.values.imageHeaders.map((item) =>
                            <button key={item.fileId} className="btn">
                                {`${item.fileName.substring(0, 20)}...`}

                                <svg
                                    onClick={() => handleRemoveFile(item.fileId)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>

                            </button>
                        )}

                    </div>
                    <label className="form-control w-full max-w-xs" >
                        <input readOnly type="file"

                            className={`file-input file-input-bordered  w-full max-w-xs ${formik.errors.imageHeaderUpdate ? 'file-input-error' : ''}`}

                            ref={fileImageHeader}
                            accept="image/png,image/jpeg"
                            onChange={handleFileImageHeader} />
                    </label>
                </div>

                < div className='flex flex-col gap-3' >
                    <label className='font-semibold' > Video URL </label>
                    {formik.values?.video && <button className="btn">
                        {formik.values?.video?.substring(0, 20)}...

                        <svg
                            onClick={() => {
                                if (fileInputVideo.current) {
                                    fileInputVideo.current.value = ''
                                }
                                formik.setFieldValue('video', '')
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </button>}
                    <input type="file" className="file-input file-input-bordered w-full "
                        ref={fileInputVideo}
                        accept="video/mp4,video/quicktime"
                        onChange={handleFileInputVideo} />
                </div>

            </div>


        </>
    );
};

export default Create;
