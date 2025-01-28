const express = require("express");
const {
  addPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

const router = express.Router();

router.post("/", addPost);
router.get("/", getPosts);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
