import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getPostById, createComment} from '../../actions/posts'
import Spinner from '../layout/Spinner'
import Comments from './Comments'
import PostCommentForm from './PostCommentForm'
const PostComment = ({post, getPostById, match, createComment, mainUser}) => {

    useEffect(() => {
        getPostById(match.params.id);
    }, [getPostById])

    if(post === null) {
        return <Spinner/>
    } else {
    return (
        <div>
            <Link to='/posts'className="btn">Back To Posts</Link>
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
        </div>
      </div>
      
      <PostCommentForm createComment={createComment} match={match}/>

      <div className="comments">
        {post.comments.map(comment => (<Comments key={comment._id} comment={comment} postId = {post._id} mainUser = {mainUser}/>))}
      </div>
      </div>
    )}}

const mapStateToProps  = state => ({
    post: state.post.post,
    mainUser: state.auth.user
})

export default connect(mapStateToProps, {getPostById, createComment})(PostComment)

