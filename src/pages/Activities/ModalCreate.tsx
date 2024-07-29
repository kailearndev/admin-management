import { useFormik } from 'formik';
import React, { ChangeEvent } from 'react';
import { Button, Modal } from 'react-daisyui';
import { ActivitiesState, ActivitiesValue } from './type';
import { UserService } from '../../api/user-service';
import toast from 'react-hot-toast';
import { ActivitiesService } from '../../api/activities';

interface ModalCreateProps {


    isOpen: boolean;
    onClose: () => void;
}

const ModalCreate: React.FC<ModalCreateProps> = ({ isOpen, onClose }) => {



    const fileInputVideo = React.useRef<HTMLInputElement>(null);
    const fileImageArticle = React.useRef<HTMLInputElement>(null);
    const fileImageHeader = React.useRef<HTMLInputElement>(null);

    const handleFileInputVideo = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileUpload = e.target.files[0];
            let res: any = await UserService.uploadFile(fileUpload as File)
            if (res?.statusCode === 200) {
                formik.setFieldValue('video', res?.data)
                toast.success('Upload success !!')
            }
        }
    };
    const handleFileImageArticle = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileUpload = e.target.files[0];
            let res: any = await UserService.uploadFile(fileUpload as File)
            if (res?.statusCode === 200) {
                formik.setFieldValue('imageArticle', res?.data)
                toast.success('Upload success !!')
            }
        }
    };
    const handleFileImageHeader = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileUpload = e.target.files[0];
            let res: any = await UserService.uploadFile(fileUpload as File);
            if (res?.statusCode === 200) {

                formik.setFieldValue('imageHeaders', [...formik.values.imageHeaders, res?.data]);
                toast.success('Upload success !!');
            }
        }
    };
    const handleCreatePost = async (values: ActivitiesValue) => {
        let res = await ActivitiesService.createActivities(values)
        if (res) {
            onClose && onClose()
        }


    }
    const formik = useFormik({
        initialValues: ActivitiesState,
        onSubmit: handleCreatePost
    })


    return (
        <>

            {isOpen && (
                <Modal open={isOpen} backdrop className='w-11/12 max-w-5xl'>
                    <Modal.Header className='font-medium text-3xl' >
                        Activities Edit
                    </Modal.Header>
                    < Modal.Body >
                        <div className='grid xl:grid-cols-2 gap-4' >
                            <div className='flex flex-col gap-3' >
                                <label className='font-semibold' > Tittle </label>
                                < input onChange={formik.handleChange} value={formik.values.title} name='title' type="text" placeholder="Type here" className="input input-bordered w-full" />
                            </div>
                            < div className='flex flex-col gap-3' >
                                <label className='font-semibold' > Content </label>
                                < input type="text" placeholder="Type here" className="input input-bordered w-full" onChange={formik.handleChange} value={formik.values.content} name='content' />
                            </div>
                            < div className='flex flex-col gap-3' >
                                <label className='font-semibold' > Description </label>
                                < textarea rows={3} placeholder="Type here" className="textarea textarea-bordered" onChange={formik.handleChange} value={formik.values.description} name='description' />
                            </div>
                            < div className='flex flex-col gap-3' >
                                <label className='font-semibold' > Image Header </label>
                                < input name='imageArticleUrl'
                                    value={formik.values.imageHeaders?.join(',')} type="text"
                                    placeholder="Type here" className="input input-bordered w-full"

                                />
                                <label className="form-control w-full max-w-xs" >
                                    <input readOnly type="file" className="file-input file-input-bordered w-full max-w-xs"
                                        ref={fileImageHeader}
                                        onChange={handleFileImageHeader} />
                                </label>
                            </div>
                            < div className='flex flex-col gap-3' >
                                <label className='font-semibold' > Image Article </label>
                                < input readOnly name='imageArticleUrl' value={formik.values.imageArticle} type="text" placeholder="Type here" className="input input-bordered w-full" />
                                <label className="form-control w-full max-w-xs" >
                                    <input type="file" className="file-input file-input-bordered w-full max-w-xs"
                                        ref={fileImageArticle}
                                        onChange={handleFileImageArticle} />
                                </label>
                            </div>
                            < div className='flex flex-col gap-3' >
                                <label className='font-semibold' > Video URL </label>
                                <input readOnly value={formik.values.video ? formik.values.video : '-'} type="text" placeholder="Type here" className="input input-bordered w-full" />
                                <input type="file" className="file-input file-input-bordered w-full max-w-xs"
                                    ref={fileInputVideo}
                                    onChange={handleFileInputVideo} />
                            </div>

                        </div>

                    </Modal.Body>
                    < Modal.Actions className='gap-2'>
                        <Button color='primary' onClick={() => formik.handleSubmit()}> Save </Button>
                        <Button color='neutral' onClick={onClose}> Close </Button>
                    </Modal.Actions>
                </Modal>
            )}
        </>
    );
};

export default ModalCreate;
