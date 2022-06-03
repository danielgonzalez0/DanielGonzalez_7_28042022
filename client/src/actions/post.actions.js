import axios from 'axios';

//posts

export const GET_POSTS = 'GET_POSTS';

export const getPosts = (token) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data.result });
      })
      .catch((err) => console.log(err));
  };
};
