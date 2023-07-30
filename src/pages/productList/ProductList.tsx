import { useQuery } from '@tanstack/react-query'

import AsideFilter from './asideFilter'
import Product from './product'
import SortProductList from './sortProductList'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/pagination/Pagination'
import useQueryConfig from 'src/hook/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

const ProductList = () => {
  const queryConfig = useQueryConfig()
  const { data: ProductData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {ProductData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter />
            </div>
            <div className='col-span-9'>
              <SortProductList />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {ProductData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination
                pageSize={ProductData.data.data.pagination.page_size}
                queryConfig={queryConfig}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
