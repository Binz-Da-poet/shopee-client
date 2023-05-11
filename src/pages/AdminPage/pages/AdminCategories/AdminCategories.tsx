import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import adminApi from 'src/apis/admin.api'
import AddCategory from '../../Components/AddCategory/AddCategory'
import { ExtendedCategory } from 'src/types/category.type'
import { produce } from 'immer'
import Button from 'src/components/Button'
function AdminCategories() {
  const [extendedCategory, setExtendedCategory] = useState<ExtendedCategory[]>([])
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const handleOpen = () => setOpenCreateModal((cur) => !cur)
  const { data: CategoryList, refetch } = useQuery({
    queryKey: ['CategoryList'],
    queryFn: () => {
      return adminApi.getAllCategory()
    },
    staleTime: 3 * 60 * 1000
  })
  const isAllChecked = extendedCategory.every((category) => category.checked)
  const CategorysList = CategoryList?.data.data
  const CheckedCategory = extendedCategory.filter((Category) => Category.checked)
  const deleteCategory = useMutation({
    mutationFn: adminApi.delateCategory,
    onSuccess: () => {
      refetch()
    }
  })
  useEffect(() => {
    setExtendedCategory(
      CategorysList?.map((category) => ({
        ...category,
        checked: false
      })) || []
    )
  }, [CategorysList])
  const handleCheck = (CategoryIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedCategory(
      produce((draft) => {
        draft[CategoryIndex].checked = event.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendedCategory((prev) =>
      prev.map((prduct) => ({
        ...prduct,
        checked: !isAllChecked
      }))
    )
  }
  const handleDelete = () => {
    const CategoryIds = CheckedCategory.map((category) => category.id)
    deleteCategory.mutate({
      categoryIds: CategoryIds
    })
  }
  return (
    <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between  border-b-2 border-b-black/10 pb-4 text-gray-900 '>
        <h2 className=' text-4xl font-bold leading-tight text-gray-900'>Users</h2>
        <p className='rounded bg-orange px-4 py-2 font-bold text-white '>Total : {CategoryList?.data.data.length}</p>
        <button className='rounded-xl bg-blue-500 px-4 py-2 font-bold text-white' onClick={handleOpen}>
          + Create Category
        </button>
      </div>
      <table className='w-full table-fixed'>
        <thead>
          <tr className='py-4 text-base font-thin text-gray-500 '>
            <th className='w-10 pr-10'></th>
            <th className='px-4 py-2 '>ID</th>
            <th className='px-4 py-2'>Name</th>
          </tr>
        </thead>
        <tbody>
          {extendedCategory?.map((category, index) => (
            <tr key={index} className='text-center text-sm font-thin'>
              <td className=' w-20'>
                <input
                  type='checkbox'
                  className='m-auto h-5 w-5 accent-orange'
                  checked={category.checked}
                  onChange={handleCheck(index)}
                />
              </td>
              <td className='whitespace-pre-line border px-2'>{category.id}</td>
              <td className='border px-2 '>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mt-6 flex items-center'>
        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
          <input type='checkbox' className='h-5 w-5 accent-orange' checked={isAllChecked} onChange={handleCheckAll} />
        </div>
        <button className='mx-3 border-none bg-none ' onClick={handleCheckAll}>
          Chọn tất cả ({CheckedCategory.length})
        </button>
        <Button className='rounded bg-orange px-4 py-2 font-bold text-white' onClick={handleDelete}>
          Xóa
        </Button>
      </div>
      {openCreateModal ? (
        <>
          <AddCategory open={openCreateModal} setOpen={setOpenCreateModal} refetchData={refetch} />
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default AdminCategories
