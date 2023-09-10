import {connect} from "@/dbconfig/dbconfig";
import Ride from "@/models/ride";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest){
    try {
        // Parse the request body
        const reqbody = await request.json()
        const { community, user, distance, remarks } = reqbody;
        const createdAt= new Date();
        // Create a new ride instance
        const ride = new Ride({
          community,
          user,
          distance,
          createdAt, // Convert createdAt to a Date object
          remarks,
        });
  
        // Save the ride to the database
        await ride.save();
        return NextResponse.json({message: "Ride created successfully",success: true, ride}, {status: 200});
        // res.status(201).json(ride); // Respond with the created ride
      } catch (error:any) {
        console.error('Error creating ride:', error);
        // res.status(500).json({ error: 'Unable to create ride.' });
        return NextResponse.json({error: error.message},{status : 500})
      }
}