import React, { createContext, useState } from 'react'
import { ExtendedPurchase } from 'src/types/CartItem.type'
import { User } from 'src/types/user.type'
import { getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAdminRole: boolean
  setIsAdminRole: React.Dispatch<React.SetStateAction<boolean>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurCharses: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  reset: () => void
}
const role: string = getProfileFromLS()?.role ?? null
const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(localStorage.getItem('access_token')),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  isAdminRole: role !== null && role === 'ROLE_ADMIN' ? true : false,
  setIsAdminRole: () => null,
  extendedPurCharses: [],
  setExtendedPurchases: () => null,
  reset: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [isAdminRole, setIsAdminRole] = useState<boolean>(initialAppContext.isAdminRole)
  const [extendedPurCharses, setExtendedPurchases] = React.useState<ExtendedPurchase[]>(
    initialAppContext.extendedPurCharses
  )
  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
    setExtendedPurchases([])
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        isAdminRole,
        setIsAdminRole,
        extendedPurCharses,
        setExtendedPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
