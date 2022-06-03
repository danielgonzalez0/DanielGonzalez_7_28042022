import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import errorReducer from './error.reducer';
import usersReducer from './users.reducer';
import likeReducer from './like.reducer';
import postReducer from './post.reducer';
import commentReducer from './comment.reducer';

export default combineReducers({
  userReducer,
  errorReducer,
  usersReducer,
  likeReducer,
  postReducer,
  commentReducer,
});
