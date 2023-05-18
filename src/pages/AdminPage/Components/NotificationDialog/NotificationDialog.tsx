import { Fragment } from 'react'
import { Button, Dialog, DialogBody, DialogFooter, Typography } from '@material-tailwind/react'
import { QueryObserverResult, RefetchOptions, useMutation, useQueryClient } from 'react-query'
import adminApi from 'src/apis/admin.api'
import { ExtendedProduct } from 'src/types/product.type'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  refetchData: (options?: RefetchOptions) => Promise<QueryObserverResult<unknown, unknown>>
  CheckedPurchases: ExtendedProduct[]
}
function NotificationDialog({ open, setOpen, refetchData, CheckedPurchases }: Props) {
  const queryClient = useQueryClient()
  const deleteProduct = useMutation({
    mutationFn: adminApi.deleteProduct,
    onSuccess: () => {
      refetchData()
    }
  })
  const handleDelete = () => {
    const productIds = CheckedPurchases.map((product) => product.id)
    deleteProduct.mutate(
      {
        productIds: productIds
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['products'] })
        }
      }
    )
    handleOpen()
  }
  const handleOpen = () => setOpen(!open)
  return (
    <Fragment>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody divider className='grid place-items-center gap-4'>
          <Typography color='red' variant='h4'>
            Sản phẩm đã được thêm vào giỏ hàng
          </Typography>
          <Typography className='text-center font-normal'>Tiếp tục xóa sản phẩm ? </Typography>
        </DialogBody>
        <DialogFooter className='space-x-2'>
          <Button variant='filled' color='blue' onClick={handleOpen}>
            close
          </Button>
          <Button variant='filled' color='red' onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  )
}

export default NotificationDialog
