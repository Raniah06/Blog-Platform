import React from "react"
const BlogCard = ({ blog }) => {
  return (
    <div>
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      <small>By: {blog.user.username}</small>
    </div>
  );
};

export default BlogCard;
