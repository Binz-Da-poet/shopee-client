export interface Category {
  id: number
  name: string
}
export interface ExtendedCategory extends Category {
  checked: boolean
}
