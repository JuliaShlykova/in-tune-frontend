import React, { useReducer, useState } from 'react';
import { createPost } from '../api/posts';
import { clearLocal } from '../localStorage';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const PostForm = ({setPosts}) => {
  const [text, setText] = useState('');
  const [privatePost, togglePrivate] = useReducer(privatePost=>!privatePost, false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitForm = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const usersPosts = await createPost({text, private: privatePost});
      setText('');
      setPosts(usersPosts);
    } catch(err) {
      if(err.response.status===401) {
        clearLocal();
        navigate('/login');
      }
      if(err.response.status===422) {
        setErrors(err.response.data['errors']);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
  <>
  {loading
  ?<Loading />
  : <div className='post-item'>
      <h2>Create Post</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="post-text">Post text: </label>
        <textarea id="post-text" value={text} onChange={(e) => {setText(e.target.value)}} required></textarea>
        <label htmlFor="private-post"> Private: <input type="checkbox" checked={privatePost} onChange={() => {togglePrivate()}} title='only your friends will see' /></label>
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
        <div className='buttons-set'>
          <button type='reset' onClick={() => {setText(''); if(privatePost){togglePrivate()}}}>Clear</button>
          <button type='submit'>Create</button>
        </div>
      </form>
    </div>
  }
  </>
  )
}

export default PostForm