import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest , NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log("Received data:", reqBody);

        //Check if user exists 
        const user = await User.findOne({email});
        if(!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        //Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            console.log("Invalid password for user:", email);
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        //Create token 
        const tokenData = {
            userId : user._id,
            email : user.email,
            userName : user.userName
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

        const response = NextResponse.json({
            message:"Login successful",
            success: true,
        });
        response.cookies.set("jwt",token,{httpOnly:true})
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "An error occurred" }, { status: 500 });
    }
}