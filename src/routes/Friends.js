import React, { useEffect, useState } from 'react';
import FriendItem from '../components/FriendItem';
import { getFriendsList, getRequestsList, getSentRequestsList, getFriendsSuggestions } from '../api/user';
import { clearLocal } from '../localStorage';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const Friends = () => {
  const [users, setUsers] = useState([]);
  const [usersStatus, setUsersStatus] = useState('Friends');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getRequestedUsers = async(fn) => {
    setLoading(true);
    try {
      const requestedUsers = await fn();
      setUsers(requestedUsers);
    } catch(err) {
      if(err.response.status===401) {
        clearLocal();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }

  const getFriends = () => {
    if (usersStatus !== 'Friends') {
      setUsersStatus('Friends');
      getRequestedUsers(getFriendsList);
    }
  }

  const getRequests = () => {
    if (usersStatus !== 'Requests') {
      setUsersStatus('Requests');
      getRequestedUsers(getRequestsList);
    }
  }

  const getSentRequests = () => {
    if (usersStatus !== 'Sent Requests') {
      setUsersStatus('Sent Requests');
      getRequestedUsers(getSentRequestsList);
    }
  }

  const getSuggestions = () => {
    if (usersStatus !== 'Suggestions') {
      setUsersStatus('Suggestions');
      getRequestedUsers(getFriendsSuggestions);
    }
  }

  useEffect(() => {
    setLoading(true);
    getFriendsList().then(response => {
      setUsers(response);
    }).catch(err => {
      if(err.response.status===401) {
        clearLocal();
        navigate('/login');
      }
    }).finally(() => {
      setLoading(false);
    })
  }, [navigate]);

  return (
    <>
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
    {loading?<Loading />:null}
    </>
  )
}

export default Friends