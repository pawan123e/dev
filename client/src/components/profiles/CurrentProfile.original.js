import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getProfileById} from '../../actions/profile'
const CurrentProfile = ({getProfileById, loading, match, profile, error}) => {
    useEffect(() => {
        getProfileById(match.params.id)
    },[getProfileById])
   if((profile === null && error !== 'Profile not found') || (loading && error !== 'Profile not found')) {
       return <Spinner/>
   } else {
       if(error === 'Profile not found') {
        return  <h4>Profile not found.</h4>
       } else {
        return (
          <div style={{width: '60vw', margin: 'auto'}}>
          <Link to='/profiles' className="btn btn-light">Back To Profiles</Link>
          <div className="profile-grid my-1">
            
            <div className="profile-top bg-primary p-2">
              <img
                className="round-img my-1"
                src={profile.user.avatar}
                alt=""
              />
              <h1 className="large">{profile.user.name}</h1>
              <p className="lead">{profile.company}</p>
              <p>{profile.location}</p>
              <div className="icons my-1">
              {profile.website && <a href={profile.website} target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-globe fa-2x"></i>
                </a>}  
              {profile.social && profile.social.twitter &&
                <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter fa-2x"></i>
                </a>}
              {profile.social && profile.social.facebook &&
                <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook fa-2x"></i>
                </a>}
              {profile.social && profile.social.linkedin  && 
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin fa-2x"></i>
                </a>}
              {profile.social && profile.social.youtube &&
                 <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube fa-2x"></i>
                </a>}
              {profile.social && profile.social.instagram &&  
                <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram fa-2x"></i>
                </a>}
              </div>
            </div>
    
           
            <div className="profile-about bg-light p-2">
              <h2 className="text-primary">{profile.user.name.toString().split(' ')[0]}'s Bio</h2>
              <p>
                {profile.bio}
              </p>
              <div className="line"></div>
              <h2 className="text-primary">Skill Set</h2>
              <div className="skills">
                  {profile.skills.map((skill,index) => <div className="p-1" key={index}><i className="fa fa-check"></i> {skill}</div>)}
              </div>
            </div>
            
              <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? 
              <div>
              {profile.experience.map(exp => 
                <div key={exp._id}>
                <h3 className="text-dark">{exp.company}</h3>
                <p>{exp.from.split('').splice(0,10).join('').toString().split('-').join('/')} - 
                {exp.to === null ? ' Current' : exp.to.split('').splice(0,10).join('').toString().split('-').join('/')}</p>
                <p><strong>Position: </strong>{exp.title}</p>
                <p>
                  <strong>Description: </strong>{exp.description}
                </p>
                </div>)}
               
              </div> : (<h4>No experience credentials</h4>)}
              </div>  
             
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {
               profile.education.length > 0 ?
              <div>
                 {profile.education.map(edu => 
                <div key={edu._id}>  
                <h3>{edu.school}</h3>
                <p>{edu.from.split('').splice(0,10).join('').toString().split('-').join('/')} - 
                {edu.to === null ? ' Current' : edu.to.split('').splice(0,10).join('').toString().split('-').join('/')}</p>
                <p><strong>Degree: </strong>{edu.degree}</p>
                <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                <p>
                  <strong>Description: </strong>{edu.description}
                </p>
                </div>
                )}
              </div> : (<h4>No education credentials</h4>)}
            </div>
          </div>
        </div>
         ) 
       }

       
   }
}

const mapStateToProps = state => ({
    loading: state.profile.loading,
    profile: state.profile.profile,
    error: state.profile.error
})
export default connect(mapStateToProps, {getProfileById})(CurrentProfile)
