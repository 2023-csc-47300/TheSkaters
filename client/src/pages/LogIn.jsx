import React, { useState, useEffect } from 'react';
import '../styles/Pages.css';
import Skate from '../components/Skate';
import Product_API from '../services/product_api.jsx';



const LogIn = (props) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await Product_API.getProducts();
            setProducts(productsData);
        }
        fetchProducts();
    }, [])
    
    return (
        <div className="login-main">
            <div className="login-text">
                <h1>Welcome to Log-In</h1>
                <p>Would you rather to sign in Locally or through Google?</p>
            </div>

            <div className="skate-div"> 

                {
                    products && products.length > 0 ?
                        products.map((product, index) =>

                            <Skate name={product.name}
                                color = {product.color}
                                description = {product.description} 
                                model = {product.model}
                                price = {product.price}
                                product_id = {product.product_id}
                                size = {product.size}
                                type = {product.type} />

                        ) : <h3 className="noResults">{'Nothing Found'}</h3>

                }

                <Skate name = "SkateName" 
                        color = "SkateColor:blue" 
                        description = "{props.description}" 
                        model = "{props.model}"
                        price = "{props.price}"
                        product_id = "{props.product_id}"
                        size = "{props.size}"
                        type = "{props.type}" />
                

            </div>
        </div>  
    )
}

export default LogIn