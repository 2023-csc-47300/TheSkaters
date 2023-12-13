import { Button } from 'react-bootstrap';
import { useState } from "react";

const ProductDescription = ({ description }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const renderDescription = () => {
        const wordLimit = showFullDescription ? Infinity : 30;
        const words = description.split(' ');

        if (words.length > wordLimit && !showFullDescription) {
            return (
                <>
                    {words.slice(0, wordLimit).join(' ')}...
                    <Button
                        onClick={() => setShowFullDescription(true)}
                        variant="link"
                    >
                        View more
                    </Button>
                </>
            );
        } else {
            return (
                <>
                    {description}
                    {showFullDescription && (
                        <Button
                            onClick={() => setShowFullDescription(false)}
                            variant="link"
                        >
                            View less
                        </Button>
                    )}
                </>
            );
        }
    };

    return (
        <>
            <p>
                {renderDescription()}
            </p>
        </>
    )
}

export default ProductDescription;