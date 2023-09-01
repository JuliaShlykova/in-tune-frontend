import React, { useState } from 'react'
import PostItem from '../components/PostItem'

const Posts = () => {
  const [posts, setPosts] = useState([
    {
      text: 'Hello',
      private: false,
      author: {
        full_name: 'Mary Jane',
        profileImgUrl: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1826&q=80'
      },
      likes: [],
      formatted_timestamp: 'Oct 14, 1983, 9:30 AM'
    },
    {
      text: 'Hello, again',
      private: false,
      author: {
        full_name: 'Mary Jane',
        profileImgUrl: 'https://plus.unsplash.com/premium_photo-1664203068007-52240d0ca48f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
      },
      likes: [],
      formatted_timestamp: 'Oct 14, 1993, 9:30 AM'
    },
    {
      text: 'Hello, again and again',
      private: false,
      author: {
        full_name: 'Mary Jane',
        profileImgUrl: 'https://plus.unsplash.com/premium_photo-1664203068007-52240d0ca48f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
      },
      likes: [],
      formatted_timestamp: 'Oct 14, 2003, 9:30 AM'
    },
    {
      text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas repellat totam cum odio minus suscipit, explicabo voluptatum porro voluptates inventore, quas quidem nulla voluptatem quia. Nulla expedita amet harum alias!',
      private: false,
      author: {
        full_name: 'Mary Jane',
        profileImgUrl: 'https://plus.unsplash.com/premium_photo-1664203068007-52240d0ca48f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
      },
      likes: [],
      formatted_timestamp: 'Oct 14, 1983, 9:30 AM'
    }
  ])
  const [postsStatus, setPostsStatus] = useState('Public Posts');

  const getPublic = async() => {
    if (postsStatus==='Private Posts') {
      setPostsStatus('Public Posts');
    }
  }

  const getPrivate = async() => {
    if (postsStatus==='Public Posts') {
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
          {posts.map((el, i) => {
            return (
              <PostItem key={i} postInfo={el}/>
            )
          })}
        </section>
    </div>
  )
}

export default Posts