import {getDataFromToken} from "@/helpers/getDataFromToken"
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import {connect} from "@/dbconfig/dbconfig";
connect();
export async function GET(request: NextRequest){
    try {
        const id = await getDataFromToken(request)
        const user = await User.findOne({_id: id}).select("-password");
        if(!user){
            console.log("user not found")
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        else{
            console.log("user found")
            const res =  NextResponse.json({message:"User found",user: user})
            
            return res;
        }
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}