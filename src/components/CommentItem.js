import React, { useReducer } from 'react'
import { Link } from 'react-router-dom';
import { BsPersonFill } from 'react-icons/bs';

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
          <div className='post-img-container'>
          {commentInfo.author.profileImgUrl
          ?<img src={commentInfo.author.profileImgUrl} alt="author avatar" />
          :<BsPersonFill color="white" />}
          </div>
          <span>{commentInfo.author.full_name}</span>
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