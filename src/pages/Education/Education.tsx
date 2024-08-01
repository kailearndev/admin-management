import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Outlet, useNavigate, useOutlet } from 'react-router-dom';
import { EducationService } from '../../api/education-service';
import { useLoading } from '../../components/LoadingContext';
import { EducationResponse } from './type';

const Education = () => {
    const outlet = useOutlet()
    return outlet ? <Outlet /> : <EducationPage />
}

const EducationPage = () => {
    const [filter] = React.useState<{ Page: number, PageSize: number, Search: string | {} }>({
        Page: 1,
        PageSize: 10,
        Search: {}
    })

    const { setLoading } = useLoading();

const navigate = useNavigate()
    const fetchData = async ({
        queryKey
    }: {
        queryKey: [string, { Page: number, PageSize: number, Search: string | {} }]
    }) => {
        const [, filter] = queryKey
        setLoading(true)
        const result: EducationResponse = await EducationService.getEducation(filter)
        setLoading(false)
        return result


    }
    const { data} = useQuery({
        queryKey: ['education', filter],
        queryFn: fetchData,
        refetchOnMount: true,
        refetchOnWindowFocus: true

    })

    


    return (
        <div className='flex flex-col gap-5'>
         <div className='flex justify-end gap-2'>
            <button className='btn'   onClick={() => navigate(data?.id as string)}>Edit</button>
         </div>
            <div className="divider divider-start text-3xl">EDUCATION
            </div>
            <label className="form-control w-full ">
                <div className="title mb-3">
                    <span className="title font-bold">Bio</span>

                </div>
                <textarea readOnly rows={4} placeholder="Type here" className="textarea textarea-bordered w-full " value={data?.bio} />
            </label>
            <label className="form-control w-full ">
                <div className="title mb-3">
                    <span className="title font-bold">Description</span>

                </div>
                <textarea readOnly rows={4} placeholder="Type here" className="textarea textarea-bordered w-full " value={data?.description} />
            </label>

            <label className="form-control w-full ">
                <div className="label mb-3">
                    <span className="title font-bold">Experiences</span>
                </div>
                {data?.experiences.map((item,idx) =>
                    <ul key={idx} className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                        <li>
                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="timeline-start mb-10 md:text-end">
                                <time className="font-mono italic">{item.dates}</time>
                                <div className="text-lg font-black">{item.position} ({item.type})</div>
                                {item.bullets}
                            </div>
                            <hr />
                        </li>
                    </ul>)}

            </label>
            <label className="form-control w-full ">
                <div className="label mb-3">
                    <span className="title font-bold">Educations</span>
                </div>
                {data?.educations.map((item,idx) => <ul key={idx} className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                    <li>
                        <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="timeline-start mb-10 md:text-end">
                            <time className="font-mono italic">{item.universityDate}</time>
                            <div className="text-lg font-black">{item.universityName}</div>
                            {item.universityPara}
                        </div>
                        <hr />
                    </li>
                </ul>)}

            </label>
            <label className="form-control w-full ">
                <div className="title mb-3">
                    <span className="title font-bold ">Degree</span>

                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>

                                <th>Name</th>
                                <th>Description</th>
                                <th>File Name</th>
                                <th>Download</th>


                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {data?.degrees.map((item,idx) =>
                                <tr key={idx}>
                                    <th>{item.name}</th>
                                    <td>{item.description}</td>
                                    <td>{item.fileName}</td>
                                    <td>
                                        <a className='link link-primary' href={item.fileUrl} target='_blank' download >Download</a>
                                    </td>

                                </tr>
                            )}
                            {/* row 2 */}

                        </tbody>
                    </table>
                </div>
            </label>
        </div>

    );
};

export default Education;
