import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PostCommentForm from "../posts/PostCommentForm";
import { unshowCommentModal } from "../../actions/posts";

const CommentModal = ({ commentModal, unshowCommentModal, commentModalId }) => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
     if(!showModal) {
        if (commentModal === "post") {
            window.history.pushState({}, null, `/posts/${commentModalId}`);
          } else if (commentModal === "posts") {
            window.history.pushState({}, null, `/posts`);
          }
          unshowCommentModal();
          document.body.style.overflow = "auto";
        }
  }, [showModal])

  useEffect(() => {
    if (commentModal) {
      document.body.style.overflow = "hidden";
      setShowModal(true);
      const closeModal = e => {
        const element = document.querySelector(".commentForm");
        if (element) {
          const positionInfo = element.getBoundingClientRect();
          const top = positionInfo.top;
          const bottom = positionInfo.bottom;
          const left = positionInfo.left;
          const right = positionInfo.right;
          if (
            (e.clientY < top ||
              e.clientY > bottom ||
              e.clientX < left ||
              e.clientX > right) &&
            e.target.id !== "fileInput"
          ) {
              setShowModal(false);
          }
        }
      };
      const modal = document.querySelector(".postCommentForm");
      modal.addEventListener("click", closeModal);
      return () => modal.addEventListener("click", closeModal);
    }
  }, [commentModal]);

  if (commentModal)
    return (
      <CommentModalWrap>
        <div className="postCommentForm">
          <div className="commentForm">
            <PostCommentForm setShowModal={setShowModal} />
          </div>
        </div>
      </CommentModalWrap>
    );
  else return null;
};

const mapDispatchToProps = state => ({
  commentModal: state.post.commentModal,
  commentModalId: state.post.commentModalId
});

export default connect(
  mapDispatchToProps,
  { unshowCommentModal }
)(CommentModal);

const CommentModalWrap = styled.div`
  .postCommentForm {
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 10;
    background: rgba(0, 0, 0, 0.3);
    .commentForm {
      background: white;
      height: 80%;
      overflow: hidden;
      width: 40%;
      margin: auto;
      margin-top: 3rem;
      border-radius: 14px;
    }
  }
  @media (max-width: 1200px) { 
    .postCommentForm{
      .commentForm{
         width: 50%;
      }
    }
  }
  
  @media (max-width: 900px) { 
    .postCommentForm{
      .commentForm{
         width: 60%;
      }
    }
  }
  
  @media (max-width: 700px) {
    .postCommentForm{ 
      .commentForm{
       height: 100%;
        width: 100%;
        border-radius: 0;
        margin-top: 0;
      }
    }
    .outerPart{
      width: 100%;
      padding-top: 7vh;
    .mainWrap{
      border: none;
      .btn{
        margin-left: 1rem;
      }
      .main {
      .postSection{
        padding: 0.8rem 1rem;
        padding-bottom: 0;
        .postText{
          font-size: 1.2rem;
        }
      }
      
    }
    }
  }
  }
`;
