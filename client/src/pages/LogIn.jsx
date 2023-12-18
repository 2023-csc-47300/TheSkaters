import React from 'react';
import '../styles/LogIn.css';
import UserAPI from '../services/UserAPI';
import LocalLogIn from '../components/LocalLogIn';

const LogIn = () => {
  const handleGitHubLogin = async () => {
    try {
      const response = await UserAPI.loginViaGithub();
      // Handle the response, possibly redirect the user or display data
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-main">

      <div className="local-login-form">
        <LocalLogIn />
      </div>

      <div className="github-container">
        <button onClick={handleGitHubLogin} className='githubBtn'>🔒 Login via GitHub</button>
      </div>

    </div>
  );
};

export default LogIn