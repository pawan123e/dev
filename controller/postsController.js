const asyncError = require("../utils/asyncError");
const AppError = require("../utils/AppError");
const Post = require("../models/Posts");
const User = require("../models/User");
const Profile = require("../models/Profile");

exports.createPosts = asyncError(async (req, res, next) => {
  const newPost = {
    text: req.body.text,
    user: req.user._id
  };

  const post = await Post.create(newPost);
  const finalPost = await Post.findById(post._id);
  res.json(finalPost);
});

exports.getPosts = asyncError(async (req, res, next) => {
  const posts = await Post.find().sort({ date: -1 });
  //const posts = await Post.find({user: req.user._id}).sort({date: -1});
  if (!posts) {
    return next(new AppError("No post found", 404));
  }
  res.json(posts);
});

exports.getPostById = asyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError("No post found with this id", 400));
  }
  res.json(post);
});

exports.deletePostById = asyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new AppError("No post found", 404));
  }
  if (post.user._id.toString() !== req.user._id.toString()) {
    return next(new AppError("User not authorized", 401));
  }

  await post.remove();
  res.json({ msg: "Post removed" });
});

exports.likePost = asyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post found", 404));
  }

  if (
    post.like.filter(like => like.user.toString() === req.user._id.toString())
      .length > 0
  ) {
    return next(new AppError("Post already liked", 400));
  }

  post.like.unshift({ user: req.user._id });
  await post.save();
  res.json(post.like);
});

exports.unlikePost = asyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post found", 404));
  }

  if (
    post.like.filter(like => like.user.toString() === req.user._id.toString())
      .length === 0
  ) {
    return next(new AppError("Post has not yet been liked", 400));
  }

  post.like = post.like.filter(
    like => like.user.toString() !== req.user._id.toString()
  );

  await post.save();
  res.json(post.like);
});

exports.createComment = asyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("Invalid postId", 404));
  }

  //checking
  const newComment = {
    user: req.user._id,
    text: req.body.text
  };

  post.comments.unshift(newComment);

  await post.save();
  post = await Post.findById(req.params.id);

  res.json(post.comments);
});

exports.removeComment = asyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  console.log('post comments in postsController in 133 line', req.params.comment_id, post.comments);
  if (!post) {
    return next(new AppError("Invalid post id", 404));
  }

  const comment = post.comments.find(
    comment => comment._id.toString() === req.params.comment_id.toString()
  );

  if (!comment) {
    return next(new AppError("Comment does not exist", 404));
  }

  if (comment.user._id.toString() !== req.user._id.toString()) {
    return next(new AppError("User not authorized", 401));
  }

  post.comments = post.comments.filter(
    comment => comment._id.toString() !== req.params.comment_id
  );

  await post.save();
  res.json(post.comments);
});
