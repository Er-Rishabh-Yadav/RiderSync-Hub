import { connect } from "@/dbconfig/dbconfig";
import Ride from "@/models/ride";
import User from "@/models/userModels"
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the rideID and userId
    const { username,rideID } = await request.json();

    // Find the ride by its ID
    const ride = await Ride.findById(rideID);

    if (!ride) {
      return NextResponse.json({ error: "Ride not found" }, { status: 404 });
    }
    const user = await User.findOne({username : username})
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // Check if the user has already requested the ride
    const requestedUsers = ride.requestedUsers || [];
    console.log(requestedUsers);
    let isrequestedUser = requestedUsers.find((obj: { _id: { equals: (arg0: any) => any; }; }) => obj._id.equals(user._id));
    
    console.log(isrequestedUser);
    if (isrequestedUser) {
        // find the userId using the username
      
        //  acceptedUser is assign to userid
        ride.acceptedUser = user._id;
        // empty the requestedUsers array
        ride.requestedUsers = [];
        // isBooked is set to true
        ride.isBooked=true;
        // save the ride 
        await ride.save();
      return NextResponse.json(
        { message: "User already requested for ride" },
        { status: 200 }
      );
    }



    // Return a success response
    return NextResponse.json(
      { message: "Request not found" },
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
