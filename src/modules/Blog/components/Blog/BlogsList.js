import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { getBlogsBySearch } from "../../../../api/BlogsApi";
import { getPagination } from "../../actions/index";

import CustomSelect from '../../../../shared/components/FormFields/CustomSelect';
import BlogCard from './BlogCard';
import Pagination from '../layout/Pagination';

const BlogsList = ({ categories, blogsList, pagination }) => {
  const perPage = 5;
  let history = useHistory();
  const sortOptions = [
    { id: 0, label: 'الأحدث', value: 'الأحدث' },
    { id: 1, label: 'الأقدم', value: 'الأقدم' },
  ];
  const [categoriesFilters, setCategoriesFilters] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [sortedBlogs, setSortedBlogs] = useState([]);
  const [query, setQuery] = useState([]);
  const [currentPageBlogs, setCurrentPageBlogs] = useState([]);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [currentSearch, setCurrentSearch] = useState(null);
  const [currentSort, setCurrentSort] = useState({
    id: 0,
    label: 'الأحدث',
    value: 'الأحدث',
  });

  useEffect(() => {
    let sortedBlogs = [...blogsList];
    let blogsCount = pagination.count;

    if (currentFilter) {
      sortedBlogs = blogsList.filter(
        (blog) => blog.category === currentFilter.id
      );
      blogsCount = sortedBlogs.length;

    } else if (currentSearch) {
      sortedBlogs = currentSearch.results;
      blogsCount = currentSearch.count;
    }

    if (currentSort.id === 0) {
      sortedBlogs.sort((a, b) => new Date(b.publish) - new Date(a.publish));
    } else {
      sortedBlogs.sort((a, b) => new Date(a.publish) - new Date(b.publish));
    }

    setSortedBlogs([...sortedBlogs]);
    setCurrentPageBlogs([...sortedBlogs.slice(0, perPage)]);
    setPageCount(blogsCount / perPage);
  }, [blogsList, currentFilter, currentSort, currentSearch]);


  useEffect(() => {
    const filters = [];

    if (categories) {
      categories.forEach((category) =>
        filters.push({
          id: category.id,
          label: category.title,
          value: category.title,
        })
      );
      setCategoriesFilters([...filters]);
    }
  }, [categories]);

  const onFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const onSearchForm = (e) => {
    e.preventDefault();

    getBlogsBySearch(currentPageNum, query)
      .then(res => {
        console.log(res.data);
        setCurrentSearch(res.data);
        setPageCount(res.data.count);
      })
  };

  const onSearchInput = (e) => {
    setQuery(e.target.value);
  };

  const onSortChange = (option) => {
    setCurrentSort(option);
  };

  const handlePageClick = (data) => {
    const selected = data.selected + 1;

    setCurrentPageNum(selected);

    history.push(`/blog?page=${selected}`);

    setCurrentPageBlogs([...sortedBlogs]);

    getBlogsBySearch(currentPageNum, query)
      .then(res => {
        setCurrentSearch(res.data);
        setPageCount(res.data.count);
      })
      .catch(function (error) {
        if (error.response.status == 404) {
          setSortedBlogs([]);
        }
      })
  };

  return (
    <div className="blogs-list mb-4">
      <div className="blogs-list-title mb-4 text-center">
        <h2>{currentFilter ? currentFilter.label : 'كل المدونات'}</h2>
      </div>
      <div className="blogs-list-body row">
        <div className="sidenav col-md-3">
          <CustomSelect
            id="category"
            value={currentFilter}
            options={categoriesFilters}
            isClearable={true}
            isSearchable={true}
            placeholder="الفئة"
            label="فلترة بحسب الفئة"
            classNames="form-group w-100 categories-filters"
            onChange={onFilterChange}
          />
          <CustomSelect
            id="sort"
            value={currentSort}
            options={sortOptions}
            isSearchable={true}
            label="ترتيب حسب"
            classNames="form-group w-100 sort-options"
            onChange={onSortChange}
          />
        </div>
        <div className="main p-0 col-md-9">
          <form className="mb-4" onSubmit={onSearchForm}>
            <div className="form-row">
              <div className="col-md-10 col-sm-10">
                <input type="text" className="form-control custom-input" placeholder="أبحث عن تدوينة معينة بالعنوان" onChange={onSearchInput} />
              </div>
              <div className="col-md-2 col-sm-2">
                <button type="submit" className="btn btn-lightgreen d-block w-100 blog-search-button"><BiSearchAlt /></button>
              </div>
            </div>
          </form>
          {sortedBlogs.length > 0 ? (
            currentPageBlogs.length > 0 &&
            currentPageBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                category={
                  categories.filter(
                    (category) => category.id === blog.category
                  )[0]
                }
              />
            ))
          ) : (
            <div className="alert alert-dark text-center" role="alert">
              لا يوجد أي مدونات تحت هذه الفئة حتى الآن، يمكنك المحاولة مرة آخرى
              لاحقًا.
            </div>
          )}
        </div>
      </div>
      {sortedBlogs.length >= perPage || sortedBlogs.length >= 1 ? (
        <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ blogs }) => {
  return {
    categories: blogs.categories,
    blogsList: blogs.blogsList,
    pagination: blogs.pagination,
  };
};

export default connect(mapStateToProps)(BlogsList);
