import {
  GET_CATEGORIES,
  GET_BLOGS,
  GET_BLOG,
  GET_PAGINATION,
  GET_HOME_ADS,
  GET_BLOG_AD,
} from '../actions/types';

const initialState = {
  categories: [],
  blogsList: [],
  blog: null,
  pagination: {},
};

export default function blogs(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };
    case GET_BLOGS:
      return {
        ...state,
        blogsList: [...action.blogs],
      };
    case GET_PAGINATION:
      return {
        ...state,
        pagination: { ...action.pagination },
      };
    case GET_BLOG:
      return {
        ...state,
        blog: { ...action.blog },
      };
    case GET_HOME_ADS:
      return {
        ...state,
        homeAds: [...action.homeAds],
      };
    case GET_BLOG_AD:
      return {
        ...state,
        blogAd: { ...action.blogAd },
      };
    default:
      return state;
  }
}
