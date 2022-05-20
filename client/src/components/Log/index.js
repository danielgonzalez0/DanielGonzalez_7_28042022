import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = () => {
  //hook
const [signUpModal,seSignUpModal] = useState(true);
const [signInModal, seSignInModal] = useState(false);
  //logique

  //JSX
  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li>S'inscrire</li>
          <li>Se Connecter</li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
