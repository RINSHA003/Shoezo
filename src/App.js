import React, { createContext, useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Home from "./Pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from './Pages/SignUp'
import Footer from "./Components/Footer";
import FilteredProducts from './Components/FilterdProducts.jsx/FilteredProducts'
import FilterdBrand from "./Components/FilterdBrand/FilterdBrand";
import Brand from "./Components/Brand/Brand";
import axios from "axios";
import { userAPI } from "./API/API";
import Cart from "./Components/Cart/Cart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Payment from "./Components/Payment/Payment";
import Admin from "./Components/Admin/Admin";
import DashBoard from "./Components/Admin/DashBoard";
import Allusers from "./Components/Admin/Allusers";
import UserDetails from "./Components/Admin/UserDetails";
import AddProducts from "./Components/Admin/AddProducts";
import EditProducts from "./Components/Admin/EditProducts";
import EditPage from "./Components/Admin/EditPage";
import OrderDetails from "./Components/Admin/OrderDetails";
import Contact  from "./Components/Contact/Contact";

export const Mycontext = createContext()

function App() {
  const location=useLocation()
  const visibleNav=location.pathname==='/login'|| location.pathname ==='/signup' || location.pathname.startsWith( '/admin');
  const [cart, setCart] = useState([])
  const [cartfetch, setCartfetch] = useState([])
  const userid = localStorage.getItem('id')

  useEffect(() => {
      async function getuser() {
          try {
             const res = await axios.get(`${userAPI}/${userid}`)
             setCart(res.data)
             const list = res.data.cart
             setCartfetch(Object.values(list))
          } catch (err) {
            console.log(err);
          }
      }
      getuser()
  }, [])

  return (
    <div>
      <Mycontext.Provider value={{ cartfetch, setCartfetch }}>
       {!visibleNav && <Navbar />}
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/category/:id' element={<FilteredProducts />} />
          <Route path="/brands" element={<Brand />} />
          <Route path='/brands/:brand' element={<FilterdBrand />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pay" element={<Payment/>}/>
          <Route  path="/contactus" element={<Contact/>}/>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<DashBoard />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="allusers" element={<Allusers />} />
            <Route path="allusers/:id" element={<UserDetails />} />
            <Route path="addproducts" element={<AddProducts />} />
            <Route path="editproducts" element={<EditProducts/>} />
            <Route path="editproducts/:id" element={<EditPage />} />
            <Route path='orders' element={<OrderDetails />} />
         </Route>
        </Routes> 
        { !visibleNav && <Footer />}
      </Mycontext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
