import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { userAPI } from '../../API/API';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(userAPI);
        setUsers(res.data.filter((user) => user.admin !== true));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUser();
  }, []);

  async function handleBlock(userid) {
    try {
      await axios.patch(`${userAPI}/${userid}`, { block: true });
      toast.success('User blocked');
      setUsers(users.map((user) => user.id === userid ? { ...user, block: true } : user));
    } catch (error) {
      console.error('Error blocking user:', error);
      toast.error('Failed to block user');
    }
  }

  async function handleUnblock(userid) {
    try {
      await axios.patch(`${userAPI}/${userid}`, { block: false });
      toast.success('User unblocked');
      setUsers(users.map((user) => user.id === userid ? { ...user, block: false } : user));
    } catch (error) {
      console.error('Error unblocking user:', error);
      toast.error('Failed to unblock user');
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Users</h2>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Id</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
              <th className="border px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">
                  {item.block ? (
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleUnblock(item.id)}
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => handleBlock(item.id)}
                    >
                      Block
                    </button>
                  )}
                </td>
                <td className="border px-4 py-2">
                  <Link to={`/admin/allusers/${item.id}`}>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                      See More
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
