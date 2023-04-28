import { UpdateUser, User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/User'
const UserApi = {
  getProfile: () => http.get<SuccessResponse<User>>(`${URL}/me`),
  updateProfile: (body: UpdateUser) => http.post<SuccessResponse<User>>(`${URL}/update`, body),
  changePassword: (body: { password: string; new_password: string }) =>
    http.post<SuccessResponse<User>>(`${URL}/changePassword`, body)
}
export default UserApi
