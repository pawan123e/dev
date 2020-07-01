import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import { deleteComment, setPostModel } from "../../actions/posts";
import getDate from "../../utils/getDate";
import PostCard from './postCard';

const Comments = ({
  comment,
  deleteComment,
  postId,
  mainUser,
  postModel,
  setPostModel,
  modelId
}) => {
  const [modelPosition, setModelPosition] = useState(false);
 

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
    card={comment}
    user={mainUser}
    showPostModel={showPostModel}
    postModel={postModel}
    modelId={modelId}
    deleteItem={deleteComment}
    getDate={getDate}
    postId = {postId}
    badges = {false}/>
  );
};

const mapStateToProps = state => ({
  postModel: state.post.postModel,
  modelId: state.post.postModelId
});

export default connect(
  mapStateToProps,
  { deleteComment, setPostModel }
)(Comments);

