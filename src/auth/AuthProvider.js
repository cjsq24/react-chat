import { createContext, useEffect, useState } from 'react';
import useLocalStorage from '../helpers/useLocalStorage';

export const AuthContext = createContext()

export default function AuthProvider({children}) {
   const [userLocal, setUserLocal] = useLocalStorage('csc_user')
   const [user, setUser] = useState(userLocal || null)
   
   useEffect(() => {
      setUserLocal(user)
   }, [user, setUserLocal])

   const contextValue = {
      user,
      login(data) {
         setUser(data)
      },
      logout() {
         setUser(null)
         window.location.href = `${window.location.origin.toString()}/login`
      },
      isLogged() {
         return !!user
      },
      updateUserInfo(data) {
         setUser(data)
         setUserLocal(data)
      }
   }

   return (
      <AuthContext.Provider value={contextValue}>
         {children}
      </AuthContext.Provider>
   )
}