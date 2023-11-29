import './App.css';
import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Skates from './pages/Skates';
import logo from './assets/logo.png'

const App = () => {

  let element = useRoutes([
    {
      path: "/",
      element: <Skates />
    },
    // {
    //   path: "/mycart",
    //   element: <MyCart />
    // }
  ]);

  return (
    <div className="App">

      <header>
        <div className="header-container">
          <div className="header-left">
            <Link to="/">
              <img src={logo} />
              <h1>The Skaters</h1>
            </Link>
          </div>
          <div className="header-right">
            <Link to="/mycart"><button className='addBtn'>My Cart</button></Link>
          </div>
        </div>
      </header>

      {element}

    </div>
  )
}

export default App;
