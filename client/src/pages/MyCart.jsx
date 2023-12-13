import React from 'react'
import '../styles/Skates.css'
import { Link } from 'react-router-dom'

const MyCart = (props) => {

    return (
        <div className="MyCart">

            <h1>Welcome to Your Cart</h1>
            <Link to="/myCart/checkOut"><button className='addBtn'>Check Out</button></Link>
        </div>
    )
}

export default MyCart