import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductAPI from "../services/ProductAPI";
import OrderAPI from "../services/OrderAPI";
import CartAPI from "../services/CartAPI";
import '../styles/ProductDetails.css'
import ProductDescription from "../components/ProductDescription";
import ProductSize from "../components/ProductSize";

const ProductDetails = ({ addToCart, githubUser }) => {
    const { id } = useParams();
    const [product, setProduct] = useState({ product_id: 0, name: '', type: '', price: '', model: '', size: '', color: '', description: '', image_url: '' });

    useEffect(() => {
        const fetchProductById = async () => {
            const data = await ProductAPI.getProductById(id);
            setProduct(data);
        }
        fetchProductById();
    }, [id]);

    const handleAddToCart = async (e) => {
        if (githubUser && !githubUser.error) {
            addToCart();
            var cur_order = await OrderAPI.getCurrentOrder(githubUser.user_id);
            if (!cur_order.order_id) {
                cur_order = await OrderAPI.startNewOrder(githubUser.user_id);
            }
            const order_id = cur_order.order_id
            
            const cur_cart = await CartAPI.addItemToCart(order_id, product.product_id, 1);
            console.log(cur_cart)

        } else {
            window.location.href = "/logIn";
        }
    };

    return (
        <>
            <div className="product-details">
                <div className="left-side" style={{ backgroundImage: `url(${product.image_url})` }}>
                </div>
                <div className="right-side">
                    <div className="name-price">
                        <h2>{product.name}</h2>
                        <h2>${product.price}</h2>
                    </div>
                    <div className="model-addToCartBtn">
                        <h4 style={{ display: 'inline-block', marginRight: '10px' }}>Model: {product.model}</h4>
                        <button className="addToCart" onClick={handleAddToCart} >Add To Cart</button>
                    </div>
                    <ProductSize size={product.size}/>
                    <h4>Color: {product.color}</h4>
                    <ProductDescription description={product.description}/>
                </div>
            </div>
        </>
    )
}

export default ProductDetails;