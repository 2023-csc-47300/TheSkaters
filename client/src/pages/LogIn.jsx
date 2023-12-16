import React, { useState, useEffect } from 'react';
import '../styles/Pages.css';
import UserAPI from '../services/UserAPI';

const LogIn = () => {

    const handleGitHubLogin = async () => {
        try {
          const response = await UserAPI.loginViaGithub();
          // Handle the response, possibly redirect the user or display data
          console.log(response);
        } catch (error) {
          console.error(error);
        }
    };
    
    return (
        <div>
          <button onClick={handleGitHubLogin} className='headerBtn'>🔒 Login via GitHub</button>
        </div>
      );
};

export default LogIn