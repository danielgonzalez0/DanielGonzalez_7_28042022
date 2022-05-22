import React from 'react';
import Log from '../components/Log';

const Login = () => {
  //hook

  //logique

  //JSX
  return (
    <div className="login-page">
      <div className="login___log-container">
        <Log signin={false} signup={true} />
        <div className="login__img-container">
          <img src="./img/login.jpg" alt="log" />
        </div>
      </div>
    </div>
  );
};

export default Login;
