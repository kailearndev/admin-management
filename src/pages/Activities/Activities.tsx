import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';
import { Outlet, useNavigate, useOutlet } from 'react-router-dom';
import { ActivitiesService } from '../../api/activities';
import { useLoading } from '../../components/LoadingContext';
import Pagination from '../../components/Paginate';

const Activities = () => {
  const outlet = useOutlet()
  return outlet ? <Outlet /> : <ActivitiesPage />
}

const ActivitiesPage = () => {
  const [filter, setFilter] = React.useState<{ Page: number, PageSize: number, Search: string | {} }>({
    Page: 1,
    PageSize: 10,
    Search: {}
  })

  const { setLoading } = useLoading();

  const fetchData = async ({
    queryKey
  }: {
    queryKey: [string, { Page: number, PageSize: number, Search: string | {} }]
  }) => {
    const [, filter] = queryKey
    setLoading(true)
    const result = await ActivitiesService.fetchActivities(filter)
    setLoading(false)
    return result


  }
  const { data } = useQuery({
    queryKey: ['active-table', filter],
    queryFn: fetchData,
    refetchOnMount: true,
    refetchOnWindowFocus: true

  })



  const navigate = useNavigate()
  const handlePageChange = (page: number) => {
    if (page !== filter.Page) {
      setFilter({ ...filter, Page: page })
    }
  }

  return (
    <><div className="overflow-x-auto ">
      <div className='flex justify-end'>
        <button className="btn" onClick={() => navigate(`create`)}>Add</button>
      </div>
      <table className="table table-pin-rows  table-pin-cols ">
        {/* head */}
        <thead>
          <tr>
            <th>Tittle</th>
            <th>Description</th>
            <th>Created Date</th>
            <th></th>


          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data?.items?.map?.((item: any, idx: number) => 
          <tr key={idx}>

            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={item?.imageArticleUrl}
                      alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{item?.title}</div>
                </div>
              </div>
            </td>
            <td>
              {item?.description}

            </td>
            <td>{dayjs(item?.createdDate).format('YYYY.MM.DD')}</td>
            <th>
              <button className="btn btn-ghost btn-xs" onClick={() => navigate(`${item.id}`)}>Edit</button>
            </th>
          </tr>
        
          )}


        </tbody>
    

      </table>
      <div className='flex justify-end items-end'>
        {data?.totalItems > 0 && <Pagination pageNumber={data?.pageNumber} totalItems={data?.totalItems} onPageChange={handlePageChange} />}
      </div>



    </div>
    </>
  );
};

export default Activities;
