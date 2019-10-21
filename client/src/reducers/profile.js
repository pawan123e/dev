import {GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, CREATE_PROFILE, UPDATE_PROFILE, GET_PROFILES} from '../actions/types'

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: null
}

export default (state=initialState, action) => {
   switch(action.type) {
       case GET_PROFILE: 
          return {
              ...state,
              profile: action.payload,
              loading: false,
              error: null
          }
        case PROFILE_ERROR:     
           return {
               ...state,
               loading: false,
               error: action.payload
           }  
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: true,
                error: null
            }
        case CREATE_PROFILE: 
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false,
                error: null
            }
        case GET_PROFILES: 
            return {
                ...state,
                profiles: action.payload,
                error: null
            }         
       default :
         return state;   
   }
}