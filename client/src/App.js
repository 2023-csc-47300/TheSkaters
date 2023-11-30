import './App.css';
import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './pages/Home';
import MyCart from './pages/MyCart';
import CheckOut from './pages/CheckOut';
import Skates from './pages/Skates';
import LogIn from './pages/LogIn';
import logo from './assets/logo.png'

const App = () => {

  let element = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/skates",
      element: <Skates />
    },
    {
      path: "/myCart",
      element: <MyCart />
    },
    {
      path: "/myCart/checkOut",
      element: <CheckOut />
    },
    {
      path: "/logIn",
      element: <LogIn />
    }
    
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
            <Link to="/skates"><button className='addBtn'>Skates</button></Link>
            <Link to="/myCart"><button className='addBtn'>My Cart</button></Link>
            <Link to="/logIn"><button className='addBtn'>Log-In</button></Link>
          </div>
        </div>
      </header>

      {element}

    </div>
  )
}

export default App;
