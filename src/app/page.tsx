"use client";

export default function Home() {
  return (
  <div className="min-h-screen bg-[#1e293b] py-10">
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
      <div className="absolute inset-0 bg-gradient-to-r from-[#b469ff] to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl">
      </div>

      <div className="relative px-4 py-20 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div>
            <img src="/logo-full.png" className="h-20 sm:h-15" />
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <p>
              RiderSync Hub is your all-in-one platform for connecting with local travel enthusiasts who are planning trips to the same destination, regardless of their chosen mode of transportation.
              </p>
              <ul className="list-disc space-y-2">
                <h2 className="font-bold">Key Feature: </h2>
                <li className="flex items-start">
                  <span className="h-6 flex items-center sm:h-7">
                   <img src="/bycicle.png" className="h-6 w-6" />
                  </span>
                  <p className="ml-2">
                    <code className="text-sm font-bold text-gray-900">Route Sharing</code>
                  </p>
                </li> 
                <li className="flex items-start">
                  <span className="h-6 flex items-center sm:h-7">
                   <img src="/bycicle.png" className="h-6 w-6" />
                  </span>
                  <p className="ml-2">
                    <code className="text-sm font-bold text-gray-900">Cost Sharing</code> 
                  </p>
                </li> 
                <li className="flex items-start">
                  <span className="h-6 flex items-center sm:h-7">
                   <img src="/bycicle.png" className="h-6 w-6" />
                  </span>
                  <p className="ml-2">
                    
                    <code className="text-sm font-bold text-gray-900">Community Support</code> 
                  </p>
                </li> 
                
                <li className="flex items-start">
                  <span className="h-6 flex items-center sm:h-7">
                   <img src="/bycicle.png" className="h-6 w-6" />
                  </span>
                  <p className="ml-2">
                    
                    <code className="text-sm font-bold text-gray-900">Safety First</code> 
                  </p>
                </li> 
              </ul>
              <p>
              RiderSync Hub brings the community together for shared adventures and cost-effective journeys.
              </p>  
            </div>
            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
              <p>Are you ready to Join the Ride?</p>
              <p>
                <a href="#" className="text-blue-500 hover:text-blue-600">Get started</a>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>


   
  </div>
  );
}