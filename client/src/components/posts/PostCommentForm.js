import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const PostCommentForm = (props
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
`