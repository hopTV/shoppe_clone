import { Link } from 'react-router-dom'
import Button from 'src/components/button'
import QuantityController from 'src/components/quantityController'

const Cart = () => {
  return (
    <>
      <div className='bg-neutral-100 py-16'>
        <div className='container'>
          <div className='overflow-auto'>
            <div className='min-w-[1000px]'>
              <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
                <div className='col-span-6'>
                  <div className='flex items-center'>
                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <input
                        type='checkbox'
                        className='h-5 w-5 accent-orange'
                      />
                    </div>
                    <div className='flex-grow text-black'>sản phẩm</div>
                  </div>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-5 text-center'>
                    <div className='col-span-2'>Đơn Giá</div>
                    <div className='col-span-1'>Số Lượng</div>
                    <div className='col-span-1'>Số Tiền</div>
                    <div className='col-span-1'>Thao Tác</div>
                  </div>
                </div>
              </div>
              <div
                className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white
                       px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
              >
                <div className='col-span-6'>
                  <div className='flex'>
                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <input type='checkbox' className='h5 w-5 accent-orange' />
                    </div>
                    <div className='flex-grow'>
                      <div className='flex'>
                        <Link to='/' className='h-20 w-20 flex-shrink-0'>
                          <img src='' alt='' />
                        </Link>
                        <div className='flex-grow px-2 pb-2 pt-1'>
                          <Link to='/' className='text-left line-clamp-2'>
                            sssss
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-5 items-center'>
                    <div className='col-span-2'>
                      <div className='flex items-center justify-center'>
                        <span className='text-gray-300 line-through'>
                          300000
                        </span>
                        <span className='ml-3'>40000000</span>
                      </div>
                    </div>
                    <div className='col-span-1'>
                      <QuantityController
                        max={20}
                        classNameWrapper='flex items-center'
                      />
                    </div>
                    <div className='col-span-1'>
                      <span className='text-orange'>400000</span>
                    </div>
                    <div className='col-span-1'>
                      <button className='bg-none text-black transition-colors hover:text-orange'>
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
        <div className='flex items-center'>
          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
            <input type='checkbox' className='h-5 w-5 accent-orange' />
          </div>
          <button className='mx-3 border-none bg-none'>chọn tất cả</button>
          <button className='mx-3 border-none bg-none'>xóa</button>
        </div>
        <div className='sm:ml-aoto mt-5 flex flex-col sm:mt-0 sm:flex-row sm:items-center'>
          <div>
            <div className='flex items-center sm:justify-end'>
              <div>tổng thanh toán (0 sản phẩm):</div>
              <div className='ml-2 text-2xl text-orange'>50000</div>
            </div>
            <div className='flex items-center text-sm sm:justify-end'>
              <div className='text-gray-500'>Tiết Kiệm</div>
              <div className='ml-6 text-orange'>60000</div>
            </div>
          </div>
          <Button className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>
            Mua Hàng
          </Button>
        </div>
      </div>
    </>
  )
}

export default Cart
