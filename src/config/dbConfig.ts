import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async() => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("Connected to MongoDB")
        })

        mongoose.connection.on('error', (err) => {
            console.log("Error while connecting to MongoDB", err)
        })

        await mongoose.connect(config.databaseUrl as string)
    } catch (error) {
        console.error("Error while connecting to MongoDB", error)
        process.exit(1)
    }
}

export default connectDB