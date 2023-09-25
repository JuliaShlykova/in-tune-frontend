import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem';
import Loading from '../components/Loading';
import { getPublicPosts, getPrivatePosts } from '../api/posts';
import { useNavigate } from 'react-router-dom';
import { clearLocal } from '../localStorage';

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [postsStatus, setPostsStatus] = useState('Public Posts');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    switch(postsStatus) {
      case 'Public Posts':
        getPublicPosts().then(response => {
          setPosts(response);
        }).catch(err => {
          if(err.response.status===401) {
            clearLocal();
            navigate('/login');
          }
        }).finally(() => {
          setLoading(false);
        });
        break;
      case 'Private Posts':
        getPrivatePosts().then(response => {
          setPosts(response);
        }).catch(err => {
          if(err.response.status===401) {
            clearLocal();
            navigate('/login');
          }
        }).finally(() => {
          setLoading(false);
        });
        break;
      default: 
        console.log('invalid postsStatus');
        setLoading(false);
    }
    
  }, [postsStatus, navigate])

  const getPublic = async() => {
    if (postsStatus==='Private Posts') {
      setLoading(true);
      setPostsStatus('Public Posts');
    }
  }

  const getPrivate = async() => {
    if (postsStatus==='Public Posts') {
      setLoading(true);
      setPostsStatus('Private Posts');
    }
  }

  return (
    <div className='posts-route-container'>
        <nav className='side-navigation'>
          <ul>
            <li>
              <button onClick={getPublic}>
                Public
              </button>
            </li>
            <li>
              <button onClick={getPrivate}>
                Private
              </button>
            </li>
          </ul>
        </nav>
        <section className='posts-route-posts'>
         <h1>{postsStatus}</h1>
         {loading
         ?<Loading />
         :<>
          {posts.map((el, i) => {
            return (
              <PostItem key={i} postInfo={el}/>
            )
          })}
          </>}
        </section>
    </div>
  )
}

export default Posts