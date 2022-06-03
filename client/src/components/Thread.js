import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import { isEmpty } from '../Utils';
import Card from './Post/Card';

const Thread = () => {
  //hook
  const [loadPost, setLoadPost] = useState(true);
  const token = localStorage.getItem('accessToken');
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  

  //logique

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(token));
      setLoadPost(false);
    }
  }, [token, loadPost, dispatch]);

  //JSX
  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card post={post} key={post.id_post} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;
