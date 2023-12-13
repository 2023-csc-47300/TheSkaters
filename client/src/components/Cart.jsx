import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems }) => {
    return (
        <Link to="/myCart">
            <button className='cartBtn'>🛒 {cartItems > 0 ? `(${cartItems})` : ''}</button>
        </Link>
    );
}

export default Cart;
