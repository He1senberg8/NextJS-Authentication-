import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {
    try{
        const token = request.cookies.get('jwt')?.value || '';
        const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!);
        return decodedToken.userId;
    } catch (error: any) {
        throw new Error(`Error in getDataFromToken: ${error.message || "Unknown error"}`);
    }
}