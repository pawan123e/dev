import {
       REGISTER_SUCCESS,
       REGISTER_FAIL,
       CLEAR_ERRORS,
       GET_USER,
       AUTH_ERROR,
       LOGIN_SUCCESS,
       LOGIN_FAIL,
       LOGOUT,
       DELETE_PROFILE,
       FORGOT_PASSWORD,
       FORGOT_PASSWORD_ERROR,
       CLEAR_FORGOT_PASSWORD
    } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
    user: null,
    email: null,
    recoverToken: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:     
           localStorage.setItem('token', action.payload.token)
           return {
               ...state,
               ...action.payload,
               isAuthenticated: true,
               loading: false,
               error: null,
               recoverToken:null,
               email: null
           }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR: 
        case LOGOUT:
        case DELETE_PROFILE:    
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: true,
                user: null,
                error:action.payload,
                recoverToken:null,
                email: null
            } 
        case CLEAR_ERRORS: 
            return {
                ...state,
                error: null,
                recoverToken:null,
                email: null
            }
        case GET_USER: 
             return {
                 ...state,
                 isAuthenticated: true,
                 loading: false,
                 user: action.payload,
                 recoverToken:null,
                 email: null
             } 
        case FORGOT_PASSWORD: 
            return {
                ...state,
                loading: false,
                error: null,
                email: action.payload.email,
                recoverToken: action.payload.token
            }    
        case FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                email: null,
                recoverToken:null
            } 
        case CLEAR_FORGOT_PASSWORD:
            return {
                ...state,
                loading: true,
                error: null,
                email: null,
                recoverToken:null
            }              
        default :
           return state;   
    }
}