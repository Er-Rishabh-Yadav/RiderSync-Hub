"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useSearchParams } from 'next/navigation';
import { User } from '@/interface/interface';
import RideCard from '@/component/ridecard/card';
import { Ride } from '@/interface/interface';

import mongoose from 'mongoose';

function CommunityRides() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const data = searchParams.get('search');
  const [currentUser, setCurrentUser] = useState<User>({ id: '', username: '', email: '' });

  const initialAddRideField = {
    isBooked: false,
    isAccepted: false,
    isRequested: false,
    isOwner: false,
  };

  const [addRideField, setAddRideField] = useState(initialAddRideField);

  const [newRide, setNewRide] = useState<Ride>({
    communityId: data || '',
    owner: '', // Owner will be set later
    distance: 0,
    route: '',
    isBooked: false,
    requestedUsers: [],
  });

  useEffect(() => {
    Modal.setAppElement(document.body);

    // Fetch user data and then fetch rides
    getUser()
      .then(() => fetchRides())
      .catch((error) => console.error('Error fetching user:', error));
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get('/api/auth/getuser');
      const userId = response.data.user._id;
      const username = response.data.user.username;
      const email = response.data.user.email;
      setCurrentUser({ id: userId, username, email });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchRides = async () => {
    try {
      const response = await axios.get('/api/ride/getrides');
      const rides = response.data.rides;
      console.log(rides)
      const filteredRides = rides.filter((ride: Ride) => ride.communityId === data);
      setRides(filteredRides);
    } catch (error) {
      console.error('Error fetching rides:', error);
    }
  };

  const createRide = async () => {
    try {
      // Ensure you have a valid communityId and owner
      const communityId = data || ''; // Use your logic to obtain the communityId
      const owner = currentUser.id || ''; // Use your logic to obtain the owner
  
      // Update the newRide object with valid values
      const updatedNewRide = {
        ...newRide,
        communityId,
        owner,
      };
  
      // Create the ride
      const createRideResponse = await axios.post('/api/ride/create', updatedNewRide);
      const rideId = createRideResponse.data.ride._id;
  
      // Reset newRide values
      setNewRide({ ...newRide, distance: 0, route: '' });
  
      // Add the ride to the community
      await axios.post('/api/community/addride', { rideId, communityId });
  
      // Close the modal and refresh rides
      setIsModalOpen(false);
      fetchRides();
    } catch (error) {
      console.error('Error:', error);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  };
  
// const isRequested =  (rideId: string, userId: string) => {
  
//   try {
//     const response =  axios.post('/api/ride/isRequested', { rideId,userId });

//     if (response.status !== 200) {
//       // Handle the case where the response status is not 200
//       console.error('Error fetching user:', response.statusText);
//       return null; // Return null to indicate an error
//     }
//     console.log(response.data)
//      return response.data;
//     // Return the username from the user object
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return null; // Return null to indicate an error
//   }
// }
  function calculateRideStatus(ride: Ride, currentUser: User) {
    let isOwner = false;
    let isBooked = false;
    let isAccepted = false;
    let isRequested = false;

    // Check if the user has already requested the ride
    const requestedUsers = ride.requestedUsers || [];
    console.log(requestedUsers);

    if (ride.owner === currentUser.id) {
      isOwner = true;
    } else if (ride.isBooked) {
      isBooked = true;
    } else if (ride.acceptedUser && ride.acceptedUser.includes(currentUser.id)) {
      isAccepted = true;
    } else if (isRequested) {
     
      console.log("you are requested")
    }

    return { isOwner, isBooked, isAccepted, isRequested };
  }
  

  return (
    <div className='min-h-screen bg-[#1e293b] p-8'>
      <h1 className='text-3xl text-white mb-4'>Community Rides</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50'
      >
        Create Ride
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {rides.length !== 0 ? (
    rides.map((ride, index) => {
      const rideStatus = calculateRideStatus(ride,currentUser);
      // setAddRideField(rideStatus);
      console.log(ride._id)

      return (
        <div key={index} className="rounded-lg shadow-md bg-gray-800 p-4">
          <RideCard
            rideId={ride._id}
            currentuser={currentUser.id}
            owner={ride.owner}
            distance={ride.distance}
            isAccepted={rideStatus.isAccepted}
            isRequested={rideStatus.isRequested}
            isOwner={rideStatus.isOwner} 
            route={ride.route}
            isBooked={rideStatus.isBooked} 
          />
        </div>
      );
    })
  ) : (
    <p className="text-white col-span-full">No rides found.</p>
  )}
</div>




      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className='modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        overlayClassName='overlay'
      >
           <div className=' bg-slate-300 p-5 rounded-xl'>
          
          <div className="max-w-md mx-auto">
          
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                 <div className="w-full max-w-xs mx-auto ">
      <h2 className="text-2xl font-semibold mb-4">Create Ride</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor='distance'>Distance (km):</label>
          <input
		
                type='number'
                id='distance'
                name='distance'
                value={newRide.distance}
                onChange={(e) => setNewRide({ ...newRide, distance: parseFloat(e.target.value) })}
            className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor='route'>Route:</label>
          <textarea
                id='route'
                name='route'
                value={newRide.route}
                onChange={(e) => setNewRide({ ...newRide, route: e.target.value })}
            className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
        <div className='flex flex-row'>

        <button
          type="button"
          onClick={createRide}
          className="w-full bg-blue-500 text-white m-5 py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50"
          >
          Create Ride
        </button>
	       <button type='button' onClick={() => setIsModalOpen(false)}
        className="w-full bg-red-500 text-white py-2 px-4 m-5 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-opacity-50">
              Close
         </button>
    </div>
      </form>
      
      {/* <ToastContainer /> */}
    </div>
    </div>
    </div>
    </div>
        </div>
      </Modal>
    </div>
  );
}

export default CommunityRides;
