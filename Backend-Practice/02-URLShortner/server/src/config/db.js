import mongoose from 'mongoose'
import { configEnv } from './config.js'

const connectDB=async()=>{
    try {
        await mongoose.connect(configEnv.MONGO_URI)
        console.log("mongodb connected ",configEnv.MONGO_URI)
    } catch (error) {
        console.log("Error while connecting db ",error.message)
    }
}

export default connectDB