import React, { useState, useEffect } from 'react';
import UserAPI from '../services/UserAPI';
import '../styles/LogIn.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [localMess, setMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await UserAPI.signUpLocally(firstName, lastName, email, password); // Adjust with your local login API
            // Handle the response, possibly redirect the user or display data
            if (response.error) {
                setMessage(response.error.description); // Set the error message to display
                setTimeout(() => {
                    setMessage(null);
                }, 5000); // Clear the error message after 5 seconds (adjust as needed)
            } else {
                window.location.href = '/';
            }
        } catch (error) {
            console.error(error);
            setMessage(error.description); // Set the error message to display

            // Clear the error message after a delay (for display purposes)
            setTimeout(() => {
                setMessage(null);
            }, 5000); // Clear the error message after 5 seconds (adjust as needed)
        }
    };

    return (
        <div className="login-main">
            <div className='local-login-form'>
                <form onSubmit={handleSignUp}>
                    <h2 className="local-login-mess">{localMess}</h2>
                    <h2>Roll into the Action!</h2>
                    <div>
                        <label>First Name:</label>
                        <input type="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className='signUpBtn'>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
