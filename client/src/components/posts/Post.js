import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
  getAllPosts,
  createPost,
  clearPost,
  setPostModel,
  showCommentModal,
  unshowCommentModal
} from "../../actions/posts";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import styled from "styled-components";

const Post = ({
  getAllPosts,
  createPost,
  clearPost,
  loading,
  posts,
  user,
  post,
  history,
  postModel,
  setPostModel,
  showCommentModal,
  unshowCommentModal
}) => {
  useEffect(() => {
    document.title = "Posts";
    getAllPosts();
    clearPost();
  }, [getAllPosts, clearPost, post]);

  const [wrap, setWrap] = useState(false);

  useEffect(() => {
    if (wrap) {
      const closeModal = e => {
        setPostModel(false);
      };
      const modal = document.querySelector(".modelWrap");
      modal.addEventListener("click", closeModal);
      return () => modal.addEventListener("click", closeModal);
    }
  }, [wrap]);

  useEffect(() => {
    if(window.location.pathname !== '/compose/comment') {
      document.body.style.overflow = "auto";
      unshowCommentModal()
    }
  }, [window.location.pathname])

  useEffect(() => {
    if (postModel) {
      setWrap(true);
    } else {
      setWrap(false);
    }
  }, [postModel]);

  if (loading && posts.length > 0) {
    return <Spinner />;
  } else {
    return (
      <PostWrap>
        {wrap && <div className="modelWrap"></div>}
        <div className="topSection">
          <h1 className="large text-primary"> Posts </h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community!
          </p>
          <PostForm createPost={createPost} />
        </div>
        <div className="posts">
          {posts.length > 0 &&
            posts.map(post => (
              <PostItem
                key={post._id}
                post={post}
                user={user}
                history={history}
                showCommentModal = {showCommentModal}
              />
            ))}
        </div>
      </PostWrap>
    );
  }
};

const mapStateToProps = state => ({
  loading: state.post.loading,
  posts: state.post.posts,
  user: state.auth.user,
  postModel: state.post.postModel,
  post: state.post.post
});

export default connect(
  mapStateToProps,
  { getAllPosts, clearPost, createPost, setPostModel, showCommentModal,
    unshowCommentModal }
)(Post);

const PostWrap = styled.div`
  padding-top: 10vh;
  width: 100%;
  .modelWrap {
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 2;
  }
  .topSection {
    width: 80%;
    margin: auto;
  }
  .posts {
    // padding: 1rem;
    border: 1px solid rgb(230, 236, 240);
    border-top: none;
    margin-bottom: 1rem;
    width: 80%;
    margin: auto;
    margin-bottom: 1rem;
  }
  @media (max-width: 500px) {
    width: 100%;
    .topSection {
      width: 95%;
      margin: auto;
    }
    .posts {
      width: 100%;
      border-bottom: none;
      margin-bottom: 0;
    }
  }
`;
