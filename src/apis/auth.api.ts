import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

const authApi = {
  registerAccount: (body: {
    email: string
    password: string
    fullName: string
    address: string
    phoneNumber: string
  }) => http.post<AuthResponse>('/auth/register', body),
  loginAccount: (body: { email: string; password: string }) => http.post<AuthResponse>('/auth/authenticate', body),
  logout: () => http.post('/logout')
}
export default authApi
