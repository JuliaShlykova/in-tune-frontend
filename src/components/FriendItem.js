import React from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ButtonAcceptRequest from '../components/ButtonAcceptRequest';
import ButtonAddFriend from '../components/ButtonAddFriend';

const FriendItem = ({userInfo, usersStatus}) => {



  const renderSwitch = (param) => {
    switch(param) {
      case 'Requests':
        return <ButtonAcceptRequest userInfo={userInfo} />;
      case 'Sent Requests':
        return <button disabled>Request was sent</button>
      case 'Suggestions':
        return <ButtonAddFriend userInfo={userInfo} />
      default:
        return null;
    }
  }

  return (
    <div className='friend-item'>
      <Link to={'/'+userInfo._id+'/profile'}>
        <div className='friend-avatar-container'>
          {userInfo.profileImgUrl
          ?<img src={userInfo.profileImgUrl} alt="user avatar" />
          :<BsPersonFill color="white" />}
        </div>
        <p>{userInfo.firstName} {userInfo.lastName}</p>
      </Link>
      {renderSwitch(usersStatus)}
    </div>
  )
}

export default FriendItem