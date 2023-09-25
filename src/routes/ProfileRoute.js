import React, { useEffect, useState } from 'react';
import PostItem from '../components/PostItem';
import Profile from '../components/Profile';
import PostForm from '../components/PostForm';
import {getProfile} from '../api/user';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { clearLocal, getLocalValue } from '../localStorage';

const ProfileRoute = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCurUser, setIsCurUser] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(undefined);

  const navigate = useNavigate();

  const {userId} = useParams();

  useEffect(() => {
    if(getLocalValue('user')===userId) {
      setIsCurUser(true);
    } else {
      setIsCurUser(false);
    }
  }, [userId]);

  useEffect(() => {
    setLoading(true);
    getProfile(userId).then(response => {
      setUserInfo(response.user);
      setPosts(response.posts);
    }).catch(err => {
      if(err.response.status===401) {
        clearLocal();
        navigate('/login');
      }
      navigate('/not-found', {replace: true});
    }).finally(()=> {
      setLoading(false)
    })
  }, [userId, navigate])

  useEffect(() => {
    if (userInfo?.profileImgUrl) {
      setAvatarUrl(userInfo.profileImgUrl);
    } else {
      setAvatarUrl(undefined);
    }
  }, [userInfo]);

  return (
    <>{loading
    ?<Loading />
    :<div className='profile-container'>
      <Profile userInfo={{...userInfo, profileImgUrl: avatarUrl}} isCurUser={isCurUser} setAvatarUrl={setAvatarUrl} setUserInfo={setUserInfo} />
      <section className='profile-posts'>
        {isCurUser?<PostForm setPosts={setPosts} />:null}
        {posts.map((el, i) => {
          return (
            <PostItem key={i} isCurUser={isCurUser} setPosts={setPosts} postInfo={{...el, author: {firstName: userInfo.firstName, lastName: userInfo.lastName, _id: userId, profileImgUrl: avatarUrl}}}/>
          )
        })}
      </section>
    </div>}
    </>

  )
}

export default ProfileRoute