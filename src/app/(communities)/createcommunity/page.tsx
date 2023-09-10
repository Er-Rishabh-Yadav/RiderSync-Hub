"use client";
import React ,{useEffect, useState } from "react";
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter} from "next/navigation"
export default function CommunityPage() {
 const [name,setname]=useState('');
 const [subtitle,setsubtitle]=useState('');

const route = useRouter()
const toastOptions :any= {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
}; 
 const handleSubmit = async (e:any) => {
  e.preventDefault();

  try {
    
    const comm = {
      name : name,
      subtitle:subtitle
    }
      await axios.post("/api/community/create", comm).then((res:any) => {
          console.log(res.data);
          toast.success("You build it.",toastOptions)
          route.push("/communities")
          
      }).catch((err) => {
          console.log(err.response.data.error)
          toast.error(err.response.data.error)
      })
      // .finally(() => {
      // setLoading(false)
      // })
// Handle successful login, like storing a token in local storage or state
} 
  catch (error) {
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
          <span className="block">Create Your Rider Community </span>
          <span className="block text-indigo-500">With RiderSync Hub</span>
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
      <h2 className="text-2xl font-semibold mb-4">CREATE YOUR COMMUNITY</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Community Name</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Punch Line</label>
          <input
            type="subtitle"
            value={subtitle}
            onChange={(e) => setsubtitle(e.target.value)}
            className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-opacity-50"
        >
         Build it
        </button>
      </form>
      
      <ToastContainer />
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

   
  </div>
  )
}
