import axios from 'axios';
import {
    GET_PROFILE, 
    PROFILE_ERROR, 
    CLEAR_PROFILE, 
    CREATE_PROFILE,
    UPDATE_PROFILE,
    DELETE_PROFILE,
    GET_PROFILES

} from './types'
import {setAlert} from '../actions/alert'

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err.response.data.message
        })
    }
}

export const clearProfile = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
}

export const createProfile = (profile, history, edit=false) => async dispatch => {
    const config = {
        headers: {'ContentType': 'application/json'}
    }
    try {
        const res = await axios.post('/api/profile/me', profile, config);
        dispatch({
            type: CREATE_PROFILE,
            payload: res.data
        })
        history.push('/dashboard');
        dispatch(setAlert(edit ? 'Your profile is edited' : 'Your profile is created', 'success'))
    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,
            payload: err.response.data.message
        })
    }
}

export const addExperience = (exp, history) => async dispatch => {
      const config = {
          headers: {
              'ContentType': 'application/json'
          }
      }

      try {
          const res = await axios.put('/api/profile/experience', exp, config);
          dispatch({
              type: UPDATE_PROFILE,
              payload: res.data
          })
          dispatch(setAlert('Experience Added', 'success'))
          history.push('/dashboard')
      } catch (err) {
          dispatch({
              type: PROFILE_ERROR,
              payload: err.response.data.message
          })
      }
}

export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Removed', 'success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err.response.data.message
        })
    }
}

export const addEducation = (exp, history) => async dispatch => {
    const config = {
        headers: {
            'ContentType': 'application/json'
        }
    }

    try {
        const res = await axios.put('/api/profile/education', exp, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Added', 'success'))
        history.push('/dashboard')
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err.response.data.message
        })
    }
}

export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Removed', 'success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err.response.data.message
        })
    }
}

export const deleteProfile = (history) => async dispatch => {
    if(window.confirm('Are you sure?'))
    {
        try {
            
            await axios.delete('/api/profile')
            dispatch({
                type: CLEAR_PROFILE
            })
            dispatch({
                type: DELETE_PROFILE
            })
            history.push('/');
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: err.response.data.message
            })
        }
    }
   
}

export const getAllProfiles = () => async dispatch =>{
     try {
         const res = await axios.get('/api/profile');
         dispatch({
           type: GET_PROFILES,
           payload: res.data
         })
     } catch (err) {
         console.log('this error is for getallprofiles')
         dispatch({
           type: PROFILE_ERROR,
           payload: err.response.data.message
         })   
     }
}

export const getProfileById = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/${id}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data.profile
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: err.response.data.message
        })
    }
}