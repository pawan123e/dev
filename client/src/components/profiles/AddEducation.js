import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { addEducation, getCurrentProfile } from '../../actions/profile';
import {connect} from 'react-redux'
import { setAlert } from '../../actions/alert';

const AddEducation = ({addEducation, history}) => {

    const [edu, setEdu] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        current: false,
        to: '',
        description: ''
    })

    const {school, degree, fieldofstudy, from, current, to, description} = edu;

    const onchange = e => setEdu({...edu, [e.target.name]: e.target.value});
     
    const onsubmit = e => {
        e.preventDefault();
        addEducation(edu, history);
    }

    return (
        <>
           <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onsubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            onChange={onchange}
            value={school}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            onChange={onchange}
            value={degree}
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy" 
            onChange={onchange}
            value={fieldofstudy}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" 
            onChange={onchange}
            value={from}/>
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current" checked={current}  onChange= {() => setEdu({...edu, current: !current})}/> Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" 
            onChange={onchange}
            disabled={current ? 'disabled' : ''}
            value={to}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            onChange={onchange}
            value={description}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
      </form>
        </>
    )
}

export default connect(null, {addEducation, setAlert, getCurrentProfile})(AddEducation)
