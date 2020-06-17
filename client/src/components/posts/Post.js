import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getAllPosts, createPost,  clearPost} from '../../actions/posts'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'
import styled from 'styled-components';
const Post = ({getAllPosts, createPost, clearPost, loading, posts, user, history}) => {

    useEffect(() => { 
            document.title = 'Posts'   
            getAllPosts();
            clearPost();        
    },[getAllPosts, clearPost])

    if(loading && posts.length > 0) {
      return <Spinner/>
    } else {
      return (
      <PostWrap>
      <div className='topSection'>
      <h1 className="large text-primary"> Posts </h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
      <PostForm createPost={createPost}/>
      </div>
      {console.log('posts length', posts.length)}
      <div className='posts'>
      {posts.length > 0  &&  (posts.map(post => <PostItem key={post._id} post={post} user={user} history = {history}/>)) }
      </div>
      
      </PostWrap>
    )}}

const mapStateToProps = state => ({
    loading: state.post.loading,
    posts: state.post.posts,
    user: state.auth.user
})

export default connect(mapStateToProps, {getAllPosts, clearPost, createPost})(Post)

const PostWrap = styled.div`
padding-top: 11vh;
width: 80%;
margin: auto;
.topSection{
  width: 80%;
}
.posts{
  // padding: 1rem;
  border: 1px solid rgb(230, 236, 240);
  border-top: none;
  margin-bottom: 1rem;
  width: 80%;
}
@media(max-width: 500px) {
  width: 100%;
  .topSection{
    width: 95%;
    margin: auto;
  }
  .posts{
    width: 100%;
    border-bottom: none;
  }
}
`