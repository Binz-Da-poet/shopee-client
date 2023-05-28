import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Dialog, Card, CardBody, DialogHeader, DialogFooter } from '@material-tailwind/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import Input from 'src/pages/AdminPage/Components/Input/Input'
import { setPayPurchasesToLS } from 'src/utils/auth'
import { UserSchema } from 'src/utils/rule'
interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  shoppingCartId: number | undefined
  purchaseIds: number[]
}

const FormAddDialog = UserSchema.pick(['fullName', 'address', 'phoneNumber'])
type FormDelivery = { fullName: string; address: string; phoneNumber: string }
function AddDialog({ open, setOpen, shoppingCartId, purchaseIds }: Props) {
  const navigate = useNavigate()
  const handleOpen = () => setOpen((cur) => !cur)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDelivery>({
    resolver: yupResolver(FormAddDialog)
  })

  const onSubmit = handleSubmit((data) => {
    setPayPurchasesToLS(shoppingCartId, purchaseIds, data.address, data.fullName, data.phoneNumber)
    navigate(path.Delivery)
  })
  return (
    <Dialog size='sm' open={open} handler={handleOpen} className='fixed z-[1055] h-fit overflow-scroll '>
      <Card>
        <DialogHeader> Thêm địa chỉ nhận hàng</DialogHeader>
        <CardBody className='flex flex-col p-2'>
          <Input
            labelText='Họ và tên'
            type='text'
            className='p-2'
            name='fullName'
            register={register}
            errorMessage={errors.fullName?.message}
          ></Input>
          <Input
            labelText='Điện thoại'
            type='text'
            className='p-2'
            name='phoneNumber'
            register={register}
            errorMessage={errors.phoneNumber?.message}
          ></Input>
          <Input
            type='address'
            labelText='Địa chỉ nhận'
            className='p-2'
            name='address'
            register={register}
            errorMessage={errors.address?.message}
          ></Input>
        </CardBody>
        <DialogFooter>
          <Button variant='gradient' color='red' onClick={handleOpen} className='mr-1 rounded-lg bg-red-400 text-white'>
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' className='bg-blue-600' onClick={onSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Card>
    </Dialog>
  )
}

export default AddDialog
