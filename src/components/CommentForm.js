import React, { useState } from 'react'

const CommentForm = () => {
  const [commentText, setCommentText] = useState('');

  const sendComment = async() => {
    console.log('comment has been sent');
  }

  return (
    <div className='comment-form' onSubmit={sendComment}>
      <form>
        <label htmlFor="comment-text">Share your opinion: </label>
        <input type="text" id="comment-text" value={commentText} onChange={(e) => {setCommentText(e.target.value)}} required/>
        <button className='btn-create-comment'>Create</button>
      </form>
    </div>
  )
}

export default CommentForm