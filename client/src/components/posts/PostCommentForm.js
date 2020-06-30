import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostCard from './postCard';
import { connect } from "react-redux";
import getDate from "../../utils/getDate";
import { createComment } from "../../actions/posts";

const PostCommentForm = ({ setShowModal, post, user, createComment }) =>
  {
    const [text, setText] = useState("");

    const onsubmit = e => {
      e.preventDefault();
      createComment(post._id, text);
      setShowModal(false)
    };

    return (
      <PostForm>
        <form onSubmit={onsubmit}>
        <button className="btn" type="submit">
            Reply
          </button>
          <header>
            <i
              className="fas fa-times closeBtn"
              onClick={() => setShowModal(false)}
            ></i>
            <i
              className="fas fa-long-arrow-alt-left back"
              onClick={() => setShowModal(false)}
            ></i>
          </header>
          <main>
          
            <div className='sender'><PostCard card={post} options={false} getDate={getDate} /><div className='connectLine'></div></div>
            
            <div className="reply">
              <div className="left">
                <img
                  src={user.avatar}
                />
              </div>
              <div className="right">
                <textarea
                  className="text"
                  placeholder="Comment on this post"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  required
                  name="text"
                />
              </div>
            </div>
          </main>
        </form>
      </PostForm>
    );
  };
const mapStateToProps = state => ({
  user: state.auth.user,
  post: state.post.commentModalPost
});

export default connect(
  mapStateToProps,
  { createComment }
)(PostCommentForm);

const PostForm = styled.div`
  position: relative;
  height: 100%;
  form{
  height: 100%;
  position: relative;
  .btn {
    position: absolute;
    right: 20px;
    bottom: 10px;
    background: #0e9aa7;
    color: white;
    border-radius: 25px;
  }
  header {
    height: 50px;
    border-bottom: 0.3px solid rgba(0, 0, 0, 0.4);
    display: flex;
    padding: 0 1.5rem;
    align-items: center;
    .closeBtn {
      cursor: pointer;
      transition: all 0.1s ease;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.4rem;
      &:hover {
        background: rgba(142, 208, 248, 0.5);
      }
    }
    .back {
      display: none;
    }
  }
  main {
    max-height: 78%;
    overflow: auto;
    width: 100%;
    .sender{
      position: relative;
      .connectLine{
        position: absolute;
        top: 80px;
        left: 41px;
        height: calc(100% - 67.5px);
        width: 3px;
        background: gray;
        transform: translate(-50%, 0);
      }
    }
    .reply {
      margin-top: 1rem;
      padding: 0.8rem 1rem;
      display: flex;
      width: 100%;
      .left {
        min-width: 50px;
        min-height: 50px;
        max-width: 50px;
        max-height: 50px;
        img {
          height: 100%;
          width: 100%;
          border-radius: 50%;
        }
      }
      .right {
        margin: 0 1rem;
        background: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        width: 100%;
        textarea {
          height: 180px;
          resize: none;
          width: 100%;
          border: none;
          overflow-wrap: break-word;
          padding: 1rem 0;
          font-size: 1.2rem;
          outline: none;
        }
      }
    }
  }
}

  @media (max-width: 500px) {
    width: 100%;
    form{
      .btn {
        top: 25px;
        max-height: 30px;
        padding: 0 1rem;
        font-size: 1rem;
        border-radius: 25px;
        z-index: 2;
        transform: translate(0, -50%);
      }
    header {
      .closeBtn {
        display: none;
      }
      .back {
        display: block;
        font-size: 1.4rem;
      }
    }
    main {
      max-height: 92%;
    }
  }
}
`;


