import React from 'react';
import '../App.css';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const Home = (props) => {

    return (
        <div className="Home">
            <main>
                <h1 className="welcome-text">Welcome to The Skaters Official Website</h1>

                <div className="container text-center ">
                    <h3 id='subtitle'> Would you like to:</h3>

                    <div className="row">
                        <div className="col">
                            <div className="card" style={{ width: 18 + 'rem' }}>
                                <img src="https://www.thisskatelife.com/wp-content/uploads/2022/08/the-parts-of-a-roller-skate-diagram-1024x1024.jpg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <Link to="/parts"><button className='btn btn-primary'>Buy Parts?</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card" style={{ width: 18 + 'rem' }}>
                                <img src="https://i.pinimg.com/1200x/6c/a2/95/6ca295393cdcef7f5b4f8d99b52fa09b.jpg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <Link to="/skates"><button className='btn btn-primary'>Buy Skates?</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card" style={{ width: 18 + 'rem' }}>
                                <img src="https://sc04.alicdn.com/kf/HTB1P1OxaRGE3KVjSZFhq6AkaFXam.jpg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <Link to="/gear"><button className='btn btn-primary'>Buy Gear?</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default Home