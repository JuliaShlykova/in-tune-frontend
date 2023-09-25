import React, { useState } from 'react';
import { clearLocal } from '../localStorage';
import { useNavigate } from 'react-router-dom';
import { createComment } from '../api/posts';


const CommentForm = ({postId, updatingComments}) => {
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);


  const sendComment = async(e) => {
    e.preventDefault();
    try {
      await createComment(postId, {
        text: commentText
      })
      setCommentText('');
      updatingComments();
    } catch(err) {
      if(err.response.status===401) {
        clearLocal();
        navigate('/login');
      }
      if(err.response.status===422) {
        setErrors(err.response.data['errors']);
      }
    }
  }

  return (
    <div className='comment-form' onSubmit={sendComment}>
      <form>
        <label htmlFor="comment-text">Share your opinion: </label>
        <input type="text" id="comment-text" placeholder='comment...' value={commentText} onChange={(e) => {setCommentText(e.target.value)}} required/>
        {errors.length
          ?<div className="errors">
            {errors.map((err, i) => {
              return (
                <p key={i}>{err.msg}</p>
              )
            })}
          </div>
          :null
        }
        <button className='btn-create-comment'>Create</button>
      </form>
    </div>
  )
}

export default CommentForm