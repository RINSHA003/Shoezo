import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get('http://localhost:3000/users');
        const users = res.data;

        const allOrders = users.flatMap(user => user.orders || []);
        console.log(allOrders)
        setOrders(allOrders);
      } catch (error) {
        console.log("Error fetching users: ", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
       
        <div className="overflow-y-auto max-h-96"> 
          {orders.map((order) => (
            <div key={order.orderid} className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Order ID: {order.orderid}</h3>
              <div className="overflow-x-auto border border-gray-300 shadow-lg rounded-lg">
               
                <table className="w-full min-w-max table-auto divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.orderItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-lg font-semibold">Total Price: ${order.totalPrice}</p>
              <hr className="my-4" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
