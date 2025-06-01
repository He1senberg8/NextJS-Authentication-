import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try{
        const response = NextResponse.json({
            message: "Logout successful",
            success: true
        });
        const cookie = request.cookies.get("jwt")?.value || "";
        response.cookies.set("jwt","", {
            httpOnly: true,
            expires: new Date(0), // Set expiration to the past to delete the cookie
        });

        return response;
    } catch(error:any) {
        console.log("Error in logout route",error);
        return NextResponse.json({
            error: error.message || "An error occurred during logout"
        }, { status: 500 });
    }
}