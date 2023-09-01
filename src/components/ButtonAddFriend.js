import React, { useReducer } from 'react'

const ButtonAddFriend = ({userInfo}) => {
  const [added, toggleAdded] = useReducer(added=>!added, false);


  const addFriend = () => {
    if (!added) {
      toggleAdded();
    }
  }

  return (
    <button onClick={addFriend} disabled={added}>{added?'Sent':'Send friend request'}</button>
  )
}

export default ButtonAddFriend