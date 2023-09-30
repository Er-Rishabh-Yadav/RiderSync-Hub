import {connect} from "@/dbconfig/dbconfig";
import Ride from "@/models/ride";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest){
    try {
        // Parse the request body to get the rideId and communityId
        const reqbody = await request.json()
        const { rideID,userId} = reqbody;
  
        // Add the rideId to the community's rides array (you should have a Community model)
        // Example: Assuming you have a 'Community' model with a 'rides' array
        const ride = await Ride.findById(rideID);
        console.log(ride)
        if (!ride) {
        //   return res.status(404).json({ error: 'Community not found' });
        return NextResponse.json({error: "Ride not found"}, {status: 404})
        }
  
        // Push the rideId into the community's rides array
        ride.requestedUsers.push(userId);
  
        // Save the updated community
        await ride.save();
  
        // res.status(200).json({ message: 'Ride added to community successfully' });
        return NextResponse.json({message: "Ride added to community successfully"}, {status: 200})
      } catch (error) {
        console.error('Error adding ride to community:', error);
        // res.status(500).json({ error: 'Unable to add ride to community' });
        return NextResponse.json({error: "Unable to request for ride"}, {status: 500})
      }
}