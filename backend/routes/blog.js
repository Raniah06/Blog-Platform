const express = require("express");
const { createBlog, getBlogs } = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/", authMiddleware, createBlog);
router.get("/", getBlogs);
module.exports = router;
