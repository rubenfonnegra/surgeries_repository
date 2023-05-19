import { useState, createContext, useContext, useEffect } from "react";
import { getUsersRequests, createUsersRequests, deleteUserRequests, getUserRequest, updatePostRequest } from "../api/users";


const UserContext = createContext()

export const useUsers = () => {
    const context = useContext (UserContext)
    return context
}

export const UserProvider = ({children}) => {
    const [users, setUsers] = useState ([])

    const getUsers = async () => {
        const resUsers = await getUsersRequests()
        setUsers(resUsers.data)
    }
//--------------------
    const createUser = async (user) => {
        const resUser = await createUsersRequests(user)
        setUsers([...users, resUser.data])
     }
 
     const deleteUser = async (id) => {
         const resUser = await deleteUserRequests(id)
         if (resUser.status === 204) {
             setUsers(users.filter((users) => users._id !== id))
         }
     }
 
     const getUser = async (id) => {
         const resUser = await getUserRequest(id)
         return resUser.data
     }
 
     const updatePost = async ( id, user) => {
         const resUser = await updatePostRequest(id, user)
         setUsers(users.map(user => user._id === id ? resUser.data: user))
     }
    
    useEffect(() => {
        getUsers()
      }, [])


    return <UserContext.Provider value={{
        users,
        getUsers,
        createUser,
        deleteUser,
        getUser,
        updatePost

    }}>
        {children}
    </UserContext.Provider>
}