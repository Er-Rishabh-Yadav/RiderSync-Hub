import {connect} from "@/dbconfig/dbconfig";
import Community from "@/models/community";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest){
    try {
        // Parse the request body to get the rideId and communityId
        const reqbody = await request.json()
        const { rideId,communityId} = reqbody;
  
        // Add the rideId to the community's rides array (you should have a Community model)
        // Example: Assuming you have a 'Community' model with a 'rides' array
        const community = await Community.findById(communityId);
        if (!community) {
        //   return res.status(404).json({ error: 'Community not found' });
        return NextResponse.json({error: "Community not found"}, {status: 404})
        }
  
        // Push the rideId into the community's rides array
        community.rides.push(rideId);
  
        // Save the updated community
        await community.save();
  
        // res.status(200).json({ message: 'Ride added to community successfully' });
        return NextResponse.json({message: "Ride added to community successfully"}, {status: 200})
      } catch (error) {
        console.error('Error adding ride to community:', error);
        // res.status(500).json({ error: 'Unable to add ride to community' });
        return NextResponse.json({error: "Unable to add ride to community"}, {status: 500})
      }
}