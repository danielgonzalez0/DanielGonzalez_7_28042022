import {
  DELETE_PROFIL_PICTURE,
  GET_USER,
  UPDATE_INFO,
  UPDATE_PASSWORD,
  UPLOAD_PICTURE,
} from '../actions/user.actions';

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;

    case UPLOAD_PICTURE:
      return {
        ...state,
        user_picture: action.payload,
      };

    case DELETE_PROFIL_PICTURE:
      return {
        ...state,
        user_picture: action.payload,
      };

    case UPDATE_INFO:
      return {
        ...state,
        user_firstname: action.payload.firstname,
        user_lastname: action.payload.lastname,
        user_job: action.payload.job,
        user_fullname: `${action.payload.firstname} ${action.payload.lastname}`,
      };

    case UPDATE_PASSWORD:
      return { ...state };

    default:
      return state;
  }
}
