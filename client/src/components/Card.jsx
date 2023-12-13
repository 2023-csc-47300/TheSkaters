import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Card.css'
import more from '../assets/more.png'
import logo from '../assets/logo.png'

const Card = (props) => { 

    return (
        <div className="Card">
            <div className='top-container' style={{ backgroundImage:`url(${props.image})`}}>
            </div>
            <div className='bottom-container'>
                <h3>{props.name}</h3>
                <p>Price: ${props.price}</p>
                <p>Model: {props.model}</p>
                <Link to={`/skates/products/getbyid/${props.product_id}`}><a>See More →</a></Link>
            </div>
        </div>
    )
}

export default Card