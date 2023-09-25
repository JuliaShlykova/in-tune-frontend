import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { BsPersonFill } from 'react-icons/bs';
import { getPostLikes, likePost, getComments, deletePost } from '../api/posts';
import Loading from './Loading';
import LikesList from './LikesList';
import { getLocalValue, clearLocal } from '../localStorage';

const PostItem = ({postInfo, isCurUser, setPosts }) => {
  const [showComments, toggleShow] = useReducer(showComments=>!showComments, false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [showLikeWindow, toggleShowLikes] = useReducer(show=>!show, false);
  const [loading, setLoading] = useState(false);
  const [likesList, setLikesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (postInfo.likes.includes(getLocalValue('user'))) {
      setLiked(true);
    }
  }, [postInfo.likes])

  const updatingComments = async() => {
    setLoading(true);
    try {
      const comments = await getComments(postInfo._id);
      if (comments.length>0) {
        setComments(comments);
      } else {
        setComments([]);
      }
    } catch(err) {
    if(err.response.status===401) {
      clearLocal();
      navigate('/login');
    }
  } finally {
    setLoading(false);
  }
  }

  const toggleComments = () => {
    if(!showComments) {
      updatingComments();
    }
    toggleShow();
  }

  const getLikes = async() => {
    setLoading(true);
    try {
      const likesList = await getPostLikes(postInfo._id);
      toggleShowLikes()
      setLikesList(likesList);
    } catch(err) {
      if(err.response.status===401) {
        clearLocal();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }

  const like = async() => {
    if (!liked) {
    try {
      await likePost(postInfo._id);
      const likesList = await getPostLikes(postInfo._id);
      setLikesList(likesList);
      setLiked(true);
    } catch(err) {
      if(err.response.status===401) {
        clearLocal();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }
  }

  const removePost = async() => {
    if (isCurUser) {
    setLoading(true);
      try {
        const usersPosts = await deletePost(postInfo._id);
        setPosts(usersPosts);
      } catch(err) {
        if(err.response.status===401) {
          clearLocal();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
    <div className='post-item' >
      {isCurUser?<button className='btn-delete-post' onClick={removePost}>Delete this post</button>:null}
      <div className='author-time-header'>
        <Link to={'/'+postInfo.author._id+'/profile'}>
          <div className='post-img-container'>
          {postInfo.author.profileImgUrl
          ?<img src={postInfo.author.profileImgUrl} alt="author avatar" />
          :<BsPersonFill color="white" />
          }
          <img src={postInfo.author.profileImgUrl?postInfo.author.profileImgUrl:'/assets/icon.svg'} alt="author avatar" />
          </div>
          <span>{postInfo.author.firstName+' '+postInfo.author.lastName}</span>
        </Link>
        <span className='post-date'>{postInfo.formatted_timestamp}</span>
      </div>
      <p>{postInfo.text}</p>
      <div className='likes' onClick={getLikes}><span>❤{likesList.length>0?likesList.length:postInfo.likes.length}</span></div>
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
        <CommentForm postId={postInfo._id} updatingComments={updatingComments} />
        {comments.map((el, i) => {
          return (
            <CommentItem key={i} commentInfo={el} updatingComments={updatingComments} postAuthor={postInfo.author._id} />
          )
        } )}
      </div>
      :null}
    </div>
    {showLikeWindow
    ?<LikesList toggleShowLikes={toggleShowLikes} likesList={likesList} />
    :null}
    {loading
    ?<Loading />
    :null}
    </>
  )
}

export default PostItem