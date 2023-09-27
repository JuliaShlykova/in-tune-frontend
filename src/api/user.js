import axios from 'axios';
import setHeaders, { setImgHeaders } from './setHeaders';

export const getProfile = async(userId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}/profile`, setHeaders());
    return response.data;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const editProfile = async(profileInfo) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/edit-profile`, profileInfo, setHeaders());
    return response.data.updUser;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const uploadProfileImg = async(img) => {
  try {
    const formData = new FormData();
    formData.append('profileImg', img);
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/update-profile-img`, formData, setImgHeaders());
    return response.data.profileImgUrl;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const deleteProfileImg = async() => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/delete-profile-img`, {}, setHeaders());
    return response.data;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const getFriendsList = async() => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/friends`, setHeaders());
    return response.data.requestedUsers;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const getRequestsList = async() => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/friend-requests`, setHeaders());
    return response.data.requestedUsers;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const getSentRequestsList = async() => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/sent-friend-requests`, setHeaders());
    return response.data.requestedUsers;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const getFriendsSuggestions = async() => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/friend-suggestions`, setHeaders());
    return response.data.requestedUsers;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const addFriend = async(friendId) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/${friendId}/send-friend-request`, {}, setHeaders());
    return response.data;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const acceptFriendRequest = async(friendId) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/${friendId}/accept-friend-request`, {}, setHeaders());
    return response.data;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const getFriendStatus = async(friendId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${friendId}/status`, setHeaders());
    return response.data.status;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}