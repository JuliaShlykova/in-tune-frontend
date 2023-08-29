import React, { useReducer, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import EditProfileForm from './EditProfileForm';

const Profile = ({userInfo}) => {
  const [showEditForm, toggleShow] = useReducer(showEditForm => !showEditForm, false);
  const curUser = true;

  return (
    <section className='profile'>
    {curUser
    ?(<><button id="btn-avatar" aria-label='download new avatar' title='download new avatar'>
      <img src={userInfo.profileImgUrl?userInfo.profileImgUrl:'/assets/icon.svg'} alt="user avatar" />
      <div>
        <FiUpload />
      </div>
    </button>
    <button id="btn-delete-avatar">delete avatar</button></>)
    :(<div className='profile-avatar'>
      <img src={userInfo.profileImgUrl?userInfo.profileImgUrl:'/assets/icon.svg'} alt="user avatar" />
    </div>)}
    <h1>{userInfo.firstName + ' ' + userInfo.lastName}</h1>
    <section className='profile-info'>
    <button id="btn-edit-profile" onClick={toggleShow}>Edit Profile</button>
      <ul>
        {userInfo.profileInfo?.location?<li><span className="profile-info-title">Location:</span> {userInfo.profileInfo.location}</li>:null}
        {userInfo.profileInfo?.dateOfBirth?<li><span className="profile-info-title">Date of birth:</span> {userInfo.profileInfo.dateOfBirth}</li>:null}
        {userInfo.profileInfo?.occupation?<li><span className="profile-info-title">Occupation:</span> {userInfo.profileInfo.occupation}</li>:null}
        {userInfo.profileInfo?.hobbies?<li><span className="profile-info-title">Hobbies:</span> {userInfo.profileInfo.hobbies}</li>:null}
      </ul>
    </section>
    {showEditForm?<EditProfileForm toggleShow={toggleShow} userInfo={userInfo}/>:null}
  </section>
  )
}

export default Profile