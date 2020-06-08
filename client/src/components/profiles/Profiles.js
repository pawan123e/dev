import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Profiles = ({ profile }) => {
  return (
    <ProfileWrap>
      <div className="profile">
        <div className="headerPart">
          <img
            className="round-img"
            src="fdfdsf"
            alt=""
            src={profile.user.avatar}
          />
          <div className="userDetail">
            <h2 className="userName">{profile.user.name}</h2>
            <p className="userCompany">{profile.company}</p>
            <p className="userLocation">{profile.location}</p>
          </div>
        </div>
        <div className="footerPart">
          <div className="connect">
            <Link
              to={`/profiles/${profile.user._id}`}
              className="btn btn-primary"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </ProfileWrap>
  );
};

export default Profiles;

const ProfileWrap = styled.div`
  background: white;
  border-radius: 6px;
  box-shadow: 7px 6px 27px -5px rgba(34, 34, 34, 1);
  height: 360px;
  .profile {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .headerPart {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 70%;
      img {
        width: 150px;
        height: 150px;
      }
      .userDetail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .userName {
          font-weight: 500;
          text-align: center;
        }
        .userCompany {
          text-align: center;
          text-transform: uppercase;
          color: gray;
        }
        .userLocation {
          text-align: center;
        }
      }
    }
    .footerPart {
      padding-bottom: 1rem;
      height: 30%;
      .connect {
        height: 100%;
        margin-top: 2rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
