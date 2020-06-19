import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getPostById, createComment, likePost, unLikePost, clearPost} from '../../actions/posts'
import Spinner from '../layout/Spinner'
import Comments from './Comments'
import PostCommentForm from './PostCommentForm'
import moment from 'moment'
import styled, {css} from 'styled-components';

const PostComment = ({post, getPostById, match, createComment, user, likePost, unLikePost, clearPost}) => {

  const [like, setLike] = useState(false);

    useEffect(() => {
     clearPost();
    }, [])

    useEffect(() => {
      if(post) {
        if (post.like.some(like => like.user === user._id)) {
      setLike(true);
    } else {
      setLike(false);
    }
      }
  }, [post]);

    useEffect(() => {
        getPostById(match.params.id);
    }, [])

    const checkLike = (postId,  userId) => {
      if (like) {
        unLikePost(postId,  userId);
      } else {
        likePost(postId,  userId)
      }
    };

    if(post === null) {
        return <PostCommentWrap><Spinner/></PostCommentWrap>
    } else {
    return (
        <PostCommentWrap>
            <div className='mainWrap'>
            <Link to='/posts'className="btn">Back To Posts</Link>

            <div className="main">
              <div className='postSection'>
        <div className='topSection'>
          <Link to={`/profiles/${post.user}`} className="leftPortion">
          <img src={require(`../../../../public/img/users/${post.user.avatar}`)} />
        </Link>
        <div className="rightPortion">
        <Link to={`/profiles/${post.user}`} className="userName">
              {post.user.name}
            </Link>
        <p className='userEmail'>{post.user.email}</p>
        </div>
        </div>
          <p className="postText">{post.text}</p>
          <div className='date'>
              {moment(post.date).format('lll')}
          </div>
          <div className="check">
            <button
              type="button"
              className="btn"
              onClick={() => checkLike(post._id, user._id)}
            >
              <i
                className="fas fa-thumbs-up"
                style={like ? { color: "#0e9aa7" } : { color: "gray" }}
              ></i>
              <span>
                {post.like.length > 0 && <span>{post.like.length}</span>}
              </span>
            </button>
            <button type="button" className="btn">
              <i className="far fa-comment"></i>
              {post.comments.length}
            </button>
            {user._id === post.user && (
              <div className="options">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                {/* {postModel && modelId === post._id && <div className='model'> 
                   <p className='postDelete' onClick= {() => deletePost(post._id)}>Delete</p>
                </div>} */}
              </div>
            )}
          </div>
        </div>
        </div>
        </div>
      {/* <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profiles/${post.user}`}>
            <img
             className="round-img"
              src={post.avatar}
              alt=""
            />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            {post.text}
          </p>
          <p className="post-date">
                Posted on {post.date.split('').splice(0,10).join('').toString().split('-').join('/')}
            </p>
        </div>
      </div> */}
      
      {/* <PostCommentForm createComment={createComment} match={match}/>

      <div className="comments">
        {post.comments.map(comment => (<Comments key={comment._id} comment={comment} postId = {post._id} user = {user}/>))}
      </div> */}
      </PostCommentWrap> 
    )}}

const mapStateToProps  = state => ({
    post: state.post.post,
    user: state.auth.user,
  
})

export default connect(mapStateToProps, {getPostById, createComment, likePost, unLikePost, clearPost})(PostComment)

const PostCommentWrap = styled.div`
width: 60%;
margin: auto;
padding-top: 9vh;
.mainWrap{
  border: 0.5px solid rgba(0, 0, 0, 0.3);
  padding-bottom: 1rem;
  .btn{
    margin-bottom: 1rem;
    margin-left: 1.5rem;
    margin-top: 1.5rem;
    color: white;
  }  
.main {
  border-top: 1px solid rgb(230, 236, 240);
  border-bottom: 1px solid rgb(230, 236, 240);
  .postSection{
  padding: 0.8rem 1.5rem;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  // border-top: 1px solid rgb(230, 236, 240);
  // border-bottom: 1px solid rgb(230, 236, 240);
  transition: 0.3s ease;
  text-decoration: none;
  color: black;
  width: 100%;
  height: 100%;
  .topSection {
    display: flex;
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
    .userName {
      text-decoration: none;
      font-size: 1rem;
      font-weight: 600;
      color: black;
      margin-right: 1rem;
      line-height: 0.5rem;
    }
    .userEmail {
      color: #657786;
      line-height: 0.8rem;
    }
  }
}

    .postText {
      font-size: 1.5rem;
      margin-top: 1rem;
    }
    .date{
      color: #657786;
      margin: 0.5rem 0;
    }
    .check {
      display: flex;
      align-items: center;
      border-top: 1px solid rgb(230, 236, 240);
      padding: 1rem 0;
      .btn {
        background: none;
        padding: 0;
        margin: 0;
        margin-right: 2rem;
        color: gray;
        margin-left: 0.5rem;
        i {
          margin-right: 0.5rem;
        }
      }
      .options {
        align-self: flex-start;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-left: auto;
        margin-top: 0.54rem;
        padding: 0 0.5rem;
        position: relative;
        .model {
          position: absolute;
          border: 0.3px solid rgba(230,230,230, 0.8);
          top: -40px;
          right: 0;
          ${props => props.modelPosition && css`
            top: 0;
            right: 0;
          `}
          width: 120px;
          background: white;
          box-shadow: 2px 2px 15px 0px rgba(0,0,0,0.3);
          border-radius: 8px;
          z-index: 3;
          p{
            padding: 0.5rem 1rem;
            &:hover{
              background: rgba(240,240,240,0.5);
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
    }
  }
}
}
}

@media (max-width: 700px) {
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
    }
    
  }
  }
  
}
`