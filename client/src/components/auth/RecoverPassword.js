import React,{useEffect} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import Spinner from '../layout/Spinner'
const RecoverPassword = ({error, history, loading, email, token}) => {
    useEffect(() => {
        if(token) {
            history.push('/dashboard')
        }
        if(error === 'No search results' || error === 'Unauthorized access' ) {
            history.push('/forgotPassword')
        }
    },[error, token])
    if(loading) {
       return <Spinner/>
    } else {
       return (
        <div>
            <h4>The link has been send to the {email}. Please follow the links to change the password for login to your account within 10 minutes.</h4>
            <Link to='/resetPassword' className="btn btn-primary">Change password</Link>
        </div>
    ) 
    }    
}

const mapStateToProps = state => ({
    error: state.auth.error,
    loading: state.auth.loading,
    email: state.auth.email,
    token: state.auth.token
})

export default connect(mapStateToProps, {})(RecoverPassword)
