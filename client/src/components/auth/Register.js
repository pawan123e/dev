import React,{useState, useEffect} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {setAlert} from '../../actions/alert'
import {clearProfile} from '../../actions/profile'
import {
        registerUser, 
        clearError
    } from '../../actions/auth'
const Register = ({error, isAuthenticated, setAlert, clearError, registerUser, history, clearProfile}) => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const {name, email, password, confirmPassword} = user;
    
    useEffect(() => {
        document.title = 'Welcome to Dev Connector'
        if(isAuthenticated) {
            history.push('/dashboard')
        }
        clearProfile();
       if(error === 'User already exists') {
            setAlert(error, 'danger');      
            clearError();
        } 
       
    }, [ error, isAuthenticated])
    
    const onChange = e => setUser({...user, [e.target.name]: e.target.value})
    
    const onSubmit = e => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setAlert('Passwords do not match', 'danger')
        } else {
            console.log('this is register')
            registerUser(user);
        }
    }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"/> Create Your Account
            </p>
            <form onSubmit={onSubmit} className="form">
                <div className="form-group">
                    <input 
                    type="text" 
                    placeholder="Name" 
                    name='name'
                    onChange={onChange}
                    value={name}
                    required
                    />
                </div>
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
                    minLength='6'
                    />
                </div>
                <div className="form-group">
                    <input type="password" 
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    onChange={onChange}
                    value={confirmPassword}
                    />
                </div>
                 <input type="submit" className='btn btn-primary'
                value='Register'/>
            </form>
            <p className="my-1">
                Already have an account? <Link to='/login'>
                    Sign In
                </Link>
            </p>
        </>
    )
}

const mapStateToProps = state => ({
 error: state.auth.error,
 isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {setAlert, registerUser, clearError, clearProfile})(Register);
