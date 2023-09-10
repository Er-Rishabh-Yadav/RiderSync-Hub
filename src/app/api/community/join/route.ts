import {connect} from "@/dbconfig/dbconfig";
import Community from "@/models/community";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest){
    try {
        const reqbody = await request.json()
        const { id, myid } = reqbody;
    
        const community = await Community.findById(id);
        if (!community) {
        //   return res.status(404).json({ error: 'Community not found' });
        return NextResponse.json({error:'Community not Found'},{status:400});
        
        
        }
    
        const user = await User.findById(myid);
        if (!user) {
        //   return res.status(404).json({ error: 'User not found' });
        return NextResponse.json({error:'Community not Found'},{status:400});
        }
    
        community.users.push(user._id);
        await community.save();
    
        return  NextResponse.json({ message: 'User added to community successfully' },{status:200});
      } catch (error) {
        return NextResponse.json({ error: 'An error occurred while adding the user to the community' },{status:500});
      }
    }
