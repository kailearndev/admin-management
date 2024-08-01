import { useFormik } from 'formik';
import React, { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Outlet, useNavigate, useOutlet, useParams } from 'react-router-dom';
import { EducationService } from '../../api/education-service';
import { UserService } from '../../api/user-service';
import { useLoading } from '../../components/LoadingContext';
import { DegreeUpdate, Education, EducationResponse, EducationUpdate, Experience } from './type';

const EducationDetail = () => {
    const outlet = useOutlet()
    return outlet ? <Outlet /> : <EducationPage />
}

const EducationPage = () => {
    const { id } = useParams()
    const [experiences, setExperience] = useState<Experience>({
        dates: '',
        bullets: '',
        order: 0,
        position: '',
        type: ''
    })
    const [education, setEducation] = useState<Education>({
        order: 0,
        universityDate: '',
        universityName: '',
        universityPara: ''
    })
    const [degree, setDegree] = useState<DegreeUpdate>({
        order: 0,
        name: '',
        fileId: '',
        description: ''

    })


    const { setLoading } = useLoading();
    const navigate = useNavigate()
    const fileInput = React.useRef<HTMLInputElement>(null);
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {

        setLoading(true)
        const result: EducationResponse = await EducationService.getEducationDetail(id as string)
        formik.setValues(result)
        const formattedData = result.degrees.map((item: any) => ({
            order: item.order,
            description: item.description,
            fileId: item.fileId,
            name: item.name
        }));
        formik.setFieldValue('degrees', formattedData)
        setLoading(false)
        return result


    }

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileUpload = e.target.files[0];

            setLoading(true)
            let res: any = await UserService.uploadFile(fileUpload as File)
          

            if (res?.statusCode === 200) {
                
                setDegree({
                    ...degree,
                    fileId: res?.data
                })
                toast.success('Upload success !!')
            }
            if (res?.statusCode === 400) {

                toast.error('Upload failed !!')
            }
            setLoading(false)
        }
    };

    const handleUploadDegree = () => {
        formik.setFieldValue('degrees', [...formik.values.degrees, {
            ...degree,
            order: formik.values.degrees.length + 1
        }])
        if (fileInput.current) {
            fileInput.current.value = ''
        }
        setDegree({
            order: 0,
            name: '',
            fileId: '',
            description: ''
        })

    }



    const handleUpdateEducation = async () => {
        setLoading(true)
        let res: any = await EducationService.updateEducations(id, {
            bio: formik.values.bio,
            degrees: formik.values.degrees as any,
            description: formik.values.description as any,
            educations: formik.values.educations as any,
            experiences: formik.values.experiences as any,
            id: formik.values.id,
            isActive: true

        })
        if (res?.statusCode === 200) {
           
            navigate('..', {
                relative: 'path'
            })
        }
        if (res?.statusCode === 400) {

            toast.error('Update failed !!')
        }
        setLoading(false)

    }
    const handleDeleteDegree = (order: number) => {
        const updated = formik.values.degrees.filter((item) => item.order !== order);
        formik.setFieldValue('degrees', updated);
    }
    const handleDeleteExperices = (order: number) => {
        const updatedExperiences = formik.values.experiences.filter((item) => item.order !== order);
        formik.setFieldValue('experiences', updatedExperiences);
    }
    const handleDeleteEducation = (order: number) => {
        const update = formik.values.educations.filter((item) => item.order !== order);
        formik.setFieldValue('educations', update);
    }
    const formik = useFormik({
        initialValues: EducationUpdate,
        onSubmit: handleUpdateEducation
    })



    return (
        <div className='flex flex-col gap-5'>
            <div className='flex justify-end gap-2'>
                <button className='btn' onClick={() => navigate('..', { relative: 'path' })}>Discard Change</button>
                <button disabled={!formik.values.degrees.length || !formik.values.educations.length || !formik.values.experiences.length || !formik.values.bio || !formik.values.description} className='btn' onClick={() => formik.handleSubmit()}>Save</button>
            </div>
            <div className="divider divider-start text-3xl">EDUCATION
            </div>
            <label className="form-control w-full ">
                <div className="title mb-3">
                    <span className="title font-bold">Bio</span>
                </div>
                <textarea name='bio' onChange={formik.handleChange} rows={4} placeholder="Type here" className="textarea textarea-bordered w-full " value={formik.values.bio} />
            </label>
            <label className="form-control w-full ">
                <div className="title mb-3">
                    <span className="title font-bold">Description</span>

                </div>
                <textarea name='description' onChange={formik.handleChange} rows={4} placeholder="Type here" className="textarea textarea-bordered w-full " value={formik.values?.description} />
            </label>
            <div className='divider' />

            <label className="form-control w-full ">
                <div className="title mb-3">
                    <span className="title font-bold">Experiences</span>

                </div>
                <div className='grid sm:grid-cols-1 lg:grid-cols-4 gap-3'>
                    <input onChange={(e) =>
                        setExperience({
                            ...experiences,
                            position: e.target.value
                        })

                    } type="text" placeholder="Postion" className="input input-bordered w-full" value={experiences.position} />
                    <input
                        onChange={(e) =>
                            setExperience({
                                ...experiences,
                                dates: e.target.value
                            })

                        }
                        type="text" placeholder="Dates" className="input input-bordered w-full" value={experiences.dates} />
                    <input
                        onChange={(e) =>
                            setExperience({
                                ...experiences,
                                bullets: e.target.value
                            })

                        }
                        type="text" placeholder="Bullets" className="input input-bordered w-full" value={experiences.bullets} />
                    <input
                        onChange={(e) =>
                            setExperience({
                                ...experiences,
                                type: e.target.value
                            })

                        }
                        type="text" placeholder="Type" className="input input-bordered w-full" value={experiences.type} />
                    <button
                        disabled={!experiences.bullets || !experiences.position || !experiences.type || !experiences.dates}
                        onClick={() => {
                            formik.setFieldValue('experiences', [...formik.values.experiences, {
                                ...experiences,
                                order: formik.values.experiences.length + 1
                            }]),
                                setExperience({
                                    order: 0,
                                    bullets: '',
                                    dates: '',
                                    position: '',
                                    type: ''

                                })
                        }} className='btn text-end w-1/2'>Add</button>
                </div>
                <table className="table table-zebra mt-5 ">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Postion</th>
                            <th>Dates</th>
                            <th>Bullets</th>
                            <th>Type</th>
                            <th>

                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {formik.values.experiences && formik.values.experiences.length > 0 ? formik.values?.experiences.map((item, idx) =>
                        (<tr key={idx}>
                            <th>{item.position}</th>
                            <td>{item.dates}</td>
                            <td>{item.bullets}</td>
                            <td>{item.type}</td>
                            <td>
                                <button onClick={() => handleDeleteExperices(item.order)} className='btn btn-error'>Delete</button>
                            </td>


                        </tr>)
                        ) : <tr>
                            <td colSpan={5} style={{ textAlign: 'center' }}>No data</td>
                        </tr>}


                    </tbody>
                </table>

            </label>

            <div className='divider' />
            <label className="form-control w-full ">
                <div className="title mb-3">
                    <span className="title font-bold">Educations</span>

                </div>
                <div className='grid sm:grid-cols-1 lg:grid-cols-4 gap-3'>
                    <input onChange={(e) =>
                        setEducation({
                            ...education,
                            universityName: e.target.value
                        })

                    } type="text" placeholder="Name" className="input input-bordered w-full" value={education.universityName} />
                    <input
                        onChange={(e) =>
                            setEducation({
                                ...education,
                                universityDate: e.target.value
                            })

                        }
                        type="text" placeholder="Dates" className="input input-bordered w-full" value={education.universityDate} />
                    <input
                        onChange={(e) =>
                            setEducation({
                                ...education,
                                universityPara: e.target.value
                            })

                        }
                        type="text" placeholder="Content" className="input input-bordered w-full" value={education.universityPara} />

                    <button disabled={!education.universityDate || !education.universityName || !education.universityPara} onClick={() => {
                        formik.setFieldValue('educations', [...formik.values.educations, {
                            ...education,
                            order: formik.values.educations.length + 1
                        }]),
                            setEducation({
                                order: 0,
                                universityDate: '',
                                universityName: '',
                                universityPara: ''
                            })
                    }} className='btn text-end w-1/2'>Add</button>
                </div>
                <table className="table table-zebra mt-5">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Dates</th>
                            <th>Content</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {formik.values?.educations && formik.values?.educations.length > 0 ?
                            formik.values?.educations.map((item, idx) =>
                                <tr key={idx}>
                                    <th>{item.universityName}</th>
                                    <td>{item.universityDate}</td>
                                    <td width={'50%'}>{item.universityPara}</td>
                                    <td>
                                        <button className='btn btn-error' onClick={() => handleDeleteEducation(item.order)} >Delete</button>
                                    </td>
                                </tr>
                            ) : <tr>
                                <td colSpan={5} style={{ textAlign: 'center' }}>No data</td>
                            </tr>}
                        {/* row 2 */}

                    </tbody>
                </table>

            </label>
            <div className='divider' />
            {/* degree */}
            <label className="form-control w-full ">
                <div className="title mb-3">
                    <span className="title font-bold">Degree</span>

                </div>
                <div className='grid sm:grid-cols-1 lg:grid-cols-4 gap-3'>

                    <input
                        onChange={(e) =>
                            setDegree({
                                ...degree,
                                description: e.target.value
                            })

                        }
                        type="text" placeholder="Name" className="input input-bordered w-full" value={degree.description} />
                    <input
                        onChange={(e) =>
                            setDegree({
                                ...degree,
                                name: e.target.value
                            })

                        }
                        type="text" placeholder="Description" className="input input-bordered w-full" value={degree.name} />
                    <input
                        readOnly type="file"
                        className={`file-input file-input-bordered   max-w-xs `}
                        ref={fileInput}
                        accept=""
                        onChange={handleUpload} />
                    <button disabled={!degree.description || !degree.fileId || !degree.name} onClick={handleUploadDegree}
                        className='btn text-end w-1/2'>Add</button>
                </div>
                <table className="table table-zebra mt-10 ">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Description</th>
                            <th></th>


                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {formik.values?.degrees && formik.values?.degrees.length > 0 ? formik.values?.degrees.map((item, idx) =>
                            <tr key={idx}>
                                <td>{item.description}</td>
                                <th>{item.name}</th>

                                <td>
                                    <button onClick={() => handleDeleteDegree(item.order)} className='btn btn-error' >Delete</button>
                                </td>



                            </tr>
                        ) : <tr>
                            <td colSpan={5} style={{ textAlign: 'center' }}>No data</td>
                        </tr>}
                        {/* row 2 */}

                    </tbody>
                </table>

            </label>


        </div>

    );
};

export default EducationDetail;
