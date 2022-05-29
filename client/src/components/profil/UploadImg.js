import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfilPicture, uploadPicture } from '../../actions/user.actions';

const UploadImg = () => {
  //hook
  const userData = useSelector((state) => state.userReducer);
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken');

  //logique

  const handlePicture = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', file);
    dispatch(uploadPicture(data, userData.id_user, token));
  };

  const handleDelete = () => {
    if (userData.user_picture !== './uploads/profil/random-user.png') {
      dispatch(deleteProfilPicture(userData.id_user, token));
    } else {
      return null;
    }
  };

  //JSX
  return (
    <div>
      <h3>Photo de Profil</h3>
      <div className="profil-photo-section">
        <div className="photo-section-left-part">
          <img src={userData.user_picture} alt="pic-profil" />
          <span className="crossPic" onClick={() => handleDelete()}>
            &#10005;
          </span>
        </div>
        <form action="" onSubmit={handlePicture} className="upload-pic">
          <label htmlFor="file">Changer d'image</label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br />
          <input type="submit" value="Enregistrer" />
        </form>
      </div>
    </div>
  );
};

export default UploadImg;
