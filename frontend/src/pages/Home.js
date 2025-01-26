import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Home = ({ setError, startLoading, stopLoading }) => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = useCallback(async () => {
    try {
      startLoading();
      const { data } = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(data);
      stopLoading();
    } catch (error) {
      setError("Failed to load blogs. Please try again later.");
      stopLoading();
    }
  }, [setError, startLoading, stopLoading]); // Dependencies for useCallback

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]); // Dependency array for useEffect

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Blog Platform</h1>
      <div className="blog-list">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div className="blog-card" key={blog._id}>
              <h2>{blog.title}</h2>
              <p>{blog.content.slice(0, 100)}...</p>
              <span className="blog-author">By {blog.author}</span>
            </div>
          ))
        ) : (
          <p>No blogs available. Be the first to create one!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
