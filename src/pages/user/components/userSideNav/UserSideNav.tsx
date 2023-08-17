import { Link, NavLink } from 'react-router-dom'
import { path } from 'src/constants/path'

const UserSideNav = () => {
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link
          to={path.profile}
          className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'
        >
          <img
            src='data:image/jpeg;base64,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'
            alt='avatar'
            className='h-full w-full'
          />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate text-start font-semibold text-gray-600'>
            email@.com
          </div>
          <Link
            to={path.profile}
            className='flex items-center capitalize text-gray-500'
          >
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={path.profile}
          className='mt-4 flex items-center capitalize transition-colors'
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4'
              alt=''
              className='h-full w-full'
            />
          </div>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to={path.changePassword}
          className='mt-4 flex items-center capitalize transition-colors'
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4'
              alt=''
              className='h-full w-full'
            />
          </div>
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to={path.historyPurchase}
          className='mt-4 flex items-center capitalize transition-colors'
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078'
              alt=''
              className='h-full w-full'
            />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </div>
  )
}

export default UserSideNav
