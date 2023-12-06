import { Link } from "react-router-dom";

const Gear = ({ gear }) => {

    return (
        <main>
            {
                gear && gear.length > 0 ?
                gear.map(g =>
                        <div className="card" key={g.product_id}>
                            <div className='top-container' style={{ backgroundImage: `url(${g.image_url})` }}>
                            </div>
                            <div className='bottom-container'>
                                <h3>{g.name}</h3>
                                <p>Price: ${g.price}</p>
                                <p>Model: {g.model}</p>
                                <Link to={`/gear/${g.product_id}`}><a>See More →</a></Link>
                            </div>
                        </div>
                    ) : <h3 className="noResults">{'Nothing Found'}</h3>
            }
        </main>
    )
}

export default Gear;