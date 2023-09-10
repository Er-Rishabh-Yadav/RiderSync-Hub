import { connect } from "@/dbconfig/dbconfig";
import Community from "@/models/community";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

// Adjust the timeout value (in milliseconds) as needed
const QUERY_TIMEOUT = 15000; // 15 seconds

connect();

export async function GET(request: NextRequest) {
  try {
    const communities = await Community.find({}).maxTimeMS(QUERY_TIMEOUT);

    if (!communities || communities.length === 0) {
      console.log("No communities found");
      return NextResponse.json(
        { error: "No communities found in the database." },
        { status: 404 }
      );
    }

    const id = await getDataFromToken(request);
    const res = NextResponse.json({
      message: "Communities found",
      communities: communities,
      myid: id,
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
