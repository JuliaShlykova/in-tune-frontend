import React, { useReducer } from 'react'

const ButtonAcceptRequest = ({userInfo}) => {
  const [accepted, toggleAccepted] = useReducer(accepted=>!accepted, false);


  const acceptRequest = () => {
    if (!accepted) {
      toggleAccepted();
    }
  }

  return (
    <button onClick={acceptRequest} disabled={accepted}>{accepted?'Accepted':'Accept Request'}</button>
  )
}

export default ButtonAcceptRequest