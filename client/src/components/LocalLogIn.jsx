import React, { useState } from 'react';
import '../styles/LogIn.css';
import UserAPI from '../services/UserAPI';
import { Link } from 'react-router-dom';

const LocalLogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localMess, setLocalMess] = useState('');

    const handleLocalLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await UserAPI.loginLocally(email, password); // Adjust with your local login API
            // Handle the response, possibly redirect the user or display data
            console.log(response);

            console.log(JSON.stringify(response));
            const jString = JSON.stringify(response);

            console.log(response.email);

            if (response.email === undefined) {
                // Then response is not a correct account
                if (response.error.code == 401) {
                    setLocalMess(`Oops, ${response.error.code}! Email or password is incorrect.`);
                    return;
                }
                else {
                    setLocalMess(`Error Incorrect Credentials`);
                    return;
                }
            }
            else {
                // All good
                setLocalMess(``);
                console.log(`Success`);
                window.location.href = '/';
                return;
            }
            return;
        } catch (error) {
            console.error(error);
            setLocalMess(`Failed. Error with Code ${error.code}.`);
            return;
        }
    }

    return (
        <>
            <form onSubmit={handleLocalLogin}>
                <h2 className="local-login-mess">{localMess}</h2>
                <h2>Login for Adventure!</h2>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="buttons-container">
                    <button type="submit" className='loginBtn'>Log In</button>
                    <Link to="/signUp"><button className='signUpBtn'>Sign Up</button></Link>
                </div>

            </form>
        </>
    )

}

export default LocalLogIn