import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { apiUrl } from '../../../../api/Constants';

const ByTagsList = ({ categories }) => {
  const { tag } = useParams();
  const [blogsList, setBlogList] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/blogs/search/tags?tag=${tag}`)
      .then((res) => res.data)
      .then((data) => setBlogList(data));
  }, [tag]);

  return (
    <div className="container home">
      <section className="filtered-by-tag">
        <div className="blogs-list-title mb-4 text-center">
          <h2>
            <bdi>{tag}</bdi>
          </h2>
        </div>
        <div className="list">
          {blogsList.map((blog) => (
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
      </section>
    </div>
  );
};

const mapStateToProps = ({ blogs: { categories } }) => {
  return {
    categories: categories,
  };
};

export default connect(mapStateToProps)(ByTagsList);
