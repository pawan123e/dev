import {CREATE_POST, GET_POSTS, POST_ERROR, DELETE_POST, UPDATE_LIKES, GET_POST, CREATE_COMMENT, DELETE_COMMENT, LIKE_POST, UNLIKE_POST } from './types';
import {setAlert} from './alert'
import axios from 'axios'

export const createPost = (text) => async dispatch => {
    const config = {
        headers: {'ContentType': 'application/json'}
    }
    
    try {
        const res = await axios.post('/api/posts', {text}, config);
        dispatch({
            type: CREATE_POST,
            payload: res.data
        })
        dispatch(setAlert('Post added', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: err.response.data.message
        })
    }
}

export const getAllPosts = () => async dispatch => {
       try {
           const res = await axios.get('/api/posts');
           dispatch({
               type: GET_POSTS,
               payload: res.data
           })
           
       } catch (err) {
           
            dispatch({
            type: POST_ERROR,
            payload: err.response.data.message
            })
       }
}

export const deletePost = id => async dispatch => {
       try {
           await axios.delete(`/api/posts/${id}`);
           dispatch({
               type: DELETE_POST,
               payload: id
           })
           dispatch(setAlert('Post removed', 'success'));
       } catch (err) {
           
           dispatch({
            type: POST_ERROR,
            payload: err.response.data.message
            })
       }
}

export const likePost = (id, likes, user) => async dispatch => {
    const finds = likes.find(like => like.user === user);
    if(!finds)
    {
        dispatch({
        type: LIKE_POST,
        payload: {id:id, liking: {id: id, user: user}}
    })
    }
    
    try {
        const res = await axios.put(`/api/posts/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id: id, like: res.data}
        })
       
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: err.response.data.message
            })
    }
}

export const unLikePost = (id, likes, user) => async dispatch => {
    const finds = likes.find(like => like.user === user);
    if(finds)
    {
        dispatch({
        type: UNLIKE_POST,
        payload: {id: id, user: user}
    })
    }
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id: id, like: res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: err.response.data.message
            })
    }
}

export const getPostById = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        console.log(err.response.data.message)
        dispatch({
            type: POST_ERROR,
            payload: err.response.data.message
            }) 
    }
}

export const createComment = (id, text) => async dispatch => {
    const config = {
        headers: {'ContentType': 'application/json'}
    }
    try {
        const res = await axios.put(`/api/posts/comment/${id}`, {text}, config);
        dispatch({
            type: CREATE_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: err.response.data.message
            })
    }
}

export const deleteComment = (id, commentId) => async dispatch => {
    try {
        
        const res = await axios.delete(`/api/posts/comment/${id}/${commentId}`);
        dispatch({
            type: DELETE_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: err.response.data.message
            })
    }
}