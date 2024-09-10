import axios from 'axios'
import React, { useEffect, useState } from 'react'



export const AdminOrders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(http://localhost:3000/users)
        const orderData = res.data.flatMap(user =>
          user.orders ? user.orders.map(order => ({
            username: user.username,
            name: order.name,
            image: order.image,
            price: order.price,
            id: order.id
          })) : []
        )
        setOrders(orderData)

      } catch (error) {
        console.log(error)
      }

    }
    fetchOrders()

  }, [])
  if (orders.length === 0) {
    return <div>Loading...</div>
  }
  return (
    <div>

      <div className="relative overflow-x-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Orders</h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                image
              </th>
              <th scope="col" className="px-6 py-3">
                price
              </th>
              <th scope="col" className="px-6 py-3">
                Ordered by
              </th>

            </tr>
          </thead>
          <tbody>
            {orders.map(order => (

              <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.id}
                </th>
                <td className="px-6 py-4">
                  {order.name}
                </td>
                <td className="px-6 py-4">
                  <img src={order.image} alt={order.name} className="w-20 h-20 object-cover"></img>

                </td>
                <td className="px-6 py-4">
                  {order.price}
                </td>
                <td classname="px-6 py-4">
                  {order.username}
                </td>


              </tr>

            ))




            }

          </tbody>
        </table>
      </div>



    </div>
  )
}