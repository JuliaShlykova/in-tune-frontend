import React, { useState } from 'react';
import PostItem from '../components/PostItem';
import Profile from '../components/Profile';
import PostForm from '../components/PostForm';

const ProfileRoute = () => {
  

  const [userInfo, setUserInfo] = useState({
    email: 'test',
    firstName: 'Jane',
    lastName: 'Doe',
    profileImgUrl: 'https://plus.unsplash.com/premium_photo-1664203068007-52240d0ca48f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    profileInfo: {
      location: 'New York',
      dateOfBirth: '1980-12-31',
      occupation: 'cook',
      hobbies: 'books, dogs, walking'
    }
  })

  const [posts, setPosts] = useState([
    {
      text: 'Hello',
      private: false,
      author: {
        full_name: 'Mary Jane',
        profileImgUrl: 'https://plus.unsplash.com/premium_photo-1664203068007-52240d0ca48f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
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

  return (
    <div className='profile-container'>
      <Profile userInfo={userInfo} />
      <section className='profile-posts'>
        <PostForm />
        {posts.map((el, i) => {
          return (
            <PostItem key={i} postInfo={el}/>
          )
        })}
      </section>
    </div>
  )
}

export default ProfileRoute