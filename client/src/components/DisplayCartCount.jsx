import React from 'react';
import { Link } from 'react-router-dom';

const DisplayCartCount = ({ cartItemsCount }) => {
    return (
        <Link to="/myCart">
            <button className='cartBtn'>🛒 {cartItemsCount > 0 ? `(${cartItemsCount})` : ''}</button>
        </Link>
    );
}

export default DisplayCartCount;
