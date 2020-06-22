import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  deletePost,
  likePost,
  unLikePost,
  setPostModel,
  
} from "../../actions/posts";
import getDate from "../../utils/getDate";
import PostCard from "./postCard";
const PostItem = ({
  post,
  user,
  deletePost,
  likePost,
  unLikePost,
  error,
  history,
  postModel,
  setPostModel,
  modelId,
  showCommentModal
}) => {
  const goToPost = (e, id) => {
    if (!postModel) {
      ["main", "upper", "date", "cardText", "check"].forEach(
        classlist =>
          e.target.classList.contains(classlist) && history.push(`/posts/${id}`)
          
      );
    }
  };

  const [like, setLike] = useState(false);
  const [modelPosition, setModelPosition] = useState(false);

  useEffect(() => {
    if (post && post.like.some(like => like.user === user._id)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [post]);

  const checkLike = (postId, userId) => {
    if (like) {
      unLikePost(postId, userId);
    } else {
      likePost(postId, userId);
    }
  };

  const showPostModel = (e, id) => {
    var topPos = e.target.getBoundingClientRect().top;
    setPostModel(!postModel, id);
    if (topPos < 300) {
      setModelPosition(true);
    } else {
      setModelPosition(false);
    }
  };

  return (
    <PostCard
      modelPosition={modelPosition}
      goToPost={goToPost}
      card={post}
      user={user}
      showPostModel={showPostModel}
      postModel={postModel}
      modelId={modelId}
      deleteItem={deletePost}
      like={like}
      getDate={getDate}
      checkLike={checkLike}
      showCommentModal = {showCommentModal}
      badges = {true}
      history = {history}
    />
  );
};

const mapStateToProps = state => ({
  error: state.post.error,
  postModel: state.post.postModel,
  modelId: state.post.postModelId
});

export default connect(
  mapStateToProps,
  { deletePost, likePost, unLikePost, setPostModel}
)(PostItem);
