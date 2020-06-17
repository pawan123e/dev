import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deletePost, likePost, unLikePost} from '../../actions/posts'
import styled from 'styled-components'
import moment from 'moment'
const PostItem = ({post, user, deletePost, likePost, unLikePost, error, history}) => {

    const goToPost = (e, id) => {
      
      ['main', 'upper', 'date', 'postText', 'check'].forEach(classlist => e.target.classList.contains(classlist) && history.push(`/posts/${id}`))
    }

    const [like, setLike] = useState(false);

    useEffect(() => {
       if(post && post.like.some(like => like.user === user._id)) {
          setLike(true);
       } else {
         setLike(false);
       }
    }, [post, post.like])

    const getDate = date => {
         let newDate = parseInt(Date.parse(date))/1000;
         let currentDate = parseInt(Date.now())/1000;
         let result = currentDate - newDate;
         let seconds = 60;
         let minutes = 3570;
         let hours = 83895;
         if(result < seconds) {
           if(result < 1) {
             result = 1;
           }
           return Math.round(result) + 's'
         } else if(result < minutes) {
           return Math.round(result/seconds) + 'm'
         } else if(result < hours) {
           return Math.round(result/minutes) + 'h'
         } else  {
           let finalDate = moment(date).format('ll');
           if(finalDate.split(', ')[1] === '2020') {
             return finalDate.split(', ')[0];
           }
           return finalDate
         }
    }

    const checkLike = (postId, postLike, userId) => {
          if(like) {
            unLikePost(postId, postLike, userId)
          } else {
            likePost(postId, postLike, userId)
          }
    }

    return (
      <PostWrap>
            <div onClick = {(e) => goToPost(e, post._id)} className="main">
            <Link to={`/profiles/${post.user}`} className='leftPortion'>
                  <img src = {require(`../../../../public/img/users/${post.avatar}`)}/>
            </Link>
            <div className='rightPortion'>
                  <div className='upper'>
                  <Link to={`/profiles/${post.user}`} className='userName'>
                      {post.name}
                  </Link>
                  <p className="date">
                   {getDate(post.date)}
                </p>
                  </div>
                  <p className='postText'>{post.text}</p>
                  <div className='check'>
                  <button type="button" className="btn" onClick= {() => checkLike(post._id, post.like, user._id)}>
                  <i className="fas fa-thumbs-up" style = {like ? {color: '#0e9aa7'} : {color: 'gray'}}></i>
                  <span>{post.like.length > 0 && <span>{post.like.length}</span>}</span>
                </button>
                {/* <button type="button" className="btn btn-light" onClick= {() => unLikePost(post._id, post.like, user._id)}>
                  <i className="fas fa-thumbs-down"></i>
                </button> */}
                <button type='button' className='btn'>
                   <i className="far fa-comment"></i>
                   { post.comments.length}
                </button>
                {user._id === post.user && 
                <div className='options'>
                      <div className='dot'></div>
                      <div className='dot'></div>
                      <div className='dot'></div>
                  </div>
                }
                  </div>
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
 .main{
  padding: 0.8rem 1rem;
  display: flex;
  border-top: 1px solid rgb(230, 236, 240);
  transition: 0.3s ease;
  cursor: pointer;
   text-decoration: none;
   color: black;
   width: 100%;
   height: 100%;
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
    position: relative;
    width: 100%;
    .postText{
      padding-right: 1rem;
    }
    .upper{
      display: flex;
      width: 100%;
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
      .options{
        align-self: flex-start;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-left: auto;
        margin-top: 0.54rem;
        .dot{
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
`