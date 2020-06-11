import React from 'react'
import {deleteEducation} from '../../actions/profile'
import {connect} from 'react-redux';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
const Education = ({education, deleteEducation}) => {

return (
  <EducationWrap>
    <div className="headPart">
      <h2 className="heading">Education</h2>
      <Link to="/add-education">
        <i className="fas fa-plus"></i>
      </Link>
    </div>
    {education.map((edu,idx) => (
      <div className={(idx === (education.length - 1)) ? 'eduPart': 'eduPart yesBorder'} id={edu._id} >
        <div className="eduDetail">
          <p className="eduSchool">{edu.school}</p>
          <p className="eduDegree">{edu.degree} {', '} {edu.fieldofstudy}</p>
          <p className="eduDate">
            {edu.from
              .split("")
              .splice(0, 10)
              .join("")
              .toString()
              .split("-")
              .join("/")}{" "}
            -
            {edu.current
              ? "Now"
              : edu.to
                  .split("")
                  .splice(0, 10)
                  .join("")
                  .toString()
                  .split("-")
                  .join("/")}{" "}
          </p>
        </div>
        <div className="delEdu">
          <button
            onClick={() => deleteEducation(edu._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </EducationWrap> 
);
}

export default connect(null, {deleteEducation})(Education)

const EducationWrap = styled.div`
width: 90%;
margin: auto;
  .headPart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      color: #0e9aa7;
      cursor: pointer;
    }
    .heading {
      font-size: 1.3rem;
      font-weight: 500;
    }
  }
  .yesBorder{
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    // padding-bottom: 2rem;

  }
  .eduPart {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding-bottom: 0.5rem;
    align-items: center;
    .eduDetail{
      .eduSchool{
        font-size: 1rem;
        font-weight: 700;
      }
      .eduDegree, .eduDate, .eduLocation{
        font-size: 0.85rem;
      }
      .eduDate, .eduLocation{
        color: #808080;
      }
    }
  }

  @media(max-width: 450px) {
    width: 100%;
  }
`;
