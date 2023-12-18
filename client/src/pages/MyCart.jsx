import React, { useState, useEffect } from 'react';

const MyCart = () => {
    return (
        <div className="MyCart">
            <h1>Welcome to Your Cart</h1>
            {/* {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <CartItem key={item.cart_id} item={item} handleRemoveFromCart={handleRemoveFromCart} />
                    ))}
                    <Link to="/myCart/checkOut">
                        <button className="addBtn">Check Out</button>
                    </Link>
                </div>
            ) : (
                <p>Your cart is empty</p>
            )} */}
            <p>Your cart is empty</p>
        </div>
    );
};

export default MyCart;
