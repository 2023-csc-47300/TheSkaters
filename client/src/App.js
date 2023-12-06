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
import Parts from './pages/Parts';
import Gear from './pages/Gear';
import ProductAPI from './services/ProductAPI';

const App = () => {
  const [products, setProducts] = useState([]);
  const [skates, setSkates] = useState([]);
  const [parts, setParts] = useState([]);
  const [gear, setGear] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await ProductAPI.getProducts();
      setProducts(productsData);

      const skatesData = productsData.filter(product => product.type === 'inline_skates' || product.type === 'quad_skates');
      const partsData = productsData.filter(product => product.type === 'wheels');
      const gearData = productsData.filter(product => product.type === 'gear');

      setSkates(skatesData);
      setParts(partsData);
      setGear(gearData);
    }
    fetchProducts();
  }, [])

  let element = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/skates",
      element: <Skates skates={skates} />
    },
    {
      path: "/parts",
      element: <Parts parts={parts} />
    },
    {
      path: "/gear",
      element: <Gear gear={gear} />
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

      <header className='navBar'>
        <div className="header-container">
          <div className="header-left">
            <Link to="/">
              <img src={logo} />
              <h1>The Skaters</h1>
            </Link>
          </div>
          <div className="header-right">
            <Link to="/parts"><button className='partsBtn'>Parts</button></Link>
            <Link to="/skates"><button className='skatesBtn'>Skates</button></Link>
            <Link to="/gear"><button className='gearBtn'>Gear</button></Link>
            <Link to="/myCart"><button className='cartBtn'>🛒</button></Link>
            <Link to="/logIn"><button className='logInBtn'>Log-In</button></Link>
          </div>
        </div>
      </header>

      {element}

    </div>
  )
}

export default App;
