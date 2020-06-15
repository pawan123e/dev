import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deletePost, likePost, unLikePost} from '../../actions/posts'
import styled from 'styled-components'
import moment from 'moment'
const PostItem = ({post, user, deletePost, likePost, unLikePost, error}) => {
    return (
      <PostWrap>
            <Link to={`/profiles/${post.user}`} className='leftPortion'>
                  <img src = {require(`../../../../public/img/users/${post.avatar}`)}/>
            </Link>
            <div className='rightPortion'>
                  <div className='upper'>
                  <Link to={`/profiles/${post.user}`} className='userName'>
                      {post.name}
                  </Link>
                  <p className="date">
                   {moment(post.date).startOf(Date.now()).fromNow()}
                </p>
                  </div>
                  <p>{post.text}</p>
                  <div className='check'>
                  <button type="button" className="btn" onClick= {() => likePost(post._id, post.like, user._id)}>
                  <i className="fas fa-thumbs-up"></i>
                  <span>{post.like.length > 0 && <span>{post.like.length}</span>}</span>
                </button>
                <button type="button" className="btn btn-light" onClick= {() => unLikePost(post._id, post.like, user._id)}>
                  <i className="fas fa-thumbs-down"></i>
                </button>
                  </div>
            </div>
      </PostWrap>
        // <div className="posts">
        //    <div className="post bg-white p-1 my-1">
        //      <div>
        //        <Link to={`/profiles/${post.user}`}>
        //          <img
        //            className="round-img"
        //            src={require(`../../../../public/img/users/${post.avatar}`)}
        //            alt=""
        //          />
        //          <h4>{post.name}</h4>
        //        </Link>
        //      </div>
        //      <div>
        //        <p className="my-1">
        //          {post.text}
        //        </p>
        //         <p className="post-date">
        //            Posted on {post.date.split('').splice(0,10).join('').toString().split('-').join('/')}
        //        </p>
        //        <button type="button" className="btn btn-light" onClick= {() => likePost(post._id, post.like, user._id)}>
        //          <i className="fas fa-thumbs-up"></i>
        //          <span>{post.like.length > 0 && <span>{post.like.length}</span>}</span>
        //        </button>
        //        <button type="button" className="btn btn-light" onClick= {() => unLikePost(post._id, post.like, user._id)}>
        //          <i className="fas fa-thumbs-down"></i>
        //        </button>
        //        <Link to= {`/posts/${post._id}`} className="btn btn-primary">
        //          Discussion {post.comments.length > 0 &&<span className='comment-count'>{ post.comments.length}</span>}
        //        </Link>
               
        //       {user._id === post.user && 
        //       <button      
        //        type="button"
        //        className="btn btn-danger"
        //        onClick= {() => deletePost(post._id)}>
        //        <i className="fas fa-times"></i>
        //      </button>
        //       }
               
        //      </div>
        //    </div>
        //  </div>
    )
}

const mapStateToProps = state => ({
  error: state.post.error
})

export default connect(mapStateToProps, {deletePost, likePost, unLikePost})(PostItem)

const PostWrap = styled.div`
 padding: 0.8rem 1rem;
 display: flex;
 border-bottom: 1px solid rgb(230, 236, 240);
 transition: 0.3s ease;
 cursor: pointer;
 &:hover{
   background: whitesmoke;
 }
 .leftPortion{
   text-decoration: none;
   min-height: 50px;
   min-width: 50px;
   max-width: 50px;
   max-height: 50px;
   img{
     heigth: 100%;
     width: 100%;
     border-radius: 50%;
   }
 }
 .rightPortion{
   margin-left: 1rem;
   .upper{
     display: flex;
     .userName{
     text-decoration: none;
     font-size: 1rem;
     font-weight: 600;
     color: black;
     margin-right: 1rem;
   }
   .date{
     color: #808080;
   }
   }
   .check{
     display: flex;
     align-items: center;
     .btn{
       background: none;
       padding: 0;
       margin-right: 2rem;
       color: gray;
       margin-top: 0.5rem;
       i{
         margin-right: 0.5rem;
       }
     }
   }
 }
`