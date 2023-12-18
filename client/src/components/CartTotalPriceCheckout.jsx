import React from 'react';
import '../styles/MyCart.css';
import CartCheckout from './CartCheckout';

const CartTotalPriceCheckout = ({ githubUser, products }) => {
    const totalPrice = products.reduce((total, product) => {
        const price = parseFloat(product.price); // Convert to a numeric value
        return isNaN(price) ? total : total + price; // Add to total if it's a valid number
      }, 0);

    return (
        <>
            <h4>Total price: ${totalPrice.toFixed(2)}</h4>
            <CartCheckout githubUser={githubUser}/>
        </>
    );
};

export default CartTotalPriceCheckout;
