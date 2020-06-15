import {CREATE_POST, GET_POSTS, POST_ERROR, DELETE_POST, UPDATE_LIKES, GET_POST, CREATE_COMMENT, DELETE_COMMENT, DELETE_PROFILE, LIKE_POST, UNLIKE_POST, CLEAR_POST} from '../actions/types';

const initialState = {
    posts: '',
    loading: true,
    post: null,
    error: null
}

export default (state= initialState, action) => {
    switch(action.type) {
        case CREATE_POST:
          return {
             ...state,
             posts: [action.payload, ...state.posts]
          } 
        case GET_POSTS: 
           return {
               ...state,
               loading: false,
               posts: action.payload
           }  
        case POST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_POST:
             return {
                 ...state,
                 loading: false,
                 posts: state.posts.filter(post => post._id !== action.payload)
             }
        case UPDATE_LIKES: 
              return {
                  ...state,
                  posts: state.posts.map(post => post._id === action.payload.id ? {...post, like: action.payload.like}: post),
                  loading: false,
                  error: 'No error'
              } 
        case GET_POST: 
              return {
                  ...state,
                  loading: false,
                  post: action.payload
              } 
        case CLEAR_POST: 
              return {
                  ...state,
                  post: null
              }       
        case CREATE_COMMENT:
        case DELETE_COMMENT:     {
              return {
                  ...state,
                  loading: false,
                  post: {...state.post, comments: action.payload}
              }
        }
        case LIKE_POST: 
               return {
                   ...state,
                   loading: false,
                   posts: state.posts.map(post => post._id === action.payload.id ? {...post, like: [...post.like, action.payload.liking]}: post)
               }    
        case UNLIKE_POST: 
               return {
                   ...state,
                   loading: false,
                   posts: state.posts.map(post => post._id === action.payload.id ? {...post, like: post.like.filter(item => item.user !== action.payload.user)}: post)
               }             
        default: 
            return state;
    }
}