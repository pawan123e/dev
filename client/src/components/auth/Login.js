import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {loginUser} from '../../actions/auth';
import {setAlert} from '../../actions/alert';
import {clearProfile} from '../../actions/profile'
const Login = ({loginUser, setAlert, error, isAuthenticated, history, clearProfile}) => {
  
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
            setAlert(error, 'danger')
        }
    }, [error, isAuthenticated])

    const {email, password} = user;
    
    const onChange = e => setUser({...user, [e.target.name]: e.target.value})
    
    const onSubmit = e => {
        e.preventDefault();
        loginUser(user);
    }

    return (
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"/> Login Your Account
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
                        This site uses Gravatar so if you want a profile image, use a Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input 
                    type="password" 
                    placeholder='Password'
                    name='password' 
                    onChange={onChange}
                    value={password}
                    minLength='8'
                    />
                </div>
                 <input type="submit" className='btn btn-primary'
                value='Login'/>
            </form>
            <p className="my-1">
                Don't have an account? <Link to='/register'>
                    Sign Up
                </Link>
            </p>
            <p className="my-1">
                <Link to='/forgotPassword'>
                   Forgot Password?
                </Link>
            </p>
        </>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {loginUser, setAlert, clearProfile})(Login)
