import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes } from '../../actions/like.actions';
import { isEmpty } from '../../Utils';
import { UidContext } from '../AppContext';

const LikeButton = ({ post }) => {
  //hook
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const likeData = useSelector((state) => state.likeReducer);
  const token = localStorage.getItem('accessToken');
  const [loadLike, setLoadLike] = useState(true);
  const dispatch = useDispatch();
  //logique

  useEffect(() => {
    if (loadLike) {
      dispatch(getLikes(token));
      setLoadLike(false);
    }
  }, [token, loadLike, dispatch]);


  useEffect(() => {
    if (!isEmpty(likeData[0]))
      likeData.map((like) => {
        if (like.like_post === post.id_post && like.like_user === uid)
          return setLiked(true);
        else return setLiked(false);
      });
  }, [likeData, uid, post.id_post]);

  //jsx
  return (
    <div className="like-container">
      {liked === false && <img src="./img/icons/heart.svg" alt="like"></img>}
      {liked && <img src="./img/icons/heart-filled.svg" alt="unlike"></img>}
      <span>
        {!isEmpty(likeData[0]) &&
          likeData.filter((like) => like.like_post === post.id_post)
            .length}
      </span>
    </div>
  );
};

export default LikeButton;
