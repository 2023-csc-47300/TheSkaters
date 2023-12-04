import React, { useState, useEffect } from 'react'
import '../styles/Skates.css'
import Card from '../components/Card'
import ProductAPI from '../services/ProductAPI'
import Skate from '../components/Skate'

const Skates = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productsData = await ProductAPI.getProducts();
            setProducts(productsData);
        }
        fetchProducts();
    }, [])


    return (
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
                

        </div>
        // <div className="Skates">
        //     <main>
        //     {
        //         gifts && gifts.length > 0 ?
        //         gifts.map((gift,index) => 

        //            <Card id={gift.id} 
        //                  image={gift.image} 
        //                  name={gift.name} 
        //                  pricepoint={gift.pricepoint} 
        //                  audience={gift.audience} />

        //         ) : <h3 className="noResults">{'No Gifts Yet 😞'}</h3>
        //     }
        //     <Card />
        //     </main>
        // </div>  
    )
}

export default Skates