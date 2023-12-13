import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductAPI from "../services/ProductAPI";
import '../styles/ProductDetails.css'
import ProductDescription from "../components/ProductDescription";

const ProductDetails = ({ addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState({ product_id: 0, name: '', type: '', price: '', model: '', size: '', color: '', description: '', image_url: '' });
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        const fetchProductById = async () => {
            const data = await ProductAPI.getProductById(id);
            setProduct(data);
        }
        fetchProductById();
    }, [id]);

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    }

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
                    <div className="size-selection">
                        <div className="size-checkboxes">
                            <h4 style={{ display: 'inline-block', marginRight: '10px' }}>Size:</h4>
                            {product.size.split(',').map((sizeOption, index) => (
                                <div key={index} className="size-option">
                                    <input
                                        type="checkbox"
                                        id={`size-${index}`}
                                        name={`size-${index}`}
                                        value={sizeOption.trim()}
                                        checked={selectedSize === sizeOption.trim()}
                                        onChange={() => handleSizeChange(sizeOption.trim())}
                                    />
                                    <label htmlFor={`size-${index}`}>{sizeOption.trim()}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <h4>Color: {product.color}</h4>
                    <ProductDescription description={product.description}/>
                </div>
            </div>
        </>
    )
}

export default ProductDetails;