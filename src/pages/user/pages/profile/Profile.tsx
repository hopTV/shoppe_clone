import Input from 'src/components/input'

const Profile = () => {
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>
          Hồ sơ của bạn
        </h1>
        <div className='mt1 text-sm text-gray-700'>
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              Email
            </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>dsdsdsdsđsdsd</div>
            </div>
          </div>
          <div>
            <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
                Tên
              </div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
                <div className='sm:w-[80%] sm:pl-5'></div>
              </div>
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              địa chỉ
            </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
