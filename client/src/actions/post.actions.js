import axios from 'axios';

//posts

export const GET_POSTS = 'GET_POSTS';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_POST = 'ADD_POST';

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

export const updatePost = (token, postId, content) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { content },
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { content, postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (token, postId) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data, token) => {
  return (dispatch) => {
    console.log(data);
    return axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/post`,
      data: data,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
};
