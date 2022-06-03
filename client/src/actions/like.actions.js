import axios from 'axios';

export const GET_LIKES = 'GET_LIKES';

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
