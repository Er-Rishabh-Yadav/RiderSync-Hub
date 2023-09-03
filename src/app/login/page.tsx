"use client";

import { useState } from "react";
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { useRouter} from "next/navigation"
export default function Login() {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const route = useRouter();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
    if(username === 'admin' && password === 'admin'){
        route.push('/');
        toast.success('Login success.',{
            position: "bottom-right",
            autoClose: 8000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
    }
    else{
        toast.error('Login failed.',{
            position: "bottom-right",
            autoClose: 8000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      // Handle successful login, like storing a token in local storage or state
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error, display a message to the user, etc.
      
      toast.error('Login failed.',{
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    });
    }
  };    
  return (
  <div className="min-h-screen bg-[#1e293b] py-10">
    <div className="m-5">

     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* imagee logo */}
      
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          <span className="block">Welcome to</span>
          <span className="block text-indigo-500">RiderSync Hub</span>
        </h1> 
        </div>
    </div>
    {/* header */}
    <div className="relative py-10 sm:max-w-xl sm:mx-auto">
      <div className="absolute  inset-0 bg-gradient-to-r from-[#b469ff] to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl">
      </div>

      <div className="relative rounded-3xl px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div>
            <img src="/logo-full.png" className="h-20 sm:h-15" />
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                 <div className="w-full max-w-xs mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Username</label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50"
        >
          Login
        </button>
      </form>
      
      <ToastContainer />
    </div>
            </div>
            <div className="pt-6 text-base text-center leading-6 font-bold sm:text-lg sm:leading-7">
              <p>
                
              <a href="/register" className="text-gray-500 hover:text-gray-600">Are You Want to Create An Account?</a>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
</div>

   
  </div>
  );
}