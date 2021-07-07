import axios from 'axios';
import { apiUrl } from './Constants';

const blogsURL = apiUrl + '/blogs';

export const getCategoriesList = () => axios.get(`${blogsURL}/categories/`);

export const getBlogsList = (pageNumber) => axios.get(`${blogsURL}?page=${pageNumber}`);

export const getBlogsBySearch = (queryPageNum, keyword) => axios.get(`${apiUrl}/blogs?page=${queryPageNum}&search=${keyword}`);

export const getBlogDetails = (id) => axios.get(`${blogsURL}/${id}/`);

export const searchByCategory = (category) =>
  axios.get(`${blogsURL}/search/categories?category=${category}/`);