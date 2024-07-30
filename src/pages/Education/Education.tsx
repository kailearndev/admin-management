import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
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
    const { data, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['education', filter],
        queryFn: fetchData,
        refetchOnMount: true,
        refetchOnWindowFocus: true

    })

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
                onClick={() => navigate(data?.id as string)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

            </button>
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
                {data?.experiences.map((item, idx) =>
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
                {data?.educations.map((item, idx) => <ul key={idx} className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
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
                            {data?.degrees.map((item, idx) =>
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
