import React, { useState } from 'react';
import '../styles/Skates.css';
import Card from '../components/Card';

const Skates = ({ skates }) => {
    const [showInline, setShowInline] = useState(false);
    const [showQuad, setShowQuad] = useState(false);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (name === 'inline' && checked) {
            setShowInline(true);
            setShowQuad(false);
        } else if (name === 'quad' && checked) {
            setShowQuad(true);
            setShowInline(false);
        } else {
            setShowInline(false);
            setShowQuad(false);
        }
    };
    

    const filteredSkates = skates.filter((skate) => {
        if (showInline) {
            return skate.type === 'inline_skates';
        } else if (showQuad) {
            return skate.type === 'quad_skates';
        } else {
            return true;
        }
    });

    return (
        <>
            <div className="form-check">
                <input
                    type="checkbox"
                    id="inlineCheckbox"
                    name="inline"
                    className="form-check-input"
                    checked={showInline}
                    onChange={handleCheckboxChange}
                />
                <label className="form-check-label" for="inlineCheckbox" style={{ marginRight: '50px' }}>
                    Inline Skates
                </label>

                <input
                    type="checkbox"
                    id="quadCheckbox"
                    name="quad"
                    className="form-check-input"
                    checked={showQuad}
                    onChange={handleCheckboxChange}
                />
                <label className="form-check-label" for="quadCheckbox">
                    Quad Skates
                </label>
            </div>

            <div className='products'>
                {filteredSkates && filteredSkates.length > 0 ? (
                    filteredSkates.map((product, index) => (
                        <Card
                            id={product.product_id}
                            key={product.product_id}
                            name={product.name}
                            color={product.color}
                            description={product.description}
                            model={product.model}
                            price={product.price}
                            product_id={product.product_id}
                            size={product.size}
                            type={product.type}
                            image={product.image_url}
                        />
                    ))
                ) : (
                    <h3 className="noResults">{'Nothing Found'}</h3>
                )}
            </div>
        </>
    );
};

export default Skates;
