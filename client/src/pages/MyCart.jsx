import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem'; // Create a CartItem component to display individual cart items
import CartAPI from '../services/CartAPI'; // Import the service to interact with the backend for cart-related operations

const MyCart = ({ userId }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await CartAPI.getCartItemsByUserId(userId);
                setCartItems(response);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [userId]);

    const handleRemoveFromCart = async (cartItemId) => {
        try {
            await CartAPI.deleteCartItem(cartItemId);
            // After successful deletion, update the cart items displayed
            const updatedCart = cartItems.filter((item) => item.cart_id !== cartItemId);
            setCartItems(updatedCart);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <div className="MyCart">
            <h1>Welcome to Your Cart</h1>
            {cartItems.length > 0 ? (
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
            )}
        </div>
    );
};

export default MyCart;
