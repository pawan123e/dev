import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const PostCard = ({
  modelPosition,
  goToPost,
  card,
  user,
  showPostModel,
  postModel,
  modelId,
  deleteItem,
  like,
  getDate,
  checkLike,
  setShowCommentForm,
  badges, 
  postId,
  options = true
}) => {
  return (
    <PostCardWrap modelPosition={modelPosition} badges = {badges}>
      <div onClick={e => badges && goToPost(e, card._id)} className="main">
        {options && user._id === card.user._id && (
          <div className="options" onClick={e => showPostModel(e, card._id)}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            {postModel && modelId === card._id && (
              <div className="model">
                <p className="postDelete" onClick={postId ? () => deleteItem(postId, card._id) : () => deleteItem(card._id)}>
                  Delete
                </p>
              </div>
            )}
          </div>
        )}
        <Link to={`/profiles/${card.user._id}`} className="leftPortion">
          <img
            src={require(`../../../../public/img/users/${card.user.avatar}`)}
          />
        </Link>
        <div className="rightPortion">
          <div className="upper">
            <Link to={`/profiles/${card.user._id}`} className="userName">
              {card.user.name}
            </Link>
            <p className="date">{getDate(card.date)}</p>
          </div>
          <p className="cardText">{card.text}</p>
          
          {badges && <div className="check">
            <button
              type="button"
              className="btn"
              onClick={() => checkLike(card._id, user._id)}
            >
              <i
                className="fas fa-thumbs-up"
                style={like ? { color: "#0e9aa7" } : { color: "gray" }}
              ></i>
              <span>{card.like.length ? card.like.length : ""}</span>
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setShowCommentForm(true)}
            >
              <i className="far fa-comment"></i>
              <span>{card.comments.length ? card.comments.length : ""}</span>
            </button>
          </div> }
        </div>
      </div>
    </PostCardWrap>
  );
};

export default PostCard;

const PostCardWrap = styled.div`
  * {
    box-sizing: border-box;
  }
  padding: 0;
  margin: 0;
  width: 100vw;
  .main {
    padding: 0.8rem 1rem;
    display: flex;
    border-top: 1px solid rgb(230, 236, 240);
    transition: 0.3s ease;
    cursor: ${props => props.badges && 'pointer'};
    text-decoration: none;
    color: black;
    width: 100%;
    height: 100%;
    -webkit-tap-highlight-color: transparent;
    position: relative;
   
    &:hover {
      background:  ${props => props.badges && 'whitesmoke'};
    }
    .options {
      position: absolute;
      cursor: pointer;
      right: 1rem;
      bottom: 0.9rem;
      ${props =>
        !props.badges &&
        css`
          top: 0.9rem;
          right: 1rem;
        `}
      align-self: flex-start;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-left: auto;
      margin-top: 0.54rem;
      padding: 0 0.5rem;
      z-index: 1;
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
      background: red;

      .cardText {
        padding-right: 2rem;
        font-size: 1rem;
        white-space: pre-line;
        word-wrap: break-word;
        background: yellow;
      }
      .upper {
        display: flex;
        align-items: center;
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
        //   margin-top: 0.5rem;
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
            left: 25px
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
