import React from 'react';
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';

const UserBook = () => {
  //hook
  const usersData = useSelector((state) => state.usersReducer);

  //logique

  //JSX
  return (
    <div className="book-container">
      <ul>
        {!isEmpty(usersData[0]) &&
          usersData.map((user) => {
            return (
              <li key={user.id_user}>
                <div className="book__card-container">
                  <div className="picture-container">
                    <img src={user.user_picture} alt="profil" />
                  </div>
                  <div className="info-container">
                    <h2>{user.user_fullname}</h2>
                    <p>{user.user_job}</p>
                    <p className="p-hide">
                      Membre depuis le : {dateParser(user.user_registration)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default UserBook;
