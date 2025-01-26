import React from "react"
import BlogCard from "./BlogCard";

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
