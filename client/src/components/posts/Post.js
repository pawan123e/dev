import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getAllPosts, createPost, deletePost, likePost, unLikePost, clearPost} from '../../actions/posts'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'
const Post = ({getAllPosts, createPost, clearPost, loading, posts, user}) => {

    useEffect(() => { 
            document.title = 'Posts'   
            getAllPosts();
            clearPost();        
    },[getAllPosts, clearPost])

    if(loading && posts.length > 0) {
      return <Spinner/>
    } else {
      return (
      <div>
      <h1 className="large text-primary"> Posts </h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
      <PostForm createPost={createPost}/>
      {posts.length > 0  ? (posts.map(post => <PostItem key={post._id} post={post} user={user}/>)) : (<Spinner/>)}
      </div>
    )}}

const mapStateToProps = state => ({
    loading: state.post.loading,
    posts: state.post.posts,
    user: state.auth.user
})

export default connect(mapStateToProps, {getAllPosts, clearPost, createPost, deletePost, likePost, unLikePost})(Post)
