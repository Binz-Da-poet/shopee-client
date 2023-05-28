import { useMutation, useQuery } from 'react-query'
import adminApi from 'src/apis/admin.api'
import { path } from 'src/constants/path'
import defaultAvatar from 'src/assets/avatarDefault.png'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { UserPlusIcon } from '@heroicons/react/24/solid'

import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, Avatar } from '@material-tailwind/react'
import useSearchProducts from 'src/hook/useSearchProducts'
import useQueryConfig from 'src/hook/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

const TABLE_HEAD = ['User', ' Address', 'Status', 'Role', 'Change State']
function AdminUsers() {
  const { onSubmitSearch, register } = useSearchProducts()

  const queryConfig = useQueryConfig()
  const { data, refetch } = useQuery({
    queryKey: ['UserList', queryConfig],
    queryFn: () => {
      return adminApi.getAllUser(queryConfig as ProductListConfig)
    },
    staleTime: 3 * 60 * 1000
  })
  const UserList = data?.data.data.content

  const ChangeStateMutaion = useMutation({
    mutationFn: adminApi.changeState
  })

  const handleChangeState = (purchaseIndex: number) => () => {
    const UserId = UserList && UserList[purchaseIndex]?.userId
    ChangeStateMutaion.mutate(UserId as number, {
      onSuccess: () => {
        console.log('change user sucess')
        refetch()
      }
    })
  }
  return (
    <Card className='h-fit w-full'>
      <CardHeader floated={false} shadow={false} className='rounded-none'>
        <div className='mb-8 flex items-center justify-between gap-8'>
          <div>
            <Typography variant='h5' color='blue-gray'>
              Users list
            </Typography>
            <Typography color='gray' className='mt-1 font-normal'>
              See information about all Users
            </Typography>
          </div>
          <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
            <Chip variant='gradient' value={`Total Users :  ${UserList?.length}`} color='deep-orange' />
            <Button className='flex items-center gap-3' color='blue' size='sm'>
              <UserPlusIcon strokeWidth={2} className='h-4 w-4' /> Add member
            </Button>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <div className='w-full md:w-72'>
            <form className=' col-span-6 col-start-5' onSubmit={onSubmitSearch}>
              <Input
                label='Search'
                icon={<MagnifyingGlassIcon className='h-5 w-5' onClick={onSubmitSearch} />}
                {...register('Search_name')}
              />
            </form>
          </div>
        </div>
      </CardHeader>
      <CardBody className='mx overflow-scroll px-0'>
        <table className='mt-4 w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                  <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {UserList?.map(({ fullName, address, avatar, email, role, status, userId }, index) => {
              const isLast = index === UserList.length - 1
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

              return (
                <tr key={userId}>
                  <td className={classes}>
                    <div className='flex items-center gap-3'>
                      <Avatar src={avatar ? `${path.image}/${avatar}` : defaultAvatar} alt={fullName} size='sm' />
                      <div className='flex flex-col'>
                        <Typography variant='small' color='blue-gray' className='font-normal'>
                          {fullName}
                        </Typography>
                        <Typography variant='small' color='blue-gray' className='font-normal opacity-70'>
                          {email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className='flex flex-col'>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {address}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className='w-max'>
                      <Chip
                        variant='gradient'
                        value={status == 'NonLocked' ? 'open' : 'Locked'}
                        color={status == 'NonLocked' ? 'green' : 'red'}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      {role}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Button
                      size='sm'
                      color={status == 'NonLocked' ? 'red' : 'green'}
                      onClick={handleChangeState(index)}
                    >
                      {status == 'NonLocked' ? 'Lock' : 'open'}
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </CardBody>
      {/* <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          Page {1} of {data?.data.data.totalPages}
        </Typography>
        <div className='flex gap-2'>
          <Button variant='outlined' color='blue-gray' size='sm'>
            Previous
          </Button>
          <Button variant='outlined' color='blue-gray' size='sm'>
            Next
          </Button>
        </div>
      </CardFooter> */}
    </Card>
  )
}

export default AdminUsers
