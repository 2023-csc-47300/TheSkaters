import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Component.css'
import more from '../assets/more.png'
import logo from '../assets/logo.png'
// import name from 'api '

const Skate = (props) => { 
    
    
    let name = props.name,
        color = props.color,
        description = props.description,
        model = props.model,
        price = props.price,
        product_id = props.product_id,
        size = props.size,
        type = props.type,
        image = props.image;


        // skateComp for skate Component
    return (
        <div className="skateComp">
            <div className="skateInfo-container">
                <div className="skateInfo-text">
                    <h1>Name:</h1>
                    <span className="model">Model:</span>
                    <span className="type">Type:</span>
                    <span className="color">Color:</span>
                    <span className="price">Price:</span>
                    <span className="size">Size:</span>
                    <span className="product_id">ID:</span>
                </div>
                <div className="skateInfo">
                    <h1>{name}</h1>
                    <span className="model">{model}</span>
                    <span className="type">{type}</span>
                    <span className="color">{color}</span>
                    <span className="price">{price}</span>
                    <span className="size">{size}</span>
                    <span className="product_id">{product_id}</span>
                </div>
            </div>

            <div className="skatePic"><img src={image} alt="SkatePic" /></div>

            <div className="skateDescription">{description}</div>
        </div>
    )
}

export default Skate