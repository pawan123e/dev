import React from 'react'
import {deleteExperience} from '../../actions/profile'
import {connect} from 'react-redux';
const Experience = ({experience, deleteExperience}) => {

    const experiences = experience.map(exp => 
       (<tr key={exp._id}>
        <td>{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td className="hide-sm">
          {exp.from.split('').splice(0,10).join('').toString().split('-').join('/')} - 
          {exp.current ? 'Now' : 
          exp.to.split('').splice(0,10).join('').toString().split('-').join('/')}
        </td>
        <td>
          <button 
          onClick = {() => deleteExperience(exp._id)}
          className="btn btn-danger">
          Delete
          </button>
        </td>
        </tr>))

    return ( <>
           <h2 className="my-2">Experience Credentials</h2>
           <table className="table">

           <thead>
           <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
           </tr>
           </thead>

           <tbody>
           {experiences}   
           </tbody>

           </table>
           </>)
}

export default connect(null, {deleteExperience})(Experience)
