import axios from 'axios'

const authAccess = token => {
    if(token) {
        axios.defaults.headers.common['authorization'] = token
    } else {
         delete axios.defaults.header.common['authorization']
    }
}

export default authAccess
