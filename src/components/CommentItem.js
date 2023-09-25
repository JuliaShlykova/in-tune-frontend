import React, { useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BsPersonFill } from 'react-icons/bs';
import decodeEntities from '../utils/decoder';
import { getLocalValue, clearLocal } from '../localStorage';
import { deleteComment, likeComment } from '../api/posts';

const CommentItem = ({commentInfo, updatingComments, postAuthor}) => {
  const [liked, toggleLiked] = useReducer(liked=>!liked, false);
  const [likesCount, setLikesCount] = useState(0);
  const [accessRemove, setAccessRemove] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const curUser = getLocalValue('user');
    if ((postAuthor===curUser)||(commentInfo.author._id===curUser)) {
      setAccessRemove(true);
    }
  }, [postAuthor, commentInfo]);

  useEffect(() => {
    setLikesCount(commentInfo.likes.length)
  }, [commentInfo])

  const like = async() => {
    if (!liked) {
      try {
        const likeCount = await likeComment(commentInfo.post, commentInfo._id);
        setLikesCount(likeCount);
        toggleLiked();
      } catch(err) {
        if(err.response.status===401) {
          clearLocal();
          navigate('/login');
        }
      }
    }
    commentInfo.likes.push('amanda');
  }

  const removeComment = async() => {
    if(accessRemove) {
      try {
        await deleteComment(commentInfo.post, commentInfo._id);
        updatingComments();
      } catch(err) {
        if(err.response.status===401) {
          clearLocal();
          navigate('/login');
        }
      }
    }
  }

  return (
    <>
    <div className='comment-item'>
    {accessRemove?<button className='btn-delete-post' onClick={removeComment}>Delete comment</button>:null}
      <div className='author-time-header'>
        <Link to={'/'+commentInfo.author._id+'/profile'}>
          <div className='post-img-container'>
          {commentInfo.author.profileImgUrl
          ?<img src={commentInfo.author.profileImgUrl} alt="author avatar" />
          :<BsPersonFill color="white" />}
          </div>
          <span>{commentInfo.author.firstName+' '+commentInfo.author.lastName}</span>
        </Link>
        <span className='post-date'>{commentInfo.formatted_timestamp}</span>
      </div>
      <p>{decodeEntities(commentInfo.text)}</p>
      <div className='likes'><span>❤{likesCount}</span></div>
      <button className='comment-btn-like' onClick={like} disabled={liked}>
          {liked?'Liked':'Like!'}
        </button>
    </div>
    </>
  )
}

export default CommentItem