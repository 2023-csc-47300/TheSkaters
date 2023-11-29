import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Card.css'
import more from '../assets/more.png'
import logo from '../assets/logo.png'

const Card = (props) => { 
    
    

    return (
        <div className="card">
            <div className='top-container' style={{ backgroundImage:`url(${logo})`}}>
                <Link to={'/edit/'}><img src={more} /></Link>
            </div>
            <div className='bottom-container'>
                <h3>Name</h3>
                <p>Price: </p>
                <p>what else</p>
                <Link to={'/skates/'}><a>Read More →</a></Link>
            </div>
        </div>
    )
}

export default Card