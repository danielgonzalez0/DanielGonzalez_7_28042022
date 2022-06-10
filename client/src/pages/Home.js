import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import Navbar from '../components/Navbar';
import NewPostForm from '../components/Post/NewPostForm';
import Thread from '../components/Thread';
import Login from './Login';

const Home = () => {
  //hook
  const uid = useContext(UidContext);

  //logique

  //JSX
  return (
    <>
      {uid ? (
        <>
          <Navbar />
          <NewPostForm />
          <Thread />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
};

export default Home;
