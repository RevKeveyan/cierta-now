// BlogWrapper.jsx
import React, { useState, useEffect } from 'react';
import BlogMain from './blog-main';
import BlogSidebar from './blog-sidebar';
import './style.scss';
import useContentService from '../../service/getContent';

// BlogWrapper.jsx
const BlogWrapper = () => {
  const [pagination, setPagination] = useState({
    blogs: [],
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 5
  });
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { getAllBlogs, getBlogById,getNewestBlog } = useContentService();

  useEffect(()=>{
    getNewestBlog(setSelectedBlog)
  },[])


  useEffect(() => {
    getAllBlogs(pagination.currentPage, pagination.itemsPerPage, setPagination);
  }, [pagination.currentPage, pagination.itemsPerPage]);


  const handlePageChange = (newPage, newLimit) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage,
      itemsPerPage: newLimit || prev.itemsPerPage
    }));
  };

  const handleBlogSelect = async (id) => {
    
    try {
      const blog = await getBlogById(id);
      setSelectedBlog(blog);

    } catch (error) {
      console.error('Error loading blog:', error);
    }
  };

  return (
    <section className="blog-page">
      <div className="blog-page__container">
        <BlogMain blog={selectedBlog} />
        <BlogSidebar 
          blogs={pagination.blogs}
          onBlogSelect={handleBlogSelect}
          selectedBlogId={selectedBlog?._id}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
export default BlogWrapper;