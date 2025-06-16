import axios from 'axios';

const BASE_URL_USERS = 'http://localhost:4000/users';

// export const getAllUsers=()=>axios.get(BASE_URL_USERS);

export const getUserByEmail = (email: string) =>
    axios.get(`${BASE_URL_USERS}?email=${email}`);

export const addUsers = (user: any) => axios.post(BASE_URL_USERS, user);

export const updateUsers = (id: number, updatedUsers: any) =>
    axios.put(`${BASE_URL_USERS}/${id}`, updatedUsers);

export const deleteUsers = (id: number) => axios.delete(`${BASE_URL_USERS}/${id}`);