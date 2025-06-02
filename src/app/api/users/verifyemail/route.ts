import { NextRequest, NextResponse } from "next/server";
import {connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const {token } = reqBody;
        console.log("Token received:", token);
        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        if(!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        console.log(user);
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        })
    } catch (error:any) {
        console.error(error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}