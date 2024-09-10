import { useContext, useEffect, useState } from 'react';
import { Mycontext } from '../../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { userAPI } from '../../API/API';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartfetch, setCartfetch } = useContext(Mycontext);
  const userid = localStorage.getItem('id');

  useEffect(() => {
    async function getuser() {
      try {
        const res = await axios.get(`${userAPI}/${userid}`);
        const list = res.data.cart;
        const updatedCart = Object.values(list).map((item) => ({
          ...item,
          quantity: item.quantity || 1,
          total: (item.price * (item.quantity || 1)),
        }));
        setCartfetch(updatedCart);
      } catch (err) {
        console.log(err);
      }
    }
    getuser();
  }, [setCartfetch]);

  const handleChange = async (item, change) => {
    const newQuantity = Math.max(1, item.quantity + change);
    const updatedItem = { ...item, quantity: newQuantity, total: newQuantity * item.price };
    try {
      const res = await axios.get(`${userAPI}/${userid}`);
      const cart = res.data.cart;

      cart[item.id] = updatedItem;
      await axios.patch(`${userAPI}/${userid}`, { cart });

      setCartfetch(Object.values(cart));

      toast.success('Quantity Updated');
    } catch (err) {
      console.log(err);
      toast.warning('Failed to Update Quantity');
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const res = await axios.get(`${userAPI}/${userid}`);
      const cart = res.data.cart;
      delete cart[itemId];
      await axios.patch(`${userAPI}/${userid}`, { cart });
      setCartfetch(Object.values(cart));
      toast.success('Item Removed From The Cart');
    } catch (err) {
      console.log(err);
      toast.warning('Cant Remove Item From Cart');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {cartfetch && cartfetch.length > 0 ? (
        <>
          {cartfetch.map((item) => (
            <div key={item.id} className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4">
              <div className="flex items-center p-4">
                <div className="w-1/3">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="w-2/3 p-4">
                  <div className="font-bold text-lg">{item.name}</div>
                  <div className="text-gray-600 mt-2">Price: ${item.price}</div>
                  <div className="text-gray-600 mt-2">Total: ${item.total}</div>
                  <div className="flex items-center mt-4">
                    <button onClick={() => handleChange(item, 1)} className="bg-gray-200 px-3 py-1 rounded-full">+</button>
                    <input type="text" value={item.quantity} readOnly className="w-10 text-center mx-2 border rounded" />
                    <button onClick={() => handleChange(item, -1)} className="bg-gray-200 px-3 py-1 rounded-full">-</button>
                  </div>
                  <button onClick={() => handleRemove(item.id)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">Remove</button>
                </div>
              </div>
            </div>
          ))}

          
          <div className="flex justify-center">
            <Link to='/pay'>
              <button className='bg-blue-500 mt-4 text-white px-4 py-2 rounded-lg font-bold'>
                Proceed to Pay
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">No items in the cart</div>
      )}
    </div>
  );
};

export default Cart;
