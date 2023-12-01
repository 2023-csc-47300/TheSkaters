import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import '../styles/Skates.css'
import Card from '../components/Card'

const CheckOut = (props) => {

    // const [gifts, setGifts] = useState([])

    // useEffect(() => {
    //     setGifts(props.data)
    // }, [props])

    const root = ReactDOM.createRoot(document.getElementById('root'));
    
    return (
        <div className="CheckOut">
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
            <div>
            <h1>Welcome to CheckOut</h1>
            <p>Need to link from MyCart</p>
            </div>
            </main>
        </div>  
    )
}

export default CheckOut