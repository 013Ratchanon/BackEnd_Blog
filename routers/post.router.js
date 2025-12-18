const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authJwt = require("../middleware/authJwt.middleware");

// create post
router.post("/create", authJwt.verifyToken, postController.createPost);

// get posts by author
router.get("/author/:id", postController.getByAuthorId);

// get all posts
router.get("/", postController.getAllPosts);

// get post by id
router.get("/:id", postController.getPostById);

// update post
router.put("/:id", authJwt.verifyToken, postController.updatePostById);

// delete post
router.delete("/:id", authJwt.verifyToken, postController.deletePostById);

module.exports = router;
