import React from 'react'
import OrderAPI from "../services/OrderAPI";
import '../styles/MyCart.css'

const CartCheckout = ({ githubUser }) => {

    const handleCheckout = async () => {
        try {
            var cur_order = await OrderAPI.getCurrentOrder(githubUser.user_id);
            if (!cur_order.order_id) {
                cur_order = await OrderAPI.startNewOrder(githubUser.user_id);
            }
            const response = await OrderAPI.checkoutOrder(cur_order.order_id);
            // Handle the response, possibly redirect the user or display data
            console.log(response);
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <button className="checkoutBtn" onClick={handleCheckout} >Checkout</button>
    )
}

export default CartCheckout