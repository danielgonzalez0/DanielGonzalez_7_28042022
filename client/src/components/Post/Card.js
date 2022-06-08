import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../actions/comment.actions';
import { isEmpty, prettyDate } from '../../Utils';
import LikeButton from './LikeButton';
import { updatePost } from '../../actions/post.actions';
import DeleteCard from './DeleteCard';
import CardComments from './CardComments';

const Card = ({ post }) => {
  //hook
  const [isLoading, setIsLoading] = useState(true);
  const [loadComment, setLoadComment] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const token = localStorage.getItem('accessToken');
  const usersdata = useSelector((state) => state.usersReducer);
  const userdata = useSelector((state) => state.userReducer);
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

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(token, post.id_post, textUpdate));
    }
    setIsUpdated(false);
  };

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

              {post.post_image && (
                <img
                  src={post.post_image}
                  alt="card-pic"
                  className="card-pic"
                />
              )}

              {isUpdated === false && (
                <p className="content">{post.post_content}</p>
              )}
              {isUpdated && (
                <div className="update-post">
                  <textarea
                    defaultValue={post.post_content}
                    onChange={(e) => setTextUpdate(e.target.value)}
                  />
                  <div className="button-container">
                    <button className="btn" onClick={updateItem}>
                      Valider modification
                    </button>
                  </div>
                </div>
              )}
              {(userdata.id_user === post.post_author ||
                userdata.user_admin === 1) && (
                <div className="button-container">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <img src="./img/icons/edit-list.png" alt="edit" />
                  </div>
                  <DeleteCard id={post.id_post} />
                </div>
              )}

              <div className="card-footer">
                <div className="comment-icon">
                  <img
                    src="./img/icons/commentary.png"
                    alt="comment"
                    onClick={() => setShowComments(!showComments)}
                  />
                  <span>
                    {!isEmpty(comments[0]) &&
                      comments.filter(
                        (comment) => comment.comment_parent === post.id_post
                      ).length}
                  </span>
                </div>
                <LikeButton post={post} />
              </div>
              {showComments && <CardComments post={post} comments={comments} />}
            </div>
          </>
        )}
      </li>
    </div>
  );
};

export default Card;
