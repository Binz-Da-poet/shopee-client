import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { ProductSchema } from 'src/utils/rule'
import { Button, Dialog, Card, CardBody, DialogHeader, DialogFooter } from '@material-tailwind/react'
import Input from '../Input'
import { QueryObserverResult, RefetchOptions, useMutation, useQuery } from 'react-query'
import categoryApi from 'src/apis/category.api'
import adminApi from 'src/apis/admin.api'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  refetchData: (options?: RefetchOptions) => Promise<QueryObserverResult<unknown, unknown>>
}
const AddCategorySchema = ProductSchema.pick(['name'])
type FormProductHaveImage = { name: string }
function AddModal({ open, setOpen, refetchData }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormProductHaveImage>({
    resolver: yupResolver(AddCategorySchema)
  })

  const AddCategoryMutation = useMutation({
    mutationFn: (name: string) => adminApi.addCategory(name)
  })
  const onSubmit = handleSubmit(async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data: categoryData } = await AddCategoryMutation.mutateAsync(data.name)
      handleOpen()
      refetchData()
    } catch (error) {
      console.log(error)
    }
  })
  const handleOpen = () => setOpen((cur) => !cur)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: categoryData } = useQuery({
    queryKey: ['category'],
    queryFn: () => {
      return categoryApi.getCategories()
    },
    keepPreviousData: true
  })
  return (
    <Dialog
      size='xs'
      open={open}
      handler={handleOpen}
      className='fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto bg-modal bg-opacity-80'
    >
      <Card className='mx-auto w-full max-w-[24rem]'>
        <DialogHeader> Create Product</DialogHeader>
        <CardBody className='flex flex-col p-2'>
          <Input
            type='text'
            className='p-2'
            placeholder='name'
            name='name'
            register={register}
            errorMessage={errors.name?.message}
          ></Input>
        </CardBody>
        <DialogFooter>
          <Button variant='text' onClick={handleOpen} className='mr-1 rounded-lg bg-red-400 text-white'>
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' onClick={onSubmit} className='bg-blue-600'>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Card>
    </Dialog>
  )
}

export default AddModal
