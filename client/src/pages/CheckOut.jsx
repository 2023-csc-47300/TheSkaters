import React, { useState, useEffect } from 'react'
import '../styles/Skates.css'
import OrderAPI from "../services/OrderAPI";


const CheckOut = ({githubUser}) => {

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
        <div className="CheckOut">
            <main>
                <div>
                    <h1>Welcome to CheckOut</h1>
                    <p>Need to link from MyCart</p>
                    <button className="checkout" onClick={handleCheckout} >Checkout</button>
                </div>
            </main>
        </div>
    )
}

export default CheckOut