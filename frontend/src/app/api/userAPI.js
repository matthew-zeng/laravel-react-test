import axios from "./axios"

export const getUserAPI = () => axios.get('/api/user')

export const logoutAPI = () => axios.post("/logout")

export const updateUserAPI = ({ data, userId }) => axios.put(`/user/${userId}`, data)

export const csrf = () => axios.get('/sanctum/csrf-cookie')