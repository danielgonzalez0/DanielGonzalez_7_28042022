import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, prettyDate } from '../../Utils';
import { NavLink } from 'react-router-dom';
import { likePost } from '../../actions/like.actions';

const NewPostForm = () => {
  //hook
  const token = localStorage.getItem('accessToken');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);

  //logique
  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handlePost = () => {};

  const cancelPost = () => {
    setMessage('');
    setPostPicture('');
    setFile('');
  };

  //JSX
  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        //strucutre forumulaire
        <>
          <div className="data">
            <div className="user-info">
              <NavLink to="/profil">
                <img src={userData.user_picture} alt="user-pic" />
              </NavLink>
              <div className="fullname">
                <h3>{userData.user_fullname}</h3>
                <p>{userData.user_job}</p>
              </div>
            </div>

            <div className="post-form">
              <textarea
                name="message"
                id="message"
                placeholder="Que voulez-vous partager?"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
              {message || postPicture ? (
                <li className="card-container">
                  <div className="card-left">
                    <img src={userData.user_picture} alt="user-pic" />
                  </div>
                  <div className="card-right">
                    <div className="card-header">
                      <div className="fullname">
                        <h3>{userData.user_fullname}</h3>
                        <p className="job">{userData.user_job}</p>
                      </div>
                    </div>
                    <div className="content">
                      <img src={postPicture} alt="" />
                      <p>{message}</p>
                    </div>
                  </div>
                </li>
              ) : null}
              <div className="footer-form">
                <div className="icon">
                  <img src="./img/icons/camera-full-pink.png" alt="camera" />
                  <span>Image</span>
                  <img
                    src="./img/icons/camera-pink.png"
                    className="img-active"
                    alt="camera"
                  />

                  <input
                    type="file"
                    id="file-upload"
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => handlePicture(e)}
                  />
                </div>
                <div className="btn-send">
                  {message || postPicture ? (
                    <button className="cancel" onClick={cancelPost}>
                      Annuler message
                    </button>
                  ) : null}
                  <button className="send" onClick={handlePost}>
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
