// pages/api/getRequestedUsers.js

import { connect } from "@/dbconfig/dbconfig";
import Ride from "@/models/ride";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    // Get the ride ID from the query parameters
    const { rideID } = await request.json();

    // Find the ride by its ID
    console.log(rideID);
    const ride = await Ride.findById(rideID);
    console.log(ride);

    if (!ride) {
      console.error('Ride not found for ID:', rideID);
      return NextResponse.json({ error: "Ride not found" }, { status: 404 });
    }

    // Extract the requestedUsers array from the ride
    const requestedUsers = ride.requestedUsers || [];
    console.log("requested users "+requestedUsers)
    // const requestedUserIds = requestedUsers.map((user: { toString: () => any; }) => user.toString());
    return NextResponse.json(requestedUsers, { status: 200 });
  } catch (error) {
    console.error('Error fetching requested users:', error);
    return NextResponse.json(
      { error: "Unable to fetch requested users" },
      { status: 500 }
    );
  }
}
