import React from 'react'
import { useEffect, useState } from "react";
import '../styles/MyCart.css'
import OrderAPI from "../services/OrderAPI";
import CartAPI from "../services/CartAPI";
import ProductAPI from '../services/ProductAPI';
import CartList from '../components/CartList';
import CartTotalPriceCheckout from '../components/CartTotalPriceCheckout'

const MyCart = ({ githubUser }) => {
    const [orderData, setOrderData] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (githubUser && !githubUser.error) {
            const getOrder = async () => {
                var cur_order = await OrderAPI.getCurrentOrder(githubUser.user_id);
                if (!cur_order.order_id) {
                    cur_order = await OrderAPI.startNewOrder(githubUser.user_id);
                }
                const response = await CartAPI.getOrderData(cur_order.order_id);
                setOrderData(response);
                console.log("Oder data: ", response)
            }
            getOrder();
        }
    }, [githubUser]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await Promise.all(
                    orderData.map(async (orderItem) => {
                        const product = await ProductAPI.getProductById(orderItem.item_id);
                        return { ...product, quantity: orderItem.quantity };
                    })
                );
                setProducts(productsData);
                console.log('Products data from order: ', productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if (orderData.length > 0) {
            fetchProducts();
        }
    }, [orderData]); // Run when orderData changes

    return (
        <div className="MyCart" style={{ marginTop: '2%' }}>
                    <CartList products={products} />
                <div className="col-md-4">
                    <div className="text-end">
                        <CartTotalPriceCheckout products={products} githubUser={githubUser}/>
                    </div>
                </div>
        </div>
    )
}

export default MyCart