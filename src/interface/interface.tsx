import mongoose from "mongoose";

export interface Ride {
    _id?: any;
    
    communityId?: string; // Update the property name to match the API response
    owner: string;
    rideName?: string;
    distance: number;
    createdAt?: Date;
    route: string;
    isBooked: boolean;
    acceptedUser?:string;
    // type of object array
    requestedUsers:Array<mongoose.Types.ObjectId>;

  }
  export interface User {
    id: string;
    username: string;
    email: string;
    // Add other user properties as needed
  }
  export interface CommunityData {
    _id: string;
    name: string;
    subtitle: string;
    users: User[]; // Updated to be an array of User objects
  }