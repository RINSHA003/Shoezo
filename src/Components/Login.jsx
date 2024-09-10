import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [Loginvalue, setLoginValue] = useState({ username: '', password: '' });
    const [Loginerror, setLoginError] = useState({ username: '', password: '' });

    function handlechange(e) {
        setLoginValue({ ...Loginvalue, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const validation = {};
        try {
            const response = await axios.get('http://localhost:3000/users');
            const user = response.data.find((user) => user.name === Loginvalue.username);

            if (user) {

                if(user.block){
                    toast.warn('account is blocked')
                }
                 else if (user.password === Loginvalue.password) {
                    toast.success('Login successfully');
                    localStorage.setItem('id', user.id);
                    localStorage.setItem('name', user.name); 
                    localStorage.setItem('admin',user.admin)
                    localStorage.setItem('block',user.block)
                    if(user.admin){
                        navigate('/admin')
                    }else{
                        navigate('/');
                    } 
                } else {
                    validation.password = 'Incorrect password';
                    toast.warning('Incorrect password');
                }
            }
             else {
                validation.userName = 'Incorrect username';
                toast.warning('Incorrect username');
            }
        } catch (err) {
            toast.error('Error: ' + err.message);
        }
        setLoginError(validation);
    }

    return (
        <div className="flex items-center justify-center  h-[100vh] w-[100vw] top-0 absolute bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={Loginvalue.username}
                            onChange={handlechange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {Loginerror.username && <span className="text-red-500 text-sm">{Loginerror.username}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor='password' className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={Loginvalue.password}
                            onChange={handlechange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {Loginerror.password && <span className="text-red-500 text-sm">{Loginerror.password}</span>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">Don't have an account? <Link to='/signup' className="text-indigo-600 hover:text-indigo-800">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;
