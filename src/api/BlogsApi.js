import axios from 'axios';
import { apiUrl } from './Constants';

const blogsURL = apiUrl + '/blogs';

export const getCategoriesList = () => axios.get(`${blogsURL}/categories/`);

export const getBlogsList = () => axios.get(`${blogsURL}?page=1`);

export const getBlogDetails = (id) => axios.get(`${blogsURL}/${id}/`);

export const searchByCategory = (category) =>
  axios.get(`${blogsURL}/search/categories?category=${category}/`);
