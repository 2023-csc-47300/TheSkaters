import '../styles/MyCart.css'

const CartList = ({ products }) => {

    return (
        <>
            {products.length > 0 ? (
                products.map((product, index) => (
                    <div className="col-14 mb-3" key={index}>
                        <div className="row" id='cartListRow'>
                            <div className="col-md-2">
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="img-fluid"
                                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                                />
                            </div>
                            <div className="col-md-8" style={{ marginLeft: '50px' }}>
                                <h3>{product.name}</h3>
                                <div className="price-quantity" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p>Price: ${product.price}</p>
                                    <p>Quantity: {product.quantity}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Nothing in the cart yet.</p>
            )}
        </>

    )
}

export default CartList