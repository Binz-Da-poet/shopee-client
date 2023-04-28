import * as yup from 'yup'

// type Rules = { [key: string]: RegisterOptions }
// export const rules: Rules = {
//   email: {
//     required: {
//       value: true,
//       message: 'Chưa Nhập Email'
//     },
//     pattern: {
//       value: /^\S+@\S+\.\S+$/,
//       message: 'Email không đúng định dạng'
//     }
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'Chưa nhập mật Khẩu'
//     },
//     pattern: {
//       value: /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/,
//       message: 'độ dài tối thiểu 8 ký tự,Ít nhất một chữ cái viết hoa'
//     }
//   },
//   fullName: {
//     required: {
//       value: true,
//       message: 'Chưa Nhập Họ và Tên'
//     }
//   },
//   address: {
//     required: {
//       value: true,
//       message: 'Chưa nhập địa chỉ'
//     }
//   },
//   phoneNumber: {
//     required: {
//       value: true,
//       message: 'Chưa nhập số điện thoại'
//     },
//     pattern: {
//       value: /^[+0][0-9]{7,14}$/,
//       message: 'Số điện thoại không đúng'
//     }
//   }
// }

export const schema = yup.object({
  email: yup
    .string()
    .required('Chưa Nhập Email')
    .min(5, 'Độ dài từ 5-160 kí tự')
    .max(160, 'Độ dài từ 5-160 kí tự')
    .email('Email không đúng định dạng'),
  password: yup
    .string()
    .required('Chưa nhập mật khẩu')
    .min(8, 'độ dài tối thiểu 8 ký tự')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/, 'độ dài tối thiểu 8 ký tự,Ít nhất một chữ cái viết hoa'),
  new_password: yup
    .string()
    .required('Chưa nhập mật khẩu')
    .min(8, 'độ dài tối thiểu 8 ký tự')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/, 'độ dài tối thiểu 8 ký tự,Ít nhất một chữ cái viết hoa'),
  confirm_password: yup
    .string()
    .required('nhập lại Password là bắt buộc')
    .min(6, 'Độ dài password phải từ 6-160 kí tự')
    .max(160, 'Độ dài password phải từ 6-160 kí tự')
    .oneOf([yup.ref('new_password')], 'Nhập lại password chưa khớp'),
  fullName: yup.string().required('Chưa Nhập Họ và Tên').max(160, 'Độ dài tối đa là 160 kí tự'),
  avatar: yup.string(),
  address: yup.string().required('Chưa nhập địa chỉ').max(160, 'Độ dài tối đa là 160 kí tự'),
  phoneNumber: yup
    .string()
    .required('Chưa nhập số điện thoại')
    .matches(/^[+0][0-9]{7,14}$/, 'Số điện thoại không đúng'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không hợp lệ',
    test: function (value) {
      const price_min = value
      const { price_max } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_max !== '' || price_min !== ''
    }
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không hợp lệ',
    test: function (value) {
      const price_max = value
      const { price_min } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_max !== '' || price_min !== ''
    }
  }),
  Search_name: yup.string().trim().required('Hãy nhập tên sản phẩm')
})
export const UserSchema = yup.object({
  fullName: yup.string().trim().max(160, 'độ dài tối thiểu 160 ký tự'),
  phoneNumber: yup
    .string()
    .required('Chưa nhập số điện thoại')
    .matches(/^[+0][0-9]{7,14}$/, 'Số điện thoại không đúng'),
  avatar: yup.string(),
  address: yup.string().required('Chưa nhập địa chỉ').max(160, 'Độ dài tối đa là 160 kí tự'),
  password: yup
    .string()
    .required('Chưa nhập mật khẩu')
    .min(8, 'độ dài tối thiểu 8 ký tự')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/, 'độ dài tối thiểu 8 ký tự,Ít nhất một chữ cái viết hoa'),
  newPassWord: yup
    .string()
    .required('Chưa nhập mật khẩu')
    .min(8, 'độ dài tối thiểu 8 ký tự')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/, 'độ dài tối thiểu 8 ký tự,Ít nhất một chữ cái viết hoa'),
  Image: yup.mixed().test('fileSize', 'Your image is too big :(', (value) => {
    console.log(value)
  })
})
export type UserSchema = yup.InferType<typeof UserSchema>
const LoginSchema = schema.omit(['fullName', 'address', 'phoneNumber'])
export type LoginSchema = yup.InferType<typeof LoginSchema>
export type Schema = yup.InferType<typeof schema>
