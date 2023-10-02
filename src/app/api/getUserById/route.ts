// pages/api/getRequestedUser.js

import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
  try {
    // Get the user ID from the request body
    const { userId } = await request.json();

    // Find the user by its ID
    console.log(`Fetching user with ID: ${userId}`);
    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      console.error('User not found for ID:', userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the found user as JSON response
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: "Unable to fetch user" },
      { status: 500 }
    );
  }
}
