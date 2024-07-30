import { useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import React, { ChangeEvent, useState } from 'react';
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
    const {id}  = useParams()
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
    const [fileDegree, setFileDegree] = React.useState<File | null>()
const navigate = useNavigate()
    const fileInput = React.useRef<HTMLInputElement>(null);

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
          formik.setFieldValue('degrees',formattedData)
        setLoading(false)
        return result


    }
    const { isFetching, isError, isSuccess } = useQuery({
        queryKey: ['education'],
        queryFn: fetchData,
        refetchOnMount: true,
        refetchOnWindowFocus: true

    })
    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileUpload = e.target.files[0];
           setFileDegree(fileUpload)
          
        }
    };

    const handleUploadDegree = async () => {
        let res: any = await UserService.uploadFile(fileDegree as File)
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
    React.useEffect(() => {
        if (isFetching) {
            toast.loading('Loading...', { id: 'promiseUsers' });
        }
        if (isError) {
            toast.error('Error while getting the data!', {
                id: 'promiseUsers',
            });
        }
        if (isSuccess) {
            toast.success('Got the data successfully!', {
                id: 'promiseUsers',
            });
        }
    }, [isError, isFetching, isSuccess]);

    const handleUpdateEducation = async () => {
        setLoading(true)
        let res:any = await EducationService.updateEducations(id, {
            bio: formik.values.bio,
            degrees: formik.values.degrees as any,
            description: formik.values.description as any,
            educations: formik.values.educations as any,
            experiences: formik.values.experiences as any,
            id: formik.values.id,
            isActive: true

        })
        if (res?.statusCode === 200) {
            toast.success('Update success !!')
            navigate('..', {
                relative: 'path'
            })
        }
        if (res?.statusCode === 400) {

            toast.error('Upload failed !!')
        }
        setLoading(false)
            
    }

    const formik = useFormik({
        initialValues: EducationUpdate,
        onSubmit: handleUpdateEducation
    })


console.log(degree);

    return (
        <div className='flex flex-col gap-5'>
            <button
                className="z-50
        fixed
        bottom-4
        right-4
        bg-blue-500
        text-white
        p-3
        rounded-full
        shadow-lg
        hover:bg-blue-600
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        transition
        duration-300
      "
                onClick={() => formik.handleSubmit()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>


            </button>
            <div className="divider divider-start text-3xl">EDUCATION
            </div>
            <label className="form-control w-full ">
                <div className="title mb-3">
                    <span className="title font-bold">Bio</span>

                </div>
                <textarea name='bio' onChange={formik.handleChange}  rows={4} placeholder="Type here" className="textarea textarea-bordered w-full " value={formik.values.bio} />
            </label>
            <label className="form-control w-full ">
                <div className="title mb-3">
                    <span className="title font-bold">Description</span>

                </div>
                <textarea name='description'onChange={formik.handleChange}  rows={4} placeholder="Type here" className="textarea textarea-bordered w-full " value={formik.values?.description} />
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
                    <button onClick={() => formik.setFieldValue('experiences', [...formik.values.experiences, {
                        ...experiences,
                        order: formik.values.experiences.length + 1
                    }])} className='btn text-end w-1/2'>Add</button>
                </div>
                <table className="table table-zebra ">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Postion</th>
                            <th>Dates</th>
                            <th>Bullets</th>
                            <th>Type</th>


                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {formik.values?.experiences.map((item, idx) =>
                            <tr key={idx}>
                                <th>{item.position}</th>
                                <td>{item.dates}</td>
                                <td>{item.bullets}</td>
                                <td>{item.type}</td>


                            </tr>
                        )}
                        {/* row 2 */}

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

                    <button onClick={() => formik.setFieldValue('educations', [...formik.values.educations, {
                        ...education,
                        order: formik.values.educations.length + 1
                    }])} className='btn text-end w-1/2'>Add</button>
                </div>
                <table className="table table-zebra ">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Dates</th>
                            <th>Content</th>



                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {formik.values?.educations.map((item, idx) =>
                            <tr key={idx}>
                                <th>{item.universityName}</th>
                                <td>{item.universityDate}</td>
                                <td width={'50%'}>{item.universityPara}</td>



                            </tr>
                        )}
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
                                name: e.target.value
                            })

                        }
                        type="text" placeholder="Description" className="input input-bordered w-full" value={degree.name} />
                          <input
                        onChange={(e) =>
                            setDegree({
                                ...degree,
                                description: e.target.value
                            })

                        }
                        type="text" placeholder="Name" className="input input-bordered w-full" value={degree.description} />
                    <input 
                    readOnly type="file"
                        className={`file-input file-input-bordered   max-w-xs `}
                        ref={fileInput}
                        accept=""
                        onChange={handleUpload} />
                    <button onClick={() => {  handleUploadDegree(),
                      
                        formik.setFieldValue('degrees', [...formik.values.degrees, {
                            ...degree,
                           
                            order: formik.values.degrees.length + 1
                        }])
                    }} className='btn text-end w-1/2'>Add</button>
                </div>
                <table className="table table-zebra ">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Description</th>
                           



                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {formik.values?.degrees.map((item, idx) =>
                            <tr key={idx}>
                                <th>{item.name}</th>
                                <td>{item.description}</td>
                               



                            </tr>
                        )}
                        {/* row 2 */}

                    </tbody>
                </table>

            </label>


        </div>

    );
};

export default EducationDetail;
