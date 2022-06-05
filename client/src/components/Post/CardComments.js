import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getComments } from '../../actions/comment.actions';
import { isEmpty, prettyDate } from '../../Utils';

const CardComments = ({ post, comments }) => {
  //hook
  const [text, setText] = useState('');
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken');

  //logique
  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(token, post.id_post, text))
        .then(() => dispatch(getComments(token)))
        .then(() => setText(''));
    }
  };

  //JSX
  return (
    <div className="comments-container">
      {comments.map((comment) => {
        if (comment.comment_parent === post.id_post)
          return (
            <div
              className={
                comment.comment_author === userData.id_user
                  ? 'comment-container client'
                  : 'comment-container'
              }
              key={comment.id_comment}
            >
              <div className="left-part">
                <img
                  src={
                    isEmpty(userData[0]) &&
                    usersData
                      .map((user) => {
                        if (user.id_user === comment.comment_author)
                          return user.user_picture;
                        else return null;
                      })
                      .join('')
                  }
                  alt="user-pic"
                />
              </div>
              <div className="right-part">
                <div className="comment-header">
                  <div className="fullname">
                    <h3>{comment.comment_fullname}</h3>
                  </div>
                  {comment.comment_update === comment.comment_registration && (
                    <span>Publié {prettyDate(comment.comment_update)}</span>
                  )}
                  {comment.comment_update !== comment.comment_registration && (
                    <span>Actualisé {prettyDate(comment.comment_update)}</span>
                  )}
                </div>
                <p>{comment.comment_content}</p>
              </div>
            </div>
          );
        else return null;
      })}
      {/* formulaire pour commenter */}
      {userData.id_user && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Ecrire un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComments;
