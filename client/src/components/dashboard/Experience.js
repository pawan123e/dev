import React from "react";
import { deleteExperience } from "../../actions/profile";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Experience = ({ experience, deleteExperience }) => {
  
  return (
    <ExperienceWrap>
      <div className="headPart">
        <h2 className="heading">Experience</h2>
        <Link to="/add-experience">
          <i className="fas fa-plus"></i>
        </Link>
      </div>
      {experience.length === 0 ? <h3 className='noExperience'>No Experience added yet.</h3>
    :
    <>
      {experience.map((exp,idx) => (
        <div className={(idx === (experience.length - 1)) ? 'expPart': 'expPart yesBorder'} id={exp._id} >
          <div className="expDetail">
            <p className="expCompany">{exp.company}</p>
            <p className="expTitle">{exp.title}</p>
            <p className="expDate">
              {exp.from
                .split("")
                .splice(0, 10)
                .join("")
                .toString()
                .split("-")
                .join("/")}{" "}
              -
              {exp.current
                ? "Now"
                : exp.to
                    .split("")
                    .splice(0, 10)
                    .join("")
                    .toString()
                    .split("-")
                    .join("/")}{" "}
            </p>
            <p className="expLocation">{exp.location}</p>
          </div>
          <div className="delExp">
            <button
              onClick={() => deleteExperience(exp._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      </>}
    </ExperienceWrap> 
  );
};

export default connect(
  null,
  { deleteExperience }
)(Experience);

const ExperienceWrap = styled.div`
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
  }
  .noExperience{
    margin-top: 1.5rem;
    font-size: 1rem;
  }
  .expPart {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding-bottom: 0.5rem;
    align-items: center;
    .expDetail{
      .expCompany{
        font-size: 1rem;
        font-weight: 700;
      }
      .expTitle, .expDate, .expLocation{
        font-size: 0.85rem;
      }
      .expTitle{
        text-transform: uppercase;
      }
      .expDate, .expLocation{
        color: #808080;
      }
    }
  }

`;
