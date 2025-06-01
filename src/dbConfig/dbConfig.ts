import mongoose, { mongo } from "mongoose";

export const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connection.on("error", (err) => {
            console.log("MongoDB connection error: ", err);
        });
    } catch (error) {
        console.log("Something went wrong !!!");
        console.log(error);
    }
}