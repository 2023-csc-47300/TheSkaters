import './App.css';
import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import MyCart from './pages/MyCart';
import CheckOut from './pages/CheckOut';
import Skates from './pages/Skates';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Parts from './pages/Parts';
import Gear from './pages/Gear';
import ProductAPI from './services/ProductAPI';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails';
import UserAPI from './services/UserAPI';

const App = () => {
  const [products, setProducts] = useState([]);
  const [skates, setSkates] = useState([]);
  const [parts, setParts] = useState([]);
  const [gear, setGear] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(null);
  const [githubUser, setGithubUser] = useState(null);

  useEffect(() => {
    const getGithubUser = async () => {
      try {
        const response = await UserAPI.loggedInGithub();
        setGithubUser(response);
        console.log(response);
      } catch (error) {
        console.log('Error in getGithubUser', error);
        if (error.message === 'Unauthorized') {
          // Redirect unauthorized users to the login page
          setGithubUser(null);
          window.location.href = '/logIn';
          return;
        }
      }
    };

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

    getGithubUser();
    fetchProducts();
  }, [])

  const addToCart = () => {
    setCartItemsCount(prevCount => prevCount + 1); // Increase the count of items in the cart
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
      element: <ProductDetails addToCart={addToCart} githubUser={githubUser}/>
    },
    {
      path: "/parts/products/getbyid/:id",
      element: <ProductDetails addToCart={addToCart} githubUser={githubUser}/>
    },
    {
      path: "/gear/products/getbyid/:id",
      element: <ProductDetails addToCart={addToCart} githubUser={githubUser}/>
    },
    {
      path: "/myCart",
      element: <MyCart githubUser={githubUser}/>
    },
    {
      path: "/myCart/checkOut",
      element: <CheckOut githubUser={githubUser}/>
    },
    {
      path: "/logIn",
      element: <LogIn />
    },
    {
      path: "/signUp",
      element: <SignUp />
    }

  ]);

  // Debugging log to check the value of githubUser
  console.log("githubUser:", githubUser);

  return (
    <div className="App">

      <Navbar cartItemsCount={cartItemsCount} githubUser={githubUser} />

      {element}

    </div>
  )
}

export default App;
