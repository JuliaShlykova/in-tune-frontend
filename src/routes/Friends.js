import React, { useState } from 'react';
import FriendItem from '../components/FriendItem'

const Friends = () => {
  const [users, setUsers] = useState([
    {
      firstName: 'Harry',
      lastName: 'Potter',
      profileImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcMnPuYAnD0_voIsrjsaSxRD5BipL4eex44Q&usqp=CAU',
      _id: '12'
    },
    {
      firstName: 'Ron',
      lastName: 'Weasley',
      profileImgUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      _id: '13'
    },
    {
      firstName: 'Hermione',
      lastName: 'Granger',
      profileImgUrl: 'https://www.koimoi.com/wp-content/new-galleries/2023/04/harry-potters-hermione-granger-intro-scene-done-better-than-emma-watson-makes-potterheads-go-crazy-say-leaked-footage-of-the-cursed-child-see-video-001.jpg',
      _id: '13'
    }
  ]);

  const [usersStatus, setUsersStatus] = useState('Friends');

  const getFriends = async() => {
    if (usersStatus !== 'Friends') {
      setUsersStatus('Friends');
    }
  }

  const getRequests = async() => {
    if (usersStatus !== 'Requests') {
      setUsersStatus('Requests');
    }
  }

  const getSentRequests = async() => {
    if (usersStatus !== 'Sent Requests') {
      setUsersStatus('Sent Requests');
    }
  }

  const getSuggestions = async() => {
    if (usersStatus !== 'Suggestions') {
      setUsersStatus('Suggestions');
    }
  }

  return (
    <div className='friends-route-container'>
      <nav className='side-navigation'>
        <ul>
          <li>
            <button onClick={getFriends}>
              Friends
            </button>
          </li>
          <li>
            <button onClick={getRequests}>
              Requests
            </button>
          </li>
          <li>
            <button onClick={getSentRequests}>
              Sent Requests
            </button>
          </li>
          <li>
            <button onClick={getSuggestions}>
              Suggestions
            </button>
          </li>
        </ul>
      </nav>
      <section className='users'>
        <h1>{usersStatus}</h1>
        <div className="friend-items-container">
          {users.map((el,i) => {
            return (
              <FriendItem key={i} userInfo={el} usersStatus={usersStatus} />
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Friends