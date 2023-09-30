// "use client"
import React, { useEffect, useState } from 'react';
import {Ride , User}  from '@/interface/interface'
// import axios from 'axios';

interface RideCardProps {
  owner: string;
  rideName?: string;
  distance: number;
  route: string;
  isBooked: boolean;
  user?: User;
  isAccepted: boolean;
  isRequested: boolean;
  isOwner: boolean;
}

const RideCard: React.FC<RideCardProps> = ({
  owner, 
  rideName, 
  distance,
  route,  
  isBooked, 
  isAccepted  ,
  isRequested ,
  isOwner ,  }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // const [currentowner, setcurrentowner] = useState<User | null>(null);
  const handleRequestRide = () => {
    // Implement your logic to send a ride request here.

    setIsButtonDisabled(true);
  };

  

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div>
        <h2 className="text-xl font-semibold">{rideName}</h2>
        <p className="text-gray-500">Owner: {owner}</p>
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
        {isAccepted && (
          <p className="text-blue-500">Ride accepted. Chat with the owner.</p>
        )}
        {isBooked && (
          <p className="text-red-500">Ride is booked.</p>
        )}

        

        {
          isOwner && !isBooked && (
            <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">see the requests</button>
          )
        }
        {
          !isOwner && isRequested && (
            <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">cancel the request</button>
          )
        }
        {!isOwner && !isRequested && !isAccepted && !isBooked && (
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
        {isAccepted && (
          <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">
            Chat
          </button>
        )}
      </div>
    </div>
  );
};

export default RideCard;
