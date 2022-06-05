import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';

const DeleteCard = (props) => {
  //hook
  const token = localStorage.getItem('accessToken');
  const dispatch = useDispatch();

  const deleteQuote = () => {
    dispatch(deletePost(token, props.id));
  };

  //logique

  //JSX

  return (
    <div
      onClick={() => {
        if (window.confirm('Voulez-vous supprimer votre post?')) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/icons/delete.png" alt="corbeille" />
    </div>
  );
};

export default DeleteCard;
