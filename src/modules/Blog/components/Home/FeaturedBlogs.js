import React from "react";
import { connect } from "react-redux";
import BlogCard from "../Blog/BlogCard";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import { useEffect } from "react";
import { getFeaturedBlogs } from "../../../../api/BlogsApi";
import { useState } from "react";

const FeaturedBlogs = ({ categories }) => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  useEffect(() => {
    getFeaturedBlogs().then(res => {
      setFeaturedBlogs(res.data);
    });
  }, []);

  const params = {
    spaceBetween: 10,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };
  return featuredBlogs.length > 0 ? (
    <div className="container home">
      <div className="featured-blogs">
        <div className="carousel-title mb-4 text-center">
          <h2>أبرز المدونات</h2>
        </div>

        <Swiper {...params}>
          {featuredBlogs.map((currentBlog, index) => (
            <div className="slide carousel-inner" key={index}>
              <BlogCard blog={currentBlog} category={categories.filter(category => category.id === currentBlog.category)[0]} />
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = ({ blogs }) => {
  return {
    categories: blogs.categories,
  };
};

export default connect(mapStateToProps)(FeaturedBlogs);
