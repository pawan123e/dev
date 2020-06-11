import React, { useEffect } from "react";
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

  if (loading && !auth.user) {
    return <Spinner />;
  } else {
    return (
      <DashboardWrap>
        {console.log(auth)}
        <div className="card">
          <div className="topPart">
            <img src={require("../../img/web.jpg")} alt="web" />
            <div className="profileImg">
              <img src={auth.user.avatar} alt="profilePic" />
            </div>
          </div>
          <div className="bottomPart">
            <p className="name">{auth.user.name}</p>
            {profile === null ? (
              <div className="noProfile">
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                  Create Profile
                </Link>
              </div>
            ) : (
                <Link to="/edit-profile" className='editProfile'> 
                <i className="fas fa-edit"></i> Edit Profile
             
                </Link>
            )}
          </div>
        </div>
        {profile !== null && (
          <>
            <div className='aboutPart'>
            <div className='experiencePart'>
            <Experience experience={profile.experience} />
            </div>
            <div className='educationPart'>
            <Education education={profile.education} />
            </div>
            </div>
            <div className="my-2">
              <button
                className="btn btn-danger"
                onClick={() => deleteProfile(history)}
              >
                <i className="fas fa-user-minus"></i>
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
  background: whitesmoke;
  padding: 0 10%;
  padding-top: 15vh;
  padding-bottom: 10vh;
  min-height: 100vh;
  .card {
    width: 750px;
    height: 350px;
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
        }
      }
    }
    .bottomPart {
        
      display: flex;
      justify-content: space-between;
      .name {
        margin-top: 70px;
        font-size: 1.5rem;
        font-weight: 500;
        margin-left: 2rem;
      }
      .noProfile{
          margin-top: 2rem;
          margin-right: 1rem;
      }
      .editProfile{
          margin-top: 70px;
          margin-right: 3rem;
      }
    }
  }
  .aboutPart{
      width: 750px;
      background: white;
      margin-top: 4rem;
      .experiencePart{
          padding: 1.5rem;
          border-bottom: 1px solid rgba(0,0,0,.15);
      }
      .educationPart{
        padding: 1.5rem ;
    }
  }

  @media(max-width: 950px) {
      .card{
          width: 100%;
          .bottomPart{
              .noProfile{
                  p{
                      display: none;
                  }
              }
          }
      }
      .aboutPart{
          width: 100%;
      }
  }

  @media(max-width: 700px) {
      padding-top: 24vh;
  }
  @media(max-width: 500px) {
    padding: 0 5%;
    padding-top: 22vh;
    padding-bottom: 10vh;
    .card{
        height: 300px;
        .topPart{
            height: 55%;
            .profileImg{
                width: 100px;
                height: 100px;
                bottom: -40px;
                left: 15px;
            }
        }
        .bottomPart{
            .name{
                margin-left: 1rem;
                margin-top: 60px;
                min-width: 100px;
                text-align: center;
            }
            .noProfile{
                margin-right: .5rem;
                margin-top: 0rem;
            }
            .editProfile{
                margin-top: 0.5rem;
                margin-right: 1rem;
            }
        }
    }
}
`;
