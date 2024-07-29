import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Button } from 'react-daisyui';
import toast from 'react-hot-toast';
import { fetchUsers } from '../../api/ApiCollection';
import ModalCreate from './ModalCreate';
import ModalDetail from './ModalDetail';

const Activities = () => {

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['activities'],
    queryFn: fetchUsers,
  });

  React.useEffect(() => {
    if (isLoading) {
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
  }, [isError, isLoading, isSuccess]);

  const [idActivities, setIdActivities] = useState<string>('')
  const [modalCreate, setModalCreate] = useState<boolean>(false)
  const [modalDetail, setModalDetail] = useState<boolean>(false)

  return (
    <div className="overflow-x-auto ">
      <Button onClick={() => setModalCreate(true)} className='absolute right-5 z-20' size='sm'>Add New</Button>
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
          {data?.map?.((item: any) =>
            <><tr key={item?.id}>

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
                <button className="btn btn-ghost btn-xs" onClick={() => {
                  setIdActivities(item.id);
                  setModalDetail(true);
                }}>Edit</button>

              </th>
            </tr>
            </>
          )}


        </tbody>
        {/* foot */}

      </table>
      <ModalDetail isOpen={modalDetail} onClose={() => setModalDetail(false)} id={idActivities} />
      <ModalCreate isOpen={modalCreate} onClose={() => setModalCreate(false)} />


    </div>
  );
};

export default Activities;
