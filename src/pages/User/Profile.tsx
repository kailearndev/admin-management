import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../api/user-service';
import Modal from '../../components/Modal/Modal';
import { userState } from './type';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [urlPreview, setUrlPreview] = useState<string | undefined>('');


  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  const navigate = useNavigate();


  useEffect(() => {
    handleFecthData()

  }, [])

  const handleFecthData = async () => {
    let res = await UserService.getUser()
    formik.setValues(res)
    localStorage.setItem('avt', res?.urlProfilePicture)

  }

  const formik = useFormik({
    initialValues: userState,
    onSubmit: () => { }
  })


  return (
    // screen
    <div className="w-full p-0 m-0">
      {/* container */}
      <div className="w-full flex flex-col items-stretch gap-7 xl:gap-8">
        {/* block 1 */}
        <div className="flex flex-col xl:flex-row items-start justify-between gap-3 xl:gap-0">
          <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
            My Profile
          </h2>
          <div className="w-full xl:w-auto grid grid-cols-2 xl:flex gap-3">
            <button
              onClick={() => navigate(`${formik.values?.id}`)}
              className="btn btn-block xl:w-auto dark:btn-neutral"
            >
              Edit
            </button>

          </div>
        </div>
        {/* block 2 */}
        <div className="flex items-center gap-3 xl:gap-8 xl:mb-4">
          {/* Photo */}
          <div className="relative inline-flex">

            <div className="avatar">
              <div className="w-24 xl:w-36 2xl:w-48 rounded-full">
                <img
                  src={formik.values?.urlProfilePicture}
                  alt="foto-cowok-ganteng"
                />
              </div>
            </div>
          </div>


          {/* Heading */}
          <div className="flex flex-col items-start gap-1">
            <h3 className="font-semibold text-xl xl:text-3xl uppercase">
              {formik.values?.firstName}   {formik.values?.lastName}

            </h3>
            <span className="font-normal text-base">Student</span>
          </div>
        </div>
        {/* block 3 */}
        <div className="w-full flex flex-col items-stretch gap-3 xl:gap-7">
          {/* heading */}
          <div className="flex items-center w-full gap-3 xl:gap-5 p">
            <h4 className="font-semibold text-lg xl:text-2xl whitespace-nowrap">
              Information
            </h4>
            <div className="w-full h-[2px] bg-base-300 dark:bg-slate-700 mt-1"></div>
          </div>
          {/* grid */}
          <div className="w-full grid xl:grid-cols-2 gap-3 xl:gap-5 2xl:gap-20 xl:text-base py-4">
            {/* column 1 */}
            <div className="w-full flex flex-col sm:grid sm:grid-cols-3 xl:flex xl:flex-col gap-3 xl:gap-5">
              {/* row 1 */}
              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">
                    First Name
                  </span>
                </div>
                <input
                  readOnly
                  type="text"
                  placeholder="Type here"
                  value={formik.values?.firstName}
                  className="input input-bordered w-full col-span-2 2xl:col-span-3"
                />
              </div>
              {/* row 2 */}
              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">
                    Last Name
                  </span>
                </div>
                <input
                  readOnly
                  type="text"
                  placeholder="Type here"
                  value={formik.values?.lastName}
                  className="input input-bordered w-full col-span-2 2xl:col-span-3"
                />
              </div>
              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">Nationality</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  value={formik.values?.nationality}
                  readOnly
                  className="input input-bordered w-full col-span-2 2xl:col-span-3"
                />
              </div>
              {/* row 3 */}
              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">DOB</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  value={dayjs(formik.values?.dateOfBirth).format('YYYY/MM/DD')}
                  readOnly
                  className="input input-bordered w-full col-span-2 2xl:col-span-3"
                />
              </div>
              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">Instagram</span>
                </div>
                <input
                  maxLength={12}
                  type="text"
                  placeholder="Type here"
                  value={formik.values?.instagramUrl}
                  readOnly
                  className="input input-bordered w-full col-span-2 2xl:col-span-3"
                />
              </div>

              <div className="w-full grid sm:col-span-full xl:grid-cols-3 2xl:grid-cols-4 xl:items-start gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap xl:mt-3">
                  <span className="whitespace-nowrap">Address</span>
                </div>
                <textarea
                  readOnly

                  className="textarea textarea-bordered w-full col-span-2 2xl:col-span-3"
                  placeholder="Address"
                  value={formik.values?.address}

                ></textarea>

              </div>

              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">Top Picture</span>
                </div>
                <img
                  onClick={() => {
                    setUrlPreview(formik.values?.urlHelloPicture),
                      openModal()
                  }}
                  className="cursor-pointer h-20 max-w-xl aspect-square rounded-lg shadow-xl dark:shadow-gray-800" src={formik.values?.urlHelloPicture} alt="image description" />

              </div>
              <div className="w-full grid sm:col-span-full xl:grid-cols-3 2xl:grid-cols-4 xl:items-start gap-1 xl:gap-0 ">
                <div className="w-full whitespace-nowrap xl:mt-3">
                  <span className="whitespace-nowrap">Skills</span>
                </div>

                {/* {
                  formik.values?.skills.length ?
                    formik.values?.skills.map((item) =>
                      <div className='flex  p-[1rem] rounded-md border-[1px] gap-2 '>
                        <div className="w-full whitespace-nowrap " key={item.order}>
                          <span className="whitespace-nowrap font-medium">{item.name}</span>
                        </div>
                        <div className="rating">
                          <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                            defaultChecked />
                          <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                          <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                          <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        </div>
                      </div>) : */}
                <div className='flex mt-2 '>
                  <div className="w-full whitespace-nowrap " >
                    <span className="whitespace-nowrap font-medium">Any</span>
                  </div>
                  <div className="rating">
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-orange-400"
                      defaultChecked />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  </div>
                </div>

              </div>
            </div>
            {/* column 2 */}
            <div className="w-full flex flex-col sm:grid sm:grid-cols-2 xl:flex xl:flex-col gap-3 xl:gap-5">
              {/* row 1 */}
              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">Gender</span>
                </div>
                <input

                  type="text"
                  placeholder="Type here"
                  value={formik.values?.gender === 0 ? 'Male' : 'Female'}
                  readOnly
                  className="input input-bordered w-full col-span-2 2xl:col-span-3"
                />
              </div>
              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">Email</span>
                </div>
                <input

                  type="text"
                  placeholder="Type here"
                  value={formik.values?.email}
                  readOnly
                  className="input input-bordered w-full col-span-2 2xl:col-span-3"
                />
              </div>
              {/* row 2 */}
              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">Phone</span>
                </div>
                <input
                  maxLength={12}
                  type="text"
                  placeholder="Type here"
                  value={formik.values?.phone}
                  readOnly
                  className="input input-bordered w-full col-span-2 2xl:col-span-3"
                />
              </div>

              {/* row 3 */}

              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">Facebook</span>
                </div>
                <input
                  maxLength={12}
                  type="text"
                  placeholder="Type here"
                  value={formik.values?.facebookUrl}
                  readOnly
                  className="input input-bordered w-full col-span-2 2xl:col-span-3"
                />
              </div>
              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">X</span>
                </div>
                <input
                  maxLength={12}
                  type="text"
                  placeholder="Type here"
                  value={formik.values?.twitterUrl}
                  readOnly
                  className="input input-bordered w-full col-span-2 2xl:col-span-3"
                />
              </div>

              <div className="w-full grid sm:col-span-full xl:grid-cols-3 2xl:grid-cols-4 xl:items-start gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap xl:mt-3">
                  <span className="whitespace-nowrap">Bio</span>
                </div>
                <textarea
                  readOnly

                  className="textarea textarea-bordered w-full col-span-2 2xl:col-span-3"
                  placeholder="Bio"
                  value={formik.values?.bio}

                ></textarea>


              </div>

              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">Profile Picture</span>
                </div>
                <img
                  onClick={() => {
                    setUrlPreview(formik.values?.urlProfilePicture),
                      openModal()
                  }}
                  className=" cursor-pointer h-20 max-w-xl aspect-square  rounded-lg shadow-xl dark:shadow-gray-800" src={formik.values?.urlProfilePicture} alt="image description" />

              </div>
              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">Interest</span>
                </div>
                <div className="badge h-[30px] badge-primary">Football</div>

              </div>
            </div>
            {/* column 3 */}

          </div>
        </div>
        {/* block 4 */}

        {/* block 5 */}

      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} >
        <img src={urlPreview} />
      </Modal>
    </div>
  );
};

export default Profile;
