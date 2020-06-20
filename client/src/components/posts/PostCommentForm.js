import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const PostCommentForm = ({setShowCommentForm}
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
          <i className="fas fa-long-arrow-alt-left back"></i>
          </header>
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
      </PostForm>
    )
}

export default PostCommentForm

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
header{
  height: 8vh;
  border-bottom: 0.3px solid rgba(0,0,0,0.4);
  display: flex;
  padding: 0 1.5rem;
  align-items: center;
  .closeBtn{
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
`