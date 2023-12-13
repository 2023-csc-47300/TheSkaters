import { useState } from "react";

const ProductSize = ({ size }) => {
    const [selectedSize, setSelectedSize] = useState(null);

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    }

    return (
        <div className="size-selection">
            <div className="size-checkboxes">
                <h4 style={{ display: 'inline-block', marginRight: '10px' }}>Size:</h4>
                {size.split(',').map((sizeOption, index) => (
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
    )
}

export default ProductSize