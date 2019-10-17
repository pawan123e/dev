import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';

const Navbar = ({isAuthenticated, logout}) => {

    const privateNav = (
        <ul>
        <li><Link to='/profiles'> Developers </Link></li>   
        <li><Link to='/posts'> Posts </Link></li>   
        <li><Link to='/dashboard'>
            <i className="fas fa-user" /> {' '}
            Dashboard</Link></li>
        <li><a onClick={logout} href="">
            <i className="fas fa-sign-out-alt"/>{' '}
            Logout</a></li>
    </ul>
    )
    
   const publicNav = (
    <ul>
    <li><Link to="/profiles">Developers</Link></li>
    <li><Link to="/register">Register</Link></li>
    <li><Link to="/login">Login</Link></li>
    </ul>)

    return (
        <nav className="navbar bg-dark">
            <h1>
            <Link to="/" ><i className="fas fa-code"/> DevConnector
            </Link>
            </h1>
            {isAuthenticated ? privateNav : publicNav}
        </nav>
    )
}

const mapStatetoProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStatetoProps, {logout})(Navbar)
