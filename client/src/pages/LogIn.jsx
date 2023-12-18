import React, { useState, useEffect } from 'react';
import '../styles/Pages.css';
import UserAPI from '../services/UserAPI';
import { Link } from 'react-router-dom';

const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localMess, setMessage] = useState('');

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

          console.log(JSON.stringify(response));
          const jString = JSON.stringify(response);

          console.log(response.email);
          
          if(response.email === undefined){
            // Then response is not a correct account
            if(response.error.code == 401){
              setMessage(`Failed. Error with Code ${response.error.code}.`);
              return;
            }
            else {
              setMessage(`Error Incorrect Credentials`);
              return;
            }
          }
          else {
            // All good
            setMessage(``);
            console.log(`Success`);
            window.location.href = '/';
            return;
          }

          return;
      } catch (error) {
          console.error(error);
          setMessage(`Failed. Error with Code ${error.code}.`);
          return;
      }

      
    

      
    };

    return (
        <div className="login-main">
          
          <div className="local-login-form">
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
          <Link to="/signUp"><button className='signUpBtn'>Sign Up</button></Link>

          <h2 className="local-login-mess">{localMess}</h2>
          </div>

          <button onClick={handleGitHubLogin} className='login-github-BTN'>🔒 Login via GitHub</button>
          
        </div>
      );
};

export default LogIn