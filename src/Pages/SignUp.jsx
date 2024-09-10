import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate()
    const [signUpvalue, setSignUpValue] = useState({ name: '', password: '', email: '', confirmPassword: '' })
    const [signUperror, setSignUperror] = useState({ name: '', password: '', email: '', confirmPassword: '' })

    const handlechange = (e) => {
        setSignUpValue({ ...signUpvalue, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (validate()) {
            navigate('/login')
            const { confirmPassword, ...newsignUpvalue } = signUpvalue;
            axios.post('http://localhost:3000/users', newsignUpvalue)
        }
    }

    const validate = () => {
        const error = {};
        if (!signUpvalue.name) {
            error.name = 'Name is required';
        }

        if (!signUpvalue.email) {
            error.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(signUpvalue.email))
            error.email = "Email is invalid"

        if (!signUpvalue.password) {
            error.password = 'Password is required'
        } else if (signUpvalue.password.length < 8) {
            error.password = 'Password should be at least 8 characters long.'
        }

        if (signUpvalue.password !== signUpvalue.confirmPassword)
            error.confirmPassword = "Passwords do not match"
        setSignUperror(error)

        return Object.keys(error).length === 0;

    }

    return (
        <div className="flex items-center justify-center h-[100vh] w-[100vw] absolute top-0 bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-8">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={signUpvalue.name}
                            onChange={handlechange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {signUperror.name && <span className="text-red-500 text-sm">{signUperror.name}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={signUpvalue.email}
                            onChange={handlechange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {signUperror.email && <span className="text-red-500 text-sm">{signUperror.email}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={signUpvalue.password}
                            onChange={handlechange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {signUperror.password && <span className="text-red-500 text-sm">{signUperror.password}</span>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={signUpvalue.confirmPassword}
                            onChange={handlechange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {signUperror.confirmPassword && <span className="text-red-500 text-sm">{signUperror.confirmPassword}</span>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp
