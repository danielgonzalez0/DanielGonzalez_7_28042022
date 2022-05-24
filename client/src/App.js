import React, { useEffect, useState } from 'react';
import { UidContext } from './components/AppContext';
import Routes from './components/Routes';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';

const App = () => {
  //hook
  const [uid, setUid] = useState(null);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  //logique
  useEffect(() => {
    const fetchToken = async () => {
      const localToken = localStorage.getItem('accessToken');
      setToken(localToken);
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
        data: {
          token: localStorage.getItem('accessToken'),
        },
      }) //end axios
        .then((res) => setUid(res.data)) //end then
        .catch((err) => console.log('pas de token')); //end catch
    };
    fetchToken();

    if (uid && token) {
      dispatch(getUser(uid, token));
    }
  }, [uid, token, dispatch]);
  //JSX

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
