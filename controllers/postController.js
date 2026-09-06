const Post = require("../models/postModel");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/AppError");

exports.createPost = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user);

  const newPost = {
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user,
  };

  const post = await Post.create(newPost);

  res.status(200).json({
    status: "success",
    data: post,
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().sort({ date: -1 });

  res
    .status(200)
    .json({ status: "success", results: posts.length, data: posts });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) return next(new AppError("Not valid Post id!", 404));

  res.status(200).json({ status: "success", data: post });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);

  if (!post) return next(new AppError("Post not found!", 404));

  // post.user is a ObjectId so we need to convert it into a string
  if (post.user.toString() !== req.user)
    return next(
      new AppError(
        "You cannot delete a post which does not belong to you!",
        401,
      ),
    );

  console.log(post);

  await post.deleteOne();

  res.status(200).json({ status: "success", data: null });
});

exports.addLike = catchAsync(async (req, res, next) => {
  const result = await Post.updateOne(
    { _id: req.params.postId, "likes.user": { $ne: req.user } },
    { $push: { likes: { user: req.user } } },
  );
  if (result.matchedCount === 0)
    return next(new AppError("Post already liked!", 400));
  const post = await Post.findById(req.params.postId);
  res.status(200).json({ status: "success", data: post.likes });
});

exports.deleteLike = catchAsync(async (req, res, next) => {
  const result = await Post.updateOne(
    { _id: req.params.postId, "likes.user": req.user },
    { $pull: { likes: { user: req.user } } },
  );
  if (result.modifiedCount === 0)
    return next(new AppError("Post has not been liked!", 400));

  const post = await Post.findById(req.params.postId);
  res.status(200).json({ status: "success", data: post.likes });
});

exports.addComment = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user);

  const newComment = {
    user: req.user,
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
  };

  const result = await Post.updateOne(
    { _id: req.params.postId },
    { $push: { comments: newComment } },
  );

  const post = await Post.findById(req.params.postId);
  res.status(200).json({ status: "success", data: post.comments });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return next(new AppError("Post not found!", 404));

  const comment = post.comments.id(req.params.commentId);
  if (!comment) return next(new AppError("Comment not found!", 404));

  if (
    comment.user.toString() !== req.user &&
    post.user.toString() !== req.user
  ) {
    return next(new AppError("Not authorized to delete this comment", 401));
  }

  post.comments.pull(req.params.commentId);
  await post.save();

  res.status(200).json({ status: "success", data: post.comments });
});
