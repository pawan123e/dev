import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteComment, setPostModel } from "../../actions/posts";
import styled, { css } from "styled-components";
import getDate from "../../utils/getDate";
import PostCommentForm from "./PostCommentForm";
import PostCard from './postCard';

const Comments = ({
  comment,
  deleteComment,
  postId,
  mainUser,
  postModel,
  setPostModel,
  modelId
}) => {
  const [modelPosition, setModelPosition] = useState(false);
 

  const showPostModel = (e, id) => {
    var topPos = e.target.getBoundingClientRect().top;
    console.log("not postMOdel", !postModel);
    setPostModel(!postModel, id);
    if (topPos < 300) {
      setModelPosition(true);
    } else {
      setModelPosition(false);
    }
    console.log("position of threeDots", topPos);
  };

  return (
    <PostCard  
    modelPosition={modelPosition}
    card={comment}
    user={mainUser}
    showPostModel={showPostModel}
    postModel={postModel}
    modelId={modelId}
    deleteItem={deleteComment}
    getDate={getDate}
    postId = {postId}
    badges = {false}/>
    // <CommentWrap modelPosition={modelPosition}>
    //   <div className="mainComment">
    //     <Link to={`/profiles/${user._id}`} className="leftPortion">
    //       <img src={require(`../../../../public/img/users/${user.avatar}`)} />
    //     </Link>
    //     <div className="rightPortion">
    //       <div className="upper">
    //         <Link to={`/profiles/${user._id}`} className="userName">
    //           {user.name}
    //         </Link>
    //         <p className="date">{getDate(date)}</p>
    //         {mainUser._id === user._id && (
    //           <div className="options" onClick={e => showPostModel(e, _id)}>
    //             <div className="dot"></div>
    //             <div className="dot"></div>
    //             <div className="dot"></div>
    //             {postModel && modelId === _id && (
    //               <div className="model">
    //                 <p
    //                   className="postDelete"
    //                   onClick={() => deleteComment(postId, _id)}
    //                 >
    //                   Delete
    //                 </p>
    //               </div>
    //             )}
    //           </div>
    //         )}
    //       </div>
    //       <p className="text">{text}</p>
    //     </div>
    //   </div>
    // </CommentWrap>
  );
};

const mapStateToProps = state => ({
  postModel: state.post.postModel,
  modelId: state.post.postModelId
});

export default connect(
  mapStateToProps,
  { deleteComment, setPostModel }
)(Comments);

// const CommentWrap = styled.div`
//   .mainComment {
//     padding: 0.8rem 1.5rem;
//     display: flex;
//     border-top: 1px solid rgb(230, 236, 240);
//     transition: 0.3s ease;
//     text-decoration: none;
//     color: black;
//     width: 100%;
//     height: 100%;
//     -webkit-tap-highlight-color: transparent;

//     .leftPortion {
//       text-decoration: none;
//       min-height: 50px;
//       min-width: 50px;
//       max-width: 50px;
//       max-height: 50px;
//       img {
//         heigth: 100%;
//         width: 100%;
//         border-radius: 50%;
//       }
//     }
//     .rightPortion {
//       margin-left: 1rem;
//       position: relative;
//       width: 100%;
//       .text {
//         padding-right: 1rem;
//       }
//       .upper {
//         display: flex;
//         width: 100%;
//         .userName {
//           text-decoration: none;
//           font-size: 1rem;
//           font-weight: 600;
//           color: black;
//           margin-right: 1rem;
//         }
//         .date {
//           color: #808080;
//         }
//         .options {
//           align-self: flex-start;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           flex-direction: column;
//           margin-left: auto;
//           margin-top: 0.54rem;
//           padding: 0 0.5rem;
//           position: relative;
//           cursor: pointer;
//           .model {
//             position: absolute;
//             border: 0.3px solid rgba(230, 230, 230, 0.8);
//             top: -40px;
//             right: 0;
//             ${props =>
//               props.modelPosition &&
//               css`
//                 top: 0;
//                 right: 0;
//               `}
//             width: 120px;
//             background: white;
//             box-shadow: 2px 2px 15px 0px rgba(0, 0, 0, 0.3);
//             border-radius: 8px;
//             z-index: 3;
//             p {
//               padding: 0.5rem 1rem;
//               &:hover {
//                 background: rgba(240, 240, 240, 0.5);
//                 border-radius: 8px;
//               }
//             }
//           }
//           .dot {
//             height: 4px;
//             width: 4px;
//             border-radius: 50%;
//             background: #808080;
//             margin-bottom: 0.2rem;
//           }
//         }
//       }
//     }
//   }

//   @media (max-width: 700px) {
//     .main {
//       &:hover {
//         background: none;
//       }
//     }
//   }
// `;
