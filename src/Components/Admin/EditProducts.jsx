import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      const res = await axios.get('http://localhost:3000/item');
      const filteredProducts = category
        ? res.data.filter((item) => item.category === category)
        : res.data;
      setProducts(filteredProducts);
    }
    fetchProducts();
  }, [category]);

  async function handleSearch(e) {
    const query = e.target.value;
    setQuery(query);
    if (!query) {
      return;
    }
    e.preventDefault();
    try {
      const result = await axios.get('http://localhost:3000/item');
      const combinedResult = result.data;
      const filterData = combinedResult.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filterData);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(item) {
    try {
      const updatedItems = products.filter((x) => x.id !== item.id);
      setProducts(updatedItems);
      await axios.delete(`http://localhost:3000/item/${item.id}`);
      toast.success('item deleted')
    } catch (err) {
      console.error('Error deleting product:', err);
      toast.warn('error deleting Product',err)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {category ? category : 'All Products'}
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-between mb-6 space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="w-full lg:w-1/3">
            <label htmlFor="category-select" className="block text-lg font-medium text-gray-700 mb-2">
              Select Category
            </label>
            <select
              name="category"
              id="category-select"
              className="border border-gray-300 rounded-lg w-full p-2"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="w-full lg:w-1/3">
            <input
              type="text"
              placeholder="Search product..."
              className="border border-gray-300 rounded-lg w-full p-2"
              onChange={handleSearch}
              value={query}
            />
          </div>
        </div>

        <div className="overflow-y-auto max-h-80">
          <table className="min-w-full table-fixed border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="sticky top-0 border px-4 py-2 text-gray-600 bg-gray-50">ID</th>
                <th className="sticky top-0 border px-4 py-2 text-gray-600 bg-gray-50">Name</th>
                <th className="sticky top-0 border px-4 py-2 text-gray-600 bg-gray-50">Image</th>
                <th className="sticky top-0 border px-4 py-2 text-gray-600 bg-gray-50">Price</th>
                <th className="sticky top-0 border px-4 py-2 text-gray-600 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition duration-200">
                  <td className="border px-4 py-2 text-center">{item.id}</td>
                  <td className="border px-4 py-2 text-center">{item.name}</td>
                  <td className="border px-4 py-2 text-center">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-16 w-16 object-cover mx-auto rounded-lg shadow-md"
                    />
                  </td>
                  <td className="border px-4 py-2 text-center text-green-600 font-semibold">
                    ${item.price}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <Link to={`/admin/editproducts/${item.id}`}>
                      <button className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-2 hover:bg-blue-700">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item)}
                      className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
