import React, { useState } from 'react';
import blogImage from '../../../asstets/blog/blog.png';
import { api } from '../../../helpers';

const BlogMain = ({ blog }) => {
  if (!blog) return <div>Loading...</div>;

  return (
    <div className="blog-main">
      <img 
        src={`${api}/${blog?.image} `|| blogImage} 
        alt="Main post" 
        className="blog-main__image" 
      />

      <h2 className="blog-main__title">{blog?.title}</h2>
      <p className="blog-main__date">
        {new Date(blog?.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>

      <p className="blog-main__text">{blog?.content}</p>
    </div>
  );
};

export default BlogMain;
