import axios from 'axios';
import { Course } from '../models/course';

const BASE_URL_PRODUCTS = 'http://localhost:4000/courses';

export const getAllProducts=()=>axios.get(BASE_URL_PRODUCTS);

export const getProductById=(id:string)=>axios.get(`${BASE_URL_PRODUCTS}/${id}`);

// export const getMaxCourseId = async () => {
//   const res = await axios.get(`${BASE_URL_PRODUCTS}?_sort=id&_order=desc&_limit=1`);
//   return { data: res.data[0]?.id || 0 };
// };
export const getMaxCourseId = async () => {
  const res = await axios.get(BASE_URL_PRODUCTS);
  const allIds = res.data.map((c: any) => Number(c.id));
  const maxId = Math.max(...allIds);
  return { data: maxId || 0 };
};

export const addProduct=(product:Course)=>axios.post(BASE_URL_PRODUCTS, product);


export const updateProduct = (id: string, updatedProduct: any) =>
  axios.put(`${BASE_URL_PRODUCTS}/${id}`, updatedProduct);

export const deleteProduct = (id:string) => axios.delete(`${BASE_URL_PRODUCTS}/${id}`);

export const getHighRatedCourses = () =>
  axios.get(`${BASE_URL_PRODUCTS}?rating_gte=4`);

export const getTopRatedCourses = () =>
  axios.get(`${BASE_URL_PRODUCTS}?_sort=rating&_order=desc&_limit=10`);
// שליפת קורסים לפי סינון (search, categories, priceRange)
export const getFilteredCourses = (filters: {
  search?: string;
  categories?: string[];
  priceRange?: [number, number];
}) => {
  const params: any = {};

  if (filters.search) {
    params.q = filters.search; // json-server תומך ב-q כסינון כללי
  }

  if (filters.categories?.length) {
    // json-server לא תומך ב-in, נבצע שאילתה מרובת קטגוריות (רק אם שרת תומך)
    params.category = filters.categories;
  }

  if (filters.priceRange) {
    params.price_gte = filters.priceRange[0];
    params.price_lte = filters.priceRange[1];
  }

  return axios.get(BASE_URL_PRODUCTS, { params });
};

// שליפת כל הקטגוריות הקיימות בשרת
// export const getAllCategories = async () => {
//   const res = await axios.get(BASE_URL_PRODUCTS);
//   const unique = [...new Set(res.data.map((c: any) => c.category))];
//   return { data: unique };
// };
// export const getAllCategories = async () => {
//   const res = await axios.get(BASE_URL_PRODUCTS);
//   const allCourses = res.data;

//   const uniqueCategories = Array.from(
//     new Set(allCourses.map((course: any) => course.category).filter(Boolean))
//   );

//   return { data: uniqueCategories };
// };
export const getAllCategories = async (): Promise<{ data: string[] }> => {
  const res = await axios.get(BASE_URL_PRODUCTS);
  const allCourses = res.data;

  const uniqueCategories: string[] = Array.from(
    new Set(
      allCourses
        .map((course: any) => course.category)
        .filter((cat:any): cat is string => typeof cat === 'string' && cat.trim() !== '')
    )
  );

  return { data: uniqueCategories };
};

// שליפת טווח המחירים (מינימום ומקסימום)
export const getPriceRange = async () => {
  const res = await axios.get(BASE_URL_PRODUCTS);
  const prices = res.data.map((c: any) => c.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return { data: { min, max } };
};
