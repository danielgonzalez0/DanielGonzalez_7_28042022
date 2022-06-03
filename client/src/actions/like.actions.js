import axios from 'axios';

export const GET_LIKES = 'GET_LIKES';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';

export const getLikes = (token) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/like-post`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_LIKES, payload: res.data.result });
      })
      .catch((err) => console.log(err));
  };
};

export const likePost = (token, postId) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/like-post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/post/like-post`, {
            headers: { Authorization: `Bearer ${token}` },
          })

          .then((res) =>
            dispatch({ type: LIKE_POST, payload: res.data.result })
          );
      })
      .catch((err) => console.log(err));
  };
};


export const unlikePost = (token, postId) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/unlike-post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/post/like-post`, {
            headers: { Authorization: `Bearer ${token}` },
          })

          .then((res) =>
            dispatch({ type: UNLIKE_POST, payload: res.data.result })
          );
      })
      .catch((err) => console.log(err));
  };
};

