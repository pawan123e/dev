import React, {useState, useRef} from 'react'
import DashBoard from './Dashboard'
import { connect } from "react-redux";
import styled from "styled-components";
import {updateUser} from '../../actions/auth'

const DashboardSettings = ({auth, history, updateUser}) => {
    
    const [user, setUser] = useState({
        name: auth.user.name,
        email: auth.user.email,
        file: null
    })

    const fileRef = useRef();

    const {name, email, file} = user;

    document.body.style.overflow = 'hidden'

    const onchange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log('formData', name, email, file);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('avatar', file);
        updateUser(formData, history)
    }

    const fileUpload = e => {
            setUser({...user, file: e.target.files[0]})
    }

    return (
           <DashboardWrap>
           <div className="modal">
            <div className="accountModal">
              <h2 className="accountHeading">Account Settings</h2>
              <form onSubmit = {onsubmit}>
              <div className="topPart">
            <img src={require("../../img/web.jpg")} alt="web" />
            <div className='profileBgEdit'>
            <i className="far fa-edit"></i>
            </div>
            <div className="profileImg">
              <img
                src={
                  auth.user &&
                  require(`../../../../public/img/users/${auth.user.avatar}`)
                }
                alt="profilePic"
              />
              <div className='profilePicEdit'>
                 {file ? <i className="fas fa-check-circle" style={{color: 'green'}}></i> : <i className="far fa-edit" onClick = {!file ? () => fileRef.current.click() : undefined}></i>} 
                  
              </div>
              <input type="file" ref = {fileRef} style={{display: 'none'}} accept = 'image/*' onChange = {fileUpload}/>
         
            </div>
          </div>
          <div className='inputList'>
          <div className='formInput'>
                <label>Name</label>
                <input type = 'text' value = {name} onChange = {onchange} required name = 'name'/>
          </div>
          <div className='formInput'>
                <label>Email</label>
                <input type = 'email' value = {email} onChange = {onchange} required name = 'email'/>
          </div>
          </div>
          <div className='btns'>
            <input type = 'submit' className = 'btn' value = 'Save Settings'/>
          </div>
          </form>
            </div>
          </div>
           
           <div className='dash'>
               <DashBoard/>
           </div>
           </DashboardWrap>
    )
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile.profile,
    loading: state.profile.loading
  });


export default connect(
  mapStateToProps, {updateUser}
)(DashboardSettings);

const DashboardWrap = styled.div` 
 height: 100vh;
 width: 100vw;
 position: relative;
 .dash{
    filter: blur(2px);
 }
 .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    height: 100%;
    
    .accountModal{
      width: 40%;
      margin: auto;
      height: 90%;
      background: white;
      padding: 1rem;
      .accountHeading{
        text-align: center;
        font-size: 2.2rem;
        font-weight: 500;
        color: #0e9aa7;
      }
      .topPart {
        height: 140px;
        width: 90%;
        margin: auto;
        margin-top: 2rem;
        margin-bottom: 3rem;
        position: relative;
        img {
          height: 100%;
          width: 100%;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
        }
        .profileBgEdit{
            position: absolute;
            top: 0%;
            left: 0%;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.3);
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            i{  
                padding: 0.5rem;
                background: white;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.5s ease;
                &:hover{
                    background: #a0a0a0;
                }
            }
        }
        .profileImg {
          position: absolute;
          left: 30px;
          bottom: -60px;
          width: 95px;
          height: 95px;
          img {
            border-radius: 50%;
          }
          .profilePicEdit{
              position: absolute;
              top: 0%;
              left: 0%;
              width: 100%;
              height: 100%;
              background: rgba(0,0,0,0.5);
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              i{  
                  cursor: pointer;
                  padding: 0.5rem;
                  background: white;
                  border-radius: 50%;
                  transition: all 0.5s ease;
                  &:hover{
                    background: #a0a0a0;
                }
              }
          }
        }
      }
      .inputList{
          
          width: 90%;
          margin: auto;
          margin-top: 5rem;
          margin-bottom: 2rem;
          .formInput{
              display: flex;
              flex-direction: column;
              margin-bottom: 1rem;
              label{
                  font-weight: 600;
              }
              input{
                  background: #f0f0f0;
                  padding: 0.7rem 0.9rem;
                  width: 100%;
                  border: none;
                  outline: none;
                  font-size: 1rem;
                  border-radius: 5px;
              }
          }
      }
      .btns{
          margin-left: 5%;
          .btn{
              background: #ff5200;
              border: none;
              padding: 0.7rem 2rem;
              color: white;
              border-radius: 5px;
          }
      }
    }
  }

  @media(max-width: 1200px) {
      .modal{
          .accountModal{
          width: 50%;
      }
      }
      
  }

  @media(max-width: 850px) {
      .modal{
         .accountModal{
          width: 60%;
      } 
      }
      
  }
`