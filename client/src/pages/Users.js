import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import UserBook from '../components/UserBook';
import Login from './Login';
import { UidContext } from '../components/AppContext';

const Users = () => {
  const uid = useContext(UidContext);
  return (
    <>
      {uid ? (
        <>
          <Navbar />
          <div className="users-page">
            <h1>Annuaire Utilisateurs</h1>
            <UserBook />
          </div>
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
};

export default Users;
