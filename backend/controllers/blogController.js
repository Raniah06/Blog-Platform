const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.create({
      title,
      content,
      user: req.user.id,
      image: req.file ? req.file.path : null,
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("user", "username");
  res.json(blogs);
};
