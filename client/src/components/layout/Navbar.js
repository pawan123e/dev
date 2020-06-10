import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';
import styled from 'styled-components';

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
        <NavbarWrap>
        <nav className="navbar bg-dark">
            
            <Link to="/" className='logo'><i class="fa fa-link fa-2x" aria-hidden="true"></i> <h1 style = {{marginLeft: '0.5rem'}}>DevJunction</h1>
            </Link>
            {isAuthenticated ? privateNav : publicNav}
        </nav>
        </NavbarWrap>
    )
}

const mapStatetoProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStatetoProps, {logout})(Navbar)

const NavbarWrap = styled.div`
.navbar {
    display: flex;
    height: 10vh;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 2rem;
    position: fixed;
    z-index: 1;
    width: 100%;
    top: 0;
    border-bottom: solid 1px var(--primary-color);
    opacity: 0.9;
    color: var(--text-color);
  }
  @media(max-width: 700px) {
      .navbar{
         flex-direction: column; 
         height: 18vh;
         padding-bottom: 0;
         ul{
             width: 95%;
             margin: auto;
             justify-content: space-between;
             margin-bottom: 0;
             padding: 0;
         }
      }
  }
`