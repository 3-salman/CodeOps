import {createContext } from 'react'
import { useContext, useState } from 'react'

const UserContext = createContext(null)

function UserProvider({ children }) {
    const [user, setUserState] = useState(JSON.parse(localStorage.getItem('user') || 'null'))

  function setUser(newUser) {
    setUserState(newUser)
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser))
    } else {
      localStorage.removeItem('user')
    }
  }
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