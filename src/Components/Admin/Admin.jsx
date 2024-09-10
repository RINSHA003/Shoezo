import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { userAPI } from '../../API/API';
import axios from 'axios';

const Admin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    async function fetchuser(){
      const userid=localStorage.getItem("id")
      if(!userid){
        navigate('/login')
      }
      else{
        try{
          const res=await axios.get(`${userAPI}/${userid}`)
          if(res.data?.admin===true){
            setIsAdmin(true)
          }
          else{
            navigate('/login')
          }   
      }

      catch(error){
        console.log(error)
        navigate('/')
      }

      }
    }
    fetchuser()
  },[navigate])

  const data = [
    { title: 'Dashboard', url: 'dashboard' },
    { title: 'All-users', url: 'allusers' },
    { title: 'Add-Products', url: 'addproducts' },
    { title: 'Edit-Products', url: 'editproducts' },
    { title: 'Orders', url: 'orders' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('id');
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-700 text-white flex flex-col p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        {data.map((item, ind) => (
          <Link
            key={ind}
            to={`/admin/${item.url}`}
            onClick={() => setIsOpen(false)}
            className="p-3 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            {item.title}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="mt-auto px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
