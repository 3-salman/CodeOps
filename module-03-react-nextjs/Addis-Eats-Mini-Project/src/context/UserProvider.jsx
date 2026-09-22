import {createContext } from 'react'

const UserContext = createContext(null)

function UserProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData') || '[]'));
         

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