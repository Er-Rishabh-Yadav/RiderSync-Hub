"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useSearchParams } from 'next/navigation'; // Import from 'next/router' instead of 'next/navigation'

interface Ride {
  community: string; // Update the property name to match the API response
  user: string;
  distance: number;
  createdAt: Date;
  remarks?: string;
}

function CommunityRides() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const data = searchParams.get('search');

  const [newRide, setNewRide] = useState({
    community: data,
    user: '', // Initialize user as an empty string
    distance: 0,
    remarks: '',
  });

  useEffect(() => {
    Modal.setAppElement(document.body);

    // Fetch user data and then fetch rides
    getuser()
      .then(() => fetchRides())
      .catch((error) => console.error('Error fetching user:', error));
  }, [data]);

  const getuser = async () => {
    try {
      const response = await axios.get('/api/auth/getuser');
      console.log(response.data.user)
      const userId = response.data.user._id;
      setNewRide({ ...newRide, user: userId });
      console.log('user id ' + userId);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchRides = async() => {
   await axios.get(`/api/ride/getrides`)
  .then(response => {
    const rides = response.data.rides;
    console.log(rides);
    const filteredRides = rides.filter((ride:Ride) => ride.community === data);

    console.log(filteredRides);
    setRides(filteredRides)
    // set the rides which is in the data community
    //need to traverse the array and check if the community is the same as the data
    //if it is the same then set the rides

  })
  .catch(error => {
    console.error('Error fetching rides:', error);
  });
  }
   
  
  const createRide = () => {
    axios
      .post('api/ride/create', newRide)
      .then((response) => {
        // After creating the ride, update the community's rides array with the new ride ID
        const rideId = response.data._id;
        axios
          .post(`api/community/addride`, { rideId:rideId , communityId: data})
          .then(() => {
            // Close the modal and refetch the rides
            setIsModalOpen(false);
            fetchRides();
          })
          .catch((error) => console.error('Error adding ride to community:', error));
      })
      .catch((error) => console.error('Error creating ride:', error));
  };
  
  return (
    <div className='min-h-screen bg-[#1e293b] p-8'>
      <h1 className='text-3xl text-white mb-4'>Community Rides</h1>

      {/* Button to open the modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50'
      >
        Create Ride
      </button>

      {/* List of rides */}
      <ul>
         
       {rides.map((ride, index) => (
          <li key={index} className='text-white mb-2'>
            <span className='font-bold'>User:</span> {ride.user} <br />
            <span className='font-bold'>Distance:</span> {ride.distance} km <br />
            <span className='font-bold'>Remarks:</span> {ride.remarks} <br />
          </li>
        ))} 
      </ul>

      {/* Modal */}
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
          <label className="block text-sm font-medium" htmlFor='remarks'>Remarks:</label>
          <textarea
                id='remarks'
                name='remarks'
                value={newRide.remarks}
                onChange={(e) => setNewRide({ ...newRide, remarks: e.target.value })}
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
