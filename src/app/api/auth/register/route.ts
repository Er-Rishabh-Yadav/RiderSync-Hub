import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect()

export async function POST(request: NextRequest){
    try{
        const reqbody = await request.json()
        const {username, email, password} = reqbody
        console.log(reqbody);
        console.log(username, email, password)
        if(!username || !email || !password){
            return NextResponse.json({error: "Please fill all the fields"}, {status: 400})
        }
        else{
            const user = await User.findOne({email: email});
            if(user){
                return NextResponse.json({error: "User already exists"}, {status: 400})
            }
            //hash password
            const salt = await bcryptjs.genSalt(10);
            const hashPassword = await bcryptjs.hash(password, salt);
            const newUser = new User({
                username,
                email,
                password: hashPassword
            })
            const saveduser = await newUser.save()
            console.log("From Sigup Api",saveduser)
            return NextResponse.json({message: "User created successfully",success: true, saveduser}, {status: 200});
        }
    }
    catch(error:any){
        console.log(error)
        return NextResponse.json({error: error.message},{status : 500})
    }
}