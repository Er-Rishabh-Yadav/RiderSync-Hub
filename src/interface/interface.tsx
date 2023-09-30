export interface Ride {
    communityId?: string; // Update the property name to match the API response
    owner: string;
    rideName?: string;
    distance: number;
    createdAt?: Date;
    route: string;
    isBooked: boolean;
    acceptedUser?:string;
    requestedUsers:string[];

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