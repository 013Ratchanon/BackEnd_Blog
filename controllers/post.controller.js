const PostModel = require("../models/Post");
const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const { title, summary, content, cover, author } = req.body;
  if (!title || !summary || !content || !cover || !author) {
    return res
      .status(400)
      .send({ message: "Please provide all required fields" });
  }
  try {
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover,
      author,
    });
    if (!postDoc) {
      return res.status(500).send({ message: "Cannot a new create post" });
    }
    res.send({ message: "Post created successfully", data: postDoc });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some errors occurred while creating a new post",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    if (!posts) {
      return res.status(404).send({ message: "No posts found" });
    }
    res.send(posts);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some errors occurred while retrieving posts",
    });
  }
};

exports.getPostById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ message: "Id is missing" });
  }
  try {
    const post = await PostModel.findById(id)
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    if (!post) {
      return res.status(404).send({ message: "No posts found" });
    }
    res.send(post);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some errors occurred while retrieving posts",
    });
  }
};

exports.getByAuthorId = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: "AuthorId is missing" });
  }

  try {
    const posts = await PostModel.find({ author: id })
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .limit(20);

    if (!posts) {
      return res.status(404).send({ message: "No posts found" });
    }

    return res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some errors occurred while retrieving posts",
    });
  }
};

exports.updatePostById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ message: "Id is missing" });
  }
  const { title, summary, content, cover } = req.body;
  if (!title || !summary || !content || !cover) {
    return res
      .status(400)
      .send({ message: "Please provide all required fields" });
  }
  try {
    const postDoc = await PostModel.findByIdAndUpdate(
      id,
      {
        title,
        summary,
        content,
        cover,
      },
      { new: true }
    );
    if (!postDoc) {
      return res.status(500).send({ message: "Cannot update the post" });
    }
    res.send({ message: "Post updated successfully", data: postDoc });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some errors occurred while updating the post",
    });
  }
};

exports.deletePostById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ message: "Id is missing" });
  }
  try {
    const postDoc = await PostModel.findByIdAndDelete(id);
    if (!postDoc) {
      return res.status(500).send({ message: "Cannot delete the post" });
    }
    res.send({ message: "Post deleted successfully", data: postDoc });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some errors occurred while deleting the post",
    });
  }
};
