import axios from 'axios';

//posts

export const GET_COMMENTS = 'GET_COMMENTS';

export const getComments = (token) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/comment-post`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_COMMENTS, payload: res.data.result });
      })
      .catch((err) => console.log(err));
  };
};
