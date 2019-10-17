import React from 'react'
import {Link} from 'react-router-dom'

const Profiles = ({profile}) => {
    
        return (
          <div className="profile bg-light">
              
            <img
              className="round-img"
              src='fdfdsf'
              alt=""
              src={profile.user.avatar}
            />
            <div>
              <h2>{profile.user.name}</h2>
              <p>{profile.company}</p>
              <p>{profile.location}</p>
              <Link to={`/profiles/${profile.user._id}`} className="btn btn-primary">View Profile</Link>
            </div>
  
            <ul>
              {profile.skills.length > 0 && profile.skills.map((skill, index) => {
                  return (
                    <li className="text-primary" key={index}>
                    <i className="fas fa-check"></i> {skill}
                  </li>
                  )
              })}
            </ul>
          </div>
        )}



export default Profiles
