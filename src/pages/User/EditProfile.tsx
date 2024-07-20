import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { UserService } from '../../api/user-service';
import Modal from '../../components/Modal/Modal';
import { UserType, userState } from './type';
import { updateUserValidate } from './validate';

const EditProfile = () => {
  const navigate = useNavigate();

  const { id } = useParams()
  const fileInputRefTop = React.useRef<HTMLInputElement>(null);
  const fileInputRefProfile = React.useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(
    null
  );

  const [selectedFileProfile, setSelectedFileProfile] = React.useState<File | null>(
    null
  );
  const [pictureEdit, setPictureEdit] = React.useState<boolean>(
    false
  );
  const [topPictureEdit, setTopPictureEdit] = React.useState<boolean>(
    false
  );
  const [loadingTopPicture, setLoadingTopPicture] = React.useState<boolean>(
    false
  );
  const [loadingProfilePicture, setLoadingProfilePicture] = React.useState<boolean>(
    false
  );
  const [previewTop, setPreviewTop] = React.useState<string | null>(null);
  const [previewProfile, setPreviewProfile] = React.useState<string | null>(null);
  const handleFileSelectProfile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUpload = e.target.files[0];
      if (imageUpload) {
        setPictureEdit(true)
      }
      setSelectedFileProfile(imageUpload);
      setPreviewProfile(URL.createObjectURL(imageUpload));

    }
  };

  const handleFileSelectTop = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUpload = e.target.files[0];
      if (imageUpload) {
        setTopPictureEdit(true)
      }
      setSelectedFile(imageUpload);
      setPreviewTop(URL.createObjectURL(imageUpload));

    }
  };

  const handleIconClickTop = async () => {
    fileInputRefTop.current?.click();
  };
  const handleIconClickProfile = async () => {
    fileInputRefProfile.current?.click();
  };

  const handleUploadfile = async () => {
    setLoadingTopPicture(true)
    let res: any = await UserService.uploadFile(selectedFile as File)


    if (res?.statusCode === 200) {

      formik.setFieldValue('helloPicture', res?.data)
      toast.success('Upload success !!')

    }
    if (res?.statusCode !== 200) {

      toast.error('Upload failed !!')

    }
    setLoadingTopPicture(false)

  }
  const handleUploadfileProfile = async () => {
    setLoadingProfilePicture(true)
    let res: any = await UserService.uploadFile(selectedFileProfile as File)

    if (res?.statusCode === 200) {
      formik.setFieldValue('profilePicture', res?.data)
      toast.success('Upload success !!')

    }
    if (res?.statusCode !== 200) {

      toast.error('Upload failed !!')

    }
    setLoadingProfilePicture(false)
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [urlPreview, setUrlPreview] = useState<string | undefined>('');

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);
  useEffect(() => {
    handleFecthData()

  }, [])

  const handleFecthData = async () => {
    let res = await UserService.getUser()
    formik.setValues(res)

  }
  const handleUpdate = async (values: UserType) => {
    let res: any = await UserService.updateUser(id, {
      address: values.address,
      altHelloPicture: '',
      altProfilePicture: '',
      bio: values.bio ?? "",
      dateOfBirth: values.dateOfBirth,
      email: values.email,
      gender: values.gender,
      facebookUrl: values.facebookUrl ?? "",
      firstName: values.firstName,
      skills: [],
      helloPicture: values.helloPicture ?? "",
      id: values.id,
      instagramUrl: values.instagramUrl ?? '',
      interests: [],
      lastName: values.lastName,
      nationality: values.nationality,
      phone: values.phone,
      profilePicture: values.profilePicture ?? "",
      twitterUrl: values.twitterUrl ?? ''
    })



    if (res?.statusCode === 200) {
      toast.success('Update success')
      navigate('/')

    }
    if (res?.statusCode === 400) {
      toast.error(res?.error ?? "Update failed")


    }
  }
  const formik = useFormik({
    initialValues: userState,
    onSubmit: handleUpdate,
    validationSchema: updateUserValidate
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
              onClick={() => navigate('/')}
              className="btn btn-block xl:w-auto dark:btn-neutral"
            >
              Discard Changes
            </button>
            <button

              onClick={() => formik.handleSubmit()}
              className="btn btn-block xl:w-auto btn-primary"
            >
              Save Changes
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
                  src={

                    formik.values?.urlProfilePicture
                  }
                  alt={formik.values?.urlProfilePicture}
                />
              </div>
            </div>
          </div>


          {/* Heading */}
          <div className="flex flex-col items-start gap-1">
            <h3 className="font-semibold text-xl xl:text-3xl uppercase">
              {formik.values?.firstName} {formik.values?.lastName}
            </h3>
            <span className="font-normal text-base">Student</span>
          </div>
        </div>
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

                  onChange={formik.handleChange}
                  name='firstName'
                  type="text"
                  placeholder="Type here"
                  value={formik.values?.firstName}
                  className=
                  {
                    `input input-bordered w-full col-span-2 2xl:col-span-3 ${formik.errors.firstName ? 'input-error' : ''}`
                  }
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
                  onChange={formik.handleChange}
                  name='lastName'
                  type="text"
                  placeholder="Type here"
                  value={formik.values?.lastName}
                  className={
                    `input input-bordered w-full col-span-2 2xl:col-span-3 ${formik.errors.lastName ? 'input-error' : ''}`
                  }
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
                  onChange={formik.handleChange}
                  name='nationality'
                  className=
                  {
                    `input input-bordered w-full col-span-2 2xl:col-span-3 ${formik.errors.nationality ? 'input-error' : ''}`
                  }
                />
              </div>
              {/* row 3 */}
              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">DOB</span>
                </div>
                <input


                  onChange={formik.handleChange}
                  name='dateOfBirth'
                  type="date"
                  placeholder="Type here"
                  value={dayjs(formik.values?.dateOfBirth).format('YYYY-MM-DD')}

                  className=
                  {
                    `input input-bordered w-full col-span-2 2xl:col-span-3 ${formik.errors.dateOfBirth ? 'input-error' : ''}`
                  }
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
                  onChange={formik.handleChange}
                  name='instagramUrl'
                  className="input input-bordered w-full col-span-2 2xl:col-span-3"
                />
              </div>

              <div className="w-full grid sm:col-span-full xl:grid-cols-3 2xl:grid-cols-4 xl:items-start gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap xl:mt-3">
                  <span className="whitespace-nowrap">Address</span>
                </div>
                <textarea

                  onChange={formik.handleChange}
                  name='address'
                  className="textarea textarea-bordered w-full col-span-2 2xl:col-span-3"
                  placeholder="Type here"
                  value={formik.values?.address}

                ></textarea>

              </div>

              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">Top Picture</span>
                </div>
                <div className="relative  gap-4 items-center " >
                  <div className="avatar h-40 w-[200px]" >
                    <img
                      className=' rounded-md cursor-pointer'
                      onClick={() => {
                        setUrlPreview(previewTop ? previewTop : formik.values?.urlHelloPicture),
                          openModal()
                      }}

                      src={
                        previewTop ? previewTop :
                          formik.values?.urlHelloPicture
                      }
                      alt={formik.values?.altHelloPicture}
                    />

                  </div>
                  <div className='flex gap-3'>
                    <div onClick={handleIconClickTop}><button className="btn btn-active btn-warning btn-xs sm:btn-md">Edit</button></div>
                    <div onClick={handleUploadfile}>
                      <button
                        disabled={!topPictureEdit}
                        className="btn btn-active  btn-success btn-xs sm:btn-md">

                        {loadingTopPicture ? <span className="loading loading-spinner"></span> : <>Save</>}
                      </button>
                    </div>
                  </div>
                </div>
                <input
                  accept="image/*"
                  name='helloPicture'
                  type="file"
                  ref={fileInputRefTop}
                  className="hidden"
                  onChange={handleFileSelectTop}
                />


              </div>
              <div className="w-full grid sm:col-span-full xl:grid-cols-3 2xl:grid-cols-4 xl:items-start gap-1 xl:gap-0 ">
                <div className="w-full whitespace-nowrap xl:mt-3">
                  <span className="whitespace-nowrap">Skills</span>
                </div>

                {
                  // formik.values?.skills.length ?
                  //   formik.values?.skills.map((item) =>
                  //     <div className='col-span-full'>
                  //       <div className="w-full whitespace-nowrap " key={item.order}>
                  //         <span className="whitespace-nowrap font-medium">{item.name}</span>
                  //       </div>
                  //       <div className="rating">
                  //         <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  //         <input
                  //           type="radio"
                  //           name="rating-2"
                  //           className="mask mask-star-2 bg-orange-400"
                  //           defaultChecked />
                  //         <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  //         <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  //         <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  //       </div>
                  //     </div>) :
                  <div className='flex  justify-center items-center gap-2 mt-2'>
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
                  </div>}

              </div>
            </div>
            {/* column 2 */}
            <div className="w-full flex flex-col sm:grid sm:grid-cols-2 xl:flex xl:flex-col gap-3 xl:gap-5">
              {/* row 1 */}
              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">Gender</span>
                </div>
                <select className="select select-bordered w-full max-w-xs"
                  name='gender'
                  value={formik.values?.gender}
                  onChange={(e) => {
                    formik.setFieldValue('gender', e.target.value)
                  }
                  }>

                  <option value={0}>Male</option>
                  <option value={1}>Female</option>
                </select>
              </div>
              <div className="w-full grid xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap">
                  <span className="whitespace-nowrap">Email</span>
                </div>
                <input

                  type="text"
                  placeholder="Type here"
                  value={formik.values?.email}
                  onChange={formik.handleChange}
                  name='email'
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
                  onChange={formik.handleChange}
                  name='phone'
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
                  onChange={formik.handleChange}
                  name='facebookUrl'

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
                  onChange={formik.handleChange}
                  name='twitterUrl'
                  className="input input-bordered w-full col-span-2 2xl:col-span-3"
                />
              </div>

              <div className="w-full grid sm:col-span-full xl:grid-cols-3 2xl:grid-cols-4 xl:items-start gap-1 xl:gap-0">
                <div className="w-full whitespace-nowrap xl:mt-3">
                  <span className="whitespace-nowrap">Bio</span>
                </div>
                <textarea
                  onChange={formik.handleChange}
                  name='bio'
                  className="textarea textarea-bordered w-full col-span-2 2xl:col-span-3"
                  placeholder="Bio"
                  value={formik.values?.bio}

                ></textarea>


              </div>

              <div className="w-full grid  xl:grid-cols-3 2xl:grid-cols-4 items-center gap-1 xl:gap-0 sm:col-span-full">
                <div className="w-full whitespace-nowrap ">
                  <span className="whitespace-nowrap">Profile Picture</span>
                </div>
                <div className="relative  gap-4 items-center " >
                  <div className="avatar h-40 w-[200px]" >
                    <img
                      className=' rounded-md cursor-pointer'
                      onClick={() => {
                        setUrlPreview(previewProfile ? previewProfile : formik.values?.urlProfilePicture),
                          openModal()
                      }}

                      src={
                        previewProfile ? previewProfile :
                          formik.values?.urlProfilePicture
                      }
                      alt={formik.values?.altProfilePicture}
                    />

                  </div>
                  <div className='flex gap-3'>
                    <div onClick={handleIconClickProfile}><button className="btn btn-active btn-warning btn-xs sm:btn-md">Edit</button></div>
                    <div onClick={handleUploadfileProfile}><button
                      disabled={!pictureEdit}
                      className="btn btn-active  btn-success btn-xs sm:btn-md">

                      {loadingProfilePicture ? <span className="loading loading-spinner"></span> : <>Save</>}
                    </button></div>
                  </div>
                </div>
                <input
                  accept="image/*"
                  name='profilePicture'
                  type="file"
                  ref={fileInputRefProfile}
                  className="hidden"
                  onChange={handleFileSelectProfile}
                />


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
        <Modal isOpen={isModalOpen} onClose={closeModal} >
          <img src={urlPreview} />
        </Modal>
      </div>
    </div>
  );
};

export default EditProfile;
