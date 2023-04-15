import React, { createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAdminRole: boolean
  setIsAdminRole: React.Dispatch<React.SetStateAction<boolean>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}
const role: string = getProfileFromLS()?.role ?? null
const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(localStorage.getItem('access_token')),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  isAdminRole: role !== null && role === 'ADMIN' ? true : false,
  setIsAdminRole: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [isAdminRole, setIsAdminRole] = useState<boolean>(initialAppContext.isAdminRole)
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        isAdminRole,
        setIsAdminRole
      }}
    >
      {children}
    </AppContext.Provider>
  )
}