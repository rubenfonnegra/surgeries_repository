import axios from "axios";

export const getUsersRequests = async () => await axios.get('http://localhost:4000/users')

export const createUsersRequests = async (user) => await axios.post('http://localhost:4000/users', user)

export const deleteUserRequests = async id => await axios.delete('http://localhost:4000/users/' + id)

export const getUserRequest = async id => await axios.get('http://localhost:4000/users/' + id)

export const updatePostRequest = async (id, newFields) => await axios.put(`http://localhost:4000/users/${id}`, newFields)