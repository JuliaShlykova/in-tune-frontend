import React, { useReducer } from 'react'
import { Link } from 'react-router-dom'

const CommentItem = ({commentInfo}) => {
  const [liked, toggleLiked] = useReducer(liked=>!liked, false);

  const like = async() => {
    commentInfo.likes.push('amanda');
    toggleLiked();
  }

  return (
    <div className='comment-item'>
      <div className='author-time-header'>
        <Link to='/userId/profile'>
          <span>{commentInfo.author}</span>
        </Link>
        <span className='post-date'>{commentInfo.formatted_timestamp}</span>
      </div>
      <p>{commentInfo.text}</p>
      <div className='likes'><span>❤{commentInfo.likes.length}</span></div>
      <button className='comment-btn-like' onClick={like} disabled={liked}>
          {liked?'Liked':'Like!'}
        </button>
    </div>
  )
}

export default CommentItem