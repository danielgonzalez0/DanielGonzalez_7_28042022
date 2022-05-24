import axios from 'axios';

export const GET_USER = 'GET_USER';

export const getUser = (uid, token) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data.result[0] });
      })
      .catch((err) => console.log(err));
  };
};
