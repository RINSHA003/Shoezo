import React, { useContext, useEffect, useState } from "react";
import { Mycontext } from "../../App";
import { userAPI } from "../../API/API";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import Cart from "../Cart/Cart";

const validationSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  postalCode: yup
    .string()
    .required("Postal code is required")
    .min(6, "Minimum 6 digits required")
    .max(6, "Maximum 6 digits"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .min(10, "Minimum 10 digits required")
    .max(10, "Maximum 10 digits"),
  paymentMethod: yup.string().required("Payment method is required"),
});

const Payment = () => {
  const { cartfetch, setCartfetch } = useContext(Mycontext);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const totalAmount = cartfetch.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, [cartfetch]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("id");
        const res = await axios.get(`${userAPI}/${userId}`);
        setOrders(res.data.orders || []);
      } catch (error) {
        console.log("Failed to fetch data: " + error);
      }
    };
    fetchOrders();
  }, []);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phoneNumber: "",
      paymentMethod: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const orderid = "order_" + Date.now();

      const newOrder = {
        orderid,
        shippingDetails: {
          fullName: values.fullName,
          address: values.address,
          city: values.city,
          postalCode: values.postalCode,
          phoneNumber: values.phoneNumber,
          paymentMethod: values.paymentMethod,
        },
        orderItems: cartfetch.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image_url: item.image_url,
        })),
        totalPrice: total,
      };

      try {
        const userId = localStorage.getItem("id");
        const userRes = await axios.get(`${userAPI}/${userId}`);
        const currentUser = userRes.data;
        const updatedOrders = [...(currentUser.orders || []), newOrder];

        await axios.patch(`${userAPI}/${userId}`, {
          orders: updatedOrders,
          cart: [],
        });

        setOrders(updatedOrders);
        setCartfetch([]);

        toast.success("Order placed successfully");
        formik.resetForm();
      } catch (error) {
        console.log(error);
        toast.error("Cannot place the order");
      }
    },
  });

  return (
    <div className="bg-gray-100 p-4 md:p-8 lg:p-16 flex flex-col lg:flex-row gap-8">
      {/* Form Section */}
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout Form</h1>
        <form
          className="bg-white shadow-lg p-6 space-y-6"
          onSubmit={formik.handleSubmit}
        >
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block font-semibold">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your full name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 text-sm">
                {formik.errors.fullName}
              </div>
            )}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block font-semibold">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500 text-sm">
                {formik.errors.address}
              </div>
            )}
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block font-semibold">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city && (
              <div className="text-red-500 text-sm">{formik.errors.city}</div>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label htmlFor="postalCode" className="block font-semibold">
              Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="number"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your postal code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.postalCode}
            />
            {formik.touched.postalCode && formik.errors.postalCode && (
              <div className="text-red-500 text-sm">
                {formik.errors.postalCode}
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block font-semibold">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="number"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <div className="text-red-500 text-sm">
                {formik.errors.phoneNumber}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="flex flex-col gap-4">
            <span className="block font-semibold">Payment Options:</span>
            <div>
              <input
                id="paymentUpi"
                name="paymentMethod"
                type="radio"
                value="UPI"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.paymentMethod === "UPI"}
              />
              <label htmlFor="paymentUpi" className="ml-2">
                UPI
              </label>
            </div>
            <div>
              <input
                id="paymentCard"
                name="paymentMethod"
                type="radio"
                value="Card"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.paymentMethod === "Card"}
              />
              <label htmlFor="paymentCard" className="ml-2">
                Credit/Debit Card
              </label>
            </div>
            <div>
              <input
                id="paymentCash"
                name="paymentMethod"
                type="radio"
                value="Cash"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.paymentMethod === "Cash"}
              />
              <label htmlFor="paymentCash" className="ml-2">
                Cash on Delivery
              </label>
            </div>
            {formik.touched.paymentMethod && formik.errors.paymentMethod && (
              <div className="text-red-500 text-sm">
                {formik.errors.paymentMethod}
              </div>
            )}
          </div>

          <div className="text-xl font-bold mt-6">
            Total: ${total.toFixed(2)}
          </div>

          <button
            type="submit"
            className="w-full border-2 border-gray-400 shadow-lg py-2 font-semibold"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Cart and Orders Section */}
      <div className="flex-1 p-8 bg-gray-50 min-h-full">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

          {cartfetch.length > 0 ? (
            cartfetch.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 mb-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <div className="w-1/4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>

                <div className="w-3/4 flex flex-col items-start justify-center px-4">
                  <div className="text-lg font-semibold">{item.name}</div>
                  <div className="text-gray-600">Quantity: {item.quantity}</div>
                  <div className="text-gray-600">Price: ${item.price}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">Your cart is empty</div>
          )}

          <div className="text-xl font-bold mt-6 text-right">
            Total: ${total.toFixed(2)}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md  mx-auto">
  <h2 className="text-2xl text-center font-bold mb-4 mt-10">Order Summary</h2>

  {orders.length > 0 ? (
    (() => {
      const lastOrder = orders[orders.length - 1];
      return (
        <div key={lastOrder.orderid} className="p-4 mb-4 rounded-lg">
          <h3 className=" font-semibold mb-2">
            Order ID: {lastOrder.orderid}
          </h3>
          <div className="mb-4">
            <p>
              <strong>Full Name:</strong> {lastOrder.shippingDetails.fullName}
            </p>
            <p>
              <strong>Address:</strong> {lastOrder.shippingDetails.address},{" "}
              {lastOrder.shippingDetails.city},{" "}
              {lastOrder.shippingDetails.postalCode}
            </p>
            <p>
              <strong>Phone Number:</strong>{" "}
              {lastOrder.shippingDetails.phoneNumber}
            </p>
            <p>
              <strong>Payment Method:</strong>{" "}
              {lastOrder.shippingDetails.paymentMethod}
            </p>
          </div>
          <h4 className="text-lg font-semibold mb-2">Items:</h4>
          {lastOrder.orderItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <p>{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold">${item.price.toFixed(2)}</p>
            </div>
          ))}
          <div className="text-right font-bold text-lg">
            Total Price: ${lastOrder.totalPrice.toFixed(2)}
          </div>
        </div>
      );
    })()
  ) : (
    <p className="text-gray-500">No orders found.</p>
  )}
</div>

      </div>
    </div>
  );
};

export default Payment;
