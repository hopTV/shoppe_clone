import classNames from 'classnames'
import { omit } from 'lodash'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'

import { sortBy, order as orderConstant } from 'src/constants/products'
import { QueryConfig } from 'src/hook/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

interface Props {
  pageSize: number
  queryConfig: QueryConfig
}

const SortProductList = ({ pageSize, queryConfig }: Props) => {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const page = Number(queryConfig.page)
  const navidate = useNavigate()

  const isActiveSortBy = (
    sortValue: Exclude<ProductListConfig['sort_by'], undefined>
  ) => {
    return sort_by === sortValue
  }

  const handleSort = (
    sortValue: Exclude<ProductListConfig['sort_by'], undefined>
  ) => {
    navidate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (
    orderValue: Exclude<ProductListConfig['order'], undefined>
  ) => {
    navidate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(
                sortBy.view
              ),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(
                sortBy.view
              )
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(
                sortBy.createdAt
              ),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(
                sortBy.createdAt
              )
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(
                sortBy.sold
              ),
              'bg-white text-black hover:bg-slate-100': !isActiveSortBy(
                sortBy.sold
              )
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className='h-8 rounded-sm bg-white px-4 text-left text-sm capitalize text-black outline-none hover:bg-slate-100'
            value={order || ''}
            onChange={(e) =>
              handlePriceOrder(
                e.target.value as Exclude<ProductListConfig['order'], undefined>
              )
            }
          >
            <option value='' disabled>
              Giá
            </option>
            <option value={orderConstant.asc}>Giá: Thấp đến cao</option>
            <option value={orderConstant.desc}>Giá: cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex items-center justify-center'>
            {Number(page) === 1 ? (
              <span className='flex h-8 cursor-not-allowed items-center justify-center rounded-tl-sm bg-white/60 px-3 hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5L8.25 12l7.5-7.5'
                  />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex h-8 cursor-pointer items-center justify-center rounded-tl-sm bg-white px-3 hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5L8.25 12l7.5-7.5'
                  />
                </svg>
              </Link>
            )}
            {page === pageSize ? (
              <span className='flex h-8 cursor-not-allowed items-center justify-center rounded-tl-sm bg-white/60 px-3 hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex h-8 items-center justify-center rounded-tl-sm bg-white px-3 hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
