import React, { useState } from 'react';
import '../styles/Skates.css';
import Card from '../components/Card';
import ProductAPI from '../services/ProductAPI';
import Skate from '../components/Skate';

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
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="inline"
                        checked={showInline}
                        onChange={handleCheckboxChange}
                    />
                    Inline Skates
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="quad"
                        checked={showQuad}
                        onChange={handleCheckboxChange}
                    />
                    Quad Skates
                </label>
            </div>
            <main>
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
            </main>
        </>
    );
};

export default Skates;
