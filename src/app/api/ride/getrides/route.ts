import { connect } from "@/dbconfig/dbconfig";
import Ride from "@/models/ride";
import { NextRequest, NextResponse } from "next/server";

// Adjust the timeout value (in milliseconds) as needed
const QUERY_TIMEOUT = 15000; // 15 seconds

connect();

export async function GET(request: NextRequest) {
  try {
    const rides = await Ride.find({}).maxTimeMS(QUERY_TIMEOUT);

    if (!rides || rides.length === 0) {
      console.log("No Rides find");
      return NextResponse.json(
        { error: "No Ride find" },
        { status: 404 }
      );
    }

    const res = NextResponse.json({
      message: "Rides found",
      rides: rides,
  
    });

    return res;
  } catch (error: any) {
    // Handle timeout error specifically
    if (error.code === 50) {
      return NextResponse.json(
        { error: "Database query timed out." },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
