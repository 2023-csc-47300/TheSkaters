import React, { useState, useEffect } from 'react'
import '../styles/Skates.css'
import { Link } from 'react-router-dom'

const MyCart = (props) => {

    // const [gifts, setGifts] = useState([])

    // useEffect(() => {
    //     setGifts(props.data)
    // }, [props])
    
    return (
        <div className="MyCart">
            <main>
            {/* {
                gifts && gifts.length > 0 ?
                gifts.map((gift,index) => 
                    
                   <Card id={gift.id} 
                         image={gift.image} 
                         name={gift.name} 
                         pricepoint={gift.pricepoint} 
                         audience={gift.audience} />

                ) : <h3 className="noResults">{'No Gifts Yet 😞'}</h3>
            } */}
            <h1>Welcome to Your Cart</h1>
            <Link to="/myCart/checkOut"><button className='addBtn'>Check Out</button></Link>
            </main>
        </div>  
    )
}

export default MyCart