import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { getUsers } from './actions/users.actions';
import { getLikes } from './actions/like.actions';
import { getPosts } from './actions/post.actions';
import { getComments } from './actions/comment.actions';

//devtools
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const token = localStorage.getItem('accessToken');

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

store.dispatch(getUsers(token));
store.dispatch(getLikes(token));
store.dispatch(getPosts(token));
store.dispatch(getComments(token));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
