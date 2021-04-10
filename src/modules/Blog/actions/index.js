import {
  GET_CATEGORIES,
  GET_BLOGS,
  GET_BLOG,
  GET_HOME_ADS,
  GET_BLOG_AD,
} from './types';
import {
  getCategoriesList,
  getBlogsList,
  getBlogDetails,
} from '../../../api/BlogsApi';
import { getAllHomeAds, getSharedAd } from '../../../api/AdsApi';
// import { showLoading, hideLoading } from "react-redux-loading";
import { getHackerInfo } from '../../../api/HackerInfoApi';



export function getCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories: [...categories],
  };
}

export function getBlogs(blogs) {
  return {
    type: GET_BLOGS,
    blogs: [...blogs],
  };
}

export function getHomeAds(ads) {
  return {
    type: GET_HOME_ADS,
    homeAds: [...ads],
  };
}

export function getBlog(blog) {
  return {
    type: GET_BLOG,
    blog: { ...blog },
  };
}

export function getBlogAd(ad) {
  return {
    type: GET_BLOG_AD,
    blogAd: { ...ad },
  };
}

export function handleGetCategories() {
  return (dispatch) => {
    return getCategoriesList()
      .then((res) => res.data)
      .then((categories) => dispatch(getCategories(categories)));
  };
}

export function handleGetBlogs() {
  return (dispatch) => {
    return getBlogsList()
      .then((res) => res.data)
      .then((blogs) => dispatch(getBlogs(blogs)));
  };
}

export function handleGetBlog(id) {
  return (dispatch) => {
    return getBlogDetails(id)
      .then((res) => res.data)
      .then((blog) => dispatch(getBlog(blog)));
  };
}

export function handleGetHomeAds() {
  return (dispatch) => {
    return getAllHomeAds()
      .then((res) => res.data)
      .then((ads) => dispatch(getHomeAds(ads)));
  };
}

export function handleGetBlogAd() {
  return (dispatch) => {
    return getSharedAd()
      .then((res) => res.data)
      .then((ad) => dispatch(getBlogAd(ad)));
  };
}

export function handleSetUserToken(tableName, userToken) {
  localStorage.setItem(tableName, JSON.stringify(userToken));
}

export function handleGetUserToken(tableName) {
  const tokenString = localStorage.getItem(tableName);
  const userToken = JSON.parse(tokenString);
  return userToken
}

export function handleRemoveUserToken(tableName) {
  localStorage.removeItem(tableName);
}

export function handleGetHackerInfo() {
  return getHackerInfo()
    .then((res) => res.data)
    .then((data) => {
      const userInfo = data.json();
      return userInfo;
    });
}