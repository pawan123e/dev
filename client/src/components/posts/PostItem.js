import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deletePost, likePost, unLikePost} from '../../actions/posts'
const PostItem = ({post, user, deletePost, likePost, unLikePost, error}) => {

   

    return (
        <div className="posts" key={post._id}>
           <div className="post bg-white p-1 my-1">
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
               <button type="button" className="btn btn-light" onClick= {() => likePost(post._id, post.like, user._id)}>
                 <i className="fas fa-thumbs-up"></i>
                 <span>{post.like.length > 0 && <span>{post.like.length}</span>}</span>
               </button>
               <button type="button" className="btn btn-light" onClick= {() => unLikePost(post._id, post.like, user._id)}>
                 <i className="fas fa-thumbs-down"></i>
               </button>
               <Link to= {`/posts/${post._id}`} className="btn btn-primary">
                 Discussion {post.comments.length > 0 &&<span className='comment-count'>{ post.comments.length}</span>}
               </Link>
               
              {user._id === post.user && 
              <button      
               type="button"
               className="btn btn-danger"
               onClick= {() => deletePost(post._id)}>
               <i className="fas fa-times"></i>
             </button>
              }
               
             </div>
           </div>
         </div>
    )
}

const mapStateToProps = state => ({
  error: state.post.error
})

export default connect(mapStateToProps, {deletePost, likePost, unLikePost})(PostItem)
