import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialValues = {
    name: '',
    description: '',
    price: '',
    category: '',
    available_sizes: [],
    brand: '',
    image_url: '',
    in_stock: '',
    special_offer: '',
    discount: '',
    warranty: '',
    additional_details: ''
  };

  const [editProduct, setEditProduct] = useState(initialValues);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://localhost:3000/item/${id}`);
        setEditProduct(res.data);
        console.log(res.data)
        
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [id]);
console.log(editProduct)
  function handleChange(e) {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault(); 
    try {
      await axios.put(`http://localhost:3000/item/${id}`, editProduct);
      toast.success('Product updated successfully');
      navigate('/admin/editproducts'); 
    } catch (error) {
      console.error(error);
      toast.error('Error updating product');
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={editProduct.name}
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-lg mb-2">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={handleChange}
            value={editProduct.description}
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-lg mb-2">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={handleChange}
            value={editProduct.price}
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image_url" className="block text-lg mb-2">Image URL:</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            onChange={handleChange}
            value={editProduct.image_url}
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-lg mb-2">Category:</label>
          <select
            name="category"
            id="category"
            onChange={handleChange}
            value={editProduct.category}
            className="border border-gray-300 p-2 w-full"
          >
            <option value="">All Products</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
