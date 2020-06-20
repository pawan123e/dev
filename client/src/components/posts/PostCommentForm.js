import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import PostCard from './PostCard'
import { connect } from "react-redux";
import getDate from '../../utils/getDate'
// import {
//   post
// } from "../../actions/posts";
const PostCommentForm = ({setShowCommentForm, post, user}
  // {createComment, match, history}
  ) => {

    const [text, setText] = useState('');

    // const onsubmit = e => {
    //   e.preventDefault();
    //   createComment(match.params.id, text)
    //   setText('');
    // }
    
    return (
        <PostForm>
          <header>
          <i className="fas fa-times closeBtn" onClick = {() => setShowCommentForm(false)}></i>
          <i className="fas fa-long-arrow-alt-left back" onClick = {() => setShowCommentForm(false)}></i>
          </header>
          <main>
          {console.log('post from postCommentForm.js',post)}
          <PostCard card = {post} options = {false} getDate = {getDate}/>
          
             <form>
             <div className='reply'>
               <div className='left'>
               <img
            src={require(`../../../../public/img/users/${user.avatar}`)}
          />
               </div>
               <div className='right'>
                  <textarea className='text' placeholder = 'Enter the text'/>
               </div>
             </div>

             </form>
          
        {/* <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form className="form my-1" onSubmit = {onsubmit}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            value={text}
            onChange = {(e) => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit"className="btn btn-dark my-1" value="Submit" />
        </form> */}
        </main>
      </PostForm>
    )
}
const mapStateToProps = state => ({
  post: state.post.post,
  user: state.auth.user,
});

export default connect(
  mapStateToProps
)(PostCommentForm);

const PostForm = styled.div`
//  background: white;
//  height: 500px;
//  width: 50%;
//  margin: auto;
//  margin-top: 3rem;
//  @media (max-width: 700px) { 
//    height: 100%;
//    width: 100%;
//  }
// padding-bottom: 0.5rem;
height: 100%;
header{
  height: 8vh;
  border-bottom: 0.3px solid rgba(0,0,0,0.4);
  display: flex;
  padding: 0 1.5rem;
  align-items: center;
  .closeBtn {
    cursor: pointer;
    transition: all 0.1s ease;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    &:hover{
      background: rgba(142,208,248, 0.5);
    }
  }
  .back{
    display: none;
  }
}
main{
  height: 91%;
  overflow: auto;
.reply{
    // margin-top: 1rem;
    padding: 0.8rem 1rem;
    display: flex;
    width: 100%;
    .left{
      min-width: 50px;
      min-height: 50px;
      max-width: 50px;
      max-height: 50px;
      img{
        height: 100%;
        width: 100%;
        border-radius: 50%;
      }
    }
    .right{
      margin: 0 1rem;
      background: none;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      width: 100%;
      textarea{
        min-height: 200px;
        resize: none;
        width: 100%;
        border: none;
        overflow-wrap: break-word;
        padding: 1rem 0;
        font-size: 1.2rem;
        outline: none;
      }
    }
}
}

@media (max-width: 500px) { 
  width: 100%;
  header{
      .closeBtn{
        display: none;
      }
      .back{
        display: block;
        font-size: 1.4rem;
      }
    }
  }
`