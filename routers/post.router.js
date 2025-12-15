const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

//http://localhost:5000/api/v1/post/create
router.post("/create", postController.createPost);

//http://localhost:5000/api/v1/post/:id
router.get("/:id", postController.getPostById);

//http://localhost:5000/api/v1/post/
router.get("", postController.getAllPosts);

//http://localhost:5000/api/v1/post/get/author/1
router.get("/author/:id", postController.getByAuthorId);

//http://localhost:5000/api/v1/post/:id
router.put("/:id", postController.updatePostById);

//http://localhost:5000/api/v1/post/:id
router.delete("/:id", postController.deletePostById);

module.exports = router;
