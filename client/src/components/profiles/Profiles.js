import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Profiles = ({profile}) => {
    
        return (
          <ProfileWrap>
          <div className="profile">
              
            <img
              className="round-img"
              src='fdfdsf'
              alt=""
              src={profile.user.avatar}
            />
            <div className='bottomPart'>
            <div className='userDetail'>
              <h2 className='userName'>{profile.user.name}</h2>
              <p className='userCompany'>{profile.company}</p>
              <p className='userLocation'>{profile.location}</p>
            </div>
           
            <div className='connect'><Link to={`/profiles/${profile.user._id}`} className="btn btn-primary">View Profile</Link></div>
          </div>
          </div>
          </ProfileWrap>
        )}



export default Profiles

const ProfileWrap = styled.div`
background: white;
border-radius: 6px;
box-shadow: 7px 6px 27px -5px rgba(34,34,34,1);
.profile{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  img{
    width: 150px;
    height: 150px;
  }

  .bottomPart{
    width: 100%;
    height: 100%;
    .connect{
      height: 100%;
      margin-top: 2rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
   .userDetail{
     display: flex;
     flex-direction: column;
     justify-content: center;
     .userName{
       font-weight: 500;
       text-align: center;
     }
     .userCompany{
       text-align: center;
       text-transform: uppercase;
       color: gray;
     }
     .userLocation{
       text-align: center;

     }
   }
  }
}
`
