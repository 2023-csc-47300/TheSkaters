import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductAPI from "../services/ProductAPI";
import '../styles/ProductDetails.css'
import ProductDescription from "../components/ProductDescription";
import ProductSize from "../components/ProductSize";

const ProductDetails = ({ addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState({ product_id: 0, name: '', type: '', price: '', model: '', size: '', color: '', description: '', image_url: '' });

    useEffect(() => {
        const fetchProductById = async () => {
            const data = await ProductAPI.getProductById(id);
            setProduct(data);
        }
        fetchProductById();
    }, [id]);

    const handleAddToCart = () => {
        addToCart();
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