import React, { useState, useEffect } from 'react';
import '../styles/Pages.css';
import Skate from '../components/Skate';

const LogIn = () => {

    const handleGitHubLogin = async () => {
        // try {
        //   const response = await loginAPI.get('http://http://localhost:8080/users/github');
        //   // Handle the response, possibly redirect the user or display data
        //   console.log(response.data);
        // } catch (error) {
        //   // Handle errors
        //   console.error(error);
        // }
    };
    
    return (
        <div>
          <button onClick={handleGitHubLogin}>Login with GitHub</button>
        </div>
      );
};

export default LogIn