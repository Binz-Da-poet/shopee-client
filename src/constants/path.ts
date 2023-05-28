export const path = {
  home: '/',
  profile: '/user/profile',
  ChangePassWord: 'user/password',
  login: '/login',
  register: '/register',
  logout: '/logout',
  addProduct: '/add',
  productDetails: '/productDetail',
  image: 'http://localhost:8080/uploads',
  Cart: '/Cart',
  historyPuchases: '/user/historyPurchases',
  AdminProducts: '/AdminProducts',
  AdminUsers: '/AdminUsers',
  AdminCategories: '/AdminCategories',
  Delivery: '/Cart/delivery'
} as const
export const AUTHORIZED_URLS = [
  '/FileUpload',
  '/Products/add',
  '/shopping-carts/addShoppingCart',
  '/shopping-carts/shoppingCart',
  '/CartItem/add',
  '/CartItem/deleteMany',
  '/CartItem/delete',
  '/User/me',
  '/Products/delete',
  '/cartItem/getCartItemsByProduct'
]
