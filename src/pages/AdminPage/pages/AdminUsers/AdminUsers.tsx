import { useQuery } from 'react-query'
import adminApi from 'src/apis/admin.api'
import { path } from 'src/constants/path'
import defaultAvatar from 'src/assets/avatarDefault.png'

function AdminUsers() {
  const { data, refetch } = useQuery({
    queryKey: ['UserList'],
    queryFn: () => {
      return adminApi.getAllUser()
    },
    staleTime: 3 * 60 * 1000
  })
  const UserList = data?.data.data

  return (
    <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between  border-b-2 border-b-black/10 pb-4 text-gray-900 '>
        <h2 className=' text-4xl font-bold leading-tight text-gray-900'>Users</h2>
        <p className='rounded bg-orange px-4 py-2 font-bold text-white '>Total : {UserList?.length}</p>
      </div>
      <table className='w-full table-fixed'>
        <thead>
          <tr className='py-4 text-base font-thin text-gray-500 '>
            <th className='px-4 py-2 '>Product Name</th>
            <th className='px-4 py-2'>Image</th>
            <th className='px-4 py-2'>Email</th>
            <th className='px-4 py-2'>Address</th>
            <th className='px-4 py-2'>PhoneNumber</th>
            <th className='px-4 py-2'>Role</th>
          </tr>
        </thead>
        <tbody>
          {UserList?.map((user, index) => (
            <tr key={index} className='text-center text-sm font-thin'>
              <td className='whitespace-pre-line border px-2'>{user.fullName}</td>

              <td className=' border px-2'>
                <img
                  src={user.avatar ? `${path.image}/${user.avatar}` : defaultAvatar}
                  alt={user.fullName}
                  className='m-auto h-16'
                />
              </td>
              <td className=' border px-2'>{user.email}</td>
              <td className='border px-2 '>{user.address}</td>
              <td className='border px-2 '>{user.phoneNumber}</td>
              <td className='border px-2 '>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminUsers
