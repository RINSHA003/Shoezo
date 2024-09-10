import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { userAPI } from '../../API/API';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);  
  
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${userAPI}/${id}`);  
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
    fetchUser();
  }, [id]);  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 " >
      {user ? (  
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">User {user.id}</h2>
          <table className="table-auto overflow-hidden  border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Password</th> 
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">********</td> 
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading user details...</p>  
      )}
    </div>
  );
};

export default UserDetails;


