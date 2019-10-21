import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {forgotPassword, clearForgotPassword} from '../../actions/auth'
import {setAlert} from '../../actions/alert'
const ForgotPassword = ({forgotPassword, history, error, clearForgotPassword, isAuthenticated, token}) => {
    const [email, setEmail] = useState('');
   
    const onChange = e => setEmail(e.target.value);
    
    useEffect(() => {
        if(token) {
            history.push('/dashboard')
        }
        clearForgotPassword();
    },[token])
    const onSubmit = e => {
         e.preventDefault();
         forgotPassword(email, history, error);
    }

    return (
        <>
            <h1 className="large text-primary">Forgot Password</h1>
            <p className="lead">
                Find Your Account
            </p>
            <form onSubmit={onSubmit} className="form">
                <div className="form-group">
                    <input 
                    type="email" 
                    placeholder='Email Address'
                    name='email' 
                    onChange={onChange}
                    value={email}
                    required
                    />
                    <small className="form-text">
                        Enter email address only when you have created account.
                    </small>
                </div>
                <input type="submit" className='btn btn-primary'
                value='Login'/>
            </form>
        </>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token
})

export default connect(mapStateToProps, {forgotPassword, clearForgotPassword, setAlert})(ForgotPassword)
