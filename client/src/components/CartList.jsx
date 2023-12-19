import '../styles/MyCart.css';
import CartAPI from '../services/CartAPI';

const CartList = ({ products, orderData }) => {
    const handleRemove = async (cartId) => {
        try {
            const response = await CartAPI.deleteItemFromCart(cartId);
            window.location.href = '/myCart';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {products.length > 0 ? (
                products.map((product, index) => {
                    // Find the corresponding order data for the product
                    const productInOrderData = orderData.find(
                        (order) => order.item_id === product.product_id
                    );

                    return (
                        <div className="col-md-11 mb-3" key={index}>
                            <div className="row" id='cartListRow'>
                                <div className="col-md-4">
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="img-fluid"
                                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <h3 style={{ marginTop: '10px' }}>{product.name}</h3>
                                    <div className="price-quantity" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p>Price: ${product.price}</p>
                                        <p>Quantity: {product.quantity}</p>
                                    </div>
                                    <button onClick={() => handleRemove(productInOrderData.cart_id)} className='removeBtn'>Remove</button>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <h2>Nothing in the cart yet.</h2>
            )}
        </>
    );
};

export default CartList;
