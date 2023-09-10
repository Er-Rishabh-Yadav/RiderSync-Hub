import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const QUERY_TIMEOUT = 15000;

connect()
export async function POST(request: NextRequest){
    try{
        const reqbody = await request.json()
        const {username, password} = reqbody
        console.log(reqbody);
        const user = await  User.findOne({username: username}).maxTimeMS(QUERY_TIMEOUT);
            if(!username || !password){
                return NextResponse.json({error: "Please fill all the fields"}, {status: 400})
            }
            else{

                //check if user exists
                if(!user){
                return NextResponse.json({error: "User does not exist"}, {status: 404})
                 }
                //  if(!user.isVerfied){
                //     return NextResponse.json({error: "Please verify your email"}, {status: 401})
                //  }
                else{
                //check if password is correct
                const validPassword = await bcryptjs.compare(password, user.password)
                if(!validPassword){
                    return NextResponse.json({error: "Invalid password"}, {status: 401})
                }
            
                console.log(user)
            //create and assign token
            
            const tokenData={
                id: user._id,
                username: user.username,
                email: user.email
            }
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn: "1d"})
        
           const response = NextResponse.json({message: "Logged in successfully",success: true}, {status: 200});
           response.cookies.set("token", token, {httpOnly: true,})
        
           return response;
        }
    }
}

    
    catch(error:any){
        console.log(error)
        return NextResponse.json({error: error.message},{status : 500})
    }
}