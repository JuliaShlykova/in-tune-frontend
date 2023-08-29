import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import CommentItem from '../components/CommentItem';
import CommentForm from '../components/CommentForm';

const PostItem = ({postInfo}) => {
  const [showComments, toggleShow] = useReducer(showComments=>!showComments, false);
  const [liked, toggleLiked] = useReducer(liked=>!liked, false);
  const [comments, setComments] = useState([{
    text: 'cool comment!',
    post: 1,
    author: 'Mary Jane',
    likes: [],
    formatted_timestamp: 'Oct 14, 2003, 9:35 AM'
  }, {
    text: 'cool comment!',
    post: 1,
    author: 'Mary Jane',
    likes: [],
    formatted_timestamp: 'Oct 14, 2003, 9:35 AM'
  }])

  const toggleComments = async() => {
    if(!toggleShow) {
      const postid = postInfo;
    }
    toggleShow();
  }

  const like = async() => {
    toggleLiked();
  }

  return (
    <div className='post-item' >
      <div className='author-time-header'>
        <Link to='/userId/profile'>
          <span>{postInfo.author}</span>
        </Link>
        <span className='post-date'>{postInfo.formatted_timestamp}</span>
      </div>
      <p>{postInfo.text}</p>
      <div className='likes'><span>❤{postInfo.likes.length}</span></div>
      <div className='post-buttons-set'>
        <button className='btn-like' onClick={like} disabled={liked}>
          {liked?'Liked':'Like!'}
        </button>
        <button className='btn-comments' onClick={toggleComments} >
          Comments
        </button>
      </div>
      {showComments
      ?<div className='comments'>
        <CommentForm />
        {comments.map((el, i) => {
          return (
            <CommentItem key={i} commentInfo={el} />
          )
        } )}
      </div>
      :null}
    </div>
  )
}

export default PostItem