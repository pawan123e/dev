import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteProfile } from "../../actions/profile";
import { setAlert } from "../../actions/alert";
import Experience from "./Experience";
import Education from "./Education";
import Spinner from "../layout/Spinner";
import styled from "styled-components";

const Dashboard = ({
  getCurrentProfile,
  auth,
  history,
  profile,
  loading,
  deleteProfile
}) => {
  useEffect(() => {
    document.title = "Dashboard";
    getCurrentProfile();
  }, []);

  const settings = () => {
    window.scrollTo(0, 0);
    history.push('/dashboard/settings')
  }

  useEffect(() => {
    document.body.style.overflow = 'auto'
  }, [])

  if (loading && !auth.user) {
    return <DashboardWrap><Spinner /></DashboardWrap>;
  } else {
    return (
      <DashboardWrap>
        <div className="card">
          <div className="topPart">
            <img src={auth.user.coverPhoto} />
            <div className="profileImg">
              <img
                src={
                  auth.user &&
                  auth.user.avatar
                }
                alt="profilePic"
              />
            </div>
            <div className="settings" onClick = {settings}>
            
              <i className="fas fa-user-cog settingsIcon"></i>
            </div>
          </div>
          <div className="bottomPart">
            <p className="name">{auth.user.name}</p>
            {profile === null ? (
              <div className="noProfile">
                <Link to="/create-profile" className="btn btn-primary my-1">
                  Create Profile
                </Link>
              </div>
            ) : (
              <Link to="/edit-profile" className="editProfile">
                <i className="fas fa-edit"></i> Edit Profile
              </Link>
            )}
          </div>
        </div>
        {profile !== null && (
          <>
            <div className="aboutPart">
              <div className="experiencePart">
                <Experience experience={profile.experience} />
              </div>
              <div className="educationPart">
                <Education education={profile.education} />
              </div>
            </div>
            <div className="my-2 deleteBtn">
              <button
                className="btn btn-danger"
                onClick={() => deleteProfile(history)}
              >
                Delete My Account
              </button>
            </div>
          </>
        )}
      </DashboardWrap>
    );
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile,
  loading: state.profile.loading
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, setAlert, deleteProfile }
)(Dashboard);

const DashboardWrap = styled.div`
    // background: whitesmoke;
    padding: 0 10%;
    padding-top: 15vh;
    // padding-bottom: 10vh;
    min-height: 100vh;
  .card {
    width: 750px;
    box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.45);
    background: white;
    border-radius: 5px;
    .topPart {
      height: 200px;
      width: 100%;
      position: relative;
      img {
        height: 100%;
        width: 100%;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
      }
      .profileImg {
        position: absolute;
        left: 30px;
        bottom: -60px;
        width: 140px;
        height: 140px;
        img {
          border-radius: 50%;
          //border: 5px solid whitesmoke;
        }
      }
      .settings {
        position: absolute;
        right: 40px;
        bottom: -50px;
        cursor: pointer;
        display: flex;
        align-items: center;
        i {
          font-size: 2rem;
        }
      }
    }
    .bottomPart {
      display: flex;
      flex-direction: column;
      margin-top: 70px;
      margin-left: 2rem;
      .name {
        font-size: 1.5rem;
        font-weight: 500;
      }
      .editProfile{
        margin: 1rem 0rem;
        margin-top: 0.5rem;
      }
    }
    }
  .aboutPart {
    width: 750px;
    background: white;
    margin-top: 4rem;
    box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.45);
    .experiencePart {
      padding: 1.5rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    }
    .educationPart {
      padding: 1.5rem 0;
    }
  }

  @media (max-width: 950px) {
    .card {
      width: 100%;
      .bottomPart {
        .noProfile {
          p {
            display: none;
          }
        }
      }
    }
    .aboutPart {
      width: 100%;
    }
  }

  @media (max-width: 500px) {
    padding: 0 0%;
    padding-top: 8vh;
    // padding-bottom: 5vh;
    background: white;
    .deleteBtn{
      margin-bottom: 0.5rem;
    }
    .card {
      border-radius: 0;
      box-shadow: none;
      .topPart {
        height: 150px;
        img{
          border-radius: 0;
        }
        .profileImg {
          width: 100px;
          height: 100px;
          bottom: -40px;
          left: 15px;
        }
        .settings {
          right: 20px;
          bottom: -40px;
          i {
            font-size: 1.5rem;
          }
        }
      }
      .bottomPart{
        margin-top: 50px;
        margin-left: 1rem;
      }
    }
    .aboutPart{
      margin-top: 0rem;
    }
  }
`;
