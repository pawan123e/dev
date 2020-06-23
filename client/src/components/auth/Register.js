import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearProfile } from "../../actions/profile";
import AccountWrap from "../styled/AccountStyled";
import { registerUser, clearError } from "../../actions/auth";

const Register = ({
  error,
  isAuthenticated,
  clearError,
  registerUser,
  history,
  clearProfile
}) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { name, email, password, confirmPassword } = user;
  const [alert, setAlert]  = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
        if(alert) {
          setTimeout(() => {
            setAlert(false);
            clearError();
          },5000)
        }
  },[alert])

  useEffect(() => {
    document.title = "Welcome to Dev Connector";
    if (isAuthenticated) {
      history.push("/dashboard");
    }
    clearProfile();
    if (error === "User already exists") {
      
      window.scrollTo(0,0);
      setAlert(true);
      setMessage(error);
      setLoading(false);
      // clearError();
    }
  }, [error, isAuthenticated]);

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    setLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert(true);
      setLoading(false);
      setMessage('Password does not match');
      window.scrollTo(0,0);
    } else {
      
      registerUser(user);
    }
  };

  return (
    <AccountWrap>
      {
      <div className="main">
      {alert && <div className='accountAlert'> 
        <p className='errorMessage'>{message}</p>
        </div>}
        <div className="upperPart">
          <h1 className="heading">Sign Up</h1>
          <img
            src={require("../../img/authenticate.jpg")}
            alt="authenticateImg"
          />
        </div>
        <div className="lowerPart">
          <form onSubmit={onSubmit} className="form">
            <div className="formInput">
              <span>Name</span>
              <div className="inputForm">
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  onChange={onChange}
                  value={name}
                  required
                />
                <span className="line"></span>
              </div>
            </div>
            <div className="formInput">
              <span>Email</span>
              <div className="inputForm">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  name="email"
                  onChange={onChange}
                  value={email}
                  required
                />
                <span className="line"></span>
              </div>
            </div>
            <div className="formInput">
              <span>Password</span>
              <div className="inputForm">
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={onChange}
                  value={password}
                  minLength="8"
                />
                <span className="line"></span>
              </div>
            </div>
            <div className="formInput">
              <span>Confirm Password</span>
              <div className="inputForm">
                <input
                  type="password"
                  placeholder="Enter Confirm Password"
                  name="confirmPassword"
                  onChange={onChange}
                  value={confirmPassword}
                />
                <span className="line"></span>
              </div>
            </div>
            <div className="btns">
              <button type="submit">{loading ? 'Loading...' : 'Register'}</button>
            </div>
          </form>
          <p className="my-1 link">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>}
    </AccountWrap>
  );
};

const mapStateToProps = state => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { registerUser, clearError, clearProfile }
)(Register);
