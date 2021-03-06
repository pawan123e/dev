import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import DashBoard from "./Dashboard";
import { connect } from "react-redux";
import styled from "styled-components";
import { updateUser } from "../../actions/auth";
import loader from '../../img/loader/smallLoader.svg'

const DashboardSettings = ({ auth, history, updateUser }) => {
  const [user, setUser] = useState({
    name: auth.user.name,
    email: auth.user.email,
    userPhoto: auth.user.avatar,
    userCover: auth.user.coverPhoto
  });

  const [profilePhoto, setProfilePhoto] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState(false);
  const [clicked, setClicked] = useState(false);

  const userPhotoRef = useRef();
  const userCoverRef = useRef();

  const { name, email, userPhoto, userCover } = user;

  useEffect(() => {
    document.body.style.overflow = "hidden";
  },[])

  useEffect(() => {
    const closeModal = e => {
      const element = document.getElementById('modal')
      const positionInfo = element.getBoundingClientRect();
      const top = positionInfo.top;
      const bottom = positionInfo.bottom;
      const left = positionInfo.left;
      const right = positionInfo.right
      if((e.clientY < top || e.clientY > bottom || e.clientX < left || e.clientX > right ) && e.target.id !== 'fileInput') {
        history.push('/dashboard')
      }
      }
    const modal = document.querySelector('.modal');
    modal.addEventListener("click", closeModal);
    return () => modal.addEventListener("click", closeModal);
  },[window.location.pathname]);

  const onchange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onsubmit = e => {
    e.preventDefault();
    setClicked(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    profilePhoto && formData.append("avatar", userPhoto);
    coverPhoto && formData.append("coverPhoto", userCover);
    updateUser(formData, history);
  };

  const userPhotoUpload = e => {
    setUser({ ...user, userPhoto: e.target.files[0] });
    setProfilePhoto(true);
  };

  const userCoverUpload = e => {
    setUser({ ...user, userCover: e.target.files[0] });
    setCoverPhoto(true);
  };

  return (
    <DashboardWrap>
      <div className="modal">
        <div className="accountModal" id = 'modal'>
          <div className="header">
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <i className="fas fa-arrow-left backButton"></i>
            </Link>
            <h2 className="accountHeading">Account Settings</h2>
          </div>

          <form onSubmit={onsubmit}>
            <div className="topPart">
              <img
                src={
                  auth.user &&
                  auth.user.coverPhoto
                }
                alt="web"
              />
              <div className="profileBgEdit">
                {coverPhoto ? (
                  <i
                    className="fas fa-check-circle"
                    style={{ color: "green" }}
                  ></i>
                ) : (
                  <i
                    className="far fa-edit"
                    onClick={
                      !coverPhoto
                        ? () => userCoverRef.current.click()
                        : undefined
                    }
                  ></i>
                )}
              </div>
              <input
                type="file"
                ref={userCoverRef}
                style={{ display: "none" }}
                accept="image/*"
                id='fileInput'
                onChange={userCoverUpload}
              />
              <div className="profileImg">
                <img
                  src={
                    auth.user && auth.user.avatar
                  }
                  alt="profilePic"
                />
                <div className="profilePicEdit">
                  {profilePhoto ? (
                    <i
                      className="fas fa-check-circle"
                      style={{ color: "green" }}
                    ></i>
                  ) : (
                    <i
                      className="far fa-edit"
                      onClick={
                        !profilePhoto
                          ? () => userPhotoRef.current.click()
                          : undefined
                      }
                    ></i>
                  )}
                </div>
                <input
                  type="file"
                  ref={userPhotoRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  id='fileInput'
                  onChange={userPhotoUpload}
                />
              </div>
            </div>
            <div className="inputList">
              <div className="formInput">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={onchange}
                  required
                  name="name"
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={onchange}
                  required
                  name="email"
                />
              </div>
            </div>
            <div className="btns">
              <input type="submit" disabled = {clicked} className={!clicked ? 'btn-orange btn' : 'btn-gray btn'} value="Save Settings" />
             {clicked &&  <img src = {loader} />}
            </div>
          </form>
        </div>
      </div>

      <div className="dash">
        <DashBoard />
      </div>
    </DashboardWrap>
  );
};
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile,
  loading: state.profile.loading
});

export default connect(
  mapStateToProps,
  { updateUser }
)(DashboardSettings);

const DashboardWrap = styled.div`
  height: 100vh;
  width: 100vw;

  position: relative;
  .dash {
    filter: blur(2px);
  }
  .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    height: 100%;
    .accountModal {
      width: 40%;
      margin: auto;
      height: 90%;
      background: white;
      padding: 1rem;
      overflow: auto;
      border-radius: 8px;
      .header {
        display: flex;
        align-items: center;
        padding-left: 5%;
        .backButton {
          color: #0e9aa7;
          margin-right: 2rem;
          display: none;
        }
        .accountHeading {
          font-size: 2.2rem;
          font-weight: 500;
          color: #0e9aa7;
        }
      }

      .topPart {
        height: 140px;
        width: 90%;
        margin: auto;
        margin-top: 2rem;
        margin-bottom: 3rem;
        position: relative;
        img {
          height: 100%;
          width: 100%;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
        }
        .profileBgEdit {
          position: absolute;
          top: 0%;
          left: 0%;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          i {
            padding: 0.5rem;
            background: white;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.5s ease;
            &:hover {
              background: #a0a0a0;
            }
          }
        }
        .profileImg {
          position: absolute;
          left: 30px;
          bottom: -60px;
          width: 95px;
          height: 95px;
          img {
            border-radius: 50%;
          }
          .profilePicEdit {
            position: absolute;
            top: 0%;
            left: 0%;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            i {
              cursor: pointer;
              padding: 0.5rem;
              background: white;
              border-radius: 50%;
              transition: all 0.5s ease;
              &:hover {
                background: #a0a0a0;
              }
            }
          }
        }
      }
      .inputList {
        width: 90%;
        margin: auto;
        margin-top: 5rem;
        margin-bottom: 2rem;
        .formInput {
          display: flex;
          flex-direction: column;
          margin-bottom: 1rem;
          label {
            font-weight: 600;
          }
          input {
            background: #f0f0f0;
            padding: 0.7rem 0.9rem;
            width: 100%;
            border: none;
            outline: none;
            font-size: 1rem;
            border-radius: 5px;
          }
        }
      }
      .btns {
        margin-left: 5%;
        display: flex;
        align-items: center;
        img {
          height: 30px;
          width: auto;
        }
        .btn {
          border: none;
          padding: 0.7rem 2rem;
          border-radius: 5px;
          color: white;
          cursor: default;
        }
        .btn-orange {
          background: #ff5200; 
          cursor: pointer;
        }
        .btn-gray {
          background: #494e54;
          cursor: default;
          &:hover{
            background: #494e54;
            opacity: 1;
          }
        }
      }
    }
  }

  @media (max-width: 1200px) {
    .modal {
      .accountModal {
        width: 50%;
      }
    }
  }

  @media (max-width: 850px) {
    .modal {
      .accountModal {
        width: 60%;
      }
    }
  }

  @media (max-width: 700px) {
    .modal {
      .accountModal {
        width: 80%;
      }
    }
  }

  @media (max-width: 500px) {
    // height: auto;
    .modal {
      .accountModal {
        width: 100%;
        height: 100%;
        border-radius: 0;
        padding-top: 2rem;
        .header {
          .backButton {
            display: block;
            font-size: 1srem;
          }
          .accountHeading {
            font-size: 1.5rem;
          }
        }
      }
    }
  }
`;
