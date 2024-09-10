import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ItemAPI, userAPI } from '../../API/API';

const DashBoard = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [user, setUser] = useState([]);
  const [orderCount,setOrderCount]=useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const productRes = await axios.get(ItemAPI);
        setProductCount(productRes.data.length);

        const userRes = await axios.get(userAPI);
        const allUsers = userRes.data;
        const nonAdminUsers = allUsers.filter((user) => !user.admin);
        setUser(nonAdminUsers);
        setUserCount(nonAdminUsers.length);
        let totalOrders = 0;
        nonAdminUsers.forEach((user) => {
          if (user.orders) {
            user.orders.forEach((order) => {
              totalOrders += order.orderItems.length;
            });
          }
        });

        setOrderCount(totalOrders);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 ">
      
      <div className="bg-white shadow-md rounded-lg p-6 hover:scale-110 transition-transform transform duration-300 ease-in-out">
        <h1 className="text-xl font-bold text-gray-700 mb-2">Product Count</h1>
        <p className="text-3xl font-semibold text-blue-500">{productCount}</p>
      </div>

      
      <div className="bg-white shadow-md rounded-lg p-6 hover:scale-110 transition-transform transform duration-300 ease-in-out">
        <h1 className="text-xl font-bold text-gray-700 mb-2">User Count</h1>
        <p className="text-3xl font-semibold text-blue-500">{userCount}</p>
      </div>

      
      <div className="bg-white shadow-md rounded-lg p-6 hover:scale-110 transition-transform transform duration-300 ease-in-out">
        <h1 className="text-xl font-bold text-gray-700 mb-2">Orders</h1>
        <p className="text-3xl font-semibold text-blue-500">{orderCount}</p>
      </div>
    </div>
  );
};

export default DashBoard;
