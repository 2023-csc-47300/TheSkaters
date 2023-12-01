import React, { useState, useEffect } from 'react';
import '../App.css';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Home = (props) => {

    // const [gifts, setGifts] = useState([])

    // useEffect(() => {
    //     setGifts(props.data)
    // }, [props])
    // Can Buy popular combinations

    // Can buy wheels

    // Can buy boot

            // <!-- Want 3x1 span of divs   -->
    return (
        <div className="Home">
            <main>

            <h1 className="welcome-text">Welcome to The Skaters Official Website</h1>

            
            <div className="row-container">
                <h3> Would you like to:</h3>


                <span className="third-left">
                    <h1>Buy Parts?</h1>
                    <Link to="/myCart"><button className='homeBtn'>Buy Parts</button></Link>
                </span>
                <span className="third-middle">
                    <h1>Buy Skates?</h1>
                    <Link to="/skates"><button className='homeBtn'>Buy Skates</button></Link>
                </span>
                <span className="third-right">
                    <h1>Go to Gallery</h1>
                    <Link to="/gallery"><button className='homeBtn'>Gallery</button></Link>
                </span>

            </div>







            
            </main>
        </div>  
    )
}

export default Home