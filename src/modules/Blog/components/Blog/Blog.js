import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Markup } from "interweave";
import { Link } from "react-router-dom";

import BlogCard from "./BlogCard";
import AdsBanner from "./AdBanner";
import SocialIcon from "../../../../shared/components/SocialIcon";

import { handleGetBlog, handleGetBlogAd } from "../../actions/index";
import { formatDate } from "../../../../shared/utils/helpers";

import {
  TelegramIcon,
  TwitterIcon,
  FacebookIcon,
} from "../../../../assets/index";

const Blog = ({ blog, similarBlogs, categories, blogAd, dispatch, match }) => {
  const [blogFullPath, setBlogFullPath] = useState("");

  useEffect(() => {
    const id = match.params.id;
    if (id) {
      setBlogFullPath(window.location.href);
      dispatch(handleGetBlog(id));
      dispatch(handleGetBlogAd());
    }
  }, [match.params.id]);

  useEffect(() => {
    if (blog) {
      const images = document.querySelectorAll(".body img");
      images.forEach((img) => {
        let imageSrc = img.getAttribute("src");
        const srcStart = imageSrc.indexOf("/media");
        imageSrc = imageSrc.slice(srcStart);
        img.onclick = function () {
          if (img.style.transform === "scale(2)") {
            img.style.transform = "scale(1)";
            img.style.transition = "transform 0.25s ease";
            img.style.display = "initial";
            img.style.margin = "initial";
            return;
          }
          img.style.transform = "scale(2)";
          img.style.transition = "transform 0.25s ease";
          img.style.display = "block";
          img.style.margin = "auto";
        };
      });
    }
  }, [blog]);

  const SocialIconsGroup = ({ classNames }) => (
    <div className={`share mb-4 ${classNames ? classNames : ""}`}>
      <p className="social-icon-group">
        <span className="mx-2">مشاركة في:</span>
        <SocialIcon
          icon={TelegramIcon}
          alt="telegram icon"
          link={`https://t.me/share/url?url=${blogFullPath}&text=${blog.title}`}
        />
        <SocialIcon
          icon={TwitterIcon}
          alt="twitter icon"
          link={"https://twitter.com/share?ref_src=twsrc%5Etfw"}
        />
        <SocialIcon
          icon={FacebookIcon}
          alt="facebook icon"
          link={`https://www.facebook.com/sharer.php?u=${blogFullPath}`}
        />
      </p>
    </div>
  );

  return (
    blog !== null && (
      <div className="blog-wrapper">
        <div className="container home blog-wrapper">
          <div className="container blog-container">
            <div className="title text-center">
              <h2>{blog.title}</h2>
            </div>
            <div className="date text-center">
              <p>{formatDate(blog.publish)}</p>
            </div>
            <SocialIconsGroup classNames="text-center" />
            <div className="blog-cover-container my-4 p-4">
              <img
                src={blog.cover ? blog.cover : ""}
                className="card-img cover img-fluid"
                alt="blog cover"
                loading="lazy"
              />
            </div>
            <div className="body mb-4">
              <Markup allowElements={"iframe"} content={blog.body} />
            </div>
            <div className="blog-tags my-4">
              {blog.tags.map((tag) => (
                <Link to={`/tags/${tag}`} key={`${blog.id}-${tag}`}>
                  <span
                    key={`${blog.id}-${tag}`}
                    className="blog-tag mx-1 my-2"
                  >
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
            <hr />
            <SocialIconsGroup />
            {blogAd && <AdsBanner />}
            {similarBlogs.length > 0 && (
              <div className="similar-blogs mt-4">
                <h3 className="mb-4">مدونات ذات صلة</h3>
                {similarBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    category={
                      categories.filter(
                        (category) => category.id === blog.category
                      )[0]
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

const mapStateToProps = ({ blogs }) => {
  const blog = blogs.blog;
  return {
    categories: blogs.categories,
    blog: blog ? blog.post : null,
    blogAd: blogs.blogAd ? blogs.blogAd : null,
    similarBlogs: blog?.similar_posts.length > 0 ? [...blog.similar_posts] : [],
  };
};

export default connect(mapStateToProps)(Blog);
