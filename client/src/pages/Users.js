import React from 'react';
import Navbar from '../components/Navbar';
import UserBook from '../components/UserBook';

const Users = () => {
  return (
    <>
      <Navbar />
      <div className="users-page">
        <h1>Annuaire Utilisateurs</h1>
        <UserBook />
      </div>
    </>
  );
};

export default Users;
