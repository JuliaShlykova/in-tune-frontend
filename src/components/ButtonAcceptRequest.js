import React, { useReducer } from 'react';
import { acceptFriendRequest } from '../api/user';

const ButtonAcceptRequest = ({userInfo}) => {
  const [accepted, toggleAccepted] = useReducer(accepted=>!accepted, false);


  const acceptRequest = () => {
    if (!accepted) {
      acceptFriendRequest(userInfo._id);
      toggleAccepted();
    }
  }

  return (
    <button onClick={acceptRequest} disabled={accepted}>{accepted?'Accepted':'Accept Request'}</button>
  )
}

export default ButtonAcceptRequest