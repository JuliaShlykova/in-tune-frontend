import axios from 'axios';
import setHeaders from './setHeaders';

export const getPublicPosts = async() => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/public-posts`, setHeaders());
    return response.data.requestedPosts;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const getPrivatePosts = async() => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/friends-posts`, setHeaders());
    return response.data.requestedPosts;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const getPostLikes = async(postId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${postId}/likes`, setHeaders());
    return response.data.likes;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const likePost = async(postId) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/posts/${postId}/like`, {}, setHeaders());
    return;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const createPost = async(newPost) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts/create`, newPost, setHeaders());
    return response.data.posts;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const getComments = async(postId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments`, setHeaders());
    return response.data.comments;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const createComment = async(postId, comment) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments/create`, comment, setHeaders());
    return response.data.comment;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const likeComment = async(postId, commentId) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${commentId}/like`, {}, setHeaders());
    return response.data.likeCount;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const deletePost = async(postId) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts/${postId}/delete`, {}, setHeaders());
    return response.data.posts;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}

export const deleteComment = async(postId, commentId) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${commentId}/delete`, {}, setHeaders());
    return response.data;
  } catch(err) {
    console.log(err.message);
    throw err;
  }
}