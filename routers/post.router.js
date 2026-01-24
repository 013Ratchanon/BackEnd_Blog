const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");
const authJwt = require("../middleware/authJwt.middleware");

// 👉 import multer instance
const upload = require("../middlewares/multer");

// 👉 import firebase upload middleware
const { uploadToFirebase } = require("../middleware/file.middleware");

// ================= CREATE POST =================
router.post(
  "/create",
  authJwt.verifyToken,
  upload.single("file"), // ✅ ใช้ multer ตัวเดียว
  uploadToFirebase,
  postController.createPost
);

// ================= GET =================
router.get("/author/:id", postController.getByAuthorId);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);

// ================= UPDATE =================
router.put(
  "/:id",
  authJwt.verifyToken,
  upload.single("file"), // ✅ ต้องระบุ .single ด้วย
  uploadToFirebase,
  postController.updatePostById
);

// ================= DELETE =================
router.delete(
  "/:id",
  authJwt.verifyToken,
  postController.deletePostById
);

module.exports = router;
