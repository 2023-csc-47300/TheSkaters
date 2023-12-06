import React, { useState, useEffect } from 'react';
import '../App.css';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Home = (props) => {

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
                    <Link to="/parts"><button className='homeBtn'>Buy Parts</button></Link>
                </span>
                <span className="third-middle">
                    <h1>Buy Skates?</h1>
                    <Link to="/skates"><button className='homeBtn'>Buy Skates</button></Link>
                </span>
                <span className="third-right">
                    <h1>Buy Gear?</h1>
                    <Link to="/gear"><button className='homeBtn'>Buy Gear</button></Link>
                </span>

            </div>







            
            </main>
        </div>  
    )
}

export default Home