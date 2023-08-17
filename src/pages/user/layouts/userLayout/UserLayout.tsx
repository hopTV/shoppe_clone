import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/userSideNav'

const UserLayout = () => {
  return (
    <div className='bg-neutral-100 py-16 text-sm text-gray-600'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='lg:col-spam-10 flex justify-start md:col-span-9'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLayout
