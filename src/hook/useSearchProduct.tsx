import useQueryConfig from './useQueryConfig'
import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { omit } from 'lodash'
import { yupResolver } from '@hookform/resolvers/yup'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'

type FormData = Pick<Schema, 'name'>

const nameSchemar = schema.pick(['name'])

const useSearchProduct = () => {
  const queryConfig = useQueryConfig()

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchemar)
  })

  const navigate = useNavigate()

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit({ ...queryConfig, name: data.name })
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })

  return { onSubmitSearch, register }
}

export default useSearchProduct
