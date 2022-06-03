import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../actions/comment.actions';
import { isEmpty, prettyDate } from '../../Utils';
import LikeButton from './LikeButton';

const Card = ({ post }) => {
  //hook
  const [isLoading, setIsLoading] = useState(true);
  const [loadComment, setLoadComment] = useState(true);
  const token = localStorage.getItem('accessToken');
  const usersdata = useSelector((state) => state.usersReducer);
 // const userdata = useSelector((state) => state.userReducer);
  const comments = useSelector((state) => state.commentReducer);
  const dispatch = useDispatch();

  //logique

  useEffect(() => {
    if (loadComment) {
      dispatch(getComments(token));
      setLoadComment(false);
    }
  }, [token, loadComment, dispatch]);

  useEffect(() => {
    !isEmpty(usersdata[0]) && setIsLoading(false);
  }, [usersdata]);

  //JSX
  return (
    <div>
      <li className="card-container" key={post.id_post}>
        {isLoading ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          // structure card
          <>
            {/* partie de gauche */}
            <div className="card-left">
              <img
                src={
                  !isEmpty(usersdata[0]) &&
                  usersdata
                    .map((user) => {
                      if (user.id_user === post.post_author)
                        return user.user_picture;
                      else return null;
                    })
                    .join('')
                }
                alt="author-pic"
              />
            </div>
            {/* partie de droite */}
            <div className="card-right">
              <div className="card-header">
                <div className="fullname">
                  <h3>
                    {!isEmpty(usersdata[0]) &&
                      usersdata
                        .map((user) => {
                          if (user.id_user === post.post_author)
                            return user.user_fullname;
                          else return null;
                        })
                        .join('')}
                  </h3>
                  <p>
                    {!isEmpty(usersdata[0]) &&
                      usersdata
                        .map((user) => {
                          if (user.id_user === post.post_author)
                            return user.user_job;
                          else return null;
                        })
                        .join('')}
                  </p>
                </div>
                {post.post_update === post.post_registration && (
                  <span>Publié {prettyDate(post.post_update)}</span>
                )}
                {post.post_update !== post.post_registration && (
                  <span>Actualisé {prettyDate(post.post_update)}</span>
                )}
              </div>
              <p>{post.post_content}</p>
              {post.post_image && (
                <img
                  src={post.post_image}
                  alt="card-pic"
                  className="card-pic"
                />
              )}
              <div className="card-footer">
                <div className="comment-icon">
                  <img src="./img/icons/message1.svg" alt="comment" />
                  <span>
                    {!isEmpty(comments[0]) &&
                      comments.filter(
                        (comment) => comment.comment_parent === post.id_post
                      ).length}
                  </span>
                </div>
                <LikeButton post={post} />
              </div>
            </div>
          </>
        )}
      </li>
    </div>
  );
};

export default Card;
