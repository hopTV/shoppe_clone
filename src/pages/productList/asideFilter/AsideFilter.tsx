import classNames from 'classnames'

import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'

import Button from 'src/components/button'
import { path } from 'src/constants/path'
import { QueryConfig } from 'src/hook/useQueryConfig'
import { Category } from 'src/types/category.type'
import { NoUndefinedField } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/inputNumber'
import RatingStars from '../rating-stars'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  categories: Category[] | any
}

type FormData = NoUndefinedField<Pick<Schema, 'price_min' | 'price_max'>>

const priceSchema = schema.pick(['price_max', 'price_min'])

const AsideFilter = ({ queryConfig, categories }: Props) => {
  const { category } = queryConfig
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(priceSchema)
  })

  const onSumit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  // const handleRemoveFiler = () => {
  //   navigate({
  //     pathname: path.home,
  //     search: createSearchParams(
  //       omit(queryConfig, [
  //         'price_max',
  //         'price_min',
  //         'category',
  //         'rating_filter'
  //       ])
  //     ).toString()
  //   })
  // }

  return (
    <div className='py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <ul>
        {categories.map((item: Category) => {
          const isActive = category === item._id
          return (
            <li className='py-2 pl-2' key={item._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: item._id
                  }).toString()
                }}
                className={classNames('relative px-2  ', {
                  'font-bold text-orange': isActive
                })}
              >
                {isActive && (
                  <svg
                    viewBox='0 0 4 7'
                    className='absolute left-[-10px] top-1 h-2 w-2 fill-orange'
                  >
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link
        to={path.home}
        className='mt-4 flex items-center font-bold uppercase'
      >
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        bộ lọc tìm kiếm
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='my-5'>
        <div className='flex justify-start'>Khoản giá</div>
        <form className='mt-2' onSubmit={onSumit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='đ từ'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            />

            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='đến'
                    classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    {...field}
                    classNameError='hidden'
                    onChange={(e) => {
                      field.onChange(e)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>
            {errors.price_min?.message}
          </div>
          <Button className='w-full bg-orange p-2 text-sm uppercase text-[#fff] hover:bg-orange/80'>
            áp dụng
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='flex justify-start text-sm'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <Button
        // onClick={handleRemoveFiler}
        className='w-full bg-orange p-2 text-sm uppercase text-[#fff] hover:bg-orange/80'
      >
        xóa tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
