import React, { useEffect } from "react";
import { connect } from "react-redux";
import FeaturedBlogs from "../../Blog/components/Home/FeaturedBlogs";
import AdsBanner from "../../Blog/components/Home/AdsBanner";
import BlogsList from "../components/Blog/BlogsList";


import {
  handleGetCategories,
  handleGetBlogs,
  handleGetHomeAds,
  handleGetPagination,
} from "../actions/index";

const BlogHome = (props) => {
  const { dispatch, homeAds, featuredBlogs } = props;

  let pageNumberFromURL = (new URLSearchParams(window.location.search)).get("page") || 1;

  useEffect(() => {
    dispatch(handleGetCategories());
    dispatch(handleGetPagination(pageNumberFromURL));
    dispatch(handleGetBlogs(pageNumberFromURL));
    dispatch(handleGetHomeAds());
  }, [dispatch, pageNumberFromURL]);

  return (
    <div className="home blog-wrapper">
      {featuredBlogs.length > 0 && <FeaturedBlogs />}
      <div className="container px-0">
        {homeAds && homeAds.length > 0 && <AdsBanner />}
        <BlogsList />
      </div>
    </div>
  );
};

const mapStateToProps = ({ blogs }) => {
  console.log(blogs);
  return {
    homeAds: blogs.homeAds,
    featuredBlogs: blogs.blogsList.filter((blog) => blog.important === true),
  };
};

export default connect(mapStateToProps)(BlogHome);
