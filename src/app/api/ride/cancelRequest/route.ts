// pages/api/cancelRideRequest.js

import { connect } from "@/dbconfig/dbconfig";
import Ride from "@/models/ride";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the rideId and userId
    const reqBody = await request.json();
    const { rideID, userId } = reqBody;

    // Find the ride by its ID
    console.log(rideID);
    const ride = await Ride.findById(rideID);
    console.log(ride);

    if (!ride) {
      console.error('Ride not found for ID:', rideID);
      return NextResponse.json({ error: "Ride not found" }, { status: 404 });
    }

    // Check if the user has requested the ride
    if (ride.requestedUsers.includes(userId)) {
      // Remove the user from the requestedUsers array
      ride.requestedUsers = ride.requestedUsers.filter((id: any) => id !== userId);

      // Save the updated ride
      await ride.save();

      return NextResponse.json(
        { message: "Ride request canceled successfully" },
        { status: 200 }
      );
    } else {
      console.error('User has not requested this ride:', userId);
      return NextResponse.json(
        { error: "User has not requested this ride" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error canceling ride request:', error);
    return NextResponse.json(
      { error: "Unable to cancel ride request" },
      { status: 500 }
    );
  }
}
