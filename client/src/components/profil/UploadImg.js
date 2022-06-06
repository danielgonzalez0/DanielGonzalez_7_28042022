import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfilPicture, uploadPicture } from '../../actions/user.actions';

const UploadImg = () => {
  //hook
  const userData = useSelector((state) => state.userReducer);
  const [errorMessage, setErrorMessage] = useState('');
  const [profilPicture, setProfilPicture] = useState(null);
  const [file, setFile] = useState();

  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken');

  //logique

  const showPicture = (e) => {
    setProfilPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handlePicture = (e) => {
    e.preventDefault();

    try {
      if (file.size > 500000) throw 'Le fichier dépasse 500Ko';
      if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/jpg'
      )
        throw 'Format compatible: .jpg, .jpeg, .png';

      const data = new FormData();
      data.append('file', file);
      dispatch(uploadPicture(data, userData.id_user, token));
      setErrorMessage('');
      setProfilPicture('');
    } catch (err) {
      setErrorMessage(err);
    }
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
          {profilPicture ? (
            <img src={profilPicture} alt="pic-profil" />
          ) : (
            <img src={userData.user_picture} alt="pic-profil" />
          )}

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
            onChange={(e) => showPicture(e)}
          />
          <br />
          <input type="submit" value="Valider image" />
        </form>
      </div>
      {}
      <p>{errorMessage}</p>
    </div>
  );
};

export default UploadImg;
