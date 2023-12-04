import React, { useState, useEffect } from 'react';
import '../styles/Pages.css';
import Skate from '../components/Skate';

const LogIn = () => {
    
    return (
        <div className="login-main">
            <div className="login-text">
                <h1>Welcome to Log-In</h1>
                <p>Would you rather to sign in Locally or through Google?</p>
            </div>
        </div>  
    )
}

export default LogIn