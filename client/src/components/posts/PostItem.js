import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  deletePost,
  likePost,
  unLikePost,
  setPostModel
} from "../../actions/posts";
import styled, { css } from "styled-components";
import getDate from "../../utils/getDate";
import PostCard from "./PostCard";
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
  setShowCommentForm
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

  // const getDate = date => {
  //   let newDate = parseInt(Date.parse(date)) / 1000;
  //   let currentDate = parseInt(Date.now()) / 1000;
  //   let result = currentDate - newDate;
  //   let seconds = 60;
  //   let minutes = 3570;
  //   let hours = 83895;
  //   if (result < seconds) {
  //     if (result < 1) {
  //       result = 1;
  //     }
  //     return Math.round(result) + "s";
  //   } else if (result < minutes) {
  //     return Math.round(result / seconds) + "m";
  //   } else if (result < hours) {
  //     return Math.round(result / minutes) + "h";
  //   } else {
  //     let finalDate = moment(date).format("ll");
  //     if (finalDate.split(", ")[1] === "2020") {
  //       return finalDate.split(", ")[0];
  //     }
  //     return finalDate;
  //   }
  // };

  const checkLike = (postId, userId) => {
    console.log("postId, userId of postItem", postId, userId);
    if (like) {
      unLikePost(postId, userId);
    } else {
      likePost(postId, userId);
    }
  };

  const showPostModel = (e, id) => {
    var topPos = e.target.getBoundingClientRect().top;
    console.log("not postMOdel", !postModel);
    setPostModel(!postModel, id);
    if (topPos < 300) {
      setModelPosition(true);
    } else {
      setModelPosition(false);
    }
    console.log("position of threeDots", topPos);
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
      setShowCommentForm={setShowCommentForm}
      setShowCommentForm={setShowCommentForm}
      badges = {true}
    />
    // <PostWrap modelPosition = {modelPosition}>
    //   <div onClick={e => goToPost(e, post._id)} className="main">
    //   {user._id === post.user._id && (
    //           <div className="options" onClick={(e) => showPostModel(e, post._id)}>
    //             <div className="dot"></div>
    //             <div className="dot"></div>
    //             <div className="dot"></div>
    //             {postModel && modelId === post._id && <div className='model'>
    //                <p className='postDelete' onClick= {() => deletePost(post._id)}>Delete</p>
    //             </div>}
    //           </div>
    //         )}
    //     <Link to={`/profiles/${post.user._id}`} className="leftPortion">
    //       <img src={require(`../../../../public/img/users/${post.user.avatar}`)} />
    //     </Link>
    //     <div className="rightPortion">
    //       <div className="upper">
    //         <Link to={`/profiles/${post.user._id}`} className="userName">
    //           {post.user.name}
    //         </Link>
    //         <p className="date">{getDate(post.date)}</p>
    //       </div>
    //       <p className="postText">{post.text}</p>
    //       <div className="check">
    //         <button
    //           type="button"
    //           className="btn"
    //           onClick={() => checkLike(post._id, user._id)}
    //         >
    //           <i
    //             className="fas fa-thumbs-up"
    //             style={like ? { color: "#0e9aa7" } : { color: "gray" }}
    //           ></i>
    //           <span>
    //             {post.like.length ? post.like.length : ''}
    //           </span>
    //         </button>
    //         <button type="button" className="btn" onClick = {() => setShowCommentForm(true)}>
    //           <i className="far fa-comment"></i>
    //           <span>
    //             {post.comments.length  ? post.comments.length : ''}
    //           </span>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </PostWrap>
  );
};

const mapStateToProps = state => ({
  error: state.post.error,
  postModel: state.post.postModel,
  modelId: state.post.postModelId
});

export default connect(
  mapStateToProps,
  { deletePost, likePost, unLikePost, setPostModel }
)(PostItem);

const PostWrap = styled.div`
  * {
    box-sizing: border-box;
  }
  .main {
    padding: 0.8rem 1rem;
    display: flex;
    border-top: 1px solid rgb(230, 236, 240);
    transition: 0.3s ease;
    cursor: pointer;
    text-decoration: none;
    color: black;
    width: 100%;
    height: 100%;
    -webkit-tap-highlight-color: transparent;
    position: relative;
    &:hover {
      background: whitesmoke;
    }
    .options {
      position: absolute;
      right: 1rem;
      bottom: 0.9rem;
      align-self: flex-start;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-left: auto;
      margin-top: 0.54rem;
      padding: 0 0.5rem;
      // position: relative;
      z-index: 2;
      .model {
        position: absolute;
        border: 0.3px solid rgba(230, 230, 230, 0.8);
        top: -40px;
        right: 0;
        ${props =>
          props.modelPosition &&
          css`
            top: 0;
            right: 0;
          `}
        width: 120px;
        background: white;
        box-shadow: 2px 2px 15px 0px rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        z-index: 3;
        p {
          padding: 0.5rem 1rem;
          &:hover {
            background: rgba(240, 240, 240, 0.5);
            border-radius: 8px;
          }
        }
      }
      .dot {
        height: 4px;
        width: 4px;
        border-radius: 50%;
        background: #808080;
        margin-bottom: 0.2rem;
      }
    }
    .leftPortion {
      text-decoration: none;
      min-height: 50px;
      min-width: 50px;
      max-width: 50px;
      max-height: 50px;
      img {
        heigth: 100%;
        width: 100%;
        border-radius: 50%;
      }
    }
    .rightPortion {
      margin-left: 1rem;
      position: relative;
      width: 100%;
      .postText {
        padding-right: 1rem;
      }
      .upper {
        display: flex;
        width: 100%;
        .userName {
          text-decoration: none;
          font-size: 1rem;
          font-weight: 600;
          color: black;
          margin-right: 1rem;
        }
        .date {
          color: #808080;
        }
      }
      .check {
        display: flex;
        align-items: center;
        .btn {
          background: none;
          padding: 0;
          margin-right: 5rem;
          color: gray;
          margin-top: 0.5rem;
          // width: 50px;
          position: relative;
          i {
            margin-right: 0.5rem;
          }
          span {
            position: absolute;
            top: 0;
            left: 25px;
          }
        }
      }
    }
  }

  @media (max-width: 700px) {
    .main {
      &:hover {
        background: none;
      }
    }
  }
`;
