import {GET_CATEGORIES, GET_BLOGS, GET_PAGINATION, GET_BLOG, GET_HOME_ADS, GET_BLOG_AD, GET_USER_INFO} from "./types";
import {getCategoriesList, getBlogsList, getBlogDetails} from "../../../api/BlogsApi";
import {getHackerInfo} from "../../../api/DashboardApi";
import {getAllHomeAds, getSharedAd} from "../../../api/AdsApi";
import {getNewTokens} from "../../../api/RefreshTokenApi";
// import { showLoading, hideLoading } from "react-redux-loading";

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

export function getPagination(info) {
  return {
    type: GET_PAGINATION,
    pagination: {...info},
  };
}

export function getUserInfo(hackerInfo) {
  return {
    type: GET_USER_INFO,
    userInfo: {...hackerInfo},
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
    blog: {...blog},
  };
}

export function getBlogAd(ad) {
  return {
    type: GET_BLOG_AD,
    blogAd: {...ad},
  };
}

export function handleGetCategories() {
  return (dispatch) => {
    return getCategoriesList()
      .then((res) => res.data)
      .then((categories) => dispatch(getCategories(categories)));
  };
}

export function handleGetBlogs(fetchPageNumber) {
  return (dispatch) => {
    return getBlogsList(fetchPageNumber)
      .then((res) => res.data)
      .then((blogs) => dispatch(getBlogs(blogs.results)));
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

export function handleGetPagination(currentPageNumber) {
  return (dispatch) => {
    return getBlogsList(currentPageNumber)
      .then((res) => res.data)
      .then((pag) => {
        dispatch(getPagination({currentPage: currentPageNumber, count: pag.count, next: pag.next, prev: pag.previous}));
      });
  };
}

export function handleGetUserInfo(token) {
  return (dispatch) => {
    return getHackerInfo(token)
      .then((user) => user.data)
      .then((hackerInfo) => {
        dispatch(getUserInfo(hackerInfo));
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          const reFreshtoken = handleGetUserToken("refreshToken");
          getNewTokens(reFreshtoken);
        }
      });
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
  localStorage.setItem(tableName, userToken);
}

export function handleGetUserToken(tableName) {
  const tokenString = localStorage.getItem(tableName);
  const userToken = tokenString;
  return userToken;
}

export function handleRemoveUserToken(tableName) {
  localStorage.removeItem(tableName);
}
