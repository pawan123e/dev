import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {loginUser, clearError } from '../../actions/auth';
import {clearProfile} from '../../actions/profile'
import AccountWrap from '../styled/AccountStyled'
const Login = ({loginUser, error, isAuthenticated, history, clearProfile, clearError}) => {
  
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    
    useEffect(() => {
       document.title = 'Welcome to Dev Connector'
       clearProfile();
       if(isAuthenticated) {
           history.push('/dashboard')
       }

        if(error === 'Invalid credentials') {
            setAlert(true)
            setMessage(error)
            setLoading(false);
        }
    }, [error, isAuthenticated])

    const {email, password} = user;
    
    const onChange = e => setUser({...user, [e.target.name]: e.target.value})
    
    const onSubmit = e => {
        e.preventDefault();
        setLoading(true);
        loginUser(user);
    }

    const [alert, setAlert]  = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(alert) {
          setTimeout(() => {
            setAlert(false);
            clearError()
          },5000)
        }
  },[alert])



    return (
        <AccountWrap type = 'login'>
            <div className='main'>
            <div className='upperPart'>
            <h1 className="heading">Sign In</h1>
            <img src = {require('../../img/authenticate.jpg')} alt = 'authenticateImg'/>
            </div>
            <div className='lowerPart'>
            <form onSubmit={onSubmit} className="form">
                <div className='formInput'>
                    <span>Email</span>
                <div className="inputForm">
                    <input 
                    type="email" 
                    placeholder='Email Address'
                    name='email' 
                    onChange={onChange}
                    value={email}
                    required
                    />
                    <span className='line'></span>
                </div>
                </div>
                <div className='formInput'>
                <span>Password</span>
                <div className="inputForm">
                    <input 
                    type="password" 
                    placeholder='Password'
                    name='password' 
                    onChange={onChange}
                    value={password}
                    minLength='8'
                    />
                    <span className='line'></span>
                </div>
                </div>
                <div className='btns'>
                     <button type="submit" disable = {error}>
                     {loading ? 'Loading...' : 'Login'}
                </button>
                <p className="my-1">
                <Link to='/forgotPassword'>
                   Forgot Password?
                </Link>
            </p>
                </div>
               
            </form>
            <p className="my-1 link">
                Don't have an account? <Link to='/register'>
                    Sign Up
                </Link>
            </p>
            </div>
            {alert && <div className='accountAlert'> 
        <i className="fas fa-info-circle"></i>
        <p className='errorMessage'>{message}</p>
        </div>}
            </div>
        </AccountWrap>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {loginUser, clearProfile, clearError})(Login)
