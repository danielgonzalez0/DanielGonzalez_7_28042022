import axios from 'axios';

export const GET_USERS = 'GET_USERS';

export const getUsers = (token) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data.result });
      })
      .catch((err) => console.log(err));
  };
};
