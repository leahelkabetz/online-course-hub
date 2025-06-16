import axios from 'axios';

const BASE_URL_REVIEWS = 'http://localhost:4000/reviews';

export const getAllReviews=()=>axios.get(BASE_URL_REVIEWS);

export const getReviewsById=(id:number)=>axios.get(`${BASE_URL_REVIEWS}/${id}`);

export const addReviews=(reviews:any)=>axios.post(BASE_URL_REVIEWS, reviews);

export const updateReviews = (id:number, updatedReviews:any) =>
  axios.put(`${BASE_URL_REVIEWS}/${id}`, updatedReviews);

export const deleteReviews = (id:number) => axios.delete(`${BASE_URL_REVIEWS}/${id}`);