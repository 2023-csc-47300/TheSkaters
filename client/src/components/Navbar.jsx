import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'
import Cart from './Cart';
import { useState } from 'react';

const Navbar = ({ cartItems }) => {

    return (
        <header className='navBar'>
            <div className="header-container">
                <div className="header-left">
                    <Link to="/">
                        <img src={logo} />
                        <h1>The Skaters</h1>
                    </Link>
                </div>
                <div className="header-right">
                    <Link to="/parts"><button className='partsBtn'>Parts</button></Link>
                    <Link to="/skates"><button className='skatesBtn'>Skates</button></Link>
                    <Link to="/gear"><button className='gearBtn'>Gear</button></Link>
                    <Cart cartItems={cartItems} />
                    <Link to="/logIn"><button className='logInBtn'>Log-In</button></Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar;