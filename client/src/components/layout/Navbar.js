import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';
import styled from 'styled-components';

const Navbar = ({isAuthenticated, logout, user}) => {

    const privateNav = (
        <ul>
        <li><Link to='/profiles'> Developers </Link></li>   
        <li><Link to='/posts'> Posts </Link></li>   
        <li><Link to='/dashboard' className='profileSnapshot'>
           {/* <div className='profileImg' style = {{height: '10px', width: '10px'}}> */}
               {user && <img src = {require(`../../../../public/img/users/${user.avatar}`)}/>}
           {' '}
            Dashboard</Link></li>
        <li><a onClick={logout} href="">
            
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
    user: state.auth.user
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
    z-index: 2;
    width: 100%;
    top: 0;
    border-bottom: solid 1px var(--primary-color);
    opacity: 0.9;
    color: var(--text-color);
    ul{
        display: flex;
        align-items: center;
        .profileSnapshot{
            display: flex;
            align-items: center;
            img{
                height: 30px;
                width: 30px;
                border-radius: 50%;
                margin-right: 0.5rem;
            }
        }
    }
  }
  @media(max-width: 700px) {
      .navbar{
         flex-direction: column; 
         height: 18vh;
         height: 105px;
         padding: 0;
         padding-top: 0.5rem;
         ul{
             width: 95%;
             margin: auto;
             justify-content: space-between;
             margin-bottom: 0;
             padding: 0;
             i{
                 display: none;
             }
         }
      }
  }
`