import axios from 'axios';

const BASE_URL_PRODUCTS = 'http://localhost:4000/courses';

export const getAllProducts=()=>axios.get(BASE_URL_PRODUCTS);

export const getProductById=(id:number)=>axios.get(`${BASE_URL_PRODUCTS}/${id}`);

export const addProduct=(product:any)=>axios.post(BASE_URL_PRODUCTS, product);

export const updateProduct = (id:number, updatedProduct:any) =>
  axios.put(`${BASE_URL_PRODUCTS}/${id}`, updatedProduct);

export const deleteProduct = (id:number) => axios.delete(`${BASE_URL_PRODUCTS}/${id}`);