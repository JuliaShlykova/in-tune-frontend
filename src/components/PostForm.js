import React, { useEffect, useReducer, useState } from 'react'

const PostForm = () => {
  const [text, setText] = useState('');
  const [privatePost, togglePrivate] = useReducer(privatePost=>!privatePost, false);

  const submitForm = async() => {

  }

  useEffect(() => {
    console.log('private post: ', privatePost);
  }, [privatePost])

  return (
    <div className='post-item'>
      <h2>Create Post</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="post-text">Post text: </label>
        <textarea id="post-text" value={text} onChange={(e) => {setText(e.target.value)}} required></textarea>
        <label htmlFor="private-post"> Private: <input type="checkbox" checked={privatePost} onChange={() => {togglePrivate()}} title='only your friends will see' /></label>
        <div className='buttons-set'>
          <button type='reset' onClick={() => {setText(''); if(privatePost){togglePrivate()}}}>Clear</button>
          <button type='submit'>Create</button>
        </div>
      </form>
    </div>
  )
}

export default PostForm