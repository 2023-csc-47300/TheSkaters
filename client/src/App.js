import './App.css';
import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import MyCart from './pages/MyCart';
import CheckOut from './pages/CheckOut';
import Skates from './pages/Skates';
import LogIn from './pages/LogIn';
import Parts from './pages/Parts';
import Gear from './pages/Gear';
import ProductAPI from './services/ProductAPI';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails';

const App = () => {
  const [products, setProducts] = useState([]);
  const [skates, setSkates] = useState([]);
  const [parts, setParts] = useState([]);
  const [gear, setGear] = useState([]);
  const [cartItems, setCartItems] = useState(null);

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

  const addToCart = () => {
    setCartItems(prevCount => prevCount + 1); // Increase the count of items in the cart
  };

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
      path: "/skates/products/getbyid/:id",
      element: <ProductDetails addToCart={addToCart}/>
    },
    {
      path: "/parts/products/getbyid/:id",
      element: <ProductDetails addToCart={addToCart}/>
    },
    {
      path: "/gear/products/getbyid/:id",
      element: <ProductDetails addToCart={addToCart}/>
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

      <Navbar cartItems={cartItems}/>

      {element}

    </div>
  )
}

export default App;
