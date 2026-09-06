const express = require("express");
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .post(postController.createPost)
  .get(postController.getAllPosts);

router
  .route("/:postId")
  .get(postController.getPost)
  .delete(postController.deletePost);

router.route("/like/:postId").patch(postController.addLike);
router.route("/unlike/:postId").patch(postController.deleteLike);

router.route("/comment/:postId").patch(postController.addComment);
router
  .route("/comment/:postId/:commentId")
  .delete(postController.deleteComment);

module.exports = router;
