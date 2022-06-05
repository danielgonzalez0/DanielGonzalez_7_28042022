import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../actions/comment.actions';
import { UidContext } from '../AppContext';

const EditDeleteComment = ({ comment }) => {
  //hook
  const token = localStorage.getItem('accessToken');
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState('');
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  //logique

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.comment_author) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.comment_author]);

  const handleEdit = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(editComment(token, comment.id_comment, text));
      setText('');
      setEdit(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(token, comment.id_comment));
  };

  //JSX
  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit-list-pink.png" alt="edit-comment" />
        </span>
      )}
      {/*formulaire modifier commentaire */}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.comment_content}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm('Voulez-vous supprimer le commentaire?')) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/delete.png" alt="supprimer" />
            </span>
          </div>
          <input type="submit" value="Modifier" />
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
