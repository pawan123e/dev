import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';
import styled from 'styled-components';

const Navbar = ({isAuthenticated, logout, user}) => {

    const [ham, setHam] = useState(false);

    useEffect(() => {
        if(ham) {
            console.log('ham is true')
           const links = document.querySelector('.links');
           console.log(links.classList)
           links.classList.add('showUl');
        } else {
            console.log('ham is false');
            const links = document.querySelector('.links');
            console.log(links.classList)
            links.classList.remove('showUl');
        }
    }, [ham])

    const privateNav = (
        <ul className='links'>
        <li onClick = {() => setHam(false)}><Link to='/profiles'> Developers </Link></li>   
        <li onClick = {() => setHam(false)}><Link to='/posts'> Posts </Link></li>   
        <li onClick = {() => setHam(false)}><Link to='/dashboard' className='profileSnapshot'>
               {user && <img src = {require(`../../../../public/img/users/${user.avatar}`)}/>}
           {' '}
            Dashboard</Link></li>
        <li onClick = {() => setHam(false)}>
            <a onClick={logout} href="">
            Logout
            </a>
        </li>
    </ul>
    )
    
   const publicNav = (
    <ul className='links'>
    <li onClick = {() => setHam(false)}><Link to="/profiles">Developers</Link></li>
    <li onClick = {() => setHam(false)}><Link to="/register">Register</Link></li>
    <li onClick = {() => setHam(false)}><Link to="/login">Login</Link></li>
    </ul>)

    return (
        <NavbarWrap>
        <nav className="navbar bg-dark">
            <div className='hamburger' onClick = {() => setHam(!ham)}>
              <div className='line'></div>
              <div className='line'></div>
              <div className='line'></div>
            </div>
            <Link to="/" className='logo' onClick = {() => setHam(false)}><h1 style = {{marginLeft: '0.5rem'}}>DevJunction</h1>
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
    padding: 0 2rem;
    position: fixed;
    z-index: 10;
    width: 100%;
    // top: 0;
    border-bottom: solid 1px var(--primary-color);
    opacity: 0.9;
    color: var(--text-color);
    .hamburger{
        display: none;
    }
    .snapshot{
        display: none;
    }
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
         border: none;
         display: flex;
         padding: 0;
         opacity: 1;
         height: 8vh;
         .hamburger{
             display: block;
             position: absolute;
             top: 50%;
             right: 20px;
             transform: translate(0, -50%);
             z-index: 2;
             .line{
                 height: 3px;
                 width: 26px;
                 margin: 3px;
                 background: white;
             }
         }
         .logo{
             position: absolute;
             top: 50%;
             left: 0px;
             transform: translate(0, -50%);
             z-index: 2;
         }
         .links{
             flex-direction: column;
             position: fixed;
             width: 100%;
             min-height: 100vh;
             background: #343a40;
             justify-content: space-between;
             align-items: space-around;
             margin-bottom: 0;
             padding: 8rem 0;
             opacity: 1;
             clip-path: circle(100px at 90% -10%);
             -webkit-clip-path: circle(100px at 90% -10%);
             transition: all 1s ease-out;
             li{
                 font-size: 1.5rem;
             }
            
         }
         .showUl{
            clip-path: circle(1000px at 90% -10%)!imporant;
            -webkit-clip-path: circle(1000px at 90% -10%)!important;
         }
      }
  }
`