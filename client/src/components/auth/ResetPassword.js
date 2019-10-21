import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {resetPassword} from '../../actions/auth'
import {setAlert} from '../../actions/alert'
const ResetPassword = ({history, resetPassword, recoverToken, token, setAlert, error}) => {

    useEffect(() => {
        if(token) {
            history.push('/dashboard')
        }
        if(error === 'No search results' || error === 'Unauthorized access' ) {
            history.push('/forgotPassword')
        }
    },[token, error])

    const [user, setUser] = useState({
        password: '',
        confirmPassword: ''
    });
    const {password, confirmPassword} = user; 
    const onChange = e => setUser({...user, [e.target.name]: e.target.value})
    
    const onSubmit = e => {
         e.preventDefault();
         if(password !== confirmPassword) {
             setAlert('Password not matched', 'danger');
         } else {
             if(recoverToken !== null) {
             resetPassword(recoverToken, history, user)
         }
         }            
    }

    return (
        <>
            <h1 className="large text-primary">Reset Password</h1>
            <form onSubmit={onSubmit} className="form">
                <div className="form-group">
                    <input 
                    type="password" 
                    placeholder='New Password'
                    name='password' 
                    onChange={onChange}
                    value={password}
                    required
                    minLength='8'
                    />
                    
                </div>
                <div className="form-group">
                    <input 
                    type="password" 
                    placeholder='Confirm Password'
                    name='confirmPassword' 
                    onChange={onChange}
                    value={confirmPassword}
                    required
                    />
                    
                </div>
                <input type="submit" className='btn btn-primary'
                value='Change Password'/>
            </form>
        </>
    )
}

const mapStateToProps = state => ({
    recoverToken: state.auth.recoverToken,
    token: state.auth.token,
    error: state.auth.error
})

export default connect(mapStateToProps, {resetPassword, setAlert})(ResetPassword)