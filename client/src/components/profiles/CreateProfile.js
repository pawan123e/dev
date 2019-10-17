import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createProfile} from '../../actions/profile'
const CreateProfile = ({createProfile, history}) => {

    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    })
     
    const [displaySociallInputs, toggleSocialInputs] = useState(false);

    const {company, website, location, status, skills, bio, twitter, facebook, linkedin, youtube, instagram} = formData;

    const onchange = e => setFormData({...formData, [e.target.name]: e.target.value})
    
    const onsubmit = e => {
        e.preventDefault();
        createProfile(formData, history)   
    }

    return (
        <>
           <h1 className="large text-primary">
               Create Your Profile
           </h1>
           <p className="lead">
               <i className="fas fa-user"></i>
               {' '}Let's get some information to make your profile stand out    
           </p>
           <small>* = required field</small>
           <form  className="form" onSubmit={onsubmit}>
             <div className="form-group">
                 <select name="status" value = {status} onChange={onchange} >
                     <option value="0">* Select Professional Status
                     </option>
                     <option value="Developer">Developer
                     </option>
                     <option value="Junior Developer">Junior Developer
                     </option> 
                     <option value="Senior Developer">Senior Developer
                     </option>
                     <option value="Manager">Manager
                     </option>
                     <option value="Student or Learning">Student or Learning
                     </option>
                     <option value="Instructor">Instructor
                     </option>
                     <option value="Intern">Intern
                     </option>
                     <option value="Other">Other
                     </option>
                 </select>
                 <small className="form-text">
                     Give us an idea of where you are at in your career
                 </small>
             </div>
             <div className="form-group">
                 <input type="text" placeholder="Company" name='company' onChange={onchange} value={company}/>
                 <small className="form-text">
                     Could be your own company or one you work for
                 </small>
             </div>
             <div className="form-group">
                 <input type="text" placeholder="Website" name='website' onChange={onchange} value={website}/>
                 <small className="form-text">
                     Could be your own or a company website
                 </small>
             </div>
             <div className="form-group">
                 <input type="text" placeholder="Location" name='location' onChange={onchange} value={location}/>
                 <small className="form-text">
                    City and state suggested {'(eg. Noida, Bangalore)'}
                 </small>
             </div>
             <div className="form-group">
                 <input type="text" placeholder="Skills" name='skills' onChange={onchange} value={skills}/>
                 <small className="form-text">
                    Please use comma separated values {'eg. HTML, css, sql'}
                 </small>
             </div>
             <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" onChange={onchange} value={bio}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" 
          className="btn btn-light"
          onClick={() => toggleSocialInputs(!displaySociallInputs)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
       {
           displaySociallInputs && <>
           <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onchange}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onchange}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onchange}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={onchange}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onchange}/>
        </div>   
       </>
    }
        
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>

            </form> 
        </>
    )
}

export default connect(null, {createProfile})(CreateProfile)
