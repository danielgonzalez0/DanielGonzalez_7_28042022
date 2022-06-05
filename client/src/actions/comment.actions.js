import axios from 'axios';

//posts

export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';

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

export const addComment = (token, postId, content) => {
  return (dispatch) => {
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
      data: { content },
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: { content, postId } });
      })
      .catch((err) => console.log(err));
  };
};
