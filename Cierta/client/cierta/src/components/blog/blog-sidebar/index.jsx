import React, { useState } from 'react';
import { FaBullhorn } from 'react-icons/fa';
import Horn from "../../../asstets/icons/horn.png"
import { Button, Pagination } from 'react-bootstrap';

const BlogSidebar = ({ blogs, onBlogSelect, selectedBlogId, currentPage, totalPages, onPageChange }) => {
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    onPageChange(1, Number(e.target.value));
  };

  return (
    <aside className="blog-sidebar">
     <div className="d-flex justify-content-between align-items-center mb-3">
  <h4 className="blog-sidebar__title m-0">Latest News</h4>
  <div className="select-container">
    <span className="select-label">Show:</span>
    <select 
      className="custom-select"
      value={itemsPerPage}
      onChange={handleItemsPerPageChange}
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
  </div>
</div>

      <ul className="blog-sidebar__list mb-3">
        {blogs?.map((blog) => (
          <li 
            key={blog._id}
            className={`blog-sidebar__item ${blog._id === selectedBlogId ? 'active' : ''}`}
            onClick={() => onBlogSelect(blog._id)}
          >
            <img src={Horn} alt='Horn' className="icon" />
            <span>{blog.title}</span>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-center">
        {totalPages > 1 &&
        <div className="pagination-wrapper">
        <Pagination className="mb-0">
          <Pagination.Prev
            className="page-item"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1, itemsPerPage)}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              className="page-item"
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => onPageChange(i + 1, itemsPerPage)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            className="page-item"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1, itemsPerPage)}
          />
        </Pagination>
      </div>
        }
      </div>
    </aside>
  );
};

export default BlogSidebar;
