import { Link } from "react-router-dom";

const Parts = ({ parts }) => {

    return (
        <main>
            {
                parts && parts.length > 0 ?
                    parts.map(part =>
                        <div className="card" key={part.product_id}>
                            <div className='top-container' style={{ backgroundImage: `url(${part.image_url})` }}>
                            </div>
                            <div className='bottom-container'>
                                <h3>{part.name}</h3>
                                <p>Price: ${part.price}</p>
                                <p>Model: {part.model}</p>
                                <Link to={`/parts/${part.product_id}`}><a>See More →</a></Link>
                            </div>
                        </div>
                    ) : <h3 className="noResults">{'Nothing Found'}</h3>
            }
        </main>
    )
}

export default Parts;
