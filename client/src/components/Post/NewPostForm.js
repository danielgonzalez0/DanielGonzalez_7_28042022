import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../Utils';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../actions/post.actions';

const NewPostForm = () => {
  //hook
  const token = localStorage.getItem('accessToken');
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState('');
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  //logique
  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
  }, [userData]);

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handlePost = async () => {
    if (content || postPicture) {
      try {

        if (file) {
        if (file.size > 500000) throw 'Le fichier dépasse 500Ko';
        if (
          file.type !== 'image/jpeg' &&
          file.type !== 'image/png' &&
          file.type !== 'image/jpg'
        )
          throw 'Format compatible: .jpg, .jpeg, .png';
        }
        const data = new FormData();
        data.append('content', content);
        data.append('file', file);
        
        await dispatch(addPost(data, token));
        dispatch(getPosts(token));
        cancelPost();
      } catch (err) {
        setErrorMessage(err);
      }
    } else {
      alert('Veuillez entrer un message');
    }
  };

  const cancelPost = () => {
    setContent('');
    setPostPicture('');
    setFile('');
    setErrorMessage('');
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
                name="content"
                id="content"
                placeholder="Que voulez-vous partager?"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
              {content || postPicture ? (
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
                      <p>{content}</p>
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
                  {content || postPicture ? (
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
            {!isEmpty(errorMessage) && (
              <p className="errorMessage">{errorMessage}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
