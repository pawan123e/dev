import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { addExperience, getCurrentProfile } from '../../actions/profile';
import {connect} from 'react-redux'
import { setAlert } from '../../actions/alert';
import styled from 'styled-components'

const AddExperience = ({addExperience, history}) => {

    const [exp, setExp] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        current: false,
        to: '',
        description: ''
    })

    const {title, company, location, from, current, to, description} = exp;

    const onchange = e => setExp({...exp, [e.target.name]: e.target.value});
     
    const onsubmit = e => {
        e.preventDefault();
        addExperience(exp, history);
    }

    return (
        <ExperienceWrap>
           <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onsubmit}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={onchange}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" required value={company} onChange={onchange}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={onchange}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onchange} required/>
        </div>
         <div className="form-group">
          <p>
              <input type="checkbox" name="current" checked = {current} value={current} onChange={() => setExp({...exp, current: !current})} />
               Current Job
              </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={onchange} disabled = {current ? 'disabled' : ''}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={onchange}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
      </form>
        </ExperienceWrap>
    )
}

export default connect(null, {addExperience, setAlert, getCurrentProfile})(AddExperience)

const ExperienceWrap = styled.div`
padding-top: 12vh;
width: 80%;
margin: 0 auto;
@media(max-width: 500px) {
   h1{ 
     font-size: 1.5rem;
   }
}
`
