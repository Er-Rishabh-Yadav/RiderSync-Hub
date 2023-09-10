import {connect} from "@/dbconfig/dbconfig";
import Community from "@/models/community";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest){
    try{
        const reqbody = await request.json()
        const {name, subtitle} = reqbody
        console.log(reqbody);
        // console.log(username, email, password)
        if(!name || !subtitle){
            return NextResponse.json({error: "Please fill all the fields"}, {status: 400})
        }
        else{
            const comm = await Community.findOne({name: name});
            if(comm){
                return NextResponse.json({error: "Community name already exists"}, {status: 400})
            }
            //hash password
            const newCommunity = new Community({
                name,
                subtitle
            })
            const savedcomm = await newCommunity.save()
            console.log("From create community Api",savedcomm)
            return NextResponse.json({message: "User created successfully",success: true, savedcomm}, {status: 200});
        }
    }
    catch(error:any){
        console.log("api error"+error)
        return NextResponse.json({error: error.message},{status : 500})
    }
}