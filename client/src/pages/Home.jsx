import React, { useState, useEffect } from 'react'
import '../styles/Skates.css'
import Card from '../components/Card'

const Home = (props) => {

    // const [gifts, setGifts] = useState([])

    // useEffect(() => {
    //     setGifts(props.data)
    // }, [props])
    
    return (
        <div className="Home">
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
            
            </main>
        </div>  
    )
}

export default Home