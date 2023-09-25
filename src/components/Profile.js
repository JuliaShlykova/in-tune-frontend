import React, { useEffect, useReducer, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import EditProfileForm from './EditProfileForm';
import { BsPersonFill } from 'react-icons/bs';
import { clearLocal, getLocalValue } from '../localStorage';
import { uploadProfileImg, deleteProfileImg, getFriendStatus } from '../api/user';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import compressedImg from '../utils/imageResizer';
import ButtonAddFriend from './ButtonAddFriend';
import ButtonAcceptRequest from './ButtonAcceptRequest'; 

const Profile = ({userInfo, setAvatarUrl, setUserInfo}) => {
  const [showEditForm, toggleShow] = useReducer(showEditForm => !showEditForm, false);
  const [uplProfileImg, setUplProfileImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCurUser, setIsCurUser] = useState(false);

  const [friendStatus, setFriendStatus] = useState('');

  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    if (userId===getLocalValue('user')) {
      setIsCurUser(true);
    } else {
      setIsCurUser(false);
    }
  }, [userId])

  useEffect(() => {
    console.log('status checking');
    if(!(userId===getLocalValue('user'))) {
      getFriendStatus(userId).then(response => {
        console.log(response);
        setFriendStatus(response);
      }).catch(err => {
        if(err.response.status===401) {
          clearLocal();
          navigate('/login');
        }
      })
    }
  }, [navigate, userId]);

  useEffect(() => {
    if (uplProfileImg) {
      setLoading(true);
      uploadProfileImg(uplProfileImg)
        .then(response => {
          setAvatarUrl(response);
        })
        .catch(err => {
          if(err.response.status===401) {
            clearLocal();
            navigate('/login');
          }
        })
        .finally(()=>{
          setLoading(false);
          setUplProfileImg(null);
        })
    }
  }, [uplProfileImg, navigate, setAvatarUrl])

  const compressingImg = async(img) => {
    try {
      const cmprImg = await compressedImg(img);
      setUplProfileImg(cmprImg);
    } catch(err) {
      console.log(err);
    }
  }

  const deleteAvatar = async() => {
    setLoading(true);
    try {
      await deleteProfileImg();
      setAvatarUrl(undefined);
    } catch(err) {
      if(err.response.status===401) {
        clearLocal();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className='profile'>
    {isCurUser
    ?(loading
    ?<Loading />
    :(<>
    <input id="upload-avatar" type="file" onChange={(e)=>{compressingImg(e.target.files[0])}} hidden/>
    <label htmlFor="upload-avatar">
    <div id="btn-avatar" aria-label='download new avatar' title='download new avatar'>
        {userInfo.profileImgUrl
              ?<img src={userInfo.profileImgUrl} alt="user avatar" />
              :<BsPersonFill color="white" />}
          <div>
            <FiUpload />
          </div>
      </div>
      </label>
      {userInfo.profileImgUrl?<button id="btn-delete-avatar" onClick={deleteAvatar}>delete avatar</button>:null}
    </>))
    :(<div className='profile-avatar'>
    {userInfo.profileImgUrl
          ?<img src={userInfo.profileImgUrl} alt="user avatar" />
          :<BsPersonFill color="white" />}
    </div>)}
    <h1>{userInfo.firstName + ' ' + userInfo.lastName}</h1>
    <section className='profile-info'>
    {isCurUser?<button id="btn-edit-profile" onClick={toggleShow}>Edit Profile</button>:null}
      <ul>
        {userInfo.profileInfo?.location?<li><span className="profile-info-title">Location:</span> {userInfo.profileInfo.location}</li>:null}
        {userInfo.profileInfo?.dateOfBirth?<li><span className="profile-info-title">Date of birth:</span> {userInfo.formatted_dateOfBirth}</li>:null}
        {userInfo.profileInfo?.occupation?<li><span className="profile-info-title">Occupation:</span> {userInfo.profileInfo.occupation}</li>:null}
        {userInfo.profileInfo?.hobbies?<li><span className="profile-info-title">Hobbies:</span> {userInfo.profileInfo.hobbies}</li>:null}
      </ul>
    {(!isCurUser&&(friendStatus==='Unknown'))?<ButtonAddFriend userInfo={userInfo} />:null}
    {(!isCurUser&&(friendStatus==='RequestSent'))?<button disabled>Request was sent</button>:null}
    {(!isCurUser&&(friendStatus==='RequestReceived'))?<ButtonAcceptRequest userInfo={userInfo} />:null}
    </section>
    {(showEditForm&&isCurUser)?<EditProfileForm toggleShow={toggleShow} userInfo={userInfo} setUserInfo={setUserInfo} />:null}
  </section>
  )
}

export default Profile