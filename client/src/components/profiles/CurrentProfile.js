import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import styled from "styled-components";

const CurrentProfile = ({ getProfileById, loading, match, profile, error }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);

  if (
    (profile === null && error !== "Profile not found") ||
    (loading && error !== "Profile not found")
  ) {
    return <ProfileWrap><Spinner /></ProfileWrap>
  } else {
    if (error === "Profile not found") {
      return <h4>Profile not found.</h4>;
    } else {
      return (
        <ProfileWrap>
          <div className="wrap">
            <div className="profileHeader">
              <div className="leftHeader">
                <img src={profile.user && profile.user.avatar} alt="profilePic" />
              </div>
              <div className="rightHeader">
                <div className="profileAbout">
                  <h1 className="name">{profile.user.name}</h1>
                  <h3 className="company">{profile.company}</h3>
                  <p className="userBio">{profile.bio}</p>
                </div>

                <div className="socialIcons">
                  {profile.social && profile.social.twitter && (
                    <a
                      href={profile.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter fa-2x "></i>
                    </a>
                  )}
                  {profile.social && profile.social.facebook && (
                    <a
                      href={profile.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook fa-2x"></i>
                    </a>
                  )}
                  {profile.social && profile.social.linkedin && (
                    <a
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin-in fa-2x "></i>
                    </a>
                  )}
                  {profile.social && profile.social.youtube && (
                    <a
                      href={profile.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-youtube fa-2x"></i>
                    </a>
                  )}
                  {profile.social && profile.social.instagram && (
                    <a
                      href={profile.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram fa-2x"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
            {
            <div className="profileMain">
              <div className="mainLeft">
                <h1 className="personalHeading">Personal Details</h1>
                {profile.location && <div className="address">
                   <h2 className="addressHeading">Address</h2>
                  <h3 className="addressText">{profile.location}</h3>
                  </div> }
                <div className="email">
                  <h2 className="emailHeading">Email</h2>
                  <h3 className="emailText">{profile.user.email}</h3>
                </div>
              </div>
              <div className="mainRight">
                <div className="experience">
                  <h2 className="experienceHeading">Experience</h2>
                  {profile.experience.length > 0 ? (
                    <>
                      {profile.experience.map(exp => (
                        <div className="exp" key={exp._id}>
                          <div className="bullet"></div>
                          <div className="expDetail">
                            <h2 className="expPosition">{exp.title}</h2>
                            <h3 className="expEmployer">{exp.company}</h3>
                            <p>
                              {exp.from
                                .split("")
                                .splice(0, 10)
                                .join("")
                                .toString()
                                .split("-")
                                .join("/")}{" "}
                              -
                              {exp.to === null
                                ? " Current"
                                : exp.to
                                    .split("")
                                    .splice(0, 10)
                                    .join("")
                                    .toString()
                                    .split("-")
                                    .join("/")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <h4>No experience credentials</h4>
                  )}
                </div>
                <div className="education">
                  <h2 className="educationHeading">education</h2>
                  {profile.education.length > 0 ? (
                    <>
                      {profile.education.map(edu => (
                        <div className="edu" key={edu._id}>
                          <div className="bullet"></div>
                          <div className="eduDetail">
                            <h2 className="eduSchool">{edu.school}</h2>
                            <h3 className="eduDegree">
                              {edu.degree} {", "} {edu.fieldofstudy}
                            </h3>
                            <p>
                              {edu.from
                                .split("")
                                .splice(0, 10)
                                .join("")
                                .toString()
                                .split("-")
                                .join("/")}{" "}
                              -
                              {edu.to === null
                                ? " Current"
                                : edu.to
                                    .split("")
                                    .splice(0, 10)
                                    .join("")
                                    .toString()
                                    .split("-")
                                    .join("/")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <h4>No Education credentials</h4>
                  )}
                </div>
                <div className="skills">
                  <h2 className="skillHeading">Skills</h2>
                  <div className="skillWrap">
                    {profile.skills.map(skill => (
                      <div className="skill" key={skill._id}>
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>}
          </div>

          
        </ProfileWrap>
      );
    }
  }
};

const mapStateToProps = state => ({
  loading: state.profile.loading,
  profile: state.profile.profile,
  error: state.profile.error
});
export default connect(
  mapStateToProps,
  { getProfileById }
)(CurrentProfile);

const ProfileWrap = styled.div`
  background: whitesmoke;
  margin: auto;
  padding: 0 10%;
  padding-top: 15vh;
  padding-bottom: 10vh;
  min-height: 110vh;
  .wrap {
    width: 80%;
    margin: auto;
    background: white;
    padding: 2rem;
    box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.45);
    border-radius: 8px;
    .profileHeader {
      display: flex;
      align-items: center;
      .leftHeader {
        width: 250px;
        height: 250px;
        margin-right: 3rem;
        img {
          height: 100%;
          width: 100%;
          border-radius: 50%;
        }
      }
      .rightHeader {
        .name {
          font-size: 40px;
          color: #ff5200;
          text-transform: capitalize;
          line-height: 2.5rem;
        }
        .company {
          font-size: 20px;
          color: #808080;
        }
        .socialIcons {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          i.fa-twitter {
            color: #38a1f3;
          }
          i.fa-facebook {
            color: #3b5998;
          }
          i.fa-instagram {
            color: #3f729b;
          }
          i.fa-youtube {
            color: #c4302b;
          }
          i.fa-linkedin {
            color: #0077b5;
          }
        }
      }
    }
    .profileMain {
      margin-top: 3rem;
      display: flex;
      .mainLeft {
        min-width: 300px;
        .personalHeading {
          font-size: 20px;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .address,
        .email {
          margin-bottom: 0.5rem;
          .addressHeading,
          .emailHeading {
            font-size: 20px;
            color: #ff5200;
          }
          .addressText,
          .emailText {
            font-size: 1rem;
          }
        }
      }
      .mainRight {
        //   padding-right: 4rem;
        .experience,
        .education,
        .skills {
          margin-bottom: 2rem;
          .experienceHeading,
          .educationHeading,
          .skillheading {
            font-size: 20px;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
          }
          .skillWrap {
            display: flex;
            flex-wrap: wrap;
            margin-top: 0.5rem;
            .skill {
              color: white;
              padding: 0.4rem 0.8rem;
              margin-right: 1rem;
              background: #ff5200;
              border-radius: 5px;
              margin-bottom: 1rem;
              text-transform: capitalize;
              font-weight: 600;
            }
          }

          .exp,
          .edu {
            display: flex;
            margin-bottom: 0.5rem;
            .bullet {
              height: 8px;
              width: 8px;
              background: #ff5200;
              margin-right: 0.5rem;
              border-radius: 50%;
              margin-top: 0.5rem;
            }
            .expDetail,
            .eduDetail {
              .expPosition,
              .eduSchool {
                font-size: 1rem;
                color: #808080;
              }
              .expEmployer,
              .eduDegree {
                font-size: 0.9rem;
                text-transform: uppercase;
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: 1200px) {
    .wrap {
      width: 90%;
      .profileHeader {
        .leftHeader {
          width: 200px;
          height: 200px;
        }
      }
    }
  }

  @media (max-width: 1000px) {
    .wrap {
      width: 100%;
      .profileHeader {
        .leftHeader {
          width: 175px;
          height: 175px;
        }
      }
    }
  }

  @media (max-width: 900px) {
    .wrap {
      .profileHeader {
        .rightHeader {
          .name {
            font-size: 32px;
          }
        }
      }
    }
  }

  @media (max-width: 700px) {
    padding: 0;
    padding-top: 8vh;
    background: white;
    .wrap {
      padding: 0;
      box-shadow: none;
      .profileHeader {
        padding-top: 1rem;
        flex-direction: column;
        width: 100%;
        position: relative;
        background: #ff5200;
        .leftHeader {
          margin-right: 0;
          min-width: 100px;
          min-height: 100px;
          margin-bottom: 1rem;
        }
        .rightHeader {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .profileAbout{
            .company {
            color: white;
            text-align: center;
            margin-bottom: 0.5rem;
          }
          .name {
            text-align: center;
            color: white;
            font-weight: 500;
            font-size: 2rem;
            margin-bottom: 1rem;
          }
          .userBio {
            text-align: center;
            color: white;
          }
          }
          
          .socialIcons {
            margin-top: auto;
            width: 100%;
            padding: 1rem;
            margin: auto;
            margin-top: 2rem;
            // background: white;
            i{
              height: 60px;
              width: 60px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0.5rem;
              border-radius: 50%;
              background: white;
            }
          }
        }
      }
      .profileMain {
        margin-top: 0;
        flex-direction: column;
        .mainLeft {
          border-top: 1px solid rgba(0, 0, 0, 0.2);
          padding: 1rem;
          margin-bottom: 0;
        }
        .mainRight {
          .experience,
          .education,
          .skills {
            padding: 1rem;
            border-top: 1px solid rgba(0, 0, 0, 0.2);
            margin-bottom: 0;
          }
        }
      }
    }
  }
`;
