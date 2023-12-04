import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Component.css'
import more from '../assets/more.png'
import logo from '../assets/logo.png'

const Local = (props) => { 
    
    

    return (
        <div className="local-sign-in">

            <form action="/action_page.php" className="local-form">
                <label for="email" className="local-email">eMail:</label>
                    <input type="text" id="email" name="email" /><br></br>
                <label for="password" className="local-password">Password:</label>
                    <input type="text" id="password" name="password" /><br></br>
                <input type="submit" value="Submit" />
            </form>


        </div>
    )
}

export default Local