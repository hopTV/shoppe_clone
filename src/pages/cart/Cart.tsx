import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import purchasesApi from 'src/apis/purchase.pai'
import Button from 'src/components/button'
import QuantityController from 'src/components/quantityController'
import { path } from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import { Purchase } from 'src/types/purchase'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const Cart = () => {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)

  const { data: purcheaseInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchasesApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const buyProductMutation = useMutation({
    mutationFn: purchasesApi.buyProducts,
    onSuccess: (data) => {
      refetch(),
        toast.success(data.data.message, {
          position: 'top-center',
          autoClose: 1000
        })
    }
  })

  const deletePurchasesMutation = useMutation({
    mutationFn: purchasesApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const location = useLocation()
  const choosenPurchaseIdFromLocation = (
    location.state as { purchaseId: string | null }
  )?.purchaseId
  const checkedPurchase = useMemo(
    () => extendedPurchases.filter((el) => el.checked),
    [extendedPurchases]
  )
  const isAllChecked = useMemo(
    () => extendedPurchases.every((el) => el.checked),
    [extendedPurchases]
  )
  const purcheasCount = checkedPurchase.length
  const purchasesInCart = purcheaseInCartData?.data.data
  const totalCheckedPrice = useMemo(
    () =>
      checkedPurchase.reduce((result, curent) => {
        return result + curent.product.price * curent.buy_count
      }, 0),
    [checkedPurchase]
  )

  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchase.reduce((result, current) => {
        return (
          result +
          (current.product.price_before_discount - current.product.price) *
            current.buy_count
        )
      }, 0),
    [checkedPurchase]
  )

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((item) => {
          const isChoosenPurchaseFromLcation =
            choosenPurchaseIdFromLocation === item._id
          return {
            ...item,
            disabled: false,
            checked:
              isChoosenPurchaseFromLcation ||
              Boolean(extendedPurchasesObject[item._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart, choosenPurchaseIdFromLocation])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleQuantity = (index: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[index]
      setExtendedPurchases(
        produce((draft) => {
          draft[index].disabled = true
        })
      )
      updatePurchaseMutation.mutate({
        product_id: purchase.product._id,
        buy_count: value
      })
    }
  }

  const handleTypeQuantity = (index: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[index].buy_count = value
      })
    )
  }

  const handleCheck =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setExtendedPurchases(
        produce((draft) => {
          draft[index].checked = event.target.checked
        })
      )
    }

  const handleDelete = (index: number) => {
    const id = extendedPurchases[index]._id
    deletePurchasesMutation.mutate([id])
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleDeleteChecked = () => {
    const ids = checkedPurchase.map((item) => item._id)
    deletePurchasesMutation.mutate(ids)
  }

  const handleByPurchases = () => {
    if (checkedPurchase.length > 0) {
      const body = checkedPurchase.map((item) => ({
        product_id: item.product._id,
        buy_count: item.buy_count
      }))
      buyProductMutation.mutate(body)
    }
  }

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
                        checked={isAllChecked}
                        onChange={handleCheckAll}
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
              {extendedPurchases.length > 0 && (
                <div className='my-3 rounded-sm bg-white p-5 shadow'>
                  {extendedPurchases.map((item, index) => (
                    <div
                      className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white
                        px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
                      key={item._id}
                    >
                      <div className='col-span-6'>
                        <div className='flex'>
                          <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                            <input
                              checked={item.checked}
                              type='checkbox'
                              className='h5 w-5 accent-orange'
                              onChange={handleCheck(index)}
                            />
                          </div>
                          <div className='flex-grow'>
                            <div className='flex'>
                              <Link
                                to={`${path.home}${generateNameId({
                                  name: item.product.name,
                                  id: item.product._id
                                })}`}
                                className='h-20 w-20 flex-shrink-0'
                              >
                                <img src={item.product.image} alt='' />
                              </Link>
                              <div className='flex-grow px-2 pb-2 pt-1'>
                                <Link
                                  to={`${path.home}${generateNameId({
                                    name: item.product.name,
                                    id: item.product._id
                                  })}`}
                                  className='text-left line-clamp-2'
                                >
                                  {item.product.name}
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
                                ₫
                                {formatCurrency(
                                  item.product.price_before_discount
                                )}
                              </span>
                              <span className='ml-3'>
                                ₫{formatCurrency(item.product.price)}
                              </span>
                            </div>
                          </div>
                          <div className='col-span-1'>
                            <QuantityController
                              max={item.product.quantity}
                              value={item.buy_count}
                              classNameWrapper='flex items-center'
                              onIncrease={(value) =>
                                handleQuantity(
                                  index,
                                  value,
                                  value <= item.product.quantity
                                )
                              }
                              onDecrease={(value) =>
                                handleQuantity(index, value, value >= 1)
                              }
                              onType={handleTypeQuantity(index)}
                              onFocusOut={(value) => {
                                handleQuantity(
                                  index,
                                  value,
                                  value >= 1 &&
                                    value <= item.product.quantity &&
                                    value !==
                                      (purchasesInCart as Purchase[])[index]
                                        .buy_count
                                )
                              }}
                              disabled={item.disabled}
                            />
                          </div>
                          <div className='col-span-1'>
                            <span className='text-orange'>
                              ₫
                              {formatCurrency(
                                item.product.price * item.buy_count
                              )}
                            </span>
                          </div>
                          <div className='col-span-1'>
                            <button
                              className='bg-none text-black transition-colors hover:text-orange'
                              onClick={() => handleDelete(index)}
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center md:justify-between'>
            <div className='flex items-center'>
              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                <input
                  type='checkbox'
                  className='h-5 w-5 accent-orange'
                  checked={isAllChecked}
                  onChange={handleCheckAll}
                />
              </div>
              <button
                className='mx-3 border-none bg-none'
                onClick={handleCheckAll}
              >
                chọn tất cả ({extendedPurchases.length})
              </button>
              <button
                className='mx-3 border-none bg-none'
                onClick={handleDeleteChecked}
              >
                xóa
              </button>
            </div>
            <div className='sm:ml-aoto mt-5 flex flex-col sm:mt-0 sm:flex-row sm:items-center'>
              <div>
                <div className='flex items-center sm:justify-end'>
                  <div>tổng thanh toán ({purcheasCount} sản phẩm):</div>
                  <div className='ml-2 text-2xl text-orange'>
                    ₫{formatCurrency(totalCheckedPrice)}
                  </div>
                </div>
                <div className='flex items-center text-sm sm:justify-end'>
                  <div className='text-gray-500'>Tiết Kiệm</div>
                  <div className='ml-6 text-orange'>
                    {' '}
                    ₫{formatCurrency(totalCheckedPurchaseSavingPrice)}
                  </div>
                </div>
              </div>
              <Button
                className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase
               text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                disabled={buyProductMutation.isLoading}
                onClick={handleByPurchases}
              >
                Mua Hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
