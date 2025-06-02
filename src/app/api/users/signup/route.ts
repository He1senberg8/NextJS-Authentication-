import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest , NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import {sendEmail} from '@/helpers/mail'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {userName, email, password} = reqBody;

        console.log("Received data:", reqBody);

        //check if user already exists
        const user=await User.findOne({email})
        if(user){console.log("User already exists:", email);}
        if(user){return NextResponse.json({error:"User already exists"}, {status: 400});}

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user
        const newUser=new User({userName,email,password:hashedPassword})

        const savedUser = await newUser.save();
        console.log("User created successfully:", savedUser);

        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id.toString()});

        return NextResponse.json({message:"User created successfully", user:savedUser,success:true}, {status: 201});

    } catch (error :any) {
        console.error("Error in signup route:", error);
        return NextResponse .json({error:error.message || "An error occurred"}, {status: 500});
    }
}