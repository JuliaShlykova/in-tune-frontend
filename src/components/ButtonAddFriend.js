import React, { useReducer } from 'react';
import { addFriend } from '../api/user';

const ButtonAddFriend = ({userInfo}) => {
  const [added, toggleAdded] = useReducer(added=>!added, false);


  const addUserAsFriend = () => {
    if (!added) {
      addFriend(userInfo._id);
      toggleAdded();
    }
  }

  return (
    <button onClick={addUserAsFriend} disabled={added}>{added?'Sent':'Send friend request'}</button>
  )
}

export default ButtonAddFriend