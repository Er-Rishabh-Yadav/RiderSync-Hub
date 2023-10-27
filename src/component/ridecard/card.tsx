// "use client"
import React, { useEffect, useState } from 'react';
import {Ride , User}  from '@/interface/interface'
import axios from 'axios';
import dynamic from 'next/dynamic';


import Modal from 'react-modal';
interface RideCardProps {
  currentuser:string;
  rideId: string;
  owner: string;
  rideName?: string;
  distance: number;
  route: string;
  isBooked: boolean;
  user?: User;
  isAccepted?: boolean;
  isRequested: boolean;
  isOwner: boolean;
}

const RideCard: React.FC<RideCardProps> = ({
  currentuser,
  rideId,
  owner, 
  rideName, 
  distance,
  route,  
  isBooked, 
  isRequested ,
  isOwner ,  }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [requestedUsers, setRequestedUsers] = useState<Array<string>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [ownername,setownername]=useState<string>("")
 // want to call async function fetch user by id and set the ownername
  useEffect(() => {
    Modal.setAppElement(document.body);
    fetchUsernameById(owner).then((username) => setownername(username));
  }, []);
const handleOpenChatModal = () => {
  setIsChatModalOpen(true);
};

const handleCloseChatModal = () => {
  setIsChatModalOpen(false);
};
  // const [currentowner, setcurrentowner] = useState<User | null>(null);
  const handleRequestRide = () => {
    // Implement your logic to send a ride request here.

    setIsButtonDisabled(true);
    const userId=currentuser; // Replace with the actual userID.
    const rideID = rideId; // Replace with the actual rideID.

    // Make an API request to send the userID and rideID.
    axios.post('/api/ride/requestforride', { userId, rideID })
      .then((response) => {
        // Handle the API response here if needed.
        console.log('Ride request sent successfully', response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails.
        console.error('Error sending ride request', error);
      });
  };
  
  async function fetchUsernameById(userId: string) {
    try {
      const response = await axios.post('/api/getUserById', { userId });
  
      if (response.status !== 200) {
        // Handle the case where the response status is not 200
        console.error('Error fetching user:', response.statusText);
        return null; // Return null to indicate an error
      }
  
      const user = response.data;
      return user.username; // Return the username from the user object
    } catch (error) {
      console.error('Error fetching user:', error);
      return null; // Return null to indicate an error
    }
  }
  
  const handleAcceptRequest = async (username: string,rideID:string) => {
    try {
      const response = await axios.post('/api/ride/acceptRequest', { username,rideID });
      if (response.status === 200) {
        console.log('Request accepted successfully');
      } else {
        console.error('Error accepting request:', response.statusText);
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }

  }
  
  
  const handleSeeRequests = async () => {
    try {
      const response = await axios.post(`/api/ride/requestedUsers`, { rideID: rideId });
      if (response.status === 200) {
        const userIds = response.data;
        console.log(userIds)
        const usernames = await Promise.all(userIds.map((userId: string) => fetchUsernameById(userId)));
        setRequestedUsers(usernames);
        setIsModalOpen(true);
      } else {
        console.error('Error fetching ride requests:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching ride requests:', error);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div>
        <h2 className="text-xl font-semibold">{rideName}</h2>
        <p className="text-gray-500">Owner: {ownername}</p>
        <p className="text-gray-500">Distance: {distance} KM</p>
        <p className="text-gray-500">Route: {route}</p>
      </div>
      <div className="mt-4">
        
        {isOwner && (
          <div>
            <p className="text-green-500">You are the owner of this ride.</p>
          </div>
        )}
        {isRequested && (
          <p className="text-blue-500">Request pending...</p>
        )}
        
        {isBooked && (
          <p className="text-red-500">your ride is booked.</p>
        )}

        

        {
          isOwner && !isBooked && (
            <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2" onClick={handleSeeRequests}>see the requests</button>
          )
        }
        {
          !isOwner && isRequested && (
            <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">cancel the request</button>
          )
        }
        {!isOwner && !isRequested  && !isBooked && (
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
              isButtonDisabled ? 'cursor-not-allowed opacity-5' : 'hover:bg-green-600'
            }`}
            onClick={handleRequestRide}
            disabled={isButtonDisabled}
          >
            Request Ride
          </button>
        )}
        {isBooked && (
          <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-2" onClick={handleOpenChatModal}>
            Chat
          </button>
        )}
         {isChatModalOpen && (
      <Modal isOpen={isChatModalOpen} onRequestClose={handleCloseChatModal}>
       {/* chat model commes here */}
      </Modal>
    )}
         {/* see request model */}
         <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className='modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        overlayClassName='overlay'
      >
        <div className='bg-slate-300 p-5 rounded-xl'>
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="w-full max-w-xs mx-auto ">
            <h2 className="text-2xl font-semibold mb-4">Requested Users</h2>
            <ul className="space-y-2">
              {requestedUsers.map((username, index) => (
                <li key={index} className="flex items-center">
                  <span className="flex-grow">{username}</span>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md mr-1"
                    onClick={() => handleAcceptRequest(username,rideId)}
                  >
                    Accept
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => setIsModalOpen(false)} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-opacity-50 w-full">
              Close
            </button>
          </div>
              </div>
            </div>
          </div>
        </div>
         </Modal>
    </div>
    </div>
  );
};

export default RideCard;
