import React, { useState, useEffect } from 'react';
import '../styles/Pages.css';
import Skate from '../components/Skate';

const LogIn = (props) => {

    // const [gifts, setGifts] = useState([])

    // useEffect(() => {
    //     setGifts(props.data)
    // }, [props])
    
    return (
        <div className="login-main">
            <div className="login-text">
                <h1>Welcome to Log-In</h1>
                <p>Would you rather to sign in Locally or through Google?</p>
            </div>

            <div className="skate-div">
                <Skate name = "SkateName" 
                        color = "SkateColor:blue" 
                        description = "{props.description}" 
                        model = "{props.model}"
                        price = "{props.price}"
                        product_id = "{props.product_id}"
                        size = "{props.size}"
                        type = "{props.type}" />
                <Skate name = "Hello" 
                        color = "Yellow" 
                        description = "{props.description}" 
                        model = "M1"
                        price = "170"
                        product_id = "{props.product_id}"
                        size = "M"
                        type = "{props.type}" />

            </div>
        </div>  
    )
}

export default LogIn