import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { createSearchParams, useNavigate } from 'react-router-dom'

import useQueryConfig from './useQueryConfig'
import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rule'
const useSearchProducts = () => {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()

  type FormData = Pick<Schema, 'Search_name'>
  const nameSchema = schema.pick(['Search_name'])
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      Search_name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.Search_name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.Search_name
        }
    navigate({
      pathname: '',
      search: createSearchParams(config).toString()
    })
  })
  return { register, onSubmitSearch }
}

export default useSearchProducts
