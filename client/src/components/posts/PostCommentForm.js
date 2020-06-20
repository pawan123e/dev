import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostCard from "./PostCard";
import { connect } from "react-redux";
import getDate from "../../utils/getDate";
import { createComment } from "../../actions/posts";
// import {
//   post
// } from "../../actions/posts";
const PostCommentForm = ({ setShowCommentForm, post, user, createComment }) =>
  // {createComment, match, history}
  {
    const [text, setText] = useState("");

    const onsubmit = e => {
      console.log("onsubmitting");
      e.preventDefault();
      createComment(post._id, text);
      setShowCommentForm(false)
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
              onClick={() => setShowCommentForm(false)}
            ></i>
            <i
              className="fas fa-long-arrow-alt-left back"
              onClick={() => setShowCommentForm(false)}
            ></i>
          </header>
          <main>
            {console.log("post from postCommentForm.js", post)}
            <PostCard card={post} options={false} getDate={getDate} />

            <div className="reply">
              <div className="left">
                <img
                  src={require(`../../../../public/img/users/${user.avatar}`)}
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

            {/* <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form className="form my-1" onSubmit = {onsubmit}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            value={text}
            onChange = {(e) => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit"className="btn btn-dark my-1" value="Submit" />
        </form> */}
          </main>
        </form>
      </PostForm>
    );
  };
const mapStateToProps = state => ({
  post: state.post.post,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { createComment }
)(PostCommentForm);

const PostForm = styled.div`
  position: relative;
  height: 100%;
  .btn {
    position: absolute;
    right: 20px;
    bottom: 20px;
    background: #0e9aa7;
    color: white;
    border-radius: 25px;
  }
  header {
    height: 8vh;
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
    max-height: 91%;
    overflow: auto;
    width: 100%;
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
          min-height: 180px;
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

  @media (max-width: 500px) {
    width: 100%;
    .btn {
      position: absolute;
      right: 20px;
      top: 10px;
      max-height: 30px;
      padding: 0 1rem;
      font-size: 1rem;
      border-radius: 25px;
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
      height: auto;
    }
  }
`;
