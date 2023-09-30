import { connect } from "@/dbconfig/dbconfig";
import Ride from "@/models/ride";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    console.log(reqBody);
    // Create a new ride instance
    const ride = new Ride(reqBody);

    // Save the ride to the database
    await ride.save();

    return NextResponse.json({
      message: "Ride created successfully",
      success: true,
      ride,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error creating ride:', error);
    return NextResponse.json({ error: "create gayi "+error.message }, { status: 500 });
  }
}
