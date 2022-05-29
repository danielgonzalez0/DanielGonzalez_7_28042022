import axios from 'axios';

export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const DELETE_PROFIL_PICTURE = 'DELETE_PROFIL_PICTURE';

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

export const uploadPicture = (data, id, token) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            dispatch({
              type: UPLOAD_PICTURE,
              payload: res.data.result[0].user_picture,
            });
          });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteProfilPicture = (id, token) => {
  return (dispatch) => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}api/user/profil/pic/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            dispatch({
              type: DELETE_PROFIL_PICTURE,
              payload: res.data.result[0].user_picture,
            });
          });
      })
      .catch((err) => console.log(err));
  };
};
