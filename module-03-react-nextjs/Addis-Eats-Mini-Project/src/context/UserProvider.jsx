import {createContext } from 'react'
import { useContext, useState } from 'react'

const UserContext = createContext(null)

function UserProvider({ children }) {
    const [user, setUser] = useState(null);     

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

export function useUser() {
  return useContext(UserContext)
}