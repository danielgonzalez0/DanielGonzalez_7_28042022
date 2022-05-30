import axios from 'axios';
import { handleErrors } from '../Utils';

export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const DELETE_PROFIL_PICTURE = 'DELETE_PROFIL_PICTURE';
export const UPDATE_INFO = 'UPDATE_INFO';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

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

export const updateInfo = (firstname, lastname, job, id, token) => {
  return (dispatch) => {
    return axios
      .put(
        `${process.env.REACT_APP_API_URL}api/user/${id}`,
        {
          firstname,
          lastname,
          job,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        dispatch({
          type: UPDATE_INFO,
          payload: { firstname, lastname, job },
        });
        const success = document.querySelector('.success');
        success.innerHTML = res.data.message;
      })
      .catch((err) => handleErrors(err));
  };
};

export const updatePassword = (oldPassword, password, id, token) => {
  return (dispatch) => {
    return axios
      .put(
        `${process.env.REACT_APP_API_URL}api/user/security/${id}`,
        {
          oldPassword,
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        dispatch({ type: UPDATE_PASSWORD });
        console.log(res);
        const success = document.querySelector('.success');
        success.innerHTML = res.data.message;
      })
      .catch((err) => {
        console.log(err);
        handleErrors(err);
      });
  };
};
