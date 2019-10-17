import {
        REGISTER_SUCCESS, 
        REGISTER_FAIL, 
        CLEAR_ERRORS,
        GET_USER,
        AUTH_ERROR,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        LOGOUT,
        CLEAR_PROFILE
       } from '../actions/types';

import axios from 'axios';
import authAccess from '../utils/authAccess'

export const loadUser = () => async dispatch => {
    if(localStorage.token) {
       authAccess(localStorage.token)
    } 
    
    try {
       const res = await axios.get('/api/users/auth');
       dispatch({
           type: GET_USER,
           payload: res.data.user
       })
   } catch (err) {
       dispatch({
           type: AUTH_ERROR,
           payload: err.response.data.message
       })
   }
}


export const registerUser = (user) => async dispatch => {
       const config = {
           headers: {
               'Content-Type': 'application/json'
            }
       }
       const body = JSON.stringify(user);
       try {
           const res = await axios.post('/api/users/register', body, config);
           console.log(res.data)
           dispatch({
               type: REGISTER_SUCCESS,
               payload: res.data
           })
           
           dispatch(loadUser())
       } catch (err) {
           dispatch({
               type: REGISTER_FAIL,
               payload: err.response.data.message
           })
       }
}

export const clearError = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

export const loginUser = user => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
     
    const body = JSON.stringify(user)

    try {
        const res = await axios.post('/api/users/signIn', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.message
        })
    }
}

export const logout = () => dispatch => {
    dispatch({type: LOGOUT});
    dispatch({type: CLEAR_PROFILE})
}