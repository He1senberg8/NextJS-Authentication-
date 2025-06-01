import { getDataFromToken } from "@/helpers/getDataFromToken";
import {NextRequest , NextResponse} from "next/server";
import User from "@/models/userModel";
import {connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = getDataFromToken(request);
        const user = await User.findById(userId).select("-password -__v -createdAt -updatedAt");
        return NextResponse.json({
            message: "User data fetched successfully",
            userData: user || null,
        })
    } catch (error : any) {
        console.log(error);
        return NextResponse.json({ error: "Problem in Me Api " }, { status: 500 });
    }
}