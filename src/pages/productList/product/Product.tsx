import React from 'react'
import { Link } from 'react-router-dom'

const Product = () => {
  return (
    <Link to={'/'}>
      <div
        className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 
      hover:translate-y-[-0.04rem] hover:shadow-md'
      >
        <div className='relative w-full pt-[100%]'>
          <img
            src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
            alt='image'
            className='absolute left-0 top-0 h-full w-full bg-white object-cover'
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
            incidunt dolorem nostrum dolores! Quisquam pariatur illo cumque
            animi ad aliquam harum qui sed? Iusto assumenda ratione magni.
            Voluptates, aut quos?
          </div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>đ</span>
              <span className='text-sm'>5.0000</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>đ</span>
              <span>2.0000</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <div className='item-center flex'>
              <div className='relative'>
                <div
                  className='absolute left-0 top-0 h-full overflow-hidden'
                  style={{ width: '50%' }}
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='h-3 w-3 fill-yellow-300 text-yellow-300'
                  >
                    <polygon
                      points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeMiterlimit={10}
                    />
                  </svg>
                </div>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  className='h-3 w-3 fill-current text-gray-300'
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
            </div>
            <div className='ml-2 text-sm'>
              <span>5.66K</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
