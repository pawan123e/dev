import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteComment} from '../../actions/posts'
const Comments = ({comment: {avatar, user, _id, text, date, name}, deleteComment, postId, mainUser}) => {
    return (
        <div className="post bg-white p-1 my-1" >
        <div>
          <Link  to={`/profiles/${user}`}>
            <img
             className="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            {text}
          </p>
           <p className="post-date">
              Posted on {date.split('').splice(0,10).join('').toString().split('-').join('/')}
          </p>

          {mainUser._id === user && 
           <button      
          type="button"
         className="btn btn-danger"
          onClick = {() => deleteComment(postId, _id)}>
          <i className="fas fa-times"></i>
        </button>
       
          }
      </div>
          
      </div>
    )
}

export default connect(null, {deleteComment})(Comments)
