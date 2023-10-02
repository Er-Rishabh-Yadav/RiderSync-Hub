import { connect } from "@/dbconfig/dbconfig";
import Ride from "@/models/ride";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the rideID and userId
    const { rideID, userId } = await request.json();

    // Find the ride by its ID
    const ride = await Ride.findById(rideID);

    if (!ride) {
      return NextResponse.json({ error: "Ride not found" }, { status: 404 });
    }

    // Check if the user has already requested the ride
    const requestedUsers = ride.requestedUsers || [];
    console.log(requestedUsers);
    let isrequestedUser = requestedUsers.find((obj: { _id: { equals: (arg0: any) => any; }; }) => obj._id.equals(userId));
    
    console.log(isrequestedUser);
    if (isrequestedUser) {
      return NextResponse.json(
        true,
        { status: 200 }
        );
    
    }


    // Return a success response
    return NextResponse.json(
      false,
      { status: 200 }
    );
  } catch (error) {
    console.error('Error requesting ride:', error);
    return NextResponse.json(
      { error: "Unable to request for ride" },
      { status: 500 }
    );
  }
}
