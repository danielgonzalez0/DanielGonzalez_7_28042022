import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes, likePost, unlikePost } from '../../actions/like.actions';
import { isEmpty } from '../../Utils';
import { UidContext } from '../AppContext';

const LikeButton = ({ post }) => {
  //hook
  const [liked, setLiked] = useState(0);
  const [countLike, setCountLike] = useState(0);
  const uid = useContext(UidContext);
  const likeData = useSelector((state) => state.likeReducer);
  const token = localStorage.getItem('accessToken');
  const [loadLike, setLoadLike] = useState(true);
  const dispatch = useDispatch();
  //logique

  const like = () => {
    dispatch(likePost(token, post.id_post));
  };

  const unlike = () => {
    dispatch(unlikePost(token, post.id_post));
  };

  useEffect(() => {
    if (loadLike) {
      dispatch(getLikes(token));
      setLoadLike(false);
    }
  }, [token, loadLike, dispatch]);

  useEffect(() => {
    if (!isEmpty(likeData[0])) {
      setLiked(
        likeData.filter((like) => like.like_key === `${uid}/${post.id_post}`)
          .length
      );
    } else {
      setLiked(0);
    }
  }, [likeData, uid, post.id_post, liked]);

  useEffect(() => {
    if (!isEmpty(likeData[0])) {
      setCountLike(
        likeData.filter((like) => like.like_post === post.id_post).length
      );
    } else {
      setCountLike(0);
    }
  }, [likeData, uid, post.id_post, countLike]);

  //jsx
  return (
    <div className="like-container">
      {liked === 0 && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like"></img>
      )}
      {liked !== 0 && (
        <img
          src="./img/icons/heart-filled.svg"
          onClick={unlike}
          alt="unlike"
        ></img>
      )}
      <span>{countLike}</span>
    </div>
  );
};

export default LikeButton;
