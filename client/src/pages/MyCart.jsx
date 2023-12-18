import React from 'react'
import { useEffect, useState } from "react";
import '../styles/Skates.css'
import { Link } from 'react-router-dom'

import OrderAPI from "../services/OrderAPI";
import CartAPI from "../services/CartAPI";

const MyCart = ({ githubUser }) => {

    useEffect(() => {
        if (githubUser && !githubUser.error) {
            const getOrder = async () => {
                var cur_order = await OrderAPI.getCurrentOrder(githubUser.user_id);
                if (!cur_order.order_id) {
                    cur_order = await OrderAPI.startNewOrder(githubUser.user_id);
                }
                const orderData = await CartAPI.getOrderData(cur_order.order_id);
                console.log(orderData)
            }
            getOrder();
        }
    }, []);

    return (
        <div className="MyCart">

            <h1>Welcome to Your Cart</h1>
            <Link to="/myCart/checkOut"><button className='addBtn'>Check Out</button></Link>
        </div>
    )
}

export default MyCart