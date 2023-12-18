import React, { useState, useEffect } from 'react';
import '../styles/Pages.css';
import UserAPI from '../services/UserAPI';

const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleGitHubLogin = async () => {
        try {
          const response = await UserAPI.loginViaGithub();
          // Handle the response, possibly redirect the user or display data
          console.log(response);
          window.location.href = '/';
        } catch (error) {
          console.error(error);
        }
    };
    
    const handleLocalLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await UserAPI.loginLocally(email, password); // Adjust with your local login API
          // Handle the response, possibly redirect the user or display data
          console.log(response);
          window.location.href = '/';
      } catch (error) {
          console.error(error);
      }
    };

    return (
        <div>
          <button onClick={handleGitHubLogin} className='headerBtn'>🔒 Login via GitHub</button>
          
          <form onSubmit={handleLocalLogin}>
                <h2>Local Login</h2>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
          </form>

        </div>
      );
};

export default LogIn